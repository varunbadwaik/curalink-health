"use client";
const orders = [
  { id: "LAB-0421", patient: "Maria Rodriguez", tests: ["CBC","BMP","HbA1c","Lipid Panel"], urgency: "routine", status: "completed", ordered: "Apr 10", result: "Apr 12" },
  { id: "LAB-0422", patient: "Robert Chang", tests: ["BNP","Troponin","CBC","CMP","ABG"], urgency: "stat", status: "pending", ordered: "Apr 17", result: "—" },
  { id: "LAB-0423", patient: "Elena Vasquez", tests: ["ESR","CRP","RF","Anti-CCP"], urgency: "routine", status: "in-progress", ordered: "Apr 15", result: "—" },
  { id: "LAB-0424", patient: "John Smith", tests: ["CBC","Lipid Panel","TSH","Vitamin D"], urgency: "routine", status: "completed", ordered: "Apr 10", result: "Apr 12" },
  { id: "LAB-0425", patient: "David Thompson", tests: ["INR","PT","CBC","CMP"], urgency: "urgent", status: "pending", ordered: "Apr 17", result: "—" },
  { id: "LAB-0426", patient: "Aisha Khan", tests: ["CBC","Glucose Screen","Group & Rh","Antibody Screen"], urgency: "routine", status: "completed", ordered: "Apr 8", result: "Apr 10" },
];

const urgColors: Record<string,string> = { stat: "badge-critical", urgent: "badge-warning", routine: "badge-primary" };
const statColors: Record<string,string> = { completed: "badge-accent", pending: "badge-warning", "in-progress": "badge-primary" };

export default function DoctorLabsPage() {
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div><h1 className="heading-lg">🔬 Lab Orders</h1><p className="text-muted" style={{marginTop:4}}>Order, track, and review laboratory tests</p></div>
        <button className="btn btn-primary">+ New Lab Order</button>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:12}}>
        {orders.map(o => (
          <div key={o.id} className="card" style={{padding:20,borderLeft:`4px solid ${o.urgency==="stat"?"var(--critical)":o.urgency==="urgent"?"var(--warning)":"var(--border-subtle)"}`}}>
            <div style={{display:"flex",alignItems:"center",gap:16}}>
              <div style={{flex:1}}>
                <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:4}}>
                  <span className="text-mono text-sm" style={{color:"var(--primary)"}}>{o.id}</span>
                  <strong>{o.patient}</strong>
                  <span className={`badge ${urgColors[o.urgency]}`}>{o.urgency}</span>
                </div>
                <div style={{display:"flex",gap:6,flexWrap:"wrap"}}>{o.tests.map((t,i)=><span key={i} className="badge badge-primary" style={{fontSize:"0.625rem"}}>{t}</span>)}</div>
              </div>
              <div style={{textAlign:"right",minWidth:140}}>
                <div className="text-xs text-muted">Ordered: {o.ordered}</div>
                <div className="text-xs text-muted">Result: {o.result}</div>
                <span className={`badge ${statColors[o.status]}`} style={{marginTop:4}}>{o.status}</span>
              </div>
              <button className="btn btn-ghost btn-sm">{o.status === "completed" ? "View Results" : "Track"}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
