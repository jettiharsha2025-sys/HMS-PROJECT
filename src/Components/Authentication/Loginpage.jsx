import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn } from "react-icons/fa";
import { MdAdminPanelSettings, MdLocalHospital } from "react-icons/md";
import { RiNurseFill } from "react-icons/ri";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

// ── Role config ──
const ROLES = [
  { value: "admin",        label: "Admin",        icon: <MdAdminPanelSettings size={16} /> },
  { value: "doctor",       label: "Doctor",        icon: <MdLocalHospital size={16} />      },
  { value: "nurse",        label: "Nurse",         icon: <RiNurseFill size={16} />          },
  { value: "receptionist", label: "Receptionist",  icon: <BsFillGrid3X3GapFill size={14} /> },
];

// ── HMS Logo Component (replaces all image tags) ──
const HMSLogo = ({ dark = false, size = "md" }) => {
  const fontSize   = size === "lg" ? 26 : size === "sm" ? 16 : 20
  const subSize    = size === "lg" ? 10 : size === "sm" ? 8  : 9
  const iconSize   = size === "lg" ? 32 : size === "sm" ? 20 : 26
  const color      = dark ? "#0a2a6e" : "#fff"
  const subColor   = dark ? "#6b7280" : "rgba(255,255,255,0.6)"
  const borderCol  = dark ? "#dbeafe" : "rgba(255,255,255,0.25)"
  const bgColor    = dark ? "#eff6ff" : "rgba(255,255,255,0.15)"

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      {/* Icon box */}
      <div style={{
        width: iconSize + 10, height: iconSize + 10,
        borderRadius: 12,
        backgroundColor: bgColor,
        border: `1.5px solid ${borderCol}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
      }}>
        <MdLocalHospital size={iconSize} color={color} />
      </div>
      {/* Text */}
      <div>
        <div style={{
          fontSize, fontWeight: 800, color,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: 0.5, lineHeight: 1.1,
        }}>
          HMS
        </div>
        <div style={{
          fontSize: subSize, color: subColor,
          textTransform: "uppercase", letterSpacing: 1.5,
          fontWeight: 500, marginTop: 1,
        }}>
          Hospital Management
        </div>
      </div>
    </div>
  )
}

const Loginpage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  // ── Login state ──
  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [role,     setRole]     = useState("admin");
  const [loading,  setLoading]  = useState(false);

  // ── Signup state ──
  const [signupName,     setSignupName]     = useState("");
  const [signupEmail,    setSignupEmail]    = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole,     setSignupRole]     = useState("doctor");

  // ── Login submit ──
  const handleLoginSubmit = async () => {
    if (!email || !password) return alert("Please fill in all fields.");
    setLoading(true);

    if (email === "harsha123@gmail.com" && password === "Harsha@2025") {
      setLoading(false);
      alert("Login successful!");
      navigate("/v");
      return;
    }

    try {
      const response = await fetch("http://192.168.0.70:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });
      const data = await response.json();
      if (response.ok) {
        navigate("/v");
      } else {
        alert(data.message || "Invalid credentials");
      }
    } catch {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // ── Signup submit ──
  const handleSignupSubmit = () => {
    if (!signupName || !signupEmail || !signupPassword) return alert("Please fill in all fields.");
    navigate("/register");
  };

  /* ─────────────────────────── styles ─────────────────────────── */
  const s = {
    root: {
      height: "100vh",
      display: "flex",
      overflow: "hidden",
      fontFamily: "'DM Sans', sans-serif",
      background: "#f0f4ff",
    },

    leftPanel: {
      width: "55%",
      background: "#fff",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 56px",
      position: "relative",
      zIndex: 2,
      boxShadow: "4px 0 40px rgba(0,0,0,0.08)",
      transition: "background 0.4s",
    },
    leftPanelInactive: {
      background: "#0a2a6e",
      cursor: "pointer",
      width: "45%",
    },

    rightPanel: {
      flex: 1,
      background: "linear-gradient(135deg, #0057d9 0%, #0a2a6e 100%)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "40px 48px",
      textAlign: "center",
      position: "relative",
      overflow: "hidden",
      transition: "background 0.4s",
    },
    rightPanelActive: {
      background: "#fff",
      cursor: "default",
    },

    eyebrow:  { fontSize: 10, letterSpacing: 2.5, textTransform: "uppercase", color: "#0057d9", marginBottom: 4, fontWeight: 600 },
    title:    { fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: "#0a1f44", marginBottom: 4 },
    subtitle: { fontSize: 12.5, color: "#888", marginBottom: 22 },

    roleGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, width: "100%", marginBottom: 20 },
    roleBtn: (active) => ({
      display: "flex", alignItems: "center", gap: 8,
      padding: "9px 14px", borderRadius: 10,
      border: active ? "2px solid #0057d9" : "1.5px solid #e8eaf0",
      background: active ? "#eef3ff" : "#fafafa",
      cursor: "pointer", fontSize: 12.5,
      fontWeight: active ? 600 : 400,
      color: active ? "#0057d9" : "#555",
      transition: "all 0.2s",
    }),

    socialRow: { display: "flex", gap: 10, marginBottom: 20 },
    socialBtn: {
      width: 38, height: 38, borderRadius: "50%",
      border: "1.5px solid #e0e0e0", background: "#fff",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 14, cursor: "pointer", color: "#555",
      transition: "border-color 0.2s",
    },

    divider: { display: "flex", alignItems: "center", gap: 10, width: "100%", marginBottom: 18 },
    divLine: { flex: 1, height: 1, background: "#eee" },
    divText: { fontSize: 10, color: "#bbb", letterSpacing: 1, whiteSpace: "nowrap" },

    input: {
      width: "100%", padding: "10px 14px", marginBottom: 12,
      border: "1.5px solid #e8eaf0", borderRadius: 10,
      fontSize: 13, outline: "none", transition: "border-color 0.2s",
      fontFamily: "'DM Sans', sans-serif", background: "#fafbff",
    },

    forgot: { fontSize: 12, color: "#0057d9", textAlign: "right", width: "100%", cursor: "pointer", marginBottom: 18 },

    btnPrimary: {
      width: "100%", padding: "11px", borderRadius: 10,
      background: "linear-gradient(135deg, #0057d9, #0a2a6e)",
      color: "#fff", fontWeight: 700, fontSize: 14,
      border: "none", cursor: "pointer", letterSpacing: 0.5,
      transition: "opacity 0.2s", fontFamily: "inherit",
    },

    btnOutline: {
      padding: "10px 36px", border: "1.5px solid rgba(255,255,255,0.7)",
      background: "transparent", color: "#fff", borderRadius: 10,
      cursor: "pointer", fontSize: 13, fontFamily: "inherit", fontWeight: 600,
    },

    promoTitle:        { fontFamily: "'Playfair Display', serif", fontSize: 32, color: "#fff",     marginBottom: 12 },
    promoSubtitle:     { fontSize: 13, color: "rgba(255,255,255,0.8)", maxWidth: 240, lineHeight: 1.8, marginBottom: 28 },
    promoTitleDark:    { fontFamily: "'Playfair Display', serif", fontSize: 30, color: "#0a1f44", marginBottom: 12 },
    promoSubtitleDark: { fontSize: 13, color: "#666", maxWidth: 240, lineHeight: 1.8, marginBottom: 28 },

    hmsBadge: {
      position: "absolute", top: 24, right: 24,
      background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)",
      border: "1px solid rgba(255,255,255,0.2)",
      borderRadius: 12, padding: "6px 14px",
      fontSize: 11, color: "#fff", fontWeight: 700, letterSpacing: 1.5,
    },
    circle1: {
      position: "absolute", bottom: -60, right: -60,
      width: 240, height: 240, borderRadius: "50%",
      background: "rgba(255,255,255,0.06)", pointerEvents: "none",
    },
    circle2: {
      position: "absolute", top: -40, left: -40,
      width: 160, height: 160, borderRadius: "50%",
      background: "rgba(255,255,255,0.06)", pointerEvents: "none",
    },
  };

  /* ──────────────────────────────────────────────────────────────── */

  return (
    <div style={s.root}>

      {/* ══════════════════ LEFT PANEL ══════════════════ */}
      <div
        onClick={!isLogin ? () => setIsLogin(true) : undefined}
        style={{ ...s.leftPanel, ...(!isLogin ? s.leftPanelInactive : {}) }}
      >
        {isLogin ? (
          <div style={{ width: "100%", maxWidth: 380 }}>

            {/* ── HMS Branding ── */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              <HMSLogo dark={true} size="md" />
            </div>

            <p style={s.eyebrow}>Secure Access Portal</p>
            <h1 style={s.title}>Sign In</h1>
            <p style={s.subtitle}>Select your role and enter credentials</p>

            {/* Role Selector */}
            <div style={s.roleGrid}>
              {ROLES.map((r) => (
                <button key={r.value} style={s.roleBtn(role === r.value)} onClick={() => setRole(r.value)}>
                  <span style={{ display: "flex", alignItems: "center" }}>{r.icon}</span>
                  {r.label}
                </button>
              ))}
            </div>

            {/* Social */}
            <div style={s.socialRow}>
              {[FaGoogle, FaFacebookF, FaGithub, FaLinkedinIn].map((Icon, i) => (
                <button key={i} style={s.socialBtn}><Icon /></button>
              ))}
            </div>

            {/* Divider */}
            <div style={s.divider}>
              <div style={s.divLine} />
              <span style={s.divText}>OR CONTINUE WITH EMAIL</span>
              <div style={s.divLine} />
            </div>

            {/* Inputs */}
            <input
              style={s.input}
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              style={s.input}
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLoginSubmit()}
            />

            <p style={s.forgot}>Forgot password?</p>

            <button
              style={{ ...s.btnPrimary, opacity: loading ? 0.7 : 1 }}
              onClick={handleLoginSubmit}
              disabled={loading}
            >
              {loading ? "Signing in…" : `Sign In as ${ROLES.find(r2 => r2.value === role)?.label}`}
            </button>
          </div>
        ) : (
          /* ── LEFT INACTIVE (signup mode) ── */
          <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center" }}>
            <HMSLogo dark={false} size="md" />
            <div style={{ height: 20 }} />
            <h2 style={s.promoTitle}>Welcome Back!</h2>
            <p style={s.promoSubtitle}>Already have an account?<br />Sign in and continue your work.</p>
            <button style={s.btnOutline} onClick={(e) => { e.stopPropagation(); setIsLogin(true); }}>
              Sign In
            </button>
          </div>
        )}
      </div>

      {/* ══════════════════ RIGHT PANEL ══════════════════ */}
      <div
        onClick={isLogin ? () => setIsLogin(false) : undefined}
        style={{ ...s.rightPanel, ...(isLogin ? {} : s.rightPanelActive) }}
      >
        <div style={s.circle1} />
        <div style={s.circle2} />

        {isLogin ? (
          /* ── RIGHT INACTIVE (login mode) ── */
          <>
            <div style={s.hmsBadge}>HMS Portal</div>
            <div style={{ marginBottom: 24 }}>
              <HMSLogo dark={false} size="lg" />
            </div>
            <h2 style={s.promoTitle}>Hello, Friend!</h2>
            <p style={s.promoSubtitle}>
              New to HMS? Create an account and start managing your hospital efficiently.
            </p>
            <button style={s.btnOutline} onClick={(e) => { e.stopPropagation(); setIsLogin(false); }}>
              Sign Up
            </button>
          </>
        ) : (
          /* ── SIGNUP FORM ── */
          <div style={{ width: "100%", maxWidth: 340 }}>

            {/* ── HMS Branding ── */}
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
              <HMSLogo dark={true} size="md" />
            </div>

            <p style={s.eyebrow}>New Staff Registration</p>
            <h1 style={s.title}>Create Account</h1>
            <p style={s.subtitle}>Register your HMS staff account</p>

            {/* Role Selector */}
            <div style={s.roleGrid}>
              {ROLES.map((r) => (
                <button key={r.value} style={s.roleBtn(signupRole === r.value)} onClick={() => setSignupRole(r.value)}>
                  <span style={{ display: "flex", alignItems: "center" }}>{r.icon}</span>
                  {r.label}
                </button>
              ))}
            </div>

            <input
              style={s.input}
              type="text"
              placeholder="Full name"
              value={signupName}
              onChange={(e) => setSignupName(e.target.value)}
            />
            <input
              style={s.input}
              type="email"
              placeholder="Email address"
              value={signupEmail}
              onChange={(e) => setSignupEmail(e.target.value)}
            />
            <input
              style={s.input}
              type="password"
              placeholder="Create password"
              value={signupPassword}
              onChange={(e) => setSignupPassword(e.target.value)}
            />

            <button style={s.btnPrimary} onClick={handleSignupSubmit}>
              Create Account
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Loginpage;