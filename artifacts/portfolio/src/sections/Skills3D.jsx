import { useState, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";
import SkillNode from "../components/SkillNode";
import SkillEdge from "../components/SkillEdge";
import { skillsContent } from "../data/skillsContent.js";

const LAYERS_DATA = skillsContent.layers;

// --- CAMERACONTROLLER FOR STATIC LOCKED PERSPECTIVE (PREVENTS SKEW) ---
function CameraController() {
  useFrame((state) => {
    state.camera.position.set(0, 0, 20.0); // Statically positioned at 20.0 to fit expanded bounds
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

// --- TIMELINE CONTROLLER FOR CINEMATIC FORWARD PASS ---
function TimelineController({ hoveredLayerIndex, timeRef }) {
  useFrame((state, delta) => {
    if (hoveredLayerIndex === null) {
      timeRef.current.accumulated += delta;
    }
  });
  return null;
}

// --- LAYER CONTAINER GROUP WITH HOVER SCALE INTERPOLATION ---
function LayerGroup({
  layerIdx,
  hoveredLayerIndex,
  layer,
  timeRef,
  headerY,
  children,
}) {
  const groupRef = useRef();
  const headerRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const time = timeRef.current.accumulated;

    // 15-second forward pass step calculation
    const cycle = time % 15.0;
    const stepIdx = Math.floor(cycle / 2.5); // Current active step (0 to 5)
    const tStep = cycle % 2.5;

    let targetScale = 1.0;

    const isZoomed = hoveredLayerIndex !== null
      ? hoveredLayerIndex === layerIdx
      : (stepIdx === layerIdx && tStep < 1.7);

    if (isZoomed) {
      targetScale = 1.4;
    } else {
      targetScale = 0.9;
    }

    // Smooth Lerp scale
    const s = THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.12);
    groupRef.current.scale.set(s, s, s);

    // Update header opacity and scale dynamically
    if (headerRef.current) {
      const currentOpacity = parseFloat(headerRef.current.style.opacity || "0.4");
      const targetOpacity = isZoomed ? 1.0 : 0.4;
      headerRef.current.style.opacity = THREE.MathUtils.lerp(currentOpacity, targetOpacity, 0.12).toFixed(3);
      headerRef.current.style.transform = `scale(${isZoomed ? 1.25 : 1.0})`;
    }
  });

  return (
    <group ref={groupRef} position={[layer.x, 0, 0]}>
      {/* Layer Header Title (Enlarged and bold, positioned relative to top neuron) */}
      <Html
        position={[0, headerY, 0]}
        center
        distanceFactor={8.5}
        style={{ pointerEvents: "none" }}
      >
        <div
          ref={headerRef}
          className="font-mono text-[30px] font-black uppercase tracking-[0.15em] leading-[1.1] select-none px-5 py-3 rounded bg-[#070B14]/85 border border-slate-800/40 text-center shadow-lg transition-all duration-300 flex flex-col items-center justify-center min-w-[200px]"
          style={{
            color: layer.color,
            textShadow: `0 0 10px ${layer.color}60`,
            opacity: 0.4,
            transform: "scale(1.0)",
          }}
        >
          {layer.title.map((line, i) => (
            <span key={i} className="block whitespace-nowrap">{line}</span>
          ))}
        </div>
      </Html>

      {/* Layer children: Nodes (Neurons) */}
      {children}
    </group>
  );
}

export default function Skills3D() {
  const [hoveredLayerIndex, setHoveredLayerIndex] = useState(null);
  const timeRef = useRef({ accumulated: 0 });

  // Pre-calculate Neural Network coordinates & connections (dense)
  const { nodes, links, layers } = useMemo(() => {
    const flatNodes = [];
    const generatedLinks = [];

    LAYERS_DATA.forEach((layer, layerIdx) => {
      const totalNodes = layer.nodes.length;
      layer.nodes.forEach((node, nodeIdx) => {
        // Consistent vertical gap of 2.8 units between neurons
        const gap = 2.8;
        const y = (nodeIdx - (totalNodes - 1) / 2) * gap;
        flatNodes.push({
          ...node,
          x: layer.x,
          y: y,
          z: 0,
          layerIndex: layerIdx,
          color: layer.color,
        });
      });
    });

    // Generate fully connected (dense) links between layer N and layer N+1
    for (let l = 0; l < LAYERS_DATA.length - 1; l++) {
      const sourceNodes = flatNodes.filter((n) => n.layerIndex === l);
      const targetNodes = flatNodes.filter((n) => n.layerIndex === l + 1);

      sourceNodes.forEach((source) => {
        targetNodes.forEach((target) => {
          generatedLinks.push({
            id: `${source.id}-${target.id}`,
            source,
            target,
          });
        });
      });
    }

    return { nodes: flatNodes, links: generatedLinks, layers: LAYERS_DATA };
  }, []);

  return (
    <section
      id="skills"
      style={{
        position: "relative",
        padding: "6rem 0",
        backgroundColor: "#070B14",
        color: "#F0F4FF",
        overflow: "hidden",
        width: "100%", // Full width of the page
      }}
    >
      {/* Deep Space Background Glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1100px] h-[1100px] bg-[#3B7EF8]/3 blur-[140px] rounded-full pointer-events-none"
      />

      {/* Full-width container */}
      <div className="w-full max-w-none px-0 relative z-10 flex flex-col items-center">

        {/* HTML Overlay ABOVE Canvas */}
        <div className="text-center mb-8 select-none">
          <span style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: skillsContent.labelSize || "0.72rem",
            color: "#6B7280",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "1rem",
          }}>
            {skillsContent.label}
          </span>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: skillsContent.titleSize || "clamp(2.4rem, 4.5vw, 3.75rem)",
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            margin: 0,
          }}>
            <span style={{ color: "#F0F4FF" }}>{skillsContent.titlePrefix}</span>
            <span style={{
              background: "linear-gradient(90deg, #00F0FF, #38BDF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              {skillsContent.titleHighlight}
            </span>
          </h2>
        </div>

        {/* 3D Canvas Container - Edge-to-Edge full width, 760px height (Enlarged) */}
        <div
          className="relative w-full h-[850px] border-y border-slate-800/40 bg-slate-950/10 backdrop-blur-md overflow-hidden"
        >
          {/* Subtle grid background mask */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:3rem_3rem]" />

          <Canvas
            camera={{ position: [0, 0, 22.0], fov: 70 }}
            gl={{ antialias: true, alpha: true }}
          >
            <ambientLight intensity={0.65} />
            <directionalLight position={[5, 5, 5]} intensity={1.5} />
            <pointLight position={[-5, -5, -5]} intensity={0.5} />

            {/* Locked Cinematic camera looking straight */}
            <CameraController />

            {/* Timeline controller to accumulate elapsed time */}
            <TimelineController hoveredLayerIndex={hoveredLayerIndex} timeRef={timeRef} />

            {/* Static network group */}
            <group>
              {/* Synapses (Lines) sit behind layers (z = 0) */}
              {links.map((link) => (
                <SkillEdge
                  key={link.id}
                  link={link}
                  hoveredLayerIndex={hoveredLayerIndex}
                  timeRef={timeRef}
                />
              ))}

              {/* Neurons (Spheres) Grouped inside LayerGroups */}
              {layers.map((layer, layerIdx) => {
                const topNeuronY = ((layer.nodes.length - 1) / 2) * 2.8;
                const headerY = topNeuronY + 2.5;
                return (
                  <LayerGroup
                    key={`layer-group-${layerIdx}`}
                    layerIdx={layerIdx}
                    hoveredLayerIndex={hoveredLayerIndex}
                    layer={layer}
                    timeRef={timeRef}
                    headerY={headerY}
                  >
                    {/* Render Nodes within this layer */}
                    {nodes
                      .filter((node) => node.layerIndex === layerIdx)
                      .map((node) => (
                        <SkillNode
                          key={node.id}
                          node={node}
                          hoveredLayerIndex={hoveredLayerIndex}
                          setHoveredLayerIndex={setHoveredLayerIndex}
                          timeRef={timeRef}
                        />
                      ))}
                  </LayerGroup>
                );
              })}
            </group>

            <EffectComposer>
              <Bloom luminanceThreshold={0.12} mipmapBlur intensity={1.5} />
            </EffectComposer>
          </Canvas>
        </div>

      </div>
    </section>
  );
}