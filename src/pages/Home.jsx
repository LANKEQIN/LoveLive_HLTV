import { Link } from 'react-router-dom'
import { players, groups, getDisplayName, getGroupById } from '../data/seiyuu'

/**
 * 首页
 * 模仿 HLTV 首页的布局风格
 * 展示企划概览、热门选手和快速导航
 */
function Home() {
  // 按评分排序，取前5名作为 Top Players
  const topPlayers = [...players]
    .sort((a, b) => calculateRating(b) - calculateRating(a))
    .slice(0, 5)

  return (
    <div className="p-4">
      {/* Hero 区域 */}
      <div className="bg-gradient-to-r from-hltv-bg-secondary to-hltv-bg border border-hltv-border rounded-lg p-6 mb-6">
        <h1 className="text-3xl font-bold text-hltv-text-bright mb-2">
          <span className="text-hltv-accent">LoveLive!</span> HLTV
        </h1>
        <p className="text-hltv-text-dim text-sm max-w-2xl">
          以 HLTV 风格展示 LoveLive! 声优与角色数据的非官方粉丝平台。
          名字格式: 声优的名 "角色名" 声优的姓 — 三次元声优信息优先展示。
        </p>
        <div className="flex gap-2 mt-4">
          <Link
            to="/players"
            className="px-4 py-2 bg-hltv-accent text-white rounded text-sm font-medium hover:bg-hltv-accent-hover transition-colors"
          >
            Browse Players →
          </Link>
        </div>
      </div>

      {/* 企划概览 - 类似 HLTV 的赛事/Tournament 卡片 */}
      <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider mb-3">
        Groups
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        {groups.map(group => {
          const memberCount = players.filter(p => p.groupId === group.id).length
          return (
            <Link
              key={group.id}
              to={`/teams/${group.id}`}
              className="bg-hltv-bg-secondary border border-hltv-border rounded-lg p-4 hover:border-hltv-border-light transition-colors block"
            >
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: group.color }}
                />
                <h3 className="text-xl font-bold text-hltv-text-bright">
                  {group.name}
                </h3>
              </div>
              <p className="text-hltv-text-dim text-xs mb-3">{group.description}</p>
              <div className="flex gap-4 text-sm">
                <span className="text-hltv-text-dim">
                  Members: <span className="text-hltv-text-bright">{memberCount}</span>
                </span>
                <span className="text-hltv-text-dim">
                  Lives: <span className="text-hltv-text-bright">{group.totalLives}</span>
                </span>
                <span className="text-hltv-text-dim">
                  Songs: <span className="text-hltv-text-bright">{group.totalSongs}</span>
                </span>
              </div>
            </Link>
          )
        })}
      </div>

      {/* Top Players 排行 - 类似 HLTV 的 Top 20 */}
      <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider mb-3">
        Top Players
      </h2>
      <div className="bg-hltv-bg-secondary border border-hltv-border rounded overflow-hidden mb-6">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-hltv-bg-hover text-hltv-text-dim text-xs uppercase">
              <th className="text-left px-3 py-2 w-10">#</th>
              <th className="text-left px-3 py-2">Player</th>
              <th className="text-left px-3 py-2">Group</th>
              <th className="text-left px-3 py-2">Character</th>
              <th className="text-center px-3 py-2 w-20">Rating</th>
            </tr>
          </thead>
          <tbody>
            {topPlayers.map((player, index) => {
              const group = getGroupById(player.groupId)
              const rating = calculateRating(player)
              return (
                <tr
                  key={player.id}
                  className="hltv-row border-t border-hltv-border"
                >
                  <td className="px-3 py-2 text-hltv-text-dim">{index + 1}</td>
                  <td className="px-3 py-2">
                    <Link
                      to={`/players/${player.id}`}
                      className="text-hltv-link hover:text-hltv-link-hover font-medium"
                    >
                      {getDisplayName(player)}
                    </Link>
                  </td>
                  <td className="px-3 py-2">
                    <span style={{ color: group.color }}>{group.name}</span>
                  </td>
                  <td className="px-3 py-2 text-hltv-text">{player.characterFullName}</td>
                  <td className="px-3 py-2 text-center">
                    <span className="font-bold" style={{ color: getRatingColor(rating) }}>
                      {rating.toFixed(2)}
                    </span>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* 底部信息提示 */}
      <div className="text-center text-xs text-hltv-text-dim">
        More features coming soon: Teams · Matches · Rankings · Stats
      </div>
    </div>
  )
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

export default Home
