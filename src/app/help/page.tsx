'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useUser } from '@/context/AuthContext';
import { createClient } from '@/utils/supabase/client';

export default function HelpPage() {
  const { user } = useUser();
  const supabase = createClient();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTickets = async () => {
      if (user) {
        const { data } = await supabase.from('support_requests').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
        if (data) setTickets(data);
        setLoading(false);
      }
    };
    fetchTickets();
  }, [user, supabase]);

  const showToast = (type: string, msg: string) => {
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type, msg } }));
  };

  const submitTicket = async (e: any) => {
    e.preventDefault();
    if (!user) return;
    
    const formData = new FormData(e.target);
    const { error } = await supabase.from('support_requests').insert({
      user_id: user.id,
      subject: formData.get('subject'),
      message: formData.get('message'),
      status: 'pending'
    });

    if (!error) {
      showToast('success', 'Support ticket submitted!');
      e.target.reset();
      // Refetch
      const { data } = await supabase.from('support_requests').select('*').eq('user_id', user.id).order('created_at', { ascending: false });
      if (data) setTickets(data);
    }
  };

  const faqs = [
    { q: 'How does the AI Match Score work?', a: 'Our algorithm analyzes 42+ distinct parameters from both your resume and the job description, using semantic search to determine true capability match beyond simple keywords.' },
    { q: 'Can I use Hirely for multiple resumes?', a: 'Yes! Pro and Advanced users can upload unlimited resumes and maintain separate analysis histories for different career targets.' },
    { q: 'How do I cancel my subscription?', a: 'You can manage or cancel your subscription anytime via the Settings > Billing section. Your pro features will remain active until the end of your billing cycle.' }
  ];

  return (
    <div className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '32px 48px', background: 'var(--surface)' }}>
          <div className="pg-hdr">
            <h1 style={{ fontSize: '32px', fontWeight: 900, color: 'var(--t1)' }}>Help Center</h1>
            <p style={{ color: 'var(--t3)', fontWeight: 600 }}>Get answers and professional support for your career journey.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.8fr) 1.2fr', gap: '32px', marginTop: '32px' }}>
            {/* Left: FAQ & Ticket Form */}
            <div>
              <div className="card" style={{ padding: '32px', marginBottom: '32px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 800, marginBottom: '24px' }}>Frequently Asked Questions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {faqs.map((f, i) => (
                    <div key={i} style={{ paddingBottom: '20px', borderBottom: i === faqs.length - 1 ? 'none' : '1px solid var(--bd)' }}>
                      <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--t1)', marginBottom: '8px' }}>{f.q}</div>
                      <div style={{ fontSize: '14px', color: 'var(--t3)', lineHeight: 1.6 }}>{f.a}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="card afu" style={{ padding: '32px' }}>
                <h2 style={{ fontSize: '20px', fontWeight: 900, marginBottom: '24px' }}>Submit a Support Ticket</h2>
                <form onSubmit={submitTicket}>
                  <div style={{ marginBottom: '20px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: 'var(--t3)', marginBottom: '8px', textTransform: 'uppercase' }}>Subject</label>
                    <input name="subject" required className="afi-input" placeholder="How can we help?" style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1.5px solid var(--bd)', background: 'var(--sf)', fontSize: '15px' }} />
                  </div>
                  <div style={{ marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '13px', fontWeight: 800, color: 'var(--t3)', marginBottom: '8px', textTransform: 'uppercase' }}>Message</label>
                    <textarea name="message" required className="afi-input" rows={5} placeholder="Describe your issue in detail..." style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1.5px solid var(--bd)', background: 'var(--sf)', fontSize: '15px', resize: 'none' }} />
                  </div>
                  <button type="submit" className="btn btn-p" style={{ width: '100%', padding: '16px' }}>Send Request</button>
                </form>
              </div>
            </div>

            {/* Right: My Tickets */}
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: 900, marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span className="mat" style={{ color: 'var(--o1)' }}>history</span> My Tickets
              </h3>
              {loading ? (
                <div className="sk" style={{ height: '200px' }}></div>
              ) : tickets.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {tickets.map(t => (
                    <div key={t.id} className="card afu" style={{ padding: '16px', background: 'var(--w)', borderLeft: t.status === 'resolved' ? '4px solid var(--gn)' : '4px solid var(--o3)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <div style={{ fontSize: '14px', fontWeight: 800 }}>{t.subject}</div>
                        <div style={{ textTransform: 'uppercase', fontSize: '10px', fontWeight: 900, color: t.status === 'resolved' ? 'var(--green)' : 'var(--o2)' }}>{t.status}</div>
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--t4)', fontWeight: 600 }}>Created on {new Date(t.created_at).toLocaleDateString()}</div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="card afu" style={{ padding: '32px', textAlign: 'center', opacity: 0.6 }}>
                  <span className="mat" style={{ fontSize: '32px', color: 'var(--s3)', marginBottom: '12px' }}>mark_email_read</span>
                  <p style={{ fontSize: '14px', fontWeight: 700 }}>No active support requests.</p>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
