'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription } from '@/hooks/useSubscription';

export default function JobMatch() {
  const router = useRouter();
  const [tab, setTab] = useState<'single' | 'ab' | 'history' | 'local'>('ab');
  const { tier } = useSubscription();
  const [resumeText, setResumeText] = useState('Senior Product Manager with 8+ years of experience leading cross-functional teams at Google and Amazon. Expert in user-centric design, A/B testing, and scaling cloud-native SaaS products.');
  
  const [abJobs, setAbJobs] = useState([
    { id: 1, title: 'Senior Product Manager', company: 'Stripe', jd: 'We are looking for a Senior PM to lead our Billing platform. Experience with payments and API design is a plus.' },
    { id: 2, title: 'Lead Product Manager', company: 'Atlassian', jd: 'Join our Jira Cloud team. Focus on user growth, retention, and enterprise-grade features.' },
    { id: 3, title: 'Product Director', company: 'Razrorpay', jd: 'Scale our neo-banking initiative. Deep understanding of fintech and platform infrastructure required.' },
  ]);

  const [results, setResults] = useState<any[]>([]);
  const [isMatching, setIsMatching] = useState(false);

  const startMatch = () => {
    if (!resumeText.trim()) {
      showToast("error","Paste your resume content first");
      return;
    }
    if (tier === 'free') {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'info', msg: 'Free plan: 1 match/day used. Upgrade for unlimited A/B compares.' } }));
    }
    setIsMatching(true);
    setTimeout(() => {
      setResults([
        { id: 1, score: 91, fit: 'EXCELLENT', skills: ['API Design', 'Payments'], gap: ['Scaling'] },
        { id: 2, score: 78, fit: 'STRONG', skills: ['Growth', 'SaaS'], gap: ['Enterprise'] },
        { id: 3, score: 65, fit: 'MODERATE', skills: ['Fintech'], gap: ['Infrastructure'] },
      ]);
      setIsMatching(false);
    }, 1500);
  };

  const handleLocalTab = () => {
    if (tier !== 'advanced') {
      window.dispatchEvent(new CustomEvent('open-upgrade'));
    } else {
      setTab('local');
    }
  };

  const showToast = (type: any, msg: string) => window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));

  return (
    <div id="page-jobmatch" className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '40px' }}>
          <div className="dash-header" style={{ marginBottom: '24px' }}>
            <div>
              <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>AI Job Matcher 🚀</h1>
              <p style={{ color: 'var(--t2)', marginTop: '4px', fontWeight: 600 }}>Compare your resume against multiple job descriptions with Hirely AI.</p>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button className="btn btn-s" onClick={() => window.dispatchEvent(new CustomEvent('open-share'))}>
                <span className="mat" style={{ marginRight: '6px' }}>share</span> Share Result
              </button>
            </div>
          </div>

          <div className="ftabs">
            <button className={`ftab ${tab === 'single' ? 'active' : ''}`} onClick={() => setTab('single')}>Single Match</button>
            <button className={`ftab ${tab === 'ab' ? 'active' : ''}`} onClick={() => setTab('ab')}>A/B Compare 3 Jobs</button>
            <button className={`ftab ${tab === 'history' ? 'active' : ''}`} onClick={() => setTab('history')}>Match History</button>
            <button 
              className={`ftab ${tab === 'local' ? 'active' : ''}`} 
              onClick={handleLocalTab}
              style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <span className="mat" style={{ fontSize: '16px' }}>location_on</span>
              Near Me
              {tier !== 'advanced' && <span className="sb-badge" style={{ background: 'var(--o3)', marginLeft: '4px' }}>ADV</span>}
            </button>
          </div>

          {tab === 'ab' && (
            <div className="afu">
              <div className="ab-resume-box afu" style={{ padding: '24px', background: 'var(--w)', border: '1.5px solid var(--bd)', borderRadius: '24px', marginBottom: '24px', boxShadow: 'var(--sh1)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <label className="ab-num" style={{ fontSize: '12px' }}>GLOBAL RESUME CONTENT</label>
                  <span className="badge bp">Shared across all 3 matches</span>
                </div>
                <textarea 
                  className="ab-area" 
                  value={resumeText}
                  onChange={(e) => setResumeText(e.target.value)}
                  placeholder="Paste your central resume content here..."
                  style={{ minHeight: '100px', fontSize: '15px' }}
                />
              </div>

              <div className="ab-grid">
                {abJobs.map((job, i) => (
                  <div key={job.id} className="ab-card afu" style={{ animationDelay: `${(i + 1) * 100}ms` }}>
                    <div className="ab-num">JOB MATCH #0{job.id}</div>
                    
                    <div className="ab-inp-w">
                      <label className="ab-inp-l">Job Title</label>
                      <input 
                        className="ab-input" 
                        value={job.title}
                        onChange={(e) => {
                          const next = [...abJobs];
                          next[i].title = e.target.value;
                          setAbJobs(next);
                        }}
                      />
                    </div>

                    <div className="ab-inp-w">
                      <label className="ab-inp-l">Company Name</label>
                      <input 
                        className="ab-input" 
                        value={job.company}
                        onChange={(e) => {
                          const next = [...abJobs];
                          next[i].company = e.target.value;
                          setAbJobs(next);
                        }}
                      />
                    </div>

                    <div className="ab-inp-w" style={{ flex: 1 }}>
                      <label className="ab-inp-l">Job Description</label>
                      <textarea 
                        className="ab-area" 
                        value={job.jd}
                        onChange={(e) => {
                          const next = [...abJobs];
                          next[i].jd = e.target.value;
                          setAbJobs(next);
                        }}
                        style={{ minHeight: '130px' }}
                      />
                    </div>

                    {results[i] && (
                      <div className="ab-res afu" style={{ marginTop: '12px', padding: '16px', background: 'var(--sf)', borderRadius: '16px', border: '1px solid var(--bd2)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <div style={{ fontSize: '24px', fontWeight: 900, color: results[i].score > 80 ? 'var(--green)' : 'var(--o2)' }}>{results[i].score}%</div>
                          <span className={`badge ${results[i].score > 80 ? 'bg' : 'bo'}`}>{results[i].fit}</span>
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                          {results[i].skills.map((s: string) => <span key={s} className="badge bb" style={{ fontSize: '10px' }}>{s}</span>)}
                          {results[i].gap.map((g: string) => <span key={g} className="badge br" style={{ fontSize: '10px' }}>Gap: {g}</span>)}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="ab-btn-centered">
                <button 
                  className="btn btn-p btn-lg" 
                  onClick={startMatch}
                  disabled={isMatching}
                  style={{ padding: '16px 60px', borderRadius: '18px', width: '100%', maxWidth: '600px' }}
                >
                  {isMatching ? (
                    <><span className="mat" style={{ animation: 'spin 1.5s linear infinite', marginRight: '10px' }}>sync</span> Analyzing 3 Jobs...</>
                  ) : (
                    <><span className="mat" style={{ marginRight: '10px' }}>auto_awesome</span> Compare All 3 Jobs at Once</>
                  )}
                </button>
              </div>
            </div>
          )}

          {tab === 'single' && (
            <div className="afu" style={{ textAlign: 'center', padding: '100px 0' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--o6)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <span className="mat" style={{ fontSize: '40px', color: 'var(--o3)' }}>search</span>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 900 }}>Single Match Analysis</h2>
              <p style={{ color: 'var(--t3)', marginTop: '8px', fontWeight: 600 }}>Coming shortly. We're prioritizing the A/B Comparison workspace.</p>
              <button className="btn btn-s" style={{ marginTop: '24px' }} onClick={() => setTab('ab')}>Back to A/B Compare</button>
            </div>
          )}

          {tab === 'history' && (
            <div className="afu" style={{ textAlign: 'center', padding: '100px 0' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--sc2)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <span className="mat" style={{ fontSize: '40px', color: 'var(--t3)' }}>history</span>
              </div>
              <h2 style={{ fontSize: '24px', fontWeight: 900 }}>No Match History</h2>
              <p style={{ color: 'var(--t3)', marginTop: '8px', fontWeight: 600 }}>Your match reports will appear here once you run and save an analysis.</p>
            </div>
          )}

          {tab === 'local' && (
            <div className="afu">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                   <h2 style={{ fontSize: '24px', fontWeight: 900 }}>Jobs Near Bangalore</h2>
                   <p style={{ color: 'var(--t4)', fontWeight: 800, fontSize: '13px' }}>FETCHED FROM PROFILE LOCATION • UPDATED 2M AGO</p>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                   <div style={{ padding: '10px 16px', borderRadius: '14px', background: 'var(--w)', border: '1.5px solid var(--bd)', fontSize: '12px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="mat" style={{ color: 'var(--o1)', fontSize: '18px' }}>filter_list</span> Filters
                   </div>
                   <div style={{ padding: '10px 16px', borderRadius: '14px', background: 'var(--w)', border: '1.5px solid var(--bd)', fontSize: '12px', fontWeight: 900, display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span className="mat" style={{ color: 'var(--o1)', fontSize: '18px' }}>notifications</span> Alert On
                   </div>
                </div>
              </div>

              <div className="dash-grid-2">
                 {[
                   { company: 'Google', role: 'Staff Product Manager', pay: '₹75L - ₹90L', time: '2h ago', match: 94, tags: ['Hybrid', 'Tier 1'] },
                   { company: 'Uber', role: 'Sr. Product Analyst', pay: '₹42L - ₹55L', time: '6h ago', match: 88, tags: ['On-site', 'Stock'] },
                   { company: 'Zomato', role: 'Product Lead', pay: '₹60L+', time: '1d ago', match: 82, tags: ['Remote', 'High Growth'] },
                   { company: 'PhonePe', role: 'Growth Product Manager', pay: '₹35L - ₹48L', time: '2d ago', match: 79, tags: ['Fintech'] },
                 ].map((j, i) => (
                   <div key={i} className="ip-card afu" style={{ animationDelay: `${i * 100}ms` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                        <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--gbg)', border: '1px solid var(--bd)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', fontWeight: 900, color: 'var(--t4)' }}>
                           {j.company[0]}
                        </div>
                        <div style={{ textAlign: 'right' }}>
                           <div style={{ fontSize: '18px', fontWeight: 900, color: 'var(--green)' }}>{j.match}%</div>
                           <div style={{ fontSize: '10px', fontWeight: 900, color: 'var(--t4)' }}>MATCH</div>
                        </div>
                      </div>
                      <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '4px' }}>{j.role}</h3>
                      <p style={{ fontSize: '14px', color: 'var(--t3)', fontWeight: 700, marginBottom: '20px' }}>{j.company} • {j.time}</p>
                      
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                         <div style={{ fontSize: '15px', fontWeight: 900 }}>{j.pay}</div>
                         <div style={{ display: 'flex', gap: '6px' }}>
                            {j.tags.map(t => <span key={t} className="badge bg" style={{ fontSize: '10px' }}>{t}</span>)}
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
          )}
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
