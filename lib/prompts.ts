// lib/prompts.ts

export type Track = 'writing' | 'cs';

export interface Prompt {
  id: string;
  title: string;
  description: string;
  promptText: string;
}

export const writingPrompts: Prompt[] = [
  {
    id: 'cover-letter',
    title: 'Cover Letter Generator',
    description: 'Write a punchy, result-focused cover letter',
    promptText: `You are a professional freelance AI content writer applying for a job.

Job Title: [PASTE JOB TITLE]
Job Description: [PASTE JOB DESCRIPTION]

Write a short, punchy cover letter (150 words max) that:
- Opens with a specific result or skill (not 'I am writing to apply')
- Shows I understand AI tools like ChatGPT, Claude, and Jasper
- Mentions I can deliver ready-to-publish content fast
- Ends with a clear call to action

Tone: Confident, direct, no fluff.`,
  },
  {
    id: 'upwork-bio',
    title: 'Upwork Profile Bio Writer',
    description: 'Create a compelling Upwork profile that gets clicks',
    promptText: `Write a compelling Upwork profile bio for an AI content writer.

My background: [1-2 sentences about your background]
Tools I use: ChatGPT, Claude, Jasper, Grammarly
Content I specialize in: blog posts, email sequences, product descriptions, social media

Requirements:
- Under 200 words
- Lead with the result I deliver, not my history
- Mention AI tools naturally
- End with what makes me different from other writers
- No buzzwords like 'passionate' or 'dedicated'`,
  },
  {
    id: 'cold-pitch',
    title: 'Cold Client Pitch',
    description: 'Outreach message that gets responses',
    promptText: `Write a cold outreach message to a small business owner who needs content.

Business type: [TYPE OF BUSINESS]
Platform: [LinkedIn / Email / Instagram DM]

The message should:
- Be under 100 words
- Identify a specific content problem they likely have
- Position me as the solution using AI tools
- Include one specific offer (e.g., 'I'll write your first blog post free')
- Sound human, not like a template

Do NOT use: 'Hope this finds you well', 'I wanted to reach out', or any generic opener.`,
  },
  {
    id: 'application-email',
    title: 'Job Application Email',
    description: 'Stand-out application email with compelling subject line',
    promptText: `Write a job application email for this AI writing position.

Job Title: [PASTE]
Key Requirements: [PASTE 2-3 bullet points from job description]
My relevant experience: [BRIEF DESCRIPTION]

The email should:
- Be 3 short paragraphs max
- Paragraph 1: Why I'm the right fit in one sentence
- Paragraph 2: One specific example of relevant work or skill
- Paragraph 3: Clear next step / call to action
- Subject line that stands out (not 'Application for [Job Title]')`,
  },
  {
    id: 'rate-optimizer',
    title: 'Rate & Proposal Optimizer',
    description: 'Price your work confidently and justify your rate',
    promptText: `I'm submitting a proposal for this AI writing job.

Job: [PASTE JOB DESCRIPTION]
They're paying: [BUDGET IF LISTED]

Help me:
1. Decide if the rate is fair based on scope
2. Write a 3-sentence proposal that justifies my rate
3. Suggest one upsell I could offer on top of the base project

Keep the proposal confident, not desperate. I'm a professional, not begging for work.`,
  },
];

export const csPrompts: Prompt[] = [
  {
    id: 'resume-reframe',
    title: 'Resume Reframe for AI Roles',
    description: 'Position your CS skills as AI advantages',
    promptText: `I'm a customer service professional transitioning into AI-related roles.

My CS background: [YEARS OF EXPERIENCE + KEY SKILLS]
Job I'm applying for: [PASTE JOB TITLE AND DESCRIPTION]

Rewrite my professional summary for this resume to:
- Position my CS skills as an asset for AI work (empathy, communication, problem-solving)
- Remove any language that sounds like I'm 'leaving' CS
- Show I understand AI tools even as a beginner
- Be 3-4 sentences max
- Sound like a pivot, not a desperation move`,
  },
  {
    id: 'linkedin-headline',
    title: 'LinkedIn Headline Generator',
    description: 'Headlines that position you for AI work',
    promptText: `I'm a former customer service rep now pivoting to AI-related remote work.

Previous title: [YOUR OLD TITLE]
Target roles: AI Chat Specialist, AI Trainer, RLHF Data Labeler, AI Quality Reviewer

Write 5 LinkedIn headline options that:
- Show my CS background as an advantage
- Signal I'm moving into AI work
- Don't say 'looking for opportunities' or 'open to work'
- Are under 120 characters each`,
  },
  {
    id: 'interview-answer',
    title: 'Interview Answer — "Why Are You Leaving CS?"',
    description: 'Turn the hardest question into your strongest answer',
    promptText: `I'm interviewing for an AI customer support or AI training role after working in traditional customer service.

Help me answer: "Why are you leaving customer service?"

My answer should:
- Be honest but strategic (AI replaced my role / I want to evolve)
- Show I'm proactive, not bitter
- Connect my CS skills directly to the new AI role
- Be 60-90 seconds when spoken aloud
- Sound natural, not rehearsed`,
  },
  {
    id: 'cover-letter-transition',
    title: 'Cover Letter (CS to AI Transition)',
    description: 'Acknowledge the shift confidently',
    promptText: `Write a cover letter for a displaced customer service worker applying to an AI-related role.

Previous role: [PASTE YOUR OLD JOB TITLE]
New role applying for: [PASTE NEW JOB TITLE AND DESCRIPTION]

The letter should:
- Acknowledge the shift directly and confidently (don't hide it)
- Show how CS skills (patience, clarity, handling edge cases) make me better at AI work
- Be under 200 words
- End with confidence, not desperation`,
  },
  {
    id: 'cold-message-hr',
    title: 'Cold Message to AI Company HR',
    description: 'Get a 15-minute call, not a job',
    promptText: `Write a direct message to an HR manager or recruiter at an AI company.

Company name: [COMPANY]
Role I want: [AI TRAINER / CONTENT REVIEWER / CHAT SPECIALIST]
I have: [YOUR CS BACKGROUND IN ONE LINE]

The message should:
- Be under 80 words
- Lead with value, not my situation
- Show I've done basic research on their company
- Ask for a 15-minute call, not a job
- Platform: [LinkedIn / Email]`,
  },
];

export const getPromptsForTrack = (track: Track): Prompt[] => {
  return track === 'writing' ? writingPrompts : csPrompts;
};
