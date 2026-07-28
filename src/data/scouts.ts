import type { Scout } from '../types'

/**
 * ログイン時に付与されるサンプルのスカウト（デモ用）。
 * 実サービスでは、クイズ達成状況をシグナルに企業・エージェントが送信する想定。
 */
export const seedScouts = (): Scout[] => [
  {
    id: 'scout-baycurrent',
    sender: 'company',
    companyId: 'baycurrent',
    senderName: 'ベイカレント 採用担当',
    role: 'コンサルタント（新卒）',
    message:
      'コンサル業界の決算データ問題まで到達されている点に注目しました。成長スピードと実力主義の環境を重視される方に、当社のワンプール制は多様な経験を積める良い環境だと考えています。選考直結ではない面談から始めませんか？',
    receivedAt: '2026-07-20',
    read: false,
    thread: [],
  },
  {
    id: 'scout-funai',
    sender: 'company',
    companyId: 'funai',
    senderName: '船井総研 新卒採用チーム',
    role: '経営コンサルタント（新卒）',
    message:
      '業界研究クイズの達成度を拝見しました。「若手から経営者と直接向き合う」働き方に関心があれば、現場コンサルタントとの座談会にご招待します。中小企業の経営支援のリアルをお話しできます。',
    receivedAt: '2026-07-18',
    read: false,
    thread: [],
  },
  {
    id: 'scout-agent-1',
    sender: 'agent',
    senderName: 'キャリアエージェント 田村',
    role: 'コンサル業界特化エージェント',
    message:
      'はじめまして、コンサル業界担当の田村です。クイズの達成状況から、ファームごとの違い（総合系・シンクタンク系・特化型）の理解が進んでいる印象です。ケース面接対策と、志向に合うファームのご紹介ができます。まずは志望領域を教えてください。',
    receivedAt: '2026-07-15',
    read: false,
    thread: [],
  },
]
