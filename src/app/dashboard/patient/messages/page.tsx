"use client";
import { useState } from "react";

const threads = [
  { id: 1, from: "Dr. Sarah Chen", role: "Cardiology", avatar: "SC", unread: 2, lastMsg: "Your latest blood pressure readings look improved. Let's discuss adjusting your medication at the next visit.", time: "10 min ago", online: true },
  { id: 2, from: "Nurse Emily Davis", role: "Care Coordinator", avatar: "ED", unread: 1, lastMsg: "Reminder: Please upload your blood sugar log before your appointment on Friday.", time: "2 hrs ago", online: true },
  { id: 3, from: "Dr. Mike Torres", role: "General Medicine", avatar: "MT", unread: 0, lastMsg: "Your lab results are in. Everything looks normal — great job maintaining your health routine!", time: "Yesterday", online: false },
  { id: 4, from: "Pharmacy Team", role: "Curalink Pharmacy", avatar: "PH", unread: 0, lastMsg: "Your Lisinopril refill has been processed. Ready for pickup at Main St location.", time: "2 days ago", online: false },
  { id: 5, from: "Dr. Priya Patel", role: "Dermatology", avatar: "PP", unread: 0, lastMsg: "Please keep monitoring that area and send a photo if anything changes. See you in May!", time: "Apr 12", online: false },
];

const messages = [
  { id: 1, sender: "Dr. Sarah Chen", isMe: false, text: "Good morning, John! I reviewed your latest BP readings from this week.", time: "9:45 AM" },
  { id: 2, sender: "Dr. Sarah Chen", isMe: false, text: "Your average has come down to 128/82, which is a significant improvement from last month's 145/93.", time: "9:46 AM" },
  { id: 3, sender: "Me", isMe: true, text: "That's great to hear! I've been consistent with the medication and reduced my salt intake.", time: "9:50 AM" },
  { id: 4, sender: "Dr. Sarah Chen", isMe: false, text: "Excellent work! At our next appointment, we may consider lowering your dosage if this trend continues. Keep up the good work! 👏", time: "9:52 AM" },
  { id: 5, sender: "Me", isMe: true, text: "Thank you, Doctor. Should I continue logging daily?", time: "10:01 AM" },
  { id: 6, sender: "Dr. Sarah Chen", isMe: false, text: "Yes please — the daily logs are very helpful. You can use the vitals tracker in your dashboard, and I'll review them before our visit.", time: "10:05 AM" },
];

export default function MessagesPage() {
  const [activeThread, setActiveThread] = useState(1);
  const [newMsg, setNewMsg] = useState("");
  const active = threads.find(t => t.id === activeThread)!;

  return (
    <div>
      <h1 className="heading-lg" style={{ marginBottom: 24 }}>💬 Messages</h1>
      <div style={{ display: "grid", gridTemplateColumns: "320px 1fr", gap: 16, height: "calc(100vh - 160px)" }}>
        {/* Thread List */}
        <div className="card" style={{ overflow: "auto", padding: 0 }}>
          <div style={{ padding: "16px 16px 12px", borderBottom: "1px solid var(--border-subtle)" }}>
            <input className="input" placeholder="Search messages..." style={{ fontSize: "0.8125rem" }} />
          </div>
          {threads.map(t => (
            <div key={t.id} onClick={() => setActiveThread(t.id)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", cursor: "pointer", background: activeThread === t.id ? "var(--primary-glow)" : "transparent", borderLeft: activeThread === t.id ? "3px solid var(--primary)" : "3px solid transparent", transition: "all 0.15s" }}>
              <div style={{ position: "relative" }}>
                <div style={{ width: 40, height: 40, borderRadius: "var(--radius-md)", background: "var(--bg-tertiary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "var(--text-secondary)" }}>{t.avatar}</div>
                {t.online && <div className="status-dot status-dot-online" style={{ position: "absolute", bottom: -1, right: -1, width: 10, height: 10, border: "2px solid var(--bg-secondary)" }} />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong style={{ fontSize: "0.8125rem" }}>{t.from}</strong>
                  <span className="text-xs text-muted">{t.time}</span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "var(--text-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", margin: 0 }}>{t.lastMsg}</p>
              </div>
              {t.unread > 0 && <span style={{ background: "var(--primary)", color: "white", borderRadius: "var(--radius-full)", fontSize: "0.625rem", fontWeight: 700, padding: "2px 7px", minWidth: 18, textAlign: "center" }}>{t.unread}</span>}
            </div>
          ))}
        </div>
        {/* Chat Area */}
        <div className="card" style={{ display: "flex", flexDirection: "column", padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border-subtle)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "var(--radius-md)", background: "var(--accent-glow)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", fontWeight: 700, color: "var(--accent)" }}>{active.avatar}</div>
            <div><strong style={{ fontSize: "0.875rem" }}>{active.from}</strong><p className="text-xs text-muted" style={{margin:0}}>{active.role}</p></div>
            <div style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button className="btn btn-ghost btn-sm">📞</button>
              <button className="btn btn-ghost btn-sm">📹</button>
            </div>
          </div>
          <div style={{ flex: 1, overflow: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
            {messages.map(m => (
              <div key={m.id} style={{ display: "flex", justifyContent: m.isMe ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "70%", padding: "10px 14px", borderRadius: m.isMe ? "14px 14px 4px 14px" : "14px 14px 14px 4px", background: m.isMe ? "var(--primary)" : "var(--bg-tertiary)", color: m.isMe ? "white" : "var(--text-primary)", fontSize: "0.8125rem", lineHeight: 1.5 }}>
                  {m.text}
                  <div style={{ fontSize: "0.625rem", marginTop: 4, opacity: 0.6, textAlign: "right" }}>{m.time}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ padding: "12px 20px", borderTop: "1px solid var(--border-subtle)", display: "flex", gap: 8 }}>
            <button className="btn btn-ghost btn-sm">📎</button>
            <input className="input" placeholder="Type a message..." value={newMsg} onChange={e => setNewMsg(e.target.value)} style={{ flex: 1 }} />
            <button className="btn btn-primary btn-sm">Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
