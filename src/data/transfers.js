/**
 * LoveLive! HLTV - "转会"系统数据（HLTV Transfers 映射，Phase 6.2）
 *
 * 记录成员加入/毕业/活动休止/声优交棒的"生涯变动"，在 PlayerDetail 页
 * 以"生涯变动"卡片展示（类似 HLTV 选手转会历史）。
 *
 * type 说明：
 *   join      - 加入企划（结成成员 / 追加成员）
 *   graduation- 毕业（蓮ノ空世代交替等；含已官宣的预定毕业公演）
 *   hiatus    - 企划活动休止（μ's Final Live 后）
 *   recast    - 角色声优交棒（楠木ともり → 林鼓子）
 *
 * 字段说明：
 *   playerId  - 关联 players.js 中的选手 id
 *   date      - 日期，三种精度（与 precision 对应）：'YYYY' / 'YYYY-MM' / 'YYYY-MM-DD'
 *   precision - 日期精度：'year' | 'month' | 'day'
 *   note/noteEn - 变动说明中英文
 *
 * 数据来源：官网公告（如虹咲新成员加入告知 2021.08.31）、llwiki / 萌娘百科 /
 * bochuai wiki（蓮ノ空各期加入与毕业生放送日期）、本项目 history.js 既有交叉验证结论
 */

// ===== 同批次成员 id 列表（用于批量生成同期记录） =====

// μ's 初代 9 人
const MUSE_IDS = [
  'nitta-emi', 'nango-yoshino', 'uchida-aya', 'mimori-suzuko',
  'iida-riho', 'pile', 'kubo-yurika', 'tokui-sora', 'kushida-aina',
]

// Aqours 初代 9 人
const AQOURS_IDS = [
  'inami-anju', 'aida-riko', 'suwa-nanaka', 'komiya-arisa',
  'saito-shuka', 'kobayashi-aika', 'takatsuki-kanako', 'suzuki-aina', 'furihata-ai',
]

// 虹咲 PDP 公开时的初期 9 人
const NIJI_INITIAL_IDS = [
  'onishi-aguri-niji', 'sagara-mayu', 'maeda-kaori', 'kubota-miyu',
  'murakami-natsumi', 'kito-akari', 'kusunoki-tomori', 'sashide-maria', 'tanaka-chiemi',
]

// Liella! 1 期生（结成成员）5 人
const LIELLA_1ST_IDS = ['date-sayuri', 'liyuu', 'misaki-nako', 'payton-naomi', 'aoyama-nagisa']

// Liella! 2 期生 4 人
const LIELLA_2ND_IDS = ['suzuhara-nozomi-kinako', 'yabushima-akane', 'okuma-wakana', 'emori-aya']

// Liella! 3 期生 2 人
const LIELLA_3RD_IDS = ['yuna', 'sakakura-hana']

// 蓮ノ空 103 期初代 6 人
const HASU_103_IDS = [
  'nirei-nozomi', 'nonaka-kokona', 'suga-kanau',
  'hanamiya-niina', 'sasaki-kotoko', 'tsukine-kona',
]

// 蓮ノ空 103 期 3 年生（2025 年春毕业）
const HASU_103_GRAD_IDS = ['hanamiya-niina', 'sasaki-kotoko', 'tsukine-kona']

// 蓮ノ空 103 期剩余 3 人（卒業公演预定 2027 年 1 月）
const HASU_103_REMAIN_IDS = ['nirei-nozomi', 'nonaka-kokona', 'suga-kanau']

// 蓮ノ空 104 期 3 人
const HASU_104_IDS = ['sakurai-hina', 'hayama-fuka', 'kurusu-rin']

// 蓮ノ空 105 期 2 人
const HASU_105_IDS = ['miyake-miyu', 'shindo-amane']

// Saint Snow 2 人
const SAINT_SNOW_IDS = ['tano-asami', 'suzuki-aina-leah']

// Sunny Passion 2 人
const SUNNY_PASSION_IDS = ['watanabe-haruka', 'yoshitake-chihaya']

