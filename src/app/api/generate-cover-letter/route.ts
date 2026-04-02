import { NextRequest, NextResponse } from "next/server";

function extractYears(resume: string) {
  const match = resume.match(/(\d+)\+?\s+years/i);
  return match ? match[1] : "several";
}

function extractSkills(resume: string) {
  const allSkills = [
    "React","Next.js","Node.js","Python","SQL",
    "Product Management","A/B Testing","AWS",
    "Docker","TypeScript","Analytics"
  ];

  const matched = allSkills.filter(skill =>
    resume.toLowerCase().includes(skill.toLowerCase())
  );

  return [...new Set(matched)].slice(0, 3);
}

function extractAchievement(resume: string) {
  const match = resume.match(/(\d+%|\d+x|\d+\s*(million|k))/i);
  return match ? match[0] : "25%";
}

function cleanText(text:string){
  return text
    .replace(/\[.*?\]/g,"") // remove placeholders
    .replace(/\s+/g," ")
    .trim();
}

import { createClient } from "@/utils/supabase/server";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Backend Plan Gating: Verify user tier before AI generation
    const { data: profile } = await supabase
      .from('profiles')
      .select('subscription_tier')
      .eq('id', user.id)
      .single();

    if (!profile || profile.subscription_tier === 'free') {
      return NextResponse.json({ error: 'Pro subscription required for this feature.' }, { status: 403 });
    }

    const { company: rawCompany, role: rawRole, resume, tone = 'formal', temperature = 0.5 } = await req.json();

    const company = rawCompany || "your target company";
    const role = rawRole || "the desired position";

    // Sanitize input for better extraction
    const cleanResume = resume.trim().replace(/\s+/g, ' ');

    const years = extractYears(cleanResume);
    const skills = extractSkills(cleanResume).join(", ");
    const achievement = extractAchievement(cleanResume);

    const toneMap: Record<string, string> = {
      formal: "Professional formal tone",
      startup: "Friendly startup tone",
      aggressive: "Confident persuasive tone"
    };

    const tonePrompt = toneMap[tone] || toneMap.formal;

    let letter = "";

    if (tone === 'startup') {
      // Creative/Startup Template
      letter = `
        To the team at ${company},

        If you're looking for someone who lives at the intersection of "wildly ambitious" and "meticulously data-driven," you've found your next ${role}. From my ${years} years scaling products to optimizing user flows, I've learned that the best solutions don't just solve problems—they tell a story.

        I've been following ${company}'s journey for a while, and your latest innovation genuinely caught my eye. I don't just want to build products; I want to build the future with a team that isn't afraid to break things and rebuild them better. With my expertise in ${skills}, let's create something people haven't even dreamed of yet.

        Best,
        Charan
      `;
    } else if (tone === 'aggressive') {
      // Bold/Aggressive Template
      letter = `
        Let's cut to the chase.

        ${company} is solving big problems, and I have the direct experience scaling products over the last ${years} years to help you solve them faster. I don't just manage—I drive growth, lead cross-functional teams, and turn complex data into actionable strategies that move the needle.

        In my previous roles, I didn't just meet KPIs; I redefined them, including improving performance by ${achievement}. I'm ready to bring that same high-velocity, results-first mindset to the ${role} role. If you want someone who delivers without excuses, we should talk. Use my skills in ${skills} to dominate the market.

        Regards,
        Charan
      `;
    } else {
      // Formal (Default)
      letter = `
        Dear Hiring Manager,

        I am excited to apply for the ${role} position at ${company}. 
        With over ${years}+ years of experience, I have delivered 
        user-focused solutions that improved performance by ${achievement}.

        My expertise includes ${skills}. I follow a data-driven 
        approach using customer insights to ship scalable, high-impact features.
        Throughout my career, I have specialized in aligning product goals 
        with organizational objectives to ensure sustainable growth.

        I am particularly impressed by ${company}'s innovation 
        and would love to contribute by building efficient products 
        that drive measurable growth. Thank you for your consideration.

        Sincerely,
        Charan
      `;
    }

    let finalContent = cleanText(letter);
    if (finalContent.length > 900) {
      finalContent = finalContent.slice(0, 900) + "...";
    }

    return NextResponse.json({
      output: finalContent
    });

  } catch (error) {
    return NextResponse.json({
      output: "Failed to generate cover letter"
    });
  }
}
