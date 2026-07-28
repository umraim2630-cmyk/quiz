import { Link, useParams } from 'react-router-dom'
import { industryById } from '../data/industries'
import { useApp } from '../context/AppContext'
import { achievementRate, questionCountFor } from '../lib/quizEngine'
import { Icon } from '../components/Icon'

export function IndustryDetail() {
  const { id } = useParams<{ id: string }>()
  const { state } = useApp()
  const industry = industryById(id!)

  if (!industry) {
    return (
      <div className="page narrow">
        <div className="empty">
          <h2>カテゴリが見つかりません</h2>
          <Link className="btn-primary" to="/">
            ホームへ
          </Link>
        </div>
      </div>
    )
  }

  const rate = achievementRate(state.progress, 'industry', industry.id)
  const total = questionCountFor('industry', industry.id)

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← ホーム
      </Link>

      <div className="detail-hero">
        <div
          className="detail-logo tint"
          style={{ color: industry.color, background: `color-mix(in srgb, ${industry.color} 12%, transparent)` }}
        >
          <Icon name={industry.icon} size={30} />
        </div>
        <div>
          <div className="detail-industry">コンサル業界研究</div>
          <h1>{industry.name}</h1>
          <p className="muted">{industry.subtitle}</p>
        </div>
        <div className="detail-cta">
          <Link className="btn-primary" to={`/quiz/play/industry/${industry.id}`}>
            このカテゴリのクイズに挑戦（達成率 {Math.round(rate * 100)}%）
          </Link>
        </div>
      </div>

      <div className="card">
        <div className="card-title">このカテゴリで学べること</div>
        <p className="summary-text">{industry.overview}</p>
        <div className="kpi-chips">
          {industry.keywords.map((k) => (
            <span className="kw" key={k}>
              {k}
            </span>
          ))}
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi-label">収録問題数</div>
          <div className="kpi-value">{total}<span>問</span></div>
        </div>
        <div className="kpi">
          <div className="kpi-label">クリア済み</div>
          <div className="kpi-value">{Math.round(rate * total)}<span>問</span></div>
        </div>
        <div className="kpi">
          <div className="kpi-label">達成率</div>
          <div className="kpi-value">{Math.round(rate * 100)}<span>%</span></div>
        </div>
      </div>
    </div>
  )
}
