"use client";
import React from "react";
import { Brain, GearSix, WarningCircle, TrendUp, Lightbulb, Books, CheckCircle } from "@phosphor-icons/react";

const insights = [
  { id: 1, type: "anomaly", severity: "critical", title: "Cardiac Risk Cluster Detected", description: "3 patients in your panel (Chang, Rodriguez, Thompson) show correlated cardiac risk factors. AI recommends coordinated care review.", patients: ["Robert Chang", "Maria Rodriguez", "David Thompson"], confidence: 94, actionable: true },
  { id: 2, type: "trend", severity: "warning", title: "Medication Non-Adherence Pattern", description: "Metformin adherence drops 15% on weekends across 8 diabetes patients. Consider simplified dosing schedules.", patients: ["Maria Rodriguez", "John Smith", "+6 others"], confidence: 87, actionable: true },
  { id: 3, type: "recommendation", severity: "info", title: "Preventive Screening Opportunity", description: "12 patients aged 50+ are overdue for colonoscopy screening. Auto-generate referral batch?", patients: ["12 patients"], confidence: 92, actionable: true },
  { id: 4, type: "research", severity: "info", title: "New Clinical Trial Match", description: "Patient Robert Chang matches inclusion criteria for COMMANDER HF trial (Rivaroxaban in HFrEF). Review eligibility?", patients: ["Robert Chang"], confidence: 78, actionable: true },
  { id: 5, type: "outcome", severity: "success", title: "Treatment Outcome — Positive", description: "HbA1c reduction of 0.8% across your T2D cohort (n=15) over 90 days. Current protocol is outperforming benchmark by 22%.", patients: ["15 patients"], confidence: 95, actionable: false },
];

const sevColors: Record<string, string> = { critical: "var(--critical)", warning: "var(--warning)", info: "var(--primary)", success: "var(--accent)" };

const typeIcons: Record<string, React.ReactNode> = {
  anomaly: <WarningCircle size={20} weight="fill" style={{ color: "var(--critical)" }} />,
  trend: <TrendUp size={20} weight="duotone" style={{ color: "var(--warning)" }} />,
  recommendation: <Lightbulb size={20} weight="duotone" style={{ color: "var(--primary)" }} />,
  research: <Books size={20} weight="duotone" style={{ color: "var(--purple)" }} />,
  outcome: <CheckCircle size={20} weight="duotone" style={{ color: "var(--accent)" }} />
};

export default function AIInsightsPage() {
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div>
          <h1 className="heading-lg" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <Brain size={28} weight="duotone" /> AI Clinical Insights
          </h1>
          <p className="text-muted" style={{marginTop:4}}>AI-powered decision support analyzing your patient panel</p>
        </div>
        <button className="btn btn-ghost btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <GearSix size={16} /> Configure AI Agent
        </button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:16}}>
        {insights.map(ins => (
          <div key={ins.id} className="card" style={{padding:24,borderLeft:`4px solid ${sevColors[ins.severity]}`}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span style={{ display: "inline-flex", alignItems: "center" }}>{typeIcons[ins.type]}</span>
                <h3 className="heading-sm">{ins.title}</h3>
                <span className={`badge ${ins.severity === "critical" ? "badge-critical" : ins.severity === "warning" ? "badge-warning" : ins.severity === "success" ? "badge-accent" : "badge-primary"}`}>{ins.severity}</span>
              </div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <span className="text-xs text-muted">Confidence:</span>
                <span className="text-mono text-sm" style={{color:ins.confidence>=90?"var(--accent)":ins.confidence>=70?"var(--warning)":"var(--text-muted)",fontWeight:700}}>{ins.confidence}%</span>
              </div>
            </div>
            <p className="text-sm" style={{color:"var(--text-secondary)",lineHeight:1.6,marginBottom:12}}>{ins.description}</p>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
              <div style={{display:"flex",gap:6}}>{ins.patients.map((p,i) => <span key={i} className="badge badge-primary" style={{fontSize:"0.6875rem"}}>{p}</span>)}</div>
              {ins.actionable && <div style={{display:"flex",gap:8}}><button className="btn btn-primary btn-sm">Take Action</button><button className="btn btn-ghost btn-sm">Dismiss</button></div>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
