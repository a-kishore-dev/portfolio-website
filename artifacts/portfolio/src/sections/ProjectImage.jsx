// ─────────────────────────────────────────────────────────────────────────────
// ProjectImage.jsx  —  drop-in image panel for FeaturedProjects
//
// USAGE in FeaturedProjects.jsx:
//   import ProjectImage from "./ProjectImage";
//   ...
//   <ProjectImage project={activeProject} metric={activeProject.metrics[0]} />
//
// Replaces wherever the image + metric badge is currently rendered.
// ─────────────────────────────────────────────────────────────────────────────
//
// WHY THIS COMPONENT EXISTS:
//   The four featured project images have different characteristics:
//
//   project-rag.jpeg       — dark illustrated banner, baked-in text top-left
//                            → object-cover + strong left-side gradient overlay
//                              to suppress the existing text
//
//   project-astraflow.png  — white/light UI screenshot
//                            → object-cover + strong top+bottom dark gradient
//                              so metric badge and category label stay readable
//
//   project-astrastudio.png — dark UI screenshot
//                            → object-cover + minimal gradient (barely needed)
//
//   project-finetuning.jpg  — beige background illustrated cartoon diagram
//                            → object-contain on #0a0a0f dark panel
//                              beige BG replaced by dark panel, illustration
//                              fully visible without stretch or crop
//
//   Each project in projectsContent.js now carries two fields:
//     imageStyle: "cover" | "contain"
//     imageOverlay: CSS gradient string | "none"
//
// ─────────────────────────────────────────────────────────────────────────────

export default function ProjectImage({ project, metric }) {
    const isCover = !project.imageStyle || project.imageStyle === "cover";
    const isContain = project.imageStyle === "contain";
    const overlay = project.imageOverlay && project.imageOverlay !== "none"
        ? project.imageOverlay
        : null;

    return (
        <div
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                // Dark panel background — visible through contain images and
                // at image edges. Matches portfolio #050505 / #0a0a0c palette.
                backgroundColor: "#0a0a0f",
                borderRadius: "inherit",
                overflow: "hidden",
            }}
        >
            {/* ── Image ─────────────────────────────────────────────────────── */}
            <img
                src={project.image}
                alt={project.title}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",

                    // cover: fills the panel, crops if needed (screenshots, dark images)
                    // contain: shows full image with dark panel visible at edges
                    //          (illustrated diagrams with beige/light backgrounds)
                    objectFit: isCover ? "cover" : "contain",

                    // contain images: centre the illustration in the panel
                    objectPosition: isCover ? "center" : "center center",

                    // contain images: slight padding so illustration doesn't touch edges
                    padding: isContain ? "1.5rem" : "0",

                    // Subtle scale on hover — only for cover images where it looks good
                    transition: "transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)",
                }}
            />

            {/* ── Gradient overlay (cover images only) ──────────────────────── */}
            {overlay && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background: overlay,
                        // Pointer events pass through — overlay is purely visual
                        pointerEvents: "none",
                    }}
                />
            )}

            {/* ── Contain image: subtle dark vignette at edges ──────────────── */}
            {isContain && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "radial-gradient(ellipse at center, transparent 55%, rgba(10,10,15,0.7) 100%)",
                        pointerEvents: "none",
                    }}
                />
            )}

            {/* ── Category label — top-left ──────────────────────────────────── */}
            {project.category && (
                <div
                    style={{
                        position: "absolute",
                        top: "1rem",
                        left: "1rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: "0.6rem",
                        fontWeight: 700,
                        color: "#00F0FF",
                        textTransform: "uppercase",
                        letterSpacing: "0.15em",
                        background: "rgba(5,5,5,0.75)",
                        backdropFilter: "blur(8px)",
                        border: "1px solid rgba(0,240,255,0.2)",
                        borderRadius: "0.35rem",
                        padding: "0.3rem 0.65rem",
                    }}
                >
                    {project.category}
                </div>
            )}

            {/* ── Metric badge — bottom-right ───────────────────────────────── */}
            {metric && (
                <div
                    style={{
                        position: "absolute",
                        bottom: "1rem",
                        right: "1rem",
                        fontFamily: "'JetBrains Mono', monospace",
                        background: "rgba(5,5,5,0.85)",
                        backdropFilter: "blur(12px)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRadius: "0.5rem",
                        padding: "0.6rem 0.9rem",
                        textAlign: "right",
                    }}
                >
                    <div
                        style={{
                            fontSize: "0.55rem",
                            color: "#6B7280",
                            textTransform: "uppercase",
                            letterSpacing: "0.12em",
                            marginBottom: "0.2rem",
                        }}
                    >
                        {metric.label}
                    </div>
                    <div
                        style={{
                            fontSize: "1.1rem",
                            fontWeight: 700,
                            color: "#00F0FF",
                            lineHeight: 1,
                        }}
                    >
                        {metric.value}
                    </div>
                </div>
            )}
        </div>
    );
}