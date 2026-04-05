import { useState, useEffect } from "react";
import { MANUAL_BRANCHES, SEMS } from "@/lib/data";
import { fbLoadManualSubjects, embedUrl } from "@/lib/firebase";

/* ── tiny reusable blob layer ── */
const Blobs = () => (
  <>
    <div style={{ position: "absolute", right: -36, top: -14, width: 120, height: 120, background: "#d9ecff", opacity: 0.45, borderRadius: "46% 54% 36% 64% / 38% 34% 66% 62%" }} />
    <div style={{ position: "absolute", left: -30, bottom: -20, width: 100, height: 100, background: "#dff8f4", opacity: 0.4, borderRadius: "53% 47% 61% 39% / 40% 52% 48% 60%" }} />
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

export default function ManualPage() {
  const [selB, setSelB] = useState<string | null>(null);
  const [selS, setSelS] = useState<number | null>(null);
  const [selSubject, setSelSubject] = useState<string | null>(null);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pdfView, setPdfView] = useState<{ title: string; url: string } | null>(null);

  const b = selB ? MANUAL_BRANCHES.find((x) => x.code === selB) : null;

  useEffect(() => {
    if (!selB || !selS) return;
    setLoading(true);
    fbLoadManualSubjects(selB, selS).then((list) => {
      setSubjects(list);
      setLoading(false);
    });
  }, [selB, selS]);

  const pageWrap: React.CSSProperties = {
    background: "#f7fbff",
    minHeight: "60vh",
  };
  const container: React.CSSProperties = {
    maxWidth: 760,
    margin: "0 auto",
    padding: "1.25rem 1rem 2.5rem",
  };

  /* ── PDF Modal ── */
  const PdfModal = pdfView ? (
    <div
      className="fixed inset-0 bg-black/65 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm"
      onClick={() => setPdfView(null)}
    >
      <div
        className="bg-card rounded-[20px] w-full max-w-[900px] max-h-[92vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="gradient-hero px-6 py-4 flex justify-between items-center shrink-0">
          <div className="text-primary-foreground font-bold">{pdfView.title}</div>
          <button
            onClick={() => setPdfView(null)}
            className="bg-white/15 border-none text-primary-foreground w-[34px] h-[34px] rounded-full cursor-pointer text-base"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 min-h-[460px] bg-gray-700">
          <iframe
            src={embedUrl(pdfView.url)}
            className="w-full h-full min-h-[460px] border-none"
            title={pdfView.title}
          />
        </div>
      </div>
    </div>
  ) : null;

  /* ── Branch selection ── */
  if (!selB) {
    return (
      <div style={pageWrap}>
        <div style={container}>
          {PdfModal}
          <SectionHeader
            title="📖 Manual Answer Papers"
            subtitle="K Scheme practical manual answers — branch and semester wise"
          />
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
              gap: 14,
            }}
          >
            {MANUAL_BRANCHES.map((br) => (
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
                  6 Sems
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
            subtitle="Choose a semester to view manual answers"
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
                  Manual Answers
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Subject list ── */
  if (!selSubject) {
    return (
      <div style={pageWrap}>
        <div style={container}>
          {PdfModal}
          <SectionHeader
            title={`${b?.icon} ${b?.name} — Semester ${selS}`}
            subtitle="Select a subject to view practicals"
            onBack={() => setSelS(null)}
            backLabel="← Semesters"
          />
          {loading ? (
            <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
              <div className="w-10 h-10 border-4 border-blue-100 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p style={{ fontWeight: 700, color: "#6b7a92" }}>Loading...</p>
            </div>
          ) : subjects.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                padding: "3rem 1rem",
                background: "#fff",
                borderRadius: 20,
                border: "1px solid #d7e8f8",
              }}
            >
              <div style={{ fontSize: 48, opacity: 0.3, marginBottom: 12 }}>📖</div>
              <p style={{ fontWeight: 700, fontSize: 16, color: "#6b7a92" }}>No manual answers uploaded yet</p>
              <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 6 }}>Check back later.</p>
            </div>
          ) : (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                gap: 14,
              }}
            >
              {subjects.map((item: any) => (
                <div
                  className="card-pop"
                  key={item.id}
                  onClick={() => setSelSubject(item.subject)}
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
                      📖
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
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
                        {item.subject}
                      </h3>
                      <p style={{ margin: "2px 0 0", fontSize: 11, color: "#9ca3af" }}>Code: {item.code}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ color: "#6b7a92", fontSize: 12, fontWeight: 600 }}>
                      {item.practicals?.length || 0} practical{(item.practicals?.length || 0) !== 1 ? "s" : ""}
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

  /* ── Practicals for selected subject ── */
  const selectedItem = subjects.find((s: any) => s.subject === selSubject);
  const pList = selectedItem?.practicals || [];

  return (
    <div style={pageWrap}>
      <div style={container}>
        {PdfModal}
        <SectionHeader
          title={selSubject}
          subtitle={`${b?.icon} ${b?.name} · Semester ${selS} · ${pList.length} practical${pList.length !== 1 ? "s" : ""}`}
          onBack={() => setSelSubject(null)}
          backLabel="← Back to Subjects"
        />
        {pList.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "3rem 1rem",
              background: "#fff",
              borderRadius: 20,
              border: "1px solid #d7e8f8",
            }}
          >
            <div style={{ fontSize: 48, opacity: 0.3, marginBottom: 12 }}>📋</div>
            <p style={{ fontWeight: 700, fontSize: 16, color: "#6b7a92" }}>No practicals uploaded yet</p>
            <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 6 }}>Check back soon.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {pList.map((p: any, i: number) => (
              <div
                className="card-pop"
                key={p.id || i}
                style={{
                  background: "#fff",
                  borderRadius: 16,
                  padding: "1rem 1.2rem",
                  border: "1px solid #d7e8f8",
                  boxShadow: "0 4px 12px rgba(187, 209, 230, 0.1)",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 14,
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#203f7f", lineHeight: 1.3 }}>
                    {p.title}
                  </div>
                  {p.description && (
                    <div style={{ fontSize: 12, color: "#9ca3af", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {p.description}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => setPdfView({ title: p.title, url: p.pdfUrl })}
                  style={{
                    background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                    color: "#fff",
                    border: "none",
                    padding: "0.45rem 1rem",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 13,
                    cursor: "pointer",
                    flexShrink: 0,
                  }}
                >
                  👁 View PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
