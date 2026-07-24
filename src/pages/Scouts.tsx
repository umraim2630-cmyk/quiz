import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { companyById } from '../data/companies'
import type { Scout } from '../types'
import { Icon } from '../components/Icon'

export function Scouts() {
  const { state, readScout, reply, resumeCompleted } = useApp()
  const [activeId, setActiveId] = useState<string | null>(state.scouts[0]?.id ?? null)
  const [draft, setDraft] = useState('')

  const active = state.scouts.find((s) => s.id === activeId) ?? null

  const openScout = (s: Scout) => {
    setActiveId(s.id)
    setDraft('')
    if (!s.read) readScout(s.id)
  }

  const send = () => {
    if (!active || !draft.trim()) return
    reply(active.id, draft.trim())
    setDraft('')
  }

  if (state.scouts.length === 0) {
    return (
      <div className="page narrow">
        <div className="empty">
          <h2>まだスカウトはありません</h2>
          <p className="muted">クイズを解いて実績を貯めると、企業やエージェントからスカウトが届きます。</p>
          <Link className="btn-primary" to="/quiz">
            クイズに挑戦
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="page">
      <h1>スカウト</h1>
      {!resumeCompleted && (
        <div className="banner warn">
          <Icon name="mail" size={17} /> 返信するにはウェブ履歴書の登録が必要です。
          <Link to="/resume" className="banner-link">
            履歴書を登録する →
          </Link>
        </div>
      )}

      <div className="scout-layout">
        <div className="scout-list">
          {state.scouts.map((s) => {
            const company = s.companyId ? companyById(s.companyId) : undefined
            return (
              <button
                key={s.id}
                className={`scout-item ${s.id === activeId ? 'active' : ''} ${s.read ? '' : 'unread'}`}
                onClick={() => openScout(s)}
              >
                <div
                  className="scout-avatar"
                  style={{ background: company?.logoColor ?? (s.sender === 'agent' ? '#7048e8' : '#495057') }}
                >
                  {s.sender === 'agent' ? <Icon name="user" size={19} /> : s.senderName.slice(0, 1)}
                </div>
                <div className="scout-item-body">
                  <div className="scout-item-top">
                    <span className="scout-sender">{s.senderName}</span>
                    {!s.read && <span className="dot" />}
                  </div>
                  <div className="scout-role">{s.role}</div>
                  <div className="scout-preview">{s.message}</div>
                </div>
              </button>
            )
          })}
        </div>

        <div className="scout-thread">
          {!active ? (
            <div className="thread-empty muted">スカウトを選択してください</div>
          ) : (
            <>
              <div className="thread-head">
                <div>
                  <div className="thread-name">{active.senderName}</div>
                  <div className="muted small">
                    {active.role}
                    {active.companyId && (
                      <>
                        {' ・ '}
                        <Link to={`/company/${active.companyId}`}>企業の口コミを見る</Link>
                      </>
                    )}
                  </div>
                </div>
                <span className={`tag ${active.sender}`}>
                  {active.sender === 'agent' ? 'エージェント' : '企業'}
                </span>
              </div>

              <div className="thread-body">
                <div className="bubble them">
                  <p>{active.message}</p>
                  <span className="bubble-at">{active.receivedAt}</span>
                </div>
                {active.thread.map((m, i) => (
                  <div key={i} className={`bubble ${m.from}`}>
                    <p>{m.text}</p>
                    <span className="bubble-at">{m.at}</span>
                  </div>
                ))}
              </div>

              <div className="thread-input">
                {resumeCompleted ? (
                  <>
                    <textarea
                      rows={2}
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      placeholder="メッセージを入力…"
                    />
                    <button className="btn-primary" onClick={send} disabled={!draft.trim()}>
                      送信
                    </button>
                  </>
                ) : (
                  <div className="locked">
                    <Icon name="lock" size={15} /> 返信するには
                    <Link to="/resume">ウェブ履歴書の登録</Link>
                    が必要です。
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
