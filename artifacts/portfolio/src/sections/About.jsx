import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { MapPin, GraduationCap, Award, Calendar } from "lucide-react";
import { aboutContent } from "../data/aboutContent.js";

const iconMap = {
  Award,
  GraduationCap,
  Calendar,
  MapPin,
  CGPA: Award,
  University: GraduationCap,
  Graduation: Calendar,
  Location: MapPin
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 90, damping: 22 },
  },
};

function TiltCard({ children }) {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 18 });
  const sy = useSpring(my, { stiffness: 120, damping: 18 });
  const rotateX = useTransform(sy, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(sx, [-0.5, 0.5], ["-7deg", "7deg"]);

  const onMove = (e) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { mx.set(0); my.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d", width: "100%", height: "100%" }}
    >
      {/* Glow layer */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "1.5rem",
        background: "linear-gradient(135deg, rgba(0,240,255,0.08), transparent)",
        opacity: 0, transition: "opacity 0.4s",
        filter: "blur(20px)", transform: "translateZ(-40px)",
        pointerEvents: "none",
      }} />

      {/* Card surface */}
      <div style={{
        position: "relative",
        height: "100%",
        background: "rgba(10,10,12,0.85)",
        backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "1.5rem",
        padding: "2rem",
        transform: "translateZ(30px)",
        overflow: "hidden",
      }}>
        {/* Top-left corner accent */}
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: 100, height: 1,
          background: "linear-gradient(90deg, #00F0FF40, transparent)",
        }} />
        <div style={{
          position: "absolute", top: 0, left: 0,
          width: 1, height: 100,
          background: "linear-gradient(180deg, #00F0FF40, transparent)",
        }} />
        {children}
      </div>
    </motion.div>
  );
}

export default function About() {
  return (
    <section
      id="story"
      style={{
        position: "relative",
        padding: "7rem 0",
        backgroundColor: "#050505",
        overflow: "hidden",
        color: "#fff",
      }}
    >
      {/* Animated background grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        maskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 80% 70% at 50% 50%, black 30%, transparent 100%)",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "4rem 4rem",
        }} />
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        style={{
          maxWidth: 1400,
          margin: "0 auto",
          padding: "0 4rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{
          display: "flex",
          flexDirection: "row",
          gap: "5rem",
          alignItems: "center",
        }}>

          {/* ── LEFT COLUMN ─────────────────────────── */}
          <div style={{ flex: "0 0 58%", maxWidth: "58%" }}>

            {/* Label */}
            <motion.div variants={item} style={{ marginBottom: "1.5rem" }}>
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: aboutContent.labelSize || "0.72rem",
                color: "#6B7280",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
              }}>
                {aboutContent.label}
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div variants={item} style={{ overflow: "hidden", marginBottom: "2rem" }}>
              <h2 style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 800,
                fontSize: aboutContent.titleSize || "clamp(2.4rem, 4.5vw, 3.75rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.025em",
                margin: 0,
              }}>
                <span style={{ color: "#F0F4FF" }}>{aboutContent.titlePrefix}</span>
                <span style={{
                  background: "linear-gradient(90deg, #00F0FF, #38BDF8)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}>
                  {aboutContent.titleHighlight}
                </span>
              </h2>
            </motion.div>

            {/* Body text */}
            <motion.div variants={item} style={{ display: "flex", flexDirection: "column", gap: "1.25rem", marginBottom: "2.5rem" }}>
              {aboutContent.paragraphs && aboutContent.paragraphs.map((p, idx) => (
                <p key={idx} style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: aboutContent.paragraphSize || "1.0625rem",
                  color: "#9CA3AF",
                  lineHeight: 1.75,
                  maxWidth: "520px",
                  margin: 0,
                }}>
                  {p}
                </p>
              ))}
            </motion.div>

            {/* #KishoreAI badge */}
            <motion.div variants={item}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  padding: "0.55rem 1.25rem",
                  borderRadius: "9999px",
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(0,240,255,0.2)",
                  boxShadow: "0 0 16px rgba(0,240,255,0.08), inset 0 0 12px rgba(0,240,255,0.03)",
                  cursor: "default",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{
                  position: "absolute", inset: 0, borderRadius: "9999px",
                  background: "linear-gradient(90deg, rgba(0,240,255,0.08), transparent)",
                  pointerEvents: "none",
                }} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.85rem",
                  color: "#00F0FF",
                  position: "relative",
                  zIndex: 1,
                }}>
                  {aboutContent.tagText}
                </span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT COLUMN ────────────────────────── */}
          <div style={{
            flex: "1 1 42%",
            minHeight: "380px",
            perspective: "1000px",
          }}>
            <motion.div variants={item} style={{ height: "100%", minHeight: "380px" }}>
              <TiltCard>
                <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-between" }}>

                  {/* Stat rows */}
                  <div>
                    {aboutContent.stats && aboutContent.stats.map((stat, i) => {
                      const IconComponent = iconMap[stat.label] || Award;
                      return (
                        <div
                          key={i}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "1rem 0",
                            borderBottom: i < aboutContent.stats.length - 1 ? "1px solid rgba(255,255,255,0.05)" : "none",
                          }}
                        >
                          <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
                            <IconComponent
                              size={15}
                              style={{ color: "#4B5563", flexShrink: 0 }}
                            />
                            <span style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              fontSize: "0.65rem",
                              color: "#6B7280",
                              textTransform: "uppercase",
                              letterSpacing: "0.12em",
                            }}>
                              {stat.label}
                            </span>
                          </div>
                          <span style={{
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "0.85rem",
                            fontWeight: 500,
                            color: "#E5E7EB",
                            textAlign: "right",
                          }}>
                            {stat.value}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Availability footer */}
                  <div style={{
                    marginTop: "1.5rem",
                    paddingTop: "1.25rem",
                    borderTop: "1px solid rgba(255,255,255,0.07)",
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                  }}>
                    {/* Full-time */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.4rem 0.9rem",
                      borderRadius: "0.5rem",
                      background: "rgba(16,185,129,0.08)",
                      border: "1px solid rgba(16,185,129,0.2)",
                    }}>
                      <span style={{ position: "relative", width: 8, height: 8, display: "flex", flexShrink: 0 }}>
                        <span style={{
                          position: "absolute", inset: 0, borderRadius: "50%",
                          backgroundColor: "#10B981", opacity: 0.7,
                          animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                        }} />
                        <span style={{ position: "relative", borderRadius: "50%", width: 8, height: 8, backgroundColor: "#10B981", display: "inline-block" }} />
                      </span>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "#34D399" }}>
                        Open to Full-time
                      </span>
                    </div>

                    {/* Freelance */}
                    <div style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      padding: "0.4rem 0.9rem",
                      borderRadius: "0.5rem",
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.09)",
                    }}>
                      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: "#9CA3AF" }}>
                        Open to Freelance
                      </span>
                    </div>
                  </div>

                </div>
              </TiltCard>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
