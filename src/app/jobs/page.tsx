'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

type Job = {
  id: number;
  title: string;
  co: string;
  loc: string;
  mode: string;
  score: number;
  date: string;
  bg: string;
  badge: string | null;
  colId: string;
};

const INITIAL_COLS = [
  { id: 'wishlist', title: 'WISHLIST', dot: '#9ca3af', tc: 'var(--t2)', tbg: 'var(--s2)' },
  { id: 'applied', title: 'APPLIED', dot: 'var(--bl)', tc: 'var(--bl)', tbg: 'var(--bbg)' },
  { id: 'interviewing', title: 'INTERVIEWING', dot: 'var(--am)', tc: 'var(--am)', tbg: 'var(--abg)' },
  { id: 'offered', title: 'OFFERED', dot: 'var(--gn)', tc: 'var(--gn)', tbg: 'var(--gbg)' },
];

const INITIAL_JOBS: Job[] = [
  { id: 1, title: 'Senior SWE', co: 'Google', loc: 'Bangalore', mode: 'Hybrid', score: 82, date: 'Saved Jan 20', bg: '#1a73e8', badge: null, colId: 'wishlist' },
  { id: 2, title: 'Software Engineer', co: 'Zepto', loc: 'Mumbai', mode: 'Remote', score: 79, date: 'Saved Jan 22', bg: '#ff424d', badge: null, colId: 'wishlist' },
  { id: 3, title: 'Staff Engineer', co: 'Stripe', loc: 'Remote', mode: 'Remote', score: 87, date: 'Applied Jan 18', bg: '#6772e5', badge: null, colId: 'applied' },
  { id: 4, title: 'Senior Engineer', co: 'CRED', loc: 'Bangalore', mode: 'Hybrid', score: 81, date: 'Applied Jan 15', bg: '#fc3464', badge: null, colId: 'applied' },
  { id: 5, title: 'Senior SWE', co: 'Swiggy', loc: 'Bangalore', mode: 'Hybrid', score: 84, date: 'Round 2 · Jan 28', bg: '#f97316', badge: 'Round 2', colId: 'interviewing' },
  { id: 6, title: 'Senior Engineer', co: 'Navi', loc: 'Bangalore', mode: 'Hybrid', score: 90, date: '🎉 Offer received!', bg: '#9b5cf6', badge: 'Offer ₹32L', colId: 'offered' },
];

