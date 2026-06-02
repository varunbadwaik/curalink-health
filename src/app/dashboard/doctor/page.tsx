"use client";

import styles from "./page.module.css";
import {
  ChartBar,
  UsersThree,
  Timer,
  ClipboardText,
  Brain,
  Siren,
  Hourglass,
  CalendarDots
} from "@phosphor-icons/react";

const patientQueue = [
  { id: "P-1042", name: "Maria Rodriguez", age: 67, condition: "Hypertension, T2 Diabetes", risk: 78, status: "waiting", waitTime: "12 min", avatar: "MR", aiFlag: "High BP trending" },
  { id: "P-1038", name: "James Wilson", age: 45, condition: "Post-surgical follow-up", risk: 32, status: "in-progress", waitTime: "—", avatar: "JW", aiFlag: null },
  { id: "P-1055", name: "Aisha Khan", age: 29, condition: "Prenatal care", risk: 15, status: "waiting", waitTime: "24 min", avatar: "AK", aiFlag: null },
  { id: "P-1061", name: "Robert Chang", age: 72, condition: "CHF, COPD", risk: 91, status: "critical", waitTime: "URGENT", avatar: "RC", aiFlag: "SpO2 dropped to 89%" },
  { id: "P-1044", name: "Elena Vasquez", age: 53, condition: "Rheumatoid arthritis", risk: 45, status: "waiting", waitTime: "35 min", avatar: "EV", aiFlag: "Lab results pending" },
];

const aiAlerts = [
  { severity: "critical", patient: "Robert Chang", message: "SpO2 dropped to 89% — oxygen saturation below safe threshold. Immediate assessment recommended.", time: "2 min ago" },
  { severity: "warning", patient: "Maria Rodriguez", message: "BP readings consistently >150/95 over past 3 days. Consider medication adjustment.", time: "15 min ago" },
  { severity: "info", patient: "James Wilson", message: "Post-op day 5 — wound healing markers within normal range. Discharge criteria may be met.", time: "1 hr ago" },
];

const todaySchedule = [
  { time: "9:00–9:30", patient: "Maria Rodriguez", type: "Follow-up", status: "completed" },
  { time: "9:45–10:15", patient: "James Wilson", type: "Post-Op Check", status: "in-progress" },
  { time: "10:30–11:00", patient: "Aisha Khan", type: "Prenatal", status: "upcoming" },
  { time: "11:15–11:45", patient: "Robert Chang", type: "Urgent", status: "upcoming" },
  { time: "1:00–1:30", patient: "Elena Vasquez", type: "Telehealth", status: "upcoming" },
  { time: "2:00–2:30", patient: "John Smith", type: "Annual Physical", status: "upcoming" },
];

const performanceMetrics = [
  { label: "Patients Today", value: "18", change: "+3", icon: <UsersThree size={24} weight="duotone" /> },
  { label: "Avg Wait Time", value: "14m", change: "-2m", icon: <Timer size={24} weight="duotone" /> },
  { label: "Care Plans Active", value: "42", change: "+5", icon: <ClipboardText size={24} weight="duotone" /> },
  { label: "AI Alerts", value: "5", change: "+2", icon: <Brain size={24} weight="duotone" /> },
];

function getRiskColor(risk: number) {
  if (risk >= 80) return "var(--critical)";
  if (risk >= 50) return "var(--warning)";
  return "var(--accent)";
}

function getStatusBadge(status: string) {
  switch (status) {
    case "critical": return "badge-critical";
    case "in-progress": return "badge-primary";
    case "waiting": return "badge-warning";
    case "completed": return "badge-accent";
    default: return "badge-primary";
  }
}

