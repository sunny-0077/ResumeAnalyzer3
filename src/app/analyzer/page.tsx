'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useLoading } from '@/hooks/useAppHooks';
import { createClient } from '@/utils/supabase/client';

export default function ResumeAnalyzer() {
  const [state, setState] = useState<'idle' | 'uploading' | 'analyzing' | 'result'>('idle');
  const [progress, setProgress] = useState(0);
  const [score, setScore] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const { loading: isAnalyzing, setLoading: setIsAnalyzing } = useLoading();
  const supabase = createClient();

  const showToast = (type: any, msg: string) => window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));

  const handleUpload = (uploadedFile: File) => {
    const allowed = ["application/pdf","text/plain"];
    if (!allowed.includes(uploadedFile.type)) {
      showToast("error","Only PDF or TXT allowed");
      return;
    }

    if (uploadedFile.size > 2 * 1024 * 1024) {
      showToast("error","File must be < 2MB");
      return;
    }

    setFile(uploadedFile);
    startAnalysis();
  };

  const startAnalysis = async () => {
    setIsAnalyzing(true);
    setState('uploading');
    let p = 0;
    const interval = setInterval(() => {
      p += Math.random() * 30;
      if (p >= 100) {
        p = 100;
        clearInterval(interval);
        setState('analyzing');
        setTimeout(async () => {
          const finalScore = 84;
          const rawKeywords = ['Kubernetes', 'SaaS', 'Kubernetes'];
          const rawGaps = ['System Design', 'System Design'];
          
          const uniqueKeywords = [...new Set(rawKeywords)];
          const uniqueGaps = [...new Set(rawGaps)];

          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            await supabase.from('user_scans').insert({
              user_id: user.id,
              score: finalScore,
              filename: file?.name || 'resume.pdf',
              details: { match: 'Technical PM', gaps: uniqueGaps, keywords: uniqueKeywords }
            });
          }
          setState('result');
          setScore(finalScore);
          setIsAnalyzing(false);
          showToast('success', 'Analysis saved to your profile!');
        }, 2000);
      }
      setProgress(p);
    }, 400);
  };

  return (
    <div id="page-analyzer" className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main">
          <div className="dash-header">
            <div>
              <h1>Hirely AI Analysis 🚀</h1>
              <p style={{ color: 'var(--t2)', fontWeight: 600, marginTop: '4px' }}>
                Simulate a real ATS scan and see how a recruiter views your profile.
              </p>
            </div>
            <button className="btn btn-s" onClick={() => setState('idle')}><span className="mat">refresh</span> New Analysis</button>
          </div>

          {state === 'idle' && (
            <div className="afu">
              <div 
                className="ob-dropzone" 
                style={{ minHeight: '360px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} 
                onClick={() => document.getElementById('file-upload')?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  if (e.dataTransfer.files?.[0]) handleUpload(e.dataTransfer.files[0]);
                }}
              >
                <input 
                  type="file" 
                  id="file-upload" 
                  accept=".pdf,.txt" 
                  style={{ display: 'none' }} 
                  onChange={(e) => {
                    if (e.target.files?.[0]) handleUpload(e.target.files[0]);
                  }} 
                />
                <div style={{ width: '80px', height: '80px', background: 'var(--o6)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                  <span className="mat" style={{ fontSize: '40px', color: 'var(--o3)' }}>cloud_upload</span>
                </div>
                <h3>Drop your resume here (PDF or TXT)</h3>
                <p style={{ maxWidth: '320px', margin: '8px auto 24px' }}>Drag and drop your file or click to browse. Max file size: 2MB.</p>
                <button className="btn btn-p" onClick={(e) => { e.stopPropagation(); document.getElementById('file-upload')?.click(); }}>
                   Select File to Analyze
                </button>
              </div>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px', marginTop: '40px' }}>
                <div className="dash-card">
                  <div className="stat-icon" style={{ background: 'var(--o6)', color: 'var(--o3)' }}><span className="mat">search_check</span></div>
                  <h4 style={{ marginBottom: '8px' }}>ATS Simulation</h4>
                  <p style={{ fontSize: '13px', color: 'var(--t3)', lineHeight: 1.5 }}>Our AI mimics Oracle Taleo, Workday, and Greenhouse parsers to ensure your layout is 100% visible.</p>
                </div>
                <div className="dash-card">
                  <div className="stat-icon" style={{ background: 'var(--gbg)', color: 'var(--green)' }}><span className="mat">key</span></div>
                  <h4 style={{ marginBottom: '8px' }}>Keyword Insight</h4>
                  <p style={{ fontSize: '13px', color: 'var(--t3)', lineHeight: 1.5 }}>Identify missing skills and high-leverage keywords that boost your visibility in recruiter searches.</p>
                </div>
                <div className="dash-card">
                  <div className="stat-icon" style={{ background: 'var(--pl)', color: 'var(--purple)' }}><span className="mat">edit_note</span></div>
                  <h4 style={{ marginBottom: '8px' }}>Smart Editing</h4>
                  <p style={{ fontSize: '13px', color: 'var(--t3)', lineHeight: 1.5 }}>Receive real-time line-by-line feedback on your bullet points to maximize impact scores.</p>
                </div>
              </div>

              <div style={{ marginTop: '48px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '18px', fontWeight: 900 }}>Your Recent Scans</h3>
                  <button className="btn btn-s btn-sm">View Archive</button>
                </div>
                <div className="dash-card" style={{ padding: '0' }}>
                  {[
                    { name: 'Senior Fullstack v.4', date: '2 hours ago', score: 87, status: 'OPTIMIZED' },
                    { name: 'Generic Backend Developer', date: '1 day ago', score: 62, status: 'ACTION NEEDED' },
                    { name: 'Charan_Resume_Stripe_v1', date: '3 days ago', score: 78, status: 'STRATEGIC' },
                  ].map((scan, i) => (
                    <div key={i} className="sb-it" style={{ padding: '16px 20px', borderBottom: i === 2 ? 'none' : '1px solid var(--border)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderRadius: '0' }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                          <span className="mat" style={{ color: 'var(--t3)' }}>description</span>
                          <div>
                            <p style={{ fontWeight: 700, fontSize: '14px' }}>{scan.name}</p>
                            <span style={{ fontSize: '12px', color: 'var(--t4)' }}>Analyzed {scan.date}</span>
                          </div>
                       </div>
                       <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                          <span className="sb-badge" style={{ background: scan.status === 'ACTION NEEDED' ? 'var(--rbg)' : scan.status === 'OPTIMIZED' ? 'var(--gbg)' : 'var(--abg)', color: scan.status === 'ACTION NEEDED' ? 'var(--red)' : scan.status === 'OPTIMIZED' ? 'var(--green)' : 'var(--amber)', fontSize: '10px' }}>{scan.status}</span>
                          <div style={{ textAlign: 'right', minWidth: '40px' }}>
                             <span style={{ fontWeight: 900, color: 'var(--t1)' }}>{scan.score}</span><span style={{ fontSize: '10px', color: 'var(--t3)', marginLeft: '2px' }}>/100</span>
                          </div>
                          <span className="mat" style={{ color: 'var(--t4)' }}>chevron_right</span>
                       </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {(state === 'uploading' || state === 'analyzing') && (
            <div className="afu" style={{ textAlign: 'center', padding: '100px 20px' }}>
              <div style={{ width: '120px', height: '120px', position: 'relative', margin: '0 auto 32px' }}>
                 <svg width="120" height="120" viewBox="0 0 120 120">
                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--s2)" strokeWidth="8"/>
                    <circle cx="60" cy="60" r="54" fill="none" stroke="var(--o3)" strokeWidth="8" strokeLinecap="round" strokeDasharray="339.29" strokeDashoffset={339.29 - (progress/100)*339.29} style={{ transition: 'stroke-dashoffset 0.4s ease' }}/>
                 </svg>
                 <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '24px', fontWeight: 900, color: 'var(--o2)' }}>
                   {Math.round(progress)}%
                 </div>
              </div>
              <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '8px' }}>{state === 'uploading' ? 'Uploading Resume...' : 'Running AI Diagnostics...'}</h2>
              <p style={{ color: 'var(--t3)', fontWeight: 600 }}>{state === 'uploading' ? 'Sending secure file to analysis engine' : 'Parsing structure, extracting keywords, and simulating ATS results'}</p>
              
              <div className="dash-card" style={{ maxWidth: '400px', margin: '48px auto 0', padding: '16px 20px', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span className="mat" style={{ color: 'var(--o3)' }}>lock</span>
                <p style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.4 }}>Your data is encrypted and never stored unless you choose to save it.</p>
              </div>
            </div>
          )}

          {state === 'result' && (
            <div className="afu">
              <div className="dash-grid-2">
                    <div className="dash-card">
                       <div className="print-only" style={{ display: 'none', marginBottom: '32px' }}>
                          <h1 style={{ color: 'var(--o1)', fontSize: '28px' }}>Hirely AI Analysis Report</h1>
                          <p style={{ color: 'var(--t3)', fontWeight: 700 }}>Candidate: Charan · Date: {new Date().toLocaleDateString()} · Job: Product Manager</p>
                       </div>
                       <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
                          <div className="health-ring-w" style={{ width: '140px', height: '140px' }}>
                             <svg width="140" height="140" viewBox="0 0 140 140">
                                <circle cx="70" cy="70" r="62" fill="none" stroke="var(--o6)" strokeWidth="14"/>
                                <circle cx="70" cy="70" r="62" fill="none" stroke="var(--o3)" strokeWidth="14" strokeLinecap="round" strokeDasharray="389.5" strokeDashoffset={389.5 - (score/100)*389.5} style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.34, 1.56, 0.64, 1)' }}/>
                             </svg>
                             <div className="health-ring-c">
                                <h4 style={{ fontSize: '36px' }}>{score}</h4>
                                <span style={{ fontSize: '11px' }}>ATS SCORE</span>
                             </div>
                          </div>
                          <div style={{ flex: 1 }}>
                             <h2 style={{ fontSize: '28px', fontWeight: 900, marginBottom: '8px' }}>Strategic Visibility 🛡️</h2>
                             <p style={{ color: 'var(--t2)', fontSize: '15px', lineHeight: 1.5, marginBottom: '20px' }}>Your resume is highly readable for modern ATS. Minor adjustments to your Experience bullets could push you to the top 1%.</p>
                             <div style={{ display: 'flex', gap: '10px' }} className="no-print">
                                <button className="btn btn-p" onClick={() => window.dispatchEvent(new CustomEvent('open-share'))}>Share Performance</button>
                                <button className="btn btn-s" onClick={() => window.print()}>Download Full PDF Report</button>
                             </div>
                          </div>
                       </div>

                   <div style={{ marginTop: '40px', borderTop: '1px solid var(--border)', paddingTop: '32px', position: 'relative' }}>
                      <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '20px' }}>In-Depth Advanced Insights</h3>
                      
                      {/* BLURRED PREVIEW BLOCK */}
                      <div style={{ filter: 'blur(10px)', opacity: 0.3, pointerEvents: 'none', userSelect: 'none' }}>
                        <div className="dash-time">
                           <div className="dash-time-i">
                              <div className="dash-time-dot"></div>
                              <div className="dash-time-c">
                                 <p>Recruiter 6-Second Scan Prediction</p>
                                 <span>Detected Seniority: Staff / Lead. Parsing confidence: 98%.</span>
                              </div>
                           </div>
                           <div className="dash-time-i">
                              <div className="dash-time-dot blue"></div>
                              <div className="dash-time-c">
                                 <p>Achievement vs Responsibility Detection</p>
                                 <span>Only 30% of your bullets are results-oriented. Advanced metrics needed.</span>
                              </div>
                           </div>
                           <div className="dash-time-i">
                              <div className="dash-time-dot green"></div>
                              <div className="dash-time-c">
                                 <p>Competitor Peer Comparison</p>
                                 <span>You rank in the top 12% of applicants for Stripe hiring manager filtered search.</span>
                              </div>
                           </div>
                        </div>
                      </div>

                      {/* LOCK OVERLAY */}
                      <div className="locked-overlay">
                         <div className="locked-msg afu">
                            <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--o6)', color: 'var(--o3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                               <span className="mat" style={{ fontSize: '24px' }}>lock</span>
                            </div>
                            <h4>Unlock Advanced Insights</h4>
                            <p>Get recruiter scan simulations, peer benchmarks, and deep bullet analysis with Advanced tier.</p>
                            <button className="btn btn-p" style={{ width: '100%' }} onClick={() => window.dispatchEvent(new CustomEvent('open-upgrade'))}>
                               Upgrade to Advanced
                            </button>
                         </div>
                      </div>
                   </div>
                </div>

                <div className="dash-card">
                   <div className="dash-card-h">
                      <h3>Keyword Analysis</h3>
                      <span className="sb-new" style={{ fontSize: '9px' }}>AI UPDATED</span>
                   </div>
                   <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '24px' }}>
                      <div className="ob-chip active" style={{ fontSize: '12px', padding: '8px 14px' }}>Next.js (High)</div>
                      <div className="ob-chip active" style={{ fontSize: '12px', padding: '8px 14px' }}>React Native (High)</div>
                      <div className="ob-chip active" style={{ fontSize: '12px', padding: '8px 14px' }}>AWS (Mid)</div>
                      <div className="ob-chip" style={{ fontSize: '12px', padding: '8px 14px', borderStyle: 'dashed' }}>Kubernetes (Missing)</div>
                      <div className="ob-chip" style={{ fontSize: '12px', padding: '8px 14px', borderStyle: 'dashed' }}>CI/CD (Missing)</div>
                   </div>
                   
                   <div style={{ background: 'var(--o6)', borderRadius: '16px', padding: '20px', marginTop: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                        <span className="mat" style={{ color: 'var(--o3)' }}>lightbulb</span>
                        <h4 style={{ color: 'var(--o1)' }}>AI Strategy</h4>
                      </div>
                      <p style={{ fontSize: '13px', color: 'var(--o2)', lineHeight: 1.5, fontWeight: 600 }}>
                        Recruiters searching for "Fullstack" roles in Bangalore prioritize "Scalability" and "Microservices". Add these to your Summary section.
                      </p>
                   </div>

                   <button className="btn btn-p" style={{ width: '100%', marginTop: '32px' }} onClick={() => window.dispatchEvent(new CustomEvent('open-upgrade'))}>Unlock Full Industry Insights</button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
