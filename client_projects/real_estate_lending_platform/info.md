---
title: "AI Underwriter: Real Estate Lending Platform"
slug: real-estate-lending-platform
role: Backend AI Engineer
summary: "Full-stack lending product for Malama Funding: AI-assisted document checks, an internal review pipeline, and a borrower app, all in one workflow instead of spreadsheets and ad hoc files."
outcome: "Reviewers spend time on exceptions, not every file; borrowers get one place to apply, upload, and track status."
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

# AI Underwriter: Real Estate Lending Platform

> AI-assisted underwriting for private real-estate loans (DSCR, fix-and-flip, bridge, new construction) at **Malama Funding**. I owned the **Python / FastAPI backend**: document intake, event-driven AI validation, property data, quotes, and the APIs behind both the internal team portal and the borrower app.

## The problem

The pipeline lived in spreadsheets and manual review. Underwriters opened every PDF by hand, borrowers had no single place to apply or see status, and nothing scaled as volume grew.

## What I shipped

- **Borrower experience:** applications, uploads, and loan tracking through APIs consumed by the web app.
- **Team portal:** pipeline, documents, stages, and checklists so ops can move loans forward without losing context.
- **AI-assisted review:** documents are indexed and validated through an event-driven flow (Pub/Sub), where worker services run OCR / LLMs / retrieval and return structured results for human-in-the-loop decisions (AI suggestion + reviewer sign-off).
- **Property intelligence:** aggregated data from multiple listing/analytics providers merged into a single model for sizing and underwriting checks.
- **Quotes & term sheets:** logic that combines assumptions, options, and dynamic fields into structures the team can approve and push downstream.
- **Production posture:** async SQLAlchemy 2, Alembic, encrypted sensitive fields, observability (OpenTelemetry to Logfire), environment-aware config, and Cloud Run deploy.

## Architecture (at a glance)

```
Borrower app  ·  Team portal
       |  REST (async FastAPI)
       v
   Core API ---publish--->  Pub/Sub  --->  Worker pool
       ^                              (OCR · LLM · retrieval)
       |                                     |
       +-------- structured results <--------+
       v
PostgreSQL + pgvector  ·  materialized views  ·  GCS / Drive
```

- **Hexagonal / clean layout:** domain and application services stay independent of FastAPI and the database; repositories implement ports so storage (GCS vs Google Drive) and messaging can be swapped or faked in tests.
- **Async end-to-end:** FastAPI + async SQLAlchemy + async HTTP to third parties, with retries and sensible rate-limit and failure handling.
- **Read-heavy dashboards:** heavy loan summaries are backed by a materialized view so tables stay fast as checklists and stages grow.

## Stack

Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2 (async), PostgreSQL 17 + **pgvector**, Alembic, Google **Cloud Run**, **Pub/Sub**, Cloud Storage / Drive, OpenAI / Gemini / Claude (via worker pipeline), LLMWhisperer for document extraction, Docker, OpenTelemetry.

## Evaluation & how I verified quality

- **Extraction checked field-by-field:** OCR/LLM output was validated against known loan files, with low-confidence extractions flagged for reviewer sign-off instead of auto-accepted.
- **Human-in-the-loop by design:** every AI validation emits a suggestion plus a confidence signal, and a reviewer approves or overrides it, so the model never silently drives a decision.
- **Idempotent, replayable pipeline:** because validation runs on Pub/Sub, updated or failed documents can be re-published and re-scored without corrupting prior state, making it safe to iterate on prompts and rules in production.

## Result

Spreadsheets are gone for core loan ops. Reviewers focus on exceptions instead of re-reading every file, and borrowers get one auditable path from application through underwriting.

[Live product: malamafunding.com](https://malamafunding.com)
