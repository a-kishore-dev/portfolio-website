export const terminalContent = {
  label: "/ Terminal",
  labelSize: "0.72rem",
  titlePrefix: "Curious? ",
  titleHighlight: "Ask me anything.",
  titleSize: "clamp(2.4rem, 4.5vw, 3.75rem)",

  bootSteps: [
    { text: "Initializing portfolio.sh...", delay: 500 },
    { text: "Loading project database...  [██████████] 100%", delay: 1100 },
    { text: "Systems online. Type 'help' to begin.", delay: 700 },
  ],

  commands: {

    // ── help ────────────────────────────────────────────────────────────────
    // CHANGED: Added 'story' command for the Ukraine/career background.
    // Added 'clear' label description. Widened box to accommodate new command.
    help: `┌─ Available Commands ───────────────────────────────┐
│  about      Who I am & what I build               │
│  projects   All 10 projects with metrics          │
│  skills     Full technical stack                  │
│  stats      Key engineering metrics               │
│  contact    Email, GitHub, LinkedIn, HF           │
│  hire       Availability & role preferences       │
│  story      The non-linear path here              │
│  whoami     Quick dev profile                     │
│  clear      Clear terminal output                 │
│  easter_egg ???                                   │
└────────────────────────────────────────────────────┘`,

    // ── about ───────────────────────────────────────────────────────────────
    // CHANGED: "graduation May 2026" → "Graduated May 2026" (past tense — done)
    // CHANGED: Removed "GenAI Specialist" — not in profile.md positioning.
    //   Profile says "AI/ML Engineer" consistently.
    // CHANGED: Added the core differentiator: Transformer + GPT from scratch,
    //   QLoRA fine-tuning — what makes Kishore technically distinctive.
    about: `Kishore A — AI / ML Engineer based in Bengaluru, India.
Graduated May 2026 · B.Tech in AI & Data Science · CGPA 8.67.

I build production-grade LLM systems, multi-agent pipelines, and end-to-end
ML products — not as academic exercises, but as deployed, working software.

What makes me different: I understand the internals.
Built a full Transformer (Vaswani et al., 2017) and a GPT-style decoder-only
LM from scratch in PyTorch — then fine-tuned Llama 3.2 3B with QLoRA
achieving +191.82% ROUGE-1 over baseline on a free T4 GPU.

Type 'projects' to see what ships. Type 'stats' for the numbers.`,

    // ── projects ─────────────────────────────────────────────────────────────
    // CHANGED: "Multi-tenant" → "Multi-bot" (accurate per platform design)
    // CHANGED: Added SafeBite (internship, deployed on Render, 99% F1)
    // CHANGED: Added NeuroBlink (MozoHack Top 10, real project with GitHub)
    // CHANGED: Count updated from 8 → 10 projects
    // CHANGED: Column widths balanced so all entries align cleanly
    projects: `┌─ All Projects & Proof of Work ───────────────────────────────────────────┐
│                                                                           │
│  DEPLOYED & LIVE                                                          │
│  1. Production RAG System    RAGAS 4.9/5.0 · HyDE · BM25 · LlamaIndex   │
│  2. AstraFlow                n8n-like · Inngest DAG · Next.js · tRPC     │
│  3. AstraStudio              CrewAI fork · Fernet Vault · MCP · DocLing  │
│  4. Custom Chatbot Builder   Multi-bot · LangChain · ChromaDB · LangSmith│
│  5. SafeBite (Internship)    99% F1 · Random Forest · Flask · Render     │
│                                                                           │
│  MODELS & ML                                                              │
│  6. Text-to-SQL QLoRA        +191.82% ROUGE-1 · Llama 3.2 · Unsloth     │
│  7. Loan Risk Predictor      ROC-AUC 0.7662 · LightGBM · 307K records   │
│                                                                           │
│  RESEARCH & FOUNDATIONS                                                   │
│  8. Transformer from Scratch 10.5M params · Paper-exact · PyTorch        │
│  9. GPT from Scratch         10.8M params · Pre-Norm · val loss 1.50     │
│                                                                           │
│  HACKATHON                                                                │
│ 10. NeuroBlink               MozoHack Top 10/250+ · Blink→Morse · Gemini │
│                                                                           │
└───────────────────────────────────────────────────────────────────────────┘`,

    // ── skills ───────────────────────────────────────────────────────────────
    // CHANGED: Added [Cloud] row — AWS · GCP · Azure (profile.md cloud section)
    // CHANGED: Added [Vision] row — OpenCV · MediaPipe · YOLOv5 (NeuroBlink + profile)
    // CHANGED: Added Prisma · SQLAlchemy · PostgreSQL to [Databases] new row
    // CHANGED: [APIs/Deploy] expanded with Docker (moved from MLOps)
    // CHANGED: [MLOps] now focused on tracking/observability tools
    // CHANGED: Twilio · PyWhatKit added under [APIs/Deploy] (NeuroBlink)
    skills: `[Languages]   Python · TypeScript · JavaScript · SQL
[Deep Learn]  PyTorch · TensorFlow · Transformer Internals · QLoRA · PEFT
[Vision]      OpenCV · MediaPipe · YOLOv5 · EAR Blink Detection
[Classic ML]  Scikit-learn · LightGBM · XGBoost · CatBoost · SHAP
[GenAI/LLMs]  LangChain (LCEL) · LangGraph · LlamaIndex · CrewAI · Unsloth
[RAG Stack]   Qdrant · ChromaDB · FAISS · BM25 · HyDE · CrossEncoder · RAGAS
[Cloud]       AWS (EC2 · S3 · Lambda · SageMaker) · GCP (Vertex AI) · Azure ML
[Databases]   PostgreSQL · SQLite · Prisma ORM · SQLAlchemy
[MLOps]       MLflow · Weights & Biases · LangSmith · RAGAS · DVC
[APIs/Deploy] Next.js · tRPC · Inngest · Flask · Streamlit · Docker
[Messaging]   Twilio API · PyWhatKit · WhatsApp integration
[Security]    AES-256 · Fernet encryption · Bcrypt · Better Auth`,

    // ── stats ────────────────────────────────────────────────────────────────
    // CHANGED: Added "Params Trained (QLoRA)" metric — key efficiency signal
    // CHANGED: Added "MozoHack 6.0" hackathon achievement
    // CHANGED: "Allergen F1-score" label cleaned (removed redundant "Infosys" note)
    // CHANGED: "B.Tech GPA" → "B.Tech CGPA" consistent with profile.md
    // CHANGED: Aligned arrow column for cleaner mono rendering
    stats: `┌─ Key Metrics & Demonstrated Outcomes ──────────────────────────────────┐
│                                                                         │
│  RAG — Context Recall    →  1.0000  (Perfect retrieval coverage)       │
│  RAG — System Health     →  4.9 / 5.0  (RAGAS evaluation)             │
│  RAG — Faithfulness      →  94.55%                                     │
│  RAG — Context Precision →  97.22%                                     │
│                                                                         │
│  Text-to-SQL ROUGE-1     →  +191.82%  over Llama 3.2 3B base          │
│  Text-to-SQL ROUGE-2     →  +258.73%  (SQL clause sequencing)         │
│  Params Trained (QLoRA)  →  0.75%  of 3.21B  (24.3M trainable)       │
│                                                                         │
│  Allergen Classifier F1  →  99%   (SafeBite · Infosys internship)     │
│  Loan Predictor ROC-AUC  →  0.7662  (LightGBM · 307,511 records)     │
│                                                                         │
│  B.Tech CGPA             →  8.67 / 10.0                               │
│  TCS CodeVita Season 12  →  Global Rank 4,869  (Top 5% · 100K+)      │
│  MozoHack 6.0            →  Top 10 Finalist  (250+ teams)             │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘`,

    // ── contact ──────────────────────────────────────────────────────────────
    // No changes — content was accurate. Minor formatting cleanup.
    contact: `  Email       →  a.kishore.dev@gmail.com
  GitHub      →  github.com/a-kishore-dev
  LinkedIn    →  linkedin.com/in/kishore-ai
  HuggingFace →  huggingface.co/A-Kishore
  Location    →  Bengaluru, India  ·  Open to Remote`,

    // ── hire ─────────────────────────────────────────────────────────────────
    // CHANGED: "MLOps" removed from Domain — not Kishore's primary positioning.
    //   Profile.md: "AI Engineering, ML Engineering, GenAI" are the target roles.
    //   "Full-Stack AI" added — reflects AstraFlow/AstraStudio scope.
    // CHANGED: Added Location line — missing from original.
    // CHANGED: Added preferred stack signal for recruiters.
    hire: `╔══════════════════════════════════════════════════════════╗
║  Status    : [ OPEN TO OPPORTUNITIES ]                   ║
║  Available : Immediately — graduated May 2026             ║
║  Roles     : AI Engineering · ML Engineering · GenAI     ║
║  Also open : Full-Stack AI products                       ║
║  Location  : Bengaluru, India · Open to Remote           ║
║  Stack     : LangChain · PyTorch · LlamaIndex · Next.js  ║
╚══════════════════════════════════════════════════════════╝
→  Run 'contact' to reach out directly.`,

    // ── story ────────────────────────────────────────────────────────────────
    // NEW COMMAND: The Ukraine/career pivot story — too distinctive to leave
    // out of the terminal. Short, punchy, chronological.
    story: `The non-linear path to AI engineering:

  2020        Completed 12th grade. Started NEET prep for medicine.
  Feb 2022    Secured MBBS admission in Ukraine. Arrived.
              Three days later — Russia invaded (Feb 24, 2022).
  Mar 2022    Evacuated after two weeks. Returned to India.
              Waited for the situation to normalise.
              It didn't.
  Nov 2022    Pivoted entirely. Enrolled in B.Tech — AI & Data Science.
  May 2026    Graduated. CGPA 8.67. 10 projects. 1 published LLM.

  One principle from rebuilding from zero:
  ship real things rather than wait for perfect conditions.`,

    // ── whoami ───────────────────────────────────────────────────────────────
    // CHANGED: Complete rewrite. Was 3 generic lines — told nothing specific.
    // Now surfaces the three most distinctive technical facts about Kishore
    // in a quick-scan format that a technical recruiter will remember.
    whoami: `  Name     :  Kishore A
  Role     :  AI / ML Engineer
  Location :  Bengaluru, India

  Core     :  LLM Engineering · RAG Systems · Fine-Tuning · Multi-Agent AI
  Built    :  Transformer + GPT from scratch in PyTorch (paper-exact)
  Shipped  :  Fine-tuned Llama 3.2 3B → +191% ROUGE-1 · published on HF Hub
  Deployed :  5 live apps · 1 HuggingFace model · 10 projects total
  Proof    :  github.com/a-kishore-dev

  Available immediately. Type 'hire' for details.`,

    // ── easter_egg ───────────────────────────────────────────────────────────
    // CHANGED: ASCII network expanded — 3×3 grid looked like a tic-tac-toe
    //   board, not a neural network. New version has 3 proper layers with
    //   varying node counts (3→4→2) to look like an actual architecture.
    // CHANGED: Quote updated — Clarke quote was generic tech.
    //   New quote is Hinton, directly about neural networks and learning.
    //   More on-brand for an AI engineer who built these from scratch.
    easter_egg: `
  You found it.

  ┌──────────┐   ┌──────────┐   ┌──────────┐
  │  INPUT   │   │  HIDDEN  │   │  OUTPUT  │
  │          │   │          │   │          │
  │    ●     │──▶│    ●     │──▶│    ●     │
  │    ●     │──▶│    ●     │──▶│    ●     │
  │    ●     │──▶│    ●     │   │          │
  │          │   │    ●     │   │          │
  └──────────┘   └──────────┘   └──────────┘
  [ 3 nodes  ]   [ 4 nodes  ]   [ 2 nodes  ]

  "The brain has no knowledge until connections
   are built through experience."
                        — Geoffrey Hinton

  [ easter egg: 1 of 1 · well done ]`,
  }
};