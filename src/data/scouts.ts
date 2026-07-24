import type { Scout } from '../types'

/**
 * ログイン時に付与されるサンプルのスカウト（デモ用）。
 * 実サービスでは、クイズ達成状況をシグナルに企業・エージェントが送信する想定。
 */
export const seedScouts = (): Scout[] => [
  {
    id: 'scout-nttdata',
    sender: 'company',
    companyId: 'nttdata',
    senderName: 'NTTデータグループ 新卒採用チーム',
    role: 'ITコンサルタント / SE（新卒）',
    message:
      'IT業界クイズでの達成度と、当社の企業研究の進み具合を拝見してご連絡しました。社会インフラ級の大規模プロジェクトに興味をお持ちでしたら、まずはオンラインのカジュアル面談でお話ししませんか？',
    receivedAt: '2026-07-20',
    read: false,
    thread: [],
  },
  {
    id: 'scout-baycurrent',
    sender: 'company',
    companyId: 'baycurrent',
    senderName: 'ベイカレント 採用担当',
    role: 'コンサルタント（新卒）',
    message:
      'コンサル業界の財務データ問題まで到達されている点に注目しました。成長スピードと実力主義の環境を重視される方に、当社のワンプール制は多様な経験を積める良い環境だと考えています。選考直結ではない面談から始めませんか？',
    receivedAt: '2026-07-18',
    read: false,
    thread: [],
  },
  {
    id: 'scout-agent-1',
    sender: 'agent',
    senderName: 'キャリアエージェント 田村',
    role: '新卒紹介エージェント',
    message:
      'はじめまして、新卒領域担当の田村です。クイズの達成状況から、業界理解がしっかり進んでいる印象を受けました。志望業界の整理と、相性の良い企業のご紹介ができます。まずは希望条件を教えてください。',
    receivedAt: '2026-07-15',
    read: false,
    thread: [],
  },
]
