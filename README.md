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
    seiyuu.js          → 声优/角色/企划数据（μ's + Aqours 共18人）
  i18n/                → 国际化模块
    I18nContext.jsx    → 语言上下文与 Provider
    useI18n.js         → useI18n Hook
    translations.js    → 中英翻译字典
    dataTranslations.js→ 数据字段英文映射（角色定位/学校/年级/颜色等）
    constants.js       → 语言常量
    index.js           → 统一导出
  components/
    Layout.jsx         → 整体布局（Header + Sidebar + Footer）
    Header.jsx         → 顶部导航栏（含语言切换器）
    Sidebar.jsx        → 左侧边栏（企划导航 + 统计面板）
    Footer.jsx         → 底部页脚
  pages/
    Home.jsx           → 首页（企划概览 + Top Players）
    Players.jsx        → 选手列表页（表格 + 企划筛选）
    PlayerDetail.jsx   → 选手详情页（声优/角色双栏信息）
    Teams.jsx          → 组合列表页
    TeamDetail.jsx     → 组合详情页（成员 / 关系图 / 战绩）
    Matches.jsx        → Live 赛程列表页
    MatchDetail.jsx    → Live 详情页（歌单 / 出演成员 / 场馆）
    Rankings.jsx       → 排行榜页（人气 / CD销量 / 流媒体 / 综合战力）
  App.jsx              → 路由配置
  main.jsx             → 入口文件
  index.css            → Tailwind + HLTV 深色主题
```

## 当前数据范围

### 企划组合
- **μ's**（μ's）— LoveLive! 初代组合，9名成员
- **Aqours** — LoveLive! Sunshine!! 主角组合，9名成员

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

### 待完成 (Phase 3)

- [ ] **Stats 统计页面** (`/stats`)
  - 全局数据统计仪表盘
  - 企划对比图表
  - 声优/角色维度交叉分析
- [ ] **扩展企划数据**
  - 虹咲学园学园偶像同好会（虹咲）
  - Liella!
  - 莲之空女学院学园偶像俱乐部
  - 星咲学园 / Sayabro / Sunny Passion
- [ ] **搜索功能**
  - 全局搜索（声优/角色/组合/Live）
  - 搜索结果分类展示
- [ ] **交互优化**
  - 选手对比功能
  - 数据可视化图表（Chart.js / Recharts）
  - 响应式适配（移动端）

### 待完成 (Phase 4 · 远期)

- [ ] 后端 API（从静态数据迁移到动态接口）
- [ ] 数据管理后台
- [ ] 用户系统（收藏、评论）
- [ ] 多语言支持（中日英三语）

## 许可声明

本项目为非官方粉丝创作项目，不涉及商业用途。所有 LoveLive! 相关商标、角色形象版权归原著作权方所有。数据来源于公开资料，如有不准确之处欢迎指正。

---

Made with 💗 for LoveLive! fans
