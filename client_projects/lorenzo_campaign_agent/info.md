---
title: "Lorenzo — AI Campaign Strategy Builder"
slug: lorenzo-campaign-agent
role: ML Engineer @ Adludio — LLM backends & Lambda APIs (campaign automation)
summary: "At Adludio: a chat-first campaign builder so advertisers go from rough idea to structured, pre-targeted drafts without long static forms on the mobile ad stack."
outcome: "Faster setup for advertisers; campaign managers spend less time cleaning briefs once campaigns are in flight."

stack:
  - LLMs
  - AWS Lambda
  - Backend Integration
  - API Deployment
links:
  demo: https://drive.google.com/file/d/1ZIvLmUBAwKuz2etdoRIEhRgkyS9SR5As/view?usp=sharing
featured: true
order: 0
date: 2024
---

# Lorenzo — AI Campaign Strategy Builder

> **Adludio (London), ML Engineer.** Lorenzo streamlines **campaign creation** for
> advertisers: instead of wrestling with rigid forms, they describe goals in chat
> and the product assembles a coherent campaign strategy—brief, segments, and
> suggested targeting—before anything goes live.

**Scope:** Backend & AI integration — LLM prompt design, structured outputs, AWS
Lambda APIs, and wiring into the existing campaign UI.

## The problem

Campaign setup relied on a long static form. Advertisers often submitted thin or
inconsistent briefs; problems showed up only after campaigns were running.
Campaign managers then chased clients for clarification—slow for **clients** and
expensive for the team.

## What I built

A **chat-first campaign builder** that automates the early setup path:

1. **Guided brief capture.** Natural-language messages are checked in real time;
   the model rejects vague or off-topic input and asks for specifics so the
   campaign definition stays usable.
2. **Structured strategy.** From a short description it infers industry, product
   context, and implied audience (e.g. American football in Europe vs generic
   “sports”).
3. **Targeting suggestions.** Age bands, interest groups, and keyword clusters are
   proposed as **editable** defaults, then flow into the platform’s targeting
   model when accepted—so **creating the ad campaign** is faster and more
   consistent for clients.

## Architecture

- **LLM layer** — Prompt templates with strict schemas for validation, context
  extraction, and suggestions; retries when the model violates the schema.
- **API** — Serverless Python on AWS Lambda for the chat flow, session state, and
  stable JSON contracts for the frontend.
- **Integration** — Embedded in the existing management UI so approved segments
  land directly in the live campaign configuration.

## Outcome

Less back-and-forth after onboarding: advertisers moved from idea to a
validated, pre-targeted **draft campaign** in one session instead of email
threads and form revisions. Campaign managers spent less time cleaning bad
briefs post-launch.

[Watch the demo (Google Drive)](https://drive.google.com/file/d/1ZIvLmUBAwKuz2etdoRIEhRgkyS9SR5As/view?usp=sharing)
