import { Navigate, Route, Routes } from 'react-router-dom'
import { useApp } from './context/AppContext'
import { Layout } from './components/Layout'
import { Login } from './pages/Login'
import { Dashboard } from './pages/Dashboard'
import { QuizSelect } from './pages/QuizSelect'
import { QuizPlay } from './pages/QuizPlay'
import { CompanyDetail } from './pages/CompanyDetail'
import { IndustryDetail } from './pages/IndustryDetail'
import { Resume } from './pages/Resume'
import { Scouts } from './pages/Scouts'

export function App() {
  const { state } = useApp()
  const authed = !!state.user

  if (!authed) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    )
  }

  return (
    <Routes>
      <Route path="/login" element={<Navigate to="/" replace />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/quiz" element={<QuizSelect />} />
        <Route path="/quiz/play/:type/:targetId" element={<QuizPlay />} />
        <Route path="/company/:id" element={<CompanyDetail />} />
        <Route path="/industry/:id" element={<IndustryDetail />} />
        <Route path="/resume" element={<Resume />} />
        <Route path="/scouts" element={<Scouts />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
