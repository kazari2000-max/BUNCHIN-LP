/* global React, HeroRitualDemo, C, PAD, SectionLabel, Section, CtaPrimary, CtaGhost */
// lp_top.jsx — TopBar, Hero, Problem, IsIsnt (BUNCHINとは).

function TopBar() {
  const link = { fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", color: C.mut, textTransform: "uppercase", textDecoration: "none" };
  const nav = [["#problem", "課題"], ["#about", "BUNCHINとは"], ["#ritual", "使い方"], ["#tester", "テスト"], ["#faq", "FAQ"]];
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: `16px ${PAD}`, borderBottom: `1px solid ${C.line}`, position: "sticky", top: 0, background: "rgba(5,5,5,0.92)", backdropFilter: "blur(2px)", zIndex: 50 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 12 }}>
        <span style={{ fontFamily: "var(--font-pixel)", fontSize: 25, letterSpacing: "0.04em", color: C.ink }}>BUNCHIN</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: C.mut3 }}>BN-01</span>
      </div>
      <div style={{ display: "flex", gap: 26, alignItems: "center" }} className="topnav">
        {nav.map(([h, t]) => <a key={h} href={h} style={link} className="navlink">{t}</a>)}
        <a href={window.FORM_TESTER} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 11, letterSpacing: "0.14em", color: "#050505", background: C.yellow, padding: "10px 16px", textDecoration: "none", textTransform: "uppercase" }}>テスター応募</a>
      </div>
    </div>);

}

function StaticDevice() {
  return (
    <div style={{ width: 320, display: "flex", flexDirection: "column", gap: 12 }}>
      <div style={{ background: "#0A0A0A", border: "1.5px solid #1f1f1f", borderTop: "1.5px solid #2a2a2a", borderBottom: "3px solid #000", padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: C.mut3 }}>BN-01</span>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", color: C.mut3 }}>STANDBY</span>
            <div style={{ width: 8, height: 8, background: C.yellow, animation: "bunchin-blink 1.06s steps(1) infinite" }} />
          </div>
        </div>
        <div style={{ position: "relative", background: "#000", border: "1px solid #161616", overflow: "hidden" }}>
          <img src="assets/BUNCHIN-device.png" alt="BUNCHIN BN-01 実機（開発中）" style={{ width: "100%", display: "block" }} />
        </div>
        <div style={{ textAlign: "center", fontFamily: "var(--font-pixel)", fontSize: 17, letterSpacing: "0.08em", color: C.yellow }}>TAP</div>
      </div>
      <div style={{ minHeight: 38, display: "flex", alignItems: "flex-start", gap: 10, padding: "2px 2px 0" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", color: C.mut3, marginTop: 3 }}>NOTE</span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.6, color: C.mut2 }}>開発中の実機（試作筐体）。意匠は変更の可能性があります。</span>
      </div>
    </div>);

}

function Hero({ deviceMode, heroGrid = true }) {
  return (
    <section style={{ minHeight: "86vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: `0 ${PAD} clamp(48px, 7vw, 80px)`, position: "relative", overflow: "hidden" }}>
      {heroGrid && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "46%", backgroundImage: "linear-gradient(#0d0d0d 1px, transparent 1px), linear-gradient(90deg, #0d0d0d 1px, transparent 1px)", backgroundSize: "46px 46px", opacity: 0.55, maskImage: "linear-gradient(#000, transparent)", WebkitMaskImage: "linear-gradient(#000, transparent)" }} />}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "clamp(32px, 5vw, 64px)", flexWrap: "wrap", position: "relative" }}>
        <div style={{ maxWidth: 720, flex: "1 1 420px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, border: `1px solid ${C.line}`, padding: "7px 12px", marginBottom: 26 }}>
            <div style={{ width: 7, height: 7, background: C.yellow, animation: "bunchin-blink 1.06s steps(1) infinite" }} />
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", color: C.mut, textTransform: "uppercase" }}>MVP Tester 募集中 · 事前登録 受付</span>
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(34px, 5.2vw, 62px)", lineHeight: 1.14, color: C.ink, margin: 0, letterSpacing: "-0.01em" }}>机に戻るための<br />AI同席ロボット。</h1>
          <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px, 1.3vw, 17px)", lineHeight: 1.9, color: C.mut, maxWidth: 540, margin: "28px 0 0" }}>
            BUNCHINは、予約した時間に机の上で静かに待ち、タップで作業開始を支える小さなAIロボットです。集中中は話しかけず、終わったら短く振り返る。<span style={{ color: C.ink }}>ひとりで頑張る時間を、ひとりにしない</span>ためのプロダクトです。
          </p>
          <div style={{ display: "flex", gap: 14, marginTop: 34, flexWrap: "wrap" }}>
            <CtaPrimary big>テスターに応募する</CtaPrimary>
            <CtaGhost big>開発通知を受け取る</CtaGhost>
          </div>
        </div>
        <div style={{ flex: "0 0 auto" }}>
          {deviceMode === "static" ? <StaticDevice /> : <HeroRitualDemo />}
        </div>
      </div>
    </section>);

}

const PROBLEMS = [
"通知を見ても、結局始められない。",
"習慣化アプリを入れても、開かなくなる。",
"一度サボると、戻るきっかけがなくなる。",
"作業前にスマホを触って、そのまま時間が過ぎてしまう。",
"ひとりで勉強や作業を続けるのが、難しい。"];


function Problem() {
  return (
    <Section id="problem">
      <SectionLabel n="01" en="The Problem" ja="こんなこと、ありませんか？" />
      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "1fr", border: `1px solid ${C.line}` }}>
        {PROBLEMS.map((p, i) =>
        <div key={i} style={{ display: "grid", gridTemplateColumns: "64px 1fr", alignItems: "center", gap: 20, padding: "22px 24px", borderBottom: i < PROBLEMS.length - 1 ? `1px solid ${C.line}` : "none", background: C.panel }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.14em", color: C.coral }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(17px, 1.7vw, 21px)", color: C.ink, lineHeight: 1.5 }}>{p}</span>
          </div>
        )}
      </div>
      <div style={{ marginTop: 28, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap", borderTop: `1.5px solid ${C.ink}`, paddingTop: 28 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {[["CAN'T START", "始める"], ["CAN'T CONTINUE", "続ける"], ["CAN'T RETURN", "戻る"]].map(([en, ja]) =>
          <div key={en} style={{ border: `1px solid ${C.coral}`, padding: "10px 16px", display: "flex", flexDirection: "column", gap: 3 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", color: C.coral }}>{en}</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 20, color: C.ink }}>{ja}</span>
            </div>
          )}
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px, 1.4vw, 18px)", lineHeight: 1.8, color: C.mut, maxWidth: 420, margin: 0 }}>
          BUNCHINは、その<span style={{ color: C.ink }}>「始める」「続ける」「戻る」</span>を支えるために生まれました。
        </p>
      </div>
    </Section>);

}

