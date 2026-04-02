'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription, UserTier } from '@/hooks/useSubscription';
import { fetchWithRetry } from '@/lib/utils';
import { getRegionData, formatPrice } from '@/lib/pricing';

import { useEffect, useMemo } from 'react';

export default function PricingPage() {
  const { tier, upgrade } = useSubscription();
  const [country, setCountry] = useState('IN');

  const region = useMemo(() => getRegionData(country), [country]);

  useEffect(() => {
    const detectCountry = async () => {
      try {
        const res = await fetch('/api/get-country');
        const data = await res.json();
        if (data.country) setCountry(data.country);
      } catch (err) {
        console.error('Country detection fallback.');
      }
    };
    detectCountry();
  }, []);

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
      const res = await fetchWithRetry("/api/create-order", {
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
          await fetchWithRetry("/api/verify-payment", {
            method: "POST",
            body: JSON.stringify(response),
          });
          upgrade(targetTier, targetTier === 'advanced');
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err: any) {
      console.error(err);
      const msg = err.message === 'Request timed out after 15 seconds' ? 'Checkout timed out. Please try again.' : 'Checkout failed.';
      showToast('error', msg);
    }
  };

  const plans = [
    {
      name: 'Free',
      price: formatPrice(0, region.symbol),
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
      price: formatPrice(region.pro, region.symbol),
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
      price: formatPrice(region.advanced, region.symbol),
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
              <div key={idx} className={`pricing-card ${p.popular ? 'popular' : ''} ${tier === p.tierVal ? 'active-plan' : ''}`}>
                {tier === p.tierVal && <div className="active-badge"><span className="mat">verified</span> Current Plan</div>}
                <div className="pricing-name">{p.name}</div>
                <div className="pricing-price">{p.price}<span className="pricing-period">{p.period}</span></div>
                <div className="pricing-desc">{p.desc}</div>
                <button 
                  className={`pricing-btn ${p.popular ? 'primary' : ''} ${tier === p.tierVal ? 'disabled' : ''}`} 
                  onClick={() => handleUpgrade(p.tierVal)}
                  disabled={tier === p.tierVal}
                >
                  {tier === p.tierVal ? 'Active Plan' : p.btn}
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

          <style jsx>{`
            .pricing-layout {
              display: grid;
              grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
              gap: 24px;
              margin-bottom: 48px;
            }
            .pricing-card {
              background: var(--w);
              border: 1.5px solid var(--bd);
              border-radius: 24px;
              padding: 40px;
              box-shadow: var(--sh1);
              transition: all 200ms cubic-bezier(0.4, 0, 0.2, 1);
              position: relative;
              overflow: hidden;
            }
            .pricing-card.active-plan {
              border-color: var(--o3);
              background: var(--o7);
              box-shadow: 0 16px 48px rgba(163, 61, 0, 0.15);
            }
            .active-badge {
              position: absolute;
              top: 0;
              right: 0;
              background: var(--o3);
              color: #fff;
              font-size: 10px;
              font-weight: 900;
              padding: 6px 14px;
              border-bottom-left-radius: 12px;
              display: flex;
              align-items: center;
              gap: 4px;
              text-transform: uppercase;
              letter-spacing: 0.05em;
            }
            .pricing-card.popular::before {
              content: '';
              position: absolute;
              top: 0; left: 0; right: 0; height: 6px;
              background: linear-gradient(90deg, var(--o1), var(--o2), var(--o3));
            }
            .pricing-card:hover {
              transform: translateY(-8px);
              box-shadow: var(--shl);
            }
            .pricing-name {
              font-size: 13px;
              font-weight: 900;
              text-transform: uppercase;
              letter-spacing: 0.12em;
              color: var(--t4);
              margin-bottom: 16px;
            }
            .active-plan .pricing-name { color: var(--o2); }
            .pricing-price {
              font-size: 52px;
              font-weight: 950;
              color: var(--t1);
              letter-spacing: -0.04em;
              margin-bottom: 16px;
              display: flex;
              align-items: baseline;
            }
            .pricing-period {
              font-size: 18px;
              font-weight: 700;
              color: var(--t3);
            }
            .pricing-desc {
              font-size: 15px;
              color: var(--t2);
              line-height: 1.6;
              margin-bottom: 32px;
              font-weight: 600;
            }
            .pricing-btn {
              width: 100%;
              padding: 16px;
              border-radius: 14px;
              font-size: 16px;
              font-weight: 900;
              border: 1px solid var(--bd);
              background: var(--w);
              color: var(--t1);
              cursor: pointer;
              transition: all 150ms;
              margin-bottom: 32px;
            }
            .pricing-btn.primary {
              background: var(--t1);
              color: var(--w);
              border: none;
            }
            .pricing-btn.disabled {
              background: var(--o3);
              color: #fff;
              border: none;
              cursor: default;
              opacity: 0.8;
            }
            .pricing-btn:not(.disabled):hover {
              transform: scale(1.02);
              box-shadow: 0 8px 24px rgba(0,0,0,0.1);
            }
            .pricing-feat-list {
              list-style: none;
              padding: 0;
            }
            .pricing-feat-list li {
              position: relative;
              padding-left: 32px;
              font-size: 15px;
              color: var(--t1);
              font-weight: 600;
              margin-bottom: 18px;
            }
            .pricing-feat-list li::before {
              content: 'check_circle';
              font-family: 'Material Symbols Outlined';
              position: absolute;
              left: 0; top: -1px;
              font-size: 20px;
              color: var(--o3);
            }
            .pricing-feat-list li.no {
              color: var(--t4);
              opacity: 0.6;
            }
            .pricing-feat-list li.no::before {
              content: 'block';
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