export default function DoctorDashboard() {
  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.greeting}>Command Center</h1>
          <p className={styles.subtitle}>Dr. Sarah Chen · Cardiology · April 18, 2026</p>
        </div>
        <div className={styles.headerActions}>
          <button className="btn btn-ghost btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <ChartBar size={16} /> Analytics
          </button>
          <button className="btn btn-primary btn-sm">
            + New Patient
          </button>
        </div>
      </header>

      {/* Performance Metrics */}
      <div className={styles.metricsGrid}>
        {performanceMetrics.map((metric, i) => (
          <div key={i} className={`${styles.metricCard} animate-fade-in stagger-${i + 1}`}>
            <div className={styles.metricIcon}>{metric.icon}</div>
            <div className={styles.metricData}>
              <span className={styles.metricValue}>{metric.value}</span>
              <span className={styles.metricLabel}>{metric.label}</span>
            </div>
            <span className={styles.metricChange} style={{ color: metric.change.includes("-") ? "var(--accent)" : "var(--primary)" }}>
              {metric.change}
            </span>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className={styles.mainGrid}>
        {/* AI Alerts — Top Priority */}
        <div className={`${styles.section} ${styles.alertsSection} animate-fade-in stagger-1`}>
          <div className={styles.sectionHeader}>
            <h2 className="heading-sm" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Siren size={20} weight="duotone" /> AI Decision Support Alerts
            </h2>
            <span className="badge badge-critical">{aiAlerts.length} Active</span>
          </div>
          <div className={styles.alertsList}>
            {aiAlerts.map((alert, i) => (
              <div key={i} className={`${styles.alertCard} ${styles[`alert_${alert.severity}`]}`}>
                <div className={styles.alertTop}>
                  <span className={`badge ${getStatusBadge(alert.severity === "critical" ? "critical" : alert.severity === "warning" ? "waiting" : "in-progress")}`}>
                    {alert.severity.toUpperCase()}
                  </span>
                  <span className="text-xs text-muted">{alert.time}</span>
                </div>
                <strong className={styles.alertPatient}>{alert.patient}</strong>
                <p className={styles.alertMsg}>{alert.message}</p>
                <div className={styles.alertActions}>
                  <button className="btn btn-primary btn-sm">Review Patient</button>
                  <button className="btn btn-ghost btn-sm">Dismiss</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Patient Queue */}
        <div className={`${styles.section} animate-fade-in stagger-2`}>
          <div className={styles.sectionHeader}>
            <h2 className="heading-sm" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <UsersThree size={20} weight="duotone" /> Patient Queue
            </h2>
            <span className="badge badge-primary">{patientQueue.length} Patients</span>
          </div>
          <div className={styles.queueList}>
            {patientQueue.map((patient) => (
              <div key={patient.id} className={`${styles.queueCard} ${patient.status === "critical" ? styles.queueCritical : ""}`}>
                <div className={styles.queueAvatar} style={{ 
                  background: `${getRiskColor(patient.risk)}15`, 
                  color: getRiskColor(patient.risk) 
                }}>
                  {patient.avatar}
                </div>
                <div className={styles.queueInfo}>
                  <div className={styles.queueNameRow}>
                    <strong>{patient.name}</strong>
                    <span className="text-xs text-muted">{patient.id}</span>
                  </div>
                  <span className="text-sm text-muted">{patient.condition}</span>
                  {patient.aiFlag && (
                    <span className={styles.queueAiFlag} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      <Brain size={12} weight="duotone" /> {patient.aiFlag}
                    </span>
                  )}
                </div>
                <div className={styles.queueMeta}>
                  <div className={styles.riskGauge}>
                    <svg width="40" height="40" viewBox="0 0 40 40">
                      <circle cx="20" cy="20" r="16" fill="none" stroke="var(--bg-tertiary)" strokeWidth="3" />
                      <circle cx="20" cy="20" r="16" fill="none" stroke={getRiskColor(patient.risk)} strokeWidth="3"
                        strokeDasharray={`${patient.risk} ${100 - patient.risk}`}
                        strokeDashoffset="25" strokeLinecap="round"
                        style={{ transition: "stroke-dasharray 1s ease" }}
                      />
                      <text x="20" y="24" textAnchor="middle" fill={getRiskColor(patient.risk)} fontSize="10" fontWeight="700" fontFamily="var(--font-mono)">{patient.risk}</text>
                    </svg>
                  </div>
                  <span className={`badge ${getStatusBadge(patient.status)}`} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    {patient.status === "waiting" ? (
                      <>
                        <Hourglass size={12} /> {patient.waitTime}
                      </>
                    ) : patient.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Today's Schedule */}
        <div className={`${styles.section} animate-fade-in stagger-3`}>
          <div className={styles.sectionHeader}>
            <h2 className="heading-sm" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <CalendarDots size={20} weight="duotone" /> Today&apos;s Schedule
            </h2>
            <a href="/dashboard/doctor/schedule" className={styles.viewAll}>Full Calendar →</a>
          </div>
          <div className={styles.scheduleList}>
            {todaySchedule.map((slot, i) => (
              <div key={i} className={`${styles.scheduleItem} ${slot.status === "in-progress" ? styles.scheduleActive : ""} ${slot.status === "completed" ? styles.scheduleDone : ""}`}>
                <div className={styles.scheduleTime}>
                  <span className="text-mono text-sm">{slot.time}</span>
                </div>
                <div className={styles.scheduleDot}>
                  <div className={`status-dot ${slot.status === "completed" ? "status-dot-online" : slot.status === "in-progress" ? "status-dot-warning" : "status-dot-offline"}`} />
                </div>
                <div className={styles.scheduleContent}>
                  <strong className="text-sm">{slot.patient}</strong>
                  <span className="text-xs text-muted">{slot.type}</span>
                </div>
                <span className={`badge ${getStatusBadge(slot.status)}`}>{slot.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
