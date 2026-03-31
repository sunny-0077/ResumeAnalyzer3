'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useUser } from '@/context/AuthContext';

export default function CareerPathPredictor() {
  const { user } = useUser();
  const [currentRole, setCurrentRole] = useState('Senior Product Manager');
  const [targetRole, setTargetRole] = useState('Product Director');

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const timeline = [
    { time: 'Current: 2022 – Present', title: 'Senior Product Manager', org: 'Google · Leading primary search UX experiments and core ranking features.', salary: null, skills: [], curr: true, goal: false },
    { time: 'Goal #1 · Estimated 2026', title: 'Principal Product Manager', org: 'Meta / Stripe · Focus on strategy, high-level roadmapping, and mentorship.', salary: '₹65L – ₹80L', skills: ['System Design', 'Strategic Planning', 'Leadership'], curr: false, goal: false },
    { time: 'Goal #2 · Estimated 2028', title: 'Product Director', org: 'Global Tech · Executive leadership, P&L responsibility, and organizational scale.', salary: '₹1.1Cr+', skills: ['Product Org Scale', 'Financial Analysis', 'Executive Comm'], curr: false, goal: false },
    { time: 'North Star · Estimated 2031', title: 'VP of Product / CPO', org: 'Unicorn SaaS · C-Suite leadership at a multi-billion dollar scale.', salary: 'Equity Focus', skills: ['Public Markets', 'Investor Relations', 'Visionary Leadership'], curr: false, goal: true },
  ];

  const skillGaps = [
    { skill: 'System Design', pct: 35, color: 'var(--rd)' },
    { skill: 'P&L Management', pct: 50, color: 'var(--am)' },
    { skill: 'Executive Communication', pct: 65, color: 'var(--o3)' },
    { skill: 'Org Scaling', pct: 70, color: 'var(--bl)' },
  ];

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div className="pg-hdr" style={{ marginBottom: 0 }}>
              <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)', display: 'flex', alignItems: 'center', gap: '12px' }}>
                Career Path Predictor 🗺
                <span style={{ fontSize: '12px', fontWeight: 700, padding: '4px 10px', borderRadius: '999px', background: 'var(--pbg)', color: 'var(--pu)', verticalAlign: 'middle', letterSpacing: '.05em' }}>AI VISION</span>
              </h1>
            </div>
          </div>

          <div className="cp-layout">
            {/* MAIN PORTION */}
            <div>
              <div className="card" style={{ marginBottom: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800 }}>AI Predicted Path to {targetRole}</div>
                  <span className="badge" style={{ background: 'var(--gbg)', color: 'var(--gn)' }}>92% SUCCESS PROBABILITY</span>
                </div>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '24px', background: 'var(--sf)', borderRadius: '14px', padding: '14px' }}>
                  <div className="inp-w" style={{ marginBottom: 0 }}>
                    <label className="inp-lbl">Current Role</label>
                    <input className="inp" type="text" value={currentRole} onChange={e => setCurrentRole(e.target.value)} style={{ background: 'var(--w)' }} />
                  </div>
                  <div className="inp-w" style={{ marginBottom: 0 }}>
                    <label className="inp-lbl">Target Role</label>
                    <input className="inp" type="text" value={targetRole} onChange={e => setTargetRole(e.target.value)} style={{ background: 'var(--w)' }} />
                  </div>
                  <div className="inp-w" style={{ marginBottom: 0, gridColumn: '1/-1' }}>
                    <button className="btn btn-p btn-sm" style={{ width: '100%' }} onClick={() => showToast('success', 'Career path recalculated!')}>
                      <span className="mat" style={{ marginRight: '6px' }}>trending_up</span> Recalculate Path
                    </button>
                  </div>
                </div>

                <div className="cp-timeline" style={{ position: 'relative', paddingLeft: '24px' }}>
                  <div className="cp-line" style={{ position: 'absolute', left: '11px', top: '24px', bottom: '0', width: '2px', background: 'var(--s3)' }}></div>
                  
                  {timeline.map((node, i) => (
                    <div key={i} className="cp-node" style={{ position: 'relative', marginBottom: '32px' }}>
                      <div className={`cp-dot ${node.curr ? 'curr' : node.goal ? 'goal' : ''}`} style={{
                        position: 'absolute', left: '-29px', top: '4px', width: '16px', height: '16px', borderRadius: '50%',
                        background: node.curr ? 'var(--gn)' : node.goal ? 'var(--o2)' : 'var(--w)',
                        border: node.curr ? 'none' : node.goal ? 'none' : '2px solid var(--o3)',
                        boxShadow: node.curr ? '0 0 12px var(--gn)' : node.goal ? '0 0 16px var(--o2)' : 'none',
                        zIndex: 2
                      }}></div>
                      
                      <div className={`cp-card ${node.goal ? 'goal-card' : ''}`} style={{
                        background: node.goal ? 'linear-gradient(135deg, var(--o2), var(--o3))' : 'var(--w)',
                        color: node.goal ? '#fff' : 'var(--t1)',
                        border: node.goal ? 'none' : '1.5px solid var(--bd)',
                        borderRadius: '16px', padding: '20px',
                        boxShadow: node.goal ? 'var(--sh-or)' : 'var(--sh1)',
                      }}>
                        <div className="cp-time" style={{ fontSize: '12px', fontWeight: 800, color: node.goal ? 'rgba(255,255,255,0.8)' : 'var(--t3)', marginBottom: '8px' }}>{node.time}</div>
                        <div className="cp-title" style={{ fontSize: '18px', fontWeight: 900, marginBottom: '6px' }}>{node.title}</div>
                        <div className="cp-salary" style={{ fontSize: '14px', lineHeight: 1.6, color: node.goal ? 'rgba(255,255,255,0.9)' : 'var(--t2)' }}>
                          {node.org}
                          {node.salary && <><br/><strong style={node.goal ? {color: '#fff'} : {color: 'var(--o2)'}}>Estimated Pay: {node.salary}</strong></>}
                        </div>
                        {node.skills && node.skills.length > 0 && (
                          <div className="cp-skills-row" style={{ marginTop: '12px', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                            {node.skills.map(s => (
                              <span key={s} className="cp-skill-chip" style={{
                                fontSize: '11px', fontWeight: 800, padding: '4px 10px', borderRadius: '999px',
                                background: node.goal ? 'rgba(255,255,255,0.2)' : 'var(--s2)',
                                color: node.goal ? '#fff' : 'var(--t2)'
                              }}>{s}</span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* SIDEBAR */}
            <div>
              <div className="card" style={{ background: 'linear-gradient(135deg, var(--o1), var(--o2), var(--o3))', padding: '28px', color: '#fff', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,0.8)' }}>
                  <span className="mat" style={{ fontSize: '18px' }}>auto_awesome</span> AI Strategic Brief
                </div>
                <div style={{ fontSize: '15px', lineHeight: 1.6, marginBottom: '24px', opacity: 0.95 }}>
                  Based on your current trajectory and the massive adoption of AI in Product Management, your fastest path to <strong style={{color:'#fff'}}>Director level entails focusing on Technical Growth and Scale Ops.</strong>
                </div>
                
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <span className="mat" style={{ color: 'var(--gbg)', fontSize: '20px' }}>check_circle</span>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '4px' }}>Learn System Design</h4>
                    <p style={{ fontSize: '13px', opacity: 0.8 }}>Crucial for Stripe/Meta transitions.</p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
                  <span className="mat" style={{ color: 'var(--gbg)', fontSize: '20px' }}>check_circle</span>
                  <div>
                    <h4 style={{ fontSize: '14px', fontWeight: 800, marginBottom: '4px' }}>Lead an Infrastructure Project</h4>
                    <p style={{ fontSize: '13px', opacity: 0.8 }}>Demonstrate P&L or efficiency gains.</p>
                  </div>
                </div>
                
                <button 
                  style={{ width:'100%', padding:'12px', background:'#fff', border:'none', borderRadius:'12px', fontSize:'13px', fontWeight: 800, cursor:'pointer', color:'var(--o2)', transition:'opacity 150ms' }}
                  onMouseOver={e => e.currentTarget.style.opacity = '0.9'}
                  onMouseOut={e => e.currentTarget.style.opacity = '1'}
                  onClick={() => showToast('info', 'Personalized path analysis starting...')}
                >
                  Personalize Path Analysis
                </button>
              </div>

              <div className="card" style={{ marginBottom: '16px', padding: '24px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 800, marginBottom: '16px' }}>Top Peer Comparisons</h3>
                {[
                  { role: 'Product Director', pay: 'Avg. Pay: ₹1.2Cr', rank: 'Top 5% Peer Rank', status: 'ON_TRACK', rc: 'var(--o2)', sbg: 'var(--o6)' },
                  { role: 'Group PM', pay: 'Avg. Pay: ₹85L', rank: 'Top 2% Peer Rank', status: 'EXCEEDING', rc: 'var(--gn)', sbg: 'var(--gbg)' },
                ].map((p, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: i === 0 ? '1px solid var(--bd)' : 'none' }}>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--t1)', marginBottom: '4px' }}>{p.role}</div>
                      <div style={{ fontSize: '12px', color: 'var(--t3)', fontWeight: 600 }}>{p.pay}</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ background: p.sbg, color: p.rc, padding: '4px 10px', borderRadius: '999px', fontSize: '10px', fontWeight: 800, marginBottom: '6px' }}>{p.rank}</div>
                      <div style={{ fontSize: '10px', fontWeight: 800, color: 'var(--t3)' }}>{p.status}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card" style={{ padding: '24px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ color: 'var(--am)' }}>⚠</span> Priority Skill Gaps
                </div>
                {skillGaps.map((g, i) => (
                  <div key={i} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 700, marginBottom: '8px' }}>
                      <span>{g.skill}</span>
                      <span style={{ color: g.color }}>{g.pct}%</span>
                    </div>
                    <div style={{ background: 'var(--s2)', height: '6px', borderRadius: '999px', overflow: 'hidden' }}>
                      <div style={{ width: `${g.pct}%`, background: g.color, height: '100%', borderRadius: '999px' }}></div>
                    </div>
                  </div>
                ))}
                <button 
                  className="btn btn-s btn-sm" 
                  style={{ width: '100%', marginTop: '8px', borderRadius: '10px' }}
                  onClick={() => showToast('info', 'Taking skill assessment...')}
                >
                  Take Skill Assessment →
                </button>
              </div>
            </div>
          </div>
          
          <style jsx>{`
            .cp-layout {
              display: grid;
              grid-template-columns: 1fr 340px;
              gap: 24px;
            }
          `}</style>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
