"use client";
import { ClipboardText, Crosshair, NotePencil, Check } from "@phosphor-icons/react";

const plans = [
  { id: 1, title: "Cardiovascular Health Management", provider: "Dr. Sarah Chen", status: "active", startDate: "Mar 1, 2026", progress: 68, goals: ["Reduce BP below 130/80", "Daily 30-min exercise", "Low-sodium diet"], tasks: [{t:"Morning BP check",done:true},{t:"30-min walk",done:true},{t:"Take Lisinopril",done:false},{t:"Log meals",done:false}] },
  { id: 2, title: "Diabetes Type 2 Management", provider: "Dr. Mike Torres", status: "active", startDate: "Jan 15, 2026", progress: 75, goals: ["HbA1c below 7.0%", "Blood sugar 80-130 mg/dL", "Weight loss 5lbs"], tasks: [{t:"Blood sugar check",done:true},{t:"Take Metformin",done:true},{t:"15-min post-meal walk",done:true},{t:"Carb tracking",done:false}] },
  { id: 3, title: "Preventive Skin Health", provider: "Dr. Priya Patel", status: "upcoming", startDate: "May 3, 2026", progress: 0, goals: ["Monthly skin self-exam", "SPF 50 daily", "Quarterly dermatology visits"], tasks: [] },
];

export default function CarePlansPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 className="heading-lg" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <ClipboardText size={28} weight="duotone" /> Care Plans
          </h1>
          <p className="text-muted" style={{marginTop:4}}>Active and upcoming care plans from your providers</p>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {plans.map(plan => (
          <div key={plan.id} className="card" style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <h2 className="heading-md" style={{ marginBottom: 4 }}>{plan.title}</h2>
                <p className="text-sm text-muted">{plan.provider} · Started {plan.startDate}</p>
              </div>
              <span className={`badge ${plan.status === "active" ? "badge-accent" : "badge-primary"}`}>{plan.status}</span>
            </div>
            {plan.status === "active" && (
              <>
                <div style={{ marginBottom: 16 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span className="text-sm">Progress</span><span className="text-sm text-mono" style={{color:"var(--accent)"}}>{plan.progress}%</span></div>
                  <div className="progress-bar" style={{ height: 8 }}><div className="progress-bar-fill" style={{ width: `${plan.progress}%`, background: "linear-gradient(90deg, var(--primary), var(--accent))" }} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <h3 className="heading-sm" style={{ marginBottom: 8, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <Crosshair size={18} weight="duotone" /> Goals
                    </h3>
                    {plan.goals.map((g, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                      <Check size={14} weight="bold" style={{ color: "var(--accent)" }} />{g}
                    </div>)}
                  </div>
                  <div>
                    <h3 className="heading-sm" style={{ marginBottom: 8, display: "inline-flex", alignItems: "center", gap: "6px" }}>
                      <NotePencil size={18} weight="duotone" /> Today&apos;s Tasks
                    </h3>
                    {plan.tasks.map((task, i) => <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", fontSize: "0.8125rem", color: task.done ? "var(--text-muted)" : "var(--text-primary)", textDecoration: task.done ? "line-through" : "none" }}>
                      <div style={{ width: 18, height: 18, borderRadius: 5, border: task.done ? "none" : "2px solid var(--border-strong)", background: task.done ? "var(--accent)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {task.done && <Check size={10} weight="bold" style={{ color: "white" }} />}
                      </div>{task.t}
                    </div>)}
                  </div>
                </div>
              </>
            )}
            {plan.status === "upcoming" && <p className="text-sm text-muted" style={{marginTop:8}}>This care plan will begin on {plan.startDate}. Goals: {plan.goals.join(", ")}</p>}
          </div>
        ))}
      </div>
    </div>
  );
}
