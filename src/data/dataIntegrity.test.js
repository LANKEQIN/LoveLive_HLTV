/**
 * 数据完整性校验测试（Phase 7.1 第二项）
 * 守护数据文件的引用完整性：所有 player 必含 romajiName/characterRomaji、
 * songs 的 groupId 必须存在于 groups，以及各数据文件之间的交叉引用
 * （setlist→songs、discs.tracks→songs、liveIds→lives、playerId→players 等）
 *
 * 断言风格：收集全部问题后一次性 expect 为空，失败信息可一次列出所有脏数据
 */
import { describe, it, expect } from 'vitest'
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

// ===== 内部辅助 =====

const groupIds = new Set(groups.map(g => g.id))
const playerIds = new Set(players.map(p => p.id))
const characterNames = new Set(players.map(p => p.characterName))
const songIds = new Set(songs.map(s => s.id))
const liveIds = new Set(lives.map(l => l.id))
const discIds = new Set(discs.map(d => d.id))
const eventIds = new Set(events.map(e => e.id))

// 日期支持三种精度：YYYY / YYYY-MM / YYYY-MM-DD
const DATE_RE = /^\d{4}(-\d{2}(-\d{2})?)?$/

// 校验日期格式，返回是否合法
function isValidDate(d) {
  return typeof d === 'string' && DATE_RE.test(d)
}

// 汇总辅助：对集合逐项检查，把不合规项推入 issues（带可定位的上下文）
function collect(collection, label, fn) {
  const issues = []
  collection.forEach((item, i) => {
    const problems = fn(item)
    if (problems && problems.length) {
      issues.push(`${label}[${item.id ?? i}] ${problems.join('; ')}`)
    }
  })
  return issues
}

