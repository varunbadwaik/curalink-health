"use client";

import { useState } from "react";
import styles from "./page.module.css";
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
  ArrowRight
} from "@phosphor-icons/react";

const upcomingAppointments = [
  { id: 1, doctor: "Dr. Sarah Chen", specialty: "Cardiology", date: "Apr 22, 2026", time: "10:00 AM", type: "In-Person", status: "confirmed" },
  { id: 2, doctor: "Dr. Mike Torres", specialty: "General Medicine", date: "Apr 25, 2026", time: "2:30 PM", type: "Telehealth", status: "scheduled" },
  { id: 3, doctor: "Dr. Priya Patel", specialty: "Dermatology", date: "May 3, 2026", time: "11:15 AM", type: "In-Person", status: "scheduled" },
];

const medications = [
  { name: "Lisinopril", dosage: "10mg", frequency: "Once daily", adherence: 95, nextDose: "8:00 PM Today" },
  { name: "Metformin", dosage: "500mg", frequency: "Twice daily", adherence: 88, nextDose: "9:00 PM Today" },
  { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily", adherence: 92, nextDose: "10:00 PM Today" },
];

const recentLabs = [
  { test: "HbA1c", value: "6.8%", status: "borderline", date: "Apr 10, 2026", trend: "down" },
  { test: "Blood Pressure", value: "128/82", status: "normal", date: "Apr 15, 2026", trend: "stable" },
  { test: "Cholesterol (LDL)", value: "115 mg/dL", status: "normal", date: "Apr 10, 2026", trend: "down" },
  { test: "eGFR", value: "78 mL/min", status: "normal", date: "Apr 10, 2026", trend: "stable" },
];

const carePlanTasks = [
  { task: "30-min walk", completed: true },
  { task: "Blood sugar check", completed: true },
  { task: "Take medications", completed: false },
  { task: "Log meal diary", completed: false },
  { task: "Meditation (10 min)", completed: false },
];

const aiInsights = [
  { type: "success", icon: <CheckCircle size={18} weight="duotone" />, title: "Medication Adherence", message: "Your adherence is 92% this month — great job! Keep it up." },
  { type: "warning", icon: <Warning size={18} weight="duotone" />, title: "HbA1c Trending", message: "Your HbA1c has dropped from 7.2% to 6.8%. Continue your dietary changes." },
  { type: "info", icon: <Lightbulb size={18} weight="duotone" />, title: "Exercise Reminder", message: "You've completed 4/5 walks this week. One more to hit your goal!" },
];

export default function PatientDashboard() {
  const [greeting] = useState(() => {
    const h = new Date().getHours();
    return h < 12 ? "Good Morning" : h < 17 ? "Good Afternoon" : "Good Evening";
  });

  const completedTasks = carePlanTasks.filter(t => t.completed).length;

  return (
    <div className={styles.dashboard}>
      {/* Header */}
      <header className={styles.header}>
        <div>
          <h1 className={styles.greeting}>{greeting}, <span className="gradient-text">John</span></h1>
          <p className={styles.subtitle}>Here&apos;s your health overview for today</p>
        </div>
        <div className={styles.headerActions}>
          <button className="btn btn-ghost btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <Bell size={16} weight="duotone" />
            Notifications
          </button>
          <button className="btn btn-primary btn-sm">
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
            {aiInsights.map((insight, i) => (
              <div key={i} className={`${styles.insightCard} ${styles[`insight_${insight.type}`]}`}>
                <span className={styles.insightIcon}>{insight.icon}</span>
                <div>
                  <strong className={styles.insightTitle}>{insight.title}</strong>
                  <p className={styles.insightMsg}>{insight.message}</p>
                </div>
              </div>
            ))}
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
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className={styles.appointmentCard}>
                <div className={styles.aptDate}>
                  <span className={styles.aptDay}>{apt.date.split(" ")[1].replace(",","")}</span>
                  <span className={styles.aptMonth}>{apt.date.split(" ")[0]}</span>
                </div>
                <div className={styles.aptInfo}>
                  <strong>{apt.doctor}</strong>
                  <span className="text-sm text-muted">{apt.specialty} · {apt.time}</span>
                </div>
                <div className={styles.aptMeta}>
                  <span className={`badge ${apt.type === "Telehealth" ? "badge-primary" : "badge-accent"}`} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    {apt.type === "Telehealth" ? <VideoCamera size={14} weight="duotone" /> : <Hospital size={14} weight="duotone" />} {apt.type}
                  </span>
                  <span className={`badge ${apt.status === "confirmed" ? "badge-accent" : "badge-primary"}`}>
                    {apt.status}
                  </span>
                </div>
              </div>
            ))}
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
            {carePlanTasks.map((task, i) => (
              <div key={i} className={`${styles.taskItem} ${task.completed ? styles.taskDone : ""}`}>
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
    </div>
  );
}
