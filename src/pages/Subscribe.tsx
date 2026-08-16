import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icon'
import { PLAN_PRICE } from '../types'

export function Subscribe() {
  const { state, subscribe, logout } = useApp()
  const navigate = useNavigate()
  const [card, setCard] = useState('')
  const [expiry, setExpiry] = useState('')
  const [cvc, setCvc] = useState('')
  const [holder, setHolder] = useState(state.user?.name ?? '')
  const [processing, setProcessing] = useState(false)

  const valid = card.replace(/\s/g, '').length >= 14 && expiry.length >= 4 && cvc.length >= 3

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!valid) return
    setProcessing(true)
    // デモ: 実際の決済は行わず、1秒後に契約状態にする
    setTimeout(() => {
      subscribe()
      navigate('/')
    }, 1000)
  }

  const onLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="paywall">
      <div className="paywall-inner">
        <div className="brand brand-lg" style={{ justifyContent: 'center' }}>
          <span className="brand-mark">B</span>
          <span>BizQuiz</span>
        </div>

        <div className="plan-card">
          <div className="plan-name">スタンダードプラン</div>
          <div className="plan-price">
            ¥{PLAN_PRICE.toLocaleString()}
            <span>/月（税込）</span>
          </div>
          <ul className="plan-features">
            <li>
              <Icon name="checkCircle" size={16} /> 企業クイズ・業界クイズ 全問アクセス
            </li>
            <li>
              <Icon name="checkCircle" size={16} /> 初級〜上級の段階学習とクリア率メーター
            </li>
            <li>
              <Icon name="checkCircle" size={16} /> ブックマーク練習・間違い復習・ランダム出題
            </li>
            <li>
              <Icon name="checkCircle" size={16} /> お気に入り登録・進捗確認
            </li>
            <li>
              <Icon name="checkCircle" size={16} /> いつでも解約可能
            </li>
          </ul>
        </div>

        <form className="checkout" onSubmit={submit}>
          <div className="checkout-head">
            <Icon name="creditCard" size={18} />
            お支払い情報
          </div>
          <label>
            カード番号
            <input
              inputMode="numeric"
              placeholder="4242 4242 4242 4242"
              value={card}
              onChange={(e) => setCard(e.target.value)}
            />
          </label>
          <div className="form-row3">
            <label>
              有効期限
              <input placeholder="12/28" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
            </label>
            <label>
              セキュリティコード
              <input inputMode="numeric" placeholder="123" value={cvc} onChange={(e) => setCvc(e.target.value)} />
            </label>
          </div>
          <label>
            カード名義
            <input placeholder="TARO YAMADA" value={holder} onChange={(e) => setHolder(e.target.value)} />
          </label>
          <button className="btn-primary btn-block" type="submit" disabled={!valid || processing}>
            {processing ? '処理中…' : `月額¥${PLAN_PRICE.toLocaleString()}で利用を開始する`}
          </button>
          <p className="auth-fineprint" style={{ textAlign: 'center' }}>
            ※ デモ環境のため実際の請求は発生しません。カード情報はどこにも送信されません。
            <br />
            本番では決済代行サービス（Stripe等）と連携する想定です。
          </p>
        </form>

        <button className="btn-ghost" onClick={onLogout}>
          別のアカウントでログインする
        </button>
      </div>
    </div>
  )
}
