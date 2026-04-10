import { Link } from "react-router-dom";
import heroIllustration from "@/assets/hero-illustration-new.png";
import iconModelAnswer from "@/assets/icon-model-answer.png";
import iconPracticalManual from "@/assets/icon-practical-manual.png";
import iconSyllabus from "@/assets/icon-syllabus.png";
import iconManualPdf from "@/assets/icon-manual-pdf.png";

const features = [
  {
    title: "Model Answer Papers",
    badge: "700+ Papers Available",
    description:
      "Download semester-wise model answer papers for all MSBTE diploma branches. Year-wise papers with full solutions.",
    link: "/browse",
    linkLabel: "Browse Papers →",
    icon: iconModelAnswer,
    iconBackground: "linear-gradient(180deg, #e9fff7, #e7fef1)",
    badgeBackground: "#e7f8ee",
    badgeColor: "#4c8f75",
  },
  {
    title: "Practical Manuals",
    badge: "All Subjects Covered",
    description:
      "Complete practical manual solutions for lab experiments. Subject-wise organized for easy access during practical exams.",
    link: "/manual",
    linkLabel: "View Manuals →",
    icon: iconPracticalManual,
    iconBackground: "linear-gradient(180deg, #e8f7ff, #e1f3ff)",
    badgeBackground: "#e1f0ff",
    badgeColor: "#2d77d0",
  },
  {
    title: "Syllabus",
    badge: "K Scheme Updated",
    description:
      "Official K-Scheme syllabus for all branches. Subject codes, units, and course outcomes — semester 1 to 6.",
    link: "/syllabus",
    linkLabel: "View Syllabus →",
    icon: iconSyllabus,
    iconBackground: "linear-gradient(180deg, #fff0ee, #ffe8e4)",
    badgeBackground: "#ffe8e4",
    badgeColor: "#c44b3a",
  },
  {
    title: "Manual PDFs",
    badge: "Free Downloads",
    description:
      "Downloadable subject manual PDFs. Save them offline and access anytime without internet connection.",
    link: "/manual-pdf",
    linkLabel: "Download PDFs →",
    icon: iconManualPdf,
    iconBackground: "linear-gradient(180deg, #fff7dc, #fff1c8)",
    badgeBackground: "#fff0cc",
    badgeColor: "#ad7a18",
  },
];

const stats = [
  { value: "700+", label: "Papers", color: "#2d77d0" },
  { value: "7", label: "Branches", color: "#2d8f78" },
  { value: "6", label: "Semesters", color: "#855fce" },
  { value: "Free", label: "Always", color: "#e28d22" },
];

