"use client";
const prescriptions = [
  { id: "RX-20260415-01", patient: "Maria Rodriguez", medication: "Lisinopril 20mg", dosage: "Once daily", duration: "90 days", status: "active", date: "Apr 15, 2026", refills: 3, pharmacy: "CVS - Main St" },
  { id: "RX-20260415-02", patient: "Maria Rodriguez", medication: "Metformin 1000mg", dosage: "Twice daily", duration: "90 days", status: "active", date: "Apr 15, 2026", refills: 3, pharmacy: "CVS - Main St" },
  { id: "RX-20260412-01", patient: "John Smith", medication: "Atorvastatin 20mg", dosage: "Once daily (PM)", duration: "90 days", status: "active", date: "Apr 12, 2026", refills: 2, pharmacy: "Walgreens - 5th Ave" },
  { id: "RX-20260410-01", patient: "James Wilson", medication: "Tramadol 50mg", dosage: "As needed (max 4/day)", duration: "14 days", status: "active", date: "Apr 10, 2026", refills: 0, pharmacy: "Hospital Pharmacy" },
  { id: "RX-20260408-01", patient: "Elena Vasquez", medication: "Methotrexate 15mg", dosage: "Once weekly", duration: "90 days", status: "pending-approval", date: "Apr 8, 2026", refills: 3, pharmacy: "Specialty Pharmacy" },
  { id: "RX-20260401-01", patient: "Robert Chang", medication: "Furosemide 40mg", dosage: "Twice daily", duration: "30 days", status: "refill-needed", date: "Apr 1, 2026", refills: 0, pharmacy: "CVS - Oak Ln" },
];

const statusBadge: Record<string, string> = { "active": "badge-accent", "pending-approval": "badge-warning", "refill-needed": "badge-critical", "expired": "badge-purple" };

export default function PrescriptionsPage() {
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div><h1 className="heading-lg">💊 Prescriptions</h1><p className="text-muted" style={{marginTop:4}}>Manage and e-prescribe medications</p></div>
        <button className="btn btn-primary">+ New Prescription</button>
      </div>
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"1.2fr 1.5fr 1.5fr 0.8fr 0.8fr 0.6fr 0.8fr",padding:"12px 20px",fontSize:"0.6875rem",color:"var(--text-muted)",textTransform:"uppercase",fontWeight:600,letterSpacing:"0.05em",borderBottom:"1px solid var(--border-subtle)"}}>
          <span>Rx ID</span><span>Patient</span><span>Medication</span><span>Duration</span><span>Refills</span><span>Status</span><span>Actions</span>
        </div>
        {prescriptions.map(rx => (
          <div key={rx.id} style={{display:"grid",gridTemplateColumns:"1.2fr 1.5fr 1.5fr 0.8fr 0.8fr 0.6fr 0.8fr",padding:"14px 20px",alignItems:"center",borderBottom:"1px solid var(--border-subtle)"}}>
            <span className="text-mono text-xs" style={{color:"var(--primary)"}}>{rx.id}</span>
            <div><strong className="text-sm">{rx.patient}</strong><br/><span className="text-xs text-muted">{rx.date}</span></div>
            <div><strong className="text-sm">{rx.medication}</strong><br/><span className="text-xs text-muted">{rx.dosage}</span></div>
            <span className="text-sm">{rx.duration}</span>
            <span className="text-mono text-sm">{rx.refills}</span>
            <span className={`badge ${statusBadge[rx.status] || "badge-primary"}`}>{rx.status.replace("-"," ")}</span>
            <div style={{display:"flex",gap:4}}>
              <button className="btn btn-ghost btn-sm" title="Edit">✏️</button>
              <button className="btn btn-ghost btn-sm" title="Renew">🔄</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
