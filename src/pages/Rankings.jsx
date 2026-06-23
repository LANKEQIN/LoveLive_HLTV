import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  players,
  songs,
  getGroupById,
  getDisplayName,
} from '../data/seiyuu'
import { useI18n } from '../i18n'

/**
 * 排行榜页
 * 提供人气榜、CD销量榜、流媒体播放榜、综合战力排名四个榜单
 */
function Rankings() {
  const { lang, t } = useI18n()
  const [activeTab, setActiveTab] = useState('popularity')

  const tabs = [
    { id: 'popularity', label: t('rankings.tabs.popularity') },
    { id: 'cdSales', label: t('rankings.tabs.cdSales') },
    { id: 'streaming', label: t('rankings.tabs.streaming') },
    { id: 'power', label: t('rankings.tabs.power') },
  ]

  return (
    <div className="p-4">
      {/* 页面标题 */}
      <h1 className="text-2xl font-bold text-hltv-text-bright mb-4">{t('rankings.title')}</h1>

      {/* 榜单切换 Tab */}
      <div className="flex items-center gap-1 mb-4 border-b border-hltv-border pb-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-sm font-medium rounded-t transition-colors ${
              activeTab === tab.id
                ? 'text-hltv-text-bright bg-hltv-bg-hover border-b-2 border-hltv-accent'
                : 'text-hltv-text-dim hover:text-hltv-text hover:bg-hltv-bg-hover'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 榜单内容 */}
      <div className="bg-hltv-bg-secondary border border-hltv-border rounded overflow-hidden">
        {activeTab === 'popularity' && <PopularityRanking lang={lang} t={t} />}
        {activeTab === 'cdSales' && <CDSalesRanking lang={lang} t={t} />}
        {activeTab === 'streaming' && <StreamingRanking lang={lang} t={t} />}
        {activeTab === 'power' && <PowerRanking lang={lang} t={t} />}
      </div>
    </div>
  )
}

/**
 * 人气榜：按粉丝数排名
 */
