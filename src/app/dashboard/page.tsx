'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useUser } from '@/context/AuthContext';

export default function Dashboard() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [stats, setStats] = useState({ resumes: 0, bestMatch: 0, coverLetters: 0, pipelines: 0 });
  const [animatedStats, setAnimatedStats] = useState({ resumes: 0, bestMatch: 0, coverLetters: 0, pipelines: 0 });

  // Derive user's real data from user_metadata (persisted forever in Supabase)
  const userStats = user?.user_metadata?.stats || { resumes: 0, bestMatch: 0, coverLetters: 0, pipelines: 0 };
  const hasActivity = user?.user_metadata?.has_activity === true;
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'there';

  // Animate counters when data loads
  useEffect(() => {
    if (hasActivity) {
      const targets = userStats;
      const duration = 1200;
      const start = Date.now();

      const animate = () => {
        const elapsed = Date.now() - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 4);

        setAnimatedStats({
          resumes: Math.round(ease * targets.resumes),
          bestMatch: Math.round(ease * targets.bestMatch),
          coverLetters: Math.round(ease * targets.coverLetters),
          pipelines: Math.round(ease * targets.pipelines),
        });

        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }
  }, [hasActivity]);

  const openShare = () => window.dispatchEvent(new CustomEvent('open-share'));

  // Show skeleton while auth is loading
  if (isLoading) {
    return (
      <div id="page-dashboard" className="afi">
        <Navbar />
        <div className="app-shell">
          <Sidebar />
          <main className="main">
            <div className="afu">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '32px' }}>
                <div><div className="skel" style={{ height: '32px', width: '280px', marginBottom: '8px' }}></div><div className="skel" style={{ height: '16px', width: '340px' }}></div></div>
                <div className="skel" style={{ height: '44px', width: '140px', borderRadius: '14px' }}></div>
              </div>
              <div className="stat-row">
                {[1,2,3,4].map(i => <div key={i} className="stat-card"><div className="skel" style={{ height: '48px', width: '48px', borderRadius: '12px', marginBottom: '16px' }}></div><div className="skel" style={{ height: '32px', width: '80px', marginBottom: '8px' }}></div><div className="skel" style={{ height: '14px', width: '120px' }}></div></div>)}
              </div>
              <div className="dash-grid-2">
                <div className="dash-card"><div className="skel" style={{ height: '24px', width: '200px', marginBottom: '20px' }}></div><div className="skel" style={{ height: '300px', borderRadius: '16px' }}></div></div>
                <div className="dash-card"><div className="skel" style={{ height: '24px', width: '160px', marginBottom: '20px' }}></div><div className="skel-list">{[1,2,3,4].map(i => <div key={i} className="skel" style={{ height: '60px', borderRadius: '12px', marginBottom: '12px' }}></div>)}</div></div>
              </div>
            </div>
          </main>
        </div>
        <MobileBottomNav />
      </div>
    );
  }

  return (
    <div id="page-dashboard" className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main">

          {/* ========== EMPTY STATE — New User ========== */}
          {!hasActivity && (
            <div className="afu" style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ width: '100px', height: '100px', background: 'var(--o6)', borderRadius: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 28px', boxShadow: '0 8px 32px rgba(163,61,0,.12)' }}>
                <span className="mat" style={{ fontSize: '48px', color: 'var(--o3)' }}>rocket_launch</span>
              </div>
              <h2 style={{ fontSize: '36px', fontWeight: 900, marginBottom: '12px', color: 'var(--t1)' }}>
                Welcome, {displayName}! 🎉
              </h2>
              <p style={{ fontSize: '17px', color: 'var(--t2)', maxWidth: '500px', margin: '0 auto 12px', lineHeight: 1.6, fontWeight: 500 }}>
                Your career command center is ready. Upload your first resume to unlock AI-powered insights, job matching, and more.
              </p>
              <p style={{ fontSize: '14px', color: 'var(--t3)', maxWidth: '440px', margin: '0 auto 40px', fontWeight: 600 }}>
                Everything you do here is saved to your account forever — across all devices.
              </p>

              <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '48px' }}>
                <button className="btn btn-p btn-lg" onClick={() => router.push('/analyzer')} style={{ padding: '16px 36px', fontSize: '16px' }}>
                  <span className="mat" style={{ marginRight: '8px' }}>upload_file</span> Upload Resume
                </button>
                <button className="btn btn-s btn-lg" onClick={() => router.push('/jobmatch')} style={{ padding: '16px 36px', fontSize: '16px' }}>
                  <span className="mat" style={{ marginRight: '8px' }}>auto_awesome</span> Match a Job
                </button>
              </div>

              {/* Quick start cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', maxWidth: '800px', margin: '0 auto' }}>
                <div className="dash-card" style={{ padding: '28px', textAlign: 'left', cursor: 'pointer', transition: 'all .2s' }} onClick={() => router.push('/analyzer')}>
                  <div style={{ width: '44px', height: '44px', background: 'var(--o6)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <span className="mat" style={{ color: 'var(--o2)' }}>description</span>
                  </div>
                  <h4 style={{ fontWeight: 800, marginBottom: '6px', fontSize: '15px' }}>Analyze Resume</h4>
                  <p style={{ fontSize: '13px', color: 'var(--t3)', fontWeight: 500, lineHeight: 1.5 }}>Get an ATS score and AI feedback on your resume.</p>
                </div>
                <div className="dash-card" style={{ padding: '28px', textAlign: 'left', cursor: 'pointer', transition: 'all .2s' }} onClick={() => router.push('/jobmatch')}>
                  <div style={{ width: '44px', height: '44px', background: 'var(--gbg)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <span className="mat" style={{ color: 'var(--green)' }}>manage_search</span>
                  </div>
                  <h4 style={{ fontWeight: 800, marginBottom: '6px', fontSize: '15px' }}>Match Jobs</h4>
                  <p style={{ fontSize: '13px', color: 'var(--t3)', fontWeight: 500, lineHeight: 1.5 }}>Find roles that fit your skills perfectly.</p>
                </div>
                <div className="dash-card" style={{ padding: '28px', textAlign: 'left', cursor: 'pointer', transition: 'all .2s' }} onClick={() => router.push('/cover-letter')}>
                  <div style={{ width: '44px', height: '44px', background: 'var(--pbg)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <span className="mat" style={{ color: 'var(--purple)' }}>mail</span>
                  </div>
                  <h4 style={{ fontWeight: 800, marginBottom: '6px', fontSize: '15px' }}>Cover Letter</h4>
                  <p style={{ fontSize: '13px', color: 'var(--t3)', fontWeight: 500, lineHeight: 1.5 }}>Generate a tailored cover letter with AI.</p>
                </div>
              </div>
            </div>
          )}

          {/* ========== LOADED STATE — Returning User with Activity ========== */}
          {hasActivity && (
            <div className="afu">
              <div className="dash-header">
                <div>
                  <h1 style={{ fontSize: '36px', fontWeight: 900, color: 'var(--t1)' }}>Welcome back, {displayName}! 👋</h1>
                  <p style={{ color: 'var(--t2)', marginTop: '4px', fontWeight: 600 }}>
                    {userStats.resumes > 0 ? `You have ${userStats.resumes} resume${userStats.resumes > 1 ? 's' : ''} analyzed.` : 'Your career dashboard is ready.'}
                  </p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-s" onClick={openShare}>
                    <span className="mat" style={{ marginRight: '6px' }}>share</span> Share Score
                  </button>
                  <button className="btn btn-p" onClick={() => router.push('/jobmatch')}>
                    <span className="mat" style={{ marginRight: '6px' }}>rocket_launch</span> Match a Job
                  </button>
                </div>
              </div>

              <div className="stat-grid">
                <div className="scard afu" style={{ animationDelay: '100ms' }}>
                  <div className="scard-icon" style={{ background: 'var(--o6)', color: 'var(--o2)' }}><span className="mat">description</span></div>
                  <div className="scard-num">{animatedStats.resumes}</div>
                  <div className="scard-label">Total Resumes</div>
                </div>
                <div className="scard afu" style={{ animationDelay: '200ms' }}>
                  <div className="scard-icon" style={{ background: 'var(--gbg)', color: 'var(--green)' }}><span className="mat">verified</span></div>
                  <div className="scard-num">{animatedStats.bestMatch > 0 ? `${animatedStats.bestMatch}%` : '—'}</div>
                  <div className="scard-label">Best Match Score</div>
                </div>
                <div className="scard afu" style={{ animationDelay: '300ms' }}>
                  <div className="scard-icon" style={{ background: 'var(--pbg)', color: 'var(--purple)' }}><span className="mat">mail</span></div>
                  <div className="scard-num">{animatedStats.coverLetters}</div>
                  <div className="scard-label">Cover Letters</div>
                </div>
                <div className="scard afu" style={{ animationDelay: '400ms' }}>
                  <div className="scard-icon" style={{ background: 'var(--s2)', color: 'var(--t2)' }}><span className="mat">view_kanban</span></div>
                  <div className="scard-num">{animatedStats.pipelines}</div>
                  <div className="scard-label">Job Pipelines</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="qa-grid afu" style={{ animationDelay: '500ms', gridTemplateColumns: 'repeat(5, 1fr)' }}>
                <div className="qa-item" onClick={() => router.push('/analyzer')}>
                  <div className="qa-icon" style={{ background: 'var(--o6)', color: 'var(--o2)' }}><span className="mat">upload_file</span></div>
                  <div className="qa-info"><h4>Analyze</h4><p>Score Resume</p></div>
                </div>
                <div className="qa-item" onClick={() => router.push('/jobmatch')}>
                  <div className="qa-icon" style={{ background: 'var(--gbg)', color: 'var(--green)' }}><span className="mat">auto_awesome</span></div>
                  <div className="qa-info"><h4>Match</h4><p>AI Matching</p></div>
                </div>
                <div className="qa-item" onClick={() => router.push('/cover-letter')}>
                  <div className="qa-icon" style={{ background: 'var(--pbg)', color: 'var(--purple)' }}><span className="mat">description</span></div>
                  <div className="qa-info"><h4>Letter</h4><p>Drafting AI</p></div>
                </div>
                <div className="qa-item" onClick={() => router.push('/jobs')}>
                  <div className="qa-icon" style={{ background: 'var(--s2)', color: 'var(--t2)' }}><span className="mat">view_kanban</span></div>
                  <div className="qa-info"><h4>Tracker</h4><p>Kanban Board</p></div>
                </div>
                <div className="qa-item" onClick={() => router.push('/salary')}>
                  <div className="qa-icon" style={{ background: 'var(--bbg)', color: 'var(--blue)' }}><span className="mat">payments</span></div>
                  <div className="qa-info"><h4>Salary</h4><p>Intel Hub</p></div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
