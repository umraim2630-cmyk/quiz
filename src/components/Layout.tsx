import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Icon } from './Icon'

export function Layout() {
  const { state, logout } = useApp()
  const navigate = useNavigate()

  const onLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/" className="brand">
          <span className="brand-mark">B</span>
          <span>BizQuiz</span>
        </NavLink>
        <nav className="topnav">
          <NavLink to="/" end>
            <Icon name="home" size={17} />
            <span>ホーム</span>
          </NavLink>
          <NavLink to="/company">
            <Icon name="building" size={17} />
            <span>企業クイズ</span>
          </NavLink>
          <NavLink to="/industry">
            <Icon name="globe" size={17} />
            <span>業界クイズ</span>
          </NavLink>
          <NavLink to="/favorites">
            <Icon name="star" size={17} />
            <span>お気に入り</span>
          </NavLink>
          <NavLink to="/progress">
            <Icon name="chart" size={17} />
            <span>進捗率</span>
          </NavLink>
          <NavLink to="/settings">
            <Icon name="gear" size={17} />
            <span>設定</span>
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
        <span>BizQuiz — クイズで身につく企業・業界研究（月額980円）</span>
      </footer>
    </div>
  )
}
