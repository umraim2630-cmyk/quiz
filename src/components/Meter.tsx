/** クリア率メーター（バー + パーセント表示） */
export function Meter({ rate, label }: { rate: number; label?: string }) {
  const pct = Math.round(rate * 100)
  return (
    <div className="meter">
      <div className="meter-track">
        <span className={`meter-fill ${pct >= 100 ? 'done' : ''}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="meter-num">
        {label ?? `${pct}%`}
      </span>
    </div>
  )
}
