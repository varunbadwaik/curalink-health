"use client";
import { useState } from "react";
import { UsersThree } from "@phosphor-icons/react";

const users = [
  { id: "USR-001", name: "Dr. Sarah Chen", role: "Physician", dept: "Cardiology", status: "Active", lastLog: "10 mins ago", email: "schen@curalink.health" },
  { id: "USR-002", name: "Dr. Mike Torres", role: "Physician", dept: "General Medicine", status: "Active", lastLog: "2 hrs ago", email: "mtorres@curalink.health" },
  { id: "USR-003", name: "Emily Davis, RN", role: "Nurse", dept: "ICU", status: "Active", lastLog: "5 mins ago", email: "edavis@curalink.health" },
  { id: "USR-004", name: "Tom Hayes", role: "Admin", dept: "IT Support", status: "Active", lastLog: "1 day ago", email: "thayes@curalink.health" },
  { id: "USR-005", name: "Dr. Priya Patel", role: "Physician", dept: "Dermatology", status: "Inactive", lastLog: "2 weeks ago", email: "ppatel@curalink.health" },
  { id: "USR-006", name: "Mark Johnson", role: "Technician", dept: "Radiology", status: "Active", lastLog: "1 hr ago", email: "mjohnson@curalink.health" },
];

export default function AdminUsersPage() {
  const [search, setSearch] = useState("");

  const filtered = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 className="heading-lg" style={{ display: "inline-flex", alignItems: "center", gap: "8px" }}>
            <UsersThree size={28} weight="duotone" /> User Management
          </h1>
          <p className="text-muted" style={{marginTop:4}}>Manage platform access and roles</p>
        </div>
        <button className="btn btn-primary">+ Add New User</button>
      </div>
      
      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div style={{ padding: 16, borderBottom: "1px solid var(--border-subtle)", display: "flex", gap: 16 }}>
          <input className="input" placeholder="Search by name or role..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, maxWidth: 300 }} />
          <select className="input" style={{ width: 150 }}><option>All Roles</option><option>Physician</option><option>Nurse</option><option>Admin</option></select>
          <select className="input" style={{ width: 150 }}><option>All Status</option><option>Active</option><option>Inactive</option></select>
        </div>
        
        <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}>
          <thead>
            <tr style={{ background: "var(--bg-secondary)", fontSize: "0.6875rem", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              <th style={{ padding: "12px 20px" }}>User</th>
              <th style={{ padding: "12px 20px" }}>Role / Dept</th>
              <th style={{ padding: "12px 20px" }}>Email</th>
              <th style={{ padding: "12px 20px" }}>Status</th>
              <th style={{ padding: "12px 20px" }}>Last Login</th>
              <th style={{ padding: "12px 20px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.id} style={{ borderBottom: "1px solid var(--border-subtle)" }}>
                <td style={{ padding: "14px 20px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 6, background: "var(--bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700 }}>
                      {u.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                    </div>
                    <strong className="text-sm">{u.name}</strong>
                  </div>
                </td>
                <td style={{ padding: "14px 20px" }}>
                  <span className="text-sm">{u.role}</span><br/>
                  <span className="text-xs text-muted">{u.dept}</span>
                </td>
                <td style={{ padding: "14px 20px" }}><span className="text-sm text-muted">{u.email}</span></td>
                <td style={{ padding: "14px 20px" }}>
                  <span className={`badge ${u.status === "Active" ? "badge-accent" : "badge-purple"}`}>{u.status}</span>
                </td>
                <td style={{ padding: "14px 20px" }}><span className="text-xs text-muted">{u.lastLog}</span></td>
                <td style={{ padding: "14px 20px", display: "flex", gap: 8 }}>
                  <button className="btn btn-ghost btn-sm">Edit</button>
                  <button className="btn btn-ghost btn-sm" style={{ color: "var(--critical)" }}>Revoke</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
