import { useState, useEffect } from "react";
import { BRANCHES, SEMS } from "@/lib/data";
import { fbLoadManualPdfs, embedUrl, downloadLink } from "@/lib/firebase";

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

export default function ManualPdfPage() {
  const [selB, setSelB] = useState<string | null>(null);
  const [selS, setSelS] = useState<number | null>(null);
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [pdfView, setPdfView] = useState<{ title: string; url: string; subject: string } | null>(null);

  const b = selB ? BRANCHES.find((x) => x.code === selB) : null;

  useEffect(() => {
    if (!selB || !selS) return;
    setLoading(true);
    fbLoadManualPdfs(selB, selS).then((list) => {
      setSubjects(list);
      setLoading(false);
    });
  }, [selB, selS]);

  const pageWrap: React.CSSProperties = { background: "#f7fbff", minHeight: "60vh" };
  const container: React.CSSProperties = { maxWidth: 760, margin: "0 auto", padding: "1.25rem 1rem 2.5rem" };

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
          <div>
            <div className="text-primary-foreground font-bold">{pdfView.title}</div>
            <div className="text-white/60 text-xs mt-0.5">{pdfView.subject}</div>
          </div>
          <div className="flex gap-2 items-center">
            <a
              href={downloadLink(pdfView.url)}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "rgba(255,255,255,0.2)",
                border: "1px solid rgba(255,255,255,0.3)",
                color: "#fff",
                padding: "0.35rem 0.75rem",
                borderRadius: 10,
                fontWeight: 700,
                fontSize: 12,
                textDecoration: "none",
              }}
            >
              ⬇ Download
            </a>
            <button
              onClick={() => setPdfView(null)}
              className="bg-white/15 border-none text-primary-foreground w-[34px] h-[34px] rounded-full cursor-pointer text-base"
            >
              ✕
            </button>
          </div>
        </div>
        <div className="flex-1 min-h-[500px] bg-gray-700">
          <iframe
            src={embedUrl(pdfView.url)}
            className="w-full h-full min-h-[500px] border-none"
            title={pdfView.title}
            allowFullScreen
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
            title="📥 Manual PDFs"
            subtitle="Download subject manual PDFs — branch and semester wise"
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
            subtitle="Choose a semester to view manual PDFs"
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
                  Manual PDFs
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  /* ── Subject list with PDFs ── */
  return (
    <div style={pageWrap}>
      <div style={container}>
        {PdfModal}
        <SectionHeader
          title={`${b?.icon} ${b?.name} — Semester ${selS}`}
          subtitle={`${subjects.length} subject${subjects.length !== 1 ? "s" : ""} available`}
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
            <div style={{ fontSize: 48, opacity: 0.3, marginBottom: 12 }}>📥</div>
            <p style={{ fontWeight: 700, fontSize: 16, color: "#6b7a92" }}>No manual PDFs uploaded yet</p>
            <p style={{ fontSize: 13, color: "#9ca3af", marginTop: 6 }}>Check back later.</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {subjects.map((item: any) => {
              const pdfFiles = item.pdfFiles || [];
              const scheme = item.scheme || "K";
              return (
                <div
                  className="card-pop"
                  key={item.id}
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    border: "1px solid #d7e8f8",
                    boxShadow: "0 8px 20px rgba(187, 209, 230, 0.12)",
                    overflow: "hidden",
                  }}
                >
                  <div style={{ padding: "1rem 1.2rem", display: "flex", alignItems: "flex-start", gap: 14 }}>
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
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <h3
                        style={{
                          margin: 0,
                          fontFamily: "'Space Grotesk', sans-serif",
                          fontWeight: 800,
                          fontSize: 15,
                          color: "#203f7f",
                          lineHeight: 1.3,
                        }}
                      >
                        {item.subjectName}
                      </h3>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 6, flexWrap: "wrap" }}>
                        <span
                          style={{
                            background: "#e1f0ff",
                            color: "#2d77d0",
                            fontSize: 11,
                            fontWeight: 700,
                            padding: "0.15rem 0.5rem",
                            borderRadius: 999,
                          }}
                        >
                          {item.subjectCode}
                        </span>
                        <span style={{ color: "#9ca3af", fontSize: 12 }}>Scheme {scheme}</span>
                        <span style={{ color: "#6b7a92", fontSize: 12, fontWeight: 600 }}>
                          {pdfFiles.length} PDF{pdfFiles.length !== 1 ? "s" : ""}
                        </span>
                      </div>

                      {pdfFiles.length > 0 && (
                        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                          {pdfFiles.map((f: any, i: number) => (
                            <button
                              key={i}
                              onClick={() =>
                                setPdfView({
                                  title: `${item.subjectName} - PDF ${i + 1}`,
                                  url: f.url,
                                  subject: `${item.subjectCode} · ${item.subjectName}`,
                                })
                              }
                              style={{
                                background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                                color: "#fff",
                                border: "none",
                                padding: "0.4rem 0.85rem",
                                borderRadius: 10,
                                fontWeight: 700,
                                fontSize: 12,
                                cursor: "pointer",
                              }}
                            >
                              📄 Manual PDF {i + 1}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
