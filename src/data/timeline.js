/**
 * LoveLive! HLTV - 选手生涯时间线静态里程碑数据
 *
 * 用于 PlayerDetail 页的生涯时间线（Phase 5.4）：
 *   - 声优视角（出道/加入企划/solo 曲/重大活动）主要从 songs/lives/events 动态推导（见 seiyuu.js getCareerTimeline）
 *   - 角色视角的「动画登场」「毕业节点」无法从现有数据推导，在本文件人工维护
 *
 * 字段说明：
 *   date      - 日期，支持三种精度（与 precision 对应）：'YYYY' / 'YYYY-MM' / 'YYYY-MM-DD'
 *   precision - 日期精度：'year' | 'month' | 'day'（仅到月/年的公开资料不虚构具体日）
 *   note/noteEn - 节点说明中英文
 */

/**
 * 动画/企划登场节点
 * 结构：{ [groupId]: { date, precision, note, noteEn, overrides: { [角色名]: { date, precision, note, noteEn } } } }
 * overrides 按角色名覆盖追加成员（虹咲 2 期、Liella! 2/3 期生、蓮ノ空 104/105 期等）的登场时间
 */
export const ANIME_DEBUTS = {
  muse: {
    date: '2013-01-06',
    precision: 'day',
    note: 'TV 动画《LoveLive!》第 1 期放送开始，9 人初次登场',
    noteEn: 'TV anime "LoveLive!" Season 1 began airing, marking the 9 members\u2019 anime debut',
  },
  aqours: {
    date: '2016-07-02',
    precision: 'day',
    note: 'TV 动画《LoveLive! Sunshine!!》第 1 期放送开始，9 人初次登场',
    noteEn: 'TV anime "LoveLive! Sunshine!!" Season 1 began airing, marking the 9 members\u2019 anime debut',
  },
  'saint-snow': {
    date: '2016-08',
    precision: 'month',
    note: 'TV 动画《LoveLive! Sunshine!!》第 1 期中登场',
    noteEn: 'Appeared in "LoveLive! Sunshine!!" Season 1',
  },
  nijigasaki: {
    date: '2020-10-03',
    precision: 'day',
    note: 'TV 动画《虹ヶ咲学園スクールアイドル同好会》第 1 期放送开始，9 人初次登场',
    noteEn: 'TV anime "Nijigasaki High School Idol Club" Season 1 began airing, marking the 9 members\u2019 anime debut',
    overrides: {
      // 第 2 期正式加入的成员（栞子在第 1 期 finale 仅客串登场）
      栞子: {
        date: '2022-04',
        precision: 'month',
        note: 'TV 动画第 2 期正式加入（第 1 期最终话已先行登场）',
        noteEn: 'Fully joined in Season 2 (cameo in the Season 1 finale)',
      },
      ミア: {
        date: '2022-04',
        precision: 'month',
        note: 'TV 动画第 2 期登场（转校生）',
        noteEn: 'Debuted in Season 2 as a transfer student',
      },
      嵐珠: {
        date: '2022-04',
        precision: 'month',
        note: 'TV 动画第 2 期登场（归国子女）',
        noteEn: 'Debuted in Season 2 as a returnee',
      },
    },
  },
  liella: {
    date: '2021-07-11',
    precision: 'day',
    note: 'TV 动画《LoveLive! Superstar!!》第 1 期放送开始，1 期生 5 人初次登场',
    noteEn: 'TV anime "LoveLive! Superstar!!" Season 1 began airing, marking the 5 first-generation members\u2019 anime debut',
    overrides: {
      // 2 期生（S2 登场）
      きな子: {
        date: '2022-07',
        precision: 'month',
        note: 'TV 动画第 2 期登场（2 期生）',
        noteEn: 'Debuted in Season 2 (2nd generation)',
      },
      メイ: {
        date: '2022-07',
        precision: 'month',
        note: 'TV 动画第 2 期登场（2 期生）',
        noteEn: 'Debuted in Season 2 (2nd generation)',
      },
      四季: {
        date: '2022-07',
        precision: 'month',
        note: 'TV 动画第 2 期登场（2 期生）',
        noteEn: 'Debuted in Season 2 (2nd generation)',
      },
      夏美: {
        date: '2022-07',
        precision: 'month',
        note: 'TV 动画第 2 期登场（2 期生）',
        noteEn: 'Debuted in Season 2 (2nd generation)',
      },
      // 3 期生（S3 登场）
      マルガレーテ: {
        date: '2024-10',
        precision: 'month',
        note: 'TV 动画第 3 期登场（3 期生）',
        noteEn: 'Debuted in Season 3 (3rd generation)',
      },
      冬毬: {
        date: '2024-10',
        precision: 'month',
        note: 'TV 动画第 3 期登场（3 期生）',
        noteEn: 'Debuted in Season 3 (3rd generation)',
      },
    },
  },
  'sunny-passion': {
    date: '2021-08',
    precision: 'month',
    note: 'TV 动画《LoveLive! Superstar!!》第 1 期中登场（对手组合）',
    noteEn: 'Appeared in "LoveLive! Superstar!!" Season 1 as a rival unit',
  },
  hasunosora: {
    date: '2023-04',
    precision: 'month',
    note: '「Link! Like! LoveLive!」App 企划开幕，103 期 6 人初次登场',
    noteEn: 'The "Link! Like! LoveLive!" app launched, debuting the 6 members of the 103rd class',
    overrides: {
      // 104 期新成员
      吟子: {
        date: '2024-04',
        precision: 'month',
        note: '104 期加入（新 1 年生）',
        noteEn: 'Joined in the 104th class year (new first-year)',
      },
      小鈴: {
        date: '2024-04',
        precision: 'month',
        note: '104 期加入（新 1 年生）',
        noteEn: 'Joined in the 104th class year (new first-year)',
      },
      姫芽: {
        date: '2024-04',
        precision: 'month',
        note: '104 期加入（新 1 年生）',
        noteEn: 'Joined in the 104th class year (new first-year)',
      },
      // 105 期新成员
      セラス: {
        date: '2025-04',
        precision: 'month',
        note: '105 期加入，Edel Note 结成',
        noteEn: 'Joined in the 105th class year; Edel Note formed',
      },
      泉: {
        date: '2025-04',
        precision: 'month',
        note: '105 期加入，Edel Note 结成',
        noteEn: 'Joined in the 105th class year; Edel Note formed',
      },
    },
  },
}

/**
 * 毕业 / 活动休止节点
 * 结构：{ characterName, date, precision, note, noteEn }
 * 说明：Aqours/虹咲/Liella! 尚无毕业节点；蓮ノ空 103 期 3 年生（梢/綴理/慈）于 2025 年春毕业
 */
export const GRADUATIONS = [
  // μ's 全员：Final Live 后企划活动休止（系列通称「μ's 毕业公演」）
  ...['穂乃果', '絵里', 'ことり', '海未', '凛', '真姫', '花陽', 'にこ', '希'].map(characterName => ({
    characterName,
    date: '2016-04-01',
    precision: 'day',
    note: "μ's Final Live（東京ドーム）举办，企划活动休止",
    noteEn: "\u03BC's Final Live at Tokyo Dome; group activities paused",
  })),
  // 蓮ノ空 103 期 3 年生：2025 年春学期结束毕业（毕业纪念 solo 专辑发行于 2025-06）
  ...['梢', '綴理', '慈'].map(characterName => ({
    characterName,
    date: '2025-03',
    precision: 'month',
    note: '蓮ノ空 103 期 3 年生毕业（世代交替）',
    noteEn: 'Graduated as 103rd-class third-years at Hasunosora (generational change)',
  })),
]
