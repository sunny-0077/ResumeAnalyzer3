'use client';

import React from 'react';
import { useSubscription } from '@/hooks/useSubscription';

interface LockedFeatureProps {
  children: React.ReactNode;
  requiredTier: 'pro' | 'advanced';
  message?: string;
  className?: string;
  asChild?: boolean;
}

export default function LockedFeature({ children, requiredTier, message, className = '' }: LockedFeatureProps) {
  const { tier } = useSubscription();

  const isLocked = (() => {
    if (tier === 'advanced') return false; // Advanced sees everything
    if (tier === 'pro' && requiredTier === 'pro') return false; // Pro sees pro
    return true; // Free sees nothing, Pro sees no Advanced
  })();

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const handleLockedClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    showToast('error', message || `Upgrade to ${requiredTier.toUpperCase()} required for this feature.`);
    window.dispatchEvent(new CustomEvent('open-upgrade'));
  };

  if (!isLocked) return <>{children}</>;

  return (
    <div 
      className={`locked-feature-wrapper ${className}`}
      onClickCapture={handleLockedClick}
      style={{ cursor: 'not-allowed', position: 'relative' }}
    >
      <div style={{ opacity: 0.5, pointerEvents: 'none', filter: 'grayscale(1)' }}>
        {children}
      </div>
      <div 
        className="lock-overlay"
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          pointerEvents: 'none'
        }}
      >
        <span className="mat" style={{ color: 'var(--o3)', fontSize: '20px', textShadow: '0 0 10px rgba(255,107,0,0.3)' }}>lock</span>
      </div>
    </div>
  );
}
