'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/AuthContext';
import { createClient } from '@/utils/supabase/client';
import { useEffect } from 'react';

type Notification = {
  id: number;
  icon: string;
  title: string;
  msg: string;
  time: string;
  page: string;
  read: boolean;
  ibg: string;
  ic: string;
  type: 'jobs' | 'resume' | 'interview' | 'other';
};


export default function NotificationsPage() {
  const router = useRouter();
  const { user } = useUser();
  const supabase = createClient();
  const [notifs, setNotifs] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'jobs' | 'resume' | 'interview'>('all');

  useEffect(() => {
    const fetchNotifs = async () => {
      if (user) {
        const { data } = await supabase.from('notifications').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        if (data) setNotifs(data as any);
        setLoading(false);
      }
    };
    fetchNotifs();
  }, [user, supabase]);

  const unreadCount = notifs.filter(n => !n.read).length;

  const markAllRead = async () => {
    if (user) {
      await supabase.from('notifications').update({ read: true }).eq('user_id', user.id);
      setNotifs(prev => prev.map(n => ({ ...n, read: true })));
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'All caught up!' } }));
    }
  };

  const handleNotifClick = async (id: number, page: string) => {
    await supabase.from('notifications').update({ read: true }).eq('id', id);
    setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    router.push(page);
  };

  const filteredNotifs = notifs.filter(n => {
    if (filter === 'all') return true;
    if (filter === 'unread') return !n.read;
    return n.type === filter;
  });

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div className="pg-hdr" style={{ marginBottom: 0 }}>
              <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>Notifications</h1>
              <p style={{ color: 'var(--t3)', fontWeight: 600 }}>{unreadCount} unread notifications</p>
            </div>
            <button className="btn btn-s btn-sm" onClick={markAllRead}>Mark all read</button>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', marginBottom: '18px', flexWrap: 'wrap' }}>
            {['all', 'unread', 'jobs', 'resume', 'interview'].map((f) => (
              <button 
                key={f}
                className={`sal-filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f as any)}
                style={{ 
                  padding: '8px 16px', borderRadius: '12px', fontSize: '13px', fontWeight: 800, cursor: 'pointer',
                  background: filter === f ? 'var(--t1)' : 'var(--w)', 
                  color: filter === f ? 'var(--w)' : 'var(--t3)',
                  border: `1px solid ${filter === f ? 'var(--t1)' : 'var(--bd)'}`,
                  textTransform: 'capitalize'
                }}
              >
                {f} {f === 'all' ? `(${notifs.length})` : f === 'unread' ? `(${unreadCount})` : ''}
              </button>
            ))}
          </div>
          
          <div id="notif-page-list">
            {filteredNotifs.length === 0 ? (
              <div style={{ padding: '40px', textAlign: 'center', background: 'var(--w)', borderRadius: '16px', border: '1px dashed var(--bd)' }}>
                <span className="mat" style={{ fontSize: '32px', color: 'var(--t4)', marginBottom: '8px' }}>notifications_off</span>
                <p style={{ fontSize: '14px', fontWeight: 700, color: 'var(--t3)' }}>You're all caught up here.</p>
              </div>
            ) : (
              filteredNotifs.map(n => (
                <div 
                  key={n.id}
                  className="card card-hover" 
                  style={{ 
                    display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '10px', 
                    padding: '16px 18px', cursor: 'pointer',
                    borderLeft: !n.read ? '3px solid var(--o3)' : '1px solid var(--bd)' 
                  }}
                  onClick={() => handleNotifClick(n.id, n.page)}
                >
                  <div style={{ width: '42px', height: '42px', borderRadius: '14px', background: n.ibg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="mat" style={{ fontSize: '20px', color: n.ic }}>{n.icon}</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--t1)', marginBottom: '3px' }}>{n.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.5, marginBottom: '5px' }}>{n.msg}</div>
                    <button 
                      style={{ fontSize: '12px', fontWeight: 800, color: 'var(--o2)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      onClick={(e) => { e.stopPropagation(); router.push(n.page); }}
                    >
                      View page →
                    </button>
                    <div style={{ fontSize: '11px', color: 'var(--t3)', fontWeight: 600, marginTop: '8px' }}>{n.time}</div>
                  </div>
                  {!n.read && (
                    <div style={{ width: '9px', height: '9px', borderRadius: '50%', background: 'var(--o3)', flexShrink: 0, marginTop: '4px' }}></div>
                  )}
                </div>
              ))
            )}
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
