import { useParams, Link } from 'react-router-dom'
import { getPlayerById, getGroupById, getDisplayName } from '../data/seiyuu'
import { useI18n } from '../i18n'
import {
  getRoleEn,
  getBirthplaceEn,
  getSchoolEn,
  getGradeEn,
  getColorNameEn,
} from '../i18n/dataTranslations'

/**
 * 选手/声优详情页
 * 模仿 HLTV 的选手详情页布局
 * 三次元声优信息优先展示，二次元角色信息并列展示
 */
function PlayerDetail() {
  const { id } = useParams()
  const { lang, t } = useI18n()
  const player = getPlayerById(id)

  // 选手不存在时的处理
  if (!player) {
    return (
      <div className="p-8 text-center">
        <p className="text-hltv-text-dim text-lg">{t('playerDetail.notFound')}</p>
        <Link to="/players" className="text-hltv-link mt-2 inline-block">
          {t('playerDetail.backToPlayers')}
        </Link>
      </div>
    )
  }

  const group = getGroupById(player.groupId)
  const displayName = getDisplayName(player, lang)
  const rating = calculateRating(player)

  return (
    <div className="p-4 max-w-5xl">
      {/* 返回链接 */}
      <Link
        to="/players"
        className="text-hltv-text-dim text-sm hover:text-hltv-text mb-3 inline-block"
      >
        {t('playerDetail.allPlayers')}
      </Link>

      {/* 选手名称区域 - HLTV 风格的大标题 */}
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-hltv-border">
        {/* 角色代表色大色块 */}
        <div
          className="w-16 h-16 rounded-lg shrink-0 flex items-center justify-center"
          style={{ backgroundColor: `${player.characterColor}33`, border: `2px solid ${player.characterColor}` }}
        >
          <span className="text-2xl font-bold" style={{ color: player.characterColor }}>
            {player.characterName.charAt(0)}
          </span>
        </div>
        <div>
          {/* 显示名 - 名 "角色名" 姓 格式 */}
          <h1 className="text-3xl font-bold text-hltv-text-bright">
            {displayName}
          </h1>
          {/* 声优全名（日语）+ 罗马音，英文模式下顺序调换 */}
          <p className="text-hltv-text-dim text-sm mt-1">
            {lang === 'en'
              ? `${player.romajiName} / ${player.fullName}`
              : `${player.fullName} / ${player.romajiName}`}
          </p>
        </div>
        {/* 综合评分 */}
        <div className="ml-auto text-center">
          <div className="text-3xl font-bold" style={{ color: getRatingColor(rating) }}>
            {rating.toFixed(2)}
          </div>
          <div className="text-hltv-text-dim text-xs uppercase">{t('playerDetail.rating')}</div>
        </div>
      </div>

      {/* 企划标签 */}
      <div className="flex items-center gap-2 mb-6">
        <Link
          to={`/teams/${group.id}`}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-sm"
          style={{
            backgroundColor: `${group.color}22`,
            color: group.color,
          }}
        >
          <span className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
          {group.fullName}
        </Link>
        <span className="text-hltv-text-dim text-sm">
          {lang === 'en' ? getRoleEn(player.role) : player.role}
        </span>
      </div>

      {/* 双栏信息区：声优(三次元) | 角色(二次元) */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* 左栏：声优（三次元）信息 - 优先展示 */}
        <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
          <h2 className="text-hltv-accent text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b border-hltv-border">
            {t('playerDetail.seiyuuInfo')}
          </h2>
          <dl className="space-y-2 text-sm">
            <InfoRow label={t('playerDetail.labels.name')} value={lang === 'en' ? player.romajiName : player.fullName} />
            <InfoRow label={t('playerDetail.labels.romaji')} value={player.romajiName} />
            <InfoRow label={t('playerDetail.labels.birthday')} value={formatDate(player.birthdate, lang)} />
            <InfoRow label={t('playerDetail.labels.birthplace')} value={lang === 'en' ? getBirthplaceEn(player.birthplace) : player.birthplace} />
            <InfoRow label={t('playerDetail.labels.bloodType')} value={player.bloodType} />
            <InfoRow label={t('playerDetail.labels.height')} value={`${player.height} ${t('playerDetail.heightUnit')}`} />
            <InfoRow label={t('playerDetail.labels.agency')} value={player.agency} />
            <InfoRow label={t('playerDetail.labels.debut')} value={player.debutYear} />
            <InfoRow label={t('playerDetail.labels.age')} value={`${calcAge(player.birthdate)} ${t('playerDetail.years')}`} />
          </dl>
        </div>

        {/* 右栏：角色（二次元）信息 */}
        <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
          <h2
            className="text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b border-hltv-border"
            style={{ color: player.characterColor }}
          >
            {t('playerDetail.characterInfo')}
          </h2>
          <dl className="space-y-2 text-sm">
            <InfoRow label={t('playerDetail.labels.name')} value={lang === 'en' ? player.characterRomaji : player.characterFullName} />
            <InfoRow label={t('playerDetail.labels.romaji')} value={player.characterRomaji} />
            <InfoRow label={t('playerDetail.labels.school')} value={lang === 'en' ? getSchoolEn(player.characterSchool) : player.characterSchool} />
            <InfoRow label={t('playerDetail.labels.grade')} value={lang === 'en' ? getGradeEn(player.characterGrade) : player.characterGrade} />
            <InfoRow label={t('playerDetail.labels.age')} value={`${player.characterAge} ${t('playerDetail.years')}`} />
            <InfoRow label={t('playerDetail.labels.color')} value={lang === 'en' ? getColorNameEn(player.characterColorName) : player.characterColorName}>
              <span
                className="inline-block w-3 h-3 rounded-full ml-1 align-middle"
                style={{ backgroundColor: player.characterColor }}
              />
            </InfoRow>
          </dl>
        </div>
      </div>

      {/* 统计数据网格 - HLTV 风格的数据展示 */}
      <div className="mb-6">
        <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider mb-3">
          {t('playerDetail.statistics')}
        </h2>
        <div className="grid grid-cols-6 gap-2">
          <StatCard label={t('playerDetail.statLabels.lives')} value={player.stats.liveCount} />
          <StatCard label={t('playerDetail.statLabels.songs')} value={player.stats.songCount} />
          <StatCard label={t('playerDetail.statLabels.solo')} value={player.stats.soloCount} />
          <StatCard label={t('playerDetail.statLabels.cds')} value={player.stats.cdCount} />
          <StatCard label={t('playerDetail.statLabels.events')} value={player.stats.eventCount} />
          <StatCard label={t('playerDetail.statLabels.fans')} value={formatNumber(player.stats.fanclubMembers)} />
        </div>
      </div>

      {/* 描述 */}
      <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
        <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider mb-2">
          {t('playerDetail.about')}
        </h2>
        <p className="text-hltv-text text-sm leading-relaxed">
          {player.description}
        </p>
      </div>
    </div>
  )
}

