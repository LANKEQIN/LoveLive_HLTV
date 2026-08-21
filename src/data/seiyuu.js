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
export { ANIME_DEBUTS, GRADUATIONS } from './timeline'
export { HISTORY_MILESTONES } from './history'
export { TRANSFERS } from './transfers'

import { players } from './players'
import { groups } from './groups'
import { lives } from './lives'
import { songs } from './songs'
import { discs } from './discs'
import { relationships } from './relationships'
import { events } from './events'
import { ANIME_DEBUTS, GRADUATIONS } from './timeline'
import { HISTORY_MILESTONES } from './history'
import { TRANSFERS } from './transfers'

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

// ==================== 首页动态流（Phase 6.1） ====================
//
// 新闻条目统一结构：
//   {
//     id:       数据源中的 ID（拼 React key 用）
//     type:     'release' 唱片发行 | 'live' Live 举办 | 'member' 成员加入/体制变更 | 'graduation' 毕业
//     discType: 唱片细分类型（仅 release，single/album/mini-album/digital，用于徽章文案）
//     date:     日期字符串（不同数据源精度不同：YYYY-MM-DD / YYYY-MM）
//     groupId / groupIds: 归属企划（用于企划标签展示）
//     title / titleEn: 标题中英文
//     link:     内链（唱片详情 / Live 详情 / 大事记）
//   }

/**
 * 获取首页「最新动态」新闻流（数据层面的动态，按日期新 → 旧）
 * 来源三类：discs（新唱片发行）、lives（Live 举办）、
 * 大事记 member/graduation 里程碑（成员加入 / 毕业）
 * @param {number} limit 返回条数上限
 */
export function getNewsFeed(limit = 15) {
  const items = []

  // 1. 新唱片发行（单曲/专辑/数字单曲）
  discs.forEach(disc => {
    if (!disc.releaseDate) return
    items.push({
      id: disc.id,
      type: 'release',
      discType: disc.type,
      date: disc.releaseDate,
      groupId: disc.groupId,
      title: disc.title,
      titleEn: disc.titleEn,
      link: `/discs/${disc.id}`,
    })
  })

  // 2. Live 举办
  lives.forEach(live => {
    items.push({
      id: live.id,
      type: 'live',
      date: live.date,
      groupIds: live.groupIds,
      title: live.name,
      titleEn: live.nameEn || live.name,
      link: `/matches/${live.id}`,
    })
  })

  // 3. 成员加入 / 毕业（复用大事记里程碑；关联 Live 时优先内链场次详情）
  HISTORY_MILESTONES.forEach(m => {
    if (m.type !== 'member' && m.type !== 'graduation') return
    items.push({
      id: m.id,
      type: m.type,
      date: m.date,
      groupId: m.groupId,
      title: m.title,
      titleEn: m.titleEn,
      link: m.liveId ? `/matches/${m.liveId}` : '/history',
    })
  })

  return items.sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit)
}

/**
 * 获取最近的 Live 结果（按日期新 → 旧，用于首页左栏"最近赛果"）
 * @param {number} limit 返回条数上限
 */
export function getRecentLives(limit = 8) {
  return [...lives]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit)
}

// ==================== 选手生涯时间线（Phase 5.4） ====================
//
// 节点统一结构（结构化字段，由组件负责渲染文案）：
//   {
//     type:      'debut' | 'join' | 'solo' | 'event' | 'firstLive' |   // 声优视角
//                'reveal' | 'anime' | 'center' | 'graduation',          // 角色视角
//     date:      'YYYY' | 'YYYY-MM' | 'YYYY-MM-DD'（与 precision 对应）
//     precision: 'year' | 'month' | 'day'
//     link:      内链（可选，指向歌曲/Live/活动详情页）
//     group / character / song / disc / live / event / milestone: 按类型携带的载荷
//   }

// 内部辅助：时间线节点按日期升序（字符串比较对 YYYY / YYYY-MM / YYYY-MM-DD 均成立）
function byTimelineDateAsc(a, b) {
  return (a.date || '').localeCompare(b.date || '')
}

// 内部辅助：获取角色参与演唱且带发行日期的歌曲（按发行日期升序）
function getReleasedSongsByPerformer(characterName) {
  return songs
    .filter(s => s.releaseDate && Array.isArray(s.performers) && s.performers.includes(characterName))
    .sort((a, b) => s0(a).localeCompare(s0(b)))
}
function s0(song) {
  return song.releaseDate || ''
}

