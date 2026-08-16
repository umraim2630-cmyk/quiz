import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icon'
import { Meter } from '../components/Meter'
import { COMPANIES } from '../data/companies'
import { INDUSTRIES } from '../data/industries'
import { overallStats, questionsOf, tierRate, wrongCount } from '../lib/engine'
import { QUESTIONS } from '../lib/questionGen'
import { TIERS, TIER_LABELS } from '../types'

export function Home() {
  const { state } = useApp()
  const { cleared, total } = overallStats(state.progress)
  const wrong = wrongCount(state.progress, QUESTIONS)
  const bookmarked = state.bookmarks.length

  return (
    <div className="page">
      <div>
        <h1>こんにちは、{state.user?.name} さん</h1>
        <p className="muted">今日も1問10秒から。クイズで企業・業界の解像度を上げましょう。</p>
      </div>

      <section className="stat-grid">
        <div className="stat-card accent">
          <span className="stat-ic prime-ic">
            <Icon name="trophy" size={22} />
          </span>
          <div style={{ flex: 1 }}>
            <div className="stat-title">総クリア数</div>
            <Meter rate={total ? cleared / total : 0} label={`${cleared} / ${total} 問`} />
          </div>
        </div>
        <Link to="/play?scope=mixed&kind=company&filter=wrong&shuffle=1" className="stat-card">
          <span className="stat-ic warn-ic">
            <Icon name="refresh" size={22} />
          </span>
          <div>
            <div className="stat-title">
              間違えた問題 <strong className="stat-num">{wrong}</strong>
            </div>
            <div className="stat-sub">間違いだけを復習する →</div>
          </div>
        </Link>
        <Link to="/play?scope=mixed&kind=company&filter=bookmarked&practice=1&shuffle=1" className="stat-card">
          <span className="stat-ic prime-ic">
            <Icon name="bookmark" size={22} />
          </span>
          <div>
            <div className="stat-title">
              ブックマーク <strong className="stat-num">{bookmarked}</strong>
            </div>
            <div className="stat-sub">ブックマーク練習へ →</div>
          </div>
        </Link>
      </section>

      <section className="cat-grid">
        <Link to="/company" className="cat-card">
          <span className="cat-ic">
            <Icon name="building" size={26} />
          </span>
          <div className="cat-body">
            <div className="cat-name">企業クイズ</div>
            <p className="muted small">上場企業{COMPANIES.length}社 × 初級・中級・上級（全{questionsOf('company').length}問）</p>
            <div className="cat-meters">
              {TIERS.map((t) => (
                <div className="cat-meter" key={t}>
                  <span className="cat-meter-label">{TIER_LABELS[t]}</span>
                  <Meter rate={tierRate(state.progress, 'company', t)} />
                </div>
              ))}
            </div>
          </div>
        </Link>
        <Link to="/industry" className="cat-card">
          <span className="cat-ic">
            <Icon name="globe" size={26} />
          </span>
          <div className="cat-body">
            <div className="cat-name">業界クイズ</div>
            <p className="muted small">{INDUSTRIES.length}業界 × 初級・中級・上級（全{questionsOf('industry').length}問）</p>
            <div className="cat-meters">
              {TIERS.map((t) => (
                <div className="cat-meter" key={t}>
                  <span className="cat-meter-label">{TIER_LABELS[t]}</span>
                  <Meter rate={tierRate(state.progress, 'industry', t)} />
                </div>
              ))}
            </div>
          </div>
        </Link>
      </section>

      <section>
        <div className="section-head">
          <span className="sec-ic">
            <Icon name="shuffle" size={18} />
          </span>
          <h2>ランダム出題</h2>
          <span className="muted">解放済みの級からごちゃまぜで出題します</span>
        </div>
        <div className="quick-grid">
          <Link className="quick-card" to="/play?scope=mixed&kind=company&filter=all&shuffle=1">
            <Icon name="building" size={18} />
            企業ごちゃまぜ
          </Link>
          <Link className="quick-card" to="/play?scope=mixed&kind=industry&filter=all&shuffle=1">
            <Icon name="globe" size={18} />
            業界ごちゃまぜ
          </Link>
          <Link className="quick-card" to="/favorites">
            <Icon name="star" size={18} />
            お気に入りから出題
          </Link>
        </div>
      </section>
    </div>
  )
}
