import { useParams, Link } from 'react-router-dom'
import {
  discs,
  getDiscById,
  getGroupById,
  getSongsByDisc,
  getDiscsByGroup,
  getPlayerByCharacterName,
} from '../data/seiyuu'
import { useI18n } from '../i18n'
import { DISC_TYPE_STYLES, oriconColor } from './Discs'
import { TYPE_STYLES } from './Songs'

/**
 * 唱片详情页
 * 展示：封面色块、收录曲列表（链接到歌曲页）、Oricon 峰值排名、销量及排名、
 * 同企划前后发行导航
 */
function DiscDetail() {
  const { id } = useParams()
  const { lang, t } = useI18n()
  const disc = getDiscById(id)

  // 唱片不存在时的处理
  if (!disc) {
    return (
      <div className="p-8 text-center">
        <p className="text-hltv-text-dim text-lg">{t('discDetail.notFound')}</p>
        <Link to="/discs" className="text-hltv-link mt-2 inline-block">
          {t('discDetail.backToDiscs')}
        </Link>
      </div>
    )
  }

  const group = getGroupById(disc.groupId)
  const typeStyle = DISC_TYPE_STYLES[disc.type] || DISC_TYPE_STYLES.single
  // 收录曲（按唱片 tracks 顺序解析；未收录进歌曲库的曲目在 getSongsByDisc 中被过滤）
  const trackSongs = getSongsByDisc(disc.id)
  // 销量排名：全站唱片按销量降序的名次
  const salesRank = [...discs].sort((a, b) => (b.sales || 0) - (a.sales || 0))
    .findIndex(d => d.id === disc.id) + 1
  // 同企划前后发行（按发行日期相邻）
  const groupDiscs = getDiscsByGroup(disc.groupId)
    .slice()
    .sort((a, b) => a.releaseDate.localeCompare(b.releaseDate))
  const index = groupDiscs.findIndex(d => d.id === disc.id)
  const prevDisc = index > 0 ? groupDiscs[index - 1] : null
  const nextDisc = index < groupDiscs.length - 1 ? groupDiscs[index + 1] : null

  return (
    <div className="p-4 max-w-5xl">
      {/* 返回链接 */}
      <Link
        to="/discs"
        className="text-hltv-text-dim text-sm hover:text-hltv-text mb-3 inline-block"
      >
        {t('discDetail.backToDiscs')}
      </Link>

      {/* 标题区域：封面色块 + 唱片名 */}
      <div className="flex items-start gap-4 mb-6 pb-4 border-b border-hltv-border">
        <div
          className="w-20 h-20 rounded-lg shrink-0 flex items-end p-1.5"
          style={{
            background: `linear-gradient(150deg, ${disc.color}, ${disc.color}66)`,
            boxShadow: `inset 0 0 0 2px ${disc.color}`,
          }}
        >
          {/* 光盘中心孔示意，强化"唱片"视觉 */}
          <span className="w-5 h-5 rounded-full bg-hltv-bg-secondary border-2 border-hltv-bg opacity-70" />
        </div>
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-bold text-hltv-text-bright break-words">
            {lang === 'en' ? (disc.titleEn || disc.title) : disc.title}
          </h1>
          {lang === 'en' && disc.titleEn && disc.title !== disc.titleEn && (
            <p className="text-hltv-text-dim text-sm mt-1">{disc.title}</p>
          )}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            {/* 编号说明（1st Single 等） */}
            <span className="text-hltv-text-dim text-sm">{disc.number}</span>
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
              {t(`discs.types.${disc.type}`)}
            </span>
            {/* 发行日期 */}
            {disc.releaseDate && (
              <span className="text-hltv-text-dim text-sm">
                {formatDate(disc.releaseDate, lang)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 两栏布局：成绩数据 + 基本信息 | 收录曲 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 左栏 */}
        <div className="space-y-4">
          {/* 榜单成绩：Oricon 峰值 + 销量 */}
          <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
            <h2 className="text-hltv-accent text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b border-hltv-border">
              {t('discDetail.statsTitle')}
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {/* Oricon 周榜峰值（色编码） */}
              <div className="bg-hltv-bg rounded p-3">
                <div className="text-hltv-text-dim text-xs uppercase">{t('discDetail.oriconPeak')}</div>
                <div className="text-2xl font-bold mt-1" style={{ color: oriconColor(disc.oriconPeak) }}>
                  {disc.oriconPeak ? `#${disc.oriconPeak}` : '—'}
                </div>
              </div>
              {/* 销量 + 全站排名 */}
              <div className="bg-hltv-bg rounded p-3">
                <div className="text-hltv-text-dim text-xs uppercase">{t('discDetail.sales')}</div>
                <div className="text-2xl font-bold text-hltv-text-bright mt-1">
                  {disc.sales ? disc.sales.toLocaleString('en-US') : '—'}
                </div>
                {disc.sales > 0 && (
                  <div className="text-hltv-text-dim text-xs mt-1">
                    {t('discDetail.salesRank')} #{salesRank}
                  </div>
                )}
              </div>
            </div>
            <p className="text-hltv-text-dim text-xs mt-3">
              {t('discDetail.rankScope', { total: discs.length })}
            </p>
          </div>

          {/* 基本信息 */}
          <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
            <h2 className="text-hltv-accent text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b border-hltv-border">
              {t('discDetail.basicInfo')}
            </h2>
            <dl className="space-y-2 text-sm">
              <InfoRow label={t('discDetail.labels.releaseDate')}>
                {disc.releaseDate ? formatDate(disc.releaseDate, lang) : '—'}
              </InfoRow>
              <InfoRow label={t('discDetail.labels.type')}>
                {t(`discs.types.${disc.type}`)}
              </InfoRow>
              <InfoRow label={t('discDetail.labels.catalogNumber')}>
                {disc.catalogNumber || '—'}
              </InfoRow>
              <InfoRow label={t('discDetail.labels.tracks')}>
                {t('discDetail.trackCount', { count: disc.tracks.length })}
              </InfoRow>
            </dl>
          </div>

          {/* 同企划前后发行导航 */}
          {(prevDisc || nextDisc) && (
            <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4 space-y-2">
              {prevDisc && (
                <DiscNavLink
                  label={t('discDetail.prevDisc')}
                  disc={prevDisc}
                  lang={lang}
                  align="left"
                />
              )}
              {nextDisc && (
                <DiscNavLink
                  label={t('discDetail.nextDisc')}
                  disc={nextDisc}
                  lang={lang}
                  align="right"
                />
              )}
            </div>
          )}
        </div>

        {/* 右栏：收录曲列表 */}
        <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
          <h2 className="text-hltv-accent text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b border-hltv-border">
            {t('discDetail.tracklist')}
          </h2>
          {trackSongs.length ? (
            <ol className="divide-y divide-hltv-border">
              {trackSongs.map((song, i) => {
                const type = song.type || 'other'
                const songTypeStyle = TYPE_STYLES[type] || TYPE_STYLES.other
                // Center 阵容解析（可解析者链接到选手页）
                const centers = (song.center || [])
                  .map(name => ({ name, player: getPlayerByCharacterName(name) }))
                return (
                  <li key={song.id} className="hltv-row py-2 flex items-center gap-3 text-sm">
                    {/* 曲目序号（M 编号，HLTV map 风格） */}
                    <span className="text-hltv-text-dim w-8 shrink-0">M{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <Link
                        to={`/songs/${song.id}`}
                        className="text-hltv-link hover:text-hltv-link-hover font-medium"
                      >
                        {lang === 'en' ? (song.titleEn || song.title) : song.title}
                      </Link>
                      {/* Center 成员（带 C 徽章） */}
                      {centers.length > 0 && (
                        <div className="text-hltv-text-dim text-xs mt-0.5 flex items-center gap-1 flex-wrap">
                          <span className="px-1 rounded font-bold bg-hltv-accent/20 text-hltv-accent">C</span>
                          {centers.map(({ name, player }) =>
                            player ? (
                              <Link
                                key={name}
                                to={`/players/${player.id}`}
                                className="hover:text-hltv-text"
                              >
                                {lang === 'en' ? player.characterRomaji : name}
                              </Link>
                            ) : (
                              <span key={name}>{name}</span>
                            )
                          )}
                        </div>
                      )}
                    </div>
                    {/* 歌曲类型徽章 */}
                    <span
                      className="inline-block px-2 py-0.5 rounded text-xs shrink-0"
                      style={{ backgroundColor: `${songTypeStyle.color}22`, color: songTypeStyle.color }}
                    >
                      {t(`songs.types.${type}`)}
                    </span>
                  </li>
                )
              })}
            </ol>
          ) : (
            <p className="text-hltv-text-dim text-sm">{t('discDetail.noTracks')}</p>
          )}
          {/* 收录曲未全部入库时的说明 */}
          {trackSongs.length < disc.tracks.length && (
            <p className="text-hltv-text-dim text-xs mt-3">
              {t('discDetail.partialTracks', {
                listed: trackSongs.length,
                total: disc.tracks.length,
              })}
            </p>
          )}
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
 * 前后发行导航子组件：封面色点 + 唱片名 + 编号
 */
function DiscNavLink({ label, disc, lang, align }) {
  return (
    <div className={`flex items-center gap-2 text-sm ${align === 'right' ? 'justify-end' : ''}`}>
      <span className="text-hltv-text-dim text-xs">{label}</span>
      <span className="w-2.5 h-2.5 rounded shrink-0" style={{ backgroundColor: disc.color }} />
      <Link
        to={`/discs/${disc.id}`}
        className="text-hltv-link hover:text-hltv-link-hover truncate"
      >
        {lang === 'en' ? (disc.titleEn || disc.title) : disc.title}
      </Link>
      <span className="text-hltv-text-dim text-xs shrink-0">{disc.number}</span>
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

export default DiscDetail
