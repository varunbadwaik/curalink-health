"use client";

const facilities = [
  { id: "FAC-MAIN", name: "UHX Main Campus", type: "Hospital", status: "Operational", capacity: "85%", beds: "340/400", staff: 120, location: "Downtown" },
  { id: "FAC-NORTH", name: "Northside Clinic", type: "Urgent Care", status: "High Volume", capacity: "98%", beds: "24/25", staff: 35, location: "North District" },
  { id: "FAC-WEST", name: "West Valley Specialty", type: "Specialty Clinic", status: "Operational", capacity: "60%", beds: "N/A", staff: 45, location: "West Valley" },
  { id: "FAC-TEL", name: "Telehealth Hub", type: "Virtual", status: "Warning", capacity: "92%", beds: "N/A", staff: 25, location: "Remote" },
];

export default function AdminFacilitiesPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div><h1 className="heading-lg">🏥 Facilities & Departments</h1><p className="text-muted" style={{marginTop:4}}>Monitor facility capacity and operational status</p></div>
        <button className="btn btn-primary">+ Add Facility</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {facilities.map(f => (
          <div key={f.id} className="card" style={{ padding: 24, borderTop: `4px solid ${f.status === "Operational" ? "var(--accent)" : f.status === "High Volume" ? "var(--warning)" : "var(--critical)"}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <h3 className="heading-md" style={{ marginBottom: 4 }}>{f.name}</h3>
                <span className="text-sm text-muted">{f.type} · {f.location}</span>
              </div>
              <span className={`badge ${f.status === "Operational" ? "badge-accent" : f.status === "High Volume" ? "badge-warning" : "badge-critical"}`}>{f.status}</span>
            </div>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginTop: 16 }}>
              <div>
                <span className="text-xs text-muted">Capacity</span>
                <div style={{ fontSize: "1.25rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>{f.capacity}</div>
                <div className="progress-bar" style={{ marginTop: 4, height: 4 }}>
                  <div className="progress-bar-fill" style={{ width: f.capacity, background: parseInt(f.capacity) > 90 ? "var(--warning)" : "var(--primary)" }} />
                </div>
              </div>
              <div>
                <span className="text-xs text-muted">Beds Occupied</span>
                <div style={{ fontSize: "1.25rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>{f.beds}</div>
              </div>
              <div>
                <span className="text-xs text-muted">Active Staff</span>
                <div style={{ fontSize: "1.25rem", fontWeight: 700, fontFamily: "var(--font-mono)" }}>{f.staff}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
