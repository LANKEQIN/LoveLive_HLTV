import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HISTORY_MILESTONES, groups, getGroupById } from '../data/seiyuu'
import { useI18n } from '../i18n'

/**
 * 企划大事记页（Phase 5.5）
 * 2010 μ's 结成 → 2025+ 全系列时间线
 * 按年份分组的 HLTV Events 风格表格，标注里程碑类型
 * （企划始动、CD 出道、动画化、成员加入/毕业、重大公演、系列祭典）
 */

// 里程碑类型 → 徽章配色
export const HISTORY_TYPE_STYLES = {
  launch: { color: '#ff6b9d' },     // 企划始动 - 强调粉
  release: { color: '#ffd166' },    // CD 出道 - 金
  anime: { color: '#4fc3f7' },      // 动画化 - 蓝
  member: { color: '#66bb6a' },     // 成员加入 - 绿
  live: { color: '#ff9100' },       // 重大公演 - 橙
  event: { color: '#9a7bd1' },      // 系列祭典 - 紫
  graduation: { color: '#a0a0a0' }, // 毕业/休止 - 灰
}

// 类型展示顺序（数据中实际不存在的不展示）
const TYPE_ORDER = ['launch', 'release', 'anime', 'member', 'live', 'event', 'graduation']

/**
 * 格式化里程碑日期（年份已在分组头，只展示剩余部分）：
 *   day 精度 → MM/DD；month 精度 → YYYY-MM（整行更清晰）；year 精度 → 原样
 */
function formatMilestoneDate(m) {
  if (m.precision === 'day') return m.date.slice(5).replace('-', '/')
  return m.date
}

