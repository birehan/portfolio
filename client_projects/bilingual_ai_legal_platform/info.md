---
title: "Al-Shalawi: Bilingual AI Legal Platform"
slug: bilingual-ai-legal-platform
role: Full-Stack AI Developer
summary: "Bilingual (Arabic/English) legal SaaS for a Saudi firm: RAG-backed contract drafting, WhatsApp intake, and case/court workflows, with RTL UI and Hijri/Gregorian dates built in."
outcome: "Drafts that took hours now land in minutes; cases and client comms live in one product instead of spreadsheets and side threads."
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

# Al-Shalawi: Bilingual AI Legal Platform

> A bilingual **Arabic / English** practice platform for **Al-Shalawi Law (Saudi Arabia)**, built end-to-end: **Next.js** app (RTL, Hijri + Gregorian dates), **FastAPI** backend, **PostgreSQL + pgvector**, deployed on **Google Cloud Run**. It covers cases, clients, contracts, court sessions, tasks, files, and notifications, plus two standout pieces: **RAG legal drafting** and a **WhatsApp** assistant.

## The problem

The firm ran on spreadsheets, ad hoc WhatsApp threads, and disconnected tools. Contract drafting took hours, context was hard to share, and Arabic/English plus Hijri dates had to stay accurate in one place.

## What I shipped

- **Practice operations:** clients, cases, contracts with renewals, court sessions (dual calendar), powers of attorney, tasks, attendance with geofences, files (GCS / R2), notifications, and dashboards.
- **Legal Chat (AI):** multi-turn assistant that drafts firm documents in Arabic or English via a **RAG** pipeline over the firm's corpus (**OpenAI** + **pgvector**), with token-budgeted context, structured outputs (Pydantic), extraction from PDF/DOCX/images, and DOCX/PDF export with Arabic typography.
- **WhatsApp integration:** Meta Cloud API with signed webhooks, authorized numbers, rate limits, and function-calling flows so staff confirm structured actions without leaving chat.
- **Alerting:** configurable reminders (e.g. contract expiry) across channels, with schedules, deduplication, and an audit log.
- **Integrations:** Google Sheets mirror for court sessions, inbound webhooks, SMTP/SMS hooks.
- **Quality & ops:** Sentry (backend + frontend), structured logging, health/readiness checks, staged staging/prod configs.

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

- **Feature-sliced backend:** each domain (`cases`, `contracts`, `legal_chat`, `whatsapp`) owns its models, repositories, services, and routes.
- **Async SQLAlchemy 2:** async sessions end-to-end, with careful transaction boundaries for chat and outbound sends.
- **Consistent API errors:** a single response envelope and stable error codes the Next.js client can rely on.

## Stack

**Frontend:** Next.js 16 (App Router), React 19, TypeScript, Ant Design, Zustand.
**Backend:** Python 3.12, FastAPI, Pydantic v2, SQLAlchemy 2 async, Alembic, PostgreSQL 17 + **pgvector**.
**AI:** OpenAI (`gpt-4o` / `gpt-4o-mini`), tiktoken, function calling.
**Infra:** Google Cloud Run, Cloud Build, Secret Manager, Cloud Logging; **Sentry**; optional OpenTelemetry.

## Evaluation & how I verified quality

- **Grounded drafting:** the assistant answers only from the firm's corpus; retrieved chunks are token-budgeted and returned as structured (Pydantic) outputs, so drafts trace back to source.
- **Bilingual correctness:** Arabic/English and Hijri/Gregorian output was validated on real firm documents, with typography and RTL layout checked in exported DOCX/PDF.
- **Safe actions:** WhatsApp flows require staff to confirm structured actions before anything is written, and every send is rate-limited and audit-logged.

## Result

Drafting dropped from hours to minutes for many document types. Cases, courts, contracts, and client comms live in one bilingual system, with RTL and Hijri treated as first-class rather than bolted on.

[Live app: cms.alshalawilaw.com](https://cms.alshalawilaw.com)
