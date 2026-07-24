import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from 'react'
import type { ReactNode } from 'react'
import type { Scout, User, WebResume } from '../types'
import { applyAnswer, getProgress, type ProgressMap } from '../lib/quizEngine'
import { clearState, loadState, saveState, type PersistedState } from '../lib/storage'
import { seedScouts } from '../data/scouts'

interface AppState extends PersistedState {}

type Action =
  | { type: 'login'; user: User }
  | { type: 'logout' }
  | { type: 'answer'; questionId: string; correct: boolean }
  | { type: 'saveResume'; resume: WebResume }
  | { type: 'readScout'; scoutId: string }
  | { type: 'reply'; scoutId: string; text: string }

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'login':
      return {
        ...state,
        user: action.user,
        // 既にスカウトがあれば維持、無ければ初期スカウトを付与
        scouts: state.scouts.length ? state.scouts : seedScouts(),
      }
    case 'logout':
      return { user: null, progress: {}, resume: null, scouts: [] }
    case 'answer': {
      const prev = getProgress(state.progress, action.questionId)
      const next = applyAnswer(prev, action.correct)
      const progress: ProgressMap = { ...state.progress, [action.questionId]: next }
      return { ...state, progress }
    }
    case 'saveResume':
      return { ...state, resume: action.resume }
    case 'readScout':
      return {
        ...state,
        scouts: state.scouts.map((s) =>
          s.id === action.scoutId ? { ...s, read: true } : s,
        ),
      }
    case 'reply': {
      const at = new Date().toISOString().slice(0, 10)
      return {
        ...state,
        scouts: state.scouts.map((s) => {
          if (s.id !== action.scoutId) return s
          const thread = [...s.thread, { from: 'me' as const, text: action.text, at }]
          // 簡易な自動返信でメッセージ体験をデモ
          const reply = autoReply(s)
          thread.push({ from: 'them' as const, text: reply, at })
          return { ...s, thread, read: true }
        }),
      }
    }
    default:
      return state
  }
}

function autoReply(scout: Scout): string {
  if (scout.sender === 'agent') {
    return 'ありがとうございます！ではまず、志望業界といつ頃から動きたいかを教えてください。あなたのクイズ達成状況に合う求人をお送りします。'
  }
  return 'ご返信ありがとうございます。では日程調整のため、来週で空いている候補日をいくつか教えていただけますか？オンラインで30分ほどを想定しています。'
}

interface AppContextValue {
  state: AppState
  login: (email: string, name: string, fromParentService: boolean) => void
  logout: () => void
  answer: (questionId: string, correct: boolean) => void
  saveResume: (resume: WebResume) => void
  readScout: (scoutId: string) => void
  reply: (scoutId: string, text: string) => void
  resumeCompleted: boolean
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, undefined, loadState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const login = useCallback((email: string, name: string, fromParentService: boolean) => {
    dispatch({ type: 'login', user: { email, name, fromParentService } })
  }, [])

  const logout = useCallback(() => {
    clearState()
    dispatch({ type: 'logout' })
  }, [])

  const answer = useCallback((questionId: string, correct: boolean) => {
    dispatch({ type: 'answer', questionId, correct })
  }, [])

  const saveResume = useCallback((resume: WebResume) => {
    dispatch({ type: 'saveResume', resume })
  }, [])

  const readScout = useCallback((scoutId: string) => {
    dispatch({ type: 'readScout', scoutId })
  }, [])

  const reply = useCallback((scoutId: string, text: string) => {
    dispatch({ type: 'reply', scoutId, text })
  }, [])

  const value = useMemo<AppContextValue>(
    () => ({
      state,
      login,
      logout,
      answer,
      saveResume,
      readScout,
      reply,
      resumeCompleted: !!state.resume?.completed,
    }),
    [state, login, logout, answer, saveResume, readScout, reply],
  )

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
