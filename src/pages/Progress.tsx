import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icon'
import { Meter } from '../components/Meter'
import { COMPANIES } from '../data/companies'
import {
  combinedCompanyRate,
  fullyClearedCompanies,
  overallStats,
  questionsOf,
  clearRate,
  tierRate,
} from '../lib/engine'
import { TIERS, TIER_LABELS } from '../types'

export function Progress() {
  const { state, setProgressSelection } = useApp()
  const { cleared, total } = overallStats(state.progress)
  const fullCleared = fullyClearedCompanies(state.progress)
  const selection = state.progressSelection
  const combined = combinedCompanyRate(state.progress, selection)

  const toggleSelect = (id: string) => {
    setProgressSelection(
      selection.includes(id) ? selection.filter((x) => x !== id) : [...selection, id],
    )
  }

  return (
    <div className="page">
      <div>
        <h1>進捗率</h1>
        <p className="muted">クリア（2回連続正解）した問題の割合を確認できます。</p>
      </div>

      <section className="stat-grid">
        <div className="stat-card accent">
          <span className="stat-ic prime-ic">
            <Icon name="chart" size={22} />
          </span>
          <div style={{ flex: 1 }}>
            <div className="stat-title">全体クリア率</div>
            <Meter rate={total ? cleared / total : 0} label={`${cleared} / ${total} 問`} />
          </div>
        </div>
        {(['company', 'industry'] as const).map((k) => (
          <div className="stat-card" key={k}>
            <span className="stat-ic prime-ic">
              <Icon name={k === 'company' ? 'building' : 'globe'} size={22} />
            </span>
            <div style={{ flex: 1 }}>
              <div className="stat-title">{k === 'company' ? '企業クイズ' : '業界クイズ'}</div>
              <Meter rate={clearRate(state.progress, questionsOf(k))} />
            </div>
          </div>
        ))}
      </section>

      <section>
        <div className="section-head">
          <span className="sec-ic">
            <Icon name="chart" size={18} />
          </span>
          <h2>級ごとのクリア率</h2>
        </div>
        <div className="tier-progress-grid">
          {(['company', 'industry'] as const).map((k) => (
            <div className="card" key={k}>
              <div className="card-title">{k === 'company' ? '企業クイズ' : '業界クイズ'}</div>
              {TIERS.map((t) => (
                <div className="cat-meter" key={t}>
                  <span className="cat-meter-label">{TIER_LABELS[t]}</span>
                  <Meter rate={tierRate(state.progress, k, t)} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="section-head">
          <span className="sec-ic">
            <Icon name="trophy" size={18} />
          </span>
          <h2>完全クリアした企業</h2>
          <span className="muted">初級〜上級の全30問をクリアすると表示されます</span>
        </div>
        {fullCleared.length === 0 ? (
          <p className="muted small">まだ完全クリアした企業はありません。まずは1社、全級制覇を目指しましょう。</p>
        ) : (
          <div className="badge-grid">
            {fullCleared.map((c) => (
              <div className="clear-badge" key={c.id}>
                <span className="unit-logo" style={{ background: c.color }}>
                  {c.monogram}
                </span>
                <span className="clear-badge-name">{c.name}</span>
                <span className="tier-done">
                  <Icon name="trophy" size={14} /> 完全クリア
                </span>
              </div>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="section-head">
          <span className="sec-ic">
            <Icon name="target" size={18} />
          </span>
          <h2>指定した企業の合計クリア率</h2>
          <span className="muted">追いたい企業を選ぶと、合計の達成度を表示します</span>
        </div>
        <div className="card">
          <div className="select-list">
            {COMPANIES.map((c) => (
              <label className="select-item" key={c.id}>
                <input
                  type="checkbox"
                  checked={selection.includes(c.id)}
                  onChange={() => toggleSelect(c.id)}
                />
                <span className="unit-logo sm" style={{ background: c.color }}>
                  {c.monogram}
                </span>
                {c.name}
              </label>
            ))}
          </div>
          {selection.length > 0 ? (
            <div className="combined-meter">
              <div className="card-title">選択中の{selection.length}社 合計</div>
              <Meter rate={combined.rate} label={`${combined.cleared} / ${combined.total} 問クリア`} />
            </div>
          ) : (
            <p className="muted small" style={{ margin: 0 }}>
              企業を選択すると合計クリア率が表示されます。
            </p>
          )}
        </div>
      </section>
    </div>
  )
}
