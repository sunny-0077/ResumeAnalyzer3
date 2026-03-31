'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';

export default function CommandPalette() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const cmdData = [
    { icon: 'grid_view', label: 'Dashboard', tag: 'Page', cat: 'Pages', action: () => router.push('/dashboard') },
    { icon: 'manage_search', label: 'Job Match', tag: 'Page', cat: 'Pages', action: () => router.push('/jobmatch') },
    { icon: 'payments', label: 'Salary Intelligence', tag: 'Page', cat: 'Pages', action: () => router.push('/salary') },
    { icon: 'mic', label: 'Interview Prep', tag: 'Tool', cat: 'Tools', action: () => showToast('info', 'Opening Interview Prep...') },
    { icon: 'trending_up', label: 'Career Path Predictor', tag: 'Tool', cat: 'Tools', action: () => showToast('info', 'Starting Predictor...') },
    { icon: 'description', label: 'Resume Analyzer', tag: 'Page', cat: 'Pages', action: () => router.push('/analyzer') },
    { icon: 'mail', label: 'Cover Letters', tag: 'Tool', cat: 'Tools', action: () => showToast('info', 'Opening Generator...') },
    { icon: 'upload_file', label: 'Upload New Resume', tag: 'Action', cat: 'Actions', action: () => router.push('/analyzer') },
    { icon: 'share', label: 'Share Score Card', tag: 'Action', cat: 'Actions', action: () => window.dispatchEvent(new CustomEvent('open-share')) },
    { icon: 'auto_awesome', label: 'Upgrade to Pro', tag: 'Action', cat: 'Actions', action: () => window.dispatchEvent(new CustomEvent('open-upgrade')) },
    { icon: 'error_outline', label: 'Error States Demo', tag: 'Page', cat: 'Pages', action: () => router.push('/errors') },
  ];

  const filteredCmd = cmdData.filter(d => 
    !query || d.label.toLowerCase().includes(query.toLowerCase()) || d.cat.toLowerCase().includes(query.toLowerCase())
  );

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
      if (e.key === 'Escape') setIsOpen(false);
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
