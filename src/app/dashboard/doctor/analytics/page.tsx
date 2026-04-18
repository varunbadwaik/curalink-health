"use client";

const data = [
  { label: "Patients Seen", value: "342", trend: "+12%", trendDir: "up" },
  { label: "Avg Consult Time", value: "18m", trend: "-2m", trendDir: "down" },
  { label: "Care Plan Adherence", value: "84%", trend: "+5%", trendDir: "up" },
  { label: "Hospital Readmissions", value: "2.1%", trend: "-0.4%", trendDir: "down" },
];

export default function DoctorAnalyticsPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div><h1 className="heading-lg">📈 Provider Analytics</h1><p className="text-muted" style={{marginTop:4}}>Performance and patient outcome metrics (Last 30 Days)</p></div>
        <select className="input" style={{ width: 150 }}><option>Last 30 Days</option><option>This Quarter</option><option>Year to Date</option></select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 24 }}>
        {data.map((m, i) => (
          <div key={i} className="card" style={{ padding: 20 }}>
            <span className="text-sm text-muted">{m.label}</span>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 8, marginTop: 8 }}>
              <span style={{ fontSize: "2rem", fontWeight: 800, fontFamily: "var(--font-mono)", lineHeight: 1 }}>{m.value}</span>
              <span className="text-sm" style={{ color: m.trendDir === "up" ? "var(--primary)" : "var(--accent)" }}>{m.trendDir==="up"?"↑":"↓"} {m.trend}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 16 }}>
        <div className="card" style={{ padding: 24, height: 400, display: "flex", flexDirection: "column" }}>
          <h3 className="heading-sm" style={{ marginBottom: 16 }}>Patient Volume vs. Wait Time</h3>
          <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "2%", paddingBottom: 24, position: "relative" }}>
            {/* Mock Chart */}
            {[40, 60, 45, 80, 50, 75, 90, 65, 85, 55].map((h, i) => (
              <div key={i} style={{ flex: 1, height: `${h}%`, background: "var(--primary-glow)", borderTop: "2px solid var(--primary)", borderTopLeftRadius: 4, borderTopRightRadius: 4, position: "relative" }}>
                <div style={{ position: "absolute", bottom: -24, left: "50%", transform: "translateX(-50%)", fontSize: "0.625rem", color: "var(--text-muted)" }}>{i*3+1}</div>
              </div>
            ))}
            <div style={{ position: "absolute", top: "50%", left: 0, width: "100%", borderTop: "1px dashed var(--accent)", opacity: 0.5 }}></div>
          </div>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 className="heading-sm" style={{ marginBottom: 16 }}>Patient Demographics</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span className="text-sm">Age &gt; 65</span><span className="text-sm text-mono">45%</span></div>
              <div className="progress-bar"><div className="progress-bar-fill" style={{ width: "45%", background: "var(--primary)" }} /></div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span className="text-sm">Age 40-64</span><span className="text-sm text-mono">35%</span></div>
              <div className="progress-bar"><div className="progress-bar-fill" style={{ width: "35%", background: "var(--accent)" }} /></div>
            </div>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}><span className="text-sm">Age &lt; 40</span><span className="text-sm text-mono">20%</span></div>
              <div className="progress-bar"><div className="progress-bar-fill" style={{ width: "20%", background: "var(--warning)" }} /></div>
            </div>
          </div>
          
          <h3 className="heading-sm" style={{ marginBottom: 16, marginTop: 32 }}>Common Conditions</h3>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            <span className="badge badge-primary">Hypertension (120)</span>
            <span className="badge badge-primary">T2 Diabetes (85)</span>
            <span className="badge badge-primary">Hyperlipidemia (64)</span>
            <span className="badge badge-primary">Obesity (52)</span>
            <span className="badge badge-primary">CAD (38)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
