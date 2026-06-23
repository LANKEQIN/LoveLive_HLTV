import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts'
import { players, groups, lives, getGroupById, getDisplayName } from '../data/seiyuu'
import { useI18n } from '../i18n'

/**
 * 统计页面
 * 提供全局数据仪表盘、企划对比图表、声优/角色维度交叉分析
 */
function Stats() {
  const { lang, t } = useI18n()
  const [selectedGroup, setSelectedGroup] = useState('all')

  // 计算全局统计
  const globalStats = useMemo(() => {
    const totalPlayers = players.length
    const totalGroups = groups.length
    const totalLives = groups.reduce((sum, g) => sum + g.totalLives, 0)
    const totalSongs = groups.reduce((sum, g) => sum + g.totalSongs, 0)
    const totalCDs = groups.reduce((sum, g) => sum + g.totalCDs, 0)
    const totalAttendance = lives.reduce((sum, live) => sum + live.attendance, 0)
    const avgRating = players.reduce((sum, p) => sum + calculateRating(p), 0) / players.length
    return { totalPlayers, totalGroups, totalLives, totalSongs, totalCDs, totalAttendance, avgRating }
  }, [])

  // 按企划聚合的数据
  const groupComparisonData = useMemo(() => {
    return groups.map(group => {
      const members = players.filter(p => p.groupId === group.id)
      const avgRating = members.reduce((sum, p) => sum + calculateRating(p), 0) / (members.length || 1)
      const totalFans = members.reduce((sum, p) => sum + p.stats.fanclubMembers, 0)
      return {
        name: group.name,
        members: members.length,
        lives: group.totalLives,
        songs: group.totalSongs,
        cds: group.totalCDs,
        fans: Math.round(totalFans / 1000),
        rating: Number(avgRating.toFixed(2)),
        color: group.color,
      }
    })
  }, [])

  // 当前筛选的选手
  const filteredPlayers = useMemo(() => {
    return selectedGroup === 'all' ? players : players.filter(p => p.groupId === selectedGroup)
  }, [selectedGroup])

  return (
    <div className="p-4">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-hltv-text-bright">{t('stats.title')}</h1>

        {/* 企划筛选 */}
        <select
          value={selectedGroup}
          onChange={e => setSelectedGroup(e.target.value)}
          className="bg-hltv-bg-secondary border border-hltv-border text-hltv-text text-sm px-3 py-1.5 rounded outline-none focus:border-hltv-accent"
        >
          <option value="all">{t('stats.allGroups')}</option>
          {groups.map(group => (
            <option key={group.id} value={group.id}>{group.name}</option>
          ))}
        </select>
      </div>

      {/* 全局统计卡片 */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 mb-6">
        <StatCard label={t('stats.totalPlayers')} value={globalStats.totalPlayers} />
        <StatCard label={t('stats.totalGroups')} value={globalStats.totalGroups} />
        <StatCard label={t('stats.totalLives')} value={globalStats.totalLives} />
        <StatCard label={t('stats.totalSongs')} value={globalStats.totalSongs} />
        <StatCard label={t('stats.totalCDs')} value={globalStats.totalCDs} />
        <StatCard label={t('stats.totalAttendance')} value={formatNumber(globalStats.totalAttendance)} />
        <StatCard
          label={t('stats.avgRating')}
          value={globalStats.avgRating.toFixed(2)}
          valueColor={getRatingColor(globalStats.avgRating)}
        />
      </div>

      {/* 图表区域 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <GroupComparisonChart data={groupComparisonData} t={t} />
        <TopPlayersChart players={filteredPlayers} lang={lang} t={t} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        <RatingDistributionChart players={filteredPlayers} t={t} />
        <GradeDistributionChart players={filteredPlayers} t={t} />
      </div>

      <div className="mb-6">
        <CrossAnalysisChart groups={groups} players={players} t={t} />
      </div>

      {/* Top Players 表格 */}
      <div className="bg-hltv-bg-secondary border border-hltv-border rounded overflow-hidden">
        <h3 className="text-hltv-text-bright font-medium p-4 border-b border-hltv-border">
          {t('stats.topPlayers')}
        </h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-hltv-bg-hover text-hltv-text-dim text-xs uppercase">
              <th className="text-left px-3 py-2 w-10">{t('stats.table.rank')}</th>
              <th className="text-left px-3 py-2">{t('stats.table.player')}</th>
              <th className="text-left px-3 py-2">{t('stats.table.group')}</th>
              <th className="text-left px-3 py-2">{t('stats.table.character')}</th>
              <th className="text-center px-3 py-2 w-20">{t('stats.table.rating')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredPlayers
              .sort((a, b) => calculateRating(b) - calculateRating(a))
              .slice(0, 10)
              .map((player, index) => {
                const group = getGroupById(player.groupId)
                const rating = calculateRating(player)
                return (
                  <tr key={player.id} className="hltv-row border-t border-hltv-border">
                    <td className="px-3 py-2 text-hltv-text-dim">{index + 1}</td>
                    <td className="px-3 py-2">
                      <Link
                        to={`/players/${player.id}`}
                        className="text-hltv-link hover:text-hltv-link-hover font-medium"
                      >
                        {getDisplayName(player, lang)}
                      </Link>
                    </td>
                    <td className="px-3 py-2">
                      <span
                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                        style={{ backgroundColor: `${group.color}22`, color: group.color }}
                      >
                        {group.name}
                      </span>
                    </td>
                    <td className="px-3 py-2 text-hltv-text">
                      {lang === 'en' ? player.characterRomaji : player.characterFullName}
                    </td>
                    <td className="px-3 py-2 text-center">
                      <span className="font-bold" style={{ color: getRatingColor(rating) }}>
                        {rating.toFixed(2)}
                      </span>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
 * 统计卡片子组件
 */
function StatCard({ label, value, valueColor }) {
  return (
    <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-3 text-center">
      <div
        className="text-xl md:text-2xl font-bold"
        style={{ color: valueColor || '#ffffff' }}
      >
        {value}
      </div>
      <div className="text-hltv-text-dim text-xs uppercase mt-1">{label}</div>
    </div>
  )
}

// 企划主题色（用于图表）
const GROUP_COLORS = ['#e8407a', '#00b0f0', '#f8b500', '#ff9100', '#5fb048', '#ff4d00', '#a0a0a0']
const GRADE_COLORS = ['#5d9eff', '#ff6b9d', '#5fb048']

// Tooltip 统一样式
const tooltipStyle = {
  backgroundColor: '#272a30',
  border: '1px solid #3a3e45',
  borderRadius: '4px',
  color: '#cad0d6',
}

/**
 * 企划对比柱状图
 */
function GroupComparisonChart({ data, t }) {
  return (
    <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
      <h3 className="text-hltv-text-bright font-medium mb-4">{t('stats.groupComparison')}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3a3e45" />
            <XAxis dataKey="name" stroke="#8d9196" />
            <YAxis stroke="#8d9196" />
            <Tooltip contentStyle={tooltipStyle} />
            <Legend />
            <Bar dataKey="members" name={t('stats.chart.members')} fill="#5d9eff" radius={[4, 4, 0, 0]} />
            <Bar dataKey="lives" name={t('stats.chart.lives')} fill="#ff6b9d" radius={[4, 4, 0, 0]} />
            <Bar dataKey="songs" name={t('stats.chart.songs')} fill="#5fb048" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

/**
 * Top Players 评分条形图
 */
function TopPlayersChart({ players, lang, t }) {
  const data = players
    .map(p => ({ player: p, rating: calculateRating(p) }))
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 8)
    .map(({ player, rating }) => ({
      name: getDisplayName(player, lang),
      rating: Number(rating.toFixed(2)),
      color: getRatingColor(rating),
    }))

  return (
    <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
      <h3 className="text-hltv-text-bright font-medium mb-4">{t('stats.topRating')}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3a3e45" />
            <XAxis type="number" domain={[0, 1.5]} stroke="#8d9196" />
            <YAxis type="category" dataKey="name" stroke="#8d9196" width={120} tick={{ fontSize: 11 }} />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="rating" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

/**
 * 综合评分分布图
 */
function RatingDistributionChart({ players, t }) {
  const distribution = [
    { range: '<0.90', count: players.filter(p => calculateRating(p) < 0.90).length, color: '#e05555' },
    { range: '0.90-1.05', count: players.filter(p => { const r = calculateRating(p); return r >= 0.90 && r < 1.05 }).length, color: '#cad0d6' },
    { range: '1.05-1.20', count: players.filter(p => { const r = calculateRating(p); return r >= 1.05 && r < 1.20 }).length, color: '#d4a017' },
    { range: '>=1.20', count: players.filter(p => calculateRating(p) >= 1.20).length, color: '#5fb048' },
  ]

  return (
    <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
      <h3 className="text-hltv-text-bright font-medium mb-4">{t('stats.ratingDistribution')}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={distribution} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3a3e45" />
            <XAxis dataKey="range" stroke="#8d9196" />
            <YAxis stroke="#8d9196" />
            <Tooltip contentStyle={tooltipStyle} />
            <Bar dataKey="count" radius={[4, 4, 0, 0]}>
              {distribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

/**
 * 年级分布图
 */
function GradeDistributionChart({ players, t }) {
  const gradeCount = {}
  players.forEach(p => {
    gradeCount[p.characterGrade] = (gradeCount[p.characterGrade] || 0) + 1
  })
  const data = Object.entries(gradeCount).map(([grade, count]) => ({
    grade: grade.replace('年生', '年'),
    count,
  }))

  return (
    <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
      <h3 className="text-hltv-text-bright font-medium mb-4">{t('stats.gradeDistribution')}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="grade"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={({ grade, count }) => `${grade}: ${count}`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={GRADE_COLORS[index % GRADE_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip contentStyle={tooltipStyle} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

/**
 * 跨企划六维对比雷达图
 */
function CrossAnalysisChart({ groups, players, t }) {
  const dimensions = ['Live', 'Songs', 'Solo', 'CDs', 'Events', 'Fans']
  const data = dimensions.map(dim => {
    const row = { dimension: dim }
    groups.forEach(group => {
      const members = players.filter(p => p.groupId === group.id)
      if (members.length === 0) {
        row[group.name] = 0
        return
      }
      const keyMap = {
        Live: 'liveCount',
        Songs: 'songCount',
        Solo: 'soloCount',
        CDs: 'cdCount',
        Events: 'eventCount',
        Fans: 'fanclubMembers',
      }
      const key = keyMap[dim]
      const maxValue = Math.max(...players.map(p => p.stats[key]))
      const avgValue = members.reduce((sum, p) => sum + p.stats[key], 0) / members.length
      row[group.name] = maxValue ? Math.round((avgValue / maxValue) * 100) : 0
    })
    return row
  })

  return (
    <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
      <h3 className="text-hltv-text-bright font-medium mb-4">{t('stats.crossAnalysis')}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid stroke="#3a3e45" />
            <PolarAngleAxis dataKey="dimension" stroke="#cad0d6" />
            <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#8d9196" />
            {groups.map((group, index) => (
              <Radar
                key={group.id}
                name={group.name}
                dataKey={group.name}
                stroke={GROUP_COLORS[index % GROUP_COLORS.length]}
                fill={GROUP_COLORS[index % GROUP_COLORS.length]}
                fillOpacity={0.1}
              />
            ))}
            <Legend />
            <Tooltip contentStyle={tooltipStyle} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

/**
 * 页面级辅助函数：计算综合评分
 */
function calculateRating(player) {
  const { liveCount, songCount, soloCount, cdCount, eventCount, fanclubMembers } = player.stats
  const score =
    liveCount * 0.05 +
    songCount * 0.02 +
    soloCount * 0.03 +
    cdCount * 0.01 +
    eventCount * 0.005 +
    (fanclubMembers / 10000) * 0.01
  return Math.min(score, 1.50)
}

/**
 * 页面级辅助函数：根据评分获取颜色
 */
function getRatingColor(rating) {
  if (rating >= 1.20) return '#5fb048'
  if (rating >= 1.05) return '#d4a017'
  if (rating >= 0.90) return '#cad0d6'
  return '#e05555'
}

/**
 * 数字格式化（千分位）
 */
function formatNumber(num) {
  return num.toLocaleString('en-US')
}

export default Stats
