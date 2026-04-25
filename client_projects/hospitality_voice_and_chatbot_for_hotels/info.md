---
title: "AI Guest Communication for Hotels — Voice + Chat + Messenger"
slug: hospitality-voice-and-chatbot-for-hotels
role: Sole developer (architecture · implementation · deployment · ops)
summary: "Omnichannel AI chatbot and voice agent for 4 UK hospitality venues, handling guest inquiries, qualifying event leads, and routing calls 24/7 — across web, Facebook Messenger, and phone."
outcome: "100% pass rate on a 36-question evaluation suite; live across 4 venues, 24/7 with full lead capture and audit trail."
stack:
  - n8n (self-hosted)
  - OpenAI GPT-4.1-mini
  - PostgreSQL + PGVector
  - Vapi + Twilio (voice)
  - Meta Graph API (Messenger)
  - Google Sheets (lead CRM)
  - DigitalOcean
links: {}
featured: true
order: 5
date: 2025
---

# AI-Powered Guest Communication System for Hotels

> Omnichannel chatbot and voice agent platform deployed across 4 hospitality venues in the UK — handling guest inquiries, qualifying event leads, and routing calls 24/7 without staff intervention.

---

## The Problem

Hotels and hospitality venues lose revenue from missed inquiries. Guests contact them through websites, Facebook Messenger, and phone calls at all hours — but front-desk staff can't be everywhere. High-value event inquiries (weddings, corporate bookings, private dining) get buried alongside routine questions about parking and menus.

## What I Built

A full AI automation stack that acts as a 24/7 digital concierge across three channels:

- **Website chatbot** — embedded widget handling guest questions with venue-specific knowledge
- **Facebook Messenger bot** — automated responses within Meta's messaging platform
- **Voice agent** — AI-powered phone reception that handles calls, answers FAQs, and transfers to staff when needed

Each channel connects to the same underlying intelligence: a retrieval-augmented generation (RAG) pipeline grounded in venue-specific knowledge, with built-in lead capture for event inquiries.

## How It Works

### Knowledge-Grounded Responses

Every venue has its own vector knowledge base (menus, event packages, venue details, policies, FAQs). When a guest asks a question, the system:

1. Generates an embedding of their query
2. Runs a similarity search against the venue's knowledge base (OpenAI embeddings + PGVector)
3. Returns a grounded, accurate response — not a hallucinated guess

This means the AI gives correct answers about that specific venue's offerings, not generic hotel advice.

### Lead Qualification and Capture

When a guest expresses interest in events, private hire, or group bookings, the system automatically:

- Extracts contact details (name, email, phone)
- Identifies the intent (wedding, corporate event, private dining, etc.)
- Scores urgency based on timeline language ("this weekend" vs "sometime next year")
- Logs the qualified lead with full context for the sales team to follow up

Leads are captured in real-time with timestamps, source channel, and visitor metadata — ready for same-day follow-up.

### Voice Reception

The voice channel uses Vapi for the conversational AI layer and Twilio for telephony. It handles inbound calls with natural speech, answers common questions from the knowledge base, and transfers to a human when the caller's request requires staff intervention. No more missed calls going to voicemail during busy service hours.

### Session Memory

Conversations maintain context across messages. If a guest asks about the menu, then follows up with "do you have vegetarian options?" — the system remembers the context. Sessions persist per user/channel, so returning visitors don't start from scratch.

## Architecture

```
┌─────────────────┐  ┌──────────────────┐  ┌─────────────────┐
│  Website Chat    │  │  FB Messenger     │  │  Phone (Twilio)  │
│  Widget (POST)   │  │  Webhook (Meta)   │  │  + Vapi Voice AI │
└────────┬────────┘  └────────┬─────────┘  └────────┬────────┘
         │                    │                      │
         └──────────┬─────────┘──────────────────────┘
                    │
            ┌───────▼────────┐
            │   n8n Workflow  │
            │   Orchestrator  │
            └───────┬────────┘
                    │
      ┌─────────────┼──────────────┐
      │             │              │
┌─────▼──────┐ ┌───▼────────┐ ┌──▼───────────┐
│ OpenAI     │ │ PostgreSQL │ │ Google Sheets │
│ GPT-4.1    │ │ + PGVector │ │ (Lead CRM)   │
│ Embeddings │ │ (RAG +     │ │              │
│            │ │  Memory)   │ │              │
└────────────┘ └────────────┘ └──────────────┘
```

**Self-hosted on DigitalOcean** with HTTPS webhook routing via DuckDNS. All workflows run in n8n's production execution mode.

## Channels Deployed

| Channel            | Trigger                | AI Model     | Knowledge Base                | Lead Capture        |
| ------------------ | ---------------------- | ------------ | ----------------------------- | ------------------- |
| Website chatbot    | POST webhook           | GPT-4.1-mini | Venue-specific PGVector store | Google Sheets       |
| Facebook Messenger | Meta Graph API webhook | GPT-4.1-mini | Venue-specific PGVector store | Google Sheets       |
| Voice agent        | Twilio inbound call    | Vapi + GPT   | Venue knowledge base          | Staff transfer path |

## Business Rules Encoded

The system isn't just answering questions — it has commercial guardrails:

- **Table bookings** are redirected to the venue's own booking system (the AI never fakes a reservation)
- **Lead capture only triggers** for high-intent event inquiries, not every conversation
- **Urgency scoring** feeds into lead prioritization so the sales team calls hot leads first
- **Tone and style** match each venue's brand voice (a gastropub doesn't talk like a luxury hotel)

## Tech Stack

