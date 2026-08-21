import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getPlayerTrophies } from '../data/seiyuu'
import { useI18n } from '../i18n'

/**
 * 奖杯陈列区组件（嵌入 PlayerDetail，Phase 6.3）
 *
 * HLTV Trophies 映射：以 MVP 式荣誉陈列展示选手成就--
 *   Center 担当曲 / Solo 曲 / 巨蛋公演 / 甲子園出演
 * 成就数据由 seiyuu.js 的 getPlayerTrophies 从 songs/lives 数据动态推导
 */

// 成就类型 -> 奖杯主题色（Center 为金色 MVP 级，其余差异化配色）
const TYPE_COLORS = {
  center: '#d4a017',  // Center 担当 - 金（MVP 式最高荣誉）
  solo: '#e86ea4',    // Solo 曲 - 粉（项目强调色系）
  dome: '#7b6cd9',    // 巨蛋公演 - 紫
  koshien: '#4a90d9', // 甲子園出演 - 蓝
}

/**
 * 奖杯陈列主组件
 */
function PlayerTrophies({ player }) {
  const { lang, t } = useI18n()

  // 成就列表（player 变化时重算）
  const trophies = useMemo(() => getPlayerTrophies(player), [player])

  // 无任何成就时不渲染区块
  if (trophies.length === 0) return null

  return (
    <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
      {/* 标题行：区块名 + 成就项数 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider">
          {t('playerDetail.trophies.title')}
        </h2>
        <span className="text-xs text-hltv-text-dim">
          {t('playerDetail.trophies.count', { count: trophies.length })}
        </span>
      </div>

      {/* 奖杯陈列网格（HLTV 选手页奖杯陈列风格：图标 + 次数 + 明细芯片） */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {trophies.map(trophy => (
          <TrophyCard
            key={trophy.type}
            trophy={trophy}
            lang={lang}
            t={t}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * 单座奖杯卡片子组件
 * 左侧奖杯图标 + 次数与名称，下方为可内链的成就明细芯片
 */
function TrophyCard({ trophy, lang, t }) {
  const color = TYPE_COLORS[trophy.type] || '#888888'

  return (
    <div className="border border-hltv-border rounded p-3 flex flex-col gap-3">
      {/* 奖杯头部：图标 + 次数 + 荣誉名称 */}
      <div className="flex items-center gap-3">
        <TrophyIcon color={color} />
        <div className="min-w-0">
          <div className="text-xl font-bold leading-tight" style={{ color }}>
            ×{trophy.count}
          </div>
          <div className="text-xs text-hltv-text-dim uppercase tracking-wide">
            {t(`playerDetail.trophies.types.${trophy.type}`)}
          </div>
        </div>
      </div>

      {/* 成就明细芯片（歌曲/Live 内链；巨蛋芯片含场馆出演次数） */}
      <div className="flex flex-wrap gap-1.5">
        {trophy.entries.map(entry => (
          <Link
            key={`${trophy.type}-${entry.id}`}
            to={entry.link}
            className="inline-flex items-center gap-1 text-xs px-2 py-1 rounded border transition-colors hover:text-hltv-link"
            style={{ borderColor: `${color}44`, backgroundColor: `${color}14`, color }}
            title={lang === 'en' ? entry.titleEn : entry.title}
          >
            <span className="max-w-[16rem] truncate">
              {lang === 'en' ? entry.titleEn : entry.title}
            </span>
            {/* 巨蛋芯片附场馆出演次数（如 東京ドーム ×2） */}
            {entry.count > 1 && (
              <span className="opacity-80 font-bold">×{entry.count}</span>
            )}
          </Link>
        ))}
      </div>
    </div>
  )
}

/**
 * 奖杯图标（描边 SVG，按成就类型着色）
 */
function TrophyIcon({ color }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="w-8 h-8 shrink-0"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* 杯身 */}
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
      {/* 左右杯耳 */}
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      {/* 杯颈与底座 */}
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M4 22h16" />
    </svg>
  )
}

export default PlayerTrophies
