// ------------------------------------------------------------------
// ドメイン型定義
// ------------------------------------------------------------------

/** 口コミから算出した内部分析スコア（0〜100） */
export interface KuchikomiScores {
  /** 働きがい */
  engagement: number
  /** 組織文化 */
  culture: number
  /** 働きやすさ */
  workLife: number
  /** 成長環境 */
  growth: number
  /** 待遇・給与 */
  compensation: number
  /** 経営の安定性・将来性 */
  stability: number
}

export const SCORE_LABELS: Record<keyof KuchikomiScores, string> = {
  engagement: '働きがい',
  culture: '組織文化',
  workLife: '働きやすさ',
  growth: '成長環境',
  compensation: '待遇・給与',
  stability: '安定性・将来性',
}

/** 口コミ由来の内部分析データ */
export interface KuchikomiInsight {
  /** 集計対象の口コミ件数 */
  reviewCount: number
  /** AIによる要約サマリー */
  summary: string
  /** 良い点として頻出したトピック */
  positives: string[]
  /** 課題として頻出したトピック */
  negatives: string[]
  scores: KuchikomiScores
  /** 総合スコア（0〜5.0） */
  overall: number
}

export interface Company {
  id: string
  name: string
  /** ファームの分類（例: 総合系（日系）, シンクタンク系） */
  segment: string
  /** 仮ロゴ用モノグラム（例: BC, NRI） */
  monogram: string
  logoColor: string
  tagline: string
  /** 外部情報（各社公表の決算資料に基づく概数） */
  employees: number
  founded: number
  revenueOku: number // 売上高（億円）
  operatingProfitOku: number // 営業利益（億円）
  /** 決算期の表示（例: 2025年3月期） */
  fiscalLabel: string
  /** 「売上高」に相当する項目名の上書き（例: 銀行の「経常収益」） */
  revenueLabel?: string
  /** 「営業利益」に相当する項目名の上書き（例: 銀行の「経常利益」） */
  profitLabel?: string
  /** 口コミ由来の内部分析（プロトタイプ用サンプルデータ） */
  insight: KuchikomiInsight
}

export interface Industry {
  id: string
  name: string
  /** SVGアイコン名（components/Icon.tsx） */
  icon: string
  /** テーマカラー */
  color: string
  /** カード用の一行サブタイトル */
  subtitle: string
  overview: string
  keywords: string[]
}

export type QuestionType = 'company' | 'industry'

export interface Question {
  id: string
  type: QuestionType
  /** company の場合は companyId、industry の場合は industryId */
  targetId: string
  /** 1(易) 〜 5(難)。4以上は財務情報等を題材にする */
  difficulty: number
  /** 財務データを題材にした設問か */
  financial?: boolean
  prompt: string
  choices: string[]
  answerIndex: number
  explanation: string
  /** 出典（決算短信・説明資料など） */
  source?: string
}

// ------------------------------------------------------------------
// 学習進捗
// ------------------------------------------------------------------

/** 1問ごとの学習状態 */
export interface QuestionProgress {
  /** 連続正解数。CLEAR_THRESHOLD 回でクリア（マスター）となる */
  streak: number
  correctCount: number
  wrongCount: number
  /** 直近で不正解だったか（間違えた問題だけ復習に使う） */
  lastWrong: boolean
  mastered: boolean
}

export interface WebResume {
  fullName: string
  university: string
  graduationYear: string
  major: string
  desiredIndustries: string[]
  selfPr: string
  completed: boolean
}

export type ScoutSender = 'company' | 'agent'

export interface Message {
  from: 'me' | 'them'
  text: string
  at: string
}

export interface Scout {
  id: string
  sender: ScoutSender
  /** 企業スカウトの場合の企業ID */
  companyId?: string
  senderName: string
  role: string
  message: string
  receivedAt: string
  read: boolean
  thread: Message[]
}

export interface User {
  email: string
  name: string
  /** 本体サービス（口コミ本体）で登録済みかどうか */
  fromParentService: boolean
}
