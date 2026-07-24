import { Link, useParams } from 'react-router-dom'
import { companyById } from '../data/companies'
import { industryById } from '../data/industries'
import { RadarChart } from '../components/RadarChart'
import { ScoreBars } from '../components/ScoreBars'
import { Icon, Star } from '../components/Icon'
import { useApp } from '../context/AppContext'
import { achievementRate } from '../lib/quizEngine'

export function CompanyDetail() {
  const { id } = useParams<{ id: string }>()
  const { state } = useApp()
  const company = companyById(id!)

  if (!company) {
    return (
      <div className="page narrow">
        <div className="empty">
          <h2>企業が見つかりません</h2>
          <Link className="btn-primary" to="/">
            ホームへ
          </Link>
        </div>
      </div>
    )
  }

  const industry = industryById(company.industryId)
  const rate = achievementRate(state.progress, 'company', company.id)
  const ins = company.insight
  const opMargin = ((company.operatingProfitOku / company.revenueOku) * 100).toFixed(1)
  const profitPerHead = Math.round((company.operatingProfitOku * 100000000) / company.employees / 10000)

  return (
    <div className="page">
      <Link to="/" className="back-link">
        ← ホーム
      </Link>

      <div className="detail-hero">
        <div className="detail-logo" style={{ background: company.logoColor }}>
          {company.name.slice(0, 1)}
        </div>
        <div>
          <div className="detail-industry">
            {industry && <Icon name={industry.icon} size={14} />} {industry?.name}
          </div>
          <h1>{company.name}</h1>
          <p className="muted">{company.tagline}</p>
        </div>
        <div className="detail-cta">
          <div className="overall-star">
            <Star size={20} /> {ins.overall.toFixed(1)}
          </div>
          <div className="muted small">{ins.reviewCount.toLocaleString()}件の口コミ</div>
          <Link className="btn-primary" to={`/quiz/play/company/${company.id}`}>
            この企業のクイズに挑戦（達成率 {Math.round(rate * 100)}%）
          </Link>
        </div>
      </div>

      {/* 口コミ由来の内部分析（本アプリの中核） */}
      <section className="insight-block">
        <div className="section-head">
          <span className="sec-ic">
            <Icon name="search" size={18} />
          </span>
          <h2>口コミからの内部分析</h2>
          <span className="pill">{ins.reviewCount.toLocaleString()}件を要約</span>
        </div>

        <div className="insight-grid">
          <div className="card radar-card">
            <div className="card-title">総合スコア</div>
            <RadarChart scores={ins.scores} color={company.logoColor} />
          </div>

          <div className="card summary-card">
            <div className="card-title">AI要約サマリー</div>
            <p className="summary-text">{ins.summary}</p>
            <div className="pn-grid">
              <div>
                <div className="pn-title good">
                  <Icon name="thumbsUp" size={15} /> 評価されている点
                </div>
                <ul>
                  {ins.positives.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="pn-title bad">
                  <Icon name="flag" size={15} /> 課題とされる点
                </div>
                <ul>
                  {ins.negatives.map((p) => (
                    <li key={p}>{p}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-title">項目別スコア（働きがい・組織文化・働きやすさ 他）</div>
          <ScoreBars scores={ins.scores} />
        </div>
      </section>

      {/* 外部情報（IR・財務） */}
      <section>
        <div className="section-head">
          <span className="sec-ic">
            <Icon name="trendingUp" size={18} />
          </span>
          <h2>企業データ（外部情報）</h2>
        </div>
        <div className="kpi-grid">
          <div className="kpi">
            <div className="kpi-label">売上高</div>
            <div className="kpi-value">{company.revenueOku.toLocaleString()}<span>億円</span></div>
          </div>
          <div className="kpi">
            <div className="kpi-label">営業利益</div>
            <div className="kpi-value">{company.operatingProfitOku.toLocaleString()}<span>億円</span></div>
          </div>
          <div className="kpi">
            <div className="kpi-label">営業利益率</div>
            <div className="kpi-value">{opMargin}<span>%</span></div>
          </div>
          <div className="kpi">
            <div className="kpi-label">従業員1人あたり営業利益</div>
            <div className="kpi-value">{profitPerHead.toLocaleString()}<span>万円</span></div>
          </div>
          <div className="kpi">
            <div className="kpi-label">従業員数</div>
            <div className="kpi-value">{company.employees.toLocaleString()}<span>名</span></div>
          </div>
          <div className="kpi">
            <div className="kpi-label">設立</div>
            <div className="kpi-value">{company.founded}<span>年</span></div>
          </div>
        </div>
        <p className="muted small">
          ※ Lv4以上のクイズでは、これらの財務データを題材にした設問が出題されます。
        </p>
      </section>
    </div>
  )
}
