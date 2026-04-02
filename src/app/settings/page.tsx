'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useUser } from '@/context/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { createClient } from '@/utils/supabase/client';
import { PRICING } from '@/lib/pricing';
import { useEffect } from 'react';

export default function SettingsPage() {
  const { user } = useUser();
  const { tier } = useSubscription();
  const supabase = createClient();

  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    location: '',
    bio: ''
  });

  // Toggle states
  const [toggles, setToggles] = useState<Record<string, boolean>>({
    notifJobs: true,
    notifAts: true,
    notifInterviews: true,
    notifWeekly: false,
    notifSalary: true,
    notifDeadlines: false,
    appCompact: false,
    appAnimations: true,
    privPublic: false,
    privData: true,
    privEmployers: false,
    privSalary: true,
  });

  useEffect(() => {
    const fetchSettings = async () => {
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (profile) {
          setProfileData({
            firstName: profile.full_name?.split(' ')[0] || '',
            lastName: profile.full_name?.split(' ').slice(1).join(' ') || '',
            email: user.email || '',
            location: profile.location || '',
            bio: profile.bio || ''
          });
          if (profile.settings) setToggles(profile.settings);
        }
      }
    };
    fetchSettings();
  }, [user, supabase]);

  const saveProfile = async () => {
    if (user) {
      await supabase.from('profiles').update({
        full_name: `${profileData.firstName} ${profileData.lastName}`,
        location: profileData.location,
        bio: profileData.bio
      }).eq('id', user.id);
      showToast('success', 'Profile and preferences synced to cloud!');
    }
  };

  const toggle = async (key: string) => {
    const newToggles = { ...toggles, [key]: !toggles[key] };
    setToggles(newToggles);
    if (user) {
      await supabase.from('profiles').update({ settings: newToggles }).eq('id', user.id);
    }
  };

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const navItems = [
    { icon: 'person', label: 'Profile & Account', id: 'profile' },
    { icon: 'notifications', label: 'Notifications', id: 'notif' },
    { icon: 'security', label: 'Security', id: 'security' },
    { icon: 'credit_card', label: 'Billing', id: 'billing' },
    { icon: 'palette', label: 'Appearance', id: 'appear' },
    { icon: 'privacy_tip', label: 'Privacy', id: 'privacy' },
  ];

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div className="pg-hdr" style={{ marginBottom: '24px' }}>
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)', marginBottom: '4px' }}>Settings</h1>
            <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Manage your account, notifications, and preferences.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '240px 1fr', gap: '32px' }}>
            <div className="settings-nav">
              {navItems.map((s) => (
                <div 
                  key={s.id}
                  className={`sn-it ${activeTab === s.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(s.id)}
                >
                  <span className="mat" style={{ fontSize: '18px', marginRight: '8px' }}>{s.icon}</span> 
                  {s.label}
                </div>
              ))}
            </div>

            <div className="settings-content" style={{ background: 'var(--w)', border: '1px solid var(--bd)', borderRadius: '20px', padding: '32px', boxShadow: 'var(--sh1)' }}>
              
              {/* Profile Section */}
              {activeTab === 'profile' && (
                <div className="settings-section">
                  <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px' }}>Profile Information</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="inp-w">
                      <label className="inp-lbl">First Name</label>
                      <input className="inp" type="text" value={profileData.firstName} onChange={e => setProfileData({...profileData, firstName: e.target.value})} />
                    </div>
                    <div className="inp-w">
                      <label className="inp-lbl">Last Name</label>
                      <input className="inp" type="text" value={profileData.lastName} onChange={e => setProfileData({...profileData, lastName: e.target.value})} />
                    </div>
                  </div>
                  <div className="inp-w">
                    <label className="inp-lbl">Email Address</label>
                    <input className="inp" type="email" value={profileData.email} readOnly style={{ opacity: 0.6 }} />
                  </div>
                  <div className="inp-w">
                    <label className="inp-lbl">Location</label>
                    <input className="inp" type="text" value={profileData.location} onChange={e => setProfileData({...profileData, location: e.target.value})} />
                  </div>
                  <div className="inp-w">
                    <label className="inp-lbl">Professional Bio</label>
                    <textarea className="inp" style={{ minHeight: '80px' }} value={profileData.bio} onChange={e => setProfileData({...profileData, bio: e.target.value})}></textarea>
                  </div>
                  <button className="btn btn-p btn-sm" onClick={saveProfile} style={{ marginTop: '16px' }}>
                    <span className="mat" style={{ fontSize: '16px', marginRight: '6px' }}>save</span> Save Changes
                  </button>
                </div>
              )}

              {/* Notification Section */}
              {activeTab === 'notif' && (
                <div className="settings-section">
                  <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px' }}>Notification Preferences</h3>
                  
                  {[
                    { key: 'notifJobs', title: 'New Job Matches', desc: 'Get notified when new jobs match your profile' },
                    { key: 'notifAts', title: 'ATS Analysis Complete', desc: 'Alert when your resume scan finishes' },
                    { key: 'notifInterviews', title: 'Interview Reminders', desc: 'Remind 1 hour before scheduled mock sessions' },
                    { key: 'notifWeekly', title: 'Weekly Career Digest', desc: 'Weekly summary of your progress and opportunities' },
                    { key: 'notifSalary', title: 'Salary Alerts', desc: 'Notify when salaries change for your target role' },
                    { key: 'notifDeadlines', title: 'Application Deadlines', desc: 'Remind 3 days before saved jobs close' }
                  ].map(n => (
                    <div key={n.key} className="toggle-row">
                      <div className="toggle-lbl">
                        <h4 style={{ fontSize: '14px', fontWeight: 800, color: 'var(--t1)', marginBottom: '4px' }}>{n.title}</h4>
                        <p style={{ fontSize: '12px', color: 'var(--t3)', fontWeight: 600 }}>{n.desc}</p>
                      </div>
                      <div className={`toggle-sw ${toggles[n.key] ? 'on' : ''}`} onClick={() => toggle(n.key)}>
                        <div className="toggle-thumb"></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Security Section */}
              {activeTab === 'security' && (
                <div className="settings-section">
                  <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px' }}>Security Settings</h3>
                  <div className="inp-w"><label className="inp-lbl">Current Password</label><input className="inp" type="password" placeholder="Enter current password"/></div>
                  <div className="inp-w"><label className="inp-lbl">New Password</label><input className="inp" type="password" placeholder="Enter new password"/></div>
                  <div className="inp-w"><label className="inp-lbl">Confirm New Password</label><input className="inp" type="password" placeholder="Confirm new password"/></div>
                  <button className="btn btn-p btn-sm" onClick={() => showToast('success', 'Password updated successfully!')} style={{ marginTop: '8px' }}>Update Password</button>
                  
                  <div style={{ marginTop: '32px', padding: '20px', background: 'var(--gl)', border: '1px solid var(--gbg)', borderRadius: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--gn)', marginBottom: '8px' }}>Two-Factor Authentication</div>
                    <div style={{ fontSize: '13px', color: 'var(--t2)', marginBottom: '16px', fontWeight: 600 }}>Add an extra layer of security to your account.</div>
                    <button className="btn btn-s btn-sm" style={{ background: '#fff' }} onClick={() => showToast('info', '2FA setup via authenticator app...')}>Enable 2FA</button>
                  </div>
                  
                  <div style={{ marginTop: '20px', padding: '20px', background: 'var(--rl)', border: '1px solid var(--rbg)', borderRadius: '16px' }}>
                    <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--rd)', marginBottom: '8px' }}>Danger Zone</div>
                    <div style={{ fontSize: '13px', color: 'var(--t2)', marginBottom: '16px', fontWeight: 600 }}>Once you delete your account, all your data will be permanently removed.</div>
                    <button className="btn btn-sm" style={{ background: 'var(--rd)', color: '#fff', border: 'none' }} onClick={() => showToast('error', 'Please contact support to delete your account.')}>Delete Account</button>
                  </div>
                </div>
              )}

              {/* Billing Section */}
              {activeTab === 'billing' && (
                <div className="settings-section">
                  <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px' }}>Billing &amp; Subscription</h3>
                  
                  <div style={{ background: 'var(--o6)', border: '1.5px solid var(--o5)', borderRadius: '16px', padding: '24px', marginBottom: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div className="dash-card-h">
                        <span style={{ fontSize: '12px', fontWeight: 900, textTransform: 'uppercase', color: 'var(--t4)' }}>Monthly Billing</span>
                      </div>
                      <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--gn)' }}>{tier === 'advanced' ? `₹${PRICING.IN.advanced}` : `₹${PRICING.IN.pro}`}</div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <div style={{ fontSize: '11px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--o3)', marginBottom: '6px' }}>CURRENT PLAN</div>
                        <div style={{ fontSize: '24px', fontWeight: 900, color: 'var(--t1)' }}>{tier === 'pro' ? 'Pro ✦' : tier === 'advanced' ? 'Advanced' : 'Free'}</div>
                      </div>
                      <button className="btn btn-p btn-sm" onClick={() => showToast('info', 'Opening upgrade modal...')}>Upgrade Now</button>
                    </div>
                  </div>
                  
                  <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--t1)', marginBottom: '12px' }}>Payment Method</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px', padding: '16px', border: '1px solid var(--bd)', borderRadius: '14px', marginBottom: '16px' }}>
                    <div style={{ width: '48px', height: '32px', background: 'linear-gradient(135deg, var(--bl), #2563eb)', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '11px', fontWeight: 900, color: '#fff', fontStyle: 'italic' }}>VISA</span>
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--t1)' }}>•••• •••• •••• 4242</div>
                      <div style={{ fontSize: '12px', color: 'var(--t3)', fontWeight: 600 }}>Expires 12/26</div>
                    </div>
                    <button className="btn btn-g btn-sm" style={{ marginLeft: 'auto' }} onClick={() => showToast('info', 'Opening payment settings...')}>Edit</button>
                  </div>
                  <button className="btn btn-g btn-sm" onClick={() => showToast('info', 'Add new payment method...')}>
                    <span className="mat" style={{ fontSize: '16px', marginRight: '6px' }}>add</span> Add Payment Method
                  </button>
                  
                  <div style={{ marginTop: '32px', fontSize: '14px', fontWeight: 900, color: 'var(--t1)', marginBottom: '16px' }}>Billing History</div>
                  {['Jan 2026', 'Dec 2025', 'Nov 2025'].map(m => (
                    <div key={m} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', border: '1px solid var(--bd)', borderRadius: '12px', marginBottom: '8px' }}>
                      <div style={{ fontSize: '14px', fontWeight: 700 }}>{m}</div>
                      <div style={{ fontSize: '14px', fontWeight: 900, color: 'var(--gn)' }}>₹{PRICING.IN.pro}</div>
                      <button className="btn btn-s btn-sm" style={{ fontSize: '12px', border: 'none' }} onClick={() => showToast('info', 'Downloading invoice...')}>
                        <span className="mat" style={{ fontSize: '16px', marginRight: '4px' }}>download</span> Invoice
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Appearance Section */}
              {activeTab === 'appear' && (
                <div className="settings-section">
                  <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px' }}>Appearance</h3>
                  <div className="toggle-row">
                    <div className="toggle-lbl"><h4 style={{ fontSize: '14px', fontWeight: 800 }}>Compact Mode</h4><p style={{ fontSize: '12px', color: 'var(--t3)' }}>Reduce spacing for more content on screen</p></div>
                    <div className={`toggle-sw ${toggles.appCompact ? 'on' : ''}`} onClick={() => toggle('appCompact')}><div className="toggle-thumb"></div></div>
                  </div>
                  <div className="toggle-row">
                    <div className="toggle-lbl"><h4 style={{ fontSize: '14px', fontWeight: 800 }}>Animations</h4><p style={{ fontSize: '12px', color: 'var(--t3)' }}>Enable smooth transitions and effects</p></div>
                    <div className={`toggle-sw ${toggles.appAnimations ? 'on' : ''}`} onClick={() => toggle('appAnimations')}><div className="toggle-thumb"></div></div>
                  </div>
                  <div className="inp-w" style={{ marginTop: '24px' }}>
                     <label className="inp-lbl">Language</label>
                     <select className="inp"><option>English (India)</option><option>Hindi</option><option>Tamil</option></select>
                  </div>
                  <div className="inp-w">
                     <label className="inp-lbl">Date Format</label>
                     <select className="inp"><option>DD/MM/YYYY (India)</option><option>MM/DD/YYYY (US)</option><option>YYYY-MM-DD</option></select>
                  </div>
                  <button className="btn btn-p btn-sm" onClick={() => showToast('success', 'Appearance setings saved!')}>Save Preferences</button>
                </div>
              )}

              {/* Privacy Section */}
              {activeTab === 'privacy' && (
                <div className="settings-section">
                  <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px' }}>Privacy Settings</h3>
                  {[
                    { key: 'privPublic', title: 'Public Profile', desc: 'Allow your profile to be discoverable by recruiters' },
                    { key: 'privData', title: 'Share Anonymous Data', desc: 'Help us improve with anonymized usage analytics' },
                    { key: 'privEmployers', title: 'Profile Visibility to Employers', desc: 'Show your profile to employers in your target companies' },
                    { key: 'privSalary', title: 'Salary Data Contribution', desc: 'Share anonymized salary data to help the community' },
                  ].map(p => (
                    <div key={p.key} className="toggle-row">
                      <div className="toggle-lbl">
                        <h4 style={{ fontSize: '14px', fontWeight: 800 }}>{p.title}</h4>
                        <p style={{ fontSize: '12px', color: 'var(--t3)' }}>{p.desc}</p>
                      </div>
                      <div className={`toggle-sw ${toggles[p.key] ? 'on' : ''}`} onClick={() => toggle(p.key)}>
                        <div className="toggle-thumb"></div>
                      </div>
                    </div>
                  ))}
                  <div style={{ marginTop: '32px' }}>
                    <button className="btn btn-g btn-sm" onClick={() => showToast('info', 'Downloading your data archive...')}>
                      <span className="mat" style={{ fontSize: '16px', marginRight: '6px' }}>download</span> Download My Data
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>
          
          <style jsx>{`
            .settings-nav {
              display: flex;
              flex-direction: column;
              gap: 8px;
            }
            .sn-it {
              padding: 14px 16px;
              border-radius: 12px;
              color: var(--t3);
              font-weight: 800;
              font-size: 14px;
              display: flex;
              align-items: center;
              cursor: pointer;
              transition: all 150ms;
            }
            .sn-it:hover {
              background: var(--s2);
              color: var(--t2);
            }
            .sn-it.active {
              background: var(--w);
              color: var(--o2);
              box-shadow: var(--sh1);
              border: 1px solid var(--bd);
            }
            .toggle-row {
              display: flex;
              justify-content: space-between;
              align-items: center;
              padding: 16px 0;
              border-bottom: 1px solid var(--bd);
            }
          `}</style>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
