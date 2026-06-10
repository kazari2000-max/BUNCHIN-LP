/* global React, C, PixelFace, BunchinSound, SoundToggle */
// lp_demo.jsx — the ritual demo as a COMPACT hero embed (簡易デモ).
// Full loop (声かけ→集中→[立て直し]→完走→振り返り→翌日) wired to real SE + voice,
// but single-column and EFFORT-LOG-free so it sits in the hero's right slot.

const REVIEW_TURNS = [
  { k: "done", voice: "review_done_prompt", q: "おつかれさま。今日はどうだった？", opts: ["単語を20個できた", "思ったより進んだ", "集中できなかった"] },
  { k: "hard", voice: "review_hard_prompt", q: "そっか。大変だったところは？", opts: ["始めるまでが重かった", "途中で集中が切れた", "特になかった"] },
  { k: "step", voice: "review_step_prompt", q: "じゃあ、明日の最初の一歩を決めよう。", core: true, opts: ["単語10個から", "まず1問だけ", "5分だけ机に座る"] },
];

function DemoDevice({ faceState, speaking, listening, signalWord, led, ledBlink, progress, bloom, dim, onTap, tappable, px = 7, eyeGap = 74 }) {
  return (
    <div style={{ width: "100%", background: "#0A0A0A", border: "1.5px solid #1f1f1f", borderTop: "1.5px solid #2a2a2a", borderBottom: "3px solid #000", padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: "#5a5a5a" }}>BN-01</span>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.12em", textTransform: "uppercase", color: listening ? "#78FF9E" : "#2a2a2a", display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ width: 6, height: 6, background: listening ? "#78FF9E" : "#2a2a2a", animation: listening ? "bunchin-blink 0.9s steps(1) infinite" : "none" }} />STT
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.14em", color: "#5a5a5a", textTransform: "uppercase" }}>{faceState}</span>
            <div style={{ width: 8, height: 8, background: led, animation: ledBlink ? "bunchin-blink 1.06s steps(1) infinite" : "none" }} />
          </div>
        </div>
      </div>
      <div style={{ position: "relative", background: "#000", border: "1px solid #161616", aspectRatio: "4/3", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", backgroundImage: "repeating-linear-gradient(0deg, rgba(255,255,255,0.025) 0px, rgba(255,255,255,0.025) 1px, transparent 1px, transparent 3px)" }} />
        <div style={{ position: "absolute", inset: 0, background: "#78FF9E", opacity: bloom ? 0.16 : 0, transition: "opacity 480ms ease", pointerEvents: "none" }} />
        <div style={{ opacity: dim ? 0.5 : 1, transition: "opacity 700ms ease" }}>
          <PixelFace state={faceState} speaking={speaking} px={px} eyeGap={eyeGap} />
        </div>
        {signalWord && <div style={{ position: "absolute", bottom: 16, left: 0, right: 0, textAlign: "center", fontFamily: "var(--font-pixel)", fontSize: 18, letterSpacing: "0.08em", color: signalWord.color }}>{signalWord.text}</div>}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 4, background: "#0c0c0c" }}>
          <div style={{ height: "100%", width: `${Math.round(progress * 100)}%`, background: bloom ? "#78FF9E" : led, opacity: bloom ? 1 : 0.55, transition: "width 360ms linear, background 300ms, opacity 300ms" }} />
        </div>
      </div>
      <button onClick={tappable ? onTap : undefined} disabled={!tappable} style={{
        appearance: "none", border: `1.5px solid ${tappable ? "#FF7B66" : "#1f1f1f"}`, background: tappable ? "#100b0a" : "#070707",
        color: tappable ? "#FF7B66" : "#444", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em",
        textTransform: "uppercase", padding: "12px 0", cursor: tappable ? "pointer" : "default", width: "100%",
        transition: "border-color 120ms, color 120ms",
      }}>◦ TAP ZONE{tappable ? " · 立て直し" : ""}</button>
    </div>
  );
}

function DemoBtn({ onClick, color, ghost, children, disabled, grow }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      appearance: "none", cursor: disabled ? "default" : "pointer", flex: grow ? "1 1 auto" : "0 0 auto",
      border: ghost ? `1.5px solid ${disabled ? "#222" : color}` : "none",
      background: ghost ? "transparent" : (disabled ? "#1a1a1a" : color),
      color: ghost ? (disabled ? "#333" : color) : "#050505", opacity: disabled ? 0.6 : 1,
      fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 10.5, letterSpacing: "0.08em",
      textTransform: "uppercase", padding: "11px 13px",
    }}>{children}</button>
  );
}

