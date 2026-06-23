import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar.jsx";
import ScrollProgress from "./components/ScrollProgress.jsx";
import Hero from "./sections/Hero.jsx";
import About from "./sections/About.jsx";
import FeaturedProjects from "./sections/FeaturedProjects.jsx";
import Terminal from "./sections/Terminal.jsx";
import Contact from "./sections/Contact.jsx";
import Skills3D from "./sections/Skills3D.jsx";
import Experience from "./sections/Experience.jsx";
import MoreProjects from "./sections/MoreProjects.jsx";
import ProjectsCatalog from "./pages/ProjectsCatalog.jsx";
import {
  fadeUpVariants,
  staggerContainerVariants,
  staggerItemVariants,
  useScrollReveal,
} from "./hooks/useScrollAnimation.js";

const pageVariants: any = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.25, ease: "easeIn" },
  },
};

function SectionReveal({ children, style = {}, id }: any) {
  const { ref, isInView } = useScrollReveal();
  return (
    <motion.div
      id={id}
      ref={ref}
      variants={fadeUpVariants as any}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function StaggerList({ children, style = {} }: any) {
  const { ref, isInView } = useScrollReveal();
  return (
    <motion.div
      ref={ref}
      variants={staggerContainerVariants as any}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      style={style}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, style = {} }: any) {
  return (
    <motion.div variants={staggerItemVariants as any} style={style}>
      {children}
    </motion.div>
  );
}

function Home() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state?.scrollToSection) {
      const id = location.state.scrollToSection;
      navigate(location.pathname, { replace: true, state: {} });
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    }
  }, [location, navigate]);

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ backgroundColor: "#070B14", color: "#F0F4FF", minHeight: "100vh", position: "relative" }}
    >
      {/* Hero */}
      <SectionReveal id="hero">
        <Hero />
      </SectionReveal>

      {/* About */}
      <SectionReveal id="about">
        <About />
      </SectionReveal>

      {/* Featured Projects — Sticky Scroll Reveal */}
      <SectionReveal id="projects">
        <FeaturedProjects />
      </SectionReveal>

      {/* Skills 3D Node Graph */}
      <SectionReveal id="skills">
        <Skills3D />
      </SectionReveal>

      {/* Experience Section */}
      <SectionReveal id="experience">
        <Experience />
      </SectionReveal>

      {/* More Projects */}
      <SectionReveal id="more-projects">
        <MoreProjects />
      </SectionReveal>

      {/* Terminal */}
      <SectionReveal id="terminal">
        <Terminal />
      </SectionReveal>

      {/* Contact & Footer */}
      <SectionReveal id="contact">
        <Contact />
      </SectionReveal>
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<ProjectsCatalog />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const base = import.meta.env.BASE_URL?.replace(/\/$/, "") || "";
  const [showAiTag, setShowAiTag] = useState(true);

  return (
    <BrowserRouter basename={base}>
      <ScrollProgress />
      <Navbar />
      <AnimatedRoutes />

      {/* Built with AI Tag Capsule */}
      <AnimatePresence>
        {showAiTag && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed bottom-6 right-6 z-[9999] flex items-center gap-2.5 bg-[#0D1220]/90 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
          >
            {/* Pulsing indicator */}
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E5C8] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E5C8]"></span>
            </span>
            {/* Text */}
            <span className="font-mono text-xs font-semibold text-slate-300 tracking-wide select-none">
              Built with AI
            </span>
            {/* Close button */}
            <button
              onClick={() => setShowAiTag(false)}
              className="text-slate-500 hover:text-white transition-colors duration-150 p-0.5 rounded-full hover:bg-white/5 cursor-pointer flex items-center justify-center"
              aria-label="Close"
            >
              <svg
                className="w-3 h-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </BrowserRouter>
  );
}

export default App;
