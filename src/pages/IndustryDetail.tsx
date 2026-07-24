import { Link, useParams } from 'react-router-dom'
import { industryById } from '../data/industries'
import { companiesByIndustry } from '../data/companies'
import { useApp } from '../context/AppContext'
import { achievementRate } from '../lib/quizEngine'
import { Icon, Star } from '../components/Icon'

export function IndustryDetail() {
  const { id } = useParams<{ id: string }>()
  const { state } = useApp()
  const industry = industryById(id!)

  if (!industry) {
    return (
      <div className="page narrow">
        <div className="empty">
          <h2>業界が見つかりません</h2>
          <Link className="btn-primary" to="/">
            ホームへ
          </Link>
        </div>
      </div>
    )
  }

  const rate = achievementRate(state.progress, 'industry', industry.id)
  const companies = companiesByIndustry(industry.id)

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
          <div className="detail-industry">業界研究</div>
          <h1>{industry.name}</h1>
          <p className="muted">{industry.overview}</p>
        </div>
        <div className="detail-cta">
          <Link className="btn-primary" to={`/quiz/play/industry/${industry.id}`}>
            この業界のクイズに挑戦（達成率 {Math.round(rate * 100)}%）
          </Link>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi">
          <div className="kpi-label">市場規模</div>
          <div className="kpi-value">{industry.marketSizeCho}<span>兆円</span></div>
        </div>
        <div className="kpi">
          <div className="kpi-label">前年比成長率</div>
          <div className="kpi-value">{industry.growthRate}<span>%</span></div>
        </div>
        <div className="kpi">
          <div className="kpi-label">主要キーワード</div>
          <div className="kpi-chips">
            {industry.keywords.map((k) => (
              <span className="kw" key={k}>
                {k}
              </span>
            ))}
          </div>
        </div>
      </div>

      <section>
        <div className="section-head">
          <h2>この業界の企業</h2>
        </div>
        <div className="card-grid">
          {companies.map((c) => (
            <Link to={`/company/${c.id}`} className="target-card" key={c.id}>
              <div className="target-logo" style={{ background: c.logoColor }}>
                {c.name.slice(0, 1)}
              </div>
              <div className="target-body">
                <div className="target-name">{c.name}</div>
                <div className="target-tag">{c.tagline}</div>
                <div className="target-meta">
                  <span>口コミ {c.insight.reviewCount.toLocaleString()}件</span>
                  <span className="star-val">
                    <Star size={13} /> {c.insight.overall.toFixed(1)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
