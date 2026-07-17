---
title: "AI Guest Communication for Hotels: Voice + Chat + Messenger"
slug: hospitality-voice-and-chatbot-for-hotels
role: Sole developer (architecture · implementation · deployment · ops)
summary: "24/7 AI concierge for four UK venues across web chat, Messenger, and phone: answering guest questions, qualifying event leads, and handing warm handoffs to staff with a full audit trail."
outcome: "Rigorous eval suite before go-live; venues run it around the clock with structured lead capture instead of missed DMs and voicemails."
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

# AI Guest Communication for Hotels: Voice + Chat + Messenger

> A sole build: an **n8n**-orchestrated stack for **four UK hospitality venues** across embedded **web chat**, **Facebook Messenger**, and **AI phone reception** (**Vapi** + **Twilio**). Same retrieval-backed answers and **lead capture** everywhere, with venue-specific knowledge and guardrails so guests get accurate answers rather than a generic hotel bot.

## The problem

Guests message and call outside staff hours, and high-value event enquiries sit next to "where do I park?" and get lost. Teams need 24/7 coverage, consistent answers per venue, and qualified leads with context, without doubling headcount.

## What I shipped

- **Three channels:** website widget (HTTP), **Meta Messenger** (signed webhooks + send API), and **voice** (inbound Twilio to a Vapi conversational layer).
- **RAG over venue data:** embeddings + **PostgreSQL / PGVector** per venue (menus, packages, policies, FAQs) so replies stay grounded in that site's facts.
- **Lead capture:** for events, private hire, and groups, structured fields, urgency hints, source channel, and logging to **Google Sheets** for the sales team.
- **Session memory:** Postgres-backed conversation state so follow-ups ("any vegetarian options?") stay in context.
- **Business rules:** table bookings redirect to the venue's real booking flow, and capture triggers are tuned for high-intent threads, not every chat.
- **Hosting & ops:** self-hosted **n8n** on **DigitalOcean** with HTTPS for webhooks; I owned deploy and ongoing tweaks.

## Architecture (at a glance)

```
 Web widget       Messenger          Phone (Twilio)
     | HTTP         | webhook            | SIP
     v              v                    v
              n8n workflows (orchestration)
     |               |                     |
     v               v                     v
OpenAI chat +   PGVector retrieval     Vapi voice layer
 embeddings      (per-venue KB)         + human transfer
     |
     v
Postgres session memory  ·  Google Sheets (lead CRM)
```

Traffic from web, Messenger, and Twilio fans into **n8n** workflows that call **OpenAI** (chat + embeddings) and **PGVector** retrieval, then write optional **Sheets** rows for leads. Voice adds **Vapi** on the telephony path with human transfer when needed.

## Stack

**n8n** (self-hosted), **OpenAI** GPT-4.1-mini + embeddings, **PostgreSQL + PGVector**, **Vapi** + **Twilio**, **Meta Graph API** (Messenger), **Google Sheets**, **DigitalOcean**.

## Quality & result

Before go-live I ran an automated eval suite (factual checks per venue, regression cases from real feedback, and multi-turn lead flows), scoring 36/36 on the final Bellini run with CSV exports for audit. In production, venues get round-the-clock guest handling and structured leads instead of missed off-hours DMs and voicemails.
