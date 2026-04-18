"use client";

const data = [
  { label: "Total Revenue (MTD)", value: "$4.2M", diff: "+8.4%", diffType: "up" },
  { label: "Operating Costs", value: "$2.9M", diff: "+2.1%", diffType: "down" },
  { label: "Claims Denial Rate", value: "4.2%", diff: "-1.5%", diffType: "up" },
  { label: "Avg Collection Time", value: "32 Days", diff: "-4 Days", diffType: "up" },
];

const claims = [
  { id: "CLM-8849", provider: "Aetna", amount: "$12,450", status: "Processed", date: "Apr 15" },
  { id: "CLM-8850", provider: "BlueCross", amount: "$4,200", status: "Pending", date: "Apr 16" },
  { id: "CLM-8851", provider: "Medicare", amount: "$18,900", status: "Denied", date: "Apr 14" },
  { id: "CLM-8852", provider: "Cigna", amount: "$3,100", status: "Processed", date: "Apr 17" },
];

export default function AdminFinancePage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div><h1 className="heading-lg">💳 Finance & Billing</h1><p className="text-muted" style={{marginTop:4}}>Revenue cycle management and claims processing</p></div>
        <select className="input" style={{ width: 150 }}><option>April 2026</option><option>March 2026</option></select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {data.map((m, i) => (
          <div key={i} className="card" style={{ padding: 20 }}>
            <span className="text-sm text-muted">{m.label}</span>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginTop: 8 }}>
              <span style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-mono)", lineHeight: 1 }}>{m.value}</span>
              <span className="text-sm" style={{ color: m.diffType === "up" ? "var(--primary)" : "var(--warning)" }}>{m.diff}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
            <h3 className="heading-md">Recent Claims</h3>
            <button className="btn btn-ghost btn-sm">View All</button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid var(--border-subtle)", fontSize: "0.75rem", color: "var(--text-muted)" }}>
                <th style={{ padding: 8 }}>Claim ID</th>
                <th style={{ padding: 8 }}>Provider</th>
                <th style={{ padding: 8 }}>Amount</th>
                <th style={{ padding: 8 }}>Date</th>
                <th style={{ padding: 8 }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {claims.map(c => (
                <tr key={c.id} style={{ borderBottom: "1px solid var(--border-subtle)", fontSize: "0.875rem" }}>
                  <td style={{ padding: "12px 8px", fontFamily: "var(--font-mono)", color: "var(--primary)" }}>{c.id}</td>
                  <td style={{ padding: "12px 8px" }}>{c.provider}</td>
                  <td style={{ padding: "12px 8px" }}>{c.amount}</td>
                  <td style={{ padding: "12px 8px", color: "var(--text-muted)" }}>{c.date}</td>
                  <td style={{ padding: "12px 8px" }}><span className={`badge ${c.status==="Processed"?"badge-accent":c.status==="Denied"?"badge-critical":"badge-warning"}`}>{c.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card" style={{ padding: 24, display: "flex", flexDirection: "column" }}>
          <h3 className="heading-md" style={{ marginBottom: 16 }}>Revenue by Dept</h3>
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: 4 }}><span>Cardiology</span><span>$1.2M</span></div>
              <div className="progress-bar"><div className="progress-bar-fill" style={{ width: "40%", background: "var(--primary)" }} /></div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: 4 }}><span>Orthopedics</span><span>$950K</span></div>
              <div className="progress-bar"><div className="progress-bar-fill" style={{ width: "30%", background: "var(--accent)" }} /></div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: 4 }}><span>General Practice</span><span>$650K</span></div>
              <div className="progress-bar"><div className="progress-bar-fill" style={{ width: "20%", background: "var(--purple)" }} /></div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: 4 }}><span>Pediatrics</span><span>$400K</span></div>
              <div className="progress-bar"><div className="progress-bar-fill" style={{ width: "10%", background: "var(--warning)" }} /></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