// ---- shared state machine ----
function useRitual() {
  const [step, setStep] = React.useState("idle");
  const [speaking, setSpeaking] = React.useState(false);
  const [listening, setListening] = React.useState(false);
  const [voice, setVoice] = React.useState("");
  const [working, setWorking] = React.useState(true);
  const [progress, setProgress] = React.useState(0);
  const [bloom, setBloom] = React.useState(false);
  const [reviewTurn, setReviewTurn] = React.useState(-1);
  const [picks, setPicks] = React.useState({});
  const [tomorrowStep, setTomorrowStep] = React.useState(null);
  const timers = React.useRef([]);
  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const after = (ms, fn) => { const id = setTimeout(fn, ms); timers.current.push(id); return id; };
  const say = (k) => BunchinSound.play(k);
  React.useEffect(() => () => { clear(); BunchinSound.stopVoice(); }, []);

  React.useEffect(() => {
    if (step !== "focus") return;
    const id = setInterval(() => {
      setProgress(p => { const np = Math.min(1, p + (working ? 0.0072 : 0.0024)); if (np >= 1) { clearInterval(id); doComplete(); } return np; });
    }, 120);
    return () => clearInterval(id);
  }, [step, working]);

  function nudge() {
    if (step !== "idle") return;
    clear(); const resume = !!tomorrowStep;
    setStep("nudge"); setSpeaking(true); setListening(true);
    setVoice(resume ? `昨日は「${tomorrowStep}」って言ってたね。じゃ、そこから。` : "時間だね。準備はいい？");
    say(resume ? "nudge_resume" : "nudge_default");
    after(2600, () => setSpeaking(false));
  }
  function reply(kind) {
    if (step !== "nudge") return; clear();
    if (kind === "start") {
      setSpeaking(true); say("start_reply"); setVoice("いいね。まず5分だけ、昨日の続きから一緒にやろう。");
      after(2600, () => { setSpeaking(false); setListening(false); setVoice(""); enterFocus(); });
    } else {
      setSpeaking(true); setListening(false); say("stop_reply"); setVoice("わかった。今日は無理しない。また予約しておくね。");
      after(2600, () => { setSpeaking(false); setVoice(""); setStep("idle"); });
    }
  }
  function enterFocus() { say("session_start"); setStep("focus"); setWorking(true); }
  function recover() {
    if (step !== "focus") return; clear();
    say("tap_start"); say("recovery"); say("recovery_rescope");
    setStep("recovery"); setSpeaking(true); setListening(true);
    setVoice("そっか、今は重いね。全部やらなくていい。あと1問だけ見てみよう。");
    after(3400, () => setSpeaking(false));
    after(3700, () => { setListening(false); setVoice(""); setStep("focus"); setWorking(true); });
  }
  function doComplete() {
    clear(); setSpeaking(false); setListening(false); setVoice(""); say("complete");
    setStep("complete"); setProgress(1); setBloom(true);
    after(2200, startReview);
  }
  function startReview() {
    clear(); setStep("review"); setReviewTurn(0); setPicks({});
    setSpeaking(true); setListening(true); say(REVIEW_TURNS[0].voice); setVoice(REVIEW_TURNS[0].q);
    after(2200, () => setSpeaking(false));
  }
  function closeReview(fp) {
    clear(); setReviewTurn(99); setListening(false); setSpeaking(true); say("review_close");
    setVoice("いいね。今日はここまで。おつかれさま。");
    if (fp.step) setTomorrowStep(fp.step);
    after(2400, () => setSpeaking(false));
  }
  function reviewReply(choice) {
    const t = reviewTurn; if (t < 0 || t > 2) return; clear();
    if (choice === "__rest") { closeReview(picks); return; }
    const cur = REVIEW_TURNS[t]; const np = { ...picks, [cur.k]: choice }; setPicks(np);
    const next = t + 1;
    if (next < REVIEW_TURNS.length) { setReviewTurn(next); setSpeaking(true); say(REVIEW_TURNS[next].voice); setVoice(REVIEW_TURNS[next].q); after(2000, () => setSpeaking(false)); }
    else closeReview(np);
  }
  function reset() {
    clear(); BunchinSound.stopVoice();
    setStep("idle"); setSpeaking(false); setListening(false); setVoice("");
    setProgress(0); setBloom(false); setWorking(true); setReviewTurn(-1); setPicks({});
  }

  const VIS = {
    idle: { face: "standby", led: "#FFE45C", ledBlink: true, word: { text: "TAP", color: "#FFE45C" }, label: "STANDBY" },
    nudge: { face: "ready", led: "#FFE45C", ledBlink: true, word: { text: "準備はいい？", color: "#FFE45C" }, label: "NUDGE" },
    focus: { face: "focus", led: "#6EB6FF", ledBlink: false, word: null, label: "FOCUS" },
    recovery: { face: "recovery", led: "#FF7B66", ledBlink: false, word: { text: "1問", color: "#FF7B66" }, label: "RECOVERY" },
    complete: { face: "complete", led: "#78FF9E", ledBlink: false, word: { text: "SAVED", color: "#78FF9E" }, label: "COMPLETE" },
    review: { face: "complete", led: "#78FF9E", ledBlink: false, word: null, label: "REVIEW" },
  }[step];

  return { step, speaking, listening, voice, working, setWorking, progress, bloom, reviewTurn, picks, tomorrowStep, VIS,
    nudge, reply, recover, doComplete, reviewReply, reset };
}

