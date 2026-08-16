import { Link, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icon'
import { Meter } from '../components/Meter'
import { companyById } from '../data/companies'
import { industryById } from '../data/industries'
import { clearRate, getProgress, questionsOf, targetTierUnlocked } from '../lib/engine'
import { TIERS, TIER_LABELS, unitKey, type QuizKind, type Tier } from '../types'

const TIER_DESC: Record<Tier, string> = {
  beginner: '基礎情報（事業・本社・規模など）',
  intermediate: '事業構造・競合・戦略トピック',
  advanced: '決算数値の計算・比較・解釈',
}

/** 対象（企業/業界）を選んだ後の 初級・中級・上級 画面 */
export function TargetTiers({ kind }: { kind: QuizKind }) {
  const { id } = useParams<{ id: string }>()
  const { state, toggleFavCompany, toggleFavIndustry, toggleFavUnit } = useApp()

  const company = kind === 'company' ? companyById(id!) : undefined
  const industry = kind === 'industry' ? industryById(id!) : undefined
  const target = company ?? industry

  if (!target) {
    return (
      <div className="page">
        <div className="empty">
          <h2>見つかりませんでした</h2>
          <Link className="btn-primary" to={`/${kind}`}>
            一覧へ戻る
          </Link>
        </div>
      </div>
    )
  }

  const allQs = questionsOf(kind, undefined, target.id)
  const totalRate = clearRate(state.progress, allQs)
  const favs = kind === 'company' ? state.favCompanies : state.favIndustries
  const faved = favs.includes(target.id)
  const toggleFav = kind === 'company' ? toggleFavCompany : toggleFavIndustry
  const sub = company
    ? `${company.ticker}・${industryById(company.industryId)?.name ?? ''}・${company.hq}`
    : industry!.sizeText

  const base = (tier: Tier) => `scope=unit&kind=${kind}&tier=${tier}&target=${target.id}`

  return (
    <div className="page">
      <Link to={`/${kind}`} className="back-link">
        ‹ {kind === 'company' ? '企業一覧' : '業界一覧'}
      </Link>

      <div className="target-hero card">
        {company ? (
          <span className="unit-logo lg" style={{ background: company.color }}>
            {company.monogram}
          </span>
        ) : (
          <span
            className="unit-logo lg tint"
            style={{ color: industry!.color, background: `color-mix(in srgb, ${industry!.color} 13%, transparent)` }}
          >
            <Icon name={industry!.icon} size={26} />
          </span>
        )}
        <div className="trow-main">
          <span className="trow-name">
            {target.name}
            {totalRate >= 1 && (
              <span className="tier-done">
                <Icon name="trophy" size={12} /> 完全クリア
              </span>
            )}
          </span>
          <span className="trow-sub">{sub}</span>
          <Meter rate={totalRate} label={`全${allQs.length}問中 ${Math.round(totalRate * allQs.length)}問クリア`} />
        </div>
        <button className={`fav-btn ${faved ? 'on' : ''}`} onClick={() => toggleFav(target.id)} aria-label="お気に入り">
          <Icon name="star" size={20} filled={faved} />
        </button>
      </div>

      <div className="tier-list">
        {TIERS.map((tier, i) => {
          const qs = questionsOf(kind, tier, target.id)
          const rate = clearRate(state.progress, qs)
          const unlocked = targetTierUnlocked(state.progress, kind, target.id, tier)
          const wrongN = qs.filter((q) => getProgress(state.progress, q.id).lastWrong).length
          const clearedN = qs.filter((q) => getProgress(state.progress, q.id).cleared).length
          const key = unitKey({ kind, tier, targetId: target.id })
          const unitFaved = state.favUnits.includes(key)
          return (
            <div className={`tier-card ${unlocked ? '' : 'locked'}`} key={tier}>
              <div className="tier-row-head">
                <div className="tier-badge">{TIER_LABELS[tier]}</div>
                <div className="tier-main">
                  <div className="tier-title">
                    {TIER_LABELS[tier]}（{qs.length}問）
                    {rate >= 1 && (
                      <span className="tier-done">
                        <Icon name="checkCircle" size={14} /> クリア
                      </span>
                    )}
                  </div>
                  <div className="muted small">{TIER_DESC[tier]}</div>
                  <Meter rate={rate} label={`${clearedN}/${qs.length}`} />
                </div>
                {unlocked && (
                  <button
                    className={`fav-btn ${unitFaved ? 'on' : ''}`}
                    onClick={() => toggleFavUnit(key)}
                    title="この級をお気に入り"
                  >
                    <Icon name="star" size={17} filled={unitFaved} />
                  </button>
                )}
              </div>
              {unlocked ? (
                <div className="unit-actions">
                  <Link className="btn-primary btn-sm" to={`/play?${base(tier)}&filter=all`}>
                    <Icon name="play" size={14} />
                    テスト
                  </Link>
                  <Link
                    className={`btn-secondary btn-sm ${wrongN === 0 ? 'disabled-link' : ''}`}
                    to={wrongN ? `/play?${base(tier)}&filter=wrong` : '#'}
                  >
                    間違いのみ（{wrongN}）
                  </Link>
                  <Link
                    className={`btn-secondary btn-sm ${clearedN === 0 ? 'disabled-link' : ''}`}
                    to={clearedN ? `/play?${base(tier)}&filter=cleared` : '#'}
                  >
                    クリア済み（{clearedN}）
                  </Link>
                  <Link className="btn-ghost btn-sm" to={`/play?${base(tier)}&practice=1&shuffle=1`}>
                    練習
                  </Link>
                </div>
              ) : (
                <div className="lock-note">
                  <Icon name="lock" size={15} />
                  {TIER_LABELS[TIERS[i - 1]]}を全問クリアすると解放されます
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="quick-grid">
        <Link
          className="quick-card"
          to={`/play?scope=mixed&kind=${kind}&target=${target.id}&filter=all&shuffle=1`}
        >
          <Icon name="shuffle" size={18} />
          {kind === 'company' ? 'この企業でごちゃまぜ' : 'この業界でごちゃまぜ'}
        </Link>
        <Link
          className="quick-card"
          to={`/play?scope=mixed&kind=${kind}&target=${target.id}&filter=bookmarked&practice=1&shuffle=1`}
        >
          <Icon name="bookmark" size={18} />
          ブックマーク練習
        </Link>
      </div>
    </div>
  )
}
