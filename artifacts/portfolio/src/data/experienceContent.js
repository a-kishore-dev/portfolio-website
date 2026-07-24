export const experienceContent = {
  label: "/ RESUME",
  labelSize: "0.72rem",
  titlePrefix: "The Path ",
  titleHighlight: "& Proof.",
  titleSize: "clamp(2.4rem, 4.5vw, 3.75rem)",

  items: [

    // ── Card 1: Infosys Springboard ───────────────────────────────────────
    // CHANGE: Description trimmed from 4 sentences → 2 tight sentences.
    // The pipeline trace already shows the technical steps - no need to
    // narrate them in prose as well. Cut the redundancy, keep the outcome.
    {
      category: "Professional Experience  ·  Oct – Nov 2024",
      title: "Infosys Springboard",
      subtitle: "AI / ML Engineering Intern  ·  Remote",
      metricLabel: "Classifier F1-Score",
      metricValue: "99%",

      description:
        "Built SafeBite end-to-end - an AI-powered food allergen detection system " +
        "deployed live on Render. Engineered the full pipeline from EDA through " +
        "Leave-One-Out encoding, Random Forest training (99% F1), Flask REST API, " +
        "and an interactive Streamlit front-end.",

      pipelineLabel: "SafeBite Prediction Pipeline",
      pipelineSteps: [
        "Ingredient Data Input",
        "Leave-One-Out Encoding",
        "Random Forest Classifier",
        "Flask REST API (Render)",
        "Streamlit UI (Live)",
      ],

      links: {
        live: "https://safebite-551h.onrender.com/",
        github: "https://github.com/AabidMK/SafeBite_Infosys_Internship_Oct2024",
      },
      tech: ["Python", "Pandas", "Scikit-learn", "Flask", "Streamlit", "Joblib", "Render"],
    },

    // ── Card 2: Education ─────────────────────────────────────────────────
    // CHANGE: Prose replaced with a 4-node inline timeline.
    // The Ukraine story is too important to bury in a paragraph - a timeline
    // makes each beat scannable and visually distinct. Same information,
    // half the words, 3× more readable. The final note ("ship real things")
    // is kept as a single closing line under the timeline - it lands harder
    // when it's not surrounded by other sentences.
    {
      category: "Education  ·  Graduated May 2026",
      title: "Panimalar Engineering College",
      subtitle: "B.Tech - Artificial Intelligence & Data Science  ·  Nov 2022 – May 2026",
      metricLabel: "Academic Performance",
      metricValue: "8.67 / 10 CGPA",

      // description intentionally omitted - timeline tells the story
      description: null,

      // New field: rendered as a vertical mini-timeline inside the card
      // before the closing note. Developer renders this as 4 rows with
      // a year badge + event text.
      timeline: [
        {
          year: "2020",
          event: "Completed 12th grade. Began NEET preparation for a medical career.",
        },
        {
          year: "Feb 2022",
          event:
            "Secured MBBS admission in Ukraine. Arrived - three days before Russia's " +
            "full-scale invasion (Feb 24, 2022).",
        },
        {
          year: "Mar 2022",
          event:
            "Evacuated after two weeks. Returned to India. Waited for the situation " +
            "to stabilise - it didn't.",
        },
        {
          year: "Nov 2022",
          event:
            "Pivoted entirely. Enrolled in B.Tech - AI & Data Science. " +
            "Graduated May 2026: CGPA 8.67, 8 deployed projects, 1 published LLM.",
        },
      ],

      // Closing note rendered below the timeline as italic text
      closingNote:
        "The experience of rebuilding from zero shaped one principle: " +
        "ship real things rather than wait for perfect conditions.",

      institution: "Panimalar Engineering College Chennai City Campus",
      affiliation: "Anna University",
      status: "Graduated May 2026 - available immediately",
    },

    // ── Card 3: Certifications ────────────────────────────────────────────
    // CHANGE: Intro paragraph removed entirely. It was explaining what the
    // grid below already shows - pure redundancy. The subtitle
    // ("Harvard · DeepLearning.AI · AWS Academy") sets enough context.
    // Cert descriptions trimmed to one sharp sentence each - the second
    // sentence in each was restating the title. Cut it.
    {
      category: "Verified Certifications  ·  2022 – 2024",
      title: "Technical Certifications",
      subtitle: "Harvard University  ·  DeepLearning.AI  ·  AWS Academy",
      metricLabel: "Completed",
      metricValue: "5 Certifications",

      // description removed - grid is self-explanatory with the subtitle context
      description: null,

      certifications: [
        {
          title: "CS50's Introduction to Computer Science",
          desc:
            "Harvard University - Algorithms, data structures, C, Python, SQL. " +
            "The engineering fundamentals foundation.",
        },
        {
          title: "Machine Learning Specialization",
          desc:
            "DeepLearning.AI (Andrew Ng) - Supervised & unsupervised learning, " +
            "regularisation, decision trees, and neural net basics.",
        },
        {
          title: "Deep Learning Specialization",
          desc:
            "DeepLearning.AI (Andrew Ng) - CNNs, RNNs, LSTMs, optimisation. " +
            "Direct prerequisite to implementing Transformers from scratch.",
        },
        {
          title: "Natural Language Processing Specialization",
          desc:
            "DeepLearning.AI - Attention mechanisms, Transformer architectures, " +
            "sequence models, and word embeddings.",
        },
        {
          title: "AWS Academy Cloud Foundations",
          desc:
            "AWS Academy Graduate - EC2, S3, Lambda, IAM, CloudWatch, SageMaker. " +
            "Cloud infrastructure for production ML deployment.",
        },
      ],
    },

    // ── Card 4: Achievements ──────────────────────────────────────────────
    // CHANGE: Intro description paragraph removed. It summarised both
    // achievements in 3 sentences before the grid showed them in detail —
    // the visitor was reading the same content twice. The two achievement
    // entries carry the full story on their own.
    // Achievement descriptions trimmed: MozoHack entry was 5 sentences,
    // now 3 - the tech detail list (26 chars + 10 digits, 6-bit sequences)
    // is too granular for a resume card; belongs in the project section.
    {
      category: "Competitive Recognition  ·  2024 – 2025",
      title: "Achievements & Recognition",
      subtitle: "Global Rank  ·  National Finalist",
      metricLabel: "Best Rank",
      metricValue: "Global #4,869",

      // description removed - achievement entries are self-contained
      description: null,

      achievements: [
        {
          title: "TCS CodeVita Season 12  ·  2024",
          desc:
            "Global Rank 4,869 - Top 5% among 100,000+ participants worldwide. " +
            "One of the world's largest programming competitions, testing " +
            "algorithmic thinking and problem-solving under timed constraints.",
        },
        {
          title: "MozoHack 6.0  ·  SRMKZILLA, SRM University  ·  2025",
          desc:
            "Top 10 Finalist out of 250+ teams. Built NeuroBlink - an AI system " +
            "translating eye-blink patterns into Morse code for hands-free " +
            "communication for people with motor disabilities. Contributed the " +
            "blink detection pipeline (OpenCV + MediaPipe, EAR algorithm) and " +
            "Gemini LLM chat integration via Flask API.",
        },
      ],
    },

  ],

  resumePdfUrl: "https://drive.google.com/file/d/1OjZucKudv7H_hteObaqQgENp3cs8JgH3/view?usp=sharing",
};
