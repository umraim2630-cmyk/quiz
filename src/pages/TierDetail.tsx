import { Link, Navigate, useParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icon'
import { Meter } from '../components/Meter'
import { COMPANIES } from '../data/companies'
import { INDUSTRIES } from '../data/industries'
import { getProgress, questionsOf, tierUnlocked, unitRate } from '../lib/engine'
import { TIER_LABELS, unitKey, type QuizKind, type Tier } from '../types'

/** 級の中の「編」一覧と出題モード選択 */
export function TierDetail({ kind }: { kind: QuizKind }) {
  const { tier } = useParams<{ tier: Tier }>()
  const { state, toggleFavUnit } = useApp()
  const k = kind
  const t = (['beginner', 'intermediate', 'advanced'].includes(tier ?? '') ? tier : 'beginner') as Tier

  if (!tierUnlocked(state.progress, k, t)) {
    return <Navigate to={`/${k}`} replace />
  }

  const targets =
    k === 'company'
      ? COMPANIES.map((c) => ({ id: c.id, title: `${c.name}編`, color: c.color, mono: c.monogram, icon: null as string | null }))
      : INDUSTRIES.map((i) => ({ id: i.id, title: `${i.name}編`, color: i.color, mono: '', icon: i.icon }))

  const base = (targetId: string) =>
    `scope=unit&kind=${k}&tier=${t}&target=${targetId}`

  return (
    <div className="page">
      <Link to={`/${k}`} className="back-link">
        ← {k === 'company' ? '企業クイズ' : '業界クイズ'}
      </Link>
      <div>
        <h1>
          {k === 'company' ? '企業クイズ' : '業界クイズ'}・{TIER_LABELS[t]}
        </h1>
        <p className="muted">
          各編10問。テストで2回連続正解するとクリアです（練習はクリア率に影響しません）。
        </p>
      </div>

      <div className="unit-list">
        {targets.map((tg) => {
          const qs = questionsOf(k, t, tg.id)
          const rate = unitRate(state.progress, k, t, tg.id)
          const wrongN = qs.filter((q) => getProgress(state.progress, q.id).lastWrong).length
          const clearedN = qs.filter((q) => getProgress(state.progress, q.id).cleared).length
          const key = unitKey({ kind: k, tier: t, targetId: tg.id })
          const faved = state.favUnits.includes(key)
          return (
            <div className="unit-card" key={tg.id}>
              <div className="unit-head">
                {tg.icon ? (
                  <span
                    className="unit-logo tint"
                    style={{ color: tg.color, background: `color-mix(in srgb, ${tg.color} 12%, transparent)` }}
                  >
                    <Icon name={tg.icon} size={20} />
                  </span>
                ) : (
                  <span className="unit-logo" style={{ background: tg.color }}>
                    {tg.mono}
                  </span>
                )}
                <div className="unit-main">
                  <div className="unit-title">{tg.title}</div>
                  <Meter rate={rate} label={`クリア ${clearedN}/${qs.length}`} />
                </div>
                <button
                  className={`fav-btn ${faved ? 'on' : ''}`}
                  onClick={() => toggleFavUnit(key)}
                  aria-label="この編をお気に入りに追加"
                  title="この編をお気に入り"
                >
                  <Icon name="star" size={18} filled={faved} />
                </button>
              </div>
              <div className="unit-actions">
                <Link className="btn-primary btn-sm" to={`/play?${base(tg.id)}&filter=all`}>
                  <Icon name="play" size={14} />
                  テスト（全問）
                </Link>
                <Link
                  className={`btn-secondary btn-sm ${wrongN === 0 ? 'disabled-link' : ''}`}
                  to={wrongN ? `/play?${base(tg.id)}&filter=wrong` : '#'}
                >
                  間違いのみ（{wrongN}）
                </Link>
                <Link
                  className={`btn-secondary btn-sm ${clearedN === 0 ? 'disabled-link' : ''}`}
                  to={clearedN ? `/play?${base(tg.id)}&filter=cleared` : '#'}
                >
                  クリア済みのみ（{clearedN}）
                </Link>
                <Link className="btn-ghost btn-sm" to={`/play?${base(tg.id)}&practice=1&shuffle=1`}>
                  練習
                </Link>
                {k === 'company' && (
                  <Link
                    className="btn-ghost btn-sm"
                    to={`/play?scope=mixed&kind=${k}&target=${tg.id}&filter=all&shuffle=1`}
                    title="この企業の全級からランダム出題"
                  >
                    <Icon name="shuffle" size={14} />
                    企業内ごちゃまぜ
                  </Link>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <section className="quick-grid">
        <Link className="quick-card" to={`/play?scope=tier&kind=${k}&tier=${t}&filter=all&shuffle=1`}>
          <Icon name="shuffle" size={18} />
          {TIER_LABELS[t]}全編ごちゃまぜ（50問から出題）
        </Link>
        <Link className="quick-card" to={`/play?scope=tier&kind=${k}&tier=${t}&filter=bookmarked&practice=1&shuffle=1`}>
          <Icon name="bookmark" size={18} />
          この級のブックマーク練習
        </Link>
      </section>
    </div>
  )
}
