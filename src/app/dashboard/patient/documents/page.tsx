"use client";
import React from "react";
import {
  FolderOpen,
  UploadSimple,
  ChartBar,
  Bone,
  Flask,
  Bank,
  ClipboardText,
  Pill,
  LinkSimple,
  File,
  DownloadSimple
} from "@phosphor-icons/react";

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

const icons: Record<string, React.ReactNode> = {
  Reports: <ChartBar size={20} weight="duotone" />,
  Imaging: <Bone size={20} weight="duotone" />,
  "Lab Reports": <Flask size={20} weight="duotone" />,
  Insurance: <Bank size={20} weight="duotone" />,
  "Care Plans": <ClipboardText size={20} weight="duotone" />,
  Prescriptions: <Pill size={20} weight="duotone" />,
  Records: <FolderOpen size={20} weight="duotone" />,
  Referrals: <LinkSimple size={20} weight="duotone" />
};

export default function DocumentsPage() {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 className="heading-lg" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <FolderOpen size={28} weight="duotone" /> Documents
          </h1>
          <p className="text-muted" style={{marginTop:4}}>Your medical records and documents</p>
        </div>
        <button className="btn btn-primary btn-sm" style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
          <UploadSimple size={16} /> Upload Document
        </button>
      </div>
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 0.5fr 0.5fr", padding: "12px 20px", fontSize: "0.6875rem", color: "var(--text-muted)", textTransform: "uppercase", fontWeight: 600, letterSpacing: "0.05em", borderBottom: "1px solid var(--border-subtle)" }}>
          <span>Document</span><span>Category</span><span>Provider</span><span>Size</span><span>Actions</span>
        </div>
        {documents.map((doc, i) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 0.5fr 0.5fr", padding: "14px 20px", alignItems: "center", borderBottom: "1px solid var(--border-subtle)", transition: "background 0.15s", cursor: "pointer" }} onMouseEnter={e => (e.currentTarget.style.background = "var(--bg-card-hover)")} onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ display: "inline-flex", alignItems: "center" }}>
                {icons[doc.category] || <File size={20} weight="duotone" />}
              </span>
              <div><strong style={{ fontSize: "0.8125rem" }}>{doc.name}</strong><br/><span className="text-xs text-muted">{doc.date}</span></div>
            </div>
            <span className="badge badge-primary">{doc.category}</span>
            <span className="text-sm text-muted">{doc.provider}</span>
            <span className="text-xs text-mono text-muted">{doc.size}</span>
            <div style={{ display: "flex", gap: 4 }}>
              <button className="btn btn-ghost btn-sm" title="Download" style={{ display: "inline-flex", alignItems: "center" }}>
                <DownloadSimple size={16} />
              </button>
              <button className="btn btn-ghost btn-sm" title="Share" style={{ display: "inline-flex", alignItems: "center" }}>
                <LinkSimple size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
