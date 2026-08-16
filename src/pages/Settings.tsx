import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icon'
import { PLAN_PRICE } from '../types'

const fmtDate = (iso: string | null) =>
  iso ? new Date(iso).toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' }) : '—'

export function Settings() {
  const { state, updateAccount, cancelSubscription, resetProgress, demoClearTier, logout } = useApp()
  const navigate = useNavigate()
  const [name, setName] = useState(state.user?.name ?? '')
  const [saved, setSaved] = useState(false)

  const saveName = (e: React.FormEvent) => {
    e.preventDefault()
    updateAccount(name.trim() || 'ゲスト')
    setSaved(true)
    setTimeout(() => setSaved(false), 1600)
  }

  const onCancel = () => {
    if (window.confirm('サブスクリプションを解約しますか？（デモ: 即時に利用停止となります）')) {
      cancelSubscription()
      navigate('/subscribe')
    }
  }

  const onReset = () => {
    if (window.confirm('クリア状況・ブックマークをすべてリセットします。よろしいですか？')) {
      resetProgress()
    }
  }

  const onLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="page narrow">
      <h1>設定</h1>

      <section className="card">
        <div className="card-title">
          <Icon name="user" size={16} /> アカウント情報
        </div>
        <form onSubmit={saveName}>
          <label>
            表示名
            <input value={name} onChange={(e) => setName(e.target.value)} />
          </label>
          <label>
            メールアドレス
            <input value={state.user?.email ?? ''} disabled />
          </label>
          <button className="btn-secondary" type="submit">
            保存
          </button>
          {saved && <span className="save-msg ok" style={{ marginLeft: 12 }}>保存しました</span>}
        </form>
      </section>

      <section className="card">
        <div className="card-title">
          <Icon name="creditCard" size={16} /> ご契約プラン
        </div>
        <div className="plan-row">
          <div>
            <div className="fav-name">スタンダードプラン（月額¥{PLAN_PRICE.toLocaleString()}）</div>
            <div className="muted small">
              契約開始日: {fmtDate(state.subscription.since)} ／ 次回請求日: {fmtDate(state.subscription.nextBilling)}
            </div>
          </div>
          <span className="tag-active">契約中</span>
        </div>
        <button className="btn-ghost" onClick={onCancel}>
          解約する
        </button>
      </section>

      <section className="card">
        <div className="card-title">
          <Icon name="gear" size={16} /> データ管理・デモ操作
        </div>
        <p className="muted small">
          プレビュー用の操作です。級の解放条件（前の級の全クリア）を確認する際にご利用ください。
        </p>
        <div className="demo-actions">
          <button className="btn-secondary btn-sm" onClick={() => demoClearTier('company', 'beginner')}>
            企業クイズ・初級を全クリア扱いにする
          </button>
          <button className="btn-secondary btn-sm" onClick={() => demoClearTier('company', 'intermediate')}>
            企業クイズ・中級を全クリア扱いにする
          </button>
          <button className="btn-secondary btn-sm" onClick={() => demoClearTier('industry', 'beginner')}>
            業界クイズ・初級を全クリア扱いにする
          </button>
          <button className="btn-ghost btn-sm" onClick={onReset}>
            進捗をリセット
          </button>
        </div>
      </section>

      <section className="card">
        <div className="card-title">
          <Icon name="lock" size={16} /> ログアウト
        </div>
        <button className="btn-ghost" onClick={onLogout}>
          ログアウトする
        </button>
      </section>
    </div>
  )
}
