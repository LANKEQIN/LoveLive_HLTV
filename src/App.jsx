import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Players from './pages/Players'
import PlayerDetail from './pages/PlayerDetail'
import Teams from './pages/Teams'
import TeamDetail from './pages/TeamDetail'
import Matches from './pages/Matches'
import MatchDetail from './pages/MatchDetail'
import Songs from './pages/Songs'
import SongDetail from './pages/SongDetail'
import Discs from './pages/Discs'
import DiscDetail from './pages/DiscDetail'
import Events from './pages/Events'
import EventDetail from './pages/EventDetail'
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
        {/* 大型活动列表页 */}
        <Route path="/events" element={<Events />} />
        {/* 大型活动详情页 */}
        <Route path="/events/:id" element={<EventDetail />} />
        {/* 歌曲列表页 */}
        <Route path="/songs" element={<Songs />} />
        {/* 歌曲详情页 */}
        <Route path="/songs/:id" element={<SongDetail />} />
        {/* 唱片列表页（单曲/专辑时间线） */}
        <Route path="/discs" element={<Discs />} />
        {/* 唱片详情页 */}
        <Route path="/discs/:id" element={<DiscDetail />} />
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
