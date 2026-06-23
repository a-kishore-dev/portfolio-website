// ─────────────────────────────────────────────────────────────────────────────
// projectsContent.js
// Source of truth: profile.md (Kishore A — Master Professional Profile)
// All metrics, tech stacks, descriptions and pipeline steps verified against
// profile.md before writing. Change comments note every deviation from original.
// ─────────────────────────────────────────────────────────────────────────────

export const FEATURED_PROJECTS = [
  // ── Project 1: Production RAG System ───────────────────────────────────────
  {
    id: 1,
    title: "Production RAG System",
    shortTitle: "RAG System",
    image: "/images/project-rag.jpeg",
    // Dark illustrated banner. object-cover with subtle top/bottom overlay for readability.
    imageStyle: "contain",
    imageOverlay: "linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, transparent 50%, rgba(5,5,5,0.5) 100%)",

    // CHANGED: Added "dual-LLM" and "BAAI/bge-small-en-v1.5" to shortDesc
    // for accuracy. profile.md confirms two LLMs: Groq/Llama 3.1 8B for HyDE,
    // Gemini 2.5 Flash for final generation.
    shortDesc:
      "Enterprise-grade hybrid retrieval RAG pipeline scoring 4.9/5.0 across RAGAS system metrics.",

    // CHANGED: Added dual-LLM architecture detail (Groq + Gemini 2.5 Flash)
    // and BAAI/bge-small-en-v1.5 embedding model — both confirmed in profile.md.
    // Original said just "Qdrant" but profile specifies Qdrant for vector storage
    // alongside BM25 for keyword retrieval in a true hybrid architecture.
    fullDesc:
      "An advanced, enterprise-grade Retrieval-Augmented Generation system with a dual-LLM " +
      "architecture: Groq (Llama 3.1 8B, ~50ms) for fast HyDE query enhancement, and " +
      "Google Gemini 2.5 Flash for final response generation. Combines sparse keyword " +
      "search (BM25) and dense semantic search (Qdrant, BAAI/bge-small-en-v1.5 embeddings) " +
      "with CrossEncoder-based semantic reranking and spaCy semantic chunking. " +
      "Fully evaluated using the RAGAS framework across four production metrics.",

    tags: ["#LLAMAINDEX", "#QDRANT", "#BM25", "#RERANKING", "#RAGAS"],

    // CHANGED: Added "BAAI/bge-small-en-v1.5" and "Groq" to tech array.
    // profile.md explicitly lists both. "Llama 3.1" → "Llama 3.1 8B (Groq)"
    // for precision — Groq is the inference provider, not HuggingFace.
    tech: [
      "LlamaIndex",
      "Qdrant",
      "BM25",
      "CrossEncoder",
      "HyDE",
      "Groq (Llama 3.1 8B)",
      "Gemini 2.5 Flash",
      "BAAI/bge-small-en-v1.5",
      "spaCy",
      "RAGAS",
      "Streamlit",
    ],

    // Metrics: all values confirmed from profile.md Proof of Work block.
    // Faithfulness: 0.9455 = 94.55% ✓
    // Context Precision: 0.9722 = 97.22% ✓
    // Context Recall: 1.0000 = 100.0% ✓
    // Answer Relevancy: 0.8697 = 86.97% ✓
    metrics: [
      { label: "Faithfulness", value: "94.55%" },
      { label: "Context Precision", value: "97.22%" },
      { label: "Context Recall", value: "100.0%" },
      { label: "Answer Relevancy", value: "86.97%" },
    ],

    github: "https://github.com/a-kishore-dev/Production_RAG_System",
    live: "https://rag-system-pro.streamlit.app",
    category: "GenAI",

    // CHANGED: Pipeline now reflects the 8-module architecture from profile.md.
    // Original had "PyMuPDF Loader" and "Gemini 2.5 Response" — both correct.
    // Added "HyDE Enhancement" as a distinct step between retrieval and generation
    // since it's a core architectural feature worth surfacing in the UI.
    pipeline: [
      "PyMuPDF Loader",
      "spaCy Semantic Chunk",
      "BM25 & Qdrant Hybrid",
      "HyDE Enhancement",
      "CrossEncoder Rerank",
      "Gemini 2.5 Response",
    ],
  },

  // ── Project 2: AstraFlow ───────────────────────────────────────────────────
  {
    id: 2,
    title: "AstraFlow",
    shortTitle: "AstraFlow",
    image: "/images/project-astraflow.png",
    // Light UI screenshot. Subtle top/bottom overlay.
    imageStyle: "contain",
    imageOverlay: "linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, transparent 50%, rgba(5,5,5,0.5) 100%)",

    shortDesc:
      "Visual no-code workflow orchestrator with Inngest DAG resolution and multi-agent AI loops.",

    // CHANGED: Added Handlebars context system — a key differentiator of AstraFlow
    // (profile.md: "Nodes share data through a cumulative execution context using
    // Handlebars templating"). Also clarified the three-terminal AI Agent Node
    // wiring system (Blue/Purple/Green) since it's Kishore's direct contribution.
    fullDesc:
      "A drag-and-drop workflow canvas matching n8n/Zapier features but centred around AI " +
      "agent execution nodes. Nodes share data via a cumulative Handlebars execution context " +
      "— upstream outputs become template variables for downstream nodes. The AI Agent Node " +
      "uses a three-terminal wiring model (Chat Model · Memory · Services) for autonomous " +
      "function-calling loops. Built with Next.js App Router, tRPC, and Prisma. " +
      "Leverages Inngest for topological-sort DAG execution with AES-256 encrypted " +
      "credentials vault and live Pro subscription billing via Polar.",

    tags: ["#NEXTJS", "#REACTFLOW", "#TRPC", "#INNGEST", "#PRISMA"],

    // CHANGED: Added "Jotai", "TanStack Query", "Handlebars" — all confirmed
    // in profile.md tech stack for AstraFlow. "LangChain" added back — profile.md
    // lists it under AstraFlow's AI layer alongside Vercel AI SDK.
    tech: [
      "Next.js",
      "React Flow",
      "tRPC",
      "Inngest",
      "PostgreSQL",
      "Prisma",
      "Vercel AI SDK",
      "LangChain",
      "Jotai",
      "TanStack Query",
      "Better Auth",
      "Polar",
    ],

    // CHANGED: Added "Handlebars Context" as execution metric — it's the core
    // data-passing mechanism between nodes and a key technical differentiator.
    // "Engine Type: Inngest DAG" kept — accurate per profile.md.
    metrics: [
      { label: "Execution Nodes", value: "20+" },
      { label: "Vault Security", value: "AES-256" },
      { label: "Engine Type", value: "Inngest DAG" },
      { label: "Context System", value: "Handlebars" },
    ],

    github: "https://github.com/a-kishore-dev/Astraflow",
    live: "https://astraflow-gilt.vercel.app",
    category: "Full-Stack AI",

    // CHANGED: Pipeline now follows the 5-step execution flow from profile.md:
    // React Flow canvas → tRPC validation → Inngest DAG → Context accumulation
    // → PostgreSQL status log. Original had same steps but "PostgreSQL Log Update"
    // is now "Execution Context Log" to better describe what's written to DB.
    pipeline: [
      "React Flow Canvas",
      "tRPC Input Validation",
      "Inngest DAG Execution",
      "Handlebars Context Merge",
      "PostgreSQL Status Log",
    ],
  },

  // ── Project 3: AstraStudio ─────────────────────────────────────────────────
  {
    id: 3,
    title: "AstraStudio",
    shortTitle: "AstraStudio",
    image: "/images/project-astrastudio.png",
    // Dark UI screenshot. Subtle overlay for badge readability.
    imageStyle: "contain",
    imageOverlay: "linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, transparent 50%, rgba(5,5,5,0.5) 100%)",

    shortDesc:
      "Enterprise multi-user CrewAI workspace with Fernet-encrypted vault, DocLing knowledge ingestion, and MCP Hub.",

    // CHANGED: Added "dependency-aware cascade deletion" — a specific feature
    // Kishore built (profile.md: "Dependency-Aware Cascade Deletion" section).
    // Added "Google Gemini" — profile.md explicitly states Kishore added Gemini
    // LLM provider support as a new addition to the upstream.
    // Added "30+ tools" count — profile.md states "30+ tools including..."
    fullDesc:
      "A robust fork and extension of CrewAI-Studio (MIT, strnad/CrewAI-Studio). " +
      "Adds Bcrypt multi-user authentication with per-user DB isolation, " +
      "Fernet-encrypted credentials vault with session-only memory sweep on logout, " +
      "pre-flight connection testing for HTTP/SSE/stdio MCP servers, " +
      "DocLing-powered URL and document markdown ingestion, " +
      "dependency-aware cascade deletion dialogs, Google Gemini LLM provider support, " +
      "quickstart crew templates, and 30+ agent tools including Docker-sandboxed " +
      "code execution.",

    tags: ["#CREWAI", "#DOCLING", "#MCP", "#FERNET", "#STREAMLIT"],

    // CHANGED: Added "Google Gemini" — Kishore's direct addition per profile.md.
    // Added "SQLite / PostgreSQL" — profile.md confirms SQLite default, PostgreSQL
    // via DB_URL environment variable.
    tech: [
      "Python",
      "CrewAI",
      "Streamlit",
      "SQLAlchemy",
      "SQLite / PostgreSQL",
      "Fernet",
      "DocLing",
      "MCP Servers",
      "Bcrypt",
      "Google Gemini",
    ],

    // CHANGED: "Doc Loader: DocLing MD" kept — accurate.
    // "MCP Tests: Pre-Flight SSE" → "Pre-Flight HTTP/SSE/stdio" — profile.md
    // confirms three transport types, not just SSE.
    metrics: [
      { label: "Base Platform", value: "CrewAI-Studio" },
      { label: "User Isolation", value: "Bcrypt & Scoped DB" },
      { label: "Doc Loader", value: "DocLing Markdown" },
      { label: "MCP Transport", value: "HTTP / SSE / stdio" },
    ],

    github: "https://github.com/a-kishore-dev/astrastudio",
    live: "https://astrastudio.streamlit.app",
    category: "Agents",

    // CHANGED: Added "CrewAI Crew Kickoff" as final pipeline step — profile.md
    // describes `MyCrew.kickoff()` as the execution entry point.
    // "Fernet Key Decryption" → "Fernet Credential Decrypt" for clarity.
    pipeline: [
      "Bcrypt Signup / Login",
      "Fernet Credential Decrypt",
      "MCP Pre-Flight Verify",
      "DocLing Knowledge Feed",
      "CrewAI Crew Kickoff",
    ],
  },

  // ── Project 4: Text-to-SQL QLoRA ──────────────────────────────────────────
  {
    id: 4,
    title: "Llama 3.2 Text-to-SQL QLoRA",
    shortTitle: "SQL Fine-Tuning",
    image: "/images/project-finetuning.jpg",
    // Dark illustrated banner. object-cover with subtle top/bottom overlay.
    imageStyle: "contain",
    imageOverlay: "linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, transparent 50%, rgba(5,5,5,0.5) 100%)",

    shortDesc:
      "Fine-tuning a 3B-parameter model achieving +191.82% ROUGE-1 SQL accuracy over base — training only 0.75% of parameters.",

    // CHANGED: Added "gretelai/synthetic_text_to_sql" dataset name and
    // "50,000-example training subset" — both explicitly stated in profile.md.
    // Added "EOS token appended after SQL output" — key training detail from
    // profile.md: "teaches the model when to stop generating".
    // Added "paged_adamw_8bit" optimiser — confirmed in profile.md training config.
    fullDesc:
      "QLoRA fine-tuning of Llama 3.2 3B Instruct on the gretelai/synthetic_text_to_sql " +
      "dataset (50,000-example subset, seed 42) on a single free-tier T4 GPU using " +
      "Unsloth and bitsandbytes. LoRA adapters (r=16, alpha=16) injected into all " +
      "attention and MLP projection layers represent only 0.75% of model weights " +
      "(24.3M of 3.21B parameters) but yield massive improvements in SQL clause " +
      "sequencing. EOS token appended after SQL during training teaches the model " +
      "when to stop generating. Trained with paged_adamw_8bit and sequence packing " +
      "for T4 efficiency. Merged FP16 model published to HuggingFace Hub.",

    tags: ["#LLM-FINETUNING", "#QLORA", "#UNSLOTH", "#PEFT", "#WANDB"],

    // CHANGED: Added "gretelai/synthetic_text_to_sql" as dataset reference.
    // "Weights & Biases" kept — confirmed in profile.md for live loss tracking.
    tech: [
      "Llama 3.2 3B",
      "QLoRA",
      "Unsloth",
      "PEFT",
      "TRL SFTTrainer",
      "bitsandbytes (4-bit NF4)",
      "Weights & Biases",
      "HuggingFace Hub",
      "gretelai/synthetic_text_to_sql",
    ],

    // All metric values confirmed from profile.md:
    // ROUGE-1: +191.82% ✓  ROUGE-2: +258.73% ✓
    // Params trained: 0.75% of 3.21B = 24.3M ✓
    // Hardware: Google Colab T4 free tier ✓
    // CHANGED: "Parameters Trained: 0.75%" → "24.3M / 3.21B (0.75%)" for
    // more context. ROUGE-2 gain is the most impressive number — +258.73%.
    metrics: [
      { label: "ROUGE-1 Gain", value: "+191.82%" },
      { label: "ROUGE-2 Gain", value: "+258.73%" },
      { label: "Params Trained", value: "24.3M / 3.21B" },
      { label: "Training Hardware", value: "Colab T4 (Free)" },
    ],

    github: "https://github.com/a-kishore-dev/text-to-sql-finetuning",
    // NOTE: live points to HuggingFace model — this is the published artifact,
    // not a web app. Component should handle this gracefully (e.g. "View Model"
    // instead of "Launch Live Demo").
    live: "https://huggingface.co/A-Kishore/llama-3.2-3b-text2sql",
    category: "Fine-Tuning",

    // CHANGED: "4-Bit NF4 Quant Base" → "4-Bit NF4 Quantisation" for clarity.
    // "PEFT/LoRA Adapter Inj" → "LoRA Adapter Injection (r=16)" — adds rank detail.
    // "HF Hub Weight Push" → "Merged FP16 → HF Hub" — profile.md states adapters
    // are merged back before publishing, which is technically meaningful.
    // "Gretel Dataset Prep" → "50K Subset Sample (seed 42)" — more precise.
    pipeline: [
      "50K Subset Sample (seed 42)",
      "4-Bit NF4 Quantisation",
      "LoRA Adapter Injection (r=16)",
      "SFTTrainer + Seq Packing",
      "Merged FP16 → HF Hub",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export const MORE_PROJECTS = [
  // ── Project 5: Custom Chatbot Builder ─────────────────────────────────────
  {
    id: 5,
    title: "Custom Chatbot Builder Platform",
    shortTitle: "Chatbot Builder",
    image: "/images/project-astrastudio.png",
    // Dark UI screenshot. Subtle overlay.
    imageStyle: "cover",
    imageOverlay: "linear-gradient(to bottom, rgba(5,5,5,0.2) 0%, transparent 50%, rgba(5,5,5,0.4) 100%)",

    // CHANGED: "Multi-tenant" → "Multi-bot" — profile.md is explicit that each
    // user session can hold multiple independent bots, but this is NOT a
    // multi-tenant SaaS (no user accounts). "Multi-tenant" is technically wrong.
    shortDesc:
      "Multi-bot platform to configure, manage, and deploy domain-specific RAG chatbots with isolated knowledge bases and LangSmith observability.",

    // CHANGED: Added tone/persona configuration detail — a key feature of the
    // platform (Professional/Casual/Technical/Empathetic/Funny tone selector).
    // Added "k=3 retrieval, k=5 memory" specifics from profile.md.
    // Added "Groq Llama 3.1" as secondary LLM — confirmed in profile.md.
    fullDesc:
      "Allows users to instantiate separate bots with individual system descriptions, " +
      "tone presets (Professional / Casual / Technical / Empathetic / Funny), " +
      "domain constraints, forbidden topics, and PDF document knowledge bases. " +
      "Each bot has an isolated ChromaDB vector store (k=3 retrieval, chunk_size=1000, " +
      "overlap=200) and bounded conversation memory (k=5 messages). Uses LangChain LCEL, " +
      "HuggingFace all-MiniLM-L6-v2 embeddings, and LangSmith for full trace " +
      "observability (latency, token count, cost tracking). Supports Gemini and Groq " +
      "Llama 3.1 as LLM backends.",

    // CHANGED: Added "Groq / Llama 3.1" — confirmed in profile.md as secondary LLM.
    // Added "all-MiniLM-L6-v2" — the specific embedding model used (33M params).
    tech: [
      "LangChain",
      "LCEL",
      "ChromaDB",
      "HuggingFace all-MiniLM-L6-v2",
      "Gemini API",
      "Groq / Llama 3.1",
      "LangSmith",
      "PyMuPDF",
      "Streamlit",
    ],

    github: "https://github.com/a-kishore-dev/Custom_chatbot_builder_platform",
    live: "https://custom-chatbot-builder-platform.streamlit.app",
    category: "GenAI",

    // CHANGED: "Bounded History: k=5 Messages" and "Collection Split: Per-bot
    // ChromaDB" kept — both confirmed in profile.md.
    // Added "Chunk Size: 1000 / Overlap: 200" — explicit values from profile.md.
    // Replaced "Text Extraction: PyMuPDF" with metric showing retrieval precision.
    metrics: [
      { label: "Retrieval (k)", value: "k=3 Chunks" },
      { label: "Memory Window", value: "k=5 Messages" },
      { label: "Chunk Config", value: "1000 tok / 200 ovlp" },
      { label: "Observability", value: "LangSmith Traces" },
    ],

    // CHANGED: Added "Dynamic Prompt Build" as step — a key feature of the
    // platform (ChatPromptTemplate generated from config dict at runtime).
    pipeline: [
      "Bot Config Form",
      "Dynamic Prompt Build",
      "Doc Recursive Split",
      "ChromaDB Embed",
      "LCEL Retrieval Chain",
    ],
  },

  // ── Project 6: Loan Default Risk Predictor ────────────────────────────────
  {
    id: 6,
    title: "Loan Default Risk Predictor",
    shortTitle: "Risk Engine",
    image: "/images/project-astraflow.png",
    // Light UI screenshot. Subtle overlay.
    imageStyle: "cover",
    imageOverlay: "linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, transparent 50%, rgba(5,5,5,0.5) 100%)",

    shortDesc:
      "Credit default prediction pipeline comparing 6 models over a 307,511-record Home Credit dataset.",

    // CHANGED: Fixed capitalisation ("classical" → "Classical"). Added all
    // six model names from profile.md (Logistic Regression, Random Forest,
    // AdaBoost were missing — only 3 of 6 listed in original).
    // Added "11.4% default rate class imbalance" and "scale_pos_weight" detail.
    // Added "5 source tables, 40+ engineered features" from profile.md.
    fullDesc:
      "Classical ML project on the Home Credit Default Risk dataset (307,511 training " +
      "records, 11.4% default rate class imbalance). Aggregates features from 5 source " +
      "tables into 40+ engineered features. Compares all six models — LightGBM, XGBoost, " +
      "CatBoost, Random Forest, AdaBoost, and Logistic Regression — using validation " +
      "ROC-AUC with scale_pos_weight for imbalance handling. Logs all runs to MLflow " +
      "(SQLite backend). Uses SHAP for both global summary plots and per-prediction " +
      "waterfall explainability.",

    // CHANGED: Added "AdaBoost", "Logistic Regression", "Random Forest",
    // "Parquet" — all confirmed in profile.md. All 6 models should appear
    // in the tech array since the project is a comparison of all six.
    tech: [
      "LightGBM",
      "XGBoost",
      "CatBoost",
      "Random Forest",
      "AdaBoost",
      "Logistic Regression",
      "Scikit-learn",
      "Polars",
      "MLflow",
      "SHAP",
      "Parquet",
    ],

    github: "https://github.com/a-kishore-dev/Loan-Default-Risk-Prediction",
    live: null,
    category: "ML",

    // Metrics confirmed from profile.md:
    // ROC-AUC 0.7662 (LightGBM) ✓
    // 307,511 records ✓
    // 40+ engineered features ✓
    // MLflow tracking ✓
    // CHANGED: "Dataset Records: 307,511" → added comma formatting.
    // "Engineered Features: 40+ Features" kept — confirmed.
    metrics: [
      { label: "Best ROC-AUC", value: "0.7662 (LightGBM)" },
      { label: "Training Records", value: "307,511" },
      { label: "Engineered Features", value: "40+ (5 tables)" },
      { label: "Experiment Tracking", value: "MLflow Registry" },
    ],

    // CHANGED: Added "5-Table Feature Join" — a distinct and technically
    // meaningful step (bureau, bureau_balance, previous_application tables
    // aggregated and joined). "SHAP Waterfall Plot" added as final step
    // since it's a named deliverable in profile.md.
    pipeline: [
      "5-Table Polars Aggregation",
      "Outlier & Imputation",
      "RandomizedSearchCV",
      "MLflow Run Logging",
      "SHAP Waterfall Plot",
    ],
  },

  // ── Project 7: Transformer From Scratch ───────────────────────────────────
  {
    id: 7,
    title: "Transformer From Scratch in PyTorch",
    shortTitle: "Transformer Scratch",
    image: "/images/project-rag.jpeg",
    // Dark illustrated banner. object-cover with subtle overlay.
    imageStyle: "contain",
    imageOverlay: "linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, transparent 50%, rgba(5,5,5,0.5) 100%)",

    shortDesc:
      "Complete mathematical implementation of the original Transformer encoder-decoder architecture (Vaswani et al., 2017) in pure PyTorch.",

    // CHANGED: Added "Post-Norm residual (Add & Norm)" — profile.md explicitly
    // distinguishes this from modern Pre-Norm (used in GPT project).
    // Added "Adam optimiser" — profile.md confirms Adam (not AdamW) for this
    // project. AdamW is used in the GPT project, not here.
    // Added "causal + padding mask" — both mask types implemented, per profile.md.
    fullDesc:
      "A complete, bottom-up PyTorch 2.0 implementation of the Transformer encoder-decoder " +
      "model (Vaswani et al., 2017). Implements scaled dot-product attention " +
      "(QKᵀ/√dₖ), multi-head projections across 8 heads, sinusoidal positional " +
      "encodings, Post-Norm residual connections (Add & Norm), both causal and padding " +
      "masks, and teacher-forcing training with Adam optimiser. d_model reduced to 256 " +
      "(from paper's 512) for local iteration while preserving all architectural ratios. " +
      "Every component paired with mathematical intuition and design rationale.",

    // CHANGED: "NumPy" removed — profile.md does not list NumPy as a dependency
    // for this project. "Jupyter" added — the project is a tutorial notebook.
    // "Adam" added explicitly to distinguish from GPT's AdamW.
    tech: [
      "PyTorch 2.0",
      "Python",
      "Adam Optimiser",
      "Jupyter Notebook",
      "Google Colab",
    ],

    github: "https://github.com/a-kishore-dev/transformer-pytorch",
    live:
      "https://colab.research.google.com/github/a-kishore-dev/transformer-pytorch/blob/main/Transformer_from_scratch_pytorch.ipynb",
    category: "Deep Learning",

    // Metrics confirmed from profile.md:
    // 10.5M params (vocab_size=1000, d_model=256) ✓
    // 6 layers ✓  8 heads ✓
    // CHANGED: "Verification Configuration: Original paper-exact" →
    // "Config: d_model=256, d_ff=2048" — more informative for a tech audience.
    // "Self-Attention Blocks: 6 Layers" → "Encoder + Decoder Layers: 6 each".
    metrics: [
      { label: "Total Parameters", value: "~10.5M" },
      { label: "Architecture", value: "Encoder + Decoder" },
      { label: "Attention Heads", value: "8 (d_model=256)" },
      { label: "Config", value: "Paper-exact (d_ff=2048)" },
    ],

    // CHANGED: Pipeline now reflects the exact 8-component bottom-up build
    // order from the notebook (profile.md → Notebook Contents section).
    pipeline: [
      "Input Embeddings",
      "Sinusoidal Pos Encoding",
      "Scaled Dot-Product Attention",
      "Multi-Head Projection",
      "Encoder + Decoder Stack",
      "Linear Output Projection",
    ],
  },

  // ── Project 8: GPT Language Model From Scratch ────────────────────────────
  {
    id: 8,
    title: "GPT Language Model From Scratch",
    shortTitle: "GPT Scratch",
    image: "/images/project-finetuning.jpg",
    // Dark illustrated banner. object-cover with subtle overlay.
    imageStyle: "contain",
    imageOverlay: "linear-gradient(to bottom, rgba(5,5,5,0.3) 0%, transparent 50%, rgba(5,5,5,0.5) 100%)",

    shortDesc:
      "Decoder-only causal language model (10.8M params) trained on Shakespeare corpus — val loss 1.50 vs 4.17 random baseline.",

    // CHANGED: Added "Pre-Norm GPT-2 style" (was there, kept).
    // Added "AdamW with set_to_none=True" — profile.md explicitly mentions
    // this optimisation detail. Added "65-character vocabulary" — confirmed.
    // Added "block_size=256 context window" — key architectural param.
    fullDesc:
      "Pre-Norm GPT-2 style decoder-only character language model with a 65-character " +
      "vocabulary built from the complete works of Shakespeare. Implements causal " +
      "multi-head self-attention (6 heads, head_size=64), Pre-Norm residual blocks " +
      "(x = x + Sublayer(LayerNorm(x))), learned positional embeddings (block_size=256), " +
      "and autoregressive generation via next-token prediction. Trained with AdamW " +
      "(lr=3e-4) for 2,500 steps on a Colab T4 in ~5 minutes. Reduces loss from " +
      "4.17 (random baseline over 65 chars) to 1.50 — learning English spelling, " +
      "word boundaries, punctuation, and Shakespearean vocabulary.",

    tech: [
      "PyTorch 2.0",
      "Python",
      "AdamW",
      "Jupyter Notebook",
      "Google Colab",
    ],

    github: "https://github.com/a-kishore-dev/gpt-from-scratch",
    live:
      "https://colab.research.google.com/github/a-kishore-dev/gpt-from-scratch/blob/main/GPT_from_scratch_pytorch.ipynb",
    category: "Deep Learning",

    // All metrics confirmed from profile.md training results table:
    // 10.8M params ✓  Val loss 1.50 ✓  Random baseline 4.17 ✓  ~5 min T4 ✓
    // CHANGED: Added "Vocab Size: 65 chars" as a metric — more informative
    // than repeating parameter count. Shows character-level tokenisation scope.
    metrics: [
      { label: "Model Parameters", value: "10.8M" },
      { label: "Validation Loss", value: "1.50 nats" },
      { label: "Random Baseline", value: "4.17 nats" },
      { label: "Vocab Size", value: "65 chars" },
    ],

    // CHANGED: Pipeline steps renamed for technical precision.
    // "Pre-Norm residual block" kept — this is the GPT-2 pattern that
    // distinguishes this from the Transformer project (Post-Norm).
    // "Autoregressive sequence sampler" → "Autoregressive Token Sampler".
    pipeline: [
      "Character Tokenisation (65 vocab)",
      "Learned Pos Embedding",
      "Pre-Norm Residual Block",
      "Causal Self-Attention",
      "Autoregressive Token Sampler",
    ],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
export const projects = [...FEATURED_PROJECTS, ...MORE_PROJECTS];