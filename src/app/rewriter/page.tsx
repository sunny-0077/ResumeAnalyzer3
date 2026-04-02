'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription } from '@/hooks/useSubscription';
import { useUser } from '@/context/AuthContext';
import { createClient } from '@/utils/supabase/client';
import { useEffect } from 'react';
import { track } from '@/lib/utils';

export default function AIRewriterPage() {
  const { tier } = useSubscription();
  const { user } = useUser();
  const supabase = createClient();
  const [input, setInput] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState<any[]>([]);
  const [cooldown, setCooldown] = useState(false);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        handleRewrite();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [input, cooldown, tier]);

  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        const { data } = await supabase.from('user_rewrites').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(5);
        if (data) setHistory(data);
      }
    };
    fetchHistory();
  }, [user, supabase]);

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const handleRewrite = () => {
    if (cooldown) return;
    if (tier === 'free') {
      showToast('error', 'AI Rewriter requires a Pro or Advanced plan. Please upgrade to use this feature.');
      return;
    }
    if (!input || input.trim().length < 20) {
      showToast('error', 'Bullet point too short (min 20 chars).');
      return;
    }
    
    setLoading(true);
    setCooldown(true);
    track('rewrite_clicked', { plan: tier || 'free' });
    
    // Simulate AI loading
    setTimeout(async () => {
      let optimizedStr = `Spearheaded the integration of Next.js and React components across 11 high-fidelity applications, reducing development turnaround time by 40% and ensuring 100% adherence to the Kinetic Design system.`;
      
      if (optimizedStr.length > 900) {
        optimizedStr = optimizedStr.slice(0, 900) + "...";
      }
      
      setResult(optimizedStr);
      
      if (user) {
        await supabase.from('user_rewrites').insert({
          user_id: user.id,
          original_text: input,
          optimized_text: optimizedStr
        });
      }

      setLoading(false);
      showToast('success', 'Bullet point rewritten & saved!');
      setTimeout(() => setCooldown(false), 1500);
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
                  style={{ width: '100%', minHeight: '140px', padding: '16px', borderRadius: '16px', background: 'var(--s1)', border: '1.5px solid var(--bd)', fontSize: '15px', color: 'var(--t1)', lineHeight: 1.6, resize: 'none', overflow: 'hidden' }}
                  placeholder="e.g., I managed a team of developers to build a new feature for our web app."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onInput={(e: any) => {
                    e.target.style.height = 'auto';
                    e.target.style.height = e.target.scrollHeight + 'px';
                  }}
                />
                
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                  <button className="btn btn-p" onClick={handleRewrite} disabled={loading || cooldown} style={{ padding: '14px 32px', fontSize: '15px' }}>
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

            {/* Sidebar History */}
            <div className="afu" style={{ animationDelay: '100ms' }}>
              <div className="card" style={{ padding: '24px', background: 'var(--t1)', color: '#fff', marginBottom: '16px' }}>
                <h3 style={{ fontSize: '15px', fontWeight: 900, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="mat" style={{ color: 'var(--o2)' }}>history</span>
                  Latest Rewrites
                </h3>
                {history.length > 0 ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {history.map((h, i) => (
                      <div key={i} style={{ padding: '12px', background: 'rgba(255,255,255,0.1)', borderRadius: '12px', fontSize: '12px' }}>
                        <p style={{ opacity: 0.6, fontSize: '10px', marginBottom: '4px' }}>{new Date(h.created_at).toLocaleDateString()}</p>
                        <p style={{ fontWeight: 600, lineHeight: 1.4 }}>{h.optimized_text.substring(0, 60)}...</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ fontSize: '13px', opacity: 0.7 }}>No previous rewrites found. Start optimizing to see your history here.</p>
                )}
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
