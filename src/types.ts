// ------------------------------------------------------------------
// ドメイン型定義（企業研究クイズアプリ）
// ------------------------------------------------------------------

/** 難易度（級） */
export type Tier = 'beginner' | 'intermediate' | 'advanced'
export const TIERS: Tier[] = ['beginner', 'intermediate', 'advanced']
export const TIER_LABELS: Record<Tier, string> = {
  beginner: '初級',
  intermediate: '中級',
  advanced: '上級',
}

export type QuizKind = 'company' | 'industry'

/**
 * 企業マスタ。
 * 本番では外部サービスのAPIから上場企業全社を取得する想定
 * （プレビューではサンプル5社を data/companies.ts に同梱）。
 */
export interface Company {
  id: string
  name: string
  /** 検索用の読み仮名 */
  kana: string
  ticker: string
  industryId: string
  monogram: string
  color: string
  hq: string
  founded: number
  fiscal: string
  business: string
  brands: string[]
  segments: string[]
  model: string
  rivals: string[]
  strength: string
  topic: string
  revenueOku: number
  profitOku: number
  growthPct: number
  employees: number
  revLabel: string
  profLabel: string
}

/** 業界マスタ */
export interface Industry {
  id: string
  name: string
  /** 検索用の読み仮名 */
  kana: string
  icon: string
  color: string
  majors: string[]
  nonMajor: string
  sizeText: string
  sizeChoices: string[]
  model: string
  kpi: string
  kpiDef: string
  trend: string
  challenge: string
  terms: { w: string; d: string }[]
  sizeRank: number
  rep: {
    name: string
    revenueOku: number
    profitOku: number
    employees: number
    fiscal: string
    growthPct: number
    revLabel: string
    profLabel: string
  }
}

/** クイズの編（ユニット）。企業クイズ=1企業1編 / 業界クイズ=1業界1編 */
export interface Unit {
  kind: QuizKind
  tier: Tier
  targetId: string
  title: string
}

export const unitKey = (u: { kind: QuizKind; tier: Tier; targetId: string }) =>
  `${u.kind}:${u.tier}:${u.targetId}`

export interface Question {
  id: string
  kind: QuizKind
  tier: Tier
  targetId: string
  prompt: string
  choices: string[]
  answerIndex: number
  explanation: string
}

// ------------------------------------------------------------------
// 学習進捗
// ------------------------------------------------------------------

/** 1問ごとの学習状態（テストモードのみ更新。練習は影響しない） */
export interface QuestionProgress {
  /** 連続正解数。2回連続正解でクリア。間違えるとリセット */
  streak: number
  correctCount: number
  wrongCount: number
  lastWrong: boolean
  cleared: boolean
}

// ------------------------------------------------------------------
// アカウント・課金
// ------------------------------------------------------------------

export interface User {
  email: string
  name: string
}

export interface Subscription {
  active: boolean
  /** 契約開始日 (ISO) */
  since: string | null
  /** 次回請求日 (ISO) */
  nextBilling: string | null
}

export const PLAN_PRICE = 980
