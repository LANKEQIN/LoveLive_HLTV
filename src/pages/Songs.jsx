import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { songs, groups, getGroupById, getPlayerByCharacterName } from '../data/seiyuu'
import { useI18n } from '../i18n'

/**
 * 歌曲列表页
 * 模仿 HLTV 的数据密集型列表风格
 * 支持：企划筛选、类型筛选、按发行日期/播放量/销量排序
 */

// 歌曲类型 → 徽章配色（列表页与详情页共用）
export const TYPE_STYLES = {
  single: { color: '#ff6b9d' },   // 单曲主打 - 强调粉
  coupling: { color: '#d4a017' }, // 耦合曲 - 金
  album: { color: '#9a7bd1' },    // 专辑曲 - 紫
  solo: { color: '#4fc3f7' },     // Solo 曲 - 蓝
  other: { color: '#8a919c' },    // 未分类 - 灰
}

// 排序键配置
const SORT_KEYS = ['releaseDate', 'streams', 'sales']

function Songs() {
  const { lang, t } = useI18n()
  const navigate = useNavigate()

  // 筛选状态：企划 / 类型
  const [groupFilter, setGroupFilter] = useState('all')
  const [typeFilter, setTypeFilter] = useState('all')
  // 排序状态：排序键 + 方向
  const [sortKey, setSortKey] = useState('releaseDate')
  const [sortDir, setSortDir] = useState('desc')

  // 数据中实际存在的类型（含未分类兜底为 'other'）
  const availableTypes = [...new Set(songs.map(s => s.type || 'other'))]
  // 类型展示顺序：按主流程排列，'other' 兜底在最后
  const typeOrder = ['single', 'coupling', 'album', 'solo', 'other']
  const orderedTypes = typeOrder.filter(ty => availableTypes.includes(ty))

  // 筛选 + 排序
  const filteredSongs = songs
    .filter(s => groupFilter === 'all' || s.groupId === groupFilter)
    .filter(s => typeFilter === 'all' || (s.type || 'other') === typeFilter)
    .sort((a, b) => {
      let va, vb
      if (sortKey === 'releaseDate') {
        // 日期缺失的排在最后
        va = a.releaseDate || '0000-00-00'
        vb = b.releaseDate || '0000-00-00'
        return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va)
      }
      // 数值排序：缺失按 0 处理
      va = a[sortKey] || 0
      vb = b[sortKey] || 0
      return sortDir === 'asc' ? va - vb : vb - va
    })

  return (
    <div className="p-4">
      {/* 页面标题 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-hltv-text-bright">
          {t('songs.title')}
          <span className="text-hltv-text-dim text-sm font-normal ml-2">
            ({t('songs.songCount', { count: filteredSongs.length })})
          </span>
        </h1>

        {/* 企划筛选标签 - 与 Players 页一致的风格 */}
        <div className="flex items-center gap-1 flex-wrap">
          <FilterTab
            label={t('songs.allGroups')}
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

      {/* 工具栏：类型筛选 + 排序 */}
      <div className="flex items-center gap-3 mb-3 flex-wrap">
        {/* 类型筛选 */}
        <select
          value={typeFilter}
          onChange={e => setTypeFilter(e.target.value)}
          className="bg-hltv-bg-secondary border border-hltv-border text-hltv-text text-sm px-2 py-1 rounded outline-none focus:border-hltv-accent"
        >
          <option value="all">{t('songs.allTypes')}</option>
          {orderedTypes.map(ty => (
            <option key={ty} value={ty}>
              {t(`songs.types.${ty}`)}
            </option>
          ))}
        </select>

        {/* 排序键 */}
        <select
          value={sortKey}
          onChange={e => setSortKey(e.target.value)}
          className="bg-hltv-bg-secondary border border-hltv-border text-hltv-text text-sm px-2 py-1 rounded outline-none focus:border-hltv-accent"
        >
          {SORT_KEYS.map(key => (
            <option key={key} value={key}>
              {t(`songs.sort.${key}`)}
            </option>
          ))}
        </select>

        {/* 升序/降序切换 */}
        <button
          onClick={() => setSortDir(d => (d === 'asc' ? 'desc' : 'asc'))}
          className="bg-hltv-bg-secondary border border-hltv-border text-hltv-text-dim hover:text-hltv-text text-sm px-2 py-1 rounded transition-colors"
          title={sortDir === 'asc' ? t('songs.sort.asc') : t('songs.sort.desc')}
        >
          {sortDir === 'asc' ? '↑ ' + t('songs.sort.asc') : '↓ ' + t('songs.sort.desc')}
        </button>
      </div>

      {/* 歌曲数据表格 - HLTV 风格 */}
      <div className="bg-hltv-bg-secondary border border-hltv-border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-hltv-bg-hover text-hltv-text-dim text-xs uppercase">
              <th className="text-left px-3 py-2 w-10">{t('songs.table.rank')}</th>
              <th className="text-left px-3 py-2">{t('songs.table.song')}</th>
              <th className="text-left px-3 py-2">{t('songs.table.group')}</th>
              <th className="text-left px-3 py-2">{t('songs.table.type')}</th>
              <th className="text-left px-3 py-2 w-28">{t('songs.table.releaseDate')}</th>
              <th className="text-left px-3 py-2">{t('songs.table.center')}</th>
              <th className="text-center px-3 py-2 w-16">{t('songs.table.performers')}</th>
              <th className="text-right px-3 py-2 w-20">{t('songs.table.streams')}</th>
              <th className="text-right px-3 py-2 w-24">{t('songs.table.sales')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredSongs.map((song, index) => {
              const group = getGroupById(song.groupId)
              const type = song.type || 'other'
              const typeStyle = TYPE_STYLES[type] || TYPE_STYLES.other
              // Center 阵容容错：部分歌曲未指定 Center
              const centerNames = (song.center || [])
                .map(name => getPlayerByCharacterName(name))
                .filter(Boolean)
              return (
                <tr
                  key={song.id}
                  className="hltv-row border-t border-hltv-border cursor-pointer"
                  onClick={() => navigate(`/songs/${song.id}`)}
                >
                  {/* 序号 */}
                  <td className="px-3 py-2 text-hltv-text-dim">{index + 1}</td>
                  {/* 歌名（日文原名 / 罗马音） */}
                  <td className="px-3 py-2">
                    <Link
                      to={`/songs/${song.id}`}
                      className="text-hltv-link hover:text-hltv-link-hover font-medium"
                      onClick={e => e.stopPropagation()}
                    >
                      {lang === 'en' ? (song.titleEn || song.title) : song.title}
                    </Link>
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
                      {t(`songs.types.${type}`)}
                    </span>
                  </td>
                  {/* 发行日期 */}
                  <td className="px-3 py-2 text-hltv-text-dim">
                    {song.releaseDate ? formatDate(song.releaseDate, lang) : '—'}
                  </td>
                  {/* Center 成员（多人 Center 用・连接） */}
                  <td className="px-3 py-2 text-hltv-text">
                    {centerNames.length
                      ? centerNames.map(p => (lang === 'en' ? p.characterRomaji?.split(' ')[0] : p.characterName)).join('・')
                      : '—'}
                  </td>
                  {/* 演唱人数 */}
                  <td className="px-3 py-2 text-center text-hltv-text-dim">
                    {song.performers ? song.performers.length : '—'}
                  </td>
                  {/* 流媒体播放量（紧凑格式） */}
                  <td className="px-3 py-2 text-right text-hltv-text">
                    {song.streams ? formatCompact(song.streams) : '—'}
                  </td>
                  {/* 唱片销量 */}
                  <td className="px-3 py-2 text-right text-hltv-text-dim">
                    {song.sales ? song.sales.toLocaleString('en-US') : '—'}
                  </td>
                </tr>
              )
            })}
            {/* 无结果提示 */}
            {filteredSongs.length === 0 && (
              <tr>
                <td colSpan={9} className="px-3 py-8 text-center text-hltv-text-dim">
                  {t('songs.noResults')}
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
 * 筛选标签子组件（与 Players 页一致）
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
 * 日期格式化：中文 YYYY-MM-DD，英文 MM/DD/YYYY
 */
function formatDate(dateStr, lang = 'zh') {
  const [y, m, d] = dateStr.split('-')
  return lang === 'en' ? `${m}/${d}/${y}` : `${y}-${m}-${d}`
}

/**
 * 大数字紧凑格式：38000000 → 38M, 42000 → 42K
 */
function formatCompact(num) {
  if (num >= 1000000) return `${(num / 1000000).toFixed(1).replace(/\.0$/, '')}M`
  if (num >= 1000) return `${Math.round(num / 1000)}K`
  return String(num)
}

export default Songs
