"use client";
import { ClipboardText, Crosshair } from "@phosphor-icons/react";

const plans = [
  { id: 1, patient: "Maria Rodriguez", condition: "Hypertension, T2 Diabetes", status: "active", progress: 68, lastUpdated: "Apr 15, 2026", tasks: 12, completedTasks: 8, nextMilestone: "BP < 130/80 for 2 weeks" },
  { id: 2, patient: "Robert Chang", condition: "CHF, COPD", status: "critical", progress: 35, lastUpdated: "Apr 17, 2026", tasks: 15, completedTasks: 5, nextMilestone: "SpO2 stable > 93%" },
  { id: 3, patient: "James Wilson", condition: "Post-surgical recovery", status: "active", progress: 82, lastUpdated: "Apr 16, 2026", tasks: 8, completedTasks: 7, nextMilestone: "Discharge criteria met" },
  { id: 4, patient: "Elena Vasquez", condition: "Rheumatoid arthritis", status: "active", progress: 55, lastUpdated: "Apr 12, 2026", tasks: 10, completedTasks: 5, nextMilestone: "DAS28 score < 3.2" },
  { id: 5, patient: "John Smith", condition: "Cardiovascular prevention", status: "active", progress: 72, lastUpdated: "Apr 10, 2026", tasks: 10, completedTasks: 7, nextMilestone: "LDL < 100 mg/dL" },
];

export default function DoctorCarePlansPage() {
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div>
          <h1 className="heading-lg" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <ClipboardText size={28} weight="duotone" /> Care Plans
          </h1>
          <p className="text-muted" style={{marginTop:4}}>Manage and monitor patient care plans</p>
        </div>
        <button className="btn btn-primary">+ Create Care Plan</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {plans.map(p => (
          <div key={p.id} className="card" style={{padding:20,borderLeft:`4px solid ${p.status==="critical"?"var(--critical)":"var(--accent)"}`}}>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:2}}>
                  <strong>{p.patient}</strong>
                  <span className={`badge ${p.status==="critical"?"badge-critical":"badge-accent"}`}>{p.status}</span>
                </div>
                <span className="text-sm text-muted">{p.condition} · Updated {p.lastUpdated}</span>
                <div style={{marginTop:4,fontSize:"0.75rem",color:"var(--primary)", display: "inline-flex", alignItems: "center", gap: "4px"}}>
                  <Crosshair size={14} weight="duotone" /> Next: {p.nextMilestone}
                </div>
              </div>
              <div style={{textAlign:"center",minWidth:80}}>
                <div style={{fontSize:"1.5rem",fontWeight:800,fontFamily:"var(--font-mono)",color:p.progress>=70?"var(--accent)":p.progress>=40?"var(--warning)":"var(--critical)"}}>{p.progress}%</div>
                <div className="progress-bar" style={{width:80,marginTop:4}}><div className="progress-bar-fill" style={{width:`${p.progress}%`,background:p.progress>=70?"var(--accent)":p.progress>=40?"var(--warning)":"var(--critical)"}}/></div>
                <div className="text-xs text-muted" style={{marginTop:2}}>{p.completedTasks}/{p.tasks} tasks</div>
              </div>
              <button className="btn btn-ghost btn-sm">Edit Plan →</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
