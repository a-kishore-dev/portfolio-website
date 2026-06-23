export const heroContent = {
  // ── Eyebrow ───────────────────────────────────────────────────────────────
  // Source: profile.md header subtitle + core skills
  eyebrow: "AI/ML Engineer · LangChain · PyTorch · LangGraph",
  eyebrowSize: "0.78rem",

  // ── Name ──────────────────────────────────────────────────────────────────
  name: "Kishore A",
  nameSize: "clamp(2.8rem, 5vw, 4.75rem)",

  // ── Tagline ───────────────────────────────────────────────────────────────
  taglinePrefix: "Building Real ",
  taglineHighlight: "AI Systems",
  taglineSize: "clamp(1.4rem, 2.4vw, 2.1rem)",

  // ── Subheadline ───────────────────────────────────────────────────────────
  // Source: profile.md Professional Summary — paragraph 1, sharpened closing
  // Changed: "that run in production" → "not as academic exercises — as deployed, working software"
  subHeadline:
    "Applied AI/ML engineer specializing in building production-grade LLM-powered systems, " +
    "multi-agent pipelines, and end-to-end machine learning products - " +
    "not as academic exercises, but as deployed, working software.",
  subHeadlineSize: "1.05rem",

  // ── Availability badge ────────────────────────────────────────────────────
  // Source: profile.md — "available for full-time roles immediately"
  availabilityText: "Available for Opportunities",

  // ── Stats ─────────────────────────────────────────────────────────────────
  // Source: profile.md — Proof of Work → Key Metrics at a Glance
  // Changes from original:
  //   • "0.7662 Loan Risk ROC-AUC" replaced with "+191% Text-to-SQL ROUGE-1"
  //     Rationale: +191% over a baseline LLM is more immediately striking in a hero
  //     section than a raw ROC-AUC score that requires domain knowledge to appreciate.
  //     The ROC-AUC is better suited for the Projects section where context exists.
  //   • "94.55% RAG Faithfulness" kept — it directly ties to the code panel visual,
  //     creating a coherent story (the code runs, the score is the proof).
  //   • "99% SafeBite F1-Score" kept — clean, universally understood metric.
  //   • "Top 5% TCS CodeVita" kept — competitive signal, no change needed.
  stats: [
    { value: "94.55%", label: "RAG Faithfulness" },
    { value: "99%", label: "SafeBite F1-Score" },
    { value: "+191%", label: "Text-to-SQL ROUGE-1" },
    { value: "Top 5%", label: "TCS CodeVita" },
  ],

  // ── Code panel ────────────────────────────────────────────────────────────
  // Source: profile.md → Project 1 (Production RAG System) tech stack
  // Changes from original:
  //   • dense_model: "BGE-large" → "bge-small-en-v1.5"
  //     Rationale: profile.md explicitly states the embedding model used is
  //     BAAI/bge-small-en-v1.5 (Sentence Transformers). BGE-large was inaccurate.
  //   • sparse_model: "BM25" — correct, keep (Rank-BM25 used in project)
  //   • reranker: "cross-encoder" — correct, keep (CrossEncoder reranking in project)
  //   • Query changed: "What is attention?" → "Explain RAG with HyDE"
  //     Rationale: more representative of what the system actually does; "attention"
  //     felt like a Transformer question, not a RAG query.
  //   • Final comment score kept at 94.55% — matches the stat card exactly.
  //   • top_k: 5 → 3 (profile.md states k=3 most similar documents retrieved)
  //   • mode="hybrid" — correct, keep (hybrid BM25 + dense retrieval)
  codeLines: [
    { text: "from llamaindex import HybridRAG", color: "#c8d3f5" },
    { text: "from qdrant_client import QdrantClient", color: "#c8d3f5" },
    { text: "", color: "" },
    { text: "# Initialize hybrid retrieval", color: "#636da6" },
    {
      text: 'client = QdrantClient(url="localhost:6333")',
      color: "#c8d3f5",
      parts: [
        { t: "client", c: "#82aaff" },
        { t: " = ", c: "#c8d3f5" },
        { t: "QdrantClient", c: "#ffc777" },
        { t: '(url=', c: "#c8d3f5" },
        { t: '"localhost:6333"', c: "#c3e88d" },
        { t: ")", c: "#c8d3f5" },
      ],
    },
    {
      text: "rag = HybridRAG(",
      color: "#c8d3f5",
      parts: [
        { t: "rag", c: "#82aaff" },
        { t: " = ", c: "#c8d3f5" },
        { t: "HybridRAG", c: "#ffc777" },
        { t: "(", c: "#c8d3f5" },
      ],
    },
    {
      text: '    dense_model="bge-small-en-v1.5",',
      color: "#c8d3f5",
      parts: [
        { t: "    dense_model", c: "#c8d3f5" },
        { t: "=", c: "#89ddff" },
        { t: '"bge-small-en-v1.5"', c: "#c3e88d" },
        { t: ",", c: "#c8d3f5" },
      ],
    },
    {
      text: '    sparse_model="BM25",',
      color: "#c8d3f5",
      parts: [
        { t: "    sparse_model", c: "#c8d3f5" },
        { t: "=", c: "#89ddff" },
        { t: '"BM25"', c: "#c3e88d" },
        { t: ",", c: "#c8d3f5" },
      ],
    },
    {
      text: '    reranker="cross-encoder"',
      color: "#c8d3f5",
      parts: [
        { t: "    reranker", c: "#c8d3f5" },
        { t: "=", c: "#89ddff" },
        { t: '"cross-encoder"', c: "#c3e88d" },
      ],
    },
    { text: ")", color: "#c8d3f5" },
    { text: "", color: "" },
    { text: "# Query with HyDE expansion", color: "#636da6" },
    {
      text: "result = rag.query(",
      color: "#c8d3f5",
      parts: [
        { t: "result", c: "#82aaff" },
        { t: " = rag.", c: "#c8d3f5" },
        { t: "query", c: "#82aaff" },
        { t: "(", c: "#c8d3f5" },
      ],
    },
    {
      text: '    "Explain RAG with HyDE",',
      color: "#c8d3f5",
      parts: [
        { t: '    "Explain RAG with HyDE"', c: "#c3e88d" },
        { t: ",", c: "#c8d3f5" },
      ],
    },
    {
      text: "    top_k=3, mode=",
      color: "#c8d3f5",
      parts: [
        { t: "    top_k", c: "#c8d3f5" },
        { t: "=", c: "#89ddff" },
        { t: "3", c: "#f78c6c" },
        { t: ", mode", c: "#c8d3f5" },
        { t: "=", c: "#89ddff" },
        { t: '"hybrid"', c: "#c3e88d" },
      ],
    },
    { text: ")", color: "#c8d3f5" },
    { text: "", color: "" },
    { text: "# ✓ RAGAS Faithfulness Score: 94.55%", color: "#636da6" },
  ],
};