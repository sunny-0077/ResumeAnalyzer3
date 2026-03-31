'use client';

import { useState, useEffect } from 'react';
import { useUser } from '@/context/AuthContext';

export default function ShareModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const userName =
    user?.user_metadata?.full_name ||
    user?.email?.split("@")[0] ||
    `user-${user?.id?.slice(0,6)}` ||
    "user";

  const referralLink = `https://profilepro.ai/r/${userName}`;

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('open-share', handleOpen);
    return () => window.removeEventListener('open-share', handleOpen);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={() => setIsOpen(false)}>
      <div className="modal-box afu" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={() => setIsOpen(false)}>
          <span className="mat">close</span>
        </button>
        
        <div className="share-h">
          <h2>Share Your Success 🎯</h2>
          <p>Inspire your network and earn referral credits for every colleague who joins Hirely.</p>
        </div>

        <div className="score-card">
          <div className="sc-ring-w">
            <svg width="120" height="120" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="54" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="10"/>
              <circle 
                cx="60" cy="60" r="54" 
                fill="none" stroke="var(--white)" strokeWidth="10" 
                strokeLinecap="round" 
                strokeDasharray="339.29" 
                style={{ strokeDashoffset: '67.85', transition: 'stroke-dashoffset 1.5s ease-out' }}
              />
            </svg>
            <div className="sc-num">
              <h3>80%</h3>
              <span>ATS SCORE</span>
            </div>
          </div>
          <div className="sc-role">Senior Product Designer</div>
          <div className="sc-comp">Stripe · Hybrid</div>
          <div className="sc-badges">
            <span className="sc-badge">Top 12%</span>
            <span className="sc-badge">AI Optimized</span>
          </div>
        </div>

        <div className="share-a">
          <div className="share-row">
            <input className="inp share-inp" value={referralLink} readOnly />
            <button className="btn btn-s" onClick={() => {
              navigator.clipboard.writeText(referralLink);
              window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Copied link to clipboard!' } }));
            }}>
              <span className="mat">content_copy</span>
            </button>
          </div>
          <button className="btn btn-li btn-lg">
            <span className="mat">share</span> Share on LinkedIn
          </button>
        </div>
      </div>
    </div>
  );
}
