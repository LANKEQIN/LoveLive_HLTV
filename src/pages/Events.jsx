import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { events, groups, getGroupById } from '../data/seiyuu'
import { useI18n } from '../i18n'

/**
 * 大型活动列表页（对应 HLTV Events）
 * 按年份分组的时间线：系列合同祭典、周年纪念公演、
 * Animelo Summer Live 出演、红白歌合战等大型活动
 */

// 活动类型 → 徽章配色（列表页与详情页共用）
export const EVENT_TYPE_STYLES = {
  festival: { color: '#ff6b9d' },     // 系列合同祭典 - 强调粉
  anniversary: { color: '#ffd166' },  // 周年纪念 - 金
  external: { color: '#4fc3f7' },     // 外部音乐节 - 蓝
  award: { color: '#9a7bd1' },        // 电视舞台 - 紫
}

// 类型展示顺序（数据中实际不存在的不展示）
const TYPE_ORDER = ['festival', 'anniversary', 'external', 'award']

function Events() {
  const { lang, t } = useI18n()
  const navigate = useNavigate()

  // 筛选状态：企划 / 活动类型
  const [groupFilter, setGroupFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  // 时间线方向：默认最新在前
  const [sortDir, setSortDir] = useState('desc')

  // 数据中实际存在的类型，按固定顺序排列
  const availableTypes = [...new Set(events.map(e => e.type))]
  const orderedTypes = TYPE_ORDER.filter(ty => availableTypes.includes(ty))

  // 筛选 + 按开始日期排序
  const filteredEvents = events
    .filter(e => groupFilter === 'all' || e.groupIds.includes(groupFilter))
    .filter(e => typeFilter === 'all' || e.type === typeFilter)
    .sort((a, b) => {
      const va = a.date || '0000-00-00'
      const vb = b.date || '0000-00-00'
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va)
    })

  // 按年份分组为时间线段落（保持排序后的顺序）
  const yearGroups = []
  let currentYear = null
  filteredEvents.forEach(e => {
    const year = e.date ? e.date.slice(0, 4) : '----'
    if (year !== currentYear) {
      yearGroups.push({ year, items: [e] })
      currentYear = year
    } else {
      yearGroups[yearGroups.length - 1].items.push(e)
    }
  })

  return (
    <div className="p-4">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-hltv-text-bright">
          {t('events.title')}
          <span className="text-hltv-text-dim text-sm font-normal ml-2">
            ({t('events.eventCount', { count: filteredEvents.length })})
          </span>
        </h1>

        {/* 企划筛选标签 - 与 Players/Discs 页一致的风格 */}
        <div className="flex items-center gap-1 flex-wrap">
          <FilterTab
            label={t('events.allGroups')}
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
          <option value="all">{t('events.allTypes')}</option>
          {orderedTypes.map(ty => (
            <option key={ty} value={ty}>
              {t(`events.types.${ty}`)}
            </option>
          ))}
        </select>

        {/* 时间线方向切换（新→旧 / 旧→新） */}
        <button
          onClick={() => setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))}
          className="bg-hltv-bg-secondary border border-hltv-border text-hltv-text-dim hover:text-hltv-text text-sm px-2 py-1 rounded transition-colors"
        >
          {sortDir === 'asc' ? '↑ ' + t('events.sort.asc') : '↓ ' + t('events.sort.desc')}
        </button>
      </div>

      {/* 活动时间线表格 - HLTV Events 风格（按年份分组） */}
      <div className="bg-hltv-bg-secondary border border-hltv-border rounded overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-hltv-bg-hover text-hltv-text-dim text-xs uppercase">
              <th className="text-left px-3 py-2 w-24">{t('events.table.date')}</th>
              <th className="text-left px-3 py-2">{t('events.table.event')}</th>
              <th className="text-left px-3 py-2">{t('events.table.groups')}</th>
              <th className="text-left px-3 py-2 w-28">{t('events.table.type')}</th>
              <th className="text-left px-3 py-2 w-44">{t('events.table.venue')}</th>
              <th className="text-center px-3 py-2 w-20">{t('events.table.live')}</th>
            </tr>
          </thead>
          <tbody>
            {yearGroups.map(({ year, items }) => (
              <YearGroup key={year} year={year} items={items} lang={lang} t={t} navigate={navigate} />
            ))}
            {/* 无结果提示 */}
            {filteredEvents.length === 0 && (
              <tr>
                <td colSpan={6} className="px-3 py-8 text-center text-hltv-text-dim">
                  {t('events.noResults')}
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
 * 年份分组子组件：年份分隔行 + 该年度的活动行
 */
function YearGroup({ year, items, lang, t, navigate }) {
  return (
    <>
      {/* 年份分隔行（HLTV Events 年度分组样式） */}
      <tr className="bg-hltv-bg-hover">
        <td colSpan={6} className="px-3 py-1.5 text-hltv-text-bright font-bold text-sm">
          {year}
          <span className="text-hltv-text-dim font-normal text-xs ml-2">
            {t('events.yearCount', { count: items.length })}
          </span>
        </td>
      </tr>
      {items.map(event => {
        const typeStyle = EVENT_TYPE_STYLES[event.type] || EVENT_TYPE_STYLES.festival
        return (
          <tr
            key={event.id}
            className="hltv-row border-t border-hltv-border cursor-pointer"
            onClick={() => navigate(`/events/${event.id}`)}
          >
            {/* 开始日期（多日活动含结束日；年份已在分组头，只展示月-日） */}
            <td className="px-3 py-2 text-hltv-text-dim whitespace-nowrap">
              {event.date ? event.date.slice(5).replace('-', '/') : '—'}
              {event.endDate && (
                <span className="text-xs"> ~ {event.endDate.slice(5).replace('-', '/')}</span>
              )}
            </td>
            {/* 活动名（多场次时标注场次数） */}
            <td className="px-3 py-2">
              <Link
                to={`/events/${event.id}`}
                className="text-hltv-link hover:text-hltv-link-hover font-medium hover:underline"
                onClick={e => e.stopPropagation()}
              >
                {lang === 'en' ? (event.nameEn || event.name) : event.name}
              </Link>
              {event.sessions.length > 1 && (
                <span className="text-hltv-text-dim text-xs ml-1.5">
                  · {event.sessions.length} {t('events.sessionUnit')}
                </span>
              )}
            </td>
            {/* 参演企划色点组 */}
            <td className="px-3 py-2">
              <div className="flex items-center gap-1 flex-wrap">
                {event.groupIds.map(gid => {
                  const group = getGroupById(gid)
                  if (!group) return null
                  return (
                    <Link
                      key={gid}
                      to={`/teams/${gid}`}
                      title={group.name}
                      onClick={e => e.stopPropagation()}
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
                {t(`events.types.${event.type}`)}
              </span>
            </td>
            {/* 场地 + 都市 */}
            <td className="px-3 py-2 text-hltv-text-dim truncate" title={lang === 'en' ? event.venueEn : event.venue}>
              {lang === 'en' ? event.venueEn : event.venue}
              <span className="text-xs ml-1">
                @ {lang === 'en' ? event.cityEn : event.city}
              </span>
            </td>
            {/* 关联 Live 链接 */}
            <td className="px-3 py-2 text-center">
              {event.liveIds.length > 0 ? (
                <Link
                  to={`/matches/${event.liveIds[0]}`}
                  className="text-hltv-link hover:text-hltv-link-hover text-xs hover:underline"
                  onClick={e => e.stopPropagation()}
                >
                  {t('events.viewLive')} ↗
                </Link>
              ) : (
                <span className="text-hltv-text-dim">—</span>
              )}
            </td>
          </tr>
        )
      })}
    </>
  )
}

/**
 * 筛选标签子组件（与 Players/Discs 页一致）
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

export default Events
