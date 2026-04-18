"use client";

import styles from "./page.module.css";

const orgMetrics = [
  { label: "Total Patients", value: "12,847", change: "+342", trend: "up", icon: "👥", color: "var(--primary)" },
  { label: "Active Providers", value: "186", change: "+8", trend: "up", icon: "🩺", color: "var(--accent)" },
  { label: "Appointments Today", value: "847", change: "+12%", trend: "up", icon: "📅", color: "var(--purple)" },
  { label: "Revenue (MTD)", value: "$2.4M", change: "+18%", trend: "up", icon: "💰", color: "var(--warning)" },
  { label: "Bed Occupancy", value: "87%", change: "+3%", trend: "up", icon: "🏥", color: "var(--critical)" },
  { label: "Avg Wait Time", value: "14 min", change: "-2 min", trend: "down", icon: "⏱️", color: "var(--accent)" },
];

const systemHealth = [
  { service: "API Gateway", status: "operational", uptime: "99.99%", latency: "45ms" },
  { service: "Database Cluster", status: "operational", uptime: "99.97%", latency: "12ms" },
  { service: "AI Engine", status: "operational", uptime: "99.95%", latency: "180ms" },
  { service: "FHIR Gateway", status: "degraded", uptime: "99.2%", latency: "340ms" },
  { service: "Notification Service", status: "operational", uptime: "99.98%", latency: "28ms" },
  { service: "File Storage (S3)", status: "operational", uptime: "99.99%", latency: "65ms" },
];

const recentUsers = [
  { name: "Dr. James Park", role: "Physician", department: "Oncology", status: "active", lastActive: "5 min ago" },
  { name: "Sarah Miller, RN", role: "Nurse", department: "ICU", status: "active", lastActive: "12 min ago" },
  { name: "Admin: Tom Hayes", role: "Admin", department: "Operations", status: "active", lastActive: "1 hr ago" },
  { name: "Dr. Lisa Wong", role: "Physician", department: "Pediatrics", status: "inactive", lastActive: "2 days ago" },
  { name: "Mark Johnson", role: "Technician", department: "Radiology", status: "active", lastActive: "30 min ago" },
];

const complianceItems = [
  { title: "HIPAA Audit Log Review", due: "Apr 20, 2026", status: "pending", priority: "high" },
  { title: "Staff Security Training", due: "Apr 25, 2026", status: "in-progress", priority: "medium" },
  { title: "Data Backup Verification", due: "Apr 18, 2026", status: "completed", priority: "high" },
  { title: "Access Control Review", due: "May 1, 2026", status: "pending", priority: "low" },
];

const departmentPerf = [
  { dept: "Cardiology", patients: 2340, satisfaction: 94, revenue: "$420K", efficiency: 91 },
  { dept: "Oncology", patients: 1870, satisfaction: 96, revenue: "$580K", efficiency: 88 },
  { dept: "Pediatrics", patients: 3120, satisfaction: 92, revenue: "$310K", efficiency: 93 },
  { dept: "Emergency", patients: 4560, satisfaction: 87, revenue: "$890K", efficiency: 78 },
  { dept: "Orthopedics", patients: 1540, satisfaction: 91, revenue: "$360K", efficiency: 85 },
];

function getStatusColor(status: string) {
  switch (status) {
    case "operational": return "var(--accent)";
    case "degraded": return "var(--warning)";
    case "down": return "var(--critical)";
    default: return "var(--text-muted)";
  }
}

export default function AdminDashboard() {
  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.greeting}>Organization Dashboard</h1>
          <p className={styles.subtitle}>Curalink Health System · Last updated: just now</p>
        </div>
        <div className={styles.headerActions}>
          <button className="btn btn-ghost btn-sm">📑 Export Report</button>
          <button className="btn btn-primary btn-sm">⚙️ Settings</button>
        </div>
      </header>

      {/* KPI Grid */}
      <div className={styles.kpiGrid}>
        {orgMetrics.map((metric, i) => (
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

      {/* Main Grid */}
      <div className={styles.mainGrid}>
        {/* System Health */}
        <div className={`${styles.section} animate-fade-in stagger-1`}>
          <div className={styles.sectionHeader}>
            <h2 className="heading-sm">🖥️ System Health</h2>
            <span className="badge badge-accent">All Systems</span>
          </div>
          <div className={styles.healthList}>
            {systemHealth.map((svc, i) => (
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
            <h2 className="heading-sm">🛡️ Compliance & Audits</h2>
            <span className="badge badge-warning">2 Pending</span>
          </div>
          <div className={styles.complianceList}>
            {complianceItems.map((item, i) => (
              <div key={i} className={styles.complianceItem}>
                <div className={`${styles.complianceCheck} ${item.status === "completed" ? styles.complianceChecked : ""}`}>
                  {item.status === "completed" && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3"><polyline points="20,6 9,17 4,12"/></svg>
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
            <h2 className="heading-sm">📊 Department Performance</h2>
          </div>
          <div className={styles.deptTable}>
            <div className={styles.deptHeader}>
              <span>Department</span>
              <span>Patients</span>
              <span>Satisfaction</span>
              <span>Revenue</span>
              <span>Efficiency</span>
            </div>
            {departmentPerf.map((dept, i) => (
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
            <h2 className="heading-sm">👥 Recent User Activity</h2>
            <a href="/dashboard/admin/users" className={styles.viewAll}>Manage Users →</a>
          </div>
          <div className={styles.userList}>
            {recentUsers.map((user, i) => (
              <div key={i} className={styles.userItem}>
                <div className={styles.userAvatar} style={{
                  background: user.role === "Physician" ? "var(--accent-glow)" : user.role === "Nurse" ? "var(--primary-glow)" : "var(--purple-glow)",
                  color: user.role === "Physician" ? "var(--accent)" : user.role === "Nurse" ? "var(--primary)" : "var(--purple)"
                }}>
                  {user.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
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
