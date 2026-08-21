/**
 * 综合评分（Rating 2.0）计算与颜色编码
 * 供 Players / Rankings / Stats / Compare / Search / Home / PlayerDetail / TeamDetail
 * 等页面共用（原为各页面重复定义，Phase 7.1 提取共享并纳入 Vitest 测试保护）
 */

/**
 * 计算综合评分（模拟 HLTV rating 2.0）
 * 加权口径：Live 权重最高，其次歌曲/solo，粉丝数等
 * @param {object} player players.js 中的选手对象（须含 stats 字段）
 * @returns {number} 评分（上限 1.50）
 */
export function calculateRating(player) {
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
 * 根据评分获取颜色（HLTV 风格的颜色编码）
 * 绿(≥1.20) / 黄(≥1.05) / 白(≥0.90) / 红(<0.90)
 * @param {number} rating 评分
 * @returns {string} 十六进制颜色值
 */
export function getRatingColor(rating) {
  if (rating >= 1.20) return '#5fb048' // 绿色 - 优秀
  if (rating >= 1.05) return '#d4a017' // 黄色 - 良好
  if (rating >= 0.90) return '#cad0d6' // 白色 - 普通
  return '#e05555' // 红色 - 较低
}
