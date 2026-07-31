import { useMemo, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { buildQuiz, buildReviewAll, difficultyLabel } from '../lib/quizEngine'
import type { Question, QuestionType } from '../types'
import { companyById } from '../data/companies'
import { Icon } from '../components/Icon'
import { industryById } from '../data/industries'

export function QuizPlay() {
  const { type, targetId } = useParams<{ type: string; targetId: string }>()
  const [params] = useSearchParams()
  const wrongOnly = params.get('review') === '1'
  const { state, answer } = useApp()

  // クイズは初回マウント時に一度だけ確定させる（回答で進捗が変わっても順番を固定）
  const questions = useMemo<Question[]>(() => {
    if (type === 'review') return buildReviewAll(state.progress)
    return buildQuiz(state.progress, type as QuestionType, targetId!, { wrongOnly })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const title = useMemo(() => {
    if (type === 'review') return '復習：間違えた問題'
    if (type === 'company') return companyById(targetId!)?.name ?? '企業クイズ'
    return industryById(targetId!)?.name ?? '業界クイズ'
  }, [type, targetId])

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [correctCount, setCorrectCount] = useState(0)
  const [done, setDone] = useState(false)

  if (questions.length === 0) {
    return (
      <div className="page narrow">
        <div className="empty">
          <h2>出題できる問題がありません</h2>
          <p className="muted">
            {wrongOnly || type === 'review'
              ? '間違えた問題はありません。まずは通常モードでクイズに挑戦しましょう。'
              : 'この対象の問題は現在ありません。'}
          </p>
          <Link className="btn-primary" to="/quiz">
            クイズ一覧へ
          </Link>
        </div>
      </div>
    )
  }

  const q = questions[index]
  const isLast = index === questions.length - 1

  // 選択肢の表示順を問題ごとにシャッフル（正解が特定の位置に偏らないようにする）
  const order = useMemo(() => {
    const idx = q.choices.map((_, i) => i)
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[idx[i], idx[j]] = [idx[j], idx[i]]
    }
    return idx
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q.id])

  const choose = (i: number) => {
    if (revealed) return
    setSelected(i)
    setRevealed(true)
    const correct = i === q.answerIndex
    if (correct) setCorrectCount((c) => c + 1)
    answer(q.id, correct)
  }

  const next = () => {
    if (isLast) {
      setDone(true)
      return
    }
    setIndex((n) => n + 1)
    setSelected(null)
    setRevealed(false)
  }

  if (done) {
    const pct = Math.round((correctCount / questions.length) * 100)
    return (
      <div className="page narrow">
        <div className="result-card">
          <div className="result-trophy">
            <Icon name="sparkle" size={30} />
          </div>
          <div className="result-score">{pct}%</div>
          <h2>おつかれさまでした！</h2>
          <p className="muted">
            {questions.length}問中 {correctCount}問 正解。連続正解でクリア（マスター）になります。
          </p>
          <div className="result-actions">
            <Link className="btn-primary" to="/quiz">
              クイズ一覧へ
            </Link>
            <Link
              className="btn-secondary"
              to={type === 'review' ? '/quiz?review=1' : `/${type}/${targetId}`}
            >
              {type === 'review' ? 'もう一度復習' : '対象の詳細を見る'}
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="page narrow">
      <div className="quiz-head">
        <Link to="/quiz" className="back-link">
          ← 中断する
        </Link>
        <div className="quiz-progress">
          <span>
            {title} ・ 第{index + 1}問 / {questions.length}
          </span>
          <div className="quiz-bar">
            <span style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <div className="quiz-card">
        <div className="quiz-tags">
          <span className={`chip lv${q.difficulty}`}>
            {difficultyLabel(q.difficulty)}（Lv{q.difficulty}）
          </span>
          {q.financial && (
            <span className="chip fin">
              <Icon name="yen" size={13} /> 財務データ問題
            </span>
          )}
        </div>
        <h2 className="quiz-prompt">{q.prompt}</h2>

        <div className="choices">
          {order.map((origIdx, i) => {
            let cls = 'choice'
            if (revealed) {
              if (origIdx === q.answerIndex) cls += ' correct'
              else if (origIdx === selected) cls += ' wrong'
              else cls += ' dim'
            }
            return (
              <button key={origIdx} className={cls} onClick={() => choose(origIdx)} disabled={revealed}>
                <span className="choice-key">{String.fromCharCode(65 + i)}</span>
                <span>{q.choices[origIdx]}</span>
              </button>
            )
          })}
        </div>

        {revealed && (
          <div className={`explain ${selected === q.answerIndex ? 'ok' : 'ng'}`}>
            <div className="explain-head">
              <Icon name={selected === q.answerIndex ? 'checkCircle' : 'flag'} size={18} />
              {selected === q.answerIndex ? '正解！' : '不正解'}
            </div>
            <p>{q.explanation}</p>
            {q.source && <div className="explain-src">出典: {q.source}</div>}
            <button className="btn-primary" onClick={next}>
              {isLast ? '結果を見る' : '次の問題へ'}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
