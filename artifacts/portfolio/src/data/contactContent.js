export const contactContent = {
  label: "/ Contact",
  labelSize: "0.68rem",

  // CHANGED: "Let's Build Something." → "Let's Build Something Real."
  // "Let's Build Something" is the most common contact section title in
  // developer portfolios — generic to the point of invisible.
  // "Real" is a direct pull from profile.md's core positioning:
  // "not as academic exercises, but as deployed, working software."
  // One word that signals the same thing as a paragraph.
  titlePrefix: "Let's Build ",
  titleHighlight: "Something Real.",
  titleSize: "clamp(2.4rem, 4.5vw, 3.75rem)",

  // CHANGED: Rewritten from scratch.
  // Original: "Open to full-time AI/ML Engineering roles and freelance
  //   opportunities. Drop a message and I'll get back to you."
  //   → Passive, generic, adds nothing a recruiter doesn't already know
  //     from reading the page.
  // New version: leads with the most important fact (available NOW),
  //   names the exact roles, and ends with the action — not the invite.
  // Source: profile.md → "available to join immediately" +
  //   "actively seeking full-time roles in AI Engineering, ML Engineering,
  //   or GenAI"
  description:
    "Graduated May 2026 · available immediately. " +
    "Looking for full-time roles in AI Engineering, ML Engineering, or GenAI. " +
    "If you're building something real with AI — let's talk.",

  descriptionSize: "1rem",

  // Formspree URL unchanged — functional, keep as-is
  formspreeUrl: "https://formspree.io/f/xrevnzna",

  // CHANGED: "Open to opportunities" → specific and immediate.
  // Source: profile.md Fast-Facts Block → "Status: Graduated — available
  // for full-time roles immediately"
  availabilityStatus: "Available immediately",

  // Location unchanged — correct per profile.md
  locationText: "Based in Bengaluru, India",

  // CHANGED: Added HuggingFace — present in profile.md header, terminal
  //   contact command, and Proof of Work block. Was missing here.
  // CHANGED: Email social name from full address string →  "Email"
  //   The full address "a.kishore.dev@gmail.com" as a nav label is
  //   redundant (the icon already signals it's email) and breaks visual
  //   consistency with the other single-word labels (GitHub, LinkedIn).
  //   The actual address is still in the url field.
  socials: [
    {
      name: "GitHub",
      url: "https://github.com/a-kishore-dev",
      iconName: "Github",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/kishore-ai",
      iconName: "Linkedin",
    },
    {
      name: "HuggingFace",
      url: "https://huggingface.co/A-Kishore",
      iconName: "ExternalLink",
      // Note: lucide-react doesn't have a HuggingFace icon.
      // Use "ExternalLink" or "Bot" as the closest semantic match,
      // or swap in a custom SVG component for the HF logo.
    },
    {
      name: "Email",
      url: "mailto:a.kishore.dev@gmail.com",
      iconName: "Mail",
    },
  ],
};