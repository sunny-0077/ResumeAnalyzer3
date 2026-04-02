'use client';

import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription } from '@/hooks/useSubscription';
import { useLoading } from '@/hooks/useAppHooks';
import { requireProAccess } from '@/lib/utils';
import { useUser } from '@/context/AuthContext';
import { createClient } from '@/utils/supabase/client';
import { useEffect } from 'react';

export default function SalaryIntel() {
  const [city, setCity] = useState('all');
  const [level, setLevel] = useState('all');
  const { tier } = useSubscription();
  const { user } = useUser();
  const supabase = createClient();
  const { loading: isGenerating, setLoading: setIsGenerating } = useLoading();
  const [salaries, setSalaries] = useState(INITIAL_SALARY_DATA);
  const [savedScripts, setSavedScripts] = useState<any[]>([]);
  const [cooldown, setCooldown] = useState(false);

  useEffect(() => {
    const fetchMarketData = async () => {
      if (user) {
        // Fetch real market benchmarks if available, else use INITIAL_SALARY_DATA
        const { data } = await supabase.from('market_salaries').select('*');
        if (data && data.length > 0) setSalaries(data);

        // Fetch user's saved negotiation scripts
        const { data: scripts } = await supabase.from('user_scripts').select('*').eq('user_id', user.id);
        if (scripts) setSavedScripts(scripts);
      }
    };
    fetchMarketData();
  }, [user, supabase]);

  const [inputSalary, setInputSalary] = useState('');
  const [inputAchievement, setInputAchievement] = useState('');

  const handleRoleClick = () => {
    if (!requireProAccess(tier)) {
      window.dispatchEvent(new CustomEvent('open-upgrade'));
    }
  };

  return (
    <div id="page-salary" className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main">
          <div className="dash-header">
            <div>
              <h1>Salary Intelligence 💰</h1>
              <p style={{ color: 'var(--t2)', fontWeight: 600, marginTop: '4px' }}>
                Real-time ₹ salary data for Indian tech roles · Updated daily
              </p>
            </div>
          </div>
          
          <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--t3)', marginBottom: '12px', marginTop: '12px' }}>FILTER BY CITY</div>
          <div className="salary-controls">
            {cities.map(c => (
              <button 
                key={c.id} 
                className={`salary-chip ${city === c.id ? 'active' : ''}`} 
                onClick={() => setCity(c.id)}
              >
                {c.label}
              </button>
            ))}
          </div>

          <div style={{ fontSize: '14px', fontWeight: 800, color: 'var(--t3)', marginBottom: '12px', marginTop: '32px' }}>FILTER BY ROLE LEVEL</div>
          <div className="salary-controls">
            {levels.map(l => (
              <button 
                key={l.id} 
                className={`salary-chip ${level === l.id ? 'active' : ''}`} 
                onClick={() => setLevel(l.id)}
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="salary-grid" style={{ marginTop: '40px' }}>
            {salaries.map((s, i) => (
              <div key={i} className="sal-card afu" style={{ animationDelay: `${i * 100}ms` }} onClick={handleRoleClick}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div className="sal-role">{s.role}</div>
                  <span className={`demand-tag ${s.demand === 'TRENDING' ? 'demand-viral' : s.demand === 'STABLE' ? 'demand-med' : 'demand-high'}`}>
                    <span className="mat" style={{ fontSize: '14px' }}>{s.icon}</span> {s.demand}
                  </span>
                </div>
                <div className="sal-city">{s.city} · {s.level}</div>
                <div className="sal-range">{s.range}</div>
                <div className="sal-bar-bg"><div className="sal-bar-fill" style={{ width: `${s.fill}%` }}></div></div>
                <div className="sal-meta">
                  <span>Median: <b>{s.median}</b></span>
                  <span className={`salary-trend ${s.trend.includes('↑') ? 'up' : 'stable'}`}>{s.trend} YoY</span>
                </div>
                <div className="salary-skills" style={{ borderTop: '1.5px solid var(--bd2)' }}>
                  {s.skills.map(sk => (
                    <span key={sk} className="salary-skill">Skills: {s.skills.join(', ')}</span>
                  )).slice(0, 1)}
                </div>
              </div>
            ))}
          </div>
            
          {/* NEGOTIATION SCRIPT GENERATOR */}
          <div className="ip-card afu" style={{ marginTop: '48px', padding: '40px', background: 'white', border: '1.5px solid var(--border)', position: 'relative' }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--o1)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                   <span className="mat" style={{ fontSize: '28px' }}>handshake</span>
                </div>
                <div>
                   <h2 style={{ fontSize: '20px', fontWeight: 900 }}>Negotiation Script Generator</h2>
                   <p style={{ fontSize: '13px', color: 'var(--t3)', fontWeight: 600 }}>Convert intel into action with AI-powered persuasion templates.</p>
                </div>
             </div>

             <div className="dash-grid-2">
                <div>
                   <div className="ab-inp-w" style={{ marginBottom: '20px' }}>
                      <label className="ab-inp-l">Target Salary (₹ Annual)</label>
                      <input className="ab-input" placeholder="e.g. ₹35,00,000" value={inputSalary} onChange={(e) => setInputSalary(e.target.value)} />
                   </div>
                   <div className="ab-inp-w" style={{ marginBottom: '20px' }}>
                      <label className="ab-inp-l">Primary Achievement</label>
                      <textarea className="ab-area" placeholder="e.g. Led a team of 5 to increase revenue by 20%..." style={{ minHeight: '100px' }} value={inputAchievement} onChange={(e) => setInputAchievement(e.target.value)} />
                   </div>
                    <button className="btn btn-p" style={{ width: '100%', padding: '14px' }} 
                      onClick={async () => {
                        if (cooldown) return;
                        setIsGenerating(true);
                        setCooldown(true);
                        setTimeout(async () => {
                          const script = `Hi [Hiring Manager], thank you for the offer. Based on my research on current market trends for [Role] in [City] and my recent success in ${inputAchievement}, I was expecting a compensation package closer to ${inputSalary}...`;
                          if (user) {
                            await supabase.from('user_scripts').insert({
                              user_id: user.id,
                              target_salary: inputSalary,
                              achievement: inputAchievement,
                              script_content: script
                            });
                          }
                          window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Negotiation Script Generated & Saved!' } }));
                          setIsGenerating(false);
                          setTimeout(() => setCooldown(false), 1500);
                        }, 1200);
                      }} disabled={isGenerating || cooldown}>
                      {isGenerating ? 'Analyzing Market...' : 'Generate Persuasive Script'}
                    </button>
                </div>
                <div style={{ background: 'var(--o7)', borderRadius: '20px', border: '1.5px dashed var(--o5)', padding: '24px', display: 'flex', flexDirection: 'column' }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <span style={{ fontSize: '11px', fontWeight: 900, color: 'var(--o2)', textTransform: 'uppercase' }}>SCRIPT PREVIEW</span>
                      <span className="mat" style={{ fontSize: '18px', color: 'var(--o4)', cursor: 'pointer' }}>content_copy</span>
                   </div>
                   <div style={{ flex: 1, fontSize: '13px', color: 'var(--t2)', fontStyle: 'italic', lineHeight: 1.6 }}>
                      {savedScripts.length > 0 
                        ? savedScripts[0].script_content 
                        : `"Hi [Hiring Manager], based on my recent success in ${inputAchievement || '[Achievement]'}, I was expecting..."`}
                   </div>
                   <div style={{ marginTop: '16px', background: 'var(--w)', padding: '12px', borderRadius: '12px', border: '1px solid var(--o5)', display: 'flex', gap: '8px' }}>
                      <span className="mat" style={{ color: 'var(--o3)', fontSize: '16px' }}>verified</span>
                      <span style={{ fontSize: '11px', fontWeight: 700, color: 'var(--t2)' }}>84% Success Rate with this template</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="salary-disclaimer afu" style={{ animationDelay: '800ms', padding: '18px 24px', borderRadius: '16px', border: '1.5px solid var(--bd2)', background: 'var(--o7)', color: 'var(--t2)', marginTop: '24px' }}>

            <span className="mat" style={{ color: 'var(--o3)' }}>info</span>
            <span style={{ fontWeight: 600 }}>Salary data sourced from Glassdoor India, Levels.fyi, LinkedIn Salary, and 1,200+ Hirely user reports. Figures are gross CTC before taxes.</span>
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
const INITIAL_SALARY_DATA = [
  { role: 'Frontend Engineer', city: 'Bangalore', level: 'Mid Level', range: '₹14L – ₹28L', median: '₹19L', trend: '↑ 12%', fill: 72, demand: 'HIGH DEMAND', icon: 'local_fire_department', skills: ['React', 'TypeScript', 'Next.js'] },
  { role: 'Backend Engineer', city: 'Bangalore', level: 'Senior', range: '₹22L – ₹48L', median: '₹32L', trend: '↑ 18%', fill: 85, demand: 'HIGH DEMAND', icon: 'local_fire_department', skills: ['Node.js', 'Go', 'PostgreSQL'] },
  { role: 'Product Manager', city: 'Mumbai', level: 'Mid Level', range: '₹18L – ₹38L', median: '₹26L', trend: '↑ 22%', fill: 78, demand: 'TRENDING', icon: 'trending_up', skills: ['Roadmapping', 'SQL', 'Figma'] },
  { role: 'Data Engineer', city: 'Hyderabad', level: 'Mid-Senior', range: '₹16L – ₹40L', median: '₹24L', trend: '↑ 25%', fill: 80, demand: 'HIGH DEMAND', icon: 'local_fire_department', skills: ['Spark', 'Airflow', 'dbt'] },
  { role: 'UI/UX Designer', city: 'Pune', level: 'Junior-Mid', range: '₹8L – ₹22L', median: '₹14L', trend: '→ 5%', fill: 55, demand: 'STABLE', icon: 'equalizer', skills: ['Figma', 'Prototyping', 'Research'] },
];

const cities = [
  { id: 'all', label: 'All Cities' },
  { id: 'bangalore', label: 'Bangalore' },
  { id: 'mumbai', label: 'Mumbai' },
  { id: 'delhi', label: 'Delhi NCR' },
  { id: 'hyderabad', label: 'Hyderabad' },
  { id: 'pune', label: 'Pune' },
  { id: 'remote', label: 'Remote' },
];

const levels = [
  { id: 'all', label: 'All Levels' },
  { id: 'fresher', label: 'Fresher (0-1 yr)' },
  { id: 'junior', label: 'Junior (1-3 yrs)' },
  { id: 'mid', label: 'Mid (3-6 yrs)' },
  { id: 'senior', label: 'Senior (6+ yrs)' },
];

