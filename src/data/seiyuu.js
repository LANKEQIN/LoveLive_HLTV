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
export { relationships } from './relationships'

import { players } from './players'
import { groups } from './groups'
import { lives } from './lives'
import { songs } from './songs'
import { relationships } from './relationships'

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
export function getRelationshipsByGroup(groupId) {
  return relationships.filter(r => r.groupId === groupId)
}

// 辅助函数：根据角色名获取选手（用于关系图）
export function getPlayerByCharacterName(characterName) {
  return players.find(p => p.characterName === characterName)
}

// 辅助函数：获取指定企划的歌曲
export function getSongsByGroup(groupId) {
  return songs.filter(s => s.groupId === groupId)
}
