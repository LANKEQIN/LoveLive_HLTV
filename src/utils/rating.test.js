/**
 * 综合评分（Rating 2.0）纯函数测试
 * 覆盖：calculateRating 加权口径与上限、getRatingColor 色阶阈值
 */
import { describe, it, expect } from 'vitest'
import { calculateRating, getRatingColor } from './rating'
import { players } from '../data/players'

// 构造最小 stats 对象
function stats(overrides = {}) {
  return {
    liveCount: 0,
    songCount: 0,
    soloCount: 0,
    cdCount: 0,
    eventCount: 0,
    fanclubMembers: 0,
    ...overrides,
  }
}

describe('calculateRating', () => {
  it('全零数据评分为 0', () => {
    expect(calculateRating({ stats: stats() })).toBe(0)
  })

  it('加权口径：lives×0.05 + songs×0.02 + solo×0.03 + cds×0.01 + events×0.005 + (fans/10000)×0.01', () => {
    const rating = calculateRating({
      stats: stats({ liveCount: 5, songCount: 10, soloCount: 5, cdCount: 10, eventCount: 50, fanclubMembers: 20000 }),
    })
    // 0.25 + 0.2 + 0.15 + 0.1 + 0.25 + 0.02 = 0.97，未触顶
    expect(rating).toBeCloseTo(0.97, 10)
  })

  it('各单项权重独立验证', () => {
    // 仅 Live
    expect(calculateRating({ stats: stats({ liveCount: 20 }) })).toBeCloseTo(1.0, 10)
    // 仅歌曲
    expect(calculateRating({ stats: stats({ songCount: 50 }) })).toBeCloseTo(1.0, 10)
    // 仅 Solo
    expect(calculateRating({ stats: stats({ soloCount: 30 }) })).toBeCloseTo(0.9, 10)
    // 仅粉丝（10 万人 = 0.10）
    expect(calculateRating({ stats: stats({ fanclubMembers: 100000 }) })).toBeCloseTo(0.1, 10)
  })

  it('评分上限 1.50（模拟 HLTV rating 封顶）', () => {
    const rating = calculateRating({
      stats: stats({ liveCount: 100, songCount: 200, soloCount: 50, cdCount: 100, eventCount: 500, fanclubMembers: 500000 }),
    })
    expect(rating).toBe(1.5)
  })

  it('恰好等于 1.50 时不被削减', () => {
    // liveCount 30 = 1.50
    expect(calculateRating({ stats: stats({ liveCount: 30 }) })).toBe(1.5)
  })

  it('真实数据：全部选手评分落在 [0, 1.50] 区间', () => {
    players.forEach(p => {
      const rating = calculateRating(p)
      expect(rating).toBeGreaterThanOrEqual(0)
      expect(rating).toBeLessThanOrEqual(1.5)
    })
  })
})

describe('getRatingColor', () => {
  it('色阶阈值：绿(≥1.20) / 黄(≥1.05) / 白(≥0.90) / 红(<0.90)', () => {
    expect(getRatingColor(1.5)).toBe('#5fb048')
    expect(getRatingColor(1.2)).toBe('#5fb048')
    expect(getRatingColor(1.19)).toBe('#d4a017')
    expect(getRatingColor(1.05)).toBe('#d4a017')
    expect(getRatingColor(1.04)).toBe('#cad0d6')
    expect(getRatingColor(0.9)).toBe('#cad0d6')
    expect(getRatingColor(0.89)).toBe('#e05555')
    expect(getRatingColor(0)).toBe('#e05555')
  })
})
