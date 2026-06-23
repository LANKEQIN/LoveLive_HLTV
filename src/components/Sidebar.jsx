import { Link } from 'react-router-dom'
import { groups, players } from '../data/seiyuu'

/**
 * 左侧边栏组件
 * HLTV 风格的侧边栏，包含企划快速链接和统计信息
 */
function Sidebar() {
  // 计算总统计
  const totalPlayers = players.length
  const totalGroups = groups.length

  return (
    <aside className="w-52 shrink-0 border-r border-hltv-border bg-hltv-bg p-3 space-y-4">
      {/* 企划导航 */}
      <div>
        <h3 className="text-hltv-text-dim text-xs font-bold uppercase tracking-wider mb-2 px-2">
          Groups
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
                {getPlayersByGroupCount(group.id)}人
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
          Statistics
        </h3>
        <div className="space-y-1 text-sm">
          <div className="flex justify-between px-2 py-1">
            <span className="text-hltv-text-dim">Total Players</span>
            <span className="text-hltv-text-bright font-medium">{totalPlayers}</span>
          </div>
          <div className="flex justify-between px-2 py-1">
            <span className="text-hltv-text-dim">Total Groups</span>
            <span className="text-hltv-text-bright font-medium">{totalGroups}</span>
          </div>
          <div className="flex justify-between px-2 py-1">
            <span className="text-hltv-text-dim">Total Lives</span>
            <span className="text-hltv-text-bright font-medium">27</span>
          </div>
          <div className="flex justify-between px-2 py-1">
            <span className="text-hltv-text-dim">Total Songs</span>
            <span className="text-hltv-text-bright font-medium">204</span>
          </div>
          <div className="flex justify-between px-2 py-1">
            <span className="text-hltv-text-dim">Total CDs</span>
            <span className="text-hltv-text-bright font-medium">60</span>
          </div>
        </div>
      </div>

      {/* 分割线 */}
      <div className="border-t border-hltv-border" />

      {/* 关于 */}
      <div>
        <h3 className="text-hltv-text-dim text-xs font-bold uppercase tracking-wider mb-2 px-2">
          About
        </h3>
        <p className="text-xs text-hltv-text-dim px-2 leading-relaxed">
          LoveLive! HLTV 是一个非官方的粉丝数据平台，
          以 HLTV 风格展示 LoveLive! 声优与角色信息。
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
