/**
 * i18n 模块测试
 * 覆盖：t() 翻译函数（键解析 / 插值 / 兜底）、zh/en 字典键对称、
 * dataTranslations 数据字段映射（已知值 / 兜底 / 空值 / 实际数据全覆盖）
 */
import { describe, it, expect } from 'vitest'
import { translations, t } from './translations'
import {
  roleEnMap,
  birthplaceEnMap,
  schoolEnMap,
  gradeEnMap,
  colorNameEnMap,
  getRoleEn,
  getBirthplaceEn,
  getSchoolEn,
  getGradeEn,
  getColorNameEn,
} from './dataTranslations'
import { players } from '../data/players'
import { groups } from '../data/groups'

describe('t() 翻译函数', () => {
  it('解析点号分隔的嵌套键', () => {
    expect(t(translations.zh, 'nav.home')).toBe('Home')
    expect(t(translations.zh, 'sidebar.totalPlayers')).toBe(translations.zh.sidebar.totalPlayers)
  })

  it('插值变量替换 {{var}}', () => {
    expect(t(translations.zh, 'players.seiyuuCount', { count: 18 })).toBe('18 seiyuu')
  })

  it('缺失的插值变量保留 {{varName}} 占位', () => {
    expect(t(translations.zh, 'players.seiyuuCount')).toBe('{{count}} seiyuu')
  })

  it('未知键返回键名本身（便于发现漏翻）', () => {
    expect(t(translations.zh, 'not.exist.key')).toBe('not.exist.key')
  })

  it('字典为 null/undefined 或值非字符串时返回键名兜底', () => {
    expect(t(null, 'nav.home')).toBe('nav.home')
    expect(t(undefined, 'nav.home')).toBe('nav.home')
    // 命中到对象（非叶子字符串）同样兜底
    expect(t(translations.zh, 'nav')).toBe('nav')
  })
})

describe('zh / en 翻译字典结构对称', () => {
  // 递归拍平字典为点号键集合
  function flatKeys(obj, prefix = '') {
    return Object.entries(obj).flatMap(([k, v]) =>
      v !== null && typeof v === 'object' ? flatKeys(v, `${prefix}${k}.`) : [`${prefix}${k}`]
    )
  }

  it('两种语言的键集合完全一致（缺键会导致英文模式漏翻）', () => {
    const zhKeys = new Set(flatKeys(translations.zh))
    const enKeys = new Set(flatKeys(translations.en))
    const onlyZh = [...zhKeys].filter(k => !enKeys.has(k))
    const onlyEn = [...enKeys].filter(k => !zhKeys.has(k))
    expect(onlyZh, '仅中文有的键').toEqual([])
    expect(onlyEn, '仅英文有的键').toEqual([])
  })

  it('所有叶子值均为字符串（允许的刻意空值除外）', () => {
    // 刻意为空的翻译：英文无人数单位后缀（如 "18 players" 不需要「人」）
    const ALLOWED_EMPTY = new Set(['en.sidebar.membersUnit'])
    function checkLeaves(obj, path) {
      Object.entries(obj).forEach(([k, v]) => {
        if (v !== null && typeof v === 'object') {
          checkLeaves(v, `${path}${k}.`)
        } else {
          expect(typeof v, `${path}${k} 应为字符串`).toBe('string')
          if (!ALLOWED_EMPTY.has(`${path}${k}`)) {
            expect(v.length, `${path}${k} 不应为空串`).toBeGreaterThan(0)
          }
        }
      })
    }
    checkLeaves(translations.zh, 'zh.')
    checkLeaves(translations.en, 'en.')
  })
})

describe('dataTranslations 映射函数', () => {
  it('getRoleEn：已知定位映射为英文', () => {
    expect(getRoleEn('センター（中心）')).toBe('Center')
    expect(getRoleEn('元生徒会長')).toBe('Former Student Council President')
  })

  it('getBirthplaceEn：日本都道府县映射为罗马音', () => {
    expect(getBirthplaceEn('東京都')).toBe('Tokyo')
    expect(getBirthplaceEn('香港')).toBe('Hong Kong')
  })

  it('getSchoolEn / getGradeEn / getColorNameEn：已知值映射', () => {
    expect(getSchoolEn('音乃木坂学院')).toBe('Otonokizaka High School')
    expect(getGradeEn('1年生')).toBe('1st Year')
    expect(getColorNameEn('粉色')).toBe('Pink')
    expect(getColorNameEn('橙色')).toBe('Orange')
  })

  it('未知值兜底返回原值（不炸不吞）', () => {
    expect(getRoleEn('未知定位')).toBe('未知定位')
    expect(getBirthplaceEn('未知県')).toBe('未知県')
    expect(getSchoolEn('未知学校')).toBe('未知学校')
    expect(getGradeEn('4年生')).toBe('4年生')
    expect(getColorNameEn('未知色')).toBe('未知色')
  })

  it('空值直接透传', () => {
    expect(getRoleEn(undefined)).toBeUndefined()
    expect(getRoleEn('')).toBe('')
  })
})

describe('数据字段英文映射覆盖率（英文模式显示正确性的保障）', () => {
  // 选手数据中出现的字段值必须全部有英文映射，否则英文模式会漏出日文原值
  it('所有选手的 role 均在 roleEnMap 中', () => {
    const missing = players.filter(p => p.role && !roleEnMap[p.role]).map(p => `${p.id}: ${p.role}`)
    expect(missing).toEqual([])
  })

  it('所有选手的 birthplace 均在 birthplaceEnMap 中', () => {
    const missing = players.filter(p => p.birthplace && !birthplaceEnMap[p.birthplace]).map(p => `${p.id}: ${p.birthplace}`)
    expect(missing).toEqual([])
  })

  it('所有选手的 characterSchool 均在 schoolEnMap 中', () => {
    const missing = players.filter(p => p.characterSchool && !schoolEnMap[p.characterSchool]).map(p => `${p.id}: ${p.characterSchool}`)
    expect(missing).toEqual([])
  })

  it('所有选手的 characterGrade 均在 gradeEnMap 中', () => {
    const missing = players.filter(p => p.characterGrade && !gradeEnMap[p.characterGrade]).map(p => `${p.id}: ${p.characterGrade}`)
    expect(missing).toEqual([])
  })

  it('所有选手的 characterColorName 均在 colorNameEnMap 中', () => {
    const missing = players.filter(p => p.characterColorName && !colorNameEnMap[p.characterColorName]).map(p => `${p.id}: ${p.characterColorName}`)
    expect(missing).toEqual([])
  })

  it('所有组合的 colorName 均在 colorNameEnMap 中（或已有显式 colorNameEn 字段）', () => {
    const missing = groups
      .filter(g => g.colorName && !g.colorNameEn && !colorNameEnMap[g.colorName])
      .map(g => `${g.id}: ${g.colorName}`)
    expect(missing).toEqual([])
  })
})
