'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useUser } from '@/context/AuthContext';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();
  const { profile, isLoading } = useUser();
  const supabase = createClient();
  const [stats, setStats] = useState({ totalUsers: 0, totalScans: 0, totalMatches: 0, free: 0, pro: 0, advanced: 0 });
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isAdmin = profile?.role === 'admin';

  const resolveTicket = async (id: string) => {
    const { error } = await supabase.from('support_requests').update({ status: 'resolved' }).eq('id', id);
    if (!error) {
      setTickets(prev => prev.map(t => t.id === id ? { ...t, status: 'resolved' } : t));
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Ticket marked as resolved.' } }));
    }
  };

  useEffect(() => {
    if (!isAdmin && !isLoading) {
      router.push('/dashboard');
      return;
    }

    const fetchAdminData = async () => {
      // 1. Global Aggregates
      const { count: userCount } = await supabase.from('profiles').select('*', { count: 'exact', head: true });
      const { count: scanCount } = await supabase.from('user_scans').select('*', { count: 'exact', head: true });
      const { count: matchCount } = await supabase.from('user_matches').select('*', { count: 'exact', head: true });
      
      // 2. Tier Distribution
      const { data: freeData } = await supabase.from('profiles').select('tier').eq('tier', 'free');
      const { data: proData } = await supabase.from('profiles').select('tier').eq('tier', 'pro');
      const { data: advData } = await supabase.from('profiles').select('tier').eq('tier', 'advanced');

      // 3. Recent Signups
      const { data: recent } = await supabase.from('profiles').select('*').order('created_at', { ascending: false }).limit(10);

      // 4. Support Tickets
      const { data: supportTickets } = await supabase.from('support_requests').select('*').order('created_at', { ascending: false });

      setStats({
        totalUsers: userCount || 0,
        totalScans: scanCount || 0,
        totalMatches: matchCount || 0,
        free: freeData?.length || 0,
        pro: proData?.length || 0,
        advanced: advData?.length || 0
      });

      if (recent) setRecentUsers(recent);
      if (supportTickets) setTickets(supportTickets);
      setLoading(false);
    };

    if (isAdmin) fetchAdminData();
  }, [isAdmin, isLoading, router, supabase]);

  if (!isAdmin && !isLoading) return null;

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div className="pg-hdr">
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>Platform Command Center</h1>
            <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Administrative intelligence and platform growth metrics.</p>
          </div>

          {loading ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
              {[1, 2, 3].map(i => <div key={i} className="sk" style={{ height: '140px' }}></div>)}
            </div>
          ) : (
            <>
              {/* TOP LEVEL STATS */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '32px' }}>
                <div className="card" style={{ padding: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--o6)', color: 'var(--o2)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <span className="mat">group</span>
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 950, color: 'var(--t1)' }}>{stats.totalUsers}</div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--t4)', textTransform: 'uppercase' }}>Total Registered Users</div>
                </div>
                <div className="card" style={{ padding: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--gbg)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <span className="mat">analytics</span>
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 950, color: 'var(--t1)' }}>{stats.totalScans}</div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--t4)', textTransform: 'uppercase' }}>Total Resumes Analyzed</div>
                </div>
                <div className="card" style={{ padding: '24px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'var(--pbg)', color: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                    <span className="mat">rocket_launch</span>
                  </div>
                  <div style={{ fontSize: '32px', fontWeight: 950, color: 'var(--t1)' }}>{stats.totalMatches}</div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--t4)', textTransform: 'uppercase' }}>Total Job Matches</div>
                </div>
              </div>

              {/* TIER DISTRIBUTION & RECENT FEED */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '32px', marginBottom: '32px' }}>
                <div className="card" style={{ padding: '28px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px' }}>Tier Distribution</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {['free', 'pro', 'advanced'].map(t => (
                      <div key={t} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: t === 'advanced' ? 'var(--o1)' : t === 'pro' ? 'var(--purple)' : 'var(--t4)' }}></div>
                          <span style={{ textTransform: 'uppercase', fontSize: '12px', fontWeight: 900, color: 'var(--t2)' }}>{t}</span>
                        </div>
                        <div style={{ fontWeight: 800, fontSize: '16px' }}>{stats[t as keyof typeof stats]} users</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop: '32px', padding: '20px', background: 'var(--s1)', borderRadius: '16px', border: '1px solid var(--bd)' }}>
                    <div style={{ fontSize: '11px', fontWeight: 800, color: 'var(--t4)', marginBottom: '8px' }}>CONVERSION RATE</div>
                    <div style={{ fontSize: '24px', fontWeight: 950, color: 'var(--o2)' }}>
                      {stats.totalUsers > 0 ? (( (stats.pro + stats.advanced) / stats.totalUsers ) * 100).toFixed(1) : 0}%
                    </div>
                  </div>
                </div>

                <div className="card" style={{ padding: '28px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px' }}>Platform Activity Pulse</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {recentUsers.map(u => (
                      <div key={u.id} style={{ padding: '16px', background: 'var(--sf)', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'var(--s2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, color: 'var(--t3)', fontSize: '14px' }}>
                            {u.full_name?.[0] || 'U'}
                          </div>
                          <div>
                            <div style={{ fontSize: '14px', fontWeight: 800 }}>{u.full_name || 'Hirely User'}</div>
                            <div style={{ fontSize: '11px', color: 'var(--t4)', fontWeight: 600 }}>{u.email}</div>
                          </div>
                        </div>
                        <div style={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 900, padding: '4px 8px', borderRadius: '6px', background: u.tier === 'advanced' ? 'var(--o6)' : 'var(--s1)', color: u.tier === 'advanced' ? 'var(--o2)' : 'var(--t3)' }}>
                          {u.tier}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* SUPPORT QUEUE */}
              <div className="card" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 900 }}>Active Support Queue</h3>
                    <p style={{ fontSize: '13px', color: 'var(--t4)', fontWeight: 600 }}>Manage urgent user inquiries and platform feedback.</p>
                  </div>
                  <span className="badge bo" style={{ background: 'var(--o6)', color: 'var(--o1)' }}>{tickets.filter(t => t.status === 'pending').length} OPEN TICKETS</span>
                </div>

                <div style={{ display: 'grid', gap: '16px' }}>
                  {tickets.length === 0 ? (
                    <div style={{ padding: '60px', textAlign: 'center', background: 'var(--sf)', borderRadius: '24px', opacity: 0.6 }}>
                      <span className="mat" style={{ fontSize: '40px', marginBottom: '16px' }}>check_circle</span>
                      <p style={{ fontWeight: 800 }}>All quiet on the support front.</p>
                    </div>
                  ) : (
                    tickets.map(ticket => (
                      <div key={ticket.id} style={{ padding: '24px', background: 'var(--sf)', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: ticket.status === 'pending' ? '1px solid var(--o5)' : 'none' }}>
                        <div style={{ flex: 1, marginRight: '32px' }}>
                          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '10px' }}>
                            <span className="badge" style={{ background: ticket.status === 'pending' ? 'var(--o6)' : 'var(--gbg)', color: ticket.status === 'pending' ? 'var(--o2)' : 'var(--green)', fontSize: '10px' }}>
                              {ticket.status.toUpperCase()}
                            </span>
                            <span style={{ fontSize: '11px', color: 'var(--t4)', fontWeight: 700 }}>
                              {new Date(ticket.created_at).toLocaleString()}
                            </span>
                          </div>
                          <h4 style={{ fontSize: '15px', fontWeight: 900, marginBottom: '6px' }}>{ticket.subject}</h4>
                          <p style={{ fontSize: '13px', color: 'var(--t3)', lineHeight: 1.6, fontWeight: 500 }}>{ticket.message}</p>
                        </div>
                        {ticket.status === 'pending' && (
                          <button 
                            className="btn btn-p btn-sm"
                            onClick={() => resolveTicket(ticket.id)}
                          >
                            Resolve Ticket
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
