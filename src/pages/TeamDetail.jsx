import { useParams, Link } from 'react-router-dom'
import {
  getGroupById,
  getPlayersByGroup,
  getLivesByGroup,
  getRelationshipsByGroup,
  getPlayerByCharacterName,
  getDisplayName,
} from '../data/seiyuu'
import { useI18n } from '../i18n'

/**
 * 组合/战队详情页
 * 展示企划组合详情：成员列表、成立时间、代表色、总战绩、成员关系图
 */
function TeamDetail() {
  const { id } = useParams()
  const { lang, t } = useI18n()
  const group = getGroupById(id)

  // 组合不存在时的处理
  if (!group) {
    return (
      <div className="p-8 text-center">
        <p className="text-hltv-text-dim text-lg">{t('teams.notFound')}</p>
        <Link to="/teams" className="text-hltv-link mt-2 inline-block">
          {t('teams.backToTeams')}
        </Link>
      </div>
    )
  }

  const members = getPlayersByGroup(group.id)
  const lives = getLivesByGroup(group.id)
  const relationships = getRelationshipsByGroup(group.id)
  const totalAttendance = lives.reduce((sum, live) => sum + live.attendance, 0)

  return (
    <div className="p-4 max-w-5xl">
      {/* 返回链接 */}
      <Link
        to="/teams"
        className="text-hltv-text-dim text-sm hover:text-hltv-text mb-3 inline-block"
      >
        {t('teams.allTeams')}
      </Link>

      {/* 组合标题区域 */}
      <div className="flex items-center gap-4 mb-6 pb-4 border-b border-hltv-border">
        <div
          className="w-16 h-16 rounded-lg shrink-0 flex items-center justify-center text-2xl font-bold"
          style={{
            backgroundColor: `${group.color}33`,
            color: group.color,
            border: `2px solid ${group.color}`,
          }}
        >
          {group.name.charAt(0)}
        </div>
        <div>
          <h1 className="text-3xl font-bold text-hltv-text-bright">{group.name}</h1>
          <p className="text-hltv-text-dim text-sm mt-1">
            {lang === 'en' ? group.fullName : group.fullName} · {group.series}
          </p>
        </div>
        <div className="ml-auto text-right">
          <div
            className="text-sm font-medium"
            style={{ color: group.color }}
          >
            {lang === 'en' ? group.colorNameEn : group.colorName}
          </div>
          <div className="text-hltv-text-dim text-xs">
            {t('teams.established')}: {group.established}
            {group.disbanded ? ` - ${group.disbanded}` : ''}
          </div>
        </div>
      </div>

      {/* 组合简介 */}
      <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4 mb-6">
        <p className="text-hltv-text text-sm leading-relaxed">
          {lang === 'en' ? group.descriptionEn : group.description}
        </p>
      </div>

      {/* 总战绩统计 */}
      <div className="mb-6">
        <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider mb-3">
          {t('teams.statistics')}
        </h2>
        <div className="grid grid-cols-5 gap-2">
          <StatCard label={t('teams.members')} value={members.length} />
          <StatCard label={t('teams.lives')} value={group.totalLives} />
          <StatCard label={t('teams.songs')} value={group.totalSongs} />
          <StatCard label={t('teams.cds')} value={group.totalCDs} />
          <StatCard label={t('teams.attendance')} value={formatNumber(totalAttendance)} />
        </div>
      </div>

      {/* 成员列表 */}
      <div className="mb-6">
        <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider mb-3">
          {t('teams.roster')}
        </h2>
        <div className="bg-hltv-bg-secondary border border-hltv-border rounded overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-hltv-bg-hover text-hltv-text-dim text-xs uppercase">
                <th className="text-left px-3 py-2 w-10">{t('teams.table.number')}</th>
                <th className="text-left px-3 py-2">{t('teams.table.player')}</th>
                <th className="text-left px-3 py-2">{t('teams.table.character')}</th>
                <th className="text-center px-3 py-2 w-16">{t('teams.table.color')}</th>
                <th className="text-left px-3 py-2 w-32">{t('teams.table.role')}</th>
                <th className="text-center px-3 py-2 w-20">{t('teams.table.rating')}</th>
              </tr>
            </thead>
            <tbody>
              {members.map((player, index) => (
                <tr
                  key={player.id}
                  className="hltv-row border-t border-hltv-border cursor-pointer"
                  onClick={() => window.location.href = `/players/${player.id}`}
                >
                  <td className="px-3 py-2 text-hltv-text-dim">{index + 1}</td>
                  <td className="px-3 py-2">
                    <Link
                      to={`/players/${player.id}`}
                      className="text-hltv-link hover:text-hltv-link-hover font-medium"
                      onClick={e => e.stopPropagation()}
                    >
                      {getDisplayName(player, lang)}
                    </Link>
                  </td>
                  <td className="px-3 py-2 text-hltv-text">
                    {lang === 'en' ? player.characterRomaji : player.characterFullName}
                  </td>
                  <td className="px-3 py-2 text-center">
                    <span
                      className="inline-block w-4 h-4 rounded-full align-middle"
                      style={{ backgroundColor: player.characterColor }}
                    />
                  </td>
                  <td className="px-3 py-2 text-hltv-text-dim text-xs">{player.role}</td>
                  <td className="px-3 py-2 text-center">
                    <span className="font-bold" style={{ color: getRatingColor(calculateRating(player)) }}>
                      {calculateRating(player).toFixed(2)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 成员关系图 */}
      <div>
        <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider mb-3">
          {t('teams.relationships')}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {relationships.map(relation => (
            <RelationCard key={relation.id} relation={relation} lang={lang} />
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * 关系统计卡片
 * 展示小队或 CP 关系，及对应成员的角色色
 */
function RelationCard({ relation, lang }) {
  return (
    <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-3">
      <div className="flex items-center justify-between mb-2">
        <span className="text-hltv-text-bright font-medium text-sm">
          {lang === 'en' ? relation.nameEn : relation.name}
        </span>
        <span
          className="text-xs px-1.5 py-0.5 rounded"
          style={{
            backgroundColor: relation.type === 'cp' ? '#ff6b9d22' : '#5d9eff22',
            color: relation.type === 'cp' ? '#ff6b9d' : '#5d9eff',
          }}
        >
          {relation.type === 'cp' ? 'CP' : 'Subunit'}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {relation.members.map(name => {
          const player = getPlayerByCharacterName(name)
          return (
            <div key={name} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: player?.characterColor || '#888' }}
              />
              <span className="text-xs text-hltv-text">{name}</span>
            </div>
          )
        })}
      </div>
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
 * 数字格式化（千分位）
 */
function formatNumber(num) {
  return num.toLocaleString('en-US')
}

/**
 * 计算综合评分（与 Players 页保持一致）
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

export default TeamDetail
