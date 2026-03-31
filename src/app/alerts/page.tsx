'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription } from '@/hooks/useSubscription';

type Alert = {
  id: number;
  role: string;
  loc: string;
  auto: boolean;
  matches: number;
  active: boolean;
};

const INITIAL_ALERTS: Alert[] = [
  { id: 1, role: 'Senior Product Manager', loc: 'Bangalore, Hybrid', auto: true, matches: 12, active: true },
  { id: 2, role: 'Product Director', loc: 'Remote (India)', auto: false, matches: 3, active: true },
  { id: 3, role: 'Group PM', loc: 'San Francisco, CA', auto: false, matches: 0, active: false }
];

export default function JobAlertsPage() {
  const { tier } = useSubscription();
  const [alerts, setAlerts] = useState<Alert[]>(INITIAL_ALERTS);

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const toggleAlert = (id: number, field: 'auto' | 'active') => {
    if (tier === 'free' && field === 'auto') {
      showToast('info', 'Auto-Apply requires a Pro plan.');
      return;
    }
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, [field]: !a[field] } : a));
    showToast('success', `${field === 'auto' ? 'Auto-Apply' : 'Alert'} setting updated.`);
  };

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div className="pg-hdr" style={{ marginBottom: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>Job Alerts & Auto-Apply</h1>
                <span className="badge" style={{ background: 'var(--tl)', color: '#fff', fontSize: '10px' }}>PRO</span>
              </div>
              <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Set up laser-focused queries and let our AI apply on your behalf.</p>
            </div>
            <button className="btn btn-p" onClick={() => showToast('info', 'Creating new alert...')}>
              <span className="mat" style={{ marginRight: '6px' }}>add</span> New Alert
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '24px' }}>
            {/* Main Area: Alerts List */}
            <div>
              {alerts.map((a, i) => (
                <div key={a.id} className="card afu" style={{ padding: '24px', marginBottom: '16px', borderLeft: a.active ? '3px solid var(--gn)' : '3px solid var(--s3)', opacity: a.active ? 1 : 0.6, animationDelay: `${i * 100}ms` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <h3 style={{ fontSize: '18px', fontWeight: 900, color: 'var(--t1)' }}>{a.role}</h3>
                        {!a.active && <span className="badge" style={{ background: 'var(--s2)', color: 'var(--t3)' }}>Paused</span>}
                      </div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--t2)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className="mat" style={{ fontSize: '16px', color: 'var(--t4)' }}>location_on</span> {a.loc}
                      </div>
                    </div>
                    
                    <div className={`toggle-sw ${a.active ? 'on' : ''}`} onClick={() => toggleAlert(a.id, 'active')} style={{ alignSelf: 'flex-start' }}>
                      <div className="toggle-thumb"></div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--bd)', paddingTop: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--t4)', marginBottom: '4px' }}>NEW MATCHES</div>
                        <div style={{ fontSize: '16px', fontWeight: 900, color: a.matches > 0 ? 'var(--o2)' : 'var(--t1)' }}>{a.matches}</div>
                      </div>
                      <div style={{ height: '32px', width: '1px', background: 'var(--bd)' }}></div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--t2)' }}>Auto-Apply <span className="mat" style={{ fontSize: '14px', color: 'var(--o2)', verticalAlign: 'middle' }}>auto_awesome</span></div>
                        <div className={`toggle-sw ${a.auto ? 'on' : ''}`} onClick={() => toggleAlert(a.id, 'auto')}>
                          <div className="toggle-thumb"></div>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button className="btn btn-g btn-sm" style={{ padding: '8px 12px' }} onClick={() => showToast('info', `Editing ${a.role} alert...`)}>Edit</button>
                      <button className="btn btn-p btn-sm" style={{ padding: '8px 16px' }} onClick={() => showToast('success', `Viewing ${a.matches} matches...`)}>View Matches →</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Sidebar Guidelines */}
            <div className="afu" style={{ animationDelay: '200ms' }}>
              <div className="card" style={{ padding: '24px', background: 'linear-gradient(145deg, var(--s3), var(--s2))', border: '1px solid var(--bd)' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="mat" style={{ color: 'var(--o3)' }}>info</span> Auto-Apply Rules
                </h3>
                <ul style={{ padding: 0, margin: 0, listStyle: 'none' }}>
                  <li style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.6, marginBottom: '12px', display: 'flex', gap: '8px' }}>
                    <span className="mat" style={{ color: 'var(--gn)', fontSize: '18px' }}>check_circle</span>
                    Only applies if Match Score &gt; 80%
                  </li>
                  <li style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.6, marginBottom: '12px', display: 'flex', gap: '8px' }}>
                    <span className="mat" style={{ color: 'var(--gn)', fontSize: '18px' }}>check_circle</span>
                    Auto-generates targeted Cover Letter
                  </li>
                  <li style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.6, display: 'flex', gap: '8px' }}>
                    <span className="mat" style={{ color: 'var(--gn)', fontSize: '18px' }}>check_circle</span>
                    Answers basic screening questions based on your profile
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
