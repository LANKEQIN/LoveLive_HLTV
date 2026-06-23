import { Link } from 'react-router-dom'
import { groups, players } from '../data/seiyuu'
import { useI18n } from '../i18n'

/**
 * 左侧边栏组件
 * HLTV 风格的侧边栏，包含企划快速链接和统计信息
 */
function Sidebar() {
  const { t } = useI18n()

  // 计算总统计
  const totalPlayers = players.length
  const totalGroups = groups.length

  return (
    <aside className="w-52 shrink-0 border-r border-hltv-border bg-hltv-bg p-3 space-y-4">
      {/* 企划导航 */}
      <div>
        <h3 className="text-hltv-text-dim text-xs font-bold uppercase tracking-wider mb-2 px-2">
          {t('sidebar.groups')}
        </h3>
        <div className="space-y-1">
          {groups.map(group => (
            <Link
              key={group.id}
              to={`/teams/${group.id}`}
              className="flex items-center justify-between px-2 py-1.5 rounded text-sm text-hltv-text hover:bg-hltv-bg-hover transition-colors group"
            >
              <div className="flex items-center gap-2">
                {/* 企划代表色圆点 */}
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: group.color }}
                />
                <span className="font-medium">{group.name}</span>
              </div>
              <span className="text-hltv-text-dim text-xs">
                {getPlayersByGroupCount(group.id)}{t('sidebar.membersUnit')}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* 分割线 */}
      <div className="border-t border-hltv-border" />

      {/* 快速统计 - HLTV 风格的信息面板 */}
      <div>
        <h3 className="text-hltv-text-dim text-xs font-bold uppercase tracking-wider mb-2 px-2">
          {t('sidebar.statistics')}
        </h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between px-2 py-1">
            <span className="text-hltv-text-dim">{t('sidebar.totalPlayers')}</span>
            <span className="text-hltv-text-bright font-medium">{totalPlayers}</span>
          </div>
          <div className="flex justify-between px-2 py-1">
            <span className="text-hltv-text-dim">{t('sidebar.totalGroups')}</span>
            <span className="text-hltv-text-bright font-medium">{totalGroups}</span>
          </div>
          <div className="flex justify-between px-2 py-1">
            <span className="text-hltv-text-dim">{t('sidebar.totalLives')}</span>
            <span className="text-hltv-text-bright font-medium">27</span>
          </div>
          <div className="flex justify-between px-2 py-1">
            <span className="text-hltv-text-dim">{t('sidebar.totalSongs')}</span>
            <span className="text-hltv-text-bright font-medium">204</span>
          </div>
          <div className="flex justify-between px-2 py-1">
            <span className="text-hltv-text-dim">{t('sidebar.totalCDs')}</span>
            <span className="text-hltv-text-bright font-medium">60</span>
          </div>
        </div>
      </div>

      {/* 分割线 */}
      <div className="border-t border-hltv-border" />

      {/* 关于 */}
      <div>
        <h3 className="text-hltv-text-dim text-xs font-bold uppercase tracking-wider mb-2 px-2">
          {t('sidebar.about')}
        </h3>
        <p className="text-xs text-hltv-text-dim px-2 leading-relaxed">
          {t('sidebar.aboutText')}
        </p>
      </div>
    </aside>
  )
}

// 辅助函数：获取企划成员数量
function getPlayersByGroupCount(groupId) {
  return players.filter(p => p.groupId === groupId).length
}

export default Sidebar
