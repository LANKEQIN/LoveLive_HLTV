import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Players from './pages/Players'
import PlayerDetail from './pages/PlayerDetail'
import Teams from './pages/Teams'
import TeamDetail from './pages/TeamDetail'
import Matches from './pages/Matches'
import MatchDetail from './pages/MatchDetail'
import Rankings from './pages/Rankings'
import Stats from './pages/Stats'
import Search from './pages/Search'
import Compare from './pages/Compare'

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
        {/* 组合列表页 */}
        <Route path="/teams" element={<Teams />} />
        {/* 组合详情页 */}
        <Route path="/teams/:id" element={<TeamDetail />} />
        {/* Live 赛程页 */}
        <Route path="/matches" element={<Matches />} />
        {/* Live 详情页 */}
        <Route path="/matches/:id" element={<MatchDetail />} />
        {/* 排行榜页 */}
        <Route path="/rankings" element={<Rankings />} />
        {/* 统计页 */}
        <Route path="/stats" element={<Stats />} />
        {/* 搜索页 */}
        <Route path="/search" element={<Search />} />
        {/* 选手对比页 */}
        <Route path="/compare" element={<Compare />} />
        {/* 未知路径重定向到首页 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default App
