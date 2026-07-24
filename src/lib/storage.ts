import type { Scout, User, WebResume } from '../types'
import type { ProgressMap } from './quizEngine'

// ------------------------------------------------------------------
// localStorage を使った簡易永続化レイヤー。
// 実サービスでは本体サービスのAPI/DBに置き換わる。
// ------------------------------------------------------------------

const KEY = 'kuchikomi-quiz-state-v1'

export interface PersistedState {
  user: User | null
  progress: ProgressMap
  resume: WebResume | null
  scouts: Scout[]
}

export const defaultState = (): PersistedState => ({
  user: null,
  progress: {},
  resume: null,
  scouts: [],
})

export function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultState()
    const parsed = JSON.parse(raw) as Partial<PersistedState>
    return { ...defaultState(), ...parsed }
  } catch {
    return defaultState()
  }
}

export function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // 保存に失敗しても致命的ではないため無視
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* noop */
  }
}
