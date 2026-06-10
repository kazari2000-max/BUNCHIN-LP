/* global React */
// bunchin_sound.jsx — audio manager (SE + synthesized voice) + a terminal-style SOUND toggle.
// Mirrors the design-system BunchinSound singleton: cache / preload / mute / play.
// Brand rule: NOTHING plays on scroll or load. Sound only fires from an explicit user
// gesture, and only when enabled. Default = OFF (muted); the SOUND toggle is opt-in.

const BunchinSound = (() => {
  const KEYS = [
    "tap_start", "session_start", "complete", "recovery",
    "nudge_default", "nudge_resume", "start_reply", "stop_reply", "recovery_rescope",
    "review_done_prompt", "review_hard_prompt", "review_step_prompt", "review_close",
  ];
  const cache = {};
  let muted = true;            // default OFF
  let unlocked = false;        // becomes true after the first user-gesture play
  const listeners = new Set(); // mute-state subscribers (for the toggle UI)
  let voiceEl = null;          // the currently-playing voice element (so a new line cuts the old)

  function get(key) {
    if (!cache[key]) { const a = new Audio(`assets/audio/${key}.wav`); a.preload = "auto"; cache[key] = a; }
    return cache[key];
  }
  function emit() { listeners.forEach(fn => fn(muted)); }

  // SE = short signal (overlaps freely). voice = spoken line (cuts the previous line).
  const VOICE = new Set(["nudge_default", "nudge_resume", "start_reply", "stop_reply", "recovery_rescope", "review_done_prompt", "review_hard_prompt", "review_step_prompt", "review_close"]);

  return {
    KEYS,
    preload() { KEYS.forEach(get); },
    play(key) {
      if (muted || !KEYS.includes(key)) return;
      unlocked = true;
      const a = get(key);
      if (VOICE.has(key)) {
        if (voiceEl && voiceEl !== a) { try { voiceEl.pause(); voiceEl.currentTime = 0; } catch (e) {} }
        voiceEl = a;
      }
      try { a.currentTime = 0; a.play().catch(() => {}); } catch (e) {}
    },
    stopVoice() { if (voiceEl) { try { voiceEl.pause(); voiceEl.currentTime = 0; } catch (e) {} voiceEl = null; } },
    setMuted(m) { muted = !!m; if (muted) this.stopVoice(); else if (!unlocked) this.preload(); emit(); },
    toggle() { this.setMuted(!muted); return !muted; },
    isMuted() { return muted; },
    subscribe(fn) { listeners.add(fn); return () => listeners.delete(fn); },
  };
})();

// useMuted — re-renders a component when global mute state changes.
function useMuted() {
  const [m, setM] = React.useState(BunchinSound.isMuted());
  React.useEffect(() => BunchinSound.subscribe(setM), []);
  return m;
}

// SoundToggle — opt-in block control. variant: "bar" (compact) | "block".
function SoundToggle({ variant = "block" }) {
  const muted = useMuted();
  const on = !muted;
  const label = on ? "SOUND ON" : "SOUND OFF";
  const color = on ? "#78FF9E" : "#5a5a5a";
  return (
    <button
      onClick={() => BunchinSound.toggle()}
      aria-pressed={on}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10, appearance: "none", cursor: "pointer",
        background: on ? "rgba(120,255,158,0.06)" : "transparent",
        border: `1px solid ${on ? "#2c4a39" : "#2a2a2a"}`,
        color, fontFamily: "var(--font-mono)", fontSize: variant === "bar" ? 10 : 11,
        letterSpacing: "0.16em", textTransform: "uppercase", padding: variant === "bar" ? "8px 12px" : "11px 16px",
        transition: "color 120ms, border-color 120ms, background 120ms",
      }}>
      <span style={{ display: "inline-flex", gap: 3, alignItems: "flex-end", height: 11 }}>
        {[5, 9, 7].map((h, i) => (
          <span key={i} style={{ width: 2, height: on ? h : 2, background: color, transition: "height 200ms", alignSelf: "flex-end" }} />
        ))}
      </span>
      <span>{label}</span>
    </button>
  );
}

Object.assign(window, { BunchinSound, useMuted, SoundToggle });
