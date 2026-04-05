import { useState, useEffect } from "react";
import { SYLLABUS_BRANCHES, SEMS } from "@/lib/data";
import { fbLoadSyllabus, embedUrl, directLink } from "@/lib/firebase";

export default function SyllabusPage() {
  const [selB, setSelB] = useState<string | null>(null);
  const [searchQ, setSearchQ] = useState("");
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
              <div className="text-primary-foreground font-bold">{pdfView.title}</div>
              <div className="flex gap-2">
                <a
                  href={directLink(pdfView.url)}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-white/20 border border-white/30 text-primary-foreground px-3 py-1.5 rounded-lg font-bold text-xs no-underline"
                >
                  ↗ Open
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
      <div className="gradient-hero rounded-[22px] px-6 md:px-10 py-8 mb-6 text-primary-foreground relative overflow-hidden">
        <div className="absolute -right-10 -top-10 w-[180px] h-[180px] rounded-full bg-accent/10 pointer-events-none" />
        <p className="text-[0.7rem] font-extrabold text-orange-200 tracking-[1px] uppercase mb-2">MSBTE K SCHEME</p>
        <h1 className="text-[clamp(1.4rem,3.5vw,2rem)] font-black font-heading mb-1">📋 Syllabus</h1>
        <p className="opacity-75 text-[0.9rem]">
          Select your branch to view subject-wise syllabus for all semesters
        </p>
      </div>

      {/* Search */}
      <div className="bg-card rounded-2xl border border-secondary shadow-card p-5 mb-6">
        <p className="font-bold text-xs text-muted-foreground uppercase tracking-[1px] mb-3">Select Branch</p>
        <div className="relative">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-base pointer-events-none">🔍</span>
          <input
            value={searchQ}
            onChange={(e) => setSearchQ(e.target.value)}
            placeholder="Search branch name or code e.g. CO, Civil, Computer..."
            className="w-full py-3 pr-4 pl-10 border-2 border-secondary rounded-xl text-[0.9rem] outline-none bg-secondary/50 focus:border-primary transition-colors"
          />
        </div>
        {searchQ &&
          (() => {
            const filtered = SYLLABUS_BRANCHES.filter(
              (br) =>
                br.name.toLowerCase().includes(searchQ.toLowerCase()) ||
                br.code.toLowerCase().includes(searchQ.toLowerCase())
            );
            return (
              <div className="mt-2 max-h-[220px] overflow-y-auto rounded-[10px] border border-secondary bg-card shadow-lg">
                {filtered.length === 0 ? (
                  <div className="p-3 text-muted-foreground text-sm text-center">No branch found</div>
                ) : (
                  filtered.map((br) => (
                    <div
                      key={br.code}
                      onClick={() => {
                        setSelB(br.code);
                        setSearchQ("");
                      }}
                      className="flex items-center gap-3.5 px-4 py-2.5 cursor-pointer border-b border-secondary/50 hover:bg-blue-50 transition-colors"
                    >
                      <span className="text-xl shrink-0">{br.icon}</span>
                      <span className="font-extrabold text-primary text-[0.88rem] font-heading mr-1.5">
                        {br.code}
                      </span>
                      <span className="text-muted-foreground text-[0.85rem]">{br.name}</span>
                    </div>
                  ))
                )}
              </div>
            );
          })()}
        {selB && !searchQ && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-muted-foreground font-semibold">Selected:</span>
            <span className="inline-flex items-center gap-1.5 gradient-primary text-primary-foreground py-1 px-3.5 rounded-full font-bold text-[0.82rem]">
              {b?.icon} {b?.name}
              <button
                onClick={() => setSelB(null)}
                className="bg-white/25 border-none text-primary-foreground rounded-full w-[18px] h-[18px] text-[0.65rem] ml-1 cursor-pointer"
              >
                ✕
              </button>
            </span>
          </div>
        )}
      </div>

      {/* Branch grid if no selection */}
      {!selB && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {SYLLABUS_BRANCHES.map((br) => (
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
      )}

      {/* Semester tables */}
      {selB && (
        <div className="flex flex-col gap-5">
          {loadingAll ? (
            <div className="text-center py-16 text-muted-foreground">
              <div className="w-9 h-9 border-4 border-blue-100 border-t-primary rounded-full animate-spin mx-auto mb-4" />
              <p>Loading syllabus...</p>
            </div>
          ) : (
            SEMS.map((s) => {
              const items = allData[s] || [];
              return (
                <div key={s} className="bg-card rounded-2xl border border-secondary shadow-card overflow-hidden">
                  <div className="gradient-primary px-5 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-[34px] h-[34px] rounded-[10px] bg-white/20 border border-white/30 flex items-center justify-center text-primary-foreground font-black font-heading">
                        {s}
                      </div>
                      <div>
                        <p className="text-primary-foreground font-extrabold text-[0.9375rem] font-heading leading-none">
                          Semester {s}
                        </p>
                        <p className="text-white/60 text-[0.72rem] mt-0.5">
                          {items.length} subject{items.length !== 1 ? "s" : ""}
                        </p>
                      </div>
                    </div>
                  </div>
                  {items.length === 0 ? (
                    <div className="p-5 text-center text-muted-foreground text-sm bg-secondary/30">
                      No subjects uploaded yet.
                    </div>
                  ) : (
                    <div className="divide-y divide-secondary">
                      {items.map((item: any) => (
                        <div key={item.id} className="px-5 py-3 flex items-center justify-between gap-3 hover:bg-blue-50/50 transition-colors">
                          <div className="flex-1 min-w-0">
                            <div className="font-bold text-foreground text-[0.9375rem]">{item.subjectName}</div>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="bg-blue-100 text-[hsl(var(--primary-dark))] text-[0.7rem] font-bold py-0.5 px-2 rounded-full">
                                {item.subjectCode}
                              </span>
                              <span className="text-muted-foreground text-xs">Scheme {item.scheme || "K"}</span>
                            </div>
                          </div>
                          <div className="flex gap-2 shrink-0">
                            {item.pdfUrl && (
                              <button
                                onClick={() =>
                                  setPdfView({
                                    title: `${item.subjectName} - Syllabus`,
                                    url: item.pdfUrl,
                                  })
                                }
                                className="gradient-primary text-primary-foreground border-none px-3 py-1.5 rounded-lg font-bold cursor-pointer text-[0.78rem]"
                              >
                                👁 View
                              </button>
                            )}
                            {item.dlUrl && (
                              <a
                                href={item.dlUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-card border-2 border-primary/30 text-[hsl(var(--primary-dark))] px-3 py-1.5 rounded-lg font-bold text-[0.78rem] no-underline"
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
            })
          )}
        </div>
      )}
    </div>
  );
}
