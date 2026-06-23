import { useParams, Link } from 'react-router-dom'
import { getPlayerById, getGroupById, getDisplayName } from '../data/seiyuu'

/**
 * 选手/声优详情页
 * 模仿 HLTV 的选手详情页布局
 * 三次元声优信息优先展示，二次元角色信息并列展示
 */
function PlayerDetail() {
  const { id } = useParams()
  const player = getPlayerById(id)

  // 选手不存在时的处理
  if (!player) {
    return (
      <div className="p-8 text-center">
        <p className="text-hltv-text-dim text-lg">Player not found</p>
        <Link to="/players" className="text-hltv-link mt-2 inline-block">
          ← Back to Players
        </Link>
      </div>
    )
  }

  const group = getGroupById(player.groupId)
  const displayName = getDisplayName(player)
  const rating = calculateRating(player)

  return (
    <div className="p-4 max-w-5xl">
      {/* 返回链接 */}
      <Link
        to="/players"
        className="text-hltv-text-dim text-sm hover:text-hltv-text mb-3 inline-block"
      >
        ← All Players
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
          {/* 声优全名（日语）+ 罗马音 */}
          <p className="text-hltv-text-dim text-sm mt-1">
            {player.fullName} / {player.romajiName}
          </p>
        </div>
        {/* 综合评分 */}
        <div className="ml-auto text-center">
          <div className="text-3xl font-bold" style={{ color: getRatingColor(rating) }}>
            {rating.toFixed(2)}
          </div>
          <div className="text-hltv-text-dim text-xs uppercase">Rating</div>
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
        <span className="text-hltv-text-dim text-sm">{player.role}</span>
      </div>

      {/* 双栏信息区：声优(三次元) | 角色(二次元) */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* 左栏：声优（三次元）信息 - 优先展示 */}
        <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
          <h2 className="text-hltv-accent text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b border-hltv-border">
            Seiyuu Info (三次元)
          </h2>
          <dl className="space-y-2 text-sm">
            <InfoRow label="Name" value={player.fullName} />
            <InfoRow label="Romaji" value={player.romajiName} />
            <InfoRow label="Birthday" value={formatDate(player.birthdate)} />
            <InfoRow label="Birthplace" value={player.birthplace} />
            <InfoRow label="Blood Type" value={player.bloodType} />
            <InfoRow label="Height" value={`${player.height} cm`} />
            <InfoRow label="Agency" value={player.agency} />
            <InfoRow label="Debut" value={player.debutYear} />
            <InfoRow label="Age" value={`${calcAge(player.birthdate)} years`} />
          </dl>
        </div>

        {/* 右栏：角色（二次元）信息 */}
        <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
          <h2
            className="text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b border-hltv-border"
            style={{ color: player.characterColor }}
          >
            Character Info (二次元)
          </h2>
          <dl className="space-y-2 text-sm">
            <InfoRow label="Name" value={player.characterFullName} />
            <InfoRow label="Romaji" value={player.characterRomaji} />
            <InfoRow label="School" value={player.characterSchool} />
            <InfoRow label="Grade" value={player.characterGrade} />
            <InfoRow label="Age" value={`${player.characterAge} years`} />
            <InfoRow label="Color" value={player.characterColorName}>
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
          Statistics
        </h2>
        <div className="grid grid-cols-6 gap-2">
          <StatCard label="Lives" value={player.stats.liveCount} />
          <StatCard label="Songs" value={player.stats.songCount} />
          <StatCard label="Solo" value={player.stats.soloCount} />
          <StatCard label="CDs" value={player.stats.cdCount} />
          <StatCard label="Events" value={player.stats.eventCount} />
          <StatCard label="Fans" value={formatNumber(player.stats.fanclubMembers)} />
        </div>
      </div>

      {/* 描述 */}
      <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
        <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider mb-2">
          About
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
 */
function formatDate(dateStr) {
  const date = new Date(dateStr)
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
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
