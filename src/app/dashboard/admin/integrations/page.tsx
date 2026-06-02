"use client";
import { Plug } from "@phosphor-icons/react";

const integrations = [
  { name: "Epic Systems EHR", type: "Health Records", status: "Connected", health: "100%", latency: "42ms", lastSync: "1 min ago" },
  { name: "Cerner Database", type: "Health Records", status: "Connected", health: "98%", latency: "105ms", lastSync: "5 mins ago" },
  { name: "LabCorp API", type: "Diagnostic Labs", status: "Connected", health: "100%", latency: "65ms", lastSync: "2 mins ago" },
  { name: "Surescripts", type: "E-Prescribing", status: "Degraded", health: "85%", latency: "340ms", lastSync: "15 mins ago" },
  { name: "Stripe Healthcare", type: "Payment Processing", status: "Connected", health: "100%", latency: "25ms", lastSync: "Just now" },
  { name: "Twilio SMS", type: "Communications", status: "Disconnected", health: "0%", latency: "Timeout", lastSync: "2 hours ago" },
];

export default function AdminIntegrationsPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 className="heading-lg" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <Plug size={28} weight="duotone" /> System Integrations
          </h1>
          <p className="text-muted" style={{marginTop:4}}>Manage external APIs and EHR connections</p>
        </div>
        <button className="btn btn-primary">+ Add Integration</button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {integrations.map((i, idx) => (
          <div key={idx} className="card" style={{ padding: 24, borderTop: `4px solid ${i.status === "Connected" ? "var(--accent)" : i.status === "Degraded" ? "var(--warning)" : "var(--critical)"}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
              <div>
                <h3 className="heading-md">{i.name}</h3>
                <span className="text-sm text-muted">{i.type}</span>
              </div>
              <span className={`badge ${i.status === "Connected" ? "badge-accent" : i.status === "Degraded" ? "badge-warning" : "badge-critical"}`}>{i.status}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "var(--text-muted)", marginBottom: 12 }}>
              <div style={{ display: "flex", flexDirection: "column" }}><span>API Health</span><strong style={{ color: "var(--text-primary)" }}>{i.health}</strong></div>
              <div style={{ display: "flex", flexDirection: "column" }}><span>Latency</span><strong style={{ color: "var(--text-primary)" }}>{i.latency}</strong></div>
              <div style={{ display: "flex", flexDirection: "column" }}><span>Last Sync</span><strong style={{ color: "var(--text-primary)" }}>{i.lastSync}</strong></div>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1 }}>Settings</button>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1, color: i.status === "Disconnected" ? "var(--accent)" : "var(--primary)" }}>{i.status === "Disconnected" ? "Reconnect" : "Sync Now"}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
