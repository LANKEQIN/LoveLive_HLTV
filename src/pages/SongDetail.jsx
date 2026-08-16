import { useParams, Link } from 'react-router-dom'
import {
  getSongById,
  getGroupById,
  getDiscById,
  getSongsByDisc,
  getDisplayName,
  getPlayerByCharacterName,
  getSongFirstLive,
  getLivesBySong,
  songs,
} from '../data/seiyuu'
import { useI18n } from '../i18n'
import { TYPE_STYLES } from './Songs'

/**
 * 歌曲详情页
 * 展示：基本信息、演唱阵容（链接到选手页）、Center、所属单曲、首次披露 Live、成绩数据
 */
function SongDetail() {
  const { id } = useParams()
  const { lang, t } = useI18n()
  const song = getSongById(id)

  // 歌曲不存在时的处理
  if (!song) {
    return (
      <div className="p-8 text-center">
        <p className="text-hltv-text-dim text-lg">{t('songDetail.notFound')}</p>
        <Link to="/songs" className="text-hltv-link mt-2 inline-block">
          {t('songDetail.backToSongs')}
        </Link>
      </div>
    )
  }

  const group = getGroupById(song.groupId)
  const type = song.type || 'other'
  const typeStyle = TYPE_STYLES[type] || TYPE_STYLES.other
  // 所属唱片（单曲/专辑）
  const disc = song.singleId ? getDiscById(song.singleId) : null
  // 首次披露 Live 与累计演出次数
  const firstLive = getSongFirstLive(song.id)
  const liveCount = getLivesBySong(song.id).length
  // 演唱阵容解析为选手对象（未收录角色保留原名为纯文本）
  const performerPlayers = (song.performers || []).map(name => ({
    name,
    player: getPlayerByCharacterName(name),
  }))
  // Center 阵容解析
  const centerPlayers = (song.center || []).map(name => ({
    name,
    player: getPlayerByCharacterName(name),
  }))
  // 成绩排名：全站按播放量/销量降序的名次
  const streamsRank = [...songs].sort((a, b) => (b.streams || 0) - (a.streams || 0))
    .findIndex(s => s.id === song.id) + 1
  const salesRank = [...songs].sort((a, b) => (b.sales || 0) - (a.sales || 0))
    .findIndex(s => s.id === song.id) + 1
  // 同唱片其他收录曲
  const siblingTracks = disc ? getSongsByDisc(disc.id).filter(s => s.id !== song.id) : []

  return (
    <div className="p-4 max-w-5xl">
      {/* 返回链接 */}
      <Link
        to="/songs"
        className="text-hltv-text-dim text-sm hover:text-hltv-text mb-3 inline-block"
      >
        {t('songDetail.backToSongs')}
      </Link>

      {/* 标题区域 */}
      <div className="flex items-start gap-4 mb-6 pb-4 border-b border-hltv-border">
        <div
          className="w-16 h-16 rounded-lg shrink-0 flex items-center justify-center text-2xl"
          style={{
            backgroundColor: `${group.color}33`,
            color: group.color,
            border: `2px solid ${group.color}`,
          }}
        >
          ♪
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-hltv-text-bright break-words">
            {lang === 'en' ? (song.titleEn || song.title) : song.title}
          </h1>
          {lang === 'en' && song.titleEn && song.title !== song.titleEn && (
            <p className="text-hltv-text-dim text-sm mt-1">{song.title}</p>
          )}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {/* 所属企划徽章 */}
            <Link
              to={`/teams/${group.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-sm"
              style={{ backgroundColor: `${group.color}22`, color: group.color }}
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
              {group.name}
            </Link>
            {/* 类型徽章 */}
            <span
              className="inline-block px-3 py-1 rounded text-sm"
              style={{ backgroundColor: `${typeStyle.color}22`, color: typeStyle.color }}
            >
              {t(`songs.types.${type}`)}
            </span>
            {/* 发行日期 */}
            {song.releaseDate && (
              <span className="text-hltv-text-dim text-sm">
                {formatDate(song.releaseDate, lang)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 两栏布局：基本信息 + 首次披露/同碟收录 | 成绩数据 + 演唱阵容 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 左栏 */}
        <div className="space-y-4">
          {/* 基本信息 */}
          <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
            <h2 className="text-hltv-accent text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b border-hltv-border">
              {t('songDetail.basicInfo')}
            </h2>
            <dl className="space-y-2 text-sm">
              <InfoRow label={t('songDetail.labels.releaseDate')}>
                {song.releaseDate ? formatDate(song.releaseDate, lang) : '—'}
              </InfoRow>
              <InfoRow label={t('songDetail.labels.lyricist')}>
                {song.lyricist || '—'}
              </InfoRow>
              <InfoRow label={t('songDetail.labels.composer')}>
                {song.composer || '—'}
              </InfoRow>
              {/* Center：多人时逐个展示，可解析者链接到选手页 */}
              <InfoRow label={t('songDetail.labels.center')}>
                {centerPlayers.length
                  ? centerPlayers.map(({ name, player }, i) => (
                      <span key={name}>
                        {i > 0 && <span className="text-hltv-text-dim mx-1">・</span>}
                        {player ? (
                          <Link
                            to={`/players/${player.id}`}
                            className="text-hltv-link hover:text-hltv-link-hover font-bold"
                          >
                            {lang === 'en' ? player.characterRomaji : name}
                          </Link>
                        ) : (
                          <span className="font-bold">{name}</span>
                        )}
                      </span>
                    ))
                  : '—'}
              </InfoRow>
              {/* 所属单曲/专辑（封面色块 + 唱片名，链接到唱片详情页） */}
              <InfoRow label={t('songDetail.labels.single')}>
                {disc ? (
                  <Link
                    to={`/discs/${disc.id}`}
                    className="inline-flex items-center gap-2 hover:text-hltv-link-hover"
                  >
                    <span
                      className="inline-block w-3 h-3 rounded"
                      style={{ backgroundColor: disc.color }}
                    />
                    <span className="text-hltv-link">
                      {lang === 'en' ? (disc.titleEn || disc.title) : disc.title}
                    </span>
                    <span className="text-hltv-text-dim text-xs">{disc.number}</span>
                  </Link>
                ) : '—'}
              </InfoRow>
            </dl>
          </div>

          {/* 首次披露 Live */}
          <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
            <h2 className="text-hltv-accent text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b border-hltv-border">
              {t('songDetail.firstLive')}
            </h2>
            {firstLive ? (
              <div>
                <Link
                  to={`/matches/${firstLive.id}`}
                  className="text-hltv-link hover:text-hltv-link-hover font-medium"
                >
                  {lang === 'en' ? firstLive.nameEn : firstLive.name}
                </Link>
                <div className="text-hltv-text-dim text-xs mt-1">
                  {formatDate(firstLive.date, lang)} · {lang === 'en' ? firstLive.venueEn : firstLive.venue}
                </div>
                <div className="text-hltv-text-dim text-xs mt-2">
                  {t('songDetail.liveCount')}: <span className="text-hltv-text font-bold">{liveCount}</span>
                </div>
              </div>
            ) : (
              <p className="text-hltv-text-dim text-sm">{t('songDetail.noFirstLive')}</p>
            )}
          </div>

          {/* 同唱片收录曲 */}
          {siblingTracks.length > 0 && (
            <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
              <h2 className="text-hltv-accent text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b border-hltv-border">
                {t('songDetail.discTracks')}
              </h2>
              <ul className="space-y-1.5 text-sm">
                {siblingTracks.map(track => (
                  <li key={track.id}>
                    <Link
                      to={`/songs/${track.id}`}
                      className="text-hltv-link hover:text-hltv-link-hover"
                    >
                      {lang === 'en' ? (track.titleEn || track.title) : track.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 右栏 */}
        <div className="space-y-4">
          {/* 成绩数据 */}
          <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
            <h2 className="text-hltv-accent text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b border-hltv-border">
              {t('songDetail.statsTitle')}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {/* 播放量 */}
              <StatBox
                label={t('songDetail.streams')}
                value={song.streams ? formatCompact(song.streams) : '—'}
                sub={song.streams ? song.streams.toLocaleString('en-US') : ''}
                rank={`${t('songDetail.streamsRank')} #${streamsRank}`}
              />
              {/* 销量 */}
              <StatBox
                label={t('songDetail.sales')}
                value={song.sales ? song.sales.toLocaleString('en-US') : '—'}
                rank={`${t('songDetail.salesRank')} #${salesRank}`}
              />
            </div>
            <p className="text-hltv-text-dim text-xs mt-3">
              {t('songDetail.rankScope', { total: songs.length })}
            </p>
          </div>

          {/* 演唱阵容（链接到选手页） */}
          <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
            <h2 className="text-hltv-accent text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b border-hltv-border">
              {t('songDetail.performers')}
            </h2>
            {performerPlayers.length ? (
              <div className="flex flex-wrap gap-2">
                {performerPlayers.map(({ name, player }) => {
                  const isCenter = (song.center || []).includes(name)
                  // 角色代表色圆点 + HLTV 命名格式显示名
                  const color = player?.characterColor || '#8a919c'
                  const content = (
                    <>
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
                      {player ? getDisplayName(player, lang) : name}
                      {isCenter && (
                        <span className="ml-1 px-1 rounded text-xs font-bold bg-hltv-accent/20 text-hltv-accent">
                          C
                        </span>
                      )}
                    </>
                  )
                  return player ? (
                    <Link
                      key={name}
                      to={`/players/${player.id}`}
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-sm bg-hltv-bg-hover text-hltv-text hover:text-hltv-link transition-colors"
                    >
                      {content}
                    </Link>
                  ) : (
                    <span
                      key={name}
                      className="inline-flex items-center gap-1.5 px-2 py-1 rounded text-sm bg-hltv-bg-hover text-hltv-text-dim"
                    >
                      {content}
                    </span>
                  )
                })}
              </div>
            ) : (
              <p className="text-hltv-text-dim text-sm">{t('songDetail.performersTbd')}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

/**
 * 信息行子组件（标签 + 值）
 */
function InfoRow({ label, children }) {
  return (
    <div className="flex items-baseline gap-3">
      <dt className="text-hltv-text-dim w-20 shrink-0">{label}</dt>
      <dd className="text-hltv-text">{children}</dd>
    </div>
  )
}

/**
 * 成绩数据块子组件（大数字 + 排名）
 */
function StatBox({ label, value, sub, rank }) {
  return (
    <div className="bg-hltv-bg rounded p-3">
      <div className="text-hltv-text-dim text-xs uppercase">{label}</div>
      <div className="text-2xl font-bold text-hltv-text-bright mt-1">{value}</div>
      {sub && <div className="text-hltv-text-dim text-xs">{sub}</div>}
      {rank && <div className="text-hltv-text-dim text-xs mt-1">{rank}</div>}
    </div>
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

export default SongDetail
