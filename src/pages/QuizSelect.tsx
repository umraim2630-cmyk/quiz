import { Link, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { COMPANIES } from '../data/companies'
import { INDUSTRIES } from '../data/industries'
import {
  achievementRate,
  difficultyLabel,
  unlockedDifficulty,
  wrongQueueCount,
} from '../lib/quizEngine'
import { Icon } from '../components/Icon'

export function QuizSelect() {
  const { state } = useApp()
  const [params] = useSearchParams()
  const reviewFocus = params.get('review') === '1'
  const wrongTotal = wrongQueueCount(state.progress)

  return (
    <div className="page">
      <h1>クイズ</h1>
      <p className="muted">
        習熟度が上がるほど難易度が解放されます。Lv4以上では各社の決算発表資料を題材にした問題が登場します。
      </p>

      <section className={`review-banner ${reviewFocus ? 'focus' : ''}`}>
        <span className="review-ic">
          <Icon name="refresh" size={22} />
        </span>
        <div>
          <div className="review-title">間違えた問題だけを復習</div>
          <div className="muted">現在 {wrongTotal} 問が復習キューにあります。正解するとキューから外れます。</div>
        </div>
        {wrongTotal > 0 ? (
          <Link className="btn-primary" to="/quiz/play/review/all?review=1">
            復習を始める
          </Link>
        ) : (
          <span className="pill-muted">キューは空です</span>
        )}
      </section>

      <div className="section-head">
        <span className="sec-ic">
          <Icon name="building" size={18} />
        </span>
        <h2>ファーム研究</h2>
      </div>
      <div className="quiz-list">
        {COMPANIES.map((c) => {
          const unlocked = unlockedDifficulty(state.progress, 'company', c.id)
          const rate = achievementRate(state.progress, 'company', c.id)
          return (
            <div className="quiz-row" key={c.id}>
              <div className="quiz-row-logo" style={{ background: c.logoColor }}>
                {c.monogram}
              </div>
              <div className="quiz-row-main">
                <div className="quiz-row-name">{c.name}</div>
                <div className="quiz-row-meta">
                  達成率 {Math.round(rate * 100)}% ・ 現在の解放難易度：
                  <strong>
                    {difficultyLabel(unlocked)}（Lv{unlocked}）
                  </strong>
                </div>
              </div>
              <div className="quiz-row-actions">
                <Link className="btn-secondary" to={`/company/${c.id}`}>
                  口コミを見る
                </Link>
                <Link className="btn-primary" to={`/quiz/play/company/${c.id}`}>
                  挑戦
                </Link>
              </div>
            </div>
          )
        })}
      </div>

      <div className="section-head">
        <span className="sec-ic">
          <Icon name="globe" size={18} />
        </span>
        <h2>コンサル業界研究</h2>
      </div>
      <div className="quiz-list">
        {INDUSTRIES.map((ind) => {
          const unlocked = unlockedDifficulty(state.progress, 'industry', ind.id)
          const rate = achievementRate(state.progress, 'industry', ind.id)
          return (
            <div className="quiz-row" key={ind.id}>
              <div
                className="quiz-row-logo tint"
                style={{ color: ind.color, background: `color-mix(in srgb, ${ind.color} 12%, transparent)` }}
              >
                <Icon name={ind.icon} size={20} />
              </div>
              <div className="quiz-row-main">
                <div className="quiz-row-name">{ind.name}</div>
                <div className="quiz-row-meta">
                  達成率 {Math.round(rate * 100)}% ・ 現在の解放難易度：
                  <strong>
                    {difficultyLabel(unlocked)}（Lv{unlocked}）
                  </strong>
                </div>
              </div>
              <div className="quiz-row-actions">
                <Link className="btn-secondary" to={`/industry/${ind.id}`}>
                  概要を見る
                </Link>
                <Link className="btn-primary" to={`/quiz/play/industry/${ind.id}`}>
                  挑戦
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
