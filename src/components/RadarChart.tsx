import { SCORE_LABELS, type KuchikomiScores } from '../types'

interface Props {
  scores: KuchikomiScores
  size?: number
  color?: string
}

const KEYS = Object.keys(SCORE_LABELS) as (keyof KuchikomiScores)[]

/** 依存ライブラリなしの自作SVGレーダーチャート。口コミスコアの可視化に用いる。 */
export function RadarChart({ scores, size = 280, color = '#4f7cff' }: Props) {
  const cx = size / 2
  const cy = size / 2
  const radius = size / 2 - 46
  const n = KEYS.length
  const levels = [0.25, 0.5, 0.75, 1]

  const pointAt = (index: number, value: number) => {
    // 12時方向を起点に時計回り
    const angle = (Math.PI * 2 * index) / n - Math.PI / 2
    const r = radius * value
    return { x: cx + r * Math.cos(angle), y: cy + r * Math.sin(angle) }
  }

  const dataPoints = KEYS.map((k, i) => pointAt(i, scores[k] / 100))
  const dataPath = dataPoints.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      role="img"
      aria-label="口コミスコアのレーダーチャート"
    >
      {/* グリッド（同心多角形） */}
      {levels.map((lv) => {
        const pts = KEYS.map((_, i) => pointAt(i, lv))
          .map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`)
          .join(' ')
        return (
          <polygon
            key={lv}
            points={pts}
            fill="none"
            stroke="var(--border)"
            strokeWidth={1}
          />
        )
      })}

      {/* 軸線 */}
      {KEYS.map((_, i) => {
        const p = pointAt(i, 1)
        return (
          <line
            key={i}
            x1={cx}
            y1={cy}
            x2={p.x}
            y2={p.y}
            stroke="var(--border)"
            strokeWidth={1}
          />
        )
      })}

      {/* データ多角形 */}
      <polygon points={dataPath} fill={color} fillOpacity={0.22} stroke={color} strokeWidth={2} />
      {dataPoints.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={3.5} fill={color} />
      ))}

      {/* ラベル */}
      {KEYS.map((k, i) => {
        const p = pointAt(i, 1.16)
        return (
          <text
            key={k}
            x={p.x}
            y={p.y}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={11}
            fill="var(--text)"
            fontWeight={600}
          >
            {SCORE_LABELS[k]}
          </text>
        )
      })}
    </svg>
  )
}
