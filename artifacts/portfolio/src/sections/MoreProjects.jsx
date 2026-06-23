import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MORE_PROJECTS, FEATURED_PROJECTS } from "../data/projects";

// SVG GitHub Icon Component
function GithubIcon() {
  return (
    <svg
      className="w-5 h-5 transition-colors duration-200"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0012 2z"
      />
    </svg>
  );
}

// Configured coordinates for floating cards (Clearing the 30% - 68% center horizontal zone)
const CARD_CONFIGS = [
  // Left Column
  { top: "12%", left: "6%", rotate: -6, width: "280px" },
  { top: "42%", left: "8%", rotate: 4, width: "290px" },
  { top: "72%", left: "5%", rotate: -8, width: "270px" },
  // Right Column
  { top: "10%", left: "72%", rotate: 5, width: "270px" },
  { top: "40%", left: "68%", rotate: -4, width: "280px" },
  { top: "70%", left: "70%", rotate: 8, width: "260px" },
  // Center Top (placed above heading)
  { top: "5%", left: "39%", rotate: -2, width: "280px" },
  // Center Bottom (placed below heading)
  { top: "73%", left: "40%", rotate: 3, width: "280px" },
];

// Color mapping for custom hover highlights based on category
const CATEGORY_THEMES = {
  GenAI: {
    text: "text-purple-400",
    border: "group-hover:border-purple-500/40",
    shadow: "group-hover:shadow-purple-500/5",
  },
  ML: {
    text: "text-emerald-400",
    border: "group-hover:border-emerald-500/40",
    shadow: "group-hover:shadow-emerald-500/5",
  },
  CV: {
    text: "text-blue-400",
    border: "group-hover:border-blue-500/40",
    shadow: "group-hover:shadow-blue-500/5",
  },
  Agents: {
    text: "text-green-400",
    border: "group-hover:border-green-500/40",
    shadow: "group-hover:shadow-green-500/5",
  },
};

