import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icon'
import { Meter } from '../components/Meter'
import { questionsOf, tierCleared, tierRate, tierUnlocked } from '../lib/engine'
import { TIERS, TIER_LABELS, type QuizKind, type Tier } from '../types'

const TIER_DESC: Record<Tier, string> = {
  beginner: '基礎情報（事業内容・本社・規模など）',
  intermediate: '事業構造・競合・戦略トピック',
  advanced: '決算数値の計算・比較・解釈',
}

/** 企業クイズ / 業界クイズ のトップ（級の一覧） */
export function QuizCategory({ kind }: { kind: QuizKind }) {
  const { state } = useApp()
  const k = kind
  const title = k === 'company' ? '企業クイズ' : '業界クイズ'

  return (
    <div className="page">
      <div>
        <h1>{title}</h1>
        <p className="muted">
          前の級を全問クリアすると、次の級が解放されます。クリア条件は同じ問題に2回連続で正解することです。
        </p>
      </div>

      <div className="tier-list">
        {TIERS.map((tier, i) => {
          const unlocked = tierUnlocked(state.progress, k, tier)
          const rate = tierRate(state.progress, k, tier)
          const done = tierCleared(state.progress, k, tier)
          const count = questionsOf(k, tier).length
          return (
            <div className={`tier-card ${unlocked ? '' : 'locked'}`} key={tier}>
              <div className="tier-badge">{TIER_LABELS[tier]}</div>
              <div className="tier-main">
                <div className="tier-title">
                  {TIER_LABELS[tier]}（全{count}問）
                  {done && (
                    <span className="tier-done">
                      <Icon name="checkCircle" size={15} /> 全クリア
                    </span>
                  )}
                </div>
                <div className="muted small">{TIER_DESC[tier]}</div>
                <Meter rate={rate} />
              </div>
              <div className="tier-actions">
                {unlocked ? (
                  <Link className="btn-primary" to={`/${k}/${tier}`}>
                    編を選ぶ
                  </Link>
                ) : (
                  <span className="lock-note">
                    <Icon name="lock" size={15} />
                    {TIER_LABELS[TIERS[i - 1]]}を全クリアで解放
                  </span>
                )}
              </div>
            </div>
          )
        })}
      </div>

      <section>
        <div className="section-head">
          <span className="sec-ic">
            <Icon name="shuffle" size={18} />
          </span>
          <h2>ランダム出題（ごちゃまぜ）</h2>
        </div>
        <div className="quick-grid">
          <Link className="quick-card" to={`/play?scope=mixed&kind=${k}&filter=all&shuffle=1`}>
            <Icon name="shuffle" size={18} />
            {k === 'company' ? '企業ごちゃまぜ（解放済みの級から）' : '業界ごちゃまぜ（解放済みの級から）'}
          </Link>
          <Link className="quick-card" to={`/play?scope=mixed&kind=${k}&filter=wrong&shuffle=1`}>
            <Icon name="refresh" size={18} />
            間違えた問題だけランダム
          </Link>
        </div>
      </section>
    </div>
  )
}
