import { Link, useLocation } from 'react-router-dom'

/**
 * 顶部导航栏组件
 * 模仿 HLTV 的顶部黑色导航条样式
 */
function Header() {
  const location = useLocation()

  // 导航菜单项
  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/players', label: 'Players' },
    { path: '/teams', label: 'Teams' },
    { path: '/matches', label: 'Matches' },
    { path: '/rankings', label: 'Rankings' },
    { path: '/stats', label: 'Stats' },
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
        <div className="ml-auto flex items-center">
          <input
            type="text"
            placeholder="Search players..."
            className="bg-hltv-bg border border-hltv-border text-hltv-text text-sm px-3 py-1 rounded outline-none w-48 focus:border-hltv-accent focus:w-56 transition-all"
          />
        </div>
      </div>
    </header>
  )
}

export default Header
