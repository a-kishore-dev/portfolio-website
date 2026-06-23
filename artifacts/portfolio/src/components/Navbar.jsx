import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Resume", href: "#experience" },
  { label: "Terminal", href: "#terminal" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState("");
  const [showNavbar, setShowNavbar] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Only track scroll highlights if on home page
      if (location.pathname !== "/") {
        setActiveSection("");
        return;
      }
      const sections = NAV_LINKS.map((l) => l.href.replace("#", ""));
      let current = "";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 160) {
            current = id;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    let lastMouseY = 0;

    const updateNavbarVisibility = () => {
      // Always visible inside the Hero section (first 100vh minus offset) on home page.
      // For other pages, it should default to hiding (auto-hide).
      const isHome = location.pathname === "/";
      const isPastHero = isHome ? (window.scrollY >= window.innerHeight - 100) : true;

      if (isHome && !isPastHero) {
        setShowNavbar(true);
      } else {
        // Show only when hovered OR mouse cursor is near top of viewport (clientY <= 80)
        if (isHovered || lastMouseY <= 80) {
          setShowNavbar(true);
        } else {
          setShowNavbar(false);
        }
      }
    };

    const handleMouseMove = (e) => {
      lastMouseY = e.clientY;
      updateNavbarVisibility();
    };

    const handleScroll = () => {
      updateNavbarVisibility();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);
    updateNavbarVisibility();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered, location.pathname]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const id = href.replace("#", "");
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollToSection: id } });
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{
        y: showNavbar ? 0 : -100,
        opacity: showNavbar ? 1 : 0,
      }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-[9999] flex items-center gap-6 bg-[#0D1220]/80 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 shadow-[0_8px_32px_rgba(0,0,0,0.4)] whitespace-nowrap"
    >
      {/* Logo */}
      <a
        href="/"
        onClick={(e) => {
          if (location.pathname === "/") {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            e.preventDefault();
            navigate("/");
          }
        }}
        className="flex items-center gap-2.5 no-underline mr-2 select-none"
      >
        <img
          src="/logo.png"
          alt="Logo"
          className="h-6 w-auto object-contain"
        />
        <span className="font-display font-bold text-base bg-gradient-to-r from-[#00E5C8] to-[#3B7EF8] bg-clip-text text-transparent">
          Kishore A
        </span>
      </a>

      {/* Nav Links */}
      <div className="flex items-center gap-5">
        {NAV_LINKS.map(({ label, href }) => {
          const id = href.replace("#", "");
          const isActive = activeSection === id;
          return (
            <a
              key={label}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className={`font-sans text-sm font-medium transition-colors duration-200 no-underline hover:text-[#00E5C8] ${
                isActive ? "text-[#00E5C8]" : "text-[#6B7A99]"
              }`}
            >
              {label}
            </a>
          );
        })}
      </div>

      {/* Hire Me Button */}
      <a
        href="#contact"
        onClick={(e) => handleNavClick(e, "#contact")}
        className="ml-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#00E5C8] to-[#3B7EF8] text-black font-display font-bold text-sm no-underline hover:opacity-90 active:scale-95 transition-all duration-200"
      >
        Hire Me
      </a>
    </motion.nav>
  );
}
