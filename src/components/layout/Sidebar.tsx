'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSubscription } from '@/hooks/useSubscription';
import { useActivePath } from '@/hooks/useAppHooks';

const TIER_LABELS: Record<string, { label: string; color: string }> = {
  free: { label: 'FREE', color: 'var(--t3)' },
  pro: { label: 'PRO', color: 'var(--o3)' },
  advanced: { label: 'ADV', color: 'var(--tl)' },
};

const StatusBadge = ({ label = 'PRO' }) => (
  <span className="sb-status-badge" style={{ 
    marginLeft: 'auto', 
    fontSize: '9px', 
    fontWeight: 900, 
    background: 'var(--o6)', 
    color: 'var(--o1)', 
    padding: '2px 6px', 
    borderRadius: '4px', 
    letterSpacing: '0.02em',
    border: '1px solid var(--o5)',
    flexShrink: 0
  }}>
    {label}
  </span>
);

export default function Sidebar() {
  const pathname = usePathname();
  const { tier } = useSubscription();
  const tierInfo = TIER_LABELS[tier];

  const handleUpgrade = () => {
    window.dispatchEvent(new CustomEvent('open-upgrade'));
  };

  return (
    <aside className="sidebar" style={{ zIndex: 900, overflowY: 'auto' }}>
      <nav style={{ padding: '20px 8px', flex: 1 }}>
        <div className="sb-sec">Main</div>
        <Link href="/dashboard" className={`sb-it ${useActivePath('/dashboard', pathname)}`}>
          <span className={pathname === '/dashboard' ? 'matf' : 'mat'}>grid_view</span> <span>Dashboard</span>
        </Link>
        <Link href="/jobmatch" className={`sb-it ${useActivePath('/jobmatch', pathname)}`}>
          <span className={pathname === '/jobmatch' ? 'matf' : 'mat'}>manage_search</span> <span>Job Match</span>
        </Link>
        <Link href="/analyzer" className={`sb-it ${useActivePath('/analyzer', pathname)}`}>
          <span className={pathname === '/analyzer' ? 'matf' : 'mat'}>description</span> <span>Analyze Resume</span>
        </Link>
        <Link href="/jobs" className={`sb-it ${useActivePath('/jobs', pathname)}`}>
          <span className={pathname === '/jobs' ? 'matf' : 'mat'}>view_kanban</span> <span>Job Pipeline</span>
        </Link>

        <div className="sb-sec">Tools</div>
        <Link href="/cover-letter" className={`sb-it ${useActivePath('/cover-letter', pathname)}`}>
          <span className={pathname === '/cover-letter' ? 'matf' : 'mat'}>mail</span> <span>Cover Letters</span>
          <StatusBadge />
        </Link>
        <Link href="/rewriter" className={`sb-it ${useActivePath('/rewriter', pathname)}`}>
          <span className={pathname === '/rewriter' ? 'matf' : 'mat'}>auto_awesome</span> <span>Bullet Rewriter</span>
          <StatusBadge />
        </Link>
        <Link href="/templates" className={`sb-it ${useActivePath('/templates', pathname)}`}>
          <span className={pathname === '/templates' ? 'matf' : 'mat'}>format_paint</span> <span>ATS Templates</span>
        </Link>
        
        <div className="sb-sec">Career Intelligence</div>
        <Link href="/interview" className={`sb-it ${useActivePath('/interview', pathname)}`}>
          <span className={pathname === '/interview' ? 'matf' : 'mat'}>mic</span> <span>Interview Prep</span>
          <StatusBadge />
        </Link>
        <Link href="/salary" className={`sb-it ${useActivePath('/salary', pathname)}`}>
          <span className={pathname === '/salary' ? 'matf' : 'mat'}>payments</span> <span>Salary Intel</span>
          <StatusBadge />
        </Link>
        <Link href="/career-path" className={`sb-it ${useActivePath('/career-path', pathname)}`}>
          <span className={pathname === '/career-path' ? 'matf' : 'mat'}>trending_up</span> <span>Career Path</span>
          <StatusBadge />
        </Link>
        <Link href="/skilltest" className={`sb-it ${useActivePath('/skilltest', pathname)}`}>
          <span className={pathname === '/skilltest' ? 'matf' : 'mat'}>psychology</span> <span>Skill Test</span>
          <StatusBadge />
        </Link>

        <div className="sb-sec">Account</div>
        <Link href="/profile" className={`sb-it ${useActivePath('/profile', pathname)}`}>
          <span className={pathname === '/profile' ? 'matf' : 'mat'}>person_pin</span> <span>Career Profile</span>
        </Link>
        <Link href="/alerts" className={`sb-it ${useActivePath('/alerts', pathname)}`}>
          <span className={pathname === '/alerts' ? 'matf' : 'mat'}>notifications_active</span> <span>Job Alerts</span>
        </Link>
        <Link href="/notifications" className={`sb-it ${useActivePath('/notifications', pathname)}`}>
          <span className={pathname === '/notifications' ? 'matf' : 'mat'}>notifications</span> <span>Notifications</span>
          <span className="sb-badge" style={{ background: 'var(--o3)', color: '#fff' }}>4</span>
        </Link>
        <Link href="/referrals" className={`sb-it ${useActivePath('/referrals', pathname)}`}>
          <span className={pathname === '/referrals' ? 'matf' : 'mat'}>loyalty</span> <span>Refer & Earn</span>
        </Link>
        <Link href="/help" className={`sb-it ${useActivePath('/help', pathname)}`}>
          <span className={pathname === '/help' ? 'matf' : 'mat'}>help_outline</span> <span>Help & Support</span>
        </Link>
        <Link href="/pricing" className={`sb-it ${useActivePath('/pricing', pathname)}`}>
          <span className={pathname === '/pricing' ? 'matf' : 'mat'}>star</span> <span>Pricing & Plans</span>
        </Link>
        <Link href="/settings" className={`sb-it ${useActivePath('/settings', pathname)}`}>
          <span className={pathname === '/settings' ? 'matf' : 'mat'}>settings</span> <span>Settings</span>
        </Link>
      </nav>

      <div className="sb-foot">
        {tier === 'free' ? (
          <div className="sb-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <h4>UPGRADE PLAN</h4>
              <span style={{ fontSize: '10px', fontWeight: 900, color: tierInfo.color, background: 'var(--s2)', padding: '2px 8px', borderRadius: '6px' }}>{tierInfo.label}</span>
            </div>
            <p>Unlock mock interviews, salary intel, and unlimited job matching.</p>
            <button onClick={handleUpgrade}>View Plans ✦</button>
          </div>
        ) : tier === 'pro' ? (
          <div className="sb-up" style={{ background: 'linear-gradient(135deg, #fff7ed, #fff1e6)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <h4>PRO PLAN ACTIVE ✓</h4>
              <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--o3)', background: 'var(--o6)', padding: '2px 8px', borderRadius: '6px' }}>PRO</span>
            </div>
            <p>Upgrade to Advanced for mock interviews & salary intel.</p>
            <button onClick={handleUpgrade} style={{ background: 'var(--t1)' }}>Go Advanced ✦</button>
          </div>
        ) : (
          <div className="sb-up" style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
              <h4 style={{ color: 'var(--green)' }}>ADVANCED ACTIVE ✓</h4>
              <span style={{ fontSize: '10px', fontWeight: 900, color: 'var(--green)', background: 'var(--gbg)', padding: '2px 8px', borderRadius: '6px' }}>ADV</span>
            </div>
            <p style={{ color: 'var(--t2)' }}>You have full access to all Hirely AI features.</p>
            <Link href="/pricing" style={{ display: 'block', textAlign: 'center', fontSize: '12px', fontWeight: 800, color: 'var(--green)', marginTop: '8px', textDecoration: 'none' }}>Manage Subscription →</Link>
          </div>
        )}
      </div>
    </aside>
  );
}
