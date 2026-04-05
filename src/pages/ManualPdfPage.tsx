import { useState, useEffect } from "react";
import { BRANCHES, SEMS } from "@/lib/data";
import { fbLoadManualPdfs, embedUrl, downloadLink } from "@/lib/firebase";

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

  return (
    <div className="container mx-auto py-8">
      {/* PDF Viewer Modal */}
      {pdfView && (
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
                  className="bg-white/20 border border-white/30 text-primary-foreground px-3 py-1.5 rounded-lg font-bold text-xs no-underline"
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
      )}

      {/* Hero */}
      <div className="gradient-hero rounded-[22px] px-6 md:px-10 py-8 mb-8 text-primary-foreground relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-[200px] h-[200px] rounded-full bg-accent/[0.12] pointer-events-none" />
        <p className="text-[0.7rem] font-extrabold text-orange-200 tracking-[1px] uppercase mb-3">
          K SCHEME - DOWNLOADABLE SUBJECT MANUALS
        </p>
        <h1 className="text-[clamp(1.5rem,4vw,2.25rem)] font-black font-heading mb-1">📥 Manual PDFs</h1>
        <p className="opacity-75 text-[0.9375rem]">Download subject manual PDFs — branch and semester wise</p>
        {(selB || selS) && (
          <div className="flex items-center gap-2 mt-4 text-sm flex-wrap">
            <span
              onClick={() => { setSelB(null); setSelS(null); }}
              className="text-blue-300 cursor-pointer font-semibold"
            >
              All Branches
            </span>
            {selB && (
              <>
                <span className="opacity-50">›</span>
                <span
                  onClick={() => setSelS(null)}
                  className={`cursor-pointer font-semibold ${selS ? "text-blue-300" : "text-primary-foreground font-bold"}`}
                >
                  {b?.icon} {b?.name}
                </span>
              </>
            )}
            {selS && (
              <>
                <span className="opacity-50">›</span>
                <span className="text-primary-foreground font-bold">Semester {selS}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Branch selection */}
      {!selB && (
        <div>
          <h2 className="text-xl font-extrabold font-heading mb-5 text-foreground">Select Your Branch</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {BRANCHES.map((br) => (
              <div
                key={br.code}
                onClick={() => setSelB(br.code)}
                className="bg-card rounded-2xl p-6 text-center border-2 border-transparent shadow-card hover:border-primary hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <div className="text-3xl mb-2">{br.icon}</div>
                <div className="font-extrabold text-primary text-lg font-heading">{br.code}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-tight">{br.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Semester selection */}
      {selB && !selS && (
        <div>
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <button
              onClick={() => setSelB(null)}
              className="bg-transparent border-2 border-secondary px-4 py-2 rounded-lg font-semibold text-muted-foreground"
            >
              ← Back
            </button>
            <div>
              <h2 className="text-2xl font-extrabold font-heading">
                {b?.icon} {b?.name}
              </h2>
              <p className="text-muted-foreground text-sm mt-0.5">Choose a semester</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-4">
            {SEMS.map((s) => (
              <button
                key={s}
                onClick={() => setSelS(s)}
                className="bg-card border-2 border-secondary rounded-2xl px-8 py-6 text-center shadow-card hover:border-primary hover:-translate-y-1 transition-all duration-200 min-w-[140px]"
              >
                <div className="text-[2.25rem] font-black text-primary font-heading leading-none">{s}</div>
                <div className="text-[0.8rem] text-muted-foreground mt-1">Semester {s}</div>
                <div className="mt-2.5 bg-blue-100 text-[hsl(var(--primary-dark))] text-[0.7rem] font-bold py-0.5 px-3 rounded-full inline-block">
                  Manual PDFs
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Subject list with PDFs */}
      {selB && selS && (
        <div>
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <button
              onClick={() => setSelS(null)}
              className="bg-transparent border-2 border-secondary px-4 py-2 rounded-lg font-semibold text-muted-foreground"
            >
              ← Back
            </button>
            <div>
              <h2 className="text-xl font-extrabold font-heading">
                {b?.icon} {b?.name} — Semester {selS}
              </h2>
              <p className="text-muted-foreground text-sm mt-0.5">
                {subjects.length} subject{subjects.length !== 1 ? "s" : ""} available
              </p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16 text-muted-foreground">
              <div className="w-9 h-9 border-4 border-blue-100 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p>Loading...</p>
            </div>
          ) : subjects.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-2xl shadow-card">
              <div className="text-5xl mb-4 opacity-30">📥</div>
              <p className="font-bold text-lg text-muted-foreground">No manual PDFs uploaded yet</p>
              <p className="text-sm text-muted-foreground mt-2">Check back later.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {subjects.map((item: any) => {
                const pdfFiles = item.pdfFiles || [];
                const scheme = item.scheme || "K";
                return (
                  <div
                    key={item.id}
                    className="bg-card rounded-[20px] border border-secondary shadow-card overflow-hidden animate-fade-up hover:shadow-card-hover transition-shadow"
                  >
                    {/* Accent bar */}
                    <div className="h-1 gradient-hero" />

                    <div className="flex items-stretch flex-wrap">
                      {/* Code tile */}
                      <div className="w-[90px] gradient-hero flex flex-col items-center justify-center p-3 shrink-0">
                        <div className="text-[0.45rem] font-bold text-white/55 uppercase tracking-wider text-center">
                          {scheme} Scheme
                        </div>
                        <div className="text-sm font-black text-primary-foreground my-0.5">{item.subjectCode}</div>
                        <div className="text-[0.35rem] font-bold text-white/55 uppercase tracking-wider text-center">
                          MANUAL
                        </div>
                      </div>

                      {/* Subject info */}
                      <div className="flex-1 min-w-0 p-4">
                        <h3 className="font-extrabold text-foreground font-heading text-[1.0625rem] leading-tight">
                          {item.subjectName}
                        </h3>
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className="bg-blue-100 text-[hsl(var(--primary-dark))] text-[0.7rem] font-bold py-0.5 px-2.5 rounded-full">
                            {item.subjectCode}
                          </span>
                          <span className="bg-secondary text-muted-foreground text-[0.7rem] font-bold py-0.5 px-2.5 rounded-full">
                            Scheme {scheme}
                          </span>
                          <span className="text-muted-foreground text-xs font-semibold">
                            {pdfFiles.length} PDF{pdfFiles.length !== 1 ? "s" : ""}
                          </span>
                        </div>

                        {/* PDF links */}
                        {pdfFiles.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-3">
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
                                className="gradient-primary text-primary-foreground border-none px-3 py-1.5 rounded-lg font-bold cursor-pointer text-[0.78rem]"
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
      )}
    </div>
  );
}