function PopularityRanking({ lang, t }) {
  const ranked = [...players].sort((a, b) => b.stats.fanclubMembers - a.stats.fanclubMembers)

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-hltv-bg-hover text-hltv-text-dim text-xs uppercase">
          <th className="text-left px-3 py-2 w-12">{t('rankings.table.rank')}</th>
          <th className="text-left px-3 py-2">{t('rankings.table.player')}</th>
          <th className="text-left px-3 py-2">{t('rankings.table.group')}</th>
          <th className="text-right px-3 py-2">{t('rankings.table.fans')}</th>
        </tr>
      </thead>
      <tbody>
        {ranked.map((player, index) => {
          const group = getGroupById(player.groupId)
          return (
            <tr key={player.id} className="hltv-row border-t border-hltv-border">
              <td className="px-3 py-2 text-hltv-text-dim">{index + 1}</td>
              <td className="px-3 py-2">
                <Link to={`/players/${player.id}`} className="text-hltv-link hover:text-hltv-link-hover font-medium">
                  {getDisplayName(player, lang)}
                </Link>
              </td>
              <td className="px-3 py-2">
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                  style={{ backgroundColor: `${group.color}22`, color: group.color }}
                >
                  {group.name}
                </span>
              </td>
              <td className="px-3 py-2 text-right text-hltv-text-bright font-medium">
                {formatNumber(player.stats.fanclubMembers)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

/**
 * CD 销量榜：按歌曲销量排名
 */
function CDSalesRanking({ lang, t }) {
  const ranked = [...songs].sort((a, b) => b.sales - a.sales)

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-hltv-bg-hover text-hltv-text-dim text-xs uppercase">
          <th className="text-left px-3 py-2 w-12">{t('rankings.table.rank')}</th>
          <th className="text-left px-3 py-2">{t('rankings.table.song')}</th>
          <th className="text-left px-3 py-2">{t('rankings.table.group')}</th>
          <th className="text-right px-3 py-2">{t('rankings.table.sales')}</th>
        </tr>
      </thead>
      <tbody>
        {ranked.map((song, index) => {
          const group = getGroupById(song.groupId)
          return (
            <tr key={song.id} className="hltv-row border-t border-hltv-border">
              <td className="px-3 py-2 text-hltv-text-dim">{index + 1}</td>
              <td className="px-3 py-2 text-hltv-text-bright font-medium">
                {lang === 'en' ? song.titleEn : song.title}
              </td>
              <td className="px-3 py-2">
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                  style={{ backgroundColor: `${group.color}22`, color: group.color }}
                >
                  {group.name}
                </span>
              </td>
              <td className="px-3 py-2 text-right text-hltv-text-bright font-medium">
                {formatNumber(song.sales)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

/**
 * 流媒体播放榜：按歌曲播放量排名
 */
function StreamingRanking({ lang, t }) {
  const ranked = [...songs].sort((a, b) => b.streams - a.streams)

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-hltv-bg-hover text-hltv-text-dim text-xs uppercase">
          <th className="text-left px-3 py-2 w-12">{t('rankings.table.rank')}</th>
          <th className="text-left px-3 py-2">{t('rankings.table.song')}</th>
          <th className="text-left px-3 py-2">{t('rankings.table.group')}</th>
          <th className="text-right px-3 py-2">{t('rankings.table.streams')}</th>
        </tr>
      </thead>
      <tbody>
        {ranked.map((song, index) => {
          const group = getGroupById(song.groupId)
          return (
            <tr key={song.id} className="hltv-row border-t border-hltv-border">
              <td className="px-3 py-2 text-hltv-text-dim">{index + 1}</td>
              <td className="px-3 py-2 text-hltv-text-bright font-medium">
                {lang === 'en' ? song.titleEn : song.title}
              </td>
              <td className="px-3 py-2">
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                  style={{ backgroundColor: `${group.color}22`, color: group.color }}
                >
                  {group.name}
                </span>
              </td>
              <td className="px-3 py-2 text-right text-hltv-text-bright font-medium">
                {formatNumber(song.streams)}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

/**
 * 综合战力排名：按综合评分排名
 */
function PowerRanking({ lang, t }) {
  const ranked = [...players]
    .map(player => ({ player, rating: calculateRating(player) }))
    .sort((a, b) => b.rating - a.rating)

  return (
    <table className="w-full text-sm">
      <thead>
        <tr className="bg-hltv-bg-hover text-hltv-text-dim text-xs uppercase">
          <th className="text-left px-3 py-2 w-12">{t('rankings.table.rank')}</th>
          <th className="text-left px-3 py-2">{t('rankings.table.player')}</th>
          <th className="text-left px-3 py-2">{t('rankings.table.group')}</th>
          <th className="text-center px-3 py-2 w-20">{t('rankings.table.rating')}</th>
        </tr>
      </thead>
      <tbody>
        {ranked.map(({ player, rating }, index) => {
          const group = getGroupById(player.groupId)
          return (
            <tr key={player.id} className="hltv-row border-t border-hltv-border">
              <td className="px-3 py-2 text-hltv-text-dim">{index + 1}</td>
              <td className="px-3 py-2">
                <Link to={`/players/${player.id}`} className="text-hltv-link hover:text-hltv-link-hover font-medium">
                  {getDisplayName(player, lang)}
                </Link>
              </td>
              <td className="px-3 py-2">
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs"
                  style={{ backgroundColor: `${group.color}22`, color: group.color }}
                >
                  {group.name}
                </span>
              </td>
              <td className="px-3 py-2 text-center">
                <span className="font-bold" style={{ color: getRatingColor(rating) }}>
                  {rating.toFixed(2)}
                </span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

/**
 * 数字格式化
 */
function formatNumber(num) {
  return num.toLocaleString('en-US')
}

/**
 * 计算综合评分
 */
function calculateRating(player) {
  const { liveCount, songCount, soloCount, cdCount, eventCount, fanclubMembers } = player.stats
  const score =
    liveCount * 0.05 +
    songCount * 0.02 +
    soloCount * 0.03 +
    cdCount * 0.01 +
    eventCount * 0.005 +
    (fanclubMembers / 10000) * 0.01
  return Math.min(score, 1.50)
}

/**
 * 根据评分获取颜色
 */
function getRatingColor(rating) {
  if (rating >= 1.20) return '#5fb048'
  if (rating >= 1.05) return '#d4a017'
  if (rating >= 0.90) return '#cad0d6'
  return '#e05555'
}

export default Rankings
