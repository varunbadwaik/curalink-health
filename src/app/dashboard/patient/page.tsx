"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { mockApi } from "@/services/api";
import dynamic from "next/dynamic";
const PatientVitalsChart = dynamic(() => import("@/components/charts/PatientVitalsChart"), { ssr: false });
import BookingForm from "@/components/forms/BookingForm";
import ProfileForm from "@/components/forms/ProfileForm";
import {
  Bell,
  Heartbeat,
  Drop,
  Cookie,
  Scales,
  CheckCircle,
  Warning,
  Lightbulb,
  Brain,
  CalendarDots,
  Pill,
  ClipboardText,
  Flask,
  VideoCamera,
  Hospital,
  Check,
  TrendDown,
  TrendUp,
  ArrowRight,
  X,
  User
} from "@phosphor-icons/react";


export default function PatientDashboard() {
  const queryClient = useQueryClient();
  const [showBookModal, setShowBookModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    return h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";
  });

  const { data: appointments = [] } = useQuery({
    queryKey: ["appointments"],
    queryFn: mockApi.getAppointments,
  });

  const { data: medications = [] } = useQuery({
    queryKey: ["medications"],
    queryFn: mockApi.getMedications,
  });

  const { data: recentLabs = [] } = useQuery({
    queryKey: ["labs"],
    queryFn: mockApi.getLabs,
  });

  const { data: carePlanTasks = [] } = useQuery({
    queryKey: ["carePlanTasks"],
    queryFn: mockApi.getCarePlanTasks,
  });

  const { data: aiInsights = [] } = useQuery({
    queryKey: ["aiInsights"],
    queryFn: mockApi.getAIInsights,
  });

  const toggleTaskMutation = useMutation({
    mutationFn: mockApi.toggleCarePlanTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["carePlanTasks"] });
    },
  });

  const completedTasks = carePlanTasks.filter((t: any) => t.completed).length;

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.greeting}>{greeting}, <span className="gradient-text">John</span></h1>
          <p className={styles.subtitle}>Here&apos;s your health overview for today</p>
        </div>
        <div className={styles.headerActions}>
          <button className="btn btn-ghost btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }} onClick={() => setShowProfileModal(true)}>
            <User size={16} weight="duotone" />
            Profile Settings
          </button>
          <button className="btn btn-ghost btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Bell size={16} weight="duotone" />
            Notifications
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowBookModal(true)}>
            + Book Appointment
          </button>
        </div>
      </header>

      {/* Vitals Banner */}
      <div className={styles.vitalsGrid}>
        {[
          { label: "Heart Rate", value: "72", unit: "bpm", icon: <Heartbeat size={24} weight="duotone" />, color: "var(--critical)", trend: "+2" },
          { label: "Blood Pressure", value: "128/82", unit: "mmHg", icon: <Drop size={24} weight="duotone" />, color: "var(--primary)", trend: "-3" },
          { label: "Blood Sugar", value: "98", unit: "mg/dL", icon: <Cookie size={24} weight="duotone" />, color: "var(--accent)", trend: "-5" },
          { label: "Weight", value: "178", unit: "lbs", icon: <Scales size={24} weight="duotone" />, color: "var(--purple)", trend: "-1.2" },
        ].map((vital, i) => (
          <div key={i} className={`${styles.vitalCard} animate-fade-in stagger-${i + 1}`}>
            <div className={styles.vitalHeader}>
              <span className={styles.vitalIcon}>{vital.icon}</span>
              <span className={styles.vitalTrend} style={{ color: vital.trend.startsWith("-") ? "var(--accent)" : "var(--warning)" }}>
                {vital.trend.startsWith("-") ? "↓" : "↑"} {vital.trend}
              </span>
            </div>
            <div className={styles.vitalValue}>
              <span style={{ color: vital.color }}>{vital.value}</span>
              <span className={styles.vitalUnit}>{vital.unit}</span>
            </div>
            <span className={styles.vitalLabel}>{vital.label}</span>
          </div>
        ))}
      </div>

      {/* Vitals History Graph */}
      <div className="card animate-fade-in" style={{ padding: 24, marginBottom: 24 }}>
        <h2 className="heading-sm" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginBottom: 16 }}>
          <Heartbeat size={20} weight="duotone" style={{ color: "var(--primary)" }} /> Vitals Trends (Historical)
        </h2>
        <PatientVitalsChart />
      </div>

      {/* Main Grid */}
      <div className={styles.mainGrid}>
        {/* AI Insights */}
        <div className={`${styles.section} animate-fade-in stagger-1`}>
          <div className={styles.sectionHeader}>
            <h2 className="heading-sm" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Brain size={20} weight="duotone" /> AI Health Insights
            </h2>
          </div>
          <div className={styles.insightsList}>
            {aiInsights.map((insight: any, i: number) => {
              const icon = insight.type === "success" ? <CheckCircle size={18} weight="duotone" /> 
                         : insight.type === "warning" ? <Warning size={18} weight="duotone" /> 
                         : <Lightbulb size={18} weight="duotone" />;
              return (
                <div key={i} className={`${styles.insightCard} ${styles[`insight_${insight.type}`]}`}>
                  <span className={styles.insightIcon}>{icon}</span>
                  <div>
                    <strong className={styles.insightTitle}>{insight.title}</strong>
                    <p className={styles.insightMsg}>{insight.message}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className={`${styles.section} animate-fade-in stagger-2`}>
          <div className={styles.sectionHeader}>
            <h2 className="heading-sm" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <CalendarDots size={20} weight="duotone" /> Upcoming Appointments
            </h2>
            <a href="/dashboard/patient/appointments" className={styles.viewAll}>View All →</a>
          </div>
          <div className={styles.appointmentList}>
            {appointments.length === 0 ? (
              <p className="text-sm text-muted" style={{ padding: "12px 0", textAlign: "center" }}>No upcoming appointments found.</p>
            ) : (
              appointments.slice(0, 3).map((apt: any) => {
                // Inline date formatter helper
                const dateStr = apt.date;
                let day = "22";
                let month = "Apr";
                if (dateStr.includes("-")) {
                  const [y, m, d] = dateStr.split("-");
                  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                  day = parseInt(d).toString();
                  month = months[parseInt(m) - 1] || "Jun";
                } else {
                  const parts = dateStr.split(" ");
                  month = parts[0] || "Apr";
                  day = parts[1]?.replace(",", "") || "22";
                }
                return (
                  <div key={apt.id} className={styles.appointmentCard}>
                    <div className={styles.aptDate}>
                      <span className={styles.aptDay}>{day}</span>
                      <span className={styles.aptMonth}>{month}</span>
                    </div>
                    <div className={styles.aptInfo}>
                      <strong>{apt.doctorName}</strong>
                      <span className="text-sm text-muted">{apt.specialty} · {apt.time}</span>
                    </div>
                    <div className={styles.aptMeta}>
                      <span className={`badge ${apt.type === "Telehealth" ? "badge-primary" : "badge-accent"}`} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                        {apt.type === "Telehealth" ? <VideoCamera size={14} weight="duotone" /> : <Hospital size={14} weight="duotone" />} {apt.type}
                      </span>
                      <span className={`badge ${apt.status.toLowerCase() === "confirmed" ? "badge-accent" : "badge-primary"}`}>
                        {apt.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Medications */}
        <div className={`${styles.section} animate-fade-in stagger-3`}>
          <div className={styles.sectionHeader}>
            <h2 className="heading-sm" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Pill size={20} weight="duotone" /> Medications
            </h2>
          </div>
          <div className={styles.medList}>
            {medications.map((med, i) => (
              <div key={i} className={styles.medCard}>
                <div className={styles.medInfo}>
                  <strong>{med.name}</strong>
                  <span className="text-sm text-muted">{med.dosage} · {med.frequency}</span>
                  <span className="text-xs text-muted">Next: {med.nextDose}</span>
                </div>
                <div className={styles.medAdherence}>
                  <span className="text-sm" style={{ color: med.adherence >= 90 ? "var(--accent)" : "var(--warning)" }}>
                    {med.adherence}%
                  </span>
                  <div className="progress-bar" style={{ width: "80px" }}>
                    <div className="progress-bar-fill" style={{ 
                      width: `${med.adherence}%`, 
                      background: med.adherence >= 90 ? "var(--accent)" : "var(--warning)" 
                    }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Care Plan Progress */}
        <div className={`${styles.section} animate-fade-in stagger-4`}>
          <div className={styles.sectionHeader}>
            <h2 className="heading-sm" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <ClipboardText size={20} weight="duotone" /> Today&apos;s Care Plan
            </h2>
            <span className="badge badge-primary">{completedTasks}/{carePlanTasks.length}</span>
          </div>
          <div className={styles.taskList}>
            {carePlanTasks.map((task: any, i: number) => (
              <div 
                key={task.id || i} 
                className={`${styles.taskItem} ${task.completed ? styles.taskDone : ""}`}
                style={{ cursor: "pointer" }}
                onClick={() => toggleTaskMutation.mutate(task.id)}
              >
                <div className={`${styles.taskCheck} ${task.completed ? styles.taskChecked : ""}`} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {task.completed && (
                    <Check size={10} weight="bold" style={{ color: "white" }} />
                  )}
                </div>
                <span>{task.task}</span>
              </div>
            ))}
          </div>
          <div className={styles.progressSummary}>
            <div className="progress-bar" style={{ width: "100%" }}>
              <div className="progress-bar-fill" style={{ 
                width: `${(completedTasks / carePlanTasks.length) * 100}%`, 
                background: "linear-gradient(90deg, var(--primary), var(--accent))" 
              }} />
            </div>
            <span className="text-xs text-muted" style={{ marginTop: "6px", display: "block" }}>
              {Math.round((completedTasks / carePlanTasks.length) * 100)}% complete today
            </span>
          </div>
        </div>

        {/* Recent Lab Results */}
        <div className={`${styles.section} ${styles.sectionWide} animate-fade-in stagger-5`}>
          <div className={styles.sectionHeader}>
            <h2 className="heading-sm" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
              <Flask size={20} weight="duotone" /> Recent Lab Results
            </h2>
            <a href="/dashboard/patient/labs" className={styles.viewAll}>View All →</a>
          </div>
          <div className={styles.labGrid}>
            {recentLabs.map((lab, i) => (
              <div key={i} className={styles.labCard}>
                <div className={styles.labInfo}>
                  <strong>{lab.test}</strong>
                  <span className="text-xs text-muted">{lab.date}</span>
                </div>
                <div className={styles.labValue}>
                  <span className={styles.labNumber}>{lab.value}</span>
                  <span className={`badge ${lab.status === "normal" ? "badge-accent" : "badge-warning"}`}>
                    {lab.status}
                  </span>
                </div>
                <div className={styles.labTrend} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                  {lab.trend === "down" ? <TrendDown size={16} /> : lab.trend === "up" ? <TrendUp size={16} /> : <ArrowRight size={16} />}
                  <span className="text-xs text-muted">{lab.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {showBookModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }} onClick={() => setShowBookModal(false)}>
          <div style={{ background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border-subtle)", padding: 24, width: "100%", maxWidth: 450, position: "relative", boxShadow: "var(--shadow-lg)" }} onClick={e => e.stopPropagation()}>
            <button style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center" }} onClick={() => setShowBookModal(false)}>
              <X size={20} />
            </button>
            <div style={{ marginBottom: 20 }}>
              <h2 className="heading-md" style={{ marginBottom: 4 }}>Book Appointment</h2>
              <p className="text-sm text-muted">Schedule a visit with your provider</p>
            </div>
            <BookingForm onSuccess={() => setShowBookModal(false)} />
          </div>
        </div>
      )}

      {/* Profile Settings Modal */}
      {showProfileModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }} onClick={() => setShowProfileModal(false)}>
          <div style={{ background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border-subtle)", padding: 24, width: "100%", maxWidth: 450, position: "relative", boxShadow: "var(--shadow-lg)" }} onClick={e => e.stopPropagation()}>
            <button style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center" }} onClick={() => setShowProfileModal(false)}>
              <X size={20} />
            </button>
            <div style={{ marginBottom: 20 }}>
              <h2 className="heading-md" style={{ marginBottom: 4 }}>Profile Settings</h2>
              <p className="text-sm text-muted">Update your personal and medical information</p>
            </div>
            <ProfileForm onSuccess={() => setShowProfileModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
