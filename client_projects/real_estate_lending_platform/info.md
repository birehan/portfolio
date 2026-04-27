---
title: "AI Underwriter — Real Estate Lending Platform"
slug: real-estate-lending-platform
role: Backend AI Engineer
summary: "Full-stack lending product for Malama Funding: AI-assisted document checks, an internal pipeline for the team, and a borrower app—one workflow instead of spreadsheets and ad hoc files."
outcome: "Reviewers spend time on exceptions, not every file; borrowers get a single place to apply, upload, and track status."
stack:
  - FastAPI
  - Python 3.12
  - SQLAlchemy 2 (async)
  - PostgreSQL + pgvector
  - Google Cloud Pub/Sub
  - Cloud Run
  - OpenAI / Claude / Gemini
  - LLMWhisperer
links:
  live: https://malamafunding.com
featured: true
order: 1
date: 2025
---

# AI Underwriter — Real Estate Lending Platform

> **Malama Funding** — AI-assisted underwriting for private real-estate loans (DSCR, fix-and-flip, bridge, new construction). I owned the **Python / FastAPI backend**: document intake, event-driven AI validation, property data, quotes, and the APIs that power both the internal team portal and the borrower-facing app.

## The problem

The pipeline lived in **spreadsheets and manual review**. Underwriters opened every PDF by hand; borrowers had no single place to apply or see status. Turnaround was slow, validation was inconsistent, and nothing scaled as volume grew.

## What I shipped

- **Borrower experience** — Applications, uploads, and loan tracking through APIs consumed by the web app.
- **Team portal** — Pipeline, documents, stages, and checklists so ops can move loans forward without losing context.
- **AI-assisted review** — Documents are indexed and validated through an **event-driven flow** (Pub/Sub): this service publishes work, worker services run OCR / LLMs / retrieval, and structured results come back for **human-in-the-loop** decisions (AI suggestion + reviewer sign-off).
- **Property intelligence** — Aggregated data from multiple listing / analytics providers with a **single merged model** for sizing and underwriting checks.
- **Quotes & term sheets** — Logic to combine assumptions, options, and dynamic fields into structures the team can approve and push downstream.
- **Production posture** — Async SQLAlchemy 2, Alembic, encrypted sensitive fields, observability (OpenTelemetry → Logfire), environment-aware config, and **Cloud Run** deployment.

## Architecture (at a glance)

- **Hexagonal / clean layout** — Domain and application services stay independent of FastAPI and the database; repositories implement ports so storage (e.g. **GCS** vs **Google Drive**) and messaging can be swapped or faked in tests.
- **Async end-to-end** — FastAPI + async SQLAlchemy + async HTTP to third parties, with retries and sensible handling of rate limits and failures.
- **Read-heavy dashboards** — Heavy loan summaries are backed by a **materialized view** so tables stay fast as checklists and stages grow.

## Stack

Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2 (async), PostgreSQL 17 + **pgvector**, Alembic, Google **Cloud Run**, **Pub/Sub**, Cloud Storage / Drive, OpenAI / Gemini / Claude (via worker pipeline), LLMWhisperer for document extraction, Docker, OpenTelemetry.

## Result

**Spreadsheets are gone** for core loan ops. Reviewers focus on **exceptions** instead of re-reading every file from scratch. Borrowers get one **auditable path** from application through underwriting.

[Live product — malamafunding.com](https://malamafunding.com)
