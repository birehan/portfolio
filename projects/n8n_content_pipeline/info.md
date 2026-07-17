---
title: "n8n Content Pipeline: Topic to Published SEO Article in Under 4 Minutes"
slug: n8n-content-pipeline
role: Sole Automation Engineer · AI Workflow Architect
summary: "Self-hosted n8n pipeline triggered by one Telegram command. Six stages: parallel research, SEO analysis, a multi-agent Writer/Critic/Refiner loop, Claude QA, and final scoring."
outcome: "Topic-to-publish dropped from ~18 hours to 3–4 minutes; replaced 15+ hrs/week of manual work."
stack:
  - n8n (self-hosted)
  - Docker (10 containers)
  - PostgreSQL
  - SearXNG · Firecrawl
  - OpenAI GPT-4o
  - Claude Sonnet (via OpenRouter)
  - DataForSEO
  - Telegram Bot API
links: {}
order: 6
date: 2025
---

# n8n Content Pipeline: Topic to Published SEO Article in Under 4 Minutes

**Role:** Sole Automation Engineer
**Stack:** n8n (self-hosted), Docker, PostgreSQL, SearXNG, Firecrawl, OpenAI, OpenRouter (Claude), DataForSEO, Telegram Bot API
**Status:** functional prototype; the core pipeline works end-to-end, with some production gaps noted below.

## What It Does

An automated content pipeline that takes a community name and URL and produces a researched, SEO-optimized, editorially reviewed article, delivered as Markdown and HTML via Telegram, in under 4 minutes. It handles web research, scraping, SEO keyword analysis, AI writing with an iterative critic/refiner loop, multi-layer QA, and delivery. No human touches the content between trigger and output.

## Architecture Overview

```
Trigger (Webhook or Telegram Bot)
  │
  ├── Stage 1: Deep Research (SearXNG + Firecrawl + GPT-4o)
  │     └── Quality Gate → retry up to 2x on failure
  │
  ├── Stage 2: SEO Research (DataForSEO + GPT-4o)
  │     └── Quality Gate → retry up to 2x on failure
  │
  ├── Stage 3: Data Packaging (merge research + SEO into structured JSON)
  │     └── Quality Gate → validate required fields
  │
  ├── Stage 4-5: Editorial + QA (Claude Sonnet via OpenRouter)
  │     ├── Writer → Critic → Score Check
  │     │     └── Loop: Refiner → Critic (up to 3 iterations)
  │     ├── Plagiarism Check
  │     ├── Fact Check
  │     └── Word Count + Tone Analysis
  │
  └── Stage 6: Master QA + Publish (Claude Sonnet via OpenRouter)
        ├── Final 5-dimension scoring
        ├── Generate Markdown (YAML frontmatter) + HTML (styled)
        ├── Send files via Telegram
        └── Quality Gate → retry full pipeline up to 2x on failure
```

Six n8n workflows orchestrated by a parent workflow, plus a standalone Telegram bot workflow for triggering via chat.

## Infrastructure

Everything runs in Docker via a single `docker-compose.yml`, a 10-container stack (n8n, PostgreSQL/pgvector, SearXNG + Redis, Firecrawl with Playwright + Redis + RabbitMQ + Postgres). No external SaaS for scraping or search; only API keys for AI models and SEO data. Services communicate over a private bridge network, and health checks ensure startup ordering.

## AI Model Strategy

The split is deliberate: **GPT-4o** handles structured extraction (research synthesis, SEO keyword clustering) where speed and reliable JSON matter, and **Claude Sonnet** (via OpenRouter) handles the editorial work (writing, critic scoring, refinement, QA, and final scoring) where writing quality matters.

## Key Engineering Decisions

- **Quality gates with retry logic:** every stage has a gate; failures retry that stage up to 2x, and a Stage 6 failure restarts the pipeline with failure context appended.
- **Writer/Critic/Refiner loop:** the Writer drafts, the Critic scores across dimensions (JSON), and if the average is under 5/10 the Refiner rewrites, looping up to 3 times with a last-chance refiner at the end.
- **State restoration pattern:** dedicated "Restore Data" nodes re-inject pipeline state after each Telegram progress update, since n8n passes data linearly.
- **Self-hosted search and scraping:** SearXNG and Firecrawl are self-hosted to avoid rate limits and per-request costs, trading infra complexity for unlimited scraping at zero marginal cost.

## Skills Demonstrated

- **n8n workflow design:** sub-workflow orchestration, webhook triggers, quality gates, retries, and state management across branching paths.
- **Multi-model AI orchestration:** routing task types to appropriate LLMs, structured JSON prompting, and fallback parsing.
- **Docker infrastructure:** a 10-service compose stack with health checks, dependency ordering, shared networking, and volume persistence.
- **SEO automation:** DataForSEO integration, keyword volume analysis, SERP competitor analysis, and intent classification.
- **Editorial automation:** iterative critic/refiner pattern, multi-dimensional scoring, and plagiarism/fact checking.
- **Error handling:** `continueOnFail` on external calls, JSON parse fallbacks, and failure context propagation.

---

*Built as a freelance project. The pipeline consistently produces 1,500–2,500 word SEO articles from a single community URL, with research, keyword targeting, and editorial QA all automated in under 4 minutes.*