// ---- the compact hero demo ----
function HeroRitualDemo() {
  const r = useRitual();
  const { step, VIS } = r;
  const focusStill = step === "focus" && r.working;

  return (
    <div style={{ width: 340, maxWidth: "100%", display: "flex", flexDirection: "column", gap: 12, userSelect: "none" }}>
      <DemoDevice
        faceState={VIS.face} speaking={r.speaking} listening={r.listening}
        signalWord={VIS.word} led={VIS.led} ledBlink={VIS.ledBlink}
        progress={r.progress} bloom={r.bloom} dim={focusStill}
        tappable={step === "focus"} onTap={r.recover} px={6} eyeGap={66}
      />

      {/* voice subtitle (left) + SOUND opt-in (right) */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, padding: "0 2px" }}>
        <div style={{ minHeight: 40, display: "flex", alignItems: "flex-start", gap: 9, flex: 1, opacity: r.voice ? 1 : 0, transition: "opacity 220ms" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", color: "#5a5a5a", marginTop: 3, flexShrink: 0 }}>VOICE</span>
          <span style={{ fontFamily: "var(--font-body)", fontSize: 13.5, lineHeight: 1.6, color: "#C8C3B8" }}>{r.voice || "\u00a0"}</span>
        </div>
        <SoundToggle variant="bar" />
      </div>

      {/* per-step controls */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", minHeight: 40 }}>
        {step === "idle" && <DemoBtn grow onClick={r.nudge} color="#FFE45C">▶ 予約時刻 20:00 になる</DemoBtn>}
        {step === "nudge" && <React.Fragment>
          <DemoBtn grow onClick={() => r.reply("start")} color="#FFE45C">はじめる</DemoBtn>
          <DemoBtn onClick={() => r.reply("stop")} ghost color="#6a6a6a">今日はやめる</DemoBtn>
        </React.Fragment>}
        {step === "focus" && <React.Fragment>
          <DemoBtn grow onClick={() => r.setWorking(w => !w)} ghost color={r.working ? "#6EB6FF" : "#9C9C9C"}>{r.working ? "打鍵中 ▸ 手を止める" : "小休止 ▸ 打鍵に戻る"}</DemoBtn>
          <DemoBtn onClick={r.doComplete} ghost color="#78FF9E">完走まで送る</DemoBtn>
        </React.Fragment>}
        {step === "recovery" && <DemoBtn grow disabled color="#FF7B66">… 立て直し中</DemoBtn>}
        {step === "complete" && <DemoBtn grow disabled color="#78FF9E">… 完走・保存中</DemoBtn>}
        {step === "review" && r.reviewTurn >= 0 && r.reviewTurn <= 2 && <React.Fragment>
          {REVIEW_TURNS[r.reviewTurn].opts.map(o => (
            <DemoBtn key={o} onClick={() => r.reviewReply(o)} ghost color={REVIEW_TURNS[r.reviewTurn].core ? "#78FF9E" : "#6EB6FF"}>{o}</DemoBtn>
          ))}
          <DemoBtn onClick={() => r.reviewReply("__rest")} ghost color="#5a5a5a">休む</DemoBtn>
        </React.Fragment>}
        {step === "review" && r.reviewTurn === 99 && <DemoBtn grow onClick={r.reset} ghost color="#9C9C9C">↺ もう一度はじめから</DemoBtn>}
      </div>

      {/* idle hint */}
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.04em", lineHeight: 1.7, color: "#5a5a5a", margin: "0 2px" }}>
        {step === "idle"
          ? "▶ 押すと、声かけ→集中→振り返りまでブラウザでひと巡り。SOUND ON で実際の声が鳴ります。"
          : step === "focus"
            ? (r.working ? "集中中：静止・無音・減光。詰まったら TAP ZONE で立て直し。" : "小休止：手が止まると、呼吸がそっと戻る。")
            : "BUNCHIN は必要な時だけ、短く話す。"}
      </p>

      {/* voice credit — VOICEVOX terms require this attribution; keep visible wherever the demo voice plays */}
      <div style={{ display: "flex", alignItems: "baseline", gap: 9, margin: "0 2px", paddingTop: 10, borderTop: "1px solid #141414" }}>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, letterSpacing: "0.16em", color: "#3f3f3f", flexShrink: 0 }}>CREDIT</span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 9.5, letterSpacing: "0.04em", color: "#5a5a5a" }}>音声合成 VOICEVOX:四国めたん</span>
      </div>
    </div>
  );
}

Object.assign(window, { HeroRitualDemo });
