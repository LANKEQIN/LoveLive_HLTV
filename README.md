# LoveLive! HLTV

> 以 HLTV（CS2 电竞数据网站）的风格，展示 LoveLive! 学园偶像企划的声优与角色数据。
>
> 非官方粉丝项目，仅供学习交流。

## 项目简介

把硬核电竞数据平台的范式套用到偶像企划上——声优当"选手"，企划组合当"战队"，Live 演唱会当"比赛"，用数据密集型的深色界面呈现反差萌。

### 核心特色

- **HLTV 风格界面**: 深色主题、数据表格、Rating 评分系统、侧边栏统计面板
- **独特命名格式**: 对应 CS2 的「名 + ID + 姓」，采用「声优的名 "角色名" 声优的姓」
- **三次元优先**: 声优（三次元）信息优先展示，角色（二次元）信息并列呈现
- **中英双语支持**: 一键切换中文/English，英文模式下人物名以罗马音显示
- **真实数据**: 声优姓名、生日、事务所、角色信息等均基于公开资料

### 命名格式示例

| 声优 | 角色 | 中文显示 | 英文显示（罗马音） |
|------|------|----------|---------------------|
| 新田恵海 | 高坂穂乃果 | `恵海 "穂乃果" 新田` | `Emi "Honoka" Nitta` |
| 南條愛乃 | 絢瀬絵里 | `愛乃 "絵里" 南條` | `Yoshino "Eli" Nango` |
| 伊波杏樹 | 高海千歌 | `杏樹 "千歌" 伊波` | `Anju "Chika" Inami` |
| 逢田梨香子 | 桜内梨子 | `梨香子 "梨子" 逢田` | `Rikako "Riko" Aida` |

### HLTV 元素映射

| HLTV 概念 | LoveLive 映射 |
|-----------|---------------|
| Player（选手） | 声优 |
| Team（战队） | 企划组合（μ's / Aqours 等） |
| Match（比赛） | Live / 演唱会 |
| Ranking（排名） | 人气榜 / 销量榜 |
| Stats（统计） | Live场次 / 歌曲数 / CD数 |
| Rating 2.0 | 综合评分（算法计算） |

## 技术栈

- React 19 + Vite 8
- TailwindCSS v4
- react-router-dom v7
- Recharts（数据可视化图表）

## 快速开始

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

开发服务器默认运行在 `http://localhost:5173/`

## 项目结构

```
src/
  data/
    seiyuu.js          → 数据统一出口（整合所有数据模块）
    players.js         → 声优/角色数据（μ's + Aqours + 虹咲 + Liella! + 莲之空等）
    groups.js          → 企划组合数据（7个组合）
    lives.js           → Live/演唱会数据
    songs.js           → 歌曲数据（239首，含发行日期/Center/演唱阵容/词曲等字段）
    discs.js           → 单曲/专辑唱片数据（112张，含品番/销量/收录曲）
    relationships.js   → 成员关系数据（CP/小队）
  i18n/                → 国际化模块
    I18nContext.jsx    → 语言上下文与 Provider
    useI18n.js         → useI18n Hook
    translations.js    → 中英翻译字典
    dataTranslations.js→ 数据字段英文映射（角色定位/学校/年级/颜色等）
    constants.js       → 语言常量
    index.js           → 统一导出
  components/
    Layout.jsx         → 整体布局（Header + Sidebar + Footer）
    Header.jsx         → 顶部导航栏（含语言切换器、搜索框、移动端菜单）
    Sidebar.jsx        → 左侧边栏（企划导航 + 统计面板 + 快捷功能）
    Footer.jsx         → 底部页脚
  pages/
    Home.jsx           → 首页（企划概览 + Top Players）
    Players.jsx        → 选手列表页（表格 + 企划筛选）
    PlayerDetail.jsx   → 选手详情页（声优/角色双栏信息）
    Teams.jsx          → 组合列表页
    TeamDetail.jsx     → 组合详情页（成员 / 关系图 / 战绩）
    Matches.jsx        → Live 赛程列表页
    MatchDetail.jsx    → Live 详情页（歌单 / 出演成员 / 场馆）
    Songs.jsx          → 歌曲列表页（企划/类型筛选 + 排序）
    SongDetail.jsx     → 歌曲详情页（演唱阵容 / Center / 首次披露 Live / 成绩）
    Rankings.jsx       → 排行榜页（人气 / CD销量 / 流媒体 / 综合战力）
    Stats.jsx          → 统计页面（仪表盘 + 图表 + 交叉分析）
    Search.jsx         → 全局搜索页（声优/角色/组合/Live/歌曲）
    Compare.jsx        → 选手对比页（雷达图 + 柱状图 + 对比表格）
  App.jsx              → 路由配置
  main.jsx             → 入口文件
  index.css            → Tailwind + HLTV 深色主题
```

