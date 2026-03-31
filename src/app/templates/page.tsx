'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription } from '@/hooks/useSubscription';

type AppTemplate = {
  id: number;
  name: string;
  img: string;
  category: string;
  isPro: boolean;
};

const TEMPLATES: AppTemplate[] = [
  { id: 1, name: 'Kinetic Standard (ATS)', img: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=400&h=560&fit=crop', category: 'Tech & Engineering', isPro: false },
  { id: 2, name: 'Modern Executive', img: 'https://images.unsplash.com/photo-1586282391215-684c85116790?w=400&h=560&fit=crop', category: 'Management', isPro: true },
  { id: 3, name: 'Creative Portfolio', img: 'https://images.unsplash.com/photo-1586282391129-76a6ceb20454?w=400&h=560&fit=crop', category: 'Design', isPro: true },
  { id: 4, name: 'Clean Minimal', img: 'https://images.unsplash.com/photo-1586281380117-5a60ae2050cc?w=400&h=560&fit=crop', category: 'All Roles', isPro: false },
];

export default function TemplatesPage() {
  const { tier } = useSubscription();
  const [filter, setFilter] = useState('All');

  const categories = ['All', 'Tech & Engineering', 'Management', 'Design', 'All Roles'];
  const filtered = filter === 'All' ? TEMPLATES : TEMPLATES.filter(t => t.category === filter);

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const handleUseTemplate = (t: AppTemplate) => {
    if (t.isPro && tier === 'free') {
      showToast('error', 'This template requires a Pro plan.');
      return;
    }
    showToast('success', `Applying ${t.name} template...`);
  };

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div className="pg-hdr" style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)', marginBottom: '8px' }}>ATS Resume Templates</h1>
            <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Start with a proven layout optimized for applicant tracking systems.</p>
          </div>

          {/* Filter Bar */}
          <div style={{ display: 'flex', gap: '8px', marginBottom: '24px', overflowX: 'auto', paddingBottom: '8px' }}>
            {categories.map(c => (
              <button 
                key={c}
                className={`sal-filter-btn ${filter === c ? 'active' : ''}`}
                onClick={() => setFilter(c)}
                style={{
                  padding: '8px 16px', borderRadius: '999px', fontSize: '13px', fontWeight: 700,
                  whiteSpace: 'nowrap', cursor: 'pointer', transition: 'all 150ms',
                  background: filter === c ? 'var(--t1)' : 'var(--w)',
                  color: filter === c ? '#fff' : 'var(--t3)',
                  border: `1px solid ${filter === c ? 'var(--t1)' : 'var(--bd)'}`
                }}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Template Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '24px' }}>
            {filtered.map((t, i) => (
              <div key={t.id} className="card afu" style={{ padding: '16px', animationDelay: `${i * 100}ms` }}>
                <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--bd)', marginBottom: '16px', background: 'var(--s1)', aspectRatio: '1/1.4' }}>
                  <img src={t.img} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.9 }} />
                  {t.isPro && (
                    <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--t1)', color: '#fff', fontSize: '10px', fontWeight: 900, padding: '4px 8px', borderRadius: '4px', letterSpacing: '.05em' }}>
                      PRO
                    </div>
                  )}
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', opacity: 0, transition: 'opacity 200ms', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                       onMouseOver={e => e.currentTarget.style.opacity = '1'}
                       onMouseOut={e => e.currentTarget.style.opacity = '0'}>
                    <button className="btn btn-p" onClick={() => handleUseTemplate(t)}>Use Template</button>
                  </div>
                </div>
                <div style={{ fontSize: '15px', fontWeight: 900, color: 'var(--t1)', marginBottom: '4px' }}>{t.name}</div>
                <div style={{ fontSize: '12px', color: 'var(--t3)', fontWeight: 600 }}>{t.category}</div>
              </div>
            ))}
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
