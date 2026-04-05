import { useState, useEffect } from "react";
import { MANUAL_BRANCHES, SEMS } from "@/lib/data";
import { fbLoadManualSubjects, embedUrl } from "@/lib/firebase";

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
              </div>
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
      )}

      {/* Hero */}
      <div className="gradient-hero rounded-[22px] px-6 md:px-10 py-8 mb-8 text-primary-foreground relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-[180px] h-[180px] rounded-full bg-accent/10 pointer-events-none" />
        <p className="text-[0.7rem] font-extrabold text-orange-200 tracking-[1px] uppercase mb-3">
          K SCHEME — PRACTICAL MANUAL ANSWERS
        </p>
        <h1 className="text-[clamp(1.5rem,4vw,2.25rem)] font-black font-heading mb-1">
          📖 Manual Answer Papers
        </h1>
        <p className="opacity-75 text-[0.9375rem]">
          K Scheme practical manual answers — branch and semester wise
        </p>
        {(selB || selS || selSubject) && (
          <div className="flex items-center gap-2 mt-4 text-sm flex-wrap">
            <span
              onClick={() => { setSelB(null); setSelS(null); setSelSubject(null); }}
              className="text-blue-300 cursor-pointer font-semibold"
            >
              All Branches
            </span>
            {selB && (
              <>
                <span className="opacity-50">›</span>
                <span
                  onClick={() => { setSelS(null); setSelSubject(null); }}
                  className="text-blue-300 cursor-pointer font-semibold"
                >
                  {b?.icon} {b?.name}
                </span>
              </>
            )}
            {selS && (
              <>
                <span className="opacity-50">›</span>
                <span
                  onClick={() => setSelSubject(null)}
                  className={selSubject ? "text-blue-300 cursor-pointer font-semibold" : "text-primary-foreground font-bold"}
                >
                  Semester {selS}
                </span>
              </>
            )}
            {selSubject && (
              <>
                <span className="opacity-50">›</span>
                <span className="text-primary-foreground font-bold">{selSubject}</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Branch selection */}
      {!selB && (
        <div>
          <h2 className="text-xl font-extrabold font-heading mb-5 text-foreground">Select Your Branch</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {MANUAL_BRANCHES.map((br) => (
              <div
                key={br.code}
                onClick={() => setSelB(br.code)}
                className="bg-card rounded-2xl p-6 text-center border-2 border-transparent shadow-card hover:border-primary hover:-translate-y-1 transition-all duration-200 cursor-pointer"
              >
                <div className="w-[52px] h-[52px] rounded-[15px] bg-blue-50 flex items-center justify-center text-2xl mx-auto mb-3">
                  {br.icon}
                </div>
                <div className="font-extrabold text-primary text-lg font-heading">{br.code}</div>
                <div className="text-xs text-muted-foreground mt-1 leading-tight">{br.name}</div>
                <div className="mt-2 bg-blue-100 text-[hsl(var(--primary-dark))] text-[0.68rem] font-bold py-0.5 px-2.5 rounded-full inline-block">
                  6 Sems
                </div>
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
              <p className="text-muted-foreground text-sm mt-0.5">Choose semester</p>
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
                  Manual Answers
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Subject list */}
      {selB && selS && !selSubject && (
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
                {b?.icon} {b?.name} — Sem {selS}
              </h2>
              <p className="text-muted-foreground text-sm mt-0.5">Select a subject to view practicals</p>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-16 text-muted-foreground">
              <div className="w-9 h-9 border-4 border-blue-100 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p>Loading...</p>
            </div>
          ) : subjects.length === 0 ? (
            <div className="text-center py-16 bg-card rounded-2xl shadow-card">
              <div className="text-5xl mb-4 opacity-30">📖</div>
              <p className="font-bold text-lg text-muted-foreground">No manual answers uploaded yet</p>
              <p className="text-sm text-muted-foreground mt-2">Check back later.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {subjects.map((item: any) => (
                <div
                  key={item.id}
                  onClick={() => setSelSubject(item.subject)}
                  className="bg-card rounded-2xl p-7 cursor-pointer border-2 border-secondary shadow-card hover:border-primary hover:-translate-y-1 hover:shadow-card-hover transition-all duration-300 animate-fade-up"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-2xl shrink-0">
                      📖
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[1.0625rem] font-extrabold font-heading text-foreground mb-1 leading-tight line-clamp-2">
                        {item.subject}
                      </h3>
                      <p className="text-xs text-muted-foreground font-semibold">Code: {item.code}</p>
                    </div>
                  </div>
                  {item.description && (
                    <p className="text-[0.8125rem] text-muted-foreground mb-4 leading-relaxed">{item.description}</p>
                  )}
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-muted-foreground text-[0.8125rem] font-semibold">
                      {item.practicals?.length || 0} practical
                      {(item.practicals?.length || 0) !== 1 ? "s" : ""}
                    </span>
                    <div className="bg-blue-100 text-[hsl(var(--primary-dark))] text-xs font-bold py-1 px-3 rounded-full">
                      View →
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Practicals for selected subject */}
      {selB && selS && selSubject && (
        <div>
          <div className="flex items-center gap-4 mb-6 flex-wrap">
            <button
              onClick={() => setSelSubject(null)}
              className="bg-transparent border-2 border-secondary px-4 py-2 rounded-lg font-semibold text-muted-foreground"
            >
              ← Back to Subjects
            </button>
            <div>
              <h2 className="text-xl font-extrabold font-heading">{selSubject}</h2>
              <p className="text-muted-foreground text-sm mt-0.5">
                {b?.icon} {b?.name} · Semester {selS}
              </p>
            </div>
          </div>

          {subjects
            .filter((s: any) => s.subject === selSubject)
            .map((item: any) => {
              const pList = item.practicals || [];
              return (
                <div
                  key={item.id}
                  className="bg-card rounded-2xl border border-secondary shadow-card overflow-hidden"
                >
                  {/* Header */}
                  <div className="gradient-hero p-5 flex gap-5 items-start">
                    <div className="w-[95px] h-[76px] rounded-xl bg-white/20 border border-white/30 flex flex-col items-center justify-center shrink-0 text-center">
                      <div className="text-[0.55rem] font-extrabold text-white/80 uppercase tracking-wider mb-0.5">
                        {item.scheme || "K"} Scheme
                      </div>
                      <div className="text-xs font-black text-primary-foreground leading-tight mb-0.5">
                        {item.code}
                      </div>
                      <div className="text-[0.5rem] font-bold text-white/75 uppercase">MANUAL ANS</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-extrabold text-primary-foreground font-heading leading-tight">
                        {item.code} — {item.subject}
                      </h3>
                      <p className="text-white/70 text-sm mt-1 line-clamp-2">
                        {item.description || `K Scheme manual answer for ${item.subject}.`}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-xs text-white/60">
                        <span className="font-bold uppercase tracking-wider">{b?.icon} MSBTE PAPERS</span>
                        <span>{pList.length} Practical{pList.length !== 1 ? "s" : ""}</span>
                      </div>
                    </div>
                  </div>

                  {/* Practicals list */}
                  <div className="bg-secondary/30">
                    {pList.length === 0 ? (
                      <div className="text-center py-10">
                        <div className="text-4xl opacity-30 mb-3">📋</div>
                        <p className="font-bold text-muted-foreground">No practicals uploaded yet</p>
                        <p className="text-sm text-muted-foreground mt-1">Check back soon.</p>
                      </div>
                    ) : (
                      pList.map((p: any, i: number) => (
                        <div
                          key={p.id || i}
                          className="flex items-center bg-card border-b border-secondary hover:bg-blue-50/50 transition-colors"
                        >
                          <div className="w-[52px] shrink-0 flex items-center justify-center self-stretch bg-primary/5 border-r-2 border-primary/10">
                            <div className="w-[30px] h-[30px] rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-black text-sm">
                              {i + 1}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0 px-4 py-3">
                            <div className="font-bold text-[0.9375rem] text-foreground leading-tight">
                              {p.title}
                            </div>
                            {p.description && (
                              <div className="text-xs text-muted-foreground mt-1 truncate">{p.description}</div>
                            )}
                          </div>
                          <div className="flex items-center gap-2 px-4 py-3 shrink-0">
                            <button
                              onClick={() => setPdfView({ title: p.title, url: p.pdfUrl })}
                              className="gradient-primary text-primary-foreground border-none px-4 py-2 rounded-lg font-bold cursor-pointer text-[0.8rem]"
                            >
                              👁 View PDF
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
