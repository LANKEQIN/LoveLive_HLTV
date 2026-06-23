import { useState } from 'react'
import { Link } from 'react-router-dom'
import { lives, groups, getGroupById } from '../data/seiyuu'
import { useI18n } from '../i18n'

/**
 * Live / 比赛赛程页
 * 提供列表视图、结果视图，支持按企划筛选
 */
function Matches() {
  const { lang, t } = useI18n()
  const [view, setView] = useState('list') // 'list' | 'results'
  const [filter, setFilter] = useState('all')

  // 按日期倒序排列
  const sortedLives = [...lives].sort((a, b) => new Date(b.date) - new Date(a.date))

  // 筛选
  const filteredLives = filter === 'all'
    ? sortedLives
    : sortedLives.filter(l => l.groupIds.includes(filter))

  return (
    <div className="p-4">
      {/* 页面标题与视图切换 */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-hltv-text-bright">
          {t('matches.title')}
          <span className="text-hltv-text-dim text-sm font-normal ml-2">
            ({t('matches.matchCount', { count: filteredLives.length })})
          </span>
        </h1>

        <div className="flex items-center gap-2">
          {/* 视图切换 */}
          <div className="flex items-center bg-hltv-bg border border-hltv-border rounded overflow-hidden">
            <ViewButton
              label={t('matches.views.list')}
              active={view === 'list'}
              onClick={() => setView('list')}
            />
            <ViewButton
              label={t('matches.views.results')}
              active={view === 'results'}
              onClick={() => setView('results')}
            />
          </div>

          {/* 企划筛选 */}
          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="bg-hltv-bg border border-hltv-border text-hltv-text text-sm px-3 py-1.5 rounded outline-none focus:border-hltv-accent"
          >
            <option value="all">{t('matches.allGroups')}</option>
            {groups.map(group => (
              <option key={group.id} value={group.id}>{group.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Live 列表/结果表格 */}
      <div className="bg-hltv-bg-secondary border border-hltv-border rounded overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-hltv-bg-hover text-hltv-text-dim text-xs uppercase">
              <th className="text-left px-3 py-2 w-28">{t('matches.table.date')}</th>
              <th className="text-left px-3 py-2">{t('matches.table.match')}</th>
              <th className="text-left px-3 py-2">{t('matches.table.venue')}</th>
              <th className="text-left px-3 py-2">{t('matches.table.groups')}</th>
              <th className="text-right px-3 py-2 w-24">{t('matches.table.attendance')}</th>
              <th className="text-center px-3 py-2 w-20">{t('matches.table.status')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredLives.map(live => (
              <tr
                key={live.id}
                className="hltv-row border-t border-hltv-border cursor-pointer"
                onClick={() => window.location.href = `/matches/${live.id}`}
              >
                <td className="px-3 py-2 text-hltv-text-dim whitespace-nowrap">
                  {formatDate(live.date, lang)}
                </td>
                <td className="px-3 py-2">
                  <Link
                    to={`/matches/${live.id}`}
                    className="text-hltv-link hover:text-hltv-link-hover font-medium"
                    onClick={e => e.stopPropagation()}
                  >
                    {lang === 'en' ? live.nameEn : live.name}
                  </Link>
                </td>
                <td className="px-3 py-2 text-hltv-text">
                  {lang === 'en' ? live.venueEn : live.venue}
                  <span className="text-hltv-text-dim text-xs ml-1">
                    ({lang === 'en' ? live.cityEn : live.city})
                  </span>
                </td>
                <td className="px-3 py-2">
                  <div className="flex items-center gap-1">
                    {live.groupIds.map(groupId => {
                      const group = getGroupById(groupId)
                      return (
                        <span
                          key={groupId}
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                          style={{ backgroundColor: `${group.color}22`, color: group.color }}
                        >
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: group.color }} />
                          {group.name}
                        </span>
                      )
                    })}
                  </div>
                </td>
                <td className="px-3 py-2 text-right text-hltv-text">
                  {formatNumber(live.attendance)}
                </td>
                <td className="px-3 py-2 text-center">
                  <StatusBadge status={live.status} t={t} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredLives.length === 0 && (
        <p className="text-hltv-text-dim text-sm mt-4 text-center">{t('matches.noMatches')}</p>
      )}
    </div>
  )
}

/**
 * 视图切换按钮
 */
function ViewButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 text-xs font-medium transition-colors ${
        active
          ? 'bg-hltv-accent text-white'
          : 'text-hltv-text-dim hover:text-hltv-text'
      }`}
    >
      {label}
    </button>
  )
}

/**
 * 状态标签
 */
function StatusBadge({ status, t }) {
  const isCompleted = status === 'completed'
  return (
    <span
      className="text-xs px-2 py-0.5 rounded font-medium"
      style={{
        backgroundColor: isCompleted ? '#5fb04822' : '#d4a01722',
        color: isCompleted ? '#5fb048' : '#d4a017',
      }}
    >
      {isCompleted ? t('matches.status.completed') : t('matches.status.upcoming')}
    </span>
  )
}

/**
 * 日期格式化
 */
function formatDate(dateStr, lang = 'zh') {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  if (lang === 'en') {
    return `${month}/${day}/${year}`
  }
  return `${year}-${month}-${day}`
}

/**
 * 数字格式化
 */
function formatNumber(num) {
  return num.toLocaleString('en-US')
}

export default Matches
