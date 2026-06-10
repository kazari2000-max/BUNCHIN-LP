/* global React, C, PAD, SectionLabel, Section */
// lp_system.jsx — "The Name": BUNCHIN = 文鎮 (paperweight) AND the B·U·N·C·H·I·N acronym.
// Each letter carries one element of the experience. Big DenkiChip ghost initials,
// terminal-ruled rows. Bottom-heavy, no rounding, no shadow.

const SYSTEM = [
  ["B", "Base", "基点", "#FFE45C", "机や部屋を、努力する場所として儀式化する。"],
  ["U", "Unison", "同席", "#FFE45C", "設定した時間に、ロボットが机の上で一緒にいる。"],
  ["N", "Nudge", "促し", "#FFE45C", "通知より自然な声かけで、始めやすくする。"],
  ["C", "Concentration", "集中", "#6EB6FF", "集中している間は話しかけず、静かに見守る。"],
  ["H", "Habit", "習慣", "#6EB6FF", "朝夜のリズムと、日々の継続を支える。"],
  ["I", "Interaction", "対話", "#78FF9E", "開始・休憩・立て直し・振り返りだけ、短く話す。"],
  ["N", "Next", "次の一歩", "#78FF9E", "できた日もできなかった日も、次に戻れる形で終える。"],
];

function NameMeaning() {
  return (
    <Section id="name">
      <SectionLabel n="03" en="The Name" ja="BUNCHINという名前" />

      {/* dual-meaning lead: 文鎮 + acronym */}
      <div style={{ marginTop: 40, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 1, background: C.line, border: `1px solid ${C.line}` }}>
        <div style={{ background: C.panel, padding: "30px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: C.mut3, textTransform: "uppercase" }}>意味 ①　Paperweight</span>
          <div style={{ display: "flex", alignItems: "baseline", gap: 16 }}>
            <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(40px, 6vw, 68px)", color: C.ink, lineHeight: 1 }}>文鎮</span>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: "clamp(16px,1.8vw,22px)", letterSpacing: "0.06em", color: C.mut }}>BUNCHIN</span>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.85, color: C.mut, margin: 0 }}>
            紙を押さえる<span style={{ color: C.ink }}>文鎮</span>のように、机に置いて<span style={{ color: C.ink }}>注意を固定する</span>。努力を強制せず、戻れる場所をつくる物理アンカー。
          </p>
        </div>
        <div style={{ background: C.panel, padding: "30px 28px", display: "flex", flexDirection: "column", gap: 14 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.18em", color: C.mut3, textTransform: "uppercase" }}>意味 ②　Acronym</span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {"BUNCHIN".split("").map((ch, i) => (
              <span key={i} style={{ fontFamily: "var(--font-pixel)", fontSize: "clamp(22px,3vw,34px)", letterSpacing: "0.04em", color: SYSTEM[i][3], lineHeight: 1 }}>{ch}</span>
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 15, lineHeight: 1.85, color: C.mut, margin: 0 }}>
            その7文字は、体験を支える<span style={{ color: C.ink }}>7つの要素</span>の頭文字でもあります。色は、各要素が宿る<span style={{ color: C.ink }}>状態の信号色</span>。
          </p>
        </div>
      </div>

      {/* the seven elements */}
      <div style={{ marginTop: 24, border: `1px solid ${C.line}` }}>
        {SYSTEM.map((s, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "clamp(72px, 11vw, 116px) minmax(0, 220px) 1fr", alignItems: "center", gap: "clamp(14px, 2.5vw, 32px)", padding: "clamp(18px,2.4vw,26px) clamp(18px,3vw,28px)", borderBottom: i < SYSTEM.length - 1 ? `1px solid ${C.line}` : "none", background: C.panel }}>
            <span style={{ fontFamily: "var(--font-pixel)", fontSize: "clamp(44px, 7vw, 84px)", lineHeight: 0.9, color: s[3], textAlign: "center" }}>{s[0]}</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.12em", color: C.mut, textTransform: "uppercase" }}>{s[1]}</span>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "clamp(20px, 2.2vw, 28px)", color: C.ink }}>{s[2]}</span>
            </div>
            <span style={{ fontFamily: "var(--font-body)", fontSize: "clamp(14px,1.4vw,16px)", lineHeight: 1.7, color: C.mut }}>{s[4]}</span>
          </div>
        ))}
      </div>
    </Section>
  );
}

Object.assign(window, { NameMeaning, SYSTEM });
