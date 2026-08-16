import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { discs, groups, getGroupById } from '../data/seiyuu'
import { useI18n } from '../i18n'

/**
 * 唱片列表页（单曲/专辑时间线）
 * 模仿 HLTV Events 列表风格：按发行年份分组的时间线，
 * 每行展示封面色块、编号、唱片名、企划、类型、收录曲数、Oricon 峰值、销量
 */

// 唱片类型 → 徽章配色（列表页与详情页共用）
export const DISC_TYPE_STYLES = {
  single: { color: '#ff6b9d' },      // 单曲 - 强调粉
  album: { color: '#9a7bd1' },       // 专辑 - 紫
  'mini-album': { color: '#66bb6a' }, // 迷你专辑 - 绿
  digital: { color: '#4fc3f7' },     // 数字单曲 - 蓝
}

// 类型展示顺序（数据中实际不存在的不展示）
const TYPE_ORDER = ['single', 'album', 'mini-album', 'digital']

/**
 * Oricon 峰值排名配色（借鉴 HLTV 评分色编码）：
 * Top 3 金 / Top 10 绿 / Top 30 黄 / 其余灰
 */
export function oriconColor(peak) {
  if (!peak) return '#8a919c'
  if (peak <= 3) return '#ffd166'
  if (peak <= 10) return '#66bb6a'
  if (peak <= 30) return '#d4a017'
  return '#8a919c'
}

