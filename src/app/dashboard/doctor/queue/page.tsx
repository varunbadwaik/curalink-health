"use client";
import { UsersThree, Warning, Brain, Hourglass } from "@phosphor-icons/react";

const queue = [
  { id: "P-1061", name: "Robert Chang", age: 72, condition: "CHF, COPD", risk: 91, status: "critical", waitTime: "URGENT", aiFlag: "SpO2 dropped to 89%", vitals: "HR 102 | BP 95/58 | SpO2 89%", avatar: "RC" },
  { id: "P-1042", name: "Maria Rodriguez", age: 67, condition: "Hypertension, T2 Diabetes", risk: 78, status: "waiting", waitTime: "12 min", aiFlag: "High BP trending", vitals: "HR 88 | BP 152/96 | SpO2 97%", avatar: "MR" },
  { id: "P-1038", name: "James Wilson", age: 45, condition: "Post-surgical follow-up", risk: 32, status: "in-progress", waitTime: "—", aiFlag: null, vitals: "HR 72 | BP 120/78 | SpO2 99%", avatar: "JW" },
  { id: "P-1055", name: "Aisha Khan", age: 29, condition: "Prenatal care — 28 weeks", risk: 15, status: "waiting", waitTime: "24 min", aiFlag: null, vitals: "HR 80 | BP 115/72 | SpO2 98%", avatar: "AK" },
  { id: "P-1044", name: "Elena Vasquez", age: 53, condition: "Rheumatoid arthritis", risk: 45, status: "waiting", waitTime: "35 min", aiFlag: "Lab results pending", vitals: "HR 76 | BP 130/84 | SpO2 98%", avatar: "EV" },
  { id: "P-1070", name: "David Thompson", age: 61, condition: "Atrial fibrillation", risk: 65, status: "waiting", waitTime: "42 min", aiFlag: "Irregular rhythm detected", vitals: "HR 110 (irreg) | BP 138/88 | SpO2 96%", avatar: "DT" },
  { id: "P-1072", name: "Sarah Bennett", age: 38, condition: "Migraine evaluation", risk: 20, status: "scheduled", waitTime: "1 hr", aiFlag: null, vitals: "HR 68 | BP 118/74 | SpO2 99%", avatar: "SB" },
];

function riskColor(r: number) { return r >= 80 ? "var(--critical)" : r >= 50 ? "var(--warning)" : "var(--accent)"; }

export default function QueuePage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 className="heading-lg" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <UsersThree size={28} weight="duotone" /> Patient Queue
          </h1>
          <p className="text-muted" style={{marginTop:4}}>Real-time patient queue with AI-driven risk prioritization</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}><span className="badge badge-critical">1 Critical</span><span className="badge badge-warning">4 Waiting</span><span className="badge badge-primary">1 In-Progress</span></div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {queue.map(p => (
          <div key={p.id} className="card" style={{ padding: 20, borderLeft: `4px solid ${riskColor(p.risk)}`, background: p.status === "critical" ? "var(--critical-glow)" : undefined }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: "var(--radius-md)", background: `${riskColor(p.risk)}15`, color: riskColor(p.risk), display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: "0.875rem" }}>{p.avatar}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                  <strong>{p.name}</strong><span className="text-xs text-muted">{p.id} · Age {p.age}</span>
                  {p.status === "critical" && (
                    <span className="badge badge-critical" style={{animation:"pulse 2s infinite", display: "inline-flex", alignItems: "center", gap: "4px"}}>
                      <Warning size={12} weight="bold" /> CRITICAL
                    </span>
                  )}
                </div>
                <span className="text-sm text-muted">{p.condition}</span>
                {p.aiFlag && (
                  <div style={{ fontSize: "0.75rem", color: "var(--warning)", marginTop: 2, display: "inline-flex", alignItems: "center", gap: "4px" }}>
                    <Brain size={14} weight="duotone" /> AI: {p.aiFlag}
                  </div>
                )}
              </div>
              <div style={{ textAlign: "right", minWidth: 200 }}>
                <div className="text-mono text-xs text-muted" style={{ marginBottom: 4 }}>{p.vitals}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, justifyContent: "flex-end" }}>
                  <div style={{ textAlign: "center" }}>
                    <svg width="48" height="48" viewBox="0 0 48 48"><circle cx="24" cy="24" r="20" fill="none" stroke="var(--bg-tertiary)" strokeWidth="3"/><circle cx="24" cy="24" r="20" fill="none" stroke={riskColor(p.risk)} strokeWidth="3" strokeDasharray={`${p.risk * 1.26} ${126 - p.risk * 1.26}`} strokeDashoffset="31.5" strokeLinecap="round" style={{transform:"rotate(-90deg)",transformOrigin:"center"}}/><text x="24" y="28" textAnchor="middle" fill={riskColor(p.risk)} fontSize="12" fontWeight="700" fontFamily="var(--font-mono)">{p.risk}</text></svg>
                    <div className="text-xs text-muted">Risk</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <span className={`badge ${p.status === "critical" ? "badge-critical" : p.status === "in-progress" ? "badge-primary" : "badge-warning"}`} style={{ display: "inline-flex", alignItems: "center", gap: "4px" }}>
                      {p.status === "waiting" ? (
                        <>
                          <Hourglass size={12} /> {p.waitTime}
                        </>
                      ) : p.status}
                    </span>
                    <button className="btn btn-primary btn-sm" style={{fontSize:"0.6875rem"}}>Open Chart →</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