const DOES = [
["時間になると待つ", "予約した時刻に、机の上で静かに待機する。"],
["触れると始まる", "タップひとつが、作業を始める小さな儀式になる。"],
["黙って見守る", "集中中は話しかけない。ただ同席している。"],
["短く振り返る", "終わったら、今日できたことを短く確認する。"],
["次の一歩を残す", "明日の最初の一歩を、戻れる形で残す。"]];

const DOESNT = [
"集中している間は話しかけない。",
"できなかった日を責めない。",
"AIを使い放題にしない。",
"常時録音・常時会話を前提にしない。",
"医療・診断・治療を目的にしない。"];


function IsIsnt() {
  return (
    <Section id="about">
      <SectionLabel n="02" en="What it is" ja="BUNCHINとは" />
      <p style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(20px, 2.4vw, 30px)", lineHeight: 1.6, color: C.ink, margin: "36px 0 0", maxWidth: 880, letterSpacing: "-0.005em" }}>
        長時間おしゃべりをする<span style={{ color: C.mut2 }}>AIペットではありません。</span><br />
        机の上に同席する、<span style={{ color: C.blue }}>物理アンカー型のAIロボット</span>です。
      </p>
      <div style={{ marginTop: 44, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 1, background: C.line, border: `1px solid ${C.line}` }}>
        {/* DOES */}
        <div style={{ background: C.panel, padding: "28px 26px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", color: C.green, textTransform: "uppercase" }}>＋ すること</span>
          <div style={{ marginTop: 22, display: "flex", flexDirection: "column" }}>
            {DOES.map((d, i) =>
            <div key={i} style={{ padding: "16px 0", borderTop: i ? `1px solid ${C.line}` : "none", display: "flex", flexDirection: "column", gap: 5 }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: 19, color: C.ink }}>{d[0]}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 14, lineHeight: 1.7, color: C.mut }}>{d[1]}</span>
              </div>
            )}
          </div>
        </div>
        {/* DOESN'T */}
        <div style={{ background: "#0b0908", padding: "28px 26px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.18em", color: C.coral, textTransform: "uppercase" }}>− しないこと</span>
          <div style={{ marginTop: 22, display: "flex", flexDirection: "column" }}>
            {DOESNT.map((d, i) =>
            <div key={i} style={{ padding: "18px 0", borderTop: i ? `1px solid ${C.line}` : "none", display: "flex", alignItems: "flex-start", gap: 14 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: C.coral, lineHeight: 1.5 }}>✕</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.6, color: C.ink }}>{d}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px, 1.4vw, 18px)", lineHeight: 1.9, color: C.mut, margin: "32px 0 0", maxWidth: 720 }}>
        BUNCHINが目指しているのは、AIと話し続けることではなく、<span style={{ color: C.ink }}>机に戻る行動が起きること</span>です。
      </p>
    </Section>);

}

Object.assign(window, { TopBar, Hero, StaticDevice, Problem, IsIsnt });