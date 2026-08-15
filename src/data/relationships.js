/**
 * LoveLive! HLTV - 组合成员关系数据
 * 描述角色间的小队 / CP 关系，用于 Team 详情页的关系图
 *
 * 关系类型说明：
 * - officialUnit: 官方小队（官方定义的演唱/活动小队，如 Printemps、CYaRon!、DiverDiva 等）
 * - subunit: 年级组/世代组（按学年或加入世代划分的分组，非官方演唱单位）
 * - cp: 玩家自创 CP / 搭档组合（粉丝向的成员配对）
 * - admiration: 跨企划"憧憬"关系（作品内的粉丝/仰慕设定，有方向性：from → to）
 * - crossUnit: 跨企划组合（官方结成的、横跨多个企划的限定组合，如 AiScReam）
 * - sameAgency: 声优层面的跨企划关系（同一事务所）
 *
 * 归属说明：
 * - 单企划关系使用 groupId（在该企划详情页展示）
 * - 跨企划关系使用 groupIds 数组（在所有涉及企划的详情页展示）
 */

export const relationships = [
  // ===== μ's 关系 =====
  // 官方小队
  { id: 'muse-printemps', groupId: 'muse', name: 'Printemps', nameEn: 'Printemps', members: ['穂乃果', 'ことり', '花陽'], type: 'officialUnit' },
  { id: 'muse-bibi', groupId: 'muse', name: 'BiBi', nameEn: 'BiBi', members: ['絵里', '真姫', 'にこ'], type: 'officialUnit' },
  { id: 'muse-lily-white', groupId: 'muse', name: 'lily white', nameEn: 'lily white', members: ['海未', '凛', '希'], type: 'officialUnit' },
  // 年级组
  { id: 'muse-core-trio', groupId: 'muse', name: '二年生トリオ', nameEn: '2nd Year Trio', members: ['穂乃果', 'ことり', '海未'], type: 'subunit' },
  { id: 'muse-third-years', groupId: 'muse', name: '三年生組', nameEn: '3rd Year Group', members: ['絵里', 'にこ', '希'], type: 'subunit' },
  { id: 'muse-first-years', groupId: 'muse', name: '一年生組', nameEn: '1st Year Group', members: ['真姫', '凛', '花陽'], type: 'subunit' },
  // CP
  { id: 'muse-honoka-eli', groupId: 'muse', name: '会長コンビ', nameEn: 'President Pair', members: ['穂乃果', '絵里'], type: 'cp' },
  { id: 'muse-kotori-rin', groupId: 'muse', name: 'もふもふコンビ', nameEn: 'Fluffy Pair', members: ['ことり', '凛'], type: 'cp' },
  { id: 'muse-umi-maki', groupId: 'muse', name: '真面目コンビ', nameEn: 'Serious Pair', members: ['海未', '真姫'], type: 'cp' },

  // ===== Aqours 关系 =====
  // 官方小队
  { id: 'aqours-cyaron', groupId: 'aqours', name: 'CYaRon!', nameEn: 'CYaRon!', members: ['千歌', '曜', 'ルビィ'], type: 'officialUnit' },
  { id: 'aqours-azalea', groupId: 'aqours', name: 'AZALEA', nameEn: 'AZALEA', members: ['果南', 'ダイヤ', '花丸'], type: 'officialUnit' },
  { id: 'aqours-guilty-kiss', groupId: 'aqours', name: 'Guilty Kiss', nameEn: 'Guilty Kiss', members: ['梨子', '善子', '鞠莉'], type: 'officialUnit' },
  // 年级组
  { id: 'aqours-core-trio', groupId: 'aqours', name: '二年生トリオ', nameEn: '2nd Year Trio', members: ['千歌', '梨子', '曜'], type: 'subunit' },
  { id: 'aqours-third-years', groupId: 'aqours', name: '三年生組', nameEn: '3rd Year Group', members: ['果南', 'ダイヤ', '鞠莉'], type: 'subunit' },
  { id: 'aqours-first-years', groupId: 'aqours', name: '一年生組', nameEn: '1st Year Group', members: ['善子', '花丸', 'ルビィ'], type: 'subunit' },
  // CP
  { id: 'aqours-dia-ruby', groupId: 'aqours', name: '黒澤姉妹', nameEn: 'Kurosawa Sisters', members: ['ダイヤ', 'ルビィ'], type: 'cp' },
  { id: 'aqours-you-yoshiko', groupId: 'aqours', name: '幼馴染コンビ', nameEn: 'Childhood Friends', members: ['曜', '善子'], type: 'cp' },
  { id: 'aqours-kanan-mari', groupId: 'aqours', name: '帰国子女コンビ', nameEn: 'Returnee Pair', members: ['果南', '鞠莉'], type: 'cp' },

  // ===== 虹ヶ咲 关系 =====
  // 官方小队
  { id: 'niji-diverdiva', groupId: 'nijigasaki', name: 'DiverDiva', nameEn: 'DiverDiva', members: ['愛', '果林'], type: 'officialUnit' },
  { id: 'niji-azuna', groupId: 'nijigasaki', name: 'A・ZU・NA', nameEn: 'A・ZU・NA', members: ['歩夢', 'しずく', '彼方'], type: 'officialUnit' },
  { id: 'niji-qu4rtz', groupId: 'nijigasaki', name: 'QU4RTZ', nameEn: 'QU4RTZ', members: ['かすみ', 'せつ菜', 'エマ', '璃奈'], type: 'officialUnit' },
  { id: 'niji-r3birth', groupId: 'nijigasaki', name: 'R3BIRTH', nameEn: 'R3BIRTH', members: ['栞子', 'ミア', '嵐珠'], type: 'officialUnit' },
  // CP
  { id: 'niji-ayumu-kasumi', groupId: 'nijigasaki', name: '幼馴染コンビ', nameEn: 'Childhood Friends', members: ['歩夢', 'かすみ'], type: 'cp' },

  // ===== Liella! 关系 =====
  // 官方小队
  { id: 'liella-catchu', groupId: 'liella', name: 'CatChu!', nameEn: 'CatChu!', members: ['かのん', '千砂都', 'すみれ'], type: 'officialUnit' },
  { id: 'liella-kaleidoscope', groupId: 'liella', name: 'KALEIDOSCORE', nameEn: 'KALEIDOSCORE', members: ['可可', '恋', 'マルガレーテ'], type: 'officialUnit' },
  { id: 'liella-5yncri5e', groupId: 'liella', name: '5yncri5e!', nameEn: '5yncri5e!', members: ['きな子', 'メイ', '四季', '夏美', '冬毬'], type: 'officialUnit' },
  // 世代组
  { id: 'liella-core-trio', groupId: 'liella', name: '一期生トリオ', nameEn: '1st Gen Trio', members: ['かのん', '可可', '千砂都'], type: 'subunit' },
  // CP
  { id: 'liella-sisters', groupId: 'liella', name: '鬼塚姉妹', nameEn: 'Onitsuka Sisters', members: ['夏美', '冬毬'], type: 'cp' },

  // ===== 蓮ノ空 关系 =====
  // 官方小队（成员为含毕业生的历史全阵容：103 期初代 + 104 期新成员）
  { id: 'hasu-cerise', groupId: 'hasunosora', name: 'スリーズブーケ', nameEn: 'Cerise Bouquet', members: ['花帆', '梢', '吟子'], type: 'officialUnit' },
  { id: 'hasu-dollchestra', groupId: 'hasunosora', name: 'DOLLCHESTRA', nameEn: 'DOLLCHESTRA', members: ['さやか', '綴理', '小鈴'], type: 'officialUnit' },
  { id: 'hasu-mirakura', groupId: 'hasunosora', name: 'みらくらぱーく！', nameEn: 'Mira-Cra Park!', members: ['瑠璃乃', '慈', '姫芽'], type: 'officialUnit' },
  { id: 'hasu-edel-note', groupId: 'hasunosora', name: 'Edel Note', nameEn: 'Edel Note', members: ['セラス', '泉'], type: 'officialUnit',
    description: '105 期结成的第 4 小队（セラス・泉）。2026 年春解散后，泉以学园偶像个人身份活动，セラス自 106 期起加入 DOLLCHESTRA。',
    descriptionEn: 'The 4th unit formed by the 105th generation. After disbanding in spring 2026, Izumi went solo while Ceras moved to DOLLCHESTRA from the 106th generation.' },
  // 世代组（103 期创团 → 104 期世代交替 → 105 期新体制）
  { id: 'hasu-103', groupId: 'hasunosora', name: '103期生', nameEn: '103rd Generation', members: ['花帆', 'さやか', '瑠璃乃', '梢', '綴理', '慈'], type: 'subunit',
    description: '2023 年创团的初代 6 人。2024 年 3 月梢・綴理・慈毕业，花帆・さやか・瑠璃乃继续在籍。',
    descriptionEn: 'The founding six of 2023. Kozue, Tsuzuri and Megumi graduated in March 2024; Kaho, Sayaka and Rurino remained.' },
  { id: 'hasu-104', groupId: 'hasunosora', name: '104期生', nameEn: '104th Generation', members: ['吟子', '小鈴', '姫芽'], type: 'subunit',
    description: '2024 年 4 月加入的 3 名新成员，分别补入三条迷你小队，完成世代交替。',
    descriptionEn: 'Three new members who joined in April 2024, each filling one of the three mini-units.' },
  { id: 'hasu-105', groupId: 'hasunosora', name: '105期生', nameEn: '105th Generation', members: ['セラス', '泉'], type: 'subunit',
    description: '2025 年 4 月加入的 2 名新成员（他校转编），结成第 4 小队 Edel Note。',
    descriptionEn: 'Two transfer students who joined in April 2025 and formed the fourth unit, Edel Note.' },

  // ===== Saint Snow 关系 =====
  { id: 'saint-snow-sisters', groupId: 'saint-snow', name: 'Kazuno姉妹', nameEn: 'Kazuno Sisters', members: ['聖良', '理亜'], type: 'cp' },

  // ===== 跨企划"憧憬"关系（作品内粉丝设定，from → to） =====
  { id: 'admire-aqours-muse', type: 'admiration',
    groupIds: ['aqours', 'muse'],
    name: '憧れのμ\'s', nameEn: "Admiration for μ's",
    from: { groupId: 'aqours', members: ['千歌', '梨子', 'ダイヤ'] },
    to: { groupId: 'muse', members: ['穂乃果'] },
    description: '《Sunshine!!》的故事起点：浦之星的少女们憧憬传说中的学园偶像 μ\'s，为拯救濒临废校的母校而踏上同样的道路（梨子更是从 μ\'s 的母校音乃木坂转学而来）。',
    descriptionEn: "The starting point of Sunshine!!: the girls of Uranohoshi admired μ's and followed the same path to save their school (Riko even transferred from μ's school, Otonokizaka)." },
  { id: 'admire-dia-honoka', type: 'admiration',
    groupIds: ['aqours', 'muse'],
    name: '穂乃果への憧憬', nameEn: 'Devotion to Honoka',
    from: { groupId: 'aqours', members: ['ダイヤ'] },
    to: { groupId: 'muse', members: ['穂乃果'] },
    description: '一丝不苟的学生会长黑泽黛雅，实际上是 μ\'s（尤其高坂穗乃果）的狂热粉丝——动画第 1 期第 4 集揭晓的著名设定。',
    descriptionEn: "The stern student council president Dia is secretly a huge fan of μ's — especially Kosaka Honoka — as revealed in Sunshine!! S1E4." },

  // ===== 声优层面的跨企划关系（三次元：跨企划组合 / 同事务所） =====
  { id: 'cross-aiscream', type: 'crossUnit',
    groupIds: ['aqours', 'nijigasaki', 'liella', 'hasunosora'],
    name: 'AiScReam', nameEn: 'AiScReam',
    members: ['ルビィ', '歩夢', '四季', 'セラス'],
    description: '系列首个横跨多企划的期间限定组合，源自广播节目「ラブライブ！シリーズのALL NIGHT NIPPON GOLD」：初期成员为ルビィ（Aqours）・歩夢（虹ヶ咲）・四季（Liella!），代表曲《愛♡スクリ～ム！》；2026 年 4 月起ルビィ毕业、セラス（蓮ノ空）加入新体制。',
    descriptionEn: 'The first cross-project limited unit, born from the radio show "LoveLive! Series ALL NIGHT NIPPON GOLD": Ruby (Aqours), Ayumu (Nijigasaki) and Shiki (Liella!) debuted with "Ai♡Scream!"; from April 2026 Ceras (Hasunosora) joined the new lineup.' },
  { id: 'agency-hibiki', type: 'sameAgency',
    groupIds: ['muse', 'hasunosora'],
    name: '同一事务所：響', nameEn: 'Same Agency: Hibiki',
    members: ['海未', '泉'],
    description: '三森すずこ（海未役，μ\'s）与進藤あまね（泉役，蓮ノ空）同属声优事务所「響」——系列首尾两代企划成员的事务所交集。',
    descriptionEn: "Suzuko Mimori (Umi, μ's) and Amane Shindo (Izumi, Hasunosora) both belong to the voice actor agency Hibiki." },
]
