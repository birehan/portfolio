---
title: "Creator Cortex: YouTube Title Analyzer & Strategy Platform"
slug: creator-cortex
role: Full-Stack Engineer (architecture, backend, frontend, infra)
summary: "YouTube growth copilot: score titles, generate new ones grounded in real outlier data (RAG), mine competitors, and feed published performance back into the next iteration."
outcome: "Creators iterate titles with retrieval and analytics behind them. Large FastAPI API and React studio, Postgres/pgvector on Supabase, background jobs on Render (internal product; no public demo)."
stack:
  - Python 3.12
  - FastAPI
  - PostgreSQL + pgvector
  - Supabase
  - React 19
  - Vite
  - OpenRouter (Claude / Gemini / GPT-4o-mini)
  - APScheduler
  - YouTube Data + Analytics APIs
  - Render
links: {}
featured: true
order: 4
date: 2025
---

# Creator Cortex: YouTube Title Analyzer & Strategy Platform

> An internal YouTube strategy product: a **FastAPI** backend and **React 19 + Vite** studio that lets serious creators **score** titles, **generate** alternatives with **RAG** over real high-performing outliers, **mine** competitors, connect **multiple channels via OAuth** for **YouTube Analytics**, and **close the loop** so performance shapes the next generations.

## The problem

Guessing titles from gut feel doesn't scale. Creators need data (what's worked, on their channel and elsewhere), fast iteration, and one place that ties scoring, generation, outliers, and post-publish outcomes together.

## What I shipped

- **Title scoring:** heuristic + structured scoring (length, clarity, curiosity, specificity, patterns) with batch and health-style endpoints.
- **LLM title generation (RAG):** a gateway to **OpenRouter** with tiered models (Claude for heavy generation, smaller models for classification) and **pgvector** retrieval over embedded outlier titles, so prompts are grounded in real winners.
- **Outlier & competitor mining:** scheduled jobs (**APScheduler**) refresh channels, scan for outperformers, backfill embeddings, and support pattern discovery.
- **YouTube OAuth + Analytics:** multi-channel connect, encrypted token storage, and real metrics (CTR, impressions, retention) powering dashboards and feedback-aware prompts.
- **Feedback loop:** tracks generations, picks, edits, and post-publish snapshots so later prompts emphasize what worked for this creator.
- **Frontend studio:** a multi-tab app (scorer, generator, outliers, channels, insights, thumbnails playbook) consuming the API surface.

## Architecture (at a glance)

- **Modular FastAPI:** feature-oriented packages (routes, services, repositories) keep scoring, RAG, OAuth, schedulers, and traces separated.
- **Async SQLAlchemy 2:** async Postgres on Supabase, with vector search alongside relational models.
- **SSE traces:** long-running generations stream structured progress to the UI.

## Stack

Python 3.12, FastAPI, Pydantic, SQLAlchemy 2 async, Alembic, PostgreSQL + **pgvector** (Supabase), React 19, Vite, OpenRouter (Claude / Gemini / GPT-4o-mini), YouTube Data + Analytics APIs, APScheduler, Docker, **Render**.

## Result

A single internal product where creators move from idea or transcript to ranked, judged title options with retrieval and channel history in the loop, plus Analytics-backed learning over time. Built and run for internal use; no public URL or demo link.
