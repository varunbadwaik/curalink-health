"use client";

import styles from "./page.module.css";
import {
  FileText,
  GearSix,
  UsersThree,
  Stethoscope,
  CalendarDots,
  CurrencyDollar,
  Hospital,
  Timer,
  Monitor,
  ShieldCheck,
  Check,
  ChartBar
} from "@phosphor-icons/react";
import dynamic from "next/dynamic";
const RevenueChart = dynamic(() => import("@/components/charts/AdminCharts").then(m => m.RevenueChart), { ssr: false });
const DepartmentChart = dynamic(() => import("@/components/charts/AdminCharts").then(m => m.DepartmentChart), { ssr: false });
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/services/api";


function getStatusColor(status: string) {
  switch (status) {
    case "operational": return "var(--accent)";
    case "degraded": return "var(--warning)";
    case "down": return "var(--critical)";
    default: return "var(--text-muted)";
  }
}

export default function AdminDashboard() {
  const queryClient = useQueryClient();

  const { data: storeMetrics = [] } = useQuery({
    queryKey: ["orgMetrics"],
    queryFn: mockApi.getOrgMetrics,
  });

  const { data: systemHealth = [] } = useQuery({
    queryKey: ["systemHealth"],
    queryFn: mockApi.getSystemHealth,
  });

  const { data: recentUsers = [] } = useQuery({
    queryKey: ["recentUsers"],
    queryFn: mockApi.getRecentUsers,
  });

  const { data: complianceItems = [] } = useQuery({
    queryKey: ["complianceItems"],
    queryFn: mockApi.getComplianceItems,
  });

  const { data: departmentPerf = [] } = useQuery({
    queryKey: ["departmentPerf"],
    queryFn: mockApi.getDepartmentPerf,
  });

  const completeComplianceMutation = useMutation({
    mutationFn: mockApi.completeComplianceItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["complianceItems"] });
    },
  });

  const updateServiceStatusMutation = useMutation({
    mutationFn: ({ service, status, latency }: { service: string; status: any; latency: string }) => 
      mockApi.updateSystemServiceStatus(service, status, latency),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["systemHealth"] });
    },
  });

  // Map database metrics to icons dynamically
  const iconMap: Record<string, { icon: React.ReactNode; color: string }> = {
    "Total Patients": { icon: <UsersThree size={24} weight="duotone" />, color: "var(--primary)" },
    "Active Providers": { icon: <Stethoscope size={24} weight="duotone" />, color: "var(--accent)" },
    "Appointments Today": { icon: <CalendarDots size={24} weight="duotone" />, color: "var(--purple)" },
    "Revenue (MTD)": { icon: <CurrencyDollar size={24} weight="duotone" />, color: "var(--warning)" },
    "Bed Occupancy": { icon: <Hospital size={24} weight="duotone" />, color: "var(--critical)" },
    "Avg Wait Time": { icon: <Timer size={24} weight="duotone" />, color: "var(--accent)" },
  };

  const orgMetrics = storeMetrics.map((m: any) => ({
    label: m.label,
    value: m.value,
    change: m.change,
    trend: m.trend,
    icon: iconMap[m.label]?.icon || <UsersThree size={24} weight="duotone" />,
    color: iconMap[m.label]?.color || "var(--primary)",
  }));

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.greeting}>Organization Dashboard</h1>
          <p className={styles.subtitle}>Curalink Health System · Last updated: just now</p>
        </div>
        <div className={styles.headerActions}>
          <button className="btn btn-ghost btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <FileText size={16} /> Export Report
          </button>
          <button className="btn btn-primary btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <GearSix size={16} /> Settings
          </button>
        </div>
      </header>

      {/* KPI Grid */}
      <div className={styles.kpiGrid}>
        {orgMetrics.map((metric: any, i: number) => (
          <div key={i} className={`${styles.kpiCard} animate-fade-in stagger-${i + 1}`}>
            <div className={styles.kpiHeader}>
              <span className={styles.kpiIcon} style={{ background: `${metric.color}15`, color: metric.color }}>{metric.icon}</span>
              <span className={styles.kpiChange} style={{ color: metric.trend === "down" ? "var(--accent)" : "var(--primary)" }}>
                {metric.trend === "down" ? "↓" : "↑"} {metric.change}
              </span>
            </div>
            <div className={styles.kpiValue}>{metric.value}</div>
            <div className={styles.kpiLabel}>{metric.label}</div>
          </div>
        ))}
      </div>

      {/* Analytics Charts */}
      <div className={styles.chartsGrid}>
        <div className="card animate-fade-in" style={{ padding: 24 }}>
          <h2 className="heading-sm" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: 16 }}>
            <CurrencyDollar size={20} weight="duotone" style={{ color: "var(--primary)" }} /> System Revenue Trend (MTD)
          </h2>
          <RevenueChart />
        </div>
        <div className="card animate-fade-in" style={{ padding: 24 }}>
          <h2 className="heading-sm" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: 16 }}>
            <UsersThree size={20} weight="duotone" style={{ color: "var(--accent)" }} /> Department Patient Intake
          </h2>
          <DepartmentChart />
        </div>
      </div>

      {/* Main Grid */}
      <div className={styles.mainGrid}>
        {/* System Health */}
        <div className={`${styles.section} animate-fade-in stagger-1`}>
          <div className={styles.sectionHeader}>
            <h2 className="heading-sm" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Monitor size={20} weight="duotone" /> System Health
            </h2>
            <span className="badge badge-accent">All Systems</span>
          </div>
          <div className={styles.healthList}>
            {systemHealth.map((svc: any, i: number) => (
              <div key={i} className={styles.healthItem}>
                <div className={styles.healthStatus}>
                  <div className="status-dot" style={{ background: getStatusColor(svc.status), boxShadow: `0 0 6px ${getStatusColor(svc.status)}` }} />
                </div>
                <div className={styles.healthInfo}>
                  <strong className="text-sm">{svc.service}</strong>
                  <span className="text-xs text-muted">{svc.uptime} uptime</span>
                </div>
                <span className="text-mono text-xs text-muted">{svc.latency}</span>
                <span className={`badge ${svc.status === "operational" ? "badge-accent" : svc.status === "degraded" ? "badge-warning" : "badge-critical"}`}>
                  {svc.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance */}
        <div className={`${styles.section} animate-fade-in stagger-2`}>
          <div className={styles.sectionHeader}>
            <h2 className="heading-sm" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <ShieldCheck size={20} weight="duotone" /> Compliance & Audits
            </h2>
            <span className="badge badge-warning">2 Pending</span>
          </div>
          <div className={styles.complianceList}>
            {complianceItems.map((item: any, i: number) => (
              <div key={item.id || i} className={styles.complianceItem}>
                <div 
                  className={`${styles.complianceCheck} ${item.status === "completed" ? styles.complianceChecked : ""}`} 
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", cursor: item.status !== "completed" ? "pointer" : "default" }}
                  onClick={() => {
                    if (item.status !== "completed") {
                      completeComplianceMutation.mutate(item.id);
                    }
                  }}
                >
                  {item.status === "completed" && (
                    <Check size={10} weight="bold" style={{ color: "white" }} />
                  )}
                </div>
                <div className={styles.complianceInfo}>
                  <strong className="text-sm">{item.title}</strong>
                  <span className="text-xs text-muted">Due: {item.due}</span>
                </div>
                <span className={`badge ${item.priority === "high" ? "badge-critical" : item.priority === "medium" ? "badge-warning" : "badge-primary"}`}>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Department Performance */}
        <div className={`${styles.section} ${styles.sectionWide} animate-fade-in stagger-3`}>
          <div className={styles.sectionHeader}>
            <h2 className="heading-sm" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <ChartBar size={20} weight="duotone" /> Department Performance
            </h2>
          </div>
          <div className={styles.deptTable}>
            <div className={styles.deptHeader}>
              <span>Department</span>
              <span>Patients</span>
              <span>Satisfaction</span>
              <span>Revenue</span>
              <span>Efficiency</span>
            </div>
            {departmentPerf.map((dept: any, i: number) => (
              <div key={i} className={styles.deptRow}>
                <span className={styles.deptName}>{dept.dept}</span>
                <span className="text-mono text-sm">{dept.patients.toLocaleString()}</span>
                <span className={styles.deptSatisfaction}>
                  <div className="progress-bar" style={{ width: "60px" }}>
                    <div className="progress-bar-fill" style={{ 
                      width: `${dept.satisfaction}%`, 
                      background: dept.satisfaction >= 90 ? "var(--accent)" : "var(--warning)" 
                    }} />
                  </div>
                  <span className="text-mono text-xs">{dept.satisfaction}%</span>
                </span>
                <span className="text-mono text-sm" style={{ color: "var(--accent)" }}>{dept.revenue}</span>
                <span>
                  <span className={`badge ${dept.efficiency >= 85 ? "badge-accent" : "badge-warning"}`}>{dept.efficiency}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Users */}
        <div className={`${styles.section} ${styles.sectionWide} animate-fade-in stagger-4`}>
          <div className={styles.sectionHeader}>
            <h2 className="heading-sm" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <UsersThree size={20} weight="duotone" /> Recent User Activity
            </h2>
            <a href="/dashboard/admin/users" className={styles.viewAll}>Manage Users →</a>
          </div>
          <div className={styles.userList}>
            {recentUsers.map((user: any, i: number) => (
              <div key={i} className={styles.userItem}>
                <div className={styles.userAvatar} style={{
                  background: user.role === "Physician" ? "var(--accent-glow)" : user.role === "Nurse" ? "var(--primary-glow)" : "var(--purple-glow)",
                  color: user.role === "Physician" ? "var(--accent)" : user.role === "Nurse" ? "var(--primary)" : "var(--purple)"
                }}>
                  {user.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("")}
                </div>
                <div className={styles.userInfo}>
                  <strong className="text-sm">{user.name}</strong>
                  <span className="text-xs text-muted">{user.role} · {user.department}</span>
                </div>
                <span className="text-xs text-muted">{user.lastActive}</span>
                <div className={`status-dot ${user.status === "active" ? "status-dot-online" : "status-dot-offline"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
