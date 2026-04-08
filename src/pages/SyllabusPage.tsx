import { useState, useEffect } from "react";
import { SYLLABUS_BRANCHES, SEMS } from "@/lib/data";
import { fbLoadSyllabus, embedUrl, directLink } from "@/lib/firebase";

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

/* ── PDF Modal ── */
const PdfModal = ({
  pdfView,
  onClose,
}: {
  pdfView: { title: string; url: string } | null;
  onClose: () => void;
}) => {
  if (!pdfView) return null;
  return (
    <div
      className="fixed inset-0 bg-black/65 flex items-center justify-center z-[9999] p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-[20px] w-full max-w-[900px] max-h-[92vh] flex flex-col overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="gradient-hero px-6 py-4 flex justify-between items-center shrink-0">
          <div className="text-primary-foreground font-bold">{pdfView.title}</div>
          <div className="flex gap-2">
            <a
              href={directLink(pdfView.url)}
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
              ↗ Open
            </a>
            <button
              onClick={onClose}
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
  );
};

export default function SyllabusPage() {
  const [selB, setSelB] = useState<string | null>(null);
  const [allData, setAllData] = useState<Record<number, any[]>>({});
  const [loadingAll, setLoadingAll] = useState(false);
  const [pdfView, setPdfView] = useState<{ title: string; url: string } | null>(null);

  const b = selB ? SYLLABUS_BRANCHES.find((x) => x.code === selB) : null;

  useEffect(() => {
    if (!selB) {
      setAllData({});
      return;
    }
    setLoadingAll(true);
    Promise.all(SEMS.map((s) => fbLoadSyllabus(selB, s).then((list) => ({ s, list })))).then(
      (results) => {
        const d: Record<number, any[]> = {};
        results.forEach(({ s, list }) => (d[s] = list));
        setAllData(d);
        setLoadingAll(false);
      }
    );
  }, [selB]);

  const pageWrap: React.CSSProperties = {
    background: "#f7fbff",
    minHeight: "60vh",
    position: "relative",
    overflow: "hidden",
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
        {/* Decorative background blobs */}
        <div style={{ position: "absolute", left: -60, top: 180, width: 200, height: 200, background: "#d9ecff", opacity: 0.35, borderRadius: "46% 54% 36% 64% / 38% 34% 66% 62%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: -40, top: 320, width: 160, height: 160, background: "#dff8f4", opacity: 0.3, borderRadius: "53% 47% 61% 39% / 40% 52% 48% 60%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: 20, top: 550, width: 130, height: 130, background: "#e9faf9", opacity: 0.3, borderRadius: "57% 43% 64% 36% / 38% 57% 43% 62%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", right: -30, top: 700, width: 180, height: 180, background: "#d9f6f7", opacity: 0.25, borderRadius: "42% 58% 39% 61% / 60% 35% 65% 40%", pointerEvents: "none" }} />
        <div style={{ position: "absolute", left: -50, top: 950, width: 150, height: 150, background: "#e8f3ff", opacity: 0.3, borderRadius: "54% 46% 65% 35% / 48% 35% 65% 52%", pointerEvents: "none" }} />
        <div style={{ ...container, position: "relative", zIndex: 1 }}>
          <PdfModal pdfView={pdfView} onClose={() => setPdfView(null)} />
          <SectionHeader
            title="📋 Syllabus"
            subtitle="Select your branch to view subject-wise syllabus for all semesters"
          />

          {/* Search not needed in card view, but keep branch grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(155px, 1fr))",
              gap: 14,
            }}
          >
            {SYLLABUS_BRANCHES.map((br) => (
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

  /* ── Semester tables for selected branch ── */
  return (
    <div style={pageWrap}>
      {/* Decorative background blobs */}
      <div style={{ position: "absolute", left: -60, top: 180, width: 200, height: 200, background: "#d9ecff", opacity: 0.35, borderRadius: "46% 54% 36% 64% / 38% 34% 66% 62%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: -40, top: 320, width: 160, height: 160, background: "#dff8f4", opacity: 0.3, borderRadius: "53% 47% 61% 39% / 40% 52% 48% 60%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: 20, top: 550, width: 130, height: 130, background: "#e9faf9", opacity: 0.3, borderRadius: "57% 43% 64% 36% / 38% 57% 43% 62%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", right: -30, top: 700, width: 180, height: 180, background: "#d9f6f7", opacity: 0.25, borderRadius: "42% 58% 39% 61% / 60% 35% 65% 40%", pointerEvents: "none" }} />
      <div style={{ position: "absolute", left: -50, top: 950, width: 150, height: 150, background: "#e8f3ff", opacity: 0.3, borderRadius: "54% 46% 65% 35% / 48% 35% 65% 52%", pointerEvents: "none" }} />
      <div style={container}>
        <PdfModal pdfView={pdfView} onClose={() => setPdfView(null)} />
        <SectionHeader
          title={`${b?.icon} ${b?.name} — Syllabus`}
          subtitle="Subject-wise syllabus for all semesters"
          onBack={() => setSelB(null)}
          backLabel="← All Branches"
        />

        {loadingAll ? (
          <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <div className="w-10 h-10 border-4 border-blue-100 border-t-primary rounded-full animate-spin mx-auto mb-4" />
            <p style={{ fontWeight: 700, color: "#6b7a92" }}>Loading syllabus...</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {SEMS.map((s) => {
              const items = allData[s] || [];
              return (
                <div
                  key={s}
                  style={{
                    background: "#fff",
                    borderRadius: 20,
                    border: "1px solid #d7e8f8",
                    boxShadow: "0 8px 20px rgba(187, 209, 230, 0.12)",
                    overflow: "hidden",
                  }}
                >
                  {/* Semester header */}
                  <div
                    style={{
                      background: "linear-gradient(135deg, #3b82f6, #2563eb)",
                      padding: "0.75rem 1.2rem",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: 10,
                        background: "rgba(255,255,255,0.2)",
                        border: "1px solid rgba(255,255,255,0.3)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#fff",
                        fontWeight: 800,
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 15,
                      }}
                    >
                      {s}
                    </div>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 800, fontSize: 15, fontFamily: "'Space Grotesk', sans-serif" }}>
                        Semester {s}
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 2 }}>
                        {items.length} subject{items.length !== 1 ? "s" : ""}
                      </div>
                    </div>
                  </div>

                  {/* Subject list */}
                  {items.length === 0 ? (
                    <div style={{ padding: "1.2rem", textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
                      No subjects uploaded yet.
                    </div>
                  ) : (
                    <div>
                      {items.map((item: any, idx: number) => (
                        <div
                          key={item.id}
                          style={{
                            padding: "0.75rem 1.2rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: 12,
                            borderTop: idx > 0 ? "1px solid #eef3fa" : "none",
                          }}
                        >
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontWeight: 700, fontSize: 14, color: "#203f7f" }}>
                              {item.subjectName}
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
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
                              <span style={{ color: "#9ca3af", fontSize: 12 }}>
                                Scheme {item.scheme || "K"}
                              </span>
                            </div>
                          </div>
                          <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
                            {item.pdfUrl && (
                              <button
                                onClick={() =>
                                  setPdfView({
                                    title: `${item.subjectName} - Syllabus`,
                                    url: item.pdfUrl,
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
                                👁 View
                              </button>
                            )}
                            {item.dlUrl && (
                              <a
                                href={item.dlUrl}
                                target="_blank"
                                rel="noreferrer"
                                style={{
                                  background: "#fff",
                                  border: "2px solid #d7e8f8",
                                  color: "#2d77d0",
                                  padding: "0.4rem 0.85rem",
                                  borderRadius: 10,
                                  fontWeight: 700,
                                  fontSize: 12,
                                  textDecoration: "none",
                                  display: "inline-flex",
                                  alignItems: "center",
                                }}
                              >
                                ⬇
                              </a>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
