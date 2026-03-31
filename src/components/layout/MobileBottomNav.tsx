'use client';

import { useRouter, usePathname } from 'next/navigation';

export default function MobileBottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const gp = (path: string) => {
    router.push(path);
  };

  const showComingSoon = (feature: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'info', msg: `${feature} is coming soon in the next mobile update!` } }));
  };

  return (
    <nav className="mobile-bottom-nav">
      <div className="mbn-inner" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', maxWidth: '500px', margin: '0 auto', height: '64px' }}>
        <div 
          className={`mbn-item ${pathname === '/dashboard' ? 'active' : ''}`} 
          onClick={() => gp('/dashboard')}
          style={{ cursor: 'pointer', textAlign: 'center', flex: 1, color: pathname === '/dashboard' ? 'var(--o3)' : 'var(--t3)' }}
        >
          <span className={pathname === '/dashboard' ? 'matf' : 'mat'} style={{ fontSize: '24px' }}>grid_view</span>
          <div style={{ fontSize: '10px', fontWeight: 700, marginTop: '2px' }}>Home</div>
        </div>
        
        <div 
          className={`mbn-item ${pathname === '/jobmatch' ? 'active' : ''}`} 
          onClick={() => gp('/jobmatch')}
          style={{ cursor: 'pointer', textAlign: 'center', flex: 1, color: pathname === '/jobmatch' ? 'var(--o3)' : 'var(--t3)' }}
        >
          <span className={pathname === '/jobmatch' ? 'matf' : 'mat'} style={{ fontSize: '24px' }}>manage_search</span>
          <div style={{ fontSize: '10px', fontWeight: 700, marginTop: '2px' }}>Match</div>
        </div>

        <button 
          className="mbn-fab" 
          onClick={() => gp('/analyzer')}
          style={{ 
            width: '56px', 
            height: '56px', 
            borderRadius: '50%', 
            background: 'linear-gradient(135deg, var(--o2), var(--o3))', 
            color: '#fff', 
            border: 'none', 
            boxShadow: 'var(--sh-or)', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            marginTop: '-30px',
            cursor: 'pointer'
          }}
        >
          <span className="mat" style={{ fontSize: '28px' }}>add</span>
        </button>

        <div 
          className={`mbn-item ${pathname === '/interview' ? 'active' : ''}`} 
          onClick={() => gp('/interview')}
          style={{ cursor: 'pointer', textAlign: 'center', flex: 1, color: pathname === '/interview' ? 'var(--o3)' : 'var(--t3)' }}
        >
          <span className={pathname === '/interview' ? 'matf' : 'mat'} style={{ fontSize: '24px' }}>mic</span>
          <div style={{ fontSize: '10px', fontWeight: 700, marginTop: '2px' }}>Coach</div>
        </div>

        <div 
          className={`mbn-item ${pathname === '/profile' ? 'active' : ''}`} 
          onClick={() => gp('/profile')}
          style={{ cursor: 'pointer', textAlign: 'center', flex: 1, color: pathname === '/profile' ? 'var(--o3)' : 'var(--t3)' }}
        >
          <span className={pathname === '/profile' ? 'matf' : 'mat'} style={{ fontSize: '24px' }}>person</span>
          <div style={{ fontSize: '10px', fontWeight: 700, marginTop: '2px' }}>Profile</div>
        </div>
      </div>
    </nav>
  );
}

