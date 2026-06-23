import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";
import { heroContent } from "../data/heroContent.js";

const CODE_LINES = heroContent.codeLines || [];
const STATS = heroContent.stats || [];

const CHARS_PER_TICK = 3;
const TICK_MS = 28;
const PAUSE_AFTER_MS = 2200;

function buildFullText(lines) {
  return lines.map((l) => {
    if (l.parts) return l.parts.map((p) => p.t).join("");
    return l.text;
  });
}

function Terminal() {
  const fullLines = buildFullText(CODE_LINES);
  const totalChars = fullLines.reduce((a, l) => a + l.length + 1, 0);

  const [charCount, setCharCount] = useState(0);
  const [pausing, setPausing] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    let current = 0;
    let pauseTimeout = null;

    function tick() {
      current = Math.min(current + CHARS_PER_TICK, totalChars);
      setCharCount(current);

      if (current >= totalChars) {
        pauseTimeout = setTimeout(() => {
          current = 0;
          setCharCount(0);
          rafRef.current = setTimeout(tick, TICK_MS);
        }, PAUSE_AFTER_MS);
        return;
      }
      rafRef.current = setTimeout(tick, TICK_MS);
    }

    rafRef.current = setTimeout(tick, 600);
    return () => {
      clearTimeout(rafRef.current);
      clearTimeout(pauseTimeout);
    };
  }, [totalChars]);

  // Render visible lines from charCount
  let remaining = charCount;
  const renderedLines = CODE_LINES.map((line, li) => {
    const fullText = fullLines[li];
    const lineLen = fullText.length + 1; // +1 for newline
    if (remaining <= 0) return { visible: false, partial: "" };

    const visibleChars = Math.min(remaining, fullText.length);
    remaining -= lineLen;

    return { visible: true, partial: fullText.slice(0, visibleChars), full: fullText, line };
  });

  const showCursor = charCount < totalChars || pausing;

  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      style={{
        background: "rgba(8,10,28,0.75)",
        border: "1px solid rgba(0,229,200,0.18)",
        borderRadius: "14px",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
        boxShadow:
          "0 8px 48px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset",
        overflow: "hidden",
        width: "100%",
        maxWidth: "480px",
      }}
    >
      {/* Mac header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "0.45rem",
          padding: "0.75rem 1rem",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          background: "rgba(255,255,255,0.03)",
        }}
      >
        {[["#ff5f57","#ff5f57"],["#febc2e","#febc2e"],["#28c840","#28c840"]].map(([bg], i) => (
          <span
            key={i}
            style={{
              width: 10,
              height: 10,
              borderRadius: "50%",
              backgroundColor: bg,
              display: "inline-block",
              opacity: 0.9,
            }}
          />
        ))}
        <span
          style={{
            marginLeft: "auto",
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.68rem",
            color: "#636da6",
          }}
        >
          hybrid_rag.py
        </span>
      </div>

      {/* Code body */}
      <div
        style={{
          padding: "1.25rem 1.25rem 1.5rem",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.72rem",
          lineHeight: "1.75",
          overflowX: "auto",
          minHeight: "320px",
        }}
      >
        {renderedLines.map((r, li) => {
          if (!r.visible) return null;
          const { partial, full, line } = r;

          // Comment lines
          if (line.text.startsWith("#") || line.text === "") {
            return (
              <div key={li} style={{ whiteSpace: "pre" }}>
                <span style={{ color: "#636da6" }}>{partial}</span>
                {li === renderedLines.findLastIndex((x) => x.visible) && (
                  <span style={cursorStyle} />
                )}
              </div>
            );
          }

          // Lines with syntax parts
          if (line.parts) {
            let partRemaining = partial.length;
            const spans = line.parts.map((p, pi) => {
              if (partRemaining <= 0) return null;
              const vis = p.t.slice(0, partRemaining);
              partRemaining -= p.t.length;
              return (
                <span key={pi} style={{ color: p.c }}>{vis}</span>
              );
            });
            const isLast = li === renderedLines.findLastIndex((x) => x.visible);
            return (
              <div key={li} style={{ whiteSpace: "pre" }}>
                {spans}
                {isLast && <span style={cursorStyle} />}
              </div>
            );
          }

          // Plain lines
          const isLast = li === renderedLines.findLastIndex((x) => x.visible);
          return (
            <div key={li} style={{ whiteSpace: "pre" }}>
              <span style={{ color: line.color || "#c8d3f5" }}>{partial}</span>
              {isLast && <span style={cursorStyle} />}
            </div>
          );
        })}
      </div>

      {/* Status bar */}
      <div
        style={{
          padding: "0.4rem 1.25rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "rgba(0,229,200,0.04)",
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "#00E5C8", display: "inline-block" }} />
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.62rem", color: "#636da6" }}>
          RAG pipeline · Python 3.11 · Running
        </span>
      </div>
    </motion.div>
  );
}

