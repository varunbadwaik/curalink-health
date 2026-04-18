"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Sidebar.module.css";

interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: string;
}

const roleNavs: Record<string, NavItem[]> = {
  patient: [
    { label: "Dashboard", href: "/dashboard/patient", icon: "📊" },
    { label: "Appointments", href: "/dashboard/patient/appointments", icon: "📅" },
    { label: "Messages", href: "/dashboard/patient/messages", icon: "💬", badge: "3" },
    { label: "Care Plans", href: "/dashboard/patient/care-plans", icon: "📋" },
    { label: "Medications", href: "/dashboard/patient/medications", icon: "💊" },
    { label: "Lab Results", href: "/dashboard/patient/labs", icon: "🔬" },
    { label: "Documents", href: "/dashboard/patient/documents", icon: "📁" },
    { label: "Telehealth", href: "/dashboard/patient/telehealth", icon: "📹" },
    { label: "Billing", href: "/dashboard/patient/billing", icon: "💳" },
  ],
  doctor: [
    { label: "Command Center", href: "/dashboard/doctor", icon: "🎯" },
    { label: "Patient Queue", href: "/dashboard/doctor/queue", icon: "👥", badge: "12" },
    { label: "Schedule", href: "/dashboard/doctor/schedule", icon: "📅" },
    { label: "Care Plans", href: "/dashboard/doctor/care-plans", icon: "📋" },
    { label: "AI Insights", href: "/dashboard/doctor/ai-insights", icon: "🧠", badge: "5" },
    { label: "Prescriptions", href: "/dashboard/doctor/prescriptions", icon: "💊" },
    { label: "Lab Orders", href: "/dashboard/doctor/labs", icon: "🔬" },
    { label: "Team Chat", href: "/dashboard/doctor/chat", icon: "💬" },
    { label: "Analytics", href: "/dashboard/doctor/analytics", icon: "📈" },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard/admin", icon: "📊" },
    { label: "Users", href: "/dashboard/admin/users", icon: "👥" },
    { label: "Facilities", href: "/dashboard/admin/facilities", icon: "🏥" },
    { label: "Workflows", href: "/dashboard/admin/workflows", icon: "⚙️" },
    { label: "Compliance", href: "/dashboard/admin/compliance", icon: "🛡️", badge: "2" },
    { label: "Finance", href: "/dashboard/admin/finance", icon: "💰" },
    { label: "Integrations", href: "/dashboard/admin/integrations", icon: "🔗" },
    { label: "Reports", href: "/dashboard/admin/reports", icon: "📑" },
  ],
};

export default function Sidebar({ role }: { role: string }) {
  const pathname = usePathname();
  const items = roleNavs[role] || roleNavs.patient;

  const roleLabel = role === "patient" ? "Patient Portal" : role === "doctor" ? "Doctor Dashboard" : "Admin Panel";
  const roleColor = role === "patient" ? "var(--primary)" : role === "doctor" ? "var(--accent)" : "var(--purple)";

  return (
    <aside className={styles.sidebar}>
      {/* Logo */}
      <div className={styles.logoSection}>
        <Link href="/" className={styles.logo}>

          <span className={styles.logoText}>Curalink</span>
        </Link>
        <div className={styles.roleBadge} style={{ background: `${roleColor}15`, color: roleColor, borderColor: `${roleColor}30` }}>
          {roleLabel}
        </div>
      </div>

      {/* Navigation */}
      <nav className={styles.nav}>
        {items.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link key={item.href} href={item.href} className={`${styles.navItem} ${isActive ? styles.navItemActive : ""}`}>
              <span className={styles.navIcon}>{item.icon}</span>
              <span className={styles.navLabel}>{item.label}</span>
              {item.badge && <span className={styles.navBadge}>{item.badge}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className={styles.sidebarFooter}>
        <div className={styles.userCard}>
          <div className={styles.avatar} style={{ background: `${roleColor}20`, color: roleColor }}>
            {role === "patient" ? "JS" : role === "doctor" ? "DR" : "AD"}
          </div>
          <div className={styles.userInfo}>
            <span className={styles.userName}>
              {role === "patient" ? "John Smith" : role === "doctor" ? "Dr. Sarah Chen" : "Admin User"}
            </span>
            <span className={styles.userRole}>{roleLabel}</span>
          </div>
        </div>
        <Link href="/" className={styles.logoutBtn}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16,17 21,12 16,7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
