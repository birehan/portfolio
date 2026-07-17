---
title: "Lorenzo: AI Campaign Strategy Builder"
slug: lorenzo-campaign-agent
role: ML Engineer @ Adludio (LLM backends & Lambda APIs, campaign automation)
summary: "At Adludio: a chat-first campaign builder that takes advertisers from a rough idea to structured, pre-targeted drafts without long static forms, on the mobile ad stack."
outcome: "Faster setup for advertisers, and campaign managers spend less time cleaning briefs once campaigns are in flight."

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

# Lorenzo: AI Campaign Strategy Builder

> Built at **Adludio (London)** as an ML Engineer. Lorenzo streamlines campaign creation: instead of wrestling with rigid forms, advertisers describe goals in chat and the product assembles a coherent strategy (brief, segments, and suggested targeting) before anything goes live.

**Scope:** backend & AI integration, covering LLM prompt design, structured outputs, AWS Lambda APIs, and wiring into the existing campaign UI.

## The problem

Campaign setup relied on a long static form. Advertisers often submitted thin or inconsistent briefs, and problems surfaced only after campaigns were running. Managers then chased clients for clarification: slow for clients and expensive for the team.

## What I built

A chat-first campaign builder that automates the early setup path:

1. **Guided brief capture.** Natural-language messages are checked in real time; the model rejects vague or off-topic input and asks for specifics so the campaign definition stays usable.
2. **Structured strategy.** From a short description it infers industry, product context, and implied audience (e.g. American football in Europe vs generic "sports").
3. **Targeting suggestions.** Age bands, interest groups, and keyword clusters are proposed as editable defaults, then flow into the platform's targeting model when accepted, making campaign creation faster and more consistent.

## Architecture

- **LLM layer:** prompt templates with strict schemas for validation, context extraction, and suggestions, with retries when the model violates the schema.
- **API:** serverless Python on AWS Lambda for the chat flow, session state, and stable JSON contracts for the frontend.
- **Integration:** embedded in the existing management UI so approved segments land directly in the live campaign configuration.

## Outcome

Less back-and-forth after onboarding: advertisers moved from idea to a validated, pre-targeted draft campaign in one session instead of email threads and form revisions. Managers spent less time cleaning bad briefs post-launch.

[Watch the demo (Google Drive)](https://drive.google.com/file/d/1ZIvLmUBAwKuz2etdoRIEhRgkyS9SR5As/view?usp=sharing)
