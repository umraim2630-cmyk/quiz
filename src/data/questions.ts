import type { Question } from '../types'

// ------------------------------------------------------------------
// 問題バンク
//  difficulty 1-3: 業界/企業の基礎・口コミ由来のカルチャー理解
//  difficulty 4-5: 財務情報など、より踏み込んだ題材（financial: true）
// ------------------------------------------------------------------
export const QUESTIONS: Question[] = [
  // ============ 業界: IT ============
  {
    id: 'q-it-1',
    type: 'industry',
    targetId: 'it',
    difficulty: 1,
    prompt: 'IT・ソフトウェア業界で近年主流となっている、継続課金型の収益モデルを何と呼ぶ？',
    choices: ['スポット型', 'リカーリング（継続課金）型', '一括買い切り型', '広告仲介型'],
    answerIndex: 1,
    explanation:
      'SaaSに代表される継続課金（リカーリング）型は、解約率(チャーン)が低ければ売上が積み上がるため、株式市場でも高く評価されます。',
  },
  {
    id: 'q-it-2',
    type: 'industry',
    targetId: 'it',
    difficulty: 2,
    prompt: 'SaaS企業の健全性を測る指標として、特に重視されるのはどれ？',
    choices: ['店舗数', '解約率（チャーンレート）', '在庫回転率', '為替レート'],
    answerIndex: 1,
    explanation:
      'チャーンレートが低いほど顧客が定着し、LTV（顧客生涯価値）が高まります。SaaSではMRR・チャーン・LTV/CACが主要KPIです。',
  },
  {
    id: 'q-it-3',
    type: 'industry',
    targetId: 'it',
    difficulty: 3,
    prompt: '「DX（デジタルトランスフォーメーション）」が指す内容として最も適切なのは？',
    choices: [
      '既存の紙業務をそのままPDF化すること',
      'デジタル技術で事業やビジネスモデル自体を変革すること',
      '社内PCを最新機種に買い替えること',
      'SNSアカウントを開設すること',
    ],
    answerIndex: 1,
    explanation:
      'DXは単なるデジタル化(Digitization)ではなく、デジタルを前提に事業・組織・文化を変革することを指します。',
  },
  // ============ 業界: 金融 ============
  {
    id: 'q-fin-1',
    type: 'industry',
    targetId: 'finance',
    difficulty: 2,
    prompt: '銀行が個人・企業に融資する際、返済能力を評価することを何という？',
    choices: ['与信（審査）', '為替', '增資', '上場'],
    answerIndex: 0,
    explanation:
      '与信は金融ビジネスの根幹です。貸し倒れリスクを見極める力が、銀行の収益と健全性を左右します。',
  },
  {
    id: 'q-fin-2',
    type: 'industry',
    targetId: 'finance',
    difficulty: 3,
    prompt: '近年、金融業界が「手数料ビジネス」から軸足を移そうとしている領域はどれ？',
    choices: ['資産運用（アセットマネジメント）', '両替業務', 'ATM設置', '紙通帳の発行'],
    answerIndex: 0,
    explanation:
      '低金利下で伝統的な貸出利ざやが縮小したため、資産運用・コンサルティングなどストック型・付加価値型の収益へシフトが進んでいます。',
  },
  // ============ 業界: 消費財・小売 ============
  {
    id: 'q-con-1',
    type: 'industry',
    targetId: 'consumer',
    difficulty: 1,
    prompt: '小売業で「PB」とは何の略？',
    choices: ['パブリックブランド', 'プライベートブランド（自主企画商品）', 'プレミアムボーナス', 'ポイントバック'],
    answerIndex: 1,
    explanation:
      'PB（プライベートブランド）は小売が自ら企画する商品で、粗利率が高くブランド価値の源泉になります。',
  },
  {
    id: 'q-con-2',
    type: 'industry',
    targetId: 'consumer',
    difficulty: 3,
    prompt: '実店舗とオンラインを融合させ、シームレスな購買体験を提供する戦略を何と呼ぶ？',
    choices: ['OMO（Online Merges with Offline）', 'B2B', 'IPO', 'CSR'],
    answerIndex: 0,
    explanation:
      'OMOは在庫・顧客データを店舗とECで統合し、EC化率を高めつつ来店体験も強化する、小売の主要テーマです。',
  },
  // ============ 業界: 製造・自動車 ============
  {
    id: 'q-man-1',
    type: 'industry',
    targetId: 'manufacturing',
    difficulty: 2,
    prompt: '自動車業界で進む「EVシフト」のEVとは？',
    choices: ['電気自動車', '経済価値', '緊急車両', '環境認証'],
    answerIndex: 0,
    explanation:
      'EV（電気自動車）化は部品構成やサプライチェーンを大きく変え、素材・電池・ソフトウェアへの投資競争を生んでいます。',
  },
  {
    id: 'q-man-2',
    type: 'industry',
    targetId: 'manufacturing',
    difficulty: 3,
    prompt: '輸出型の製造業の利益が「円安」で押し上げられやすいのはなぜ？',
    choices: [
      '海外で稼いだ外貨を円に換算した金額が増えるため',
      '国内の人件費が下がるため',
      '関税が免除されるため',
      '在庫が自動的に減るため',
    ],
    answerIndex: 0,
    explanation:
      '海外売上比率の高い企業は、円安時に外貨建て利益の円換算額が膨らみます。為替感応度は製造業の業績を読む鍵です。',
  },
  // ============ 業界: コンサル ============
  {
    id: 'q-cns-1',
    type: 'industry',
    targetId: 'consulting',
    difficulty: 2,
    prompt: 'コンサルティングファームの収益を最も左右する指標はどれ？',
    choices: ['稼働率（Utilization）×単価', '店舗数', '製造原価', '為替レート'],
    answerIndex: 0,
    explanation:
      '人が資産のビジネスのため、コンサルタントがどれだけ案件に稼働し(Utilization)、どの単価で提供できるかが収益の要です。',
  },
  {
    id: 'q-cns-2',
    type: 'industry',
    targetId: 'consulting',
    difficulty: 3,
    prompt: 'コンサル業界で語られる「アップ・オア・アウト」の意味は？',
    choices: [
      '昇進するか、さもなければ去るという実力主義の文化',
      '出社か在宅かを選べる制度',
      '上場を目指す経営方針',
      '海外赴任の順番',
    ],
    answerIndex: 0,
    explanation:
      '成果と成長を強く求める文化を象徴する言葉です。成長スピードの速さと表裏一体のプレッシャーを生みます。',
  },

  // ============ 企業: クラウドノヴァ ============
  {
    id: 'q-cloudnova-1',
    type: 'company',
    targetId: 'cloudnova',
    difficulty: 2,
    prompt: 'クラウドノヴァの口コミ分析で、働きがいを最も牽引している要素はどれ？',
    choices: ['年功序列の安心感', '若手でも裁量が大きいこと', '転勤の多さ', '手厚い退職金'],
    answerIndex: 1,
    explanation:
      '3,820件の口コミでは「若手でも上流を任される裁量の大きさ」が働きがいスコア82の主因。成長環境スコアも85と高水準です。',
  },
  {
    id: 'q-cloudnova-2',
    type: 'company',
    targetId: 'cloudnova',
    difficulty: 3,
    prompt: 'クラウドノヴァの口コミで、課題として最も多く挙げられているのは？',
    choices: ['評価基準の不透明さ', '有給が取れないこと', '社会的信用の低さ', '研修が全くないこと'],
    answerIndex: 0,
    explanation:
      '急拡大に制度が追いつかず「評価基準が不透明」との声が多数。待遇スコア68は、成果の反映速度への不満を反映しています。',
  },
  {
    id: 'q-cloudnova-fin-1',
    type: 'company',
    targetId: 'cloudnova',
    difficulty: 4,
    financial: true,
    prompt:
      'クラウドノヴァの売上高385億円・営業利益62億円から算出される営業利益率は約何%？（財務データ問題）',
    choices: ['約4%', '約16%', '約38%', '約62%'],
    answerIndex: 1,
    explanation:
      '営業利益率 = 営業利益62 ÷ 売上高385 ≒ 16.1%。SaaS企業として高い収益性で、口コミの「プロダクトへの誇り」を数字が裏付けています。',
  },
  {
    id: 'q-cloudnova-fin-2',
    type: 'company',
    targetId: 'cloudnova',
    difficulty: 5,
    financial: true,
    prompt:
      'クラウドノヴァ（従業員1,240名・営業利益62億円）と、続木重工（従業員32,100名・営業利益1,120億円）。従業員1人あたり営業利益が高いのはどちら？（財務データ問題）',
    choices: ['クラウドノヴァ（約500万円/人）', '続木重工（約349万円/人）', '同じ', '判断できない'],
    answerIndex: 0,
    explanation:
      'クラウドノヴァ: 62億÷1,240 ≒ 500万円/人。続木重工: 1,120億÷32,100 ≒ 349万円/人。少人数で高収益なSaaSの構造が、1人あたり生産性に表れています。',
  },

  // ============ 企業: メリディアン銀行 ============
  {
    id: 'q-meridian-1',
    type: 'company',
    targetId: 'meridian',
    difficulty: 2,
    prompt: 'メリディアン銀行の口コミで、最も高いスコア(92)がついている項目は？',
    choices: ['働きがい', '成長環境', '雇用の安定性', '裁量の大きさ'],
    answerIndex: 2,
    explanation:
      '7,410件の口コミで「雇用の安定性」が突出。一方、働きがい58・成長環境55と、安定と成長実感のトレードオフが見られます。',
  },
  {
    id: 'q-meridian-2',
    type: 'company',
    targetId: 'meridian',
    difficulty: 3,
    prompt: 'メリディアン銀行の口コミで繰り返し指摘される、カルチャー面の課題は？',
    choices: ['年功序列で昇進が遅い', '離職率が異常に高い', '福利厚生が乏しい', 'コンプラ意識が低い'],
    answerIndex: 0,
    explanation:
      '「年功序列・意思決定の遅さ・若手の裁量の小ささ」が中心的課題。安定性を魅力と捉えるか、成長の遅さと捉えるかが企業選びの分岐点です。',
  },
  {
    id: 'q-meridian-fin-1',
    type: 'company',
    targetId: 'meridian',
    difficulty: 4,
    financial: true,
    prompt:
      'メリディアン銀行の売上高9,200億円・営業利益1,850億円。営業利益率は約何%？（財務データ問題）',
    choices: ['約5%', '約20%', '約50%', '約92%'],
    answerIndex: 1,
    explanation:
      '1,850 ÷ 9,200 ≒ 20.1%。金融業は利ざやビジネスゆえ売上に対する利益率が高くなりやすい特性があります。',
  },

  // ============ 企業: グリーンマート ============
  {
    id: 'q-greenmart-1',
    type: 'company',
    targetId: 'greenmart',
    difficulty: 2,
    prompt: 'グリーンマートの口コミで、成長環境として評価されている点は？',
    choices: ['若くして店長を経験できる', '完全在宅で働ける', '転勤が一切ない', '残業が全くない'],
    answerIndex: 0,
    explanation:
      '「早期から店舗マネジメントを任される」点が成長機会として評価。一方で働きやすさ52と、シフト勤務の負荷が課題です。',
  },
  {
    id: 'q-greenmart-fin-1',
    type: 'company',
    targetId: 'greenmart',
    difficulty: 4,
    financial: true,
    prompt:
      'グリーンマートの売上高6,400億円・営業利益210億円。営業利益率は約3%。この「薄利」の主因として小売業で一般的なのは？（財務データ問題）',
    choices: [
      '大量仕入れ・低価格販売で1件あたりの利幅が小さいため',
      '研究開発費が巨額のため',
      '為替差損が大きいため',
      '特許使用料の支払いが多いため',
    ],
    answerIndex: 0,
    explanation:
      '210 ÷ 6,400 ≒ 3.3%。小売は薄利多売が基本で、在庫回転率とコスト管理が利益を左右します。口コミの「給与の伸び悩み」とも整合します。',
  },

  // ============ 企業: 続木重工 ============
  {
    id: 'q-tsuzuki-1',
    type: 'company',
    targetId: 'tsuzuki',
    difficulty: 2,
    prompt: '続木重工の口コミで強みとされているのはどれ？',
    choices: ['技術力・開発環境の充実', 'フルフレックスの自由さ', '完全成果主義の報酬', '転勤が一切ないこと'],
    answerIndex: 0,
    explanation:
      '「技術を腰を据えて磨ける環境」が強み。安定性84と高い一方、縦割り・転勤がワークライフ面の課題として挙がります。',
  },
  {
    id: 'q-tsuzuki-fin-1',
    type: 'company',
    targetId: 'tsuzuki',
    difficulty: 5,
    financial: true,
    prompt:
      '続木重工の売上高14,200億円・営業利益1,120億円。営業利益率(約7.9%)を、同じ製造業の一般的水準（5〜8%程度）と比べた評価として妥当なのは？（財務データ問題）',
    choices: [
      '製造業として標準〜やや良好な水準',
      'SaaS業界より明確に高い水準',
      '赤字寸前の危険な水準',
      '小売業より低い水準',
    ],
    answerIndex: 0,
    explanation:
      '1,120 ÷ 14,200 ≒ 7.9%。装置産業は設備・開発負担が重く、営業利益率は一桁台後半が一つの目安。EV投資局面での7.9%は健闘といえます。',
  },

  // ============ 企業: エイペックス ============
  {
    id: 'q-apex-1',
    type: 'company',
    targetId: 'apex',
    difficulty: 2,
    prompt: 'エイペックス・コンサルティングの口コミで、最大の魅力とされるのは？',
    choices: ['成長スピードと20代の高報酬', '定時退社の徹底', '年功序列の安心感', '転勤のなさ'],
    answerIndex: 0,
    explanation:
      '成長環境92・待遇86と高スコア。一方で働きやすさ48と、稼働の波の大きさが表裏一体の課題になっています。',
  },
  {
    id: 'q-apex-fin-1',
    type: 'company',
    targetId: 'apex',
    difficulty: 4,
    financial: true,
    prompt:
      'エイペックスの売上高520億円・営業利益98億円。営業利益率は約何%？高収益の背景は？（財務データ問題）',
    choices: [
      '約19%。人材の知的付加価値を高単価で提供するモデルのため',
      '約2%。薄利多売のため',
      '約50%。工場を持たないため原価ゼロだから',
      '約98%。全額が利益になるため',
    ],
    answerIndex: 0,
    explanation:
      '98 ÷ 520 ≒ 18.8%。コンサルは在庫を持たず、稼働率×単価で高い利益率を実現します。口コミの「高報酬」を財務が裏付けています。',
  },
]

export const questionsForTarget = (type: 'company' | 'industry', targetId: string) =>
  QUESTIONS.filter((q) => q.type === type && q.targetId === targetId)
