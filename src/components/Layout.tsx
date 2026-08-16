import { NavLink, Outlet } from 'react-router-dom'
import { Icon } from './Icon'

/** アプリシェル: ガラス調ヘッダー + 下部フローティングタブバー */
export function Layout() {
  return (
    <div className="app-shell">
      <header className="glass-top">
        <NavLink to="/" className="brand">
          <span className="brand-mark">B</span>
          <span>BizQuiz</span>
        </NavLink>
        <NavLink to="/settings" className="gear-btn" aria-label="設定">
          <Icon name="gear" size={19} />
        </NavLink>
      </header>
      <main className="content">
        <Outlet />
      </main>
      <nav className="tabbar" aria-label="メインナビゲーション">
        <NavLink to="/" end>
          <Icon name="home" size={21} />
          <span>ホーム</span>
        </NavLink>
        <NavLink to="/company">
          <Icon name="building" size={21} />
          <span>企業</span>
        </NavLink>
        <NavLink to="/industry">
          <Icon name="globe" size={21} />
          <span>業界</span>
        </NavLink>
        <NavLink to="/favorites">
          <Icon name="star" size={21} />
          <span>お気に入り</span>
        </NavLink>
        <NavLink to="/progress">
          <Icon name="chart" size={21} />
          <span>進捗率</span>
        </NavLink>
      </nav>
    </div>
  )
}
