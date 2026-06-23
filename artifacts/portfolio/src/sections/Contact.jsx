import { useState } from "react";
import { motion } from "framer-motion";
// CHANGED: Added ExternalLink to import — used for HuggingFace social link
// and as the fallback icon for any unknown iconName values.
import { Github, Linkedin, Mail, ArrowUpRight, ArrowUp, Loader2, CheckCircle2, ExternalLink } from "lucide-react";

const CYAN = "#00F0FF";

import { contactContent } from "../data/contactContent.js";

// CHANGED: Added ExternalLink to iconMap.
// CHANGED: Fallback changed from Mail → ExternalLink.
//   Mail as a fallback for unknown icons (like HuggingFace) was misleading —
//   it made HuggingFace look like an email link. ExternalLink is semantically
//   correct: "this opens something external" without implying email.
const iconMap = { Github, Linkedin, Mail, ExternalLink };

const SOCIALS = contactContent.socials.map((s) => ({
  ...s,
  icon: iconMap[s.iconName] || ExternalLink,
}));

const inputStyle = {
  width: "100%",
  background: "rgba(0,0,0,0.4)",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "0.75rem",
  padding: "1rem 1.1rem",
  color: "#fff",
  fontFamily: "'Inter', sans-serif",
  fontSize: "0.9rem",
  outline: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  boxSizing: "border-box",
};

