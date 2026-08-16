import type { Company, Industry, Question, Tier, Unit } from '../types'
import { COMPANIES } from '../data/companies'
import { INDUSTRIES, industryById } from '../data/industries'

// ------------------------------------------------------------------
// クイズ自動生成
//
// 企業・業界マスタ（本番は外部APIから取得）を元に、級ごとの
// テンプレートで4択問題を決定的に生成する。
//   企業クイズ: 5社 × 3級 × 10問 = 150問
//   業界クイズ: 5業界 × 3級 × 10問 = 150問
// 正解は answerIndex: 0 に置き、表示時にシャッフルされる。
// ------------------------------------------------------------------

const fmtOku = (oku: number): string => {
  const v = Math.round(oku)
  if (v >= 10000) {
    const cho = Math.floor(v / 10000)
    const rest = v % 10000
    return rest ? `約${cho}兆${rest.toLocaleString()}億円` : `約${cho}兆円`
  }
  return `約${v.toLocaleString()}億円`
}

const fmtEmployees = (n: number): string => {
  if (n >= 10000) return `約${Math.round(n / 10000).toLocaleString()}万人`
  if (n >= 1000) return `約${(Math.round(n / 100) / 10).toFixed(1).replace(/\.0$/, '')}千人`
  return `約${n.toLocaleString()}人`
}

const fmtMan = (man: number): string => {
  if (man >= 10000) return `約${(man / 10000).toFixed(1).replace(/\.0$/, '')}億円`
  return `約${Math.round(man).toLocaleString()}万円`
}

const pct = (v: number): string => `${v > 0 ? '+' : ''}${Math.round(v * 10) / 10}%`

/** 数値系の選択肢: 正解を先頭に、桁・水準違いの誤答を並べる（フォーマット後の重複を除去） */
function numChoices(correct: number, fmt: (n: number) => string, mults: number[]): string[] {
  const out = [fmt(correct)]
  for (const m of mults) {
    const s = fmt(correct * m)
    if (!out.includes(s)) out.push(s)
    if (out.length === 4) break
  }
  let extra = 3
  while (out.length < 4) {
    const s = fmt(correct * extra + 1)
    if (!out.includes(s)) out.push(s)
    extra += 2
  }
  return out
}

/** カテゴリ系の選択肢: 正解 + 他対象の値から重複しない3つ */
function catChoices(correct: string, pool: string[]): string[] {
  const out = [correct]
  for (const p of pool) {
    if (!out.includes(p) && out.length < 4) out.push(p)
  }
  return out
}

const monthOf = (fiscal: string): string => {
  const m = fiscal.match(/(\d+)月期/)
  return m ? `${m[1]}月` : '3月'
}

const marginOf = (profit: number, rev: number) => Math.round((profit / rev) * 1000) / 10

// ------------------------------------------------------------------
// 企業クイズ
// ------------------------------------------------------------------

