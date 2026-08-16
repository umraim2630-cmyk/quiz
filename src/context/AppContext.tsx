import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'
import type { QuizKind, Tier, User } from '../types'
import { applyAnswer, getProgress, questionsOf, type ProgressMap } from '../lib/engine'
import { clearState, defaultState, loadState, saveState, type PersistedState } from '../lib/storage'

type Action =
  | { type: 'login'; user: User }
  | { type: 'logout' }
  | { type: 'subscribe' }
  | { type: 'cancelSubscription' }
  | { type: 'answer'; questionId: string; correct: boolean }
  | { type: 'toggleBookmark'; questionId: string }
  | { type: 'toggleFav'; list: 'favCompanies' | 'favIndustries' | 'favUnits'; id: string }
  | { type: 'setProgressSelection'; ids: string[] }
  | { type: 'updateAccount'; name: string }
  | { type: 'resetProgress' }
  | { type: 'demoClearTier'; kind: QuizKind; tier: Tier }
  | { type: 'setLastSession'; path: string; label: string }
  | { type: 'completeOnboarding' }

const toggle = (arr: string[], id: string) =>
  arr.includes(id) ? arr.filter((x) => x !== id) : [...arr, id]

function reducer(state: PersistedState, action: Action): PersistedState {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.user }
    case 'logout':
      return defaultState()
    case 'subscribe': {
      const now = new Date()
      const next = new Date(now)
      next.setMonth(next.getMonth() + 1)
      return {
        ...state,
        subscription: {
          active: true,
          since: now.toISOString(),
          nextBilling: next.toISOString(),
        },
      }
    }
    case 'cancelSubscription':
      return { ...state, subscription: { active: false, since: state.subscription.since, nextBilling: null } }
    case 'answer': {
      const prev = getProgress(state.progress, action.questionId)
      const progress: ProgressMap = {
        ...state.progress,
        [action.questionId]: applyAnswer(prev, action.correct),
      }
      return { ...state, progress }
    }
    case 'toggleBookmark':
      return { ...state, bookmarks: toggle(state.bookmarks, action.questionId) }
    case 'toggleFav':
      return { ...state, [action.list]: toggle(state[action.list], action.id) }
    case 'setProgressSelection':
      return { ...state, progressSelection: action.ids }
    case 'updateAccount':
      return state.user ? { ...state, user: { ...state.user, name: action.name } } : state
    case 'resetProgress':
      return { ...state, progress: {}, bookmarks: [] }
    case 'demoClearTier': {
      // デモ用: 指定した級を全クリア扱いにする（級の解放条件の確認用）
      const progress = { ...state.progress }
      for (const q of questionsOf(action.kind, action.tier)) {
        progress[q.id] = { streak: 2, correctCount: 2, wrongCount: 0, lastWrong: false, cleared: true }
      }
      return { ...state, progress }
    }
    case 'setLastSession':
      return { ...state, lastSession: { path: action.path, label: action.label } }
    case 'completeOnboarding':
      return { ...state, onboarded: true }
    default:
      return state
  }
}

interface AppContextValue {
  state: PersistedState
  login: (email: string, name: string) => void
  logout: () => void
  subscribe: () => void
  cancelSubscription: () => void
  answer: (questionId: string, correct: boolean) => void
  toggleBookmark: (questionId: string) => void
  toggleFavCompany: (id: string) => void
  toggleFavIndustry: (id: string) => void
  toggleFavUnit: (key: string) => void
  setProgressSelection: (ids: string[]) => void
  updateAccount: (name: string) => void
  resetProgress: () => void
  demoClearTier: (kind: QuizKind, tier: Tier) => void
  setLastSession: (path: string, label: string) => void
  completeOnboarding: () => void
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const login = useCallback((email: string, name: string) => {
    dispatch({ type: 'login', user: { email, name } })
  }, [])
  const logout = useCallback(() => {
    clearState()
    dispatch({ type: 'logout' })
  }, [])
  const subscribe = useCallback(() => dispatch({ type: 'subscribe' }), [])
  const cancelSubscription = useCallback(() => dispatch({ type: 'cancelSubscription' }), [])
  const answer = useCallback(
    (questionId: string, correct: boolean) => dispatch({ type: 'answer', questionId, correct }),
    [],
  )
  const toggleBookmark = useCallback(
    (questionId: string) => dispatch({ type: 'toggleBookmark', questionId }),
    [],
  )
  const toggleFavCompany = useCallback(
    (id: string) => dispatch({ type: 'toggleFav', list: 'favCompanies', id }),
    [],
  )
  const toggleFavIndustry = useCallback(
    (id: string) => dispatch({ type: 'toggleFav', list: 'favIndustries', id }),
    [],
  )
  const toggleFavUnit = useCallback(
    (key: string) => dispatch({ type: 'toggleFav', list: 'favUnits', id: key }),
    [],
  )
  const setProgressSelection = useCallback(
    (ids: string[]) => dispatch({ type: 'setProgressSelection', ids }),
    [],
  )
  const updateAccount = useCallback((name: string) => dispatch({ type: 'updateAccount', name }), [])
  const resetProgress = useCallback(() => dispatch({ type: 'resetProgress' }), [])
  const demoClearTier = useCallback(
    (kind: QuizKind, tier: Tier) => dispatch({ type: 'demoClearTier', kind, tier }),
    [],
  )
  const setLastSession = useCallback(
    (path: string, label: string) => dispatch({ type: 'setLastSession', path, label }),
    [],
  )
  const completeOnboarding = useCallback(() => dispatch({ type: 'completeOnboarding' }), [])

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      login,
      logout,
      subscribe,
      cancelSubscription,
      answer,
      toggleBookmark,
      toggleFavCompany,
      toggleFavIndustry,
      toggleFavUnit,
      setProgressSelection,
      updateAccount,
      resetProgress,
      demoClearTier,
      setLastSession,
      completeOnboarding,
    }),
    [
      state,
      login,
      logout,
      subscribe,
      cancelSubscription,
      answer,
      toggleBookmark,
      toggleFavCompany,
      toggleFavIndustry,
      toggleFavUnit,
      setProgressSelection,
      updateAccount,
      resetProgress,
      demoClearTier,
      setLastSession,
      completeOnboarding,
    ],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
