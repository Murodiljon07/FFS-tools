"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import {
  Download,
  User,
  Briefcase,
  Mail,
  Phone,
  Code,
  GraduationCap,
  Award,
  Languages,
  MapPin,
  RefreshCw,
  Eye,
  FileText,
  Palette,
  Camera,
  X,
  ChevronDown,
  ChevronUp,
  Undo2,
  RotateCcw,
  Grid3x3,
} from "lucide-react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRouter } from "next/navigation";

// ─── Types ────────────────────────────────────────────────────────────────────

interface CVData {
  name: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  website: string;
  summary: string;
  experience: string;
  skills: string;
  projects: string;
  education: string;
  certifications: string;
  languages: string;
  interests: string;
  photo: string;
}

interface DesignSettings {
  primaryColor: string;
  headerTextColor: string;
  bgColor: string;
  cardBg: string;
  textColor: string;
  skillBg: string;
  skillText: string;
  layout: "modern" | "sidebar" | "classic" | "minimal";
  photoShape: "circle" | "square" | "rounded";
  photoPosition: "header" | "sidebar" | "none";
  fontSize: "sm" | "md" | "lg";
  fontFamily: string;
  sectionSpacing: "tight" | "normal" | "loose";
  showBorder: boolean;
  showShadow: boolean;
  showDividers: boolean;
  sectionTitleStyle: "underline" | "background" | "left-bar" | "uppercase";
}

// ─── Defaults ────────────────────────────────────────────────────────────────

const EMPTY: CVData = {
  name: "",
  jobTitle: "",
  email: "",
  phone: "",
  location: "",
  linkedin: "",
  website: "",
  summary: "",
  experience: "",
  skills: "",
  projects: "",
  education: "",
  certifications: "",
  languages: "",
  interests: "",
  photo: "",
};

const DEFAULT_DATA: CVData = {
  name: "Sarah Johnson",
  jobTitle: "Senior Full Stack Developer",
  email: "sarah.johnson@email.com",
  phone: "+1 (555) 123-4567",
  location: "San Francisco, CA",
  linkedin: "linkedin.com/in/sarahjohnson",
  website: "sarahjohnson.dev",
  summary:
    "Passionate Full Stack Developer with 6+ years of experience building scalable web applications. Expertise in React, Next.js, Node.js, and cloud technologies.",
  experience:
    "Senior Full Stack Developer | TechCorp Inc.\n2021 - Present\n• Led team of 5 developers, 100k+ users platform\n• Improved performance by 40%\n\nFull Stack Developer | StartupHub\n2019 - 2021\n• Built RESTful APIs handling 10k+ requests daily\n• Reduced bug rate by 30%",
  skills:
    "JavaScript, TypeScript, React, Next.js, Node.js, Python, MongoDB, PostgreSQL, AWS, Docker",
  projects:
    "E-Commerce Platform: MERN stack, 10k+ monthly users\nAI Chat App: Real-time chat with GPT integration\nPortfolio: 50k+ annual visits",
  education:
    "M.S. Computer Science | Stanford University\n2018-2020 | GPA: 3.9/4.0\n\nB.S. Software Engineering | MIT\n2014-2018 | GPA: 3.8/4.0",
  certifications:
    "AWS Solutions Architect – Professional\nMeta Backend Developer Certificate",
  languages: "English (C2) | Spanish (C1) | French (B1)",
  interests: "Open Source, Tech Blogging, Chess, Hiking",
  photo: "",
};

const DEFAULT_DESIGN: DesignSettings = {
  primaryColor: "#2563eb",
  headerTextColor: "#ffffff",
  bgColor: "#ffffff",
  cardBg: "#f8fafc",
  textColor: "#1e293b",
  skillBg: "#dbeafe",
  skillText: "#1e40af",
  layout: "modern",
  photoShape: "circle",
  photoPosition: "header",
  fontSize: "md",
  fontFamily: "Arial, sans-serif",
  sectionSpacing: "normal",
  showBorder: false,
  showShadow: true,
  showDividers: true,
  sectionTitleStyle: "underline",
};

const COLOR_PRESETS = [
  {
    name: "Ocean Blue",
    primaryColor: "#2563eb",
    headerTextColor: "#fff",
    bgColor: "#fff",
    cardBg: "#f0f7ff",
    textColor: "#1e293b",
    skillBg: "#dbeafe",
    skillText: "#1e40af",
  },
  {
    name: "Forest Green",
    primaryColor: "#16a34a",
    headerTextColor: "#fff",
    bgColor: "#fff",
    cardBg: "#f0fdf4",
    textColor: "#14532d",
    skillBg: "#dcfce7",
    skillText: "#166534",
  },
  {
    name: "Royal Purple",
    primaryColor: "#7c3aed",
    headerTextColor: "#fff",
    bgColor: "#fff",
    cardBg: "#faf5ff",
    textColor: "#1e1b4b",
    skillBg: "#ede9fe",
    skillText: "#5b21b6",
  },
  {
    name: "Crimson",
    primaryColor: "#dc2626",
    headerTextColor: "#fff",
    bgColor: "#fff",
    cardBg: "#fff5f5",
    textColor: "#1c1917",
    skillBg: "#fee2e2",
    skillText: "#991b1b",
  },
  {
    name: "Sunset Orange",
    primaryColor: "#ea580c",
    headerTextColor: "#fff",
    bgColor: "#fff",
    cardBg: "#fff7ed",
    textColor: "#1c1917",
    skillBg: "#ffedd5",
    skillText: "#9a3412",
  },
  {
    name: "Rose Pink",
    primaryColor: "#db2777",
    headerTextColor: "#fff",
    bgColor: "#fff",
    cardBg: "#fdf2f8",
    textColor: "#1e1b4b",
    skillBg: "#fce7f3",
    skillText: "#9d174d",
  },
  {
    name: "Slate Dark",
    primaryColor: "#334155",
    headerTextColor: "#f1f5f9",
    bgColor: "#f8fafc",
    cardBg: "#e2e8f0",
    textColor: "#0f172a",
    skillBg: "#cbd5e1",
    skillText: "#1e293b",
  },
  {
    name: "Teal",
    primaryColor: "#0d9488",
    headerTextColor: "#fff",
    bgColor: "#fff",
    cardBg: "#f0fdfa",
    textColor: "#134e4a",
    skillBg: "#ccfbf1",
    skillText: "#115e59",
  },
  {
    name: "Midnight",
    primaryColor: "#1e1b4b",
    headerTextColor: "#e0e7ff",
    bgColor: "#f5f5ff",
    cardBg: "#ede9fe",
    textColor: "#1e1b4b",
    skillBg: "#c7d2fe",
    skillText: "#312e81",
  },
];

