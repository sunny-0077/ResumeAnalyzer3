'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';

export default function SkillTestPage() {
  const [step, setStep] = useState(0); // 0: intro, 1: question 1, 2: question 2, 3: result
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  
  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const startTest = () => {
    setStep(1);
    setSelectedOpt(null);
  };

  const nextQ = () => {
    if (selectedOpt === null) {
      showToast('error', 'Please select an answer.');
      return;
    }
    setStep(prev => prev + 1);
    setSelectedOpt(null);
  };

  const questions = [
    {
      q: 'When designing a highly concurrent payment processing webhook, which pattern ensures idempotency best?',
      opts: [
        'A. Using a distributed Redis lock per user ID.',
        'B. Inserting a unique transaction ID into a PostgreSQL database with a UNIQUE constraint.',
        'C. Rate limiting API requests to 10/second.',
        'D. Placing all incoming webhooks into a Kafka topic for asynchronous processing.'
      ],
      correct: 1
    },
    {
      q: 'You are tasked with decreasing the P99 latency of a microservice that queries a large user table. Which is the immediate next step?',
      opts: [
        'A. Rewrite the service from Node.js to Go.',
        'B. Add a caching layer using Memcached.',
        'C. Analyze slow query logs and add composite indexes to the database.',
        'D. Horizontally scale the database with sharding.'
      ],
      correct: 2
    }
  ];

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div className="pg-hdr" style={{ marginBottom: '32px', textAlign: 'center' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>Technical Skill Assessment</h1>
            <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Validate your skills to surface top-tier job matches.</p>
          </div>

          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            {step === 0 && (
              <div className="card afu" style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: 'var(--o6)', color: 'var(--o2)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="mat" style={{ fontSize: '40px' }}>psychology</span>
                </div>
                <h2 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '16px' }}>Senior System Design Test</h2>
                <p style={{ fontSize: '15px', color: 'var(--t2)', lineHeight: 1.6, marginBottom: '32px', maxWidth: '500px', margin: '0 auto 32px' }}>
                  This 20-minute assessment covers distributed systems, database scaling, and API design. Scoring above 80% marks you as 'Verified' for Staff-level roles.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '32px' }}>
                  <span className="badge bg"><span className="mat">schedule</span> 20 mins</span>
                  <span className="badge bp"><span className="mat">help</span> 15 Questions</span>
                  <span className="badge bo"><span className="mat">stars</span> High ROI</span>
                </div>
                <button className="btn btn-p" onClick={startTest} style={{ padding: '16px 40px', fontSize: '16px' }}>Start Assessment →</button>
              </div>
            )}

            {(step === 1 || step === 2) && (
              <div className="card afu" style={{ padding: '40px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: 'var(--o2)', textTransform: 'uppercase', letterSpacing: '.05em' }}>
                    Question {step} of 2
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    <div style={{ height: '6px', width: '30px', borderRadius: '3px', background: step >= 1 ? 'var(--o3)' : 'var(--s2)' }}></div>
                    <div style={{ height: '6px', width: '30px', borderRadius: '3px', background: step >= 2 ? 'var(--o3)' : 'var(--s2)' }}></div>
                  </div>
                </div>
                
                <h3 style={{ fontSize: '20px', fontWeight: 800, lineHeight: 1.5, marginBottom: '32px', color: 'var(--t1)' }}>
                  {questions[step - 1].q}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {questions[step - 1].opts.map((opt, i) => (
                    <div 
                      key={i} 
                      className="opt-card"
                      onClick={() => setSelectedOpt(i)}
                      style={{
                        padding: '16px 20px', borderRadius: '12px', cursor: 'pointer', transition: 'all 150ms',
                        border: selectedOpt === i ? '2px solid var(--o3)' : '1px solid var(--bd)',
                        background: selectedOpt === i ? 'var(--o7)' : 'var(--w)',
                        fontWeight: selectedOpt === i ? 800 : 600,
                        color: selectedOpt === i ? 'var(--o1)' : 'var(--t2)',
                        boxShadow: selectedOpt === i ? 'var(--sh1)' : 'none'
                      }}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn btn-p" onClick={nextQ} style={{ padding: '12px 32px' }}>
                    {step === 2 ? 'Submit Assessment' : 'Next Question'} →
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="card afu" style={{ padding: '60px 40px', textAlign: 'center' }}>
                <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'var(--gbg)', color: 'var(--gn)', margin: '0 auto 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="mat" style={{ fontSize: '50px' }}>verified</span>
                </div>
                <h2 style={{ fontSize: '32px', fontWeight: 900, marginBottom: '16px' }}>Assessment Passed! 🎉</h2>
                <div style={{ fontSize: '48px', fontWeight: 900, color: 'var(--gn)', marginBottom: '8px' }}>92%</div>
                <p style={{ fontSize: '15px', color: 'var(--t2)', fontWeight: 600, marginBottom: '32px' }}>
                  Top 5% · You are now verified for Senior & Staff System Design. Your job match algorithm has been recalibrated.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
                  <button className="btn btn-g" onClick={() => setStep(0)}>Take Another Test</button>
                  <button className="btn btn-p" onClick={() => { showToast('success', 'Redirecting to new matches...'); setTimeout(() => window.location.href='/jobmatch', 1000); }}>View Upgraded Job Matches</button>
                </div>
              </div>
            )}

          </div>

        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
