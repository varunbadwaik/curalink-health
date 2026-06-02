"use client";
import { useState } from "react";
import { ChatCircleDots, Phone, VideoCamera, Info, File, Paperclip } from "@phosphor-icons/react";

const contacts = [
  { id: 1, name: "Dr. Mike Torres", role: "General Medicine", status: "online", lastActive: "Just now", unread: 2 },
  { id: 2, name: "Nurse Emily Davis", role: "Care Coordinator", status: "online", lastActive: "Just now", unread: 0 },
  { id: 3, name: "Cardiology Dept", role: "Group", status: "offline", lastActive: "1 hr ago", unread: 5 },
  { id: 4, name: "Pharmacy Techs", role: "Group", status: "away", lastActive: "15 min ago", unread: 0 },
  { id: 5, name: "Admin (Tom Hayes)", role: "IT Support", status: "online", lastActive: "Just now", unread: 0 },
];

const messages = [
  { id: 1, sender: "Dr. Mike Torres", time: "10:30 AM", text: "Hey Sarah, are you available to consult on Patient Robert Chang? SpO2 dropped and I'd like a cardio perspective.", isMe: false },
  { id: 2, sender: "Me", time: "10:32 AM", text: "I just saw the AI alert for him. Yes, give me 5 minutes to finish up with my current patient.", isMe: true },
  { id: 3, sender: "Dr. Mike Torres", time: "10:33 AM", text: "Thanks. I've ordered a stat ABG and BNP.", isMe: false },
  { id: 4, sender: "Dr. Mike Torres", time: "10:45 AM", text: "Results are pending, I've attached his current EKG.", attachment: "Chang_EKG_T1.pdf", isMe: false },
  { id: 5, sender: "Me", time: "10:50 AM", text: "Looking at it now. The rhythm is irregular, let's start him on a continuous monitor.", isMe: true },
];

export default function TeamChatPage() {
  const [newMsg, setNewMsg] = useState("");
  return (
    <div>
      <h1 className="heading-lg" style={{ marginBottom: 24, display: "inline-flex", alignItems: "center", gap: "8px" }}>
        <ChatCircleDots size={28} weight="duotone" /> Team Chat
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16, height: "calc(100vh - 160px)" }}>
        {/* Contact List */}
        <div className="card" style={{ padding: 0, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: 16, borderBottom: "1px solid var(--border-subtle)" }}>
            <input className="input" placeholder="Search team members..." style={{ fontSize: "0.8125rem", width: "100%" }} />
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {contacts.map((c, i) => (
              <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", cursor: "pointer", background: i === 0 ? "var(--bg-card-hover)" : "transparent", borderLeft: i === 0 ? "3px solid var(--accent)" : "3px solid transparent" }}>
                <div style={{ position: "relative" }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: "0.75rem" }}>
                    {c.name.split(" ").map(n => n[0]).slice(0, 2).join("")}
                  </div>
                  <div className={`status-dot status-dot-${c.status === "online" ? "online" : c.status === "away" ? "warning" : "offline"}`} style={{ position: "absolute", bottom: 0, right: 0, border: "2px solid var(--bg-card)" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: "0.875rem", fontWeight: i === 0 ? 600 : 400 }}>{c.name}</div>
                  <div className="text-xs text-muted">{c.role}</div>
                </div>
                {c.unread > 0 && <span className="badge badge-accent" style={{ padding: "2px 6px" }}>{c.unread}</span>}
              </div>
            ))}
          </div>
        </div>
        
        {/* Chat Window */}
        <div className="card" style={{ padding: 0, display: "flex", flexDirection: "column", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border-subtle)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "var(--accent-glow)", color: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>MT</div>
              <div>
                <strong style={{ display: "block" }}>Dr. Mike Torres</strong>
                <span className="text-xs text-muted">Active now</span>
              </div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-ghost btn-sm" style={{ display: "inline-flex", alignItems: "center" }}>
                <Phone size={16} weight="duotone" />
              </button>
              <button className="btn btn-ghost btn-sm" style={{ display: "inline-flex", alignItems: "center" }}>
                <VideoCamera size={16} weight="duotone" />
              </button>
              <button className="btn btn-ghost btn-sm" style={{ display: "inline-flex", alignItems: "center" }}>
                <Info size={16} weight="duotone" />
              </button>
            </div>
          </div>
          
          <div style={{ flex: 1, padding: 20, overflowY: "auto", display: "flex", flexDirection: "column", gap: 16 }}>
            {messages.map(m => (
              <div key={m.id} style={{ display: "flex", flexDirection: "column", alignItems: m.isMe ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "75%", padding: "12px 16px", borderRadius: m.isMe ? "16px 16px 4px 16px" : "16px 16px 16px 4px", background: m.isMe ? "var(--primary)" : "var(--bg-tertiary)", color: m.isMe ? "#fff" : "var(--text-primary)", fontSize: "0.875rem", lineHeight: 1.5 }}>
                  {m.attachment && (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: 8, background: "rgba(0,0,0,0.1)", borderRadius: 8, marginBottom: 8 }}>
                      <File size={16} /> <span style={{ fontSize: "0.75rem", fontWeight: 600 }}>{m.attachment}</span>
                    </div>
                  )}
                  {m.text}
                </div>
                <span className="text-xs text-muted" style={{ marginTop: 4 }}>{m.time}</span>
              </div>
            ))}
          </div>
          
          <div style={{ padding: "16px 20px", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: 12 }}>
            <button className="btn btn-ghost btn-sm" style={{ display: "inline-flex", alignItems: "center" }}>
              <Paperclip size={16} />
            </button>
            <input type="text" className="input" placeholder="Type a secure message..." value={newMsg} onChange={e => setNewMsg(e.target.value)} style={{ flex: 1 }} />
            <button className="btn btn-primary">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
