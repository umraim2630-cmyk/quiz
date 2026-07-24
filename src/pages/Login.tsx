import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icon'

export function Login() {
  const { login } = useApp()
  const navigate = useNavigate()
  const [mode, setMode] = useState<'sso' | 'register'>('sso')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const finalName = name.trim() || email.split('@')[0] || 'ゲスト'
    login(email.trim() || 'guest@example.com', finalName, mode === 'sso')
    navigate('/')
  }

  return (
    <div className="auth-wrap">
      <div className="auth-hero">
        <div className="brand brand-lg">
          <span className="brand-mark">Q</span>
          <span>Kuchikomi Quiz</span>
        </div>
        <h1>口コミデータで学ぶ、企業・業界研究クイズ</h1>
        <p>
          数千件の社員口コミを要約したサマリーやスコアを教材に、クイズ形式で企業・業界を理解。
          就活を「内定後」ではなく「就活前」から始め、入社後ギャップを防ぎます。
        </p>
        <ul className="hero-points">
          <li>
            <span className="hero-ic">
              <Icon name="search" size={17} />
            </span>
            口コミ由来の内部分析（働きがい・組織文化・働きやすさ 等）を可視化
          </li>
          <li>
            <span className="hero-ic">
              <Icon name="target" size={17} />
            </span>
            習熟度に応じて難易度が上がる適応型クイズ
          </li>
          <li>
            <span className="hero-ic">
              <Icon name="yen" size={17} />
            </span>
            高難易度では財務情報を題材にした設問も
          </li>
          <li>
            <span className="hero-ic">
              <Icon name="mail" size={17} />
            </span>
            クイズ実績をもとに企業・エージェントからスカウトが届く
          </li>
        </ul>
      </div>

      <div className="auth-card">
        <div className="seg">
          <button
            className={mode === 'sso' ? 'seg-on' : ''}
            onClick={() => setMode('sso')}
            type="button"
          >
            本体サービスでログイン
          </button>
          <button
            className={mode === 'register' ? 'seg-on' : ''}
            onClick={() => setMode('register')}
            type="button"
          >
            新規会員登録
          </button>
        </div>

        {mode === 'sso' && (
          <p className="auth-note">
            口コミ本体サービスに登録済みのアカウントは、そのままログインできます。
          </p>
        )}

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
                placeholder="就活 太郎"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          )}
          <button className="btn-primary btn-block" type="submit">
            {mode === 'sso' ? 'ログインして始める' : '登録して始める'}
          </button>
        </form>
        <p className="auth-fineprint">
          ※ デモ環境です。入力情報はブラウザ内にのみ保存され、送信されません。
        </p>
      </div>
    </div>
  )
}
