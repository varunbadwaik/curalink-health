"use client";
export default function TelehealthPage() {
  return (
    <div>
      <h1 className="heading-lg" style={{marginBottom:24}}>📹 Telehealth</h1>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:16,marginBottom:24}}>
        <div className="card" style={{padding:24}}>
          <h2 className="heading-md" style={{marginBottom:8}}>Next Virtual Visit</h2>
          <p className="text-muted" style={{marginBottom:16}}>Dr. Mike Torres · General Medicine</p>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
            <div style={{padding:"8px 16px",background:"var(--primary-glow)",borderRadius:"var(--radius-md)"}}>
              <span style={{fontSize:"1.25rem",fontWeight:800,color:"var(--primary-light)"}}>25</span>
              <span style={{fontSize:"0.625rem",color:"var(--primary)",display:"block",textTransform:"uppercase",fontWeight:600}}>Apr</span>
            </div>
            <div><strong>April 25, 2026</strong><br/><span className="text-sm text-muted">2:30 PM EST</span></div>
          </div>
          <button className="btn btn-primary" style={{width:"100%"}}>🎥 Join Video Call</button>
        </div>
        <div className="card" style={{padding:24}}>
          <h2 className="heading-md" style={{marginBottom:8}}>Pre-Visit Checklist</h2>
          {["Test camera and microphone","Prepare list of symptoms","Have medications nearby","Find quiet, private space","Check internet connection"].map((item,i) => (
            <div key={i} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 0",fontSize:"0.8125rem"}}>
              <div style={{width:18,height:18,borderRadius:5,border:"2px solid var(--border-strong)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}} />{item}
            </div>
          ))}
        </div>
      </div>
      <h2 className="heading-md" style={{marginBottom:12}}>Past Virtual Visits</h2>
      <div style={{display:"flex",flexDirection:"column",gap:8}}>
        {[{doctor:"Dr. Sarah Chen",date:"Apr 5, 2026",duration:"22 min",summary:"Reviewed BP trends. Medication dosage maintained."},{doctor:"Dr. Mike Torres",date:"Mar 20, 2026",duration:"18 min",summary:"Diabetes management check. HbA1c improving."},{doctor:"Dr. Priya Patel",date:"Feb 28, 2026",duration:"15 min",summary:"Skin condition follow-up. Cleared for next quarterly."}].map((v,i) => (
          <div key={i} className="card" style={{padding:16,display:"flex",alignItems:"center",gap:16}}>
            <div style={{width:40,height:40,borderRadius:"var(--radius-md)",background:"var(--bg-tertiary)",display:"flex",alignItems:"center",justifyContent:"center"}}>📹</div>
            <div style={{flex:1}}><strong className="text-sm">{v.doctor}</strong><br/><span className="text-xs text-muted">{v.date} · {v.duration}</span></div>
            <span className="text-sm text-muted" style={{maxWidth:300}}>{v.summary}</span>
            <button className="btn btn-ghost btn-sm">View Notes</button>
          </div>
        ))}
      </div>
    </div>
  );
}
