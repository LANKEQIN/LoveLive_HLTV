/**
 * seiyuu.js 辅助函数测试
 * 覆盖：getDisplayName 双语格式、按 id/名称检索、setlist 解析、
 * 出演名单推导、动态流/转会/时间线/成就/年度曲线等推导函数
 */
import { describe, it, expect } from 'vitest'
import {
  players,
  getDisplayName,
  getGroupById,
  getPlayersByGroup,
  getPlayerById,
  getLivesByGroup,
  getLiveById,
  getRelationshipsByGroup,
  getPlayerByCharacterName,
  getSongsByGroup,
  getDiscById,
  getSongsByDisc,
  getLivesBySong,
  getSongFirstLive,
  resolveSetlistEntry,
  getLivePerformers,
  getLiveMemberStatus,
  getEventsByGroup,
  getNewsFeed,
  getRecentLives,
  getCareerTimeline,
  getTransfersByPlayer,
  getPlayerTrophies,
  getCareerActivity,
} from './seiyuu'

// 测试基准选手：新田恵海（μ's Center）
const honoka = getPlayerById('nitta-emi')

describe('getDisplayName', () => {
  it('中文模式：名 "角色名" 姓（三次元声优信息优先）', () => {
    expect(getDisplayName(honoka)).toBe('恵海 "穂乃果" 新田')
  })

  it('英文模式：罗马音西方顺序（名 "角色名" 姓）', () => {
    expect(getDisplayName(honoka, 'en')).toBe('Emi "Honoka" Nitta')
  })

  it('无姓时（单名义优）：省略尾部的姓', () => {
    const single = { firstName: '杏樹', characterName: '千歌' }
    expect(getDisplayName(single)).toBe('杏樹 "千歌"')
  })

  it('英文模式单词语罗马音：角色名取罗马音名或原角色名兜底', () => {
    const single = { firstName: 'Liyuu', characterName: '可可', romajiName: 'Liyuu', characterRomaji: 'Keke Tang' }
    expect(getDisplayName(single, 'en')).toBe('Liyuu "Keke"')
  })

  it('英文模式角色罗马音缺失时：兜底显示原角色名', () => {
    const fallback = { firstName: '彩', lastName: '内田', romajiName: 'Aya Uchida', characterName: 'ことり', characterRomaji: '' }
    expect(getDisplayName(fallback, 'en')).toBe('Aya "ことり" Uchida')
  })
})

describe('基础检索函数', () => {
  it('getGroupById：命中与未命中', () => {
    expect(getGroupById('muse').name).toBe("μ's")
    expect(getGroupById('not-exist')).toBeUndefined()
  })

  it("getPlayersByGroup：返回该企划全部成员且 groupId 一致（μ's 9 人）", () => {
    const muse = getPlayersByGroup('muse')
    expect(muse).toHaveLength(9)
    muse.forEach(p => expect(p.groupId).toBe('muse'))
  })

  it('getPlayerById / getPlayerByCharacterName：命中与未命中', () => {
    expect(getPlayerById('nitta-emi').characterName).toBe('穂乃果')
    expect(getPlayerById('not-exist')).toBeUndefined()
    expect(getPlayerByCharacterName('千歌').id).toBe('inami-anju')
    expect(getPlayerByCharacterName('不存在的角色')).toBeUndefined()
  })

  it('getSongsByGroup：仅返回该企划歌曲', () => {
    getSongsByGroup('muse').forEach(s => expect(s.groupId).toBe('muse'))
  })

  it('getLivesByGroup：跨企划合同 Live 也按 groupIds 归属', () => {
    getLivesByGroup('aqours').forEach(l => expect(l.groupIds).toContain('aqours'))
  })
})