// 内部辅助：按 id 列表批量生成同日期、同说明的记录
function bulk(playerIds, fields) {
  return playerIds.map(playerId => ({ playerId, ...fields }))
}

/**
 * 全部生涯变动记录（组件按 playerId 过滤使用）
 */
export const TRANSFERS = [
  // ===== μ's =====
  // 2010-06-30 结成（电撃G's magazine 读者参与企划发表）
  ...bulk(MUSE_IDS, {
    type: 'join',
    date: '2010-06-30',
    precision: 'day',
    note: "電撃G's magazine 发表读者参与企划，初代 9 人组合结成（结成纪念日）",
    noteEn: "Readers-participation project announced in Dengeki G's Magazine; founding 9-member lineup (celebrated as formation day)",
  }),
  // 2016-04-01 Final Live 后活动休止
  ...bulk(MUSE_IDS, {
    type: 'hiatus',
    date: '2016-04-01',
    precision: 'day',
    note: "μ's Final Live（東京ドーム）Day.2 后企划无限期活动休止；2020 年 LoveLive! Fest 曾全员再集结",
    noteEn: "\u03BC's activities paused indefinitely after Final Live Day.2 at Tokyo Dome; the group reunited at LoveLive! Fest 2020",
  }),

  // ===== Aqours =====
  ...bulk(AQOURS_IDS, {
    type: 'join',
    date: '2015-06-30',
    precision: 'day',
    note: 'Sunshine!! 企划始动，团体名 Aqours 经读者投票决定',
    noteEn: 'Sunshine!! project launched; the name Aqours was chosen by reader vote',
  }),

  // ===== Saint Snow =====
  ...bulk(SAINT_SNOW_IDS, {
    type: 'join',
    date: '2016-08',
    precision: 'month',
    note: '《Sunshine!!》动画第 1 期登场，函馆对手组合',
    noteEn: 'Appeared in "Sunshine!!" Season 1 as a rival unit from Hakodate',
  }),

  // ===== Sunny Passion =====
  ...bulk(SUNNY_PASSION_IDS, {
    type: 'join',
    date: '2021-08',
    precision: 'month',
    note: '《Superstar!!》动画第 1 期登场，热海对手组合',
    noteEn: 'Appeared in "Superstar!!" Season 1 as a rival unit from Atami',
  }),

  // ===== 虹ヶ咲 =====
  // 初期 9 人：PDP 企划公开
  ...bulk(NIJI_INITIAL_IDS, {
    type: 'join',
    date: '2017-03-30',
    precision: 'day',
    note: '「スクールアイドルフェスティバル PERFECT Dream Project」公开，9 人逐步披露（虹ヶ咲前身）',
    noteEn: 'The "School Idol Festival PERFECT Dream Project" was revealed, introducing 9 idols over time (predecessor of Nijigasaki)',
  }),
  // 栞子：系列首个成员追加（第 10 人），2020-08-03 官方宣布正式加入
  {
    playerId: 'koizumi-moeka',
    type: 'join',
    date: '2020-08-03',
    precision: 'day',
    note: '系列首个成员追加（第 10 人）；动画第 1 期最终话先行登场，第 2 期正式加入',
    noteEn: 'The series\u2019 first member addition (10th member); cameoed in the Season 1 finale and fully joined in Season 2',
  },
  // ミア・嵐珠：2021-08-31 官方公告正式加入（12 人体制）
  ...bulk(['uchida-shu', 'homoto-akina'], {
    type: 'join',
    date: '2021-08-31',
    precision: 'day',
    note: '官方公告正式加入（12 人体制），翌日举办欢迎生放送；动画第 2 期登场，官方小队 R3BIRTH 结成',
    noteEn: 'Officially announced as new members (12-member lineup) with a welcome stream the next day; debuted in Season 2 and formed the unit R3BIRTH',
  }),
  // せつ菜役声优交棒：楠木ともり 2023 年 3 月末卸任，虹ヶ咲 4th Live 起由林鼓子担任
  {
    playerId: 'kusunoki-tomori',
    type: 'recast',
    date: '2023-12-23',
    precision: 'day',
    note: '楠木ともり于 2023 年 3 月末卸任；虹ヶ咲 4th Live（東京ドーム）起せつ菜役由林鼓子担任',
    noteEn: 'Tomori Kusunoki stepped down at the end of March 2023; Setsuna has been portrayed by Kokona Hayashi since Nijigasaki 4th Live at Tokyo Dome',
  },

  // ===== Liella! =====
  // 1 期生：2020-12-14 主役 5 人声优发表
  ...bulk(LIELLA_1ST_IDS, {
    type: 'join',
    date: '2020-12-14',
    precision: 'day',
    note: '主役 5 人声优发表，结成成员（1 期生）',
    noteEn: 'The 5 founding actresses were revealed (1st generation)',
  }),
  // 2 期生：2022-05 声优发表（9 人体制）
  ...bulk(LIELLA_2ND_IDS, {
    type: 'join',
    date: '2022-05',
    precision: 'month',
    note: '2 期生 4 人加入（9 人体制）；动画第 2 期起登场',
    noteEn: '4 second-generation members joined (9-member lineup); debuted from Season 2',
  }),
  // 3 期生：2023-06 发表（11 人体制）
  ...bulk(LIELLA_3RD_IDS, {
    type: 'join',
    date: '2023-06',
    precision: 'month',
    note: '3 期生 2 人加入（11 人体制）',
    noteEn: '2 third-generation members joined (11-member lineup)',
  }),

  // ===== 蓮ノ空（世代交替） =====
  // 103 期：App 开幕初登场
  ...bulk(HASU_103_IDS, {
    type: 'join',
    date: '2023-04',
    precision: 'month',
    note: '「Link! Like! LoveLive!」App 开幕，103 期 6 人初登场',
    noteEn: 'The "Link! Like! LoveLive!" app launched, debuting the 6 members of the 103rd class',
  }),
  // 104 期：2024-04-13 生放送宣布正式加入
  ...bulk(HASU_104_IDS, {
    type: 'join',
    date: '2024-04-13',
    precision: 'day',
    note: '104 期 3 人正式加入（新 1 年生），翌日举办特别生放送',
    noteEn: '3 members of the 104th class officially joined as new first-years, with a special stream the next day',
  }),
  // 103 期 3 年生：2025-03-30 蓮華祭毕业演出（系列首个世代交替）
  ...bulk(HASU_103_GRAD_IDS, {
    type: 'graduation',
    date: '2025-03-30',
    precision: 'day',
    note: '104 期 Fes×LIVE「蓮華祭」毕业演出，系列首个完整的世代交替节点',
    noteEn: 'Graduation performance at the 104th-class Fes\u00d7LIVE "Renka-sai" \u2014 the series\u2019 first full generational change',
  }),
  // 105 期：2025-04-10 生放送宣布加入，Edel Note 结成
  ...bulk(HASU_105_IDS, {
    type: 'join',
    date: '2025-04-10',
    precision: 'day',
    note: '原瑞河女子高等学校 2 人转籍加入，新官方小队 Edel Note 结成',
    noteEn: '2 members transferred in from Mizukawa Girls\u2019 High School, forming the new official unit Edel Note',
  }),
  // 103 期剩余 3 人：卒業公演预定（2027-01 日本武道館，本条目为预定）
  ...bulk(HASU_103_REMAIN_IDS, {
    type: 'graduation',
    date: '2027-01',
    precision: 'month',
    note: '「Link Live Dream ～103 期卒業公演～」预定于日本武道館举办（预定，3D 电影《Bloom Garden Party》已先行描绘毕业前夕）',
    noteEn: '"Link Live Dream \u2014 103rd Class Graduation Concert" is scheduled at Nippon Budokan (upcoming; the 3D movie "Bloom Garden Party" depicts the eve of their graduation)',
  }),
]
