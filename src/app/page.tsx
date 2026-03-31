'use client';

import { useState, useEffect, useRef } from 'react';
import Navbar from '@/components/layout/Navbar';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/AuthContext';

export default function LandingPage() {
  const router = useRouter();
  const { user, isLoading } = useUser();
  const [isAnnual, setIsAnnual] = useState(false);

  // Redirect if logged in
  useEffect(() => {
    if (!isLoading && user) {
      router.push('/dashboard');
    }
  }, [user, isLoading, router]);

  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [demoState, setDemoState] = useState<'idle' | 'loading' | 'result'>('idle');
  const [demoScore, setDemoScore] = useState(0);
  const [unlocked, setUnlocked] = useState(false);
  const [counts, setCounts] = useState({ analyses: 0, offers: 0, score: 0, time: 0 });
  const [signupCount, setSignupCount] = useState(12847);
  const [tab, setTab] = useState<'plans' | 'redeem'>('plans');
  const [coupon, setCoupon] = useState('');

  // Counter animation logic
  useEffect(() => {
    const duration = 2200;
    const start = Date.now();
    const targets = { analyses: 847231, offers: 12490, score: 31, time: 15 };

    const animate = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      
      setCounts({
        analyses: Math.round(ease * targets.analyses),
        offers: Math.round(ease * targets.offers),
        score: Math.round(ease * targets.score),
        time: Math.round(ease * targets.time),
      });

      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);

    const interval = setInterval(() => {
      setSignupCount(prev => prev + Math.round(Math.random() * 3));
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const runDemo = () => {
    setDemoState('loading');
    setTimeout(() => {
      setDemoState('result');
      setDemoScore(Math.floor(Math.random() * 30) + 65);
    }, 2000);
  };

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const handleCoupon = () => {
    if (coupon.trim().toUpperCase() === 'CHARANFABLY7890') {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Voucher applied! Advanced features unlocked.' } }));
      localStorage.setItem('user_tier', 'advanced');
      setCoupon('');
      router.push('/dashboard');
    } else {
      showToast('error', 'Invalid promotional code.');
    }
  };

  return (
    <div id="page-landing" className="page active">
      <Navbar />

      {/* HERO */}
      <div className="hero-wrap">
        <div className="afu">
          <div className="hero-badge">✦ The Complete AI Career Intelligence Suite</div>
          <h1 className="hero-h1">Secure Your <span className="acc">Dream Career</span><br/>With Precision</h1>
          <p className="hero-p" style={{ fontSize: '18px' }}>One platform. Every step. We analyze resumes, match roles, draft letters, trap applications, and negotiate salaries — powered by Hirely’s proprietary hiring AI.</p>
          <div className="hero-ctas">
            <button className="btn-hero-primary" onClick={() => router.push('/analyzer')}>
              <span className="matf">rocket_launch</span> Start Your Analysis
            </button>
            <button className="btn-hero-ghost" onClick={() => document.getElementById('features-anchor')?.scrollIntoView({ behavior: 'smooth' })}>
              <span className="mat">auto_awesome</span> Explore features
            </button>
          </div>
          <div className="hero-sub">6 Professional Tools · Real-time Market Data · Trusted by 12k+ Tech Professionals</div>
        </div>
        <div style={{ position: 'relative', height: '420px' }} className="afu">
          {/* Floating cards */}
          <div className="glass" style={{ position: 'absolute', top: 0, left: 0, width: '280px', borderRadius: '18px', padding: '24px', boxShadow: 'var(--sh-lg)', animation: 'float 6s ease-in-out infinite', transform: 'rotate(-2deg)', zIndex: 2 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div><div style={{ fontSize: '14px', fontWeight: 800 }}>ATS Score</div><div style={{ fontSize: '12px', color: 'var(--text3)' }}>Senior PM · Google</div></div>
              <div style={{ background: 'var(--o6)', padding: '8px', borderRadius: '10px' }}><span className="mat" style={{ fontSize: '18px', color: 'var(--o2)' }}>verified</span></div>
            </div>
            <div style={{ fontSize: '56px', fontWeight: 900, color: 'var(--o1)', letterSpacing: '-.04em', margin: '12px 0 8px' }}>92%</div>
            <div style={{ height: '10px', background: 'var(--o6)', borderRadius: '99px', overflow: 'hidden' }}><div style={{ height: '100%', width: '92%', background: 'linear-gradient(90deg, var(--o1), var(--o3))', borderRadius: '99px' }}></div></div>
            <div style={{ fontSize: '12px', color: 'var(--text3)', marginTop: '12px', fontStyle: 'italic', fontWeight: 600 }}>"Optimized for High-Impact Keywords"</div>
          </div>
          <div className="glass" style={{ position: 'absolute', top: '190px', right: '10px', width: '230px', borderRadius: '18px', padding: '20px', boxShadow: 'var(--sh-lg)', animation: 'float 8s ease-in-out infinite .5s', transform: 'rotate(1.5deg)', zIndex: 1 }}>
            <div style={{ fontSize: '10px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--o3)', marginBottom: '8px' }}>✦ CAREER PATHING</div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text1)', lineHeight: 1.4 }}>Next Level: Senior Product Architect · ↑ ₹12L Hike</div>
          </div>
          <div className="glass" style={{ position: 'absolute', bottom: '20px', left: '40px', width: '210px', borderRadius: '16px', padding: '14px 20px', boxShadow: 'var(--sh-md)', border: '1px solid var(--o5)', zIndex: 3 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#22c55e', flexShrink: 0, animation: 'pulse 2s infinite' }}></div><span style={{ fontSize: '14px', fontWeight: 800 }}>Interviewing at Meta</span></div>
          </div>
        </div>
      </div>
      
      {/* COUNTER STRIP - MOVED UP */}
      <div className="counter-strip" style={{ background: 'var(--o1)', color: 'white', borderTop: '1px solid #ffffff20' }}>
        <div className="counter-grid">
          <div><div className="counter-num"><span className="counter-live-dot"></span>{counts.analyses.toLocaleString('en-IN')}</div><div className="counter-label">Resumes Analyzed</div></div>
          <div><div className="counter-num">{counts.offers.toLocaleString('en-IN')}</div><div className="counter-label">Offers Secured</div></div>
          <div><div className="counter-num">{counts.score}%</div><div className="counter-label">Avg Improvement</div></div>
          <div><div className="counter-num">{counts.time}d</div><div className="counter-label">Avg Time to Hire</div></div>
        </div>
      </div>

      {/* SOCIAL PROOF BAR */}
      <div className="proof-bar">
        <div className="proof-inner">
          <div className="proof-avatars">
            <div className="proof-av">C</div><div className="proof-av">H</div><div className="proof-av">A</div><div className="proof-av">R</div><div className="proof-av">A</div><div className="proof-av">N</div>
          </div>
          <div className="proof-text"><span>{signupCount.toLocaleString('en-IN')}</span> seekers landed offers at</div>
          <div className="proof-companies" style={{ opacity: 0.8 }}>
            <span className="proof-company">Google</span><span className="proof-company">Amazon</span><span className="proof-company">Stripe</span><span className="proof-company">Razorpay</span><span className="proof-company">Zomato</span>
          </div>
        </div>
      </div>


      {/* DEMO SECTION */}
      <div className="demo-section" id="demo-anchor">
        <div className="demo-inner">
          <div className="section-eyebrow">Try It Now — No Signup Required</div>
          <div className="section-title">Get Your Match Score in 10 Seconds</div>
          <div className="demo-grid">
            <div className="demo-panel">
              <div className="demo-label"><span className="mat">person</span> Your Resume</div>
              <textarea className="demo-ta" placeholder="Paste your resume text..."></textarea>
            </div>
            <div className="demo-panel">
              <div className="demo-label"><span className="mat">work</span> Job Description</div>
              <textarea className="demo-ta" placeholder="Paste job description..."></textarea>
            </div>
          </div>
          <button className="demo-btn" onClick={runDemo}>
            <span className="mat">bolt</span> Get My Match Score — Free
          </button>

          {demoState === 'loading' && (
            <div style={{ textAlign: 'center', padding: '36px' }}>
              <div style={{ width: '40px', height: '40px', border: '3px solid var(--o5)', borderTopColor: 'var(--o2)', borderRadius: '50%', animation: 'spin .8s linear infinite', margin: '0 auto 14px' }}></div>
              <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text2)' }}>Analyzing your match...</div>
            </div>
          )}

          {demoState === 'result' && (
            <div className="demo-result-wrap show">
              <div className="result-card">
                <div className="result-ring-wrap">
                  <svg width="110" height="110" viewBox="0 0 110 110">
                    <circle cx="55" cy="55" r="46" fill="none" stroke="var(--o6)" strokeWidth="10"/>
                    <circle cx="55" cy="55" r="46" fill="none" stroke="url(#demo-grad)" strokeWidth="10" strokeLinecap="round" strokeDasharray="289" strokeDashoffset={289 - (demoScore / 100) * 289} style={{ transition: 'stroke-dashoffset 1.2s ease' }}/>
                    <defs><linearGradient id="demo-grad"><stop offset="0%" stopColor="#a33d00"/><stop offset="100%" stopColor="#c9510d"/></linearGradient></defs>
                  </svg>
                  <div className="result-score-center"><span className="result-score-num">{demoScore}%</span><span className="result-score-pct">match</span></div>
                </div>
                <div className="result-info">
                  <h3>{demoScore >= 80 ? 'Strong Match 💪' : 'Good Match 👍'}</h3>
                  <p>Your resume highlights key skills needed for this role. Check the full breakdown below.</p>
                  {!unlocked ? (
                    <div className="email-gate">
                      <p>🔓 Enter email to unlock full ATS breakdown</p>
                      <div className="email-gate-row">
                        <input className="email-input" type="email" placeholder="your@email.com"/>
                        <button className="email-submit" onClick={() => { setUnlocked(true); showToast('success', 'Full analysis unlocked!'); }}>Unlock →</button>
                      </div>
                    </div>
                  ) : (
                    <div style={{ color: 'var(--green)', fontWeight: 700 }}>✓ Analysis Unlocked</div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PRICING */}
      <div className="pricing-section" id="pricing-anchor" style={{ background: 'var(--sf)' }}>
        <div className="pricing-inner">
          <div className="section-eyebrow">Pricing Plans</div>
          <div className="section-title">Upgrade Your Career</div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', borderBottom: '1px solid var(--border)', marginBottom: '40px', marginTop: '40px' }}>
            <button 
              onClick={() => setTab('plans')}
              style={{ padding: '0 16px 16px', background: 'none', border: 'none', fontSize: '18px', fontWeight: 900, color: tab === 'plans' ? 'var(--o1)' : 'var(--t4)', borderBottom: `3px solid ${tab === 'plans' ? 'var(--o3)' : 'transparent'}`, cursor: 'pointer', transition: 'all 0.3s' }}
            >
              Subscription
            </button>
            <button 
              onClick={() => setTab('redeem')}
              style={{ padding: '0 16px 16px', background: 'none', border: 'none', fontSize: '18px', fontWeight: 900, color: tab === 'redeem' ? 'var(--o1)' : 'var(--t4)', borderBottom: `3px solid ${tab === 'redeem' ? 'var(--o3)' : 'transparent'}`, cursor: 'pointer', transition: 'all 0.3s' }}
            >
              Redeem Voucher
            </button>
          </div>
          
          {tab === 'plans' ? (
            <div className="afu">
              <div className="billing-toggle">
                <span className={`tog-label ${!isAnnual ? 'active' : ''}`}>Monthly</span>
                <div className={`tog-track ${isAnnual ? 'annual' : ''}`} onClick={() => setIsAnnual(!isAnnual)}><div className="tog-thumb"></div></div>
                <span className={`tog-label ${isAnnual ? 'active' : ''}`}>Annual</span>
                <span className="save-badge">Save 33%</span>
              </div>
              
              <div className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
                <div className="pricing-card">
                  <div className="pricing-name">Free</div>
                  <div className="pricing-price">₹0</div>
                  <ul className="pricing-ul">
                    <li><span className="mat">check</span> 1 resume analysis/day</li>
                    <li><span className="mat">check</span> 1 job match/day</li>
                    <li className="no"><span className="mat">lock</span> STAR Interview Coach</li>
                    <li className="no"><span className="mat">lock</span> Mock Interviews</li>
                  </ul>
                  <button className="pricing-cta p-outline" onClick={() => router.push('/dashboard')}>Start Free</button>
                </div>

                <div className="pricing-card feat">
                  <div className="pricing-pop">Popular</div>
                  <div className="pricing-name">Pro</div>
                  <div className="pricing-price">{isAnnual ? '₹3,999' : '₹499'}<span>/{isAnnual ? 'yr' : 'mo'}</span></div>
                  <ul className="pricing-ul">
                    <li><span className="mat">check</span> Unlimited Resume Scans</li>
                    <li><span className="mat">check</span> STAR Interview Coach</li>
                    <li><span className="mat">check</span> Advanced Cover Letters</li>
                    <li className="no"><span className="mat">lock</span> Mock Interviews</li>
                  </ul>
                  <button className="pricing-cta p-filled" onClick={() => router.push('/dashboard')}>Upgrade to Pro</button>
                </div>

                <div className="pricing-card" style={{ border: '2px solid var(--t1)' }}>
                  <div className="pricing-name">Advanced</div>
                  <div className="pricing-price">{isAnnual ? '₹9,999' : '₹1,199'}<span>/{isAnnual ? 'yr' : 'mo'}</span></div>
                  <ul className="pricing-ul">
                    <li><span className="mat">check</span> Everything in Pro</li>
                    <li><span className="mat">check</span> Mock Interviews AI</li>
                    <li><span className="mat">check</span> Salary Intelligence</li>
                    <li><span className="mat">check</span> Recruiter Score</li>
                  </ul>
                  <button className="pricing-cta p-filled" style={{ background: 'var(--t1)' }} onClick={() => router.push('/dashboard')}>Get Advanced</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="afu" style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', padding: '60px 32px', background: 'var(--w)', borderRadius: '32px', border: '1.5px solid var(--border)', boxShadow: 'var(--sh-lg)' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--o6)', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--o1)' }}>
                <span className="mat" style={{ fontSize: '40px' }}>confirmation_number</span>
              </div>
              <h3 style={{ fontSize: '24px', fontWeight: 900, color: 'var(--t1)', marginBottom: '8px' }}>Redeem Your Voucher 🎁</h3>
              <p style={{ fontSize: '15px', color: 'var(--t3)', fontWeight: 600, marginBottom: '32px' }}>Enter your code to unlock premium career tools instantly.</p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px', margin: '0 auto' }}>
                <input 
                  className="email-input" 
                  style={{ height: '60px', borderRadius: '18px', textTransform: 'uppercase', textAlign: 'center', fontWeight: 900, fontSize: '24px', letterSpacing: '0.2em', border: '1.5px solid var(--bd)' }} 
                  placeholder="XYZ-123" 
                  value={coupon}
                  onChange={e => setCoupon(e.target.value)}
                />
                <button className="btn-hero-primary" onClick={handleCoupon} style={{ width: '100%', height: '56px', fontSize: '16px', fontWeight: 900 }}>Redeem Voucher →</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* FAQ */}
      <div className="faq-section">
        <div className="faq-inner">
          <div className="section-title">FAQ</div>
          <div className="faq-list">
            {[
              ['Is my resume data private?', 'Yes, we encrypt everything.'],
              ['How accurate is the ATS score?', 'Highly accurate, simulated on real systems.'],
            ].map(([q, a], i) => (
              <div key={i} className={`faq-item ${openFaq === i ? 'open' : ''}`}>
                <div className="faq-q" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  {q} <span className="mat">expand_more</span>
                </div>
                {openFaq === i && <div className="faq-a">{a}</div>}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="site-footer">
        <div className="footer-logo">Hirely AI</div>
        <div className="footer-copy">© 2025 · Made in India 🇮🇳</div>
      </div>
    </div>
  );
}
