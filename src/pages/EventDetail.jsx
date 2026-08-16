import { useParams, Link } from 'react-router-dom'
import {
  events,
  getEventById,
  getGroupById,
  getLivesByEvent,
} from '../data/seiyuu'
import { useI18n } from '../i18n'
import { EVENT_TYPE_STYLES } from './Events'

/**
 * 大型活动详情页
 * 展示：基本信息（日期/会场/类型/动员）、参演组合、场次明细、关联 Live 链接、
 * 时间线上前后活动导航
 */
function EventDetail() {
  const { id } = useParams()
  const { lang, t } = useI18n()
  const event = getEventById(id)

  // 活动不存在时的处理
  if (!event) {
    return (
      <div className="p-8 text-center">
        <p className="text-hltv-text-dim text-lg">{t('eventDetail.notFound')}</p>
        <Link to="/events" className="text-hltv-link mt-2 inline-block">
          {t('eventDetail.backToEvents')}
        </Link>
      </div>
    )
  }

  const typeStyle = EVENT_TYPE_STYLES[event.type] || EVENT_TYPE_STYLES.festival
  // 关联 Live（按日期升序）
  const relatedLives = getLivesByEvent(event)
  // 时间线上前后活动（全部活动按开始日期排序）
  const chronological = [...events].sort((a, b) => a.date.localeCompare(b.date))
  const index = chronological.findIndex(e => e.id === event.id)
  const prevEvent = index > 0 ? chronological[index - 1] : null
  const nextEvent = index < chronological.length - 1 ? chronological[index + 1] : null

  return (
    <div className="p-4 max-w-5xl">
      {/* 返回链接 */}
      <Link
        to="/events"
        className="text-hltv-text-dim text-sm hover:text-hltv-text mb-3 inline-block"
      >
        {t('eventDetail.backToEvents')}
      </Link>

      {/* 标题区域：类型徽章 + 活动名 + 日期场地 */}
      <div className="flex items-start gap-4 mb-4 pb-4 border-b border-hltv-border">
        {/* 类型色块视觉（呼应唱片页封面色块） */}
        <div
          className="w-16 h-16 rounded-lg shrink-0 flex items-center justify-center"
          style={{
            background: `linear-gradient(150deg, ${typeStyle.color}, ${typeStyle.color}55)`,
            boxShadow: `inset 0 0 0 2px ${typeStyle.color}`,
          }}
        >
          <span className="text-2xl" aria-hidden>🎤</span>
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-2xl md:text-3xl font-bold text-hltv-text-bright break-words">
            {lang === 'en' ? (event.nameEn || event.name) : event.name}
          </h1>
          {lang === 'en' && event.nameEn && event.name !== event.nameEn && (
            <p className="text-hltv-text-dim text-sm mt-1">{event.name}</p>
          )}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {/* 类型徽章 */}
            <span
              className="inline-block px-3 py-1 rounded text-sm"
              style={{ backgroundColor: `${typeStyle.color}22`, color: typeStyle.color }}
            >
              {t(`events.types.${event.type}`)}
            </span>
            {/* 日期 */}
            <span className="text-hltv-text-dim text-sm">
              {event.endDate
                ? t('eventDetail.multiDay', {
                    start: formatDate(event.date, lang),
                    end: formatDate(event.endDate, lang),
                  })
                : formatDate(event.date, lang)}
            </span>
            {/* 场地 */}
            <span className="text-hltv-text-dim text-sm">
              · {lang === 'en' ? event.venueEn : event.venue}（{lang === 'en' ? event.cityEn : event.city}）
            </span>
          </div>
        </div>
      </div>

      {/* 活动备注横幅（历史意义、特殊编制等） */}
      {(event.note || event.noteEn) && (
        <div
          className="mb-4 px-4 py-3 rounded border-l-4 bg-hltv-bg-secondary text-sm text-hltv-text"
          style={{ borderColor: typeStyle.color }}
        >
          {lang === 'en' ? (event.noteEn || event.note) : event.note}
        </div>
      )}

      {/* 双栏布局：基本信息 + 参演组合 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {/* 基本信息 */}
        <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
          <h2 className="text-hltv-text-bright font-bold mb-3">{t('eventDetail.basicInfo')}</h2>
          <dl className="space-y-2 text-sm">
            <InfoRow label={t('eventDetail.labels.date')}>
              {event.endDate
                ? t('eventDetail.multiDay', {
                    start: formatDate(event.date, lang),
                    end: formatDate(event.endDate, lang),
                  })
                : formatDate(event.date, lang)}
            </InfoRow>
            <InfoRow label={t('eventDetail.labels.venue')}>
              {lang === 'en' ? event.venueEn : event.venue}
            </InfoRow>
            <InfoRow label={t('eventDetail.labels.city')}>
              {lang === 'en' ? event.cityEn : event.city}
            </InfoRow>
            <InfoRow label={t('eventDetail.labels.type')}>
              {t(`events.types.${event.type}`)}
            </InfoRow>
            {event.attendance && (
              <InfoRow label={t('eventDetail.labels.attendance')}>
                {t('eventDetail.approxAttendance', { count: event.attendance.toLocaleString('en-US') })}
              </InfoRow>
            )}
          </dl>
        </div>

        {/* 参演组合 */}
        <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
          <h2 className="text-hltv-text-bright font-bold mb-3">
            {t('eventDetail.groupsTitle')}
            <span className="text-hltv-text-dim text-xs font-normal ml-2">
              {t('eventDetail.groupsCount', { count: event.groupIds.length })}
            </span>
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            {event.groupIds.map(gid => {
              const group = getGroupById(gid)
              if (!group) return null
              return (
                <Link
                  key={gid}
                  to={`/teams/${gid}`}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-sm transition-transform hover:scale-105"
                  style={{ backgroundColor: `${group.color}22`, color: group.color }}
                >
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
                  {group.name}
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* 场次明细 */}
      <div className="bg-hltv-bg-secondary border border-hltv-border rounded overflow-hidden mb-4">
        <div className="px-4 py-3 border-b border-hltv-border flex items-center justify-between">
          <h2 className="text-hltv-text-bright font-bold">{t('eventDetail.sessionsTitle')}</h2>
          <span className="text-hltv-text-dim text-xs">
            {t('eventDetail.sessionCount', { count: event.sessions.length })}
          </span>
        </div>
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-hltv-bg-hover text-hltv-text-dim text-xs uppercase">
              <th className="text-left px-4 py-2 w-24">{t('eventDetail.table.session')}</th>
              <th className="text-left px-4 py-2 w-32">{t('eventDetail.table.date')}</th>
              <th className="text-left px-4 py-2">{t('eventDetail.table.lineup')}</th>
              <th className="text-left px-4 py-2">{t('eventDetail.table.note')}</th>
            </tr>
          </thead>
          <tbody>
            {event.sessions.map(session => {
              // 场次出演阵容：缺省为活动全员
              const sessionGroups = session.groupIds || event.groupIds
              return (
                <tr key={session.label + session.date} className="hltv-row border-t border-hltv-border">
                  <td className="px-4 py-2 text-hltv-text-bright font-medium whitespace-nowrap">
                    {session.label}
                  </td>
                  <td className="px-4 py-2 text-hltv-text-dim whitespace-nowrap">
                    {formatDate(session.date, lang)}
                  </td>
                  {/* 该场次出演的组合色点 */}
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-1 flex-wrap">
                      {sessionGroups.map(gid => {
                        const group = getGroupById(gid)
                        if (!group) return null
                        return (
                          <span
                            key={gid}
                            title={group.name}
                            className="w-2.5 h-2.5 rounded-full inline-block"
                            style={{ backgroundColor: group.color }}
                          />
                        )
                      })}
                    </div>
                  </td>
                  {/* 场次备注（如部分出演、合作舞台） */}
                  <td className="px-4 py-2 text-hltv-text-dim">
                    {(lang === 'en' ? (session.noteEn || session.note) : session.note) || '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 关联 Live 链接 */}
      <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4 mb-4">
        <h2 className="text-hltv-text-bright font-bold mb-3">{t('eventDetail.relatedLivesTitle')}</h2>
        {relatedLives.length > 0 ? (
          <div className="space-y-2">
            {relatedLives.map(live => (
              <Link
                key={live.id}
                to={`/matches/${live.id}`}
                className="flex items-center justify-between gap-3 px-3 py-2.5 rounded bg-hltv-bg-hover hover:bg-hltv-bg border border-hltv-border transition-colors group"
              >
                <div className="min-w-0">
                  <p className="text-hltv-link group-hover:text-hltv-link-hover font-medium text-sm truncate">
                    {lang === 'en' ? (live.nameEn || live.name) : live.name}
                  </p>
                  <p className="text-hltv-text-dim text-xs mt-0.5">
                    {live.endDate
                      ? t('eventDetail.multiDay', {
                          start: formatDate(live.date, lang),
                          end: formatDate(live.endDate, lang),
                        })
                      : formatDate(live.date, lang)}
                    {' · '}
                    {lang === 'en' ? live.venueEn : live.venue}
                  </p>
                </div>
                <span className="text-hltv-text-dim group-hover:text-hltv-link text-sm shrink-0">→</span>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-hltv-text-dim text-sm">{t('eventDetail.noRelatedLives')}</p>
        )}
      </div>

      {/* 时间线上前后活动导航 */}
      <div className="flex items-center justify-between text-sm">
        {prevEvent ? (
          <Link
            to={`/events/${prevEvent.id}`}
            className="text-hltv-link hover:text-hltv-link-hover truncate max-w-[45%]"
            title={lang === 'en' ? prevEvent.nameEn : prevEvent.name}
          >
            {t('eventDetail.prevEvent')}{' '}
            <span className="text-hltv-text-dim">
              {lang === 'en' ? (prevEvent.nameEn || prevEvent.name) : prevEvent.name}
            </span>
          </Link>
        ) : (
          <span />
        )}
        {nextEvent && (
          <Link
            to={`/events/${nextEvent.id}`}
            className="text-hltv-link hover:text-hltv-link-hover truncate max-w-[45%] text-right"
            title={lang === 'en' ? nextEvent.nameEn : nextEvent.name}
          >
            <span className="text-hltv-text-dim">
              {lang === 'en' ? (nextEvent.nameEn || nextEvent.name) : nextEvent.name}
            </span>{' '}
            {t('eventDetail.nextEvent')}
          </Link>
        )}
      </div>
    </div>
  )
}

/**
 * 基本信息行子组件
 */
function InfoRow({ label, children }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <dt className="text-hltv-text-dim shrink-0">{label}</dt>
      <dd className="text-hltv-text text-right">{children}</dd>
    </div>
  )
}

/**
 * 日期格式化（中文 YYYY-MM-DD / 英文 MM/DD/YYYY）
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

export default EventDetail
