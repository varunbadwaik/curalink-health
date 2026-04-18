"use client";
const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const hours = ["8:00","9:00","10:00","11:00","12:00","1:00","2:00","3:00","4:00","5:00"];
const appointments: Record<string, {patient:string;type:string;color:string;span?:number}[]> = {
  "Mon-9:00": [{patient:"Maria Rodriguez",type:"Follow-up",color:"var(--primary)"}],
  "Mon-10:00": [{patient:"Robert Chang",type:"Urgent",color:"var(--critical)"}],
  "Mon-2:00": [{patient:"Elena Vasquez",type:"Telehealth",color:"var(--purple)"}],
  "Tue-9:00": [{patient:"James Wilson",type:"Post-Op",color:"var(--accent)"}],
  "Tue-11:00": [{patient:"Aisha Khan",type:"Prenatal",color:"var(--warning)"}],
  "Tue-3:00": [{patient:"David Thompson",type:"Cardio Eval",color:"var(--primary)"}],
  "Wed-8:00": [{patient:"Surgery Block",type:"OR Block",color:"var(--critical)",span:3}],
  "Wed-1:00": [{patient:"Team Meeting",type:"Internal",color:"var(--text-muted)"}],
  "Wed-3:00": [{patient:"Sarah Bennett",type:"New Patient",color:"var(--accent)"}],
  "Thu-9:00": [{patient:"John Smith",type:"Annual Physical",color:"var(--primary)"}],
  "Thu-10:00": [{patient:"Lisa Park",type:"Follow-up",color:"var(--accent)"}],
  "Thu-2:00": [{patient:"Admin Time",type:"Documentation",color:"var(--text-muted)"}],
  "Fri-9:00": [{patient:"Clinic Hours",type:"Walk-in",color:"var(--warning)",span:3}],
  "Fri-2:00": [{patient:"CME Webinar",type:"Education",color:"var(--purple)"}],
};

export default function SchedulePage() {
  return (
    <div>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:24}}>
        <div><h1 className="heading-lg">📅 Weekly Schedule</h1><p className="text-muted" style={{marginTop:4}}>April 21–25, 2026 · Dr. Sarah Chen</p></div>
        <div style={{display:"flex",gap:8}}><button className="btn btn-ghost btn-sm">← Prev</button><button className="btn btn-primary btn-sm">Today</button><button className="btn btn-ghost btn-sm">Next →</button></div>
      </div>
      <div className="card" style={{padding:0,overflow:"auto"}}>
        <div style={{display:"grid",gridTemplateColumns:"80px repeat(5, 1fr)",minWidth:800}}>
          <div style={{padding:12,borderRight:"1px solid var(--border-subtle)",borderBottom:"1px solid var(--border-subtle)"}} />
          {days.map(d => <div key={d} style={{padding:12,textAlign:"center",fontWeight:700,fontSize:"0.875rem",borderRight:"1px solid var(--border-subtle)",borderBottom:"1px solid var(--border-subtle)",background:"var(--bg-secondary)"}}>{d}</div>)}
          {hours.map(h => <>
            <div key={`h-${h}`} style={{padding:"12px 8px",fontSize:"0.75rem",color:"var(--text-muted)",borderRight:"1px solid var(--border-subtle)",borderBottom:"1px solid var(--border-subtle)",textAlign:"right",fontFamily:"var(--font-mono)"}}>{h}</div>
            {days.map(d => {
              const key = `${d}-${h}`;
              const apt = appointments[key];
              return <div key={key} style={{padding:4,borderRight:"1px solid var(--border-subtle)",borderBottom:"1px solid var(--border-subtle)",minHeight:48}}>
                {apt?.map((a,i) => <div key={i} style={{padding:"4px 8px",borderRadius:6,background:`${a.color}15`,borderLeft:`3px solid ${a.color}`,fontSize:"0.6875rem",marginBottom:2}}>
                  <strong style={{color:a.color}}>{a.patient}</strong>
                  <div className="text-xs text-muted">{a.type}</div>
                </div>)}
              </div>;
            })}
          </>)}
        </div>
      </div>
    </div>
  );
}
