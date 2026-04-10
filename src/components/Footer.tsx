import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer style={{ background: "#0f172a", color: "#64748b", padding: "2.5rem 1.25rem", marginTop: "4rem" }}>
      <div style={{ maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "2rem", marginBottom: "2rem" }}>
          <div style={{ maxWidth: 300 }}>
            <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: ".875rem" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg,#0d3278,#1a4fa0)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem" }}>📚</div>
              <span style={{ color: "#fff", fontWeight: 800, fontFamily: "'Space Grotesk',sans-serif" }}>MSBTE Papers</span>
            </div>
            <p style={{ fontSize: ".875rem", lineHeight: 1.6 }}>Free model answer papers for all MSBTE diploma branches.</p>
          </div>
          <div>
            <p style={{ color: "rgba(255,255,255,.4)", fontSize: ".75rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: ".875rem" }}>Navigation</p>
            {[
              ["/", "Home"], ["/browse", "Model Answer Paper"], ["/manual", "Manual"],
              ["/syllabus", "Syllabus"], ["/manual-pdf", "Manual PDF"], ["/contact", "Contact"],
            ].map(([p, l]) => (
              <Link key={p} to={p} style={{ display: "block", color: "#64748b", fontSize: ".875rem", marginBottom: ".5rem", textDecoration: "none" }}>{l}</Link>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid #1e293b", paddingTop: "1.5rem", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <p style={{ fontSize: ".8125rem" }}>© 2025 MSBTE Model Answer Papers. Free forever.</p>
          <p style={{ fontSize: ".8125rem" }}>No login needed for students</p>
        </div>
      </div>
    </footer>
  );
}