function companyQuestions(c: Company, all: Company[]): Question[] {
  const others = all.filter((x) => x.id !== c.id)
  const otherInd = others.filter((x) => x.industryId !== c.industryId)
  const indName = industryById(c.industryId)!.name
  const qs: Omit<Question, 'id' | 'kind' | 'tier' | 'targetId'>[][] = [[], [], []]
  const margin = marginOf(c.profitOku, c.revenueOku)
  const perHeadRev = (c.revenueOku * 10000) / c.employees // 万円
  const perHeadProf = (c.profitOku * 10000) / c.employees
  const cmp = others[0]
  const cmpMargin = marginOf(cmp.profitOku, cmp.revenueOku)
  const rank =
    all.filter((x) => x.revenueOku > c.revenueOku).length + 1

  // ---------- 初級 ----------
  qs[0].push(
    {
      prompt: `${c.name}の証券コード（銘柄コード）は？`,
      choices: catChoices(c.ticker, others.map((o) => o.ticker)),
      answerIndex: 0,
      explanation: `${c.name}の証券コードは${c.ticker}。株式市場では4桁のコードで銘柄を識別します。\n【豆知識】${c.trivia[0]}`,
    },
    {
      prompt: `${c.name}の本社所在地は？`,
      choices: catChoices(c.hq, others.map((o) => o.hq)),
      answerIndex: 0,
      explanation: `本社は${c.hq}。本社所在地は企業の成り立ちや文化を知る手がかりになります。`,
    },
    {
      prompt: `${c.name}の設立（創業）年は？`,
      choices: catChoices(String(c.founded) + '年', others.map((o) => String(o.founded) + '年')),
      answerIndex: 0,
      explanation: `${c.founded}年に設立（創業）。企業の歴史の長さは事業の変遷とあわせて押さえましょう。\n【豆知識】${c.trivia[1]}`,
    },
    {
      prompt: `${c.name}が主に属する業界は？`,
      choices: catChoices(indName, INDUSTRIES.filter((i) => i.id !== c.industryId).map((i) => i.name)),
      answerIndex: 0,
      explanation: `${c.name}は${indName}業界に分類されます。`,
    },
    {
      prompt: `${c.name}の主力事業は？`,
      choices: catChoices(c.business, others.map((o) => o.business)),
      answerIndex: 0,
      explanation: `主力事業は「${c.business}」です。`,
    },
    {
      prompt: `「${c.brands[0]}」を展開している企業は？`,
      choices: catChoices(c.name, others.map((o) => o.name)),
      answerIndex: 0,
      explanation: `${c.brands[0]}は${c.name}のブランド・製品です。\n【豆知識】${c.trivia[2]}`,
    },
    {
      prompt: `${c.name}の従業員数（連結・概数）に最も近いのは？`,
      choices: numChoices(c.employees, fmtEmployees, [3, 0.3, 10]),
      answerIndex: 0,
      explanation: `連結従業員数は${fmtEmployees(c.employees)}（${c.fiscal}）。企業規模の基本情報です。`,
    },
    {
      prompt: `${c.name}の本決算の月（決算期）は？`,
      choices: catChoices(monthOf(c.fiscal), ['3月', '8月', '12月', '6月'].filter((m) => m !== monthOf(c.fiscal))),
      answerIndex: 0,
      explanation: `決算期は${c.fiscal}（${monthOf(c.fiscal)}末締め）。決算発表の時期を知る基本です。`,
    },
    {
      prompt: `${c.name}の${c.revLabel}（${c.fiscal}・概数）に最も近いのは？`,
      choices: numChoices(c.revenueOku, fmtOku, [0.5, 2, 10]),
      answerIndex: 0,
      explanation: `${c.revLabel}は${fmtOku(c.revenueOku)}（${c.fiscal}）。まずは売上規模の桁感覚をつかみましょう。\n【推移】${c.trend}`,
    },
    {
      prompt: `${indName}業界に属する企業は？`,
      choices: catChoices(c.name, otherInd.map((o) => o.name)),
      answerIndex: 0,
      explanation: `${c.name}が${indName}業界の企業です。`,
    },
  )

  // ---------- 中級 ----------
  const otherSegment = others.map((o) => o.segments).flat().find((s) => !c.segments.includes(s))!
  const otherBrand = others[0].brands[0]
  qs[1].push(
    {
      prompt: `${c.name}の事業セグメントに含まれるのは？`,
      choices: catChoices(c.segments[0], others.flatMap((o) => o.segments).filter((s) => !c.segments.includes(s))),
      answerIndex: 0,
      explanation: `${c.name}の主要セグメントは${c.segments.join('・')}です。`,
    },
    {
      prompt: `${c.name}のビジネスモデルの分類として最も適切なのは？`,
      choices: catChoices(c.model, others.map((o) => o.model)),
      answerIndex: 0,
      explanation: `${c.name}は「${c.model}」に分類されます。モデルの違いは利益率の違いにつながります。`,
    },
    {
      prompt: `${c.name}の主要な競合企業は？`,
      choices: catChoices(
        c.rivals[0],
        others.flatMap((o) => o.rivals).filter((r) => !c.rivals.includes(r) && r !== c.name),
      ),
      answerIndex: 0,
      explanation: `主要な競合は${c.rivals.join('、')}など。競合との比較は企業研究の基本動作です。`,
    },
    {
      prompt: `${c.name}の強みの源泉として最も適切なのは？`,
      choices: catChoices(c.strength, others.map((o) => o.strength)),
      answerIndex: 0,
      explanation: `${c.name}の強みは「${c.strength}」とされています。`,
    },
    {
      prompt: `${c.name}に関する近年の注目トピックは？`,
      choices: catChoices(c.topic, others.map((o) => o.topic)),
      answerIndex: 0,
      explanation: `「${c.topic}」が近年の重要テーマです。面接・商談の話題としても頻出です。\n【豆知識】${c.trivia[0]}`,
    },
    {
      prompt: `「${c.brands[1]}」を展開している企業は？`,
      choices: catChoices(c.name, others.map((o) => o.name)),
      answerIndex: 0,
      explanation: `${c.brands[1]}は${c.name}のブランド・製品です。`,
    },
    {
      prompt: `${c.name}の事業セグメントに含まれないのは？`,
      choices: [otherSegment, ...c.segments.slice(0, 3)],
      answerIndex: 0,
      explanation: `「${otherSegment}」は他社のセグメントです。${c.name}の柱は${c.segments.join('・')}です。`,
    },
    {
      prompt: `${c.name}の説明として正しいのは？`,
      choices: catChoices(
        `${c.business}を手がけ、${c.strength}を強みとする`,
        others.map((o) => `${o.business}を手がけ、${o.strength}を強みとする`),
      ),
      answerIndex: 0,
      explanation: `${c.name}は${c.business}を行い、「${c.strength}」が競争力の源泉です。`,
    },
    {
      prompt: `${c.name}のブランド・製品でないのは？`,
      choices: [otherBrand, ...c.brands.slice(0, 3)],
      answerIndex: 0,
      explanation: `「${otherBrand}」は${others[0].name}のブランドです。`,
    },
    {
      prompt: `${c.name}の${c.fiscal}の増収率（${c.revLabel}の伸び）に最も近いのは？`,
      choices: catChoices(
        pct(c.growthPct),
        [pct(c.growthPct + 12), pct(c.growthPct - 9), pct(-c.growthPct || 5)],
      ),
      answerIndex: 0,
      explanation: `${c.fiscal}の${c.revLabel}は前期比${pct(c.growthPct)}でした。\n【推移】${c.trend}`,
    },
  )

  // ---------- 上級 ----------
  const revBigger = c.revenueOku >= cmp.revenueOku ? c.name : cmp.name
  const marginHigher = margin >= cmpMargin ? c.name : cmp.name
  qs[2].push(
    {
      prompt: `${c.name}の${c.profLabel}（${c.fiscal}・概数）に最も近いのは？`,
      choices: numChoices(c.profitOku, fmtOku, [0.4, 2.5, 8]),
      answerIndex: 0,
      explanation: `${c.profLabel}は${fmtOku(c.profitOku)}（${c.fiscal}）。\n【推移】${c.trend}`,
    },
    {
      prompt: `${c.name}の${c.profLabel}率（${c.profLabel}÷${c.revLabel}）に最も近いのは？（${c.fiscal}）`,
      choices: catChoices(`約${margin}%`, [`約${margin + 8}%`, `約${Math.max(1, Math.round(margin - 6))}%`, `約${Math.round(margin * 2.5)}%`]),
      answerIndex: 0,
      explanation: `${fmtOku(c.profitOku)} ÷ ${fmtOku(c.revenueOku)} ≒ ${margin}%。利益率はビジネスモデルの通信簿です。`,
    },
    {
      prompt: `${c.name}の従業員1人あたり${c.revLabel}（概算）に最も近いのは？`,
      choices: numChoices(perHeadRev, fmtMan, [0.4, 2.5, 10]),
      answerIndex: 0,
      explanation: `${fmtOku(c.revenueOku)} ÷ ${fmtEmployees(c.employees)} ≒ ${fmtMan(perHeadRev)}/人。生産性の目安になります。`,
    },
    {
      prompt: `${c.name}の従業員1人あたり${c.profLabel}（概算）に最も近いのは？`,
      choices: numChoices(perHeadProf, fmtMan, [0.4, 2.5, 10]),
      answerIndex: 0,
      explanation: `${fmtOku(c.profitOku)} ÷ ${fmtEmployees(c.employees)} ≒ ${fmtMan(perHeadProf)}/人。事業構造が違う企業との単純比較には注意が必要です。`,
    },
    {
      prompt: `${c.fiscal}の${c.name}の${c.revLabel}は、前期と比べてどう変化した？`,
      choices: [
        c.growthPct >= 0 ? `約${pct(c.growthPct)}の増収` : `約${Math.abs(Math.round(c.growthPct))}%の減収`,
        c.growthPct >= 0 ? `約${Math.abs(Math.round(c.growthPct))}%の減収` : `約+${Math.abs(Math.round(c.growthPct))}%の増収`,
        'ほぼ横ばい（±1%未満）',
        '前期比で約2倍に拡大',
      ],
      answerIndex: 0,
      explanation: `${c.revLabel}は前期比${pct(c.growthPct)}。増減の背景（市況・製品サイクル等）まで説明できると上級です。\n【推移】${c.trend}`,
    },
    {
      prompt: `${c.name}（${c.revLabel}${fmtOku(c.revenueOku)}）と${cmp.name}（${cmp.revLabel}${fmtOku(cmp.revenueOku)}）。売上規模が大きいのは？`,
      choices: [revBigger, revBigger === c.name ? cmp.name : c.name, 'ほぼ同規模（差は1割未満）', 'この情報では判断できない'],
      answerIndex: 0,
      explanation: `${revBigger}の方が大きい規模です。桁の比較を瞬時にできるようにしましょう。`,
    },
    {
      prompt: `${c.name}（利益率約${margin}%）と${cmp.name}（同約${cmpMargin}%）。利益率が高いのは？`,
      choices: [marginHigher, marginHigher === c.name ? cmp.name : c.name, '両社ほぼ同率', 'この情報では判断できない'],
      answerIndex: 0,
      explanation: `${marginHigher}の利益率が高い水準です。ただし利益率の差はビジネスモデルの差として読むのが基本です。`,
    },
    {
      prompt: `このアプリ収録5社の中で、${c.name}の${c.revLabel}の規模は何番目？`,
      choices: catChoices(
        `${rank}番目`,
        [`${Math.min(5, rank + 1)}番目`, `${Math.max(1, rank - 1)}番目`, rank === 1 ? '5番目' : '1番目'],
      ),
      answerIndex: 0,
      explanation: `収録5社では${rank}番目の売上規模です（概数比較）。`,
    },
    {
      prompt: `${c.name}の${c.revLabel}（${c.fiscal}）として最も正確なのは？`,
      choices: numChoices(c.revenueOku, fmtOku, [0.7, 1.5, 3]),
      answerIndex: 0,
      explanation: `${c.revLabel}は${fmtOku(c.revenueOku)}。近い数値の中から正確に選べれば、規模感は完璧です。\n【推移】${c.trend}`,
    },
    {
      prompt: `${c.name}の${c.profLabel}率は約${margin}%。この数字の読み方として最も適切なのは？`,
      choices: [
        `「${c.model}」という事業構造を踏まえて水準を評価すべきで、高低だけで優劣は判断できない`,
        '利益率は高いほど必ず優れた企業だと判断できる',
        '利益率が20%未満の企業は投資・就職先として避けるべきである',
        '利益率は毎年ほぼ一定で、変化を追う意味はない',
      ],
      answerIndex: 0,
      explanation: `利益率の適正水準は業界・モデルで異なります。数字を構造とセットで解釈するのが決算読解の到達点です。`,
    },
  )

  const tiers: Tier[] = ['beginner', 'intermediate', 'advanced']
  return tiers.flatMap((tier, ti) =>
    qs[ti].map((q, i) => ({
      ...q,
      id: `company-${c.id}-${tier}-${i + 1}`,
      kind: 'company' as const,
      tier,
      targetId: c.id,
    })),
  )
}

