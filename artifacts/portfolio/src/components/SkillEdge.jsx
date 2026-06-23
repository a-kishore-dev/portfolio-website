import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

export default function SkillEdge({ link, hoveredLayerIndex, timeRef }) {
  const source = link.source;
  const target = link.target;
  const baseLineRef = useRef();
  const pulseRef = useRef();

  // Keep track of source and target scales to match layer group transformations
  const sourceScaleRef = useRef(0.9);
  const targetScaleRef = useRef(0.9);

  // Render check
  if (!source || !target || source.x === undefined || target.x === undefined) {
    return null;
  }

  // Initial fallback static points
  const startPoint = [source.x + 0.65 * 0.9, source.y * 0.9, 0];
  const endPoint = [target.x - 0.65 * 0.9, target.y * 0.9, 0];

  useFrame((state) => {
    if (
      !baseLineRef.current ||
      !baseLineRef.current.material ||
      !pulseRef.current ||
      !pulseRef.current.material
    ) {
      return;
    }

    const time = timeRef.current.accumulated;
    const cycle = time % 15.0;
    const stepIdx = Math.floor(cycle / 2.5);
    const tStep = cycle % 2.5;

    // Calculate active target scales
    const isSourceZoomed = hoveredLayerIndex !== null
      ? hoveredLayerIndex === source.layerIndex
      : (stepIdx === source.layerIndex && tStep < 1.7);
    const targetSourceScale = isSourceZoomed ? 1.4 : 0.9;

    const isTargetZoomed = hoveredLayerIndex !== null
      ? hoveredLayerIndex === target.layerIndex
      : (stepIdx === target.layerIndex && tStep < 1.7);
    const targetTargetScale = isTargetZoomed ? 1.4 : 0.9;

    // Lerp the scales smoothly
    sourceScaleRef.current = THREE.MathUtils.lerp(sourceScaleRef.current, targetSourceScale, 0.12);
    targetScaleRef.current = THREE.MathUtils.lerp(targetScaleRef.current, targetTargetScale, 0.12);

    // Compute dynamic points (pointing directly to left/right center edges of neurons)
    const rSource = 0.65 * sourceScaleRef.current;
    const rTarget = 0.65 * targetScaleRef.current;

    const startX = source.x + rSource;
    const startY = source.y * sourceScaleRef.current;

    const endX = target.x - rTarget;
    const endY = target.y * targetScaleRef.current;

    // Update base line positions
    if (baseLineRef.current.geometry && typeof baseLineRef.current.geometry["setPositions"] === "function") {
      baseLineRef.current.geometry["setPositions"]([
        startX, startY, 0,
        endX, endY, 0
      ]);
    }

    // Highlight is active during propagation phase (tStep >= 1.7) of the active source layer step
    // and ONLY when there is no hover active (since hover highlights only neurons/badges of that layer)
    const isPropagationActive =
      hoveredLayerIndex === null && source.layerIndex === stepIdx && tStep >= 1.7;

    let targetPulseOpacity = 0.0;
    let targetPulseWidth = 0.0;
    let pulseStartX = startX;
    let pulseStartY = startY;
    let pulseEndX = startX;
    let pulseEndY = startY;

    if (isPropagationActive) {
      // Calculate progress of the propagation phase (0.0 to 1.0) over 0.8 seconds
      const progress = Math.min(1.0, Math.max(0.0, (tStep - 1.7) / 0.8));

      // Pulse starts at the source and its end point grows towards the target
      pulseStartX = startX;
      pulseStartY = startY;

      pulseEndX = startX + (endX - startX) * progress;
      pulseEndY = startY + (endY - startY) * progress;

      targetPulseOpacity = 0.9; // Highly visible, glowing pulse
      targetPulseWidth = 0.55;   // Same width as the base line so it doesn't look bloated!
    }

    // Update pulse positions
    if (pulseRef.current.geometry && typeof pulseRef.current.geometry["setPositions"] === "function") {
      pulseRef.current.geometry["setPositions"]([
        pulseStartX, pulseStartY, 0,
        pulseEndX, pulseEndY, 0
      ]);
    }

    // Lerp pulse material properties
    pulseRef.current.material.opacity = THREE.MathUtils.lerp(
      pulseRef.current.material.opacity,
      targetPulseOpacity,
      0.15
    );

    pulseRef.current.material.linewidth = THREE.MathUtils.lerp(
      pulseRef.current.material.linewidth,
      targetPulseWidth,
      0.15
    );
  });

  return (
    <group>
      {/* Base Synapse Line (Always visible, thin, subtle) */}
      <Line
        ref={baseLineRef}
        points={[startPoint, endPoint]}
        color="#cbd5e1"
        lineWidth={0.55}
        transparent={true}
        opacity={0.1}
      />

      {/* Traveling Forward Pass Signal Pulse (Displays only during active propagation step) */}
      <Line
        ref={pulseRef}
        points={[startPoint, startPoint]}
        color={source.color}
        lineWidth={2.8}
        transparent={true}
        opacity={0.0}
      />
    </group>
  );
}
