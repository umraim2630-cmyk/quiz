import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useApp } from '../context/AppContext'
import type { WebResume } from '../types'
import { Icon } from '../components/Icon'

const DESIRED_FIELDS = [
  '戦略系',
  '総合系（日系）',
  '総合系（外資）',
  'シンクタンク系',
  'IT・デジタル系',
  'FAS・財務アドバイザリー',
  '組織・人事系',
  '中堅・中小企業支援',
]

const emptyResume = (name: string): WebResume => ({
  fullName: name,
  university: '',
  graduationYear: '2027',
  major: '',
  desiredIndustries: [],
  selfPr: '',
  completed: false,
})

export function Resume() {
  const { state, saveResume } = useApp()
  const [form, setForm] = useState<WebResume>(
    state.resume ?? emptyResume(state.user?.name ?? ''),
  )
  const [saved, setSaved] = useState(false)

  const set = <K extends keyof WebResume>(key: K, value: WebResume[K]) => {
    setForm((f) => ({ ...f, [key]: value }))
    setSaved(false)
  }

  const toggleIndustry = (id: string) => {
    setForm((f) => ({
      ...f,
      desiredIndustries: f.desiredIndustries.includes(id)
        ? f.desiredIndustries.filter((x) => x !== id)
        : [...f.desiredIndustries, id],
    }))
    setSaved(false)
  }

  const complete =
    form.fullName.trim() !== '' &&
    form.university.trim() !== '' &&
    form.major.trim() !== '' &&
    form.selfPr.trim().length >= 20 &&
    form.desiredIndustries.length > 0

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    saveResume({ ...form, completed: complete })
    setSaved(true)
  }

  return (
    <div className="page narrow">
      <h1>ウェブ履歴書</h1>
      <p className="muted">
        スカウトへの返信・企業／エージェントとのメッセージには、ウェブ履歴書の登録が必要です。
      </p>

      {state.resume?.completed && (
        <div className="banner ok">
          <Icon name="checkCircle" size={17} /> 履歴書は登録済みです。スカウトに返信できます。
          <Link to="/scouts" className="banner-link">
            スカウトを見る →
          </Link>
        </div>
      )}

      <form className="resume-form" onSubmit={submit}>
        <label>
          氏名 <span className="req">必須</span>
          <input value={form.fullName} onChange={(e) => set('fullName', e.target.value)} />
        </label>
        <div className="form-row">
          <label>
            大学・学校名 <span className="req">必須</span>
            <input
              value={form.university}
              onChange={(e) => set('university', e.target.value)}
              placeholder="〇〇大学"
            />
          </label>
          <label>
            卒業予定年
            <select value={form.graduationYear} onChange={(e) => set('graduationYear', e.target.value)}>
              {['2026', '2027', '2028', '2029'].map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
          </label>
        </div>
        <label>
          学部・専攻 <span className="req">必須</span>
          <input
            value={form.major}
            onChange={(e) => set('major', e.target.value)}
            placeholder="経済学部 / 情報工学科 など"
          />
        </label>

        <div className="field">
          <div className="field-label">
            志望領域 <span className="req">必須</span>（複数選択可）
          </div>
          <div className="chip-select">
            {DESIRED_FIELDS.map((field) => (
              <button
                type="button"
                key={field}
                className={form.desiredIndustries.includes(field) ? 'chip-sel on' : 'chip-sel'}
                onClick={() => toggleIndustry(field)}
              >
                {field}
              </button>
            ))}
          </div>
        </div>

        <label>
          自己PR <span className="req">必須（20文字以上）</span>
          <textarea
            rows={5}
            value={form.selfPr}
            onChange={(e) => set('selfPr', e.target.value)}
            placeholder="学生時代に力を入れたこと、強み、価値観などを記入してください。"
          />
          <span className="char-count">{form.selfPr.trim().length} 文字</span>
        </label>

        {!complete && (
          <p className="muted small">
            すべての必須項目を入力すると、履歴書が「登録完了」となりスカウト返信が解放されます。
          </p>
        )}

        <button className="btn-primary btn-block" type="submit">
          履歴書を保存
        </button>
        {saved && (
          <p className={`save-msg ${complete ? 'ok' : 'warn'}`}>
            {complete
              ? '保存しました。スカウトに返信できます。'
              : '保存しました（下書き）。必須項目を埋めると返信が解放されます。'}
          </p>
        )}
      </form>
    </div>
  )
}
