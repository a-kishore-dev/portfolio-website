import { useRef } from "react";
import { motion, useScroll, useTransform, transform } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { FEATURED_PROJECTS } from "../data/projects.js";

const N = FEATURED_PROJECTS.length;

const STEP = 1 / (N > 1 ? N - 0.5 : 1);
const HOLD = STEP * 0.15;
const FADE = STEP * 0.25;

const ACCENTS = ["#00F0FF", "#A78BFA", "#34D399", "#F472B6"];

// ── Per-project image config ──────────────────────────────────────────────
// Each project in projects.js now carries:
//   imageStyle:   "cover" | "contain"
//   imageOverlay: CSS gradient string | "none"
//
// This helper reads those fields with safe fallbacks so the component
// works even if older project entries don't have them yet.
function getImageConfig(project) {
  const style = project.imageStyle || "cover";
  const overlay = project.imageOverlay || "linear-gradient(135deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)";
  return { style, overlay };
}

// ── SlotTitle ─────────────────────────────────────────────────────────────
function SlotTitle({ index, scrollYProgress }) {
  const isLast = index === N - 1;
  const center = index * STEP;
  const start = center - STEP;
  const end = center + STEP;

  const y = useTransform(scrollYProgress, (p) => {
    if (isLast) return transform(p, [start, center - HOLD, 1], ["100%", "0%", "0%"]);
    return transform(p, [start, center - HOLD, center + HOLD, end], ["100%", "0%", "0%", "-100%"]);
  });

  const opacity = useTransform(scrollYProgress, (p) => {
    if (isLast) return transform(p, [start + FADE, center - HOLD, 1], [0, 1, 1]);
    return transform(p, [start + FADE, center - HOLD, center + HOLD, end - FADE], [0, 1, 1, 0]);
  });

  return (
    <motion.div
      style={{
        y,
        opacity,
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "flex-end",
        paddingBottom: "0.4rem",
      }}
    >
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 800,
        fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)",
        letterSpacing: "-0.025em",
        lineHeight: 1.08,
        whiteSpace: "nowrap",
      }}>
        {(() => {
          const project = FEATURED_PROJECTS[index];
          const text = project ? (project.shortTitle || project.title) : "";
          const parts = text.split(" ");
          const last = parts.pop();
          const main = parts.length > 0 ? parts.join(" ") + " " : "";
          return (
            <>
              {main && <span style={{ color: "#F0F4FF" }}>{main}</span>}
              <span style={{
                background: "linear-gradient(90deg, #00F0FF, #38BDF8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>{last}</span>
            </>
          );
        })()}
      </span>
    </motion.div>
  );
}