const FONT_SIZE_MAP = {
  sm: { name: 18, title: 11, subtitle: 11, section: 9, contact: 9, body: 10 },
  md: { name: 22, title: 13, subtitle: 13, section: 10, contact: 10, body: 11 },
  lg: { name: 26, title: 15, subtitle: 15, section: 12, contact: 11, body: 13 },
};

const SPACING_MAP = {
  tight: "space-y-3",
  normal: "space-y-5",
  loose: "space-y-7",
};

// ─── CV Template Component ────────────────────────────────────────────────────

export function CVTemplate({
  data,
  design,
  className = "",
}: {
  data: CVData;
  design: DesignSettings;
  className?: string;
}) {
  const {
    primaryColor,
    headerTextColor,
    bgColor,
    textColor,
    skillBg,
    skillText,
    layout,
  } = design;
  const skillTags = data.skills
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  const fs = FONT_SIZE_MAP[design.fontSize];

  const fontBase = `${fs.body}px`;
  const fontTitle = `${fs.name}px`;
  const fontJob = `${fs.title}px`;
  const fontSect = `${fs.section}px`;

  const shapeMap = { circle: "50%", square: "0%", rounded: "12px" };
  const photoRadius = shapeMap[design.photoShape];

  const wrapStyle: React.CSSProperties = {
    backgroundColor: bgColor,
    color: textColor,
    fontFamily: design.fontFamily,
    fontSize: fontBase,
    lineHeight: 1.5,
    boxShadow: design.showShadow ? "0 4px 24px rgba(0,0,0,0.10)" : "none",
    border: design.showBorder ? `1.5px solid ${primaryColor}40` : "none",
    borderRadius: 12,
    overflow: "hidden",
    width: "100%",
    maxWidth: 794,
    margin: "0 auto",
  };

  function SectionHead({
    title,
    icon,
  }: {
    title: string;
    icon?: React.ReactNode;
  }) {
    const s = design.sectionTitleStyle;
    const baseStyle: React.CSSProperties = {
      fontSize: fontSect,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      color: primaryColor,
      marginBottom: 8,
      display: "flex",
      alignItems: "center",
      gap: 6,
    };

    if (s === "background") {
      return (
        <div
          style={{
            ...baseStyle,
            background: primaryColor + "15",
            padding: "4px 10px",
            borderRadius: 6,
            display: "inline-flex",
            marginBottom: 10,
          }}
        >
          {icon}
          <span>{title}</span>
        </div>
      );
    }
    if (s === "left-bar") {
      return (
        <div
          style={{
            ...baseStyle,
            borderLeft: `3px solid ${primaryColor}`,
            paddingLeft: 8,
            marginBottom: 10,
          }}
        >
          {icon}
          <span>{title}</span>
        </div>
      );
    }
    if (s === "uppercase") {
      return (
        <div style={{ marginBottom: 8 }}>
          <div style={baseStyle}>
            {icon}
            <span>{title}</span>
            {design.showDividers && (
              <div
                style={{
                  flex: 1,
                  height: 1,
                  background: primaryColor + "30",
                  marginLeft: 8,
                }}
              />
            )}
          </div>
        </div>
      );
    }
    // underline default
    return (
      <div style={{ marginBottom: 8 }}>
        <div style={baseStyle}>
          {icon}
          <span>{title}</span>
        </div>
        {design.showDividers && (
          <div
            style={{ height: 1, background: primaryColor + "40", marginTop: 4 }}
          />
        )}
      </div>
    );
  }

  function Sect({
    title,
    icon,
    children,
  }: {
    title: string;
    icon?: React.ReactNode;
    children: React.ReactNode;
  }) {
    return (
      <div>
        <SectionHead title={title} icon={icon} />
        {children}
      </div>
    );
  }

  function ContactItems() {
    const items = [
      data.email && { icon: "✉", text: data.email },
      data.phone && { icon: "📞", text: data.phone },
      data.location && { icon: "📍", text: data.location },
      data.linkedin && { icon: "in", text: data.linkedin },
      data.website && { icon: "🌐", text: data.website },
    ].filter(Boolean) as { icon: string; text: string }[];

    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "8px 16px",
          fontSize: fontJob,
          opacity: 0.85,
          color: headerTextColor,
        }}
      >
        {items.map((it, i) => (
          <span
            key={i}
            style={{ display: "flex", alignItems: "center", gap: 4 }}
          >
            <span style={{ fontSize: 10 }}>{it.icon}</span>
            {it.text}
          </span>
        ))}
      </div>
    );
  }

  function SkillTags() {
    return (
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {skillTags.map((s, i) => (
          <span
            key={i}
            style={{
              background: skillBg,
              color: skillText,
              fontSize: fontBase,
              padding: "4px 12px",
              borderRadius: 20,
              fontWeight: 500,
            }}
          >
            {s}
          </span>
        ))}
      </div>
    );
  }

  function PhotoEl({ size }: { size: number }) {
    if (!data.photo || design.photoPosition === "none") return null;
    return (
      <img
        src={data.photo}
        alt="profile"
        style={{
          width: size,
          height: size,
          borderRadius: photoRadius,
          objectFit: "cover",
          border: "3px solid rgba(255,255,255,0.4)",
          flexShrink: 0,
        }}
      />
    );
  }

  // ── MODERN LAYOUT ──
  if (layout === "modern") {
    return (
      <div style={wrapStyle} className={className}>
        <div style={{ background: primaryColor, padding: "24px 28px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            {design.photoPosition === "header" && <PhotoEl size={80} />}
            <div style={{ flex: 1 }}>
              <div
                style={{
                  fontSize: fontTitle,
                  fontWeight: 700,
                  color: headerTextColor,
                }}
              >
                {data.name || "Ism Familiya"}
              </div>
              <div
                style={{
                  fontSize: fontJob,
                  color: headerTextColor,
                  opacity: 0.85,
                  marginTop: 4,
                }}
              >
                {data.jobTitle}
              </div>
              <div style={{ marginTop: 12 }}>
                <ContactItems />
              </div>
            </div>
          </div>
        </div>
        <div style={{ padding: "24px 28px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap:
                design.sectionSpacing === "tight"
                  ? 16
                  : design.sectionSpacing === "loose"
                    ? 28
                    : 20,
            }}
          >
            {data.summary && (
              <Sect title="Professional Summary" icon={<span>💼</span>}>
                <p style={{ margin: 0, lineHeight: 1.5 }}>{data.summary}</p>
              </Sect>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.6fr 1fr",
                gap: 28,
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap:
                    design.sectionSpacing === "tight"
                      ? 16
                      : design.sectionSpacing === "loose"
                        ? 28
                        : 20,
                }}
              >
                {data.experience && (
                  <Sect title="Ish Tajribasi" icon={<span>💼</span>}>
                    <pre
                      style={{
                        margin: 0,
                        fontFamily: design.fontFamily,
                        whiteSpace: "pre-wrap",
                        fontSize: fontBase,
                        lineHeight: 1.5,
                      }}
                    >
                      {data.experience}
                    </pre>
                  </Sect>
                )}
                {data.projects && (
                  <Sect title="Loyihalar" icon={<span>🚀</span>}>
                    <pre
                      style={{
                        margin: 0,
                        fontFamily: design.fontFamily,
                        whiteSpace: "pre-wrap",
                        fontSize: fontBase,
                        lineHeight: 1.5,
                      }}
                    >
                      {data.projects}
                    </pre>
                  </Sect>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap:
                    design.sectionSpacing === "tight"
                      ? 16
                      : design.sectionSpacing === "loose"
                        ? 28
                        : 20,
                }}
              >
                {skillTags.length > 0 && (
                  <Sect title="Ko'nikmalar" icon={<span>⚡</span>}>
                    <SkillTags />
                  </Sect>
                )}
                {data.education && (
                  <Sect title="Ta'lim" icon={<span>🎓</span>}>
                    <pre
                      style={{
                        margin: 0,
                        fontFamily: design.fontFamily,
                        whiteSpace: "pre-wrap",
                        fontSize: fontBase,
                        lineHeight: 1.5,
                      }}
                    >
                      {data.education}
                    </pre>
                  </Sect>
                )}
                {data.certifications && (
                  <Sect title="Sertifikatlar" icon={<span>🏆</span>}>
                    <pre
                      style={{
                        margin: 0,
                        fontFamily: design.fontFamily,
                        whiteSpace: "pre-wrap",
                        fontSize: fontBase,
                        lineHeight: 1.5,
                      }}
                    >
                      {data.certifications}
                    </pre>
                  </Sect>
                )}
                {data.languages && (
                  <Sect title="Tillar" icon={<span>🌍</span>}>
                    <p style={{ margin: 0 }}>{data.languages}</p>
                  </Sect>
                )}
                {data.interests && (
                  <Sect title="Qiziqishlar" icon={<span>🎯</span>}>
                    <p style={{ margin: 0 }}>{data.interests}</p>
                  </Sect>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── SIDEBAR LAYOUT ──
  if (layout === "sidebar") {
    return (
      <div style={{ ...wrapStyle, display: "flex" }} className={className}>
        <div
          style={{
            width: 220,
            flexShrink: 0,
            background: primaryColor,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap: 20,
            color: headerTextColor,
          }}
        >
          {design.photoPosition === "sidebar" && data.photo && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <PhotoEl size={100} />
            </div>
          )}
          <div>
            <div
              style={{ fontSize: fontJob, fontWeight: 700, lineHeight: 1.3 }}
            >
              {data.name || "Ism Familiya"}
            </div>
            <div style={{ fontSize: 11, opacity: 0.8, marginTop: 4 }}>
              {data.jobTitle}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 6,
              fontSize: 10,
              opacity: 0.85,
            }}
          >
            {data.email && (
              <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                <span>✉</span>
                <span style={{ wordBreak: "break-all" }}>{data.email}</span>
              </div>
            )}
            {data.phone && (
              <div style={{ display: "flex", gap: 6 }}>
                <span>📞</span>
                {data.phone}
              </div>
            )}
            {data.location && (
              <div style={{ display: "flex", gap: 6 }}>
                <span>📍</span>
                {data.location}
              </div>
            )}
          </div>
          {skillTags.length > 0 && (
            <div>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  opacity: 0.6,
                  marginBottom: 8,
                }}
              >
                Ko'nikmalar
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {skillTags.slice(0, 8).map((s, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: 9,
                      padding: "3px 8px",
                      borderRadius: 4,
                      background: "rgba(255,255,255,0.15)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          )}
          {data.education && (
            <div>
              <div
                style={{
                  fontSize: 9,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  opacity: 0.6,
                  marginBottom: 6,
                }}
              >
                Ta'lim
              </div>
              <pre
                style={{
                  margin: 0,
                  fontFamily: design.fontFamily,
                  fontSize: 10,
                  whiteSpace: "pre-wrap",
                  opacity: 0.85,
                  lineHeight: 1.4,
                }}
              >
                {data.education.slice(0, 120)}
                {data.education.length > 120 ? "..." : ""}
              </pre>
            </div>
          )}
        </div>
        <div
          style={{
            flex: 1,
            padding: 24,
            display: "flex",
            flexDirection: "column",
            gap:
              design.sectionSpacing === "tight"
                ? 16
                : design.sectionSpacing === "loose"
                  ? 28
                  : 20,
          }}
        >
          {data.summary && (
            <Sect title="Haqida" icon={<span>👤</span>}>
              <p style={{ margin: 0, lineHeight: 1.5 }}>{data.summary}</p>
            </Sect>
          )}
          {data.experience && (
            <Sect title="Ish Tajribasi" icon={<span>💼</span>}>
              <pre
                style={{
                  margin: 0,
                  fontFamily: design.fontFamily,
                  whiteSpace: "pre-wrap",
                  fontSize: fontBase,
                  lineHeight: 1.5,
                }}
              >
                {data.experience}
              </pre>
            </Sect>
          )}
          {data.projects && (
            <Sect title="Loyihalar" icon={<span>🚀</span>}>
              <pre
                style={{
                  margin: 0,
                  fontFamily: design.fontFamily,
                  whiteSpace: "pre-wrap",
                  fontSize: fontBase,
                  lineHeight: 1.5,
                }}
              >
                {data.projects}
              </pre>
            </Sect>
          )}
        </div>
      </div>
    );
  }

  // ── CLASSIC LAYOUT ──
  if (layout === "classic") {
    return (
      <div style={wrapStyle} className={className}>
        <div
          style={{
            background: primaryColor,
            padding: "28px 32px",
            textAlign: "center",
            color: headerTextColor,
          }}
        >
          {design.photoPosition === "header" && data.photo && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 14,
              }}
            >
              <PhotoEl size={90} />
            </div>
          )}
          <div style={{ fontSize: fontTitle, fontWeight: 700 }}>
            {data.name || "Ism Familiya"}
          </div>
          <div style={{ fontSize: fontJob, opacity: 0.85, marginTop: 5 }}>
            {data.jobTitle}
          </div>
          <div
            style={{ display: "flex", justifyContent: "center", marginTop: 12 }}
          >
            <ContactItems />
          </div>
        </div>
        <div style={{ padding: "28px 32px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap:
                design.sectionSpacing === "tight"
                  ? 16
                  : design.sectionSpacing === "loose"
                    ? 28
                    : 20,
            }}
          >
            {data.summary && (
              <Sect title="Professional Summary" icon={<span>💼</span>}>
                <p style={{ margin: 0, lineHeight: 1.5 }}>{data.summary}</p>
              </Sect>
            )}
            {data.experience && (
              <Sect title="Ish Tajribasi" icon={<span>💼</span>}>
                <pre
                  style={{
                    margin: 0,
                    fontFamily: design.fontFamily,
                    whiteSpace: "pre-wrap",
                    fontSize: fontBase,
                    lineHeight: 1.5,
                  }}
                >
                  {data.experience}
                </pre>
              </Sect>
            )}
            {data.projects && (
              <Sect title="Loyihalar" icon={<span>🚀</span>}>
                <pre
                  style={{
                    margin: 0,
                    fontFamily: design.fontFamily,
                    whiteSpace: "pre-wrap",
                    fontSize: fontBase,
                    lineHeight: 1.5,
                  }}
                >
                  {data.projects}
                </pre>
              </Sect>
            )}
            {skillTags.length > 0 && (
              <Sect title="Ko'nikmalar" icon={<span>⚡</span>}>
                <SkillTags />
              </Sect>
            )}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
              }}
            >
              {data.education && (
                <Sect title="Ta'lim" icon={<span>🎓</span>}>
                  <pre
                    style={{
                      margin: 0,
                      fontFamily: design.fontFamily,
                      whiteSpace: "pre-wrap",
                      fontSize: fontBase,
                      lineHeight: 1.5,
                    }}
                  >
                    {data.education}
                  </pre>
                </Sect>
              )}
              {data.certifications && (
                <Sect title="Sertifikatlar" icon={<span>🏆</span>}>
                  <pre
                    style={{
                      margin: 0,
                      fontFamily: design.fontFamily,
                      whiteSpace: "pre-wrap",
                      fontSize: fontBase,
                      lineHeight: 1.5,
                    }}
                  >
                    {data.certifications}
                  </pre>
                </Sect>
              )}
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 24,
              }}
            >
              {data.languages && (
                <Sect title="Tillar" icon={<span>🌍</span>}>
                  <p style={{ margin: 0 }}>{data.languages}</p>
                </Sect>
              )}
              {data.interests && (
                <Sect title="Qiziqishlar" icon={<span>🎯</span>}>
                  <p style={{ margin: 0 }}>{data.interests}</p>
                </Sect>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ── MINIMAL LAYOUT ──
  return (
    <div style={wrapStyle} className={className}>
      <div style={{ height: 4, background: primaryColor }} />
      <div style={{ padding: "28px 32px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 24,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {design.photoPosition === "header" && data.photo && (
              <PhotoEl size={65} />
            )}
            <div>
              <div
                style={{
                  fontSize: fontTitle,
                  fontWeight: 700,
                  color: primaryColor,
                }}
              >
                {data.name || "Ism Familiya"}
              </div>
              <div
                style={{ fontSize: fontJob, color: textColor, marginTop: 4 }}
              >
                {data.jobTitle}
              </div>
            </div>
          </div>
          <div
            style={{
              textAlign: "right",
              fontSize: 10,
              color: textColor + "99",
              lineHeight: 1.6,
            }}
          >
            {data.email && <div>{data.email}</div>}
            {data.phone && <div>{data.phone}</div>}
            {data.location && <div>{data.location}</div>}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap:
              design.sectionSpacing === "tight"
                ? 16
                : design.sectionSpacing === "loose"
                  ? 28
                  : 20,
          }}
        >
          {data.summary && (
            <Sect title="Haqida" icon={<span>👤</span>}>
              <p style={{ margin: 0, lineHeight: 1.5 }}>{data.summary}</p>
            </Sect>
          )}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1.6fr 1fr",
              gap: 28,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap:
                  design.sectionSpacing === "tight"
                    ? 16
                    : design.sectionSpacing === "loose"
                      ? 28
                      : 20,
              }}
            >
              {data.experience && (
                <Sect title="Tajriba" icon={<span>💼</span>}>
                  <pre
                    style={{
                      margin: 0,
                      fontFamily: design.fontFamily,
                      whiteSpace: "pre-wrap",
                      fontSize: fontBase,
                      lineHeight: 1.5,
                    }}
                  >
                    {data.experience}
                  </pre>
                </Sect>
              )}
              {data.projects && (
                <Sect title="Loyihalar" icon={<span>🚀</span>}>
                  <pre
                    style={{
                      margin: 0,
                      fontFamily: design.fontFamily,
                      whiteSpace: "pre-wrap",
                      fontSize: fontBase,
                      lineHeight: 1.5,
                    }}
                  >
                    {data.projects}
                  </pre>
                </Sect>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap:
                  design.sectionSpacing === "tight"
                    ? 16
                    : design.sectionSpacing === "loose"
                      ? 28
                      : 20,
              }}
            >
              {skillTags.length > 0 && (
                <Sect title="Ko'nikmalar" icon={<span>⚡</span>}>
                  <SkillTags />
                </Sect>
              )}
              {data.education && (
                <Sect title="Ta'lim" icon={<span>🎓</span>}>
                  <pre
                    style={{
                      margin: 0,
                      fontFamily: design.fontFamily,
                      whiteSpace: "pre-wrap",
                      fontSize: fontBase,
                      lineHeight: 1.5,
                    }}
                  >
                    {data.education}
                  </pre>
                </Sect>
              )}
              {data.languages && (
                <Sect title="Tillar" icon={<span>🌍</span>}>
                  <p style={{ margin: 0 }}>{data.languages}</p>
                </Sect>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type TabId = "personal" | "professional" | "skills" | "education" | "design";
const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
  { id: "personal", label: "Shaxsiy", icon: User },
  { id: "professional", label: "Kasbiy", icon: Briefcase },
  { id: "skills", label: "Ko'nikmalar", icon: Code },
  { id: "education", label: "Ta'lim", icon: GraduationCap },
  { id: "design", label: "Dizayn", icon: Palette },
];

export default function CVBuilderPage() {
  const [data, setData] = useState<CVData>(DEFAULT_DATA);
  const [design, setDesign] = useState<DesignSettings>(DEFAULT_DESIGN);
  const [activeTab, setActiveTab] = useState<TabId>("personal");
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    colors: true,
    layout: false,
    typography: false,
    effects: false,
  });
  const [designHistory, setDesignHistory] = useState<DesignSettings[]>([
    DEFAULT_DESIGN,
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isUndoing, setIsUndoing] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  const saveToHistory = useCallback(
    (newDesign: DesignSettings) => {
      if (isUndoing) return;
      setDesignHistory((prev) => {
        const newHistory = prev.slice(0, historyIndex + 1);
        newHistory.push(newDesign);
        const trimmedHistory = newHistory.slice(-20);
        setHistoryIndex(trimmedHistory.length - 1);
        return trimmedHistory;
      });
    },
    [historyIndex, isUndoing],
  );

  const change = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setData((p) => ({ ...p, [e.target.name]: e.target.value }));
    },
    [],
  );

  const des = useCallback(
    (key: keyof DesignSettings, value: unknown) => {
      setDesign((prev) => {
        const newDesign = { ...prev, [key]: value };
        saveToHistory(newDesign);
        return newDesign;
      });
    },
    [saveToHistory],
  );

  const undoDesign = useCallback(() => {
    if (historyIndex > 0) {
      setIsUndoing(true);
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setDesign(designHistory[newIndex]);
      setTimeout(() => setIsUndoing(false), 100);
    }
  }, [historyIndex, designHistory]);

  const resetDesign = useCallback(() => {
    setIsUndoing(true);
    setDesign(DEFAULT_DESIGN);
    setDesignHistory([DEFAULT_DESIGN]);
    setHistoryIndex(0);
    setTimeout(() => setIsUndoing(false), 100);
  }, []);

  const resetAll = useCallback(() => {
    setData(EMPTY);
    setDesign(DEFAULT_DESIGN);
    setDesignHistory([DEFAULT_DESIGN]);
    setHistoryIndex(0);
  }, []);

  const handlePhoto = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) =>
      setData((p) => ({ ...p, photo: ev.target?.result as string }));
    reader.readAsDataURL(file);
  }, []);

  const toggleSection = (key: string) =>
    setOpenSections((p) => ({ ...p, [key]: !p[key] }));

  // ── PDF generation with html2canvas ──
  const generatePDF = useCallback(async () => {
    const element = pdfRef.current;
    if (!element) return;

    setIsGenerating(true);

    try {
      // 📌 1. Clone (REAL safe render)
      const clone = element.cloneNode(true) as HTMLElement;

      clone.style.position = "absolute";
      clone.style.left = "0";
      clone.style.top = "0";
      clone.style.width = "794px";
      clone.style.background = design.bgColor || "#fff";

      document.body.appendChild(clone);

      // 📌 2. Render canvas
      const canvas = await html2canvas(clone, {
        scale: 3,
        useCORS: true,
        backgroundColor: design.bgColor || "#fff",
        scrollX: 0,
        scrollY: 0,
      });

      document.body.removeChild(clone);

      const imgData = canvas.toDataURL("image/png", 1.0);

      // 📌 3. PDF setup (A4)
      const pdf = new jsPDF("p", "mm", "a4");

      const pageWidth = 210;
      const pageHeight = 297;

      const imgWidth = pageWidth;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // 📌 4. Pagination system (REAL fix)
      let heightLeft = imgHeight;
      let position = 0;

      // first page
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft > 0) {
        position -= pageHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // 📌 5. Save
      pdf.save(`${data.name || "CV"}_CV.pdf`);
    } catch (err) {
      console.error("PDF ERROR:", err);
      alert("PDF yaratishda xatolik!");
    } finally {
      setIsGenerating(false);
    }
  }, [data, design]);

  // ── Design helpers ──
  function Accordion({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          {title}
          {openSections[id] ? (
            <ChevronUp className="w-4 h-4" />
          ) : (
            <ChevronDown className="w-4 h-4" />
          )}
        </button>
        {openSections[id] && <div className="p-4 space-y-3">{children}</div>}
      </div>
    );
  }

  function ColorInput({
    label,
    value,
    onChange,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
  }) {
    return (
      <div>
        <label className="block text-xs text-gray-500 mb-1">{label}</label>
        <div className="flex items-center gap-2">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-10 h-8 rounded border cursor-pointer"
          />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-2 py-1.5 text-xs border border-gray-300 rounded font-mono"
          />
        </div>
      </div>
    );
  }

  function Select({
    label,
    value,
    onChange,
    options,
  }: {
    label: string;
    value: string;
    onChange: (v: string) => void;
    options: { value: string; label: string }[];
  }) {
    return (
      <div>
        <label className="block text-xs text-gray-500 mb-1">{label}</label>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-2 py-1.5 text-sm border border-gray-300 rounded-lg bg-white"
        >
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
    );
  }

  function Toggle({
    label,
    checked,
    onChange,
  }: {
    label: string;
    checked: boolean;
    onChange: (v: boolean) => void;
  }) {
    return (
      <label className="flex items-center justify-between cursor-pointer">
        <span className="text-sm text-gray-600">{label}</span>
        <div
          onClick={() => onChange(!checked)}
          className="w-9 h-5 rounded-full transition-colors cursor-pointer"
          style={{ backgroundColor: checked ? design.primaryColor : "#d1d5db" }}
        >
          <div
            className={`w-4 h-4 bg-white rounded-full shadow transition-transform mt-0.5 ${checked ? "translate-x-4" : "translate-x-0.5"}`}
          />
        </div>
      </label>
    );
  }

  // ── Render ──
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hidden PDF capture element - exact same as preview */}
      <div
        ref={pdfRef}
        style={{
          position: "fixed",
          left: "-99999px",
          top: 0,
          visibility: "hidden",
          width: 794,
          backgroundColor: design.bgColor,
        }}
      >
        <CVTemplate data={data} design={design} />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14">
          <button
            onClick={() => router.push("/")}
            className="cursor-pointer flex items-center gap-2"
          >
            <div className=" w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-600 rounded-xl flex items-center justify-center">
              <Grid3x3 className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-lg flex flex-col sm:text-xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              ToolsHub
              <span className="text-[10px]">CV Generator PDF</span>
            </span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={undoDesign}
              disabled={historyIndex === 0}
              className={`flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-lg transition-colors ${historyIndex === 0 ? "text-gray-300 cursor-not-allowed" : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"}`}
            >
              <Undo2 className="w-4 h-4" />
              <span className="hidden sm:inline">Bekor qilish</span>
            </button>
            <button
              onClick={resetDesign}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
              <span className="hidden sm:inline">Qaytarish</span>
            </button>
            <button
              onClick={resetAll}
              className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-100 px-3 py-1.5 rounded-lg transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <button
              onClick={generatePDF}
              disabled={isGenerating}
              className="flex items-center gap-2 text-white text-sm px-4 py-1.5 rounded-lg transition-opacity disabled:opacity-50"
              style={{ backgroundColor: design.primaryColor }}
            >
              <Download className="w-4 h-4" />
              {isGenerating ? "Yaratilmoqda..." : "PDF"}
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div>
            <div className="flex gap-1 border-b border-gray-200 mb-5 overflow-x-auto">
              {TABS.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setActiveTab(id)}
                  className="flex items-center gap-1.5 px-3 py-2.5 text-sm font-medium whitespace-nowrap border-b-2 -mb-px transition-colors"
                  style={
                    activeTab === id
                      ? {
                          borderColor: design.primaryColor,
                          color: design.primaryColor,
                        }
                      : { borderColor: "transparent", color: "#6b7280" }
                  }
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5 space-y-4">
              {activeTab === "personal" && (
                <>
                  <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-300">
                    <div className="relative">
                      {data.photo ? (
                        <img
                          src={data.photo}
                          alt="photo"
                          className={`w-16 h-16 object-cover ${design.photoShape === "circle" ? "rounded-full" : design.photoShape === "rounded" ? "rounded-xl" : "rounded"}`}
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                      {data.photo && (
                        <button
                          onClick={() => setData((p) => ({ ...p, photo: "" }))}
                          className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center hover:bg-red-600"
                        >
                          <X className="w-3 h-3 text-white" />
                        </button>
                      )}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-700 mb-1">
                        Profil rasmi
                      </p>
                      <button
                        onClick={() => fileInputRef.current?.click()}
                        className="text-xs px-3 py-1.5 rounded-lg text-white hover:opacity-90"
                        style={{ backgroundColor: design.primaryColor }}
                      >
                        <Camera className="w-3 h-3 inline mr-1" />
                        {data.photo ? "Almashtirish" : "Rasm yuklash"}
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handlePhoto}
                        className="hidden"
                      />
                    </div>
                  </div>
                  <Field label="To'liq ism *">
                    <input
                      name="name"
                      value={data.name}
                      onChange={change}
                      className={inputCls}
                    />
                  </Field>
                  <Field label="Lavozim *">
                    <input
                      name="jobTitle"
                      value={data.jobTitle}
                      onChange={change}
                      className={inputCls}
                    />
                  </Field>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Email *">
                      <input
                        name="email"
                        value={data.email}
                        onChange={change}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="Telefon *">
                      <input
                        name="phone"
                        value={data.phone}
                        onChange={change}
                        className={inputCls}
                      />
                    </Field>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Shahar">
                      <input
                        name="location"
                        value={data.location}
                        onChange={change}
                        className={inputCls}
                      />
                    </Field>
                    <Field label="LinkedIn">
                      <input
                        name="linkedin"
                        value={data.linkedin}
                        onChange={change}
                        className={inputCls}
                      />
                    </Field>
                  </div>
                  <Field label="Website">
                    <input
                      name="website"
                      value={data.website}
                      onChange={change}
                      className={inputCls}
                    />
                  </Field>
                </>
              )}

              {activeTab === "professional" && (
                <>
                  <Field label="Professional Summary *">
                    <textarea
                      name="summary"
                      value={data.summary}
                      onChange={change}
                      rows={5}
                      className={areaCls}
                    />
                  </Field>
                  <Field
                    label="Ish tajribasi *"
                    hint="Format: Kompaniya | Lavozim\nYil — Yil\n• Yutuq 1"
                  >
                    <textarea
                      name="experience"
                      value={data.experience}
                      onChange={change}
                      rows={9}
                      className={`${areaCls} font-mono text-xs`}
                    />
                  </Field>
                </>
              )}

              {activeTab === "skills" && (
                <>
                  <Field
                    label="Ko'nikmalar *"
                    hint="Vergul bilan ajrating: React, Node.js, Python"
                  >
                    <textarea
                      name="skills"
                      value={data.skills}
                      onChange={change}
                      rows={3}
                      className={areaCls}
                    />
                  </Field>
                  <Field label="Loyihalar">
                    <textarea
                      name="projects"
                      value={data.projects}
                      onChange={change}
                      rows={5}
                      className={areaCls}
                    />
                  </Field>
                  <Field label="Qiziqishlar">
                    <input
                      name="interests"
                      value={data.interests}
                      onChange={change}
                      className={inputCls}
                    />
                  </Field>
                </>
              )}

              {activeTab === "education" && (
                <>
                  <Field label="Ta'lim *">
                    <textarea
                      name="education"
                      value={data.education}
                      onChange={change}
                      rows={5}
                      className={areaCls}
                    />
                  </Field>
                  <Field label="Sertifikatlar">
                    <textarea
                      name="certifications"
                      value={data.certifications}
                      onChange={change}
                      rows={3}
                      className={areaCls}
                    />
                  </Field>
                  <Field label="Tillar">
                    <textarea
                      name="languages"
                      value={data.languages}
                      onChange={change}
                      rows={2}
                      className={areaCls}
                    />
                  </Field>
                </>
              )}

              {activeTab === "design" && (
                <div className="space-y-3">
                  <div className="flex gap-2 mb-3 pb-3 border-b border-gray-200">
                    <button
                      onClick={undoDesign}
                      disabled={historyIndex === 0}
                      className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg ${historyIndex === 0 ? "bg-gray-100 text-gray-300 cursor-not-allowed" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}
                    >
                      <Undo2 className="w-3.5 h-3.5" /> Bekor qilish
                    </button>
                    <button
                      onClick={resetDesign}
                      className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200"
                    >
                      <RotateCcw className="w-3.5 h-3.5" /> Asl holatga
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-2">
                      Tayyor rang sxemalari
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {COLOR_PRESETS.map((p) => (
                        <button
                          key={p.name}
                          onClick={() =>
                            setDesign((d) => ({
                              ...d,
                              primaryColor: p.primaryColor,
                              headerTextColor: p.headerTextColor,
                              bgColor: p.bgColor,
                              cardBg: p.cardBg,
                              textColor: p.textColor,
                              skillBg: p.skillBg,
                              skillText: p.skillText,
                            }))
                          }
                          className="p-2 text-xs rounded-lg border hover:border-gray-400 transition-all text-left"
                          style={{
                            backgroundColor: p.bgColor,
                            borderColor:
                              design.primaryColor === p.primaryColor
                                ? p.primaryColor
                                : "#e5e7eb",
                          }}
                        >
                          <div
                            className="w-full h-4 rounded mb-1"
                            style={{ backgroundColor: p.primaryColor }}
                          />
                          <span className="text-gray-600 text-[10px]">
                            {p.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <Accordion id="colors" title="🎨 Ranglar">
                    <ColorInput
                      label="Asosiy rang"
                      value={design.primaryColor}
                      onChange={(v) => des("primaryColor", v)}
                    />
                    <ColorInput
                      label="Header matn rangi"
                      value={design.headerTextColor}
                      onChange={(v) => des("headerTextColor", v)}
                    />
                    <ColorInput
                      label="Fon rangi"
                      value={design.bgColor}
                      onChange={(v) => des("bgColor", v)}
                    />
                    <ColorInput
                      label="Matn rangi"
                      value={design.textColor}
                      onChange={(v) => des("textColor", v)}
                    />
                    <ColorInput
                      label="Ko'nikma tag foni"
                      value={design.skillBg}
                      onChange={(v) => des("skillBg", v)}
                    />
                    <ColorInput
                      label="Ko'nikma matn rangi"
                      value={design.skillText}
                      onChange={(v) => des("skillText", v)}
                    />
                  </Accordion>

                  <Accordion id="layout" title="📐 Layout va joylashuv">
                    <Select
                      label="Layout turi"
                      value={design.layout}
                      onChange={(v) => des("layout", v)}
                      options={[
                        { value: "modern", label: "Modern (2-ustun)" },
                        { value: "sidebar", label: "Sidebar (chap panel)" },
                        { value: "classic", label: "Classic (markaz)" },
                        { value: "minimal", label: "Minimal" },
                      ]}
                    />
                    <Select
                      label="Rasm joylashuvi"
                      value={design.photoPosition}
                      onChange={(v) => des("photoPosition", v)}
                      options={[
                        { value: "header", label: "Header da" },
                        { value: "sidebar", label: "Sidebar da" },
                        { value: "none", label: "Ko'rsatmaslik" },
                      ]}
                    />
                    <Select
                      label="Rasm shakli"
                      value={design.photoShape}
                      onChange={(v) => des("photoShape", v)}
                      options={[
                        { value: "circle", label: "Doira" },
                        { value: "rounded", label: "Yumaloq burchak" },
                        { value: "square", label: "To'rtburchak" },
                      ]}
                    />
                    <Select
                      label="Bo'limlar oralig'i"
                      value={design.sectionSpacing}
                      onChange={(v) => des("sectionSpacing", v)}
                      options={[
                        { value: "tight", label: "Zich" },
                        { value: "normal", label: "O'rta" },
                        { value: "loose", label: "Keng" },
                      ]}
                    />
                  </Accordion>

                  <Accordion id="typography" title="🔤 Tipografiya">
                    <Select
                      label="Shrift"
                      value={design.fontFamily}
                      onChange={(v) => des("fontFamily", v)}
                      options={[
                        {
                          value: "Arial, sans-serif",
                          label: "Arial / Helvetica",
                        },
                        { value: "Georgia, serif", label: "Georgia (serif)" },
                        { value: "system-ui, sans-serif", label: "System UI" },
                      ]}
                    />
                    <Select
                      label="Shrift kattaligi"
                      value={design.fontSize}
                      onChange={(v) => des("fontSize", v)}
                      options={[
                        { value: "sm", label: "Kichik" },
                        { value: "md", label: "O'rta" },
                        { value: "lg", label: "Katta" },
                      ]}
                    />
                    <Select
                      label="Bo'lim sarlavha uslubi"
                      value={design.sectionTitleStyle}
                      onChange={(v) => des("sectionTitleStyle", v)}
                      options={[
                        { value: "underline", label: "Tagiga chiziq" },
                        { value: "background", label: "Fon rangi" },
                        { value: "left-bar", label: "Chap chiziq" },
                        { value: "uppercase", label: "Katta harf" },
                      ]}
                    />
                  </Accordion>

                  <Accordion id="effects" title="✨ Effektlar">
                    <Toggle
                      label="Soya (shadow)"
                      checked={design.showShadow}
                      onChange={(v) => des("showShadow", v)}
                    />
                    <Toggle
                      label="Chegara (border)"
                      checked={design.showBorder}
                      onChange={(v) => des("showBorder", v)}
                    />
                    <Toggle
                      label="Bo'lim ajratgichlari"
                      checked={design.showDividers}
                      onChange={(v) => des("showDividers", v)}
                    />
                  </Accordion>
                </div>
              )}
            </div>
          </div>

          {/* Preview Section */}
          <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-6rem)] overflow-y-auto">
            <div className="flex items-center gap-2 mb-3">
              <Eye className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-600">
                Jonli ko'rinish
              </span>
              <span className="ml-auto text-xs text-gray-400">A4 format</span>
            </div>
            <CVTemplate data={data} design={design} />
          </div>
        </div>
      </div>
    </div>
  );
}

const inputCls =
  "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white";
const areaCls =
  "w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-y bg-white";

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label}
      </label>
      {children}
      {hint && (
        <p className="text-xs text-gray-400 mt-1 whitespace-pre-line">{hint}</p>
      )}
    </div>
  );
}
