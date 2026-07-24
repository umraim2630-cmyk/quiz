import type { Industry } from '../types'

// 市場規模・成長率は公的統計・調査会社の公表値に基づく概数。
export const INDUSTRIES: Industry[] = [
  {
    id: 'it',
    name: 'IT・ソフトウェア',
    icon: 'laptop',
    color: '#4f46e5',
    overview:
      'SIer・SaaS・クラウド・AIを中心に拡大する産業。国内IT市場は約25兆円規模と推計され、DX需要を背景に安定成長が続く。受託開発（SI）と自社プロダクト（SaaS）では、収益構造もカルチャーも大きく異なるのが企業選びのポイント。',
    marketSizeCho: 25.0,
    growthRate: 5.0,
    keywords: ['SI', 'SaaS', 'クラウド', '生成AI', 'DX'],
  },
  {
    id: 'finance',
    name: '金融・保険',
    icon: 'landmark',
    color: '#0e9f6e',
    overview:
      '銀行・証券・保険を核とする産業（金融・保険業の名目GDPは約23兆円）。日銀のマイナス金利解除で「金利ある世界」に転換し、3メガバンクは過去最高益を更新。資産運用ビジネスの強化とフィンテック連携が次の論点。',
    marketSizeCho: 23.0,
    growthRate: 2.0,
    keywords: ['金利ある世界', '利ざや', '資産運用', 'フィンテック', '与信'],
  },
  {
    id: 'consumer',
    name: '消費財・小売',
    icon: 'cart',
    color: '#e05d38',
    overview:
      '国内小売販売額は年間約163兆円（2023年・経済産業省）。EC化・OMO、PB強化、価格転嫁が競争軸で、物販のEC化率は約9%とまだ拡大余地が大きい。製造小売（SPA）のように利益構造を変えるモデルにも注目。',
    marketSizeCho: 163.0,
    growthRate: 2.2,
    keywords: ['EC化率', 'OMO', 'PB', 'SPA', '在庫回転'],
  },
  {
    id: 'manufacturing',
    name: '製造・自動車',
    icon: 'factory',
    color: '#0284c7',
    overview:
      '自動車は日本の基幹産業で、関連産業の就業人口は約550万人。電動化（EV・HV）、自動運転、サプライチェーン強靭化への巨額投資が進む。輸出比率が高く、為替感応度の高さが業績を大きく左右する。',
    marketSizeCho: 70.0,
    growthRate: 1.0,
    keywords: ['EV・HV', 'マルチパスウェイ', 'サプライチェーン', '為替感応度', 'カーボンニュートラル'],
  },
  {
    id: 'consulting',
    name: 'コンサル・専門サービス',
    icon: 'chart',
    color: '#8b5cf6',
    overview:
      '戦略立案からDX実行支援までを担う高付加価値サービス業。国内コンサルティング市場は1兆円超と推計され、年10%前後の高成長が続く。人が資産のビジネスで、「人数×稼働率×単価」が収益構造を決める。',
    marketSizeCho: 1.2,
    growthRate: 10.0,
    keywords: ['稼働率', '単価', 'DX案件', 'ワンプール', 'アップオアアウト'],
  },
]

export const industryById = (id: string) => INDUSTRIES.find((i) => i.id === id)
