'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useUser } from '@/context/AuthContext';

export default function ReferralsPage() {
  const { user } = useUser();
  const userName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    `user-${user?.id?.slice(0,6)}` ||
    "user";

  const referralLink = `https://profilepro.ai/r/${userName}`;

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const copyLink = () => {
    navigator.clipboard?.writeText(referralLink).catch(() => {});
    showToast('success', 'Referral link copied to clipboard!');
  };

  const stats = [
    { val: 3, lbl: 'Total Referrals' },
    { val: 9, lbl: 'Free Analyses Earned' },
    { val: 2, lbl: 'Active Trials' },
    { val: '₹1,497', lbl: 'Value Generated' }
  ];

  const milestones = [
    { n: 1, reward: '3 free analyses', done: true },
    { n: 5, reward: '1 month Pro free', done: false },
    { n: 10, reward: 'Lifetime 20% discount', done: false }
  ];

  const referrals = [
    { name: 'Priya Sharma', email: 'priya@gmail.com', date: 'Jan 18, 2026', status: 'Signed up', sc: 'var(--gn)', sg: 'var(--gbg)' },
    { name: 'Rahul Verma', email: 'rahul@gmail.com', date: 'Jan 22, 2026', status: 'Signed up', sc: 'var(--gn)', sg: 'var(--gbg)' },
    { name: 'Anita Reddy', email: 'anita@gmail.com', date: 'Jan 25, 2026', status: 'Trial active', sc: 'var(--o2)', sg: 'var(--o6)' },
  ];

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div className="pg-hdr">
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>Refer & Earn</h1>
            <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Share ProfilePro AI with friends. Every signup earns you 3 extra free analyses.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '24px' }}>
            <div>
              {/* Referral link banner */}
              <div style={{ 
                background: 'linear-gradient(135deg, var(--o1), var(--o2), var(--o3))', 
                borderRadius: '24px', padding: '32px', color: '#fff', marginBottom: '20px', 
                position: 'relative', overflow: 'hidden' 
              }}>
                <div style={{ 
                  position: 'absolute', inset: 0, opacity: 0.06, 
                  backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)', 
                  backgroundSize: '24px 24px' 
                }}></div>
                <div style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,0.6)', marginBottom: '10px', position: 'relative', zIndex: 1 }}>
                  YOUR REFERRAL LINK
                </div>
                <div style={{ fontSize: '24px', fontWeight: 900, marginBottom: '8px', position: 'relative', zIndex: 1 }}>
                  Invite friends, earn free analyses
                </div>
                <div style={{ fontSize: '15px', opacity: 0.9, lineHeight: 1.6, marginBottom: '24px', position: 'relative', zIndex: 1, fontWeight: 500 }}>
                  For every friend who signs up using your link, you get <strong style={{ color: '#fff' }}>3 extra free analyses</strong>. They get a <strong style={{ color: '#fff' }}>2-week Pro trial free</strong>.
                </div>
                
                <div style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '14px', padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '10px', position: 'relative', zIndex: 1 }}>
                  <div style={{ flex: 1, fontSize: '15px', fontWeight: 800, color: 'rgba(255,255,255,0.95)' }}>
                    {referralLink}
                  </div>
                  <button 
                    style={{ background: 'rgba(255,255,255,0.2)', border: 'none', borderRadius: '10px', padding: '8px 16px', fontSize: '13px', fontWeight: 800, color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', transition: 'background 150ms' }}
                    onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.35)'}
                    onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'}
                    onClick={copyLink}
                  >
                    <span className="mat" style={{ fontSize: '16px' }}>content_copy</span> Copy
                  </button>
                </div>
              </div>

              {/* Share buttons */}
              <div className="card afu" style={{ marginBottom: '20px', padding: '24px', animationDelay: '100ms' }}>
                <div style={{ fontSize: '15px', fontWeight: 800, marginBottom: '16px' }}>Share via</div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <button className="btn" style={{ background: 'var(--bl)', color: '#fff', borderRadius: '12px', padding: '12px 24px', fontWeight: 800 }} onClick={() => showToast('success', 'Opening LinkedIn...')}>
                    <span className="mat" style={{ fontSize: '18px', marginRight: '6px' }}>share</span> LinkedIn
                  </button>
                  <button className="btn" style={{ background: '#25D366', color: '#fff', borderRadius: '12px', padding: '12px 24px', fontWeight: 800 }} onClick={() => showToast('success', 'Opening WhatsApp...')}>
                    <span className="mat" style={{ fontSize: '18px', marginRight: '6px' }}>chat</span> WhatsApp
                  </button>
                  <button className="btn" style={{ background: '#000', color: '#fff', borderRadius: '12px', padding: '12px 24px', fontWeight: 800 }} onClick={() => showToast('success', 'Opening X...')}>
                    𝕏 Twitter / X
                  </button>
                  <button className="btn btn-g" style={{ borderRadius: '12px', padding: '12px 24px', fontWeight: 800 }} onClick={() => showToast('success', 'Opening email...')}>
                    <span className="mat" style={{ fontSize: '18px', marginRight: '6px' }}>mail</span> Email
                  </button>
                </div>
              </div>

              {/* Referred users list */}
              <div className="card afu" style={{ padding: '24px', animationDelay: '200ms' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ fontSize: '15px', fontWeight: 800 }}>Referred Friends (3)</div>
                  <span className="badge" style={{ background: 'var(--gbg)', color: 'var(--gn)', fontWeight: 800 }}>+9 analyses earned</span>
                </div>
                
                {referrals.map((r, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '16px 0', borderBottom: i !== referrals.length - 1 ? '1px solid var(--bd)' : 'none' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--o2), var(--o3))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '15px', fontWeight: 800, flexShrink: 0 }}>
                      {r.name[0]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--t1)' }}>{r.name}</div>
                      <div style={{ fontSize: '12px', color: 'var(--t3)', fontWeight: 600 }}>{r.email} · Joined {r.date}</div>
                    </div>
                    <span className="badge" style={{ background: r.sg, color: r.sc, fontWeight: 800 }}>{r.status}</span>
                    <span style={{ fontSize: '15px', fontWeight: 900, color: 'var(--gn)', marginLeft: '8px' }}>+3</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats sidebar */}
            <div className="afu" style={{ animationDelay: '150ms' }}>
              <div className="card" style={{ marginBottom: '20px', padding: '24px' }}>
                <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '16px' }}>Your Referral Stats</div>
                {stats.map((s, i) => (
                  <div key={i} style={{ padding: '14px 0', borderBottom: i !== stats.length - 1 ? '1px solid var(--bd)' : 'none' }}>
                    <div style={{ fontSize: '28px', fontWeight: 900, color: 'var(--o2)', letterSpacing: '-.02em' }}>{s.val}</div>
                    <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t4)', marginTop: '2px' }}>{s.lbl}</div>
                  </div>
                ))}
              </div>

              {/* Milestones */}
              <div style={{ background: 'var(--o6)', border: '1.5px solid var(--o5)', borderRadius: '16px', padding: '24px' }}>
                <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--o2)', marginBottom: '10px' }}>🏆 Referral Milestones</div>
                {milestones.map((m, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px', fontSize: '13px', fontWeight: 600 }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: m.done ? 'var(--gn)' : 'var(--w)', border: m.done ? 'none' : '1.5px solid var(--bd)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {m.done && <span className="mat" style={{ fontSize: '14px', color: '#fff', fontWeight: 900 }}>check</span>}
                    </div>
                    <span style={{ color: 'var(--t1)' }}>
                      <strong style={{ color: 'var(--o3)' }}>{m.n} referral{m.n > 1 ? 's' : ''}</strong> → {m.reward}
                    </span>
                  </div>
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
