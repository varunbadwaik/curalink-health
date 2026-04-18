"use client";
const meds = [
  { name: "Lisinopril", dosage: "10mg", frequency: "Once daily (morning)", prescriber: "Dr. Sarah Chen", refillDate: "May 1, 2026", adherence: 95, purpose: "Blood pressure management", sideEffects: "Dizziness, dry cough", interactions: "Avoid potassium supplements", pillsRemaining: 18, status: "active" },
  { name: "Metformin", dosage: "500mg", frequency: "Twice daily (with meals)", prescriber: "Dr. Mike Torres", refillDate: "Apr 28, 2026", adherence: 88, purpose: "Blood sugar control (Type 2 Diabetes)", sideEffects: "Nausea, stomach upset", interactions: "Limit alcohol", pillsRemaining: 12, status: "active" },
  { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily (evening)", prescriber: "Dr. Sarah Chen", refillDate: "May 15, 2026", adherence: 92, purpose: "Cholesterol management", sideEffects: "Muscle aches", interactions: "Avoid grapefruit juice", pillsRemaining: 30, status: "active" },
  { name: "Aspirin", dosage: "81mg", frequency: "Once daily", prescriber: "Dr. Sarah Chen", refillDate: "Jun 1, 2026", adherence: 97, purpose: "Heart attack prevention", sideEffects: "Stomach irritation", interactions: "Avoid ibuprofen", pillsRemaining: 45, status: "active" },
  { name: "Amoxicillin", dosage: "500mg", frequency: "Three times daily", prescriber: "Dr. Mike Torres", refillDate: "—", adherence: 100, purpose: "Bacterial infection", sideEffects: "Diarrhea", interactions: "None significant", pillsRemaining: 0, status: "completed" },
];

export default function MedicationsPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div><h1 className="heading-lg">💊 Medications</h1><p className="text-muted" style={{marginTop:4}}>Current medications and prescription management</p></div>
        <button className="btn btn-primary btn-sm">Request Refill</button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {meds.map((med, i) => (
          <div key={i} className="card" style={{ padding: 20, opacity: med.status === "completed" ? 0.5 : 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <h3 className="heading-sm">{med.name}</h3>
                  <span className={`badge ${med.status === "active" ? "badge-accent" : "badge-purple"}`}>{med.status}</span>
                </div>
                <p className="text-sm text-muted">{med.dosage} · {med.frequency}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div className="text-sm" style={{ color: med.adherence >= 90 ? "var(--accent)" : "var(--warning)" }}>{med.adherence}% adherence</div>
                <div className="progress-bar" style={{ width: 80, marginTop: 4 }}><div className="progress-bar-fill" style={{ width: `${med.adherence}%`, background: med.adherence >= 90 ? "var(--accent)" : "var(--warning)" }} /></div>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, fontSize: "0.8125rem" }}>
              <div><span className="text-xs text-muted">Purpose</span><br/>{med.purpose}</div>
              <div><span className="text-xs text-muted">Prescribed by</span><br/>{med.prescriber}</div>
              <div><span className="text-xs text-muted">Refill by</span><br/>{med.refillDate} {med.pillsRemaining > 0 && <span className="badge badge-warning" style={{marginLeft:4}}>{med.pillsRemaining} pills left</span>}</div>
            </div>
            {med.interactions !== "None significant" && (
              <div style={{ marginTop: 12, padding: "8px 12px", background: "var(--warning-glow)", borderRadius: "var(--radius-md)", fontSize: "0.75rem", color: "var(--warning-light)" }}>⚠️ {med.interactions}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
