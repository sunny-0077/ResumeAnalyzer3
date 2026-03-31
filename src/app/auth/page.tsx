'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { useUser } from '@/context/AuthContext';

export default function AuthPage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useUser();
  const [tab, setTab] = useState<'in' | 'up'>('in');
  const [showPwd, setShowPwd] = useState(false);
  const [pwdStrength, setPwdStrength] = useState(0);

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      router.push('/dashboard');
    }
  }, [user, authLoading, router]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  
  const supabase = createClient();

  const checkPwd = (val: string) => {
    let score = 0;
    if (val.length >= 8) score += 25;
    if (/[A-Z]/.test(val)) score += 25;
    if (/[0-9]/.test(val)) score += 25;
    if (/[^A-Za-z0-9]/.test(val)) score += 25;
    setPwdStrength(score);
  };


  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      if (tab === 'up') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: { full_name: name },
            emailRedirectTo: `${window.location.origin}/auth/callback`,
          }
        });
        
        if (error) throw error;
        
        if (data.user && data.session) {
          window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Registration successful! Welcome to Hirely AI.' } }));
          router.push('/dashboard');
        } else {
          window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Check your email to verify your account!' } }));
          setTab('in');
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Welcome back! Redirecting...' } }));
        router.push('/dashboard');
      }
    } catch (err: any) {
      console.error('Auth error:', err);
      let friendlyMsg = err.message || 'Authentication failed';
      if (err.message?.includes('Invalid login credentials')) {
        friendlyMsg = 'Invalid email or password. Please try again.';
      } else if (err.message?.includes('User already registered')) {
        friendlyMsg = 'This email is already registered. Try signing in.';
      }
      setErrorMsg(friendlyMsg);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'error', msg: friendlyMsg } }));
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleAuth = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            prompt: 'select_account',
            access_type: 'offline',
          }
        }
      });
      if (error) throw error;
    } catch (err: any) {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'error', msg: err.message || 'Google Auth failed' } }));
      setLoading(false);
    }
  };

  return (
    <div id="page-auth" className="afi">
      <nav className="auth-nav">
        <div className="auth-logo">Hirely&nbsp;<span>AI</span></div>
        <div style={{ fontSize: '13px', color: 'var(--t3)', fontWeight: 600 }}>Made in India 🇮🇳</div>
      </nav>
      
      <div className="auth-wrap">
        <div className="auth-left">
          <div className="auth-left-blob" style={{ width: '400px', height: '400px', background: 'rgba(255,255,255,.08)', top: '-100px', left: '-80px' }}></div>
          <div className="auth-left-blob" style={{ width: '280px', height: '280px', background: 'rgba(0,0,0,.15)', bottom: '-60px', right: '-40px' }}></div>
          
          <div style={{ position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.5)', marginBottom: '14px' }}>Hirely AI</div>
            <h1>Land Your<br/><span style={{ color: 'rgba(255,255,255,.65)' }}>Dream Job</span><br/>— Faster</h1>
            <p className="auth-left-sub">AI-powered career intelligence: ATS analysis, job matching, interview prep, salary insights — all in one place.</p>
            
            <div className="auth-feats">
              <div className="auth-feat"><span className="mat">check_circle</span> ATS Score with real parser rules (not guesses)</div>
              <div className="auth-feat"><span className="mat">check_circle</span> Job match across Naukri, LinkedIn, Internshala</div>
              <div className="auth-feat"><span className="mat">check_circle</span> ₹ Salary intelligence for Indian tech roles</div>
              <div className="auth-feat"><span className="mat">check_circle</span> AI Interview Coach with STAR scoring</div>
              <div className="auth-feat"><span className="mat">check_circle</span> Resume versioning with score delta tracking</div>
            </div>
          </div>
          
          <div className="auth-proof">
            <div className="auth-avs">
              <div className="auth-av">P</div><div className="auth-av">R</div><div className="auth-av">A</div><div className="auth-av">S</div><div className="auth-av">+</div>
            </div>
            <div style={{ fontSize: '13px', color: 'rgba(255,255,255,.75)', fontWeight: 600 }}>
              <span style={{ color: '#fff', fontWeight: 800 }}>12,847</span> job seekers joined this month
            </div>
            <div style={{ marginTop: '6px', color: 'rgba(255,255,255,.5)', fontSize: '12px' }}>★★★★★ 4.9/5 from 2,300+ reviews</div>
          </div>
        </div>
        
        <div className="auth-right">
          <div className="auth-box afu">
            <h2>{tab === 'in' ? 'Welcome back' : 'Create an account'}</h2>
            <p>{tab === 'in' ? 'Sign in to your career dashboard and continue your job search.' : 'Join thousands of job seekers and automate your career growth.'}</p>
            
            <button className="google-btn" onClick={handleGoogleAuth} disabled={loading}>
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              {loading ? 'Connecting...' : 'Continue with Google'}
            </button>
            
            <div className="auth-divider">or sign in with email</div>
            
            <div className="auth-tabs">
              <button className={`auth-tab ${tab === 'in' ? 'active' : ''}`} onClick={() => setTab('in')}>Sign In</button>
              <button className={`auth-tab ${tab === 'up' ? 'active' : ''}`} onClick={() => setTab('up')}>Create Account</button>
            </div>
            
            <form onSubmit={handleAuth}>
              {errorMsg && (
                <div style={{ padding: '12px', background: 'var(--rbg)', color: 'var(--red)', fontSize: '13px', borderRadius: '12px', marginBottom: '16px', fontWeight: 600 }}>
                  {errorMsg}
                </div>
              )}

              {tab === 'up' && (
                <div className="inp-wrap">
                  <label className="inp-label">Full Name</label>
                  <input className="inp" type="text" placeholder="Your full name" required value={name} onChange={(e) => setName(e.target.value)} disabled={loading} />
                </div>
              )}
              
              <div className="inp-wrap">
                <label className="inp-label">Email</label>
                <input className="inp" type="email" placeholder="you@email.com" required value={email} onChange={(e) => setEmail(e.target.value)} disabled={loading} />
              </div>
              
              <div className="inp-wrap" style={{ position: 'relative' }}>
                <label className="inp-label">Password</label>
                <input 
                  className="inp" 
                  type={showPwd ? "text" : "password"} 
                  placeholder={tab === 'in' ? "Your password" : "Min 8 characters"} 
                  required 
                  value={password}
                  disabled={loading}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    if (tab === 'up') checkPwd(e.target.value);
                  }}
                  style={{ paddingRight: '44px' }}
                />
                <button 
                  type="button"
                  onClick={() => setShowPwd(!showPwd)} 
                  style={{ position: 'absolute', right: '12px', bottom: '12px', background: 'none', border: 'none', color: 'var(--t3)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <span className="mat" style={{ fontSize: '18px' }}>{showPwd ? 'visibility' : 'visibility_off'}</span>
                </button>
                
                {tab === 'up' && (
                  <>
                    <div className="pwd-bar-bg">
                      <div 
                        className="pwd-bar-fill" 
                        style={{ 
                          width: `${pwdStrength}%`, 
                          background: pwdStrength < 50 ? 'var(--red)' : pwdStrength < 100 ? 'var(--amber)' : 'var(--green)' 
                        }}
                      ></div>
                    </div>
                    <div className="inp-hint">
                      {pwdStrength === 0 ? 'Enter a password' : pwdStrength < 100 ? 'Stronger password suggested' : 'Excellent password!'}
                    </div>
                  </>
                )}
              </div>
              
              {tab === 'in' && (
                <div style={{ textAlign: 'right', marginBottom: '16px' }}>
                  <button type="button" style={{ background: 'none', border: 'none', fontSize: '12px', color: 'var(--o2)', fontWeight: 700, cursor: 'pointer' }}>Forgot password?</button>
                </div>
              )}
              
              {tab === 'up' && (
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', fontSize: '12px', color: 'var(--t2)', cursor: 'pointer' }}>
                    <input type="checkbox" required style={{ marginTop: '2px', accentColor: 'var(--o3)' }} />
                    <span>I agree to the <a href="#" style={{ color: 'var(--o2)', fontWeight: 700, textDecoration: 'none' }}>Terms</a> & <a href="#" style={{ color: 'var(--o2)', fontWeight: 700, textDecoration: 'none' }}>Privacy Policy</a></span>
                  </label>
                </div>
              )}
              
              <button className="btn btn-p btn-lg" style={{ width: '100%', borderRadius: '14px' }} type="submit" disabled={loading}>
                {loading ? 'Authenticating...' : tab === 'in' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
            
            <div style={{ fontSize: '12px', color: 'var(--t3)', textAlign: 'center', marginTop: '18px', lineHeight: 1.6 }}>By continuing, you agree to our <a href="#" style={{ color: 'var(--o2)', fontWeight: 700, textDecoration: 'none' }}>Terms</a> & <a href="#" style={{ color: 'var(--o2)', fontWeight: 700, textDecoration: 'none' }}>Privacy Policy</a></div>
          </div>
        </div>
      </div>
    </div>
  );
}
