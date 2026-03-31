'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription, UserTier } from '@/hooks/useSubscription';

export default function PricingPage() {
  const { tier, upgrade } = useSubscription();

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const handleUpgrade = async (targetTier: UserTier) => {
    if (targetTier === tier) return;
    showToast('info', targetTier === 'free' ? 'Downgrading to Free plan.' : `Initiating checkout for ${targetTier} plan...`);
    
    if (targetTier === 'free') {
      upgrade(targetTier, false);
      return;
    }

    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        body: JSON.stringify({ tier: targetTier }),
      });

      const order = await res.json();

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        name: "HirelyAI",
        order_id: order.id,
        handler: async function (response: any) {
          await fetch("/api/verify-payment", {
            method: "POST",
            body: JSON.stringify(response),
          });
          upgrade(targetTier, targetTier === 'advanced');
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      showToast('error', 'Checkout failed.');
    }
  };

  const plans = [
    {
      name: 'Free',
      price: '₹0',
      period: '/month',
      desc: 'Perfect for exploring and getting your first ATS score.',
      btn: tier === 'free' ? 'Current Plan' : 'Downgrade to Free',
      tierVal: 'free' as UserTier,
      feats: ['1 resume analysis/day', '1 job match/day', 'Basic ATS scoring', 'Community support'],
      nots: ['Cover Letter Writer', 'Career Path Analysis', 'Salary Intelligence', 'Mock Interview AI', 'Priority support'],
      popular: false
    },
    {
      name: 'Pro',
      price: '₹499',
      period: '/month',
      desc: 'Everything you need to actively job hunt and land interviews.',
      btn: tier === 'pro' ? 'Current Plan' : 'Upgrade to Pro',
      tierVal: 'pro' as UserTier,
      feats: ['Unlimited resume analyses', 'Unlimited job matching', 'Cover Letter Writer', 'Career Path Analysis', 'STAR Interview Coach', 'Email alerts for jobs', 'Priority support'],
      nots: ['In-depth Resume Analysis', 'Location-based Jobs'],
      popular: true
    },
    {
      name: 'Advanced',
      price: '₹899',
      period: '/month',
      desc: 'The complete career acceleration suite. No limits, no compromises.',
      btn: tier === 'advanced' ? 'Current Plan' : 'Go Advanced',
      tierVal: 'advanced' as UserTier,
      feats: ['Everything in Pro', 'In-depth resume analysis', 'Location-based job search', 'Salary Intelligence', 'Mock Interview AI', 'Recruiter Score mode', 'Dedicated career coach'],
      nots: [],
      popular: false
    }
  ];

  const featuresList = [
    ['ATS Analysis', '1/day', 'Unlimited', 'Unlimited'],
    ['Job Match', '1/day', 'Unlimited', 'Unlimited'],
    ['Resume Score', 'Basic', 'Advanced', 'Recruiter Score'],
    ['Cover Letter Writer', false, true, true],
    ['Career Path Analysis', false, true, true],
    ['In-depth Resume Analysis', false, false, true],
    ['Location-based Jobs', false, false, true],
    ['Salary Intelligence', false, false, true],
    ['Mock Interview', false, false, true],
    ['STAR Interview Coach', false, true, true],
    ['Email Generator', false, true, true],
    ['AI Resume Rewriter', false, true, true],
    ['Application Tracker', true, true, true],
    ['Priority Support', false, false, true],
    ['Dedicated Career Coach', false, false, true],
  ];

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div className="pg-hdr">
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)', marginBottom: '4px' }}>Pricing &amp; Plans</h1>
            <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Unlock your full career potential with the right plan.</p>
          </div>

          {/* PLAN CARDS */}
          <div className="pricing-layout">
            {plans.map((p, idx) => (
              <div key={idx} className={`pricing-card ${p.popular ? 'popular' : ''}`}>
                <div className="pricing-name">{p.name}</div>
                <div className="pricing-price">{p.price}<span className="pricing-period">{p.period}</span></div>
                <div className="pricing-desc">{p.desc}</div>
                <button 
                  className={`pricing-btn ${p.popular ? 'primary' : ''}`} 
                  onClick={() => handleUpgrade(p.tierVal)}
                >
                  {p.btn}
                </button>
                <ul className="pricing-feat-list">
                  {p.feats.map((f, i) => (
                    <li key={i}>{f}</li>
                  ))}
                  {p.nots.map((f, i) => (
                    <li key={`not-${i}`} className="no">{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* FEATURE COMPARISON TABLE */}
          <div style={{ fontSize: '20px', fontWeight: 800, letterSpacing: '-.02em', textAlign: 'center', margin: '32px 0 16px' }}>Detailed Feature Comparison</div>
          <div style={{ overflowX: 'auto' }}>
            <table className="fc-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th>Free</th>
                  <th>Pro</th>
                  <th>Advanced</th>
                </tr>
              </thead>
              <tbody>
                {featuresList.map((row, i) => (
                  <tr key={i}>
                    <td>{row[0]}</td>
                    <td>{row[1] === true ? <span className="fc-check">✓</span> : row[1] === false ? <span className="fc-x">✕</span> : <span className="fc-text">{row[1]}</span>}</td>
                    <td>{row[2] === true ? <span className="fc-check">✓</span> : row[2] === false ? <span className="fc-x">✕</span> : <span className="fc-text">{row[2]}</span>}</td>
                    <td>{row[3] === true ? <span className="fc-check">✓</span> : row[3] === false ? <span className="fc-x">✕</span> : <span className="fc-text">{row[3]}</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--t3)' }}>
            All plans include a 7-day free trial. Cancel anytime. Secure payments via Razorpay.
          </div>

          <style jsx>{`
            .pricing-layout {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
              gap: 24px;
              margin-bottom: 32px;
            }
            .pricing-card {
              background: var(--w);
              border: 1.5px solid var(--bd);
              border-radius: 20px;
              padding: 32px;
              box-shadow: var(--sh1);
              transition: transform 150ms, box-shadow 150ms;
              position: relative;
            }
            .pricing-card.popular {
              border-color: var(--o4);
              box-shadow: 0 12px 32px rgba(163, 61, 0, 0.12);
              border-width: 2px;
            }
            .pricing-name {
              font-size: 14px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: .08em;
              color: var(--t4);
              margin-bottom: 12px;
            }
            .pricing-card.popular .pricing-name {
              color: var(--o3);
            }
            .pricing-price {
              font-size: 44px;
              font-weight: 900;
              color: var(--t1);
              letter-spacing: -.03em;
              margin-bottom: 16px;
              display: flex;
              align-items: baseline;
            }
            .pricing-period {
              font-size: 16px;
              font-weight: 700;
              color: var(--t3);
              letter-spacing: normal;
            }
            .pricing-desc {
              font-size: 14px;
              color: var(--t2);
              line-height: 1.6;
              margin-bottom: 24px;
            }
            .pricing-btn {
              width: 100%;
              padding: 14px;
              border-radius: 12px;
              font-size: 16px;
              font-weight: 900;
              border: 1px solid var(--bd);
              background: var(--s1);
              color: var(--t1);
              cursor: pointer;
              transition: all 150ms;
              margin-bottom: 32px;
            }
            .pricing-btn.primary {
              background: var(--t1);
              color: var(--w);
              border-color: var(--t1);
            }
            .pricing-feat-list {
              list-style: none;
              padding: 0;
              margin: 0;
            }
            .pricing-feat-list li {
              position: relative;
              padding-left: 28px;
              font-size: 14px;
              color: var(--t1);
              font-weight: 600;
              margin-bottom: 16px;
            }
            .pricing-feat-list li::before {
              content: 'check_circle';
              font-family: 'Material Symbols Outlined';
              position: absolute;
              left: 0;
              top: -2px;
              font-size: 20px;
              color: var(--gn);
            }
            .pricing-feat-list li.no {
              color: var(--t4);
              text-decoration: line-through;
            }
            .pricing-feat-list li.no::before {
              content: 'remove_circle_outline';
              color: var(--t4);
            }
            .fc-table {
              width: 100%;
              border-collapse: collapse;
              background: var(--w);
              border-radius: 16px;
              overflow: hidden;
              box-shadow: var(--sh1);
              border: 1px solid var(--bd);
            }
            .fc-table th, .fc-table td {
              padding: 16px 20px;
              text-align: center;
              border-bottom: 1px solid var(--bd);
            }
            .fc-table th:first-child, .fc-table td:first-child {
              text-align: left;
              font-weight: 800;
            }
            .fc-table th {
              background: var(--s1);
              font-size: 12px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: .08em;
              color: var(--t3);
            }
            .fc-table td {
              font-size: 14px;
              color: var(--t1);
            }
            .fc-check {
              color: var(--gn);
              font-weight: 900;
              font-size: 18px;
            }
            .fc-x {
              color: var(--t4);
              font-weight: 700;
              font-size: 16px;
            }
            .fc-text {
              font-weight: 700;
            }
          `}</style>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
