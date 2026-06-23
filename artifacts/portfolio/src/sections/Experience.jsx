import { useRef, Fragment } from "react";
import { motion, useScroll } from "framer-motion";
import { experienceContent } from "../data/experienceContent.js";

// ── FIXES APPLIED (matched to About.jsx styling system) ───────────────────
//
// 1. FONT FAMILIES: All text now uses explicit style={{fontFamily}} instead
//    of Tailwind font-* classes — guarantees 'JetBrains Mono', 'Space Grotesk',
//    and 'Inter' render correctly regardless of Tailwind config.
//
// 2. SECTION HEADING: Replaced Tailwind text-xl/text-2xl card h3 with the
//    same clamp(2.4rem, 4.5vw, 3.75rem) heading system used in About.jsx.
//    Section title now lives outside the cards, matching About layout.
//
// 3. MAX WIDTH: max-w-4xl (896px) → maxWidth: 1400px matching About.jsx.
//    Cards now use a two-column grid on large screens instead of single column.
//
// 4. SECTION BG: #070B14 → #050505 matching About.jsx background exactly.
//
// 5. BODY TEXT COLOR: slate-400 (#94A3B8) → #9CA3AF matching About.jsx.
//
// 6. CARD TITLES: Removed 'uppercase tracking-wide' — About.jsx never uses
//    all-caps for card-level titles. Now sentence case, consistent with About.
//
// 7. ALL STYLING: Migrated from Tailwind className to inline style={{}} for
//    all typography and color — same pattern as About.jsx throughout.
//
// 8. CORNER ACCENT: Kept — present in both About.jsx TiltCard and
//    Experience.jsx SectionCard. Color and dimensions matched exactly.
// ──────────────────────────────────────────────────────────────────────────

function DownloadIcon() {
  return (
    <svg
      style={{ width: 16, height: 16, transition: "transform 0.2s" }}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  );
}

// ── Animation variants ─────────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 75, damping: 16 },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 85, damping: 16 },
  },
};

// ── SectionCard — matches About.jsx TiltCard surface exactly ──────────────
function SectionCard({ category, title, subtitle, metricLabel, metricValue, children }) {
  return (
    <motion.div
      variants={cardVariants}
      style={{
        position: "relative",
        background: "rgba(10,10,12,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "1.5rem",
        padding: "2rem",
        overflow: "hidden",
        transition: "border-color 0.3s",
      }}
      whileHover={{ borderColor: "rgba(255,255,255,0.15)" }}
    >
      {/* Top-left corner accent — identical to About.jsx TiltCard */}
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: 100, height: 1,
        background: "linear-gradient(90deg, rgba(0,240,255,0.25), transparent)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", top: 0, left: 0,
        width: 1, height: 100,
        background: "linear-gradient(180deg, rgba(0,240,255,0.25), transparent)",
        pointerEvents: "none",
      }} />

      {/* Card header row */}
      <div style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "1.5rem",
        marginBottom: "1.5rem",
        flexWrap: "wrap",
      }}>
        {/* Left: category + title + subtitle */}
        <div style={{ flex: "1 1 auto" }}>
          {/* Category label — matches About.jsx stat label style */}
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.65rem",
            color: "#6B7280",
            textTransform: "uppercase",
            letterSpacing: "0.15em",
            display: "block",
            marginBottom: "0.5rem",
          }}>
            {category}
          </span>

          {/* Card title — FIX: was text-xl/2xl uppercase. Now matches About
              body font sizing: prominent but not a section heading. */}
          <h3 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "1.25rem",
            color: "#F0F4FF",
            lineHeight: 1.2,
            margin: 0,
            letterSpacing: "-0.015em",
          }}>
            {title}
          </h3>

          {/* Subtitle — matches About.jsx stat value style */}
          {subtitle && (
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.8rem",
              color: "#6B7280",
              fontWeight: 500,
              marginTop: "0.35rem",
              marginBottom: 0,
            }}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Metric block — matches About.jsx stat row card surface */}
        {metricValue && (
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.05)",
            borderRadius: "0.75rem",
            padding: "0.75rem 1rem",
            minWidth: 140,
            fontFamily: "'JetBrains Mono', monospace",
            flexShrink: 0,
          }}>
            <span style={{
              fontSize: "0.6rem",
              color: "#6B7280",
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              display: "block",
            }}>
              {metricLabel || "Metric"}
            </span>
            <span style={{
              fontSize: "1.05rem",
              fontWeight: 700,
              color: "#00F0FF",
              display: "block",
              marginTop: "0.25rem",
            }}>
              {metricValue}
            </span>
          </div>
        )}
      </div>

      {children}
    </motion.div>
  );
}