describe('歌曲 ↔ 唱片 ↔ Live 关联函数', () => {
  it('getSongsByDisc：按唱片 tracks 顺序解析歌曲对象', () => {
    const disc = getDiscById('muse-1st')
    const tracks = getSongsByDisc('muse-1st')
    expect(tracks.map(s => s.id)).toEqual(disc.tracks)
    expect(getSongsByDisc('not-exist')).toEqual([])
  })

  it('getLivesBySong：返回包含该曲的场次且按日期升序', () => {
    const livesWith = getLivesBySong('snow-halation')
    expect(livesWith.length).toBeGreaterThan(0)
    livesWith.forEach(l => {
      expect(l.setlist.some(e => e && e.songId === 'snow-halation')).toBe(true)
    })
    const dates = livesWith.map(l => l.date)
    expect([...dates].sort()).toEqual(dates)
  })

  it('getSongFirstLive：等于 getLivesBySong 的最早一场', () => {
    expect(getSongFirstLive('snow-halation')).toEqual(getLivesBySong('snow-halation')[0])
    expect(getSongFirstLive('not-exist')).toBeNull()
  })
})

describe('resolveSetlistEntry', () => {
  it('{ songId } 条目：解析为歌曲对象，title 取歌曲标题', () => {
    const r = resolveSetlistEntry({ songId: 'snow-halation' })
    expect(r.song.id).toBe('snow-halation')
    expect(r.title).toBe('Snow halation')
  })

  it('{ songId } 指向不存在的歌曲：退化为纯文本（song 为 null）', () => {
    const r = resolveSetlistEntry({ songId: 'not-exist' })
    expect(r.song).toBeNull()
  })

  it('{ title, titleEn } 纯文本条目', () => {
    const r = resolveSetlistEntry({ title: 'MC', titleEn: 'MC' })
    expect(r).toEqual({ song: null, title: 'MC', titleEn: 'MC' })
  })

  it('兼容旧版纯字符串歌名', () => {
    expect(resolveSetlistEntry('Snow halation')).toEqual({ song: null, title: 'Snow halation', titleEn: 'Snow halation' })
  })

  it('空值容错', () => {
    expect(resolveSetlistEntry(null)).toEqual({ song: null, title: '', titleEn: '' })
  })
})

describe('getLivePerformers / getLiveMemberStatus', () => {
  it('显式 performers 名单：解析为选手对象', () => {
    const live = getLiveById('muse-1st-live')
    const performers = getLivePerformers(live)
    expect(performers).toHaveLength(live.performers.length)
    performers.forEach(p => expect(live.performers).toContain(p.id))
  })

  it("缺省 performers：按 groupIds 组合全员推导（μ's 9 人）", () => {
    const synthetic = { groupIds: ['muse'] }
    expect(getLivePerformers(synthetic)).toHaveLength(9)
  })

  it('memberStatus 标记全程缺席（absent）的成员被剔除', () => {
    const synthetic = {
      groupIds: ['muse'],
      memberStatus: [{ playerId: 'nitta-emi', attendance: 'absent' }],
    }
    const performers = getLivePerformers(synthetic)
    expect(performers).toHaveLength(8)
    expect(performers.some(p => p.id === 'nitta-emi')).toBe(false)
  })

  it('memberStatus 部分出演（partial）成员保留', () => {
    const synthetic = {
      groupIds: ['muse'],
      memberStatus: [{ playerId: 'nitta-emi', attendance: 'partial' }],
    }
    expect(getLivePerformers(synthetic)).toHaveLength(9)
  })

  it('getLiveMemberStatus：解析出选手对象，未匹配 playerId 的条目被过滤', () => {
    const synthetic = {
      groupIds: ['muse'],
      memberStatus: [
        { playerId: 'nitta-emi', attendance: 'partial' },
        { playerId: 'not-exist', attendance: 'absent' },
      ],
    }
    const rows = getLiveMemberStatus(synthetic)
    expect(rows).toHaveLength(1)
    expect(rows[0].player.id).toBe('nitta-emi')
    expect(getLiveMemberStatus({ groupIds: ['muse'] })).toEqual([])
  })
})

