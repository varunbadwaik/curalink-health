"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Sidebar.module.css";
import {
  ChartBar,
  CalendarDots,
  ChatCircleDots,
  ClipboardText,
  Pill,
  Flask,
  FolderOpen,
  VideoCamera,
  CreditCard,
  Crosshair,
  UsersThree,
  Brain,
  TrendUp,
  Hospital,
  GearSix,
  ShieldCheck,
  CurrencyDollar,
  LinkSimple,
  FileText,
  SignOut
} from "@phosphor-icons/react";

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
}

const roleNavs: Record<string, NavItem[]> = {
  patient: [
    { label: "Dashboard", href: "/dashboard/patient", icon: <ChartBar size={20} weight="duotone" /> },
    { label: "Appointments", href: "/dashboard/patient/appointments", icon: <CalendarDots size={20} weight="duotone" /> },
    { label: "Messages", href: "/dashboard/patient/messages", icon: <ChatCircleDots size={20} weight="duotone" />, badge: "3" },
    { label: "Care Plans", href: "/dashboard/patient/care-plans", icon: <ClipboardText size={20} weight="duotone" /> },
    { label: "Medications", href: "/dashboard/patient/medications", icon: <Pill size={20} weight="duotone" /> },
    { label: "Lab Results", href: "/dashboard/patient/labs", icon: <Flask size={20} weight="duotone" /> },
    { label: "Documents", href: "/dashboard/patient/documents", icon: <FolderOpen size={20} weight="duotone" /> },
    { label: "Telehealth", href: "/dashboard/patient/telehealth", icon: <VideoCamera size={20} weight="duotone" /> },
    { label: "Billing", href: "/dashboard/patient/billing", icon: <CreditCard size={20} weight="duotone" /> },
  ],
  doctor: [
    { label: "Command Center", href: "/dashboard/doctor", icon: <Crosshair size={20} weight="duotone" /> },
    { label: "Patient Queue", href: "/dashboard/doctor/queue", icon: <UsersThree size={20} weight="duotone" />, badge: "12" },
    { label: "Schedule", href: "/dashboard/doctor/schedule", icon: <CalendarDots size={20} weight="duotone" /> },
    { label: "Care Plans", href: "/dashboard/doctor/care-plans", icon: <ClipboardText size={20} weight="duotone" /> },
    { label: "AI Insights", href: "/dashboard/doctor/ai-insights", icon: <Brain size={20} weight="duotone" />, badge: "5" },
    { label: "Prescriptions", href: "/dashboard/doctor/prescriptions", icon: <Pill size={20} weight="duotone" /> },
    { label: "Lab Orders", href: "/dashboard/doctor/labs", icon: <Flask size={20} weight="duotone" /> },
    { label: "Team Chat", href: "/dashboard/doctor/chat", icon: <ChatCircleDots size={20} weight="duotone" /> },
    { label: "Analytics", href: "/dashboard/doctor/analytics", icon: <TrendUp size={20} weight="duotone" /> },
  ],
  admin: [
    { label: "Dashboard", href: "/dashboard/admin", icon: <ChartBar size={20} weight="duotone" /> },
    { label: "Users", href: "/dashboard/admin/users", icon: <UsersThree size={20} weight="duotone" /> },
    { label: "Facilities", href: "/dashboard/admin/facilities", icon: <Hospital size={20} weight="duotone" /> },
    { label: "Workflows", href: "/dashboard/admin/workflows", icon: <GearSix size={20} weight="duotone" /> },
    { label: "Compliance", href: "/dashboard/admin/compliance", icon: <ShieldCheck size={20} weight="duotone" />, badge: "2" },
    { label: "Finance", href: "/dashboard/admin/finance", icon: <CurrencyDollar size={20} weight="duotone" /> },
    { label: "Integrations", href: "/dashboard/admin/integrations", icon: <LinkSimple size={20} weight="duotone" /> },
    { label: "Reports", href: "/dashboard/admin/reports", icon: <FileText size={20} weight="duotone" /> },
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
          <SignOut size={16} weight="bold" />
          Sign Out
        </Link>
      </div>
    </aside>
  );
}