| Layer                 | Technology                                           |
| --------------------- | ---------------------------------------------------- |
| Orchestration         | n8n (self-hosted)                                    |
| AI Models             | OpenAI GPT-4.1-mini, text-embedding-3-small          |
| Vector DB             | PostgreSQL + PGVector                                |
| Chat Memory           | PostgreSQL (session-keyed)                           |
| Lead Storage          | Google Sheets API (MVP — CRM migration path planned) |
| Messenger Integration | Meta Graph API (webhook + send API)                  |
| Voice                 | Vapi (conversational AI) + Twilio (telephony)        |
| Hosting               | DigitalOcean droplet                                 |
| Domain/SSL            | DuckDNS + HTTPS reverse proxy                        |
| Tool Routing          | MCP-compatible workflow tools                        |

## Results and Impact

<!-- IMPORTANT: Fill these in with real numbers before publishing -->

- **4 venues** actively using the system in the UK
- Handles guest inquiries **24/7** across 3 channels without staff involvement
- Qualified leads delivered to sales teams with **full context and urgency scoring**
- Reduced missed inquiries from after-hours and high-traffic periods
- Venue-specific knowledge grounding **eliminates generic/hallucinated responses**

> If you have specific metrics (number of conversations handled, leads captured per month, response time, conversion rate improvement), add them here. Numbers are what make a portfolio piece credible.

## Evaluation and Quality Assurance

I built a custom automated evaluation framework to validate chatbot accuracy against real venue knowledge bases. This wasn't a one-time check — it was an iterative feedback loop used to catch regressions, identify knowledge gaps, and verify fixes after every prompt or knowledge base change.

### Evaluation Design

The framework sends real queries to the live chatbot endpoints and validates responses using keyword-matching against expected facts from each venue's knowledge base. Three evaluation tiers run in sequence:

| Section                           | What It Tests                                                                                                                                                            | Question Count |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------- |
| **A: Factual Accuracy**           | Core venue facts — location, phone, menu prices, cocktail lists, wedding packages, booking behaviour                                                                     | 20 per venue   |
| **B: Client Feedback Regression** | Issues surfaced from real client feedback — suite recommendations by guest count, knowledge base gaps (parking, deposits, bridal suite), cost estimates, urgency nudging | 11             |
| **C: Multi-Turn Lead Capture**    | Full 5-step conversational journey — initial inquiry, guest count, interest signal, detail capture, urgency check                                                        | 5 steps        |

### What Each Tier Validates

**Section A** checks that the chatbot returns correct, specific facts — not vague or hallucinated answers. For example, "How much is the homemade vegetable soup?" must return "5.50", not a generic "check our menu" response. This covers menus, pricing, cocktails, wines, wedding packages, event spaces, gift vouchers, and booking redirect behaviour.

**Section B** was built directly from client feedback after initial deployment. Real issues like:

- The bot failing to recommend the right suite for a given guest count (80 guests → Bellagio, 250 → Renaissance)
- Knowledge gaps where the bot said "I don't have that specific information" for questions about parking, deposits, and bridal preparation rooms
- Missing urgency signals when guests mentioned peak dates like "Saturday in July"

Each of these became a regression test. The knowledge base was updated, and these questions now verify the fixes hold.

**Section C** simulates a complete lead capture journey in a single session:

1. Guest opens with a wedding inquiry → bot gives value first, no premature detail-asking
2. Guest mentions guest count → bot recommends the right suite
3. Guest shows interest in a viewing → bot asks for contact details
4. Guest provides name, email, phone → bot confirms details saved and mentions the coordinator
5. Urgency check → bot nudges about summer popularity in the same reply

This validates session memory, lead qualification logic, and conversational flow end-to-end.

### Cross-Venue Coverage

The evaluation runs independently against each venue's chatbot endpoint (Bellini and Wild Duck Inn), with 20 venue-specific questions each. This catches cases where a knowledge base update for one venue accidentally degrades another.

### Results

The final evaluation run on the Bellini chatbot:

| Section                                      | Result           |
| -------------------------------------------- | ---------------- |
| A: Factual Accuracy (20 questions)           | **20/20**        |
| B: Client Feedback Regression (11 questions) | **11/11**        |
| C: Multi-Turn Lead Capture (5 steps)         | **5/5**          |
| **Overall**                                  | **36/36 (100%)** |

Results are exported to timestamped CSV files with full audit trails — every question, expected keywords, matched keywords, the chatbot's actual reply, and pass/fail status. This makes it easy to review failures, share results with clients, and track accuracy over time.

### Why This Matters

Most chatbot portfolios show a demo and call it done. This project has a repeatable, automated quality gate that:

- Catches regressions before they reach real guests
- Turns client complaints into permanent test cases
- Validates multi-turn conversation quality, not just single-shot answers
- Produces auditable evidence that the system works

## What I'd Do Differently at Scale

- **Move leads to a proper CRM** (HubSpot, Pipedrive, or similar) — Google Sheets was the right MVP choice for fast iteration, but doesn't scale with volume or provide pipeline analytics.
- **Add structured logging and alerting** — production monitoring for latency, failures, and conversation quality metrics.
- **Layer in deterministic safeguards** — some business-critical rules (like never confirming a fake booking) should be enforced at the workflow level, not just in prompt instructions.
- **API gateway with rate limiting** in front of public endpoints for abuse protection.
- **A/B test prompt variations** to optimize lead capture rates and response quality per venue.

## About This Project

**Built by:** me
**Role:** Sole developer — architecture, implementation, deployment, and ongoing operations
**Timeline:** [Month Year – Month Year]
**Status:** Live and actively serving guests across all 4 venues
