import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCareerTimeline } from '../data/seiyuu'
import { useI18n } from '../i18n'

/**
 * 选手生涯时间线组件（嵌入 PlayerDetail，Phase 5.4）
 *
 * 双视角切换（对应开发计划 5.4）：
 *   - 声优视角：出道、加入企划、solo 曲发行、重大活动、初次 Live 出演
 *   - 角色视角：角色 CD 初披露、动画登场、Center 担当曲、毕业/活动休止
 *
 * 节点数据由 seiyuu.js 的 getCareerTimeline 从 songs/lives/events 动态推导，
 * 动画登场与毕业节点来自 data/timeline.js 静态维护
 */

// 节点类型 → 徽章/圆点颜色（join/reveal 由节点载荷动态覆盖为企划色/角色色）
const TYPE_COLORS = {
  debut: '#d4a017',     // 出道 - 金
  join: '#4a90d9',      // 加入企划 - 蓝（默认，运行时用企划色）
  solo: '#b47ad6',      // Solo 曲 - 紫
  event: '#5fb048',     // 重大活动 - 绿
  firstLive: '#00b0f0', // 初次 Live - 天蓝
  reveal: '#ff8c00',    // 角色初披露 - 橙（默认，运行时用角色色）
  anime: '#7ab8f5',     // 动画登场 - 浅蓝
  center: '#e8b004',    // Center 曲 - 亮金
  graduation: '#e05555',// 毕业/休止 - 红
}

// 英文月份缩写（month 精度日期显示用）
const EN_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * 生涯时间线主组件
 */
