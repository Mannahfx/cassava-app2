import { useState } from 'react'
import { DISEASES, PRODUCTS, DEALERS, REMINDERS, HISTORY } from './data'

// ─── Icons (inline SVG components) ────────────────────────────────────────────
const Icon = ({ name, size = 20, color = 'currentColor', style = {} }) => {
  const icons = {
    home: <path d="M3 12L12 4l9 8M5 10v10h5v-6h4v6h5V10" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
    scan: <><path d="M4 6V4h4M16 4h4v2M4 18v2h4M16 20h4v-2" stroke={color} strokeWidth="2" strokeLinecap="round"/><rect x="8" y="8" width="8" height="8" rx="1" stroke={color} strokeWidth="2" fill="none"/></>,
    bell: <path d="M15 17h5l-1.4-1.4A6 6 0 0015 10V7a3 3 0 00-6 0v3a6 6 0 00-3.6 5.6L4 17h5m6 0v1a3 3 0 01-6 0v-1m6 0H9" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>,
    clock: <><circle cx="12" cy="12" r="9" stroke={color} strokeWidth="2" fill="none"/><path d="M12 7v5l3 3" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    user: <><circle cx="12" cy="8" r="4" stroke={color} strokeWidth="2" fill="none"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/></>,
    back: <path d="M19 12H5m7-7l-7 7 7 7" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
    share: <path d="M8.59 13.51l6.83 3.98m-.01-10.98l-6.82 3.98M21 5a3 3 0 11-6 0 3 3 0 016 0zm0 14a3 3 0 11-6 0 3 3 0 016 0zM3 12a3 3 0 110-6 3 3 0 010 6z" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>,
    leaf: <path d="M17 8C8 10 5.9 16.17 3.82 19.15A10 10 0 1017 8z" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>,
    medkit: <><path d="M4 8h16v13H4zM8 8V6a2 2 0 012-2h4a2 2 0 012 2v2" stroke={color} strokeWidth="2" fill="none"/><path d="M12 12v4M10 14h4" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    flask: <><path d="M9 3h6M8 3l-4 13a2 2 0 001.8 2.8h10.4A2 2 0 0018 16L14 3" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/><path d="M6 14h12" stroke={color} strokeWidth="2"/></>,
    location: <><path d="M12 2a7 7 0 017 7c0 5.25-7 13-7 13S5 14.25 5 9a7 7 0 017-7z" stroke={color} strokeWidth="2" fill="none"/><circle cx="12" cy="9" r="2.5" stroke={color} strokeWidth="2" fill="none"/></>,
    check: <path d="M20 6L9 17l-5-5" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
    camera: <><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z" stroke={color} strokeWidth="2" fill="none"/><circle cx="12" cy="13" r="4" stroke={color} strokeWidth="2" fill="none"/></>,
    plus: <path d="M12 5v14M5 12h14" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>,
    trash: <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>,
    map: <><path d="M3 6l6-3 6 3 6-3v15l-6 3-6-3-6 3V6z" stroke={color} strokeWidth="2" fill="none"/><path d="M9 3v15M15 6v15" stroke={color} strokeWidth="2"/></>,
    list: <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" stroke={color} strokeWidth="2" strokeLinecap="round"/>,
    phone: <path d="M22 16.92v3a2 2 0 01-2.18 2A19.79 19.79 0 013.1 5.18 2 2 0 015.09 3h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.91 10.91a16 16 0 006.18 6.18l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 17v-.08z" stroke={color} strokeWidth="2" fill="none"/>,
    navigate: <><polygon points="3,11 22,2 13,21 11,13 3,11" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round"/></>,
    shield: <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={color} strokeWidth="2" fill="none"/>,
    settings: <><circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" fill="none"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke={color} strokeWidth="2" fill="none"/></>,
    edit: <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke={color} strokeWidth="2" fill="none"/>,
    eye: <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke={color} strokeWidth="2" fill="none"/><circle cx="12" cy="12" r="3" stroke={color} strokeWidth="2" fill="none"/></>,
    download: <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke={color} strokeWidth="2" strokeLinecap="round" fill="none"/>,
    star: <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" stroke={color} strokeWidth="2" fill="none" strokeLinejoin="round"/>,
    sun: <><circle cx="12" cy="12" r="5" stroke={color} strokeWidth="2" fill="none"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke={color} strokeWidth="2" strokeLinecap="round"/></>,
    chevron: <path d="M9 18l6-6-6-6" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={style}>
      {icons[name] || null}
    </svg>
  )
}

// ─── Shared ────────────────────────────────────────────────────────────────────
function StatusBar() {
  const now = new Date()
  const time = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  return (
    <div className="status-bar">
      <span>{time}</span>
      <span>FMN AgriSense</span>
      <span>●●●</span>
    </div>
  )
}

function BottomNav({ active, setScreen }) {
  const items = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'scan', label: 'Scan', icon: 'scan' },
    { id: 'reminders', label: 'Tasks', icon: 'bell' },
    { id: 'history', label: 'History', icon: 'clock' },
    { id: 'profile', label: 'Profile', icon: 'user' },
  ]
  return (
    <nav className="bottom-nav">
      {items.map(i => (
        <button key={i.id} className={`nav-item${active === i.id ? ' active' : ''}`} onClick={() => setScreen(i.id)}>
          <Icon name={i.icon} size={22} color={active === i.id ? 'var(--green)' : 'var(--text-3)'} />
          {i.label}
        </button>
      ))}
    </nav>
  )
}

