'use client';

import { useState, useEffect } from 'react';
import { useSubscription, UserTier } from '@/hooks/useSubscription';
import Link from 'next/link';

export default function UpgradeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { tier, upgrade } = useSubscription();

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-upgrade', handleOpen);
    return () => window.removeEventListener('open-upgrade', handleOpen);
  }, []);

  if (!isOpen) return null;

  const handleUpgrade = async (newTier: UserTier) => {
    try {
      const res = await fetch("/api/create-order", {
        method: "POST",
        body: JSON.stringify({ tier: newTier }),
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
          upgrade(newTier, newTier === 'advanced');
          setIsOpen(false);
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-box afu" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '900px' }}>
        <button className="modal-close" onClick={() => setIsOpen(false)}>
          <span className="mat">close</span>
        </button>
        
        <div style={{ padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.04em' }}>Choose Your Power-Up 🚀</h2>
            <p style={{ color: 'var(--t3)', fontWeight: 600, marginTop: '8px' }}>Unlock the full potential of Hirely AI and land your dream job faster.</p>
          </div>

          <div className="pr-grid" style={{ gap: '16px' }}>
            
            {/* FREE */}
            <div className="pr-card" style={{ padding: '24px' }}>
              <div className="pr-name">Free</div>
              <div className="pr-price" style={{ fontSize: '36px' }}>₹0<span style={{ fontSize: '14px' }}>/mo</span></div>
              <ul className="pr-list" style={{ margin: '20px 0', gap: '8px', fontSize: '13px' }}>
                <li className="pr-it"><span className="mat">check</span> 1 ATS Scan/day</li>
                <li className="pr-it"><span className="mat">check</span> 1 Job Match/day</li>
                <li className="pr-it no"><span className="mat">lock</span> STAR Coach</li>
                <li className="pr-it no"><span className="mat">lock</span> Mock Interviews</li>
              </ul>
              <button className="btn btn-g" style={{ width: '100%' }} disabled={tier === 'free'}>
                {tier === 'free' ? 'Current Plan' : 'Downgrade'}
              </button>
            </div>

            {/* PRO */}
            <div className="pr-card popular" style={{ padding: '24px' }}>
              <div className="pr-tag">MOST POPULAR</div>
              <div className="pr-name">Pro</div>
              <div className="pr-price" style={{ fontSize: '36px' }}>₹499<span style={{ fontSize: '14px' }}>/mo</span></div>
              <ul className="pr-list" style={{ margin: '20px 0', gap: '8px', fontSize: '13px' }}>
                <li className="pr-it"><span className="mat">check</span> Unlimited Scans</li>
                <li className="pr-it"><span className="mat">check</span> STAR Interview Coach</li>
                <li className="pr-it"><span className="mat">check</span> Advanced Writer</li>
                <li className="pr-it no"><span className="mat">lock</span> Mock Interviews</li>
              </ul>
              <button className="btn btn-p" style={{ width: '100%' }} onClick={() => handleUpgrade('pro')}>
                Upgrade to Pro
              </button>
            </div>

            {/* ADVANCED */}
            <div className="pr-card valuable" style={{ padding: '24px' }}>
               <div className="pr-tag" style={{ background: 'var(--t1)' }}>BEST VALUE</div>
               <div className="pr-name">Advanced</div>
               <div className="pr-price" style={{ fontSize: '36px' }}>₹1,199<span style={{ fontSize: '14px' }}>/mo</span></div>
               <ul className="pr-list" style={{ margin: '20px 0', gap: '8px', fontSize: '13px' }}>
                 <li className="pr-it"><span className="mat">check</span> Everything in Pro</li>
                 <li className="pr-it"><span className="mat">check</span> Mock Interviews</li>
                 <li className="pr-it"><span className="mat">check</span> Salary Intel PRO</li>
                 <li className="pr-it"><span className="mat">check</span> Recruiter Score</li>
               </ul>
               <button className="btn btn-p" style={{ width: '100%', background: 'var(--t1)' }} onClick={() => handleUpgrade('advanced')}>
                 Get Advanced
               </button>
               <p style={{ fontSize: '10px', color: 'var(--t3)', textAlign: 'center', marginTop: '12px', fontWeight: 700 }}>Start 3-day trial · Cancel anytime</p>
            </div>

          </div>

          <div style={{ textAlign: 'center', marginTop: '24px' }}>
            <Link href="/pricing" onClick={() => setIsOpen(false)} style={{ fontSize: '13px', fontWeight: 800, color: 'var(--o3)', textDecoration: 'none' }}>
              View full feature comparison table →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
