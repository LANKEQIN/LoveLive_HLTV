import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { players, groups, lives, songs, getGroupById, getDisplayName } from '../data/seiyuu'
import { useI18n } from '../i18n'

/**
 * 全局搜索页
 * 支持搜索声优/角色、组合、Live、歌曲，结果按分类展示
 */
function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const { lang, t } = useI18n()
  const initialQuery = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQuery)
  const [inputValue, setInputValue] = useState(initialQuery)

  // 执行搜索
  const handleSearch = e => {
    e.preventDefault()
    const trimmed = inputValue.trim()
    setQuery(trimmed)
    if (trimmed) {
      setSearchParams({ q: trimmed })
    } else {
      setSearchParams({})
    }
  }

  // 搜索结果
  const results = useMemo(() => {
    if (!query) return { players: [], groups: [], lives: [], songs: [] }
    const lowerQuery = query.toLowerCase()

    const matchedPlayers = players.filter(p => {
      const texts = [
        p.fullName,
        p.romajiName,
        p.characterName,
        p.characterFullName,
        p.characterRomaji,
        p.firstName,
        p.lastName,
      ].filter(Boolean).map(s => s.toLowerCase())
      return texts.some(text => text.includes(lowerQuery))
    })

    const matchedGroups = groups.filter(g => {
      const texts = [g.name, g.fullName, g.series, g.description, g.descriptionEn]
        .filter(Boolean).map(s => s.toLowerCase())
      return texts.some(text => text.includes(lowerQuery))
    })

    const matchedLives = lives.filter(l => {
      const texts = [l.name, l.nameEn, l.venue, l.venueEn, l.city, l.cityEn]
        .filter(Boolean).map(s => s.toLowerCase())
      return texts.some(text => text.includes(lowerQuery))
    })

    const matchedSongs = songs.filter(s => {
      const texts = [s.title, s.titleEn].filter(Boolean).map(s => s.toLowerCase())
      return texts.some(text => text.includes(lowerQuery))
    })

    return {
      players: matchedPlayers,
      groups: matchedGroups,
      lives: matchedLives,
      songs: matchedSongs,
    }
  }, [query])

  const hasResults = results.players.length > 0 || results.groups.length > 0 ||
                     results.lives.length > 0 || results.songs.length > 0

  return (
    <div className="p-4">
      {/* 页面标题 */}
      <h1 className="text-2xl font-bold text-hltv-text-bright mb-4">{t('search.title')}</h1>

      {/* 搜索框 */}
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder={t('search.placeholder')}
            className="flex-1 bg-hltv-bg-secondary border border-hltv-border text-hltv-text px-4 py-2 rounded outline-none focus:border-hltv-accent"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-hltv-accent text-white rounded font-medium hover:bg-hltv-accent-hover transition-colors"
          >
            {t('search.title')}
          </button>
        </div>
      </form>

      {/* 搜索结果 */}
      {query && (
        <>
          <h2 className="text-hltv-text-dim text-sm font-bold uppercase tracking-wider mb-3">
            {t('search.resultsFor', { query })}
          </h2>

          {!hasResults ? (
            <p className="text-hltv-text-dim text-center py-8">{t('search.noResults')}</p>
          ) : (
            <div className="space-y-6">
              {/* 声优/角色 */}
              {results.players.length > 0 && (
                <ResultSection title={t('search.categories.players')} count={results.players.length}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {results.players.map(player => (
                      <PlayerResultCard key={player.id} player={player} lang={lang} />
                    ))}
                  </div>
                </ResultSection>
              )}

              {/* 组合 */}
              {results.groups.length > 0 && (
                <ResultSection title={t('search.categories.groups')} count={results.groups.length}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {results.groups.map(group => (
                      <GroupResultCard key={group.id} group={group} lang={lang} />
                    ))}
                  </div>
                </ResultSection>
              )}

              {/* Live */}
              {results.lives.length > 0 && (
                <ResultSection title={t('search.categories.lives')} count={results.lives.length}>
                  <div className="bg-hltv-bg-secondary border border-hltv-border rounded overflow-hidden">
                    <table className="w-full text-sm">
                      <tbody>
                        {results.lives.map(live => (
                          <tr key={live.id} className="hltv-row border-t border-hltv-border">
                            <td className="px-3 py-2">
                              <Link
                                to={`/matches/${live.id}`}
                                className="text-hltv-link hover:text-hltv-link-hover font-medium"
                              >
                                {lang === 'en' ? live.nameEn : live.name}
                              </Link>
                            </td>
                            <td className="px-3 py-2 text-hltv-text-dim text-xs">
                              {live.date}
                            </td>
                            <td className="px-3 py-2 text-hltv-text-dim text-xs">
                              {lang === 'en' ? live.venueEn : live.venue}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </ResultSection>
              )}

              {/* 歌曲 */}
              {results.songs.length > 0 && (
                <ResultSection title={t('search.categories.songs')} count={results.songs.length}>
                  <div className="bg-hltv-bg-secondary border border-hltv-border rounded overflow-hidden">
                    <table className="w-full text-sm">
                      <tbody>
                        {results.songs.map(song => {
                          const group = getGroupById(song.groupId)
                          return (
                            <tr key={song.id} className="hltv-row border-t border-hltv-border">
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
                              <td className="px-3 py-2 text-hltv-text-dim text-xs text-right">
                                {formatNumber(song.streams)} streams
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </ResultSection>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}

/**
 * 搜索结果分类区块
 */
function ResultSection({ title, count, children }) {
  return (
    <div>
      <h3 className="text-hltv-text-bright font-medium mb-2 flex items-center gap-2">
        {title}
        <span className="text-xs text-hltv-text-dim bg-hltv-bg px-2 py-0.5 rounded">{count}</span>
      </h3>
      {children}
    </div>
  )
}

/**
 * 声优/角色结果卡片
 */
function PlayerResultCard({ player, lang }) {
  const group = getGroupById(player.groupId)
  const rating = calculateRating(player)
  return (
    <Link
      to={`/players/${player.id}`}
      className="flex items-center gap-3 bg-hltv-bg-secondary border border-hltv-border rounded p-3 hover:border-hltv-border-light transition-colors"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold shrink-0"
        style={{ backgroundColor: `${player.characterColor}33`, color: player.characterColor }}
      >
        {player.characterName.charAt(0)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-hltv-text-bright font-medium truncate">
          {getDisplayName(player, lang)}
        </div>
        <div className="text-hltv-text-dim text-xs truncate">
          {lang === 'en' ? player.characterRomaji : player.characterFullName}
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-bold" style={{ color: getRatingColor(rating) }}>
          {rating.toFixed(2)}
        </div>
        <div className="text-xs" style={{ color: group.color }}>{group.name}</div>
      </div>
    </Link>
  )
}

/**
 * 组合结果卡片
 */
function GroupResultCard({ group, lang }) {
  const memberCount = players.filter(p => p.groupId === group.id).length
  return (
    <Link
      to={`/teams/${group.id}`}
      className="flex items-center gap-3 bg-hltv-bg-secondary border border-hltv-border rounded p-3 hover:border-hltv-border-light transition-colors"
    >
      <div
        className="w-10 h-10 rounded-lg flex items-center justify-center text-lg font-bold shrink-0"
        style={{ backgroundColor: `${group.color}33`, color: group.color, border: `2px solid ${group.color}` }}
      >
        {group.name.charAt(0)}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-hltv-text-bright font-medium">{group.name}</div>
        <div className="text-hltv-text-dim text-xs truncate">
          {lang === 'en' ? group.descriptionEn : group.description}
        </div>
      </div>
      <div className="text-right text-xs text-hltv-text-dim">
        {memberCount} members
      </div>
    </Link>
  )
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

/**
 * 数字格式化
 */
function formatNumber(num) {
  return num.toLocaleString('en-US')
}

export default Search