export default function HomePage() {
  return (
    <div style={{ background: "#f7fbff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "1.25rem 1rem 2.5rem" }}>
        <section
          style={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 28,
            border: "1px solid #d9ebfb",
            background: "linear-gradient(135deg, #fbfdff 0%, #fffef6 32%, #f1fcff 100%)",
            boxShadow: "0 12px 30px rgba(134, 180, 220, 0.18)",
            padding: "1.35rem 1.4rem 1.1rem",
            marginBottom: "2rem",
          }}
        >
          <div
            style={{
              position: "absolute",
              left: -34,
              top: -18,
              width: 120,
              height: 120,
              background: "#d9ecff",
              opacity: 0.75,
              borderRadius: "46% 54% 36% 64% / 38% 34% 66% 62%",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 8,
              top: 12,
              width: 78,
              height: 78,
              background: "#e9f4ff",
              opacity: 0.9,
              borderRadius: "54% 46% 65% 35% / 48% 35% 65% 52%",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: -34,
              top: -10,
              width: 132,
              height: 132,
              background: "#d9f6f7",
              opacity: 0.75,
              borderRadius: "42% 58% 39% 61% / 60% 35% 65% 40%",
            }}
          />
          <div
            style={{
              position: "absolute",
              right: 6,
              top: 22,
              width: 86,
              height: 86,
              background: "#e9faf9",
              opacity: 0.9,
              borderRadius: "57% 43% 64% 36% / 38% 57% 43% 62%",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: -28,
              bottom: 36,
              width: 142,
              height: 142,
              background: "#dff8f4",
              opacity: 0.85,
              borderRadius: "53% 47% 61% 39% / 40% 52% 48% 60%",
            }}
          />

          <div style={{ position: "relative", zIndex: 1, paddingRight: 164 }}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                borderRadius: 999,
                border: "1px solid #bfe2cb",
                background: "linear-gradient(180deg, #f9fff8, #effcf2)",
                color: "#3f8a72",
                padding: "0.52rem 1rem",
                marginBottom: "1rem",
                boxShadow: "0 1px 0 rgba(255,255,255,.8) inset",
              }}
            >
              <span style={{ fontSize: 18, lineHeight: 1 }}>🎓</span>
              <span style={{ fontSize: 13, fontWeight: 800, letterSpacing: 0.5, textTransform: "uppercase" }}>
                Free — All Branches — K Scheme
              </span>
            </div>

            <h1
              style={{
                margin: 0,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2.5rem)",
                lineHeight: 1,
                color: "#203f7f",
                fontWeight: 800,
              }}
            >
              MSBTE Study Portal
            </h1>

            <p
              style={{
                margin: "1rem 0 1.5rem",
                fontSize: 16,
                lineHeight: 1.55,
                color: "#58667e",
                maxWidth: 470,
              }}
            >
              Model answers, practicals, syllabus &amp; manuals — everything for MSBTE diploma students in one place.
            </p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 22 }}>
              <Link
                className="btn-pop"
                to="/browse"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 12,
                  padding: "0.6rem 1.1rem",
                  border: "1px solid #efc557",
                  background: "linear-gradient(180deg, #fff7cf, #ffe796)",
                  color: "#a26714",
                  boxShadow: "0 4px 12px rgba(239, 197, 87, 0.22)",
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                <img src={iconModelAnswer} alt="Browse papers" width={18} height={18} />
                Browse Papers
              </Link>
              <Link
                className="btn-pop"
                to="/syllabus"
                style={{
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  borderRadius: 12,
                  padding: "0.6rem 1.1rem",
                  border: "1px solid #96c8f5",
                  background: "linear-gradient(180deg, #eef7ff, #dceeff)",
                  color: "#3172be",
                  boxShadow: "0 4px 12px rgba(150, 200, 245, 0.18)",
                  fontSize: 13,
                  fontWeight: 800,
                }}
              >
                <span style={{ fontSize: 16 }}>📋</span>
                View Syllabus
              </Link>
            </div>
          </div>

          <img
            src={heroIllustration}
            alt="Books and study materials"
            width={190}
            height={190}
            style={{ position: "absolute", right: 22, top: "50%", transform: "translateY(-55%)", width: 170, height: "auto", zIndex: 2, pointerEvents: "none" }}
          />

          <div style={{ position: "relative", zIndex: 1, marginTop: 8, borderTop: "1px solid #dbe7f2", paddingTop: 18 }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", alignItems: "start" }}>
              {stats.map((stat, index) => (
                <div key={stat.label} style={{ display: "flex", alignItems: "stretch" }}>
                  {index !== 0 && <div style={{ width: 1, background: "#dce6ef", marginRight: 16, minHeight: 54 }} />}
                  <div>
                    <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 800, color: stat.color, lineHeight: 1.1 }}>
                      {stat.value}
                    </div>
                    <div style={{ marginTop: 4, color: "#4d5b72", fontSize: 13 }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section style={{ textAlign: "center", marginBottom: "1.3rem" }}>
          <h2 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", color: "#203f7f", fontSize: 22, fontWeight: 800 }}>
            What’s Available
          </h2>
          <p style={{ margin: "0.6rem 0 0", color: "#6b7a92", fontSize: 14 }}>
            Everything you need for MSBTE diploma preparation
          </p>
        </section>

        <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {features.map((feature) => (
            <Link
              className="card-pop"
              key={feature.title}
              to={feature.link}
              style={{
                textDecoration: "none",
                background: "#fff",
                border: "1px solid #d7e8f8",
                borderRadius: 20,
                padding: "1.3rem 1.2rem",
                boxShadow: "0 8px 20px rgba(187, 209, 230, 0.12)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: 14,
                    background: feature.iconBackground,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "inset 0 1px 0 rgba(255,255,255,.7)",
                    flexShrink: 0,
                  }}
                >
                  <img src={feature.icon} alt="" width={32} height={32} />
                </div>
                <div>
                  <h3 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", color: "#203f7f", fontSize: 15, fontWeight: 800 }}>
                    {feature.title}
                  </h3>
                  <span
                    style={{
                      display: "inline-block",
                      marginTop: 4,
                      padding: "0.15rem 0.5rem",
                      background: feature.badgeBackground,
                      color: feature.badgeColor,
                      borderRadius: 999,
                      fontSize: 11,
                      fontWeight: 700,
                    }}
                  >
                    {feature.badge}
                  </span>
                </div>
              </div>
              <p style={{ margin: "0 0 12px", color: "#6a778c", lineHeight: 1.5, fontSize: 13, flex: 1 }}>
                {feature.description}
              </p>
              <div style={{ color: "#2d77d0", fontSize: 14, fontWeight: 800 }}>{feature.linkLabel}</div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
}
