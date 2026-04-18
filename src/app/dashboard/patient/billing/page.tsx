"use client";
const invoices = [
  { id: "INV-2026-042", description: "Cardiology Consultation — Dr. Sarah Chen", date: "Apr 15, 2026", total: 250.00, insurance: 200.00, copay: 50.00, status: "paid" },
  { id: "INV-2026-038", description: "Lab Work — Comprehensive Blood Panel", date: "Apr 10, 2026", total: 450.00, insurance: 405.00, copay: 45.00, status: "paid" },
  { id: "INV-2026-033", description: "Telehealth Visit — Dr. Mike Torres", date: "Mar 20, 2026", total: 150.00, insurance: 120.00, copay: 30.00, status: "paid" },
  { id: "INV-2026-055", description: "Upcoming: Annual Physical", date: "Apr 25, 2026", total: 350.00, insurance: 315.00, copay: 35.00, status: "pending" },
  { id: "INV-2026-062", description: "Prescription Refill — Lisinopril", date: "Apr 18, 2026", total: 45.00, insurance: 35.00, copay: 10.00, status: "pending" },
];

export default function BillingPage() {
  const totalDue = invoices.filter(i=>i.status==="pending").reduce((s,i)=>s+i.copay,0);
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div><h1 className="heading-lg">💳 Billing & Insurance</h1><p className="text-muted" style={{marginTop:4}}>Manage your medical bills and insurance claims</p></div>
        <button className="btn btn-primary btn-sm">💳 Make Payment</button>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3, 1fr)",gap:16,marginBottom:24}}>
        <div className="card" style={{padding:20,textAlign:"center"}}>
          <span className="text-sm text-muted">Amount Due</span>
          <div style={{fontSize:"2rem",fontWeight:800,fontFamily:"var(--font-mono)",color:"var(--warning)",marginTop:4}}>${totalDue.toFixed(2)}</div>
        </div>
        <div className="card" style={{padding:20,textAlign:"center"}}>
          <span className="text-sm text-muted">YTD Insurance Savings</span>
          <div style={{fontSize:"2rem",fontWeight:800,fontFamily:"var(--font-mono)",color:"var(--accent)",marginTop:4}}>$1,075.00</div>
        </div>
        <div className="card" style={{padding:20,textAlign:"center"}}>
          <span className="text-sm text-muted">Deductible Remaining</span>
          <div style={{fontSize:"2rem",fontWeight:800,fontFamily:"var(--font-mono)",color:"var(--primary)",marginTop:4}}>$425.00</div>
          <div className="progress-bar" style={{marginTop:8}}><div className="progress-bar-fill" style={{width:"78%",background:"var(--primary)"}}/></div>
        </div>
      </div>
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"1fr 2fr 0.8fr 0.8fr 0.8fr 0.6fr",padding:"12px 20px",fontSize:"0.6875rem",color:"var(--text-muted)",textTransform:"uppercase",fontWeight:600,letterSpacing:"0.05em",borderBottom:"1px solid var(--border-subtle)"}}>
          <span>Invoice</span><span>Description</span><span>Total</span><span>Insurance</span><span>Your Cost</span><span>Status</span>
        </div>
        {invoices.map(inv => (
          <div key={inv.id} style={{display:"grid",gridTemplateColumns:"1fr 2fr 0.8fr 0.8fr 0.8fr 0.6fr",padding:"14px 20px",alignItems:"center",borderBottom:"1px solid var(--border-subtle)"}}>
            <span className="text-mono text-sm" style={{color:"var(--primary)"}}>{inv.id}</span>
            <div><strong className="text-sm">{inv.description}</strong><br/><span className="text-xs text-muted">{inv.date}</span></div>
            <span className="text-mono text-sm">${inv.total.toFixed(2)}</span>
            <span className="text-mono text-sm text-muted">-${inv.insurance.toFixed(2)}</span>
            <span className="text-mono text-sm" style={{fontWeight:700}}>${inv.copay.toFixed(2)}</span>
            <span className={`badge ${inv.status === "paid" ? "badge-accent" : "badge-warning"}`}>{inv.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
