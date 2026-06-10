/* global React, C, SectionLabel, Section */
// lp_mid.jsx — Ritual (使い方), Target (こんな人に), Comparison (違い).

const RITUAL = [
  ["予約する", "RESERVE", "Web / PWA で、いつ・何を・どれくらいやるかを設定する。"],
  ["待っている", "WAIT", "定刻になると、机の上のBUNCHINが待機状態になる。"],
  ["タップして始める", "TAP", "ロボットに触れるとセッション開始。これが小さな儀式。"],
  ["静かに見守る", "FOCUS", "短い声かけのあとは話さない。STTもOFFで、ただ同席する。"],
  ["振り返る", "REVIEW", "終了後、今日できたことを1〜3分で短く振り返る。"],
  ["次の一歩を残す", "NEXT", "次回の最初の一歩を、戻れる形で残して終える。"],
];

function Ritual() {
  return (
    <Section id="ritual">
      <SectionLabel n="04" en="The Ritual" ja="使い方の流れ" />
      <div style={{ marginTop: 40, border: `1px solid ${C.line}` }}>
        {RITUAL.map((r, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr 130px", alignItems: "center", gap: "clamp(16px,3vw,32px)", padding: "24px clamp(20px,3vw,28px)", borderBottom: i < RITUAL.length - 1 ? `1px solid ${C.line}` : "none", background: C.panel }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, letterSpacing: "0.08em", color: C.blue }}>{String(i + 1).padStart(2, "0")}<span style={{ color: C.mut3 }}>/06</span></span>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(19px, 1.9vw, 23px)", color: C.ink }}>{r[0]}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#8a8a8a", lineHeight: 1.7 }}>{r[2]}</span>
            </div>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: 15, letterSpacing: "0.06em", color: C.mut2, textAlign: "right" }}>{r[1]}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

const TARGETS = [
  ["資格学習を続けたい", "試験勉強のリズムを、机の上に固定する。"],
  ["語学を習慣にしたい", "毎日の短い学習を、続く形にする。"],
  ["在宅でスマホに流れがち", "作業前のスマホを、タップ開始に置き換える。"],
  ["副業・個人制作の時間を作りたい", "「あとで」を、予約した一席に変える。"],
  ["読書・日記・勉強を続けたい", "毎晩の小さな習慣に、同席者をつける。"],
  ["AIロボット・習慣化に関心がある", "新しい行動支援プロダクトを一緒に育てる。"],
];

function Target() {
  return (
    <Section id="target">
      <SectionLabel n="05" en="Who it's for" ja="こんな人に試してほしい" />
      <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.9, color: C.mut, margin: "28px 0 0", maxWidth: 640 }}>
        想定しているのは、<span style={{ color: C.ink }}>在宅ワーカーや社会人</span>など、ひとりで努力の時間を確保したい方です。
      </p>
      <div style={{ marginTop: 36, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 1, background: C.line, border: `1px solid ${C.line}` }}>
        {TARGETS.map((t, i) => (
          <div key={i} style={{ background: C.panel, padding: "26px 24px", display: "flex", flexDirection: "column", gap: 10, minHeight: 132 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", color: C.mut3 }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(17px,1.7vw,20px)", color: C.ink, lineHeight: 1.45 }}>{t[0]}</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.7, color: C.mut, marginTop: "auto" }}>{t[1]}</span>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 24, border: `1px solid ${C.line}`, background: "#080808", padding: "22px 26px", display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", color: C.blue, marginTop: 4 }}>FIELD TEST</span>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.3vw,16px)", lineHeight: 1.8, color: C.mut, margin: 0, maxWidth: 760 }}>
          <span style={{ color: C.ink }}>松江周辺で実機テストに協力できる方</span>、また<span style={{ color: C.ink }}>Web上で仮想デモに参加できる方</span>を募集しています。遠方の方はオンラインからご参加いただけます。
        </p>
      </div>
    </Section>
  );
}

const COMPARE = [
  ["習慣化アプリ", "通知だけ", "机上のロボットが物理的に同席する"],
  ["AIチャットアプリ", "開く会話相手", "努力時間に同席する存在"],
  ["会話ロボット", "長時間の雑談", "開始・休憩・立て直し・振り返りに集中"],
  ["癒しロボット", "癒しだけ", "行動の開始と再開を支援する"],
  ["スマートスピーカー", "汎用アシスタント", "固定ペルソナ・目標記憶・努力ログを持つ"],
];

function Comparison() {
  return (
    <Section id="difference">
      <SectionLabel n="06" en="Difference" ja="既存サービスとの違い" />
      <div style={{ marginTop: 40, border: `1px solid ${C.line}`, overflowX: "auto" }}>
        <div style={{ minWidth: 620 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr", background: "#080808", borderBottom: `1px solid ${C.line}` }}>
            {["比較対象", "それは", "BUNCHINは"].map((h, i) => (
              <span key={i} style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", color: i === 2 ? C.blue : C.mut3, textTransform: "uppercase", padding: "16px 24px", borderRight: i < 2 ? `1px solid ${C.line}` : "none" }}>{h}</span>
            ))}
          </div>
          {COMPARE.map((c, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1.5fr", background: C.panel, borderBottom: i < COMPARE.length - 1 ? `1px solid ${C.line}` : "none" }}>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 15, color: C.ink, padding: "20px 24px", borderRight: `1px solid ${C.line}` }}>{c[0]}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 15, color: C.mut2, padding: "20px 24px", borderRight: `1px solid ${C.line}` }}>{c[1]}</span>
              <span style={{ fontFamily: "var(--font-body)", fontSize: 15, color: C.ink, padding: "20px 24px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 6, height: 6, background: C.blue, flexShrink: 0 }} />{c[2]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

Object.assign(window, { Ritual, Target, Comparison });
