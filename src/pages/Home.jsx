import { Link } from 'react-router-dom'
import {
  players,
  groups,
  getDisplayName,
  getGroupById,
  getRecentLives,
  getNewsFeed,
} from '../data/seiyuu'
import { useI18n } from '../i18n'
import { calculateRating, getRatingColor } from '../utils/rating'

// 动态类型徽章配色（HLTV 新闻分类色风格：发行蓝 / Live 绿 / 成员变动金 / 毕业红）
const BADGE_COLORS = {
  release: '#3d7ab5',
  live: '#5fb048',
  member: '#d4a017',
  graduation: '#e05555',
}

// 唱片类型白名单（用于 i18n 徽章 key，未知类型兜底为 single）
const DISC_TYPES = ['single', 'album', 'mini-album', 'digital']

/**
 * 首页 —— 模拟 HLTV 首页三栏动态流布局（Phase 6.1）
 * 左栏：最近赛果（Live 结果）
 * 中栏：最新动态（新唱片发行 / Live 举办 / 成员加入与毕业）
 * 右栏：选手排行
 * 下方保留企划概览卡片
 */
function Home() {
  const { lang, t } = useI18n()

  // 按评分排序，取前 10 名作为右栏排行
  const topPlayers = [...players]
    .sort((a, b) => calculateRating(b) - calculateRating(a))
    .slice(0, 10)

  // 左栏：最近 Live 结果（新 → 旧）
  const recentLives = getRecentLives(8)
  // 中栏：最新动态流（新 → 旧）
  const newsFeed = getNewsFeed(15)

  return (
    <div className="p-4">
      {/* Hero 区域 */}
      <div className="bg-gradient-to-r from-hltv-bg-secondary to-hltv-bg border border-hltv-border rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-hltv-text-bright mb-2">
          <span className="text-hltv-accent">LoveLive!</span> HLTV
        </h1>
        <p className="text-hltv-text-dim text-sm max-w-2xl">
          {t('home.subtitle')}
        </p>
        <div className="flex gap-2 mt-4">
          <Link
            to="/players"
            className="px-4 py-2 bg-hltv-accent text-white rounded text-sm font-medium hover:bg-hltv-accent-hover transition-colors"
          >
            {t('home.browsePlayers')}
          </Link>
          {/* 企划大事记入口（Phase 5.5） */}
          <Link
            to="/history"
            className="px-4 py-2 bg-hltv-bg-secondary border border-hltv-border text-hltv-text rounded text-sm font-medium hover:bg-hltv-bg-hover transition-colors"
          >
            {t('home.browseHistory')}
          </Link>
        </div>
      </div>

      {/* 三栏动态流：左赛果 / 中动态 / 右排行（Phase 6.1） */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mb-6">
        {/* ===== 左栏：最近赛果 ===== */}
        <section className="lg:col-span-3 order-2 lg:order-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider">
              {t('home.feed.results')}
            </h2>
            <Link to="/matches" className="text-xs text-hltv-link hover:text-hltv-link-hover">
              {t('home.feed.resultsAll')}
            </Link>
          </div>
          <div className="bg-hltv-bg-secondary border border-hltv-border rounded overflow-hidden">
            {recentLives.map(live => (
              <Link
                key={live.id}
                to={`/matches/${live.id}`}
                className="block px-3 py-2 border-b border-hltv-border last:border-b-0 hover:bg-hltv-bg-hover transition-colors"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    {/* 出演企划色点 */}
                    <span className="flex gap-1 shrink-0">
                      {live.groupIds.map(gid => {
                        const g = getGroupById(gid)
                        return g ? (
                          <span
                            key={gid}
                            className="w-2 h-2 rounded-full inline-block"
                            style={{ backgroundColor: g.color }}
                          />
                        ) : null
                      })}
                    </span>
                    <span className="text-sm text-hltv-text truncate">
                      {lang === 'en' ? live.nameEn || live.name : live.name}
                    </span>
                  </div>
                  <span className="text-xs text-hltv-text-dim shrink-0">
                    {formatDateLoose(live.date, lang)}
                  </span>
                </div>
                <div className="text-xs text-hltv-text-dim mt-0.5 truncate pl-4">
                  {lang === 'en'
                    ? `${live.cityEn || live.venueEn}`
                    : `${live.city} · ${live.venue}`}
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* ===== 中栏：最新动态 ===== */}
        <section className="lg:col-span-6 order-1 lg:order-2 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider">
              {t('home.feed.news')}
            </h2>
            <Link to="/history" className="text-xs text-hltv-link hover:text-hltv-link-hover">
              {t('home.feed.newsAll')}
            </Link>
          </div>
          <div className="bg-hltv-bg-secondary border border-hltv-border rounded overflow-hidden">
            {newsFeed.map(item => {
              // 徽章 key：release 按唱片类型细分，其余按动态类型
              const badgeKey =
                item.type === 'release' && DISC_TYPES.includes(item.discType)
                  ? item.discType
                  : item.type === 'release'
                    ? 'single'
                    : item.type
              // 归属企划列表（release/member 为单企划，live 为多企划）
              const itemGroups = item.groupIds
                ? item.groupIds.map(gid => getGroupById(gid)).filter(Boolean)
                : item.groupId
                  ? [getGroupById(item.groupId)].filter(Boolean)
                  : []
              return (
                <Link
                  key={`${item.type}-${item.id}`}
                  to={item.link}
                  className="flex items-start gap-3 px-3 py-2.5 border-b border-hltv-border last:border-b-0 hover:bg-hltv-bg-hover transition-colors"
                >
                  {/* 类型徽章 */}
                  <span
                    className="shrink-0 px-1.5 py-0.5 rounded text-xs font-medium text-white mt-0.5 w-[72px] text-center"
                    style={{ backgroundColor: BADGE_COLORS[item.type] }}
                  >
                    {t(`home.feed.badge.${badgeKey}`)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-hltv-text-bright truncate">
                      {lang === 'en' ? item.titleEn || item.title : item.title}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-hltv-text-dim">
                      <span className="shrink-0">{formatDateLoose(item.date, lang)}</span>
                      {/* 企划标签 */}
                      {itemGroups.map(g => (
                        <span key={g.id} className="flex items-center gap-1 min-w-0">
                          <span
                            className="w-1.5 h-1.5 rounded-full inline-block shrink-0"
                            style={{ backgroundColor: g.color }}
                          />
                          <span className="truncate" style={{ color: g.color }}>{g.name}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>

        {/* ===== 右栏：选手排行 ===== */}
        <section className="lg:col-span-3 order-3 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider">
              {t('home.topPlayers')}
            </h2>
            <Link to="/rankings" className="text-xs text-hltv-link hover:text-hltv-link-hover">
              {t('home.feed.rankingsAll')}
            </Link>
          </div>
          <div className="bg-hltv-bg-secondary border border-hltv-border rounded overflow-hidden">
            {topPlayers.map((player, index) => {
              const group = getGroupById(player.groupId)
              const rating = calculateRating(player)
              return (
                <Link
                  key={player.id}
                  to={`/players/${player.id}`}
                  className="flex items-center gap-2 px-3 py-1.5 border-b border-hltv-border last:border-b-0 hover:bg-hltv-bg-hover transition-colors"
                >
                  <span className="text-xs text-hltv-text-dim w-4 text-right shrink-0">
                    {index + 1}
                  </span>
                  {/* 所属企划色点 */}
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: group.color }}
                  />
                  <span className="text-sm text-hltv-text truncate flex-1 min-w-0">
                    {getDisplayName(player, lang)}
                  </span>
                  <span className="text-sm font-bold shrink-0" style={{ color: getRatingColor(rating) }}>
                    {rating.toFixed(2)}
                  </span>
                </Link>
              )
            })}
          </div>
        </section>
      </div>

      {/* 企划概览 - 类似 HLTV 的赛事/Tournament 卡片 */}
      <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider mb-3">
        {t('home.groups')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {groups.map(group => {
          const memberCount = players.filter(p => p.groupId === group.id).length
          return (
            <Link
              key={group.id}
              to={`/teams/${group.id}`}
              className="bg-hltv-bg-secondary border border-hltv-border rounded-lg p-4 hover:border-hltv-border-light transition-colors block"
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: group.color }}
                />
                <h3 className="text-xl font-bold text-hltv-text-bright">
                  {group.name}
                </h3>
              </div>
              <p className="text-hltv-text-dim text-xs mb-3">
                {lang === 'en' && group.descriptionEn ? group.descriptionEn : group.description}
              </p>
              <div className="flex gap-4 text-sm">
                <span className="text-hltv-text-dim">
                  {t('home.members')}: <span className="text-hltv-text-bright">{memberCount}</span>
                </span>
                <span className="text-hltv-text-dim">
                  {t('home.lives')}: <span className="text-hltv-text-bright">{group.totalLives}</span>
                </span>
                <span className="text-hltv-text-dim">
                  {t('home.songs')}: <span className="text-hltv-text-bright">{group.totalSongs}</span>
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* 底部信息提示 */}
      <div className="text-center text-xs text-hltv-text-dim">
        {t('home.moreFeatures')}
      </div>
    </div>
  )
}

// 综合评分计算与颜色编码见 src/utils/rating.js（共享模块）

/**
 * 宽松日期格式化：兼容日 / 月两种精度
 * 中文 YYYY-MM-DD（或 YYYY-MM），英文 MM/DD/YYYY（或 MM/YYYY）
 */
function formatDateLoose(dateStr, lang = 'zh') {
  const [y, m, d] = (dateStr || '').split('-')
  if (!m) return y || ''
  if (!d) return lang === 'en' ? `${m}/${y}` : `${y}-${m}`
  return lang === 'en' ? `${m}/${d}/${y}` : `${y}-${m}-${d}`
}

export default Home
