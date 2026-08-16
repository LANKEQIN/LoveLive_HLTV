/**
 * LoveLive! HLTV - 数据统一出口
 *
 * 名字格式说明（对应 CS2 的 "名 + ID + 姓"）：
 *   - firstName: 声优的名
 *   - characterName: 对应的二次元角色名（作为 "ID/昵称"）
 *   - lastName: 声优的姓
 *   显示效果: 恵海 "穂乃果" 新田
 *
 * 三次元声优信息优先展示
 */

// 从拆分的模块导入数据
export { groups } from './groups'
export { players } from './players'
export { lives } from './lives'
export { songs } from './songs'
export { discs } from './discs'
export { relationships } from './relationships'
export { events } from './events'

import { players } from './players'
import { groups } from './groups'
import { lives } from './lives'
import { songs } from './songs'
import { discs } from './discs'
import { relationships } from './relationships'
import { events } from './events'

// 辅助函数：从完整罗马音名字中拆分出姓和名
// 例如 "Emi Nitta" -> { firstName: 'Emi', lastName: 'Nitta' }
function parseRomajiName(romajiName) {
  if (!romajiName) return { firstName: '', lastName: '' }
  const parts = romajiName.trim().split(/\s+/)
  if (parts.length === 1) {
    return { firstName: parts[0], lastName: '' }
  }
  const lastName = parts.pop()
  const firstName = parts.join(' ')
  return { firstName, lastName }
}

// 辅助函数：获取 HLTV 风格的显示名（名 "角色名" 姓）
// lang 为 'en' 时使用罗马音显示，否则使用日语原名
export function getDisplayName(player, lang = 'zh') {
  if (lang === 'en') {
    const seiyuu = parseRomajiName(player.romajiName)
    const character = parseRomajiName(player.characterRomaji)
    const characterFirstName = character.firstName || player.characterName
    if (!seiyuu.lastName) {
      return `${seiyuu.firstName} "${characterFirstName}"`
    }
    return `${seiyuu.firstName} "${characterFirstName}" ${seiyuu.lastName}`
  }

  // 默认日语格式
  if (!player.lastName) {
    return `${player.firstName} "${player.characterName}"`
  }
  return `${player.firstName} "${player.characterName}" ${player.lastName}`
}

// 辅助函数：根据 groupId 获取企划信息
export function getGroupById(groupId) {
  return groups.find(g => g.id === groupId)
}

// 辅助函数：获取指定企划的所有成员
export function getPlayersByGroup(groupId) {
  return players.filter(p => p.groupId === groupId)
}

// 辅助函数：根据 id 获取选手
export function getPlayerById(id) {
  return players.find(p => p.id === id)
}

// 辅助函数：获取指定企划的 Live 列表
export function getLivesByGroup(groupId) {
  return lives.filter(l => l.groupIds.includes(groupId))
}

// 辅助函数：根据 id 获取 Live
export function getLiveById(id) {
  return lives.find(l => l.id === id)
}

// 辅助函数：获取指定企划的关系数据
// 兼容两种归属写法：单企划关系 groupId；跨企划关系 groupIds 数组（在所有涉及企划页展示）
export function getRelationshipsByGroup(groupId) {
  return relationships.filter(r => r.groupId === groupId || (Array.isArray(r.groupIds) && r.groupIds.includes(groupId)))
}

// 辅助函数：根据角色名获取选手（用于关系图）
export function getPlayerByCharacterName(characterName) {
  return players.find(p => p.characterName === characterName)
}

// 辅助函数：获取指定企划的歌曲
export function getSongsByGroup(groupId) {
  return songs.filter(s => s.groupId === groupId)
}

// 辅助函数：根据 id 获取歌曲
export function getSongById(id) {
  return songs.find(s => s.id === id)
}

// 辅助函数：获取指定企划的唱片（单曲/专辑）
export function getDiscsByGroup(groupId) {
  return discs.filter(d => d.groupId === groupId)
}

// 辅助函数：根据 id 获取唱片
export function getDiscById(id) {
  return discs.find(d => d.id === id)
}

// 辅助函数：获取指定唱片的所有收录曲（按唱片 tracks 顺序解析歌曲对象）
export function getSongsByDisc(discId) {
  const disc = getDiscById(discId)
  if (!disc) return []
  return disc.tracks.map(trackId => getSongById(trackId)).filter(Boolean)
}

// 辅助函数：获取歌单中包含指定歌曲的所有 Live（按日期升序）
// 用于歌曲详情页的"首次披露 Live"与演出次数统计
export function getLivesBySong(songId) {
  return lives
    .filter(l => (l.setlist || []).some(e => e && e.songId === songId))
    .sort((a, b) => a.date.localeCompare(b.date))
}

// 辅助函数：获取歌曲的首次披露 Live（歌单中最早包含该曲的场次）
export function getSongFirstLive(songId) {
  return getLivesBySong(songId)[0] || null
}

// 辅助函数：解析 Live 歌单条目为可显示对象
// 条目格式：{ songId } 关联歌曲对象；{ title, titleEn } 纯文本；兼容旧的纯字符串格式
// 返回 { song, title, titleEn }（song 为 null 表示未关联歌曲库）
export function resolveSetlistEntry(entry) {
  // 兼容旧版纯文本歌名
  if (typeof entry === 'string') {
    return { song: null, title: entry, titleEn: entry }
  }
  if (!entry) return { song: null, title: '', titleEn: '' }
  if (entry.songId) {
    const song = getSongById(entry.songId)
    if (song) {
      return { song, title: song.title, titleEn: song.titleEn || song.title }
    }
  }
  return { song: null, title: entry.title || '', titleEn: entry.titleEn || entry.title || '' }
}

// 辅助函数：获取 Live 实际出演选手列表
// 优先使用显式 performers 名单（追加期次成员加入前的场次必须显式指定），
// 缺省按 groupIds 组合全员推导，并剔除 memberStatus 中标记全程缺席（absent）的成员
export function getLivePerformers(live) {
  if (!live) return []
  let list
  if (live.performers && live.performers.length) {
    list = live.performers.map(id => getPlayerById(id)).filter(Boolean)
  } else {
    list = players.filter(p => live.groupIds.includes(p.groupId))
  }
  // 剔除全程缺席成员
  const absentIds = (live.memberStatus || [])
    .filter(s => s.attendance === 'absent')
    .map(s => s.playerId)
  return list.filter(p => !absentIds.includes(p.id))
}

// 辅助函数：获取 Live 出演成员明细（缺席 / 部分出演记录），解析为选手对象
export function getLiveMemberStatus(live) {
  if (!live || !live.memberStatus) return []
  return live.memberStatus
    .map(s => ({ ...s, player: getPlayerById(s.playerId) }))
    .filter(s => s.player)
}

// 辅助函数：根据 id 获取大型活动
export function getEventById(id) {
  return events.find(e => e.id === id)
}

// 辅助函数：获取指定企划参与的大型活动（按日期新到旧）
export function getEventsByGroup(groupId) {
  return events
    .filter(e => e.groupIds.includes(groupId))
    .sort((a, b) => b.date.localeCompare(a.date))
}

// 辅助函数：获取活动关联的 Live 对象列表（按日期升序）
export function getLivesByEvent(event) {
  if (!event || !event.liveIds) return []
  return event.liveIds
    .map(id => lives.find(l => l.id === id))
    .filter(Boolean)
    .sort((a, b) => a.date.localeCompare(b.date))
}
