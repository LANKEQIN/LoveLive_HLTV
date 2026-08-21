import { useMemo } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { getCareerActivity } from '../data/seiyuu'
import { useI18n } from '../i18n'
import { getRatingColor } from '../utils/rating'

/**
 * 生涯数据曲线组件（嵌入 PlayerDetail，Phase 6.4）
 *
 * 历年活动量 / 年度评分趋势折线图（Recharts）：
 *   - 左轴：Live 出演场次、歌曲参与数（活动量）
 *   - 右轴：年度评分（0 - 1.50，口径见 seiyuu.js getCareerActivity）
 * 数据由 seiyuu.js 的 getCareerActivity 从 lives/songs/events 动态推导
 */

// 折线配色（与 Compare 页对比色系一致，评分线用站点强调粉）
const LINE_COLORS = {
  lives: '#5fb048',  // Live 出演 - 绿
  songs: '#00b0f0',  // 歌曲参与 - 蓝
  rating: '#ff6b9d', // 年度评分 - 站点强调粉
}

/**
 * 生涯数据曲线主组件
 */
function CareerChart({ player }) {
  const { t } = useI18n()

  // 年度活动数据（player 变化时重算）
  const data = useMemo(() => getCareerActivity(player), [player])

  // 不足两个年份画不出趋势，不渲染区块
  if (data.length < 2) return null

  const firstYear = data[0].year
  const lastYear = data[data.length - 1].year

  return (
    <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
      {/* 标题行：区块名 + 年份范围 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider">
          {t('playerDetail.chart.title')}
        </h2>
        <span className="text-xs text-hltv-text-dim">
          {t('playerDetail.chart.range', { from: firstYear, to: lastYear })}
        </span>
      </div>

      {/* 折线图：左轴活动量（Live/歌曲），右轴年度评分 */}
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 5, left: -18, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#3a3e45" />
            <XAxis dataKey="year" stroke="#8d9196" tickLine={false} />
            <YAxis yAxisId="left" stroke="#8d9196" tickLine={false} allowDecimals={false} />
            <YAxis
              yAxisId="right"
              orientation="right"
              stroke="#8d9196"
              tickLine={false}
              domain={[0, 1.5]}
              tickFormatter={v => v.toFixed(1)}
            />
            <Tooltip content={<ChartTooltip t={t} />} />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="lives"
              name={t('playerDetail.chart.lives')}
              stroke={LINE_COLORS.lives}
              strokeWidth={2}
              dot={{ r: 2.5 }}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="songs"
              name={t('playerDetail.chart.songs')}
              stroke={LINE_COLORS.songs}
              strokeWidth={2}
              dot={{ r: 2.5 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="rating"
              name={t('playerDetail.chart.rating')}
              stroke={LINE_COLORS.rating}
              strokeWidth={2}
              dot={{ r: 2.5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* 年度评分口径说明 */}
      <p className="text-xs text-hltv-text-dim mt-3">
        {t('playerDetail.chart.note')}
      </p>
    </div>
  )
}

/**
 * 自定义 Tooltip 子组件
 * 展示当年 Live / 歌曲（含 Solo）/ 活动明细，评分按站点色阶着色
 */
function ChartTooltip({ active, payload, label, t }) {
  if (!active || !payload || payload.length === 0) return null
  // payload 首项携带整行年度数据
  const row = payload[0].payload

  return (
    <div className="bg-hltv-bg border border-hltv-border rounded px-3 py-2 text-xs shadow-lg">
      <div className="font-bold text-hltv-text-bright mb-1.5">{label}</div>
      <div className="space-y-0.5">
        <TooltipRow color={LINE_COLORS.lives} label={t('playerDetail.chart.lives')} value={row.lives} />
        <TooltipRow
          color={LINE_COLORS.songs}
          label={t('playerDetail.chart.songs')}
          value={row.solo > 0 ? `${row.songs}（Solo ${row.solo}）` : row.songs}
        />
        <TooltipRow
          color={LINE_COLORS.rating}
          label={t('playerDetail.chart.rating')}
          value={row.rating.toFixed(2)}
          valueColor={getRatingColor(row.rating)}
        />
      </div>
    </div>
  )
}

/**
 * Tooltip 行子组件（色点 + 指标名 + 数值）
 */
function TooltipRow({ color, label, value, valueColor }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: color }} />
      <span className="text-hltv-text-dim">{label}</span>
      <span className="ml-auto pl-3 font-bold" style={{ color: valueColor || '#cad0d6' }}>
        {value}
      </span>
    </div>
  )
}

// 评分色阶见 src/utils/rating.js（共享模块）

export default CareerChart