// ------------------------------------------------------------------
// 業界クイズ
// ------------------------------------------------------------------

function industryQuestions(ind: Industry, all: Industry[]): Question[] {
  const others = all.filter((x) => x.id !== ind.id)
  const qs: Omit<Question, 'id' | 'kind' | 'tier' | 'targetId'>[][] = [[], [], []]
  const rep = ind.rep
  const margin = marginOf(rep.profitOku, rep.revenueOku)
  const perHeadRev = (rep.revenueOku * 10000) / rep.employees
  const perHeadProf = (rep.profitOku * 10000) / rep.employees
  const cmp = others[0]
  const cmpMargin = marginOf(cmp.rep.profitOku, cmp.rep.revenueOku)
  const marginHigher = margin >= cmpMargin ? rep.name : cmp.rep.name

  // ---------- 初級 ----------
  qs[0].push(
    {
      prompt: `${ind.name}業界の主要企業は？`,
      choices: catChoices(ind.majors[0], others.map((o) => o.majors[0])),
      answerIndex: 0,
      explanation: `${ind.name}業界の主要企業には${ind.majors.slice(0, 3).join('、')}などがあります。`,
    },
    {
      prompt: `次のうち、${ind.name}業界に属する企業は？`,
      choices: catChoices(ind.majors[1], others.map((o) => o.majors[1])),
      answerIndex: 0,
      explanation: `${ind.majors[1]}は${ind.name}業界の主要企業です。`,
    },
    {
      prompt: `${ind.name}業界の主要企業に含まれないのは？`,
      choices: [ind.nonMajor, ...ind.majors.slice(0, 3)],
      answerIndex: 0,
      explanation: `${ind.nonMajor}は別業界の企業です。${ind.name}業界の主要企業は${ind.majors.slice(0, 3).join('、')}など。`,
    },
    {
      prompt: `${ind.name}業界の規模を示す数字として正しいのは？`,
      choices: ind.sizeChoices,
      answerIndex: 0,
      explanation: `${ind.sizeText}（概数）。業界の規模感は数字で押さえるのが基本です。\n【豆知識】${ind.trivia[0]}`,
    },
    {
      prompt: `${ind.name}業界のビジネスモデルの説明として正しいのは？`,
      choices: catChoices(ind.model, others.map((o) => o.model)),
      answerIndex: 0,
      explanation: `${ind.name}業界は「${ind.model}」が基本構造です。`,
    },
    {
      prompt: `「${ind.kpiDef}」——この指標は？`,
      choices: catChoices(ind.kpi, others.map((o) => o.kpi)),
      answerIndex: 0,
      explanation: `${ind.name}業界の重要KPIは「${ind.kpi}」です。`,
    },
    {
      prompt: `${ind.name}業界の用語「${ind.terms[0].w}」の意味は？`,
      choices: catChoices(ind.terms[0].d, others.map((o) => o.terms[0].d)),
      answerIndex: 0,
      explanation: `${ind.terms[0].w}とは「${ind.terms[0].d}」のことです。`,
    },
    {
      prompt: `次のうち、${ind.name}業界の主要企業は？`,
      choices: catChoices(ind.majors[2], others.map((o) => o.majors[2])),
      answerIndex: 0,
      explanation: `${ind.majors[2]}も${ind.name}業界の主要プレイヤーです。`,
    },
    {
      prompt: `「${ind.model}」——このビジネスモデルが当てはまる業界は？`,
      choices: catChoices(ind.name, others.map((o) => o.name)),
      answerIndex: 0,
      explanation: `この構造は${ind.name}業界のものです。モデルから業界を逆引きできると理解が深まります。`,
    },
    {
      prompt: `${rep.name}が属する業界は？`,
      choices: catChoices(ind.name, others.map((o) => o.name)),
      answerIndex: 0,
      explanation: `${rep.name}は${ind.name}業界の代表的企業です。\n【豆知識】${ind.trivia[1]}`,
    },
  )

  // ---------- 中級 ----------
  qs[1].push(
    {
      prompt: `${ind.name}業界の近年の重要トレンドは？`,
      choices: catChoices(ind.trend, others.map((o) => o.trend)),
      answerIndex: 0,
      explanation: `「${ind.trend}」が${ind.name}業界の重要テーマです。`,
    },
    {
      prompt: `${ind.name}業界が抱える構造的な課題は？`,
      choices: catChoices(ind.challenge, others.map((o) => o.challenge)),
      answerIndex: 0,
      explanation: `「${ind.challenge}」が課題とされています。トレンドと課題はセットで語れるようにしましょう。`,
    },
    {
      prompt: `${ind.name}業界の用語「${ind.terms[1].w}」の意味は？`,
      choices: catChoices(ind.terms[1].d, others.map((o) => o.terms[1].d)),
      answerIndex: 0,
      explanation: `${ind.terms[1].w}とは「${ind.terms[1].d}」のことです。`,
    },
    {
      prompt: `${ind.name}業界の用語「${ind.terms[2].w}」の意味は？`,
      choices: catChoices(ind.terms[2].d, others.map((o) => o.terms[2].d)),
      answerIndex: 0,
      explanation: `${ind.terms[2].w}とは「${ind.terms[2].d}」のことです。`,
    },
    {
      prompt: `${ind.name}業界のKPI「${ind.kpi}」の意味として正しいのは？`,
      choices: catChoices(ind.kpiDef, others.map((o) => o.kpiDef)),
      answerIndex: 0,
      explanation: `${ind.kpi}は「${ind.kpiDef}」。決算資料でもこの指標の推移が開示されます。`,
    },
    {
      prompt: `次のうち、${ind.name}業界の主要企業は？`,
      choices: catChoices(ind.majors[3], others.map((o) => o.majors[3])),
      answerIndex: 0,
      explanation: `${ind.majors[3]}も${ind.name}業界の主要企業です。上位プレイヤーは4〜5社セットで覚えましょう。`,
    },
    {
      prompt: `${ind.name}業界の説明として正しいのは？`,
      choices: catChoices(
        `${ind.model}。近年は${ind.trend}が進む`,
        others.map((o) => `${o.model}。近年は${o.trend}が進む`),
      ),
      answerIndex: 0,
      explanation: `構造（${ind.model}）とトレンド（${ind.trend}）を一文で説明できるのが中級の到達点です。`,
    },
    {
      prompt: `${ind.name}業界の代表企業${rep.name}の${rep.fiscal}の増収率に最も近いのは？`,
      choices: catChoices(
        pct(rep.growthPct),
        [pct(rep.growthPct + 12), pct(rep.growthPct - 9), pct(-rep.growthPct || 6)],
      ),
      answerIndex: 0,
      explanation: `${rep.name}の${rep.revLabel}は前期比${pct(rep.growthPct)}（${rep.fiscal}）でした。\n【推移】${ind.repTrend}`,
    },
    {
      prompt: `${ind.name}業界の用語「${ind.terms[3].w}」の意味は？`,
      choices: catChoices(ind.terms[3].d, others.map((o) => o.terms[3].d)),
      answerIndex: 0,
      explanation: `${ind.terms[3].w}とは「${ind.terms[3].d}」のことです。`,
    },
    {
      prompt: `「${ind.trend}」——この動きが起きている業界は？`,
      choices: catChoices(ind.name, others.map((o) => o.name)),
      answerIndex: 0,
      explanation: `${ind.name}業界のトレンドです。ニュースを業界に紐づけて整理しましょう。`,
    },
  )

  // ---------- 上級 ----------
  qs[2].push(
    {
      prompt: `${ind.name}業界の代表企業${rep.name}の${rep.revLabel}（${rep.fiscal}・概数）に最も近いのは？`,
      choices: numChoices(rep.revenueOku, fmtOku, [0.5, 2, 10]),
      answerIndex: 0,
      explanation: `${rep.name}の${rep.revLabel}は${fmtOku(rep.revenueOku)}。業界首位級の規模を基準値として覚えましょう。\n【推移】${ind.repTrend}`,
    },
    {
      prompt: `${rep.name}の${rep.profLabel}（${rep.fiscal}・概数）に最も近いのは？`,
      choices: numChoices(rep.profitOku, fmtOku, [0.4, 2.5, 8]),
      answerIndex: 0,
      explanation: `${rep.profLabel}は${fmtOku(rep.profitOku)}です。`,
    },
    {
      prompt: `${rep.name}の${rep.profLabel}率（${rep.profLabel}÷${rep.revLabel}）に最も近いのは？`,
      choices: catChoices(`約${margin}%`, [`約${margin + 9}%`, `約${Math.max(1, Math.round(margin - 6))}%`, `約${Math.round(margin * 2.5)}%`]),
      answerIndex: 0,
      explanation: `${fmtOku(rep.profitOku)} ÷ ${fmtOku(rep.revenueOku)} ≒ ${margin}%。この水準が${ind.name}業界の一つの目安になります。`,
    },
    {
      prompt: `${rep.name}の従業員1人あたり${rep.revLabel}（概算）に最も近いのは？`,
      choices: numChoices(perHeadRev, fmtMan, [0.4, 2.5, 10]),
      answerIndex: 0,
      explanation: `${fmtOku(rep.revenueOku)} ÷ ${fmtEmployees(rep.employees)} ≒ ${fmtMan(perHeadRev)}/人です。`,
    },
    {
      prompt: `${rep.fiscal}の${rep.name}の${rep.revLabel}は、前期と比べてどう変化した？`,
      choices: [
        rep.growthPct >= 0 ? `約${pct(rep.growthPct)}の増収` : `約${Math.abs(Math.round(rep.growthPct))}%の減収`,
        rep.growthPct >= 0 ? `約${Math.abs(Math.round(rep.growthPct))}%の減収` : `約+${Math.abs(Math.round(rep.growthPct))}%の増収`,
        'ほぼ横ばい（±1%未満）',
        '前期比で約2倍に拡大',
      ],
      answerIndex: 0,
      explanation: `前期比${pct(rep.growthPct)}。業界のサイクル（例: 製品世代交代、市況）と関連づけて解釈しましょう。\n【推移】${ind.repTrend}`,
    },
    {
      prompt: `${rep.name}（利益 ${fmtOku(rep.profitOku)} / 売上 ${fmtOku(rep.revenueOku)}）と${cmp.rep.name}（利益 ${fmtOku(cmp.rep.profitOku)} / 売上 ${fmtOku(cmp.rep.revenueOku)}）。利益率が高いのは？`,
      choices: [marginHigher, marginHigher === rep.name ? cmp.rep.name : rep.name, '両社ほぼ同率', 'この情報では判断できない'],
      answerIndex: 0,
      explanation: `${rep.name}は約${margin}%、${cmp.rep.name}は約${cmpMargin}%。割り算で比較する習慣をつけましょう。`,
    },
    {
      prompt: `${rep.name}の従業員1人あたり${rep.profLabel}（概算）に最も近いのは？`,
      choices: numChoices(perHeadProf, fmtMan, [0.4, 2.5, 10]),
      answerIndex: 0,
      explanation: `${fmtOku(rep.profitOku)} ÷ ${fmtEmployees(rep.employees)} ≒ ${fmtMan(perHeadProf)}/人です。`,
    },
    {
      prompt: `「${ind.terms[1].d}」——この説明に当てはまる${ind.name}業界の用語は？`,
      choices: catChoices(ind.terms[1].w, others.map((o) => o.terms[1].w)),
      answerIndex: 0,
      explanation: `「${ind.terms[1].w}」の説明です。用語は定義から逆引きできて初めて使えます。`,
    },
    {
      prompt: `${ind.name}業界の規模を示す統計（${ind.sizeText.split(' ')[0]}）として正しいのは？`,
      choices: ind.sizeChoices,
      answerIndex: 0,
      explanation: `${ind.sizeText}。桁を正確に覚えているかが上級の分かれ目です。`,
    },
    {
      prompt: `${ind.name}業界の決算数値を読む姿勢として最も適切なのは？`,
      choices: [
        `「${ind.model}」という業界構造を踏まえ、利益率や成長率の水準を解釈する`,
        'どの業界も利益率10%を超えていれば優良と一律に判断する',
        '業界構造は無視し、直近の株価の動きだけで判断する',
        '売上の大きい企業ほど利益率も必ず高いと考える',
      ],
      answerIndex: 0,
      explanation: `数字は構造とセットで読むのが鉄則。${ind.name}業界なら「${ind.model}」を前提に水準を評価します。`,
    },
  )

  const tiers: Tier[] = ['beginner', 'intermediate', 'advanced']
  return tiers.flatMap((tier, ti) =>
    qs[ti].map((q, i) => ({
      ...q,
      id: `industry-${ind.id}-${tier}-${i + 1}`,
      kind: 'industry' as const,
      tier,
      targetId: ind.id,
    })),
  )
}

// ------------------------------------------------------------------
// 生成結果
// ------------------------------------------------------------------

export const QUESTIONS: Question[] = [
  ...COMPANIES.flatMap((c) => companyQuestions(c, COMPANIES)),
  ...INDUSTRIES.flatMap((i) => industryQuestions(i, INDUSTRIES)),
]

export const UNITS: Unit[] = (['beginner', 'intermediate', 'advanced'] as Tier[]).flatMap((tier) => [
  ...COMPANIES.map((c) => ({ kind: 'company' as const, tier, targetId: c.id, title: `${c.name}編` })),
  ...INDUSTRIES.map((i) => ({ kind: 'industry' as const, tier, targetId: i.id, title: `${i.name}編` })),
])

export const questionById = (id: string) => QUESTIONS.find((q) => q.id === id)
