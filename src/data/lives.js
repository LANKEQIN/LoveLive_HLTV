/**
 * LoveLive! HLTV - Live / 演唱会数据
 * 对应 HLTV 的 Match 概念，记录各企划的主要演唱会
 *
 * 字段说明：
 *   setlist: 歌单（按出演顺序）。条目为对象：
 *     - { songId: 'xxx' }  关联 songs.js 中的歌曲 ID（优先使用，可解析出多语言标题）
 *     - { title: '...', titleEn: '...' }  纯文本歌曲（暂未收录进 songs.js 的 Live 主题歌等）
 *   performers: 出演选手 ID 列表（对应 players.js）。缺省时按 groupIds 组合全员推导；
 *     追加期次成员（如虹咲 2 期、Liella! 2/3 期）加入前的场次必须显式指定，避免误显示
 *   memberStatus: 出演成员明细（缺席 / 部分出演记录）
 *     - { playerId, attendance: 'absent' | 'partial', note, noteEn }
 *   endDate: 多日公演的末日日期（可选）
 *   note / noteEn: 公演备注（声优交接、公演性质等重要信息）
 *
 * 数据来源：官方 Live 特设页、公演报告等多源交叉验证；attendance 为合理近似值
 */

// ==================== 各企划常用出演阵容（playerId 快捷引用） ====================
// μ's 9 人
const MUSE_PLAYERS = [
  'nitta-emi', 'nango-yoshino', 'uchida-aya', 'mimori-suzuko',
  'pile', 'kubo-yurika', 'iida-riho', 'kushida-aina', 'tokui-sora',
]
// Aqours 9 人
const AQOURS_PLAYERS = [
  'inami-anju', 'aida-riko', 'suwa-nanaka', 'komiya-arisa',
  'saito-shuka', 'kobayashi-aika', 'takatsuki-kanako', 'suzuki-aina', 'furihata-ai',
]
// 虹ヶ咲 初期 9 人（1st Live 〜 Fest 时期阵容）
const NIJI_PLAYERS_9 = [
  'onishi-aguri-niji', 'sagara-mayu', 'maeda-kaori', 'kubota-miyu',
  'murakami-natsumi', 'kito-akari', 'kusunoki-tomori', 'sashide-maria', 'tanaka-chiemi',
]
// 虹ヶ咲 10 人（栞子加入后）
const NIJI_PLAYERS_10 = [...NIJI_PLAYERS_9, 'koizumi-moeka']
// 虹ヶ咲 12 人（ミア・嵐珠加入后）
const NIJI_PLAYERS_12 = [...NIJI_PLAYERS_10, 'uchida-shu', 'homoto-akina']
// Liella! 1 期生 5 人
const LIELLA_PLAYERS_5 = ['date-sayuri', 'liyuu', 'misaki-nako', 'payton-naomi', 'aoyama-nagisa']
// Liella! 2 期生加入后 9 人
const LIELLA_PLAYERS_9 = [...LIELLA_PLAYERS_5, 'suzuhara-nozomi-kinako', 'yabushima-akane', 'okuma-wakana', 'emori-aya']
// Liella! 3 期生加入后 11 人
const LIELLA_PLAYERS_11 = [...LIELLA_PLAYERS_9, 'yuna', 'sakakura-hana']