describe('groups / players 数据完整性', () => {
  it('组合 id 唯一', () => {
    const ids = groups.map(g => g.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('所有 player 必含 romajiName 与 characterRomaji（英文显示依赖，非空字符串）', () => {
    const issues = collect(players, 'player', p => {
      const problems = []
      if (typeof p.romajiName !== 'string' || p.romajiName.trim() === '') problems.push(`romajiName 缺失/为空: ${p.romajiName}`)
      if (typeof p.characterRomaji !== 'string' || p.characterRomaji.trim() === '') problems.push(`characterRomaji 缺失/为空: ${p.characterRomaji}`)
      return problems
    })
    expect(issues).toEqual([])
  })

  it('player 必含基础字段（id/firstName/characterName/groupId/stats）且 id 与角色名唯一', () => {
    const issues = collect(players, 'player', p => {
      const problems = []
      ;['id', 'firstName', 'characterName', 'groupId', 'stats'].forEach(k => {
        if (!p[k]) problems.push(`缺少字段 ${k}`)
      })
      return problems
    })
    expect(issues).toEqual([])

    const ids = players.map(p => p.id)
    expect(new Set(ids).size, 'player.id 有重复').toBe(ids.length)

    const chars = players.map(p => p.characterName)
    expect(new Set(chars).size, 'characterName 有重复（getPlayerByCharacterName 会失准）').toBe(chars.length)
  })

  it('player.groupId 必须存在于 groups', () => {
    const issues = players.filter(p => !groupIds.has(p.groupId)).map(p => `${p.id}: ${p.groupId}`)
    expect(issues).toEqual([])
  })

  it('player.stats 六项统计齐全且为非负数值', () => {
    const issues = collect(players, 'player', p => {
      const problems = []
      const fields = ['liveCount', 'songCount', 'soloCount', 'cdCount', 'eventCount', 'fanclubMembers']
      fields.forEach(k => {
        if (typeof p.stats?.[k] !== 'number' || Number.isNaN(p.stats[k]) || p.stats[k] < 0) {
          problems.push(`stats.${k} 非法: ${p.stats?.[k]}`)
        }
      })
      return problems
    })
    expect(issues).toEqual([])
  })
})

describe('songs 数据完整性', () => {
  it('song.id 唯一', () => {
    const ids = songs.map(s => s.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('songs 的 groupId 必须存在于 groups', () => {
    const issues = songs.filter(s => !groupIds.has(s.groupId)).map(s => `${s.id}: ${s.groupId}`)
    expect(issues).toEqual([])
  })

  it('song.singleId（若存在）必须指向 discs 中的唱片', () => {
    const issues = songs.filter(s => s.singleId && !discIds.has(s.singleId)).map(s => `${s.id}: ${s.singleId}`)
    expect(issues).toEqual([])
  })

  it('song 的 center / performers（若存在）必须是已录角色名', () => {
    const issues = collect(songs, 'song', s => {
      const problems = []
      ;['center', 'performers'].forEach(k => {
        if (!Array.isArray(s[k])) return
        s[k].forEach(c => {
          if (!characterNames.has(c)) problems.push(`${k} 含未知角色「${c}」`)
        })
      })
      return problems
    })
    expect(issues).toEqual([])
  })

  it('song.releaseDate（若存在）格式合法（YYYY / YYYY-MM / YYYY-MM-DD）', () => {
    const issues = songs.filter(s => s.releaseDate && !isValidDate(s.releaseDate)).map(s => `${s.id}: ${s.releaseDate}`)
    expect(issues).toEqual([])
  })
})

describe('discs 数据完整性', () => {
  it('disc.id 唯一', () => {
    const ids = discs.map(d => d.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('disc.groupId 必须存在于 groups', () => {
    const issues = discs.filter(d => !groupIds.has(d.groupId)).map(d => `${d.id}: ${d.groupId}`)
    expect(issues).toEqual([])
  })

  it('disc.tracks 中的曲目 id 必须存在于 songs', () => {
    const issues = collect(discs, 'disc', d => {
      const problems = []
      ;(d.tracks || []).forEach(tid => {
        if (!songIds.has(tid)) problems.push(`收录曲「${tid}」未录入 songs`)
      })
      return problems
    })
    expect(issues).toEqual([])
  })

  it('disc.releaseDate（若存在）格式合法', () => {
    const issues = discs.filter(d => d.releaseDate && !isValidDate(d.releaseDate)).map(d => `${d.id}: ${d.releaseDate}`)
    expect(issues).toEqual([])
  })
})

describe('lives 数据完整性', () => {
  it('live.id 唯一', () => {
    const ids = lives.map(l => l.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('live.groupIds 非空且全部存在于 groups', () => {
    const issues = collect(lives, 'live', l => {
      const problems = []
      if (!Array.isArray(l.groupIds) || l.groupIds.length === 0) problems.push('groupIds 缺失/为空')
      else l.groupIds.forEach(gid => { if (!groupIds.has(gid)) problems.push(`未知 groupId「${gid}」`) })
      return problems
    })
    expect(issues).toEqual([])
  })

  it('live.setlist 中的 songId 必须存在于 songs（纯文本条目不受限）', () => {
    const issues = collect(lives, 'live', l => {
      const problems = []
      ;(l.setlist || []).forEach(e => {
        if (e && typeof e === 'object' && e.songId && !songIds.has(e.songId)) {
          problems.push(`歌单曲目「${e.songId}」未录入 songs`)
        }
      })
      return problems
    })
    expect(issues).toEqual([])
  })

  it('live.performers 中的选手 id 必须存在于 players', () => {
    const issues = collect(lives, 'live', l => {
      const problems = []
      ;(l.performers || []).forEach(pid => {
        if (!playerIds.has(pid)) problems.push(`出演选手「${pid}」未录入 players`)
      })
      return problems
    })
    expect(issues).toEqual([])
  })

  it('live.memberStatus 中的 playerId 必须存在于 players', () => {
    const issues = collect(lives, 'live', l => {
      const problems = []
      ;(l.memberStatus || []).forEach(s => {
        if (!playerIds.has(s.playerId)) problems.push(`出席明细引用未知选手「${s.playerId}」`)
        if (!['absent', 'partial'].includes(s.attendance)) problems.push(`attendance 非法: ${s.attendance}`)
      })
      return problems
    })
    expect(issues).toEqual([])
  })

  it('live.date 格式合法', () => {
    const issues = lives.filter(l => !isValidDate(l.date)).map(l => `${l.id}: ${l.date}`)
    expect(issues).toEqual([])
  })
})

describe('events / relationships 数据完整性', () => {
  it('event.id 唯一', () => {
    const ids = events.map(e => e.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('event.groupIds 非空且全部存在于 groups', () => {
    const issues = collect(events, 'event', e => {
      const problems = []
      if (!Array.isArray(e.groupIds) || e.groupIds.length === 0) problems.push('groupIds 缺失/为空')
      else e.groupIds.forEach(gid => { if (!groupIds.has(gid)) problems.push(`未知 groupId「${gid}」`) })
      return problems
    })
    expect(issues).toEqual([])
  })

  it('event.liveIds（若存在）必须存在于 lives', () => {
    const issues = collect(events, 'event', e => {
      const problems = []
      ;(e.liveIds || []).forEach(lid => {
        if (!liveIds.has(lid)) problems.push(`关联 Live「${lid}」未录入 lives`)
      })
      return problems
    })
    expect(issues).toEqual([])
  })

  it('relationship.id 唯一', () => {
    const ids = relationships.map(r => r.id)
    expect(new Set(ids).size).toBe(ids.length)
  })

  it('relationship 归属合法（groupId 或 groupIds 至少一种，且均存在于 groups）', () => {
    const issues = collect(relationships, 'relationship', r => {
      const problems = []
      const ids = r.groupIds ?? (r.groupId ? [r.groupId] : [])
      if (ids.length === 0) problems.push('缺少 groupId/groupIds 归属')
      ids.forEach(gid => { if (!groupIds.has(gid)) problems.push(`未知 groupId「${gid}」`) })
      return problems
    })
    expect(issues).toEqual([])
  })

  it('relationship.members 均为已录角色名', () => {
    const issues = collect(relationships, 'relationship', r => {
      const problems = []
      ;(r.members || []).forEach(m => {
        if (!characterNames.has(m)) problems.push(`成员「${m}」未录入 players`)
      })
      return problems
    })
    expect(issues).toEqual([])
  })
})

describe('transfers / history / timeline 数据完整性', () => {
  it('transfer.playerId 必须存在于 players，type/date 合法', () => {
    const issues = collect(TRANSFERS, 'transfer', tr => {
      const problems = []
      if (!playerIds.has(tr.playerId)) problems.push(`未知选手「${tr.playerId}」`)
      if (!['join', 'graduation', 'hiatus', 'recast'].includes(tr.type)) problems.push(`type 非法: ${tr.type}`)
      if (!isValidDate(tr.date)) problems.push(`date 非法: ${tr.date}`)
      return problems
    })
    expect(issues).toEqual([])
  })

  it('history 里程碑：id 唯一、groupId 合法、liveId/eventId 引用有效', () => {
    const ids = HISTORY_MILESTONES.map(m => m.id)
    expect(new Set(ids).size).toBe(ids.length)

    const issues = collect(HISTORY_MILESTONES, 'milestone', m => {
      const problems = []
      // 归属支持单企划 groupId 与跨企划 groupIds 两种写法
      const ids = m.groupIds ?? (m.groupId ? [m.groupId] : [])
      if (ids.length === 0) problems.push('缺少 groupId/groupIds 归属')
      ids.forEach(gid => { if (!groupIds.has(gid)) problems.push(`未知 groupId「${gid}」`) })
      if (!isValidDate(m.date)) problems.push(`date 非法: ${m.date}`)
      if (m.liveId && !liveIds.has(m.liveId)) problems.push(`liveId「${m.liveId}」未录入 lives`)
      if (m.eventId && !eventIds.has(m.eventId)) problems.push(`eventId「${m.eventId}」未录入 events`)
      return problems
    })
    expect(issues).toEqual([])
  })

  it('ANIME_DEBUTS 的键均为合法 groupId', () => {
    const issues = Object.keys(ANIME_DEBUTS).filter(k => !groupIds.has(k))
    expect(issues).toEqual([])
  })

  it('GRADUATIONS 的 characterName 均为已录角色名', () => {
    const issues = GRADUATIONS.filter(g => !characterNames.has(g.characterName)).map(g => g.characterName)
    expect(issues).toEqual([])
  })
})
