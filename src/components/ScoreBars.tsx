import { SCORE_LABELS, type KuchikomiScores } from '../types'

const KEYS = Object.keys(SCORE_LABELS) as (keyof KuchikomiScores)[]

const barColor = (v: number) => (v >= 75 ? '#2f9e44' : v >= 60 ? '#4f7cff' : v >= 45 ? '#f08c00' : '#e03131')

/** 口コミスコアを項目別の横棒で表示 */
export function ScoreBars({ scores }: { scores: KuchikomiScores }) {
  return (
    <div className="score-bars">
      {KEYS.map((k) => {
        const v = scores[k]
        return (
          <div className="score-row" key={k}>
            <span className="score-label">{SCORE_LABELS[k]}</span>
            <span className="score-track">
              <span
                className="score-fill"
                style={{ width: `${v}%`, background: barColor(v) }}
              />
            </span>
            <span className="score-num">{v}</span>
          </div>
        )
      })}
    </div>
  )
}
