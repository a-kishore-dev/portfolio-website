import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "../data/projects";

// SVG GitHub Icon
function GithubIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
      />
    </svg>
  );
}

// SVG External/Live Link Icon
function ExternalLinkIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
    </svg>
  );
}

// SVG Close Icon
function CloseIcon() {
  return (
    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}

// Responsive SVG Pipeline Diagram Component
function PipelineDiagram({ steps, color = "#3B7EF8" }) {
  if (!steps || steps.length === 0) return null;

  return (
    <div className="w-full bg-[#0a0f1d] border border-white/5 rounded-xl p-4 mt-6">
      <h4 className="text-[10px] font-mono tracking-wider text-slate-500 uppercase mb-3">
        Pipeline Execution Flow
      </h4>
      <div className="relative w-full overflow-x-auto scrollbar-hide py-1">
        <svg
          viewBox="0 0 800 100"
          className="w-full min-w-[640px] h-[90px]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {steps.map((step, idx) => {
            const x = 100 + idx * 200;
            const y = 50;

            // Split step text into words to wrap nicely if needed
            const words = step.split(" ");
            const hasMultipleWords = words.length > 1;

            return (
              <g key={idx}>
                {/* Node Box */}
                <rect
                  x={x - 85}
                  y={12}
                  width={170}
                  height={56}
                  rx={8}
                  fill="rgba(13, 18, 32, 0.8)"
                  stroke={color}
                  strokeWidth="1.5"
                  className="shadow-md"
                />
                
                {/* Step Text inside Node */}
                {hasMultipleWords ? (
                  <>
                    <text
                      x={x}
                      y={36}
                      textAnchor="middle"
                      fill="#e2e8f0"
                      fontSize="10"
                      className="font-mono font-bold uppercase tracking-wider"
                    >
                      {words.slice(0, 2).join(" ")}
                    </text>
                    <text
                      x={x}
                      y={52}
                      textAnchor="middle"
                      fill="#94a3b8"
                      fontSize="9"
                      className="font-mono uppercase tracking-wider"
                    >
                      {words.slice(2).join(" ")}
                    </text>
                  </>
                ) : (
                  <text
                    x={x}
                    y={44}
                    textAnchor="middle"
                    fill="#e2e8f0"
                    fontSize="10.5"
                    className="font-mono font-bold uppercase tracking-wider"
                  >
                    {step}
                  </text>
                )}

                {/* Connection lines between nodes */}
                {idx < steps.length - 1 && (
                  <g>
                    <line
                      x1={x + 85}
                      y1={40}
                      x2={x + 115}
                      y2={40}
                      stroke="rgba(255,255,255,0.15)"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                    <polygon
                      points={`${x + 115},36 ${x + 120},40 ${x + 115},44`}
                      fill={color}
                    />
                  </g>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// Categories list for filter pills
const CATEGORIES = ["All", "GenAI", "ML", "CV", "Agents"];

export default function ProjectsCatalog() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const location = useLocation();

  useEffect(() => {
    if (location.state?.openProjectId) {
      const proj = projects.find((p) => p.id === location.state.openProjectId);
      if (proj) {
        setSelectedProject(proj);
      }
    }
  }, [location.state]);

  // Filter project entries dynamically
  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "All") return true;
    return p.category.toLowerCase().includes(activeFilter.toLowerCase());
  });

  const getThemeColor = (category) => {
    const cat = category.toLowerCase();
    if (cat.includes("genai")) return "#a855f7"; // Purple
    if (cat.includes("ml")) return "#00e5c8";    // Teal
    if (cat.includes("cv")) return "#3b82f6";    // Blue
    if (cat.includes("agent")) return "#22c55e"; // Green
    return "#ea580c";                            // Gold/Orange
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-[#070B14] text-[#F0F4FF] pt-28 pb-16 px-4 md:px-8 relative overflow-hidden"
    >
      {/* Background space glow */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#3B7EF8]/2 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* Header section with back navigation */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-slate-500 hover:text-cyan-400 transition-colors duration-200 font-mono text-sm group mb-6"
          >
            <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">
              ←
            </span>
            Back to Home
          </Link>

          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.72rem",
            color: "#6B7280",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "1rem",
          }}>
            / Portfolio
          </span>
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.4rem, 4.5vw, 3.75rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            margin: 0,
          }} className="mb-3">
            <span style={{ color: "#F0F4FF" }}>All </span>
            <span style={{
              background: "linear-gradient(90deg, #00F0FF, #38BDF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Projects
            </span>
          </h1>
          <p className="font-mono text-xs text-slate-500 tracking-wider">
            {filteredProjects.length} PROJECTS DISPLAYED / Real-time Portfolio Catalog
          </p>
        </div>

        {/* Filter Pills Bar */}
        <div className="flex gap-2 flex-wrap mb-12 border-b border-white/5 pb-6">
          {CATEGORIES.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`font-mono text-xs px-5 py-2.5 rounded-full transition-all duration-300 border uppercase tracking-wider ${
                  isActive
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-black border-transparent font-bold shadow-lg shadow-cyan-500/10"
                    : "bg-white/5 text-slate-400 border-white/10 hover:border-white/20 hover:text-white"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Catalogue Grid Layout (3 desktop, 2 tablet, 1 mobile) */}
        {filteredProjects.length === 0 ? (
          <div className="w-full text-center py-16 border border-white/5 rounded-2xl bg-white/[0.02]">
            <p className="text-slate-500 font-mono text-sm uppercase">
              No projects found in this category.
            </p>
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
                const themeColor = getThemeColor(project.category);
                return (
                  <motion.div
                    layout
                    key={project.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35 }}
                    className="p-7 rounded-2xl border border-white/10 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-md hover:border-cyan-500/35 hover:shadow-lg hover:shadow-cyan-500/5 group"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(13, 18, 32, 0.85) 0%, rgba(13, 18, 32, 0.3) 100%)",
                    }}
                    onClick={() => setSelectedProject(project)}
                  >
                    <div>
                      <div className="flex justify-between items-center mb-4">
                        <span
                          className="font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded border border-current"
                          style={{ color: themeColor }}
                        >
                          {project.category}
                        </span>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-500 hover:text-white transition-colors"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <GithubIcon />
                          </a>
                        )}
                      </div>

                      <h3 className="font-display font-bold text-xl text-slate-100 group-hover:text-white mb-2 leading-snug">
                        {project.title}
                      </h3>
                      
                      <p className="font-sans text-xs text-slate-400 leading-relaxed mb-6">
                        {project.shortDesc || project.desc}
                      </p>
                    </div>

                    <div className="flex gap-1.5 flex-wrap">
                      {(project.tech || []).slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="text-[9px] font-mono text-slate-500 bg-white/5 rounded-md px-2 py-0.5"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* POPUP DETAIL MODAL DIALOG */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            
            {/* Dark blur backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
              onClick={() => setSelectedProject(null)}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: "spring", stiffness: 220, damping: 22 }}
              className="relative w-full max-w-3xl bg-[#0d1220] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Close Button X (Top-Right) */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 z-30"
              >
                <CloseIcon />
              </button>

              {/* Scrollable Modal Content */}
              <div className="p-6 md:p-8 overflow-y-auto scrollbar-thin scrollbar-track-transparent">
                
                {/* Category & Title */}
                <div className="mb-4">
                  <span
                    className="font-mono text-[10px] tracking-widest uppercase font-bold px-2 py-0.5 rounded border border-current"
                    style={{ color: getThemeColor(selectedProject.category) }}
                  >
                    {selectedProject.category}
                  </span>
                  <h2 className="font-display font-black text-2xl md:text-3xl text-white mt-3 tracking-tight leading-snug">
                    {selectedProject.title}
                  </h2>
                </div>

                {/* Long Detailed Description */}
                <p className="font-sans text-xs md:text-sm text-slate-300 leading-relaxed mb-6">
                  {selectedProject.fullDesc || selectedProject.desc}
                </p>

                {/* Tech Badges */}
                <div className="mb-8">
                  <h4 className="text-[10px] font-mono tracking-wider text-slate-500 uppercase mb-3">
                    Technologies Utilized
                  </h4>
                  <div className="flex gap-2 flex-wrap">
                    {(selectedProject.tech || []).map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono text-slate-300 bg-white/5 rounded-md px-3 py-1 border border-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 2x2 Metrics Grid (Same glass design as featured section) */}
                {selectedProject.metrics && selectedProject.metrics.length > 0 && (
                  <div className="mb-8">
                    <h4 className="text-[10px] font-mono tracking-wider text-slate-500 uppercase mb-3">
                      Performance Metrics
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {selectedProject.metrics.map((metric, idx) => (
                        <div
                          key={idx}
                          className="bg-white/[0.02] border border-white/5 rounded-xl p-4 text-center shadow-inner"
                        >
                          <span className="block text-[10px] font-mono text-slate-500 uppercase tracking-wide mb-1">
                            {metric.label}
                          </span>
                          <span
                            className="block font-display font-bold text-lg md:text-xl"
                            style={{ color: getThemeColor(selectedProject.category) }}
                          >
                            {metric.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Dynamic SVG Pipeline Diagram */}
                {selectedProject.pipeline && (
                  <PipelineDiagram
                    steps={selectedProject.pipeline}
                    color={getThemeColor(selectedProject.category)}
                  />
                )}

                {/* Action CTA Buttons (GitHub + Live Links) */}
                <div className="flex gap-4 mt-8 border-t border-white/5 pt-6">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex justify-center items-center gap-2 font-mono text-xs font-bold bg-white/5 border border-white/10 hover:bg-white/10 text-white rounded-xl py-3.5 transition-all duration-300 shadow-md"
                    >
                      <GithubIcon />
                      View Source code
                    </a>
                  )}
                  {selectedProject.live && (
                    <a
                      href={selectedProject.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex justify-center items-center gap-2 font-mono text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-500 text-black rounded-xl py-3.5 hover:shadow-lg hover:shadow-cyan-500/10 transition-all duration-300"
                    >
                      <ExternalLinkIcon />
                      Launch Live Demo
                    </a>
                  )}
                </div>

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
