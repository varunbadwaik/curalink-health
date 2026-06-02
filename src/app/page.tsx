"use client";

import { useState } from "react";
import Image from "next/image";
import LoginForm from "@/components/forms/LoginForm";
import styles from "./page.module.css";
import {
  ArrowRight,
  PlayCircle,
  SealCheck,
  UsersThree,
  Hospital,
  Lightning,
  Brain,
  ChartBar,
  CalendarDots,
  ChatCircleDots,
  LinkSimple,
  ShieldCheck,
  User,
  Stethoscope,
  GearSix,
  Check,
  X
} from "@phosphor-icons/react";

export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [loginRole, setLoginRole] = useState<string>("patient");

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
                <ArrowRight size={18} weight="bold" />
                Launch Platform
              </button>
              <button className="btn btn-ghost btn-lg">
                <PlayCircle size={18} weight="bold" />
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
            { value: "98.7%", label: "Uptime SLA", icon: <SealCheck size={20} weight="fill" style={{ color: "var(--primary)" }} /> },
            { value: "2.3M", label: "Patients Served", icon: <UsersThree size={20} weight="duotone" /> },
            { value: "340+", label: "Healthcare Partners", icon: <Hospital size={20} weight="duotone" /> },
            { value: "<200ms", label: "API Response", icon: <Lightning size={20} weight="duotone" /> },
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
            { icon: <Brain size={24} weight="duotone" />, title: "AI Care Coordination", desc: "Multi-agent AI system for triage, risk prediction, and intelligent care plan generation.", color: "var(--primary)" },
            { icon: <ChartBar size={24} weight="duotone" />, title: "Real-Time Analytics", desc: "Operational dashboards with KPIs, patient outcomes, staff utilization, and financial metrics.", color: "var(--accent)" },
            { icon: <CalendarDots size={24} weight="duotone" />, title: "Smart Scheduling", desc: "AI-optimized appointment scheduling with conflict detection, waitlist management, and resource allocation.", color: "var(--purple)" },
            { icon: <ChatCircleDots size={24} weight="duotone" />, title: "Secure Messaging", desc: "HIPAA-compliant messaging between patients, providers, and care teams with file sharing.", color: "var(--warning)" },
            { icon: <LinkSimple size={24} weight="duotone" />, title: "FHIR Integration", desc: "Seamless interoperability with hospital EHR systems, labs, and pharmacy networks via FHIR R4.", color: "var(--critical)" },
            { icon: <ShieldCheck size={24} weight="duotone" />, title: "Compliance & Security", desc: "Built-in HIPAA compliance, audit logging, role-based access, and end-to-end encryption.", color: "var(--primary)" },
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
            { role: "Patient Portal", icon: <User size={28} weight="duotone" />, features: ["Health Records", "Appointments", "Medications", "Telehealth", "Lab Results", "Care Plans"], gradient: "linear-gradient(135deg, #778873, #5D6A5A)" },
            { role: "Doctor Dashboard", icon: <Stethoscope size={28} weight="duotone" />, features: ["Patient Queue", "AI Decision Support", "E-Prescribing", "Care Timeline", "Lab Orders", "Analytics"], gradient: "linear-gradient(135deg, #A1BC98, #778873)" },
            { role: "Admin Panel", icon: <GearSix size={28} weight="duotone" />, features: ["User Management", "Workflow Builder", "Compliance Monitor", "Financial Dashboard", "Integration Hub", "Reports"], gradient: "linear-gradient(135deg, #D2DCB6, #A1BC98)" },
          ].map((portal, i) => (
            <div key={i} className={styles.portalCard}>
              <div className={styles.portalHeader} style={{ background: portal.gradient }}>
                <span className={styles.portalIcon}>{portal.icon}</span>
                <h3>{portal.role}</h3>
              </div>
              <ul className={styles.portalFeatures}>
                {portal.features.map((f, j) => (
                  <li key={j}>
                    <Check size={14} weight="bold" style={{ color: "var(--accent)", marginRight: "8px", flexShrink: 0 }} />
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
              <X size={20} />
            </button>
            <div className={styles.modalHeader} style={{ marginBottom: 16 }}>
              <h2 className="heading-md">Welcome Back</h2>
              <p className="text-sm text-muted">Sign in to your healthcare portal</p>
            </div>
            <LoginForm onSuccess={() => setShowLogin(false)} initialRole={loginRole} />
          </div>
        </div>
      )}
    </div>
  );
}
