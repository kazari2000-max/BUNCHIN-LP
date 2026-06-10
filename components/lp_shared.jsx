/* global React */
// lp_shared.jsx — shared constants + small primitives for the BUNCHIN tester LP.

// External form endpoints — REPLACE with the real Google Form URLs before launch.
const FORM_TESTER = "https://forms.gle/REPLACE-tester";
const FORM_NOTIFY = "https://forms.gle/REPLACE-notify";

const C = {
  bg: "#050505", panel: "#0D0D0D", line: "#1a1a1a", lineSoft: "#141414",
  ink: "#F7F3EA", mut: "#9C9C9C", mut2: "#6a6a6a", mut3: "#5a5a5a",
  blue: "#6EB6FF", yellow: "#FFE45C", green: "#78FF9E", coral: "#FF7B66",
};
const PAD = "clamp(24px, 5vw, 56px)";

// Section number + EN label + JA title, terminal style.
function SectionLabel({ n, en, ja }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: 16, flexWrap: "wrap" }}>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", color: C.mut3 }}>{n}</span>
      <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.2em", color: C.blue, textTransform: "uppercase" }}>{en}</span>
      <span style={{ fontFamily: "var(--font-display)", fontWeight: 500, fontSize: 18, color: C.ink }}>{ja}</span>
    </div>
  );
}

function Section({ id, children, style }) {
  return (
    <section id={id} style={{ borderTop: `1px solid ${C.line}`, padding: `clamp(48px, 7vw, 80px) ${PAD}`, ...style }}>
      {children}
    </section>
  );
}

// Primary CTA — Active-Yellow filled block (the main "apply as tester" action).
function CtaPrimary({ children = "テスターに応募する", href = FORM_TESTER, big = false }) {
  const [h, setH] = React.useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 14, textDecoration: "none",
        background: C.yellow, color: "#050505", fontFamily: "var(--font-mono)", fontWeight: 700,
        fontSize: big ? 14 : 12, letterSpacing: "0.16em", textTransform: "uppercase",
        padding: big ? "20px 30px" : "15px 24px", border: "1.5px solid " + C.yellow,
        boxShadow: h ? "inset 0 0 0 2px #050505" : "none", transition: "box-shadow 100ms",
      }}>
      <span>{children}</span>
      <span aria-hidden style={{ fontFamily: "var(--font-mono)", transform: h ? "translateX(3px)" : "none", transition: "transform 120ms" }}>→</span>
    </a>
  );
}

// Secondary CTA — ghost block with hairline, brightens on hover (dev-notify / pre-register).
function CtaGhost({ children = "開発通知を受け取る", href = FORM_NOTIFY, big = false }) {
  const [h, setH] = React.useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 14, textDecoration: "none",
        background: "transparent", color: h ? C.ink : C.mut, fontFamily: "var(--font-mono)", fontWeight: 500,
        fontSize: big ? 14 : 12, letterSpacing: "0.16em", textTransform: "uppercase",
        padding: big ? "20px 30px" : "15px 24px",
        border: "1.5px solid " + (h ? C.ink : "#2e2e2e"), transition: "color 120ms, border-color 120ms",
      }}>
      <span>{children}</span>
      <span aria-hidden style={{ opacity: 0.6 }}>↳</span>
    </a>
  );
}

Object.assign(window, { FORM_TESTER, FORM_NOTIFY, C, PAD, SectionLabel, Section, CtaPrimary, CtaGhost });
