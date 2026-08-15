/**
 * LoveLive! HLTV - 歌曲数据
 * 用于 Live 详情页的歌单展示、排行榜的流媒体/CD数据，以及歌曲列表/详情页
 *
 * 字段说明：
 *   type: 'single' 单曲主打 | 'coupling' 单曲耦合曲(c/w) | 'album' 专辑曲 | 'solo' 角色 solo 曲
 *   singleId: 所属唱片 ID（对应 discs.js）
 *   releaseDate: 发行日期
 *   center: Center 成员（角色名数组，多人 Center 时为多元素）
 *   performers: 演唱阵容（角色名数组，可用 getPlayerByCharacterName 解析到选手）
 *   lyricist / composer: 作词 / 作曲
 *   streams: 流媒体播放量（合理模拟值）
 *   sales: 销量（单曲/专辑内曲目与唱片销量一致，Oricon 可查者取近似真实值）
 *
 * 数据来源：官方 CD 页、Oricon、llwiki/维基等多源交叉验证；未确认字段省略
 * 莲之空 104/105 期成员（吟子/小鈴/姫芽/セラス/泉）已录入 players.js（含 generation 世代标记，
 * 见 Phase 4.4），performers 可正常解析到选手页
 */

// 各企划常见演唱阵容（按角色名）
const MUSE_ALL = ['穂乃果', '絵里', 'ことり', '海未', '凛', '真姫', '花陽', 'にこ', '希']
const AQOURS_ALL = ['千歌', '梨子', '果南', 'ダイヤ', '曜', '善子', '花丸', 'ルビィ', '鞠莉']
const NIJI_9 = ['歩夢', 'かすみ', 'しずく', '果林', '愛', '彼方', 'せつ菜', 'エマ', '璃奈']
const NIJI_10 = [...NIJI_9, '栞子']
const NIJI_12 = [...NIJI_10, 'ミア', '嵐珠']
const LIELLA_5 = ['かのん', '可可', '千砂都', 'すみれ', '恋']
const LIELLA_9 = [...LIELLA_5, 'きな子', 'メイ', '四季', '夏美']
const LIELLA_11 = [...LIELLA_9, 'マルガレーテ', '冬毬']
const HASU_103 = ['花帆', 'さやか', '瑠璃乃', '梢', '綴理', '慈']
const HASU_104 = ['花帆', 'さやか', '瑠璃乃', '吟子', '小鈴', '姫芽']
const HASU_105 = [...HASU_104, 'セラス', '泉']

