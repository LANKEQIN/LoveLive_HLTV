import { Outlet } from 'react-router-dom'
import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

/**
 * 整体布局组件
 * 组合 Header + Sidebar + 主内容区 + Footer
 * 模仿 HLTV 的经典布局结构，并支持响应式
 */
function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-hltv-bg">
      {/* 顶部导航栏 */}
      <Header />

      {/* 主内容区域：左侧边栏 + 右侧内容 */}
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 min-w-0 w-full">
          <Outlet />
        </main>
      </div>

      {/* 底部页脚 */}
      <Footer />
    </div>
  )
}

export default Layout