describe('首页动态流（Phase 6.1）', () => {
  it('getNewsFeed：按日期新 → 旧排序且尊重 limit', () => {
    const feed = getNewsFeed(20)
    expect(feed.length).toBeGreaterThan(0)
    expect(feed.length).toBeLessThanOrEqual(20)
    const dates = feed.map(i => i.date)
    expect([...dates].sort().reverse()).toEqual(dates)
    // 条目类型只允许四类
    feed.forEach(i => expect(['release', 'live', 'member', 'graduation']).toContain(i.type))
  })

  it('getRecentLives：按日期新 → 旧排序且尊重 limit', () => {
    const recent = getRecentLives(5)
    expect(recent).toHaveLength(5)
    const dates = recent.map(l => l.date)
    expect([...dates].sort().reverse()).toEqual(dates)
  })
})

describe('生涯时间线 / 转会 / 成就 / 年度曲线', () => {
  it('getCareerTimeline：双视角节点按日期升序，声优视角含出道节点', () => {
    const { seiyuu, character } = getCareerTimeline(honoka)
    expect(seiyuu.length).toBeGreaterThan(0)
    expect(character.length).toBeGreaterThan(0)
    expect(seiyuu.some(n => n.type === 'debut' && n.date === '2010')).toBe(true)
    ;[seiyuu, character].forEach(nodes => {
      const dates = nodes.map(n => n.date)
      expect([...dates].sort()).toEqual(dates)
    })
  })

  it("getTransfersByPlayer：μ's 成员含结成与活动休止记录，按日期新 → 旧", () => {
    const transfers = getTransfersByPlayer('nitta-emi')
    expect(transfers.some(t => t.type === 'join' && t.date === '2010-06-30')).toBe(true)
    expect(transfers.some(t => t.type === 'hiatus' && t.date === '2016-04-01')).toBe(true)
    const dates = transfers.map(t => t.date)
    expect([...dates].sort().reverse()).toEqual(dates)
  })

  it('getPlayerTrophies：穂乃果有 Center 荣誉、虹咲歩夢有 Solo 荣誉且 count 与明细数一致', () => {
    // μ's 段无 solo 曲（solo 体系集中在虹咲等企划），Center 用穂乃果、Solo 用歩夢验证
    const honokaTrophies = getPlayerTrophies(honoka)
    expect(honokaTrophies.find(t => t.type === 'center')).toBeDefined()

    const ayumu = getPlayerByCharacterName('歩夢')
    const ayumuTrophies = getPlayerTrophies(ayumu)
    expect(ayumuTrophies.find(t => t.type === 'solo')).toBeDefined()

    ;[honokaTrophies, ayumuTrophies].forEach(trophies => {
      trophies.forEach(t => {
        expect(t.count).toBe(t.entries.length)
        expect(t.count).toBeGreaterThan(0)
      })
    })
  })

  it('getCareerActivity：年份升序连续无空档，rating 落在 [0, 1.50]', () => {
    const rows = getCareerActivity(honoka)
    expect(rows.length).toBeGreaterThan(1)
    rows.forEach((row, i) => {
      if (i > 0) expect(row.year - rows[i - 1].year).toBe(1)
      expect(row.activity).toBe(row.lives + row.songs)
      expect(row.rating).toBeGreaterThanOrEqual(0)
      expect(row.rating).toBeLessThanOrEqual(1.5)
    })
  })
})

describe('数据一致性（与原始数据模块同步）', () => {
  it('seiyuu.js 出口的 players 覆盖全部选手', () => {
    expect(players.length).toBeGreaterThan(50)
  })

  it('getEventsByGroup：仅返回该企划参与的活动且按日期新 → 旧', () => {
    const museEvents = getEventsByGroup('muse')
    museEvents.forEach(e => expect(e.groupIds).toContain('muse'))
    const dates = museEvents.map(e => e.date)
    expect([...dates].sort().reverse()).toEqual(dates)
  })

  it('getRelationshipsByGroup：兼容单企划 groupId 与跨企划 groupIds 两种归属', () => {
    // 单企划关系
    expect(getRelationshipsByGroup('muse').some(r => r.id === 'muse-printemps')).toBe(true)
    // 跨企划关系（groupIds 数组）在所有涉及企划页可见
    const crossRels = getRelationshipsByGroup('muse').filter(r => Array.isArray(r.groupIds))
    crossRels.forEach(r => {
      r.groupIds.forEach(gid => {
        expect(getRelationshipsByGroup(gid)).toContain(r)
      })
    })
  })
})
