import { useState, useEffect } from "react";
import { BRANCHES, SEMS, getBranch } from "@/lib/data";
import { fbLoadPapers, embedUrl, directLink } from "@/lib/firebase";
import { FileText, BookOpen, ClipboardList, ScrollText } from "lucide-react";

/* ── decorative icon layer for section headers ── */
const DecoIcons = () => (
  <>
    <FileText style={{ position: "absolute", right: 20, top: 10, opacity: 0.08, color: "#203f7f" }} size={48} strokeWidth={1.5} />
    <BookOpen style={{ position: "absolute", left: 16, bottom: 8, opacity: 0.07, color: "#203f7f" }} size={40} strokeWidth={1.5} />
    <ClipboardList style={{ position: "absolute", right: 80, bottom: 6, opacity: 0.06, color: "#203f7f" }} size={36} strokeWidth={1.5} />
    <ScrollText style={{ position: "absolute", left: 100, top: 8, opacity: 0.06, color: "#203f7f" }} size={32} strokeWidth={1.5} />
  </>
);

/* ── back button ── */
const BackButton = ({ onClick, label = "← Back" }: { onClick: () => void; label?: string }) => (
  <button
    className="btn-pop"
    onClick={onClick}
    style={{
      background: "linear-gradient(180deg, #eef7ff, #dceeff)",
      border: "1px solid #96c8f5",
      padding: "0.5rem 1rem",
      borderRadius: 12,
      fontWeight: 700,
      fontSize: 13,
      color: "#3172be",
      cursor: "pointer",
      display: "inline-flex",
      alignItems: "center",
      gap: 6,
    }}
  >
    {label}
  </button>
);

/* ── section header ── */
const SectionHeader = ({
  title,
  subtitle,
  onBack,
  backLabel,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  backLabel?: string;
}) => (
  <div
    style={{
      position: "relative",
      overflow: "hidden",
      borderRadius: 24,
      border: "1px solid #d9ebfb",
      background: "linear-gradient(135deg, #fbfdff 0%, #fffef6 32%, #f1fcff 100%)",
      boxShadow: "0 12px 30px rgba(134, 180, 220, 0.18)",
      padding: "1.4rem 1.5rem",
      marginBottom: "1.5rem",
    }}
  >
    <Blobs />
    <div style={{ position: "relative", zIndex: 1 }}>
      {onBack && (
        <div style={{ marginBottom: 12 }}>
          <BackButton onClick={onBack} label={backLabel} />
        </div>
      )}
      <h2
        style={{
          margin: 0,
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: "clamp(1.4rem, 3vw, 1.75rem)",
          fontWeight: 800,
          color: "#203f7f",
          lineHeight: 1.15,
        }}
      >
        {title}
      </h2>
      {subtitle && (
        <p style={{ margin: "0.5rem 0 0", color: "#6b7a92", fontSize: 14 }}>{subtitle}</p>
      )}
    </div>
  </div>
);