function Discs() {
  const { lang, t } = useI18n()
  const navigate = useNavigate()

  // 筛选状态：企划 / 唱片类型
  const [groupFilter, setGroupFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  // 时间线方向：默认最新在前
  const [sortDir, setSortDir] = useState('desc')

  // 数据中实际存在的类型，按固定顺序排列
  const availableTypes = [...new Set(discs.map(d => d.type))]
  const orderedTypes = TYPE_ORDER.filter(ty => availableTypes.includes(ty))

  // 筛选 + 按发行日期排序
  const filteredDiscs = discs
    .filter(d => groupFilter === 'all' || d.groupId === groupFilter)
    .filter(d => typeFilter === 'all' || d.type === typeFilter)
    .sort((a, b) => {
      const va = a.releaseDate || '0000-00-00'
      const vb = b.releaseDate || '0000-00-00'
      return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va)
    })

  // 按年份分组为时间线段落（保持排序后的顺序）
  const yearGroups = []
  let currentYear = null
  filteredDiscs.forEach(d => {
    const year = d.releaseDate ? d.releaseDate.slice(0, 4) : '----'
    if (year !== currentYear) {
      yearGroups.push({ year, items: [d] })
      currentYear = year
    } else {
      yearGroups[yearGroups.length - 1].items.push(d)
    }
  })

  return (
    <div className="p-4">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-hltv-text-bright">
          {t('discs.title')}
          <span className="text-hltv-text-dim text-sm font-normal ml-2">
            ({t('discs.discCount', { count: filteredDiscs.length })})
          </span>
        </h1>

        {/* 企划筛选标签 - 与 Players/Songs 页一致的风格 */}
        <div className="flex items-center gap-1 flex-wrap">
          <FilterTab
            label={t('discs.allGroups')}
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
          <option value="all">{t('discs.allTypes')}</option>
          {orderedTypes.map(ty => (
            <option key={ty} value={ty}>
              {t(`discs.types.${ty}`)}
            </option>
          ))}
        </select>

        {/* 时间线方向切换（新→旧 / 旧→新） */}
        <button
          onClick={() => setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))}
          className="bg-hltv-bg-secondary border border-hltv-border text-hltv-text-dim hover:text-hltv-text text-sm px-2 py-1 rounded transition-colors"
        >
          {sortDir === 'asc' ? '↑ ' + t('discs.sort.asc') : '↓ ' + t('discs.sort.desc')}
        </button>
      </div>

      {/* 唱片时间线表格 - HLTV Events 风格（按年份分组） */}
      <div className="bg-hltv-bg-secondary border border-hltv-border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-hltv-bg-hover text-hltv-text-dim text-xs uppercase">
              <th className="text-left px-3 py-2 w-24">{t('discs.table.date')}</th>
              <th className="text-left px-3 py-2">{t('discs.table.disc')}</th>
              <th className="text-left px-3 py-2">{t('discs.table.group')}</th>
              <th className="text-left px-3 py-2">{t('discs.table.type')}</th>
              <th className="text-center px-3 py-2 w-16">{t('discs.table.tracks')}</th>
              <th className="text-right px-3 py-2 w-24">{t('discs.table.oriconPeak')}</th>
              <th className="text-right px-3 py-2 w-24">{t('discs.table.sales')}</th>
            </tr>
          </thead>
          <tbody>
            {yearGroups.map(({ year, items }) => (
              <YearGroup key={year} year={year} items={items} lang={lang} t={t} navigate={navigate} />
            ))}
            {/* 无结果提示 */}
            {filteredDiscs.length === 0 && (
              <tr>
                <td colSpan={7} className="px-3 py-8 text-center text-hltv-text-dim">
                  {t('discs.noResults')}
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
 * 年份分组子组件：年份分隔行 + 该年度的唱片行
 */
function YearGroup({ year, items, lang, t, navigate }) {
  return (
    <>
      {/* 年份分隔行（HLTV Events 年度分组样式） */}
      <tr className="bg-hltv-bg-hover">
        <td colSpan={7} className="px-3 py-1.5 text-hltv-text-bright font-bold text-sm">
          {year}
          <span className="text-hltv-text-dim font-normal text-xs ml-2">
            {t('discs.yearCount', { count: items.length })}
          </span>
        </td>
      </tr>
      {items.map(disc => {
        const group = getGroupById(disc.groupId)
        const typeStyle = DISC_TYPE_STYLES[disc.type] || DISC_TYPE_STYLES.single
        return (
          <tr
            key={disc.id}
            className="hltv-row border-t border-hltv-border cursor-pointer"
            onClick={() => navigate(`/discs/${disc.id}`)}
          >
            {/* 发行日期（年份已在分组头，只展示月-日） */}
            <td className="px-3 py-2 text-hltv-text-dim whitespace-nowrap">
              {disc.releaseDate ? disc.releaseDate.slice(5).replace('-', '/') : '—'}
            </td>
            {/* 封面色块 + 编号 + 唱片名 */}
            <td className="px-3 py-2">
              <div className="flex items-center gap-2.5">
                <span
                  className="w-8 h-8 rounded shrink-0"
                  style={{
                    background: `linear-gradient(135deg, ${disc.color}, ${disc.color}88)`,
                    boxShadow: `inset 0 0 0 1px ${disc.color}`,
                  }}
                />
                <div className="min-w-0">
                  <Link
                    to={`/discs/${disc.id}`}
                    className="text-hltv-link hover:text-hltv-link-hover font-medium block truncate"
                    onClick={e => e.stopPropagation()}
                  >
                    {lang === 'en' ? (disc.titleEn || disc.title) : disc.title}
                  </Link>
                  <span className="text-hltv-text-dim text-xs">{disc.number}</span>
                </div>
              </div>
            </td>
            {/* 所属企划 */}
            <td className="px-3 py-2">
              <span
                className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs"
                style={{ backgroundColor: `${group.color}22`, color: group.color }}
              >
                {group.name}
              </span>
            </td>
            {/* 类型徽章 */}
            <td className="px-3 py-2">
              <span
                className="inline-block px-2 py-0.5 rounded text-xs"
                style={{ backgroundColor: `${typeStyle.color}22`, color: typeStyle.color }}
              >
                {t(`discs.types.${disc.type}`)}
              </span>
            </td>
            {/* 收录曲数 */}
            <td className="px-3 py-2 text-center text-hltv-text-dim">
              {disc.tracks.length}
            </td>
            {/* Oricon 峰值排名（色编码） */}
            <td className="px-3 py-2 text-right font-bold" style={{ color: oriconColor(disc.oriconPeak) }}>
              {disc.oriconPeak ? `#${disc.oriconPeak}` : '—'}
            </td>
            {/* 销量 */}
            <td className="px-3 py-2 text-right text-hltv-text-dim">
              {disc.sales ? disc.sales.toLocaleString('en-US') : '—'}
            </td>
          </tr>
        )
      })}
    </>
  )
}

/**
 * 筛选标签子组件（与 Players/Songs 页一致）
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

export default Discs
