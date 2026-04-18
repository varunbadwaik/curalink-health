"use client";

const workflows = [
  { id: "WF-01", name: "AI Intake Triage", trigger: "Patient Arrival", aiAgent: "Intake Agent v2", status: "Active", runs: "1,240/day", success: "99.2%" },
  { id: "WF-02", name: "Abnormal Lab Alerting", trigger: "Lab Result Received", aiAgent: "Clinical Supervisor", status: "Active", runs: "450/day", success: "100%" },
  { id: "WF-03", name: "Telehealth Follow-up", trigger: "Appointment Complete", aiAgent: "Care Coordinator", status: "Draft", runs: "-", success: "-" },
  { id: "WF-04", name: "Prior Authorization", trigger: "Prescription Written", aiAgent: "Admin Assistant", status: "Active", runs: "320/day", success: "84.5%" },
];

export default function AdminWorkflowsPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div><h1 className="heading-lg">⚙️ Automated Workflows</h1><p className="text-muted" style={{marginTop:4}}>Manage AI agents and system automations</p></div>
        <button className="btn btn-primary">+ Create Workflow</button>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "var(--bg-secondary)", fontSize: "0.6875rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "12px 20px" }}>Workflow Name</th>
              <th style={{ padding: "12px 20px" }}>Trigger Event</th>
              <th style={{ padding: "12px 20px" }}>AI Agent Assigned</th>
              <th style={{ padding: "12px 20px" }}>Avg Runs</th>
              <th style={{ padding: "12px 20px" }}>Success Rate</th>
              <th style={{ padding: "12px 20px" }}>Status</th>
              <th style={{ padding: "12px 20px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workflows.map(w => (
              <tr key={w.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <td style={{ padding: "14px 20px" }}><strong className="text-sm">{w.name}</strong></td>
                <td style={{ padding: "14px 20px" }}><span className="text-sm">{w.trigger}</span></td>
                <td style={{ padding: "14px 20px" }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: "0.8125rem", background: "var(--primary-glow)", color: "var(--primary-light)", padding: "4px 8px", borderRadius: 4 }}>
                    🧠 {w.aiAgent}
                  </span>
                </td>
                <td style={{ padding: "14px 20px" }}><span className="text-sm text-mono">{w.runs}</span></td>
                <td style={{ padding: "14px 20px" }}><span className="text-sm text-mono" style={{ color: w.success==="100%"?"var(--accent)":w.success==="-"?"var(--text-muted)":"var(--warning)" }}>{w.success}</span></td>
                <td style={{ padding: "14px 20px" }}><span className={`badge ${w.status==="Active"?"badge-accent":"badge-purple"}`}>{w.status}</span></td>
                <td style={{ padding: "14px 20px", display:"flex", gap:4 }}>
                  <button className="btn btn-ghost btn-sm">Edit</button>
                  <button className="btn btn-ghost btn-sm">Logs</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
