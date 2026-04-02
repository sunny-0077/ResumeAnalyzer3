'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/AuthContext';
import { createClient } from '@/utils/supabase/client';

export default function OnboardingPage() {
  const router = useRouter();
  const { user } = useUser();
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const totalSteps = 4; // Simplified to 4 key steps for high-conversion

  const [formData, setFormData] = useState({
    name: user?.user_metadata?.full_name || '',
    level: '',
    title: '',
    experience: 0
  });

  const nextStep = async () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      if (user) {
        await supabase.from('profiles').update({
          professional_title: formData.title,
          experience_years: formData.experience,
          onboarded: true
        }).eq('id', user.id);
      }
      router.push('/dashboard');
    }
  };

  const updateProfileData = (field: string, val: any) => {
    setFormData({ ...formData, [field]: val });
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div id="page-onboarding" className="afi">
      <div className="ob-logo">Profile<span>Pro</span> AI</div>
      
      {/* Progress Tracker */}
      <div className="ob-prog">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <React.Fragment key={i}>
            <div className="ob-node">
              <div className={`ob-circle ${step > i + 1 ? 'done' : step === i + 1 ? 'active' : ''}`}>
                {step > i + 1 ? <span className="mat">check</span> : i + 1}
              </div>
              <div className={`ob-node-label ${step === i + 1 ? 'active' : step > i + 1 ? 'done' : ''}`}>
                {['Welcome', 'Status', 'Target', 'Skills', 'Resume', 'LinkedIn', 'Prefs', 'Finish'][i]}
              </div>
            </div>
            {i < totalSteps - 1 && (
              <div className={`ob-line ${step > i + 1 ? 'done' : ''}`}></div>
            )}
          </React.Fragment>
        ))}
      </div>
      
      <div className="ob-card">
        {/* S1: Welcome */}
        {step === 1 && (
          <div className="ob-sc active">
            <div className="ob-ey">Step 1 of 8 — Welcome</div>
            <div className="ob-title">Welcome to Hirely AI! 👋</div>
            <div className="ob-sub">Confirm your info and we'll personalise everything in under 3 minutes.</div>
            {user && (
              <div className="ob-user-card">
                <div className="ob-uavatar">{user.email ? user.email[0].toUpperCase() : 'U'}</div>
                <div>
                  <div className="ob-uname">{user.user_metadata?.full_name || 'User'}</div>
                  <div className="ob-uemail">{user.email}</div>
                  <div className="ob-ugoogle"><span className="mat" style={{ fontSize: '13px' }}>verified_user</span> Authenticated Profile</div>
                </div>
              </div>
            )}
            <div className="inp-wrap">
              <label className="inp-label">What should we call you?</label>
              <input 
                className="inp" 
                type="text" 
                placeholder="Preferred first name" 
                value={formData.name} 
                onChange={(e) => updateProfileData('name', e.target.value)}
              />
            </div>
            <div className="ob-actions">
              <span></span>
              <button className="btn btn-p" onClick={nextStep}>Let's go <span className="mat">arrow_forward</span></button>
            </div>
          </div>
        )}

        {/* S2: Status */}
        {step === 2 && (
          <div className="ob-sc active">
            <div className="ob-ey">Step 2 of 8 — Your Situation</div>
            <div className="ob-title">Where are you in your career?</div>
            <div className="ob-sub">This personalises job matches and interview questions to your level of experience.</div>
            <div className="ob-chips">
              {[
                { label: 'College Student', exp: 0 },
                { label: 'Recent Graduate', exp: 1 },
                { label: 'Early Career (1-3 yrs)', exp: 2 },
                { label: 'Professional (4-8 yrs)', exp: 6 },
                { label: 'Senior Leader (9+ yrs)', exp: 12 },
                { label: 'Career Changer', exp: 3 }
              ].map(s => (
                <button 
                  key={s.label} 
                  className={`ob-chip ${formData.level === s.label ? 'active' : ''}`}
                  onClick={() => {
                    updateProfileData('level', s.label);
                    updateProfileData('experience', s.exp);
                    nextStep();
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
            <div className="ob-actions">
              <button className="ob-back" onClick={prevStep}>Back</button>
              <span className="ob-skip" onClick={nextStep}>Skip for now</span>
            </div>
          </div>
        )}

        {/* S3: Target Role */}
        {step === 3 && (
          <div className="ob-sc active">
            <div className="ob-ey">Step 3 of 8 — Goal</div>
            <div className="ob-title">What's your target role?</div>
            <div className="ob-sub">Tell us the specific job title you're aiming for next.</div>
            <div className="inp-wrap">
              <label className="inp-label">Target Job Title</label>
              <input 
                className="inp" 
                type="text" 
                placeholder="e.g. Senior Product Designer, Backend Engineer" 
                value={formData.title}
                onChange={(e) => updateProfileData('title', e.target.value)}
              />
            </div>
            <div className="ob-actions">
              <button className="ob-back" onClick={prevStep}>Back</button>
              <button className="btn btn-p" onClick={nextStep}>Continue <span className="mat">arrow_forward</span></button>
            </div>
          </div>
        )}

        {/* S4 to S8 are placeholders for now, but following the same theme */}
        {step >= 4 && step <= 7 && (
          <div className="ob-sc active">
            <div className="ob-ey">Step {step} of 8 — Setting Up</div>
            <div className="ob-title">{['Skills', 'Resume Upload', 'LinkedIn Sync', 'Preferences'][step - 4]}</div>
            <div className="ob-sub">We're almost there! Setting up your {['skills profile', 'AI resume scanner', 'LinkedIn connection', 'search preferences'][step - 4]}.</div>
            
            {step === 5 && (
              <div className="ob-dropzone">
                <span className="mat">upload_file</span>
                <h3>Drag & drop your resume</h3>
                <p>PDF or Word (max 5MB)</p>
              </div>
            )}
            
            <div className="ob-actions" style={{ marginTop: '40px' }}>
              <button className="ob-back" onClick={prevStep}>Back</button>
              <button className="btn btn-p" onClick={nextStep}>Next Step <span className="mat">arrow_forward</span></button>
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="ob-sc active" style={{ textAlign: 'center' }}>
            <div className="ob-ey">Final Step — All Set!</div>
            <div className="ob-title">Account Prepared! 🚀</div>
            <div className="ob-sub">Your career engine is now calibrated. Redirecting you to your personal dashboard...</div>
            <div className="loading-spinner" style={{ marginTop: '30px' }}></div>
            <button className="btn btn-p btn-lg" style={{ width: '100%', marginTop: '30px' }} onClick={nextStep}>Take me to Dashboard</button>
          </div>
        )}
      </div>
    </div>
  );
}