/**
 * 信息行子组件
 */
function InfoRow({ label, value, children }) {
  return (
    <div className="flex justify-between items-center">
      <dt className="text-hltv-text-dim">{label}</dt>
      <dd className="text-hltv-text font-medium">
        {value}{children}
      </dd>
    </div>
  )
}

/**
 * 统计卡片子组件
 */
function StatCard({ label, value }) {
  return (
    <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-3 text-center">
      <div className="text-2xl font-bold text-hltv-text-bright">{value}</div>
      <div className="text-hltv-text-dim text-xs uppercase mt-1">{label}</div>
    </div>
  )
}

/**
 * 日期格式化
 * 英文模式下使用 MM/DD/YYYY 格式，中文模式下使用 YYYY-MM-DD 格式
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
 * 数字格式化（千分位）
 */
function formatNumber(num) {
  return num.toLocaleString('en-US')
}

/**
 * 根据生日计算年龄
 */
function calcAge(birthdate) {
  const today = new Date()
  const birth = new Date(birthdate)
  let age = today.getFullYear() - birth.getFullYear()
  const m = today.getMonth() - birth.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

/**
 * 计算综合评分
 */
function calculateRating(player) {
  const { liveCount, songCount, soloCount, cdCount, eventCount, fanclubMembers } = player.stats
  const score =
    liveCount * 0.05 +
    songCount * 0.02 +
    soloCount * 0.03 +
    cdCount * 0.01 +
    eventCount * 0.005 +
    (fanclubMembers / 10000) * 0.01
  return Math.min(score, 1.50)
}

/**
 * 根据评分获取颜色
 */
function getRatingColor(rating) {
  if (rating >= 1.20) return '#5fb048'
  if (rating >= 1.05) return '#d4a017'
  if (rating >= 0.90) return '#cad0d6'
  return '#e05555'
}

export default PlayerDetail
