import { useState } from 'react'
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
import { calculateRating, getRatingColor } from '../utils/rating'

/**
 * 组合/战队详情页
 * 展示企划组合详情：成员列表、成立时间、代表色、总战绩、成员关系图
 */
function TeamDetail() {
  const { id } = useParams()
  const { lang, t } = useI18n()
  const group = getGroupById(id)
  // 关系类型筛选状态：'all' 表示全部类型
  const [relationFilter, setRelationFilter] = useState('all')

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
  // 该组合实际存在的关系类型（用于筛选按钮，仅展示有的类型）
  const availableTypes = [...new Set(relationships.map(r => r.type))]
  // 筛选值兜底：若当前筛选类型在该组合中不存在（如切换组合后残留状态），回退为全部
  const effectiveFilter =
    relationFilter === 'all' || availableTypes.includes(relationFilter) ? relationFilter : 'all'
  // 按筛选条件过滤后的关系列表
  const filteredRelationships =
    effectiveFilter === 'all' ? relationships : relationships.filter(r => r.type === effectiveFilter)
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

      {/* 成员关系图（支持按类型筛选） */}
      <div>
        <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
          <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider">
            {t('teams.relationships')}
          </h2>
          {/* 类型筛选按钮组：全部 + 该组合存在的关系类型 */}
          <div className="flex gap-1">
            <FilterButton
              active={effectiveFilter === 'all'}
              onClick={() => setRelationFilter('all')}
              label={t('teams.filter.all')}
            />
            {availableTypes.map(type => (
              <FilterButton
                key={type}
                active={effectiveFilter === type}
                onClick={() => setRelationFilter(type)}
                label={t(`teams.filter.${type}`)}
                type={type}
              />
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filteredRelationships.map(relation => (
            <RelationCard key={relation.id} relation={relation} lang={lang} t={t} />
          ))}
        </div>
      </div>
    </div>
  )
}

/**
 * 关系类型的视觉配置（标签颜色）
 * officialUnit: 官方小队（金色）/ subunit: 年级组（蓝色）/ cp: CP（粉色）
 * admiration: 跨企划憧憬（淡紫）/ crossUnit: 跨企划组合（绿色）/ sameAgency: 同事务所（橙色）
 */
const RELATION_TYPE_COLORS = {
  officialUnit: '#d4a017',
  subunit: '#5d9eff',
  cp: '#ff6b9d',
  admiration: '#c9a0ff',
  crossUnit: '#5fb048',
  sameAgency: '#e8a33d',
}

/**
 * 关系统计卡片
 * 展示官方小队 / 年级组 / CP / 跨企划关系，及对应成员的角色色
 * - admiration 类型带方向性：from 企划成员 → to 企划成员
 * - 跨企划关系（groupIds 多于 1 个）在成员后追加所属企划徽章
 * - 含 description 的关系展示说明文字
 */
function RelationCard({ relation, lang, t }) {
  const typeColor = RELATION_TYPE_COLORS[relation.type] || '#5d9eff'
  const isAdmiration = relation.type === 'admiration' && relation.from && relation.to
  // 跨企划关系：为每个成员标注所属企划
  const showGroupBadge = Array.isArray(relation.groupIds) && relation.groupIds.length > 1
  const description = lang === 'en' ? relation.descriptionEn : relation.description

  return (
    <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-3 flex flex-col gap-2">
      <div className="flex items-center justify-between gap-2">
        <span className="text-hltv-text-bright font-medium text-sm">
          {lang === 'en' ? relation.nameEn : relation.name}
        </span>
        <span
          className="text-xs px-1.5 py-0.5 rounded shrink-0"
          style={{
            backgroundColor: `${typeColor}22`,
            color: typeColor,
          }}
        >
          {t(`teams.type.${relation.type}`)}
        </span>
      </div>

      {/* 憧憬关系：方向性展示 from → to */}
      {isAdmiration ? (
        <div className="flex items-center gap-x-2 gap-y-1 flex-wrap">
          <GroupLabel groupId={relation.from.groupId} />
          {relation.from.members.map(name => (
            <MemberChip key={name} name={name} />
          ))}
          <span className="text-hltv-accent font-bold">→</span>
          <GroupLabel groupId={relation.to.groupId} />
          {relation.to.members.map(name => (
            <MemberChip key={name} name={name} />
          ))}
        </div>
      ) : (
        <div className="flex items-center gap-2 flex-wrap">
          {relation.members.map(name => (
            <MemberChip key={name} name={name} showGroup={showGroupBadge} />
          ))}
        </div>
      )}

      {/* 关系说明文字 */}
      {description && (
        <p className="text-xs text-hltv-text-dim leading-relaxed">{description}</p>
      )}
    </div>
  )
}

/**
 * 企划名小标签（用于跨企划关系，标注成员所属）
 */
function GroupLabel({ groupId }) {
  const group = getGroupById(groupId)
  if (!group) return null
  return (
    <span
      className="text-xs px-1 py-0.5 rounded"
      style={{ backgroundColor: `${group.color}22`, color: group.color }}
    >
      {group.name}
    </span>
  )
}

/**
 * 成员芯片：角色色圆点 + 角色名（可选企划徽章）
 */
function MemberChip({ name, showGroup }) {
  const player = getPlayerByCharacterName(name)
  const group = showGroup && player ? getGroupById(player.groupId) : null
  return (
    <span className="flex items-center gap-1">
      <span className="flex items-center gap-1.5">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: player?.characterColor || '#888' }}
        />
        <span className="text-xs text-hltv-text">{name}</span>
      </span>
      {group && (
        <span className="text-xs text-hltv-text-dim/70">{group.name}</span>
      )}
    </span>
  )
}

/**
 * 关系类型筛选按钮
 */
function FilterButton({ active, onClick, label, type }) {
  const typeColor = type ? RELATION_TYPE_COLORS[type] : null
  return (
    <button
      onClick={onClick}
      className="text-xs px-2 py-1 rounded border transition-colors cursor-pointer"
      style={{
        backgroundColor: active
          ? typeColor
            ? `${typeColor}33`
            : '#2d3139'
          : 'transparent',
        borderColor: active ? (typeColor || '#4a5058') : '#3a4048',
        color: active ? (typeColor || '#cad0d6') : '#8a919c',
      }}
    >
      {label}
    </button>
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

// 综合评分计算与颜色编码见 src/utils/rating.js（共享模块）

export default TeamDetail
