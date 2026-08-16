import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icon'
import { buildSession, TIME_LIMIT, type SessionConfig, type SessionFilter } from '../lib/engine'
import { companyById } from '../data/companies'
import { industryById } from '../data/industries'
import { TIER_LABELS, type Question, type QuizKind, type Tier } from '../types'

const FILTER_LABELS: Record<SessionFilter, string> = {
  all: '全問題',
  wrong: '間違えた問題',
  cleared: 'クリア済みの問題',
  bookmarked: 'ブックマーク',
}

function sessionTitle(cfg: SessionConfig): string {
  if (cfg.scope === 'favorites') return 'お気に入りクイズ'
  const kindLabel = cfg.kind === 'industry' ? '業界クイズ' : '企業クイズ'
  if (cfg.scope === 'mixed') {
    const target =
      cfg.targetId &&
      (cfg.kind === 'company' ? companyById(cfg.targetId)?.name : industryById(cfg.targetId)?.name)
    return target ? `${target}・ごちゃまぜ` : `${kindLabel}・ごちゃまぜ`
  }
  const tierLabel = cfg.tier ? TIER_LABELS[cfg.tier] : ''
  if (cfg.scope === 'tier') return `${kindLabel}・${tierLabel}`
  const target =
    cfg.kind === 'company' ? companyById(cfg.targetId!)?.name : industryById(cfg.targetId!)?.name
  return `${target ?? ''}編・${tierLabel}`
}

