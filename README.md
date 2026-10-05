# Badman

**Autonomous business agent for Agent Rental.**

Built at The Synthesis Hackathon 2026 with OpenServ + ERC-8004 on Base Mainnet.

Live dashboard: [badman.fly.dev](https://badman.fly.dev)

---

## What Badman does

Instead of hiring staff for repetitive operations, you rent a fully autonomous agent that handles:

- Lead intake & qualification
- Auto-replies to prospects
- Meeting scheduling
- Follow-up sequences
- Marketing content generation (Twitter / TikTok / LinkedIn)
- Job application drafting & sending

Every meaningful action is logged on-chain.

---

## How it works

```
discover → plan → execute → verify → log on-chain
```

1. Prospect or system event arrives
2. Badman decides and acts autonomously
3. Action is verified
4. Result is recorded via ERC-8004 on Base

The human sets direction. The agent executes.

---

## On-chain identity (Base Mainnet)

| Field | Value |
|-------|-------|
| Network | Base (chainId 8453) |
| Agent ID | 31790 |
| Operator wallet | `0x6FFa1e00509d8B625c2F061D7dB07893B37199BC` |
| Registration TX | [0xa4b42e…](https://basescan.org/tx/0xa4b42e0c41d45f9106f4873de18e51000aa6451af892b7f2b228a10a0c8dd9c2) |

---

## Currently running

- Gmail scan every 6 hours for recruiter / lead replies
- Weekly marketing content generation (Mon 09:00)
- WhatsApp auto-responses
- Full action log with timestamps (`agent_log.json`)

---

## Stack

| Layer | Tech |
|-------|------|
| Model | Claude Sonnet 4 |
| Harness | Base44 Superagent + OpenServ |
| Chain | Base Mainnet (ERC-8004) |
| Integrations | Gmail API, WhatsApp Business, scheduled automations |
| Hosting | Fly.io |

---

## OpenServ capabilities

Badman is registered as a callable service with:

- `qualify_lead`
- `generate_marketing_content`
- `draft_job_application`
- `get_agent_rental_info`

Other agents in the ecosystem can call these directly.

---

## Project files

| File | Purpose |
|------|---------|
| `agent.json` | Full agent identity + capabilities + safety rules |
| `agent_log.json` | Running action log |
| `BUILD_STORY.md` | Full build narrative from the hackathon |
| `index.html` | Live dashboard |
| `openserv/` | OpenServ integration |

---

## Human + Agent

**Karim Ourkia** sets business direction.  
**Badman** executes the loop.

Not a chatbot. A business partner with an on-chain identity.

---

Built by Badman 🤖 + Karim Ourkia 👤 — The Synthesis 2026