// ── ProjectContent ────────────────────────────────────────────────────────
function ProjectContent({ project, index, scrollYProgress }) {
  const isLast = index === N - 1;
  const center = index * STEP;
  const start = center - STEP;
  const end = center + STEP;
  const accent = ACCENTS[index % ACCENTS.length];

  const { style: imgStyle, overlay: imgOverlay } = getImageConfig(project);
  const isCover = imgStyle === "cover";
  const isContain = imgStyle === "contain";

  const opacity = useTransform(scrollYProgress, (p) => {
    if (isLast) return transform(p, [start + FADE, center - HOLD, 1], [0, 1, 1]);
    return transform(p, [start + FADE, center - HOLD, center + HOLD, end - FADE], [0, 1, 1, 0]);
  });

  const y = useTransform(scrollYProgress, (p) => {
    if (isLast) return transform(p, [start, center - HOLD, 1], [40, 0, 0]);
    return transform(p, [start, center - HOLD, center + HOLD, end], [40, 0, 0, -40]);
  });

  // FIX: Only apply scale animation to cover images.
  // Contain images (fine-tuning illustration) should not scale — it
  // makes the illustration grow out of the dark panel awkwardly.
  const imgScale = useTransform(scrollYProgress, (p) => {
    if (!isCover) return 1;
    if (isLast) return transform(p, [start, center - HOLD, 1], [1.05, 1, 1]);
    return transform(p, [start, center - HOLD, center + HOLD, end], [1.05, 1, 1, 1.05]);
  });

  const pointerEvents = useTransform(scrollYProgress, (p) => {
    if (isLast) return p > start + FADE ? "auto" : "none";
    return p > start + FADE && p < end - FADE ? "auto" : "none";
  });

  return (
    <motion.div
      style={{
        y,
        opacity,
        pointerEvents,
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* ── LEFT TEXT ───────────────────────────────────────────────── */}
      <div style={{ width: "38%", paddingRight: "2rem" }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.62rem",
          color: accent,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          display: "block",
          marginBottom: "1.25rem",
        }}>
          {project.category}
        </span>

        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.975rem",
          color: "#9CA3AF",
          lineHeight: 1.78,
          marginBottom: "1.5rem",
          maxWidth: "400px",
        }}>
          {project.shortDesc}
        </p>

        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", marginBottom: "1.75rem" }}>
          {(project.tags || []).map((tag) => (
            <span key={tag} style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              color: "#D1D5DB",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "9999px",
              padding: "0.2rem 0.65rem",
              background: "rgba(255,255,255,0.02)",
              letterSpacing: "0.04em",
            }}>
              {tag}
            </span>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: "0.4rem",
              fontFamily: "'Inter', sans-serif", fontSize: "0.82rem",
              color: "#9CA3AF", textDecoration: "none", transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#9CA3AF")}
          >
            <Github size={15} />
            <span>View Code</span>
          </a>
          {project.live && (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", gap: "0.4rem",
                fontFamily: "'Inter', sans-serif", fontSize: "0.82rem",
                color: accent, textDecoration: "none", transition: "color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={(e) => (e.currentTarget.style.color = accent)}
            >
              <span>{project.live.includes("huggingface") ? "View Model" : "Live Demo"}</span>
              <ExternalLink size={13} />
            </a>
          )}
        </div>
      </div>

      {/* ── RIGHT IMAGE PANEL ────────────────────────────────────────── */}
      <div style={{
        position: "relative",
        width: "56%",
        height: "68%",
        borderRadius: "1.125rem",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.07)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.65)",
        // FIX: Dark panel background — critical for contain images (fine-tuning)
        // where the beige illustration sits on this surface.
        // Also prevents white flash on cover images while loading.
        background: "#0a0a0f",
      }}>
        <motion.img
          src={project.image}
          alt={project.title}
          style={{
            scale: imgScale,
            width: "100%",
            height: "100%",
            display: "block",

            // FIX: Per-project objectFit.
            // cover  → fills panel, crops edges (screenshots, illustrated dark images)
            // contain → shows full image, dark panel visible at edges (fine-tuning)
            objectFit: isCover ? "cover" : "contain",
            objectPosition: "center",

            // FIX: Per-project padding.
            // contain images need breathing room so illustration doesn't
            // touch the panel edges — looks like it's floating on the dark surface.
            padding: isContain ? "2rem" : "0",

            // FIX: Per-project opacity.
            // Full opacity ensures screenshots and banners are clear and sharp, not faded out
            opacity: 1.0,
            boxSizing: "border-box",
          }}
        />

        {/* FIX: Per-project gradient overlay.
            Replaces the hardcoded linear-gradient(135deg, ...) that was
            applied identically to all four very different images.

            cover images:  get their specific overlay from imageOverlay field
              - RAG:        left-side gradient suppresses baked-in text
              - AstraFlow:  top+bottom dark gradient for white screenshot
              - AstraStudio: minimal gradient, already dark

            contain images: get a radial vignette at edges only —
              a directional gradient would cut across the illustration. */}
        {isCover && imgOverlay !== "none" && (
          <div style={{
            position: "absolute",
            inset: 0,
            background: imgOverlay,
            pointerEvents: "none",
          }} />
        )}
        {isContain && (
          <div style={{
            position: "absolute",
            inset: 0,
            // Radial vignette: dark at panel edges, transparent in centre
            // Blends the illustration into the dark panel naturally
            background: "radial-gradient(ellipse at center, transparent 50%, rgba(10,10,15,0.65) 100%)",
            pointerEvents: "none",
          }} />
        )}

        {/* Metric badge — bottom right */}
        {project.metrics && project.metrics.length > 0 && (
          <div style={{
            position: "absolute",
            bottom: "1.25rem",
            right: "1.25rem",
            background: "rgba(0,0,0,0.72)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: "0.65rem",
            padding: "0.5rem 0.9rem",
          }}>
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.6rem",
              color: accent,
              display: "block",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}>
              {project.metrics[0].label}
            </span>
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: "1rem",
              fontWeight: 700,
              color: "#fff",
            }}>
              {project.metrics[0].value}
            </span>
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────
export default function FeaturedProjects() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      style={{
        height: `${N * 100}vh`,
        position: "relative",
        backgroundColor: "#050505",
        color: "#fff",
      }}
    >
      <div style={{
        position: "sticky",
        top: 0,
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        padding: "2.25rem 4rem 2rem",
        boxSizing: "border-box",
        maxWidth: 1400,
        margin: "0 auto",
      }}>

        {/* Section label + slot-machine titles */}
        <div style={{ flexShrink: 0 }}>
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            color: "#6B7280",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "1rem",
          }}>
            / Featured Projects
          </span>
          <div style={{
            position: "relative",
            height: "clamp(2.75rem, 5.5vw, 5.25rem)",
            overflow: "hidden",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            marginBottom: "0",
          }}>
            {FEATURED_PROJECTS.map((_, i) => (
              <SlotTitle key={i} index={i} scrollYProgress={scrollYProgress} />
            ))}
          </div>
        </div>

        {/* Project content panels */}
        <div style={{ flex: 1, position: "relative" }}>
          {FEATURED_PROJECTS.map((p, i) => (
            <ProjectContent
              key={p.id || i}
              project={p}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Progress bar */}
        <div style={{
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
          paddingBottom: "0.25rem",
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.65rem",
          color: "#6B7280",
        }}>
          <span>01</span>
          <div style={{
            width: 180, height: 1,
            background: "rgba(255,255,255,0.08)",
            position: "relative",
            overflow: "hidden",
          }}>
            <motion.div style={{
              scaleX: scrollYProgress,
              position: "absolute",
              inset: 0,
              background: "#00F0FF",
              transformOrigin: "left",
            }} />
          </div>
          <span>0{N}</span>
        </div>
      </div>
    </section>
  );
}