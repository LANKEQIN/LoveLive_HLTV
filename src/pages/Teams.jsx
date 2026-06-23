import { Link } from 'react-router-dom'
import { groups, getPlayersByGroup } from '../data/seiyuu'
import { useI18n } from '../i18n'

/**
 * 组合/战队列表页
 * 展示所有企划组合卡片，点击卡片进入详情页
 */
function Teams() {
  const { lang, t } = useI18n()

  return (
    <div className="p-4">
      {/* 页面标题 */}
      <h1 className="text-2xl font-bold text-hltv-text-bright mb-4">
        {t('teams.title')}
        <span className="text-hltv-text-dim text-sm font-normal ml-2">
          ({t('teams.groupCount', { count: groups.length })})
        </span>
      </h1>

      {/* 组合卡片网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {groups.map(group => {
          const members = getPlayersByGroup(group.id)
          return (
            <Link
              key={group.id}
              to={`/teams/${group.id}`}
              className="bg-hltv-bg-secondary border border-hltv-border rounded p-4 hover:border-hltv-border-light transition-colors group"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  {/* 企划代表色大色块 */}
                  <div
                    className="w-14 h-14 rounded-lg flex items-center justify-center text-xl font-bold"
                    style={{
                      backgroundColor: `${group.color}33`,
                      color: group.color,
                      border: `2px solid ${group.color}`,
                    }}
                  >
                    {group.name.charAt(0)}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-hltv-text-bright group-hover:text-hltv-link transition-colors">
                      {group.name}
                    </h2>
                    <p className="text-hltv-text-dim text-sm">
                      {lang === 'en' ? group.descriptionEn : group.description}
                    </p>
                  </div>
                </div>
                <span
                  className="text-xs px-2 py-1 rounded"
                  style={{ backgroundColor: `${group.color}22`, color: group.color }}
                >
                  {group.series}
                </span>
              </div>

              {/* 关键数据 */}
              <div className="grid grid-cols-4 gap-2 text-sm">
                <TeamStat label={t('teams.members')} value={members.length} />
                <TeamStat label={t('teams.lives')} value={group.totalLives} />
                <TeamStat label={t('teams.songs')} value={group.totalSongs} />
                <TeamStat label={t('teams.cds')} value={group.totalCDs} />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

/**
 * 组合统计小卡片
 */
function TeamStat({ label, value }) {
  return (
    <div className="bg-hltv-bg border border-hltv-border rounded p-2 text-center">
      <div className="text-lg font-bold text-hltv-text-bright">{value}</div>
      <div className="text-xs text-hltv-text-dim uppercase">{label}</div>
    </div>
  )
}

export default Teams
