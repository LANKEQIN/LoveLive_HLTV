# LoveLive! HLTV 项目规则

> 本文件为项目开发规范，所有 contributors（含 AI 助手）在编写代码前必须先阅读本文件。

## 1. 项目概述

LoveLive! HLTV 是一个非官方粉丝数据平台，以 HLTV（CS2 电竞数据网站）的视觉风格和交互模式，展示 LoveLive! 学园偶像企划的声优与角色信息。

核心创意：将电竞数据平台的范式套用到偶像企划上，形成反差萌。

## 2. 技术栈

- **框架**: React 19 + Vite 8
- **样式**: TailwindCSS v4（通过 @tailwindcss/vite 插件集成）
- **路由**: react-router-dom v7
- **语言**: JavaScript（JSX），暂不使用 TypeScript
- **包管理**: npm
- **运行环境**: Node.js 25+, Windows 11

## 3. 核心命名格式约定（最重要）

对应 CS2 选手的「名 + ID + 姓」格式，本项目采用：

```
声优的名 "对应角色名" 声优的姓
```

示例：
- 新田恵海 → `恵海 "穂乃果" 新田`（对应角色：高坂穂乃果）
- 伊波杏樹 → `杏樹 "千歌" 伊波`（对应角色：高海千歌）

数据结构字段映射：
- `firstName`: 声优的名（日语）
- `characterName`: 对应二次元角色名（作为 ID/昵称）
- `lastName`: 声优的姓
- `fullName`: 声优全名（姓+名，日语习惯）
- `romajiName`: 声优全名罗马音（西方顺序：名在前，姓在后）
- `characterFullName`: 角色全名
- `characterRomaji`: 角色全名罗马音（西方顺序）

显示优先级：**三次元声优信息优先展示**，二次元角色信息并列展示。

### 英文模式显示规则

项目支持中/英双语切换。`lang === 'en'` 时：
- 人物显示名使用 `getDisplayName(player, 'en')`，格式保持「名 "角色名" 姓」，但转为**罗马音**：
  - 例：新田恵海 → `Emi "Honoka" Nitta`
- 角色全名、学校、年级、出身地、角色定位、颜色名等数据字段需使用 `src/i18n/dataTranslations.js` 中的映射函数转为英文
- UI 文案通过 `src/i18n/translations.js` 字典翻译
- 日期格式：英文使用 `MM/DD/YYYY`，中文使用 `YYYY-MM-DD`

## 4. 数据规范

数据文件统一放在 `src/data/` 目录。当前数据文件：
- `seiyuu.js`: 声优/角色/企划数据

数据原则：
- **真实数据为主**: 声优姓名、生日、出身地、血型、所属事务所、角色信息等使用公开可查证的真实数据
- **模拟数据为辅**: 粉丝数、活动出场次数等无法精确统计的数据用合理模拟值填充
- 统计数据（如评分 rating）通过算法计算，不硬编码

## 5. 目录结构规范

```
src/
  data/          → 数据文件（声优、企划、Live等）
  i18n/          → 国际化模块（翻译字典、数据字段映射、语言上下文）
  components/    → 通用/布局组件
  pages/         → 页面组件（对应路由）
  App.jsx        → 路由配置
  main.jsx       → 入口文件
  index.css      → 全局样式 + Tailwind 主题
```

## 6. 代码规范

- **注释**: 所有代码必须添加中文注释，说明组件用途、函数功能、关键逻辑
- **命名**: 组件用 PascalCase，函数/变量用 camelCase，常量用 UPPER_SNAKE_CASE
- **组件**: 函数式组件，单一职责，超过 200 行考虑拆分
- **样式**: 使用 Tailwind 工具类，自定义颜色通过 `@theme` 在 index.css 定义
- **单文件行数**: 控制在 2000 行以内，超出需拆分

## 7. UI/风格规范

- **主题**: HLTV 风格深色主题（背景 #1b1e23）
- **色系**: 通过 CSS 变量定义在 index.css 的 `@theme` 块中
  - `hltv-bg` / `hltv-bg-secondary` / `hltv-bg-hover`: 背景色系
  - `hltv-text` / `hltv-text-dim` / `hltv-text-bright`: 文字色系
  - `hltv-accent`: 强调色（偏 LoveLive 粉色系）
  - 企划主题色: `muse`(粉) / `aqours`(水蓝) / `nijigasaki`(黄) 等
- **交互**: 表格行 hover 高亮（`.hltv-row:hover`），链接颜色变化
- **评分颜色编码**: 绿(≥1.20) / 黄(≥1.05) / 白(≥0.90) / 红(<0.90)

## 8. HLTV 元素映射约定

| HLTV 概念 | LoveLive 映射 | 说明 |
|-----------|---------------|------|
| Player | 声优 | 三次元优先，名字含角色ID |
| Team | 企划组合 | μ's / Aqours / 虹咲等 |
| Match | Live/演唱会 | 演唱会、活动出场 |
| Tournament | 企划系列 | LoveLive! / Sunshine!! 等 |
| Ranking | 排行榜 | 人气/销量/流媒体榜 |
| Stats | 统计数据 | Live场次、歌曲数、CD数等 |
| Rating 2.0 | 综合评分 | 算法计算的综合指标 |

## 9. 国际化开发约定

- 新增页面/组件文案必须通过 `useI18n` 的 `t()` 函数从 `src/i18n/translations.js` 获取，**禁止直接硬编码中文或英文**
- 数据字段（角色定位、学校、年级、出身地、颜色名等）如需在英文模式下展示，应补充到 `src/i18n/dataTranslations.js` 并使用对应映射函数
- 新增声优/角色数据时，必须同时提供 `romajiName` 和 `characterRomaji` 字段，以保证英文显示正确
- 语言切换状态统一由 `I18nProvider` 管理，通过 `localStorage` 持久化

## 10. 开发流程约定

- 开发新功能前先阅读本规则文件
- 新增数据文件放在 `src/data/`，新增页面放在 `src/pages/`，新增组件放在 `src/components/`，新增国际化相关文件放在 `src/i18n/`
- 页面组件需要在 `App.jsx` 中注册路由
- 如果文档约束与目标有冲突，先沟通再实施，不要盲目强干
