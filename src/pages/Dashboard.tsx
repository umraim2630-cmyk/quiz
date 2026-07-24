import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { COMPANIES } from '../data/companies'
import { INDUSTRIES } from '../data/industries'
import { achievementRate, overallAchievement, wrongQueueCount } from '../lib/quizEngine'

function Ring({ pct }: { pct: number }) {
  const r = 26
  const c = 2 * Math.PI * r
  const off = c * (1 - pct)
  return (
    <svg width={64} height={64} className="ring">
      <circle cx={32} cy={32} r={r} fill="none" stroke="#e6e9f2" strokeWidth={7} />
      <circle
        cx={32}
        cy={32}
        r={r}
        fill="none"
        stroke="#4f7cff"
        strokeWidth={7}
        strokeDasharray={c}
        strokeDashoffset={off}
        strokeLinecap="round"
        transform="rotate(-90 32 32)"
      />
      <text x={32} y={36} textAnchor="middle" fontSize={14} fontWeight={700} fill="#2b3242">
        {Math.round(pct * 100)}%
      </text>
    </svg>
  )
}

export function Dashboard() {
  const { state } = useApp()
  const { mastered, total } = overallAchievement(state.progress)
  const overall = total ? mastered / total : 0
  const wrong = wrongQueueCount(state.progress)
  const unreadScouts = state.scouts.filter((s) => !s.read).length

  return (
    <div className="page">
      <div className="hello">
        <div>
          <h1>こんにちは、{state.user?.name} さん</h1>
          <p className="muted">クイズで企業・業界の「内側」を知り、あなたに合う会社を見つけましょう。</p>
        </div>
      </div>

      <section className="stat-grid">
        <div className="stat-card accent">
          <Ring pct={overall} />
          <div>
            <div className="stat-title">総合達成率</div>
            <div className="stat-sub">
              {mastered} / {total} 問クリア
            </div>
          </div>
        </div>
        <Link to="/quiz?review=1" className="stat-card">
          <div className="stat-big">{wrong}</div>
          <div>
            <div className="stat-title">復習キュー</div>
            <div className="stat-sub">間違えた問題だけを解く →</div>
          </div>
        </Link>
        <Link to="/scouts" className="stat-card">
          <div className="stat-big">{unreadScouts}</div>
          <div>
            <div className="stat-title">新着スカウト</div>
            <div className="stat-sub">企業・エージェントから →</div>
          </div>
        </Link>
      </section>

      <section>
        <div className="section-head">
          <h2>🏢 企業研究クイズ</h2>
          <span className="muted">口コミの内部分析を教材に、企業ごとの達成率を上げよう</span>
        </div>
        <div className="card-grid">
          {COMPANIES.map((c) => {
            const rate = achievementRate(state.progress, 'company', c.id)
            return (
              <Link to={`/company/${c.id}`} className="target-card" key={c.id}>
                <div className="target-logo" style={{ background: c.logoColor }}>
                  {c.name.slice(0, 1)}
                </div>
                <div className="target-body">
                  <div className="target-name">{c.name}</div>
                  <div className="target-tag">{c.tagline}</div>
                  <div className="mini-bar">
                    <span style={{ width: `${rate * 100}%` }} />
                  </div>
                  <div className="target-meta">
                    <span>達成率 {Math.round(rate * 100)}%</span>
                    <span>★ {c.insight.overall.toFixed(1)}</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section>
        <div className="section-head">
          <h2>🌐 業界研究クイズ</h2>
          <span className="muted">業界構造とビジネスモデルの勘所をつかむ</span>
        </div>
        <div className="card-grid">
          {INDUSTRIES.map((ind) => {
            const rate = achievementRate(state.progress, 'industry', ind.id)
            return (
              <Link to={`/industry/${ind.id}`} className="target-card" key={ind.id}>
                <div className="target-logo emoji">{ind.emoji}</div>
                <div className="target-body">
                  <div className="target-name">{ind.name}</div>
                  <div className="target-tag">市場規模 {ind.marketSizeCho}兆円 / 成長率 {ind.growthRate}%</div>
                  <div className="mini-bar">
                    <span style={{ width: `${rate * 100}%` }} />
                  </div>
                  <div className="target-meta">
                    <span>達成率 {Math.round(rate * 100)}%</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </div>
  )
}
