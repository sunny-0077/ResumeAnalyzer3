'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useUser } from '@/context/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const { user } = useUser();
  const [showNotif, setShowNotif] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const openCmd = () => {
    window.dispatchEvent(new CustomEvent('open-cmdp'));
  };

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/');
    router.refresh();
  };

  const pathname = usePathname();
  const isLanding = pathname === '/';

  return (
    <nav className="nav-pill">
      <div 
        className="nav-logo" 
        onClick={() => router.push('/')}
        style={{ cursor: 'pointer' }}
      >
        Hirely&nbsp;<span>AI</span>
      </div>

      <div className="nav-actions">
        {isLanding ? (
          <div className="nav-actions mobile-hide-actions">
            <button 
              className="btn mobile-hide" 
              style={{ padding: '8px 16px', fontWeight: 700, color: 'var(--t2)', fontSize: '14px' }}
              onClick={() => router.push('/auth')}
            >
              Sign In
            </button>
            <button 
              className="btn btn-p" 
              style={{ padding: '8px 24px', fontWeight: 900, borderRadius: '12px' }}
              onClick={() => router.push('/auth')}
            >
              {isLanding ? 'Get Started' : 'Sign Up Free'}
            </button>
          </div>
        ) : (
          <>
            <button className="nav-cmd" onClick={openCmd}>
              <span className="mat">search</span>
              <span>Search tools...</span>
              <kbd>⌘K</kbd>
            </button>

            <div style={{ position: 'relative' }}>
              <button className="nav-icon-btn" onClick={() => setShowNotif(!showNotif)}>
                <span className="mat">{showNotif ? 'notifications_active' : 'notifications'}</span>
                <div className="nav-dot"></div>
              </button>
              {showNotif && (
                <div className="nav-drop adu" style={{ right: 0, width: '320px' }}>
                  <div className="nav-drop-h">
                    <span>Notifications</span>
                    <button onClick={() => setShowNotif(false)}>Mark all as read</button>
                  </div>
                  <div className="nav-notif">
                    <div className="nav-notif-i">
                      <div className="nav-notif-c bg"><span className="mat">check_circle</span></div>
                      <div>
                        <p>ATS Scan Complete</p>
                        <span>Your resume scored 84/100 for 'Product Manager'</span>
                      </div>
                    </div>
                    <div className="nav-notif-i">
                      <div className="nav-notif-c bp"><span className="mat">auto_awesome</span></div>
                      <div>
                        <p>New AI Feature</p>
                        <span>STAR Interview Coach is now live!</span>
                      </div>
                    </div>
                  </div>
                  <div className="nav-drop-f">View all notifications</div>
                </div>
              )}
            </div>

            <div style={{ position: 'relative' }}>
              <button className="nav-user-trigger" onClick={() => setShowUser(!showUser)}>
                <div className="nav-avatar">{user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}</div>
                <span className="mat">expand_more</span>
              </button>
              {showUser && (
                <div className="nav-drop adu" style={{ right: 0, width: '240px' }}>
                  <div className="nav-user-h">
                    <div className="nav-avatar">{user?.user_metadata?.full_name?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}</div>
                    <div>
                      <p>{user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User'}</p>
                      <span>{user?.email || ''}</span>
                    </div>
                  </div>
                  <div className="nav-user-links">
                    <Link href="/profile" className="nav-user-link"><span className="mat">person</span> Profile</Link>
                    <Link href="/pricing" className="nav-user-link"><span className="mat">verified</span> Subscription <span className="sb-badge">PRO</span></Link>
                    <Link href="/profile" className="nav-user-link"><span className="mat">settings</span> Settings</Link>
                  </div>
                  <div className="nav-user-f">
                    <button onClick={handleSignOut} className="nav-user-link" style={{ width: '100%', textAlign: 'left', border: 'none', background: 'none', cursor: 'pointer' }}>
                      <span className="mat">logout</span> Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button className="btn btn-p" onClick={() => router.push('/dashboard')}>Dashboard</button>
          </>
        )}
      </div>
    </nav>
  );
}
