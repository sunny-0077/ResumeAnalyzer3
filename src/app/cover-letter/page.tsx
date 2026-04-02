'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription } from '@/hooks/useSubscription';
import { useUser } from '@/context/AuthContext';
import { createClient } from '@/utils/supabase/client';
import { fetchWithRetry, capitalize, bulletsToSentence, track } from '@/lib/utils';

export default function CoverLetterGenerator() {
  const router = useRouter();
  const { tier } = useSubscription();
  const { user, profile, refreshProfile }: any = useUser();
  const supabase = createClient();

  const [company, setCompany] = useState('');
  const [role, setRole] = useState('');
  const [jd, setJd] = useState('');
  const [resume, setResume] = useState('');
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [displayLetter, setDisplayLetter] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [tone, setTone] = useState<'formal' | 'startup' | 'aggressive'>('formal');
  const [temperature, setTemperature] = useState(0.5);

  useEffect(() => {
    if (tier === 'pro' || tier === 'advanced') {
      setTemperature(0.7);
    } else {
      setTemperature(0.4);
    }
  }, [tier]);

  const [cooldown, setCooldown] = useState(false);

  // 1. Initial Load from Profile
  useEffect(() => {
    if (profile?.resume_text && !resume) {
      setResume(profile.resume_text);
      setLastSaved(profile.resume_text);
    } else if (!profile?.resume_text && !resume) {
      // Fallback default
      const def = 'Senior Product Manager with 8+ years of experience leading cross-functional teams at Google and Amazon. Expert in user-centric design, A/B testing, and scaling cloud-native SaaS products.';
      setResume(def);
      setLastSaved(def);
    }
  }, [profile]);

  // 2. Debounced Auto-Save to Supabase
  useEffect(() => {
    if (!user || resume === lastSaved) return;

    const timer = setTimeout(async () => {
      setIsSaving(true);
      const { error } = await supabase
        .from('profiles')
        .update({ resume_text: resume })
        .eq('id', user.id);
      
      if (!error) {
        setLastSaved(resume);
        // Silent refresh of profile context
        refreshProfile();
      }
      setIsSaving(false);
    }, 2000); // 2s debounce

    return () => clearTimeout(timer);
  }, [resume, user, lastSaved, supabase]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        generateLetter();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [company, role, jd, resume]);

  const typeWriter = (text: string) => {
    let i = 0;
    setDisplayLetter('');
    const interval = setInterval(() => {
      setDisplayLetter((prev) => prev + text.charAt(i));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, 10);
  };

  const handleRegenerate = () => {
    setTemperature(prev => Math.min(prev + 0.1, 0.9));
    generateLetter();
  };

  const generateLetter = async () => {
    if (cooldown) return;
    if (!jd.trim() || !company.trim() || !role.trim()) {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'warning', msg: 'Please enter Company, Role, and JD.' } }));
      return;
    }
    
    if (!resume || resume.trim().length < 50) {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'error', msg: 'Resume too short (min 50 chars)' } }));
      return;
    }
    
    setIsGenerating(true);
    setCooldown(true);
    
    // Sanitize and truncate to save tokens
    const cleanResume = bulletsToSentence(resume.trim()).replace(/\s+/g, ' ');
    const trimmedResume = cleanResume.slice(0, 4000);
    const safeCompany = capitalize(company || 'your target company');
    const safeRole = capitalize(role || 'the desired role');
    
    try {
      // Free-tier usage limit check
      if (tier === 'free') {
        const { count, error: countError } = await supabase
          .from('user_letters')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', user.id);

        if (!countError && count !== null && count >= 3) {
          window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'error', msg: 'Usage limit reached. Please upgrade to Pro.' } }));
          setIsGenerating(false);
          setCooldown(false);
          return;
        }
      }

      track('generate_clicked', { plan: tier || 'free' });
      
      const res = await fetchWithRetry('/api/generate-cover-letter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          company: safeCompany, 
          role: safeRole, 
          resume: trimmedResume, 
          tone,
          temperature
        })
      });
      const data = await res.json();
      
      if (data.output) {
        const banned = ["damn", "shit"];
        if (banned.some(word => data.output.toLowerCase().includes(word))) {
          handleRegenerate();
          return;
        }

        const cleanedOutput = data.output.replace(/\s+/g, ' ').replace(/\bi\b/g, 'I');
        setGeneratedLetter(cleanedOutput);
        typeWriter(cleanedOutput);
        
        if (user) {
          await supabase.from('user_letters').insert({
            user_id: user.id,
            company_name: company,
            role_name: role,
            letter_content: data.output
          });
        }
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'AI Letter Generated!' } }));
      }
    } catch (e: any) {
      const msg = e.message === 'Request timed out after 15 seconds' ? 'Connection timed out. Please try again.' : 'Generation failed.';
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'error', msg } }));
    }
    setIsGenerating(false);
    setTimeout(() => setCooldown(false), 1500);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Copied' } }));
    setTimeout(() => {
      window.dispatchEvent(new CustomEvent('clear-toast'));
    }, 2000);
  };

  return (
    <div id="page-cover-letter" className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '0', background: 'var(--surface)' }}>
          
          <div className="ip-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 900 }}>Cover Letter Generator ✍️</h1>
              <span className="badge bo" style={{ fontSize: '10px' }}>AI-POWERED</span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
               <button className="btn btn-s btn-sm" onClick={() => setGeneratedLetter('')}>Clear All</button>
            </div>
          </div>

          <div style={{ padding: '0 40px 40px' }}>
            <div className="ip-grid">
              
              {/* LEFT COLUMN: INPUTS */}
              <div className="afu">
                <div className="ip-card" style={{ marginBottom: '24px' }}>
                  <div className="dash-card-h">
                     <h3 style={{ fontSize: '15px', fontWeight: 900 }}>Your Master Resume</h3>
                     <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {isSaving && <span className="mat spin" style={{ fontSize: '14px', color: 'var(--o1)' }}>sync</span>}
                        <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--t4)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                          {isSaving ? 'Syncing...' : (lastSaved ? 'Cloud Saved' : 'Draft')}
                        </span>
                     </div>
                  </div>
                  <div className="ab-inp-w" style={{ marginTop: '16px' }}>
                    <label className="ab-inp-l">Company Name</label>
                    <input className="ab-input" value={company} onChange={e => setCompany(e.target.value)} placeholder="e.g. Google" />
                  </div>
                  <div className="ab-inp-w" style={{ marginTop: '16px' }}>
                    <label className="ab-inp-l">Position Role</label>
                    <input className="ab-input" value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. Senior PM" />
                  </div>
                  <div className="ab-inp-w" style={{ marginTop: '16px' }}>
                    <label className="ab-inp-l">Job Description (JD)</label>
                    <textarea 
                      className="ab-area" 
                      placeholder="Paste the job description here..."
                      value={jd}
                      onChange={(e) => setJd(e.target.value)}
                      onInput={(e: any) => {
                        e.target.style.height = 'auto';
                        e.target.style.height = e.target.scrollHeight + 'px';
                      }}
                      style={{ minHeight: '120px', fontSize: '14px', overflow: 'hidden' }}
                    />
                  </div>

                  <div className="ab-inp-w" style={{ marginTop: '20px' }}>
                    <label className="ab-inp-l">Select Resume Version</label>
                    <select className="ab-input" style={{ appearance: 'none', background: 'var(--sf) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E") no-repeat right 12px center' }}>
                      <option>Senior PM v.4 (Default)</option>
                      <option>Product Lead v.2</option>
                      <option>Strategy Consultant v.1</option>
                    </select>
                  </div>
                </div>

                <div className="ip-card">
                  <div className="dash-card-h">
                     <h3 style={{ fontSize: '15px', fontWeight: 900 }}>Tone & Personalization</h3>
                  </div>
                  <div className="ftabs" style={{ marginTop: '16px', marginBottom: '0', width: '100%' }}>
                    <button className={`ftab ${tone === 'formal' ? 'active' : ''}`} onClick={() => setTone('formal')} style={{ flex: 1 }}>Formal</button>
                    <button className={`ftab ${tone === 'startup' ? 'active' : ''}`} onClick={() => setTone('startup')} style={{ flex: 1 }}>Startup</button>
                    <button className={`ftab ${tone === 'aggressive' ? 'active' : ''}`} onClick={() => setTone('aggressive')} style={{ flex: 1 }}>Aggressive</button>
                  </div>
                  
                  <div style={{ marginTop: '24px' }}>
                    <button 
                      className="btn btn-p btn-lg" 
                      style={{ width: '100%', padding: '16px' }}
                      onClick={generateLetter}
                      disabled={isGenerating || cooldown}
                    >
                      {isGenerating ? (
                        <><span className="mat" style={{ animation: 'spin 1.5s linear infinite', marginRight: '10px' }}>sync</span> Drafting Letter...</>
                      ) : (
                        <><span className="mat" style={{ marginRight: '10px' }}>auto_awesome</span> Generate Cover Letter</>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: PREVIEW */}
              <div className="afu">
                <div className="ip-card" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
                  <div className="dash-card-h">
                     <h3 style={{ fontSize: '15px', fontWeight: 900 }}>Preview</h3>
                     {generatedLetter && (
                       <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            className="btn btn-s btn-sm" 
                            onClick={handleRegenerate} 
                            disabled={isGenerating}
                            title="Regenerate Variation"
                          >
                            <span className="mat" style={{ fontSize: '16px', animation: isGenerating ? 'spin 1.5s linear infinite' : 'none' }}>refresh</span>
                          </button>
                          <button className="btn btn-s btn-sm" onClick={() => setEditMode(!editMode)}>
                            <span className="mat" style={{ fontSize: '16px' }}>{editMode ? 'visibility' : 'edit'}</span>
                          </button>
                          <button className="btn btn-s btn-sm" onClick={copyToClipboard}>
                            <span className="mat" style={{ fontSize: '16px' }}>content_copy</span>
                          </button>
                       </div>
                     )}
                  </div>

                  {!generatedLetter ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: 0.5 }} className="no-print">
                      <span className="mat" style={{ fontSize: '48px', marginBottom: '16px' }}>description</span>
                      <p style={{ maxWidth: '240px', fontSize: '14px', fontWeight: 600 }}>Your AI-generated cover letter will appear here.</p>
                    </div>
                  ) : (
                    <div style={{ flex: 1, marginTop: '20px' }}>
                      <div className="print-only" style={{ display: 'none', marginBottom: '40px' }}>
                        <h1 style={{ color: 'var(--o1)', fontSize: '24px', marginBottom: '8px' }}>Hirely AI — Professional Cover Letter</h1>
                        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '32px' }} />
                      </div>
                      {editMode ? (
                        <textarea 
                          className="ip-ans-area no-print"
                          value={generatedLetter}
                          onChange={(e) => setGeneratedLetter(e.target.value)}
                          onInput={(e: any) => {
                            e.target.style.height = 'auto';
                            e.target.style.height = e.target.scrollHeight + 'px';
                          }}
                          style={{ width: '100%', minHeight: '480px', border: 'none', background: 'var(--sf)', padding: '20px', borderRadius: '16px', fontSize: '14px', lineHeight: 1.6, resize: 'none', overflow: 'hidden' }}
                        />
                      ) : (
                        <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: 1.7, color: 'var(--t1)', padding: '10px' }}>
                          {displayLetter}
                        </div>
                      )}
                    </div>
                  )}

                  {generatedLetter && (
                    <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border)' }} className="no-print">
                       <button className="btn btn-p" style={{ width: '100%' }} onClick={() => window.print()}>
                         Download as PDF
                       </button>
                    </div>
                  )}
                </div>

                {/* HELP BLOCK */}
                <div className="ip-card" style={{ marginTop: '24px', background: 'var(--o7)', border: '1.5px dashed var(--o5)' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="mat" style={{ color: 'var(--o3)', fontSize: '18px' }}>lightbulb</span>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--o2)' }}>PRO TIP</h4>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.5, fontWeight: 600 }}>
                    Our AI cross-references your resume v.4 with the JD keywords to ensure high ATS relevance.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
