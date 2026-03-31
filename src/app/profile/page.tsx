'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useUser } from '@/context/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';

export default function ProfilePage() {
  const { user } = useUser();
  const { tier } = useSubscription();

  const [profile, setProfile] = useState({
    name: user?.user_metadata?.full_name || 'Charan Kumar',
    title: 'Senior Product Designer',
    exp: '8 Years Experience',
    loc: 'Bangalore, India',
    target: 'Principal Product Architect',
    targetSalary: '₹45.0L',
    cos: 'Google, Stripe, Atlassian',
    bio: 'Strategic designer focused on building scalable design systems and high-conversion user interfaces for fintech and SaaS platforms. 8+ years shipping products at scale.'
  });

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const goals = [
    { done: true, title: 'Resume Mastered', detail: 'v4 scored 92% Match Score for Stripe Role.' },
    { done: true, title: 'Interview Ready', detail: 'Mock Technical session completed with 82/100.' },
    { done: false, title: 'Apply to 3 Target Companies', detail: '0 of 3 applications submitted.' },
    { done: false, title: 'Complete Salary Research', detail: 'View salary benchmarks for your target role.' },
    { done: false, title: 'Land an Offer', detail: 'The final goal — you\'ve got this!' },
  ];

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div className="pg-hdr" style={{ marginBottom: 0 }}>
              <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>Career Profile</h1>
              <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Manage your identity and career target metrics.</p>
            </div>
            <button className="btn btn-s btn-sm" onClick={() => showToast('info', 'Editing profile...')}>
              <span className="mat" style={{ fontSize: '14px', marginRight: '6px' }}>edit</span> Edit Profile
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px', marginTop: '32px' }}>
            {/* MAIN PORTION */}
            <div>
              <div className="card afu" style={{ marginBottom: '16px', padding: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '20px' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--s2), var(--s3))', border: '3px solid var(--w)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', fontWeight: 800, color: 'var(--t2)', flexShrink: 0, boxShadow: 'var(--sh3)' }}>
                    {profile.name[0].toUpperCase()}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '22px', fontWeight: 800, letterSpacing: '-.02em', marginBottom: '3px' }}>{profile.name}</div>
                    <div style={{ fontSize: '14px', color: 'var(--t2)', fontWeight: 600, marginBottom: '12px' }}>{profile.title}</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span className="badge" style={{ background: 'var(--gbg)', color: 'var(--gn)' }}><span className="mat" style={{ fontSize: '13px', marginRight: '4px' }}>work_history</span> {profile.exp}</span>
                      <span className="badge" style={{ background: 'var(--pbg)', color: 'var(--pu)' }}><span className="mat" style={{ fontSize: '13px', marginRight: '4px' }}>location_on</span> {profile.loc}</span>
                      {tier === 'pro' && <span className="badge" style={{ background: 'var(--o6)', color: 'var(--o2)' }}>Pro Plan ✦</span>}
                      {tier === 'advanced' && <span className="badge" style={{ background: 'var(--bbg)', color: 'var(--bl)' }}>Advanced Plan</span>}
                    </div>
                  </div>
                </div>
                <div style={{ marginTop: '20px', borderTop: '1px solid var(--bd)', paddingTop: '16px' }}>
                  <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--t3)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span className="mat" style={{ fontSize: '14px' }}>person</span> PROFESSIONAL BIO
                  </div>
                  <div style={{ fontSize: '14px', color: 'var(--t2)', lineHeight: 1.7 }}>{profile.bio}</div>
                </div>
              </div>

              {/* Goal Progress */}
              <div className="card afu" style={{ padding: '24px', animationDelay: '100ms' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ fontSize: '14px', fontWeight: 800 }}>Goal Progress</div>
                  <span className="badge" style={{ background: 'var(--gbg)', color: 'var(--gn)' }}>{goals.filter(g => g.done).length} of {goals.length} complete</span>
                </div>
                {goals.map((g, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '12px 0', borderBottom: i !== goals.length - 1 ? '1px solid var(--bd)' : 'none' }}>
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: g.done ? 'var(--gn)' : 'var(--s2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: '2px' }}>
                      {g.done && <span className="mat" style={{ fontSize: '11px', color: '#fff' }}>check</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '13px', fontWeight: 700, color: 'var(--t1)', opacity: g.done ? 1 : 0.8, marginBottom: '2px' }}>{g.title}</div>
                      <div style={{ fontSize: '12px', color: 'var(--t3)' }}>{g.detail}</div>
                    </div>
                    {!g.done && (
                      <button className="btn btn-g btn-sm" style={{ fontSize: '11px', padding: '6px 10px', flexShrink: 0 }} onClick={() => showToast('info', `Starting: ${g.title}`)}>
                        Start →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SIDEBAR */}
            <div className="afu" style={{ animationDelay: '150ms' }}>
              <div className="card" style={{ marginBottom: '16px', padding: '24px' }}>
                <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--o2)', marginBottom: '4px' }}>CAREER TARGET</div>
                
                <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t3)', marginBottom: '5px', marginTop: '16px' }}>TARGET TITLE</div>
                <div style={{ fontSize: '16px', fontWeight: 800, color: 'var(--t1)' }}>{profile.target}</div>
                
                <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t3)', marginBottom: '5px', marginTop: '16px' }}>TARGET SALARY (CTC)</div>
                <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--gn)' }}>
                  {profile.targetSalary} <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--t3)' }}>Per Annum</span>
                </div>
                
                <div style={{ fontSize: '10px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t3)', marginBottom: '8px', marginTop: '16px' }}>TARGET COMPANIES</div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {profile.cos.split(',').map(co => (
                    <span key={co} className="badge" style={{ background: 'var(--s2)', color: 'var(--t2)', fontWeight: 700 }}>{co.trim()}</span>
                  ))}
                </div>
                
                <button className="btn btn-g btn-sm" style={{ width: '100%', marginTop: '20px', borderRadius: '10px' }} onClick={() => showToast('info', 'Editing career targets...')}>
                  <span className="mat" style={{ fontSize: '14px', marginRight: '6px' }}>edit</span> Update Targets
                </button>
              </div>

              {/* AI Personalization */}
              <div style={{ background: 'var(--o7)', border: '1px solid var(--o5)', borderRadius: '16px', padding: '20px', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <span className="mat" style={{ fontSize: '16px', color: 'var(--o3)' }}>auto_awesome</span>
                  <div style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--o2)' }}>AI PERSONALIZATION</div>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.6 }}>
                  "We're using your <strong style={{color:'var(--t1)'}}>{profile.exp}</strong> of experience and target as a <strong style={{color:'var(--t1)'}}>{profile.target}</strong> to customize your AI-generated cover letters and interview questions."
                </div>
              </div>

              {/* Linked Accounts */}
              <div className="card" style={{ padding: '20px' }}>
                <div style={{ fontSize: '13px', fontWeight: 800, marginBottom: '16px' }}>Linked Accounts</div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: 'var(--gbg)', borderRadius: '12px', marginBottom: '10px', cursor: 'pointer' }} onClick={() => showToast('success', 'LinkedIn already linked ✓')}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: '#0077b5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="mat" style={{ fontSize: '16px', color: '#fff' }}>link</span>
                  </div>
                  <div style={{ flex: 1, fontSize: '14px', fontWeight: 700, color: 'var(--gn)' }}>LinkedIn Linked</div>
                  <span className="mat" style={{ fontSize: '20px', color: 'var(--gn)' }}>check_circle</span>
                </div>
                
                <div 
                  style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', border: '1px dashed var(--bd)', borderRadius: '12px', cursor: 'pointer', transition: 'all 150ms' }} 
                  onClick={() => showToast('info', 'Connect GitHub account...')}
                  onMouseOver={e => e.currentTarget.style.borderColor = 'var(--o4)'}
                  onMouseOut={e => e.currentTarget.style.borderColor = 'var(--bd)'}
                >
                  <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--s2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <span className="mat" style={{ fontSize: '16px', color: 'var(--t3)' }}>code</span>
                  </div>
                  <div style={{ flex: 1, fontSize: '14px', fontWeight: 700, color: 'var(--t3)' }}>Connect GitHub</div>
                  <span className="mat" style={{ fontSize: '20px', color: 'var(--t4)' }}>add_circle_outline</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
