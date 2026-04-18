"use client";
import { useState } from "react";

const appointments = [
  { id: 1, doctor: "Dr. Sarah Chen", specialty: "Cardiology", date: "2026-04-22", time: "10:00 AM", type: "In-Person", status: "confirmed", location: "Building A, Room 204", notes: "Follow-up for hypertension management" },
  { id: 2, doctor: "Dr. Mike Torres", specialty: "General Medicine", date: "2026-04-25", time: "2:30 PM", type: "Telehealth", status: "scheduled", location: "Virtual", notes: "Annual physical examination" },
  { id: 3, doctor: "Dr. Priya Patel", specialty: "Dermatology", date: "2026-05-03", time: "11:15 AM", type: "In-Person", status: "scheduled", location: "Building C, Room 112", notes: "Skin check follow-up" },
  { id: 4, doctor: "Dr. James Park", specialty: "Oncology", date: "2026-04-15", time: "9:00 AM", type: "In-Person", status: "completed", location: "Building B, Room 301", notes: "Lab review" },
  { id: 5, doctor: "Dr. Lisa Wong", specialty: "Pediatrics", date: "2026-04-10", time: "3:00 PM", type: "Telehealth", status: "completed", location: "Virtual", notes: "Consultation" },
  { id: 6, doctor: "Dr. Sarah Chen", specialty: "Cardiology", date: "2026-03-28", time: "10:30 AM", type: "In-Person", status: "cancelled", location: "Building A, Room 204", notes: "Rescheduled to April" },
];

const statusColors: Record<string, string> = { confirmed: "badge-accent", scheduled: "badge-primary", completed: "badge-purple", cancelled: "badge-critical" };

export default function AppointmentsPage() {
  const [filter, setFilter] = useState("all");
  const filtered = filter === "all" ? appointments : appointments.filter(a => a.status === filter);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div><h1 className="heading-lg">📅 Appointments</h1><p className="text-muted" style={{marginTop:4}}>Manage your upcoming and past appointments</p></div>
        <button className="btn btn-primary">+ Book New Appointment</button>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
        {["all","confirmed","scheduled","completed","cancelled"].map(f => (
          <button key={f} className={`btn btn-sm ${filter === f ? "btn-primary" : "btn-ghost"}`} onClick={() => setFilter(f)}>
            {f.charAt(0).toUpperCase() + f.slice(1)} {f === "all" ? `(${appointments.length})` : `(${appointments.filter(a=>a.status===f).length})`}
          </button>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filtered.map(apt => (
          <div key={apt.id} className="card" style={{ display: "flex", alignItems: "center", gap: 20, padding: "20px 24px" }}>
            <div style={{ minWidth: 56, textAlign: "center", padding: "8px 12px", background: "var(--primary-glow)", borderRadius: "var(--radius-md)" }}>
              <div style={{ fontSize: "1.5rem", fontWeight: 800, color: "var(--primary-light)", lineHeight: 1 }}>{new Date(apt.date).getDate()}</div>
              <div style={{ fontSize: "0.625rem", color: "var(--primary)", textTransform: "uppercase", fontWeight: 600 }}>{new Date(apt.date).toLocaleString("default",{month:"short"})}</div>
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2 }}>
              <strong>{apt.doctor}</strong>
              <span className="text-sm text-muted">{apt.specialty} · {apt.time}</span>
              <span className="text-xs text-muted">{apt.location}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
              <span className={`badge ${apt.type === "Telehealth" ? "badge-primary" : "badge-accent"}`}>{apt.type === "Telehealth" ? "📹" : "🏥"} {apt.type}</span>
              <span className={`badge ${statusColors[apt.status]}`}>{apt.status}</span>
            </div>
            {apt.status === "scheduled" || apt.status === "confirmed" ? (
              <div style={{ display: "flex", gap: 6 }}>
                <button className="btn btn-ghost btn-sm">Reschedule</button>
                <button className="btn btn-sm" style={{ background: "var(--critical-glow)", color: "var(--critical-light)", border: "1px solid rgba(239,68,68,0.2)" }}>Cancel</button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