function CareerTimeline({ player }) {
  const { lang, t } = useI18n()
  // 当前视角：'seiyuu' 声优视角 | 'character' 角色视角
  const [view, setView] = useState('seiyuu')
  // 时间排序方向：false 升序（旧→新，默认）| true 降序（新→旧）
  const [desc, setDesc] = useState(false)

  // 推导时间线节点（player 变化时重算）
  const timeline = useMemo(() => getCareerTimeline(player), [player])
  const nodes = timeline[view] || []

  // 排序 + 按年份分组（保持排序后的顺序）
  const yearGroups = useMemo(() => {
    const sorted = desc ? [...nodes].reverse() : nodes
    const groups = []
    let currentYear = null
    sorted.forEach(node => {
      const year = node.date ? node.date.slice(0, 4) : '----'
      if (year !== currentYear) {
        groups.push({ year, items: [node] })
        currentYear = year
      } else {
        groups[groups.length - 1].items.push(node)
      }
    })
    return groups
  }, [nodes, desc])

  // 视角总数徽标（切换按钮右侧的小计数）
  const counts = { seiyuu: timeline.seiyuu.length, character: timeline.character.length }

  return (
    <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
      {/* 标题行：区块名 + 视角切换 + 排序切换 */}
      <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
        <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider">
          {t('playerDetail.timeline.title')}
        </h2>
        <div className="flex items-center gap-2">
          {/* 视角切换按钮组 */}
          <div className="flex rounded overflow-hidden border border-hltv-border">
            {['seiyuu', 'character'].map(key => (
              <button
                key={key}
                onClick={() => setView(key)}
                className={`px-3 py-1 text-xs transition-colors ${
                  view === key
                    ? 'bg-hltv-bg-hover text-hltv-text-bright font-bold'
                    : 'text-hltv-text-dim hover:text-hltv-text'
                }`}
              >
                {t(`playerDetail.timeline.tabs.${key}`)}
                <span className="ml-1 opacity-70">{counts[key]}</span>
              </button>
            ))}
          </div>
          {/* 排序切换 */}
          <button
            onClick={() => setDesc(d => !d)}
            className="px-2 py-1 text-xs rounded border border-hltv-border text-hltv-text-dim hover:text-hltv-text transition-colors"
          >
            {desc ? t('playerDetail.timeline.sortDesc') : t('playerDetail.timeline.sortAsc')}
          </button>
        </div>
      </div>

      {/* 时间线主体 */}
      {yearGroups.length === 0 ? (
        <p className="text-hltv-text-dim text-sm py-4 text-center">
          {t('playerDetail.timeline.empty')}
        </p>
      ) : (
        yearGroups.map(({ year, items }) => (
          <div key={`${view}-${year}`} className="mb-2">
            {/* 年份分隔行 */}
            <div className="flex items-center gap-2 mb-1">
              <span className="text-hltv-text-bright font-bold text-sm">{year}</span>
              <span className="text-hltv-text-dim text-xs">
                {t('playerDetail.timeline.yearCount', { count: items.length })}
              </span>
              <span className="flex-1 h-px bg-hltv-border" />
            </div>
            {/* 节点列表 */}
            <ul>
              {items.map((node, idx) => (
                <TimelineNode
                  key={`${node.type}-${node.date}-${idx}`}
                  node={node}
                  player={player}
                  lang={lang}
                  t={t}
                  last={idx === items.length - 1}
                />
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  )
}

/**
 * 单个时间线节点子组件
 * 左侧日期列 + 圆点/连接线 + 右侧内容（类型徽章、标题、说明）
 */
function TimelineNode({ node, player, lang, t, last }) {
  const color = getNodeColor(node, player)
  const { title, description } = renderNodeText(node, lang, t)

  return (
    <li className="relative flex gap-3">
      {/* 日期列（按精度显示 年 / 年月 / 年月日） */}
      <div className="w-24 shrink-0 text-right text-xs text-hltv-text-dim pt-1.5 whitespace-nowrap">
        {formatTimelineDate(node.date, node.precision, lang)}
      </div>
      {/* 圆点 + 竖向连接线 */}
      <div className="flex flex-col items-center">
        <span
          className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
          style={{ backgroundColor: color }}
        />
        {!last && <span className="flex-1 w-px bg-hltv-border my-0.5" />}
      </div>
      {/* 内容区 */}
      <div className={`min-w-0 flex-1 ${last ? 'pb-2' : 'pb-4'}`}>
        <span
          className="inline-block text-[10px] leading-none px-1.5 py-1 rounded mb-1 font-bold"
          style={{ backgroundColor: `${color}22`, color }}
        >
          {t(`playerDetail.timeline.types.${node.type}`)}
        </span>
        {/* 标题（可内链到歌曲/Live/活动详情） */}
        {node.link ? (
          <Link to={node.link} className="block text-sm text-hltv-text hover:text-hltv-link hover:underline">
            {title}
          </Link>
        ) : (
          <span className="block text-sm text-hltv-text">{title}</span>
        )}
        {description && (
          <p className="text-xs text-hltv-text-dim mt-0.5 leading-relaxed">{description}</p>
        )}
      </div>
    </li>
  )
}

/**
 * 获取节点颜色：join 用企划色、reveal 用角色代表色，其余用类型固定色
 */
function getNodeColor(node, player) {
  if (node.type === 'join' && node.group) return node.group.color
  if (node.type === 'reveal' && player) return player.characterColor
  return TYPE_COLORS[node.type] || '#888888'
}

/**
 * 按节点类型生成标题与说明文案（文案统一走 i18n 模板，载荷字段来自推导函数）
 */
function renderNodeText(node, lang, t) {
  const T = 'playerDetail.timeline.nodes.'
  // 双语字段取值辅助：优先当前语言，缺省回落另一语言
  const bi = (zh, en) => (lang === 'en' ? (en ?? zh) : (zh ?? en))

  switch (node.type) {
    case 'debut':
      return { title: t(T + 'debut'), description: '' }
    case 'join':
      return {
        title: t(T + 'join', { group: node.group ? node.group.name : '' }),
        description: node.song
          ? t(T + 'joinDesc', {
              character: node.character,
              song: bi(node.song.title, node.song.titleEn),
            })
          : t(T + 'joinFallback'),
      }
    case 'solo':
      return {
        title: t(T + 'solo', { song: bi(node.song.title, node.song.titleEn) }),
        description: node.disc ? t(T + 'inDisc', { disc: bi(node.disc.title, node.disc.titleEn) }) : '',
      }
    case 'event':
      return {
        title: bi(node.event.name, node.event.nameEn),
        description: bi(node.event.note || node.event.venue, node.event.noteEn || node.event.venueEn),
      }
    case 'firstLive':
      return {
        title: t(T + 'firstLive', { live: bi(node.live.name, node.live.nameEn) }),
        description: `${bi(node.live.venue, node.live.venueEn)} · ${bi(node.live.city, node.live.cityEn)}`,
      }
    case 'reveal':
      return {
        title: t(T + 'reveal', { character: node.character }),
        description: t(T + 'firstCd', { song: bi(node.song.title, node.song.titleEn) }),
      }
    case 'anime':
      return {
        title: t(T + 'anime'),
        description: bi(node.milestone.note, node.milestone.noteEn),
      }
    case 'center':
      return {
        title: t(T + 'center', { song: bi(node.song.title, node.song.titleEn) }),
        description: node.disc ? t(T + 'inDisc', { disc: bi(node.disc.title, node.disc.titleEn) }) : '',
      }
    case 'graduation':
      return {
        title: t(T + 'graduation'),
        description: bi(node.milestone.note, node.milestone.noteEn),
      }
    default:
      return { title: '', description: '' }
  }
}

/**
 * 按精度与语言格式化日期
 * 中文：YYYY / YYYY-MM / YYYY-MM-DD；英文：YYYY / MMM YYYY / MM/DD/YYYY
 */
function formatTimelineDate(date, precision, lang) {
  if (!date) return ''
  const [year, month, day] = date.split('-')
  if (lang === 'en') {
    if (precision === 'year' || !month) return year
    if (precision === 'month' || !day) {
      return `${EN_MONTHS[Number(month) - 1]} ${year}`
    }
    return `${month}/${day}/${year}`
  }
  return date
}

export default CareerTimeline
