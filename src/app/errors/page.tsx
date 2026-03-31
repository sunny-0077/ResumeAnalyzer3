'use client';

import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

export default function ErrorStates() {
  const showToast = (type: string, msg: string) => window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));

  return (
    <div id="page-errors" className="page active">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main">
          <div style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-.02em', marginBottom: '4px' }}>Error States & Rate Limiting</div>
          <p style={{ fontSize: '13px', color: 'var(--text2)', marginBottom: '28px' }}>Pre-designed states for every possible failure — ensuring a premium experience regardless of platform issues.</p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '18px' }}>
            {/* API Error */}
            <div className="error-state show">
              <div className="error-icon"><span className="mat">cloud_off</span></div>
              <div className="error-title">AI service unavailable</div>
              <div className="error-msg">Our analysis engine is experiencing high load. This usually resolves in under 60 seconds.</div>
              <button className="error-retry" onClick={() => showToast('info', 'Retrying...')}>Try Again</button>
            </div>

            {/* PDF Parse Error */}
            <div style={{ background: '#fff', border: '1.5px solid var(--amber-bg)', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
              <div className="rate-icon" style={{ background: 'var(--amber-bg)' }}><span className="mat" style={{ color: 'var(--amber)' }}>description</span></div>
              <div className="error-title">Could not parse PDF</div>
              <div className="error-msg">This PDF appears to be image-based. ATS systems will also reject it for the same reason.</div>
              <div style={{ background: 'var(--amber-bg)', borderRadius: '10px', padding: '12px', marginBottom: '16px', fontSize: '12px', color: 'var(--amber)', fontWeight: 700, textAlign: 'left' }}>💡 Fix: Re-export from Word/Docs as a text-base PDF.</div>
              <button className="btn-primary" style={{ background: 'var(--amber)', boxShadow: 'none' }}>Upload Different File</button>
            </div>

            {/* Rate Limit */}
            <div className="rate-limit-card show" style={{ animation: 'none' }}>
              <div className="rate-icon"><span className="mat">schedule</span></div>
              <div className="rate-title">Daily limit reached</div>
              <div className="rate-msg">You've used your 1 free analysis today. Resets at midnight IST.</div>
              <div className="rate-countdown">08:42:17</div>
              <button className="rate-upgrade" onClick={() => window.dispatchEvent(new CustomEvent('open-upg'))}>Upgrade now ✦</button>
            </div>

            {/* Network Error */}
            <div style={{ background: '#fff', border: '1.5px solid var(--blue-bg)', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
              <div className="rate-icon" style={{ background: 'var(--blue-bg)' }}><span className="mat" style={{ color: 'var(--blue)' }}>wifi_off</span></div>
              <div className="error-title">You're offline</div>
              <div className="error-msg">No internet connection detected. Your draft is saved locally and will sync when you're back online.</div>
              <button className="btn-primary" style={{ background: 'var(--blue)', boxShadow: 'none' }}>I'm Back Online</button>
            </div>

            {/* Payment Failed */}
            <div style={{ background: '#fff', border: '1.5px solid var(--red-bg)', borderRadius: '16px', padding: '28px', textAlign: 'center' }}>
              <div className="rate-icon" style={{ background: 'var(--red-bg)' }}><span className="mat" style={{ color: 'var(--red)' }}>payment</span></div>
              <div className="error-title">Payment failed</div>
              <div className="error-msg">Your transaction was declined. This sometimes happens with prepaid cards.</div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                <button className="btn-primary" style={{ padding: '8px 16px', fontSize: '12px' }}>Retry Payment</button>
                <button className="btn-ghost" style={{ padding: '8px 16px', fontSize: '12px' }}>Try UPI Instead</button>
              </div>
            </div>

            {/* Empty search */}
            <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: '16px', padding: '40px', textAlign: 'center' }}>
              <div style={{ fontSize: '40px', marginBottom: '12px' }}>🔍</div>
              <div className="error-title">No results for "golang salary"</div>
              <div className="error-msg">Try searching for a job title, skill, or city name.</div>
              <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
                {['Go engineer', 'Backend', 'Bangalore'].map(s => (
                  <button key={s} className="salary-chip">{s}</button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
