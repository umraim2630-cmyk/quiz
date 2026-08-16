import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import { Icon } from '../components/Icon'

const STEPS = [
  {
    icon: 'search',
    title: '気になる企業を選ぼう',
    body: '企業タブから、社名や証券コードで検索。業界での絞り込みもできます。まずは気になる1社を選ぶところからスタート。',
  },
  {
    icon: 'trophy',
    title: '初級・中級・上級でクリア',
    body: 'クイズは3つの級に分かれています。同じ問題に2回連続で正解するとクリア。初級を全問クリアすると、次の級が解放されます。',
  },
  {
    icon: 'clock',
    title: '1問10秒。練習機能も',
    body: 'テストは1問10秒のタイムアタック。じっくり取り組みたいときは練習モードへ。練習の正誤はクリア率に影響しません。',
  },
  {
    icon: 'star',
    title: 'お気に入りに保存',
    body: '気になる企業・業界・クイズは星マークでお気に入りに。ホームやお気に入りタブからすぐに再開できます。',
  },
  {
    icon: 'bookmark',
    title: 'オリジナルの問題集を作ろう',
    body: 'お気に入りと問題のブックマークを組み合わせれば、自分だけの問題集が完成。苦手つぶしも試験前の総復習も自由自在です。',
  },
] as const

export function Onboarding() {
  const { completeOnboarding } = useApp()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const isLast = step === STEPS.length - 1
  const s = STEPS[step]

  const finish = () => {
    completeOnboarding()
    navigate('/')
  }

  return (
    <div className="onb">
      <button className="onb-skip" onClick={finish}>
        スキップ
      </button>
      <div className="onb-card" key={step}>
        <div className="onb-ic">
          <Icon name={s.icon} size={40} strokeWidth={1.8} />
        </div>
        <div className="onb-step">
          STEP {step + 1} / {STEPS.length}
        </div>
        <h1 className="onb-title">{s.title}</h1>
        <p className="onb-body">{s.body}</p>
      </div>
      <div className="onb-dots">
        {STEPS.map((_, i) => (
          <button
            key={i}
            className={`onb-dot ${i === step ? 'on' : ''}`}
            onClick={() => setStep(i)}
            aria-label={`ステップ${i + 1}`}
          />
        ))}
      </div>
      <div className="onb-actions">
        {step > 0 ? (
          <button className="btn-ghost" onClick={() => setStep(step - 1)}>
            戻る
          </button>
        ) : (
          <span />
        )}
        {isLast ? (
          <button className="btn-primary" onClick={finish}>
            さっそく始める
          </button>
        ) : (
          <button className="btn-primary" onClick={() => setStep(step + 1)}>
            次へ
          </button>
        )}
      </div>
    </div>
  )
}
