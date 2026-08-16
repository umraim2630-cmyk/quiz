import type { Question, QuestionProgress, QuizKind, Tier } from '../types'
import { TIERS, unitKey } from '../types'
import { COMPANIES } from '../data/companies'
import { QUESTIONS } from './questionGen'

/** クリア条件: 2回連続正解 */
export const CLEAR_STREAK = 2
/** 1問の回答制限時間（秒） */
export const TIME_LIMIT = 10

export type ProgressMap = Record<string, QuestionProgress>

export const emptyProgress = (): QuestionProgress => ({
  streak: 0,
  correctCount: 0,
  wrongCount: 0,
  lastWrong: false,
  cleared: false,
})

export const getProgress = (map: ProgressMap, id: string): QuestionProgress =>
  map[id] ?? emptyProgress()

/**
 * 回答結果を進捗に反映（テストモードのみ呼ばれる。練習は影響しない）。
 * 2回連続正解でクリア。間違えると連続正解数はリセットされる。
 */
export function applyAnswer(prev: QuestionProgress, correct: boolean): QuestionProgress {
  if (correct) {
    const streak = prev.streak + 1
    return {
      ...prev,
      streak,
      correctCount: prev.correctCount + 1,
      lastWrong: false,
      cleared: prev.cleared || streak >= CLEAR_STREAK,
    }
  }
  return {
    ...prev,
    streak: 0,
    wrongCount: prev.wrongCount + 1,
    lastWrong: true,
  }
}

// ------------------------------------------------------------------
// 問題の抽出
// ------------------------------------------------------------------

export const questionsOf = (kind: QuizKind, tier?: Tier, targetId?: string): Question[] =>
  QUESTIONS.filter(
    (q) => q.kind === kind && (!tier || q.tier === tier) && (!targetId || q.targetId === targetId),
  )

// ------------------------------------------------------------------
// クリア率・級の解放
// ------------------------------------------------------------------

export function clearRate(map: ProgressMap, qs: Question[]): number {
  if (qs.length === 0) return 0
  return qs.filter((q) => getProgress(map, q.id).cleared).length / qs.length
}

export const unitRate = (map: ProgressMap, kind: QuizKind, tier: Tier, targetId: string) =>
  clearRate(map, questionsOf(kind, tier, targetId))

export const tierRate = (map: ProgressMap, kind: QuizKind, tier: Tier) =>
  clearRate(map, questionsOf(kind, tier))

export const tierCleared = (map: ProgressMap, kind: QuizKind, tier: Tier) =>
  tierRate(map, kind, tier) >= 1

/** 前の級を全クリアしていないと次の級には進めない */
export function tierUnlocked(map: ProgressMap, kind: QuizKind, tier: Tier): boolean {
  const idx = TIERS.indexOf(tier)
  if (idx <= 0) return true
  return tierCleared(map, kind, TIERS[idx - 1])
}

/** 全級・全問クリアした企業（完全クリア） */
export const fullyClearedCompanies = (map: ProgressMap) =>
  COMPANIES.filter((c) => clearRate(map, questionsOf('company', undefined, c.id)) >= 1)

/** 指定した企業群の合計クリア率 */
export function combinedCompanyRate(map: ProgressMap, companyIds: string[]) {
  const qs = QUESTIONS.filter((q) => q.kind === 'company' && companyIds.includes(q.targetId))
  return { rate: clearRate(map, qs), total: qs.length, cleared: qs.filter((q) => getProgress(map, q.id).cleared).length }
}

export function overallStats(map: ProgressMap) {
  const cleared = QUESTIONS.filter((q) => getProgress(map, q.id).cleared).length
  return { cleared, total: QUESTIONS.length }
}

export const wrongCount = (map: ProgressMap, qs: Question[]) =>
  qs.filter((q) => getProgress(map, q.id).lastWrong).length

// ------------------------------------------------------------------
// セッション生成
// ------------------------------------------------------------------

export type SessionFilter = 'all' | 'wrong' | 'cleared' | 'bookmarked'

export interface SessionConfig {
  /** unit: 1つの編 / tier: 級内ごちゃまぜ / mixed: 企業・業界ごちゃまぜ / favorites: お気に入り */
  scope: 'unit' | 'tier' | 'mixed' | 'favorites'
  kind?: QuizKind
  tier?: Tier
  targetId?: string
  filter: SessionFilter
  /** 練習モード（クリア率に影響しない） */
  practice: boolean
  shuffle: boolean
}

function shuffleArr<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function buildSession(
  cfg: SessionConfig,
  map: ProgressMap,
  bookmarks: string[],
  favorites: { companies: string[]; industries: string[]; units: string[] },
): Question[] {
  let pool: Question[] = []

  if (cfg.scope === 'favorites') {
    const keys = new Set(favorites.units)
    pool = QUESTIONS.filter((q) => {
      if (!tierUnlocked(map, q.kind, q.tier)) return false
      if (keys.has(unitKey(q))) return true
      if (q.kind === 'company' && favorites.companies.includes(q.targetId)) return true
      if (q.kind === 'industry' && favorites.industries.includes(q.targetId)) return true
      return false
    })
  } else if (cfg.scope === 'mixed') {
    // 企業・業界内で、解放済みの級からごちゃまぜ
    pool = QUESTIONS.filter((q) => q.kind === cfg.kind && tierUnlocked(map, q.kind, q.tier))
    if (cfg.targetId) pool = pool.filter((q) => q.targetId === cfg.targetId)
  } else if (cfg.scope === 'tier') {
    pool = questionsOf(cfg.kind!, cfg.tier!)
  } else {
    pool = questionsOf(cfg.kind!, cfg.tier!, cfg.targetId!)
  }

  if (cfg.filter === 'wrong') pool = pool.filter((q) => getProgress(map, q.id).lastWrong)
  if (cfg.filter === 'cleared') pool = pool.filter((q) => getProgress(map, q.id).cleared)
  if (cfg.filter === 'bookmarked') pool = pool.filter((q) => bookmarks.includes(q.id))

  if (cfg.shuffle) pool = shuffleArr(pool)
  // ごちゃまぜ・お気に入りは1セッション15問まで
  if (cfg.scope === 'mixed' || cfg.scope === 'favorites') pool = pool.slice(0, 15)
  return pool
}
