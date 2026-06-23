import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Players from './pages/Players'
import PlayerDetail from './pages/PlayerDetail'

/**
 * 根组件 - 路由配置
 * 使用 Layout 作为布局容器，嵌套路由实现页面切换
 */
function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 首页 */}
        <Route path="/" element={<Home />} />
        {/* 选手列表页 */}
        <Route path="/players" element={<Players />} />
        {/* 选手详情页 */}
        <Route path="/players/:id" element={<PlayerDetail />} />
        {/* 未知路径重定向到首页 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