/**
 * 获取选手生涯时间线（声优视角 + 角色视角）
 *
 * 声优视角：声优出道 → 加入企划（首次 CD 参与）→ Solo 曲发行 → 重大活动 → 初次 Live 出演
 * 角色视角：角色 CD 初披露 → 动画登场 → Center 担当曲 → 毕业/活动休止
 *
 * @param {object} player players.js 中的选手对象
 * @returns {{ seiyuu: Array, character: Array }} 两组按日期升序的节点
 */
export function getCareerTimeline(player) {
  if (!player) return { seiyuu: [], character: [] }

  const group = getGroupById(player.groupId)
  const charName = player.characterName
  const releasedSongs = getReleasedSongsByPerformer(charName)
  const firstSong = releasedSongs[0] || null

  const seiyuu = []
  const character = []

  // ===== 声优视角 =====

  // 1. 声优出道（数据仅有年份，用 year 精度）
  if (player.debutYear) {
    seiyuu.push({
      type: 'debut',
      date: String(player.debutYear),
      precision: 'year',
    })
  }

  // 2. 加入企划：以角色名义首次参与 CD（精确到发行日）；
  //    无可考唱片数据时退回企划结成年（year 精度）
  if (firstSong) {
    seiyuu.push({
      type: 'join',
      date: firstSong.releaseDate,
      precision: 'day',
      group,
      character: charName,
      song: firstSong,
      link: `/songs/${firstSong.id}`,
    })
  } else if (group) {
    seiyuu.push({
      type: 'join',
      date: String(group.established),
      precision: 'year',
      group,
    })
  }

  // 3. Solo 曲发行（角色名义 solo，含所属唱片）
  songs
    .filter(s =>
      s.type === 'solo' &&
      s.releaseDate &&
      ((Array.isArray(s.center) && s.center.includes(charName)) ||
        (Array.isArray(s.performers) && s.performers.includes(charName)))
    )
    .sort((a, b) => s0(a).localeCompare(s0(b)))
    .forEach(s => {
      seiyuu.push({
        type: 'solo',
        date: s.releaseDate,
        precision: 'day',
        song: s,
        disc: s.singleId ? getDiscById(s.singleId) : null,
        link: `/songs/${s.id}`,
      })
    })

  // 4. 重大活动：本企划参与的合同祭典 / 周年纪念 / 外部音乐节 / 电视舞台
  events
    .filter(e => e.groupIds.includes(player.groupId))
    .forEach(e => {
      seiyuu.push({
        type: 'event',
        date: e.date,
        precision: 'day',
        event: e,
        link: `/events/${e.id}`,
      })
    })

  // 5. 初次 Live 出演（该声优实际出演的最早场次）
  const myLives = lives
    .filter(l => getLivePerformers(l).some(p => p.id === player.id))
    .sort((a, b) => a.date.localeCompare(b.date))
  if (myLives[0]) {
    seiyuu.push({
      type: 'firstLive',
      date: myLives[0].date,
      precision: 'day',
      live: myLives[0],
      link: `/matches/${myLives[0].id}`,
    })
  }

  // ===== 角色视角 =====

  // 1. 角色 CD 初披露（首次参与唱片）
  if (firstSong) {
    character.push({
      type: 'reveal',
      date: firstSong.releaseDate,
      precision: 'day',
      character: charName,
      song: firstSong,
      link: `/songs/${firstSong.id}`,
    })
  }

  // 2. 动画登场（timeline.js 静态映射，追加成员按角色覆盖）
  const animeBase = ANIME_DEBUTS[player.groupId]
  if (animeBase) {
    const milestone = (animeBase.overrides && animeBase.overrides[charName]) || animeBase
    character.push({
      type: 'anime',
      date: milestone.date,
      precision: milestone.precision,
      milestone,
    })
  }

  // 3. Center 担当曲（组合名义歌曲，不含 solo）
  songs
    .filter(s =>
      s.type !== 'solo' &&
      s.releaseDate &&
      Array.isArray(s.center) && s.center.includes(charName)
    )
    .sort((a, b) => s0(a).localeCompare(s0(b)))
    .forEach(s => {
      character.push({
        type: 'center',
        date: s.releaseDate,
        precision: 'day',
        song: s,
        disc: s.singleId ? getDiscById(s.singleId) : null,
        link: `/songs/${s.id}`,
      })
    })

  // 4. 毕业 / 活动休止节点（timeline.js 静态维护）
  const graduation = GRADUATIONS.find(g => g.characterName === charName)
  if (graduation) {
    character.push({
      type: 'graduation',
      date: graduation.date,
      precision: graduation.precision,
      milestone: graduation,
    })
  }

  return {
    seiyuu: seiyuu.sort(byTimelineDateAsc),
    character: character.sort(byTimelineDateAsc),
  }
}

