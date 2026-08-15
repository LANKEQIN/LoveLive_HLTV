import { useParams, Link } from 'react-router-dom'
import {
  getLiveById,
  getGroupById,
  getDisplayName,
  getLivePerformers,
  getLiveMemberStatus,
  resolveSetlistEntry,
} from '../data/seiyuu'
import { useI18n } from '../i18n'

/**
 * Live / 比赛详情页
 * 展示单场 Live 的歌单（关联歌曲库）、出演成员、出席明细、场馆信息
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

  // 参演成员：优先使用显式名单（含期次阵容修正），缺省按组合全员
  const performingPlayers = getLivePerformers(live)
  // 出席明细（缺席 / 部分出演记录）
  const memberStatus = getLiveMemberStatus(live)
  const groups = live.groupIds.map(groupId => getGroupById(groupId)).filter(Boolean)
  // 多日公演的日期区间文本
  const dateText = live.endDate
    ? `${formatDate(live.date, lang)} ~ ${formatDate(live.endDate, lang)}`
    : formatDate(live.date, lang)

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
            <span>{dateText}</span>
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
      <div className="flex items-center gap-2 mb-4 flex-wrap">
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

      {/* 公演备注（声优交接、公演性质等信息） */}
      {(live.note || live.noteEn) && (
        <div className="bg-hltv-bg-secondary border border-hltv-border border-l-4 border-l-hltv-accent rounded p-3 mb-4 text-sm text-hltv-text leading-relaxed">
          <span className="text-hltv-accent font-bold mr-2">{t('matches.liveNote')}:</span>
          {lang === 'en' ? (live.noteEn || live.note) : live.note}
        </div>
      )}

      {/* 两栏：歌单 | 出演成员 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* 歌单 */}
        <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
          <h2 className="text-hltv-accent text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b border-hltv-border">
            {t('matches.setlist')}
          </h2>
          <ol className="space-y-2">
            {live.setlist.map((entry, index) => {
              // 解析歌单条目：songId 关联歌曲库，否则使用纯文本标题
              const { song, title, titleEn } = resolveSetlistEntry(entry)
              return (
                <li key={index} className="flex items-center gap-3 text-sm">
                  <span className="text-hltv-text-dim w-6 text-right">{index + 1}.</span>
                  <span className={song ? 'text-hltv-text-bright' : 'text-hltv-text'}>
                    {lang === 'en' ? titleEn : title}
                  </span>
                  {/* 演出单位标注（跨企划公演） */}
                  {entry.unit && (
                    <span className="text-hltv-text-dim text-xs">{entry.unit}</span>
                  )}
                </li>
              )
            })}
          </ol>
        </div>

        {/* 出演成员 */}
        <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
          <h2 className="text-hltv-accent text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b border-hltv-border">
            {t('matches.performers')}
            <span className="text-hltv-text-dim font-normal ml-2">{performingPlayers.length}</span>
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

          {/* 出席明细：缺席 / 部分出演记录 */}
          {memberStatus.length > 0 && (
            <div className="mt-3 pt-3 border-t border-hltv-border">
              <h3 className="text-hltv-text-dim text-xs font-bold uppercase tracking-wider mb-2">
                {t('matches.attendanceNotes')}
              </h3>
              <ul className="space-y-1.5">
                {memberStatus.map(({ player, attendance, note, noteEn }) => (
                  <li key={player.id} className="flex items-center gap-2 text-xs">
                    <span
                      className="w-2 h-2 rounded-full shrink-0 opacity-50"
                      style={{ backgroundColor: player.characterColor }}
                    />
                    <span className="text-hltv-text-dim">
                      {lang === 'en' ? player.characterRomaji : player.characterFullName}
                    </span>
                    {/* 缺席 / 部分出演徽章 */}
                    <span
                      className={`px-1.5 py-0.5 rounded shrink-0 ${
                        attendance === 'absent'
                          ? 'bg-red-500/15 text-red-400'
                          : 'bg-amber-500/15 text-amber-400'
                      }`}
                    >
                      {attendance === 'absent' ? t('matches.absent') : t('matches.partial')}
                    </span>
                    <span className="text-hltv-text-dim truncate">
                      {lang === 'en' ? noteEn : note}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
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
            <dd className="text-hltv-text-bright font-medium">{dateText}</dd>
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
