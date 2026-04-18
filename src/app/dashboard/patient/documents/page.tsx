"use client";
const documents = [
  { name: "Annual Physical Report 2026", type: "PDF", size: "2.4 MB", date: "Apr 10, 2026", category: "Reports", provider: "Dr. Mike Torres" },
  { name: "Echocardiogram Results", type: "PDF", size: "1.8 MB", date: "Mar 22, 2026", category: "Imaging", provider: "Dr. Sarah Chen" },
  { name: "Blood Work Panel — Comprehensive", type: "PDF", size: "890 KB", date: "Apr 10, 2026", category: "Lab Reports", provider: "Central Lab" },
  { name: "Insurance Pre-Authorization", type: "PDF", size: "340 KB", date: "Feb 15, 2026", category: "Insurance", provider: "Admin" },
  { name: "Care Plan — Cardiovascular", type: "PDF", size: "1.2 MB", date: "Mar 1, 2026", category: "Care Plans", provider: "Dr. Sarah Chen" },
  { name: "Prescription History — YTD", type: "PDF", size: "450 KB", date: "Apr 1, 2026", category: "Prescriptions", provider: "Pharmacy" },
  { name: "Vaccination Record", type: "PDF", size: "220 KB", date: "Jan 10, 2026", category: "Records", provider: "Dr. Mike Torres" },
  { name: "Referral — Dermatology", type: "PDF", size: "180 KB", date: "Mar 15, 2026", category: "Referrals", provider: "Dr. Mike Torres" },
];
const icons: Record<string, string> = { Reports: "📊", Imaging: "🩻", "Lab Reports": "🔬", Insurance: "🏦", "Care Plans": "📋", Prescriptions: "💊", Records: "📁", Referrals: "🔗" };

export default function DocumentsPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div><h1 className="heading-lg">📁 Documents</h1><p className="text-muted" style={{marginTop:4}}>Your medical records and documents</p></div>
        <button className="btn btn-primary btn-sm">📤 Upload Document</button>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 0.5fr 0.5fr", padding: "12px 20px", fontSize: "0.6875rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em", borderBottom: "1px solid var(--border-subtle)" }}>
          <span>Document</span><span>Category</span><span>Provider</span><span>Size</span><span>Actions</span>
        </div>
        {documents.map((doc, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 0.5fr 0.5fr", padding: "14px 20px", alignItems: "center", borderBottom: "1px solid var(--border-subtle)", transition: "background 0.15s", cursor: "pointer" }} onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-card-hover)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: "1.25rem" }}>{icons[doc.category] || "📄"}</span>
              <div><strong style={{ fontSize: "0.8125rem" }}>{doc.name}</strong><br/><span className="text-xs text-muted">{doc.date}</span></div>
            </div>
            <span className="badge badge-primary">{doc.category}</span>
            <span className="text-sm text-muted">{doc.provider}</span>
            <span className="text-xs text-mono text-muted">{doc.size}</span>
            <div style={{ display: "flex", gap: 4 }}>
              <button className="btn btn-ghost btn-sm" title="Download">⬇️</button>
              <button className="btn btn-ghost btn-sm" title="Share">🔗</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