## 当前数据范围

### 企划组合
- **μ's** — LoveLive! 初代组合，9名成员
- **Aqours** — LoveLive! Sunshine!! 主角组合，9名成员
- **虹ヶ咲学園スクールアイドル同好会** — LoveLive! 虹ヶ咲学園スクールアイドル同好会，12名成员
- **Liella!** — LoveLive! Superstar!! 主角组合，11名成员
- **蓮ノ空女学院スクールアイドルクラブ** — LoveLive! 蓮ノ空女学院スクールアイドルクラブ，6名成员
- **Sunny Passion** — LoveLive! Superstar!! 对手组合，2名成员
- **Saint Snow** — LoveLive! Sunshine!! 对手组合，2名成员

共计 **41+ 名声优/角色**，覆盖 LoveLive! 系列全部主线企划。

### 数据来源说明
- **真实数据**: 声优姓名、生日、出身地、血型、身高、所属事务所、出道年份、角色姓名/学校/年级/代表色等
- **模拟数据**: 粉丝数、活动出场次数等无法精确统计的指标使用合理模拟值填充
- **计算数据**: 综合评分（Rating）通过加权算法计算得出

## 开发计划

### 已完成 (Phase 1)

- [x] 项目搭建（React + Vite + TailwindCSS + react-router-dom）
- [x] HLTV 风格深色主题配置
- [x] μ's + Aqours 共18位声优/角色数据
- [x] 整体布局组件（Header / Sidebar / Footer）
- [x] 首页（企划概览 + Top Players 排行）
- [x] 选手列表页（数据表格 + 企划筛选 + Rating 评分）
- [x] 选手详情页（声优/角色双栏信息 + 统计卡片）
- [x] 中英双语支持（Header 语言切换、英文罗马音显示、数据字段英译）

### 已完成 (Phase 2)

- [x] **Teams 战队/组合主页** (`/teams` / `/teams/:id`)
  - 企划组合列表与详情页：成员列表、成立时间、代表色、总战绩
  - 组合成员关系图（角色间的 CP / 小队关系）
- [x] **Matches 比赛/Live赛程** (`/matches` / `/matches/:id`)
  - Live 演唱会列表（日期、地点、参演组合）
  - 列表视图 + 结果视图切换
  - 单场 Live 详情页（歌单、出演成员、场馆信息）
- [x] **Rankings 排行榜** (`/rankings`)
  - 人气榜（按粉丝数排名）
  - CD 销量榜
  - 流媒体播放榜
  - 综合战力排名

### 已完成 (Phase 3)

- [x] **Stats 统计页面** (`/stats`)
  - 全局数据统计仪表盘（总选手数、总组合数、总Live、总歌曲、总CD、总观众数、平均评分）
  - 企划对比图表（柱状图：成员数/Live场次/歌曲数）
  - Top Players 评分条形图
  - 评分分布图（绿/黄/白/红四级）
  - 年级分布饼图
  - 跨企划六维对比雷达图
- [x] **扩展企划数据**
  - 虹ヶ咲学園スクールアイドル同好会（12名成员）
  - Liella!（11名成员）
  - 蓮ノ空女学院スクールアイドルクラブ（6名成员）
  - Sunny Passion（2名成员）
  - Saint Snow（2名成员）
- [x] **全局搜索功能** (`/search`)
  - 支持搜索声优/角色/组合/Live/歌曲
  - 搜索结果分类展示
  - URL 参数保留搜索关键词
