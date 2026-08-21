import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { getTransfersByPlayer, getGroupById } from '../data/seiyuu'
import { useI18n } from '../i18n'

/**
 * 生涯变动卡片组件（嵌入 PlayerDetail，Phase 6.2）
 *
 * HLTV Transfers 映射：以"转会历史"列表展示成员的加入/毕业/活动休止/声优交棒，
 * 数据来自 data/transfers.js（按选手 id 关联），新记录在前。
 */

// 变动类型 → 徽章颜色
const TYPE_COLORS = {
  join: '#4a90d9',       // 加入 - 蓝
  graduation: '#e05555', // 毕业 - 红
  hiatus: '#8a8f98',     // 活动休止 - 灰
  recast: '#d4a017',     // 声优交棒 - 金
}

// 英文月份缩写（month 精度日期显示用）
const EN_MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/**
 * 生涯变动主组件
 */
function TransferHistory({ player }) {
  const { lang, t } = useI18n()

  // 选手的变动记录（player 变化时重算，按日期新 → 旧）
  const records = useMemo(() => getTransfersByPlayer(player.id), [player])

  // 无记录时不渲染卡片
  if (records.length === 0) return null

  const group = getGroupById(player.groupId)

  return (
    <div className="bg-hltv-bg-secondary border border-hltv-border rounded p-4">
      {/* 标题行：区块名 + 记录数 */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider">
          {t('playerDetail.transfers.title')}
        </h2>
        <span className="text-xs text-hltv-text-dim">
          {t('playerDetail.transfers.count', { count: records.length })}
        </span>
      </div>

      {/* 变动记录列表（HLTV 转会历史风格：日期 | 类型徽章 | 所属组合 | 说明） */}
      <ul>
        {records.map((record, idx) => (
          <TransferRow
            key={`${record.type}-${record.date}-${record.playerId}`}
            record={record}
            group={group}
            lang={lang}
            t={t}
            last={idx === records.length - 1}
          />
        ))}
      </ul>
    </div>
  )
}

/**
 * 单条变动记录子组件
 * 左侧日期列 + 彩色竖条 + 类型徽章、所属组合（内链）、说明文字
 */
function TransferRow({ record, group, lang, t, last }) {
  const color = TYPE_COLORS[record.type] || '#888888'
  // 双语说明：优先当前语言，缺省回落另一语言
  const note = lang === 'en' ? (record.noteEn ?? record.note) : (record.note ?? record.noteEn)

  return (
    <li className={`relative flex gap-3 ${last ? '' : 'pb-3'}`}>
      {/* 日期列（按精度显示 年 / 年月 / 年月日） */}
      <div className="w-24 shrink-0 text-right text-xs text-hltv-text-dim pt-1 whitespace-nowrap">
        {formatTransferDate(record.date, record.precision, lang)}
      </div>
      {/* 左侧圆点 + 彩色连接线（HLTV 转会列表的时间轴感） */}
      <div className="flex flex-col items-center">
        <span
          className="w-2.5 h-2.5 rounded-full mt-1.5 shrink-0"
          style={{ backgroundColor: color }}
        />
        {!last && (
          <span
            className="flex-1 w-1 rounded-full my-0.5"
            style={{ backgroundColor: `${color}44` }}
          />
        )}
      </div>
      {/* 内容区：徽章 + 所属组合 + 说明 */}
      <div className="min-w-0 flex-1 pt-0.5">
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="inline-block text-[10px] leading-none px-1.5 py-1 rounded font-bold"
            style={{ backgroundColor: `${color}22`, color }}
          >
            {t(`playerDetail.transfers.types.${record.type}`)}
          </span>
          {/* 所属组合（内链组合详情页，企划色圆点） */}
          {group && (
            <Link
              to={`/teams/${group.id}`}
              className="inline-flex items-center gap-1.5 text-sm text-hltv-text hover:text-hltv-link hover:underline"
            >
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: group.color }} />
              {group.fullName}
            </Link>
          )}
        </div>
        {note && (
          <p className="text-xs text-hltv-text-dim mt-1 leading-relaxed">{note}</p>
        )}
      </div>
    </li>
  )
}

/**
 * 按精度与语言格式化日期
 * 中文：YYYY / YYYY-MM / YYYY-MM-DD；英文：YYYY / MMM YYYY / MM/DD/YYYY
 */
function formatTransferDate(date, precision, lang) {
  if (!date) return ''
  const [year, month, day] = date.split('-')
  if (lang === 'en') {
    if (precision === 'year' || !month) return year
    if (precision === 'month' || !day) {
      return `${EN_MONTHS[Number(month) - 1]} ${year}`
    }
    return `${month}/${day}/${year}`
  }
  return date
}

export default TransferHistory
