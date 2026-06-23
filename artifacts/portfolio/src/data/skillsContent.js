export const skillsContent = {
  label: "/ Skills",
  labelSize: "0.72rem",
  titlePrefix: "The Full ",
  titleHighlight: "AI Stack.",
  titleSize: "clamp(2.4rem, 4.5vw, 3.75rem)",

  // ── DEVELOPER: 3 changes required in Skills3D.jsx ─────────────────────────
  //
  //  1. Canvas height — change the canvas container className:
  //       h-[760px]  →  h-[900px]
  //
  //  2. Camera z — update in BOTH CameraController and Canvas initial prop:
  //       state.camera.position.set(0, 0, 22.0)   // CameraController (was 20.0)
  //       <Canvas camera={{ position: [0, 0, 22.0], fov: 70 }}>  // (was 20.0)
  //
  //  3. Node gap — in the useMemo node position calculation:
  //       const gap = 1.8;   // was 2.8
  //
  //  Animation cycle stays at 15.0s (6 layers × 2.5s — already correct).
  //  stepIdx = Math.floor(cycle / 2.5) — unchanged, yields 0–5.
  //
  // ── VERIFIED MATH ─────────────────────────────────────────────────────────
  //  Camera z=22, fov=70, canvas 1456×900px:
  //    Visible width:  ±15.4 units  |  safe x: ±14.3 units
  //    Visible height: ±8.6 units   |  safe y: ±8.6 units
  //  6 layers at x = [-14.3, -8.6, -2.9, 2.9, 8.6, 14.3]
  //    Spacing = 5.73 units  ✓  (min needed: 5.5)
  //  gap=1.8, max 6 nodes → top_node_y=4.5, header_y=7.0  ✓  (safe: 8.6)
  //
  // ── SHAPE: Double-peak bell curve ─────────────────────────────────────────
  //
  //  Layer 1 — Foundation:    4 nodes   •  •  •  •
  //  Layer 2 — Classical ML:  5 nodes   •  •  •  •  •
  //  Layer 3 — Deep Learning: 6 nodes   •  •  •  •  •  •  ← peak
  //  Layer 4 — LLM & RAG:    6 nodes   •  •  •  •  •  •  ← peak
  //  Layer 5 — Production:    5 nodes   •  •  •  •  •
  //  Layer 6 — Shipped:       4 nodes   •  •  •  •
  //
  //  Shape: 4|5|6|6|5|4 = 30 nodes, 136 dense synapses
  //  Two wide layers at the core = Deep Learning AND LLM/RAG equally prominent
  // ─────────────────────────────────────────────────────────────────────────

  layers: [

    // ── Layer 1: Foundation (4 nodes) ────────────────────────────────────────
    // The base everything is built on.
    // Languages, data tools, version control — prerequisites for all other layers.
    // Color: slate — neutral entry, not a specialty, a foundation.
    {
      title: ["Foundation", "& Data"],
      x: -14.33,
      color: "#94a3b8",
      nodes: [
        {
          id: "python",
          name: "Python",
          category: "Foundation & Data",
          // profile.md: primary language — ML, backend, scripting, pipelines
        },
        {
          id: "typescript-js",
          name: "TypeScript & JS",
          category: "Foundation & Data",
          // profile.md: full-stack dev; used in AstraFlow with Next.js + tRPC
        },
        {
          id: "sql-postgres",
          name: "SQL · PostgreSQL",
          category: "Foundation & Data",
          // profile.md: relational data modelling, query optimisation,
          // PostgreSQL (AstraFlow), SQLite (AstraStudio, MLflow)
        },
        {
          id: "pandas-polars",
          name: "Pandas · Polars",
          category: "Foundation & Data",
          // profile.md: Polars on 307K records (Loan Default);
          // Pandas across all ML/data projects
        },
      ],
    },

    // ── Layer 2: Classical ML (5 nodes) ──────────────────────────────────────
    // Where the ML fundamentals live — gradient boosting, experiment tracking,
    // explainability, CV pipelines. Proven in production (SafeBite, Loan Default).
    // Color: teal — structured, analytical, clean.
    {
      title: ["Classical", "ML"],
      x: -8.6,
      color: "#00e5c8",
      nodes: [
        {
          id: "scikit-learn",
          name: "Scikit-learn",
          category: "Classical ML",
          // profile.md: classification, regression, ensemble methods,
          // hyperparameter search (RandomizedSearchCV)
        },
        {
          id: "lgbm-xgb",
          name: "LightGBM · XGBoost",
          category: "Classical ML",
          // profile.md: LightGBM best model at ROC-AUC 0.7662 on 307K records
          // gradient boosting with scale_pos_weight for class imbalance
        },
        {
          id: "catboost",
          name: "CatBoost",
          category: "Classical ML",
          // profile.md: used in 6-model comparison (Loan Default project)
        },
        {
          id: "shap",
          name: "SHAP Explainability",
          category: "Classical ML",
          // profile.md: SHAP summary plots + waterfall plots
          // income, age, credit history identified as top predictors
        },
        {
          id: "mlflow",
          name: "MLflow",
          category: "Classical ML",
          // profile.md: experiment tracking, metric logging, artifact storage,
          // model registry, UI dashboards — used in Loan Default project
        },
      ],
    },

    // ── Layer 3: Deep Learning (6 nodes) ─────────────────────────────────────
    // First peak — where Kishore goes deepest technically.
    // Built Transformer + GPT from scratch. Fine-tuned 3B param LLMs.
    // Computer vision for NeuroBlink (MozoHack Top 10).
    // Color: blue — depth, weights, neural architectures.
    {
      title: ["Deep", "Learning"],
      x: -2.87,
      color: "#3b82f6",
      nodes: [
        {
          id: "pytorch",
          name: "PyTorch",
          category: "Deep Learning",
          // profile.md: custom model implementation, training loops,
          // mixed-precision training, gradient management
        },
        {
          id: "tensorflow",
          name: "TensorFlow",
          category: "Deep Learning",
        },
        {
          id: "transformer-arch",
          name: "Transformer Arch",
          category: "Deep Learning",
          // profile.md: MHA, sinusoidal PE, Pre/Post-Norm, causal masking,
          // encoder-decoder, decoder-only — built both from scratch
        },
        {
          id: "qlora-peft",
          name: "QLoRA · PEFT",
          category: "Deep Learning",
          // profile.md: Llama 3.2 3B fine-tuned; +191.82% ROUGE-1;
          // 24.3M of 3.21B params trained (0.75%); Unsloth fused kernels
        },
        {
          id: "opencv-mediapipe",
          name: "OpenCV · MediaPipe",
          category: "Deep Learning",
          // profile.md: Eye Aspect Ratio (EAR) blink detection in NeuroBlink
          // YOLOv5 object detection; facial landmark tracking
        },
        {
          id: "huggingface",
          name: "HuggingFace",
          category: "Deep Learning",
          // profile.md: Transformers, PEFT, TRL, datasets, SFTTrainer;
          // published model: A-Kishore/llama-3.2-3b-text2sql
        },
      ],
    },

    // ── Layer 4: LLM & RAG (6 nodes) ─────────────────────────────────────────
    // Second peak — Kishore's primary application domain.
    // Framework expertise + vector retrieval + evaluation.
    // Every LLM app project lives here.
    // Color: purple — language models, intelligence, orchestration.
    {
      title: ["LLM &", "RAG"],
      x: 2.87,
      color: "#a855f7",
      nodes: [
        {
          id: "langchain-lcel",
          name: "LangChain · LCEL",
          category: "LLM & RAG",
          // profile.md: chain composition, RAG pipelines, memory management,
          // dynamic prompt templating, document ingestion, streaming
        },
        {
          id: "langgraph-crewai",
          name: "LangGraph · CrewAI",
          category: "LLM & RAG",
          // profile.md: stateful multi-agent graphs (LangGraph);
          // CrewAI crew definition, task assignment, tool integration (AstraStudio)
        },
        {
          id: "llamaindex",
          name: "LlamaIndex",
          category: "LLM & RAG",
          // profile.md: Production RAG System — hybrid retrieval,
          // multi-stage pipelines, RAGAS 4.9/5.0 system score
        },
        {
          id: "vector-dbs",
          name: "Qdrant · ChromaDB · FAISS",
          category: "LLM & RAG",
          // profile.md: Qdrant (Production RAG), ChromaDB per-bot isolation
          // (Chatbot Builder), FAISS in-memory ANN search
        },
        {
          id: "hybrid-hyde",
          name: "BM25 · HyDE · Rerank",
          category: "LLM & RAG",
          // profile.md: BM25 + dense hybrid retrieval, HyDE query enhancement
          // (Groq/Llama 3.1 8B), CrossEncoder reranking; Context Recall 1.0
        },
        {
          id: "ragas-langsmith",
          name: "RAGAS · LangSmith",
          category: "LLM & RAG",
          // profile.md: RAGAS automated eval (Faithfulness 94.55%, Precision
          // 97.22%, Recall 100%, Relevancy 86.97%); LangSmith full observability
        },
      ],
    },

    // ── Layer 5: Production & Cloud (5 nodes) ─────────────────────────────────
    // Tapering — deployment, cloud infra, full-stack, observability.
    // Turns models into running, monitored, live applications.
    // Color: green — live, shipped, operational.
    {
      title: ["Production", "& Cloud"],
      x: 8.6,
      color: "#22c55e",
      nodes: [
        {
          id: "cloud-platforms",
          name: "AWS · GCP · Azure",
          category: "Production & Cloud",
          // profile.md: AWS Academy certified (EC2, S3, Lambda, SageMaker);
          // GCP (Vertex AI, BigQuery, Cloud Run); Azure ML, Azure OpenAI
        },
        {
          id: "flask-streamlit",
          name: "Flask · Streamlit",
          category: "Production & Cloud",
          // profile.md: Flask REST APIs (SafeBite, NeuroBlink);
          // Streamlit (Production RAG, Chatbot Builder, AstraStudio)
        },
        {
          id: "nextjs-trpc",
          name: "Next.js · tRPC",
          category: "Production & Cloud",
          // profile.md: AstraFlow — Next.js App Router, tRPC end-to-end
          // type-safe APIs, Vercel AI SDK, TanStack Query, Jotai
        },
        {
          id: "docker-inngest",
          name: "Docker · Inngest",
          category: "Production & Cloud",
          // profile.md: Docker (containerisation, sandboxed code execution);
          // Inngest (DAG-based workflow execution engine in AstraFlow)
        },
        {
          id: "prisma-wandb",
          name: "Prisma · W&B",
          category: "Production & Cloud",
          // profile.md: Prisma ORM (AstraFlow PostgreSQL schema);
          // Weights & Biases (live loss curves during QLoRA fine-tuning)
        },
      ],
    },

    // ── Layer 6: Shipped Systems (4 nodes) ────────────────────────────────────
    // Narrow output — the actual deployed artifacts.
    // Named as system types with real proof links.
    // Color: orange — live, proven, measurable.
    {
      title: ["Shipped", "Systems"],
      x: 14.33,
      color: "#ea580c",
      nodes: [
        {
          id: "production-rag-out",
          name: "Production RAG",
          category: "Shipped Systems",
          // RAGAS 4.9/5.0 → rag-system-pro.streamlit.app
        },
        {
          id: "finetuned-llm-out",
          name: "Fine-Tuned LLMs",
          category: "Shipped Systems",
          // +191.82% ROUGE-1 → huggingface.co/A-Kishore/llama-3.2-3b-text2sql
        },
        {
          id: "agentic-platforms-out",
          name: "Agentic Platforms",
          category: "Shipped Systems",
          // AstraFlow (Vercel) + AstraStudio (Streamlit Cloud) — both live
        },
        {
          id: "ml-products-out",
          name: "ML Products",
          category: "Shipped Systems",
          // SafeBite 99% F1 (Render) · Loan Default 0.7662 ROC-AUC
          // NeuroBlink (MozoHack Top 10) · Custom Chatbot Builder (Streamlit)
        },
      ],
    },

  ],
};