const cursorStyle = {
  display: "inline-block",
  width: "2px",
  height: "0.9em",
  backgroundColor: "#00E5C8",
  marginLeft: "1px",
  verticalAlign: "text-bottom",
  animation: "blink 1s step-end infinite",
};

/* ── Stagger variants ────────────────────────────── */
const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};
const itemV = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// STATS is loaded dynamically from heroContent above

export default function Hero() {
  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        minHeight: "100vh",
        backgroundColor: "#050511",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* ── Radial glows ─────────────────────────────── */}
      <div style={{
        position: "absolute", top: "-10%", left: "-5%",
        width: 600, height: 600, borderRadius: "50%", zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(circle, rgba(0,229,200,0.10) 0%, transparent 70%)",
      }} />
      <div style={{
        position: "absolute", top: "20%", right: "-8%",
        width: 700, height: 700, borderRadius: "50%", zIndex: 0, pointerEvents: "none",
        background: "radial-gradient(circle, rgba(59,62,248,0.13) 0%, rgba(100,60,255,0.06) 40%, transparent 70%)",
      }} />

      {/* ── LEFT COLUMN ──────────────────────────────── */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        style={{
          position: "relative", zIndex: 1,
          padding: "9rem 3rem 6rem 4rem",
          display: "flex", flexDirection: "column", gap: 0,
        }}
      >
        {/* Availability badge — inline, top of column */}
        <motion.div
          variants={itemV}
          style={{
            display: "inline-flex", alignSelf: "flex-start",
            alignItems: "center", gap: "0.5rem",
            padding: "0.32rem 0.85rem", borderRadius: "9999px",
            background: "rgba(5,5,17,0.7)", border: "1px solid rgba(34,197,94,0.25)",
            backdropFilter: "blur(10px)", marginBottom: "1.1rem",
          }}
        >
          <span style={{ position: "relative", width: 8, height: 8, flexShrink: 0, display: "flex" }}>
            <span style={{
              position: "absolute", inset: 0, borderRadius: "50%",
              backgroundColor: "#22c55e", opacity: 0.7,
              animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
            }} />
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", backgroundColor: "#22c55e" }} />
          </span>
          <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.7rem", color: "#6B7A99", whiteSpace: "nowrap" }}>
            Available for Opportunities
          </span>
        </motion.div>

        {/* Eyebrow */}
        <motion.p variants={itemV} style={{ margin: "0 0 1rem" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: heroContent.eyebrowSize || "0.78rem", color: "#6B7A99", letterSpacing: "0.05em" }}>
            {heroContent.eyebrow}
          </span>
        </motion.p>

        {/* Name */}
        <motion.div variants={itemV} style={{ margin: "0 0 0.5rem" }}>
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: heroContent.nameSize || "clamp(2.8rem, 5vw, 4.75rem)",
              lineHeight: 1,
              background: "linear-gradient(125deg, #00E5C8 0%, #38BDF8 45%, #6366F1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              display: "block",
              letterSpacing: "-0.02em",
            }}
          >
            {heroContent.name}
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          variants={itemV}
          style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: heroContent.taglineSize || "clamp(1.4rem, 2.4vw, 2.1rem)", lineHeight: 1.2, margin: "0 0 2rem", color: "#6B7A99" }}
        >
          {heroContent.taglinePrefix}{" "}
          <span style={{
            background: "linear-gradient(125deg, #00E5C8 0%, #38BDF8 45%, #6366F1 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>
            {heroContent.taglineHighlight}
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          variants={itemV}
          style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, fontSize: heroContent.subHeadlineSize || "1.05rem", color: "#6B7A99", lineHeight: 1.75, maxWidth: "440px", margin: "0 0 3rem" }}
        >
          {heroContent.subHeadline}
        </motion.p>

        {/* CTAs */}
        <motion.div variants={itemV} style={{ display: "flex", gap: "0.875rem", flexWrap: "wrap", marginBottom: "4rem" }}>
          <button
            onClick={() => scrollTo("contact")}
            style={{
              padding: "0.72rem 1.85rem", borderRadius: "9999px",
              background: "linear-gradient(135deg, #00E5C8, #3B7EF8)",
              color: "#050511", fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: "0.9rem", border: "none", cursor: "pointer",
              transition: "all 0.3s ease",
              boxShadow: "0 0 0 rgba(0,229,200,0)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 0 15px rgba(0,229,200,0.65), 0 0 40px rgba(0,229,200,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 0 0 rgba(0,229,200,0)";
            }}
          >
            Hire Me
          </button>
          <button
            onClick={() => scrollTo("projects")}
            style={{
              padding: "0.72rem 1.85rem", borderRadius: "9999px",
              background: "transparent", color: "#00E5C8",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700, fontSize: "0.9rem",
              border: "1px solid rgba(0,229,200,0.45)", cursor: "pointer",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(0,229,200,0.10)";
              e.currentTarget.style.boxShadow = "0 0 16px rgba(0,229,200,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            View My Work
          </button>
        </motion.div>

        {/* Metric cards */}
        {STATS && STATS.length > 0 && (
          <motion.div
            variants={itemV}
            style={{ display: "grid", gridTemplateColumns: `repeat(${STATS.length}, 1fr)`, gap: "0.75rem", maxWidth: "480px" }}
          >
            {STATS.map(({ value, label }) => (
              <div
                key={label}
                style={{
                  background: "rgba(13,18,32,0.55)",
                  border: "1px solid rgba(0,229,200,0.20)",
                  borderRadius: "8px", padding: "0.85rem 1rem",
                  backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
                  display: "flex", flexDirection: "column", alignItems: "flex-start",
                }}
              >
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "1.2rem", color: "#00E5C8", lineHeight: 1.15, letterSpacing: "-0.01em", whiteSpace: "nowrap" }}>
                  {value}
                </div>
                <div style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.68rem", color: "#4B5675", marginTop: "0.35rem", whiteSpace: "nowrap" }}>
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* ── RIGHT COLUMN — Terminal ───────────────────── */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: "relative", zIndex: 1,
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "9rem 4rem 6rem 2rem",
        }}
      >
        <Terminal />
      </motion.div>

      {/* ── Scroll indicator ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        style={{
          position: "absolute", bottom: "2rem", left: "50%", transform: "translateX(-50%)",
          display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", zIndex: 10,
        }}
      >
        <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.65rem", color: "#6B7A99", letterSpacing: "0.12em", textTransform: "uppercase" }}>
          scroll
        </span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
          <svg width="12" height="16" viewBox="0 0 12 16" fill="none">
            <path d="M6 1L6 14M6 14L1 9M6 14L11 9" stroke="#6B7A99" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes ping { 75%, 100% { transform: scale(2.2); opacity: 0; } }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>
    </section>
  );
}
