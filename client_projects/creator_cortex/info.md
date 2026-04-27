---
title: "Creator Cortex — YouTube Title Analyzer & Strategy Platform"
slug: creator-cortex
role: Full-Stack Engineer (architecture, backend, frontend, infra)
summary: "YouTube growth copilot: score titles, generate new ones grounded in real outlier data (RAG), mine competitors, and wire YouTube Analytics so published performance feeds the next iteration."
outcome: "Creators iterate titles with retrieval + analytics behind them—large FastAPI API and React studio, Postgres/pgvector on Supabase, background jobs and hosting on Render (internal product; no public demo)."
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

# Creator Cortex — YouTube Title Analyzer & Strategy Platform

> **Internal YouTube strategy product** — a **FastAPI** backend and **React 19 + Vite** studio for serious creators: **score** titles, **generate** alternatives with **RAG** over real high-performing outliers, **mine** competitors and patterns, connect **multiple channels via OAuth** to pull **YouTube Analytics**, and **close the loop** so feedback and performance shape the next generations.

## The problem

Guessing titles from gut feel doesn’t scale. Creators need **data** (what’s worked before, on their channel and elsewhere), **fast iteration**, and **one place** that ties scoring, generation, outliers, and post-publish outcomes together—without juggling spreadsheets and disconnected tools.

## What I shipped

- **Title scoring** — Heuristic + structured scoring (length, clarity, curiosity, specificity, patterns) with batch and “health” style endpoints the UI can call on demand.
- **LLM title generation (RAG)** — Central gateway to **OpenRouter** with tiered models (e.g. Claude for heavy generation, smaller models for classification). **pgvector** retrieval over embedded **outlier titles** so prompts are grounded in real winners, not generic fluff.
- **Outlier & competitor mining** — Scheduled jobs (**APScheduler**) refresh channels, scan for outperformers, backfill embeddings, and support formula / pattern discovery the UI can browse.
- **YouTube OAuth + Analytics** — Multi-channel connect, encrypted token storage, pulls real metrics (CTR, impressions, retention signals, etc.) to power dashboards and **feedback-aware** prompt blocks.
- **Feedback loop** — Tracks generations, picks, edits, and post-publish snapshots so later prompts can emphasize what actually worked for **this** creator.
- **Frontend studio** — Multi-tab app (scorer, generator, outliers, channels, insights, thumbnails playbook, etc.) consuming the large generated API surface.

## Architecture (at a glance)

- **Modular FastAPI** — Feature-oriented packages (routes, services, repositories) so scoring, RAG, OAuth, schedulers, and streaming traces stay separated.
- **Async SQLAlchemy 2** — Async Postgres; Supabase hosts the database; vector search lives alongside relational models.
- **SSE traces** — Long-running generations can stream structured progress to the UI for transparency.

## Stack

Python 3.12, FastAPI, Pydantic, SQLAlchemy 2 async, Alembic, PostgreSQL + **pgvector** (Supabase), React 19, Vite, OpenRouter (Claude / Gemini / GPT-4o-mini), YouTube Data + Analytics APIs, APScheduler, Docker, **Render** (internal deploy).

## Result

A **single internal product** where creators move from “idea / transcript” to **ranked, judged title options** with **retrieval and channel history** in the loop—plus real **Analytics-backed** learning over time. **Not a public SaaS:** built and run for internal use; **no public URL or demo link.**
