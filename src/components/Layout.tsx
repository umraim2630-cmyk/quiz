import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Icon } from './Icon'

export function Layout() {
  const { state, logout } = useApp()
  const navigate = useNavigate()
  const unread = state.scouts.filter((s) => !s.read).length

  const onLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/" className="brand">
          <span className="brand-mark">Q</span>
          <span>Kuchikomi Quiz</span>
        </NavLink>
        <nav className="topnav">
          <NavLink to="/" end>
            <Icon name="home" size={17} />
            <span>ホーム</span>
          </NavLink>
          <NavLink to="/quiz">
            <Icon name="zap" size={17} />
            <span>クイズ</span>
          </NavLink>
          <NavLink to="/scouts" className="nav-scout">
            <Icon name="mail" size={17} />
            <span>スカウト</span>
            {unread > 0 && <span className="badge">{unread}</span>}
          </NavLink>
          <NavLink to="/resume">
            <Icon name="fileText" size={17} />
            <span>履歴書</span>
          </NavLink>
        </nav>
        <div className="topbar-user">
          <span className="user-name">{state.user?.name}</span>
          <button className="btn-ghost" onClick={onLogout}>
            ログアウト
          </button>
        </div>
      </header>
      <main className="content">
        <Outlet />
      </main>
      <footer className="footer">
        <span>口コミデータ × クイズで、入社後ギャップのない就活を。</span>
      </footer>
    </div>
  )
}
