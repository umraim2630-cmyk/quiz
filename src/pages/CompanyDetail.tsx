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
  const revLabel = company.revenueLabel ?? '売上高'
  const profLabel = company.profitLabel ?? '営業利益'
  // 億円ベースの金額を「48兆367億」のような読みやすい表記に分解する
  const fmtOku = (oku: number): { main: string; unit: string } => {
    if (oku >= 10000) {
      const cho = Math.floor(oku / 10000)
      const rest = oku % 10000
      return rest
        ? { main: `${cho}兆${rest.toLocaleString()}`, unit: '億円' }
        : { main: `${cho}`, unit: '兆円' }
    }
    return { main: oku.toLocaleString(), unit: '億円' }
  }
  const rev = fmtOku(company.revenueOku)
  const prof = fmtOku(company.operatingProfitOku)

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
        <p className="muted small disclaimer">
          ※ 口コミサマリー・スコアはプロトタイプ用のサンプルデータです。実サービスでは口コミ本体のデータベースから集計・要約されます。
        </p>
      </section>

      {/* 外部情報（IR・財務） */}
      <section>
        <div className="section-head">
          <span className="sec-ic">
            <Icon name="trendingUp" size={18} />
          </span>
          <h2>企業データ（外部情報）</h2>
          <span className="muted small">{company.fiscalLabel}・公表資料に基づく概数</span>
        </div>
        <div className="kpi-grid">
          <div className="kpi">
            <div className="kpi-label">{revLabel}</div>
            <div className="kpi-value">{rev.main}<span>{rev.unit}</span></div>
          </div>
          <div className="kpi">
            <div className="kpi-label">{profLabel}</div>
            <div className="kpi-value">{prof.main}<span>{prof.unit}</span></div>
          </div>
          <div className="kpi">
            <div className="kpi-label">{profLabel}率</div>
            <div className="kpi-value">{opMargin}<span>%</span></div>
          </div>
          <div className="kpi">
            <div className="kpi-label">従業員1人あたり{profLabel}</div>
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
          ※ 財務データは{company.fiscalLabel}の公表値に基づく概数です。Lv4以上のクイズでは、これらのデータを題材にした設問が出題されます。
        </p>
      </section>
    </div>
  )
}
