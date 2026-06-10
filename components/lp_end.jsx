/* global React, C, PAD, SectionLabel, Section, CtaPrimary, CtaGhost */
// lp_end.jsx — DeviceReveal, DevStatus + Roadmap, Tester recruit, FAQ, FinalCTA + Footer.

// Corner registration ticks — instrument-panel framing.
function Tick({ pos }) {
  const base = { position: "absolute", width: 12, height: 12, borderColor: "#3a3a3a", borderStyle: "solid", borderWidth: 0 };
  const m = {
    tl: { top: -1, left: -1, borderTopWidth: 1.5, borderLeftWidth: 1.5 },
    tr: { top: -1, right: -1, borderTopWidth: 1.5, borderRightWidth: 1.5 },
    bl: { bottom: -1, left: -1, borderBottomWidth: 1.5, borderLeftWidth: 1.5 },
    br: { bottom: -1, right: -1, borderBottomWidth: 1.5, borderRightWidth: 1.5 }
  };
  return <div style={{ ...base, ...m[pos] }} />;
}

const REVEAL_SPEC = [["BASE", "STACK-BASED"], ["DISPLAY", "3cm LCD · 緑単色"], ["STATE", "SAVED 表示中"], ["PRIVACY", "STT OFF / 集中時"]];

function DeviceReveal() {
  return (
    <section id="unit" style={{ borderTop: `1px solid ${C.line}`, padding: `clamp(56px, 8vw, 96px) ${PAD}`, background: "#070707" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap", justifyContent: "center", textAlign: "center" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", color: C.green, textTransform: "uppercase" }}>● Actual Unit</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", color: C.mut3 }}>BN-01 · PROTOTYPE</span>
      </div>
      <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(26px, 3.4vw, 44px)", lineHeight: 1.25, color: C.ink, textAlign: "center", margin: "22px 0 0", letterSpacing: "-0.01em" }}>MVP開発中…</h2>
      {/* instrument panel */}
      <div style={{ position: "relative", maxWidth: 620, margin: "44px auto 0", background: "#0A0A0A", border: "1.5px solid #1f1f1f", borderTop: "1.5px solid #2a2a2a", borderBottom: "3px solid #000", padding: 18 }}>
        <Tick pos="tl" /><Tick pos="tr" /><Tick pos="bl" /><Tick pos="br" />
        {/* chrome row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: C.mut3 }}>BN-01</span>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", color: C.mut3 }}>PROTOTYPE</span>
            <div style={{ width: 8, height: 8, background: C.green, animation: "bunchin-blink 1.06s steps(1) infinite" }} />
          </div>
        </div>
        {/* photo, inset */}
        <div style={{ position: "relative", background: "#000", border: "1px solid #161616", overflow: "hidden" }}>
          <img src="assets/BUNCHIN-device.png" alt="BUNCHIN BN-01 試作1号機（SAVED 表示）" style={{ width: "100%", display: "block" }} />
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 3px)" }} />
        </div>
        {/* spec strip */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", marginTop: 14, border: `1px solid ${C.line}` }}>
          {REVEAL_SPEC.map((s, i) =>
          <div key={i} style={{ padding: "13px 16px", borderRight: `1px solid ${C.line}`, display: "flex", flexDirection: "column", gap: 5 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", color: C.mut3 }}>{s[0]}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.06em", color: C.ink }}>{s[1]}</span>
            </div>
          )}
        </div>
      </div>
      <p style={{ fontFamily: "var(--font-body)", fontSize: 13, lineHeight: 1.7, color: C.mut3, textAlign: "center", margin: "22px auto 0", maxWidth: 520 }}>
        開発中の試作1号機。意匠・仕様は変更の可能性があります。
      </p>
    </section>);

}

const CORE = ["予約", "待機", "タップ開始", "静音見守り", "振り返り", "ログ保存"];
const ROADMAP = [
["NOW", "MVP 1台を開発中", "中核体験を実機で通す。", true],
["NEXT", "実機デモ動画を公開", "動いているBUNCHINを見られるように。", false],
["", "テスター体験", "実機観察 / Web仮想デモを実施。", false],
["", "事前登録の受付", "開発状況と募集開始をお知らせ。", false],
["2026.10", "クラウドファンディング開始（目標）", "完成度・検証・調達を踏まえ最終判断。", false]];