- [x] **选手对比功能** (`/compare`)
  - 支持选择最多4名选手进行对比
  - 六维能力雷达图（Lives/Songs/Solo/CDs/Events/Fans）
  - 数据对比柱状图
  - 详细对比表格
- [x] **数据可视化图表**（Recharts）
- [x] **响应式适配**（移动端菜单、自适应布局）

### 已完成 (Phase 4.1)

- [x] **歌曲数据补全**
  - 扩充歌曲字段：`releaseDate`（发行日期）、`singleId`（所属唱片）、`center`（Center 成员）、`performers`（演唱阵容）、`lyricist`/`composer`（作词/作曲）、`type`（single/album/solo/coupling）
  - 补录全企划单曲主打曲：μ's（8 张编号单曲 + 动画/剧场版/联动单曲）、Aqours（4 张编号单曲 + 全部动画/剧场版/Live 主题歌单曲）、虹咲（5 张全员专辑 + 全部组合单曲）、Liella!（1st〜21st 单曲）、莲之空（迷你专辑 + 7 张全员单曲）
  - 新建 `src/data/discs.js` 唱片数据（112 张）：编号、名称、品番、封面色、发行日期、销量、收录曲
  - 补充虹咲 27 首、莲之空 15 首 solo 曲（动画插入歌、专辑 solo、R3BIRTH、毕业专辑新录、Link! Like! 翻唱）
  - 数据经官方 CD 页 / Oricon / llwiki 多源交叉验证（累计 239 首歌曲）

### 已完成 (Phase 4.2 ~ 4.4 · 数据深化)

- [x] **官方小队数据** — Printemps/BiBi/lily white、CYaRon!/AZALEA/Guilty Kiss 等全企划官方小队录入（`officialUnit` 类型），年级组保留 `subunit` 并列展示，TeamDetail 关系图支持按类型筛选
- [x] **Live 数据增强** — setlist 关联歌曲 ID、出演/缺席明细（`performers` / `memberStatus`，含休止、交棒等记录）、补录 LoveLive! Fest / ユニット甲子園 / 东京巨蛋等重要场次
- [x] **关系数据扩充** — 跨企划"憧憬"（`admiration`）、跨企划组合（`crossUnit`）、同事务所（`sameAgency`）；莲之空 104/105 期成员与世代标记；声优数据勘误（μ's/Aqours 11 处声优映射错位修正）

### 已完成 (Phase 5.1)

- [x] **歌曲列表页** (`/songs`)
  - 企划筛选（标签切换）+ 类型筛选（单曲主打/耦合曲/专辑曲/Solo 曲/其他）
  - 按发行日期 / 播放量 / 销量排序，支持升序/降序切换
- [x] **歌曲详情页** (`/songs/:id`)
  - 基本信息：发行日期 / 作词 / 作曲 / Center / 所属唱片（封面色块 + 编号）
  - 演唱阵容链接到选手页（HLTV 命名格式，Center 带 C 徽章）
  - 首次披露 Live（链接到 Live 详情页）+ 累计 Live 演出次数
  - 成绩数据：播放量 / 销量及全站排名；同唱片收录曲互链
- [x] Header 导航新增 Songs 入口；全局搜索歌曲结果可点击进入详情

### 待完成（Phase 5 剩余 + Phase 6-8）

详细计划见 [docs/开发计划.md](docs/开发计划.md)，概要：

- **Phase 5 剩余 · 新功能页面** — 单曲/专辑页（`/discs`）、大型活动页、选手生涯时间线、企划大事记
- **Phase 6 · HLTV 风格深化** — 首页动态流、"转会"（加入/毕业）系统、选手成就、生涯曲线
- **Phase 7 · 工程化与部署** — Vitest 测试、代码分割、GitHub Actions CI、部署上线
- **Phase 8 · 轻量后端（可选）** — 数据 API 化（dataProvider 抽象 + JSON 导出），不做用户系统

## 许可声明

本项目为非官方粉丝创作项目，不涉及商业用途。所有 LoveLive! 相关商标、角色形象版权归原著作权方所有。数据来源于公开资料，如有不准确之处欢迎指正。

---

Made with 💗 for LoveLive! fans