export const lives = [
  // ==================== μ's 主要 Live ====================
  {
    id: 'muse-1st-live',
    name: "μ's First LoveLive!",
    nameEn: "μ's First LoveLive!",
    date: '2012-02-19',
    venue: '横浜BLITZ',
    venueEn: 'Yokohama BLITZ',
    city: '横浜',
    cityEn: 'Yokohama',
    groupIds: ['muse'],
    performers: MUSE_PLAYERS,
    setlist: [{ songId: 'bokura-no-live' }, { songId: 'snow-halation' }, { songId: 'start-dash' }],
    attendance: 1200,
    status: 'completed',
  },
  {
    id: 'muse-2nd-live',
    name: "μ's New Year LoveLive! 2013",
    nameEn: "μ's New Year LoveLive! 2013",
    date: '2013-01-03',
    venue: '東京ドームシティホール',
    venueEn: 'Tokyo Dome City Hall',
    city: '東京',
    cityEn: 'Tokyo',
    groupIds: ['muse'],
    performers: MUSE_PLAYERS,
    setlist: [{ songId: 'bokura-wa-imano-naka-de' }, { songId: 'wild-stars' }, { songId: 'snow-halation' }],
    attendance: 3000,
    status: 'completed',
  },
  {
    id: 'muse-3rd-live',
    name: "μ's 3rd Anniversary LoveLive!",
    nameEn: "μ's 3rd Anniversary LoveLive!",
    date: '2013-06-16',
    venue: '横浜アリーナ',
    venueEn: 'Yokohama Arena',
    city: '横浜',
    cityEn: 'Yokohama',
    groupIds: ['muse'],
    performers: MUSE_PLAYERS,
    setlist: [
      { songId: 'sore-wa-bokutachi-no-kiseki' },
      { songId: 'start-dash' },
      { songId: 'kira-kira-sensation' },
    ],
    attendance: 12000,
    status: 'completed',
  },
  {
    id: 'muse-4th-live',
    name: "μ's →NEXT LoveLive! 2014",
    nameEn: "μ's →NEXT LoveLive! 2014",
    date: '2014-02-08',
    venue: 'さいたまスーパーアリーナ',
    venueEn: 'Saitama Super Arena',
    city: 'さいたま',
    cityEn: 'Saitama',
    groupIds: ['muse'],
    performers: MUSE_PLAYERS,
    setlist: [
      { songId: 'sore-wa-bokutachi-no-kiseki' },
      { songId: 'yume-no-tobira' },
      { songId: 'snow-halation' },
    ],
    attendance: 18000,
    status: 'completed',
  },
  {
    id: 'muse-5th-live',
    name: "μ's Go→Go! LoveLive! 2015",
    nameEn: "μ's Go→Go! LoveLive! 2015",
    date: '2015-01-31',
    venue: 'さいたまスーパーアリーナ',
    venueEn: 'Saitama Super Arena',
    city: 'さいたま',
    cityEn: 'Saitama',
    groupIds: ['muse'],
    performers: MUSE_PLAYERS,
    setlist: [
      { songId: 'angelic-angel' },
      { songId: 'sunny-day-song' },
      { songId: 'bokutachi-wa-hitosu-no-hikari' },
    ],
    attendance: 20000,
    status: 'completed',
  },
  {
    id: 'muse-final-live',
    name: "μ's Final LoveLive! ～μ'sic Forever♪♪♪♪♪♪♪♪♪～",
    nameEn: "μ's Final LoveLive! ~μ'sic Forever~",
    date: '2016-03-31',
    endDate: '2016-04-01',
    venue: '東京ドーム',
    venueEn: 'Tokyo Dome',
    city: '東京',
    cityEn: 'Tokyo',
    groupIds: ['muse'],
    performers: MUSE_PLAYERS,
    setlist: [
      { songId: 'bokutachi-wa-hitosu-no-hikari' },
      { songId: 'snow-halation' },
      { songId: 'start-dash' },
      { songId: 'oh-love-and-peace' },
    ],
    attendance: 55000,
    status: 'completed',
    note: 'μ’s 两日公演（3/31・4/1），单日动员约 5.5 万人，为 μ’s 活动休止前的最终演唱会。',
    noteEn: "Two-day finale at Tokyo Dome (Mar 31 & Apr 1), approx. 55,000 per day, μ's last live before hiatus.",
  },

  // ==================== Aqours 主要 Live ====================
  {
    id: 'aqours-1st-live',
    name: 'Aqours First LoveLive! ～Step! ZERO to ONE～',
    nameEn: 'Aqours First LoveLive! ~Step! ZERO to ONE~',
    date: '2017-02-25',
    venue: '横浜アリーナ',
    venueEn: 'Yokohama Arena',
    city: '横浜',
    cityEn: 'Yokohama',
    groupIds: ['aqours'],
    performers: AQOURS_PLAYERS,
    setlist: [
      { songId: 'kimi-no-kokoro' },
      { songId: 'step-zero-to-one' },
      { songId: 'koi-ni-naritai-aquarium' },
    ],
    attendance: 14000,
    status: 'completed',
  },
  {
    id: 'aqours-2nd-live',
    name: 'Aqours 2nd LoveLive! HAPPY PARTY TRAIN TOUR',
    nameEn: 'Aqours 2nd LoveLive! HAPPY PARTY TRAIN TOUR',
    date: '2017-08-05',
    venue: '名古屋ドーム',
    venueEn: 'Nagoya Dome',
    city: '名古屋',
    cityEn: 'Nagoya',
    groupIds: ['aqours'],
    performers: AQOURS_PLAYERS,
    setlist: [
      { songId: 'happy-party-train' },
      { songId: 'mijuku-dreamer' },
      { songId: 'aozora-jumping-heart' },
    ],
    attendance: 25000,
    status: 'completed',
  },
  {
    id: 'aqours-3rd-live',
    name: 'Aqours 3rd LoveLive! Tour ～WONDERFUL STORIES～',
    nameEn: 'Aqours 3rd LoveLive! Tour ~WONDERFUL STORIES~',
    date: '2018-06-09',
    venue: 'さいたまスーパーアリーナ',
    venueEn: 'Saitama Super Arena',
    city: 'さいたま',
    cityEn: 'Saitama',
    groupIds: ['aqours'],
    performers: AQOURS_PLAYERS,
    setlist: [
      { songId: 'wonderful-stories' },
      { songId: 'aozora-jumping-heart' },
      { songId: 'brightest-melody' },
    ],
    attendance: 22000,
    status: 'completed',
  },
  {
    id: 'aqours-4th-live',
    name: 'Aqours 4th LoveLive! ～Sailing to the Sunshine～',
    nameEn: 'Aqours 4th LoveLive! ~Sailing to the Sunshine~',
    date: '2018-11-17',
    endDate: '2018-11-18',
    venue: '東京ドーム',
    venueEn: 'Tokyo Dome',
    city: '東京',
    cityEn: 'Tokyo',
    groupIds: ['aqours'],
    performers: AQOURS_PLAYERS,
    setlist: [
      { title: 'Sailing to the Sunshine', titleEn: 'Sailing to the Sunshine' },
      { songId: 'aozora-jumping-heart' },
      { songId: 'mirai-no-bokura-wa-shitteru-yo' },
    ],
    attendance: 55000,
    status: 'completed',
    note: 'Aqours 首次东京巨蛋公演（11/17・18 两日），出道仅三年即登东蛋。',
    noteEn: "Aqours' first Tokyo Dome show (Nov 17-18), reaching the dome only three years after debut.",
  },
  {
    id: 'aqours-5th-live',
    name: 'Aqours 5th LoveLive! ～Next SPARKLING!!～',
    nameEn: 'Aqours 5th LoveLive! ~Next SPARKLING!!~',
    date: '2019-06-08',
    endDate: '2019-06-09',
    venue: 'メットライフドーム',
    venueEn: 'MetLife Dome',
    city: '所沢',
    cityEn: 'Tokorozawa',
    groupIds: ['aqours'],
    performers: AQOURS_PLAYERS,
    setlist: [
      { songId: 'next-sparkling' },
      { title: 'キセキヒカル', titleEn: 'Kiseki Hikaru' },
      { songId: 'hop-stop-nonstop' },
    ],
    attendance: 30000,
    status: 'completed',
  },
  {
    id: 'aqours-6th-live',
    name: "Aqours 6th LoveLive! ～KU-RU-KU-RU Rock 'n' Roll TOUR～",
    nameEn: "Aqours 6th LoveLive! ~KU-RU-KU-RU Rock 'n' Roll TOUR~",
    date: '2022-02-26',
    endDate: '2022-02-27',
    venue: 'ベルーナドーム',
    venueEn: 'Belluna Dome',
    city: '所沢',
    cityEn: 'Tokorozawa',
    groupIds: ['aqours'],
    performers: AQOURS_PLAYERS,
    setlist: [
      { songId: 'kuru-kuru-cruller' },
      { title: 'DREAMY COLOR', titleEn: 'DREAMY COLOR' },
      { songId: 'mirai-no-bokura-wa-shitteru-yo' },
    ],
    attendance: 30000,
    status: 'completed',
  },
  {
    id: 'aqours-extra-dreamland-2022',
    name: 'Aqours EXTRA LoveLive! ～DREAM LAND～ 2022',
    nameEn: 'Aqours EXTRA LoveLive! ~DREAM LAND~ 2022',
    date: '2022-06-25',
    endDate: '2022-06-26',
    venue: '東京ドーム',
    venueEn: 'Tokyo Dome',
    city: '東京',
    cityEn: 'Tokyo',
    groupIds: ['aqours'],
    performers: AQOURS_PLAYERS,
    setlist: [
      { title: 'Jump up HIGH!!', titleEn: 'Jump up HIGH!!' },
      { songId: 'aozora-jumping-heart' },
      { songId: 'mirai-no-bokura-wa-shitteru-yo' },
    ],
    attendance: 55000,
    status: 'completed',
    note: 'Aqours 第二次东京巨蛋公演（6/25・26 两日），为剧场版 Over the Rainbow 后的 EXTRA 公演。',
    noteEn: "Aqours' second Tokyo Dome show (Jun 25-26), an EXTRA live following the Over the Rainbow movie.",
  },
  {
    id: 'aqours-finale-permanent-stage',
    name: 'ラブライブ！サンシャイン!! Aqours Finale LoveLive! ～永久stage～',
    nameEn: 'LoveLive! Sunshine!! Aqours Finale LoveLive! ~Towa Stage~',
    date: '2025-06-21',
    endDate: '2025-06-22',
    venue: 'ベルーナドーム',
    venueEn: 'Belluna Dome',
    city: '所沢',
    cityEn: 'Tokorozawa',
    groupIds: ['aqours'],
    performers: AQOURS_PLAYERS,
    setlist: [
      { title: 'DREAMY COLOR', titleEn: 'DREAMY COLOR' },
      { title: 'GEMSTONE "DE-A-I"', titleEn: 'GEMSTONE "DE-A-I"' },
      { songId: 'step-zero-to-one' },
      { songId: 'todokanai-hoshi-dato-shitemo' },
      { songId: 'koi-ni-naritai-aquarium' },
      { title: 'Deep Blue', titleEn: 'Deep Blue' },
      { title: 'Daydream Warrior', titleEn: 'Daydream Warrior' },
      { songId: 'aozora-jumping-heart' },
      { songId: 'omoi-yo-hitotsu-ni-nare' },
      { songId: 'mirai-ticket' },
      { songId: 'kimi-no-kokoro' },
    ],
    attendance: 100000,
    status: 'completed',
    note: 'Aqours 结成 10 周年（2015.6.30-2025.6.30）之际的 Finale Live，9 人编制最后的 One-man Live，两日含直播共动员 10 万人。',
    noteEn: 'Aqours Finale Live on their 10th anniversary, the final one-man live with all nine members, 100,000 mobilized over two days incl. streaming.',
  },

  // ==================== 虹ヶ咲 主要 Live ====================
  {
    id: 'nijigasaki-1st-live',
    name: '虹ヶ咲学園スクールアイドル同好会 First Live "with You"',
    nameEn: 'Nijigasaki High School Idol Club First Live "with You"',
    date: '2019-12-14',
    endDate: '2019-12-15',
    venue: '東京ガーデンシアター',
    venueEn: 'Tokyo Garden Theatre',
    city: '東京',
    cityEn: 'Tokyo',
    groupIds: ['nijigasaki'],
    performers: NIJI_PLAYERS_9, // 初期 9 人阵容（栞子・ミア・嵐珠加入前）
    setlist: [
      { songId: 'tokimeki-runners' },
      { songId: 'love-u-my-friends' },
      { songId: 'yume-ga-koko-kara-hajimaru-yo' },
    ],
    attendance: 8000,
    status: 'completed',
    note: 'Day.2 发布 TV 动画化决定与新成员三船栞子（小泉萌香）加入。',
    noteEn: 'TV anime adaptation and new member Shioriko Mifune announced on Day 2.',
  },
  {
    id: 'nijigasaki-2nd-live',
    name: '虹ヶ咲学園スクールアイドル同好会 2nd Live! Brand New Story',
    nameEn: 'Nijigasaki High School Idol Club 2nd Live! Brand New Story',
    date: '2021-09-04',
    endDate: '2021-09-05',
    venue: '横浜アリーナ',
    venueEn: 'Yokohama Arena',
    city: '横浜',
    cityEn: 'Yokohama',
    groupIds: ['nijigasaki'],
    performers: NIJI_PLAYERS_10, // 10 人阵容（栞子加入后、ミア/嵐珠加入前）
    setlist: [
      { songId: 'nijiiro-passions' },
      { songId: 'sweet-eyes' },
      { songId: 'neo-sky-neo-map' },
    ],
    attendance: 12000,
    status: 'completed',
  },
  {
    id: 'nijigasaki-3rd-live',
    name: '虹ヶ咲学園スクールアイドル同好会 3rd Live! School Idol Festival',
    nameEn: 'Nijigasaki High School Idol Club 3rd Live! School Idol Festival',
    date: '2022-08-20',
    endDate: '2022-08-21',
    venue: 'ZOZOマリンスタジアム',
    venueEn: 'ZOZO Marine Stadium',
    city: '千葉',
    cityEn: 'Chiba',
    groupIds: ['nijigasaki'],
    performers: NIJI_PLAYERS_12, // 12 人全员阵容（ミア・嵐珠加入后）
    setlist: [
      { songId: 'colorful-dreams' },
      { title: 'Eternal Light', titleEn: 'Eternal Light' },
      { songId: 'future-parade' },
    ],
    attendance: 25000,
    status: 'completed',
  },
  {
    id: 'nijigasaki-4th-live',
    name: '虹ヶ咲学園スクールアイドル同好会 4th Live! ~Love the Life We Live~',
    nameEn: 'Nijigasaki High School Idol Club 4th Live! ~Love the Life We Live~',
    date: '2023-12-23',
    endDate: '2023-12-24',
    venue: '東京ドーム',
    venueEn: 'Tokyo Dome',
    city: '東京',
    cityEn: 'Tokyo',
    groupIds: ['nijigasaki'],
    performers: NIJI_PLAYERS_12,
    setlist: [
      { title: 'Jump Into the New World', titleEn: 'Jump Into the New World' },
      { title: 'New Romantic Sailors', titleEn: 'New Romantic Sailors' },
      { songId: 'lll-love-the-life-we-live' },
    ],
    attendance: 45000,
    status: 'completed',
    note: '虹ヶ咲首次东京巨蛋公演。本公演起優木せつ菜役由林鼓子担任（楠木ともり于 2023 年 3 月末卸任）。',
    noteEn: "Nijigasaki's first Tokyo Dome show. Setsuna Yuki portrayed by Kokona Hayashi from this live, following Tomori Kusunoki's departure in March 2023.",
    memberStatus: [
      {
        playerId: 'kusunoki-tomori',
        attendance: 'absent',
        note: '楠木ともり已卸任，せつ菜役交棒林鼓子',
        noteEn: 'Role handed over to Kokona Hayashi',
      },
    ],
  },

  // ==================== Liella! 主要 Live ====================
  {
    id: 'liella-1st-live',
    name: 'Liella! First LoveLive! Tour ～Starlines～',
    nameEn: 'Liella! First LoveLive! Tour ~Starlines~',
    date: '2021-10-30',
    venue: '武蔵野の森総合スポーツプラザ',
    venueEn: 'Musashino Forest Sport Plaza',
    city: '東京',
    cityEn: 'Tokyo',
    groupIds: ['liella'],
    performers: LIELLA_PLAYERS_5, // 1 期生 5 人（2 期生加入前）
    setlist: [
      { songId: 'start-true-dreams' },
      { songId: 'tiny-stars' },
      { songId: 'mirai-wa-kaze-no-you-ni' },
    ],
    attendance: 8000,
    status: 'completed',
  },
  {
    id: 'liella-2nd-live',
    name: 'Liella! 2nd LoveLive! ～What a Wonderful Dream!!～',
    nameEn: 'Liella! 2nd LoveLive! ~What a Wonderful Dream!!~',
    date: '2022-03-12',
    endDate: '2022-03-13',
    venue: '横浜PIAアリーナMM',
    venueEn: 'PIA Arena MM',
    city: '横浜',
    cityEn: 'Yokohama',
    groupIds: ['liella'],
    performers: LIELLA_PLAYERS_5, // 仍为 1 期生 5 人编制
    setlist: [
      { songId: 'what-a-wonderful-dream' },
      { songId: 'nonfiction' },
      { songId: 'starlight-prologue' },
    ],
    attendance: 15000,
    status: 'completed',
  },
  {
    id: 'liella-3rd-live',
    name: 'Liella! 3rd LoveLive! Tour ～WE WILL!!～',
    nameEn: 'Liella! 3rd LoveLive! Tour ~WE WILL!!~',
    date: '2022-12-03',
    venue: 'ゼビオアリーナ仙台',
    venueEn: 'Xebio Arena Sendai',
    city: '仙台',
    cityEn: 'Sendai',
    groupIds: ['liella'],
    performers: LIELLA_PLAYERS_9, // 2 期生加入后 9 人（3 期生加入前）
    setlist: [
      { songId: 'we-will' },
      { songId: 'welcome-to-bokura-no-sekai' },
      { songId: 'go-restart' },
    ],
    attendance: 18000,
    status: 'completed',
    note: '巡演首站（仙台），2 期生 4 人首次参加 Live。',
    noteEn: 'Opening leg of the tour in Sendai, live debut of the four 2nd-generation members.',
  },
  {
    id: 'liella-4th-live',
    name: 'Liella! 4th LoveLive! Tour ～brand new Sparkle～',
    nameEn: 'Liella! 4th LoveLive! Tour ~brand new Sparkle~',
    date: '2023-08-19',
    endDate: '2023-08-20',
    venue: '幕張メッセ',
    venueEn: 'Makuhari Messe',
    city: '千葉',
    cityEn: 'Chiba',
    groupIds: ['liella'],
    performers: LIELLA_PLAYERS_11, // 3 期生加入后 11 人全员
    setlist: [
      { songId: 'miracle-new-story' },
      { title: 'Blooming Dance! Dance!', titleEn: 'Blooming Dance! Dance!' },
      { title: '_JUMP!', titleEn: '_JUMP!' },
    ],
    attendance: 22000,
    status: 'completed',
    note: '千叶公演为 KALEIDOSCORE edition（另设爱知 CatChu! edition、东京 5yncri5e! edition，按小队编成特别公演）。',
    noteEn: 'Chiba leg held as KALEIDOSCORE edition, with CatChu! and 5yncri5e! editions in Aichi and Tokyo.',
  },

  // ==================== 蓮ノ空 主要 Live ====================
  {
    id: 'hasunosora-1st-live',
    name: '蓮ノ空女学院スクールアイドルクラブ 1st Live Tour ～RUN！CAN！FUN！～',
    nameEn: 'Hasunosora Girls\' High School Idol Club 1st Live Tour ~RUN! CAN! FUN!~',
    date: '2023-11-18',
    venue: '武蔵野の森総合スポーツプラザ',
    venueEn: 'Musashino Forest Sport Plaza',
    city: '東京',
    cityEn: 'Tokyo',
    groupIds: ['hasunosora'],
    setlist: [
      { songId: 'dream-believers' },
      { title: 'Yup! Yup! Yup!', titleEn: 'Yup! Yup! Yup!' },
      { songId: 'eternal-euphoria' },
    ],
    attendance: 9000,
    status: 'completed',
  },
  {
    id: 'hasunosora-2nd-live',
    name: '蓮ノ空女学院スクールアイドルクラブ 2nd Live Tour ～Blooming with ○○○～',
    nameEn: 'Hasunosora Girls\' High School Idol Club 2nd Live Tour ~Blooming with~',
    date: '2024-09-21',
    venue: 'ガイシホール',
    venueEn: 'Gaishi Hall',
    city: '名古屋',
    cityEn: 'Nagoya',
    groupIds: ['hasunosora'],
    setlist: [
      { title: 'Blooming', titleEn: 'Blooming' },
      { title: '明日の空の僕たちへ', titleEn: 'Ashita no Sora no Bokutachi e' },
      { title: 'Legato', titleEn: 'Legato' },
    ],
    attendance: 10000,
    status: 'completed',
    note: '104 期新体制（吟子・小鈴・姫芽加入）后的首次巡演，103 期 3 人（花帆・さやか・瑠璃乃）继续在籍。',
    noteEn: 'First tour under the new 104th-generation lineup, with the three 103rd-generation members remaining.',
  },

  // ==================== Sunny Passion 主要 Live ====================
  {
    id: 'sunny-passion-1st-live',
    name: 'Sunny Passion 1st Live ～始まりの真夏～',
    nameEn: 'Sunny Passion 1st Live ~Beginning of Midsummer~',
    date: '2022-07-30',
    venue: '舞浜アンフィシアター',
    venueEn: 'Maihama Amphitheater',
    city: '千葉',
    cityEn: 'Chiba',
    groupIds: ['sunny-passion'],
    setlist: [
      { songId: 'hot-passion' },
      { songId: 'till-sunrise' },
      { title: 'SUMMER PRINCESS', titleEn: 'SUMMER PRINCESS' },
    ],
    attendance: 3000,
    status: 'completed',
  },

  // ==================== Saint Snow 主要 Live ====================
  {
    id: 'saint-snow-1st-live',
    name: 'Saint Snow Presents 圣の雪 1st Live ～WHITE OUT～',
    nameEn: 'Saint Snow Presents 1st Live ~WHITE OUT~',
    date: '2018-11-17',
    venue: 'パシフィコ横浜',
    venueEn: 'Pacifico Yokohama',
    city: '横浜',
    cityEn: 'Yokohama',
    groupIds: ['saint-snow'],
    setlist: [
      { title: 'DROPOUT!?', titleEn: 'DROPOUT!?' },
      { songId: 'crash-mind' },
      { songId: 'white-first-love' },
    ],
    attendance: 5000,
    status: 'completed',
  },

  // ==================== 跨企划合同 Live ====================
  {
    id: 'lovelive-fest-2020',
    name: 'LoveLive! Series 9th Anniversary ラブライブ！フェス',
    nameEn: 'LoveLive! Fest ~LoveLive! Series 9th Anniversary~',
    date: '2020-01-18',
    endDate: '2020-01-19',
    venue: 'さいたまスーパーアリーナ',
    venueEn: 'Saitama Super Arena',
    city: 'さいたま',
    cityEn: 'Saitama',
    groupIds: ['muse', 'aqours', 'saint-snow', 'nijigasaki'],
    // μ's 9 人 + Aqours 9 人 + Saint Snow 2 人 + 虹ヶ咲初期 9 人
    performers: [
      ...MUSE_PLAYERS,
      ...AQOURS_PLAYERS,
      'tano-asami', 'suzuki-aina-leah',
      ...NIJI_PLAYERS_9,
    ],
    setlist: [
      { songId: 'mitaiken-horizon' }, // Aqours 开场
      { songId: 'tokimeki-runners' }, // 虹ヶ咲 9 人
      { songId: 'believe-again' }, // Saint Snow
      { songId: 'bokura-no-live' }, // μ's 再集结
      { songId: 'snow-halation' }, // μ's 大合唱收尾
    ],
    attendance: 30000,
    status: 'completed',
    note: '系列 9 周年纪念合同祭典。μ’s 自 2016 Final Live 后首次全员再集结；Day.2 末尾发表全新企划（后成为 Liella!）。',
    noteEn: "Series 9th anniversary festival. μ's first full reunion since Final Live 2016; the new project (later Liella!) announced at the end of Day 2.",
    memberStatus: [
      {
        playerId: 'kito-akari',
        attendance: 'partial',
        note: '仅出演 Day.1（1/18），Day.2 因日程缺席',
        noteEn: 'Day 1 only (Jan 18)',
      },
    ],
  },
  {
    id: 'unit-koshien-2024',
    name: 'LoveLive! Series Presents ユニット甲子園 2024',
    nameEn: 'LoveLive! Series Presents Unit Koshien 2024',
    date: '2024-03-09',
    endDate: '2024-03-10',
    venue: 'Ｋアリーナ横浜',
    venueEn: 'K Arena Yokohama',
    city: '横浜',
    cityEn: 'Yokohama',
    groupIds: ['aqours', 'saint-snow', 'nijigasaki', 'liella', 'sunny-passion', 'hasunosora'],
    // 16 官方小队合同出演：Aqours 系（CYaRon!/AZALEA/Guilty Kiss/わいわいわい）、
    // Saint Snow、虹咲系（A・ZU・NA/QU4RTZ/DiverDiva/R3BIRTH）、
    // Liella! 系（CatChu!/KALEIDOSCORE/5yncri5e!）、Sunny Passion、蓮ノ空系（スリーズブーケ/DOLLCHESTRA/みらくらぱーく！）
    // 显式指定阵容：蓮ノ空仅 103 期 6 人出演（104 期 2024-04-13 才加入，不能按 groupIds 全员推导）；
    // 缺席/交棒成员通过下方 memberStatus 记录并由 getLivePerformers 剔除
    performers: [
      ...AQOURS_PLAYERS,
      // Saint Snow（理亜役条目沿用 suzuki-aina-leah 既有数据口径）
      'tano-asami', 'suzuki-aina-leah',
      ...NIJI_PLAYERS_12,
      ...LIELLA_PLAYERS_11,
      // Sunny Passion
      'watanabe-haruka', 'yoshitake-chihaya',
      // 蓮ノ空 103 期 6 人（スリーズブーケ / DOLLCHESTRA / みらくらぱーく！）
      'nirei-nozomi', 'nonaka-kokona', 'suga-kanau',
      'hanamiya-niina', 'sasaki-kotoko', 'tsukine-kona',
    ],
    setlist: [
      { title: '近未来ハッピーエンド', titleEn: 'Kinmirai Happy End' }, // CYaRon!
      { title: 'GALAXY HidE and SeeK', titleEn: 'GALAXY HidE and SeeK' }, // AZALEA
      { title: 'ワイワイワイワイ！', titleEn: 'Wai Wai Wai Wai!' }, // わいわいわい
      { songId: 'believe-again' }, // Saint Snow
      { title: 'SUPER NOVA', titleEn: 'SUPER NOVA' }, // DiverDiva
      { songId: 'holiday-holiday' }, // スリーズブーケ（Cerise Bouquet）
    ],
    attendance: 20000,
    status: 'completed',
    note: '系列全 16 官方小队参加的"甲子园"对抗赛形式合同 Live，由藤井康生实况、矢野妃菜喜（高咲侑役）解说。',
    noteEn: 'A tournament-style joint live featuring all 16 official sub-units, with play-by-play by announcer Yasuo Fujii and commentary by Hinaki Yano (Yu Takasaki).',
    memberStatus: [
      {
        playerId: 'takatsuki-kanako',
        attendance: 'absent',
        note: '两日均缺席（2024-03-04 官方发表辞演，AZALEA 以 2 人编制出演）',
        noteEn: 'Absent both days (announced Mar 4, 2024; AZALEA performed as a duo)',
      },
      {
        playerId: 'kito-akari',
        attendance: 'absent',
        note: '因日程安排两日均未出演',
        noteEn: 'Absent both days due to scheduling',
      },
      {
        playerId: 'sagara-mayu',
        attendance: 'partial',
        note: '仅出演 Day.2（3/10）',
        noteEn: 'Day 2 only (Mar 10)',
      },
      {
        playerId: 'koizumi-moeka',
        attendance: 'partial',
        note: '仅出演 Day.1（3/9）',
        noteEn: 'Day 1 only (Mar 9)',
      },
      {
        // せつ菜役已于 2023 年 3 月末交棒林鼓子（与 nijigasaki-4th-live 同一口径），本公演 A・ZU・NA 由林鼓子出演
        playerId: 'kusunoki-tomori',
        attendance: 'absent',
        note: 'せつ菜役已于 2023 年 3 月末交棒林鼓子，本公演由林鼓子出演',
        noteEn: 'Setsuna role handed over to Kokona Hayashi since Mar 2023; performed by Hayashi',
      },
    ],
  },
  {
    id: 'countdown-lovelive-2021',
    name: 'LoveLive! Series Presents COUNTDOWN LoveLive! 2021→2022 〜LIVE with a smile!〜',
    nameEn: 'LoveLive! Series Presents COUNTDOWN LoveLive! 2021→2022 ~LIVE with a smile!~',
    date: '2021-12-31',
    venue: 'ぴあアリーナMM',
    venueEn: 'Pia Arena MM',
    city: '横浜',
    cityEn: 'Yokohama',
    groupIds: ['aqours', 'nijigasaki', 'liella'],
    // Aqours 9 人 + 虹ヶ咲 12 人 + Liella! 1 期生 5 人
    performers: [
      ...AQOURS_PLAYERS,
      ...NIJI_PLAYERS_12,
      ...LIELLA_PLAYERS_5,
    ],
    setlist: [
      { songId: 'hajimari-wa-kimi-no-sora' }, // 三团代表合同开场
      { songId: 'tokimeki-runners' },
      { title: 'DREAMY COLOR', titleEn: 'DREAMY COLOR' },
      { songId: 'water-blue-new-world' }, // Aqours 篇章
      { songId: 'just-believe' }, // 虹ヶ咲 篇章
      { songId: 'nonfiction' }, // Liella! 篇章
      { title: 'LIVE with a smile!', titleEn: 'LIVE with a smile!' }, // 三团合同主题歌
    ],
    status: 'completed',
    note: '系列首次跨年倒计时合同 Live（21:00 开演）。国木田花丸役・高槻かなこの出演一度悬而未决，2021-12-26 官方确认按计划出演。',
    noteEn: 'The series\u2019 first countdown joint live. Kanako Takatsuki\u2019s participation was confirmed on Dec 26, 2021 after careful consideration.',
  },
]
