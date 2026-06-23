export const aboutContent = {
  // ── Section label ─────────────────────────────────────────────────────────
  label: "/ About",
  labelSize: "0.72rem",

  // ── Title ─────────────────────────────────────────────────────────────────
  // Kept — strong, accurate, matches profile.md voice perfectly.
  titlePrefix: "From first principles to ",
  titleHighlight: "deployed software.",
  titleSize: "clamp(2.4rem, 4.5vw, 3.75rem)",

  // ── Paragraphs ────────────────────────────────────────────────────────────

  paragraphs: [
    "I am an applied AI/ML engineer specializing in building production-grade " +
    "LLM-powered systems, multi-agent pipelines, and end-to-end machine learning " +
    "products - not as academic exercises, but as deployed, working software. " +
    "My strength lies at the intersection of LLM engineering and systems thinking: " +
    "I consistently work the full stack, from data preprocessing and model training " +
    "through API design, deployment, and observability.",

    "I approach AI engineering from first principles - I've implemented the full " +
    "Transformer architecture (Vaswani et al., 2017) and a GPT-style decoder-only " +
    "language model from scratch in PyTorch, understanding the math well enough to " +
    "explain it, not just use it. On the applied side, I've shipped production RAG " +
    "systems with hybrid BM25 + dense retrieval and HyDE query enhancement " +
    "(RAGAS score 4.9/5.0), fine-tuned Llama 3.2 3B with QLoRA achieving " +
    "+191% ROUGE-1 over baseline, built no-code agentic workflow orchestrators, " +
    "and extended open-source multi-agent platforms with enterprise security features.",
  ],
  paragraphSize: "1.0625rem",

  // ── Hashtag ───────────────────────────────────────────────────────────────
  tagText: "#KishoreAI",

  // ── Info card stats ───────────────────────────────────────────────────────
  // Source: profile.md → Education, Fast-Facts Block, Header
  // Changes from original:
  //   • Timeline: added "(Graduated)" to remove ambiguity — Nov 2022–May 2026
  //     currently reads as if still enrolled. Profile.md is explicit:
  //     "Graduated May 2026, available immediately."
  //   • Added "Degree" field — profile.md states full degree name;
  //     useful context alongside university name.
  //   • University kept as short form — card space is limited.
  //   • Location kept unchanged — correct per profile.md.
  stats: [
    { label: "CGPA", value: "8.67 / 10.0" },
    { label: "Degree", value: "B.Tech — AI & Data Science" },
    { label: "University", value: "Panimalar Engineering College" },
    { label: "Timeline", value: "Nov 2022 – May 2026 (Graduated)" },
    { label: "Location", value: "Bengaluru, India" },
  ],

  // ── Availability buttons ──────────────────────────────────────────────────
  // Source: profile.md — "actively seeking full-time roles... available immediately"
  // Note: profile.md does not mention freelance explicitly, but the portfolio
  // shows an "Open to Freelance" button. Keeping both — content-controlled here
  // so it can be toggled independently of the UI component.
  availability: [
    { label: "Open to Full-time", active: true },
    { label: "Open to Freelance", active: false },
  ],
};