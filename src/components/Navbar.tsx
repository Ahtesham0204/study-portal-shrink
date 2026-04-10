import { Link, useLocation } from "react-router-dom";
import { Home, FolderOpen, BookOpen, ClipboardList, FileText } from "lucide-react";

const tabs = [
  { path: "/", label: "Home", icon: Home },
  { path: "/browse", label: "Model Answer", icon: FolderOpen },
  { path: "/manual", label: "Manual", icon: BookOpen },
  { path: "/syllabus", label: "Syllabus", icon: ClipboardList },
  { path: "/manual-pdf", label: "Manual PDF", icon: FileText },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 50, background: "#ffffff", boxShadow: "0 2px 10px rgba(15, 23, 42, 0.06)" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 1rem", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: 12, textDecoration: "none" }}>
          <div style={{ width: 40, height: 40, borderRadius: 14, background: "linear-gradient(180deg, #eef5ff, #e8f3ff)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "inset 0 1px 0 rgba(255,255,255,.8)" }}>
            <span style={{ fontSize: 24 }}>📚</span>
          </div>
          <div>
            <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 16, color: "#23407f", lineHeight: 1 }}>MSBTE</div>
            <div style={{ fontSize: 10, letterSpacing: 1.6, color: "#7890b3", fontWeight: 700, textTransform: "uppercase", marginTop: 3 }}>Study Portal</div>
          </div>
        </Link>
        <Link
          className="btn-pop"
          to="/admin-login"
          style={{
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "0.45rem 1rem",
            borderRadius: 10,
            border: "1px solid #96c8f5",
            background: "linear-gradient(180deg, #eef7ff, #dceeff)",
            color: "#3172be",
            fontSize: 13,
            fontWeight: 700,
            boxShadow: "0 2px 8px rgba(49, 114, 190, 0.2)",
          }}
        >
          🔐 Admin Login
        </Link>
      </div>

      <div style={{ borderTop: "1px solid #edf2f7", borderBottom: "1px solid #edf2f7", background: "#fff" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}>
          {tabs.map((tab) => {
            const active = location.pathname === tab.path;
            const Icon = tab.icon;

            return (
              <Link
                key={tab.path}
                to={tab.path}
                style={{
                  textDecoration: "none",
                  color: active ? "#234e93" : "#46556f",
                  borderRight: "1px solid #edf2f7",
                  padding: "10px 6px 8px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 7,
                  background: active ? "linear-gradient(180deg, #edf5ff, #f8fbff)" : "#fff",
                  boxShadow: active ? "inset 0 -3px 0 #3b82f6" : "inset 0 -3px 0 transparent",
                  fontWeight: active ? 700 : 600,
                }}
              >
                <div
                  style={{
                    width: 52,
                    height: 40,
                    borderRadius: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: active ? "linear-gradient(180deg, #dbeafe, #eff6ff)" : "transparent",
                  }}
                >
                  <Icon size={26} strokeWidth={1.8} color={active ? "#5b8fd7" : "#f2b740"} fill={active ? "#dbeafe" : "#fff5d6"} />
                </div>
                <span style={{ fontSize: 13, lineHeight: 1, whiteSpace: "nowrap" }}>{tab.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
