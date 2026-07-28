import type { Question, QuestionProgress, QuestionType } from '../types'
import { QUESTIONS, questionsForTarget } from '../data/questions'

/** この回数、連続正解するとクリア（マスター）扱いになる */
export const CLEAR_THRESHOLD = 2

export type ProgressMap = Record<string, QuestionProgress>

export const emptyProgress = (): QuestionProgress => ({
  streak: 0,
  correctCount: 0,
  wrongCount: 0,
  lastWrong: false,
  mastered: false,
})

export const getProgress = (map: ProgressMap, id: string): QuestionProgress =>
  map[id] ?? emptyProgress()

/** 1問の回答結果を進捗に反映して新しい進捗を返す（純粋関数） */
export function applyAnswer(prev: QuestionProgress, correct: boolean): QuestionProgress {
  if (correct) {
    const streak = prev.streak + 1
    return {
      ...prev,
      streak,
      correctCount: prev.correctCount + 1,
      lastWrong: false,
      mastered: prev.mastered || streak >= CLEAR_THRESHOLD,
    }
  }
  return {
    ...prev,
    streak: 0,
    wrongCount: prev.wrongCount + 1,
    lastWrong: true,
    // 一度マスターしても間違えたら未マスターに戻し、再度クリアを求める
    mastered: false,
  }
}

/**
 * 現在の習熟度に応じて「解放されている難易度」を決める。
 * 対象内でマスターした問題の割合が上がるほど、高い難易度が解放される。
 */
export function unlockedDifficulty(map: ProgressMap, type: QuestionType, targetId: string): number {
  const qs = questionsForTarget(type, targetId)
  if (qs.length === 0) return 1
  const masteredCount = qs.filter((q) => getProgress(map, q.id).mastered).length
  const ratio = masteredCount / qs.length
  // 0% -> Lv1-2 まで, 25%+ -> Lv3, 50%+ -> Lv4, 75%+ -> Lv5
  if (ratio >= 0.75) return 5
  if (ratio >= 0.5) return 4
  if (ratio >= 0.25) return 3
  return 2
}

/** 対象の達成率（マスター済み / 全問）を 0〜1 で返す */
export function achievementRate(map: ProgressMap, type: QuestionType, targetId: string): number {
  const qs = questionsForTarget(type, targetId)
  if (qs.length === 0) return 0
  const mastered = qs.filter((q) => getProgress(map, q.id).mastered).length
  return mastered / qs.length
}

/** 全体の達成率 */
export function overallAchievement(map: ProgressMap): { mastered: number; total: number } {
  const mastered = QUESTIONS.filter((q) => getProgress(map, q.id).mastered).length
  return { mastered, total: QUESTIONS.length }
}

interface BuildOptions {
  /** 間違えた問題だけを対象にする復習モード */
  wrongOnly?: boolean
  /** 出題数の上限 */
  limit?: number
}

/**
 * 適応型に並べた出題リストを作る。
 * - 解放難易度以下の問題を対象
 * - 未マスターを優先し、難易度の低い順（易→難）で学習曲線を作る
 * - 間違えた問題を優先的に前に出す
 */
export function buildQuiz(
  map: ProgressMap,
  type: QuestionType,
  targetId: string,
  opts: BuildOptions = {},
): Question[] {
  const { wrongOnly = false, limit = 8 } = opts
  const unlocked = unlockedDifficulty(map, type, targetId)
  let pool = questionsForTarget(type, targetId).filter((q) => q.difficulty <= unlocked)

  if (wrongOnly) {
    pool = pool.filter((q) => getProgress(map, q.id).lastWrong)
  }

  const scored = pool
    .map((q) => {
      const p = getProgress(map, q.id)
      // 並び順スコア: 間違えた問題を最優先、次に未マスター、難易度は昇順
      let priority = 0
      if (p.lastWrong) priority -= 100
      if (!p.mastered) priority -= 50
      return { q, sortKey: priority + q.difficulty }
    })
    .sort((a, b) => a.sortKey - b.sortKey)
    .map((s) => s.q)

  return scored.slice(0, limit)
}

/** 全対象を横断して、間違えた問題だけの復習セットを作る */
export function buildReviewAll(map: ProgressMap, limit = 12): Question[] {
  return QUESTIONS.filter((q) => getProgress(map, q.id).lastWrong)
    .sort((a, b) => a.difficulty - b.difficulty)
    .slice(0, limit)
}

/** 間違えた問題（復習キュー）の全件数 */
export function wrongQueueCount(map: ProgressMap, type?: QuestionType, targetId?: string): number {
  let qs = QUESTIONS
  if (type && targetId) qs = questionsForTarget(type, targetId)
  return qs.filter((q) => getProgress(map, q.id).lastWrong).length
}

/** 対象の収録問題数 */
export const questionCountFor = (type: QuestionType, targetId: string): number =>
  questionsForTarget(type, targetId).length

/** 難易度ラベル */
export const difficultyLabel = (d: number): string =>
  ['', '入門', '基礎', '標準', '応用（財務）', '難関（財務）'][d] ?? `Lv${d}`
