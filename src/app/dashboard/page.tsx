'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useUser } from '@/context/AuthContext';
import { createClient } from '@/utils/supabase/client';
import Link from 'next/link';

export default function Dashboard() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [stats, setStats] = useState({ resumes: 0, bestMatch: 0, coverLetters: 0, pipelines: 0 });
  const [animatedStats, setAnimatedStats] = useState({ resumes: 0, bestMatch: 0, coverLetters: 0, pipelines: 0 });
  const [recentScans, setRecentScans] = useState<any[]>([]);
  const supabase = createClient();

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there';
  const hasActivity = stats.resumes > 0;

  useEffect(() => {
    const fetchLiveStats = async () => {
      if (user) {
        const { count: scanCount } = await supabase.from('user_scans').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
        const { data: matchData } = await supabase.from('user_matches').select('best_score').eq('user_id', user.id).order('best_score', { ascending: false }).limit(1);
        const { count: letterCount } = await supabase.from('user_letters').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
        const { count: pipelineCount } = await supabase.from('user_job_pipeline').select('*', { count: 'exact', head: true }).eq('user_id', user.id);
        const { data: recent } = await supabase.from('user_scans').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(3);
        
        const liveStats = {
          resumes: scanCount || 0,
          bestMatch: matchData?.[0]?.best_score || 0,
          coverLetters: letterCount || 0,
          pipelines: pipelineCount || 0
        };
        
        setStats(liveStats);
        if (recent) setRecentScans(recent);
        
        // Trigger animation
        const duration = 1200;
        const start = Date.now();
        const animate = () => {
          const elapsed = Date.now() - start;
          const progress = Math.min(elapsed / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 4);

          setAnimatedStats({
            resumes: Math.round(ease * liveStats.resumes),
            bestMatch: Math.round(ease * liveStats.bestMatch),
            coverLetters: Math.round(ease * liveStats.coverLetters),
            pipelines: Math.round(ease * liveStats.pipelines),
          });

          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    };
    fetchLiveStats();
  }, [user, supabase]);

  const openShare = () => window.dispatchEvent(new CustomEvent('open-share'));

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div className="pg-hdr" style={{ marginBottom: 0 }}>
              <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>
                {isLoading ? <div className="sk" style={{ width: '240px', height: '36px' }}></div> : `Welcome back, ${displayName.split(' ')[0]} 👋`}
              </h1>
              <p style={{ color: 'var(--t3)', fontWeight: 600, marginTop: '4px' }}>
                {isLoading ? <div className="sk" style={{ width: '320px', height: '16px', marginTop: '8px' }}></div> : "Here's what's happening with your career tracking."}
              </p>
            </div>
            {!isLoading && (
              <Link href="/analyzer" className="btn btn-p" style={{ padding: '12px 24px', fontWeight: 800 }}>
                <span className="mat" style={{ fontSize: '20px' }}>upload_file</span> Analyze New Resume
              </Link>
            )}
            {isLoading && <div className="sk" style={{ width: '180px', height: '48px', borderRadius: '12px' }}></div>}
          </div>

          {isLoading ? (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="card sk" style={{ height: '140px' }}></div>
                ))}
              </div>
              <div style={{ marginTop: '32px', display: 'grid', gridTemplateColumns: '2fr 1.2fr', gap: '32px' }}>
                <div className="card sk" style={{ height: '400px' }}></div>
                <div className="card sk" style={{ height: '400px' }}></div>
              </div>
            </>
          ) : (
            <>
              {!hasActivity ? (
                <div className="afu" style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ width: '80px', height: '80px', background: 'var(--o6)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <span className="mat" style={{ fontSize: '40px', color: 'var(--o3)' }}>rocket_launch</span>
                  </div>
                  <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '12px' }}>Ready to launch?</h2>
                  <p style={{ color: 'var(--t3)', maxWidth: '460px', margin: '0 auto 32px', fontWeight: 600 }}>Analyze your first resume to unlock AI insights and personalized job matching.</p>
                  <button className="btn btn-p" onClick={() => router.push('/analyzer')} style={{ padding: '16px 36px' }}>Get Started</button>
                </div>
              ) : (
                <div className="afu">
                  <div className="stat-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
                    <div className="card" style={{ padding: '24px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--o6)', color: 'var(--o2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                        <span className="mat">description</span>
                      </div>
                      <div style={{ fontSize: '28px', fontWeight: 900 }}>{animatedStats.resumes}</div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--t4)', textTransform: 'uppercase' }}>Resumes Analyzed</div>
                    </div>
                    <div className="card" style={{ padding: '24px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--gbg)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                        <span className="mat">verified</span>
                      </div>
                      <div style={{ fontSize: '28px', fontWeight: 900 }}>{animatedStats.bestMatch}%</div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--t4)', textTransform: 'uppercase' }}>Best Match Score</div>
                    </div>
                    <div className="card" style={{ padding: '24px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--pbg)', color: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                        <span className="mat">mail</span>
                      </div>
                      <div style={{ fontSize: '28px', fontWeight: 900 }}>{animatedStats.coverLetters}</div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--t4)', textTransform: 'uppercase' }}>Letters Sent</div>
                    </div>
                    <div className="card" style={{ padding: '24px' }}>
                      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--s2)', color: 'var(--t2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                        <span className="mat">view_kanban</span>
                      </div>
                      <div style={{ fontSize: '28px', fontWeight: 900 }}>{animatedStats.pipelines}</div>
                      <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--t4)', textTransform: 'uppercase' }}>Active Pipelines</div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '32px', marginTop: '32px' }}>
                    <div className="card" style={{ padding: '24px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="mat" style={{ color: 'var(--o1)' }}>history</span> Recent Activity
                      </h3>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {recentScans.map((s, i) => (
                          <div key={i} style={{ padding: '16px', background: 'var(--sf)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                              <div style={{ fontSize: '14px', fontWeight: 800 }}>{s.filename}</div>
                              <div style={{ fontSize: '11px', color: 'var(--t3)', fontWeight: 600 }}>Analyzed on {new Date(s.created_at).toLocaleDateString()}</div>
                            </div>
                            <div style={{ fontSize: '16px', fontWeight: 900, color: 'var(--o2)' }}>{s.score}%</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="card" style={{ padding: '24px' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '20px' }}>AI Career Tips</h3>
                      <div style={{ padding: '20px', background: 'var(--o7)', borderRadius: '20px', border: '1.5px dashed var(--o5)' }}>
                        <p style={{ fontSize: '14px', lineHeight: 1.6, color: 'var(--o1)', fontWeight: 700 }}>
                          ✦ Your Resume is matching 92% of Tech PM roles. Try optimizing your 'Cloud Architecture' section to hit that 95% mark.
                        </p>
                      </div>
                      <button className="btn btn-s" style={{ width: '100%', marginTop: '20px' }} onClick={() => router.push('/analyzer')}>Improve My Score</button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
