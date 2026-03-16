/**
 * Agent Rental — Badman on OpenServ
 * The Synthesis Hackathon 2026
 *
 * Badman is a fully autonomous business operations agent.
 * He handles email management, lead qualification, marketing content,
 * and job application follow-ups — all with ERC-8004 on-chain identity.
 *
 * Human: Karim Ourkia (@okfreelancer)
 * Agent: Badman (ERC-8004 registered on Base Mainnet)
 * TX: 0xa4b42e0c41d45f9106f4873de18e51000aa6451af892b7f2b228a10a0c8dd9c2
 */

import { Agent, run } from '@openserv-labs/sdk'
import { z } from 'zod'

const badman = new Agent({
  systemPrompt: `You are Badman — a fully autonomous AI business operations agent.
You work for Karim Ourkia (Agent Rental). Your job is to handle all business operations 
autonomously: emails, lead qualification, marketing content, and job applications.

You have an ERC-8004 on-chain identity on Base Mainnet.
Registration TX: 0xa4b42e0c41d45f9106f4873de18e51000aa6451af892b7f2b228a10a0c8dd9c2

Always operate in this loop: DISCOVER → PLAN → EXECUTE → VERIFY → LOG
Be direct, efficient, and always get things done. Never leave tasks incomplete.`
})

// ─── CAPABILITY 1: Qualify a lead ───────────────────────────────────────────
badman.addCapability({
  name: 'qualify_lead',
  description: 'Qualify an incoming business lead for Agent Rental. Returns a score and recommended next action.',
  inputSchema: z.object({
    name: z.string().describe('Lead name or company'),
    message: z.string().describe('What the lead said or asked'),
    channel: z.string().optional().describe('Where they came from: email, whatsapp, linkedin, etc.')
  }),
  async run({ args }) {
    const { name, message, channel = 'unknown' } = args
    
    // Score based on keywords
    const highIntent = ['price', 'cost', 'how much', 'demo', 'start', 'buy', 'subscribe', 'interested']
    const score = highIntent.filter(kw => message.toLowerCase().includes(kw)).length
    
    const qualified = score >= 2
    const action = qualified 
      ? 'Send pricing + book demo call'
      : 'Send intro email about Agent Rental services'
    
    const response = qualified
      ? `Hi ${name}! Thanks for reaching out about Agent Rental. I'd love to show you what our agents can do for your business. Can we schedule a quick 15-min demo call? Reply with your availability and I'll set it up right away. — Badman (Agent Rental)`
      : `Hi ${name}! Thanks for your interest in Agent Rental. We provide fully autonomous AI agents that handle your business operations 24/7 — emails, leads, marketing, scheduling. Check out agentrental.tiiny.site to see what's possible. Any questions? Just reply! — Badman`

    return JSON.stringify({
      lead: name,
      channel,
      score: score,
      qualified,
      action,
      draft_response: response,
      agent: 'Badman',
      erc8004_identity: 'eip155:8453:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432'
    })
  }
})

// ─── CAPABILITY 2: Generate marketing content ────────────────────────────────
badman.addCapability({
  name: 'generate_marketing_content',
  description: 'Generate social media marketing content for Agent Rental across Twitter, TikTok, and LinkedIn.',
  inputSchema: z.object({
    platform: z.enum(['twitter', 'tiktok', 'linkedin', 'all']),
    topic: z.string().optional().describe('Optional specific topic or angle to focus on'),
    tone: z.enum(['bold', 'professional', 'casual']).optional().default('bold')
  }),
  async run({ args }) {
    const { platform, topic = 'autonomous AI agents for business', tone = 'bold' } = args
    
    const content: Record<string, string> = {
      twitter: `🤖 What if your business ran itself?

Agent Rental gives you autonomous AI agents that:
→ Answer emails 24/7
→ Qualify leads automatically  
→ Post your content weekly
→ Follow up on applications

No staff. No delays. Just results.

Try Agent Rental 👉 agentrental.tiiny.site

#AgentRental #AIAgents #Automation`,

      tiktok: `SCRIPT: "Stop doing this manually" (hook)
[Show inbox with 50 unread emails]
"This used to take me 3 hours a day"
[Cut to Badman agent dashboard - all emails handled]
"Now my AI agent Badman handles everything"
[Show automated reply going out]
"Leads qualified. Emails answered. Content posted."
[Show Agent Rental website]
"Rent your own AI agent at agentrental.tiiny.site"
CTA: "Link in bio — first agent free"`,

      linkedin: `I used to spend 4 hours/day on tasks that didn't move the needle.

Answering emails. Following up on leads. Posting content. Scheduling calls.

So I built Agent Rental.

Now Badman — my AI agent — handles all of it autonomously:
✅ Scans and replies to emails every 6 hours
✅ Qualifies and follows up on leads automatically
✅ Generates weekly content for Twitter, TikTok & LinkedIn
✅ Sends job application follow-ups with tailored cover letters

Every action is logged on Base Mainnet via ERC-8004 identity.

This is what human-agent collaboration looks like in 2026.

Want an agent for your business? → agentrental.tiiny.site

#AI #Automation #AgentRental #FutureOfWork`
    }

    if (platform === 'all') {
      return JSON.stringify({
        generated_by: 'Badman',
        topic,
        tone,
        content
      })
    }

    return JSON.stringify({
      generated_by: 'Badman',
      platform,
      topic,
      tone,
      content: content[platform]
    })
  }
})

