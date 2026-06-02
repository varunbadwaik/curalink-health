"use client";
import React, { useState } from "react";
import { Pill, PencilSimple, ArrowsClockwise, X } from "@phosphor-icons/react";
import { useQuery } from "@tanstack/react-query";
import { mockApi } from "@/services/api";
import PrescriptionForm from "@/components/forms/PrescriptionForm";

const statusBadge: Record<string, string> = { "active": "badge-accent", "pending-approval": "badge-warning", "refill-needed": "badge-critical", "expired": "badge-purple" };

export default function PrescriptionsPage() {
  const [showAddModal, setShowAddModal] = useState(false);

  const { data: prescriptions = [], isLoading } = useQuery({
    queryKey: ["prescriptions"],
    queryFn: mockApi.getPrescriptions,
  });

  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div>
          <h1 className="heading-lg" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <Pill size={28} weight="duotone" /> Prescriptions
          </h1>
          <p className="text-muted" style={{marginTop:4}}>Manage and e-prescribe medications</p>
        </div>
        <button onClick={() => setShowAddModal(true)} className="btn btn-primary">+ New Prescription</button>
      </div>
      <div className="card" style={{padding:0,overflow:"hidden"}}>
        <div style={{display:"grid",gridTemplateColumns:"1.2fr 1.5fr 1.5fr 0.8fr 0.8fr 0.6fr 0.8fr",padding:"12px 20px",fontSize:"0.6875rem",color:"var(--text-muted)",textTransform:"uppercase",fontWeight:600,letterSpacing:"0.05em",borderBottom:"1px solid var(--border-subtle)"}}>
          <span>Rx ID</span><span>Patient</span><span>Medication</span><span>Frequency</span><span>Refills</span><span>Status</span><span>Actions</span>
        </div>
        {isLoading ? (
          <p style={{ padding: 24, textAlign: "center" }} className="text-sm text-muted">Loading prescriptions...</p>
        ) : prescriptions.length === 0 ? (
          <p style={{ padding: 24, textAlign: "center" }} className="text-sm text-muted">No prescriptions found.</p>
        ) : (
          prescriptions.map((rx: any) => (
            <div key={rx.id} style={{display:"grid",gridTemplateColumns:"1.2fr 1.5fr 1.5fr 0.8fr 0.8fr 0.6fr 0.8fr",padding:"14px 20px",alignItems:"center",borderBottom:"1px solid var(--border-subtle)"}}>
              <span className="text-mono text-xs" style={{color:"var(--primary)"}}>{rx.id}</span>
              <div><strong className="text-sm">{rx.patientName}</strong><br/><span className="text-xs text-muted">{rx.date}</span></div>
              <div><strong className="text-sm">{rx.medication}</strong><br/><span className="text-xs text-muted">{rx.dosage}</span></div>
              <span className="text-sm">{rx.frequency}</span>
              <span className="text-mono text-sm">{rx.refills}</span>
              <span className={`badge ${statusBadge[rx.status.toLowerCase()] || "badge-primary"}`}>{rx.status}</span>
              <div style={{display:"flex",gap:4}}>
                <button className="btn btn-ghost btn-sm" title="Edit" style={{ display: "inline-flex", alignItems: "center" }}>
                  <PencilSimple size={16} />
                </button>
                <button className="btn btn-ghost btn-sm" title="Renew" style={{ display: "inline-flex", alignItems: "center" }}>
                  <ArrowsClockwise size={16} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Prescription Modal */}
      {showAddModal && (
        <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: 16 }} onClick={() => setShowAddModal(false)}>
          <div style={{ background: "var(--bg-card)", borderRadius: 12, border: "1px solid var(--border-subtle)", padding: 24, width: "100%", maxWidth: 450, position: "relative", boxShadow: "var(--shadow-lg)" }} onClick={e => e.stopPropagation()}>
            <button style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)", display: "flex", alignItems: "center" }} onClick={() => setShowAddModal(false)}>
              <X size={20} />
            </button>
            <div style={{ marginBottom: 20 }}>
              <h2 className="heading-md" style={{ marginBottom: 4 }}>Issue New Prescription</h2>
              <p className="text-sm text-muted">Generate a prescription for your patient</p>
            </div>
            <PrescriptionForm onSuccess={() => setShowAddModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
