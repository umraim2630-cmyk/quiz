import type { Company } from '../types'

// ------------------------------------------------------------------
// 実在企業の企業研究データ
// - 財務データ: 各社公表の決算資料に基づく概数
//   (トヨタ/NTTデータ/三菱UFJ: 2025年3月期, ファーストリテイリング: 2025年8月期,
//    ベイカレント: 2025年2月期)
// - 口コミサマリー・スコア: プロトタイプ用のサンプルデータ
//   (実サービスでは口コミ本体のデータベースから集計・要約する想定)
// ------------------------------------------------------------------
export const COMPANIES: Company[] = [
  {
    id: 'nttdata',
    name: 'NTTデータグループ',
    industryId: 'it',
    logoColor: '#1d6fd1',
    tagline: '官公庁・金融の社会インフラを支える国内最大級のSIer',
    employees: 197800,
    founded: 1988,
    revenueOku: 46387,
    operatingProfitOku: 3239,
    fiscalLabel: '2025年3月期',
    revenueLabel: '売上収益',
    insight: {
      reviewCount: 8460,
      overall: 3.7,
      summary:
        '8,460件の口コミを分析した結果、「研修・教育制度の充実」と「社会インフラを支える大規模案件に関われる誇り」が満足度の柱です。リモートワークの浸透や残業管理の徹底など働きやすさの評価も高水準。一方で、大組織ゆえの社内調整の多さ・意思決定の遅さ、若手のうちは協力会社のマネジメントが中心で自ら手を動かす機会が少ない、といった声が課題として挙がっています。',
      positives: ['研修・教育制度が充実', '社会インフラ級の大規模案件', 'リモートワークが浸透', '雇用が安定している'],
      negatives: ['社内調整が多く意思決定が遅め', '若手は管理業務が中心になりがち', '年功的な昇進運用が残る'],
      scores: { engagement: 68, culture: 66, workLife: 78, growth: 68, compensation: 70, stability: 88 },
    },
  },
  {
    id: 'mufg',
    name: '三菱UFJフィナンシャル・グループ',
    industryId: 'finance',
    logoColor: '#c2113a',
    tagline: '国内最大の総合金融グループ、「金利ある世界」で最高益を更新',
    employees: 156253,
    founded: 2005,
    revenueOku: 136299,
    operatingProfitOku: 26694,
    fiscalLabel: '2025年3月期',
    revenueLabel: '経常収益',
    profitLabel: '経常利益',
    insight: {
      reviewCount: 12840,
      overall: 3.5,
      summary:
        '12,840件の口コミでは、「雇用の安定」「社会的信用」「研修・福利厚生の手厚さ」が評価の中心です。マイナス金利解除後の収益改善を背景に、処遇改善への期待も語られています。一方で、年功序列的な昇進運用、配属・転勤の不透明さ、支店と本部での働き方の差が、繰り返し指摘される課題です。',
      positives: ['雇用の安定と社会的信用', '研修・福利厚生が手厚い', '大型・グローバル案件に関われる', 'コンプライアンスが徹底'],
      negatives: ['年功序列的な昇進運用', '配属・転勤が読みにくい', '支店と本部で働き方に差'],
      scores: { engagement: 62, culture: 62, workLife: 70, growth: 62, compensation: 78, stability: 94 },
    },
  },
  {
    id: 'fastretailing',
    name: 'ファーストリテイリング',
    industryId: 'consumer',
    logoColor: '#e0261c',
    tagline: 'ユニクロ・ジーユーを展開する世界的アパレルSPA',
    employees: 59522,
    founded: 1963,
    revenueOku: 34005,
    operatingProfitOku: 5450,
    fiscalLabel: '2025年8月期',
    revenueLabel: '売上収益',
    insight: {
      reviewCount: 9310,
      overall: 3.8,
      summary:
        '9,310件の口コミからは、「若手への大胆な権限委譲」と「グローバルで通用する経営視点が鍛えられる環境」への評価が突出しています。給与水準も小売業界では高めです。一方で、数字と成果への要求水準の高さ、店舗勤務の体力的負荷、企業理念への強いコミットメントが求められる点は、合う・合わないが分かれるポイントとして語られています。',
      positives: ['若手にも大きな裁量と登用機会', '経営者視点が鍛えられる', 'グローバルなキャリア機会', '小売業界では高い給与水準'],
      negatives: ['成果への要求水準が高い', '店舗勤務は体力的負荷が大きい', '理念への強いコミットが求められる'],
      scores: { engagement: 76, culture: 70, workLife: 58, growth: 88, compensation: 80, stability: 82 },
    },
  },
  {
    id: 'toyota',
    name: 'トヨタ自動車',
    industryId: 'manufacturing',
    logoColor: '#d92b2b',
    tagline: '世界販売1,000万台超、日本最大の自動車メーカー',
    employees: 383853,
    founded: 1937,
    revenueOku: 480367,
    operatingProfitOku: 47955,
    fiscalLabel: '2025年3月期',
    revenueLabel: '営業収益',
    insight: {
      reviewCount: 15620,
      overall: 4.0,
      summary:
        '15,620件の口コミでは、「カイゼン文化と現場力」「雇用の安定と手厚い待遇・福利厚生」への評価が非常に高く、教育・育成体制の厚さも強みです。世界トップ級の技術開発に関われる点も働きがいにつながっています。一方で、大組織特有の縦割り・稟議の多さ、勤務地が愛知県中心であること、伝統的なカルチャーが残る点が課題として挙がります。',
      positives: ['カイゼン文化と現場力', '雇用の安定と手厚い福利厚生', '教育・育成に手厚い', '世界トップ級の技術に触れられる'],
      negatives: ['大組織特有の縦割り・調整の多さ', '勤務地が愛知県中心', '伝統的なカルチャーが残る'],
      scores: { engagement: 72, culture: 74, workLife: 74, growth: 70, compensation: 80, stability: 92 },
    },
  },
  {
    id: 'baycurrent',
    name: 'ベイカレント',
    industryId: 'consulting',
    logoColor: '#0f4c81',
    tagline: '戦略からDX実行まで担う日系総合コンサルティングファーム',
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
]

export const companyById = (id: string) => COMPANIES.find((c) => c.id === id)
export const companiesByIndustry = (industryId: string) =>
  COMPANIES.filter((c) => c.industryId === industryId)
