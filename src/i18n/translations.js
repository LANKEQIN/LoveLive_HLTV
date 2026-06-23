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
      moreFeatures: 'Phase 3 开发中: Stats · 扩展企划数据 · 搜索 · 选手对比',
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
    // 组合页
    teams: {
      title: 'Teams',
      groupCount: '{{count}} 个组合',
      members: '成员',
      lives: 'Lives',
      songs: '歌曲',
      cds: 'CDs',
      attendance: '总观众',
      established: '成立',
      statistics: '战绩统计',
      roster: '成员列表',
      relationships: '成员关系',
      notFound: '组合不存在',
      backToTeams: '← 返回组合列表',
      allTeams: '← 全部组合',
      table: {
        number: '#',
        player: '声优',
        character: '角色',
        color: '代表色',
        role: '定位',
        rating: '评分',
      },
    },
    // Live 赛程页
    matches: {
      title: 'Matches',
      matchCount: '{{count}} 场Live',
      allGroups: '全部组合',
      views: {
        list: '列表',
        results: '结果',
      },
      status: {
        completed: '已结束',
        upcoming: ' upcoming',
      },
      attendance: '观众数',
      setlist: '歌单',
      performers: '出演成员',
      venueInfo: '场馆信息',
      venue: '场馆',
      city: '城市',
      date: '日期',
      notFound: 'Live 不存在',
      backToMatches: '← 返回赛程',
      allMatches: '← 全部赛程',
      noMatches: '暂无符合条件的 Live',
      table: {
        date: '日期',
        match: 'Live',
        venue: '场馆',
        groups: '参演组合',
        attendance: '观众',
        status: '状态',
      },
    },
    // 排行榜页
    rankings: {
      title: 'Rankings',
      tabs: {
        popularity: '人气榜',
        cdSales: 'CD销量榜',
        streaming: '流媒体榜',
        power: '综合战力',
      },
      table: {
        rank: '#',
        player: '声优',
        group: '组合',
        character: '角色',
        song: '歌曲',
        fans: '粉丝数',
        sales: '销量',
        streams: '播放量',
        rating: 'Rating',
      },
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
      moreFeatures: 'Phase 3 coming soon: Stats · More Groups · Search · Player Compare',
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
    // Teams page
    teams: {
      title: 'Teams',
      groupCount: '{{count}} groups',
      members: 'Members',
      lives: 'Lives',
      songs: 'Songs',
      cds: 'CDs',
      attendance: 'Attendance',
      established: 'Established',
      statistics: 'Statistics',
      roster: 'Roster',
      relationships: 'Relationships',
      notFound: 'Team not found',
      backToTeams: '← Back to Teams',
      allTeams: '← All Teams',
      table: {
        number: '#',
        player: 'Player',
        character: 'Character',
        color: 'Color',
        role: 'Role',
        rating: 'Rating',
      },
    },
    // Matches page
    matches: {
      title: 'Matches',
      matchCount: '{{count}} matches',
      allGroups: 'All Groups',
      views: {
        list: 'List',
        results: 'Results',
      },
      status: {
        completed: 'Completed',
        upcoming: 'Upcoming',
      },
      attendance: 'Attendance',
      setlist: 'Setlist',
      performers: 'Performers',
      venueInfo: 'Venue Info',
      venue: 'Venue',
      city: 'City',
      date: 'Date',
      notFound: 'Match not found',
      backToMatches: '← Back to Matches',
      allMatches: '← All Matches',
      noMatches: 'No matches found',
      table: {
        date: 'Date',
        match: 'Match',
        venue: 'Venue',
        groups: 'Groups',
        attendance: 'Attendance',
        status: 'Status',
      },
    },
    // Rankings page
    rankings: {
      title: 'Rankings',
      tabs: {
        popularity: 'Popularity',
        cdSales: 'CD Sales',
        streaming: 'Streaming',
        power: 'Power Rank',
      },
      table: {
        rank: '#',
        player: 'Player',
        group: 'Team',
        character: 'Character',
        song: 'Song',
        fans: 'Fans',
        sales: 'Sales',
        streams: 'Streams',
        rating: 'Rating',
      },
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
