'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';
import MobileBottomNav from '@/components/layout/MobileBottomNav';
import { useSubscription } from '@/hooks/useSubscription';

export default function CoverLetterGenerator() {
  const router = useRouter();
  const { tier } = useSubscription();

  const [jd, setJd] = useState('');
  const [resume, setResume] = useState('Senior Product Manager with 8+ years of experience leading cross-functional teams at Google and Amazon. Expert in user-centric design, A/B testing, and scaling cloud-native SaaS products.');
  const [tone, setTone] = useState<'professional' | 'creative' | 'bold' | 'minimal'>('professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedLetter, setGeneratedLetter] = useState('');
  const [editMode, setEditMode] = useState(false);

  const [variation, setVariation] = useState(0);

  const generateLetter = () => {
    if (!jd.trim()) {
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'warning', msg: 'Please paste a Job Description first.' } }));
      return;
    }
    
    setIsGenerating(true);
    
    // Simulate AI generation with tone-specific variants
    setTimeout(() => {
      const templates = {
        professional: [
          `Dear Hiring Manager,

I am writing to express my strong interest in the [Position Name] role at [Company Name]. With over 8 years of experience in product management at industry leaders like Google and Amazon, I have consistently delivered high-impact features that reached millions of users globally. 

My approach is rooted in data-driven decision-making and rigorous A/B testing, ensuring that every product iteration delivers maximum value to the customer. I am particularly impressed by [Company Name]'s recent innovations in [Specific Area], and I am eager to bring my expertise in scaling cloud-native SaaS products and user-centric design to help drive your next phase of growth.

Thank you for your time and consideration. I look forward to the possibility of discussing how my skills and experience can contribute to the continued success of [Company Name].

Sincerely,
Charan`,
          `To the Hiring Team at [Company Name],

Regarding the [Position Name] opening, I am eager to offer my 8+ years of product leadership experience from Google and Amazon. My career has been defined by a deep commitment to user-centricity and a proven track record in scaling global SaaS platforms.

In my previous roles, I have lead cross-functional teams through complex product lifecycles, consistently achieving significant growth through strategic A/B testing and infrastructure optimization. I am highly motivated by [Company Name]’s mission and would appreciate the opportunity to discuss how my technical background and strategic mindset can exceed your expectations for this role.

Sincerely,
Charan`,
          `Dear [Hiring Manager Name],

I am submitting my application for the [Position Name] role with great enthusiasm. Having spent nearly a decade at the forefront of product innovation at Google and Amazon, I have developed a sophisticated understanding of how to bridge the gap between complex engineering and user delight.

My core competence lies in driving product strategy from conception to global scale, with a heavy emphasis on ROI-focused roadmapping. I have long admired [Company Name]'s commitment to [Specific Value], and I am confident that my experience in managing high-velocity teams will be a valuable asset to your organization.

Sincerely,
Charan`,
          `To the Recruitment Team at [Company Name],

I am writing to express my interest in the [Position Name] position. With a robust background in scaling multi-million user products at Google and Amazon, I bring a unique blend of technical expertise and strategic vision.

My methodology involves a deep dive into user metrics to identify growth opportunities and streamline product efficiency. I've followed [Company Name]’s trajectory in the [Specific Area] market and believe my expertise in user-centric scaling is the perfect match for your upcoming initiatives.

Best regards,
Charan`,
          `Dear Hiring Manager,

With 8+ years of experience leading cross-functional teams in the tech industry, I am writing to apply for the [Position Name] role. My time at Google and Amazon has equipped me with the skills to handle large-scale product deployments and foster a culture of excellence.

I specialize in aligning product goals with organizational objectives to ensure sustainable growth. I am particularly interested in how [Company Name] is tackling [Specific Problem], and I look forward to discussing how my experience can help accelerate your solutions.

Sincerely,
Charan`,
          `To the Hiring Committee,

I am a seasoned Product Manager with a decade of experience at Google and Amazon, and I am excited to apply for the [Position Name] role. My career has been focused on delivering cloud-native SaaS solutions that define market standards.

I pride myself on my ability to translate complex stakeholder requirements into actionable product roadmaps. [Company Name] stands out as a leader in [Specific Area], and I am eager to leverage my background in A/B testing and user research to contribute to your continued success.

Respectfully,
Charan`,
          `Dear [Contact Person],

I am applying for the [Position Name] position at [Company Name]. My experience at Google and Amazon has provided me with a rigorous foundation in data-driven product management and international scale operations.

I have a proven record of leading teams that exceed performance benchmarks and user satisfaction scores. I am impressed by [Company Name]’s rapid growth and would welcome the chance to apply my expertise in scaling infrastructure to your next generation of products.

Sincerely,
Charan`,
          `To the Product Leadership at [Company Name],

I am writing to share my credentials for the [Position Name] role. Having spent 8+ years navigating the high-stakes environments of Google and Amazon, I have mastered the art of delivering high-quality products under tight deadlines.

My focus is always on creating intuitive user experiences that are backed by robust backend logic. I am eager to contribute to [Company Name]'s vision for [Specific Goal] by applying my deep knowledge of SaaS lifecycle management.

Kind regards,
Charan`,
          `Dear Hiring Manager,

Please accept this letter as a formal expression of interest in the [Position Name] role. My background includes significant stints at Google and Amazon, where I spearheaded the development of core features for world-class products.

I am a firm believer in the power of user-centric design to drive business outcomes. [Company Name]'s approach to [Specific Feature or Value] aligns with my professional philosophy, and I am confident I can help scale your offerings to new heights.

Sincerely,
Charan`,
          `To the Hiring Team,

I am writing to apply for the [Position Name] role at [Company Name]. With over 8 years in product leadership at Google and Amazon, I have a deep understanding of the challenges associated with rapid digital transformation.

In my previous roles, I have optimized team workflows to increase output by 40% while maintaining a 98% user satisfaction rate. I am excited about the opportunity to bring this level of efficiency to [Company Name]'s innovative product suite.

Best regards,
Charan`
        ],

        creative: [
          `To the team at [Company Name],

If you're looking for someone who lives at the intersection of "wildly ambitious" and "meticulously data-driven," you've found your next Product Manager. From my time scaling products at Google to optimizing user flows at Amazon, I've learned that the best products don't just solve problems—they tell a story.

I've been following [Company Name]'s journey for a while, and your latest work in [Specific Area] genuinely caught my eye. I don't just want to build products; I want to build the future of [Industry] with a team that isn't afraid to break things and rebuild them better. Let's create something people haven't even dreamed of yet.

Best,
Charan`,
          `Hey there, Hiring Team at [Company Name]!

You're building something incredible in the [Specific Area] space, and I want in. Why? Because I don't just build features—I build ecosystems. With a background forged at tech giants like Google and Amazon, I've mastered the art of high-impact product delivery while keeping the human element front and center.

I'm the Product Manager who isn't afraid to dive into the deep end of data but comes up for air with a creative spark that changes the game. Let's talk about how we can take [Company Name]’s vision to the next level with a mix of technical grit and visionary thinking.

Cheers,
Charan`,
          `To the Dreamers and Builders at [Company Name],

I’ve always believed that a product is only as strong as the curiosity that built it. After 8 years of navigating the complex landscapes of Google and Amazon, my curiosity has only grown. I’m applying for the [Position Name] role because I see a mirror of that same restless innovation in what you’re doing with [Specific Project].

I don’t just manage roadmaps; I curate experiences. My passion lies in finding the "magic" in the data and using it to build products that feel more like companions than tools. Let’s collaborate and write the next chapter of [Industry] history together.

With energy,
Charan`,
          `To the Team at [Company Name],

What if your next Product Manager looked at your JD and didn't see a list of tasks, but a canvas for global impact? That’s me. Having cut my teeth at Google and Amazon, I’ve learned that scale isn’t just a number—it’s a mindset.

I’m drawn to [Company Name] because you aren't just following the market; you're challenging it. I want to bring my background in high-velocity SaaS and user-centric design to your team to help turn your boldest ideas into a tangible, multi-million user reality.

Let’s build something bold,
Charan`,
          `Hello [Company Name]!

In a world full of "good enough" products, I'm here to build the exceptional. My 8-year journey through Google and Amazon has taught me that the secret to a great product isn't just the code—it's the empathy behind the execution.

I’m applying for the [Position Name] role because I’m ready to trade the comfort of big tech for the thrill of your mission. I want to take the lessons I've learned about massive scale and apply them to the agility and innovation I see in [Company Name]. Let’s make something beautiful and functional.

Excitedly,
Charan`,
          `To the Innovators at [Company Name],

I believe the best products are those that solve problems users haven't even articulated yet. That’s the mindset I’ve cultivated over 8 years at Google and Amazon. Now, I’m looking to bring that "future-first" perspective to the [Position Name] role at [Company Name].

I’ve admired your work in [Specific Area] from afar, and I’m ready to jump in and help you refine your vision. I’m a high-impact strategist who loves the messy stage of creation just as much as the polished stage of deployment. Let’s get to work.

Best,
Charan`,
          `To the Hiring Team,

Imagine a Product Manager who treats every A/B test like a scientific experiment and every user journey like a cinematic experience. That’s who I am. My tenure at Google and Amazon has given me the tools to build big, but my heart is in building things that matter.

I see [Company Name] as the place where I can truly let my creative and technical sides merge. I’m eager to discuss how my experience in [Specific Skill] can help you bridge the gap between "good" and "indispensable" for your users.

With passion,
Charan`,
          `Dear [Company Name],

I don’t want to just fill a position; I want to become a core part of the engine that drives your innovation. Having led teams at Google and Amazon, I’ve seen what happens when you combine massive scale with a deep-seated passion for the user.

Your latest updates to [Product Name] felt like they came from a team that truly cares. I want to join that team and bring my expertise in SaaS scaling and product strategy to the table. Let’s discuss how we can make the [Position Name] role a launchpad for your next big win.

Cheers,
Charan`,
          `To the team at [Company Name],

I’ve spent the last 8 years at Google and Amazon learning how to build products that change habits. Now, I want to use those same skills to build products that change the world—and I believe [Company Name] is where that happens.

Your work in [Specific Area] isn’t just impressive; it’s inspiring. I’m applying for the [Position Name] role because I want to be part of a team that values creativity just as much as it values growth. I’m ready to bring my A-game to your roadmapping and execution.

Onward,
Charan`,
          `Hello Team [Company Name],

If you need a PM who can talk to engineers in code and to users in stories, let’s talk. My background at Google and Amazon has made me a "bilingual" product leader who knows how to translate high-level strategy into ground-level impact.

I’m particularly obsessed with the way [Company Name] is handled [Specific Challenge]. I have a few ideas on how we could take that even further using [Specific Methodology]. I’d love to explore this further with your team.

Warmly,
Charan`
        ],

        bold: [
          `Let's cut to the chase.

[Company Name] is solving big problems in [Specific Area], and I have the direct experience scaling SaaS products at Google and Amazon to help you solve them faster. I don't just manage products—I drive growth, lead cross-functional teams, and turn complex data into actionable strategies that move the needle.

In my previous roles, I didn't just meet KPIs; I redefined them. I'm ready to bring that same high-velocity, results-first mindset to the [Position Name] role. If you want a Product Manager who delivers without excuses, we should talk.

Regards,
Charan`,
          `I don't just ship code; I ship ROI.

With 8 years of high-stakes product management at Google and Amazon, I specialize in one thing: results. I'm looking for a challenge at [Company Name] where my expertise in cloud-native SaaS and user-centric scaling can make an immediate, multi-million user impact.

If you are looking for a [Position Name] who can sit at the helm of your strategy and navigate through any complexity to reach the target, I am your candidate. I’m ready to start today.

Best,
Charan`,
          `I’m not here to join your team; I’m here to help you dominate your market.

With a background at Google and Amazon, I have mastered the art of winning. I’ve seen what it takes to build products that crush the competition and delight users at a massive scale. I want to bring that same "win-at-all-costs" mentality to the [Position Name] role at [Company Name].

My strategy is simple: hypothesize, test, scale, repeat—until we are the only names in the market. If you want a Product Manager who plays to win, I’m your only choice.

Regards,
Charan`,
          `Dear [Company Name],

Your current growth in [Specific Area] is impressive, but I know how to make it explosive. Using my 8+ years of experience from Google and Amazon, I know exactly where the friction points are in scaling a global SaaS product.

I’m applying for the [Position Name] role because I’m ready to take the reins and drive your KPIs into the stratosphere. I don’t believe in "trying"; I believe in "delivering." Let’s discuss how I can get started on your Q4 goals today.

Best,
Charan`,
          `Stop looking for a "good" candidate. I’m the best one.

My tenure at Google and Amazon wasn’t just about putting in the time; it was about leading the pack. I’ve built features that users didn't know they needed and drove efficiencies that saved millions. I am ready to bring that level of high-performance leadership to [Company Name].

I have the technical grit, the strategic vision, and the track record to prove it. For the [Position Name] role, you don't need another manager—you need a driver. That’s me.

Sincerely,
Charan`,
          `To the team at [Company Name],

Let’s talk about your [Specific Metric]. I’ve looked at your current product trajectory and I see exactly where we can double it. My 8 years at Google and Amazon have turned me into a specialist in finding and exploiting growth levers.

I’m applying for the [Position Name] role because I want to give your team the edge they need to outpace [Competitor]. I move fast, I think deep, and I deliver. If that’s the kind of energy you need, let’s sit down.

Regards,
Charan`,
          `I am built for this role.

8 years at Google and Amazon hasn't just taught me PM skills; it's forged me into a market-ready leader who knows how to scale under pressure. I see [Company Name] as the next logical step to prove that I can drive transformative growth in any environment.

I’m ready to take full ownership of the [Position Name] roadmap and turn it into a blueprint for success. I don't wait for permission; I wait for the data. Let’s get moving.

Best,
Charan`,
          `I don't follow roadmaps; I define them.

Having led some of the most critical product initiatives at Google and Amazon, I have a deep-seated intuition for what works and what doesn't. I want to bring that clarity of vision to [Company Name] as your next [Position Name].

I specialize in high-velocity delivery and ruthless prioritization. I’m the candidate who will tell you what you need to hear, not what you want to hear, to ensure your product wins.

Sincerely,
Charan`,
          `Hire me for the results, stay for the growth.

My career at Google and Amazon has been defined by one thing: significant, measurable impact. I am ready to bring that same level of accountability to the [Position Name] role at [Company Name].

I have a zero-fluff approach to product management. I look at the data, I listen to the user, and I build for scale. If you are serious about taking [Company Name] to the next level, I am the partner you need.

Best regards,
Charan`,
          `To the Hiring Team,

I see the potential of [Company Name] and I know exactly how to unlock it. With my 8 years at Google and Amazon, I’ve learned that the difference between a good product and a global leader is the quality of its leadership.

I am applying for the [Position Name] role because I want to be that leader for you. I am ready to overhaul your product strategy, lead your teams to new heights, and ensure that [Company Name] is the name everyone is talking about next year.

Let’s do this,
Charan`
        ],

        minimal: [
          `Dear Hiring Manager,

I am highly interested in the [Position Name] role at [Company Name].

Key Highlights:
• 8+ years of PM experience at Google & Amazon.
• Expert in scaling cloud-native SaaS and A/B testing.
• Proven track record in user-centric design and ROI-focused roadmapping.

I admire [Company Name]'s focus on [Specific Area] and believe my background aligns perfectly with your current goals. I’d love to briefly discuss how I can help your team scale.

Sincerely,
Charan`,
          `To [Company Name] HR,

I am writing to apply for the [Position Name] position.

With a background at Google and Amazon, I bring 8+ years of expertise in product management, user-centric scaling, and cross-functional leadership. I am deeply impressed by your work in [Specific Area] and am confident I can contribute to your team's success immediately.

Sincerely,
Charan`,
          `Dear Hiring Manager,

I’m a seasoned Product Manager (Google, Amazon) interested in the [Position Name] role at [Company Name].

Expertise:
- Global SaaS scaling
- ROI-driven roadmaps
- Cross-functional leadership

Your work in [Specific Area] is world-class. I'd love to contribute.

Best,
Charan`,
          `To the Team at [Company Name],

I am applying for the [Position Name] role. 

Summary: 8 years of PM experience at Google/Amazon. Specialist in A/B testing and user-centric design. Ready to help scale [Company Name] to its next multi-million user milestone.

Sincerely,
Charan`,
          `Hello,

Regarding the [Position Name] opening: I offer 8+ years of product leadership from Google and Amazon. My focus is on data-driven growth and user delight at scale. Highly interested in [Company Name]'s mission.

Sincerely,
Charan`,
          `Dear Hiring Team,

Please consider my application for [Position Name]. 

Background:
- 8 years at Google & Amazon
- Expert in SaaS lifecycle & strategy
- Proven results in user growth

Eager to bring this experience to [Company Name].

Sincerely,
Charan`,
          `To Whom It May Concern,

I am interested in the [Position Name] role at [Company Name]. With a background in leading product teams at Google and Amazon, I have the skills to drive high-impact results for your organization.

Best,
Charan`,
          `Dear Hiring Manager,

Applying for [Position Name]. 

Experience: 8 years (Google, Amazon). 
Skills: SaaS Scaling, Data Analysis, Roadmapping.
Goal: To help [Company Name] dominate the [Specific Area] market.

Sincerely,
Charan`,
          `To the Hiring Team,

I am a former Google/Amazon Product Manager interested in your [Position Name] role. I specialize in scaling complex products and leading talented teams. Looking forward to discussing how I can help [Company Name] grow.

Best regards,
Charan`,
          `Dear [Company Name],

Seeking the [Position Name] role. 

Quick facts: 8 years in PM leadership at Google/Amazon. Expert in user-centric scaling and growth operations. Eager to join your innovative team.

Sincerely,
Charan`
        ]
      };
      
      const currentVariants = templates[tone];
      const nextIdx = (variation + 1) % currentVariants.length;
      setGeneratedLetter(currentVariants[variation]);
      setVariation(nextIdx);
      
      setIsGenerating(false);
      window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: `Drafted variation #${variation + 1} (${tone.toUpperCase()})!` } }));
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLetter);
    window.dispatchEvent(new CustomEvent('show-toast', { detail: { type: 'success', msg: 'Copied to clipboard!' } }));
  };

  return (
    <div id="page-cover-letter" className="afi">
      <Navbar />
      <div className="app-shell">
        <Sidebar />
        <main className="main" style={{ padding: '0', background: 'var(--surface)' }}>
          
          <div className="ip-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <h1 style={{ fontSize: '20px', fontWeight: 900 }}>Cover Letter Generator ✍️</h1>
              <span className="badge bo" style={{ fontSize: '10px' }}>AI-POWERED</span>
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
               <button className="btn btn-s btn-sm" onClick={() => setGeneratedLetter('')}>Clear All</button>
            </div>
          </div>

          <div style={{ padding: '0 40px 40px' }}>
            <div className="ip-grid">
              
              {/* LEFT COLUMN: INPUTS */}
              <div className="afu">
                <div className="ip-card" style={{ marginBottom: '24px' }}>
                  <div className="dash-card-h">
                     <h3 style={{ fontSize: '15px', fontWeight: 900 }}>Job Details</h3>
                  </div>
                  <div className="ab-inp-w" style={{ marginTop: '16px' }}>
                    <label className="ab-inp-l">Job Description (JD)</label>
                    <textarea 
                      className="ab-area" 
                      placeholder="Paste the job description here..."
                      value={jd}
                      onChange={(e) => setJd(e.target.value)}
                      style={{ minHeight: '180px', fontSize: '14px' }}
                    />
                  </div>

                  <div className="ab-inp-w" style={{ marginTop: '20px' }}>
                    <label className="ab-inp-l">Select Resume Version</label>
                    <select className="ab-input" style={{ appearance: 'none', background: 'var(--sf) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'currentColor\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'%3E%3Cpath d=\'m6 9 6 6 6-6\'/%3E%3C/svg%3E") no-repeat right 12px center' }}>
                      <option>Senior PM v.4 (Default)</option>
                      <option>Product Lead v.2</option>
                      <option>Strategy Consultant v.1</option>
                    </select>
                  </div>
                </div>

                <div className="ip-card">
                  <div className="dash-card-h">
                     <h3 style={{ fontSize: '15px', fontWeight: 900 }}>Tone & Personalization</h3>
                  </div>
                  <div className="ftabs" style={{ marginTop: '16px', marginBottom: '0', width: '100%' }}>
                    <button className={`ftab ${tone === 'professional' ? 'active' : ''}`} onClick={() => setTone('professional')} style={{ flex: 1 }}>Professional</button>
                    <button className={`ftab ${tone === 'creative' ? 'active' : ''}`} onClick={() => setTone('creative')} style={{ flex: 1 }}>Creative</button>
                    <button className={`ftab ${tone === 'bold' ? 'active' : ''}`} onClick={() => setTone('bold')} style={{ flex: 1 }}>Bold</button>
                    <button className={`ftab ${tone === 'minimal' ? 'active' : ''}`} onClick={() => setTone('minimal')} style={{ flex: 1 }}>Minimal</button>
                  </div>
                  
                  <div style={{ marginTop: '24px' }}>
                    <button 
                      className="btn btn-p btn-lg" 
                      style={{ width: '100%', padding: '16px' }}
                      onClick={generateLetter}
                      disabled={isGenerating}
                    >
                      {isGenerating ? (
                        <><span className="mat" style={{ animation: 'spin 1.5s linear infinite', marginRight: '10px' }}>sync</span> Drafting Letter...</>
                      ) : (
                        <><span className="mat" style={{ marginRight: '10px' }}>auto_awesome</span> Generate Cover Letter</>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: PREVIEW */}
              <div className="afu">
                <div className="ip-card" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
                  <div className="dash-card-h">
                     <h3 style={{ fontSize: '15px', fontWeight: 900 }}>Preview</h3>
                     {generatedLetter && (
                       <div style={{ display: 'flex', gap: '8px' }}>
                          <button 
                            className="btn btn-s btn-sm" 
                            onClick={generateLetter} 
                            disabled={isGenerating}
                            title="Regenerate Variation"
                          >
                            <span className="mat" style={{ fontSize: '16px', animation: isGenerating ? 'spin 1.5s linear infinite' : 'none' }}>refresh</span>
                          </button>
                          <button className="btn btn-s btn-sm" onClick={() => setEditMode(!editMode)}>
                            <span className="mat" style={{ fontSize: '16px' }}>{editMode ? 'visibility' : 'edit'}</span>
                          </button>
                          <button className="btn btn-s btn-sm" onClick={copyToClipboard}>
                            <span className="mat" style={{ fontSize: '16px' }}>content_copy</span>
                          </button>
                       </div>
                     )}
                  </div>

                  {!generatedLetter ? (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', opacity: 0.5 }} className="no-print">
                      <span className="mat" style={{ fontSize: '48px', marginBottom: '16px' }}>description</span>
                      <p style={{ maxWidth: '240px', fontSize: '14px', fontWeight: 600 }}>Your AI-generated cover letter will appear here.</p>
                    </div>
                  ) : (
                    <div style={{ flex: 1, marginTop: '20px' }}>
                      <div className="print-only" style={{ display: 'none', marginBottom: '40px' }}>
                        <h1 style={{ color: 'var(--o1)', fontSize: '24px', marginBottom: '8px' }}>Hirely AI — Professional Cover Letter</h1>
                        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', marginBottom: '32px' }} />
                      </div>
                      {editMode ? (
                        <textarea 
                          className="ip-ans-area no-print"
                          value={generatedLetter}
                          onChange={(e) => setGeneratedLetter(e.target.value)}
                          style={{ width: '100%', height: '480px', border: 'none', background: 'var(--sf)', padding: '20px', borderRadius: '16px', fontSize: '14px', lineHeight: 1.6, resize: 'none' }}
                        />
                      ) : (
                        <div style={{ whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: 1.7, color: 'var(--t1)', padding: '10px' }}>
                          {generatedLetter}
                        </div>
                      )}
                    </div>
                  )}

                  {generatedLetter && (
                    <div style={{ marginTop: '24px', paddingTop: '24px', borderTop: '1px solid var(--border)' }} className="no-print">
                       <button className="btn btn-p" style={{ width: '100%' }} onClick={() => window.print()}>
                         Download as PDF
                       </button>
                    </div>
                  )}
                </div>

                {/* HELP BLOCK */}
                <div className="ip-card" style={{ marginTop: '24px', background: 'var(--o7)', border: '1.5px dashed var(--o5)' }}>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                    <span className="mat" style={{ color: 'var(--o3)', fontSize: '18px' }}>lightbulb</span>
                    <h4 style={{ fontSize: '12px', fontWeight: 800, color: 'var(--o2)' }}>PRO TIP</h4>
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--t2)', lineHeight: 1.5, fontWeight: 600 }}>
                    Our AI cross-references your resume v.4 with the JD keywords to ensure high ATS relevance.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </main>
      </div>
      <MobileBottomNav />
    </div>
  );
}
