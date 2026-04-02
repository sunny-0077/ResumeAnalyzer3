'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useUser } from '@/context/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { createClient } from '@/utils/supabase/client';

export default function TemplatesPage() {
  const { user } = useUser();
  const { tier } = useSubscription();
  const supabase = createClient();
  const [templates, setTemplates] = useState<any[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'favorites'>('all');
  const [categoryFilter, setCategoryFilter] = useState('All');

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        const { data: tData } = await supabase.from('career_templates').select('*');
        const { data: fData } = await supabase.from('user_favorite_templates').select('template_id').eq('user_id', user.id);
        
        if (tData) setTemplates(tData);
        if (fData) setFavorites(fData.map(f => f.template_id));
        setLoading(false);
      }
    };
    fetchData();
  }, [user, supabase]);

  const toggleFavorite = async (id: string) => {
    if (!user) return;
    const isFav = favorites.includes(id);
    
    if (isFav) {
      await supabase.from('user_favorite_templates').delete().eq('user_id', user.id).eq('template_id', id);
      setFavorites(prev => prev.filter(f => f !== id));
    } else {
      await supabase.from('user_favorite_templates').insert({ user_id: user.id, template_id: id });
      setFavorites(prev => [...prev, id]);
    }
  };

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const handleUseTemplate = (t: any) => {
    if (t.is_pro && tier === 'free') {
      showToast('error', 'Pro subscription required for this template.');
    } else {
      window.location.href = `/editor?id=${t.id}`;
    }
  };

  const categories = ['All', 'Tech & Engineering', 'Management', 'Design', 'Creative'];
  
  const baseFiltered = categoryFilter === 'All' 
    ? templates 
    : templates.filter(t => t.category === categoryFilter);

  const finalFiltered = filter === 'favorites'
    ? baseFiltered.filter(t => favorites.includes(t.id))
    : baseFiltered;

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div className="pg-hdr">
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>Resume Templates</h1>
            <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Battle-tested, ATS-optimized designs to get you hired.</p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {categories.map(c => (
                <button 
                  key={c} 
                  className={`btn btn-sm ${categoryFilter === c ? 'btn-p' : 'btn-s'}`}
                  onClick={() => setCategoryFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <button 
              className={`btn btn-sm ${filter === 'favorites' ? 'btn-p' : 'btn-s'}`} 
              onClick={() => setFilter(filter === 'all' ? 'favorites' : 'all')}
            >
              <span className="mat" style={{ fontSize: '14px', marginRight: '6px' }}>favorite</span> 
              {filter === 'favorites' ? 'Showing Favorites' : 'My Favorites'}
            </button>
          </div>

          {loading ? (
            <div className="template-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {[1,2,3,4,5,6].map(i => <div key={i} className="sk" style={{ height: '400px', borderRadius: '16px' }}></div>)}
            </div>
          ) : (
            <div className="template-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
              {finalFiltered.map((t, idx) => (
                <div key={t.id} className="card afu" style={{ padding: '16px', animationDelay: `${idx * 100}ms` }}>
                  <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden', border: '1px solid var(--bd)', marginBottom: '16px', background: 'var(--s1)', aspectRatio: '1/1.4' }}>
                    <img src={t.thumbnail} alt={t.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    
                    {t.is_pro && (
                      <div style={{ position: 'absolute', top: '12px', left: '12px', background: 'var(--t1)', color: '#fff', fontSize: '10px', fontWeight: 900, padding: '4px 8px', borderRadius: '4px', letterSpacing: '.05em' }}>
                        PRO
                      </div>
                    )}

                    <button 
                      className="fav-btn" 
                      onClick={(e) => { e.stopPropagation(); toggleFavorite(t.id); }}
                      style={{ position: 'absolute', top: '12px', right: '12px', background: 'var(--w)', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: 'none', cursor: 'pointer', boxShadow: 'var(--sh1)' }}
                    >
                      <span className="mat" style={{ color: favorites.includes(t.id) ? 'var(--o1)' : 'var(--t4)', fontSize: '20px' }}>
                        {favorites.includes(t.id) ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>

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
          )}

          {(!loading && finalFiltered.length === 0) && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <span className="mat" style={{ fontSize: '48px', color: 'var(--s3)', marginBottom: '16px' }}>search_off</span>
              <p style={{ color: 'var(--t3)', fontWeight: 600 }}>No templates found in this category.</p>
            </div>
          )}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
