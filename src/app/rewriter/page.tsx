'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription } from '@/hooks/useSubscription';

export default function AIRewriterPage() {
  const { tier } = useSubscription();
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const handleRewrite = () => {
    if (tier === 'free') {
      showToast('error', 'AI Rewriter requires a Pro or Advanced plan. Please upgrade to use this feature.');
      return;
    }
    if (!input.trim()) {
      showToast('error', 'Please enter a bullet point to rewrite.');
      return;
    }
    
    setLoading(true);
    setResult(null);
    
    // Simulate AI loading
    setTimeout(() => {
      setLoading(false);
      setResult(`Spearheaded the integration of Next.js and React components across 11 high-fidelity applications, reducing development turnaround time by 40% and ensuring 100% adherence to the Kinetic Design system.` );
      showToast('success', 'Bullet point rewritten!');
    }, 1500);
  };

  const copyResult = () => {
    if (result) {
      navigator.clipboard?.writeText(result).catch(() => {});
      showToast('success', 'Copied to clipboard!');
    }
  };

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div className="pg-hdr" style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
              <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>AI Bullet Rewriter</h1>
              <span style={{ fontSize: '11px', fontWeight: 900, padding: '4px 10px', borderRadius: '6px', background: 'var(--t1)', color: '#fff' }}>PRO</span>
            </div>
            <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Transform weak bullet points into high-impact, ATS-optimized achievements.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 340px', gap: '24px' }}>
            {/* Main Area */}
            <div>
              <div className="card afu" style={{ padding: '32px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 800, color: 'var(--t1)' }}>Original Bullet Point</label>
                  <span style={{ fontSize: '12px', fontWeight: 700, color: 'var(--t4)' }}>Max 300 chars</span>
                </div>
                <textarea 
                  className="inp-ans-area" 
                  style={{ width: '100%', height: '140px', padding: '16px', borderRadius: '16px', background: 'var(--s1)', border: '1.5px solid var(--bd)', fontSize: '15px', color: 'var(--t1)', lineHeight: 1.6, resize: 'none' }}
                  placeholder="e.g., I managed a team of developers to build a new feature for our web app."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                />
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button className="btn btn-p" onClick={handleRewrite} disabled={loading} style={{ padding: '14px 32px', fontSize: '15px' }}>
                    {loading ? (
                      <><span className="mat spin" style={{ marginRight: '8px' }}>autorenew</span> Rewriting...</>
                    ) : (
                      <><span className="mat" style={{ marginRight: '8px' }}>auto_awesome</span> Rewrite this Bullet</>
                    )}
                  </button>
                </div>
              </div>

              {result && (
                <div className="card afu" style={{ padding: '32px', border: '2px solid var(--o3)', background: 'var(--o7)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="mat" style={{ color: 'var(--o2)', fontSize: '20px' }}>check_circle</span>
                      <label style={{ fontSize: '14px', fontWeight: 900, color: 'var(--o2)', textTransform: 'uppercase', letterSpacing: '.05em' }}>ATS-Optimized Result</label>
                    </div>
                    <button className="btn btn-s btn-sm" onClick={copyResult} style={{ background: '#fff' }}>
                      <span className="mat" style={{ fontSize: '16px', marginRight: '6px' }}>content_copy</span> Copy
                    </button>
                  </div>
                  <div style={{ fontSize: '18px', lineHeight: 1.7, fontWeight: 700, color: 'var(--t1)', padding: '16px', background: '#fff', borderRadius: '16px', border: '1px solid var(--o5)', boxShadow: 'var(--sh1)' }}>
                    {result}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Guidelines */}
            <div className="afu" style={{ animationDelay: '100ms' }}>
              <div className="card" style={{ padding: '24px', background: 'var(--t1)', color: '#fff' }}>
                <h3 style={{ fontSize: '16px', fontWeight: 900, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="mat" style={{ color: 'var(--o2)' }}>tips_and_updates</span>
                  Formula for Success
                </h3>
                
                <div style={{ marginBottom: '20px' }}>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--o2)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '6px' }}>Action Verb</strong>
                  <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: 1.5 }}>Start with a strong verb that highlights leadership or initiative (e.g., Spearheaded, Orchestrated, Engineered).</p>
                </div>
                
                <div style={{ marginBottom: '20px' }}>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--o2)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '6px' }}>Metrics & Impact</strong>
                  <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: 1.5 }}>Include quantifiable results (%, ₹, time, volume) to prove your impact.</p>
                </div>

                <div>
                  <strong style={{ display: 'block', fontSize: '13px', color: 'var(--o2)', textTransform: 'uppercase', letterSpacing: '.05em', marginBottom: '6px' }}>Context / Method</strong>
                  <p style={{ fontSize: '14px', opacity: 0.9, lineHeight: 1.5 }}>Briefly mention the tools, scale, or situation (e.g., using React, across 11 modules).</p>
                </div>
              </div>
            </div>
          </div>

          <style jsx>{`
            .spin { animation: slowspin 1.5s linear infinite; }
            @keyframes slowspin { 100% { transform: rotate(360deg); } }
          `}</style>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