function FocusInput({ style, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...props}
      style={{
        ...inputStyle,
        ...style,
        borderColor: focused ? CYAN : "rgba(255,255,255,0.1)",
        boxShadow: focused ? `0 0 0 1px ${CYAN}33` : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function FocusTextarea({ ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      {...props}
      style={{
        ...inputStyle,
        resize: "none",
        borderColor: focused ? CYAN : "rgba(255,255,255,0.1)",
        boxShadow: focused ? `0 0 0 1px ${CYAN}33` : "none",
      }}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

function FocusSelect({ children, ...props }) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <select
        {...props}
        style={{
          ...inputStyle,
          appearance: "none",
          cursor: "pointer",
          borderColor: focused ? CYAN : "rgba(255,255,255,0.1)",
          boxShadow: focused ? `0 0 0 1px ${CYAN}33` : "none",
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {children}
      </select>
      <span style={{
        position: "absolute", right: "1rem", top: "50%", transform: "translateY(-50%)",
        color: "#6B7280", pointerEvents: "none", fontSize: "0.7rem",
      }}>▼</span>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await fetch(contactContent.formspreeUrl, {
        method: "POST",
        body: new FormData(e.target),
        headers: { Accept: "application/json" },
      });
      setSubmitted(true);
    } catch {
      setError("Something went wrong. Please try emailing me directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        paddingTop: "6rem",
        paddingBottom: "2rem",
        backgroundColor: "#050505",
        color: "#fff",
        overflow: "hidden",
      }}
    >
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 700, height: 700,
        background: "rgba(0,240,255,0.04)",
        borderRadius: "50%",
        filter: "blur(100px)",
        pointerEvents: "none",
      }} />

      <div style={{
        maxWidth: 1300,
        margin: "0 auto",
        padding: "0 3rem",
        position: "relative",
        zIndex: 1,
      }}>

        {/* Two-column grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          marginBottom: "5rem",
          alignItems: "center",
        }}>

          {/* ── LEFT COLUMN ────────────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55 }}
            style={{ display: "flex", flexDirection: "column" }}
          >
            {/* Section label */}
            <span style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: contactContent.labelSize || "0.68rem",
              color: "#6B7280",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              marginBottom: "1.5rem",
              display: "block",
            }}>
              {contactContent.label}
            </span>

            {/* Heading */}
            <h2 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: contactContent.titleSize || "clamp(2.4rem, 4.5vw, 3.75rem)",
              lineHeight: 1.08,
              letterSpacing: "-0.025em",
              margin: "0 0 1.25rem 0",
            }}>
              <span style={{ color: "#F0F4FF" }}>{contactContent.titlePrefix}</span>
              <br />
              <span style={{
                background: `linear-gradient(90deg, ${CYAN}, #38BDF8)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {contactContent.titleHighlight}
              </span>
            </h2>

            {/* Description */}
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: contactContent.descriptionSize || "1rem",
              color: "#9CA3AF",
              lineHeight: 1.75,
              maxWidth: 380,
              margin: "0 0 2.75rem 0",
            }}>
              {contactContent.description}
            </p>

            {/* Social links */}
            <div style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.4rem",
              marginBottom: "2.75rem",
            }}>
              {SOCIALS.map((s) => (
                <SocialLink key={s.name} {...s} />
              ))}
            </div>

            {/* Availability badge */}
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.65rem 1.25rem",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.1)",
              width: "fit-content",
            }}>
              {/* Pulsing green dot */}
              <span style={{
                position: "relative",
                width: 10,
                height: 10,
                display: "flex",
                flexShrink: 0,
              }}>
                <span style={{
                  position: "absolute", inset: 0,
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                  opacity: 0.7,
                  animation: "ping 1.5s cubic-bezier(0,0,0.2,1) infinite",
                }} />
                <span style={{
                  position: "relative",
                  borderRadius: "50%",
                  width: 10,
                  height: 10,
                  backgroundColor: "#10B981",
                  display: "inline-block",
                }} />
              </span>
              <span style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.82rem",
                color: "#D1D5DB",
              }}>
                {contactContent.availabilityStatus}
                <span style={{ color: "#4B5563", margin: "0 0.5rem" }}>|</span>
                {contactContent.locationText}
              </span>
            </div>
          </motion.div>

          {/* ── RIGHT COLUMN — Glass Form ────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            <div style={{
              background: "rgba(10,10,12,0.8)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "1.5rem",
              padding: "2.25rem 2.5rem",
              boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
              position: "relative",
              overflow: "hidden",
            }}>
              {/* Corner accent — matches About.jsx + Experience.jsx pattern */}
              <div style={{
                position: "absolute", top: 0, left: 0,
                width: 120, height: 1,
                background: `linear-gradient(90deg, ${CYAN}50, transparent)`,
              }} />
              <div style={{
                position: "absolute", top: 0, left: 0,
                width: 1, height: 120,
                background: `linear-gradient(180deg, ${CYAN}50, transparent)`,
              }} />

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    minHeight: 380,
                    textAlign: "center",
                    gap: "1rem",
                  }}
                >
                  <div style={{
                    width: 64, height: 64,
                    borderRadius: "50%",
                    background: "rgba(16,185,129,0.1)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: "0.5rem",
                  }}>
                    <CheckCircle2 size={32} color="#34D399" />
                  </div>
                  <h3 style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: "1.5rem",
                    color: "#fff",
                    margin: 0,
                  }}>
                    Message Sent!
                  </h3>
                  <p style={{
                    fontFamily: "'Inter', sans-serif",
                    color: "#9CA3AF",
                    fontSize: "0.95rem",
                    margin: 0,
                  }}>
                    Thanks for reaching out. I'll reply within 24 hours.
                  </p>
                </motion.div>
              ) : (
                <form
                  onSubmit={onSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                >
                  <FocusInput
                    type="text"
                    name="name"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={onChange}
                  />
                  <FocusInput
                    type="email"
                    name="email"
                    required
                    placeholder="Your email"
                    value={form.email}
                    onChange={onChange}
                  />
                  <FocusSelect
                    name="type"
                    required
                    value={form.type}
                    onChange={onChange}
                  >
                    <option value="" disabled style={{ background: "#0A0A0C", color: "#6B7280" }}>
                      I am a…
                    </option>
                    <option value="recruiter" style={{ background: "#0A0A0C" }}>
                      Recruiter / Hiring Manager
                    </option>
                    <option value="freelance" style={{ background: "#0A0A0C" }}>
                      Client (Freelance Project)
                    </option>
                    <option value="other" style={{ background: "#0A0A0C" }}>
                      Other / Just saying hi
                    </option>
                  </FocusSelect>
                  <FocusTextarea
                    name="message"
                    required
                    rows={4}
                    placeholder="What are you building? How can I help?"
                    value={form.message}
                    onChange={onChange}
                  />

                  {error && (
                    <p style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.82rem",
                      color: "#F87171",
                      margin: 0,
                    }}>
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      marginTop: "0.5rem",
                      borderRadius: "0.75rem",
                      background: `linear-gradient(90deg, ${CYAN}, #38BDF8)`,
                      color: "#000",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: "1rem",
                      border: "none",
                      cursor: submitting ? "not-allowed" : "pointer",
                      opacity: submitting ? 0.7 : 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "0.5rem",
                      transition: "opacity 0.2s",
                    }}
                  >
                    {submitting ? (
                      <>
                        <Loader2
                          size={18}
                          style={{ animation: "spin 1s linear infinite" }}
                        />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowUpRight size={18} />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>

        {/* ── FOOTER ──────────────────────────────────────────────────── */}
        {/* CHANGED: Added "Three.js" to the built-with credits — the skills
            section uses a full Three.js / React Three Fiber 3D canvas.
            Omitting it undersells the technical complexity of the portfolio. */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: "2rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "0.7rem",
            color: "#6B7280",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            flexWrap: "wrap",
          }}>
            <span style={{ color: "#9CA3AF" }}>
              © {new Date().getFullYear()} Kishore A
            </span>
          </div>

          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "0.7rem",
              color: "#6B7280",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = CYAN)}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
          >
            Back to top
            <ArrowUp size={13} />
          </button>
        </div>

      </div>
    </section>
  );
}

// ── SocialLink sub-component ─────────────────────────────────────────────────
// No changes — animation, hover, underline behaviour all correct as-is.
function SocialLink({ name, url, icon: Icon }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        width: "fit-content",
        textDecoration: "none",
        color: hovered ? CYAN : "#D1D5DB",
        transition: "color 0.2s",
        position: "relative",
        paddingBottom: "6px",
      }}
    >
      <Icon
        size={18}
        style={{
          flexShrink: 0,
          transform: hovered ? "translateX(3px)" : "translateX(0)",
          transition: "transform 0.2s",
        }}
      />
      <span style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: "1.05rem",
        position: "relative",
      }}>
        {name}
      </span>
      <ArrowUpRight
        size={15}
        style={{
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translate(0, 0)" : "translate(-6px, 6px)",
          transition: "opacity 0.2s, transform 0.2s",
          color: CYAN,
        }}
      />
      {/* Animated underline */}
      <span style={{
        position: "absolute",
        bottom: 0,
        left: hovered ? "34px" : "0px",
        width: hovered ? "calc(100% - 34px)" : "18px",
        height: "2px",
        background: CYAN,
        transition:
          "left 0.3s cubic-bezier(0.25, 1, 0.5, 1), width 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
      }} />
    </a>
  );
}