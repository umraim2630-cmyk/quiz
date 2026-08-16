import { Navigate, Route, Routes } from 'react-router-dom'
import { useApp } from './context/AppContext'
import { Layout } from './components/Layout'
import { Login } from './pages/Login'
import { Subscribe } from './pages/Subscribe'
import { Home } from './pages/Home'
import { TargetList } from './pages/TargetList'
import { TargetTiers } from './pages/TargetTiers'
import { Play } from './pages/Play'
import { Favorites } from './pages/Favorites'
import { Progress } from './pages/Progress'
import { Settings } from './pages/Settings'

export function App() {
  const { state } = useApp()
  const authed = !!state.user
  const subscribed = state.subscription.active

  if (!authed) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  // 未課金: ペイウォール
  if (!subscribed) {
    return (
      <Routes>
        <Route path="/subscribe" element={<Subscribe />} />
        <Route path="*" element={<Navigate to="/subscribe" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route path="/subscribe" element={<Navigate to="/" replace />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/company" element={<TargetList kind="company" />} />
        <Route path="/industry" element={<TargetList kind="industry" />} />
        <Route path="/company/:id" element={<TargetTiers kind="company" />} />
        <Route path="/industry/:id" element={<TargetTiers kind="industry" />} />
        <Route path="/play" element={<Play />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