function DevStatus() {
  return (
    <Section id="status">
      <SectionLabel n="07" en="Development" ja="現在の開発状況" />
      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "clamp(24px,4vw,48px)", alignItems: "start" }}>
        {/* current state */}
        <div>
          <div style={{ border: `1.5px solid ${C.ink}`, background: C.panel, padding: "28px 26px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 8, height: 8, background: C.green, animation: "bunchin-blink 1.06s steps(1) infinite" }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", color: C.green, textTransform: "uppercase" }}>Now Building</span>
            </div>
            <p style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(24px,2.6vw,32px)", color: C.ink, margin: "16px 0 0", lineHeight: 1.3 }}>現在MVPを<br />開発中です。</p>
            <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.85, color: C.mut, margin: "16px 0 0" }}>
              予約・待機・タップ開始・静音見守り・振り返り・ログ保存という中核体験を、実機で通すことを目指しています。
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
              {CORE.map((c) =>
              <span key={c} style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.08em", color: C.mut, border: `1px solid ${C.line}`, padding: "7px 12px" }}>{c}</span>
              )}
            </div>
          </div>
        </div>
        {/* roadmap */}
        <div style={{ borderLeft: `1px solid ${C.line}`, paddingLeft: 0 }}>
          {ROADMAP.map((r, i) =>
          <div key={i} style={{ display: "grid", gridTemplateColumns: "92px 1fr", gap: 18, padding: "0 0 28px", position: "relative" }}>
              <div style={{ position: "absolute", left: -5, top: 4, width: 9, height: 9, background: r[3] ? C.green : C.bg, border: `1.5px solid ${r[3] ? C.green : "#3a3a3a"}` }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.12em", color: r[3] ? C.green : C.mut3, paddingLeft: 22 }}>{r[0] || "—"}</span>
              <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: r[3] ? 900 : 500, fontSize: "clamp(16px,1.7vw,19px)", color: r[3] ? C.ink : C.mut }}>{r[1]}</span>
                <span style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.7, color: C.mut2 }}>{r[2]}</span>
              </div>
            </div>
          )}
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12.5, lineHeight: 1.7, color: C.mut3, margin: "4px 0 0", paddingLeft: 22 }}>
            ※ 提供台数・開始時期は、MVPの完成度、テスター検証、調達状況、品質確認を踏まえて最終判断します。
          </p>
        </div>
      </div>
    </Section>);

}

const TESTS = [
["実機観察テスト", "ON-SITE", C.yellow, "実際にBUNCHINを触っていただきます。", ["初見で伝わるか", "操作に迷わないか", "机に戻るきっかけになりそうか"]],
["Web仮想デモ", "ONLINE", C.blue, "ブラウザ上で体験していただきます。", ["相棒感", "会話の距離感", "ペルソナ体験"]]];


function Tester() {
  return (
    <section id="tester" style={{ borderTop: `1.5px solid ${C.ink}`, padding: `clamp(56px, 8vw, 96px) ${PAD}`, background: "#070707" }}>
      <SectionLabel n="08" en="Join the test" ja="テスター募集" />
      <p style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(26px,3.4vw,44px)", lineHeight: 1.3, color: C.ink, margin: "32px 0 0", letterSpacing: "-0.01em", maxWidth: 900 }}>
        いちばん最初に触る人を、<br />募集しています。
      </p>
      <div style={{ marginTop: 48, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 1, background: C.line, border: `1px solid ${C.line}` }}>
        {TESTS.map((t, i) =>
        <div key={i} style={{ background: C.panel, padding: "32px 30px", display: "flex", flexDirection: "column", gap: 18 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(20px,2vw,26px)", color: C.ink }}>{t[0]}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", color: t[2], border: `1px solid ${t[2]}`, padding: "5px 10px" }}>{t[1]}</span>
            </div>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.8, color: C.mut }}>{t[3]}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 0, marginTop: 4 }}>
              {t[4].map((p, j) =>
            <div key={j} style={{ display: "flex", alignItems: "center", gap: 12, padding: "13px 0", borderTop: `1px solid ${C.line}` }}>
                  <span style={{ width: 6, height: 6, background: t[2], flexShrink: 0 }} />
                  <span style={{ fontFamily: "var(--font-body)", fontSize: 15, color: C.ink }}>{p}</span>
                </div>
            )}
            </div>
          </div>
        )}
      </div>
      <div style={{ marginTop: 24, border: `1px solid ${C.line}`, padding: "20px 26px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", color: C.green }}>＋ SURVEY</span>
        <span style={{ fontFamily: "var(--font-body)", fontSize: 14.5, lineHeight: 1.7, color: C.mut }}>テスト後に、価格感や月額利用意向についての簡単なアンケートにもご協力をお願いします。</span>
      </div>
      <div style={{ marginTop: 36, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
        <CtaPrimary big>テスターに応募する</CtaPrimary>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: C.mut3 }}>所要 約2分 · 応募フォームへ</span>
      </div>
    </section>);

}

