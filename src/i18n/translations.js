/**
 * 国际化翻译字典
 * 支持中文（zh）和英文（en）两种语言
 * 所有页面级文案集中管理，便于维护
 */

export const translations = {
  zh: {
    // 顶部导航
    nav: {
      home: 'Home',
      players: 'Players',
      teams: 'Teams',
      matches: 'Matches',
      rankings: 'Rankings',
      stats: 'Stats',
      searchPlaceholder: 'Search players...',
    },
    // 语言切换
    language: {
      zh: '中文',
      en: 'English',
      switch: 'Switch language',
    },
    // 侧边栏
    sidebar: {
      groups: 'Groups',
      statistics: 'Statistics',
      totalPlayers: 'Total Players',
      totalGroups: 'Total Groups',
      totalLives: 'Total Lives',
      totalSongs: 'Total Songs',
      totalCDs: 'Total CDs',
      about: 'About',
      aboutText: 'LoveLive! HLTV 是一个非官方的粉丝数据平台，以 HLTV 风格展示 LoveLive! 声优与角色信息。',
      membersUnit: '人',
    },
    // 首页
    home: {
      title: 'LoveLive! HLTV',
      subtitle: '以 HLTV 风格展示 LoveLive! 声优与角色数据的非官方粉丝平台。名字格式: 声优的名 "角色名" 声优的姓 — 三次元声优信息优先展示。',
      browsePlayers: 'Browse Players →',
      groups: 'Groups',
      members: 'Members',
      lives: 'Lives',
      songs: 'Songs',
      topPlayers: 'Top Players',
      player: 'Player',
      group: 'Group',
      character: 'Character',
      rating: 'Rating',
      rank: '#',
      moreFeatures: 'More features coming soon: Teams · Matches · Rankings · Stats',
    },
    // 选手列表页
    players: {
      title: 'Players',
      seiyuuCount: '{{count}} seiyuu',
      all: 'All',
      table: {
        rank: '#',
        player: 'Player',
        group: 'Group',
        character: 'Character',
        color: 'Color',
        age: 'Age',
        role: 'Role',
        rating: 'Rating',
      },
      nameFormatNote: '* 名字格式: 声优的名 "角色名(ID)" 声优的姓 — 三次元声优信息优先展示',
    },
    // 选手详情页
    playerDetail: {
      notFound: 'Player not found',
      backToPlayers: '← Back to Players',
      allPlayers: '← All Players',
      rating: 'Rating',
      seiyuuInfo: 'Seiyuu Info (三次元)',
      characterInfo: 'Character Info (二次元)',
      labels: {
        name: 'Name',
        romaji: 'Romaji',
        birthday: 'Birthday',
        birthplace: 'Birthplace',
        bloodType: 'Blood Type',
        height: 'Height',
        agency: 'Agency',
        debut: 'Debut',
        age: 'Age',
        school: 'School',
        grade: 'Grade',
        color: 'Color',
      },
      statistics: 'Statistics',
      statLabels: {
        lives: 'Lives',
        songs: 'Songs',
        solo: 'Solo',
        cds: 'CDs',
        events: 'Events',
        fans: 'Fans',
      },
      about: 'About',
      years: 'years',
      heightUnit: 'cm',
    },
  },
  en: {
    // Header navigation
    nav: {
      home: 'Home',
      players: 'Players',
      teams: 'Teams',
      matches: 'Matches',
      rankings: 'Rankings',
      stats: 'Stats',
      searchPlaceholder: 'Search players...',
    },
    // Language switcher
    language: {
      zh: '中文',
      en: 'English',
      switch: 'Switch language',
    },
    // Sidebar
    sidebar: {
      groups: 'Groups',
      statistics: 'Statistics',
      totalPlayers: 'Total Players',
      totalGroups: 'Total Groups',
      totalLives: 'Total Lives',
      totalSongs: 'Total Songs',
      totalCDs: 'Total CDs',
      about: 'About',
      aboutText: 'LoveLive! HLTV is an unofficial fan data platform presenting LoveLive! seiyuu and character info in HLTV style.',
      membersUnit: '',
    },
    // Home page
    home: {
      title: 'LoveLive! HLTV',
      subtitle: 'An unofficial fan data platform showcasing LoveLive! seiyuu and character data in HLTV style. Name format: first name "character" last name — real-life seiyuu info takes priority.',
      browsePlayers: 'Browse Players →',
      groups: 'Groups',
      members: 'Members',
      lives: 'Lives',
      songs: 'Songs',
      topPlayers: 'Top Players',
      player: 'Player',
      group: 'Group',
      character: 'Character',
      rating: 'Rating',
      rank: '#',
      moreFeatures: 'More features coming soon: Teams · Matches · Rankings · Stats',
    },
    // Players list page
    players: {
      title: 'Players',
      seiyuuCount: '{{count}} seiyuu',
      all: 'All',
      table: {
        rank: '#',
        player: 'Player',
        group: 'Group',
        character: 'Character',
        color: 'Color',
        age: 'Age',
        role: 'Role',
        rating: 'Rating',
      },
      nameFormatNote: '* Name format: seiyuu first name "character (ID)" seiyuu last name — real-life seiyuu info takes priority',
    },
    // Player detail page
    playerDetail: {
      notFound: 'Player not found',
      backToPlayers: '← Back to Players',
      allPlayers: '← All Players',
      rating: 'Rating',
      seiyuuInfo: 'Seiyuu Info (Real)',
      characterInfo: 'Character Info (2D)',
      labels: {
        name: 'Name',
        romaji: 'Romaji',
        birthday: 'Birthday',
        birthplace: 'Birthplace',
        bloodType: 'Blood Type',
        height: 'Height',
        agency: 'Agency',
        debut: 'Debut',
        age: 'Age',
        school: 'School',
        grade: 'Grade',
        color: 'Color',
      },
      statistics: 'Statistics',
      statLabels: {
        lives: 'Lives',
        songs: 'Songs',
        solo: 'Solo',
        cds: 'CDs',
        events: 'Events',
        fans: 'Fans',
      },
      about: 'About',
      years: 'years',
      heightUnit: 'cm',
    },
  },
}

/**
 * 获取指定语言的翻译文本
 * @param {object} dict - 当前语言字典
 * @param {string} key - 点号分隔的键，如 'nav.home'
 * @param {object} vars - 插值变量，如 { count: 18 }
 * @returns {string} 翻译后的文本
 */
export function t(dict, key, vars = {}) {
  const keys = key.split('.')
  let value = dict
  for (const k of keys) {
    if (value === undefined || value === null) {
      return key
    }
    value = value[k]
  }
  if (typeof value !== 'string') {
    return key
  }
  // 替换插值变量 {{varName}}
  return value.replace(/\{\{(\w+)\}\}/g, (_, varName) => {
    return vars[varName] !== undefined ? String(vars[varName]) : `{{${varName}}}`
  })
}
