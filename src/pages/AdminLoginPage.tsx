import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successful!");
      navigate("/");
    } catch (err: any) {
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ background: "#f7fbff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 420, margin: "0 auto", padding: "3rem 1rem" }}>
        <div
          style={{
            background: "#fff",
            border: "1px solid #d7e8f8",
            borderRadius: 20,
            padding: "2rem 1.5rem",
            boxShadow: "0 8px 24px rgba(187, 209, 230, 0.15)",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 16,
                background: "linear-gradient(180deg, #fff0ee, #ffe8e4)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 12,
              }}
            >
              <span style={{ fontSize: 28 }}>🔐</span>
            </div>
            <h1
              style={{
                margin: 0,
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 22,
                fontWeight: 800,
                color: "#203f7f",
              }}
            >
              Admin Login
            </h1>
            <p style={{ margin: "0.5rem 0 0", color: "#6b7a92", fontSize: 14 }}>
              Sign in to manage portal content
            </p>
          </div>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#3d4f6c", marginBottom: 6 }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem",
                  borderRadius: 12,
                  border: "1px solid #d7e8f8",
                  background: "#f8fbff",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: "#3d4f6c", marginBottom: 6 }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: "100%",
                  padding: "0.65rem 0.85rem",
                  borderRadius: 12,
                  border: "1px solid #d7e8f8",
                  background: "#f8fbff",
                  fontSize: 14,
                  outline: "none",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-pop"
              style={{
                marginTop: 6,
                padding: "0.7rem",
                borderRadius: 12,
                border: "1px solid #96c8f5",
                background: "linear-gradient(180deg, #eef7ff, #dceeff)",
                color: "#3172be",
                fontSize: 14,
                fontWeight: 800,
                cursor: loading ? "not-allowed" : "pointer",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
