/**
 * LoveLive! HLTV - 歌曲数据
 * 用于 Live 详情页的歌单展示，以及排行榜的流媒体/CD数据
 */

export const songs = [
  // μ's 代表曲
  { id: 'snow-halation', title: 'Snow halation', titleEn: 'Snow halation', groupId: 'muse', streams: 128500000, sales: 156000 },
  { id: 'start-dash', title: 'Start:DASH!!', titleEn: 'Start:DASH!!', groupId: 'muse', streams: 98500000, sales: 132000 },
  { id: 'bokutachi-wa-hitosu-no-hikari', title: '僕たちはひとつの光', titleEn: 'Bokutachi wa Hitotsu no Hikari', groupId: 'muse', streams: 112000000, sales: 148000 },
  { id: 'sore-wa-bokutachi-no-kiseki', title: 'それは僕たちの奇跡', titleEn: 'Sore wa Bokutachi no Kiseki', groupId: 'muse', streams: 76000000, sales: 118000 },
  { id: 'kira-kira-sensation', title: 'KiRa-KiRa Sensation!', titleEn: 'KiRa-KiRa Sensation!', groupId: 'muse', streams: 82000000, sales: 124000 },
  { id: 'angelic-angel', title: 'Angelic Angel', titleEn: 'Angelic Angel', groupId: 'muse', streams: 68000000, sales: 98000 },
  // Aqours 代表曲
  { id: 'aozora-jumping-heart', title: '青空Jumping Heart', titleEn: 'Aozora Jumping Heart', groupId: 'aqours', streams: 105000000, sales: 142000 },
  { id: 'kimi-no-kokoro', title: '君のこころは輝いてるかい？', titleEn: 'Kimi no Kokoro wa Kagayaiteru kai?', groupId: 'aqours', streams: 92000000, sales: 128000 },
  { id: 'mirai-no-bokura', title: '未来の僕らは知ってるよ', titleEn: 'Mirai no Bokura wa Shitteru yo', groupId: 'aqours', streams: 88000000, sales: 115000 },
  { id: 'happy-party-train', title: 'HAPPY PARTY TRAIN', titleEn: 'HAPPY PARTY TRAIN', groupId: 'aqours', streams: 72000000, sales: 106000 },
  { id: 'brightest-melody', title: 'Brightest Melody', titleEn: 'Brightest Melody', groupId: 'aqours', streams: 65000000, sales: 92000 },
  { id: 'next-sparkling', title: 'Next SPARKLING!!', titleEn: 'Next SPARKLING!!', groupId: 'aqours', streams: 58000000, sales: 88000 },
  // 虹ヶ咲 代表曲
  { id: 'tokimeki-runners', title: 'TOKIMEKI Runners', titleEn: 'TOKIMEKI Runners', groupId: 'nijigasaki', streams: 62000000, sales: 86000 },
  { id: 'love-u-my-friends', title: 'Love U my friends', titleEn: 'Love U my friends', groupId: 'nijigasaki', streams: 48000000, sales: 72000 },
  { id: 'neo-sky-neo-map', title: 'NEO SKY, NEO MAP!', titleEn: 'NEO SKY, NEO MAP!', groupId: 'nijigasaki', streams: 52000000, sales: 78000 },
  { id: 'colorful-dreams', title: 'Colorful Dreams! Colorful Smiles!', titleEn: 'Colorful Dreams! Colorful Smiles!', groupId: 'nijigasaki', streams: 45000000, sales: 68000 },
  { id: 'future-parade', title: 'Future Parade', titleEn: 'Future Parade', groupId: 'nijigasaki', streams: 42000000, sales: 65000 },
  { id: 'chase', title: 'CHASE!', titleEn: 'CHASE!', groupId: 'nijigasaki', streams: 58000000, sales: 82000 },
  // Liella! 代表曲
  { id: 'start-true-dreams', title: 'START!! True dreams', titleEn: 'START!! True dreams', groupId: 'liella', streams: 55000000, sales: 76000 },
  { id: 'tiny-stars', title: 'Tiny Stars', titleEn: 'Tiny Stars', groupId: 'liella', streams: 48000000, sales: 68000 },
  { id: 'nonfiction', title: 'Nonfiction!!', titleEn: 'Nonfiction!!', groupId: 'liella', streams: 42000000, sales: 62000 },
  { id: 'starlight-prologue', title: 'Starlight Prologue', titleEn: 'Starlight Prologue', groupId: 'liella', streams: 46000000, sales: 65000 },
  { id: 'we-will', title: 'WE WILL!!', titleEn: 'WE WILL!!', groupId: 'liella', streams: 40000000, sales: 58000 },
  { id: 'miracle-new-story', title: 'MIRACLE NEW STORY', titleEn: 'MIRACLE NEW STORY', groupId: 'liella', streams: 38000000, sales: 54000 },
  // 蓮ノ空 代表曲
  { id: 'dream-believers', title: 'Dream Believers', titleEn: 'Dream Believers', groupId: 'hasunosora', streams: 22000000, sales: 38000 },
  { id: 'on-your-mark', title: 'On your mark', titleEn: 'On your mark', groupId: 'hasunosora', streams: 18000000, sales: 32000 },
  { id: 'eternal-euphoria', title: '永遠のEuphoria', titleEn: 'Eien no Euphoria', groupId: 'hasunosora', streams: 15000000, sales: 28000 },
  { id: 'holiday-holiday', title: 'Holiday∞Holiday', titleEn: 'Holiday∞Holiday', groupId: 'hasunosora', streams: 16000000, sales: 30000 },
  { id: 'deepness', title: 'DEEPNESS', titleEn: 'DEEPNESS', groupId: 'hasunosora', streams: 14000000, sales: 26000 },
  // Sunny Passion 代表曲
  { id: 'hot-passion', title: 'HOT PASSION!!', titleEn: 'HOT PASSION!!', groupId: 'sunny-passion', streams: 8500000, sales: 18000 },
  { id: 'till-sunrise', title: 'Till Sunrise', titleEn: 'Till Sunrise', groupId: 'sunny-passion', streams: 6200000, sales: 14000 },
  // Saint Snow 代表曲
  { id: 'crash-mind', title: 'CRASH MIND', titleEn: 'CRASH MIND', groupId: 'saint-snow', streams: 12000000, sales: 22000 },
  { id: 'white-first-love', title: 'WHITE FIRST LOVE', titleEn: 'WHITE FIRST LOVE', groupId: 'saint-snow', streams: 9800000, sales: 19000 },
]
