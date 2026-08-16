import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icon'
import { PLAN_PRICE } from '../types'

export function Login() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'login' | 'register'>('register')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const finalName = name.trim() || email.split('@')[0] || 'ゲスト'
    login(email.trim() || 'guest@example.com', finalName)
    navigate('/subscribe')
  }

  return (
    <div className="auth-wrap">
      <div className="auth-hero">
        <div className="brand brand-lg">
          <span className="brand-mark">B</span>
          <span>BizQuiz</span>
        </div>
        <h1>クイズで身につく、企業研究・業界研究</h1>
        <p>
          上場企業を対象に、初級から上級まで段階的に学べるクイズアプリ。
          就活・転職・営業準備・投資のインプットを、1問10秒のクイズ習慣に変えます。
        </p>
        <ul className="hero-points">
          <li>
            <span className="hero-ic">
              <Icon name="target" size={17} />
            </span>
            初級・中級・上級 × 編ごとの構成。2回連続正解でクリア
          </li>
          <li>
            <span className="hero-ic">
              <Icon name="clock" size={17} />
            </span>
            1問10秒のタイムアタック形式で、スキマ時間に学べる
          </li>
          <li>
            <span className="hero-ic">
              <Icon name="bookmark" size={17} />
            </span>
            ブックマーク練習・間違えた問題だけの復習・ランダム出題
          </li>
          <li>
            <span className="hero-ic">
              <Icon name="star" size={17} />
            </span>
            お気に入りの企業・業界を集中攻略、進捗はメーターで見える化
          </li>
        </ul>
        <p className="small" style={{ opacity: 0.8 }}>
          対象ユーザー: 就活生 / 転職活動者 / 若手ビジネスパーソン / 営業・コンサル / 新入社員研修 / 株式投資家
        </p>
      </div>

      <div className="auth-card">
        <div className="seg">
          <button
            className={mode === 'register' ? 'seg-on' : ''}
            onClick={() => setMode('register')}
            type="button"
          >
            新規登録
          </button>
          <button
            className={mode === 'login' ? 'seg-on' : ''}
            onClick={() => setMode('login')}
            type="button"
          >
            ログイン
          </button>
        </div>

        <p className="auth-note">
          月額{PLAN_PRICE.toLocaleString()}円のサブスクリプション制です。登録後にお支払い手続きへ進みます。
        </p>

        <form onSubmit={submit}>
          <label>
            メールアドレス
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          {mode === 'register' && (
            <label>
              お名前
              <input
                type="text"
                placeholder="山田 太郎"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          )}
          <label>
            パスワード
            <input type="password" placeholder="********" />
          </label>
          <button className="btn-primary btn-block" type="submit">
            {mode === 'register' ? '登録してプランを選ぶ' : 'ログイン'}
          </button>
        </form>
        <p className="auth-fineprint">
          ※ デモ環境です。入力情報はブラウザ内にのみ保存され、実際の認証・課金は行われません。
        </p>
      </div>
    </div>
  )
}
