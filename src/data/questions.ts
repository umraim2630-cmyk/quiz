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
    id: 'q-it-4',
    type: 'industry',
    targetId: 'it',
    difficulty: 1,
    prompt: '「SIer（システムインテグレーター）」の主な事業内容は？',
    choices: [
      '顧客企業のシステム開発・構築を請け負う',
      '半導体を製造する',
      '通信回線を敷設する',
      'PCを小売販売する',
    ],
    answerIndex: 0,
    explanation:
      'SIerは顧客の業務システムを受託開発する企業群です。自社プロダクト型（SaaS等）とは収益構造もカルチャーも大きく異なります。',
  },
  {
    id: 'q-it-5',
    type: 'industry',
    targetId: 'it',
    difficulty: 4,
    financial: true,
    prompt:
      'あるSaaS企業の顧客獲得コスト(CAC)が4万円、顧客生涯価値(LTV)が12万円。LTV/CAC比率と一般的な評価は？（財務データ問題）',
    choices: [
      '3倍。健全とされる目安（3倍以上）を満たす',
      '0.3倍。優良水準',
      '8倍。危険水準',
      '48倍。標準的水準',
    ],
    answerIndex: 0,
    explanation:
      'LTV/CAC = 12 ÷ 4 = 3倍。SaaSでは「LTVがCACの3倍以上」が健全な投資効率の目安とされます。',
  },
  {
    id: 'q-it-6',
    type: 'industry',
    targetId: 'it',
    difficulty: 5,
    financial: true,
    prompt:
      '急成長SaaS企業が営業赤字でも株式市場で高く評価されることがあるのはなぜ？（財務データ問題）',
    choices: [
      '広告宣伝費・人件費を先行投資してARRを伸ばせば、将来の継続収益が積み上がるから',
      '赤字企業は法人税が優遇され続けるから',
      '赤字のほうが従業員の士気が上がるから',
      '会計上、赤字は自動的に翌年黒字になるから',
    ],
    answerIndex: 0,
    explanation:
      '解約率が低いSaaSでは、獲得した顧客の収益(ARR)が長期に積み上がります。目先の利益より成長率を優先する投資判断が合理的になり得ます。',
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
  {
    id: 'q-fin-3',
    type: 'industry',
    targetId: 'finance',
    difficulty: 1,
    prompt: '銀行が預金者からお金を集め、企業などに貸し出す仕組みを何と呼ぶ？',
    choices: ['間接金融', '直接金融', 'クラウドファンディング', '仮想通貨'],
    answerIndex: 0,
    explanation:
      '銀行を介してお金が流れるのが間接金融。株式や債券で投資家から直接調達するのが直接金融です。',
  },
  {
    id: 'q-fin-4',
    type: 'industry',
    targetId: 'finance',
    difficulty: 2,
    prompt: '保険会社の収益の柱として正しい組み合わせは？',
    choices: [
      '保険料収入と、集めた資金の資産運用益',
      '店舗の家賃収入と広告収入',
      'ATM手数料と両替手数料',
      '国からの補助金のみ',
    ],
    answerIndex: 0,
    explanation:
      '保険会社は保険料を集めて支払いに備えつつ、その巨額の資金を運用して収益を上げる「機関投資家」でもあります。',
  },
  {
    id: 'q-fin-5',
    type: 'industry',
    targetId: 'finance',
    difficulty: 4,
    financial: true,
    prompt:
      'ある金融機関の当期純利益が800億円、自己資本が1兆円のとき、ROE（自己資本利益率）は？（財務データ問題）',
    choices: ['8%', '0.8%', '80%', '12.5%'],
    answerIndex: 0,
    explanation:
      'ROE = 純利益 ÷ 自己資本 = 800億 ÷ 1兆 = 8%。株主資本をどれだけ効率よく利益に変えたかを示し、金融機関の経営目標として重視されます。',
  },
  {
    id: 'q-fin-6',
    type: 'industry',
    targetId: 'finance',
    difficulty: 5,
    financial: true,
    prompt: '金利が上昇する局面で、銀行の収益が改善しやすいとされる主な理由は？（財務データ問題）',
    choices: [
      '貸出金利が預金金利より速く上がり、利ざやが拡大しやすいから',
      '預金者が全員お金を引き出すから',
      '銀行の家賃が下がるから',
      '株価が必ず上がるから',
    ],
    answerIndex: 0,
    explanation:
      '銀行収益の源泉は「貸出金利−預金金利」の利ざや。金利上昇局面では貸出側の金利改定が先行しやすく、利ざやが広がる傾向があります。',
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
  {
    id: 'q-con-3',
    type: 'industry',
    targetId: 'consumer',
    difficulty: 1,
    prompt: '「EC化率」が意味するものは？',
    choices: [
      '小売販売額のうちネット通販が占める割合',
      '店舗の電気代の割合',
      '従業員のパソコン保有率',
      '広告費に占めるテレビCMの割合',
    ],
    answerIndex: 0,
    explanation:
      'EC化率は小売のデジタルシフトを測る基本指標。カテゴリによって水準が大きく異なり、食品は低く、書籍・家電は高い傾向があります。',
  },
  {
    id: 'q-con-4',
    type: 'industry',
    targetId: 'consumer',
    difficulty: 2,
    prompt: '「SPA（製造小売業）」のビジネスモデルとして正しいのは？',
    choices: [
      '企画・製造から販売まで自社で一貫して手がける',
      '他社商品を仕入れて販売だけを行う',
      '製造だけを行い販売は卸に任せる',
      'フランチャイズ加盟店を募集する事業',
    ],
    answerIndex: 0,
    explanation:
      'SPAは企画から販売までを垂直統合し、中間マージンを排して高い粗利率と需要への即応を実現します。アパレルや家具で代表的です。',
  },
  {
    id: 'q-con-5',
    type: 'industry',
    targetId: 'consumer',
    difficulty: 4,
    financial: true,
    prompt:
      'ある小売企業の年間売上原価が480億円、平均在庫が40億円。在庫回転率は？（財務データ問題）',
    choices: ['12回', '4.8回', '40回', '1.2回'],
    answerIndex: 0,
    explanation:
      '在庫回転率 = 売上原価 ÷ 平均在庫 = 480 ÷ 40 = 12回/年。回転が速いほど資金効率が良く、薄利の小売では特に重要な指標です。',
  },
  {
    id: 'q-con-6',
    type: 'industry',
    targetId: 'consumer',
    difficulty: 5,
    financial: true,
    prompt:
      '粗利率30%・営業利益率3%の食品スーパーが、利益率を構造的に高める打ち手として最も有効とされるのは？（財務データ問題）',
    choices: [
      'PB（プライベートブランド）比率を高めて粗利率を改善する',
      '全店舗の営業時間を半分にする',
      '広告を全て取りやめる',
      '仕入れ量を2倍にして在庫を積み増す',
    ],
    answerIndex: 0,
    explanation:
      'PBはNB（ナショナルブランド）より粗利率が10pt以上高いことも多く、売上構成を変えることで利益構造そのものを改善できます。',
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
  {
    id: 'q-man-3',
    type: 'industry',
    targetId: 'manufacturing',
    difficulty: 1,
    prompt: '「サプライチェーン」とは何を指す？',
    choices: [
      '原材料の調達から製品が顧客に届くまでの供給の連鎖',
      '工場内のベルトコンベアの名称',
      '本社と支社をつなぐ通信網',
      '経営陣の指揮系統',
    ],
    answerIndex: 0,
    explanation:
      '調達→製造→物流→販売の連鎖全体がサプライチェーン。半導体不足や地政学リスクで、その強靭化が製造業の最重要テーマになっています。',
  },
  {
    id: 'q-man-4',
    type: 'industry',
    targetId: 'manufacturing',
    difficulty: 2,
    prompt: '自動車業界の「Tier1（ティアワン）」と呼ばれる企業は？',
    choices: [
      '完成車メーカーに直接部品を納入する一次サプライヤー',
      '販売店（ディーラー）',
      'ガソリンスタンド運営会社',
      '中古車買取業者',
    ],
    answerIndex: 0,
    explanation:
      '完成車メーカーを頂点に、Tier1（一次）→Tier2（二次）とピラミッド型の分業構造が形成されています。EV化でこの構造自体が変わりつつあります。',
  },
  {
    id: 'q-man-5',
    type: 'industry',
    targetId: 'manufacturing',
    difficulty: 4,
    financial: true,
    prompt:
      '「1円の円安で営業利益が50億円増える」輸出企業がある。想定より5円円安が進むと営業利益への影響は？（財務データ問題）',
    choices: ['+250億円', '+50億円', '−250億円', '影響なし'],
    answerIndex: 0,
    explanation:
      '為替感応度50億円/円 × 5円 = +250億円。輸出型製造業の業績予想では、この「為替感応度」が必ずチェックされます。',
  },
  {
    id: 'q-man-6',
    type: 'industry',
    targetId: 'manufacturing',
    difficulty: 5,
    financial: true,
    prompt:
      '設備投資が重い製造業の「本当の稼ぐ力」を見る際、営業利益と併せて確認すべき指標として最も適切なのは？（財務データ問題）',
    choices: [
      'フリーキャッシュフロー（営業CF−投資CF）',
      'オフィスの床面積',
      '役員の人数',
      'SNSのフォロワー数',
    ],
    answerIndex: 0,
    explanation:
      '巨額の設備投資は減価償却を通じて長期に利益を圧迫します。投資後に手元に残る現金＝フリーキャッシュフローが、投資体力と株主還元の原資を示します。',
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

  {
    id: 'q-cns-3',
    type: 'industry',
    targetId: 'consulting',
    difficulty: 1,
    prompt: 'コンサルティング会社が顧客に提供している「商品」の本質は？',
    choices: [
      '専門知識と人材の時間（知的付加価値）',
      '自社工場で作る製品',
      '不動産物件',
      '金融商品',
    ],
    answerIndex: 0,
    explanation:
      'コンサルは在庫も工場も持たず、人の知見・分析力・実行支援を提供します。だからこそ採用と育成が経営の生命線です。',
  },
  {
    id: 'q-cns-4',
    type: 'industry',
    targetId: 'consulting',
    difficulty: 2,
    prompt: '大型プロジェクトで設置される「PMO」の役割は？',
    choices: [
      'プロジェクト全体の進行・品質・課題を横断的に管理する',
      '社内の備品を発注する',
      '広報用のSNSを運用する',
      '経理の伝票処理を行う',
    ],
    answerIndex: 0,
    explanation:
      'PMO（Project Management Office）は複数チームが動く大型案件の司令塔。DX案件の拡大で、若手が最初に経験しやすい役割でもあります。',
  },
  {
    id: 'q-cns-5',
    type: 'industry',
    targetId: 'consulting',
    difficulty: 4,
    financial: true,
    prompt:
      'コンサルタント100名、1人あたり月額単価300万円、平均稼働率80%のファームの月間売上は？（財務データ問題）',
    choices: ['2.4億円', '3.0億円', '24億円', '8,000万円'],
    answerIndex: 0,
    explanation:
      '100名 × 300万円 × 80% = 2.4億円。人数×単価×稼働率という掛け算が、コンサルの売上構造そのものです。',
  },
  {
    id: 'q-cns-6',
    type: 'industry',
    targetId: 'consulting',
    difficulty: 5,
    financial: true,
    prompt:
      'コンサルファームが利益率を落とさずに成長するための3つのレバーの組み合わせとして正しいのは？（財務データ問題）',
    choices: [
      'コンサルタント数 × 稼働率 × 単価',
      '店舗数 × 客単価 × 回転率',
      '設備投資 × 減価償却 × 在庫',
      '広告費 × クリック率 × 成約率',
    ],
    answerIndex: 0,
    explanation:
      '人数を増やすか、稼働を埋めるか、単価を上げるか。単価向上（高付加価値化）が最も筋の良いレバーとされ、各ファームの戦略の違いが表れます。',
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

  {
    id: 'q-cloudnova-3',
    type: 'company',
    targetId: 'cloudnova',
    difficulty: 1,
    prompt: 'クラウドノヴァ株式会社の主力事業は？',
    choices: [
      '中堅企業向けのSaaS（業務クラウドサービス）',
      '食品スーパーの運営',
      '自動車部品の製造',
      '生命保険の販売',
    ],
    answerIndex: 0,
    explanation:
      '中堅企業向けSaaSで国内トップシェアを狙う成長企業です。従業員約1,240名に対し売上高385億円という、少数精鋭型の事業構造が特徴です。',
  },
  {
    id: 'q-cloudnova-4',
    type: 'company',
    targetId: 'cloudnova',
    difficulty: 3,
    prompt:
      'クラウドノヴァの待遇・給与スコアは68と、働きがい(82)より低め。口コミから読み取れる主因は？',
    choices: [
      '成果が給与に反映されるスピードへの不満',
      '給与が業界最低水準だから',
      '賞与が存在しないから',
      '福利厚生が一切ないから',
    ],
    answerIndex: 0,
    explanation:
      '給与水準自体は業界平均をやや上回るものの、「成果に対する反映速度」への不満が口コミで目立ちます。評価制度の未整備という課題と地続きです。',
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

  {
    id: 'q-meridian-3',
    type: 'company',
    targetId: 'meridian',
    difficulty: 1,
    prompt: 'メリディアン銀行の事業の中心は？',
    choices: [
      '個人・中小企業向けのリテール金融',
      'ゲームアプリの開発',
      '航空機の製造',
      'アパレルのEC販売',
    ],
    answerIndex: 0,
    explanation:
      '1948年創業、従業員18,400名のリテール金融のリーディングバンク。社会的信用の高さと安定性が口コミでも最大の評価点です。',
  },
  {
    id: 'q-meridian-4',
    type: 'company',
    targetId: 'meridian',
    difficulty: 3,
    prompt: 'メリディアン銀行の口コミで、働き方について指摘される「格差」とは？',
    choices: [
      '支店勤務と本部勤務で働き方の体験に大きな差がある',
      '男性しか昇進できない',
      '正社員が存在しない',
      '海外勤務者だけ給与が10倍',
    ],
    answerIndex: 0,
    explanation:
      'DX推進で働き方改革が進む一方、「支店と本部で体験に大きな差がある」との声が多数。配属によるギャップは入社前に知っておきたいポイントです。',
  },
  {
    id: 'q-meridian-5',
    type: 'company',
    targetId: 'meridian',
    difficulty: 5,
    financial: true,
    prompt:
      'メリディアン銀行の従業員1人あたり営業利益は約1,005万円（1,850億円÷18,400名）と、クラウドノヴァ（約500万円）の2倍。この解釈として最も適切なのは？（財務データ問題）',
    choices: [
      '巨額の資本を運用して稼ぐ資本集約型ビジネスのため、人数比の利益が大きく出る',
      '銀行員が2倍の時間働いているから',
      '計算が間違っており実際は同じ',
      '従業員数が少ないほど利益が減るから',
    ],
    answerIndex: 0,
    explanation:
      '金融業は「人」だけでなく「資本」が稼ぐビジネス。1人あたり利益の高さが、そのまま個人の裁量や成長環境の豊かさを意味しない点に注意が必要です（口コミの成長環境スコアは55）。',
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

  {
    id: 'q-greenmart-3',
    type: 'company',
    targetId: 'greenmart',
    difficulty: 1,
    prompt: 'グリーンマートの事業内容は？',
    choices: [
      '全国約1,200店舗を展開する食品小売チェーン',
      'クラウド会計ソフトの開発',
      '銀行業',
      '建設機械の製造',
    ],
    answerIndex: 0,
    explanation:
      '1974年創業、従業員26,800名の食品小売チェーン。地域の生活インフラとしての安定性（スコア78）が口コミでも評価されています。',
  },
  {
    id: 'q-greenmart-4',
    type: 'company',
    targetId: 'greenmart',
    difficulty: 3,
    prompt: 'グリーンマートの働きやすさスコアが52と低めである主因は？',
    choices: [
      'シフト勤務で休日が不規則になりやすいこと',
      'オフィスが存在しないこと',
      '有給休暇の制度がないこと',
      '全員が深夜勤務であること',
    ],
    answerIndex: 0,
    explanation:
      '小売業特有のシフト勤務・土日祝の出勤が主因。一方で近年はEC・PB強化が進み、企画・バイヤー職の魅力が高まっているという前向きな変化も口コミから読み取れます。',
  },
  {
    id: 'q-greenmart-5',
    type: 'company',
    targetId: 'greenmart',
    difficulty: 3,
    prompt: 'グリーンマートの口コミで、収益構造の変化とともに「魅力が高まっている」とされる職種は？',
    choices: ['企画・バイヤー職', '警備員', '運転手', '清掃スタッフ'],
    answerIndex: 0,
    explanation:
      'EC・PB強化という会社の戦略転換に伴い、商品企画やバイヤーのキャリアの魅力が向上。会社の戦略と職種の将来性を重ねて見るのが企業研究のコツです。',
  },
  {
    id: 'q-greenmart-fin-2',
    type: 'company',
    targetId: 'greenmart',
    difficulty: 5,
    financial: true,
    prompt:
      'グリーンマートの従業員1人あたり営業利益は約78万円（210億円÷26,800名）と5社で最も低い。この構造の説明として適切なのは？（財務データ問題）',
    choices: [
      '多店舗展開の労働集約型ビジネスで、多くの人手を要するため1人あたり利益は小さくなる',
      '従業員が働いていないから',
      '会計基準が他社と違うから',
      '本部が利益を隠しているから',
    ],
    answerIndex: 0,
    explanation:
      '小売は店舗運営に多くの人員が必要な労働集約型。1人あたり利益の小ささは、口コミの「給与の伸び悩み」という声とも構造的につながっています。',
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

  {
    id: 'q-tsuzuki-2',
    type: 'company',
    targetId: 'tsuzuki',
    difficulty: 1,
    prompt: '続木重工が大型投資を進めている成長領域は？',
    choices: ['EV（電気自動車）関連', '外食チェーン', 'ゲーム開発', '旅行代理店'],
    answerIndex: 0,
    explanation:
      '1936年創業の精密機械・部品メーカーで、EVシフトを牽引する側に回るべく大型投資を実行中。口コミでも「EV分野の成長投資」が前向きな材料として挙がっています。',
  },
  {
    id: 'q-tsuzuki-3',
    type: 'company',
    targetId: 'tsuzuki',
    difficulty: 2,
    prompt: '続木重工の安定性スコアが84と高い背景として、口コミで挙がっているのは？',
    choices: [
      '長期雇用の文化と寮など手厚い福利厚生',
      '毎年全員の給与が2倍になる',
      '仕事が一切ない',
      '株価が絶対に下がらない',
    ],
    answerIndex: 0,
    explanation:
      '「腰を据えて技術を磨ける」長期雇用文化と、寮・福利厚生の手厚さが安定感の源泉。じっくり技術者として成長したい人に支持されています。',
  },
  {
    id: 'q-tsuzuki-4',
    type: 'company',
    targetId: 'tsuzuki',
    difficulty: 3,
    prompt: '続木重工の口コミで、働く環境面の課題として挙げられているのは？',
    choices: [
      '縦割り組織の調整の多さと、転勤・地方勤務',
      'オフィスにトイレがない',
      '社員同士の会話が禁止されている',
      '有給休暇が違法に没収される',
    ],
    answerIndex: 0,
    explanation:
      '大企業特有の縦割り・意思決定の遅さ、そして転勤・地方勤務の多さが課題。技術力・安定性とのトレードオフをどう評価するかが企業選びの視点です。',
  },
  {
    id: 'q-tsuzuki-fin-2',
    type: 'company',
    targetId: 'tsuzuki',
    difficulty: 4,
    financial: true,
    prompt:
      '続木重工は海外売上比率が高い輸出型メーカー。想定以上に「円高」が進んだ場合、業績への一般的な影響は？（財務データ問題）',
    choices: [
      '外貨建て利益の円換算額が目減りし、営業利益が押し下げられやすい',
      '利益が自動的に2倍になる',
      '為替は業績に一切影響しない',
      '国内の売上だけが消滅する',
    ],
    answerIndex: 0,
    explanation:
      '円高は輸出企業の逆風。海外で稼いだドルやユーロを円に換算した金額が減るためです。志望企業の「為替感応度」は決算資料で確認できます。',
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
  {
    id: 'q-apex-2',
    type: 'company',
    targetId: 'apex',
    difficulty: 1,
    prompt: 'エイペックス・コンサルティングの事業内容は？',
    choices: [
      '戦略立案からDX実装までを支援するコンサルティング',
      '食品の製造販売',
      '銀行業',
      'マンション分譲',
    ],
    answerIndex: 0,
    explanation:
      '2004年創業、従業員2,100名。戦略からDX実装まで一気通貫で支援する成長ファームで、売上高520億円・営業利益率約19%と高収益です。',
  },
  {
    id: 'q-apex-3',
    type: 'company',
    targetId: 'apex',
    difficulty: 3,
    prompt: 'エイペックスの働きやすさスコアが48と低い主因として、口コミで挙がるのは？',
    choices: [
      'プロジェクトによって稼働の波が大きく、環境が激変すること',
      '固定残業代が存在しないこと',
      'オフィスが海外にしかないこと',
      '週7日勤務が就業規則であること',
    ],
    answerIndex: 0,
    explanation:
      '「繁忙期は激務」「プロジェクトで環境が激変」が代表的な声。成長環境92・待遇86との強いトレードオフを理解した上で選ぶことが、入社後ギャップの防止につながります。',
  },
  {
    id: 'q-apex-4',
    type: 'company',
    targetId: 'apex',
    difficulty: 2,
    prompt: '口コミ分析によると、エイペックスはどんな志向の人に強く支持されている？',
    choices: [
      '裁量の大きさと市場価値の向上を重視する人',
      '定年まで同じ業務を続けたい人',
      '通勤時間の短さだけを重視する人',
      '夜勤を希望する人',
    ],
    answerIndex: 0,
    explanation:
      '2,980件の口コミでは「成長スピード」「市場価値が上がる」への評価が突出。自分の就活の軸と口コミの評価軸を照らし合わせることが大切です。',
  },
  {
    id: 'q-apex-fin-2',
    type: 'company',
    targetId: 'apex',
    difficulty: 5,
    financial: true,
    prompt:
      'エイペックスの従業員1人あたり営業利益は約467万円（98億円÷2,100名）。コンサルのビジネスモデル上、これをさらに高める最も直接的な打ち手は？（財務データ問題）',
    choices: [
      '高付加価値案件へシフトして1人あたり単価を引き上げる',
      'オフィスの照明を消す',
      '従業員数を10倍にする',
      '広告費を2倍にする',
    ],
    answerIndex: 0,
    explanation:
      'コンサルの売上は「人数×稼働率×単価」。稼働率には上限がある（上げすぎると口コミの働きやすさ48がさらに悪化）ため、単価向上＝高付加価値化が本質的なレバーです。',
  },
]

export const questionsForTarget = (type: 'company' | 'industry', targetId: string) =>
  QUESTIONS.filter((q) => q.type === type && q.targetId === targetId)
