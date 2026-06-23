import { Link } from 'react-router-dom'
import { useState } from 'react'
import { players, groups, getDisplayName, getGroupById } from '../data/seiyuu'
import { useI18n } from '../i18n'
import {
  getRoleEn,
  getColorNameEn,
} from '../i18n/dataTranslations'

/**
 * 选手/声优列表页
 * 模仿 HLTV 的 Players 列表页面风格
 * 支持按企划筛选，表格展示，点击可进入详情页
 */
function Players() {
  const { lang, t } = useI18n()

  // 当前选中的企划筛选器（'all' 或具体 groupId）
  const [filter, setFilter] = useState('all')

  // 根据筛选条件获取选手列表
  const filteredPlayers = filter === 'all'
    ? players
    : players.filter(p => p.groupId === filter)

  return (
    <div className="p-4">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-hltv-text-bright">
          {t('players.title')}
          <span className="text-hltv-text-dim text-sm font-normal ml-2">
            ({t('players.seiyuuCount', { count: filteredPlayers.length })})
          </span>
        </h1>

        {/* 企划筛选标签 - HLTV 风格的 tab 切换 */}
        <div className="flex items-center gap-1">
          <FilterTab
            label={t('players.all')}
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          {groups.map(group => (
            <FilterTab
              key={group.id}
              label={group.name}
              color={group.color}
              active={filter === group.id}
              onClick={() => setFilter(group.id)}
            />
          ))}
        </div>
      </div>

      {/* 选手数据表格 - HLTV 标志性的数据密集型表格 */}
      <div className="bg-hltv-bg-secondary border border-hltv-border rounded overflow-hidden">
        <table className="w-full text-sm">
          {/* 表头 */}
          <thead>
            <tr className="bg-hltv-bg-hover text-hltv-text-dim text-xs uppercase">
              <th className="text-left px-3 py-2 w-10">{t('players.table.rank')}</th>
              <th className="text-left px-3 py-2">{t('players.table.player')}</th>
              <th className="text-left px-3 py-2">{t('players.table.group')}</th>
              <th className="text-left px-3 py-2">{t('players.table.character')}</th>
              <th className="text-center px-3 py-2 w-16">{t('players.table.color')}</th>
              <th className="text-center px-3 py-2 w-20">{t('players.table.age')}</th>
              <th className="text-left px-3 py-2 w-32">{t('players.table.role')}</th>
              <th className="text-center px-3 py-2 w-20">{t('players.table.rating')}</th>
            </tr>
          </thead>
          {/* 表体 */}
          <tbody>
            {filteredPlayers.map((player, index) => {
              const group = getGroupById(player.groupId)
              // 计算综合评分（模拟 HLTV 的 rating 2.0）
              const rating = calculateRating(player)
              return (
                <tr
                  key={player.id}
                  className="hltv-row border-t border-hltv-border cursor-pointer"
                  onClick={() => window.location.href = `/players/${player.id}`}
                >
                  {/* 序号 */}
                  <td className="px-3 py-2 text-hltv-text-dim">{index + 1}</td>
                  {/* 选手显示名 - 核心：名 "角色名" 姓 格式 */}
                  <td className="px-3 py-2">
                    <Link
                      to={`/players/${player.id}`}
                      className="text-hltv-link hover:text-hltv-link-hover font-medium"
                      onClick={e => e.stopPropagation()}
                    >
                      {getDisplayName(player, lang)}
                    </Link>
                  </td>
                  {/* 所属企划 */}
                  <td className="px-3 py-2">
                    <span
                      className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs"
                      style={{
                        backgroundColor: `${group.color}22`,
                        color: group.color,
                      }}
                    >
                      {group.name}
                    </span>
                  </td>
                  {/* 对应角色全名 */}
                  <td className="px-3 py-2 text-hltv-text">
                    {lang === 'en' ? player.characterRomaji : player.characterFullName}
                  </td>
                  {/* 角色代表色 - 色块展示 */}
                  <td className="px-3 py-2 text-center">
                    <span
                      className="inline-block w-4 h-4 rounded-full align-middle"
                      style={{ backgroundColor: player.characterColor }}
                      title={lang === 'en' ? getColorNameEn(player.characterColorName) : player.characterColorName}
                    />
                  </td>
                  {/* 年龄（根据生日计算） */}
                  <td className="px-3 py-2 text-center text-hltv-text-dim">
                    {calcAge(player.birthdate)}
                  </td>
                  {/* 角色/队伍中的定位 */}
                  <td className="px-3 py-2 text-hltv-text-dim text-xs">
                    {lang === 'en' ? getRoleEn(player.role) : player.role}
                  </td>
                  {/* 综合评分 - HLTV 风格的彩色评分 */}
                  <td className="px-3 py-2 text-center">
                    <span
                      className="font-bold"
                      style={{ color: getRatingColor(rating) }}
                    >
                      {rating.toFixed(2)}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 表格下方说明 */}
      <p className="text-xs text-hltv-text-dim mt-2 px-1">
        {t('players.nameFormatNote')}
      </p>
    </div>
  )
}

/**
 * 筛选标签子组件
 */
function FilterTab({ label, color, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1 text-sm rounded transition-colors ${
        active
          ? 'bg-hltv-bg-hover text-hltv-text-bright font-medium'
          : 'text-hltv-text-dim hover:text-hltv-text hover:bg-hltv-bg-hover'
      }`}
      style={active && color ? { borderBottom: `2px solid ${color}` } : {}}
    >
      {label}
    </button>
  )
}

/**
 * 根据生日计算年龄
 */
function calcAge(birthdate) {
  const today = new Date()
  const birth = new Date(birthdate)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

/**
 * 计算综合评分（模拟 HLTV rating 2.0）
 * 根据各项统计数据加权计算
 */
function calculateRating(player) {
  const { liveCount, songCount, soloCount, cdCount, eventCount, fanclubMembers } = player.stats
  // 加权计算: Live权重最高, 其次歌曲, 粉丝数等
  const score =
    liveCount * 0.05 +
    songCount * 0.02 +
    soloCount * 0.03 +
    cdCount * 0.01 +
    eventCount * 0.005 +
    (fanclubMembers / 10000) * 0.01
  return Math.min(score, 1.50) // 评分上限 1.50
}

/**
 * 根据评分获取颜色（HLTV 风格的颜色编码）
 */
function getRatingColor(rating) {
  if (rating >= 1.20) return '#5fb048' // 绿色 - 优秀
  if (rating >= 1.05) return '#d4a017' // 黄色 - 良好
  if (rating >= 0.90) return '#cad0d6' // 白色 - 普通
  return '#e05555' // 红色 - 较低
}

export default Players
