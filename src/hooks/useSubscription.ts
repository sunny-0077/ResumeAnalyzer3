'use client';

import { useState, useEffect } from 'react';

export type UserTier = 'free' | 'pro' | 'advanced';

export function useSubscription() {
  const [tier, setTier] = useState<UserTier>('free');
  const [isTrialing, setIsTrialing] = useState(false);
  const [trialTimeLeft, setTrialTimeLeft] = useState(3 * 24 * 60 * 60); // 3 days in seconds

  useEffect(() => {
    // Simulated load from local storage
    const saved = localStorage.getItem('user_tier') as UserTier;
    if (saved) setTier(saved);
  }, []);

  const upgrade = (newTier: UserTier, isTrial = false) => {
    setTier(newTier);
    localStorage.setItem('user_tier', newTier);
    if (isTrial) {
      setIsTrialing(true);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: `3-day Advanced trial started! Enjoy full access.` } }));
    } else {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: `Upgraded to ${newTier.toUpperCase()} successfully!` } }));
    }
  };

  const checkAccess = (feature: string) => {
    const limits: Record<UserTier, string[]> = {
      free: ['ats_analysis', 'job_match', 'score', 'keywords'],
      pro: ['ats_analysis', 'job_match', 'score', 'keywords', 'star_coach', 'email_gen', 'cover_letter', 'career_path', 'rewrite', 'ats_tips', 'formatting'],
      advanced: ['ats_analysis', 'job_match', 'score', 'keywords', 'star_coach', 'email_gen', 'cover_letter', 'career_path', 'rewrite', 'ats_tips', 'formatting', 'deep_analysis', 'local_jobs', 'salary_intel', 'mock_interview', 'unlimited_match', 'recruiter_score', 'role_optimization']
    };
    return limits[tier].includes(feature);
  };

  return { tier, upgrade, checkAccess, isTrialing, trialTimeLeft };
}
