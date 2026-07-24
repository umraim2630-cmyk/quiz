import type { Question } from '../types'

// ------------------------------------------------------------------
// 問題バンク（全60問 / 各対象6問）
//  difficulty 1-3: 業界構造・ビジネスモデル・カルチャー理解
//  difficulty 4-5: 財務・決算データを題材にした問題（financial: true）
//
//  企業の財務数値は各社公表の決算資料に基づく:
//   トヨタ自動車・NTTデータグループ・三菱UFJFG: 2025年3月期
//   ファーストリテイリング: 2025年8月期 / ベイカレント: 2025年2月期
// ------------------------------------------------------------------
export const QUESTIONS: Question[] = [
  // ============ 業界: IT・ソフトウェア ============
  {
    id: 'q-it-1',
    type: 'industry',
    targetId: 'it',
    difficulty: 1,
    prompt: 'SaaSに代表される、継続課金型の収益モデルを何と呼ぶ？',
    choices: ['リカーリング（継続課金）型', 'スポット型', '一括買い切り型', '広告仲介型'],
    answerIndex: 0,
    explanation:
      '毎月・毎年の利用料が積み上がるリカーリング型は、解約されない限り売上が続くため収益の予見性が高く、株式市場でも高く評価されやすいモデルです。',
  },
  {
    id: 'q-it-2',
    type: 'industry',
    targetId: 'it',
    difficulty: 1,
    prompt: '「SIer（システムインテグレーター）」の主な事業内容は？',
    choices: [
      '顧客企業や官公庁のシステム開発・構築を請け負う',
      '半導体を製造する',
      '通信回線を敷設する',
      'PCを小売販売する',
    ],
    answerIndex: 0,
    explanation:
      'SIerは顧客の業務システムを受託開発する企業群で、NTTデータ・富士通・NECなどが代表格。自社プロダクトを売るSaaS企業とは収益構造もカルチャーも大きく異なります。',
  },
  {
    id: 'q-it-3',
    type: 'industry',
    targetId: 'it',
    difficulty: 2,
    prompt: 'SaaS企業の健全性を測る指標として、特に重視されるのはどれ？',
    choices: ['解約率（チャーンレート）', '店舗数', '在庫回転率', '為替レート'],
    answerIndex: 0,
    explanation:
      'チャーンレートが低いほど顧客が定着し、LTV（顧客生涯価値）が高まります。SaaSではARR/MRR・チャーン・LTV/CACが主要KPIです。',
  },
  {
    id: 'q-it-4',
    type: 'industry',
    targetId: 'it',
    difficulty: 3,
    prompt: '「DX（デジタルトランスフォーメーション）」の意味として最も適切なのは？',
    choices: [
      'デジタル技術を前提に、事業やビジネスモデル自体を変革すること',
      '紙の書類をそのままPDF化すること',
      '社内PCを最新機種に買い替えること',
      'SNSアカウントを開設すること',
    ],
    answerIndex: 0,
    explanation:
      'DXは単なるデジタル化（デジタイゼーション）ではなく、デジタルを前提に事業・組織・文化を作り替えることを指します。国内IT市場（約25兆円規模）の成長を牽引する需要です。',
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
      '先行投資でARR（経常収益）を伸ばせば、低い解約率のもとで将来の利益が積み上がるから',
      '赤字企業は法人税が優遇され続けるから',
      '赤字のほうが従業員の士気が上がるから',
      '会計上、赤字は自動的に翌年黒字になるから',
    ],
    answerIndex: 0,
    explanation:
      '解約率が低ければ、獲得した顧客のARRは長期にわたり積み上がります。目先の黒字より成長率を優先する投資判断が合理的になり得るのがSaaSの特徴です。',
  },

  // ============ 業界: 金融・保険 ============
  {
    id: 'q-fin-1',
    type: 'industry',
    targetId: 'finance',
    difficulty: 1,
    prompt: '銀行が預金者からお金を集め、企業などに貸し出す仕組みを何と呼ぶ？',
    choices: ['間接金融', '直接金融', 'クラウドファンディング', '両替'],
    answerIndex: 0,
    explanation:
      '銀行を介してお金が流れるのが間接金融。株式や債券で投資家から直接調達するのが直接金融です。銀行収益の土台は「貸出金利−預金金利」の利ざやにあります。',
  },
  {
    id: 'q-fin-2',
    type: 'industry',
    targetId: 'finance',
    difficulty: 2,
    prompt: '銀行が融資の際に、相手の返済能力を評価することを何という？',
    choices: ['与信（審査）', '為替', '増資', '上場'],
    answerIndex: 0,
    explanation:
      '与信は金融ビジネスの根幹です。貸し倒れリスクを見極める力が、銀行の収益と健全性を左右します。',
  },
  {
    id: 'q-fin-3',
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
    id: 'q-fin-4',
    type: 'industry',
    targetId: 'finance',
    difficulty: 3,
    prompt: '2024年以降の日本の金融業界を表す「金利ある世界」への転換のきっかけは？',
    choices: [
      '日本銀行によるマイナス金利政策の解除と利上げ',
      '消費税の引き上げ',
      '株式市場の閉鎖',
      '紙幣のデザイン変更',
    ],
    answerIndex: 0,
    explanation:
      '2024年3月に日銀がマイナス金利を解除。貸出金利の上昇で利ざやが改善し、2025年3月期には3メガバンクがそろって過去最高益を更新しました。',
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
      '銀行収益の源泉は「貸出金利−預金金利」の利ざや。金利上昇局面では貸出側の金利改定が先行しやすく、利ざやが広がる傾向があります。実際、利上げ後の2025年3月期に3メガバンクは過去最高益を記録しました。',
  },

  // ============ 業界: 消費財・小売 ============
  {
    id: 'q-con-1',
    type: 'industry',
    targetId: 'consumer',
    difficulty: 1,
    prompt: '小売業で「PB」とは何の略？',
    choices: ['プライベートブランド（自主企画商品）', 'パブリックブランド', 'プレミアムボーナス', 'ポイントバック'],
    answerIndex: 0,
    explanation:
      'PB（プライベートブランド）は小売が自ら企画する商品で、メーカー品（NB）より粗利率が高く、ブランド価値の源泉になります。',
  },
  {
    id: 'q-con-2',
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
      'SPAは企画から販売までを垂直統合し、中間マージンを排して高い粗利率と需要への即応を実現します。ユニクロ（ファーストリテイリング）が日本の代表例です。',
  },
  {
    id: 'q-con-3',
    type: 'industry',
    targetId: 'consumer',
    difficulty: 2,
    prompt: '日本の物販分野のEC化率（2023年、経済産業省調べ）に最も近いのは？',
    choices: ['約9%', '約1%', '約35%', '約60%'],
    answerIndex: 0,
    explanation:
      '物販系のEC化率は約9%（2023年）。米中に比べ低く、拡大余地が大きいとされます。カテゴリ差も大きく、書籍・家電は高く、食品は低い傾向があります。',
  },
  {
    id: 'q-con-4',
    type: 'industry',
    targetId: 'consumer',
    difficulty: 3,
    prompt: '実店舗とオンラインの垣根をなくし、一体の購買体験を提供する戦略を何と呼ぶ？',
    choices: ['OMO（Online Merges with Offline）', 'B2B', 'IPO', 'CSR'],
    answerIndex: 0,
    explanation:
      'OMOは在庫・顧客データを店舗とECで統合し、「店で試してアプリで買う」のような体験を作る小売の主要テーマです。',
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
      '総合スーパーの営業利益率が2〜3%にとどまる一方、SPA型アパレルが15%超を実現できる構造的な理由は？（財務データ問題）',
    choices: [
      '全量が自主企画品のため価格決定権を持ち、粗利率を50%前後まで高められるから',
      '店舗数が多いほど利益率は自動的に上がるから',
      '広告を出していないから',
      '税率が優遇されているから',
    ],
    answerIndex: 0,
    explanation:
      '仕入れ販売中心の総合スーパーは粗利率が低く薄利多売。SPAは企画から販売まで一貫し、価格決定権と高粗利を確保できます。ファーストリテイリングの営業利益率は約16%（2025年8月期）です。',
  },

  // ============ 業界: 製造・自動車 ============
  {
    id: 'q-man-1',
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
      '調達→製造→物流→販売の連鎖全体がサプライチェーン。半導体不足や地政学リスクを機に、その強靭化が製造業の最重要テーマになっています。',
  },
  {
    id: 'q-man-2',
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
      '完成車メーカーを頂点に、Tier1（一次）→Tier2（二次）とピラミッド型の分業構造があります。デンソーやアイシンが日本の代表的Tier1です。自動車関連の就業人口は約550万人にのぼります。',
  },
  {
    id: 'q-man-3',
    type: 'industry',
    targetId: 'manufacturing',
    difficulty: 2,
    prompt: '輸出型の製造業の利益が「円安」で押し上げられやすいのはなぜ？',
    choices: [
      '海外で稼いだ外貨を円に換算した金額が増えるため',
      '国内の人件費が下がるため',
      '関税が免除されるため',
      '在庫が自動的に減るため',
    ],
    answerIndex: 0,
    explanation:
      '海外売上比率の高い企業は、円安時に外貨建て利益の円換算額が膨らみます。大手完成車メーカーでは対ドル1円の円安で営業利益が数百億円変わるとされ、為替感応度は業績を読む鍵です。',
  },
  {
    id: 'q-man-4',
    type: 'industry',
    targetId: 'manufacturing',
    difficulty: 3,
    prompt: '自動車業界の変革を表す「CASE」に含まれないものは？',
    choices: ['サブスクリプション動画配信', 'コネクテッド（Connected）', '自動運転（Autonomous）', '電動化（Electric）'],
    answerIndex: 0,
    explanation:
      'CASEはConnected・Autonomous・Shared/Service・Electricの頭文字。ソフトウェアと電動化が競争軸を変え、異業種からの参入も進んでいます。',
  },
  {
    id: 'q-man-5',
    type: 'industry',
    targetId: 'manufacturing',
    difficulty: 4,
    financial: true,
    prompt:
      '「対ドル1円の円安で営業利益が500億円増える」輸出企業がある。想定より5円円安が進むと営業利益への影響は？（財務データ問題）',
    choices: ['+2,500億円', '+500億円', '−2,500億円', '影響なし'],
    answerIndex: 0,
    explanation:
      '為替感応度500億円/円 × 5円 = +2,500億円。輸出型製造業の決算説明資料には、この「為替感応度」が必ず記載されています。',
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
      '巨額の設備投資は減価償却を通じて長期に利益を圧迫します。投資後に手元に残る現金＝フリーキャッシュフローが、EV投資や株主還元の原資を示します。',
  },

  // ============ 業界: コンサル・専門サービス ============
  {
    id: 'q-cns-1',
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
    id: 'q-cns-2',
    type: 'industry',
    targetId: 'consulting',
    difficulty: 2,
    prompt: 'コンサルティングファームの収益を最も左右する掛け算はどれ？',
    choices: ['コンサルタント数 × 稼働率 × 単価', '店舗数 × 客単価 × 回転率', '設備投資 × 減価償却 × 在庫', '広告費 × クリック率 × 成約率'],
    answerIndex: 0,
    explanation:
      '人が資産のビジネスのため、何人が・どれだけ案件に稼働し・どの単価で提供できるかが収益のすべてを決めます。国内コンサル市場は年10%前後で成長中です。',
  },
  {
    id: 'q-cns-3',
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
      'PMO（Project Management Office）は複数チームが動く大型案件の司令塔。DX案件の拡大で、若手コンサルタントが最初に経験しやすい役割でもあります。',
  },
  {
    id: 'q-cns-4',
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
      '成果と成長を強く求める文化を象徴する言葉です。成長スピードの速さと表裏一体のプレッシャーを生みます（近年は緩和したファームも増えています）。',
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
      '100名 × 300万円 × 80% = 2.4億円。「人数×単価×稼働率」という掛け算が、コンサルの売上構造そのものです。',
  },
  {
    id: 'q-cns-6',
    type: 'industry',
    targetId: 'consulting',
    difficulty: 5,
    financial: true,
    prompt:
      'コンサルファームが利益率を落とさずに成長するうえで、最も筋が良いとされるレバーは？（財務データ問題）',
    choices: [
      '高付加価値化による単価の引き上げ',
      '稼働率を100%超に高める',
      'オフィス賃料の値切り',
      '広告費の倍増',
    ],
    answerIndex: 0,
    explanation:
      '人数拡大は採用・育成コストが、稼働率向上には限界（働き方悪化）があります。単価向上＝提供価値の高度化が最も持続的なレバーで、各ファームの戦略の違いが表れる点です。',
  },

  // ============ 企業: NTTデータグループ ============
  {
    id: 'q-nttdata-1',
    type: 'company',
    targetId: 'nttdata',
    difficulty: 1,
    prompt: 'NTTデータグループの主力事業は？',
    choices: [
      '官公庁・金融などの大規模システム開発（SI）',
      'スマートフォンの製造',
      'アパレルの製造小売',
      '自動車の組立',
    ],
    answerIndex: 0,
    explanation:
      '全銀システムや官公庁システムなど、社会インフラ級の大規模システムを手がける国内最大級のSIerです。売上収益は4兆6,387億円（2025年3月期）にのぼります。',
  },
  {
    id: 'q-nttdata-2',
    type: 'company',
    targetId: 'nttdata',
    difficulty: 2,
    prompt: 'NTTデータの成り立ちとして正しいのは？',
    choices: [
      '1988年にNTTのデータ通信部門が分社して誕生した',
      '2010年に外資系企業の日本法人として設立された',
      '戦前から続く財閥系商社である',
      '大学発ベンチャーとして創業した',
    ],
    answerIndex: 0,
    explanation:
      '電電公社からNTTへの民営化を経て、1988年にデータ通信部門が分社したのがNTTデータです。現在は世界50超の国・地域、従業員約19.8万人のグローバル企業です。',
  },
  {
    id: 'q-nttdata-3',
    type: 'company',
    targetId: 'nttdata',
    difficulty: 2,
    prompt: 'NTTデータの口コミ分析（サンプル）で、強みとして評価されているのは？',
    choices: [
      '研修・教育制度の充実と社会インフラ級の大規模案件',
      '全社員が完全歩合制であること',
      '転勤が世界一多いこと',
      '創業者のワンマン経営',
    ],
    answerIndex: 0,
    explanation:
      '教育体制の手厚さと「社会を支えるシステムに関わる誇り」が働きがいの柱です。働きやすさスコア78とリモートワークの浸透も評価されています。',
  },
  {
    id: 'q-nttdata-4',
    type: 'company',
    targetId: 'nttdata',
    difficulty: 3,
    prompt:
      '大規模案件の元請け（プライム）であるNTTデータの若手の働き方について、口コミで多い指摘は？',
    choices: [
      'プロジェクト管理や協力会社のマネジメントが中心で、自らコードを書く機会は少なめ',
      '全員が毎日プログラミングだけをしている',
      '顧客と会うことは一切ない',
      '入社1年目から必ず海外駐在する',
    ],
    answerIndex: 0,
    explanation:
      'プライムSIerの社員は多数の協力会社をまとめる立場になりやすく、マネジメント力が鍛えられる一方、「手を動かしたい人」にはギャップになり得ます。入社前に知っておきたい構造です。',
  },
  {
    id: 'q-nttdata-5',
    type: 'company',
    targetId: 'nttdata',
    difficulty: 4,
    financial: true,
    prompt:
      'NTTデータの売上収益4兆6,387億円・従業員約19万7,800人（2025年3月期）。従業員1人あたり売上高に最も近いのは？（財務データ問題）',
    choices: ['約2,300万円', '約230万円', '約2.3億円', '約23万円'],
    answerIndex: 0,
    explanation:
      '4兆6,387億円 ÷ 19万7,800人 ≒ 2,345万円/人。労働集約型のSI事業の生産性を測る基本指標で、単価の高いコンサルや少数精鋭のSaaSと比べる出発点になります。',
  },
  {
    id: 'q-nttdata-6',
    type: 'company',
    targetId: 'nttdata',
    difficulty: 5,
    financial: true,
    prompt:
      'NTTデータの営業利益率は約7%（営業利益3,239億円/売上4兆6,387億円、2025年3月期）。コンサル大手（30%超の例も）より低くなる構造的理由は？（財務データ問題）',
    choices: [
      '人月型の受託開発が中心で、外注費・人件費が原価の大半を占めるから',
      '広告宣伝費が売上の半分を占めるから',
      '全プロジェクトが赤字だから',
      '海外事業をまったく持たないから',
    ],
    answerIndex: 0,
    explanation:
      'SIは「人月」の積み上げで対価をもらうビジネスで、外注費・人件費が重く利益率は一桁台〜10%前後が一般的。単価の高い助言・構想策定を売るコンサル（例: ベイカレントは約37%）との構造差が数字に表れます。',
  },

  // ============ 企業: 三菱UFJフィナンシャル・グループ ============
  {
    id: 'q-mufg-1',
    type: 'company',
    targetId: 'mufg',
    difficulty: 1,
    prompt: '三菱UFJフィナンシャル・グループ（MUFG）の説明として正しいのは？',
    choices: [
      '三井住友FG・みずほFGと並ぶ「3メガバンク」の一角で、国内最大の総合金融グループ',
      '地方銀行の持株会社',
      'ネット専業銀行',
      '証券専業の独立系企業',
    ],
    answerIndex: 0,
    explanation:
      '2005年に三菱東京FGとUFJホールディングスが統合して発足。銀行・信託・証券・カードなどを傘下に持つ、国内最大の総合金融グループです（連結従業員約15.6万人）。',
  },
  {
    id: 'q-mufg-2',
    type: 'company',
    targetId: 'mufg',
    difficulty: 2,
    prompt: '銀行の決算で、一般企業の「売上高」に最も近い項目は？',
    choices: ['経常収益', '預金残高', '株主数', '店舗数'],
    answerIndex: 0,
    explanation:
      '銀行は「売上高」ではなく、貸出利息や手数料などを合計した「経常収益」を使います。MUFGの経常収益は13兆6,299億円（2025年3月期）です。',
  },
  {
    id: 'q-mufg-3',
    type: 'company',
    targetId: 'mufg',
    difficulty: 2,
    prompt: 'MUFGの口コミ分析（サンプル）で、最も高いスコア(94)がついている項目は？',
    choices: ['安定性・将来性', '働きがい', '成長環境', '組織文化'],
    answerIndex: 0,
    explanation:
      '雇用の安定と社会的信用が突出した強みです。一方で働きがい62・成長環境62と、安定と成長実感のトレードオフが口コミから読み取れます。',
  },
  {
    id: 'q-mufg-4',
    type: 'company',
    targetId: 'mufg',
    difficulty: 3,
    prompt: 'MUFGの口コミで繰り返し指摘される、カルチャー面の課題は？',
    choices: [
      '年功序列的な昇進運用と、配属・転勤の不透明さ',
      '研修制度が存在しないこと',
      'コンプライアンス意識の低さ',
      '雇用が不安定なこと',
    ],
    answerIndex: 0,
    explanation:
      '「支店と本部で働き方に差がある」という声も多数。安定を魅力と捉えるか、裁量・スピードの物足りなさと捉えるかが、企業選びの分岐点です。',
  },
  {
    id: 'q-mufg-5',
    type: 'company',
    targetId: 'mufg',
    difficulty: 4,
    financial: true,
    prompt:
      'MUFGは2025年3月期に純利益1兆8,629億円（前期比+25%）と過去最高益を記録。最大の追い風となった環境変化は？（財務データ問題）',
    choices: [
      '日銀のマイナス金利解除・利上げによる利ざやの改善',
      '消費税の減税',
      '店舗数の倍増',
      '暗号資産の高騰',
    ],
    answerIndex: 0,
    explanation:
      '「金利ある世界」への転換で貸出の利ざやが改善し、政策保有株の売却益も寄与。3メガバンクがそろって過去最高益となりました。金融業界研究では金利環境が最重要の外部要因です。',
  },
  {
    id: 'q-mufg-6',
    type: 'company',
    targetId: 'mufg',
    difficulty: 5,
    financial: true,
    prompt:
      'メガバンクが進める「政策保有株の売却」が資本効率の改善につながる理由は？（財務データ問題）',
    choices: [
      '取引維持目的で寝かせていた資本を回収し、成長投資や株主還元に回すことでROEが高まるから',
      '株を売ると法人税がゼロになるから',
      '売却すると預金が自動的に増えるから',
      '保有株が多いほどROEは高くなるから',
    ],
    answerIndex: 0,
    explanation:
      '取引先との関係維持のために持つ政策保有株は、リターンの低い資本の塊です。売却して自社株買いや成長投資に振り向ければROE（自己資本利益率）が改善し、株式市場からの評価向上につながります。',
  },

  // ============ 企業: ファーストリテイリング ============
  {
    id: 'q-fastretailing-1',
    type: 'company',
    targetId: 'fastretailing',
    difficulty: 1,
    prompt: 'ファーストリテイリングが展開する主力ブランドは？',
    choices: ['ユニクロとジーユー（GU）', 'しまむらとハニーズ', 'ZARAとH&M', '無印良品とニトリ'],
    answerIndex: 0,
    explanation:
      '1963年設立（前身は山口県の小郡商事）。ユニクロを中心に世界展開し、売上収益3兆4,005億円（2025年8月期）は世界のアパレルでもトップ級です。',
  },
  {
    id: 'q-fastretailing-2',
    type: 'company',
    targetId: 'fastretailing',
    difficulty: 2,
    prompt: 'ユニクロのビジネスモデルの根幹である「SPA」とは？',
    choices: [
      '商品企画から生産・販売までを自社で一貫して行う製造小売業',
      '他社ブランドを仕入れて販売するセレクトショップ',
      'フランチャイズ専業モデル',
      '訪問販売モデル',
    ],
    answerIndex: 0,
    explanation:
      '素材調達から店頭販売までを垂直統合することで、高品質・低価格と高い粗利率を両立。ヒートテックのような素材開発型の商品もSPAだから可能になります。',
  },
  {
    id: 'q-fastretailing-3',
    type: 'company',
    targetId: 'fastretailing',
    difficulty: 2,
    prompt: 'ファーストリテイリングの口コミ分析（サンプル）で、成長環境スコアが88と高い理由は？',
    choices: [
      '若手にも大きな裁量が与えられ、店長やグローバル人材への登用が速いから',
      '仕事が少なく自習時間が長いから',
      '年功序列で確実に昇進できるから',
      '研修が一切なく実地任せだから',
    ],
    answerIndex: 0,
    explanation:
      '「若手への大胆な権限委譲」と「経営者視点が鍛えられる環境」が口コミの評価の中心。一方で働きやすさ58と、成果への要求水準の高さはトレードオフです。',
  },
  {
    id: 'q-fastretailing-4',
    type: 'company',
    targetId: 'fastretailing',
    difficulty: 3,
    prompt: 'ファーストリテイリングの成長構造の説明として正しいのは？',
    choices: [
      '海外ユニクロ事業が国内ユニクロを上回る規模に成長し、グローバルが成長の柱になっている',
      '売上のほぼ全てを国内店舗が占めている',
      'EC販売から撤退した',
      '祖業のスーツ事業が最大セグメントである',
    ],
    answerIndex: 0,
    explanation:
      'アジア・欧米での出店拡大により、海外ユニクロ事業の売上・利益は国内を上回ります。就活では「どの事業が成長を牽引しているか」をセグメント情報で確認する習慣が重要です。',
  },
  {
    id: 'q-fastretailing-5',
    type: 'company',
    targetId: 'fastretailing',
    difficulty: 4,
    financial: true,
    prompt:
      'ファーストリテイリングの売上収益3兆4,005億円・営業利益5,450億円（2025年8月期）。営業利益率に最も近いのは？（財務データ問題）',
    choices: ['約16%', '約3%', '約34%', '約55%'],
    answerIndex: 0,
    explanation:
      '5,450 ÷ 34,005 ≒ 16.0%。総合スーパー（2〜3%）の5倍以上で、小売として突出した水準。5期連続の最高益更新（2025年8月期）を支える収益力です。',
  },
  {
    id: 'q-fastretailing-6',
    type: 'company',
    targetId: 'fastretailing',
    difficulty: 5,
    financial: true,
    prompt:
      'ファーストリテイリングが営業利益率約16%という小売離れした水準を実現できる構造的要因は？（財務データ問題）',
    choices: [
      'SPAにより全量が自社企画品で、価格決定権と高い粗利率を確保できるから',
      '店舗をすべて無人化しているから',
      '広告宣伝を一切行わないから',
      '国内販売に限定しているから',
    ],
    answerIndex: 0,
    explanation:
      '仕入れ販売の小売は他社商品の「販売手数料」で稼ぐ薄利構造ですが、SPAは企画・生産・販売の付加価値を全て取り込めます。ビジネスモデルの違いが利益率の差になる典型例です。',
  },

  // ============ 企業: トヨタ自動車 ============
  {
    id: 'q-toyota-1',
    type: 'company',
    targetId: 'toyota',
    difficulty: 1,
    prompt: 'トヨタ自動車の世界での位置づけとして正しいのは？',
    choices: [
      'グループ世界販売約1,000万台超で世界トップ級の自動車メーカー',
      '国内専業の軽自動車メーカー',
      '二輪車専業メーカー',
      '航空機専業メーカー',
    ],
    answerIndex: 0,
    explanation:
      'トヨタグループの世界販売は約1,082万台（2024年暦年）で5年連続世界一。1937年創業、連結従業員約38万人の日本最大の企業グループです。',
  },
  {
    id: 'q-toyota-2',
    type: 'company',
    targetId: 'toyota',
    difficulty: 2,
    prompt: '世界の製造業に影響を与えた「トヨタ生産方式」の柱として正しい組み合わせは？',
    choices: [
      'ジャストインタイムと自働化（異常があれば止まる仕組み）',
      '大量在庫と見込み生産',
      '完全外注と無検査',
      '手作業のみでの生産',
    ],
    answerIndex: 0,
    explanation:
      '「必要なものを、必要なときに、必要なだけ」作るジャストインタイムと、異常があればラインを止める自働化が二本柱。現場のカイゼン文化は口コミでも組織文化スコア74と高評価です。',
  },
  {
    id: 'q-toyota-3',
    type: 'company',
    targetId: 'toyota',
    difficulty: 2,
    prompt: 'トヨタの口コミ分析（サンプル）で、課題として挙げられているのは？',
    choices: [
      '大組織特有の縦割り・調整の多さと、勤務地が愛知県中心であること',
      '雇用が極めて不安定なこと',
      '福利厚生が全くないこと',
      '教育制度が存在しないこと',
    ],
    answerIndex: 0,
    explanation:
      '安定性92・待遇80と高評価の一方、巨大組織ゆえの調整の多さや、本社機能が愛知県（豊田市）中心である点は、キャリア観・生活設計との相性を考えたいポイントです。',
  },
  {
    id: 'q-toyota-4',
    type: 'company',
    targetId: 'toyota',
    difficulty: 3,
    prompt: '電動化に対するトヨタの戦略「マルチパスウェイ」の意味は？',
    choices: [
      'EVだけに絞らず、HV・PHEV・FCV・水素なども含め複数の選択肢を並行して追求する',
      'ガソリン車のみを作り続ける',
      '2025年に全車をEV化する',
      '自動車事業から撤退する',
    ],
    answerIndex: 0,
    explanation:
      '地域ごとのエネルギー事情に合わせ、全方位で脱炭素を目指すのがトヨタの戦略。ハイブリッド車の世界的な販売好調（2025年3月期の増収要因）はこの戦略を裏付けています。',
  },
  {
    id: 'q-toyota-5',
    type: 'company',
    targetId: 'toyota',
    difficulty: 4,
    financial: true,
    prompt:
      'トヨタの営業収益48兆367億円・営業利益4兆7,955億円（2025年3月期）。営業利益率に最も近いのは？（財務データ問題）',
    choices: ['約10%', '約1%', '約25%', '約48%'],
    answerIndex: 0,
    explanation:
      '4兆7,955億 ÷ 48兆367億 ≒ 10.0%。量産自動車メーカーとして世界トップ級の収益性です。売上48兆円は日本企業で断トツの規模になります。',
  },
  {
    id: 'q-toyota-6',
    type: 'company',
    targetId: 'toyota',
    difficulty: 5,
    financial: true,
    prompt:
      'トヨタの2025年3月期は売上が過去最高の一方、営業利益は前期比約10%減の「増収減益」。減益要因の説明として適切なのは？（財務データ問題）',
    choices: [
      'グループの認証問題に伴う生産停止の影響や、人への投資・成長投資の拡大が利益を圧迫した',
      '世界中で自動車が全く売れなくなった',
      '円高が急激に進行した',
      '全工場を閉鎖したため',
    ],
    answerIndex: 0,
    explanation:
      'HV好調や値上げで売上は最高を更新しつつ、認証問題による生産停止・リコール対応や労務費・成長投資が利益を圧迫。「増収減益」の中身を読み解くのは企業研究の実践力です。',
  },

  // ============ 企業: ベイカレント ============
  {
    id: 'q-baycurrent-1',
    type: 'company',
    targetId: 'baycurrent',
    difficulty: 1,
    prompt: 'ベイカレントの事業内容として正しいのは？',
    choices: [
      '戦略立案からDX実行支援までを手がける日系の総合コンサルティングファーム',
      '銀行業',
      '食品スーパーの運営',
      '半導体の製造',
    ],
    answerIndex: 0,
    explanation:
      '1998年設立の日系ファームで、2016年に上場。コンサルタント約4,800名を擁し、売上高1,161億円（2025年2月期）へと高成長を続けています。',
  },
  {
    id: 'q-baycurrent-2',
    type: 'company',
    targetId: 'baycurrent',
    difficulty: 2,
    prompt: 'ベイカレントの組織運営の特徴である「ワンプール制」とは？',
    choices: [
      '業界・テーマ別に部門を分けず、全コンサルタントを一つのプールで運用しアサインする仕組み',
      '社内にプールがある福利厚生',
      '全員が同じ案件だけを担当する制度',
      '新卒だけを集めた部署のこと',
    ],
    answerIndex: 0,
    explanation:
      '部門の壁がないため案件アサインの自由度が高く、若手が多様な業界・テーマを経験できます。稼働の効率化（ベンチ人員の最小化）にも寄与し、高い利益率の一因とされます。',
  },
  {
    id: 'q-baycurrent-3',
    type: 'company',
    targetId: 'baycurrent',
    difficulty: 2,
    prompt: 'ベイカレントの口コミ分析（サンプル）で、働きやすさスコアが55と低めである主因は？',
    choices: [
      'プロジェクトによって稼働の波が大きく、環境が案件次第で激変すること',
      'オフィスが存在しないこと',
      '給与水準が業界最低であること',
      '有給休暇の制度がないこと',
    ],
    answerIndex: 0,
    explanation:
      '成長環境90・待遇92と突出する一方、繁忙期の激務や案件ガチャはコンサル共通のトレードオフ。自分が何を優先するかを明確にして選ぶことが、入社後ギャップの防止につながります。',
  },
  {
    id: 'q-baycurrent-4',
    type: 'company',
    targetId: 'baycurrent',
    difficulty: 3,
    prompt: 'ベイカレントの報酬水準の説明として正しいのは？',
    choices: [
      '有価証券報告書ベースの平均年収は1,300万円を超え、上場企業でもトップクラス',
      '平均年収は約300万円である',
      '全社員が同一の固定給である',
      '報酬は全額ストックオプションで支払われる',
    ],
    answerIndex: 0,
    explanation:
      '高単価案件と高稼働を実現する収益構造が、高い報酬水準（平均年収1,300万円超）を支えています。口コミの待遇スコア92はこの構造の反映です。',
  },
  {
    id: 'q-baycurrent-5',
    type: 'company',
    targetId: 'baycurrent',
    difficulty: 4,
    financial: true,
    prompt:
      'ベイカレントの売上高1,161億円・営業利益426億円（2025年2月期）。営業利益率に最も近いのは？（財務データ問題）',
    choices: ['約37%', '約7%', '約16%', '約55%'],
    answerIndex: 0,
    explanation:
      '426 ÷ 1,161 ≒ 36.7%。SIer（NTTデータ約7%）やメーカー（トヨタ約10%）と比べても突出しており、コンサルの中でも際立つ高収益です。',
  },
  {
    id: 'q-baycurrent-6',
    type: 'company',
    targetId: 'baycurrent',
    difficulty: 5,
    financial: true,
    prompt:
      'ベイカレントが営業利益率約37%という高水準を実現できる構造の説明として、最も適切なのは？（財務データ問題）',
    choices: [
      '高単価案件へのシフトと、ワンプール制による高稼働率の維持で「単価×稼働」を最大化しているから',
      '人件費を業界最低水準に抑えているから',
      '不動産の売却益を毎年計上しているから',
      '広告宣伝費が売上の大半を占めるから',
    ],
    answerIndex: 0,
    explanation:
      'コンサルの利益は「人数×稼働率×単価」から人件費等を引いた残り。高単価化とワンプール制によるアサイン効率（ベンチ最小化）の両輪が、37%という利益率の源泉と分析されています。',
  },
]

export const questionsForTarget = (type: 'company' | 'industry', targetId: string) =>
  QUESTIONS.filter((q) => q.type === type && q.targetId === targetId)
