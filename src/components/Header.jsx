import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n'

/**
 * 顶部导航栏组件
 * 模仿 HLTV 的顶部黑色导航条样式
 * 包含导航菜单、搜索框、语言切换器和移动端菜单
 */
function Header() {
  const location = useLocation()
  const navigate = useNavigate()
  const { lang, setLanguage, t } = useI18n()
  const [searchValue, setSearchValue] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // 导航菜单项，文案从翻译字典获取
  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/players', label: t('nav.players') },
    { path: '/teams', label: t('nav.teams') },
    { path: '/matches', label: t('nav.matches') },
    { path: '/rankings', label: t('nav.rankings') },
    { path: '/stats', label: t('nav.stats') },
  ]

  // 处理搜索提交，跳转到搜索页
  const handleSearchSubmit = e => {
    e.preventDefault()
    const trimmed = searchValue.trim()
    if (trimmed) {
      navigate(`/search?q=${encodeURIComponent(trimmed)}`)
      setSearchValue('')
      setMobileMenuOpen(false)
    }
  }

  return (
    <header className="bg-hltv-bg-secondary border-b border-hltv-border sticky top-0 z-50">
      <div className="flex items-center h-12 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-4 md:mr-8 shrink-0">
          <span className="text-hltv-accent font-bold text-lg tracking-tight">
            LoveLive!
          </span>
          <span className="text-hltv-text-bright font-bold text-lg tracking-tight hidden sm:inline">
            HLTV
          </span>
        </Link>

        {/* 桌面导航菜单 */}
        <nav className="hidden md:flex items-center gap-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.path
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-1.5 text-sm font-medium rounded transition-colors ${
                  isActive
                    ? 'text-hltv-text-bright bg-hltv-bg-hover'
                    : 'text-hltv-text-dim hover:text-hltv-text-bright hover:bg-hltv-bg-hover'
                }`}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>

        {/* 搜索框 - HLTV 风格 */}
        <div className="ml-auto flex items-center gap-3">
          <form onSubmit={handleSearchSubmit} className="hidden sm:block">
            <input
              type="text"
              value={searchValue}
              onChange={e => setSearchValue(e.target.value)}
              placeholder={t('nav.searchPlaceholder')}
              className="bg-hltv-bg border border-hltv-border text-hltv-text text-sm px-3 py-1 rounded outline-none w-48 focus:border-hltv-accent focus:w-56 transition-all"
            />
          </form>

          {/* 语言切换器 */}
          <div className="flex items-center bg-hltv-bg border border-hltv-border rounded overflow-hidden">
            <button
              onClick={() => setLanguage('zh')}
              className={`px-2 py-1 text-xs font-medium transition-colors ${
                lang === 'zh'
                  ? 'bg-hltv-accent text-white'
                  : 'text-hltv-text-dim hover:text-hltv-text'
              }`}
              title={t('language.switch')}
            >
              {t('language.zh')}
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 text-xs font-medium transition-colors ${
                lang === 'en'
                  ? 'bg-hltv-accent text-white'
                  : 'text-hltv-text-dim hover:text-hltv-text'
              }`}
              title={t('language.switch')}
            >
              {t('language.en')}
            </button>
          </div>

          {/* 移动端菜单按钮 */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1 text-hltv-text-dim hover:text-hltv-text-bright"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* 移动端菜单 */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-hltv-border bg-hltv-bg-secondary">
          <nav className="px-4 py-2 space-y-1">
            {navItems.map(item => {
              const isActive = location.pathname === item.path
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 text-sm font-medium rounded transition-colors ${
                    isActive
                      ? 'text-hltv-text-bright bg-hltv-bg-hover'
                      : 'text-hltv-text-dim hover:text-hltv-text-bright hover:bg-hltv-bg-hover'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            {/* 移动端搜索框 */}
            <form onSubmit={handleSearchSubmit} className="sm:hidden pt-2">
              <input
                type="text"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                placeholder={t('nav.searchPlaceholder')}
                className="w-full bg-hltv-bg border border-hltv-border text-hltv-text text-sm px-3 py-2 rounded outline-none focus:border-hltv-accent"
              />
            </form>
          </nav>
        </div>
      )}
    </header>
  )
}

export default Header
