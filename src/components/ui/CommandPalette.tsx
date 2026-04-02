'use client';

import { useCommandNavigation, useEscClose } from '@/hooks/useAppHooks';
import { useUser } from '@/context/AuthContext';
import { createClient } from '@/utils/supabase/client';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const router = useRouter();
  const navigate = useCommandNavigation();
  const { user, profile } = useUser();
  const supabase = createClient();
  const [platformUsers, setPlatformUsers] = useState<any[]>([]);
  const isAdmin = profile?.role === 'admin';

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [dbResults, setDbResults] = useState<any[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEscClose(setIsOpen);

  const staticCmds = [
    { icon: 'grid_view', label: 'Dashboard', tag: 'Page', cat: 'Pages', action: () => navigate('/dashboard', setIsOpen) },
    { icon: 'manage_search', label: 'Job Match', tag: 'Page', cat: 'Pages', action: () => navigate('/jobmatch', setIsOpen) },
    { icon: 'payments', label: 'Salary Intelligence', tag: 'Page', cat: 'Pages', action: () => navigate('/salary', setIsOpen) },
    { icon: 'description', label: 'Analyze Resume', tag: 'Page', cat: 'Pages', action: () => navigate('/analyzer', setIsOpen) }
  ];

  useEffect(() => {
    if (!isOpen || !query || !isAdmin) return;
    
    const searchUsers = async () => {
      const { data } = await supabase
        .from('profiles')
        .select('id, full_name, email, tier')
        .or(`full_name.ilike.%${query}%,email.ilike.%${query}%`)
        .limit(5);
      if (data) setPlatformUsers(data);
    };
    
    const timer = setTimeout(searchUsers, 300);
    return () => clearTimeout(timer);
  }, [query, isOpen, isAdmin, supabase]);

  useEffect(() => {
    const performSearch = async () => {
      if (!query.trim() || !user) {
        setDbResults([]);
        return;
      }
      
      const { data: scans } = await supabase.from('user_scans').select('id, filename').eq('user_id', user.id).ilike('filename', `%${query}%`).limit(3);
      const { data: matches } = await supabase.from('user_matches').select('id, job_title').eq('user_id', user.id).ilike('job_title', `%${query}%`).limit(3);
      
      const results = [
        ...(scans || []).map(s => ({ icon: 'description', label: `Resume: ${s.filename}`, tag: 'Scan', cat: 'Recent Activity', action: () => navigate(`/analyzer?id=${s.id}`, setIsOpen) })),
        ...(matches || []).map(m => ({ icon: 'work', label: `Match: ${m.job_title}`, tag: 'Job', cat: 'Recent Activity', action: () => navigate(`/jobmatch?id=${m.id}`, setIsOpen) }))
      ];
      setDbResults(results);
    };

    const timer = setTimeout(performSearch, 300);
    return () => clearTimeout(timer);
  }, [query, user, supabase]);

  const filteredCmd = [
    ...staticCmds.filter(d => d.label.toLowerCase().includes(query.toLowerCase())),
    ...dbResults
  ];

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setTimeout(() => inputRef.current?.focus(), 50);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        handleOpen();
      }
    };

    window.addEventListener('open-cmdp', handleOpen);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('open-cmdp', handleOpen);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSelect = (idx: number) => {
    if (filteredCmd[idx]) {
      filteredCmd[idx].action();
      setIsOpen(false);
      setQuery('');
    }
  };

  if (!isOpen) return null;

  // Group by category
  const categories = Array.from(new Set(filteredCmd.map(d => d.cat)));

  return (
    <div id="cmd-overlay" className="open" onClick={() => setIsOpen(false)}>
      <div className="cmd-box afu" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-search-row">
          <span className="mat">search</span>
          <input 
            ref={inputRef}
            className="cmd-input" 
            placeholder="Search pages, tools, actions..." 
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') setSelectedIndex(s => Math.min(s + 1, filteredCmd.length - 1));
              if (e.key === 'ArrowUp') setSelectedIndex(s => Math.max(s - 1, 0));
              if (e.key === 'Enter') handleSelect(selectedIndex);
            }}
            autoComplete="off"
          />
          <button className="cmd-esc" onClick={() => setIsOpen(false)}>esc</button>
        </div>
        
        <div className="cmd-results">
          {categories.map(cat => (
            <div key={cat}>
              <div className="cmd-section-label">{cat}</div>
              {filteredCmd.filter(d => d.cat === cat).map((d) => {
                const globalIdx = filteredCmd.indexOf(d);
                return (
                  <div 
                    key={d.label} 
                    className={`cmd-item ${globalIdx === selectedIndex ? 'selected' : ''}`}
                    onMouseEnter={() => setSelectedIndex(globalIdx)}
                    onClick={() => handleSelect(globalIdx)}
                  >
                    <span className="mat">{d.icon}</span>
                    <span className="cmd-item-label">{d.label}</span>
                    <span className="cmd-item-tag">{d.tag}</span>
                    {globalIdx === selectedIndex && <kbd>↵</kbd>}
                  </div>
                );
              })}
            </div>
          ))}
          {filteredCmd.length === 0 && (
            <div style={{ textAlign: 'center', padding: '40px 20px' }}>
              <span className="mat" style={{ fontSize: '32px', color: 'var(--t4)', marginBottom: '12px' }}>search_off</span>
              <p style={{ fontSize: '14px', color: 'var(--t3)' }}>No results found for "{query}"</p>
            </div>
          )}
        </div>
        
        <div className="cmd-footer">
          <span><kbd>↑↓</kbd> Navigate</span>
          <span><kbd>↵</kbd> Select</span>
          <span><kbd>esc</kbd> Close</span>
        </div>
      </div>
    </div>
  );
}
