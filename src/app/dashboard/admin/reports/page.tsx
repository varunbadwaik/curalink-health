"use client";

const reports = [
  { name: "Monthly Organizational Performance", desc: "Aggregated KPIs for all facilities", format: "PDF, Excel", schedule: "Monthly (1st)" },
  { name: "HIPAA Compliance Audit", desc: "Detailed access logs and PHI exposure", format: "PDF", schedule: "Quarterly" },
  { name: "AI Diagnostic Accuracy", desc: "Success rate and confidence scoring for AI suggestions", format: "Excel, CSV", schedule: "Weekly" },
  { name: "Revenue Cycle Assessment", desc: "Claims, denials, and outstanding AR", format: "PDF", schedule: "Monthly (5th)" },
  { name: "Patient Satisfaction & Wait Times", desc: "Telehealth vs In-person visit metrics", format: "PDF", schedule: "Bi-Weekly" },
];

export default function AdminReportsPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div><h1 className="heading-lg">📊 Data & Reports</h1><p className="text-muted" style={{marginTop:4}}>Generate, schedule, and export platform analytics</p></div>
        <button className="btn btn-primary">+ Build Custom Report</button>
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <h3 className="heading-md" style={{ marginBottom: 16 }}>Quick Export</h3>
        <div style={{ display: "flex", gap: 16, alignItems: "flex-end" }}>
          <div style={{ flex: 1 }}>
            <label className="text-sm text-muted" style={{ display: "block", marginBottom: 8 }}>Data Category</label>
            <select className="input" style={{ width: "100%" }}><option>Select Category...</option><option>Financial</option><option>Clinical</option><option>Operational</option></select>
          </div>
          <div style={{ flex: 1 }}>
            <label className="text-sm text-muted" style={{ display: "block", marginBottom: 8 }}>Date Range</label>
            <select className="input" style={{ width: "100%" }}><option>Last 30 Days</option><option>Last Quarter</option><option>YTD</option></select>
          </div>
          <div style={{ flex: 1 }}>
            <label className="text-sm text-muted" style={{ display: "block", marginBottom: 8 }}>Format</label>
            <select className="input" style={{ width: "100%" }}><option>.CSV</option><option>.XLSX</option><option>.PDF</option></select>
          </div>
          <button className="btn btn-primary" style={{ height: 42 }}>Export Now</button>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)", background: "var(--bg-secondary)" }}>
          <h3 className="heading-sm">Scheduled Reports</h3>
        </div>
        {reports.map((r, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ fontSize: "1.2rem" }}>📄</span>
                <strong>{r.name}</strong>
                <span className="badge badge-primary">{r.schedule}</span>
              </div>
              <p className="text-sm text-muted">{r.desc}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <span className="text-xs text-muted">Formats: {r.format}</span>
              <button className="btn btn-ghost btn-sm">Edit</button>
              <button className="btn btn-ghost btn-sm">Run Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