// ==================== "转会"系统（Phase 6.2） ====================

/**
 * 获取选手的生涯变动记录（加入/毕业/活动休止/声优交棒，按日期新 -> 旧）
 * 用于 PlayerDetail 页的"生涯变动"卡片（HLTV 转会历史映射）
 * @param {string} playerId players.js 中的选手 id
 */
export function getTransfersByPlayer(playerId) {
  return TRANSFERS
    .filter(t => t.playerId === playerId)
    .sort((a, b) => b.date.localeCompare(a.date))
}

// ==================== 选手成就系统（Phase 6.3，HLTV Trophies 映射） ====================
//
// 成就条目统一结构：
//   {
//     type:    'center' Center 担当曲 | 'solo' Solo 曲 | 'dome' 巨蛋公演 | 'koshien' 甲子園出演
//     count:   次数（Center/Solo 为曲目数，Dome 为场次总数，Koshien 为出演届数）
//     entries: 成就明细（可内链明细页的对象数组，dome 为按场馆分组的 venues）
//   }

// 含"ドーム"字样但并非巨蛋本体的场馆（東京ドームシティホール为约 3000 人小型 Hall）
const NON_DOME_VENUES = ['東京ドームシティホール']

// 内部辅助：判断 Live 是否为巨蛋级场馆公演
// 判定规则：场馆名含"ドーム/Dome"且不在排除名单（覆盖東京/名古屋/メットライフ/ベルーナ等日本巨蛋）
function isDomeLive(live) {
  if (!live.venue) return false
  if (NON_DOME_VENUES.includes(live.venue)) return false
  return live.venue.includes('ドーム') || (live.venueEn || '').includes('Dome')
}

// 内部辅助：判断 Live 是否为甲子園活动（ユニット甲子園系列合同 Live）
function isKoshienLive(live) {
  return (live.name || '').includes('甲子園') || (live.nameEn || '').includes('Koshien')
}

/**
 * 获取选手的 MVP 式荣誉列表（HLTV Trophies 映射，全部从 songs/lives 数据动态推导）
 * 四类荣誉（count 为 0 的类别不返回）：
 *   - center  组合名义歌曲中担任 Center 的曲目数（多人 Center 各自计 1 次）
 *   - solo    角色名义 Solo 曲数量
 *   - dome    巨蛋级场馆公演出演次数（按场馆分组明细，链接各场馆公演）
 *   - koshien ユニット甲子園等"甲子園"系出演届数
 * @param {object} player players.js 中的选手对象
 * @returns {Array<{type, count, entries}>} 成就数组
 */
export function getPlayerTrophies(player) {
  if (!player) return []
  const charName = player.characterName
  const trophies = []

  // 1. Center 担当曲（组合名义，不含 solo；按发行日期升序，内链歌曲详情页）
  const centerSongs = songs
    .filter(s => s.type !== 'solo' && Array.isArray(s.center) && s.center.includes(charName))
    .sort((a, b) => (a.releaseDate || '').localeCompare(b.releaseDate || ''))
  if (centerSongs.length > 0) {
    trophies.push({
      type: 'center',
      count: centerSongs.length,
      entries: centerSongs.map(s => ({
        id: s.id,
        title: s.title,
        titleEn: s.titleEn || s.title,
        link: `/songs/${s.id}`,
      })),
    })
  }

  // 2. Solo 曲（角色名义 solo，与生涯时间线口径一致：center 或 performers 含该角色）
  const soloSongs = songs
    .filter(s =>
      s.type === 'solo' &&
      ((Array.isArray(s.center) && s.center.includes(charName)) ||
        (Array.isArray(s.performers) && s.performers.includes(charName)))
    )
    .sort((a, b) => (a.releaseDate || '').localeCompare(b.releaseDate || ''))
  if (soloSongs.length > 0) {
    trophies.push({
      type: 'solo',
      count: soloSongs.length,
      entries: soloSongs.map(s => ({
        id: s.id,
        title: s.title,
        titleEn: s.titleEn || s.title,
        link: `/songs/${s.id}`,
      })),
    })
  }

  // 3. 巨蛋公演（选手实际出演的巨蛋级场馆 Live，剔除缺席成员）
  const domeLives = lives
    .filter(l => isDomeLive(l) && getLivePerformers(l).some(p => p.id === player.id))
    .sort((a, b) => a.date.localeCompare(b.date))
  if (domeLives.length > 0) {
    // 按场馆分组计数（每场馆链向该场馆最近一次出演的 Live 详情）
    const venueMap = new Map()
    domeLives.forEach(l => {
      if (!venueMap.has(l.venue)) {
        venueMap.set(l.venue, { venue: l.venue, venueEn: l.venueEn || l.venue, count: 0, latestLiveId: l.id })
      }
      const v = venueMap.get(l.venue)
      v.count++
      v.latestLiveId = l.id
    })
    trophies.push({
      type: 'dome',
      count: domeLives.length,
      entries: [...venueMap.values()].map(v => ({
        id: v.latestLiveId,
        title: v.venue,
        titleEn: v.venueEn,
        count: v.count,
        link: `/matches/${v.latestLiveId}`,
      })),
    })
  }

  // 4. 甲子園出演（ユニット甲子園系列，标签取活动名，内链 Live 详情页）
  const koshienLives = lives
    .filter(l => isKoshienLive(l) && getLivePerformers(l).some(p => p.id === player.id))
    .sort((a, b) => a.date.localeCompare(b.date))
  if (koshienLives.length > 0) {
    trophies.push({
      type: 'koshien',
      count: koshienLives.length,
      entries: koshienLives.map(l => ({
        id: l.id,
        title: l.name,
        titleEn: l.nameEn || l.name,
        link: `/matches/${l.id}`,
      })),
    })
  }

  return trophies
}

