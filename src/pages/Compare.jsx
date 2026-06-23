import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts'
import { players, getGroupById, getDisplayName } from '../data/seiyuu'
import { useI18n } from '../i18n'

/**
 * 选手对比页
 * 支持选择多名选手进行数据与图表对比
 */
function Compare() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { lang, t } = useI18n()

  // 从 URL 读取已选选手 id
  const selectedIds = useMemo(() => {
    const ids = searchParams.getAll('id')
    return ids.filter(id => players.some(p => p.id === id))
  }, [searchParams])

  const selectedPlayers = selectedIds.map(id => players.find(p => p.id === id))

  // 添加选手
  const addPlayer = id => {
    if (selectedIds.includes(id) || selectedIds.length >= 4) return
    const newParams = new URLSearchParams(searchParams)
    newParams.append('id', id)
    setSearchParams(newParams)
  }

  // 移除选手
  const removePlayer = id => {
    const newIds = selectedIds.filter(existingId => existingId !== id)
    const newParams = new URLSearchParams()
    newIds.forEach(i => newParams.append('id', i))
    setSearchParams(newParams)
  }

  // 雷达图数据
  const radarData = useMemo(() => {
    const dimensions = ['Lives', 'Songs', 'Solo', 'CDs', 'Events', 'Fans']
    return dimensions.map(dim => {
      const row = { dimension: dim }
      const keyMap = {
        Lives: 'liveCount',
        Songs: 'songCount',
        Solo: 'soloCount',
        CDs: 'cdCount',
        Events: 'eventCount',
        Fans: 'fanclubMembers',
      }
      const key = keyMap[dim]
      const maxValue = Math.max(...players.map(p => p.stats[key]))
      selectedPlayers.forEach(player => {
        row[getDisplayName(player, lang)] = maxValue
          ? Math.round((player.stats[key] / maxValue) * 100)
          : 0
      })
      return row
    })
  }, [selectedPlayers, lang])

  // 柱状图数据
  const barData = useMemo(() => {
    return ['liveCount', 'songCount', 'soloCount', 'cdCount', 'eventCount', 'fanclubMembers'].map(key => {
      const row = { name: t(`compare.stats.${key.replace('fanclubMembers', 'fans').replace('cdCount', 'cds')}`) }
      selectedPlayers.forEach(player => {
        row[getDisplayName(player, lang)] = player.stats[key]
      })
      return row
    })
  }, [selectedPlayers, lang, t])

  // 可选选手列表（排除已选）
  const availablePlayers = players.filter(p => !selectedIds.includes(p.id))

  return (
    <div className="p-4">
      {/* 页面标题 */}
      <h1 className="text-2xl font-bold text-hltv-text-bright mb-4">{t('compare.title')}</h1>

      {/* 已选选手 */}
      <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4 mb-4">
        <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider mb-3">
          {t('compare.selectPlayers')}
        </h2>
        <div className="flex flex-wrap gap-2 mb-3">
          {selectedPlayers.length === 0 && (
            <span className="text-hltv-text-dim text-sm">{t('compare.noPlayer')}</span>
          )}
          {selectedPlayers.map(player => (
            <div
              key={player.id}
              className="flex items-center gap-2 px-3 py-1.5 rounded text-sm"
              style={{ backgroundColor: `${player.characterColor}22`, color: player.characterColor, border: `1px solid ${player.characterColor}` }}
            >
              <Link to={`/players/${player.id}`} className="hover:underline">
                {getDisplayName(player, lang)}
              </Link>
              <button
                onClick={() => removePlayer(player.id)}
                className="ml-1 text-xs opacity-70 hover:opacity-100"
                title={t('compare.remove')}
              >
                ×
              </button>
            </div>
          ))}
        </div>

        {/* 添加选手下拉框 */}
        {selectedIds.length < 4 && (
          <select
            value=""
            onChange={e => {
              if (e.target.value) {
                addPlayer(e.target.value)
                e.target.value = ''
              }
            }}
            className="bg-hltv-bg border border-hltv-border text-hltv-text text-sm px-3 py-1.5 rounded outline-none focus:border-hltv-accent"
          >
            <option value="">{t('compare.addPlayer')}</option>
            {availablePlayers.map(player => (
              <option key={player.id} value={player.id}>
                {getDisplayName(player, lang)}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* 对比图表 */}
      {selectedPlayers.length >= 2 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
              <h3 className="text-hltv-text-bright font-medium mb-4">六维能力雷达图</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                    <PolarGrid stroke="#3a3e45" />
                    <PolarAngleAxis dataKey="dimension" stroke="#cad0d6" />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#8d9196" />
                    {selectedPlayers.map((player, index) => (
                      <Radar
                        key={player.id}
                        name={getDisplayName(player, lang)}
                        dataKey={getDisplayName(player, lang)}
                        stroke={COMPARE_COLORS[index % COMPARE_COLORS.length]}
                        fill={COMPARE_COLORS[index % COMPARE_COLORS.length]}
                        fillOpacity={0.1}
                      />
                    ))}
                    <Legend />
                    <Tooltip contentStyle={tooltipStyle} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
              <h3 className="text-hltv-text-bright font-medium mb-4">数据对比柱状图</h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#3a3e45" />
                    <XAxis dataKey="name" stroke="#8d9196" />
                    <YAxis stroke="#8d9196" />
                    <Tooltip contentStyle={tooltipStyle} />
                    <Legend />
                    {selectedPlayers.map((player, index) => (
                      <Bar
                        key={player.id}
                        dataKey={getDisplayName(player, lang)}
                        fill={COMPARE_COLORS[index % COMPARE_COLORS.length]}
                        radius={[4, 4, 0, 0]}
                      />
                    ))}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* 详细对比表格 */}
          <div className="bg-hltv-bg-secondary border border-hltv-border rounded overflow-hidden overflow-x-auto">
            <table className="w-full text-sm min-w-[600px]">
              <thead>
                <tr className="bg-hltv-bg-hover text-hltv-text-dim text-xs uppercase">
                  <th className="text-left px-3 py-2">项目</th>
                  {selectedPlayers.map(player => (
                    <th key={player.id} className="text-center px-3 py-2">
                      <Link
                        to={`/players/${player.id}`}
                        className="text-hltv-link hover:text-hltv-link-hover"
                      >
                        {getDisplayName(player, lang)}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <CompareRow label="组合" selectedPlayers={selectedPlayers} lang={lang}>
                  {player => {
                    const group = getGroupById(player.groupId)
                    return <span style={{ color: group.color }}>{group.name}</span>
                  }}
                </CompareRow>
                <CompareRow label="Rating" selectedPlayers={selectedPlayers}>
                  {player => {
                    const rating = calculateRating(player)
                    return <span style={{ color: getRatingColor(rating), fontWeight: 'bold' }}>{rating.toFixed(2)}</span>
                  }}
                </CompareRow>
                <CompareRow label={t('compare.stats.lives')} selectedPlayers={selectedPlayers}>
                  {player => player.stats.liveCount}
                </CompareRow>
                <CompareRow label={t('compare.stats.songs')} selectedPlayers={selectedPlayers}>
                  {player => player.stats.songCount}
                </CompareRow>
                <CompareRow label={t('compare.stats.solo')} selectedPlayers={selectedPlayers}>
                  {player => player.stats.soloCount}
                </CompareRow>
                <CompareRow label={t('compare.stats.cds')} selectedPlayers={selectedPlayers}>
                  {player => player.stats.cdCount}
                </CompareRow>
                <CompareRow label={t('compare.stats.events')} selectedPlayers={selectedPlayers}>
                  {player => player.stats.eventCount}
                </CompareRow>
                <CompareRow label={t('compare.stats.fans')} selectedPlayers={selectedPlayers}>
                  {player => formatNumber(player.stats.fanclubMembers)}
                </CompareRow>
              </tbody>
            </table>
          </div>
        </>
      )}

      {selectedPlayers.length < 2 && (
        <p className="text-hltv-text-dim text-center py-8">请选择至少 2 名选手进行对比</p>
      )}
    </div>
  )
}

/**
 * 对比表格行
 */
function CompareRow({ label, selectedPlayers, children, lang }) {
  return (
    <tr className="hltv-row border-t border-hltv-border">
      <td className="px-3 py-2 text-hltv-text-dim">{label}</td>
      {selectedPlayers.map(player => (
        <td key={player.id} className="px-3 py-2 text-center text-hltv-text">
          {children(player, lang)}
        </td>
      ))}
    </tr>
  )
}

// 对比用颜色
const COMPARE_COLORS = ['#e8407a', '#00b0f0', '#f8b500', '#5fb048']

// Tooltip 样式
const tooltipStyle = {
  backgroundColor: '#272a30',
  border: '1px solid #3a3e45',
  borderRadius: '4px',
  color: '#cad0d6',
}

/**
 * 计算综合评分
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
 * 根据评分获取颜色
 */
function getRatingColor(rating) {
  if (rating >= 1.20) return '#5fb048'
  if (rating >= 1.05) return '#d4a017'
  if (rating >= 0.90) return '#cad0d6'
  return '#e05555'
}

/**
 * 数字格式化
 */
function formatNumber(num) {
  return num.toLocaleString('en-US')
}

export default Compare
