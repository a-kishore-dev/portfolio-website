import { useState, useEffect, useRef, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { terminalContent } from "../data/terminalContent.js";

const CYAN = "#00F0FF";
const GREEN = "#34D399";

const COMMANDS = terminalContent.commands;

function TypewriterText({ text, onComplete }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const id = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        onComplete?.();
      }
    }, 10);
    return () => clearInterval(id);
  }, [text]);

  return (
    <span style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>{displayed}</span>
  );
}

export default function Terminal() {
  const sectionRef = useRef(null);
  const inputRef = useRef(null);
  const bodyRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [booted, setBooted] = useState(false);
  const [output, setOutput] = useState([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [histIdx, setHistIdx] = useState(-1);
  const [isTyping, setIsTyping] = useState(false);

  // Scroll only inside the terminal box — never touch the page scroll position
  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [output]);

  useEffect(() => {
    if (!isInView || booted) return;
    const boot = async () => {
      setIsTyping(true);
      const steps = terminalContent.bootSteps;
      for (const step of steps) {
        await new Promise((r) => setTimeout(r, step.delay));
        setOutput((prev) => [...prev, { type: "system", text: step.text }]);
      }
      setBooted(true);
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus({ preventScroll: true }), 100);
    };
    boot();
  }, [isInView, booted]);

  const submit = useCallback(
    (e) => {
      e?.preventDefault();
      const cmd = input.trim().toLowerCase();
      if (!cmd || isTyping) return;

      setHistory((h) => [...h, cmd]);
      setHistIdx(-1);
      setInput("");

      if (cmd === "clear") {
        setOutput([]);
        return;
      }

      const response =
        COMMANDS[cmd] ||
        `bash: ${cmd}: command not found. Type 'help' for commands.`;

      setOutput((prev) => [
        ...prev,
        { type: "input", text: cmd },
        { type: "output", text: response, typing: true },
      ]);
      setIsTyping(true);
    },
    [input, isTyping]
  );

  const onKey = (e) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      const newIdx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(newIdx);
      setInput(history[history.length - 1 - newIdx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (histIdx <= 0) { setHistIdx(-1); setInput(""); }
      else {
        const newIdx = histIdx - 1;
        setHistIdx(newIdx);
        setInput(history[history.length - 1 - newIdx] ?? "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const matches = Object.keys(COMMANDS).filter((c) =>
        c.startsWith(input.toLowerCase())
      );
      if (matches.length === 1) setInput(matches[0]);
    }
  };

  return (
    <section
      id="terminal"
      ref={sectionRef}
      style={{ padding: "6rem 0", backgroundColor: "#050505", color: "#fff" }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 2rem" }}>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: "2.5rem" }}
        >
          <p style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: terminalContent.labelSize || "0.72rem",
            color: "#6B7280",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: "1rem",
          }}>
            {terminalContent.label}
          </p>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: terminalContent.titleSize || "clamp(2.4rem, 4.5vw, 3.75rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            margin: 0,
          }}>
            <span style={{ color: "#F0F4FF" }}>{terminalContent.titlePrefix}</span>
            <span style={{
              background: `linear-gradient(90deg, ${CYAN}, #38BDF8)`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {terminalContent.titleHighlight}
            </span>
          </h2>
        </motion.div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            borderRadius: "0.875rem",
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.08)",
            background: "rgba(8,8,10,0.94)",
            backdropFilter: "blur(24px)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
          }}
        >
          {/* Title bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0.6rem 1rem",
            background: "rgba(255,255,255,0.04)",
            borderBottom: "1px solid rgba(255,255,255,0.07)",
          }}>
            <div style={{ display: "flex", gap: "0.4rem" }}>
              {["#FF5F57", "#FEBC2E", "#28C840"].map((c, i) => (
                <span key={i} style={{ width: 11, height: 11, borderRadius: "50%", backgroundColor: c, opacity: 0.9, display: "block" }} />
              ))}
            </div>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.68rem",
              color: "#6B7280",
              letterSpacing: "0.05em",
            }}>
              guest@kishore-portfolio: ~
            </span>
            <div style={{ width: 48 }} />
          </div>

          {/* Body */}
          <div
            ref={bodyRef}
            onClick={() => !isTyping && inputRef.current?.focus({ preventScroll: true })}
            style={{
              height: 400,
              overflowY: "auto",
              padding: "1.25rem 1.5rem",
              cursor: "text",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.8rem",
              lineHeight: 1.7,
              scrollbarWidth: "thin",
              scrollbarColor: "rgba(255,255,255,0.1) transparent",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>

              {output.map((line, i) => {
                const isLastOutput =
                  line.type === "output" && i === output.length - 1;

                if (line.type === "input") {
                  return (
                    <div key={i} style={{ display: "flex", alignItems: "baseline", gap: "0.5rem" }}>
                      <span style={{ color: GREEN, whiteSpace: "nowrap", flexShrink: 0 }}>
                        guest@portfolio ~ %
                      </span>
                      <span style={{ color: CYAN }}>{line.text}</span>
                    </div>
                  );
                }

                if (line.type === "system") {
                  return (
                    <div key={i} style={{ color: "#6B7280", whiteSpace: "pre-wrap" }}>
                      {line.text}
                    </div>
                  );
                }

                return (
                  <div key={i} style={{ color: "#D1D5DB" }}>
                    {isLastOutput && line.typing ? (
                      <TypewriterText
                        text={line.text}
                        onComplete={() => {
                          setIsTyping(false);
                          setOutput((prev) =>
                            prev.map((l, idx) =>
                              idx === i ? { ...l, typing: false } : l
                            )
                          );
                        }}
                      />
                    ) : (
                      <span style={{ whiteSpace: "pre-wrap" }}>{line.text}</span>
                    )}
                  </div>
                );
              })}

              {/* Input row */}
              {booted && (
                <form
                  onSubmit={submit}
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.25rem" }}
                >
                  <span style={{ color: GREEN, whiteSpace: "nowrap", flexShrink: 0 }}>
                    guest@portfolio ~ %
                  </span>
                  <div style={{ position: "relative", flex: 1, display: "flex", alignItems: "center" }}>
                    <input
                      ref={inputRef}
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={onKey}
                      disabled={isTyping}
                      autoComplete="off"
                      spellCheck="false"
                      style={{
                        width: "100%",
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: CYAN,
                        caretColor: "transparent",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.8rem",
                        padding: 0,
                        lineHeight: 1.7,
                      }}
                    />
                    {/* Blinking block cursor */}
                    {!isTyping && (
                      <span style={{
                        position: "absolute",
                        left: `${input.length * 0.492}rem`,
                        width: "0.55rem",
                        height: "1rem",
                        backgroundColor: CYAN,
                        opacity: 0.85,
                        animation: "blink 1s step-end infinite",
                        pointerEvents: "none",
                      }} />
                    )}
                  </div>
                </form>
              )}

            </div>
          </div>

          {/* Status bar */}
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "0.4rem 1rem",
            borderTop: "1px solid rgba(255,255,255,0.05)",
            background: "rgba(255,255,255,0.02)",
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: GREEN, display: "inline-block" }} />
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#6B7280" }}>
              {isTyping ? "typing..." : booted ? "ready · type 'help'" : "booting..."}
            </span>
            <span style={{ marginLeft: "auto", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.6rem", color: "#4B5563" }}>
              portfolio.sh · bash 5.2
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
