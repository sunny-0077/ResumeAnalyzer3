'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription } from '@/hooks/useSubscription';
import { useInterviewTimer, useLoading, useEscClose } from '@/hooks/useAppHooks';
import { checkCompletion, resetInterviewState } from '@/lib/utils';
import { useUser } from '@/context/AuthContext';
import { createClient } from '@/utils/supabase/client';

export default function InterviewPrep() {
  const [mode, setMode] = useState<'text' | 'voice'>('text');
  const [ans, setAns] = useState('');
  const { loading: isAnalyzing, setLoading: setIsAnalyzing } = useLoading();
  const { tier } = useSubscription();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questions, setQuestions] = useState([
    "Tell me about yourself and your professional background. What brings you here today?",
    "Describe a difficult challenge you faced at work and how you overcame it.",
    "Where do you see yourself in five years?"
  ]);
  const [answers, setAnswers] = useState<string[]>([]);
  const { user } = useUser();
  const supabase = createClient();
  const [sessionHistory, setSessionHistory] = useState<any[]>([]);
  const [cooldown, setCooldown] = useState(false);
  
  const timer = useInterviewTimer(600); // 10 minute session
  
  useEscClose(() => setShowReport(false));

  // Simulated Analysis State
  const [stats, setStats] = useState({
    clarity: 0,
    confidence: 0,
    relevance: 0
  });

  const [star, setStar] = useState({
    s: false,
    t: false,
    a: false,
    r: false
  });

  const [showReport, setShowReport] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      if (user) {
        const { data } = await supabase.from('user_interviews').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        if (data) setSessionHistory(data);
      }
    };
    fetchHistory();
  }, [user, supabase]);

  const handleSubmit = () => {
    if (cooldown) return;
    if (tier !== 'advanced') {
      window.dispatchEvent(new CustomEvent('open-upgrade'));
      return;
    }
    setIsAnalyzing(true);
    setCooldown(true);
    // Simulate real-time update
    setTimeout(() => {
      setStats({ clarity: 88, confidence: 74, relevance: 96 });
      setStar({ s: true, t: true, a: true, r: true });
      setIsAnalyzing(false);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Answer Analyzed! Feedback updated.' } }));
      
      const nextIdx = currentIndex + 1;
      setAnswers([...answers, ans]);
      if (!checkCompletion(nextIdx, questions.length, setShowReport)) {
        setCurrentIndex(nextIdx);
        setAns('');
      }
      setTimeout(() => setCooldown(false), 1500);
    }, 2000);
  };

  const handleEndSession = async () => {
    if (user && answers.length > 0) {
      await supabase.from('user_interviews').insert({
        user_id: user.id,
        score: 82,
        feedback: { clarity: stats.clarity, confidence: stats.confidence, relevance: stats.relevance },
        answers: answers
      });
    }
    setShowReport(true);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div id="page-interview" className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '0', background: 'var(--surface)' }}>
          
          <div className="ip-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 900 }}>Interview Prep</h1>
              <span className="badge bo" style={{ fontSize: '10px' }}>General Behavioral</span>
              <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--o6)', color: 'var(--o2)', padding: '6px 14px', borderRadius: '10px', fontSize: '13px', fontWeight: 800 }}>
                <span className="mat" style={{ fontSize: '18px' }}>timer</span>
                {formatTime(timer)}
              </div>
            </div>
            <div className="ip-prog-label">
              Session progress <span className="ip-prog-val">Q{currentIndex + 1} of {questions.length}</span>
            </div>
          </div>

          <div style={{ padding: '0 40px 40px' }}>
            <div className="ip-grid">
              
              {/* LEFT COLUMN: MAIN WORKSPACE */}
              <div className="afu">
                
                {/* QUESTION CARD */}
                <div className="ip-card" style={{ marginBottom: '24px' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                    <span className="badge bo">BEHAVIORAL</span>
                    <span className="badge bgy">EASY</span>
                    <span style={{ marginLeft: 'auto', fontSize: '11px', fontWeight: 700, color: 'var(--t4)' }}>Question {currentIndex + 1} / {questions.length}</span>
                  </div>
                  <h2 style={{ fontSize: '22px', fontWeight: 800, lineHeight: 1.4, color: 'var(--t1)', marginBottom: '16px' }}>
                    "{questions[currentIndex]}"
                  </h2>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px', color: 'var(--t3)', fontWeight: 600 }}>
                    <span className="mat" style={{ fontSize: '18px' }}>lightbulb</span>
                    Use the STAR method — Situation, Task, Action, Result. Aim for 90-120 seconds.
                  </div>
                </div>

                {/* LIVE ANALYSIS CARD */}
                <div className="ip-card" style={{ marginBottom: '24px', minHeight: '380px', position: 'relative' }}>
                  <div className="ip-card-h" style={{ opacity: tier === 'advanced' ? 1 : 0.3 }}>
                    <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--t4)', textTransform: 'uppercase' }}>Live Answer Analysis</h3>
                    <div className="ip-status">
                      <div className="dot-blink"></div>
                      {isAnalyzing ? 'Analyzing...' : 'Ready'}
                    </div>
                  </div>

                  <div className="ip-rings" style={{ opacity: tier === 'advanced' ? 1 : 0.3, filter: tier === 'advanced' ? 'none' : 'blur(8px)' }}>
                    {/* CLARITY */}
                    <div className="ip-ring-i">
                      <div className="ip-ring-w">
                        <svg width="120" height="120">
                          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--s2)" strokeWidth="10" />
                          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--o3)" strokeWidth="10" strokeDasharray="339.29" strokeDashoffset={339.29 * (1 - stats.clarity/100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
                        </svg>
                        <div className="ip-ring-c">
                          <span className="ip-ring-num">{stats.clarity}</span>
                          <span className="ip-ring-pct">%</span>
                        </div>
                      </div>
                      <div className="ip-ring-label">Clarity</div>
                      <div className="ip-ring-sub">Excellent articulation</div>
                    </div>

                    {/* CONFIDENCE */}
                    <div className="ip-ring-i">
                      <div className="ip-ring-w">
                        <svg width="120" height="120">
                          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--s2)" strokeWidth="10" />
                          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--o4)" strokeWidth="10" strokeDasharray="339.29" strokeDashoffset={339.29 * (1 - stats.confidence/100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
                        </svg>
                        <div className="ip-ring-c">
                          <span className="ip-ring-num">{stats.confidence}</span>
                          <span className="ip-ring-pct">%</span>
                        </div>
                      </div>
                      <div className="ip-ring-label">Confidence</div>
                      <div className="ip-ring-sub">Stay steady</div>
                    </div>

                    {/* RELEVANCE */}
                    <div className="ip-ring-i">
                      <div className="ip-ring-w">
                        <svg width="120" height="120">
                          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--s2)" strokeWidth="10" />
                          <circle cx="60" cy="60" r="54" fill="none" stroke="var(--o2)" strokeWidth="10" strokeDasharray="339.29" strokeDashoffset={339.29 * (1 - stats.relevance/100)} strokeLinecap="round" style={{ transition: 'stroke-dashoffset 1s ease' }} />
                        </svg>
                        <div className="ip-ring-c">
                          <span className="ip-ring-num">{stats.relevance}</span>
                          <span className="ip-ring-pct">%</span>
                        </div>
                      </div>
                      <div className="ip-ring-label">Relevance</div>
                      <div className="ip-ring-sub">Strong keywords</div>
                    </div>
                  </div>

                  <div className="ip-star-grid" style={{ opacity: tier === 'advanced' ? 1 : 0.3, filter: tier === 'advanced' ? 'none' : 'blur(8px)' }}>
                    <div className="ip-star-box">
                      <span className="ip-star-l">SITUATION</span>
                      <span className={`ip-star-s ${star.s ? 'present' : 'missing'}`}>
                        <span className="mat">{star.s ? 'check' : 'remove'}</span> {star.s ? 'Present' : 'Missing'}
                      </span>
                    </div>
                    <div className="ip-star-box">
                      <span className="ip-star-l">TASK</span>
                      <span className={`ip-star-s ${star.t ? 'present' : 'missing'}`}>
                        <span className="mat">{star.t ? 'check' : 'remove'}</span> {star.t ? 'Present' : 'Missing'}
                      </span>
                    </div>
                    <div className="ip-star-box">
                      <span className="ip-star-l">ACTION</span>
                      <span className={`ip-star-s ${star.a ? 'present' : 'missing'}`}>
                        <span className="mat">{star.a ? 'check' : 'remove'}</span> {star.a ? 'Present' : 'Missing'}
                      </span>
                    </div>
                    <div className="ip-star-box">
                      <span className="ip-star-l">RESULT</span>
                      <span className={`ip-star-s ${star.r ? 'present' : 'missing'}`}>
                        <span className="mat">{star.r ? 'check' : 'remove'}</span> {star.r ? 'Present' : 'Missing'}
                      </span>
                    </div>
                  </div>

                  {/* LOCK OVERLAY */}
                  {tier !== 'advanced' && (
                    <div className="locked-overlay">
                       <div className="locked-msg afu">
                          <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'var(--o6)', color: 'var(--o3)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                             <span className="mat" style={{ fontSize: '24px' }}>lock</span>
                          </div>
                          <h4>Advanced Mock Interview</h4>
                          <p>Get real-time analysis, STAR tracking, and recruiter-style feedback for your voice and text answers.</p>
                          <button className="btn btn-p" style={{ width: '100%', marginBottom: '8px' }} onClick={() => window.dispatchEvent(new CustomEvent('open-upgrade'))}>
                             Upgrade to Advanced
                          </button>
                       </div>
                    </div>
                  )}
                </div>

                {/* YOUR ANSWER BOX */}
                <div className="ip-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '15px', fontWeight: 900 }}>Your Answer</h3>
                    <div style={{ display: 'flex', background: 'var(--s2)', padding: '4px', borderRadius: '10px' }}>
                      <button 
                        className={`btn ${mode === 'text' ? 'active' : ''}`} 
                        onClick={() => setMode('text')}
                        style={{ padding: '6px 16px', fontSize: '12px', background: mode === 'text' ? 'var(--w)' : 'none', border: 'none', boxShadow: mode === 'text' ? 'var(--sh1)' : 'none', color: mode === 'text' ? 'var(--t1)' : 'var(--t3)', borderRadius: '8px' }}
                      >
                         <span className="mat" style={{ fontSize: '16px', marginRight: '6px' }}>edit_note</span> Text
                      </button>
                      <button 
                        className={`btn ${mode === 'voice' ? 'active' : ''}`} 
                        onClick={() => {
                          if (tier !== 'advanced') {
                            window.dispatchEvent(new CustomEvent('open-upgrade'));
                            return;
                          }
                          setMode('voice');
                        }}
                        style={{ padding: '6px 16px', fontSize: '12px', background: mode === 'voice' ? 'var(--w)' : 'none', border: 'none', boxShadow: mode === 'voice' ? 'var(--sh1)' : 'none', color: mode === 'voice' ? 'var(--t1)' : 'var(--t3)', borderRadius: '8px' }}
                      >
                         <span className="mat" style={{ fontSize: '16px', marginRight: '6px' }}>mic</span> Voice
                      </button>
                    </div>
                  </div>
                  
                  <textarea 
                    className="ip-ans-area"
                    placeholder="Start typing your answer here... Use the STAR method: describe the Situation, your Task, the Action you took, and the Result."
                    value={ans}
                    onChange={(e) => setAns(e.target.value)}
                  />

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '20px' }}>
                    <span style={{ fontSize: '12px', color: 'var(--t4)', fontWeight: 700 }}>{ans.split(/\s+/).filter(Boolean).length} words</span>
                    <div style={{ display: 'flex', gap: '12px' }}>
                      <button className="btn btn-g" style={{ padding: '12px 32px' }}>Skip</button>
                      <button 
                        className="btn btn-p" 
                        style={{ padding: '12px 40px', fontSize: '15px' }} 
                        onClick={handleSubmit}
                        disabled={isAnalyzing || cooldown}
                      >
                        {isAnalyzing ? "Analyzing..." : "Submit Answer"} 
                        <span className="mat" style={{ fontSize: '18px', marginLeft: '8px' }}>{isAnalyzing ? 'sync' : 'arrow_forward'}</span>
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* RIGHT COLUMN: SIDEBAR TOOLS */}
              <div className="afu ip-side-sec" style={{ animationDelay: '100ms' }}>
                
                {/* SESSION STATS */}
                <div className="ip-card">
                  <h3 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--t4)', textTransform: 'uppercase', marginBottom: '16px' }}>Session Stats</h3>
                  <div className="ip-stat-grid">
                    <div className="ip-stat-i">
                      <h4>{currentIndex}</h4>
                      <span>Done</span>
                    </div>
                    <div className="ip-stat-i">
                      <h4 style={{ color: 'var(--o3)' }}>{Math.round(stats.clarity/3 + stats.confidence/3 + stats.relevance/3) || '--'}</h4>
                      <span>Avg Score</span>
                    </div>
                    <div className="ip-stat-i">
                      <h4>{questions.length - currentIndex}</h4>
                      <span>Left</span>
                    </div>
                  </div>
                </div>

                {/* AI COACHING HINT */}
                <div className="ip-card" style={{ background: 'var(--o7)', border: '1.5px dashed var(--o5)' }}>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                     <span className="mat" style={{ color: 'var(--o3)' }}>tips_and_updates</span>
                     <h3 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--o2)', textTransform: 'uppercase' }}>AI Coaching Hint</h3>
                  </div>
                  <p style={{ fontSize: '13px', color: 'var(--t2)', lineHeight: 1.6, fontWeight: 600 }}>
                    "Your answer needs a concrete Result. Quantify the outcome — did adoption increase? Did the stakeholder change their stance? A number here could lift your score by 12+ points."
                  </p>
                </div>

                {/* KEYWORDS TO INCLUDE */}
                <div className="ip-card">
                  <h3 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--t4)', textTransform: 'uppercase', marginBottom: '12px' }}>Keywords to Include</h3>
                  <div className="kw-tags">
                    <div className="kw-tag v"><span className="mat" style={{ fontSize: '14px' }}>check</span> stakeholder</div>
                    <div className="kw-tag v"><span className="mat" style={{ fontSize: '14px' }}>check</span> data-driven</div>
                    <div className="kw-tag v"><span className="mat" style={{ fontSize: '14px' }}>check</span> alignment</div>
                    <div className="kw-tag o">+ outcome</div>
                    <div className="kw-tag o">+ impact</div>
                    <div className="kw-tag o">+ metrics</div>
                    <div className="kw-tag o">trade-off</div>
                    <div className="kw-tag o">consensus</div>
                  </div>
                  <div style={{ marginTop: '16px', fontSize: '11px', color: 'var(--t3)', fontWeight: 700 }}>
                    <span style={{ color: 'var(--green)' }}>3 matched</span> · 3 suggested · 2 optional
                  </div>
                </div>

                {/* FILLER WORD TRACKER */}
                <div className="ip-card" style={{ position: 'relative' }}>
                  {tier !== 'advanced' && (
                    <div className="locked-overlay" style={{ background: 'rgba(255,255,255,0.4)', borderRadius: '24px' }}>
                      <button className="btn btn-p btn-sm" onClick={() => window.dispatchEvent(new CustomEvent('open-upgrade'))}>Unlock</button>
                    </div>
                  )}
                  <h3 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--t4)', textTransform: 'uppercase', marginBottom: '8px' }}>Filler Word Tracker</h3>
                  <div className="filler-row"><span>"um"</span> <span style={{ opacity: 0.3 }}>0x</span></div>
                  <div className="filler-row"><span>"like"</span> <span style={{ opacity: 0.3 }}>0x</span></div>
                  <div className="filler-row"><span>"you know"</span> <span style={{ opacity: 0.3 }}>0x</span></div>
                  <div className="filler-row"><span>"basically"</span> <span style={{ opacity: 0.3 }}>0x</span></div>
                  <p style={{ fontSize: '10px', color: 'var(--t3)', marginTop: '12px', fontWeight: 600 }}>Reduce filler words to boost Confidence score</p>
                </div>

                {/* PREVIOUS ANSWERS */}
                <div className="ip-card">
                  <h3 style={{ fontSize: '11px', fontWeight: 800, color: 'var(--t4)', textTransform: 'uppercase', marginBottom: '12px' }}>Previous Sessions</h3>
                  {sessionHistory.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {sessionHistory.map((s, i) => (
                        <div key={i} style={{ padding: '10px', background: 'var(--sf)', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: '12px', fontWeight: 800 }}>ID #{s.id.toString().substring(0, 4)}</span>
                          <span style={{ fontSize: '12px', fontWeight: 900, color: 'var(--o2)' }}>{s.score}%</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div style={{ textAlign: 'center', padding: '20px 0', opacity: 0.5, fontSize: '12px', fontWeight: 600 }}>
                      No sessions recorded yet.
                    </div>
                  )}
                  <button className="btn btn-g btn-sm" style={{ width: '100%', marginTop: '12px' }} onClick={handleEndSession}>End Session Early</button>
                </div>

              </div>

            </div>
          </div>

          {/* SESSION COMPLETION REPORT MODAL */}
          {showReport && (
            <div className="modal-overlay adu" style={{ padding: '40px' }}>
               <div className="modal-card afu" style={{ maxWidth: '900px', width: '100%', padding: '0', overflow: 'hidden' }}>
                  <div style={{ background: 'var(--o1)', color: 'white', padding: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div>
                        <span className="badge bo" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.3)', marginBottom: '12px' }}>SESSION COMPLETE</span>
                        <h2 style={{ fontSize: '32px', fontWeight: 900 }}>Excellent Progress, Charan! 🚀</h2>
                        <p style={{ opacity: 0.8, fontWeight: 600, marginTop: '8px' }}>Your behavioral session score is in the top 12% of applicants.</p>
                     </div>
                     <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '48px', fontWeight: 900 }}>82<span style={{ fontSize: '24px', opacity: 0.7 }}>/100</span></div>
                        <div style={{ fontSize: '14px', fontWeight: 800, opacity: 0.8 }}>OVERALL SCORE</div>
                     </div>
                  </div>

                  <div style={{ padding: '40px' }}>
                     <div className="dash-grid-2">
                        <div>
                           <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '24px' }}>Skill Breakdown</h3>
                           <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                              {[
                                 { label: 'Technical Accuracy', val: 92, color: 'var(--green)' },
                                 { label: 'Strategic Thinking', val: 78, color: 'var(--o3)' },
                                 { label: 'Communication', val: 84, color: 'var(--blue)' },
                                 { label: 'STAR Structure', val: 68, color: 'var(--purple)' },
                              ].map(s => (
                                 <div key={s.label}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px', fontWeight: 700 }}>
                                       <span>{s.label}</span>
                                       <span>{s.val}%</span>
                                    </div>
                                    <div style={{ height: '8px', background: 'var(--s2)', borderRadius: '99px' }}>
                                       <div style={{ height: '100%', width: `${s.val}%`, background: s.color, borderRadius: '99px' }}></div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </div>

                        <div style={{ background: 'var(--sf)', padding: '32px', borderRadius: '24px', border: '1.5px solid var(--border)' }}>
                           <h3 style={{ fontSize: '16px', fontWeight: 800, marginBottom: '16px' }}>AI Coaching Insights</h3>
                           <div className="dash-time">
                              <div className="dash-time-i">
                                 <div className="dash-time-dot green"></div>
                                 <div className="dash-time-c">
                                    <p style={{ fontWeight: 800 }}>Strong Technical Foundation</p>
                                    <span style={{ fontSize: '13px', opacity: 0.7 }}>You articulated complex edge cases perfectly in Q2.</span>
                                 </div>
                              </div>
                              <div className="dash-time-i">
                                 <div className="dash-time-dot"></div>
                                 <div className="dash-time-c">
                                    <p style={{ fontWeight: 800 }}>Improve Result Quantification</p>
                                    <span style={{ fontSize: '13px', opacity: 0.7 }}>Try to use more numbers (ROI, %, Time saved) in your results.</span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>

                     <div style={{ marginTop: '40px', display: 'flex', gap: '16px' }}>
                        <button className="btn btn-p" style={{ flex: 1, padding: '16px' }} onClick={() => setShowReport(false)}>
                           Continue to Dashboard
                        </button>
                        <button className="btn btn-s" style={{ flex: 1, padding: '16px' }} onClick={() => window.print()}>
                           Download PDF Report
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          )}

        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