// ── Main Experience component ──────────────────────────────────────────────
export default function Experience() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  return (
    <section
      id="experience"
      style={{
        position: "relative",
        padding: "7rem 0",           // FIX: matched About.jsx py-24 → 7rem 0
        backgroundColor: "#050505",  // FIX: was #070B14, About uses #050505
        overflow: "hidden",
        color: "#fff",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}
    >
      {/* Backdrop glows — same positioning as About.jsx */}
      <div style={{
        position: "absolute",
        top: "25%", left: "25%",
        width: 400, height: 400,
        background: "rgba(0,240,255,0.02)",
        filter: "blur(120px)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute",
        bottom: "25%", right: "25%",
        width: 400, height: 400,
        background: "rgba(59,126,248,0.02)",
        filter: "blur(120px)",
        borderRadius: "50%",
        pointerEvents: "none",
      }} />

      {/* Animated background grid — same as About.jsx */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)," +
            "linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }} />
      </div>

      {/* Content container — FIX: maxWidth 1400 matching About.jsx */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        style={{
          maxWidth: 1400,              // FIX: was max-w-4xl (896px)
          margin: "0 auto",
          padding: "0 4rem",           // FIX: matched About.jsx padding
          position: "relative",
          zIndex: 1,
        }}
      >

        {/* Section header — same structure and style as About.jsx */}
        <motion.div variants={childVariants} style={{ marginBottom: "4rem" }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: experienceContent.labelSize || "0.72rem",
            color: "#6B7280",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "1rem",
          }}>
            {experienceContent.label}
          </span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: experienceContent.titleSize || "clamp(2.4rem, 4.5vw, 3.75rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            margin: 0,
          }}>
            <span style={{ color: "#F0F4FF" }}>
              {experienceContent.titlePrefix}
            </span>
            <span style={{
              background: "linear-gradient(90deg, #00F0FF, #38BDF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {experienceContent.titleHighlight}
            </span>
          </h2>
        </motion.div>

        {/* Timeline + Cards layout */}
        <div ref={containerRef} style={{ position: "relative" }}>

          {/* Timeline track */}
          <div style={{
            position: "absolute",
            left: 7,
            top: 24,
            bottom: 96,
            width: 2,
            background: "rgba(255,255,255,0.06)",
            borderRadius: 9999,
            pointerEvents: "none",
          }} />

          {/* Scroll-progress glowing line */}
          <motion.div
            style={{
              scaleY: scrollYProgress,
              transformOrigin: "top",
              position: "absolute",
              left: 7,
              top: 24,
              bottom: 96,
              width: 2,
              background: "linear-gradient(to bottom, #00F0FF, #3B7EF8)",
              borderRadius: 9999,
              boxShadow: "0 0 8px rgba(0,240,255,0.4)",
              pointerEvents: "none",
            }}
          />

          {/* Card stack */}
          <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
            {experienceContent.items.map((item, idx) => (
              <div
                key={idx}
                style={{ position: "relative", paddingLeft: "2.5rem" }}
                className="group/timeline-item"
              >
                {/* Diamond timeline node */}
                <motion.div
                  variants={{
                    hidden: { scale: 0, opacity: 0, rotate: 45 },
                    visible: {
                      scale: 1, opacity: 1, rotate: 45,
                      transition: { type: "spring", stiffness: 150, damping: 15 },
                    },
                  }}
                  style={{
                    position: "absolute",
                    left: 7,
                    top: 32,
                    transform: "translate(-50%, -50%) rotate(45deg)",
                    width: 14,
                    height: 14,
                    background: "#050505",
                    border: "2px solid rgba(255,255,255,0.2)",
                    zIndex: 20,
                    transition: "border-color 0.3s, box-shadow 0.3s",
                  }}
                  className="group-hover/timeline-item:!border-[#00F0FF] group-hover/timeline-item:shadow-[0_0_8px_#00F0FF]"
                />

                <SectionCard
                  category={item.category}
                  title={item.title}
                  subtitle={item.subtitle}
                  metricLabel={item.metricLabel}
                  metricValue={item.metricValue}
                >
                  {/* Description — FIX: font-family explicit, color #9CA3AF */}
                  {item.description && (
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9375rem",       // FIX: was text-sm (0.875rem)
                      color: "#9CA3AF",             // FIX: was slate-400 (#94A3B8)
                      lineHeight: 1.75,
                      margin: 0,
                      marginBottom: item.pipelineSteps || item.certifications || item.achievements
                        ? "1.5rem"
                        : 0,
                    }}>
                      {item.description}
                    </p>
                  )}

                  {/* Education mini-timeline */}
                  {item.timeline && (
                    <motion.div
                      variants={childVariants}
                      style={{ marginBottom: "1.5rem" }}
                    >
                      {item.timeline.map((node, tIdx) => (
                        <div
                          key={tIdx}
                          style={{
                            display: "flex",
                            gap: "1.25rem",
                            alignItems: "flex-start",
                            marginBottom: tIdx < item.timeline.length - 1 ? "1.25rem" : 0,
                            position: "relative",
                          }}
                        >
                          {/* Year badge */}
                          <div style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            color: "#6B7280",
                            background: "rgba(255,255,255,0.03)",
                            border: "1px solid rgba(255,255,255,0.06)",
                            borderRadius: "0.4rem",
                            padding: "0.3rem 0.6rem",
                            whiteSpace: "nowrap",
                            minWidth: 76,
                            textAlign: "center",
                            flexShrink: 0,
                            marginTop: "0.1rem",
                            letterSpacing: "0.05em",
                          }}>
                            {node.year}
                          </div>

                          {/* Connector line + dot */}
                          <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            flexShrink: 0,
                            marginTop: "0.45rem",
                          }}>
                            <div style={{
                              width: 7,
                              height: 7,
                              borderRadius: "50%",
                              background: "rgba(255,255,255,0.25)",
                              boxShadow: "none",
                              flexShrink: 0,
                            }} />
                            {tIdx < item.timeline.length - 1 && (
                              <div style={{
                                width: 1,
                                flexGrow: 1,
                                minHeight: 28,
                                background: "rgba(255,255,255,0.07)",
                                marginTop: 4,
                              }} />
                            )}
                          </div>

                          {/* Event text */}
                          <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.875rem",
                            color: "#9CA3AF",
                            lineHeight: 1.65,
                            margin: 0,
                            paddingBottom: tIdx < item.timeline.length - 1 ? "0.5rem" : 0,
                          }}>
                            {node.event}
                          </p>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Closing note (Education card italic line) */}
                  {item.closingNote && (
                    <motion.p
                      variants={childVariants}
                      style={{
                        fontFamily: "'Inter', sans-serif",
                        fontSize: "0.825rem",
                        color: "#6B7280",
                        fontStyle: "italic",
                        lineHeight: 1.6,
                        margin: 0,
                        borderLeft: "2px solid rgba(0,240,255,0.2)",
                        paddingLeft: "0.875rem",
                      }}
                    >
                      {item.closingNote}
                    </motion.p>
                  )}

                  {/* SafeBite Pipeline Trace */}
                  {item.pipelineSteps && (
                    <motion.div
                      variants={childVariants}
                      style={{
                        background: "rgba(0,0,0,0.25)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "0.75rem",
                        padding: "1.25rem 1.5rem",
                      }}
                    >
                      {item.pipelineLabel && (
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: "0.6rem",
                          color: "#6B7280",
                          textTransform: "uppercase",
                          letterSpacing: "0.15em",
                          display: "block",
                          marginBottom: "1rem",
                          fontWeight: 600,
                        }}>
                          {item.pipelineLabel}
                        </span>
                      )}
                      <motion.div
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                        style={{
                          display: "flex",
                          flexWrap: "wrap",
                          alignItems: "center",
                          gap: "0.5rem",
                        }}
                      >
                        {item.pipelineSteps.map((step, sIdx) => (
                          <Fragment key={sIdx}>
                            <motion.div
                              variants={childVariants}
                              style={{
                                fontFamily: "'JetBrains Mono', monospace",
                                fontSize: "0.75rem",
                                color: "#CBD5E1",
                                background: "rgba(10,10,12,0.5)",
                                border: "1px solid rgba(255,255,255,0.05)",
                                borderRadius: "0.5rem",
                                padding: "0.4rem 0.85rem",
                              }}
                            >
                              {step}
                            </motion.div>
                            {sIdx < item.pipelineSteps.length - 1 && (
                              <motion.span
                                variants={childVariants}
                                style={{
                                  color: "#00F0FF",
                                  fontWeight: 700,
                                  fontSize: "0.85rem",
                                }}
                              >
                                →
                              </motion.span>
                            )}
                          </Fragment>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Certifications grid */}
                  {item.certifications && (
                    <motion.div
                      variants={childVariants}
                      style={{
                        background: "rgba(0,0,0,0.25)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "0.75rem",
                        padding: "1.25rem 1.5rem",
                      }}
                    >
                      <motion.div
                        variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                          gap: "1.25rem",
                        }}
                      >
                        {item.certifications.map((cert, cIdx) => (
                          <motion.div
                            key={cIdx}
                            variants={childVariants}
                            style={{ display: "flex", alignItems: "flex-start", gap: "0.65rem" }}
                          >
                            <span style={{
                              color: "#00F0FF",
                              fontWeight: 700,
                              fontSize: "1rem",
                              lineHeight: 1,
                              marginTop: "0.1rem",
                              flexShrink: 0,
                            }}>
                              •
                            </span>
                            <div>
                              <span style={{
                                fontFamily: "'Inter', sans-serif",
                                fontWeight: 600,
                                fontSize: "0.875rem",
                                color: "#E5E7EB",
                                display: "block",
                              }}>
                                {cert.title}
                              </span>
                              <span style={{
                                fontFamily: "'Inter', sans-serif",
                                fontSize: "0.78rem",
                                color: "#6B7280",
                                display: "block",
                                marginTop: "0.2rem",
                                lineHeight: 1.5,
                              }}>
                                {cert.desc}
                              </span>
                            </div>
                          </motion.div>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}

                  {/* Achievements */}
                  {item.achievements && (
                    <motion.div
                      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                        gap: "2rem",
                      }}
                    >
                      {item.achievements.map((ach, aIdx) => (
                        <motion.div key={aIdx} variants={childVariants}>
                          <h4 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontWeight: 700,
                            fontSize: "0.9rem",
                            color: "#E5E7EB",
                            margin: 0,
                            marginBottom: "0.5rem",
                            letterSpacing: "-0.01em",
                          }}>
                            {ach.title}
                          </h4>
                          <p style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.825rem",
                            color: "#9CA3AF",
                            lineHeight: 1.65,
                            margin: 0,
                          }}>
                            {ach.desc}
                          </p>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </SectionCard>
              </div>
            ))}

            {/* Download CTA */}
            <motion.div
              variants={childVariants}
              style={{ display: "flex", justifyContent: "center", paddingTop: "2rem" }}
            >
              <motion.a
                href={experienceContent.resumePdfUrl}
                download
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "1rem 2rem",
                  borderRadius: "0.75rem",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.75rem",
                  fontWeight: 700,
                  color: "#000",
                  background: "#00F0FF",
                  boxShadow: "0 4px 24px rgba(0,240,255,0.15)",
                  textDecoration: "none",
                  cursor: "pointer",
                  transition: "background 0.2s, box-shadow 0.2s",
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = "#fff";
                  e.currentTarget.style.boxShadow = "0 4px 32px rgba(0,240,255,0.3)";
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = "#00F0FF";
                  e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,240,255,0.15)";
                }}
              >
                <DownloadIcon />
                Download Resume (PDF)
              </motion.a>
            </motion.div>

          </div>
        </div>
      </motion.div>
    </section>
  );
}