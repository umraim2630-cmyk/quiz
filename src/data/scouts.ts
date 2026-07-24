import type { Scout } from '../types'

/** ログイン時に付与されるサンプルのスカウト。実サービスでは企業/エージェントの操作で届く。 */
export const seedScouts = (): Scout[] => [
  {
    id: 'scout-cloudnova',
    sender: 'company',
    companyId: 'cloudnova',
    senderName: 'クラウドノヴァ株式会社 採用チーム',
    role: 'プロダクト企画（新卒）',
    message:
      'クイズでの当社カルチャー理解度が高く、ぜひ一度お話ししたくご連絡しました。若手裁量の大きい環境に関心をお持ちでしたら、カジュアル面談はいかがでしょうか？',
    receivedAt: '2026-07-20',
    read: false,
    thread: [],
  },
  {
    id: 'scout-apex',
    sender: 'company',
    companyId: 'apex',
    senderName: 'エイペックス・コンサルティング 新卒採用',
    role: 'ビジネスアナリスト',
    message:
      '業界研究クイズの成績を拝見しました。成長環境を重視される方に当社は合うと考えています。選考直結ではないラフな面談から始めませんか？',
    receivedAt: '2026-07-18',
    read: false,
    thread: [],
  },
  {
    id: 'scout-agent-1',
    sender: 'agent',
    senderName: 'キャリアエージェント 田村',
    role: '就活エージェント',
    message:
      'はじめまして、新卒領域担当の田村です。あなたのクイズ達成状況から、相性の良さそうな企業を数社ご紹介できます。まずは希望条件を伺えればと思います。',
    receivedAt: '2026-07-15',
    read: false,
    thread: [],
  },
]
