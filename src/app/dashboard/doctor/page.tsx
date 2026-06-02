"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/services/api";
import dynamic from "next/dynamic";
const DoctorWorkloadChart = dynamic(() => import("@/components/charts/DoctorCharts").then(m => m.DoctorWorkloadChart), { ssr: false });
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


function getRiskColor(risk: number | string) {
  if (risk === "high" || risk === 80 || (typeof risk === "number" && risk >= 80)) return "var(--critical)";
  if (risk === "medium" || risk === 50 || (typeof risk === "number" && risk >= 50)) return "var(--warning)";
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
  const queryClient = useQueryClient();

  const { data: queue = [] } = useQuery({
    queryKey: ["queue"],
    queryFn: mockApi.getQueue,
  });

  const { data: aiAlerts = [] } = useQuery({
    queryKey: ["aiAlerts"],
    queryFn: mockApi.getDoctorAlerts,
  });

  const { data: todaySchedule = [] } = useQuery({
    queryKey: ["todaySchedule"],
    queryFn: mockApi.getDoctorSchedule,
  });

  const { data: storeMetrics = [] } = useQuery({
    queryKey: ["doctorMetrics"],
    queryFn: mockApi.getDoctorMetrics,
  });

  const dismissAlertMutation = useMutation({
    mutationFn: mockApi.dismissDoctorAlert,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["aiAlerts"] });
    },
  });

  const updateScheduleMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: any }) => mockApi.updateDoctorScheduleStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todaySchedule"] });
    },
  });

  // Map state/database metrics to icons dynamically
  const iconMap: Record<string, React.ReactNode> = {
    "Patients Today": <UsersThree size={24} weight="duotone" />,
    "Avg Wait Time": <Timer size={24} weight="duotone" />,
    "Care Plans Active": <ClipboardText size={24} weight="duotone" />,
    "AI Alerts": <Brain size={24} weight="duotone" />,
  };

  const performanceMetrics = storeMetrics.map((m: any) => ({
    label: m.label,
    value: m.value,
    change: m.change,
    icon: iconMap[m.label] || <UsersThree size={24} weight="duotone" />,
  }));

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

      {/* Workload Trends Chart */}
      <div className="card animate-fade-in" style={{ padding: 24, marginBottom: 24 }}>
        <h2 className="heading-sm" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: 16 }}>
          <ChartBar size={20} weight="duotone" style={{ color: "var(--accent)" }} /> Provider Workload Trends
        </h2>
        <DoctorWorkloadChart />
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
            {aiAlerts.map((alert: any, i: number) => (
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
                  <button 
                    className="btn btn-ghost btn-sm"
                    onClick={() => dismissAlertMutation.mutate(alert.patient)}
                  >
                    Dismiss
                  </button>
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
            <span className="badge badge-primary">{queue.length} Patients</span>
          </div>
          <div className={styles.queueList}>
            {queue.length === 0 ? (
              <p style={{ padding: 24, textAlign: "center" }} className="text-sm text-muted">No patients in the queue.</p>
            ) : (
              queue.map((patient: any) => {
                const avatar = patient.name.split(" ").map((n: string) => n[0]).slice(0, 2).join("");
                const riskNumber = patient.risk === "high" ? 85 : patient.risk === "medium" ? 45 : 15;
                const riskColor = getRiskColor(patient.risk);
                return (
                  <div key={patient.id} className={`${styles.queueCard} ${patient.status === "critical" ? styles.queueCritical : ""}`}>
                    <div className={styles.queueAvatar} style={{ 
                      background: `${riskColor}15`, 
                      color: riskColor 
                    }}>
                      {avatar}
                    </div>
                    <div className={styles.queueInfo}>
                      <div className={styles.queueNameRow}>
                        <strong>{patient.name}</strong>
                        <span className="text-xs text-muted">{patient.id}</span>
                      </div>
                      <span className="text-sm text-muted">{patient.reason}</span>
                    </div>
                    <div className={styles.queueMeta}>
                      <div className={styles.riskGauge}>
                        <svg width="40" height="40" viewBox="0 0 40 40">
                          <circle cx="20" cy="20" r="16" fill="none" stroke="var(--bg-tertiary)" strokeWidth="3" />
                          <circle cx="20" cy="20" r="16" fill="none" stroke={riskColor} strokeWidth="3"
                            strokeDasharray={`${riskNumber} ${100 - riskNumber}`}
                            strokeDashoffset="25" strokeLinecap="round"
                            style={{ transition: "stroke-dasharray 1s ease" }}
                          />
                          <text x="20" y="24" textAnchor="middle" fill={riskColor} fontSize="10" fontWeight="700" fontFamily="var(--font-mono)">
                            {patient.risk.toUpperCase().slice(0, 3)}
                          </text>
                        </svg>
                      </div>
                      <span className={`badge ${getStatusBadge(patient.status)}`} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        {patient.status === "waiting" ? (
                          <>
                            <Hourglass size={12} /> {patient.time}
                          </>
                        ) : patient.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
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
            {todaySchedule.map((slot: any, i: number) => (
              <div 
                key={slot.id || i} 
                className={`${styles.scheduleItem} ${slot.status === "in-progress" ? styles.scheduleActive : ""} ${slot.status === "completed" ? styles.scheduleDone : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => {
                  const nextStatus = slot.status === "upcoming" ? "in-progress" : slot.status === "in-progress" ? "completed" : "upcoming";
                  updateScheduleMutation.mutate({ id: slot.id, status: nextStatus });
                }}
              >
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
