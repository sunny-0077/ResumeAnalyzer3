'use client';

import { useState, useEffect } from 'react';

export default function InDepthAnalysisModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-indepth', handleOpen);
    return () => window.removeEventListener('open-indepth', handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-box afu" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '780px' }}>
        <button className="modal-close" onClick={() => setIsOpen(false)}>
          <span className="mat">close</span>
        </button>
        
        <div style={{ padding: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
             <div style={{ width: '56px', height: '56px', borderRadius: '16px', background: 'var(--o6)', color: 'var(--o3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
               <span className="mat" style={{ fontSize: '32px' }}>analytics</span>
             </div>
             <div>
               <h2 style={{ fontSize: '24px', fontWeight: 900, letterSpacing: '-0.02em' }}>In-Depth Analysis Report</h2>
               <p style={{ color: 'var(--t3)', fontWeight: 600, fontSize: '14px' }}>Recruiter 6-Second Scan Simulation</p>
             </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
            
            {/* COLUMN 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <section>
                <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--t4)', letterSpacing: '0.1em', marginBottom: '12px' }}>Parsing & Readability</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700 }}>
                     <span>ATS Parsing Score</span>
                     <span style={{ color: 'var(--green)' }}>100% (Perfect)</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700 }}>
                     <span>Impact Scoring</span>
                     <span style={{ color: 'var(--o3)' }}>High</span>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700 }}>
                     <span>Readability Index</span>
                     <span style={{ color: 'var(--green)' }}>78/100</span>
                   </div>
                </div>
              </section>

              <section style={{ marginTop: '24px' }}>
                <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--t4)', letterSpacing: '0.1em', marginBottom: '12px' }}>Content Quality</h4>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '12px', padding: 0 }}>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '13px', fontWeight: 600 }}>
                    <span className="mat" style={{ color: 'var(--green)', fontSize: '18px' }}>check_circle</span> Achievements detected: 8
                  </li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '13px', fontWeight: 600 }}>
                    <span className="mat" style={{ color: 'var(--o3)', fontSize: '18px' }}>warning</span> Weak bullets identified: 3
                  </li>
                  <li style={{ display: 'flex', gap: '10px', fontSize: '13px', fontWeight: 600 }}>
                    <span className="mat" style={{ color: 'var(--green)', fontSize: '18px' }}>check_circle</span> Metrics & Numbers: Strong
                  </li>
                </ul>
              </section>
            </div>

            {/* COLUMN 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <section>
                <h4 style={{ fontSize: '11px', fontWeight: 800, textTransform: 'uppercase', color: 'var(--t4)', letterSpacing: '0.1em', marginBottom: '12px' }}>Strategic Alignment</h4>
                <div style={{ background: 'var(--s2)', padding: '16px', borderRadius: '16px' }}>
                   <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--t3)', marginBottom: '8px' }}>Seniority Level Detected</div>
                   <div style={{ fontSize: '17px', fontWeight: 900, color: 'var(--o2)' }}>Mid-Senior Level (5-8yrs)</div>
                </div>
                <div style={{ marginTop: '16px' }}>
                   <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--t3)', marginBottom: '8px' }}>Industry Keyword Coverage</div>
                   <div style={{ height: '8px', background: 'var(--s2)', borderRadius: '99px', overflow: 'hidden' }}>
                     <div style={{ width: '84%', height: '100%', background: 'var(--o3)' }}></div>
                   </div>
                   <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 800, marginTop: '6px' }}>
                      <span>84% COVERAGE</span>
                      <span style={{ color: 'var(--o3)' }}>TOP 5%</span>
                   </div>
                </div>
              </section>

              <section style={{ marginTop: '16px' }}>
                 <div style={{ background: 'var(--o7)', border: '1.5px dashed var(--o5)', borderRadius: '16px', padding: '16px' }}>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--o2)', marginBottom: '6px' }}>Competitor Benchmark</h4>
                    <p style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.5, fontWeight: 600 }}>
                      You are ranking higher than 92% of applicants for "Senior Product Designer" roles at Stripe, Google, and Meta.
                    </p>
                 </div>
              </section>
            </div>

          </div>

          <div style={{ marginTop: '40px', paddingTop: '32px', borderTop: '1px solid var(--border)', textAlign: 'center' }}>
            <button className="btn btn-p" style={{ padding: '14px 48px' }} onClick={() => setIsOpen(false)}>Done Reviewing</button>
          </div>
        </div>
      </div>
    </div>
  );
}