export default function BrowsePage() {
  const [papers, setPapers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selB, setSelB] = useState<string | null>(null);
  const [selS, setSelS] = useState<number | null>(null);
  const [selSubject, setSelSubject] = useState<string | null>(null);
  const [viewPaper, setViewPaper] = useState<any | null>(null);

  const b = selB ? getBranch(selB) : null;

  useEffect(() => {
    fbLoadPapers().then((p) => {
      setPapers(p);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div style={{ background: "#f7fbff", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center" }}>
          <div className="w-10 h-10 border-4 border-blue-100 border-t-primary rounded-full animate-spin mx-auto mb-4" />
          <p style={{ fontWeight: 700, color: "#6b7a92" }}>Loading papers...</p>
        </div>
      </div>
    );
  }

  /* ── PDF Modal ── */
  const PdfModal = viewPaper ? (
    <div
      className="fixed inset-0 bg-black/65 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm"
      onClick={() => setViewPaper(null)}
    >
      <div
        className="bg-card rounded-[20px] w-full max-w-[900px] max-h-[92vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="gradient-hero px-6 py-4 flex justify-between items-center shrink-0">
          <div className="flex-1 min-w-0">
            <div className="text-primary-foreground font-bold">
              {viewPaper.subject}
              {viewPaper.paperType && (
                <span className="font-medium opacity-85"> — {viewPaper.paperType}</span>
              )}
            </div>
            <div className="text-white/65 text-xs mt-0.5 truncate">
              {viewPaper.branch} · Sem {viewPaper.sem} · {viewPaper.year} · {viewPaper.code}
            </div>
          </div>
          <div className="flex gap-2 shrink-0">
            <a
              href={directLink(viewPaper.pdfUrl)}
              target="_blank"
              rel="noreferrer"
              className="bg-white/20 border border-white/30 text-primary-foreground px-3 py-1.5 rounded-lg font-bold text-xs no-underline"
            >
              ↗
            </a>
            <button
              onClick={() => setViewPaper(null)}
              className="bg-white/15 border-none text-primary-foreground w-[34px] h-[34px] rounded-full cursor-pointer text-base"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="flex-1 min-h-[500px] bg-gray-600">
          <iframe
            src={embedUrl(viewPaper.pdfUrl)}
            className="w-full h-full min-h-[500px] border-none"
            title="PDF Viewer"
            loading="eager"
          />
        </div>
      </div>
    </div>
  ) : null;

  const pageWrap: React.CSSProperties = {
    background: "#f7fbff",
    minHeight: "60vh",
  };
  const container: React.CSSProperties = {
    maxWidth: 760,
    margin: "0 auto",
    padding: "1.25rem 1rem 2.5rem",
  };

  /* ── Branch selection ── */
  if (!selB) {
    return (
      <div style={pageWrap}>
        <div style={container}>
          {PdfModal}
          <SectionHeader
            title="Browse by Branch"
            subtitle="Select your engineering branch to find model answer papers"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
              gap: 14,
            }}
          >
            {BRANCHES.map((br) => (
              <div
                className="card-pop"
                key={br.code}
                onClick={() => setSelB(br.code)}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "1.3rem 0.8rem",
                  textAlign: "center",
                  border: "1px solid #d7e8f8",
                  boxShadow: "0 8px 20px rgba(187, 209, 230, 0.12)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 16,
                    background: "linear-gradient(180deg, #eef5ff, #e8f3ff)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 10px",
                    fontSize: 28,
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,.8)",
                  }}
                >
                  {br.icon}
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 18, color: "#203f7f" }}>
                  {br.code}
                </div>
                <div style={{ fontSize: 12, color: "#6b7a92", marginTop: 4 }}>{br.name}</div>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 8,
                    padding: "0.2rem 0.6rem",
                    background: "#e1f0ff",
                    color: "#2d77d0",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {papers.filter((p) => p.branch === br.code).length} papers
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Semester selection ── */
  if (!selS) {
    return (
      <div style={pageWrap}>
        <div style={container}>
          {PdfModal}
          <SectionHeader
            title={`${b?.icon} ${b?.name}`}
            subtitle="Choose a semester to browse papers"
            onBack={() => setSelB(null)}
            backLabel="← All Branches"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
              gap: 14,
            }}
          >
            {SEMS.map((s) => (
              <div
                className="card-pop"
                key={s}
                onClick={() => setSelS(s)}
                style={{
                  background: "#fff",
                  borderRadius: 20,
                  padding: "1.5rem 1rem",
                  textAlign: "center",
                  border: "1px solid #d7e8f8",
                  boxShadow: "0 8px 20px rgba(187, 209, 230, 0.12)",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 32,
                    fontWeight: 800,
                    color: "#203f7f",
                    lineHeight: 1,
                  }}
                >
                  {s}
                </div>
                <div style={{ fontSize: 13, color: "#6b7a92", marginTop: 6 }}>Semester {s}</div>
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 10,
                    padding: "0.2rem 0.6rem",
                    background: "#e1f0ff",
                    color: "#2d77d0",
                    borderRadius: 999,
                    fontSize: 11,
                    fontWeight: 700,
                  }}
                >
                  {papers.filter((p) => p.branch === selB && p.sem === s).length} papers
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Subject listing ── */
  const filtered = papers.filter((p) => p.branch === selB && p.sem === selS);
  const grouped: Record<string, any[]> = {};
  filtered.forEach((p) => {
    if (!grouped[p.subject]) grouped[p.subject] = [];
    grouped[p.subject].push(p);
  });
  const subjectsList = Object.keys(grouped).sort();

  if (!selSubject) {
    return (
      <div style={pageWrap}>
        <div style={container}>
          {PdfModal}
          <SectionHeader
            title={`${b?.icon} ${b?.name} — Semester ${selS}`}
            subtitle={`${subjectsList.length} subjects found`}
            onBack={() => setSelS(null)}
            backLabel="← Semesters"
          />
          {subjectsList.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 1rem",
                background: "#fff",
                borderRadius: 20,
                border: "1px solid #d7e8f8",
              }}
            >
              <div style={{ fontSize: 48, opacity: 0.3, marginBottom: 12 }}>📂</div>
              <p style={{ fontWeight: 700, fontSize: 16, color: "#6b7a92" }}>No subjects found</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 14,
              }}
            >
              {subjectsList.map((subject) => (
                <div
                  className="card-pop"
                  key={subject}
                  onClick={() => setSelSubject(subject)}
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    padding: "1.2rem",
                    border: "1px solid #d7e8f8",
                    boxShadow: "0 8px 20px rgba(187, 209, 230, 0.12)",
                    cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 14,
                        background: "linear-gradient(180deg, #eef5ff, #e8f3ff)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 24,
                        flexShrink: 0,
                        boxShadow: "inset 0 1px 0 rgba(255,255,255,.8)",
                      }}
                    >
                      📄
                    </div>
                    <h3
                      style={{
                        margin: 0,
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 800,
                        fontSize: 14,
                        color: "#203f7f",
                        lineHeight: 1.3,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {subject}
                    </h3>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7a92", fontSize: 12, fontWeight: 600 }}>
                      {grouped[subject].length} variant{grouped[subject].length !== 1 ? "s" : ""}
                    </span>
                    <span
                      style={{
                        background: "#e1f0ff",
                        color: "#2d77d0",
                        fontSize: 12,
                        fontWeight: 700,
                        padding: "0.25rem 0.7rem",
                        borderRadius: 999,
                      }}
                    >
                      View →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }

  /* ── Paper variants for a subject ── */
  const subjectPapers = grouped[selSubject] || [];
  return (
    <div style={pageWrap}>
      <div style={container}>
        {PdfModal}
        <SectionHeader
          title={selSubject}
          subtitle={`${b?.icon} ${b?.name} · Semester ${selS} · ${subjectPapers.length} variant${subjectPapers.length !== 1 ? "s" : ""}`}
          onBack={() => setSelSubject(null)}
          backLabel="← Back to Subjects"
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 14,
          }}
        >
          {subjectPapers.map((p: any) => (
            <div
              className="card-pop"
              key={p.id}
              style={{
                background: "#fff",
                borderRadius: 18,
                padding: "1.2rem",
                border: "1px solid #d7e8f8",
                boxShadow: "0 8px 20px rgba(187, 209, 230, 0.12)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, gap: 8, flexWrap: "wrap" }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <span style={{ background: "#e1f0ff", color: "#2d77d0", fontSize: 11, fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: 999 }}>
                    {p.year}
                  </span>
                  <span style={{ background: "#f0f0f5", color: "#6b7a92", fontSize: 11, fontWeight: 700, padding: "0.2rem 0.6rem", borderRadius: 999 }}>
                    Scheme {p.scheme}
                  </span>
                  {p.season && (
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        padding: "0.2rem 0.6rem",
                        borderRadius: 999,
                        background: p.season === "Summer" ? "#fff0e0" : "#e0f0ff",
                        color: p.season === "Summer" ? "#c46a20" : "#2870b0",
                      }}
                    >
                      {p.season}
                    </span>
                  )}
                </div>
                <span style={{ color: "#9ca3af", fontSize: 11, fontFamily: "monospace" }}>{p.code}</span>
              </div>
              <div style={{ marginBottom: 12 }}>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 700,
                    padding: "0.3rem 0.7rem",
                    borderRadius: 999,
                    background:
                      p.paperType === "Question Paper"
                        ? "#fff5e0"
                        : p.paperType === "Solving Paper"
                        ? "#e0f4ff"
                        : "#e6ffe8",
                    color:
                      p.paperType === "Question Paper"
                        ? "#a67a1a"
                        : p.paperType === "Solving Paper"
                        ? "#1a6fa0"
                        : "#2a7a3a",
                  }}
                >
                  {p.paperType || "Model Answer"}
                </span>
              </div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button
                  className="btn-pop"
                  onClick={() => setViewPaper(p)}
                  style={{
                    flex: 1,
                    background: "linear-gradient(180deg, #fff7cf, #ffe796)",
                    border: "1px solid #efc557",
                    color: "#a26714",
                    padding: "0.55rem 1rem",
                    borderRadius: 12,
                    fontWeight: 800,
                    fontSize: 13,
                    cursor: "pointer",
                    boxShadow: "0 4px 12px rgba(239, 197, 87, 0.22)",
                  }}
                >
                  👁 View PDF
                </button>
                <a
                  className="btn-pop"
                  href={directLink(p.pdfUrl)}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    textDecoration: "none",
                    background: "linear-gradient(180deg, #eef7ff, #dceeff)",
                    border: "1px solid #96c8f5",
                    color: "#3172be",
                    padding: "0.55rem 1rem",
                    borderRadius: 12,
                    fontWeight: 800,
                    fontSize: 13,
                    boxShadow: "0 4px 12px rgba(150, 200, 245, 0.18)",
                  }}
                >
                  ⬇ Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