function FloatingCard({ project, config, index }) {
  const cardRef = useRef(null);
  const navigate = useNavigate();
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });

  const theme = CATEGORY_THEMES[project.category] || {
    text: "text-blue-400",
    border: "group-hover:border-blue-500/40",
    shadow: "group-hover:shadow-blue-500/5",
  };

  // Magnetic hover offset calculations
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cardCenterX = rect.left + rect.width / 2;
    const cardCenterY = rect.top + rect.height / 2;
    const deltaX = e.clientX - cardCenterX;
    const deltaY = e.clientY - cardCenterY;

    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    if (distance === 0) return;

    // Translate up to 15px towards mouse position
    const maxPull = 15;
    const pullX = (deltaX / distance) * Math.min(maxPull, distance * 0.25);
    const pullY = (deltaY / distance) * Math.min(maxPull, distance * 0.25);

    setMagneticPos({ x: pullX, y: pullY });
  };

  const handleMouseLeave = () => {
    setMagneticPos({ x: 0, y: 0 });
  };

  const handleCardClick = () => {
    navigate("/projects", { state: { openProjectId: project.id } });
  };

  // Staggered entry transition
  const entranceVariants = {
    hidden: {
      y: 180,
      opacity: 0,
      scale: 0.85,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 60,
        damping: 14,
        delay: index * 0.12,
      },
    },
  };

  return (
    <motion.div
      variants={entranceVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      style={{
        position: "absolute",
        top: config.top,
        left: config.left,
        width: config.width,
        rotate: config.rotate,
        zIndex: 10,
      }}
    >
      {/* 2. Middle Layer: Continuous infinite hardware-accelerated ambient drift */}
      <motion.div
        animate={{
          y: [0, -14, 12, 0],
          x: [0, 8, -8, 0],
          rotate: [0, 1.8, -1.8, 0],
        }}
        transition={{
          duration: 10 + index * 2,
          ease: "easeInOut",
          repeat: Infinity,
          delay: index * 0.4,
        }}
      >
        {/* 3. Inner Layer: spring-based magnetic hover translation */}
        <motion.div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onClick={handleCardClick}
          animate={{
            x: magneticPos.x,
            y: magneticPos.y,
          }}
          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
          }}
          className="cursor-pointer"
        >
          <div
            className={`p-6 rounded-2xl border border-white/10 backdrop-blur-sm transition-all duration-300 shadow-lg shadow-black/40 hover:shadow-xl group ${theme.border} ${theme.shadow}`}
            style={{
              background: "linear-gradient(135deg, rgba(13, 18, 32, 0.95) 0%, rgba(13, 18, 32, 0.45) 100%)",
            }}
          >
            <div className="flex justify-between items-start mb-3">
              <span className={`font-mono text-[10px] tracking-wider uppercase font-bold ${theme.text}`}>
                {project.category}
              </span>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-500 hover:text-white transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                <GithubIcon />
              </a>
            </div>

            <h3 className="font-display font-bold text-lg text-slate-100 mb-1.5 leading-snug group-hover:text-white transition-colors duration-200">
              {project.title}
            </h3>
            
            <p className="font-sans text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
              {project.shortDesc || project.desc}
            </p>

            <div className="flex gap-1.5 flex-wrap">
              {project.tech.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="text-[9px] font-mono text-slate-500 bg-white/5 rounded-md px-2 py-0.5"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Simplified Mobile Card (no drift coordinates to prevent finger touch glitches)
function MobileCard({ project, index }) {
  const navigate = useNavigate();
  const theme = CATEGORY_THEMES[project.category] || {
    text: "text-blue-400",
    border: "hover:border-blue-500/30",
  };

  const handleCardClick = () => {
    navigate("/projects", { state: { openProjectId: project.id } });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileTap={{ scale: 0.96 }}
      onClick={handleCardClick}
      className="snap-center flex-shrink-0 w-[290px] cursor-pointer"
    >
      <div
        className={`p-6 rounded-2xl border border-white/10 backdrop-blur-sm shadow-lg shadow-black/40 ${theme.border}`}
        style={{
          background: "linear-gradient(135deg, rgba(13, 18, 32, 0.95) 0%, rgba(13, 18, 32, 0.45) 100%)",
        }}
      >
        <div className="flex justify-between items-start mb-3">
          <span className={`font-mono text-[10px] tracking-wider uppercase font-bold ${theme.text}`}>
            {project.category}
          </span>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-500 hover:text-white transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <GithubIcon />
          </a>
        </div>

        <h3 className="font-display font-bold text-lg text-slate-100 mb-1.5 leading-snug">
          {project.title}
        </h3>
        
        <p className="font-sans text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
          {project.shortDesc || project.desc}
        </p>

        <div className="flex gap-1.5 flex-wrap">
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              className="text-[9px] font-mono text-slate-500 bg-white/5 rounded-md px-2 py-0.5"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function MoreProjects() {
  const rawList = [...MORE_PROJECTS];
  if (rawList.length < 8) {
    const needed = 8 - rawList.length;
    let added = 0;
    for (const proj of FEATURED_PROJECTS) {
      if (added >= needed) break;
      if (!rawList.some((p) => p.id === proj.id)) {
        rawList.push(proj);
        added++;
      }
    }
  }
  const projectsList = rawList.slice(0, 8);

  return (
    <>
      {/* DESKTOP FLOATING LAYOUT (md and up) */}
      <section
        id="other-projects"
        className="relative w-full h-[100vh] bg-[#070B14] overflow-hidden hidden md:block select-none"
      >
        {/* Absolute centered big header backdrop (Placed above cards at z-30 with drop shadow) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center text-center px-4 pointer-events-none w-full max-w-5xl">
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.05em",
          }} className="text-6xl md:text-8xl lg:text-[110px] uppercase leading-none select-none pointer-events-none filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.85)]">
            <span style={{ color: "#F0F4FF" }}>More </span>
            <span style={{
              background: "linear-gradient(90deg, #00F0FF, #38BDF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Projects
            </span>
          </h2>
          
          {/* Link below the title styled in premium italic serif (Explicit pointer-events-auto) */}
          <Link
            to="/projects"
            className="mt-8 font-mono uppercase text-xs md:text-sm text-slate-400 hover:text-cyan-400 transition-colors duration-300 tracking-widest flex items-center gap-1.5 group pointer-events-auto filter drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)]"
          >
            see all projects
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1.5 font-sans">
              →
            </span>
          </Link>
        </div>

        {/* Render the floating cards */}
        {projectsList.map((project, idx) => {
          const config = CARD_CONFIGS[idx % CARD_CONFIGS.length];
          return (
            <FloatingCard
              key={project.id}
              project={project}
              config={config}
              index={idx}
            />
          );
        })}
      </section>

      {/* MOBILE LAYOUT (swipe horizontal list) */}
      <section
        id="other-projects-mobile"
        className="relative w-full py-16 bg-[#070B14] flex flex-col justify-center items-center overflow-hidden md:hidden"
      >
        <div className="flex flex-col items-center text-center px-6 w-full mb-8">
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 900,
            letterSpacing: "-0.05em",
          }} className="text-4xl uppercase leading-none">
            <span style={{ color: "#F0F4FF" }}>More </span>
            <span style={{
              background: "linear-gradient(90deg, #00F0FF, #38BDF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Projects
            </span>
          </h2>
          <Link
            to="/projects"
            className="mt-4 font-mono uppercase text-xs text-slate-400 hover:text-cyan-400 transition-colors duration-200 flex items-center gap-1.5"
          >
            see all projects <span className="font-sans">→</span>
          </Link>
        </div>

        {/* Touch Scroll Container */}
        <div className="flex overflow-x-auto gap-5 px-6 py-4 w-full scrollbar-none snap-x snap-mandatory">
          {projectsList.map((project, idx) => (
            <MobileCard
              key={project.id}
              project={project}
              index={idx}
            />
          ))}
        </div>
      </section>
    </>
  );
}