export default function ApplicationTracker() {
  const [view, setView] = useState<'kanban' | 'list'>('kanban');
  const [jobs, setJobs] = useState<Job[]>(INITIAL_JOBS);
  const [draggedId, setDraggedId] = useState<number | null>(null);

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const handleDragStart = (id: number) => {
    setDraggedId(id);
  };

  const handleDrop = (e: React.DragEvent, colId: string) => {
    e.preventDefault();
    if (draggedId !== null) {
      setJobs(prev => prev.map(j => j.id === draggedId ? { ...j, colId } : j));
      setDraggedId(null);
      showToast('success', 'Application moved!');
    }
  };

  const openJobDetail = (job: Job) => {
    showToast('info', `Opening details for ${job.title} at ${job.co}...`);
  };

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '4px' }}>
                <div style={{ width: '38px', height: '38px', borderRadius: '12px', background: 'var(--o6)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="mat" style={{ color: 'var(--o2)', fontSize: '20px' }}>view_kanban</span>
                </div>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: 800, letterSpacing: '-.03em', color: 'var(--t1)' }}>Application Tracker</h1>
                  <p style={{ fontSize: '13px', color: 'var(--t2)' }}>Manage {jobs.length} active pipelines in your high-performance workspace.</p>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <button className="btn btn-s btn-sm" onClick={() => showToast('info', 'Auto-sync started — scanning LinkedIn, Naukri...')}>
                <span className="mat" style={{ fontSize: '14px' }}>sync</span> Auto-Sync
              </button>
              <button className="btn btn-p" onClick={() => showToast('info', 'New Pipeline wizard coming soon!')}>
                <span className="mat">add</span> New Pipeline
              </button>
            </div>
          </div>

          {/* VIEW TOGGLE */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', alignItems: 'center' }}>
            <div style={{ display: 'flex', background: 'var(--s2)', borderRadius: '12px', padding: '3px', gap: '2px' }}>
              <button 
                className={view === 'kanban' ? 'btn btn-sm active' : 'btn btn-g btn-sm'} 
                onClick={() => setView('kanban')}
                style={view === 'kanban' ? { borderRadius: '10px', fontSize: '12px', padding: '6px 14px', background: 'var(--w)', boxShadow: 'var(--sh1)' } : { borderRadius: '10px', fontSize: '12px', padding: '6px 14px' }}
              >
                Kanban
              </button>
              <button 
                className={view === 'list' ? 'btn btn-sm active' : 'btn btn-g btn-sm'} 
                onClick={() => setView('list')}
                style={view === 'list' ? { borderRadius: '10px', fontSize: '12px', padding: '6px 14px', background: 'var(--w)', boxShadow: 'var(--sh1)' } : { borderRadius: '10px', fontSize: '12px', padding: '6px 14px' }}
              >
                List
              </button>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--t3)', fontWeight: 600 }}>{jobs.length} total applications</span>
          </div>

          {/* KANBAN VIEW */}
          {view === 'kanban' && (
            <div>
              <div className="kb-board" style={{ display: 'flex', gap: '20px', overflowX: 'auto', paddingBottom: '20px', alignItems: 'flex-start' }}>
                {INITIAL_COLS.map(col => {
                  const colJobs = jobs.filter(j => j.colId === col.id);
                  return (
                    <div 
                      key={col.id} 
                      style={{ flex: '1 1 300px', minWidth: '300px', background: 'var(--s2)', borderRadius: '16px', padding: '14px' }}
                      onDragOver={e => e.preventDefault()}
                      onDrop={e => handleDrop(e, col.id)}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: col.dot, marginRight: '8px' }}></div>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: col.tc }}>{col.title}</div>
                        <div style={{ fontSize: '12px', fontWeight: 800, color: col.tc, marginLeft: '8px', opacity: 0.7 }}>{colJobs.length}</div>
                        <button className="btn-icon-sm" style={{ marginLeft: 'auto', background: 'transparent', border: 'none', color: 'var(--t3)' }} onClick={() => showToast('info', 'Add job modal coming soon!')}>
                          <span className="mat" style={{ fontSize: '18px' }}>add</span>
                        </button>
                      </div>
                      
                      {colJobs.length === 0 ? (
                        <div style={{ padding: '24px 0', textAlign: 'center', color: 'var(--t4)', fontSize: '13px', fontWeight: 600, border: '2px dashed var(--border)', borderRadius: '12px' }}>
                          <span className="mat" style={{ display: 'block', fontSize: '24px', marginBottom: '8px', opacity: 0.5 }}>inbox</span>
                          No {col.title.toLowerCase()} yet
                        </div>
                      ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          {colJobs.map(job => (
                            <div 
                              key={job.id} 
                              draggable
                              onDragStart={() => handleDragStart(job.id)}
                              onClick={() => openJobDetail(job)}
                              style={{ background: 'var(--w)', border: '1px solid var(--border)', borderRadius: '12px', padding: '14px', cursor: 'grab', boxShadow: '0 1px 3px rgba(0,0,0,0.05)' }}
                            >
                              {job.badge && (
                                <div style={{ fontSize: '9px', fontWeight: 800, padding: '2px 8px', borderRadius: '999px', background: col.tbg, color: col.tc, display: 'inline-block', marginBottom: '8px' }}>
                                  {job.badge}
                                </div>
                              )}
                              <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                                <div style={{ width: '36px', height: '36px', borderRadius: '8px', background: job.bg, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', fontWeight: 800 }}>
                                  {job.co[0]}
                                </div>
                                <div>
                                  <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--t1)' }}>{job.title}</div>
                                  <div style={{ fontSize: '12px', color: 'var(--t3)', fontWeight: 600 }}>{job.co} · {job.loc}</div>
                                </div>
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 700, marginBottom: '8px' }}>
                                <span style={{ color: 'var(--o2)' }}>{job.score}% match</span>
                                <span style={{ color: 'var(--t3)' }}>{job.mode}</span>
                              </div>
                              <div style={{ fontSize: '10px', color: 'var(--t4)', fontWeight: 600 }}>{job.date}</div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* LIST VIEW */}
          {view === 'list' && (
            <div className="card">
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t3)', borderBottom: '1px solid var(--bd)' }}>Role</th>
                    <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t3)', borderBottom: '1px solid var(--bd)' }}>Company</th>
                    <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t3)', borderBottom: '1px solid var(--bd)' }}>Stage</th>
                    <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t3)', borderBottom: '1px solid var(--bd)' }}>Match</th>
                    <th style={{ textAlign: 'left', padding: '10px 14px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.07em', color: 'var(--t3)', borderBottom: '1px solid var(--bd)' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map(job => {
                    const col = INITIAL_COLS.find(c => c.id === job.colId)!;
                    return (
                      <tr 
                        key={job.id} 
                        style={{ cursor: 'pointer', transition: 'background 100ms' }} 
                        onClick={() => openJobDetail(job)}
                        className="hover-row" // Needs quick CSS tweak in globals or inline
                      >
                        <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 700 }}>{job.title}</td>
                        <td style={{ padding: '12px 14px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: job.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '10px', fontWeight: 800 }}>
                              {job.co[0]}
                            </div>
                            <span style={{ fontSize: '13px', fontWeight: 600 }}>{job.co}</span>
                          </div>
                        </td>
                        <td style={{ padding: '12px 14px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 800, padding: '3px 9px', borderRadius: '999px', background: col.tbg, color: col.tc }}>
                            {col.title}
                          </span>
                        </td>
                        <td style={{ padding: '12px 14px', fontSize: '13px', fontWeight: 800, color: 'var(--o2)' }}>{job.score}%</td>
                        <td style={{ padding: '12px 14px', fontSize: '12px', color: 'var(--t3)' }}>{job.date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <style jsx>{`
                .hover-row:hover { background: var(--o7); }
              `}</style>
            </div>
          )}
          
          <div style={{ marginTop: '16px', padding: '12px 16px', background: 'var(--w)', borderRadius: '12px', border: '1px solid var(--bd)', fontSize: '12px', color: 'var(--t3)' }}>
            💡 Drag cards between columns to update their status. Click any card for full details.
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
