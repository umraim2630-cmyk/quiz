import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icon'
import { COMPANIES, companyById } from '../data/companies'
import { INDUSTRIES, industryById } from '../data/industries'
import { TIER_LABELS, type QuizKind, type Tier } from '../types'

export function Favorites() {
  const { state, toggleFavCompany, toggleFavIndustry, toggleFavUnit } = useApp()
  const favCount =
    state.favCompanies.length + state.favIndustries.length + state.favUnits.length

  return (
    <div className="page">
      <div>
        <h1>お気に入り</h1>
        <p className="muted">
          注力して学びたい企業・業界・編を登録すると、ここからすぐにクイズを始められます。
        </p>
      </div>

      <section className="fav-cta">
        <div>
          <div className="review-title">お気に入りだけでクイズ</div>
          <div className="muted small">登録済みのお気に入り（{favCount}件）から出題します</div>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Link
            className={`btn-primary ${favCount === 0 ? 'disabled-link' : ''}`}
            to={favCount ? '/play?scope=favorites&filter=all&shuffle=1' : '#'}
          >
            <Icon name="play" size={15} />
            テスト
          </Link>
          <Link
            className={`btn-secondary ${favCount === 0 ? 'disabled-link' : ''}`}
            to={favCount ? '/play?scope=favorites&filter=all&practice=1&shuffle=1' : '#'}
          >
            練習
          </Link>
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="sec-ic">
            <Icon name="building" size={18} />
          </span>
          <h2>特定企業</h2>
          <span className="muted">星でお気に入り登録 / 解除</span>
        </div>
        <div className="fav-list">
          {COMPANIES.map((c) => {
            const on = state.favCompanies.includes(c.id)
            return (
              <div className={`fav-row ${on ? 'faved' : ''}`} key={c.id}>
                <span className="unit-logo sm" style={{ background: c.color }}>
                  {c.monogram}
                </span>
                <span className="fav-name">{c.name}</span>
                <div className="fav-actions">
                  <Link className="btn-secondary btn-sm" to={`/play?scope=mixed&kind=company&target=${c.id}&filter=all&shuffle=1`}>
                    クイズへ
                  </Link>
                  <button className={`fav-btn ${on ? 'on' : ''}`} onClick={() => toggleFavCompany(c.id)}>
                    <Icon name="star" size={18} filled={on} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="sec-ic">
            <Icon name="globe" size={18} />
          </span>
          <h2>特定業界</h2>
        </div>
        <div className="fav-list">
          {INDUSTRIES.map((i) => {
            const on = state.favIndustries.includes(i.id)
            return (
              <div className={`fav-row ${on ? 'faved' : ''}`} key={i.id}>
                <span
                  className="unit-logo sm tint"
                  style={{ color: i.color, background: `color-mix(in srgb, ${i.color} 12%, transparent)` }}
                >
                  <Icon name={i.icon} size={16} />
                </span>
                <span className="fav-name">{i.name}</span>
                <div className="fav-actions">
                  <Link className="btn-secondary btn-sm" to={`/play?scope=mixed&kind=industry&target=${i.id}&filter=all&shuffle=1`}>
                    クイズへ
                  </Link>
                  <button className={`fav-btn ${on ? 'on' : ''}`} onClick={() => toggleFavIndustry(i.id)}>
                    <Icon name="star" size={18} filled={on} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="sec-ic">
            <Icon name="bookmark" size={18} />
          </span>
          <h2>クイズ（編）単位のお気に入り</h2>
          <span className="muted">各編の一覧画面にある星から登録できます</span>
        </div>
        {state.favUnits.length === 0 ? (
          <p className="muted small">まだ登録がありません。企業クイズ・業界クイズの編一覧で星を押すと、ここに表示されます。</p>
        ) : (
          <div className="fav-list">
            {state.favUnits.map((key) => {
              const [kind, tier, targetId] = key.split(':') as [QuizKind, Tier, string]
              const name =
                kind === 'company' ? companyById(targetId)?.name : industryById(targetId)?.name
              return (
                <div className="fav-row faved" key={key}>
                  <span className="unit-logo sm tint" style={{ color: 'var(--primary-strong)', background: 'var(--primary-soft)' }}>
                    <Icon name={kind === 'company' ? 'building' : 'globe'} size={16} />
                  </span>
                  <span className="fav-name">
                    {name}編・{TIER_LABELS[tier]}（{kind === 'company' ? '企業' : '業界'}）
                  </span>
                  <div className="fav-actions">
                    <Link
                      className="btn-secondary btn-sm"
                      to={`/play?scope=unit&kind=${kind}&tier=${tier}&target=${targetId}&filter=all`}
                    >
                      クイズへ
                    </Link>
                    <button className="fav-btn on" onClick={() => toggleFavUnit(key)}>
                      <Icon name="star" size={18} filled />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}
