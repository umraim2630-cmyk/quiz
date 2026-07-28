import type { Company } from '../types'

// ------------------------------------------------------------------
// コンサルティングファーム6社の企業研究データ
// - 財務データ: 各社公表の決算発表資料に基づく概数
//   ベイカレント: 2025年2月期 / 野村総合研究所・シグマクシスHD・タナベCG: 2025年3月期
//   船井総研HD: 2024年12月期 / アクセンチュア: FY2025(2025年8月期・米ドル決算)
// - ロゴ: 仮ロゴ（ブランドカラーのモノグラム）
// - 口コミサマリー・スコア: プロトタイプ用のサンプルデータ
// ------------------------------------------------------------------
export const COMPANIES: Company[] = [
  {
    id: 'baycurrent',
    name: 'ベイカレント',
    segment: '総合系（日系）',
    monogram: 'BC',
    logoColor: '#0f4c81',
    tagline: '戦略からDX実行まで、営業利益率37%の日系総合ファーム',
    employees: 5467,
    founded: 1998,
    revenueOku: 1161,
    operatingProfitOku: 426,
    fiscalLabel: '2025年2月期',
    insight: {
      reviewCount: 3120,
      overall: 3.9,
      summary:
        '3,120件の口コミによれば、最大の魅力は「成長スピードの速さ」と「20〜30代からの高い報酬水準」です。業界・テーマで部門を分けないワンプール制により、若いうちから多様な案件を経験できる点も支持されています。一方で、プロジェクトによって稼働の波が大きいこと、実力主義ゆえのプレッシャー、配属案件次第で得られる経験に差が出ることが課題として語られています。',
      positives: ['成長スピードが速い', '報酬水準が高い', 'ワンプール制で多様な案件を経験', '優秀な人材が集まる'],
      negatives: ['プロジェクトにより稼働の波が大きい', '実力主義のプレッシャー', '配属案件次第で経験に差'],
      scores: { engagement: 80, culture: 68, workLife: 55, growth: 90, compensation: 92, stability: 72 },
    },
  },
  {
    id: 'nri',
    name: '野村総合研究所',
    segment: 'シンクタンク系',
    monogram: 'NRI',
    logoColor: '#1a3a6b',
    tagline: 'コンサルティングとITソリューションの両輪を持つ日本最大級のシンクタンク',
    employees: 16679,
    founded: 1965,
    revenueOku: 7648,
    operatingProfitOku: 1349,
    fiscalLabel: '2025年3月期',
    revenueLabel: '売上収益',
    insight: {
      reviewCount: 4820,
      overall: 4.0,
      summary:
        '4,820件の口コミでは、「給与水準の高さ」「優秀な同僚」「安定した経営基盤」への評価が際立ちます。官公庁・大手企業の大型案件に関われる点も働きがいにつながっています。一方で、大企業的な稟議・調整の多さ、コンサルティング部門とITソリューション部門で業務・カルチャーが大きく異なる点、年功的な側面が残る点が指摘されています。',
      positives: ['給与水準が高い', '優秀な同僚と働ける', '安定した経営基盤', '官公庁・大手の大型案件'],
      negatives: ['大企業的な稟議・調整の多さ', '部門により業務・文化が大きく異なる', '年功的な側面が残る'],
      scores: { engagement: 74, culture: 70, workLife: 72, growth: 74, compensation: 88, stability: 90 },
    },
  },
  {
    id: 'accenture',
    name: 'アクセンチュア',
    segment: '総合系（外資）',
    monogram: 'ACN',
    logoColor: '#a100ff',
    tagline: '従業員約78.6万人、世界最大級の総合コンサルティング企業',
    employees: 786000,
    founded: 1989,
    revenueOku: 104400,
    operatingProfitOku: 15300,
    fiscalLabel: 'FY2025（2025年8月期）・米ドル決算を1ドル150円で換算',
    revenueLabel: '売上高（円換算）',
    profitLabel: '営業利益（円換算）',
    insight: {
      reviewCount: 18450,
      overall: 3.9,
      summary:
        '18,450件の口コミでは、「研修・学習環境の充実」「グローバル案件とキャリア機会の豊富さ」が高く評価されています。働き方改革の推進により労働環境が大きく改善した、という声も特徴的です。一方で、プロジェクトによる稼働の波、急速な組織拡大に伴うカルチャーの変化、評価やアサインがプロジェクト・上司に左右されやすい点が課題として挙がります。',
      positives: ['研修・学習環境が充実', 'グローバル案件とキャリア機会', '働き方改革で労働環境が改善', '多様な人材とプロフェッショナル文化'],
      negatives: ['プロジェクトによる稼働の波', '組織拡大でカルチャーが変化', '評価・アサインが配属に左右されやすい'],
      scores: { engagement: 76, culture: 72, workLife: 64, growth: 86, compensation: 78, stability: 80 },
    },
  },
  {
    id: 'sigmaxyz',
    name: 'シグマクシス',
    segment: '総合系（独立系）',
    monogram: 'SX',
    logoColor: '#c02d4c',
    tagline: '少数精鋭・約800名で過去最高益を更新する独立系ファーム',
    employees: 800,
    founded: 2008,
    revenueOku: 263,
    operatingProfitOku: 56,
    fiscalLabel: '2025年3月期',
    insight: {
      reviewCount: 640,
      overall: 3.8,
      summary:
        '640件の口コミでは、「少数精鋭ゆえの裁量の大きさ」「業界を限定しない多様な案件」「フラットな組織文化」が評価されています。高単価案件に若手から関われる点も魅力です。一方で、大手と比べたブランド認知の途上感、個人の力量への依存度の高さ、教育は自走が前提となる点が、合う・合わないの分かれ目として語られています。',
      positives: ['少数精鋭で裁量が大きい', '業界を限定しない多様な案件', 'フラットな組織文化', '高単価案件に若手から関われる'],
      negatives: ['ブランド認知は発展途上', '個人の力量への依存が大きい', '教育は自走が前提'],
      scores: { engagement: 78, culture: 72, workLife: 62, growth: 82, compensation: 80, stability: 68 },
    },
  },
  {
    id: 'funai',
    name: '船井総研ホールディングス',
    segment: '中堅・中小企業特化',
    monogram: 'F',
    logoColor: '#b3541e',
    tagline: '業種特化×月次支援で中小企業を支える経営コンサル最大手級',
    employees: 1535,
    founded: 1970,
    revenueOku: 306,
    operatingProfitOku: 83,
    fiscalLabel: '2024年12月期',
    insight: {
      reviewCount: 2180,
      overall: 3.6,
      summary:
        '2,180件の口コミでは、「若手のうちから中小企業の経営者と直接向き合える」「成果が数字で見える」点が成長実感につながっています。住宅・医療・士業など業種特化の専門性が身につく点も特徴です。一方で、クライアント訪問による移動の多さ、成果主義のプレッシャー、案件・時期による労働時間の波が課題として挙がります。',
      positives: ['若手から経営者と直接仕事', '成果が数字で見える', '業種特化の専門性が身につく', '成長機会が多い'],
      negatives: ['クライアント訪問で移動が多い', '成果主義のプレッシャー', '時期による労働時間の波'],
      scores: { engagement: 74, culture: 66, workLife: 58, growth: 84, compensation: 72, stability: 74 },
    },
  },
  {
    id: 'tanabe',
    name: 'タナベコンサルティンググループ',
    segment: '中堅・中小企業特化',
    monogram: 'TCG',
    logoColor: '#146c60',
    tagline: '1957年創業、日本の経営コンサルティングの草分け',
    employees: 711,
    founded: 1957,
    revenueOku: 145,
    operatingProfitOku: 15,
    fiscalLabel: '2025年3月期',
    insight: {
      reviewCount: 890,
      overall: 3.5,
      summary:
        '890件の口コミでは、「中堅企業の経営層と直接仕事ができる」「チームで支援する文化」「歴史あるブランドと教育体系」が評価されています。一方で、伝統的なカルチャーが残る点、給与は等級・成果に依存する点、社内のデジタル化は道半ばという声が課題として挙がっています。落ち着いた環境で経営コンサルの王道を学びたい人に支持されています。',
      positives: ['中堅企業の経営層と直接仕事', 'チームで支援する文化', '歴史あるブランド', '教育体系が整っている'],
      negatives: ['伝統的なカルチャーが残る', '給与は等級・成果に依存', '社内のデジタル化は道半ば'],
      scores: { engagement: 68, culture: 64, workLife: 66, growth: 72, compensation: 64, stability: 76 },
    },
  },
]

export const companyById = (id: string) => COMPANIES.find((c) => c.id === id)
