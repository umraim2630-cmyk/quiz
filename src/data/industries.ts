import type { Industry } from '../types'

export const INDUSTRIES: Industry[] = [
  {
    id: 'it',
    name: 'IT・ソフトウェア',
    emoji: '💻',
    overview:
      'SaaS・クラウド・AIを中心に成長を続ける産業。受託開発から自社プロダクトへのシフトが進み、リカーリング型のビジネスモデルが評価される。',
    marketSizeCho: 30.5,
    growthRate: 6.8,
    keywords: ['SaaS', 'クラウド', '生成AI', 'DX', 'リカーリング'],
  },
  {
    id: 'finance',
    name: '金融・保険',
    emoji: '🏦',
    overview:
      '銀行・証券・保険を核とする産業。低金利環境からの転換、フィンテック連携、手数料ビジネスから資産運用ビジネスへの構造転換が論点。',
    marketSizeCho: 95.2,
    growthRate: 2.1,
    keywords: ['フィンテック', '資産運用', 'ROE', '与信', '規制'],
  },
  {
    id: 'consumer',
    name: '消費財・小売',
    emoji: '🛒',
    overview:
      'メーカーと小売が連携し、EC化・OMO・ブランド価値の最大化が競争軸。原材料高と価格転嫁、在庫回転率の管理が収益を左右する。',
    marketSizeCho: 145.0,
    growthRate: 1.4,
    keywords: ['EC化率', 'OMO', 'PB', '在庫回転', '価格転嫁'],
  },
  {
    id: 'manufacturing',
    name: '製造・自動車',
    emoji: '🏭',
    overview:
      '電動化(EV)・自動運転・サプライチェーン再編が進む。設備投資と研究開発の重さ、為替感応度の高さが特徴で、営業利益率の水準が企業体力を映す。',
    marketSizeCho: 320.0,
    growthRate: 0.9,
    keywords: ['EV', 'サプライチェーン', '為替', '設備投資', 'カーボンニュートラル'],
  },
  {
    id: 'consulting',
    name: 'コンサル・専門サービス',
    emoji: '📊',
    overview:
      '戦略・IT・人事など高付加価値の助言業。人材が最大の資産で、稼働率(Utilization)と単価が収益構造を決める。DX需要で市場は拡大基調。',
    marketSizeCho: 8.7,
    growthRate: 9.5,
    keywords: ['稼働率', 'DX案件', 'ファーム', 'アップオアアウト', '単価'],
  },
]

export const industryById = (id: string) => INDUSTRIES.find((i) => i.id === id)