// ==================== 生涯数据曲线（Phase 6.4） ====================
//
// 年度活动条目结构：
//   {
//     year:     年份（number）
//     lives:    当年 Live 出演场次（实际出演，剔除缺席）
//     songs:    当年参与演唱的歌曲数（以角色名义，含 solo）
//     solo:     其中 Solo 曲数
//     events:   当年本企划参与的大型活动数
//     activity: 活动量合计（lives + songs）
//     rating:   年度评分（见下方口径说明，保留两位小数）
//   }
//
// 年度评分口径：沿用站点综合评分权重按"当年增量"计算
//   （lives×0.05 + songs×0.02 + solo×0.03 + events×0.005，上限 1.50），
//   粉丝数/唱片数无年度数据不计入；数值低于生涯累计评分属正常（单年产出 vs 历年累计）。

/**
 * 获取选手历年活动量与年度评分（Phase 6.4，PlayerDetail 生涯数据曲线数据源）
 * 全部从 lives/songs/events 数据动态推导，首尾年份之间的空档年补 0（保证折线连续），
 * 首尾之外不延伸（μ's 等已休止企划不会拖到当前年份）
 * @param {object} player players.js 中的选手对象
 * @returns {Array<{year, lives, songs, solo, events, activity, rating}>} 按年份升序
 */
export function getCareerActivity(player) {
  if (!player) return []
  const charName = player.characterName
  const yearMap = new Map()

  // 内部辅助：取年份行（不存在则建零值行）
  const ensureYear = dateStr => {
    const year = (dateStr || '').slice(0, 4)
    if (!year) return null
    if (!yearMap.has(year)) {
      yearMap.set(year, { lives: 0, songs: 0, solo: 0, events: 0 })
    }
    return yearMap.get(year)
  }

  // 1. Live 出演（选手实际出演场次，与成就/时间线同一口径）
  lives.forEach(l => {
    if (!getLivePerformers(l).some(p => p.id === player.id)) return
    const row = ensureYear(l.date)
    if (row) row.lives++
  })

  // 2. 歌曲参与（以角色名义演唱且带发行日期；solo 单独计数供评分加权）
  songs.forEach(s => {
    if (!s.releaseDate || !Array.isArray(s.performers) || !s.performers.includes(charName)) return
    const row = ensureYear(s.releaseDate)
    if (!row) return
    row.songs++
    if (s.type === 'solo') row.solo++
  })

  // 3. 大型活动（本企划参与的合同祭典/周年纪念/外部音乐节/电视舞台）
  events.forEach(e => {
    if (!e.groupIds.includes(player.groupId)) return
    const row = ensureYear(e.date)
    if (row) row.events++
  })

  // 无数据直接返回空（组件侧不渲染）
  const years = [...yearMap.keys()].map(Number).sort((a, b) => a - b)
  if (years.length === 0) return []

  // 填补首尾之间的空档年，计算活动量与年度评分
  const result = []
  for (let y = years[0]; y <= years[years.length - 1]; y++) {
    const row = yearMap.get(String(y)) || { lives: 0, songs: 0, solo: 0, events: 0 }
    const rating = Math.min(
      row.lives * 0.05 +
      row.songs * 0.02 +
      row.solo * 0.03 +
      row.events * 0.005,
      1.50
    )
    result.push({
      year: y,
      ...row,
      activity: row.lives + row.songs,
      rating: Number(rating.toFixed(2)),
    })
  }
  return result
}
