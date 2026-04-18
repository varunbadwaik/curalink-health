"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginRole, setLoginRole] = useState<string>("patient");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Demo: route to role-based dashboard
    if (loginRole === "patient") window.location.href = "/dashboard/patient";
    else if (loginRole === "doctor") window.location.href = "/dashboard/doctor";
    else window.location.href = "/dashboard/admin";
  };

  return (
    <div className={styles.page}>
      {/* Background Effects */}
      <div className={styles.bgOrbs}>
        <div className={styles.orb1} />
        <div className={styles.orb2} />
        <div className={styles.orb3} />
      </div>
      <div className={styles.gridOverlay} />

      {/* Navigation */}
      <nav className={styles.nav}>
        <div className={styles.navInner}>
          <div className={styles.logo}>

            <span className={styles.logoText}>Curalink</span>
          </div>
          <div className={styles.navLinks}>
            <a href="#features">Features</a>
            <a href="#platform">Platform</a>
            <a href="#ai">AI Engine</a>
            <a href="#pricing">Pricing</a>
          </div>
          <div className={styles.navActions}>
            <button className="btn btn-ghost btn-sm" onClick={() => setShowLogin(true)}>Sign In</button>
            <button className="btn btn-primary btn-sm" onClick={() => setShowLogin(true)}>Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className={styles.hero}>
        <div className={styles.heroSplit}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>
              The Future of<br />
              <span className="gradient-text">Unified Healthcare</span>
            </h1>
            <p className={styles.heroSubtitle}>
              Connect patients, doctors, and healthcare organizations into one intelligent ecosystem.
              Real-time visibility, workflow automation, and AI-driven care coordination.
            </p>
            <div className={styles.heroActions}>
              <button className="btn btn-primary btn-lg" onClick={() => setShowLogin(true)}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Launch Platform
              </button>
              <button className="btn btn-ghost btn-lg">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><polygon points="10,8 16,12 10,16"/></svg>
                Watch Demo
              </button>
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image 
              src="/doctor-hero.png" 
              alt="Curalink Healthcare Professional" 
              width={600} 
              height={600} 
              priority
              className={styles.heroImg} 
            />
          </div>
        </div>

        {/* Hero Stats */}
        <div className={styles.heroStats}>
          {[
            { value: "98.7%", label: "Uptime SLA", icon: "🟢" },
            { value: "2.3M", label: "Patients Served", icon: "👥" },
            { value: "340+", label: "Healthcare Partners", icon: "🏥" },
            { value: "<200ms", label: "API Response", icon: "⚡" },
          ].map((stat, i) => (
            <div key={i} className={`${styles.statCard} animate-fade-in stagger-${i + 1}`}>
              <span className={styles.statIcon}>{stat.icon}</span>
              <span className={styles.statValue}>{stat.value}</span>
              <span className={styles.statLabel}>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features Grid */}
      <section className={styles.features} id="features">
        <h2 className={styles.sectionTitle}>
          <span className="gradient-text">Core Capabilities</span>
        </h2>
        <p className={styles.sectionSub}>Everything healthcare organizations need in one unified platform</p>
        <div className={styles.featureGrid}>
          {[
            { icon: "🧠", title: "AI Care Coordination", desc: "Multi-agent AI system for triage, risk prediction, and intelligent care plan generation.", color: "var(--primary)" },
            { icon: "📊", title: "Real-Time Analytics", desc: "Operational dashboards with KPIs, patient outcomes, staff utilization, and financial metrics.", color: "var(--accent)" },
            { icon: "📅", title: "Smart Scheduling", desc: "AI-optimized appointment scheduling with conflict detection, waitlist management, and resource allocation.", color: "var(--purple)" },
            { icon: "💬", title: "Secure Messaging", desc: "HIPAA-compliant messaging between patients, providers, and care teams with file sharing.", color: "var(--warning)" },
            { icon: "🔗", title: "FHIR Integration", desc: "Seamless interoperability with hospital EHR systems, labs, and pharmacy networks via FHIR R4.", color: "var(--critical)" },
            { icon: "🛡️", title: "Compliance & Security", desc: "Built-in HIPAA compliance, audit logging, role-based access, and end-to-end encryption.", color: "var(--primary)" },
          ].map((feature, i) => (
            <div key={i} className={`${styles.featureCard} animate-fade-in stagger-${i + 1}`}>
              <div className={styles.featureIcon} style={{ background: `${feature.color}15`, color: feature.color }}>{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Platform Section */}
      <section className={styles.platform} id="platform">
        <h2 className={styles.sectionTitle}>
          <span className="gradient-text">Three Portals, One Platform</span>
        </h2>
        <p className={styles.sectionSub}>Role-specific experiences designed for every stakeholder</p>
        <div className={styles.portalCards}>
          {[
            { role: "Patient Portal", icon: "👤", features: ["Health Records", "Appointments", "Medications", "Telehealth", "Lab Results", "Care Plans"], gradient: "linear-gradient(135deg, #0EA5E9, #0284C7)" },
            { role: "Doctor Dashboard", icon: "🩺", features: ["Patient Queue", "AI Decision Support", "E-Prescribing", "Care Timeline", "Lab Orders", "Analytics"], gradient: "linear-gradient(135deg, #10B981, #059669)" },
            { role: "Admin Panel", icon: "⚙️", features: ["User Management", "Workflow Builder", "Compliance Monitor", "Financial Dashboard", "Integration Hub", "Reports"], gradient: "linear-gradient(135deg, #8B5CF6, #7C3AED)" },
          ].map((portal, i) => (
            <div key={i} className={styles.portalCard}>
              <div className={styles.portalHeader} style={{ background: portal.gradient }}>
                <span className={styles.portalIcon}>{portal.icon}</span>
                <h3>{portal.role}</h3>
              </div>
              <ul className={styles.portalFeatures}>
                {portal.features.map((f, j) => (
                  <li key={j}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="3"><polyline points="20,6 9,17 4,12"/></svg>
                    {f}
                  </li>
                ))}
              </ul>
              <button className="btn btn-ghost" style={{ width: "100%" }} onClick={() => {
                setLoginRole(portal.role.includes("Patient") ? "patient" : portal.role.includes("Doctor") ? "doctor" : "admin");
                setShowLogin(true);
              }}>
                Explore {portal.role} →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <div className={styles.footerBrand}>
            <div className={styles.logo}>

              <span className={styles.logoText}>Curalink</span>
            </div>
            <p className="text-sm text-muted" style={{ marginTop: "8px" }}>Unified Healthcare Experience Platform</p>
          </div>
          <p className="text-xs text-muted">© 2026 Curalink. All rights reserved. HIPAA Compliant.</p>
        </div>
      </footer>

      {/* Login Modal */}
      {showLogin && (
        <div className={styles.modalOverlay} onClick={() => setShowLogin(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={() => setShowLogin(false)}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
            <div className={styles.modalHeader}>
              <h2 className="heading-md">Welcome Back</h2>
              <p className="text-sm text-muted">Sign in to your healthcare portal</p>
            </div>
            <div className={styles.roleSelector}>
              {["patient", "doctor", "admin"].map(role => (
                <button key={role} className={`${styles.roleBtn} ${loginRole === role ? styles.roleBtnActive : ""}`} onClick={() => setLoginRole(role)}>
                  {role === "patient" ? "👤" : role === "doctor" ? "🩺" : "⚙️"} {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
            <form onSubmit={handleLogin} className={styles.loginForm}>
              <div className={styles.inputGroup}>
                <label className="text-sm">Email</label>
                <input className="input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
              </div>
              <div className={styles.inputGroup}>
                <label className="text-sm">Password</label>
                <input className="input" type="password" placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: "100%", marginTop: "8px" }}>
                Sign In as {loginRole.charAt(0).toUpperCase() + loginRole.slice(1)}
              </button>
              <p className="text-xs text-muted" style={{ textAlign: "center", marginTop: "12px" }}>
                Demo mode — any credentials will work
              </p>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
