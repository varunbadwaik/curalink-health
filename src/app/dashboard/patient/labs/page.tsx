"use client";
import { Flask } from "@phosphor-icons/react";

const labs = [
  { test: "HbA1c", value: "6.8%", ref: "< 7.0%", status: "normal", date: "Apr 10, 2026", trend: [7.5, 7.2, 7.0, 6.8], provider: "Dr. Mike Torres" },
  { test: "Total Cholesterol", value: "195 mg/dL", ref: "< 200 mg/dL", status: "normal", date: "Apr 10, 2026", trend: [220, 210, 202, 195], provider: "Dr. Sarah Chen" },
  { test: "LDL Cholesterol", value: "115 mg/dL", ref: "< 130 mg/dL", status: "normal", date: "Apr 10, 2026", trend: [140, 130, 122, 115], provider: "Dr. Sarah Chen" },
  { test: "HDL Cholesterol", value: "52 mg/dL", ref: "> 40 mg/dL", status: "normal", date: "Apr 10, 2026", trend: [45, 48, 50, 52], provider: "Dr. Sarah Chen" },
  { test: "Fasting Glucose", value: "98 mg/dL", ref: "70-100 mg/dL", status: "normal", date: "Apr 10, 2026", trend: [118, 108, 102, 98], provider: "Dr. Mike Torres" },
  { test: "eGFR", value: "78 mL/min", ref: "> 60 mL/min", status: "normal", date: "Apr 10, 2026", trend: [75, 76, 77, 78], provider: "Dr. Mike Torres" },
  { test: "TSH", value: "3.2 mIU/L", ref: "0.4-4.0 mIU/L", status: "normal", date: "Apr 10, 2026", trend: [2.8, 3.0, 3.1, 3.2], provider: "Dr. Mike Torres" },
  { test: "Vitamin D", value: "28 ng/mL", ref: "30-100 ng/mL", status: "low", date: "Apr 10, 2026", trend: [22, 24, 26, 28], provider: "Dr. Mike Torres" },
];

export default function LabsPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 className="heading-lg" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <Flask size={28} weight="duotone" /> Lab Results
          </h1>
          <p className="text-muted" style={{marginTop:4}}>View and track your laboratory test results</p>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
        {labs.map((lab, i) => (
          <div key={i} className="card" style={{ padding: 20 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div><h3 className="heading-sm">{lab.test}</h3><span className="text-xs text-muted">{lab.date} · {lab.provider}</span></div>
              <span className={`badge ${lab.status === "normal" ? "badge-accent" : lab.status === "low" ? "badge-warning" : "badge-critical"}`}>{lab.status}</span>
            </div>
            <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 4 }}>
              <span style={{ fontSize: "1.75rem", fontWeight: 800, fontFamily: "var(--font-mono)", color: lab.status === "normal" ? "var(--accent)" : "var(--warning)" }}>{lab.value}</span>
            </div>
            <div className="text-xs text-muted" style={{ marginBottom: 12 }}>Reference: {lab.ref}</div>
            {/* Mini trend chart */}
            <div style={{ display: "flex", alignItems: "end", gap: 4, height: 40 }}>
              {lab.trend.map((v, j) => {
                const max = Math.max(...lab.trend);
                const min = Math.min(...lab.trend);
                const range = max - min || 1;
                const h = ((v - min) / range) * 30 + 10;
                return <div key={j} style={{ flex: 1, height: h, background: j === lab.trend.length - 1 ? (lab.status === "normal" ? "var(--accent)" : "var(--warning)") : "var(--bg-tertiary)", borderRadius: 3, transition: "height 0.5s" }} title={String(v)} />;
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}><span className="text-xs text-muted">3 months ago</span><span className="text-xs text-muted">Latest</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
