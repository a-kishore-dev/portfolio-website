import { motion, useScroll, useSpring } from "framer-motion";

export default function ScrollProgress() {
  // 1. Get exact scroll progress from Framer Motion
  const { scrollYProgress } = useScroll();

  // 2. Add a spring physics effect for a smoother "lag" trail
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2px",
        zIndex: 9999,
        backgroundColor: "#00E5C8",
        transformOrigin: "left",
        scaleX,
      }}
    />
  );
}