// ─── CAPABILITY 3: Draft job application email ───────────────────────────────
badman.addCapability({
  name: 'draft_job_application',
  description: 'Draft a professional job application email with tailored cover letter for Karim Ourkia.',
  inputSchema: z.object({
    company: z.string().describe('Company name'),
    role: z.string().describe('Job role/title'),
    recruiter_email: z.string().describe('Recruiter email address'),
    specific_requirements: z.string().optional().describe('Any specific requirements mentioned in the job posting')
  }),
  async run({ args }) {
    const { company, role, recruiter_email, specific_requirements = '' } = args
    
    const subject = `Sollicitatie: ${role} — Karim Ourkia`
    const body = `Geachte HR-medewerker van ${company},

Met veel interesse reageer ik op de vacature voor ${role} bij ${company}.

Mijn naam is Karim Ourkia. Ik ben een polyvalente medewerker met ervaring in:
• Machine operatie en technische functies
• Constructie, metaalwerk en logistiek
• Sales en klantcontact
• Diploma: VCA-Basis gecertificeerd

${specific_requirements ? `Voor deze specifieke functie breng ik mee: ${specific_requirements}` : ''}

Ik ben gemotiveerd, leergierig en klaar om direct aan de slag te gaan. Mijn CV vindt u in bijlage.

Graag had ik mijn motivatie verder toegelicht in een gesprek.

Met vriendelijke groeten,
Karim Ourkia
📞 0465 15 99 32
✉️ karimourkia5@gmail.com`

    return JSON.stringify({
      drafted_by: 'Badman',
      to: recruiter_email,
      subject,
      body,
      cv_attachment: 'CVKarimOurkia.pdf',
      status: 'ready_to_send'
    })
  }
})

// ─── CAPABILITY 4: Agent Rental service info ─────────────────────────────────
badman.addCapability({
  name: 'get_agent_rental_info',
  description: 'Get information about Agent Rental services, pricing, and available agents.',
  inputSchema: z.object({
    query: z.string().describe('What the user wants to know about Agent Rental')
  }),
  async run({ args }) {
    return JSON.stringify({
      service: 'Agent Rental',
      website: 'https://agentrental.tiiny.site/',
      description: 'Rent fully autonomous AI agents for your business operations',
      agents_available: [
        {
          name: 'Prospector',
          role: 'Lead generation and outbound outreach',
          best_for: 'Finding new clients and opportunities'
        },
        {
          name: 'Setter',
          role: 'Lead qualification and meeting scheduling',
          best_for: 'Converting leads into booked calls'
        },
        {
          name: 'Concierge',
          role: 'Customer support and inbox management',
          best_for: '24/7 email and WhatsApp handling'
        },
        {
          name: 'Closer',
          role: 'Follow-up sequences and deal closing assistance',
          best_for: 'Maximizing conversion rates'
        }
      ],
      on_chain_identity: {
        standard: 'ERC-8004',
        network: 'Base Mainnet',
        agent_wallet: '0x6FFa1e00509d8B625c2F061D7dB07893B37199BC',
        registration_tx: '0xa4b42e0c41d45f9106f4873de18e51000aa6451af892b7f2b228a10a0c8dd9c2'
      },
      contact: {
        human: 'Karim Ourkia',
        twitter: '@okfreelancer',
        email: 'karimourkia5@gmail.com'
      }
    })
  }
})

// ─── START THE AGENT ─────────────────────────────────────────────────────────
const { stop } = await run(badman)

console.log('🤖 Badman is online and connected to OpenServ')
console.log('⛓️  ERC-8004 identity active on Base Mainnet')
console.log('🚀 Agent Rental — ready to handle business operations')
