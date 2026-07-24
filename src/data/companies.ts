import type { Company } from '../types'

// 注: 企業データはプロダクトコンセプト提示用のダミーです。実在の企業とは関係ありません。
export const COMPANIES: Company[] = [
  {
    id: 'cloudnova',
    name: 'クラウドノヴァ株式会社',
    industryId: 'it',
    logoColor: '#4f7cff',
    tagline: '中堅企業向けSaaSで国内トップシェアを狙う',
    employees: 1240,
    founded: 2011,
    revenueOku: 385,
    operatingProfitOku: 62,
    insight: {
      reviewCount: 3820,
      overall: 4.1,
      summary:
        '3,820件の口コミを分析した結果、「裁量の大きさ」と「プロダクトへの誇り」が満足度を牽引しています。若手でも上流を任される文化が働きがいの高さにつながる一方、急拡大に伴う組織の未整備・評価基準の不透明さへの不満が一定数見られます。給与水準は業界平均をやや上回るものの、成果に対する反映速度に課題を指摘する声が目立ちます。',
      positives: ['若手でも裁量が大きい', 'リモート/フレックスが浸透', 'プロダクトの社会的意義', '優秀な同僚から学べる'],
      negatives: ['評価基準が不透明', '急成長で制度が追いついていない', '一部部署の残業が多い'],
      scores: { engagement: 82, culture: 74, workLife: 71, growth: 85, compensation: 68, stability: 76 },
    },
  },
  {
    id: 'meridian',
    name: 'メリディアン銀行',
    industryId: 'finance',
    logoColor: '#137a5e',
    tagline: '伝統と安定、リテール金融のリーディングバンク',
    employees: 18400,
    founded: 1948,
    revenueOku: 9200,
    operatingProfitOku: 1850,
    insight: {
      reviewCount: 7410,
      overall: 3.4,
      summary:
        '7,410件の口コミから、圧倒的な「雇用の安定性」と「充実した研修・福利厚生」が評価の柱であることが分かります。一方で年功序列の色が濃く、若手の成長実感や裁量の小ささ、意思決定の遅さに対する不満が中心的な課題です。近年はDX推進で働き方改革が進みつつあるものの、支店と本部で体験に大きな差があるとの声が多数を占めます。',
      positives: ['雇用が安定している', '研修・福利厚生が手厚い', '社会的信用が高い', 'コンプライアンスが徹底'],
      negatives: ['年功序列で昇進が遅い', '意思決定が遅い', '若手の裁量が小さい', '部署間の異動が読めない'],
      scores: { engagement: 58, culture: 60, workLife: 72, growth: 55, compensation: 74, stability: 92 },
    },
  },
  {
    id: 'greenmart',
    name: 'グリーンマート',
    industryId: 'consumer',
    logoColor: '#2f9e44',
    tagline: '全国1,200店舗、生活を支える食品小売チェーン',
    employees: 26800,
    founded: 1974,
    revenueOku: 6400,
    operatingProfitOku: 210,
    insight: {
      reviewCount: 5290,
      overall: 3.1,
      summary:
        '5,290件の口コミでは、「早期から店舗マネジメントを経験できる」点が成長環境として評価されています。反面、小売業特有のシフト勤務・休日の取りづらさ、本部と現場の温度差、薄利構造ゆえの給与の伸び悩みが満足度を押し下げています。近年はEC・PB強化で収益構造の改善を進めており、企画・バイヤー職の魅力は高まっています。',
      positives: ['若くして店長を経験できる', '実店舗の現場力が身につく', '地域に根ざした安定基盤', '福利厚生（社割）'],
      negatives: ['シフト勤務で休みが不規則', '給与水準が低め', '本部と店舗の意識差', '体力的にきつい時期がある'],
      scores: { engagement: 62, culture: 58, workLife: 52, growth: 66, compensation: 54, stability: 78 },
    },
  },
  {
    id: 'tsuzuki',
    name: '続木重工',
    industryId: 'manufacturing',
    logoColor: '#d9480f',
    tagline: 'EVシフトを牽引する精密機械・部品メーカー',
    employees: 32100,
    founded: 1936,
    revenueOku: 14200,
    operatingProfitOku: 1120,
    insight: {
      reviewCount: 6130,
      overall: 3.6,
      summary:
        '6,130件の口コミから、「ものづくりの技術力」と「腰を据えて働ける安定感」が強みとして浮かびます。EV領域への大型投資により成長期待は高いものの、大企業特有の縦割り・スピード感の欠如、地方勤務や転勤の多さがワークライフ面の課題です。技術者への裁量と教育体制の厚さは高く評価されています。',
      positives: ['技術力・開発環境が充実', '腰を据えて技術を磨ける', '福利厚生・寮制度', 'EV分野の成長投資'],
      negatives: ['縦割りで調整が多い', '転勤・地方勤務がある', '意思決定に時間がかかる', '給与の頭打ち感'],
      scores: { engagement: 68, culture: 64, workLife: 66, growth: 70, compensation: 71, stability: 84 },
    },
  },
  {
    id: 'apex',
    name: 'エイペックス・コンサルティング',
    industryId: 'consulting',
    logoColor: '#7048e8',
    tagline: '戦略からDX実装まで、成長企業の変革を伴走',
    employees: 2100,
    founded: 2004,
    revenueOku: 520,
    operatingProfitOku: 98,
    insight: {
      reviewCount: 2980,
      overall: 3.9,
      summary:
        '2,980件の口コミによれば、「圧倒的な成長スピード」と「20代での高い報酬」が最大の魅力です。優秀な同僚と難易度の高い課題に挑める一方、稼働の波が大きくプロジェクト次第でワークライフが激変する点、アップオアアウト的な緊張感がストレス要因として挙がります。裁量と市場価値の向上を重視する人に強く支持されています。',
      positives: ['成長スピードが速い', '20代で高報酬', '優秀な人材が多い', '市場価値が上がる'],
      negatives: ['繁忙期は激務', 'プロジェクトで環境が激変', 'プレッシャーが大きい', '長期の腰を据えた開発は少ない'],
      scores: { engagement: 84, culture: 70, workLife: 48, growth: 92, compensation: 86, stability: 66 },
    },
  },
]

export const companyById = (id: string) => COMPANIES.find((c) => c.id === id)
export const companiesByIndustry = (industryId: string) =>
  COMPANIES.filter((c) => c.industryId === industryId)