// ─── HOME ──────────────────────────────────────────────────────────────────────
function HomeScreen({ navigate }) {
  return (
    <div className="screen fade-in">
      {/* Header */}
      <div style={{ background: 'var(--green-dark)', padding: '14px 18px 20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: -20, right: -20, width: 100, height: 100, background: 'radial-gradient(circle, rgba(76,175,80,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div>
            <div style={{ color: '#90B8E0', fontSize: 12, fontWeight: 600 }}>Good morning 👋</div>
            <div style={{ color: 'white', fontSize: 20, fontWeight: 800, marginTop: 2 }}>Oluwayinka Olayinka Paul</div>
            <div style={{ color: '#A8C4E8', fontSize: 12, marginTop: 3 }}>Lagos State  •  3.5 Hectares</div>
          </div>
          <button onClick={() => navigate('profile')} style={{ background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="bell" size={20} color="white" />
          </button>
        </div>
        {/* Weather */}
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 10, padding: '8px 12px', marginTop: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
          <Icon name="sun" size={16} color="#FDD835" />
          <span style={{ color: 'white', fontSize: 12, flex: 1 }}>32°C  •  Lagos  •  Low disease risk today</span>
          <Icon name="chevron" size={14} color="#A8C4E8" />
        </div>
      </div>

      <div className="content">
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginBottom: 14 }}>
          {[
            { val: '94%', label: 'AI Accuracy', color: 'var(--green)' },
            { val: '12', label: 'Diseases', color: 'var(--accent)' },
            { val: HISTORY.length, label: 'Scans Done', color: '#6A1B9A' },
          ].map(s => (
            <div key={s.label} className="card" style={{ textAlign: 'center', padding: 12 }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.color }}>{s.val}</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)', marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Scan CTA */}
        <div style={{ background: 'linear-gradient(135deg, var(--green) 0%, #001F5B 100%)', border: 'none', borderRadius: 'var(--radius-lg)', padding: '18px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', marginBottom: 16, boxShadow: 'var(--shadow-lg)' }}>
          <div style={{ textAlign: 'left' }}>
            <div style={{ color: 'white', fontSize: 18, fontWeight: 800 }}>Scan Your Plant</div>
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 4, lineHeight: 1.5 }}>Upload a photo for instant AI<br />disease detection & advice</div>
            <div style={{ background: 'rgba(255,255,255,0.15)', borderRadius: 'var(--radius-full)', padding: '4px 12px', display: 'inline-block', marginTop: 8, color: 'white', fontSize: 11, fontWeight: 600 }}>⚡ Results in 3 seconds</div>
          </div>
          <Icon name="scan" size={56} color="rgba(255,255,255,0.85)" />
        </button>

        {/* Quick Actions */}
        <div className="section-title">Quick Actions</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 8, marginBottom: 16 }}>
          {[
            { label: 'Products', icon: 'flask', color: 'var(--green)', screen: 'products' },
            { label: 'Find Dealer', icon: 'location', color: 'var(--accent)', screen: 'dealers' },
            { label: 'Reminders', icon: 'bell', color: '#6A1B9A', screen: 'reminders' },
            { label: 'History', icon: 'clock', color: '#1565C0', screen: 'history' },
          ].map(a => (
            <button key={a.label} onClick={() => navigate(a.screen)} className="card" style={{ border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, padding: 10 }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, background: a.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name={a.icon} size={20} color={a.color} />
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-2)', textAlign: 'center' }}>{a.label}</span>
            </button>
          ))}
        </div>

        {/* Upcoming Tasks */}
        <div className="section-row">
          <div className="section-title" style={{ marginBottom: 0 }}>Upcoming Tasks</div>
          <button className="see-all" onClick={() => navigate('reminders')}>See all</button>
        </div>
        {REMINDERS.filter(r => r.enabled && (r.nextDue === 'Today' || r.nextDue === 'Tomorrow')).map(r => (
          <div key={r.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, padding: '12px 14px' }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: r.nextDue === 'Today' ? 'var(--green)' : 'var(--accent)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{r.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{r.nextDue}  •  {r.time}</div>
            </div>
            <span className={`chip ${r.nextDue === 'Today' ? 'sev-none' : 'sev-moderate'}`}>{r.nextDue}</span>
          </div>
        ))}

        {/* Recent Diagnoses */}
        <div className="section-row" style={{ marginTop: 8 }}>
          <div className="section-title" style={{ marginBottom: 0 }}>Recent Diagnoses</div>
          <button className="see-all" onClick={() => navigate('history')}>See all</button>
        </div>
        {HISTORY.slice(0, 3).map(item => {
          const d = DISEASES.find(x => x.id === item.diseaseId)
          return (
            <button key={item.id} onClick={() => navigate('diagnosis', { diseaseId: item.diseaseId })} className="card" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8, padding: '12px 14px', border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ width: 46, height: 46, borderRadius: 14, background: d.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, flexShrink: 0 }}>{d.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{d.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{item.field}  •  {item.date}</div>
              </div>
              <span className={`chip ${d.sevClass}`}>{d.severity === 'None' ? 'Healthy' : d.severity}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── SCAN ──────────────────────────────────────────────────────────────────────
const SAMPLES = [
  { label: 'Mosaic Disease', emoji: '🍃', id: 'cmd' },
  { label: 'Brown Streak', emoji: '🌿', id: 'cbsd' },
  { label: 'N-Deficiency', emoji: '🌱', id: 'nitrogen' },
  { label: 'Blight', emoji: '🍂', id: 'cbb' },
  { label: 'Healthy', emoji: '✅', id: 'healthy' },
]

function ScanScreen({ navigate, setAnalyzing }) {
  function handleFile(e) {
    const file = e.target.files[0]
    if (!file) return
    const randomId = DISEASES[Math.floor(Math.random() * DISEASES.length)].id
    setAnalyzing(randomId)
  }
  return (
    <div className="screen fade-in">
      <div className="screen-header">
        <div style={{ color: 'white', fontSize: 20, fontWeight: 800 }}>Scan Plant</div>
        <div style={{ color: '#A8C4E8', fontSize: 12, marginTop: 2 }}>Take or upload a cassava leaf photo</div>
      </div>
      <div className="content">
        {/* Viewfinder */}
        <div style={{ background: 'rgba(0,0,0,0.07)', borderRadius: 'var(--radius-lg)', aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--green-border)', marginBottom: 14, position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 12, left: 12, width: 28, height: 28, borderTop: '3px solid var(--green-light)', borderLeft: '3px solid var(--green-light)', borderRadius: '4px 0 0 0' }} />
          <div style={{ position: 'absolute', top: 12, right: 12, width: 28, height: 28, borderTop: '3px solid var(--green-light)', borderRight: '3px solid var(--green-light)', borderRadius: '0 4px 0 0' }} />
          <div style={{ position: 'absolute', bottom: 12, left: 12, width: 28, height: 28, borderBottom: '3px solid var(--green-light)', borderLeft: '3px solid var(--green-light)', borderRadius: '0 0 0 4px' }} />
          <div style={{ position: 'absolute', bottom: 12, right: 12, width: 28, height: 28, borderBottom: '3px solid var(--green-light)', borderRight: '3px solid var(--green-light)', borderRadius: '0 0 4px 0' }} />
          <div style={{ textAlign: 'center' }}>
            <Icon name="leaf" size={56} color="var(--green-border)" />
            <div style={{ color: 'var(--text-3)', fontSize: 13, marginTop: 10 }}>Position cassava leaf<br />within the frame</div>
          </div>
        </div>

        {/* Upload button */}
        <label style={{ display: 'block', marginBottom: 14 }}>
          <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFile} />
          <div className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            <Icon name="camera" size={18} color="white" />
            Upload Plant Photo
          </div>
        </label>

        {/* Tips */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 8 }}>📸 Photo Tips</div>
          {['Use good natural lighting — avoid shadows', 'Fill the frame with 1–2 leaves', 'Include stem if symptoms are visible there too'].map((t, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', marginTop: 5, flexShrink: 0 }} />
              <span style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.5 }}>{t}</span>
            </div>
          ))}
        </div>

        {/* Sample scans */}
        <div className="section-title">Try a Sample Scan</div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {SAMPLES.map(s => (
            <button key={s.id} onClick={() => setAnalyzing(s.id)} style={{ background: 'var(--card)', border: '1.5px solid var(--border)', borderRadius: 'var(--radius)', padding: '10px 12px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, minWidth: 64 }}>
              <span style={{ fontSize: 26 }}>{s.emoji}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-2)' }}>{s.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── ANALYZING ─────────────────────────────────────────────────────────────────
function AnalyzingScreen() {
  return (
    <div className="screen" style={{ background: 'var(--green-dark)', alignItems: 'center', justifyContent: 'center', display: 'flex', flexDirection: 'column', gap: 16, padding: 32 }}>
      <div style={{ position: 'relative', width: 120, height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '3px solid rgba(76,175,80,0.35)', animation: 'pulse 1.4s ease-in-out infinite' }} />
        <div style={{ position: 'absolute', inset: 14, borderRadius: '50%', border: '3px solid rgba(76,175,80,0.5)', animation: 'pulse 1.4s ease-in-out 0.2s infinite' }} />
        <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(76,175,80,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30 }}>🔬</div>
      </div>
      <div style={{ color: 'white', fontSize: 22, fontWeight: 800 }}>Analyzing Plant...</div>
      <div style={{ color: '#A8C4E8', fontSize: 13, animation: 'blink 1.2s ease-in-out infinite' }}>AI model processing image</div>
      <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
        {[0, 1, 2].map(i => (
          <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green-light)', animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />
        ))}
      </div>
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 8, alignSelf: 'stretch' }}>
        {['Scanning leaf texture...', 'Detecting disease patterns...', 'Matching FMN database...'].map((s, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid var(--green-light)', borderTopColor: 'transparent', animation: 'spin 1s linear infinite', animationDelay: `${i * 0.3}s` }} />
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── DIAGNOSIS ─────────────────────────────────────────────────────────────────
function DiagnosisScreen({ navigate, diseaseId }) {
  const d = DISEASES.find(x => x.id === diseaseId) || DISEASES[0]
  return (
    <div className="screen fade-in">
      <div style={{ background: 'var(--green-dark)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px 0' }}>
          <button className="back-btn" onClick={() => navigate('home')}>←</button>
          <span style={{ color: 'white', fontWeight: 700 }}>Diagnosis Result</span>
          <button className="back-btn"><Icon name="share" size={18} color="white" /></button>
        </div>
        {/* Plant placeholder */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: 160, fontSize: 90 }}>{d.icon}</div>
        <div style={{ padding: '0 18px 20px' }}>
          <span className={`chip ${d.sevClass}`} style={{ marginBottom: 10, display: 'inline-flex' }}>{d.severity === 'None' ? '✅ Healthy' : `⚠️ ${d.severity}`}</span>
          <div style={{ color: 'white', fontSize: 22, fontWeight: 900, lineHeight: 1.2 }}>{d.name}</div>
          <div style={{ color: '#A8C4E8', fontSize: 12, marginTop: 4 }}>{d.shortName}</div>
          <div style={{ marginTop: 12 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
              <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>AI Confidence</span>
              <span style={{ color: 'var(--green-light)', fontSize: 12, fontWeight: 700 }}>{d.confidence}%</span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 3, overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${d.confidence}%`, background: 'var(--green-light)', borderRadius: 3, transition: 'width 1s ease' }} />
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        {/* Description */}
        <div className="card" style={{ marginBottom: 10 }}>
          <div style={{ fontWeight: 700, marginBottom: 6, fontSize: 14 }}>About this Condition</div>
          <div style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7 }}>{d.description}</div>
        </div>

        {/* Symptoms */}
        <div className="card" style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: d.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="eye" size={16} color={d.color} />
            </div>
            <div style={{ fontWeight: 700, fontSize: 14 }}>Symptoms Detected</div>
          </div>
          {d.symptoms.map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 7 }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: d.color, marginTop: 5, flexShrink: 0 }} />
              <span style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.5 }}>{s}</span>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
          <button className="btn btn-primary" onClick={() => navigate('treatment', { diseaseId: d.id })}>
            <Icon name="medkit" size={16} color="white" /> Treatment Plan
          </button>
          <button className="btn btn-secondary" onClick={() => navigate('products', { diseaseId: d.id })}>
            <Icon name="flask" size={16} color="var(--green)" /> FMN Products
          </button>
        </div>
        <button className="btn" style={{ width: '100%', background: 'white', border: '1.5px solid var(--green-border)', color: 'var(--accent)', marginBottom: 10 }} onClick={() => navigate('dealers')}>
          <Icon name="location" size={16} color="var(--accent)" /> Find Nearest FMN Dealer
        </button>
        <button className="btn" style={{ width: '100%', background: 'transparent', color: 'var(--text-3)', border: 'none' }} onClick={() => navigate('scan')}>
          <Icon name="scan" size={16} color="var(--text-3)" /> Scan another plant
        </button>
      </div>
    </div>
  )
}

// ─── TREATMENT ─────────────────────────────────────────────────────────────────
function TreatmentScreen({ navigate, diseaseId }) {
  const d = DISEASES.find(x => x.id === diseaseId) || DISEASES[0]
  const [checked, setChecked] = useState({})
  const [tab, setTab] = useState('treatment')

  const schedule = [
    { day: 'Day 1', tasks: ['Remove infected plants', 'First fungicide treatment'] },
    { day: 'Day 3', tasks: ['Inspect neighbours', 'Disinfect tools'] },
    { day: 'Day 7', tasks: ['Second spray', 'Check for new symptoms'] },
    { day: 'Day 14', tasks: ['Repeat treatment', 'Document recovery'] },
  ]

  const done = Object.values(checked).filter(Boolean).length
  const pct = d.treatment.length ? Math.round((done / d.treatment.length) * 100) : 0

  return (
    <div className="screen fade-in">
      <div style={{ background: 'var(--green-dark)', padding: '14px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
          <button className="back-btn" onClick={() => navigate('diagnosis', { diseaseId })}>←</button>
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: 'white', fontWeight: 800 }}>Treatment Plan</div>
            <div style={{ color: '#A8C4E8', fontSize: 12 }}>{d.shortName}</div>
          </div>
          <div style={{ width: 36 }} />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>{done}/{d.treatment.length} steps completed</span>
          <span style={{ color: 'var(--green-light)', fontSize: 12, fontWeight: 700 }}>{pct}%</span>
        </div>
        <div style={{ height: 6, background: 'rgba(255,255,255,0.15)', borderRadius: 3, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--green-light)', borderRadius: 3, transition: 'width 0.4s' }} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ background: 'var(--bg)', borderBottom: '1px solid var(--border)', display: 'flex', padding: '4px 14px 0' }}>
        {['treatment', 'prevention', 'schedule'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ padding: '8px 12px', border: 'none', background: 'none', cursor: 'pointer', fontFamily: 'var(--font)', fontSize: 13, fontWeight: 700, color: tab === t ? 'var(--green)' : 'var(--text-3)', borderBottom: tab === t ? '2.5px solid var(--green)' : '2.5px solid transparent', textTransform: 'capitalize' }}>
            {t}
          </button>
        ))}
      </div>

      <div className="content">
        {tab === 'treatment' && (
          <>
            <div style={{ fontSize: 12, color: 'var(--text-3)', marginBottom: 12 }}>Tap each step to mark as completed. Follow in order for best results.</div>
            {d.treatment.map((step, i) => (
              <button key={i} onClick={() => setChecked(p => ({ ...p, [i]: !p[i] }))} style={{ width: '100%', background: checked[i] ? 'var(--green-pale)' : 'white', border: checked[i] ? '1.5px solid var(--green-border)' : '1.5px solid transparent', borderRadius: 'var(--radius)', padding: 12, display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 8, cursor: 'pointer', textAlign: 'left', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ width: 26, height: 26, borderRadius: '50%', background: checked[i] ? 'var(--green-light)' : 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {checked[i] ? <Icon name="check" size={14} color="white" /> : <span style={{ color: 'white', fontSize: 12, fontWeight: 700 }}>{i + 1}</span>}
                </div>
                <span style={{ fontSize: 13, color: checked[i] ? 'var(--text-3)' : 'var(--text)', lineHeight: 1.6, textDecoration: checked[i] ? 'line-through' : 'none' }}>{step}</span>
              </button>
            ))}
            <button className="btn btn-accent" style={{ width: '100%', marginTop: 8 }} onClick={() => navigate('products', { diseaseId })}>
              <Icon name="flask" size={16} color="white" /> View Recommended FMN Products →
            </button>
          </>
        )}
        {tab === 'prevention' && (
          <>
            <div className="card" style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Icon name="shield" size={22} color="var(--green)" />
                <span style={{ fontWeight: 700, fontSize: 14 }}>Preventive Measures</span>
              </div>
              <p style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.7 }}>{d.prevention}</p>
            </div>
            <div className="section-title">General Best Practices</div>
            {['Use certified disease-free planting materials', 'Conduct soil tests before every planting season', 'Apply FMN preventive spray schedule from day one', 'Keep detailed farm records and photo documentation', 'Attend local FMN farmer training workshops'].map((t, i) => (
              <div key={i} className="card" style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 8, padding: '12px 14px' }}>
                <Icon name="check" size={18} color="var(--green)" style={{ flexShrink: 0, marginTop: 1 }} />
                <span style={{ fontSize: 13, color: 'var(--text-2)', lineHeight: 1.6 }}>{t}</span>
              </div>
            ))}
          </>
        )}
        {tab === 'schedule' && schedule.map((s, i) => (
          <div key={i} style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: 52 }}>
              <div style={{ background: i === 0 ? 'var(--green)' : 'var(--green-pale)', borderRadius: 8, padding: '6px 8px', width: '100%', textAlign: 'center' }}>
                <span style={{ fontSize: 11, fontWeight: 800, color: i === 0 ? 'white' : 'var(--green)' }}>{s.day}</span>
              </div>
              {i < schedule.length - 1 && <div style={{ width: 2, flex: 1, background: 'var(--green-border)', margin: '4px 0' }} />}
            </div>
            <div className="card" style={{ flex: 1, padding: '10px 12px', marginBottom: 0 }}>
              {s.tasks.map((t, j) => (
                <div key={j} style={{ display: 'flex', gap: 8, alignItems: 'center', paddingBottom: j < s.tasks.length - 1 ? 7 : 0, marginBottom: j < s.tasks.length - 1 ? 7 : 0, borderBottom: j < s.tasks.length - 1 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, color: 'var(--text)' }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── PRODUCTS ──────────────────────────────────────────────────────────────────
function ProductsScreen({ navigate, diseaseId }) {
  const [filter, setFilter] = useState('All')
  const d = DISEASES.find(x => x.id === diseaseId)
  const recIds = d?.fmnProducts || []
  const cats = ['All', 'Fertilizer', 'Fungicide', 'Insecticide', 'Foliar', 'Root Stimulant']
  const filtered = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter)

  return (
    <div className="screen fade-in">
      <div style={{ background: 'var(--green-dark)', padding: '14px 18px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {navigate && <button className="back-btn" onClick={() => navigate('home')}>←</button>}
          <div>
            <div style={{ color: 'white', fontSize: 18, fontWeight: 800 }}>FMN Products</div>
            <div style={{ color: '#A8C4E8', fontSize: 12 }}>Agrochemicals & Fertilizers</div>
          </div>
        </div>
      </div>

      {/* Category filter */}
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '8px 14px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {cats.map(c => (
          <button key={c} onClick={() => setFilter(c)} style={{ padding: '5px 12px', borderRadius: 'var(--radius-full)', border: '1.5px solid', borderColor: filter === c ? 'var(--green)' : 'var(--border)', background: filter === c ? 'var(--green)' : 'var(--bg)', color: filter === c ? 'white' : 'var(--text-2)', fontFamily: 'var(--font)', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>
            {c}
          </button>
        ))}
      </div>

      <div className="content">
        {recIds.length > 0 && filter === 'All' && (
          <div style={{ background: 'var(--green-pale)', borderRadius: 'var(--radius)', padding: '8px 12px', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8, border: '1px solid var(--green-border)' }}>
            <Icon name="star" size={16} color="var(--accent)" />
            <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--green)' }}>Products recommended for {d?.shortName} are starred below</span>
          </div>
        )}
        {filtered.map(p => {
          const isRec = recIds.includes(p.id)
          return (
            <div key={p.id} className="card" style={{ marginBottom: 10, border: isRec ? '2px solid var(--green-border)' : '1.5px solid transparent' }}>
              {isRec && <span className="chip sev-none" style={{ marginBottom: 8, display: 'inline-flex' }}>⭐ Recommended</span>}
              <div style={{ display: 'flex', gap: 12, marginBottom: 8 }}>
                <div style={{ width: 54, height: 54, borderRadius: 14, background: p.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, flexShrink: 0 }}>{p.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 800, fontSize: 14 }}>{p.name}</div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: p.color, background: p.color + '15', padding: '2px 8px', borderRadius: 'var(--radius-full)', display: 'inline-block', marginTop: 2 }}>{p.category}</span>
                  <div style={{ fontSize: 15, fontWeight: 800, color: 'var(--green)', marginTop: 3 }}>{p.price}</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 8 }}>{p.desc}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)', marginBottom: 10 }}>💊 Dosage: {p.dosage}</div>
              <div style={{ display: 'flex', gap: 8 }}>
                <button className="btn btn-primary" style={{ flex: 1, padding: '9px 10px', fontSize: 12 }} onClick={() => navigate('dealers')}>
                  <Icon name="location" size={14} color="white" /> Find in Store
                </button>
                <button className="btn btn-secondary" style={{ flex: 1, padding: '9px 10px', fontSize: 12 }}>
                  <Icon name="phone" size={14} color="var(--green)" /> Order
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── REMINDERS ─────────────────────────────────────────────────────────────────
function RemindersScreen() {
  const [reminders, setReminders] = useState(REMINDERS)
  const [showAdd, setShowAdd] = useState(false)
  const [newTitle, setNewTitle] = useState('')
  const active = reminders.filter(r => r.enabled).length
  const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const [selDays, setSelDays] = useState([])

  const catMeta = { spray: { icon: '💧', color: '#1565C0' }, inspect: { icon: '👁️', color: '#6A1B9A' }, fertilize: { icon: '🌿', color: 'var(--green)' }, water: { icon: '🌧️', color: '#0277BD' }, weed: { icon: '✂️', color: 'var(--accent)' } }

  function add() {
    if (!newTitle.trim()) return
    setReminders(p => [...p, { id: Date.now().toString(), title: newTitle, time: '07:00 AM', days: selDays.join(', ') || 'Mon', category: 'inspect', enabled: true, nextDue: selDays[0] || 'Mon' }])
    setNewTitle(''); setSelDays([]); setShowAdd(false)
  }

  return (
    <div className="screen fade-in">
      <div style={{ background: 'var(--green-dark)', padding: '14px 18px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ color: 'white', fontSize: 20, fontWeight: 800 }}>Reminders</div>
            <div style={{ color: '#A8C4E8', fontSize: 12, marginTop: 2 }}>{active} active tasks</div>
          </div>
          <button onClick={() => setShowAdd(true)} style={{ width: 40, height: 40, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Icon name="plus" size={22} color="white" />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, marginTop: 12 }}>
          {[{ l: 'Active', v: active, c: 'var(--green-light)' }, { l: 'Paused', v: reminders.length - active, c: '#A8C4E8' }, { l: 'Due Today', v: reminders.filter(r => r.nextDue === 'Today' && r.enabled).length, c: '#FFD54F' }].map(s => (
            <div key={s.l} className="card" style={{ textAlign: 'center', padding: '10px 8px' }}>
              <div style={{ fontSize: 20, fontWeight: 800, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="content">
        {reminders.map(r => {
          const meta = catMeta[r.category] || catMeta.inspect
          return (
            <div key={r.id} className="card" style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10, opacity: r.enabled ? 1 : 0.55 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: meta.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0 }}>{meta.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{r.title}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{r.time}  •  {r.days}</div>
                {r.nextDue && <span className={`chip ${r.nextDue === 'Today' ? 'sev-none' : 'sev-moderate'}`} style={{ marginTop: 5, display: 'inline-flex' }}>Next: {r.nextDue}</span>}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'center' }}>
                <button onClick={() => setReminders(p => p.map(x => x.id === r.id ? { ...x, enabled: !x.enabled } : x))} style={{ width: 42, height: 24, borderRadius: 12, background: r.enabled ? 'var(--green-light)' : 'var(--border)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
                  <div style={{ width: 18, height: 18, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: r.enabled ? 21 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
                </button>
                <button onClick={() => setReminders(p => p.filter(x => x.id !== r.id))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-4)', padding: 2 }}>
                  <Icon name="trash" size={15} color="var(--text-4)" />
                </button>
              </div>
            </div>
          )
        })}

        <div className="section-title" style={{ marginTop: 8 }}>FMN Suggested Tasks</div>
        {[{ emoji: '🌿', t: 'Monthly FMN GrowBoost Spray', f: 'Monthly' }, { emoji: '🔍', t: 'Weekly Pest Inspection', f: 'Weekly' }, { emoji: '⚗️', t: 'Seasonal Soil Test', f: 'Every 3 months' }].map((s, i) => (
          <button key={i} onClick={() => setShowAdd(true)} className="card" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, border: 'none', cursor: 'pointer', textAlign: 'left' }}>
            <span style={{ fontSize: 22 }}>{s.emoji}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{s.t}</div>
              <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{s.f}</div>
            </div>
            <div style={{ width: 30, height: 30, borderRadius: '50%', background: 'var(--green-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="plus" size={16} color="var(--green)" />
            </div>
          </button>
        ))}
      </div>

      {/* Add modal */}
      {showAdd && (
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.45)', display: 'flex', alignItems: 'flex-end', zIndex: 100 }} onClick={() => setShowAdd(false)}>
          <div style={{ background: 'white', borderRadius: '20px 20px 0 0', padding: 24, width: '100%' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
              <span style={{ fontSize: 18, fontWeight: 800 }}>Add Reminder</span>
              <button onClick={() => setShowAdd(false)} style={{ background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: 'var(--text-3)' }}>✕</button>
            </div>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)', marginBottom: 6 }}>Task Title</div>
            <input value={newTitle} onChange={e => setNewTitle(e.target.value)} placeholder="e.g. Apply FMN BioGuard Spray" style={{ width: '100%', padding: '10px 12px', borderRadius: 'var(--radius)', border: '1.5px solid var(--border)', fontFamily: 'var(--font)', fontSize: 14, outline: 'none', marginBottom: 14 }} />
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-2)', marginBottom: 8 }}>Repeat Days</div>
            <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
              {DAYS.map(d => (
                <button key={d} onClick={() => setSelDays(p => p.includes(d) ? p.filter(x => x !== d) : [...p, d])} style={{ padding: '6px 12px', borderRadius: 'var(--radius-full)', border: '1.5px solid', borderColor: selDays.includes(d) ? 'var(--green)' : 'var(--border)', background: selDays.includes(d) ? 'var(--green)' : 'var(--bg)', color: selDays.includes(d) ? 'white' : 'var(--text-2)', fontFamily: 'var(--font)', fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{d}</button>
              ))}
            </div>
            <button className="btn btn-primary" style={{ width: '100%' }} onClick={add}>Save Reminder</button>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── HISTORY ───────────────────────────────────────────────────────────────────
function HistoryScreen({ navigate }) {
  const [filter, setFilter] = useState('All')
  const filters = ['All', 'Disease', 'Deficiency', 'Healthy', 'Treated']
  const diseaseIds = ['cmd', 'cbsd', 'cbb']
  const filtered = HISTORY.filter(h => {
    if (filter === 'All') return true
    if (filter === 'Disease') return diseaseIds.includes(h.diseaseId)
    if (filter === 'Deficiency') return h.diseaseId === 'nitrogen'
    if (filter === 'Healthy') return h.diseaseId === 'healthy'
    if (filter === 'Treated') return h.treated
    return true
  })
  return (
    <div className="screen fade-in">
      <div style={{ background: 'var(--green-dark)', padding: '14px 18px 18px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
          <div>
            <div style={{ color: 'white', fontSize: 20, fontWeight: 800 }}>Scan History</div>
            <div style={{ color: '#A8C4E8', fontSize: 12, marginTop: 2 }}>{HISTORY.length} total diagnoses</div>
          </div>
          <button style={{ background: 'rgba(255,255,255,0.12)', border: 'none', borderRadius: 'var(--radius-full)', width: 38, height: 38, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <Icon name="download" size={18} color="white" />
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 6 }}>
          {[{ l: 'Total', v: HISTORY.length, c: 'var(--green-light)' }, { l: 'Diseases', v: HISTORY.filter(h => diseaseIds.includes(h.diseaseId)).length, c: '#FFD54F' }, { l: 'Healthy', v: HISTORY.filter(h => h.diseaseId === 'healthy').length, c: '#90B8E0' }, { l: 'Treated', v: HISTORY.filter(h => h.treated).length, c: '#CE93D8' }].map(s => (
            <div key={s.l} className="card" style={{ textAlign: 'center', padding: '8px 4px' }}>
              <div style={{ fontSize: 18, fontWeight: 800, color: s.c }}>{s.v}</div>
              <div style={{ fontSize: 9, color: 'var(--text-3)' }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '8px 14px', display: 'flex', gap: 6, overflowX: 'auto' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '5px 12px', borderRadius: 'var(--radius-full)', border: '1.5px solid', borderColor: filter === f ? 'var(--green)' : 'var(--border)', background: filter === f ? 'var(--green)' : 'var(--bg)', color: filter === f ? 'white' : 'var(--text-2)', fontFamily: 'var(--font)', fontSize: 12, fontWeight: 700, cursor: 'pointer', whiteSpace: 'nowrap' }}>{f}</button>
        ))}
      </div>
      <div className="content">
        {filtered.map(item => {
          const d = DISEASES.find(x => x.id === item.diseaseId)
          return (
            <button key={item.id} onClick={() => navigate('diagnosis', { diseaseId: item.diseaseId })} className="card" style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8, border: 'none', cursor: 'pointer', textAlign: 'left' }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: d.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 26, flexShrink: 0 }}>{d.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{d.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>📍 {item.field}  •  {item.date}</div>
                <div style={{ display: 'flex', gap: 5, marginTop: 4 }}>
                  <span className={`chip ${d.sevClass}`} style={{ fontSize: 10 }}>{d.severity === 'None' ? 'Healthy' : d.severity}</span>
                  {item.treated && <span className="chip sev-none" style={{ fontSize: 10 }}>✓ Treated</span>}
                </div>
              </div>
              <Icon name="chevron" size={16} color="var(--text-4)" />
            </button>
          )
        })}
        <button className="btn btn-secondary" style={{ width: '100%', marginTop: 6 }} onClick={() => navigate('scan')}>
          <Icon name="scan" size={16} color="var(--green)" /> Perform New Scan
        </button>
      </div>
    </div>
  )
}

// ─── DEALER LOCATOR ────────────────────────────────────────────────────────────
function DealersScreen({ navigate }) {
  const [selected, setSelected] = useState(null)
  return (
    <div className="screen fade-in">
      <div style={{ background: 'var(--green-dark)', padding: '14px 18px 18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button className="back-btn" onClick={() => navigate('home')}>←</button>
          <div>
            <div style={{ color: 'white', fontSize: 18, fontWeight: 800 }}>Find FMN Dealer</div>
            <div style={{ color: '#A8C4E8', fontSize: 12 }}>{DEALERS.length} dealers near you</div>
          </div>
        </div>
      </div>
      {/* Map placeholder */}
      <div style={{ background: '#dce8d8', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(0,0,0,0.04) 40px, rgba(0,0,0,0.04) 41px), repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.04) 40px, rgba(0,0,0,0.04) 41px)' }} />
        {DEALERS.map((d, i) => (
          <button key={d.id} onClick={() => setSelected(d.id === selected ? null : d.id)} style={{ position: 'absolute', top: `${25 + i * 14}%`, left: `${20 + i * 15}%`, width: 36, height: 36, borderRadius: '50%', background: selected === d.id ? 'var(--accent)' : (d.inStock ? 'var(--green)' : '#888'), border: '2.5px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow)' }}>
            <Icon name="location" size={16} color="white" />
          </button>
        ))}
        <div style={{ background: 'rgba(255,255,255,0.9)', borderRadius: 'var(--radius)', padding: '8px 14px', textAlign: 'center' }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--green)' }}>📍 Your Location</div>
          <div style={{ fontSize: 11, color: 'var(--text-3)' }}>Lagos, Lagos State</div>
        </div>
      </div>

      <div className="content">
        <div className="section-title">Nearby Dealers</div>
        {DEALERS.map(d => (
          <div key={d.id} className="card" style={{ marginBottom: 10, border: selected === d.id ? '2px solid var(--green-border)' : '1.5px solid transparent' }}>
            <button onClick={() => setSelected(selected === d.id ? null : d.id)} style={{ width: '100%', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, textAlign: 'left', padding: 0 }}>
              <div style={{ width: 50, height: 50, borderRadius: 14, background: d.inStock ? 'var(--green-pale)' : '#F5F5F5', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, fontSize: 22 }}>🏪</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 800, fontSize: 13 }}>{d.name}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)', marginTop: 2 }}>{d.address}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--green)' }}>📍 {d.distance}</span>
                  <span className={`chip ${d.inStock ? 'sev-none' : ''}`} style={{ fontSize: 10, background: d.inStock ? 'var(--green-pale)' : '#F5F5F5', color: d.inStock ? 'var(--green)' : '#888' }}>
                    {d.inStock ? '● In Stock' : '○ Call First'}
                  </span>
                </div>
              </div>
              <Icon name="chevron" size={16} color="var(--text-4)" style={{ transform: selected === d.id ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>
            {selected === d.id && (
              <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
                <a href={`tel:${d.phone}`} className="btn btn-secondary" style={{ flex: 1, textDecoration: 'none', fontSize: 13 }}>
                  <Icon name="phone" size={15} color="var(--green)" /> {d.phone}
                </a>
                <a href={`https://maps.google.com/?q=${d.lat},${d.lng}`} target="_blank" rel="noreferrer" className="btn btn-primary" style={{ flex: 1, textDecoration: 'none', fontSize: 13 }}>
                  <Icon name="navigate" size={15} color="white" /> Directions
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── PROFILE ───────────────────────────────────────────────────────────────────
function ProfileScreen() {
  const [notif, setNotif] = useState(true)
  const [offline, setOffline] = useState(false)
  const [location, setLocation] = useState(true)

  const Toggle = ({ val, set }) => (
    <button onClick={() => set(!val)} style={{ width: 44, height: 26, borderRadius: 13, background: val ? 'var(--green-light)' : 'var(--border)', border: 'none', cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
      <div style={{ width: 20, height: 20, borderRadius: '50%', background: 'white', position: 'absolute', top: 3, left: val ? 21 : 3, transition: 'left 0.2s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }} />
    </button>
  )

  return (
    <div className="screen fade-in">
      <div style={{ background: 'var(--green-dark)', padding: '20px 18px 24px', textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px', fontSize: 44, border: '3px solid var(--green-light)' }}>👨🏾‍🌾</div>
        <div style={{ color: 'white', fontSize: 20, fontWeight: 800 }}>Oluwayinka Olayinka Paul</div>
        <div style={{ color: '#A8C4E8', fontSize: 13, marginTop: 4 }}>+234 802 345 6789</div>
        <div style={{ color: '#A8C4E8', fontSize: 13, marginTop: 3 }}>📍 Lagos, Lagos State</div>
        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: 'var(--radius-full)', padding: '5px 14px', display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
          <Icon name="star" size={14} color="#FFD54F" />
          <span style={{ color: 'white', fontSize: 12, fontWeight: 600 }}>FMN Farmer  •  Since Jan 2025</span>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8, background: 'var(--green-dark)', padding: '0 14px 16px' }}>
        {[{ l: 'Total Scans', v: HISTORY.length, c: 'var(--green-light)' }, { l: 'Treated', v: HISTORY.filter(h => h.treated).length, c: '#CE93D8' }, { l: 'Farm Size', v: '3.5ha', c: '#FFD54F' }].map(s => (
          <div key={s.l} className="card" style={{ textAlign: 'center', padding: 10 }}>
            <div style={{ fontSize: 18, fontWeight: 800, color: s.c }}>{s.v}</div>
            <div style={{ fontSize: 10, color: 'var(--text-3)' }}>{s.l}</div>
          </div>
        ))}
      </div>

      <div className="content">
        {/* Farm Details */}
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <Icon name="leaf" size={18} color="var(--green)" />
              <span style={{ fontWeight: 800, fontSize: 14 }}>Farm Details</span>
            </div>
            <button style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--green)', fontWeight: 700, fontSize: 12, fontFamily: 'var(--font)' }}>
              <Icon name="edit" size={14} color="var(--green)" /> Edit
            </button>
          </div>
          {[['State', 'Lagos State'], ['LGA', 'Lagos Island'], ['Farm Size', '3.5 Hectares'], ['Crops', 'Cassava, Maize, Soybean']].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', padding: '9px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ flex: 1, fontSize: 13, color: 'var(--text-2)' }}>{l}</span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text)' }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Settings */}
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
            <Icon name="settings" size={18} color="var(--green)" />
            <span style={{ fontWeight: 800, fontSize: 14 }}>App Settings</span>
          </div>
          {[['Push Notifications', 'Reminders and alerts', notif, setNotif], ['Offline Mode', 'Use AI without internet', offline, setOffline], ['Location Services', 'For dealer search', location, setLocation]].map(([l, s, v, set]) => (
            <div key={l} style={{ display: 'flex', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid var(--border)', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700 }}>{l}</div>
                <div style={{ fontSize: 11, color: 'var(--text-3)' }}>{s}</div>
              </div>
              <Toggle val={v} set={set} />
            </div>
          ))}
        </div>

        {/* Links */}
        <div className="card">
          {[['About FMN AgriSense', 'ℹ️'], ['Privacy Policy', '🔒'], ['Contact FMN Support', '🎧'], ['Rate the App', '⭐'], ['Share with Farmers', '📤']].map(([l, e], i, arr) => (
            <button key={l} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none', background: 'none', border: 'none', cursor: 'pointer', textAlign: 'left', borderBottom: i < arr.length - 1 ? '1px solid var(--border)' : 'none', fontFamily: 'var(--font)' }}>
              <span style={{ fontSize: 20 }}>{e}</span>
              <span style={{ flex: 1, fontSize: 14, color: 'var(--text)' }}>{l}</span>
              <Icon name="chevron" size={16} color="var(--text-4)" />
            </button>
          ))}
        </div>

        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--text-4)', marginTop: 16, lineHeight: 1.8 }}>
          FMN AgriSense  •  Version 1.0.0<br />Built for FMN Innovation 5.0  •  March 2026
        </div>
      </div>
    </div>
  )
}

// ─── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState('home')
  const [params, setParams] = useState({})
  const [analyzing, setAnalyzingState] = useState(null)

  function navigate(s, p = {}) {
    setScreen(s)
    setParams(p)
  }

  function startAnalyzing(diseaseId) {
    setAnalyzingState(diseaseId)
    setTimeout(() => {
      setAnalyzingState(null)
      navigate('diagnosis', { diseaseId })
    }, 2800)
  }

  const renderScreen = () => {
    if (analyzing) return <AnalyzingScreen />
    const p = { navigate, ...params }
    switch (screen) {
      case 'home': return <HomeScreen {...p} />
      case 'scan': return <ScanScreen {...p} setAnalyzing={startAnalyzing} />
      case 'diagnosis': return <DiagnosisScreen {...p} diseaseId={params.diseaseId} />
      case 'treatment': return <TreatmentScreen {...p} diseaseId={params.diseaseId} />
      case 'products': return <ProductsScreen {...p} diseaseId={params.diseaseId} />
      case 'reminders': return <RemindersScreen {...p} />
      case 'history': return <HistoryScreen {...p} />
      case 'dealers': return <DealersScreen {...p} />
      case 'profile': return <ProfileScreen {...p} />
      default: return <HomeScreen {...p} />
    }
  }

  const navScreen = analyzing ? 'scan' : screen

  return (
    <div className="app-shell">
      <div className="phone-frame">
        <StatusBar />
        {renderScreen()}
        {!analyzing && (
          <BottomNav
            active={['home', 'scan', 'reminders', 'history', 'profile'].includes(screen) ? screen : 'home'}
            setScreen={s => navigate(s)}
          />
        )}
      </div>
    </div>
  )
}
