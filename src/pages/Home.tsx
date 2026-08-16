import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icon'
import { Meter } from '../components/Meter'
import { overallStats, wrongCount } from '../lib/engine'
import { QUESTIONS } from '../lib/questionGen'

/**
 * ホーム = 「今日の学習の起点」。
 * 一覧・探索は企業/業界タブ、集計は進捗タブに寄せ、ここでは
 * 続きから・復習・練習・ランダムといったアクションだけを置く。
 */
export function Home() {
  const { state } = useApp()
  const { cleared, total } = overallStats(state.progress)
  const wrong = wrongCount(state.progress, QUESTIONS)
  const bookmarked = state.bookmarks.length
  const last = state.lastSession

  return (
    <div className="page">
      <div className="large-title">
        <h1>こんにちは、{state.user?.name} さん</h1>
        <p className="muted">今日も1問10秒から始めましょう。</p>
      </div>

      <Link to="/progress" className="card summary-card-link">
        <div className="summary-row">
          <span className="stat-ic prime-ic">
            <Icon name="trophy" size={22} />
          </span>
          <div style={{ flex: 1 }}>
            <div className="stat-title">学習サマリー</div>
            <Meter rate={total ? cleared / total : 0} label={`${cleared} / ${total} 問クリア`} />
          </div>
          <span className="chev">›</span>
        </div>
      </Link>

      {last && (
        <Link to={last.path} className="resume-card">
          <span className="resume-ic">
            <Icon name="play" size={20} />
          </span>
          <div style={{ flex: 1 }}>
            <div className="resume-label">続きから</div>
            <div className="resume-title">{last.label}</div>
          </div>
          <span className="chev light">›</span>
        </Link>
      )}

      <section>
        <div className="section-head">
          <span className="sec-ic">
            <Icon name="zap" size={18} />
          </span>
          <h2>今日の学習</h2>
        </div>
        <div className="action-list">
          <Link
            to={wrong ? '/play?scope=mixed&kind=company&filter=wrong&shuffle=1' : '#'}
            className={`action-row ${wrong === 0 ? 'disabled-link' : ''}`}
          >
            <span className="stat-ic warn-ic">
              <Icon name="refresh" size={20} />
            </span>
            <div className="action-main">
              <div className="action-title">間違えた問題を復習</div>
              <div className="action-sub">{wrong > 0 ? `${wrong}問が復習待ちです` : '復習待ちはありません'}</div>
            </div>
            <span className="chev">›</span>
          </Link>
          <Link
            to={bookmarked ? '/play?scope=mixed&kind=company&filter=bookmarked&practice=1&shuffle=1' : '#'}
            className={`action-row ${bookmarked === 0 ? 'disabled-link' : ''}`}
          >
            <span className="stat-ic prime-ic">
              <Icon name="bookmark" size={20} />
            </span>
            <div className="action-main">
              <div className="action-title">ブックマーク練習</div>
              <div className="action-sub">
                {bookmarked > 0 ? `${bookmarked}問を練習（クリア率に影響しません）` : 'クイズ中にしおりで追加できます'}
              </div>
            </div>
            <span className="chev">›</span>
          </Link>
          <Link to="/play?scope=mixed&kind=company&filter=all&shuffle=1" className="action-row">
            <span className="stat-ic prime-ic">
              <Icon name="shuffle" size={20} />
            </span>
            <div className="action-main">
              <div className="action-title">企業ごちゃまぜ</div>
              <div className="action-sub">解放済みの級からランダムに15問</div>
            </div>
            <span className="chev">›</span>
          </Link>
          <Link to="/play?scope=mixed&kind=industry&filter=all&shuffle=1" className="action-row">
            <span className="stat-ic prime-ic">
              <Icon name="globe" size={20} />
            </span>
            <div className="action-main">
              <div className="action-title">業界ごちゃまぜ</div>
              <div className="action-sub">解放済みの級からランダムに15問</div>
            </div>
            <span className="chev">›</span>
          </Link>
          <Link to="/play?scope=favorites&filter=all&shuffle=1" className="action-row">
            <span className="stat-ic warn-ic">
              <Icon name="star" size={20} />
            </span>
            <div className="action-main">
              <div className="action-title">お気に入りから出題</div>
              <div className="action-sub">登録した企業・業界・級から出題</div>
            </div>
            <span className="chev">›</span>
          </Link>
        </div>
      </section>
    </div>
  )
}
