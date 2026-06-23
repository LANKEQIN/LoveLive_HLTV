import { Link, useLocation } from 'react-router-dom'
import { useI18n } from '../i18n'

/**
 * 顶部导航栏组件
 * 模仿 HLTV 的顶部黑色导航条样式
 * 包含导航菜单、搜索框和语言切换器
 */
function Header() {
  const location = useLocation()
  const { lang, setLanguage, t } = useI18n()

  // 导航菜单项，文案从翻译字典获取
  const navItems = [
    { path: '/', label: t('nav.home') },
    { path: '/players', label: t('nav.players') },
    { path: '/teams', label: t('nav.teams') },
    { path: '/matches', label: t('nav.matches') },
    { path: '/rankings', label: t('nav.rankings') },
    { path: '/stats', label: t('nav.stats') },
  ]

  return (
    <header className="bg-hltv-bg-secondary border-b border-hltv-border sticky top-0 z-50">
      <div className="flex items-center h-12 px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mr-8 shrink-0">
          <span className="text-hltv-accent font-bold text-lg tracking-tight">
            LoveLive!
          </span>
          <span className="text-hltv-text-bright font-bold text-lg tracking-tight">
            HLTV
          </span>
        </Link>

        {/* 导航菜单 */}
        <nav className="flex items-center gap-1">
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
          <input
            type="text"
            placeholder={t('nav.searchPlaceholder')}
            className="bg-hltv-bg border border-hltv-border text-hltv-text text-sm px-3 py-1 rounded outline-none w-48 focus:border-hltv-accent focus:w-56 transition-all"
          />

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
        </div>
      </div>
    </header>
  )
}

export default Header
