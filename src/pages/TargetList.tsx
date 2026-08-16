import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icon'
import { Meter } from '../components/Meter'
import { COMPANIES } from '../data/companies'
import { INDUSTRIES, industryById } from '../data/industries'
import { clearRate, questionsOf } from '../lib/engine'
import type { QuizKind } from '../types'

interface Row {
  id: string
  name: string
  sub: string
  search: string
  color: string
  mono?: string
  icon?: string
  industryId?: string
}

/** 企業 / 業界の選択画面（検索・絞り込み付き） */
export function TargetList({ kind }: { kind: QuizKind }) {
  const { state, toggleFavCompany, toggleFavIndustry } = useApp()
  const [query, setQuery] = useState('')
  const [industryFilter, setIndustryFilter] = useState<string>('all')
  const [favOnly, setFavOnly] = useState(false)

  const favs = kind === 'company' ? state.favCompanies : state.favIndustries
  const toggleFav = kind === 'company' ? toggleFavCompany : toggleFavIndustry

  const rows = useMemo<Row[]>(
    () =>
      kind === 'company'
        ? COMPANIES.map((c) => ({
            id: c.id,
            name: c.name,
            sub: `${c.ticker}・${industryById(c.industryId)?.name ?? ''}`,
            search: `${c.name} ${c.kana} ${c.ticker}`,
            color: c.color,
            mono: c.monogram,
            industryId: c.industryId,
          }))
        : INDUSTRIES.map((i) => ({
            id: i.id,
            name: i.name,
            sub: i.sizeText,
            search: `${i.name} ${i.kana}`,
            color: i.color,
            icon: i.icon,
          })),
    [kind],
  )

  const q = query.trim().toLowerCase()
  const filtered = rows.filter((r) => {
    if (q && !r.search.toLowerCase().includes(q)) return false
    if (kind === 'company' && industryFilter !== 'all' && r.industryId !== industryFilter) return false
    if (favOnly && !favs.includes(r.id)) return false
    return true
  })

  const title = kind === 'company' ? '企業クイズ' : '業界クイズ'

  return (
    <div className="page">
      <div className="large-title">
        <h1>{title}</h1>
        <p className="muted">
          {kind === 'company' ? '企業を選んで、初級から順にクリアしていきましょう。' : '業界を選んで、初級から順にクリアしていきましょう。'}
        </p>
      </div>

      <div className="search-box">
        <Icon name="search" size={18} />
        <input
          type="search"
          placeholder={kind === 'company' ? '企業名・証券コードで検索' : '業界名で検索'}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="検索"
        />
      </div>

      <div className="filter-chips">
        {kind === 'company' && (
          <>
            <button
              className={`f-chip ${industryFilter === 'all' ? 'on' : ''}`}
              onClick={() => setIndustryFilter('all')}
            >
              すべて
            </button>
            {INDUSTRIES.map((i) => (
              <button
                key={i.id}
                className={`f-chip ${industryFilter === i.id ? 'on' : ''}`}
                onClick={() => setIndustryFilter(industryFilter === i.id ? 'all' : i.id)}
              >
                {i.name}
              </button>
            ))}
          </>
        )}
        <button className={`f-chip fav ${favOnly ? 'on' : ''}`} onClick={() => setFavOnly(!favOnly)}>
          <Icon name="star" size={13} filled={favOnly} />
          お気に入り
        </button>
      </div>

      <div className="target-rows">
        {filtered.length === 0 && (
          <p className="muted small" style={{ textAlign: 'center', padding: '24px 0' }}>
            該当する{kind === 'company' ? '企業' : '業界'}が見つかりません。
            {kind === 'company' && ' 本番では上場企業全社から検索できます。'}
          </p>
        )}
        {filtered.map((r) => {
          const all = questionsOf(kind, undefined, r.id)
          const rate = clearRate(state.progress, all)
          const faved = favs.includes(r.id)
          return (
            <div className="trow" key={r.id}>
              <Link to={`/${kind}/${r.id}`} className="trow-link">
                {r.icon ? (
                  <span
                    className="unit-logo tint"
                    style={{ color: r.color, background: `color-mix(in srgb, ${r.color} 13%, transparent)` }}
                  >
                    <Icon name={r.icon} size={20} />
                  </span>
                ) : (
                  <span className="unit-logo" style={{ background: r.color }}>
                    {r.mono}
                  </span>
                )}
                <span className="trow-main">
                  <span className="trow-name">
                    {r.name}
                    {rate >= 1 && (
                      <span className="tier-done">
                        <Icon name="trophy" size={12} /> 全クリア
                      </span>
                    )}
                  </span>
                  <span className="trow-sub">{r.sub}</span>
                  <Meter rate={rate} />
                </span>
              </Link>
              <button className={`fav-btn ${faved ? 'on' : ''}`} onClick={() => toggleFav(r.id)} aria-label="お気に入り">
                <Icon name="star" size={18} filled={faved} />
              </button>
              <Link to={`/${kind}/${r.id}`} className="chev" aria-label="開く">
                ›
              </Link>
            </div>
          )
        })}
      </div>

      <Link className="quick-card" to={`/play?scope=mixed&kind=${kind}&filter=all&shuffle=1`}>
        <Icon name="shuffle" size={18} />
        {kind === 'company' ? '企業ごちゃまぜで出題（解放済みの級から）' : '業界ごちゃまぜで出題（解放済みの級から）'}
      </Link>
    </div>
  )
}
