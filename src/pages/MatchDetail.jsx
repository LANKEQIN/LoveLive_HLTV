import { useParams, Link } from 'react-router-dom'
import {
  players,
  getLiveById,
  getGroupById,
  getDisplayName,
} from '../data/seiyuu'
import { useI18n } from '../i18n'

/**
 * Live / 比赛详情页
 * 展示单场 Live 的歌单、出演成员、场馆信息
 */
function MatchDetail() {
  const { id } = useParams()
  const { lang, t } = useI18n()
  const live = getLiveById(id)

  // Live 不存在时的处理
  if (!live) {
    return (
      <div className="p-8 text-center">
        <p className="text-hltv-text-dim text-lg">{t('matches.notFound')}</p>
        <Link to="/matches" className="text-hltv-link mt-2 inline-block">
          {t('matches.backToMatches')}
        </Link>
      </div>
    )
  }

  // 参演成员：根据参演组合过滤
  const performingPlayers = players.filter(p => live.groupIds.includes(p.groupId))
  const groups = live.groupIds.map(groupId => getGroupById(groupId))

  return (
    <div className="p-4 max-w-5xl">
      {/* 返回链接 */}
      <Link
        to="/matches"
        className="text-hltv-text-dim text-sm hover:text-hltv-text mb-3 inline-block"
      >
        {t('matches.allMatches')}
      </Link>

      {/* Live 标题区域 */}
      <div className="flex items-start gap-4 mb-6 pb-4 border-b border-hltv-border">
        <div
          className="w-16 h-16 rounded-lg shrink-0 flex items-center justify-center text-2xl font-bold"
          style={{
            backgroundColor: `${groups[0].color}33`,
            color: groups[0].color,
            border: `2px solid ${groups[0].color}`,
          }}
        >
          {groups[0].name.charAt(0)}
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-hltv-text-bright">
            {lang === 'en' ? live.nameEn : live.name}
          </h1>
          <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-hltv-text-dim">
            <span>{formatDate(live.date, lang)}</span>
            <span>·</span>
            <span>{lang === 'en' ? live.venueEn : live.venue}</span>
            <span>·</span>
            <span>{lang === 'en' ? live.cityEn : live.city}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-3xl font-bold text-hltv-text-bright">
            {formatNumber(live.attendance)}
          </div>
          <div className="text-hltv-text-dim text-xs uppercase">{t('matches.attendance')}</div>
        </div>
      </div>

      {/* 参演组合 */}
      <div className="flex items-center gap-2 mb-6">
        {groups.map(group => (
          <Link
            key={group.id}
            to={`/teams/${group.id}`}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-sm"
            style={{
              backgroundColor: `${group.color}22`,
              color: group.color,
            }}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
            {group.name}
          </Link>
        ))}
      </div>

      {/* 两栏：歌单 | 出演成员 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* 歌单 */}
        <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
          <h2 className="text-hltv-accent text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b border-hltv-border">
            {t('matches.setlist')}
          </h2>
          <ol className="space-y-2">
            {live.setlist.map((song, index) => (
              <li key={index} className="flex items-center gap-3 text-sm">
                <span className="text-hltv-text-dim w-6 text-right">{index + 1}.</span>
                <span className="text-hltv-text">{song}</span>
              </li>
            ))}
          </ol>
        </div>

        {/* 出演成员 */}
        <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
          <h2 className="text-hltv-accent text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b border-hltv-border">
            {t('matches.performers')}
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {performingPlayers.map(player => (
              <Link
                key={player.id}
                to={`/players/${player.id}`}
                className="flex items-center gap-2 p-2 rounded hover:bg-hltv-bg transition-colors"
              >
                <span
                  className="w-3 h-3 rounded-full shrink-0"
                  style={{ backgroundColor: player.characterColor }}
                />
                <div className="min-w-0">
                  <div className="text-hltv-text text-sm truncate">
                    {getDisplayName(player, lang)}
                  </div>
                  <div className="text-hltv-text-dim text-xs truncate">
                    {lang === 'en' ? player.characterRomaji : player.characterFullName}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* 场馆信息 */}
      <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
        <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider mb-3">
          {t('matches.venueInfo')}
        </h2>
        <dl className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <dt className="text-hltv-text-dim mb-1">{t('matches.venue')}</dt>
            <dd className="text-hltv-text-bright font-medium">
              {lang === 'en' ? live.venueEn : live.venue}
            </dd>
          </div>
          <div>
            <dt className="text-hltv-text-dim mb-1">{t('matches.city')}</dt>
            <dd className="text-hltv-text-bright font-medium">
              {lang === 'en' ? live.cityEn : live.city}
            </dd>
          </div>
          <div>
            <dt className="text-hltv-text-dim mb-1">{t('matches.date')}</dt>
            <dd className="text-hltv-text-bright font-medium">{formatDate(live.date, lang)}</dd>
          </div>
          <div>
            <dt className="text-hltv-text-dim mb-1">{t('matches.table.status')}</dt>
            <dd className="text-hltv-text-bright font-medium">
              {live.status === 'completed' ? t('matches.status.completed') : t('matches.status.upcoming')}
            </dd>
          </div>
        </dl>
      </div>
    </div>
  )
}

/**
 * 日期格式化
 */
function formatDate(dateStr, lang = 'zh') {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  if (lang === 'en') {
    return `${month}/${day}/${year}`
  }
  return `${year}-${month}-${day}`
}

/**
 * 数字格式化
 */
function formatNumber(num) {
  return num.toLocaleString('en-US')
}

export default MatchDetail