function History() {
  const { lang, t } = useI18n()

  // 筛选状态：企划 / 里程碑类型；时间线方向默认最新在前
  const [groupFilter, setGroupFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  const [sortDir, setSortDir] = useState('desc')

  // 数据中实际存在的类型，按固定顺序排列
  const availableTypes = [...new Set(HISTORY_MILESTONES.map(m => m.type))]
  const orderedTypes = TYPE_ORDER.filter(ty => availableTypes.includes(ty))

  // 筛选（单企划 groupId 或跨企划 groupIds 均可命中）+ 按日期排序
  const filteredMilestones = HISTORY_MILESTONES
    .filter(m => groupFilter === 'all' || m.groupId === groupFilter || (m.groupIds || []).includes(groupFilter))
    .filter(m => typeFilter === 'all' || m.type === typeFilter)
    .sort((a, b) => {
      const va = a.date || '0000-00'
      const vb = b.date || '0000-00'
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va)
    })

  // 按年份分组为时间线段落（保持排序后的顺序）
  const yearGroups = []
  let currentYear = null
  filteredMilestones.forEach(m => {
    const year = m.date ? m.date.slice(0, 4) : '----'
    if (year !== currentYear) {
      yearGroups.push({ year, items: [m] })
      currentYear = year
    } else {
      yearGroups[yearGroups.length - 1].items.push(m)
    }
  })

  return (
    <div className="p-4">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-hltv-text-bright">
          {t('history.title')}
          <span className="text-hltv-text-dim text-sm font-normal ml-2">
            ({t('history.milestoneCount', { count: filteredMilestones.length })})
          </span>
        </h1>

        {/* 企划筛选标签 - 与 Events/Discs 页一致的风格 */}
        <div className="flex items-center gap-1 flex-wrap">
          <FilterTab
            label={t('history.allGroups')}
            active={groupFilter === 'all'}
            onClick={() => setGroupFilter('all')}
          />
          {groups.map(group => (
            <FilterTab
              key={group.id}
              label={group.name}
              color={group.color}
              active={groupFilter === group.id}
              onClick={() => setGroupFilter(group.id)}
            />
          ))}
        </div>
      </div>

      {/* 工具栏：类型筛选 + 时间线方向 */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="bg-hltv-bg-secondary border border-hltv-border text-hltv-text text-sm px-2 py-1 rounded outline-none focus:border-hltv-accent"
        >
          <option value="all">{t('history.allTypes')}</option>
          {orderedTypes.map(ty => (
            <option key={ty} value={ty}>
              {t(`history.types.${ty}`)}
            </option>
          ))}
        </select>

        {/* 时间线方向切换（新→旧 / 旧→新） */}
        <button
          onClick={() => setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))}
          className="bg-hltv-bg-secondary border border-hltv-border text-hltv-text-dim hover:text-hltv-text text-sm px-2 py-1 rounded transition-colors"
        >
          {sortDir === 'asc' ? '↑ ' + t('history.sort.asc') : '↓ ' + t('history.sort.desc')}
        </button>
      </div>

      {/* 大事记时间线表格 - HLTV Events 风格（按年份分组） */}
      <div className="bg-hltv-bg-secondary border border-hltv-border rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-hltv-bg-hover text-hltv-text-dim text-xs uppercase">
              <th className="text-left px-3 py-2 w-24">{t('history.table.date')}</th>
              <th className="text-left px-3 py-2">{t('history.table.milestone')}</th>
              <th className="text-left px-3 py-2 w-32">{t('history.table.groups')}</th>
              <th className="text-left px-3 py-2 w-28">{t('history.table.type')}</th>
              <th className="text-center px-3 py-2 w-32">{t('history.table.related')}</th>
            </tr>
          </thead>
          <tbody>
            {yearGroups.map(({ year, items }) => (
              <YearGroup key={year} year={year} items={items} lang={lang} t={t} />
            ))}
            {/* 无结果提示 */}
            {filteredMilestones.length === 0 && (
              <tr>
                <td colSpan={5} className="px-3 py-8 text-center text-hltv-text-dim">
                  {t('history.noResults')}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/**
 * 年份分组子组件：年份分隔行 + 该年度的里程碑行
 */
function YearGroup({ year, items, lang, t }) {
  return (
    <>
      {/* 年份分隔行（HLTV Events 年度分组样式） */}
      <tr className="bg-hltv-bg-hover">
        <td colSpan={5} className="px-3 py-1.5 text-hltv-text-bright font-bold text-sm">
          {year}
          <span className="text-hltv-text-dim font-normal text-xs ml-2">
            {t('history.yearCount', { count: items.length })}
          </span>
        </td>
      </tr>
      {items.map(m => {
        const typeStyle = HISTORY_TYPE_STYLES[m.type] || HISTORY_TYPE_STYLES.launch
        // 相关企划：单企划 groupId + 跨企划 groupIds 合并去重
        const relatedGroupIds = [...new Set([m.groupId, ...(m.groupIds || [])].filter(Boolean))]
        return (
          <tr key={m.id} className="hltv-row border-t border-hltv-border">
            {/* 日期（年份已在分组头；月/年精度展示原样） */}
            <td className="px-3 py-2 text-hltv-text-dim whitespace-nowrap">
              {formatMilestoneDate(m)}
            </td>
            {/* 里程碑标题 + 补充说明 */}
            <td className="px-3 py-2">
              <span className="text-hltv-text font-medium">
                {lang === 'en' ? (m.titleEn || m.title) : m.title}
              </span>
              <div className="text-hltv-text-dim text-xs mt-0.5">
                {lang === 'en' ? (m.noteEn || m.note) : m.note}
              </div>
            </td>
            {/* 相关企划色点组 */}
            <td className="px-3 py-2">
              <div className="flex items-center gap-1 flex-wrap">
                {relatedGroupIds.map(gid => {
                  const group = getGroupById(gid)
                  if (!group) return null
                  return (
                    <Link
                      key={gid}
                      to={`/teams/${gid}`}
                      title={group.name}
                      className="w-2.5 h-2.5 rounded-full inline-block hover:scale-125 transition-transform"
                      style={{ backgroundColor: group.color }}
                    />
                  )
                })}
              </div>
            </td>
            {/* 类型徽章 */}
            <td className="px-3 py-2">
              <span
                className="inline-block px-2 py-0.5 rounded text-xs whitespace-nowrap"
                style={{ backgroundColor: `${typeStyle.color}22`, color: typeStyle.color }}
              >
                {t(`history.types.${m.type}`)}
              </span>
            </td>
            {/* 关联 Live / 活动链接 */}
            <td className="px-3 py-2 text-center">
              <div className="flex items-center justify-center gap-2">
                {m.liveId && (
                  <Link
                    to={`/matches/${m.liveId}`}
                    className="text-hltv-link hover:text-hltv-link-hover text-xs hover:underline"
                  >
                    {t('history.relatedLive')} ↗
                  </Link>
                )}
                {m.eventId && (
                  <Link
                    to={`/events/${m.eventId}`}
                    className="text-hltv-link hover:text-hltv-link-hover text-xs hover:underline"
                  >
                    {t('history.relatedEvent')} ↗
                  </Link>
                )}
                {!m.liveId && !m.eventId && <span className="text-hltv-text-dim">—</span>}
              </div>
            </td>
          </tr>
        )
      })}
    </>
  )
}

/**
 * 筛选标签子组件（与 Events/Discs 页一致）
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

export default History
