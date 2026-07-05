---
title: "Al-Shalawi — Bilingual AI Legal Platform"
slug: bilingual-ai-legal-platform
role: Full-Stack AI Developer
summary: "Bilingual (Arabic/English) legal SaaS for a Saudi firm: RAG-backed contract drafting, WhatsApp intake, case and court workflows—with RTL UI and Hijri/Gregorian dates built in."
outcome: "Drafts that used to take hours land in minutes; cases and client comms live in one product instead of spreadsheets and side threads."
stack:
  - Next.js 16
  - React 19
  - FastAPI
  - PostgreSQL + pgvector
  - OpenAI (gpt-4o)
  - WhatsApp Business Cloud API
  - Google Cloud Run
  - Sentry
links:
  live: https://cms.alshalawilaw.com
featured: true
order: 2
date: 2025
---

# Al-Shalawi — Bilingual AI Legal Platform

> **Al-Shalawi Law (Saudi Arabia)** — a bilingual **Arabic / English** practice platform I built end-to-end: **Next.js** app (RTL, Hijri + Gregorian dates), **FastAPI** backend, **PostgreSQL + pgvector**, and production deploy on **Google Cloud Run**. The product covers cases, clients, contracts, court sessions, tasks, file storage, notifications—and two differentiating pieces: **RAG legal drafting** and a **WhatsApp Business** assistant.

## The problem

The firm ran day-to-day work across **spreadsheets, ad hoc WhatsApp threads, and disconnected tools**. Contract drafting took **hours**, court and client context was hard to share, and **Arabic and English** (plus **Hijri** dates) had to stay accurate in one place—not patched together per document.

## What I shipped

- **Practice operations** — Clients, cases (types, statuses, lifecycle), contracts with renewals, court sessions (dual calendar), powers of attorney, tasks, attendance with office geofences, files (GCS / R2), in-app notifications, dashboards.
- **Legal Chat (AI)** — Multi-turn assistant that drafts firm documents in **Arabic or English** using a **RAG** pipeline over the firm’s own reference corpus (**OpenAI** + **pgvector**). Token-budgeted context, structured outputs (Pydantic), in-memory extraction from PDF/DOCX/images, and export to DOCX/PDF with Arabic typography handled.
- **WhatsApp integration** — **Meta WhatsApp Cloud API** with signed webhooks, authorized phone numbers, rate limits, and function-calling flows so staff can confirm structured actions (e.g. court session capture from **Najiz**-style messages) without leaving chat.
- **Alerting** — Configurable reminders (e.g. contract expiry windows) across channels (email, WhatsApp, etc.) with schedules, deduplication, and an audit log.
- **Integrations** — **Google Sheets** mirror for court sessions (dual-language tabs), inbound webhooks, SMTP/SMS hooks.
- **Quality & ops** — Sentry (backend + frontend), structured logging, health/readiness, staged **staging / prod** configs.

## Architecture (at a glance)

```
Next.js app (RTL · Hijri/Greg)      WhatsApp Business Cloud API
       |  REST                             |  signed webhooks
       v                                   v
        FastAPI  (feature-sliced · async SQLAlchemy 2)
       |                  |                        |
       v                  v                        v
Legal Chat (RAG)     Practice ops           Alerting · Sheets
OpenAI + pgvector   cases · contracts       reminders · court
token-budgeted ctx   · court sessions        mirror
       v
PostgreSQL 17 + pgvector  ·  GCS / R2 files
```

- **Feature-sliced backend** — Each domain (`cases`, `contracts`, `legal_chat`, `whatsapp`, …) owns models, repositories, services, and routes so the API stays navigable as the product grew.
- **Async SQLAlchemy 2** — Async sessions end-to-end; careful transaction boundaries for chat and outbound sends.
- **Consistent API errors** — Single response envelope and stable error codes so the Next.js client can rely on one pattern.

## Stack

**Frontend:** Next.js 16 (App Router), React 19, TypeScript, Ant Design, Zustand.  
**Backend:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2 async, Alembic, PostgreSQL 17 + **pgvector**.  
**AI:** OpenAI (`gpt-4o` / `gpt-4o-mini`), tiktoken, function calling.  
**Infra:** Google Cloud Run, Cloud Build, Secret Manager, Cloud Logging; **Sentry**; optional OpenTelemetry.

## Evaluation & how I verified quality

- **Grounded drafting** — The assistant answers only from the firm's own reference corpus; retrieved chunks are token-budgeted and returned as structured (Pydantic) outputs, so drafts trace back to source instead of free-form hallucination.
- **Bilingual correctness** — Arabic/English and Hijri/Gregorian output was validated on real firm documents, with Arabic typography and RTL layout checked in the exported DOCX/PDF.
- **Safe actions** — WhatsApp function-calling flows require staff to confirm structured actions before anything is written, and every send is rate-limited and audit-logged.

## Result

**Drafting dropped from hours to minutes** for many document types. Cases, courts, contracts, and client comms **live in one bilingual system** instead of scattered sheets and informal threads—with **RTL** and **Hijri** treated as first-class, not bolted on.

[Live app — cms.alshalawilaw.com](https://cms.alshalawilaw.com)
