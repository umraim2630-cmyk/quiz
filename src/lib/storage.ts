import type { Subscription, User } from '../types'
import type { ProgressMap } from './engine'

// ------------------------------------------------------------------
// localStorage による簡易永続化。
// 本番ではアカウント基盤・決済基盤・DBに置き換わる。
// ------------------------------------------------------------------

const KEY = 'bizquiz-state-v1'

export interface PersistedState {
  user: User | null
  subscription: Subscription
  progress: ProgressMap
  bookmarks: string[]
  favCompanies: string[]
  favIndustries: string[]
  favUnits: string[]
  /** 進捗確認で選択した企業 */
  progressSelection: string[]
  /** 直近のクイズセッション（ホームの「続きから」用） */
  lastSession: { path: string; label: string } | null
  /** 初回オンボーディングを完了したか */
  onboarded: boolean
}

export const defaultState = (): PersistedState => ({
  user: null,
  subscription: { active: false, since: null, nextBilling: null },
  progress: {},
  bookmarks: [],
  favCompanies: [],
  favIndustries: [],
  favUnits: [],
  progressSelection: [],
  lastSession: null,
  onboarded: false,
})

export function loadState(): PersistedState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return defaultState()
    return { ...defaultState(), ...(JSON.parse(raw) as Partial<PersistedState>) }
  } catch {
    return defaultState()
  }
}

export function saveState(state: PersistedState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* noop */
  }
}

export function clearState(): void {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* noop */
  }
}