export const songs = [
  // ==================== μ's ====================
  // 1st Single「僕らのLIVE 君とのLIFE」
  { id: 'bokura-no-live', title: '僕らのLIVE 君とのLIFE', titleEn: 'Bokura no LIVE Kimi to no LIFE', groupId: 'muse', type: 'single', singleId: 'muse-1st', releaseDate: '2010-08-25', center: ['穂乃果'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '山田高弘', streams: 38000000, sales: 2400 },
  { id: 'yuujou-no-change', title: '友情ノーチェンジ', titleEn: 'Yuujou No Change', groupId: 'muse', type: 'coupling', singleId: 'muse-1st', releaseDate: '2010-08-25', performers: MUSE_ALL, lyricist: '畑亜貴', streams: 26000000, sales: 2400 },
  // 2nd Single「Snow halation」
  { id: 'snow-halation', title: 'Snow halation', titleEn: 'Snow halation', groupId: 'muse', type: 'single', singleId: 'muse-2nd', releaseDate: '2010-12-22', center: ['穂乃果'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '山田高弘', streams: 128500000, sales: 4900 },
  { id: 'baby-maybe-koi-no-botan', title: 'baby maybe 恋のボタン', titleEn: 'baby maybe Koi no Button', groupId: 'muse', type: 'coupling', singleId: 'muse-2nd', releaseDate: '2010-12-22', performers: MUSE_ALL, lyricist: '畑亜貴', streams: 19000000, sales: 4900 },
  // 3rd Single「夏色えがおで1,2,Jump!」
  { id: 'natsuiro-egao-1-2-jump', title: '夏色えがおで1,2,Jump!', titleEn: 'Natsuiro Egao de 1,2,Jump!', groupId: 'muse', type: 'single', singleId: 'muse-3rd', releaseDate: '2011-08-24', center: ['にこ'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '奥松誠', streams: 64000000, sales: 9800 },
  { id: 'mermaid-festa-vol1', title: 'Mermaid festa vol.1', titleEn: 'Mermaid festa vol.1', groupId: 'muse', type: 'coupling', singleId: 'muse-3rd', releaseDate: '2011-08-24', performers: MUSE_ALL, lyricist: '畑亜貴', streams: 22000000, sales: 9800 },
  // 4th Single「もぎゅっと"love"で接近中!」
  { id: 'mogyutto-love-de-sekkinchu', title: 'もぎゅっと"love"で接近中!', titleEn: 'Mogyutto "love" de Sekkin Chuu!', groupId: 'muse', type: 'single', singleId: 'muse-4th', releaseDate: '2012-02-15', center: ['穂乃果'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '増田達行', streams: 58000000, sales: 21000 },
  { id: 'aishiteru-banzai', title: '愛してるばんざーい!', titleEn: 'Aishiteru Banzai!', groupId: 'muse', type: 'coupling', singleId: 'muse-4th', releaseDate: '2012-02-15', performers: MUSE_ALL, lyricist: '畑亜貴', streams: 34000000, sales: 21000 },
  // 5th Single「Wonderful Rush」
  { id: 'wonderful-rush', title: 'Wonderful Rush', titleEn: 'Wonderful Rush', groupId: 'muse', type: 'single', singleId: 'muse-5th', releaseDate: '2012-09-05', center: ['ことり'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '河田貴央', streams: 55000000, sales: 23000 },
  { id: 'oh-love-and-peace', title: 'Oh,Love&Peace!', titleEn: 'Oh, Love & Peace!', groupId: 'muse', type: 'coupling', singleId: 'muse-5th', releaseDate: '2012-09-05', performers: MUSE_ALL, lyricist: '畑亜貴', streams: 18000000, sales: 23000 },
  // 6th Single「Music S.T.A.R.T!!」
  { id: 'music-start', title: 'Music S.T.A.R.T!!', titleEn: 'Music S.T.A.R.T!!', groupId: 'muse', type: 'single', singleId: 'muse-6th', releaseDate: '2013-11-27', center: ['真姫'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '山口朗彦', streams: 42000000, sales: 63000 },
  { id: 'loveless-world', title: 'LOVELESS WORLD', titleEn: 'LOVELESS WORLD', groupId: 'muse', type: 'coupling', singleId: 'muse-6th', releaseDate: '2013-11-27', performers: MUSE_ALL, lyricist: '畑亜貴', streams: 21000000, sales: 63000 },
  // 7th Single (FINAL)「MOMENT RING」
  { id: 'moment-ring', title: 'MOMENT RING', titleEn: 'MOMENT RING', groupId: 'muse', type: 'single', singleId: 'muse-7th', releaseDate: '2016-03-02', center: ['穂乃果', 'ことり', '海未'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '高田暁', streams: 36000000, sales: 86000 },
  { id: 'sayonara-e-sayonara', title: 'さようならへさよなら!', titleEn: 'Sayounara e Sayonara!', groupId: 'muse', type: 'coupling', singleId: 'muse-7th', releaseDate: '2016-03-02', performers: MUSE_ALL, lyricist: '畑亜貴', streams: 16000000, sales: 86000 },
  // 九周年纪念单曲「A song for You! You? You!!」
  { id: 'a-song-for-you', title: 'A song for You! You? You!!', titleEn: 'A song for You! You? You!!', groupId: 'muse', type: 'single', singleId: 'muse-9th-aniv', releaseDate: '2020-03-25', center: ['穂乃果'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '高田暁', streams: 28000000, sales: 78000 },
  { id: 'natte-shimatta', title: 'なってしまった!', titleEn: 'Natte Shimatta!', groupId: 'muse', type: 'coupling', singleId: 'muse-9th-aniv', releaseDate: '2020-03-25', performers: MUSE_ALL, lyricist: '畑亜貴', streams: 12000000, sales: 78000 },
  // 动画1期 OP/ED
  { id: 'bokura-wa-imano-naka-de', title: '僕らは今のなかで', titleEn: 'Bokura wa Ima no Naka de', groupId: 'muse', type: 'single', singleId: 'muse-op1', releaseDate: '2013-01-23', center: ['穂乃果'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '森慎太郎', streams: 92000000, sales: 37000 },
  { id: 'wild-stars', title: 'WILD STARS', titleEn: 'WILD STARS', groupId: 'muse', type: 'coupling', singleId: 'muse-op1', releaseDate: '2013-01-23', performers: MUSE_ALL, lyricist: '畑亜貴', streams: 24000000, sales: 37000 },
  { id: 'kitto-seishun-ga-kikoeru', title: 'きっと青春が聞こえる', titleEn: 'Kitto Seishun ga Kikoeru', groupId: 'muse', type: 'single', singleId: 'muse-ed1', releaseDate: '2013-02-06', center: ['穂乃果'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '高田暁', streams: 71000000, sales: 40000 },
  { id: 'kaguya-no-shiro-de-odoroitai', title: '輝夜の城で踊りたい', titleEn: 'Kaguya no Shiro de Odoritai', groupId: 'muse', type: 'coupling', singleId: 'muse-ed1', releaseDate: '2013-02-06', performers: MUSE_ALL, lyricist: '畑亜貴', streams: 20000000, sales: 40000 },
  // 插入歌单曲（3人编制「ススメ→トゥモロウ」等）
  { id: 'susume-tomorrow', title: 'ススメ→トゥモロウ', titleEn: 'Susume→Tomorrow', groupId: 'muse', type: 'single', singleId: 'muse-susume', releaseDate: '2013-02-20', center: ['穂乃果'], performers: ['穂乃果', 'ことり', '海未'], lyricist: '畑亜貴', streams: 39000000, sales: 36000 },
  { id: 'start-dash-3nin', title: 'START:DASH!! (3人Ver.)', titleEn: 'START:DASH!! (3 Members Ver.)', groupId: 'muse', type: 'coupling', singleId: 'muse-susume', releaseDate: '2013-02-20', center: ['穂乃果'], performers: ['穂乃果', 'ことり', '海未'], lyricist: '畑亜貴', streams: 42000000, sales: 36000 }, // 动画1期第2〜3话 3人版本
  { id: 'kore-kara-no-someday', title: 'これからのSomeday', titleEn: 'Kore kara no Someday', groupId: 'muse', type: 'single', singleId: 'muse-someday', releaseDate: '2013-03-06', performers: null, lyricist: '畑亜貴', streams: 27000000, sales: 42000 }, // 7人编制（详细阵容待确认）
  { id: 'wonder-zone', title: 'Wonder zone', titleEn: 'Wonder zone', groupId: 'muse', type: 'single', singleId: 'muse-someday', releaseDate: '2013-03-06', center: ['ことり'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '佐々倉有吾', streams: 31000000, sales: 42000 },
  { id: 'no-brand-girls', title: 'No brand girls', titleEn: 'No brand girls', groupId: 'muse', type: 'single', singleId: 'muse-nb-start', releaseDate: '2013-04-03', center: ['穂乃果'], performers: MUSE_ALL, lyricist: '畑亜貴', streams: 37000000, sales: 48000 },
  { id: 'start-dash', title: 'START:DASH!!', titleEn: 'START:DASH!!', groupId: 'muse', type: 'single', singleId: 'muse-nb-start', releaseDate: '2013-04-03', center: ['穂乃果'], performers: MUSE_ALL, lyricist: '畑亜貴', streams: 98500000, sales: 48000 },
  // 动画2期 OP/ED 及插入歌单曲
  { id: 'sore-wa-bokutachi-no-kiseki', title: 'それは僕たちの奇跡', titleEn: 'Sore wa Bokutachi no Kiseki', groupId: 'muse', type: 'single', singleId: 'muse-op2', releaseDate: '2014-04-23', center: ['穂乃果'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '黒須克彦', streams: 76000000, sales: 81000 },
  { id: 'datte-datte-a-mujou', title: 'だってだって噫無情', titleEn: 'Datte Datte A Mujou', groupId: 'muse', type: 'coupling', singleId: 'muse-op2', releaseDate: '2014-04-23', performers: MUSE_ALL, lyricist: '畑亜貴', streams: 28000000, sales: 81000 },
  { id: 'donna-toki-mo-zutto', title: 'どんなときもずっと', titleEn: 'Donna Toki mo Zutto', groupId: 'muse', type: 'single', singleId: 'muse-ed2', releaseDate: '2014-05-08', center: ['穂乃果'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '佐々木裕', streams: 54000000, sales: 78000 },
  { id: 'colorful-voice', title: 'COLORFUL VOICE', titleEn: 'COLORFUL VOICE', groupId: 'muse', type: 'coupling', singleId: 'muse-ed2', releaseDate: '2014-05-08', performers: MUSE_ALL, lyricist: '畑亜貴', streams: 17000000, sales: 78000 },
  { id: 'yume-no-tobira', title: 'ユメノトビラ', titleEn: 'Yume no Tobira', groupId: 'muse', type: 'single', singleId: 'muse-yumetobira', releaseDate: '2014-05-28', center: ['穂乃果'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '佐伯高志', streams: 66000000, sales: 72000 },
  { id: 'sentimental-steps', title: 'SENTIMENTAL StepS', titleEn: 'SENTIMENTAL StepS', groupId: 'muse', type: 'coupling', singleId: 'muse-yumetobira', releaseDate: '2014-05-28', performers: MUSE_ALL, lyricist: '畑亜貴', streams: 15000000, sales: 72000 },
  { id: 'love-wing-bell', title: 'Love wing bell', titleEn: 'Love wing bell', groupId: 'muse', type: 'single', singleId: 'muse-lwb-dsom', releaseDate: '2014-06-11', center: ['凛'], performers: ['絵里', '凛', '真姫', '希', '花陽', 'にこ'], lyricist: '畑亜貴', composer: '森慎太郎', streams: 32000000, sales: 69000 },
  { id: 'dancing-stars-on-me', title: 'Dancing stars on me!', titleEn: 'Dancing stars on me!', groupId: 'muse', type: 'single', singleId: 'muse-lwb-dsom', releaseDate: '2014-06-11', center: ['希'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '佐伯高志', streams: 48000000, sales: 69000 },
  { id: 'kira-kira-sensation', title: 'KiRa-KiRa Sensation!', titleEn: 'KiRa-KiRa Sensation!', groupId: 'muse', type: 'single', singleId: 'muse-kira-happy', releaseDate: '2014-07-09', center: ['穂乃果'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '本田光史郎', streams: 82000000, sales: 74000 },
  { id: 'happy-maker', title: 'Happy maker!', titleEn: 'Happy maker!', groupId: 'muse', type: 'single', singleId: 'muse-kira-happy', releaseDate: '2014-07-09', center: ['穂乃果'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '前口渉', streams: 61000000, sales: 74000 },
  // 游戏/企划联动单曲
  { id: 'takaramonozu', title: 'タカラモノズ', titleEn: 'Takaramonozu', groupId: 'muse', type: 'single', singleId: 'muse-takaramonozu', releaseDate: '2014-01-29', performers: ['穂乃果', '凛', 'にこ'], lyricist: '畑亜貴', composer: '高田暁', streams: 41000000, sales: 55000 },
  { id: 'paradise-live', title: 'Paradise Live', titleEn: 'Paradise Live', groupId: 'muse', type: 'coupling', singleId: 'muse-takaramonozu', releaseDate: '2014-01-29', performers: MUSE_ALL, lyricist: '畑亜貴', composer: '倉内達矢', streams: 23000000, sales: 55000 },
  { id: 'shangri-la-shower', title: 'Shangri-La Shower', titleEn: 'Shangri-La Shower', groupId: 'muse', type: 'single', singleId: 'muse-shangri-la', releaseDate: '2014-10-01', performers: MUSE_ALL, lyricist: '畑亜貴', composer: '倉内達矢', streams: 45000000, sales: 62000 },
  { id: 'ruteshi-kisuki-shiteru', title: 'るてしキスキしてる', titleEn: 'Ruteshi Kiski Shiteru', groupId: 'muse', type: 'coupling', singleId: 'muse-shangri-la', releaseDate: '2014-10-01', performers: ['穂乃果', 'ことり', 'にこ'], lyricist: '畑亜貴', streams: 19000000, sales: 62000 },
  { id: 'mi-wa-music-no-mi', title: "ミはμ'sicのミ", titleEn: "Mi wa Music no Mi", groupId: 'muse', type: 'single', singleId: 'muse-mi-music', releaseDate: '2015-04-22', center: ['穂乃果'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '高田暁', streams: 33000000, sales: 70000 },
  { id: 'super-love-super-live', title: 'Super LOVE=Super LIVE!', titleEn: 'Super LOVE=Super LIVE!', groupId: 'muse', type: 'coupling', singleId: 'muse-mi-music', releaseDate: '2015-04-22', performers: MUSE_ALL, lyricist: '畑亜貴', composer: '河田貴央', streams: 25000000, sales: 70000 },
  { id: 'heart-to-heart', title: 'HEART to HEART!', titleEn: 'HEART to HEART!', groupId: 'muse', type: 'single', singleId: 'muse-heart-to-heart', releaseDate: '2015-10-28', center: ['穂乃果'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '西岡和哉', streams: 35000000, sales: 68000 },
  { id: 'arashi-no-naka-no-koi-dakara', title: '嵐のなかの恋だから', titleEn: 'Arashi no Naka no Koi Dakara', groupId: 'muse', type: 'coupling', singleId: 'muse-heart-to-heart', releaseDate: '2015-10-28', performers: MUSE_ALL, lyricist: '畑亜貴', composer: '酒井陽一', streams: 14000000, sales: 68000 },
  // 剧场版单曲
  { id: 'angelic-angel', title: 'Angelic Angel', titleEn: 'Angelic Angel', groupId: 'muse', type: 'single', singleId: 'muse-angelic', releaseDate: '2015-07-01', center: ['絵里'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '森慎太郎', streams: 68000000, sales: 80000 },
  { id: 'hello-hoshi-wo-kazoete', title: 'Hello,星を数えて', titleEn: 'Hello, Hoshi o Kazoete', groupId: 'muse', type: 'coupling', singleId: 'muse-angelic', releaseDate: '2015-07-01', performers: ['凛', '花陽', 'にこ'], lyricist: '畑亜貴', composer: '山口朗彦', streams: 26000000, sales: 80000 },
  { id: 'sunny-day-song', title: 'SUNNY DAY SONG', titleEn: 'SUNNY DAY SONG', groupId: 'muse', type: 'single', singleId: 'muse-sunny-day', releaseDate: '2015-07-08', center: ['穂乃果'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: '倉内達矢', streams: 59000000, sales: 79000 },
  { id: 'heart-beat', title: '？←HEARTBEAT', titleEn: '?←HEARTBEAT', groupId: 'muse', type: 'coupling', singleId: 'muse-sunny-day', releaseDate: '2015-07-08', center: ['にこ'], performers: ['絵里', '希', 'にこ'], lyricist: '畑亜貴', composer: '本田光史郎', streams: 18000000, sales: 79000 },
  { id: 'bokutachi-wa-hitosu-no-hikari', title: '僕たちはひとつの光', titleEn: 'Bokutachi wa Hitotsu no Hikari', groupId: 'muse', type: 'single', singleId: 'muse-hikari', releaseDate: '2015-07-15', center: ['穂乃果'], performers: MUSE_ALL, lyricist: '畑亜貴', composer: 'ZAQ', streams: 112000000, sales: 82000 },
  { id: 'future-style', title: 'Future style', titleEn: 'Future style', groupId: 'muse', type: 'coupling', singleId: 'muse-hikari', releaseDate: '2015-07-15', center: ['穂乃果'], performers: ['穂乃果', 'ことり', '海未'], lyricist: '畑亜貴', composer: '本田光史郎', streams: 29000000, sales: 82000 },

  // ==================== Aqours ====================
  // 1st Single「君のこころは輝いてるかい?」（金唱片认证）
  { id: 'kimi-no-kokoro', title: '君のこころは輝いてるかい?', titleEn: 'Kimi no Kokoro wa Kagayaiteru kai?', groupId: 'aqours', type: 'single', singleId: 'aqours-1st', releaseDate: '2015-10-07', center: ['千歌'], performers: AQOURS_ALL, lyricist: '畑亜貴', composer: '光増ハジメ', streams: 92000000, sales: 95000 },
  { id: 'step-zero-to-one', title: 'Step! ZERO to ONE', titleEn: 'Step! ZERO to ONE', groupId: 'aqours', type: 'coupling', singleId: 'aqours-1st', releaseDate: '2015-10-07', performers: AQOURS_ALL, lyricist: '畑亜貴', streams: 21000000, sales: 95000 },
  { id: 'aqours-heroes', title: 'Aqours☆HEROES', titleEn: 'Aqours☆HEROES', groupId: 'aqours', type: 'coupling', singleId: 'aqours-1st', releaseDate: '2015-10-07', performers: AQOURS_ALL, lyricist: '畑亜貴', streams: 17000000, sales: 95000 },
  // 2nd Single「恋になりたいAQUARIUM」
  { id: 'koi-ni-naritai-aquarium', title: '恋になりたいAQUARIUM', titleEn: 'Koi ni Naritai AQUARIUM', groupId: 'aqours', type: 'single', singleId: 'aqours-2nd', releaseDate: '2016-04-27', center: ['曜'], performers: AQOURS_ALL, lyricist: '畑亜貴', composer: '佐々倉有吾', streams: 63000000, sales: 78000 },
  { id: 'mattete-ai-no-uta', title: '待ってて愛のうた', titleEn: 'Mattette Ai no Uta', groupId: 'aqours', type: 'coupling', singleId: 'aqours-2nd', releaseDate: '2016-04-27', performers: AQOURS_ALL, lyricist: '畑亜貴', streams: 19000000, sales: 78000 },
  { id: 'todokanai-hoshi-dato-shitemo', title: '届かない星だとしても', titleEn: 'Todokanai Hoshi dato Shitemo', groupId: 'aqours', type: 'coupling', singleId: 'aqours-2nd', releaseDate: '2016-04-27', performers: AQOURS_ALL, lyricist: '畑亜貴', streams: 16000000, sales: 78000 },
  // 3rd Single「HAPPY PARTY TRAIN」
  { id: 'happy-party-train', title: 'HAPPY PARTY TRAIN', titleEn: 'HAPPY PARTY TRAIN', groupId: 'aqours', type: 'single', singleId: 'aqours-3rd', releaseDate: '2017-04-05', center: ['果南'], performers: AQOURS_ALL, lyricist: '畑亜貴', composer: '渡辺拓也', streams: 72000000, sales: 54500 },
  { id: 'sky-journey', title: 'SKY JOURNEY', titleEn: 'SKY JOURNEY', groupId: 'aqours', type: 'coupling', singleId: 'aqours-3rd', releaseDate: '2017-04-05', performers: AQOURS_ALL, lyricist: '畑亜貴', streams: 23000000, sales: 54500 },
  { id: 'shoujo-ijou-no-koi-ga-shitai', title: '少女以上の恋がしたい', titleEn: 'Shoujo Ijou no Koi ga Shitai', groupId: 'aqours', type: 'coupling', singleId: 'aqours-3rd', releaseDate: '2017-04-05', performers: AQOURS_ALL, lyricist: '畑亜貴', streams: 15000000, sales: 54500 },
  // 4th Single「未体験HORIZON」
  { id: 'mitaiken-horizon', title: '未体験HORIZON', titleEn: 'Mitaiken HORIZON', groupId: 'aqours', type: 'single', singleId: 'aqours-4th', releaseDate: '2019-09-25', center: ['花丸'], performers: AQOURS_ALL, lyricist: '畑亜貴', composer: '小高光太郎・UiNA', streams: 44000000, sales: 58000 },
  // 动画1期 OP/ED 及插入歌单曲
  { id: 'aozora-jumping-heart', title: '青空Jumping Heart', titleEn: 'Aozora Jumping Heart', groupId: 'aqours', type: 'single', singleId: 'aqours-op1', releaseDate: '2016-07-20', center: ['千歌'], performers: AQOURS_ALL, lyricist: '畑亜貴', composer: '伊藤賢・光増ハジメ', streams: 105000000, sales: 62000 },
  { id: 'humming-friend', title: 'ハミングフレンド', titleEn: 'Humming Friend', groupId: 'aqours', type: 'coupling', singleId: 'aqours-op1', releaseDate: '2016-07-20', performers: AQOURS_ALL, lyricist: '畑亜貴', streams: 18000000, sales: 62000 },
  { id: 'yume-kataru-yori-yume-utaou', title: 'ユメ語るよりユメ歌おう', titleEn: 'Yume Kataru yori Yume Utaou', groupId: 'aqours', type: 'single', singleId: 'aqours-ed1', releaseDate: '2016-08-24', center: ['千歌'], performers: AQOURS_ALL, lyricist: '畑亜貴', composer: '山口朗彦', streams: 51000000, sales: 46000 },
  { id: 'sunshine-pikkapika-ondo', title: 'サンシャインぴっかぴか音頭', titleEn: 'Sunshine Pikkapika Ondo', groupId: 'aqours', type: 'coupling', singleId: 'aqours-ed1', releaseDate: '2016-08-24', performers: AQOURS_ALL, lyricist: '畑亜貴', streams: 12000000, sales: 46000 },
  { id: 'yume-de-yozora-wo-terashitai', title: '夢で夜空を照らしたい', titleEn: 'Yume de Yozora wo Terashitai', groupId: 'aqours', type: 'single', singleId: 'aqours-yume-mijuku', releaseDate: '2016-09-14', performers: ['千歌', '梨子', '曜', '善子', '花丸', 'ルビィ'], lyricist: '畑亜貴', composer: '光増ハジメ', streams: 47000000, sales: 55000 }, // 2年生+1年生 6人编制
  { id: 'mijuku-dreamer', title: '未熟DREAMER', titleEn: 'Mijuku DREAMER', groupId: 'aqours', type: 'single', singleId: 'aqours-yume-mijuku', releaseDate: '2016-09-14', performers: AQOURS_ALL, lyricist: '畑亜貴', composer: '渡辺和紀', streams: 57000000, sales: 55000 },
  { id: 'omoi-yo-hitotsu-ni-nare', title: '想いよひとつになれ', titleEn: 'Omoi yo Hitotsu ni Nare', groupId: 'aqours', type: 'single', singleId: 'aqours-omoi-mirai', releaseDate: '2016-11-09', performers: ['果南', 'ダイヤ', '鞠莉'], lyricist: '畑亜貴', composer: '佐伯高志', streams: 43000000, sales: 51000 },
  { id: 'mirai-ticket', title: 'MIRAI TICKET', titleEn: 'MIRAI TICKET', groupId: 'aqours', type: 'single', singleId: 'aqours-omoi-mirai', releaseDate: '2016-11-09', center: ['千歌'], performers: AQOURS_ALL, lyricist: '畑亜貴', composer: 'EFFY', streams: 49000000, sales: 51000 },
  { id: 'jingle-bell-ga-tomaranai', title: 'ジングルベルがとまらない', titleEn: 'Jingle Bell ga Tomaranai', groupId: 'aqours', type: 'single', singleId: 'aqours-jingle', releaseDate: '2016-11-23', performers: AQOURS_ALL, lyricist: '畑亜貴', composer: '光増ハジメ', streams: 28000000, sales: 48000 },
  { id: 'sei-naru-hi-no-inori', title: '聖なる日の祈り', titleEn: 'Sei naru Hi no Inori', groupId: 'aqours', type: 'coupling', singleId: 'aqours-jingle', releaseDate: '2016-11-23', performers: AQOURS_ALL, lyricist: '畑亜貴', streams: 11000000, sales: 48000 },
  // 动画2期 OP/ED 及插入歌单曲
  { id: 'mirai-no-bokura-wa-shitteru-yo', title: '未来の僕らは知ってるよ', titleEn: 'Mirai no Bokura wa Shitteru yo', groupId: 'aqours', type: 'single', singleId: 'aqours-op2', releaseDate: '2017-10-25', center: ['千歌'], performers: AQOURS_ALL, lyricist: '畑亜貴', composer: '光増ハジメ', streams: 88000000, sales: 85000 },
  { id: 'kimi-no-hitomi-wo-meguru-bouken', title: '君の瞳を巡る冒険', titleEn: 'Kimi no Hitomi wo Meguru Bouken', groupId: 'aqours', type: 'coupling', singleId: 'aqours-op2', releaseDate: '2017-10-25', performers: AQOURS_ALL, lyricist: '畑亜貴', streams: 20000000, sales: 85000 },
  { id: 'yuuki-wa-doko-ni', title: '勇気はどこに?君の胸に!', titleEn: 'Yuuki wa Doko ni? Kimi no Mune ni!', groupId: 'aqours', type: 'single', singleId: 'aqours-ed2', releaseDate: '2017-11-15', center: ['千歌'], performers: AQOURS_ALL, lyricist: '畑亜貴', composer: '小高光太郎・UiNA', streams: 39000000, sales: 53000 },
  { id: 'my-list-to-you', title: '"MY LIST" to you!', titleEn: '"MY LIST" to you!', groupId: 'aqours', type: 'coupling', singleId: 'aqours-ed2', releaseDate: '2017-11-15', performers: AQOURS_ALL, lyricist: '畑亜貴', streams: 14000000, sales: 53000 },
  { id: 'my-mai-tonight', title: 'MY舞☆TONIGHT', titleEn: 'MY Mai☆TONIGHT', groupId: 'aqours', type: 'single', singleId: 'aqours-mymai-miracle', releaseDate: '2017-11-29', center: ['曜'], performers: ['千歌', '梨子', '曜'], lyricist: '畑亜貴', composer: 'EFFY', streams: 46000000, sales: 56000 },
  { id: 'miracle-wave', title: 'MIRACLE WAVE', titleEn: 'MIRACLE WAVE', groupId: 'aqours', type: 'single', singleId: 'aqours-mymai-miracle', releaseDate: '2017-11-29', center: ['曜'], performers: AQOURS_ALL, lyricist: '畑亜貴', composer: '酒井拓也', streams: 44000000, sales: 56000 },
  { id: 'water-blue-new-world', title: 'WATER BLUE NEW WORLD', titleEn: 'WATER BLUE NEW WORLD', groupId: 'aqours', type: 'single', singleId: 'aqours-wbnw-ws', releaseDate: '2018-01-17', center: ['千歌'], performers: AQOURS_ALL, lyricist: '畑亜貴', composer: '佐伯高志', streams: 52000000, sales: 60000 },
  { id: 'wonderful-stories', title: 'WONDERFUL STORIES', titleEn: 'WONDERFUL STORIES', groupId: 'aqours', type: 'single', singleId: 'aqours-wbnw-ws', releaseDate: '2018-01-17', center: ['千歌'], performers: AQOURS_ALL, lyricist: '畑亜貴', composer: 'Carlos K.', streams: 41000000, sales: 60000 },
  // 剧场版单曲
  { id: 'bokura-no-hashitte-kita-michi-wa', title: '僕らの走ってきた道は…', titleEn: 'Bokura no Hashitte Kita Michi wa...', groupId: 'aqours', type: 'single', singleId: 'aqours-movie1', releaseDate: '2019-01-23', center: ['千歌'], performers: AQOURS_ALL, lyricist: '畑亜貴', composer: 'EFFY', streams: 36000000, sales: 61000 },
  { id: 'next-sparkling', title: 'Next SPARKLING!!', titleEn: 'Next SPARKLING!!', groupId: 'aqours', type: 'single', singleId: 'aqours-movie1', releaseDate: '2019-01-23', center: ['千歌'], performers: AQOURS_ALL, lyricist: '畑亜貴', composer: 'Carlos K.', streams: 58000000, sales: 61000 },
  { id: 'tousou-meisou-mebius-loop', title: '逃走迷走メビウスループ', titleEn: 'Tousou Meisou Mebius Loop', groupId: 'aqours', type: 'solo', singleId: 'aqours-movie2', releaseDate: '2019-01-30', center: ['鞠莉'], performers: ['鞠莉'], lyricist: '畑亜貴', composer: '山口朗彦', streams: 18000000, sales: 58000 },
  { id: 'hop-stop-nonstop', title: 'Hop? Stop? Nonstop!', titleEn: 'Hop? Stop? Nonstop!', groupId: 'aqours', type: 'single', singleId: 'aqours-movie2', releaseDate: '2019-01-30', center: ['千歌'], performers: AQOURS_ALL, lyricist: '畑亜貴', composer: 'Kanata Okajima・Keisuke Koyama', streams: 38000000, sales: 58000 },
  { id: 'believe-again', title: 'Believe again', titleEn: 'Believe again', groupId: 'saint-snow', type: 'single', singleId: 'aqours-movie3', releaseDate: '2019-02-06', performers: ['聖良', '理亜'], lyricist: '畑亜貴', streams: 16000000, sales: 62000 },
  { id: 'brightest-melody', title: 'Brightest Melody', titleEn: 'Brightest Melody', groupId: 'aqours', type: 'single', singleId: 'aqours-movie3', releaseDate: '2019-02-06', center: ['千歌'], performers: AQOURS_ALL, lyricist: '畑亜貴', composer: '光増ハジメ', streams: 65000000, sales: 62000 },
  { id: 'over-the-next-rainbow', title: 'Over The Next Rainbow', titleEn: 'Over The Next Rainbow', groupId: 'aqours', type: 'single', singleId: 'aqours-movie3', releaseDate: '2019-02-06', performers: ['聖良', '理亜', 'ダイヤ'], lyricist: '畑亜貴', streams: 25000000, sales: 62000 },
  // Live 主题歌/纪念/联动单曲
  { id: 'thank-you-friends', title: 'Thank you, FRIENDS!!', titleEn: 'Thank you, FRIENDS!!', groupId: 'aqours', type: 'single', singleId: 'aqours-thankyou', releaseDate: '2018-08-01', performers: AQOURS_ALL, lyricist: '畑亜貴', composer: 'TAKAROT・イワツボコーダイ', streams: 30000000, sales: 52000 },
  { id: 'kokoro-magic', title: 'KOKORO Magic "A to Z"', titleEn: 'KOKORO Magic "A to Z"', groupId: 'aqours', type: 'single', singleId: 'aqours-kokoro-magic', releaseDate: '2019-10-30', performers: AQOURS_ALL, lyricist: '畑亜貴', composer: 'EFFY', streams: 27000000, sales: 46000 },
  { id: 'fantastic-departure', title: 'Fantastic Departure!', titleEn: 'Fantastic Departure!', groupId: 'aqours', type: 'single', singleId: 'aqours-fantastic', releaseDate: '2020-07-22', performers: AQOURS_ALL, lyricist: '畑亜貴', composer: 'Kanata Okajima・MEG', streams: 33000000, sales: 44000 },
  { id: 'aqours-pirates-desire', title: 'Aqours Pirates Desire', titleEn: 'Aqours Pirates Desire', groupId: 'aqours', type: 'coupling', singleId: 'aqours-fantastic', releaseDate: '2020-07-22', performers: AQOURS_ALL, lyricist: '畑亜貴', streams: 12000000, sales: 44000 },
  { id: 'smile-smile-ship-start', title: 'smile smile ship Start!', titleEn: 'smile smile ship Start!', groupId: 'aqours', type: 'single', singleId: 'aqours-smile-smile', releaseDate: '2021-03-31', performers: AQOURS_ALL, lyricist: '畑亜貴', composer: '加藤達也', streams: 29000000, sales: 41000 },
  { id: 'kuru-kuru-cruller', title: 'KU-RU-KU-RU Cruller!', titleEn: 'KU-RU-KU-RU Cruller!', groupId: 'aqours', type: 'single', singleId: 'aqours-cruller', releaseDate: '2021-09-22', performers: AQOURS_ALL, lyricist: '畑亜貴', composer: 'Kanata Okajima・Soma Genda', streams: 26000000, sales: 39000 },
  { id: 'nando-datte-yakusoku', title: 'なんどだって約束!', titleEn: 'Nando datte Yakusoku!', groupId: 'aqours', type: 'single', singleId: 'aqours-nando-datte', releaseDate: '2022-04-13', center: ['千歌'], performers: AQOURS_ALL, lyricist: '畑亜貴', composer: 'TAKUYA・MEG・Kanata Okajima', streams: 24000000, sales: 37000 },
  { id: 'banzai-digital-trippers', title: 'BANZAI! digital trippers', titleEn: 'BANZAI! digital trippers', groupId: 'aqours', type: 'single', singleId: 'aqours-banzai', releaseDate: '2022-08-24', performers: AQOURS_ALL, lyricist: '畑亜貴', composer: 'Mitchie M', streams: 42000000, sales: 35000 }, // feat. 初音ミク
  { id: 'genjitsu-mystirium', title: '幻日ミステリウム', titleEn: 'Genjitsu Mystirium', groupId: 'aqours', type: 'single', singleId: 'aqours-genjitsu', releaseDate: '2023-07-26', performers: AQOURS_ALL, lyricist: '畑亜貴', composer: '酒井拓也・山本恭平', streams: 21000000, sales: 33000 },
  { id: 'kimino-tame-bokuno-tame', title: 'キミノタメボクノタメ', titleEn: 'Kimi no Tame Boku no Tame', groupId: 'aqours', type: 'single', singleId: 'aqours-kimino-tame', releaseDate: '2023-08-02', performers: AQOURS_ALL, lyricist: '畑亜貴', composer: '小高光太郎・UiNA', streams: 19000000, sales: 32000 },

  // ==================== 虹ヶ咲学園スクールアイドル同好会 ====================
  // 1st 专辑《TOKIMEKI Runners》主题曲 + 初代 solo 曲
  { id: 'tokimeki-runners', title: 'TOKIMEKI Runners', titleEn: 'TOKIMEKI Runners', groupId: 'nijigasaki', type: 'album', singleId: 'niji-album-1', releaseDate: '2018-11-21', center: ['歩夢'], performers: NIJI_9, lyricist: '畑亜貴', composer: '矢鴇つかさ', streams: 62000000, sales: 22000 },
  { id: 'yume-e-no-ippo', title: '夢への一歩', titleEn: 'Yume e no Ippo', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-album-1', releaseDate: '2018-11-21', center: ['歩夢'], performers: ['歩夢'], lyricist: 'Akira Sunset', composer: 'Akira Sunset', streams: 15000000, sales: 22000 },
  { id: 'diamond', title: 'ダイアモンド', titleEn: 'Diamond', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-album-1', releaseDate: '2018-11-21', center: ['かすみ'], performers: ['かすみ'], lyricist: '鈴木エレカ・JOE', composer: '鈴木エレカ・JOE', streams: 13000000, sales: 22000 },
  { id: 'anata-no-risou-no-heroine', title: 'あなたの理想のヒロイン', titleEn: 'Anata no Risou no Heroine', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-album-1', releaseDate: '2018-11-21', center: ['しずく'], performers: ['しずく'], lyricist: '月見草', composer: '月見草', streams: 14000000, sales: 22000 },
  { id: 'starlight', title: 'Starlight', titleEn: 'Starlight', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-album-1', releaseDate: '2018-11-21', center: ['果林'], performers: ['果林'], lyricist: 'BEATNINE', composer: 'BEATNINE', streams: 12000000, sales: 22000 },
  { id: 'meccha-going', title: 'めっちゃGoing!!', titleEn: 'Meccha Going!!', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-album-1', releaseDate: '2018-11-21', center: ['愛'], performers: ['愛'], lyricist: 'Akira Sunset', composer: 'Akira Sunset・Carlos K.', streams: 11000000, sales: 22000 },
  { id: 'nemureru-mori-ni-ikitai-na', title: '眠れる森に行きたいな', titleEn: 'Nemureru Mori ni Ikitai na', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-album-1', releaseDate: '2018-11-21', center: ['彼方'], performers: ['彼方'], lyricist: 'Ryota Saito・Diz', composer: 'Ryota Saito・Diz', streams: 16000000, sales: 22000 },
  { id: 'chase', title: 'CHASE!', titleEn: 'CHASE!', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-album-1', releaseDate: '2018-11-21', center: ['せつ菜'], performers: ['せつ菜'], lyricist: '鈴木エレカ・JOE', composer: '鈴木エレカ・JOE', streams: 58000000, sales: 22000 },
  { id: 'evergreen', title: 'Evergreen', titleEn: 'Evergreen', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-album-1', releaseDate: '2018-11-21', center: ['エマ'], performers: ['エマ'], lyricist: 'Ryota Saito・近谷直之', composer: 'Ryota Saito・近谷直之', streams: 10000000, sales: 22000 },
  { id: 'dokipipo-emotion', title: 'ドキピポ☆エモーション', titleEn: 'Doki Pipo☆Emotion', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-album-1', releaseDate: '2018-11-21', center: ['璃奈'], performers: ['璃奈'], lyricist: 'NOVECHIKA・菊池博人', composer: 'NOVECHIKA・菊池博人', streams: 11000000, sales: 22000 },
  // 2nd〜5th 专辑主题曲
  { id: 'love-u-my-friends', title: 'Love U my friends', titleEn: 'Love U my friends', groupId: 'nijigasaki', type: 'album', singleId: 'niji-album-2', releaseDate: '2019-10-02', center: ['歩夢'], performers: NIJI_9, streams: 48000000, sales: 20700 },
  { id: 'just-believe', title: 'Just Believe!!!', titleEn: 'Just Believe!!!', groupId: 'nijigasaki', type: 'album', singleId: 'niji-album-3', releaseDate: '2020-09-02', center: ['歩夢', '栞子'], performers: NIJI_10, streams: 38000000, sales: 15000 },
  { id: 'keii-no-hikari', title: '決意の光', titleEn: 'Keii no Hikari', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-album-3', releaseDate: '2020-09-02', center: ['栞子'], performers: ['栞子'], lyricist: '中村歩・菊池博人', composer: '中村歩・菊池博人', streams: 13000000, sales: 15000 },
  { id: 'lll-love-the-life-we-live', title: 'L! L! L! (Love the Life We Live)', titleEn: 'L! L! L! (Love the Life We Live)', groupId: 'nijigasaki', type: 'album', singleId: 'niji-album-4', releaseDate: '2021-10-13', center: ['歩夢'], performers: NIJI_12, streams: 34000000, sales: 18000 },
  { id: 'toy-doll', title: 'Toy Doll', titleEn: 'Toy Doll', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-album-4', releaseDate: '2021-10-13', center: ['ミア'], performers: ['ミア'], streams: 9000000, sales: 18000 }, // ミア初 solo，全英文曲
  { id: 'yume-no-tama', title: '夜明珠', titleEn: 'Yume no Tama', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-album-4', releaseDate: '2021-10-13', center: ['嵐珠'], performers: ['嵐珠'], streams: 10000000, sales: 18000 },
  { id: 'fly-with-you', title: 'Fly with You!!', titleEn: 'Fly with You!!', groupId: 'nijigasaki', type: 'album', singleId: 'niji-album-5', releaseDate: '2023-10-04', performers: NIJI_12, streams: 26000000, sales: 10600 },
  // 1st Single「無敵級*ビリーバー」（かすみ 总选举纪念 + 9人曲）
  { id: 'mutekikyuu-believer', title: '無敵級*ビリーバー', titleEn: 'Mutekikyuu*Believer', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-1st-sp', releaseDate: '2020-07-29', center: ['かすみ'], performers: ['かすみ'], lyricist: 'Ayaka Miyake', composer: 'DECO*27', streams: 31000000, sales: 29200 },
  { id: 'mirai-harmony', title: '未来ハーモニー', titleEn: 'Mirai Harmony', groupId: 'nijigasaki', type: 'single', singleId: 'niji-1st-sp', releaseDate: '2020-07-29', center: ['かすみ'], performers: NIJI_9, lyricist: 'Kanata Okajima', composer: 'Akira Sunset・ulala', streams: 27000000, sales: 29200 },
  // 动画1期 OP/ED
  { id: 'nijiiro-passions', title: '虹色Passions!', titleEn: 'Nijiiro Passions!', groupId: 'nijigasaki', type: 'single', singleId: 'niji-op1', releaseDate: '2020-10-21', center: ['歩夢'], performers: NIJI_10, lyricist: 'Ayaka Miyake', composer: 'Keisuke Koyama', streams: 58000000, sales: 15700 },
  { id: 'sweet-eyes', title: 'Sweet Eyes', titleEn: 'Sweet Eyes', groupId: 'nijigasaki', type: 'coupling', singleId: 'niji-op1', releaseDate: '2020-10-21', center: ['歩夢'], performers: NIJI_10, lyricist: 'Ayaka Miyake', composer: 'Carlos K.・田中マッシュ', streams: 18000000, sales: 15700 },
  { id: 'neo-sky-neo-map', title: 'NEO SKY, NEO MAP!', titleEn: 'NEO SKY, NEO MAP!', groupId: 'nijigasaki', type: 'single', singleId: 'niji-ed1', releaseDate: '2020-11-04', center: ['歩夢'], performers: NIJI_10, lyricist: '畑亜貴', composer: '小高光太郎・UiNA', streams: 52000000, sales: 21500 },
  { id: 'zensoku-dreamer', title: '全速ドリーマー', titleEn: 'Zensoku Dreamer', groupId: 'nijigasaki', type: 'coupling', singleId: 'niji-ed1', releaseDate: '2020-11-04', performers: NIJI_10, lyricist: 'Ayaka Miyake', composer: 'DAICHI・原田峻輔', streams: 16000000, sales: 21500 },
  // 动画1期插入歌 solo 单曲（第1〜4弹）
  { id: 'dream-with-you', title: 'Dream with You', titleEn: 'Dream with You', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-insert1', releaseDate: '2020-11-18', center: ['歩夢'], performers: ['歩夢'], lyricist: 'Ayaka Miyake', composer: 'mitsuyuki miyake・Carlos K.', streams: 19000000, sales: 32300 },
  { id: 'poppin-up', title: "Poppin' Up!", titleEn: "Poppin' Up!", groupId: 'nijigasaki', type: 'solo', singleId: 'niji-insert1', releaseDate: '2020-11-18', center: ['かすみ'], performers: ['かすみ'], lyricist: 'Ayaka Miyake', composer: 'クボナオキ', streams: 15000000, sales: 32300 },
  { id: 'dive', title: 'DIVE!', titleEn: 'DIVE!', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-insert1', releaseDate: '2020-11-18', center: ['せつ菜'], performers: ['せつ菜'], lyricist: 'Ayaka Miyake', composer: 'MOMIKEN', streams: 17000000, sales: 32300 },
  { id: 'saiko-heart', title: 'サイコーハート', titleEn: 'Saikoo Heart', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-insert2', releaseDate: '2020-12-02', center: ['愛'], performers: ['愛'], lyricist: 'Ayaka Miyake', composer: 'PASSiON KiNG', streams: 12000000, sales: 29800 },
  { id: 'la-bella-patria', title: 'La Bella Patria', titleEn: 'La Bella Patria', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-insert2', releaseDate: '2020-12-02', center: ['エマ'], performers: ['エマ'], lyricist: 'Ayaka Miyake', composer: '齊藤庸介', streams: 9000000, sales: 29800 },
  { id: 'tsunagaru-connect', title: 'ツナガルコネクト', titleEn: 'Tsunagaru Connect', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-insert2', releaseDate: '2020-12-02', center: ['璃奈'], performers: ['璃奈'], lyricist: 'Ayaka Miyake', composer: 'DECO*27', streams: 14000000, sales: 29800 },
  { id: 'butterfly', title: 'Butterfly', titleEn: 'Butterfly', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-insert3', releaseDate: '2020-12-16', center: ['彼方'], performers: ['彼方'], lyricist: 'Ayaka Miyake', composer: 'Em.me', streams: 16000000, sales: 35500 },
  { id: 'solitude-rain', title: 'Solitude Rain', titleEn: 'Solitude Rain', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-insert3', releaseDate: '2020-12-16', center: ['しずく'], performers: ['しずく'], lyricist: 'Ayaka Miyake', composer: '鈴木エレカ・JOE', streams: 18000000, sales: 35500 },
  { id: 'vivid-world', title: 'VIVID WORLD', titleEn: 'VIVID WORLD', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-insert3', releaseDate: '2020-12-16', center: ['果林'], performers: ['果林'], lyricist: 'Ayaka Miyake', composer: 'Luis Ogata・TeddyLoid', streams: 11000000, sales: 35500 },
  { id: 'awakening-promise', title: 'Awakening Promise', titleEn: 'Awakening Promise', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-insert4', releaseDate: '2021-01-13', center: ['歩夢'], performers: ['歩夢'], lyricist: 'Ayaka Miyake', composer: 'Keisuke Koyama', streams: 17000000, sales: 15800 },
  { id: 'yume-ga-koko-kara-hajimaru-yo', title: '夢がここからはじまるよ', titleEn: 'Yume ga Koko kara Hajimaru yo', groupId: 'nijigasaki', type: 'single', singleId: 'niji-insert4', releaseDate: '2021-01-13', center: ['歩夢'], performers: NIJI_9, lyricist: 'Ayaka Miyake', composer: '中村歩・野口大志', streams: 45000000, sales: 15800 },
  // R3BIRTH（栞子・ミア・嵐珠）1st 单曲 solo 曲
  { id: 'queendom', title: 'Queendom', titleEn: 'Queendom', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-r3birth-1st', releaseDate: '2021-10-06', center: ['嵐珠'], performers: ['嵐珠'], streams: 13000000, sales: 21000 },
  { id: 'midori-no-kanaria', title: '翠いカナリア', titleEn: 'Midori no Kanaria', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-r3birth-1st', releaseDate: '2021-10-06', center: ['栞子'], performers: ['栞子'], streams: 10000000, sales: 21000 },
  // 动画2期 OP/ED 及插入歌
  { id: 'colorful-dreams', title: 'Colorful Dreams! Colorful Smiles!', titleEn: 'Colorful Dreams! Colorful Smiles!', groupId: 'nijigasaki', type: 'single', singleId: 'niji-op2', releaseDate: '2022-04-20', center: ['歩夢', '嵐珠'], performers: NIJI_12, lyricist: 'Ayaka Miyake', composer: '要田健・Carlos K.', streams: 45000000, sales: 22900 },
  { id: 'twilight', title: 'トワイライト', titleEn: 'Twilight', groupId: 'nijigasaki', type: 'coupling', singleId: 'niji-op2', releaseDate: '2022-04-20', center: ['しずく'], performers: NIJI_12, lyricist: '鈴木エレカ', composer: '鈴木エレカ・JOE', streams: 19000000, sales: 22900 },
  { id: 'yume-ga-bokura-no-taiyou-sa', title: '夢が僕らの太陽さ', titleEn: 'Yume ga Bokura no Taiyou sa', groupId: 'nijigasaki', type: 'single', singleId: 'niji-ed2', releaseDate: '2022-04-27', center: ['歩夢', '嵐珠'], performers: NIJI_12, lyricist: '畑亜貴', composer: '新田目翔 (HANO)', streams: 42000000, sales: 23900 },
  { id: 'ryouran-victory-road', title: '繚乱!ビクトリーロード', titleEn: 'Ryouran! Victory Road', groupId: 'nijigasaki', type: 'coupling', singleId: 'niji-ed2', releaseDate: '2022-04-27', center: ['歩夢', 'かすみ'], performers: NIJI_12, lyricist: 'チバニャン', composer: 'チバニャン', streams: 15000000, sales: 23900 },
  { id: 'eutopia', title: 'Eutopia', titleEn: 'Eutopia', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-insert-s2', releaseDate: '2022-06-22', center: ['嵐珠'], performers: ['嵐珠'], lyricist: 'Ayaka Miyake', composer: '*Luna・角野寿和', streams: 14000000, sales: 21700 },
  { id: 'emotion', title: 'EMOTION', titleEn: 'EMOTION', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-insert-s2', releaseDate: '2022-06-22', center: ['栞子'], performers: ['栞子'], lyricist: 'tofubeats', composer: 'tofubeats', streams: 11000000, sales: 21700 },
  { id: 'stars-we-chase', title: 'stars we chase', titleEn: 'stars we chase', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-insert-s2', releaseDate: '2022-06-22', center: ['ミア'], performers: ['ミア'], lyricist: 'Konnie Aoki', composer: 'TeddyLoid', streams: 9000000, sales: 21700 },
  { id: 'future-parade', title: 'Future Parade', titleEn: 'Future Parade', groupId: 'nijigasaki', type: 'single', singleId: 'niji-future-parade', releaseDate: '2022-07-27', center: ['歩夢', '嵐珠'], performers: NIJI_12, lyricist: 'Ayaka Miyake', composer: 'Keisuke Koyama・DAICHI', streams: 42000000, sales: 9000 },
  { id: 'level-oops-adventures', title: 'Level Oops! Adventures', titleEn: 'Level Oops! Adventures', groupId: 'nijigasaki', type: 'coupling', singleId: 'niji-future-parade', releaseDate: '2022-07-27', performers: NIJI_12, streams: 8000000, sales: 9000 },
  { id: 'eien-no-issyun', title: '永遠の一瞬', titleEn: 'Eien no Issyun', groupId: 'nijigasaki', type: 'single', singleId: 'niji-eien', releaseDate: '2022-10-12', center: ['歩夢'], performers: NIJI_12, streams: 22000000, sales: 7400 },
  { id: 'our-p13ces', title: 'OUR P13CES!!!', titleEn: 'OUR P13CES!!!', groupId: 'nijigasaki', type: 'coupling', singleId: 'niji-eien', releaseDate: '2022-10-12', performers: NIJI_12, streams: 7000000, sales: 7400 },
  { id: 'wachu-gona-doo', title: 'わちゅごなどぅー', titleEn: 'Wachu Gona Doo', groupId: 'nijigasaki', type: 'single', singleId: 'niji-wachugona', releaseDate: '2023-02-01', center: ['歩夢'], performers: NIJI_12, streams: 19000000, sales: 10800 },
  { id: 'kagayaki-dont-forget', title: "KAGAYAKI Don't forget!", titleEn: "KAGAYAKI Don't forget!", groupId: 'nijigasaki', type: 'single', singleId: 'niji-kagayaki', releaseDate: '2023-06-07', center: ['歩夢', '栞子'], performers: NIJI_12, streams: 15000000, sales: 5500 },
  { id: 'feel-alive', title: 'Feel Alive', titleEn: 'Feel Alive', groupId: 'nijigasaki', type: 'solo', singleId: 'niji-feel-alive', releaseDate: '2023-06-28', performers: ['栞子', 'ミア', '嵐珠'], streams: 9000000, sales: 14500 }, // R3BIRTH 名义
  { id: 'go-our-way', title: 'Go Our Way!', titleEn: 'Go Our Way!', groupId: 'nijigasaki', type: 'single', singleId: 'niji-feel-alive', releaseDate: '2023-06-28', performers: NIJI_12, streams: 17000000, sales: 14500 },
  { id: 'singing-dreaming-now', title: 'SINGING, DREAMING, NOW!', titleEn: 'SINGING, DREAMING, NOW!', groupId: 'nijigasaki', type: 'single', singleId: 'niji-singing', releaseDate: '2023-07-05', performers: NIJI_12, lyricist: '畑亜貴', composer: 'Carlos K.・今川トモミチ', streams: 16000000, sales: 10000 },
  { id: 'wawawa-whats-up', title: "Wawawa☆What's up!", titleEn: "Wawawa☆What's up!", groupId: 'nijigasaki', type: 'coupling', singleId: 'niji-singing', releaseDate: '2023-07-05', performers: NIJI_12, lyricist: 'miyakei', composer: 'Keisuke Koyama', streams: 7000000, sales: 10000 },
  { id: 'new-years-march', title: "New Year's March!", titleEn: "New Year's March!", groupId: 'nijigasaki', type: 'single', singleId: 'niji-newyear', releaseDate: '2024-01-24', performers: NIJI_12, streams: 12000000, sales: 14100 },
  { id: 'nijigasaki-kouka', title: '虹ヶ咲学園校歌', titleEn: 'Nijigasaki Gakuen Kouka', groupId: 'nijigasaki', type: 'single', singleId: 'niji-kouka', releaseDate: '2024-04-10', performers: NIJI_12, streams: 9000000, sales: 7100 },

  // ==================== Liella! ====================
  // 1st Single「始まりは君の空」
  { id: 'hajimari-wa-kimi-no-sora', title: '始まりは君の空', titleEn: 'Hajimari wa Kimi no Sora', groupId: 'liella', type: 'single', singleId: 'liella-1st', releaseDate: '2021-04-07', center: ['かのん'], performers: LIELLA_5, lyricist: '畑亜貴', composer: '兼松衆', streams: 66000000, sales: 78000 },
  { id: 'dancing-heart-la-pa-pa-pa', title: 'Dancing Heart La-Pa-Pa-Pa!', titleEn: 'Dancing Heart La-Pa-Pa-Pa!', groupId: 'liella', type: 'coupling', singleId: 'liella-1st', releaseDate: '2021-04-07', performers: LIELLA_5, lyricist: '畑亜貴', streams: 25000000, sales: 78000 },
  { id: 'dreaming-energy', title: 'Dreaming Energy', titleEn: 'Dreaming Energy', groupId: 'liella', type: 'coupling', singleId: 'liella-1st', releaseDate: '2021-04-07', performers: LIELLA_5, lyricist: '畑亜貴', streams: 28000000, sales: 78000 },
  { id: 'watashi-no-symphony', title: '私のSymphony', titleEn: 'Watashi no Symphony', groupId: 'liella', type: 'coupling', singleId: 'liella-1st', releaseDate: '2021-04-07', center: ['かのん'], performers: ['かのん'], lyricist: '畑亜貴', streams: 22000000, sales: 78000 },
  // 2nd〜6th Single（动画1期 OP/ED/插入歌，5人编制）
  { id: 'start-true-dreams', title: 'START!! True dreams', titleEn: 'START!! True dreams', groupId: 'liella', type: 'single', singleId: 'liella-2nd', releaseDate: '2021-07-21', center: ['かのん'], performers: LIELLA_5, streams: 55000000, sales: 42000 },
  { id: 'dakara-bokura-wa-narasun-da', title: 'だから僕らは鳴らすんだ!', titleEn: 'Dakara Bokura wa Narasunda!', groupId: 'liella', type: 'coupling', singleId: 'liella-2nd', releaseDate: '2021-07-21', performers: LIELLA_5, streams: 24000000, sales: 42000 },
  { id: 'mirai-wa-kaze-no-you-ni', title: '未来は風のように', titleEn: 'Mirai wa Kaze no You ni', groupId: 'liella', type: 'single', singleId: 'liella-3rd', releaseDate: '2021-08-04', performers: LIELLA_5, lyricist: '畑亜貴', composer: '山田智和', streams: 48000000, sales: 38000 },
  { id: 'kono-machi-de-ima-kimi-to', title: 'この街でいまキミと', titleEn: 'Kono Machi de Ima Kimi to', groupId: 'liella', type: 'coupling', singleId: 'liella-3rd', releaseDate: '2021-08-04', performers: LIELLA_5, streams: 20000000, sales: 38000 },
  { id: 'mirai-yohou-halleluya', title: '未来予報ハレルヤ!', titleEn: 'Mirai Yohou Hallelujah!', groupId: 'liella', type: 'single', singleId: 'liella-4th', releaseDate: '2021-08-25', performers: LIELLA_5, lyricist: '宮嶋淳子', composer: 'EFFY', streams: 36000000, sales: 36000 },
  { id: 'tiny-stars', title: 'Tiny Stars', titleEn: 'Tiny Stars', groupId: 'liella', type: 'single', singleId: 'liella-4th', releaseDate: '2021-08-25', center: ['かのん', '可可'], performers: ['かのん', '可可'], lyricist: '宮嶋淳子', composer: '秋浦智裕', streams: 48000000, sales: 36000 },
  { id: 'going-up', title: 'GOING UP', titleEn: 'GOING UP', groupId: 'liella', type: 'coupling', singleId: 'liella-4th', releaseDate: '2021-08-25', performers: LIELLA_5, streams: 18000000, sales: 36000 },
  { id: 'one-two-three', title: '1.2.3!', titleEn: '1.2.3!', groupId: 'liella', type: 'coupling', singleId: 'liella-4th', releaseDate: '2021-08-25', performers: LIELLA_5, streams: 16000000, sales: 36000 },
  { id: 'tokunatsu-sunshine', title: '常夏☆サンシャイン', titleEn: 'Tokunatsu☆Sunshine', groupId: 'liella', type: 'single', singleId: 'liella-5th', releaseDate: '2021-09-29', performers: ['かのん', '可可', 'すみれ', '千砂都'], lyricist: '宮嶋淳子', streams: 30000000, sales: 34000 },
  { id: 'wish-song', title: 'Wish Song', titleEn: 'Wish Song', groupId: 'liella', type: 'single', singleId: 'liella-5th', releaseDate: '2021-09-29', center: ['恋'], performers: LIELLA_5, lyricist: '宮嶋淳子', streams: 27000000, sales: 34000 },
  { id: 'baibai-shichaeba', title: 'バイバイしちゃえば!?', titleEn: 'Bye Bye Shichaeba!?', groupId: 'liella', type: 'coupling', singleId: 'liella-5th', releaseDate: '2021-09-29', performers: LIELLA_5, streams: 15000000, sales: 34000 },
  { id: 'matataki-no-saki-e', title: '瞬きの先へ', titleEn: 'Matataki no Saki e', groupId: 'liella', type: 'coupling', singleId: 'liella-5th', releaseDate: '2021-09-29', performers: LIELLA_5, streams: 14000000, sales: 34000 },
  { id: 'nonfiction', title: 'ノンフィクション!!', titleEn: 'Nonfiction!!', groupId: 'liella', type: 'single', singleId: 'liella-6th', releaseDate: '2021-10-20', center: ['すみれ'], performers: LIELLA_5, lyricist: '宮嶋淳子', streams: 42000000, sales: 40000 },
  { id: 'starlight-prologue', title: 'Starlight Prologue', titleEn: 'Starlight Prologue', groupId: 'liella', type: 'single', singleId: 'liella-6th', releaseDate: '2021-10-20', center: ['恋'], performers: LIELLA_5, lyricist: '宮嶋淳子', streams: 46000000, sales: 40000 },
  { id: 'day1', title: 'Day1', titleEn: 'Day1', groupId: 'liella', type: 'coupling', singleId: 'liella-6th', releaseDate: '2021-10-20', performers: LIELLA_5, streams: 20000000, sales: 40000 },
  { id: 'dream-rainbow', title: 'Dream Rainbow', titleEn: 'Dream Rainbow', groupId: 'liella', type: 'coupling', singleId: 'liella-6th', releaseDate: '2021-10-20', performers: LIELLA_5, streams: 19000000, sales: 40000 },
  // 1st 专辑
  { id: 'what-a-wonderful-dream', title: 'What a Wonderful Dream!!', titleEn: 'What a Wonderful Dream!!', groupId: 'liella', type: 'album', singleId: 'liella-album-1', releaseDate: '2022-03-02', performers: LIELLA_5, lyricist: '宮嶋淳子', streams: 34000000, sales: 45000 },
  // 7th〜11th Single（动画2期，9人编制）
  { id: 'we-will', title: 'WE WILL!!', titleEn: 'WE WILL!!', groupId: 'liella', type: 'single', singleId: 'liella-7th', releaseDate: '2022-08-03', center: ['かのん'], performers: LIELLA_9, lyricist: '宮嶋淳子', composer: 'Mitokiyo', streams: 40000000, sales: 44000 },
  { id: 'star-sengen', title: 'スター宣言', titleEn: 'Star Sengen', groupId: 'liella', type: 'coupling', singleId: 'liella-7th', releaseDate: '2022-08-03', performers: LIELLA_9, lyricist: '宮嶋淳子', streams: 22000000, sales: 44000 },
  { id: 'oikakeru-yume-no-saki-de', title: '追いかける夢の先で', titleEn: 'Oikakeru Yume no Saki de', groupId: 'liella', type: 'single', singleId: 'liella-8th', releaseDate: '2022-08-10', performers: LIELLA_9, lyricist: '宮嶋淳子', streams: 28000000, sales: 40000 },
  { id: 'mizushibuki-no-sign', title: '水しぶきのサイン', titleEn: 'Mizushibuki no Sign', groupId: 'liella', type: 'coupling', singleId: 'liella-8th', releaseDate: '2022-08-10', performers: LIELLA_9, lyricist: '宮嶋淳子', streams: 16000000, sales: 40000 },
  { id: 'welcome-to-bokura-no-sekai', title: 'Welcome to 僕らのセカイ', titleEn: 'Welcome to Bokura no Sekai', groupId: 'liella', type: 'single', singleId: 'liella-9th', releaseDate: '2022-08-17', performers: LIELLA_9, lyricist: '宮嶋淳子', streams: 32000000, sales: 41000 },
  { id: 'go-restart', title: 'Go!! リスタート', titleEn: 'Go!! Restart', groupId: 'liella', type: 'coupling', singleId: 'liella-9th', releaseDate: '2022-08-17', performers: LIELLA_9, lyricist: '宮嶋淳子', streams: 24000000, sales: 41000 },
  { id: 'irozuite-toumei', title: '色づいて透明', titleEn: 'Irozuite Toumei', groupId: 'liella', type: 'coupling', singleId: 'liella-9th', releaseDate: '2022-08-17', performers: LIELLA_9, lyricist: '宮嶋淳子', streams: 14000000, sales: 41000 },
  { id: 'yuragu-wa', title: '揺らぐわ!', titleEn: 'Yuragu wa!', groupId: 'liella', type: 'coupling', singleId: 'liella-9th', releaseDate: '2022-08-17', performers: LIELLA_9, lyricist: '宮嶋淳子', streams: 13000000, sales: 41000 },
  { id: 'vitamin-summer', title: 'ビタミンSUMMER!', titleEn: 'Vitamin SUMMER!', groupId: 'liella', type: 'single', singleId: 'liella-10th', releaseDate: '2022-09-21', performers: LIELLA_9, lyricist: '宮嶋淳子', composer: 'ヒゲドライバー', streams: 26000000, sales: 38000 },
  { id: 'chance-day-chance-way', title: 'Chance Day, Chance Way!', titleEn: 'Chance Day, Chance Way!', groupId: 'liella', type: 'coupling', singleId: 'liella-10th', releaseDate: '2022-09-21', performers: LIELLA_9, lyricist: '宮嶋淳子', streams: 15000000, sales: 38000 },
  { id: 'sing-shine-smile', title: 'Sing! Shine! Smile!', titleEn: 'Sing! Shine! Smile!', groupId: 'liella', type: 'single', singleId: 'liella-11th', releaseDate: '2022-10-19', performers: LIELLA_9, lyricist: '宮嶋淳子', streams: 24000000, sales: 37000 },
  { id: 'mirai-no-oto-ga-kikoeru', title: '未来の音が聴こえる', titleEn: 'Mirai no Oto ga Kikoeru', groupId: 'liella', type: 'coupling', singleId: 'liella-11th', releaseDate: '2022-10-19', performers: LIELLA_9, lyricist: '宮嶋淳子', streams: 18000000, sales: 37000 },
  // 12th Single（マルガレーテ solo）
  { id: 'butterfly-wing', title: 'Butterfly Wing', titleEn: 'Butterfly Wing', groupId: 'liella', type: 'solo', singleId: 'liella-12th', releaseDate: '2022-11-30', center: ['マルガレーテ'], performers: ['マルガレーテ'], lyricist: '宮嶋淳子', streams: 17000000, sales: 33000 },
  { id: 'edelstein', title: 'Edelstein', titleEn: 'Edelstein', groupId: 'liella', type: 'coupling', singleId: 'liella-12th', releaseDate: '2022-11-30', center: ['マルガレーテ'], performers: ['マルガレーテ'], lyricist: '宮嶋淳子', streams: 12000000, sales: 33000 },
  // 13th〜21st Single 及 3 期(11人)编制
  { id: 'miracle-new-story', title: 'MIRACLE NEW STORY', titleEn: 'MIRACLE NEW STORY', groupId: 'liella', type: 'single', singleId: 'liella-13th', releaseDate: '2023-05-17', performers: LIELLA_9, lyricist: '宮嶋淳子', streams: 38000000, sales: 35000 }, // 与 Sunny Passion 合作版本存在
  { id: 'universe', title: 'UNIVERSE!!', titleEn: 'UNIVERSE!!', groupId: 'liella', type: 'single', singleId: 'liella-14th', releaseDate: '2023-07-05', performers: LIELLA_9, lyricist: '宮嶋淳子', streams: 22000000, sales: 33000 },
  { id: 'shekira', title: 'シェキラ☆☆☆', titleEn: 'Shekira☆☆☆', groupId: 'liella', type: 'single', singleId: 'liella-15th', releaseDate: '2024-01-10', performers: LIELLA_11, lyricist: '宮嶋淳子', streams: 20000000, sales: 36000 },
  { id: 'aikotoba', title: 'AIKOTOBA!', titleEn: 'AIKOTOBA!', groupId: 'liella', type: 'single', singleId: 'liella-16th', releaseDate: '2024-08-01', performers: LIELLA_11, lyricist: '宮嶋淳子', streams: 18000000, sales: 0 },
  { id: 'lets-be-one', title: "Let's be ONE", titleEn: "Let's be ONE", groupId: 'liella', type: 'single', singleId: 'liella-17th', releaseDate: '2024-10-23', center: ['かのん'], performers: LIELLA_11, lyricist: '宮嶋淳子', composer: '大畑拓也', streams: 25000000, sales: 38000 },
  { id: 'seishun-hoppers', title: '青春HOPPERS', titleEn: 'Seishun Hoppers', groupId: 'liella', type: 'coupling', singleId: 'liella-17th', releaseDate: '2024-10-23', performers: LIELLA_11, lyricist: '宮嶋淳子', streams: 16000000, sales: 38000 },
  { id: 'daisuki-full-power', title: 'DAISUKI FULL POWER', titleEn: 'DAISUKI FULL POWER', groupId: 'liella', type: 'single', singleId: 'liella-18th', releaseDate: '2024-10-23', performers: LIELLA_11, lyricist: '畑亜貴', composer: '常楽寺澪・石黑剛', streams: 23000000, sales: 37000 },
  { id: 'bubble-rise', title: 'Bubble Rise', titleEn: 'Bubble Rise', groupId: 'liella', type: 'single', singleId: 'liella-19th', releaseDate: '2024-11-13', performers: ['かのん', 'マルガレーテ', '冬毬'], lyricist: '宮嶋淳子', streams: 15000000, sales: 32000 }, // トマカノーテ 3人编制
  { id: 'special-color', title: 'Special Color', titleEn: 'Special Color', groupId: 'liella', type: 'coupling', singleId: 'liella-19th', releaseDate: '2024-11-13', performers: LIELLA_11, lyricist: '宮嶋淳子', streams: 11000000, sales: 32000 },
  { id: 'zettaiteki-lover', title: '絶対的LOVER', titleEn: 'Zettaiteki LOVER', groupId: 'liella', type: 'single', singleId: 'liella-20th', releaseDate: '2024-12-11', performers: LIELLA_11, lyricist: '宮嶋淳子', streams: 14000000, sales: 31000 },
  { id: 'dazzling-game', title: 'Dazzling Game', titleEn: 'Dazzling Game', groupId: 'liella', type: 'coupling', singleId: 'liella-20th', releaseDate: '2024-12-11', performers: LIELLA_11, lyricist: '宮嶋淳子', streams: 12000000, sales: 31000 },
  { id: 'egao-no-promise', title: '笑顔のPromise', titleEn: 'Egao no Promise', groupId: 'liella', type: 'single', singleId: 'liella-21st', releaseDate: '2025-01-08', performers: LIELLA_11, lyricist: '宮嶋淳子', streams: 13000000, sales: 30000 },
  { id: 'superstar', title: 'スーパースター!!', titleEn: 'Superstar!!', groupId: 'liella', type: 'coupling', singleId: 'liella-21st', releaseDate: '2025-01-08', performers: LIELLA_11, lyricist: '宮嶋淳子', composer: '小幡康裕', streams: 10000000, sales: 30000 },
  { id: 'hajimari-wa-kimi-no-sora-11ver', title: '始まりは君の空 ~11 Ver.~', titleEn: 'Hajimari wa Kimi no Sora ~11 Ver.~', groupId: 'liella', type: 'single', singleId: 'liella-11ver', releaseDate: '2025-01-15', center: ['かのん'], performers: LIELLA_11, lyricist: '畑亜貴', composer: '兼松衆', streams: 20000000, sales: 28000 },

  // ==================== 蓮ノ空女学院スクールアイドルクラブ ====================
  // 1st 迷你专辑《Dream Believers》（103期出道曲）
  { id: 'dream-believers', title: 'Dream Believers', titleEn: 'Dream Believers', groupId: 'hasunosora', type: 'album', singleId: 'hasu-mini-1', releaseDate: '2023-03-29', center: ['さやか'], performers: HASU_103, lyricist: '畑亜貴', composer: '渡辺拓也', streams: 22000000, sales: 15000 },
  // Link! Like! LoveLive! app 配信曲（详细唱片归属待补录）
  { id: 'on-your-mark', title: 'On your mark', titleEn: 'On your mark', groupId: 'hasunosora', streams: 18000000, sales: 32000 },
  { id: 'eternal-euphoria', title: '永遠のEuphoria', titleEn: 'Eien no Euphoria', groupId: 'hasunosora', streams: 15000000, sales: 28000 },
  { id: 'holiday-holiday', title: 'Holiday∞holiday', titleEn: 'Holiday∞holiday', groupId: 'hasunosora', streams: 16000000, sales: 30000 },
  { id: 'deepness', title: 'DEEPNESS', titleEn: 'DEEPNESS', groupId: 'hasunosora', streams: 14000000, sales: 26000 },
  // 1st 专辑《夏めきペイン》
  { id: 'natsu-meaki-pain', title: '夏めきペイン', titleEn: 'Natsumeki Pain', groupId: 'hasunosora', type: 'album', singleId: 'hasu-album-1', releaseDate: '2023-09-20', center: ['慈'], performers: HASU_103, lyricist: '指原莉乃', streams: 19000000, sales: 13000 },
  // 全员单曲
  { id: 'link-to-the-future', title: 'Link to the FUTURE', titleEn: 'Link to the FUTURE', groupId: 'hasunosora', type: 'single', singleId: 'hasu-1st', releaseDate: '2024-01-17', center: ['花帆'], performers: HASU_103, lyricist: '畑亜貴', composer: 'LiCu・古河夕', streams: 14000000, sales: 12000 }, // 103期北陆大赛曲（三小队合同）
  { id: 'trick-and-cute', title: 'Trick & Cute', titleEn: 'Trick & Cute', groupId: 'hasunosora', type: 'coupling', singleId: 'hasu-1st', releaseDate: '2024-01-17', performers: HASU_103, lyricist: '畑亜貴', streams: 9000000, sales: 12000 },
  { id: 'tsubasa-la-liberte', title: 'ツバサ・ラ・リベルテ', titleEn: 'Tsubasa la Liberte', groupId: 'hasunosora', type: 'coupling', singleId: 'hasu-1st', releaseDate: '2024-01-17', performers: HASU_103, lyricist: '畑亜貴', streams: 8000000, sales: 12000 },
  { id: 'dakishimeru-hanabira', title: '抱きしめる花びら', titleEn: 'Dakishimeru Hanabira', groupId: 'hasunosora', type: 'single', singleId: 'hasu-2nd', releaseDate: '2024-04-03', center: ['慈'], performers: HASU_103, lyricist: '畑亜貴', streams: 11000000, sales: 10000 }, // 103期蓮華祭曲
  { id: 'step-up', title: 'STEP UP!', titleEn: 'STEP UP!', groupId: 'hasunosora', type: 'coupling', singleId: 'hasu-2nd', releaseDate: '2024-04-03', performers: HASU_103, lyricist: '畑亜貴', streams: 7000000, sales: 10000 },
  { id: 'dream-believers-104', title: 'Dream Believers (104期 Ver.)', titleEn: 'Dream Believers (104th Generation Ver.)', groupId: 'hasunosora', type: 'album', singleId: 'hasu-mini-104', releaseDate: '2024-04-17', center: ['梢'], performers: HASU_104, lyricist: '畑亜貴', composer: '渡辺拓也', streams: 12000000, sales: 11000 },
  { id: 'bloom-the-smile', title: 'Bloom the smile, Bloom the dream!', titleEn: 'Bloom the smile, Bloom the dream!', groupId: 'hasunosora', type: 'single', singleId: 'hasu-3rd', releaseDate: '2024-07-17', center: ['花帆'], performers: HASU_103, lyricist: '畑亜貴', streams: 10000000, sales: 9500 },
  { id: '365-days', title: '365 Days', titleEn: '365 Days', groupId: 'hasunosora', type: 'coupling', singleId: 'hasu-3rd', releaseDate: '2024-07-17', performers: HASU_103, lyricist: '佐藤舞花', composer: '園田健太郎', streams: 7000000, sales: 9500 },
  { id: 'key-of-like', title: 'KEY of Like!', titleEn: 'KEY of Like!', groupId: 'hasunosora', type: 'single', singleId: 'hasu-4th', releaseDate: '2025-02-05', performers: HASU_104, lyricist: '畑亜貴', streams: 8000000, sales: 8500 }, // 104期北陆大赛曲
  { id: 'now-or-never', title: 'Now or Never', titleEn: 'Now or Never', groupId: 'hasunosora', type: 'coupling', singleId: 'hasu-4th', releaseDate: '2025-02-05', performers: HASU_104, lyricist: '畑亜貴', streams: 6000000, sales: 8500 },
  { id: 'aurora-flower', title: 'AURORA FLOWER', titleEn: 'AURORA FLOWER', groupId: 'hasunosora', type: 'single', singleId: 'hasu-5th', releaseDate: '2025-02-26', performers: HASU_104, lyricist: '畑亜貴', streams: 7500000, sales: 8000 }, // 104期全国大赛曲
  { id: 'gekkabijin', title: 'ゲッカビジン', titleEn: 'Gekka Bijin', groupId: 'hasunosora', type: 'coupling', singleId: 'hasu-5th', releaseDate: '2025-02-26', performers: HASU_104, lyricist: '畑亜貴', streams: 5000000, sales: 8000 },
  { id: 'itsudemo-itsumademo', title: 'いつでも、いつまでも', titleEn: 'Itsudemo, Itsumademo', groupId: 'hasunosora', type: 'single', singleId: 'hasu-6th', releaseDate: '2025-04-09', performers: HASU_104, lyricist: '畑亜貴', streams: 7000000, sales: 7800 }, // 104期蓮華祭曲
  { id: 'dream-believers-105', title: 'Dream Believers (105期 Ver.)', titleEn: 'Dream Believers (105th Generation Ver.)', groupId: 'hasunosora', type: 'album', singleId: 'hasu-mini-105', releaseDate: '2025-04-30', performers: HASU_105, lyricist: '畑亜貴', composer: '渡辺拓也', streams: 6000000, sales: 9000 },
  { id: 'aid-doo-me', title: 'アイドゥーミー!', titleEn: 'I Do Me!', groupId: 'hasunosora', type: 'single', singleId: 'hasu-7th', releaseDate: '2025-07-09', lyricist: '畑亜貴', streams: 6500000, sales: 7600 },
  { id: 'hana-saikeba-yume-kakeru', title: 'ハナ咲けばユメ駆ける', titleEn: 'Hana Sakeba Yume Kakeru', groupId: 'hasunosora', type: 'single', singleId: 'hasu-8th', releaseDate: '2026-06-03', performers: HASU_105, lyricist: '畑亜貴', composer: '塚田耕平', streams: 5000000, sales: 7000 },
  { id: 'hikari-no-naka-de-hanasai-te', title: '光の中で花咲いて', titleEn: 'Hikari no Naka de Hanasaite', groupId: 'hasunosora', type: 'coupling', singleId: 'hasu-8th', releaseDate: '2026-06-03', performers: HASU_105, lyricist: '小松ナノハ', composer: '黒須克彦', streams: 4000000, sales: 7000 },
  { id: 'dream-believers-bgp', title: 'Dream Believers (B.G.P. Ver.)', titleEn: 'Dream Believers (B.G.P. Ver.)', groupId: 'hasunosora', type: 'coupling', singleId: 'hasu-8th', releaseDate: '2026-06-03', lyricist: '畑亜貴', composer: '渡辺拓也', streams: 3000000, sales: 7000 },
  // 102 期毕业纪念专辑新录 solo 曲
  { id: 'be-proud', title: 'be proud', titleEn: 'be proud', groupId: 'hasunosora', type: 'solo', singleId: 'hasu-grad-kozue', releaseDate: '2025-06-04', center: ['梢'], performers: ['梢'], lyricist: 'ケリー', composer: 'めんま', streams: 3500000, sales: 8000 },
  { id: 'shiawase-no-ribbon', title: '幸せのリボン', titleEn: 'Shiawase no Ribbon', groupId: 'hasunosora', type: 'solo', singleId: 'hasu-grad-tsuzuri', releaseDate: '2025-06-04', center: ['綴理'], performers: ['綴理'], streams: 3000000, sales: 8000 },
  { id: 'yappa-tenshi', title: 'やっぱ天使!', titleEn: 'Yappa Tenshi!', groupId: 'hasunosora', type: 'solo', singleId: 'hasu-grad-megumi', releaseDate: '2025-06-04', center: ['慈'], performers: ['慈'], streams: 3200000, sales: 8000 },
  // Link! Like! LoveLive! app 内翻唱 solo 曲（官方 solo 音源）
  { id: 'vivahapi', title: 'ビバハピ', titleEn: 'Viva Happy', groupId: 'hasunosora', type: 'solo', releaseDate: '2023-06-01', center: ['花帆'], performers: ['花帆'], streams: 3800000, sales: 0 }, // 翻唱 Mitchie M
  { id: 'sobakasu', title: 'そばかす', titleEn: 'Sobakasu', groupId: 'hasunosora', type: 'solo', releaseDate: '2023-06-01', center: ['さやか'], performers: ['さやか'], streams: 2500000, sales: 0 }, // 翻唱 JUDY AND MARY
  { id: 'nerai-uchi', title: '狙いうち', titleEn: 'Nerai Uchi', groupId: 'hasunosora', type: 'solo', releaseDate: '2023-06-01', center: ['瑠璃乃'], performers: ['瑠璃乃'], streams: 2200000, sales: 0 }, // 翻唱 山本リンダ
  { id: 'shinai', title: '深愛', titleEn: 'Shinai', groupId: 'hasunosora', type: 'solo', releaseDate: '2023-06-01', center: ['梢'], performers: ['梢'], streams: 1800000, sales: 0 }, // 翻唱 水樹奈奈
  { id: 'rosutone-no-gokoku', title: 'ロストワンの号哭', titleEn: 'Lost One no Gokoku', groupId: 'hasunosora', type: 'solo', releaseDate: '2023-06-01', center: ['綴理'], performers: ['綴理'], streams: 2000000, sales: 0 }, // 翻唱 Neru
  { id: 'momoiro-kataomoi', title: '♡桃色片想い♡', titleEn: 'Momoiro Kataomoi', groupId: 'hasunosora', type: 'solo', releaseDate: '2023-06-01', center: ['慈'], performers: ['慈'], streams: 1900000, sales: 0 }, // 翻唱 松浦亜弥
  { id: 'rouge-no-den-gon', title: 'ルージュの伝言', titleEn: 'Rouge no Dengon', groupId: 'hasunosora', type: 'solo', releaseDate: '2024-06-01', center: ['吟子'], performers: ['吟子'], streams: 1200000, sales: 0 }, // 翻唱 荒井由実（104期）
  { id: 'bibideba', title: 'ビビデバ', titleEn: 'Bibideba', groupId: 'hasunosora', type: 'solo', releaseDate: '2024-06-01', center: ['小鈴'], performers: ['小鈴'], streams: 1500000, sales: 0 }, // 翻唱 星街すいせい（104期）
  { id: 'this-game', title: 'This game', titleEn: 'This game', groupId: 'hasunosora', type: 'solo', releaseDate: '2024-06-01', center: ['姫芽'], performers: ['姫芽'], streams: 1400000, sales: 0 }, // 翻唱 鈴木このみ（104期）

  // ==================== Sunny Passion ====================
  { id: 'hot-passion', title: 'HOT PASSION!!', titleEn: 'HOT PASSION!!', groupId: 'sunny-passion', performers: ['悠奈', '摩央'], streams: 8500000, sales: 18000 },
  { id: 'till-sunrise', title: 'Till Sunrise', titleEn: 'Till Sunrise', groupId: 'sunny-passion', performers: ['悠奈', '摩央'], streams: 6200000, sales: 14000 },

  // ==================== Saint Snow ====================
  { id: 'crash-mind', title: 'CRASH MIND', titleEn: 'CRASH MIND', groupId: 'saint-snow', performers: ['聖良', '理亜'], streams: 12000000, sales: 22000 },
  { id: 'white-first-love', title: 'WHITE FIRST LOVE', titleEn: 'WHITE FIRST LOVE', groupId: 'saint-snow', performers: ['聖良', '理亜'], streams: 9800000, sales: 19000 },
]
