/**
 * LoveLive! HLTV - 组合成员关系数据
 * 描述角色间的小队 / CP 关系，用于 Team 详情页的关系图
 */

export const relationships = [
  // μ's 关系
  { id: 'muse-core-trio', groupId: 'muse', name: '二年生トリオ', nameEn: '2nd Year Trio', members: ['穂乃果', 'ことり', '海未'], type: 'subunit' },
  { id: 'muse-third-years', groupId: 'muse', name: '三年生組', nameEn: '3rd Year Group', members: ['絵里', 'にこ', '希'], type: 'subunit' },
  { id: 'muse-first-years', groupId: 'muse', name: '一年生組', nameEn: '1st Year Group', members: ['真姫', '凛', '花陽'], type: 'subunit' },
  { id: 'muse-honoka-eli', groupId: 'muse', name: '会長コンビ', nameEn: 'President Pair', members: ['穂乃果', '絵里'], type: 'cp' },
  { id: 'muse-kotori-rin', groupId: 'muse', name: 'もふもふコンビ', nameEn: 'Fluffy Pair', members: ['ことり', '凛'], type: 'cp' },
  { id: 'muse-umi-maki', groupId: 'muse', name: '真面目コンビ', nameEn: 'Serious Pair', members: ['海未', '真姫'], type: 'cp' },
  // Aqours 关系
  { id: 'aqours-core-trio', groupId: 'aqours', name: '二年生トリオ', nameEn: '2nd Year Trio', members: ['千歌', '梨子', '曜'], type: 'subunit' },
  { id: 'aqours-third-years', groupId: 'aqours', name: '三年生組', nameEn: '3rd Year Group', members: ['果南', 'ダイヤ', '鞠莉'], type: 'subunit' },
  { id: 'aqours-first-years', groupId: 'aqours', name: '一年生組', nameEn: '1st Year Group', members: ['善子', '花丸', 'ルビィ'], type: 'subunit' },
  { id: 'aqours-dia-ruby', groupId: 'aqours', name: '黒澤姉妹', nameEn: 'Kurosawa Sisters', members: ['ダイヤ', 'ルビィ'], type: 'cp' },
  { id: 'aqours-you-yoshiko', groupId: 'aqours', name: '幼馴染コンビ', nameEn: 'Childhood Friends', members: ['曜', '善子'], type: 'cp' },
  { id: 'aqours-kanan-mari', groupId: 'aqours', name: '帰国子女コンビ', nameEn: 'Returnee Pair', members: ['果南', '鞠莉'], type: 'cp' },
  // 虹ヶ咲 关系
  { id: 'niji-diverdiva', groupId: 'nijigasaki', name: 'DiverDiva', nameEn: 'DiverDiva', members: ['愛', '果林'], type: 'subunit' },
  { id: 'niji-azuna', groupId: 'nijigasaki', name: 'A・ZU・NA', nameEn: 'A・ZU・NA', members: ['歩夢', 'しずく', '彼方'], type: 'subunit' },
  { id: 'niji-qu4rtz', groupId: 'nijigasaki', name: 'QU4RTZ', nameEn: 'QU4RTZ', members: ['かすみ', 'せつ菜', 'エマ', '璃奈'], type: 'subunit' },
  { id: 'niji-r3birth', groupId: 'nijigasaki', name: 'R3BIRTH', nameEn: 'R3BIRTH', members: ['栞子', 'ミア', '嵐珠'], type: 'subunit' },
  { id: 'niji-ayumu-kasumi', groupId: 'nijigasaki', name: '幼馴染コンビ', nameEn: 'Childhood Friends', members: ['歩夢', 'かすみ'], type: 'cp' },
  // Liella! 关系
  { id: 'liella-core-trio', groupId: 'liella', name: '一期生トリオ', nameEn: '1st Gen Trio', members: ['かのん', '可可', '千砂都'], type: 'subunit' },
  { id: 'liella-catchu', groupId: 'liella', name: 'CatChu!', nameEn: 'CatChu!', members: ['かのん', '千砂都', 'すみれ'], type: 'subunit' },
  { id: 'liella-kaleidoscope', groupId: 'liella', name: 'KALEIDOSCORE', nameEn: 'KALEIDOSCORE', members: ['可可', '恋', 'マルガレーテ'], type: 'subunit' },
  { id: 'liella-5yncri5e', groupId: 'liella', name: '5yncri5e!', nameEn: '5yncri5e!', members: ['きな子', 'メイ', '四季', '夏美', '冬毬'], type: 'subunit' },
  { id: 'liella-sisters', groupId: 'liella', name: '鬼塚姉妹', nameEn: 'Onitsuka Sisters', members: ['夏美', '冬毬'], type: 'cp' },
  // 蓮ノ空 关系
  { id: 'hasu-cerise', groupId: 'hasunosora', name: 'スリーズブーケ', nameEn: 'Cerise Bouquet', members: ['花帆', '梢'], type: 'subunit' },
  { id: 'hasu-dollchestra', groupId: 'hasunosora', name: 'DOLLCHESTRA', nameEn: 'DOLLCHESTRA', members: ['さやか', '綴理'], type: 'subunit' },
  { id: 'hasu-mirakura', groupId: 'hasunosora', name: 'みらくらぱーく！', nameEn: 'Mira-Cra Park!', members: ['瑠璃乃', '慈'], type: 'subunit' },
  // Saint Snow 关系
  { id: 'saint-snow-sisters', groupId: 'saint-snow', name: 'Kazuno姉妹', nameEn: 'Kazuno Sisters', members: ['聖良', '理亜'], type: 'cp' },
]