export function Play() {
  const [params] = useSearchParams()
  const { state, answer, toggleBookmark, setLastSession } = useApp()

  const cfg = useMemo<SessionConfig>(
    () => ({
      scope: (params.get('scope') as SessionConfig['scope']) ?? 'unit',
      kind: (params.get('kind') as QuizKind) ?? undefined,
      tier: (params.get('tier') as Tier) ?? undefined,
      targetId: params.get('target') ?? undefined,
      filter: (params.get('filter') as SessionFilter) ?? 'all',
      practice: params.get('practice') === '1',
      shuffle: params.get('shuffle') === '1',
    }),
    [params],
  )

  const questions = useMemo<Question[]>(
    () =>
      buildSession(cfg, state.progress, state.bookmarks, {
        companies: state.favCompanies,
        industries: state.favIndustries,
        units: state.favUnits,
      }),
    // セッションは初回マウント時に確定させる
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  const [index, setIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [revealed, setRevealed] = useState(false)
  const [timedOut, setTimedOut] = useState(false)

  // ホームの「続きから」用に直近セッションを記録
  useEffect(() => {
    if (questions.length > 0) {
      setLastSession(`/play?${params.toString()}`, sessionTitle(cfg))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [correctCount, setCorrectCount] = useState(0)
  const [done, setDone] = useState(false)
  const [remaining, setRemaining] = useState(TIME_LIMIT)
  const timerRef = useRef<number | null>(null)

  const q = questions[index] as Question | undefined
  const isLast = index === questions.length - 1

  // 選択肢の表示順を問題ごとにシャッフル
  const order = useMemo(() => {
    if (!q) return []
    const idx = q.choices.map((_, i) => i)
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[idx[i], idx[j]] = [idx[j], idx[i]]
    }
    return idx
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id])

  // 10秒カウントダウン
  useEffect(() => {
    if (!q || revealed || done) return
    setRemaining(TIME_LIMIT)
    const startedAt = Date.now()
    timerRef.current = window.setInterval(() => {
      const left = TIME_LIMIT - (Date.now() - startedAt) / 1000
      if (left <= 0) {
        setRemaining(0)
        window.clearInterval(timerRef.current!)
        // タイムアップ: 不正解扱いで解説を表示
        setTimedOut(true)
        setRevealed(true)
        if (!cfg.practice) answer(q.id, false)
      } else {
        setRemaining(left)
      }
    }, 100)
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q?.id, revealed && false, done])

  if (questions.length === 0) {
    return (
      <div className="page narrow">
        <div className="empty">
          <h2>出題できる問題がありません</h2>
          <p className="muted">
            {cfg.filter === 'wrong' && '間違えたままの問題はありません。'}
            {cfg.filter === 'cleared' && 'クリア済みの問題がまだありません。'}
            {cfg.filter === 'bookmarked' && 'ブックマークした問題がありません。クイズ中の しおりボタンで追加できます。'}
            {cfg.filter === 'all' && cfg.scope === 'favorites' && 'お気に入りに登録された企業・業界・編がありません。'}
          </p>
          <Link className="btn-primary" to="/">
            ホームへ
          </Link>
        </div>
      </div>
    )
  }

  const choose = (origIdx: number) => {
    if (!q || revealed) return
    if (timerRef.current) window.clearInterval(timerRef.current)
    setSelected(origIdx)
    setRevealed(true)
    const correct = origIdx === q.answerIndex
    if (correct) setCorrectCount((c) => c + 1)
    if (!cfg.practice) answer(q.id, correct)
  }

  const next = () => {
    if (isLast) {
      setDone(true)
      return
    }
    setIndex((n) => n + 1)
    setSelected(null)
    setRevealed(false)
    setTimedOut(false)
  }

  if (done) {
    const pct = Math.round((correctCount / questions.length) * 100)
    return (
      <div className="page narrow">
        <div className="result-card">
          <div className="result-trophy">
            <Icon name={pct >= 80 ? 'trophy' : 'flag'} size={30} />
          </div>
          <div className="result-score">{pct}%</div>
          <h2>{cfg.practice ? '練習おつかれさまでした' : 'テスト終了！'}</h2>
          <p className="muted">
            {questions.length}問中 {correctCount}問 正解。
            {cfg.practice
              ? ' 練習の結果はクリア率に影響しません。'
              : ' 2回連続正解でクリアになります。'}
          </p>
          <div className="result-actions">
            <Link className="btn-primary" to="/">
              ホームへ
            </Link>
            <button className="btn-secondary" onClick={() => window.location.reload()}>
              もう一度挑戦
            </button>
          </div>
        </div>
      </div>
    )
  }

  const urgent = !revealed && remaining <= 3
  const timerPct = (remaining / TIME_LIMIT) * 100
  const bookmarked = q ? state.bookmarks.includes(q.id) : false

  return (
    <div className="page narrow">
      <div className="quiz-head">
        <div className="quiz-head-row">
          <Link to="/" className="back-link">
            ← 中断する
          </Link>
          <span className={`mode-chip ${cfg.practice ? 'practice' : 'test'}`}>
            {cfg.practice ? '練習モード' : 'テストモード'}・{FILTER_LABELS[cfg.filter]}
          </span>
        </div>
        <div className="quiz-progress">
          <span>
            {sessionTitle(cfg)} ・ 第{index + 1}問 / {questions.length}
          </span>
          <div className="quiz-bar">
            <span style={{ width: `${((index + 1) / questions.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {q && (
        <div className={`quiz-card ${urgent ? 'urgent-card' : ''}`}>
          <div className={`timer ${urgent ? 'urgent' : ''} ${revealed ? 'paused' : ''}`}>
            <div className="timer-track">
              <span className="timer-fill" style={{ width: `${revealed ? 0 : timerPct}%` }} />
            </div>
            <span className="timer-num">
              <Icon name="clock" size={15} />
              {revealed ? '—' : `${Math.ceil(remaining)}秒`}
            </span>
          </div>

          <div className="quiz-tags">
            <span className={`chip lv-${q.tier}`}>{TIER_LABELS[q.tier]}</span>
            <span className="chip">
              {q.kind === 'company' ? companyById(q.targetId)?.name : industryById(q.targetId)?.name}
            </span>
            <button
              className={`bookmark-btn ${bookmarked ? 'on' : ''}`}
              onClick={() => toggleBookmark(q.id)}
              title="この問題をブックマーク"
            >
              <Icon name="bookmark" size={16} filled={bookmarked} />
              {bookmarked ? '登録済み' : 'ブックマーク'}
            </button>
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
                <Icon
                  name={selected === q.answerIndex ? 'checkCircle' : timedOut ? 'clock' : 'flag'}
                  size={18}
                />
                {selected === q.answerIndex ? '正解！' : timedOut ? '時間切れ' : '不正解'}
              </div>
              {q.explanation.split('\n').map((line, li) =>
                line.startsWith('【') ? (
                  <p key={li} className="explain-note">
                    {line}
                  </p>
                ) : (
                  <p key={li}>{line}</p>
                ),
              )}
              <button className="btn-primary" onClick={next}>
                {isLast ? '結果を見る' : '次の問題へ'}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