const FAQS = [
["AIとずっと会話できますか？", "BUNCHINは、長時間の雑談を目的としたAIロボットではありません。ユーザーが集中している間は静かに見守り、開始時と振り返り時に短く関わる設計です。"],
["常時録音しますか？", "常時録音・常時音声認識を前提とした設計ではありません。集中中は静かに同席することを大切にしています。"],
["医療・治療目的の製品ですか？", "いいえ。BUNCHINは医療、診断、治療、カウンセリングを目的とする製品ではありません。学習・作業時間に戻るための行動支援プロダクトです。"],
["いつ購入できますか？", "2026年10月のクラウドファンディング開始を目標に準備中です。正式な開始時期・提供台数は、調達状況とテスト結果を踏まえて決定します。"],
["価格はいくらですか？", "現在、本体は39,800円〜49,800円帯を中心に検討しています。事前登録時のアンケートで、価格感についてもご意見を伺っています。"]];


function FaqRow({ q, a, idx, open, onToggle }) {
  return (
    <div style={{ borderBottom: `1px solid ${C.line}`, background: C.panel }}>
      <button onClick={onToggle} style={{ width: "100%", appearance: "none", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 20, padding: "24px clamp(20px,3vw,28px)", textAlign: "left" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: C.mut3, flexShrink: 0 }}>{String(idx + 1).padStart(2, "0")}</span>
        <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: "clamp(16px,1.7vw,20px)", color: C.ink, flex: 1 }}>{q}</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 18, color: open ? C.yellow : C.mut2, flexShrink: 0, transition: "color 120ms" }}>{open ? "−" : "+"}</span>
      </button>
      <div style={{ maxHeight: open ? 240 : 0, overflow: "hidden", transition: "max-height 280ms ease" }}>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.4vw,16px)", lineHeight: 1.9, color: C.mut, margin: 0, padding: "0 clamp(20px,3vw,28px) 26px 52px", maxWidth: 760 }}>{a}</p>
      </div>
    </div>);

}

function Faq() {
  const [open, setOpen] = React.useState(0);
  return (
    <Section id="faq">
      <SectionLabel n="09" en="FAQ" ja="よくある質問" />
      <div style={{ marginTop: 40, border: `1px solid ${C.line}`, borderBottom: "none" }}>
        {FAQS.map((f, i) =>
        <FaqRow key={i} q={f[0]} a={f[1]} idx={i} open={open === i} onToggle={() => setOpen(open === i ? -1 : i)} />
        )}
      </div>
    </Section>);

}

function FinalCta() {
  return (
    <section id="join" style={{ borderTop: `1px solid ${C.line}`, padding: `clamp(64px, 10vw, 120px) ${PAD}`, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(#0d0d0d 1px, transparent 1px), linear-gradient(90deg, #0d0d0d 1px, transparent 1px)", backgroundSize: "46px 46px", opacity: 0.4, maskImage: "radial-gradient(circle at 50% 40%, #000, transparent 70%)", WebkitMaskImage: "radial-gradient(circle at 50% 40%, #000, transparent 70%)" }} />
      <div style={{ position: "relative", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.2em", color: C.blue, textTransform: "uppercase" }}>Desk Anchor Robot · BN-01</span>
        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(32px, 5.6vw, 68px)", lineHeight: 1.12, color: C.ink, margin: "22px 0 0", letterSpacing: "-0.01em" }}>未来のわたしが<br />机の上にいる。</h2>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "clamp(15px,1.4vw,17px)", lineHeight: 1.9, color: C.mut, margin: "28px 0 0", maxWidth: 540 }}>
          BUNCHINは、ひとりで頑張る時間を支えるために開発中のAI同席ロボットです。テスター参加、事前登録、開発応援をお待ちしています。
        </p>
        <div style={{ display: "flex", gap: 14, marginTop: 38, flexWrap: "wrap", justifyContent: "center" }}>
          <CtaPrimary big>テスターに応募する</CtaPrimary>
          <CtaGhost big>開発通知を受け取る</CtaGhost>
        </div>
      </div>
    </section>);

}

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.line}`, padding: `clamp(40px,6vw,64px) ${PAD} 40px`, display: "flex", flexDirection: "column", gap: 36 }}>
      <div style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(24px,3.4vw,40px)", color: C.ink, lineHeight: 1.2, letterSpacing: "-0.01em" }}>
        ひとりで頑張る時間を<br />ひとりにしない。
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: `1px solid ${C.line}`, paddingTop: 26, flexWrap: "wrap", gap: 16 }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: C.mut3 }}>© 2026 BUNCHIN · BN-01 · DESK ANCHOR ROBOT</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.1em", color: C.mut3 }}>話しすぎない。でも、ちゃんといる。</span>
      </div>
    </footer>);

}

Object.assign(window, { DeviceReveal, DevStatus, Tester, Faq, FinalCta, Footer });