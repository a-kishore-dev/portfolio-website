import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Html } from "@react-three/drei";
import * as THREE from "three";

export default function SkillNode({
  node,
  hoveredLayerIndex,
  setHoveredLayerIndex,
  timeRef,
}) {
  const meshRef = useRef();
  const materialRef = useRef();
  const badgeRef = useRef();

  const handlePointerOver = (e) => {
    e.stopPropagation();
    document.body.style.cursor = "pointer";
    setHoveredLayerIndex(node.layerIndex); // Hovering any node highlights the entire layer together
  };

  const handlePointerOut = (e) => {
    e.stopPropagation();
    document.body.style.cursor = "auto";
    setHoveredLayerIndex(null);
  };

  useFrame((state) => {
    const time = timeRef.current.accumulated;
    const cycle = time % 15.0;
    const stepIdx = Math.floor(cycle / 2.5);
    const tStep = cycle % 2.5;

    const isZoomed = hoveredLayerIndex !== null
      ? hoveredLayerIndex === node.layerIndex
      : (stepIdx === node.layerIndex && tStep < 1.7);

    let targetScale = 1.0;
    let targetEmissive = 1.2;
    let targetOpacity = 1.0;
    let targetLabelOpacity = 1.0;

    if (isZoomed) {
      // When zoomed, all neurons in the active layer scale up to 1.4x and glow slightly brighter
      targetScale = 1.4;
      targetEmissive = 1.1;
      targetOpacity = 1.0;
      targetLabelOpacity = 1.0;
    } else {
      // Dim the inactive layers
      targetScale = 0.9;
      targetEmissive = 0.4;
      targetOpacity = 0.5;
      targetLabelOpacity = 0.45;
    }

    // Smooth Lerps
    if (meshRef.current) {
      const s = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, 0.12);
      meshRef.current.scale.set(s, s, s);
    }

    if (materialRef.current) {
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        targetEmissive,
        0.12
      );
      materialRef.current.opacity = THREE.MathUtils.lerp(
        materialRef.current.opacity,
        targetOpacity,
        0.12
      );
    }

    // Lerp badge/label properties dynamically
    if (badgeRef.current) {
      const currentOp = parseFloat(badgeRef.current.style.opacity || "0.45");
      badgeRef.current.style.opacity = THREE.MathUtils.lerp(currentOp, targetLabelOpacity, 0.12).toFixed(3);

      const badgeScale = isZoomed ? 1.4 : 1.0;
      badgeRef.current.style.transform = `scale(${badgeScale})`;
      badgeRef.current.style.borderColor = isZoomed ? `${node.color}40` : "rgba(255, 255, 255, 0.1)";
      badgeRef.current.style.boxShadow = isZoomed
        ? `0 4px 12px rgba(0,0,0,0.5), 0 0 12px ${node.color}20`
        : "none";
    }
  });

  return (
    // Node position is local to the parent LayerGroup container, so X = 0
    <group position={[0, node.y || 0, node.z || 0]}>
      {/* Neuron Sphere (Radius 0.65 - Large) */}
      <Sphere
        ref={meshRef}
        args={[0.65, 32, 32]}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <meshStandardMaterial
          ref={materialRef}
          color={node.color}
          emissive={node.color}
          emissiveIntensity={1.2}
          roughness={0.95}
          metalness={0.02}
          transparent={true}
          opacity={1.0}
        />
      </Sphere>

      {/* Permanent Glass Badge Label (Always Visible, Default text size 22px font-bold, with 1.4x zoom) */}
      <Html
        distanceFactor={8.5}
        position={[1.1, 0, 0]} // Shifted right to prevent overlaps with larger spheres
        center={false}
        style={{ pointerEvents: "none" }}
      >
        <div
          ref={badgeRef}
          className="select-none bg-[#0a0a10]/85 backdrop-blur-md text-white/95 text-[30px] font-bold px-4 py-2 rounded-md border border-white/10 whitespace-nowrap transition-all duration-400 shadow-lg shadow-black/50"
          style={{
            opacity: 0.45,
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "none",
            transform: "scale(1.0)",
          }}
        >
          {node.name}
        </div>
      </Html>
    </group>
  );
}