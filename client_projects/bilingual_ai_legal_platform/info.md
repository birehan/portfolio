---
title: "Al-Shalawi — Bilingual AI Legal Platform"
slug: bilingual-ai-legal-platform
role: Full-Stack AI Developer
summary: "A bilingual (Arabic/English) legal SaaS for a Saudi law firm with a RAG document drafter, WhatsApp bot, case management, and Hijri/Gregorian dates."
outcome: "Drafting cut from hours to minutes. Replaced spreadsheets and WhatsApp groups with one system."
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

Bilingual AI Legal Platform: RAG Document Drafter + WhatsApp Bot
My role. Full-Stack AI Developer

Project description.

The problem: a Saudi law firm managed cases, contracts, and client comms across spreadsheets and WhatsApp in two languages. Drafting contracts took hours.

What I built: a bilingual (Arabic/English) legal platform. Core AI: a RAG document drafter (OpenAI + pgvector) pulling context from the firm's own case files, plus a WhatsApp AI bot for client intake. Includes case management, contracts, court scheduling, GPS attendance, Sheets sync. Full RTL + Hijri support.

Result: drafting cut from hours to minutes.

Stack: Next.js, FastAPI, PostgreSQL + pgvector, OpenAI, GCP
Skills and deliverables

Artificial Intelligence
Retrieval Augmented Generation
OpenAI API
Legal
Full-Stack Development


deployed link
https://cms.alshalawilaw.com



# Al-Shalawi — Legal Practice Management Platform

> A bilingual (Arabic / English), production-grade SaaS that runs the day-to-day
> operations of a Saudi law firm — cases, clients, contracts, court sessions,
> attendance, AI legal drafting, WhatsApp automation, and a generic
> multi-channel alerting engine.

**Role:** Full-stack engineer — designed the architecture, built the backend,
the frontend, the CI/CD pipeline, the AI layer, and the WhatsApp integration.

**Status:** Deployed to production on Google Cloud Run (staging + prod
environments).

---

## Snapshot

| | |
|---|---|
| **Backend** | FastAPI (Python 3.12), SQLAlchemy 2.0 async, PostgreSQL 17 + pgvector |
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript 5, Ant Design 6, Zustand |
| **AI** | OpenAI (`gpt-4o` / `gpt-4o-mini`) with token-budgeted context, tiktoken, function calling |
| **Messaging** | WhatsApp Business Cloud API, SMTP, SMS, generic webhooks |
| **Infra** | Google Cloud Run, Cloud Build, Artifact Registry, Secret Manager, Cloud Logging |
| **Observability** | Sentry (backend + frontend with replay), OpenTelemetry, structured JSON logs |
| **Code size** | ~25,000 LOC Python · ~33,000 LOC TypeScript · 36 DB migrations · 16 feature modules |
| **Languages** | Arabic (RTL) and English with Hijri ↔ Gregorian date conversion |

---

## What it actually does

Al-Shalawi is the operational backbone for a law firm. It replaces a stack of
spreadsheets, WhatsApp groups, and disconnected reminders with a single
system that knows about every client, case, contract, attorney, court date,
and deadline.

### Core feature modules (16)

1. **Users & Auth** — JWT (access + refresh), Google OAuth, email verification,
   password reset, role-based access (Super Admin / Admin / Attorney / Paralegal /
   Legal Assistant), multi-language user profiles.
2. **Clients** — full CRM with translations, soft relationships to cases/contracts.
3. **Cases** — 11 case types, 8 statuses, 12 lifecycle stages, multilingual
   case names/descriptions, lead-attorney assignment, indexed for search.
4. **Contracts** — employment / attorney-fee / other; status machine (draft →
   active → expired → renewed); decimal money; renewal tracking.
5. **Court Sessions** — Hijri & Gregorian dates side-by-side, Saudi timezone,
   filtering by attorney, session type, and status.
6. **Power of Attorney (POA)** — issuance, scope, expiry tracking.
7. **Tasks** — assignable, due dates, attorney-scoped or firm-wide.
8. **Attendance** — GPS-based check-in/out with geofencing (haversine
   distance against `OfficePlace` polygons), per-day / per-week / per-month
   summaries, admin overview.
9. **Office Places** — managed locations with center coordinates and an
   `allowed_radius_meters` for the geofence.
10. **Notes** — with `@mentions` of users.
11. **Files** — uploads to Google Cloud Storage / Cloudflare R2 (S3-compatible).
12. **Notifications** — in-app notification center.
13. **Dashboard** — aggregated KPIs (case distribution, upcoming sessions,
    open tasks, contract expirations) — admin-wide or scoped to the
    requesting attorney.
14. **Legal Chat (AI)** — see *AI Layer* below. Drafts legal documents in
    Arabic or English with the firm's reference corpus.
15. **WhatsApp Bot** — see *WhatsApp Integration* below.
16. **Alerting Engine** — see *Alerting Engine* below.

Two infrastructure modules also exist:
- **Google Sheets sync** — dual-tab (English / Arabic) live mirror of court
  sessions, with weekday-coloured rows and dual-calendar formatting.
- **Webhooks** — inbound webhook router for third-party integrations.

---

## Architecture highlights

### Backend layout — feature-sliced, not framework-sliced

Each feature is a self-contained module with the same shape, which makes the
codebase predictable to navigate and easy to extend:

```
app/features/<feature>/
    models.py        # SQLAlchemy 2.0 declarative models
    schemas.py       # Pydantic v2 request/response DTOs
    repository.py    # Pure data access (no HTTP, no business logic)
    service.py       # Business logic, transactions
    routes.py        # FastAPI routers (HTTP boundary only)
    dependencies.py  # DI providers (auth, db sessions, scoped queries)
    constants.py     # Messages, configs, enums
```

The same shape is used for the more complex features (alerting, legal_chat,
whatsapp), with sub-packages for `ai/`, `dispatch/channels/`,
`workers/`, etc.

### Async-first, transaction-aware

- Pure-ASGI middleware (not `BaseHTTPMiddleware`) so SQLAlchemy async sessions
  don't get split across asyncio tasks — a real issue documented in
  `fastapi/discussions/8424` and worked around correctly here.
- Row-level `SELECT ... FOR UPDATE` locks where it matters (e.g. preventing
  concurrent message sends in a chat session).
- Lazy relationships are `lazy="noload"` by default — relationships are
  loaded *explicitly* in repositories rather than implicitly, eliminating the
  N+1 problem at the type level.

### Configuration

`pydantic-settings` driven with **four environment classes**:
`DevConfig`, `TestConfig`, `StagingConfig`, `ProdConfig` — each binds a
different `DATABASE_URL` / `FRONTEND_URL` / observability profile. Selection
happens via a single `ENVIRONMENT` env var; the rest is wiring.

### Error handling

Five layered exception handlers in FastAPI (HTTPException, AppException,
RequestValidationError, BaseExceptionError, catch-all), all returning a
**single, consistent `ApiResponse` envelope** with stable error codes
(`UNAUTHORIZED`, `FORBIDDEN`, `VALIDATION_ERROR`, `RATE_LIMITED`, …) so the
frontend never has to guess the error shape.

### Observability

- **Sentry** on both backend and frontend (frontend uses session replay).
- **Structured JSON logs** with a `severity` field — natively parsed by
  Google Cloud Logging and Cloud Error Reporting.
- **Per-request `request_id`** propagated to logs, response headers
  (`X-Request-ID`), and Sentry tags for end-to-end tracing.
- **OpenTelemetry** instrumentation for FastAPI, SQLAlchemy, requests, and
  aiohttp (Logfire-compatible).
- **Health & readiness endpoints** (`/health`, `/ready`) — `/ready` actually
  pings the database.
- **Optional Telegram alerts** for production incidents.

---

## AI Layer — Legal Chat

A multi-turn assistant that drafts legal documents (powers of attorney,
contracts, claim memos, etc.) in Arabic or English using the firm's own
reference corpus. The implementation is more interesting than "call OpenAI in
a loop":

- **Token-budgeted context window** — `tiktoken` counts every message
  against a 128K-token budget (`gpt-4o`), reserves 8K for the response, keeps
  the most recent N turns verbatim, and summarises the rest. Reference
  documents and the system prompt are accounted for separately. The
  `ContextConfig` dataclass and `ConversationContextManager` make this
  testable and tunable.
- **Structured outputs** — every LLM call returns a Pydantic-validated
  `AIStructuredResponse` with `response_type`, `message`, optional
  `document` body, `document_title`, plus AI-detected `document_type` and
  `case_category` enums.
- **Application-level retry** for malformed JSON (up to 2 retries on
  `LLMParseError`, on top of the OpenAI client's own retries).
- **Document-context state machine**: AI proposes type/category → user
  confirms → references load. Encoded explicitly in `_handle_context_detection`
  and documented with an ASCII diagram inline.
- **Per-session reference exclusions** — admins curate a global reference
  corpus (legal templates, statutes); end-users can exclude individual
  references from a given drafting session, and the exclusions persist on
  the session row.
- **File extraction without disk writes** — PDF (PyMuPDF + pdfplumber),
  DOCX (python-docx), images (Tesseract OCR), TXT — all extracted from
  bytes in-memory with a 100K-char hard cap to prevent token explosions.
- **Export to DOCX or PDF** via `python-docx` and `reportlab`, with proper
  Arabic font handling.
- **Hard fallback path** — if the LLM call fails after retries, an apology
  message is persisted in the conversation so state stays consistent.
- **Per-session message cap** (200) prevents runaway API spend.

---

## WhatsApp Integration

A real, signed-webhook integration with the Meta WhatsApp Business Cloud API
— not a polling hack:

- **HMAC-SHA256 signature verification** on every inbound webhook
  (`X-Hub-Signature-256`), with constant-time comparison.
- **Phone-number authorization** — only numbers that match a registered user
  can interact with the bot.
- **Per-number sliding-window rate limiter** (in-memory; pluggable for Redis
  at scale) with a periodic cleanup task evicting stale buckets every hour.
- **Input sanitization** to block prompt injection and oversized payloads.
- **TTL-aware pending confirmations** — when the bot extracts a court session
  from a Najiz notification it sends an interactive confirm/cancel button;
  pending confirmations expire if the user doesn't respond.
- **Session-aware AI** — the chatbot receives the full 1-hour session
  history and uses OpenAI **function calling** to deterministically pick
  between two actions: "extract & confirm a session" or "show next 5 court
  sessions".
- **Najiz date parsing** — Saudi court notifications come in Hijri with
  Arabic AM/PM markers ("`مساءً`" / "`صباحاً`"); the parser normalises
  English/Arabic time formats and converts Hijri → Gregorian → UTC.

---

## Alerting Engine

A **generic, source-agnostic** alerting subsystem. Today it watches
contracts, but the data model and the `SourceRegistry` make it trivial to
plug in cases, court sessions, POAs, or anything else with a date field.

### Concept

- **`AlertConfig`** — declarative rule: *"For every active contract, send a
  reminder 30/14/7/3/1/0 days before `expiration_date`, at 09:00, via Email
  + WhatsApp, to the responsible attorney + a fixed admin address."*
- **`AlertSchedule`** — the materialised send queue. A daily worker
  re-generates the next 30 days from active configs; deduplication is
  enforced by a unique constraint on
  `(config, source, days_before, channel, recipient)`.
- **`AlertLog`** — full audit trail of every send, with the rendered
  template snapshot, channel response, status, and error.
- **`MessageTemplate`** — Jinja2 templates with bilingual variants (English
  + Arabic) per source/channel; configurable variables exposed to the UI.
- **`ChannelCredential`** — per-user channel credentials, encrypted at rest
  with **AES-GCM** (`cryptography.Fernet`-style envelope via the project's
  `EncryptionService`); a unique `(user, name)` index prevents duplicates.

### Pipeline

```
SourceRegistry → query records → calc days_remaining
            → load template → render Jinja2 (subject + body + body_html)
            → load + decrypt credentials
            → ChannelAdapter.send(...)         (email / whatsapp / sms / webhook)
            → mark sent or failed
            → AlertLog row written
```

### Worker

`APScheduler` runs **two background jobs** inside the FastAPI lifespan:
- `process_due_alerts` — every 60 s, picks up to 100 due schedules, dispatches
  them, marks sent/failed, commits.
- `regenerate_schedules` — daily at 02:00 UTC, scans active configs, and
  generates the next 30 days of schedules.

Both jobs are wrapped in their own `AsyncSessionFactory` context with
proper rollback on exceptions, and `max_instances=1` prevents overlapping
runs.

---

## Frontend highlights

- **Next.js 16 App Router** with the **`[locale]`** dynamic segment so every
  route is bilingual at the URL level (`/en/cases`, `/ar/cases`).
- **Server-side auth gate** in `middleware.ts` — checks the `auth_token`
  cookie *before* HTML is sent, killing the post-hydration redirect flash
  that plagues client-only auth.
- **Locale auto-detection** — cookie → `x-vercel-ip-country` (Arabic
  countries → AR) → `Accept-Language` → fallback EN.
- **RTL** wired at the `<html dir>` level so Ant Design components flip
  automatically.
- **Hijri date pickers** (`react-multi-date-picker` + custom wrappers) and
  bilingual date display (`<HijriDate />`).
- **Zustand stores** for auth and the legal chat session.
- **i18next** with 1,124 translation keys per locale (English + Arabic).
- **Sentry session replay** at 10% sampling, 100% on errors.
- **Google Maps** integration for office geofence configuration.
- **18 typed API services** (`auth`, `cases`, `clients`, `contracts`,
  `court-session`, `legalChat`, `alerting`, `attendance`, …) all sharing
  one Axios client with interceptors for auth and the standard
  `ApiResponse` envelope.
- **55 React components** organised by feature, plus a typed `withAuth` HOC
  for protected pages and a custom `DashboardLayout` with a sidebar,
  notification bell, and a check-in button that hits the attendance API
  with the device's geolocation.

---

## DevOps / Infrastructure

### Deployment topology

| Service | Where | Region |
|---|---|---|
| Backend (staging) | Cloud Run (`alshalawi-backend-staging`) | `europe-west3` |
| Backend (prod) | Cloud Run (`alshalawi-backend-prod`), min 1 / max 10 instances | `europe-west3` |
| Frontend (staging) | Cloud Run (`alshalawi-frontend-staging`) | `us-central1` |
| Frontend (prod) | Cloud Run (`alshalawi-frontend-production`), min 0 / max 3 | `us-central1` |
| Database | Managed PostgreSQL 17 (with `pgvector` extension) | — |
| Container registry | Google Artifact Registry (Docker) | — |
| Secrets | Google Secret Manager (~20 secrets per env) | — |

### CI/CD

Two `cloudbuild-{staging,prod}.yaml` files per repo. The pipeline is **idempotent
and self-bootstrapping**:

1. Enables the required GCP APIs (`run`, `secretmanager`, `artifactregistry`,
   `cloudbuild`, `iam`, `compute`, `containerregistry`).
2. Creates the Artifact Registry repo if it doesn't exist.
3. Grants Cloud Build SA the IAM roles it needs (`run.admin`,
   `iam.serviceAccountUser`, `artifactregistry.writer`) and grants the Cloud
   Run runtime SA `secretmanager.secretAccessor` — all `--condition=None`.
4. Authenticates Docker against Artifact Registry.
5. Builds with **BuildKit** (`DOCKER_BUILDKIT=1`, inline cache) and tags
   both `:$COMMIT_SHA` and `:latest`.
6. **Verifies that all required secrets exist** in Secret Manager before
   deploying — fails fast with a clear error message listing missing secrets.
7. Deploys to Cloud Run with `--set-secrets=NAME=NAME:latest` for every
   credential, plus `--set-env-vars` for non-secret config.

The whole pipeline runs unattended from a Git push.

### Containerisation

- **Backend Dockerfile** uses the upstream `astral-sh/uv` image, mounts the
  uv cache and the lockfile to keep layers cacheable, pre-warms the
  `tiktoken` `gpt-4o` encoding into a baked-in `TIKTOKEN_CACHE_DIR` so the
  container never reaches out to the network at startup, and copies the
  app in a separate layer for fast iteration.
- **Frontend Dockerfile** is a 3-stage build (`deps` → `builder` →
  `runner`), uses Next's `output: 'standalone'`, ships under a non-root
  `nextjs:nodejs` user.

### Database

- **PostgreSQL 17 + pgvector** (vector extension is wired in even if not yet
  used in the AI chat, so the path to RAG is open).
- **36 Alembic migrations** — real iterative schema evolution, not a single
  `create_all`.
- **Async driver** (`asyncpg`) with a tuned pool: `pool_size=20`,
  `pool_recycle=900s`, `max_overflow=10`, `pool_timeout=30s`.
- Heavy use of indexes (every `models.py` has 5–10 named indexes covering
  the actual query patterns used by the repositories).

---

## Security

- **JWT** access tokens + **refresh tokens** with configurable TTLs.
- **bcrypt** password hashing (`PASSWORD_HASH_ROUNDS=12`).
- **AES-GCM at-rest encryption** for third-party channel credentials in the
  alerting engine.
- **HMAC-SHA256** signature verification on WhatsApp webhooks.
- **CORS** locked to explicit origins (Cloud Run rejects `*` with
  `allow_credentials=True`); per-environment override for staging.
- **Rate limiting** on the WhatsApp bot per phone number.
- **Input sanitisation** to block prompt injection on AI-routed inputs.
- **Secret Manager** for everything sensitive — no secrets in env files
  in production.
- **Server-side auth gate in Next.js middleware** so protected pages never
  render before the cookie check.
- **Pre-commit hooks** (`pre-commit`, `ruff`, `pyright`, `mypy`).

---

## Tooling

| Layer | Tools |
|---|---|
| Language servers | `mypy`, `pyright`, `tsc` |
| Linting / formatting | `ruff` (28 rule families enabled), `eslint`, `prettier` |
| Package management | `uv` (Python), `npm` (Node) |
| Testing | `pytest`, `pytest-asyncio`, `httpx` test client, dockerised test DB |
| DB migrations | Alembic |
| Background jobs | APScheduler (in-process) |
| Container builds | Docker + BuildKit |
| Pre-commit | `pre-commit` framework |

---

## Skills demonstrated

**Backend / API design**
- FastAPI, async SQLAlchemy 2.0, Pydantic v2, dependency injection
- Domain-driven feature slicing
- Transactions, row-level locking, deduplication via unique constraints
- Pure ASGI middleware (not `BaseHTTPMiddleware`)
- Layered exception handling with stable error codes

**Database**
- PostgreSQL 17, pgvector, JSONB, indexed query design
- Alembic migration discipline (36 migrations, real evolution)
- Async connection pooling

**AI / LLM engineering**
- OpenAI API (chat completions + function calling)
- Token-budgeted context windows with `tiktoken`
- Structured outputs validated with Pydantic
- Application-level retries on parse failures
- Conversation summarisation strategies
- Prompt-injection defence

**Messaging / integrations**
- WhatsApp Business Cloud API (signed webhooks, interactive buttons)
- SMTP (`aiosmtplib`), SMS, generic outbound webhooks
- Google OAuth, Google Sheets API v4 (dual-tab live sync)
- Cloudflare R2 / Google Cloud Storage object uploads

**Frontend**
- Next.js 16 App Router, React 19, TypeScript 5
- Server-side middleware auth, i18n + RTL
- Ant Design 6, Zustand state, Axios with interceptors
- Hijri/Gregorian date pickers, Google Maps for geofencing
- Sentry replay

**Infrastructure / DevOps**
- Google Cloud Run (multi-environment, multi-region)
- Cloud Build pipelines that bootstrap their own IAM and secrets
- Artifact Registry, Secret Manager
- Multi-stage Dockerfiles, BuildKit cache mounts, distroless-style hardening
- Structured JSON logging for Cloud Logging
- OpenTelemetry, Sentry, optional Telegram incident alerts

**Domain knowledge**
- Saudi legal workflow (Najiz court notifications, POA, attorney roles)
- Hijri ↔ Gregorian conversion + Saudi (`Asia/Riyadh`) timezone
- Bilingual UX (Arabic RTL + English LTR) at the URL, content, and date level

---

## What makes it production-ready

1. **Multi-environment configuration** with strict `pydantic-settings`
   classes and a `Verify Secrets` step that fails the pipeline if any
   required secret is missing.
2. **Self-bootstrapping CI/CD** — a fresh GCP project goes from `git push`
   to running service without manual gcloud commands.
3. **Health & readiness endpoints** that actually exercise the database.
4. **Structured logging + Sentry + OpenTelemetry + per-request IDs** —
   debuggability is built in, not bolted on.
5. **Graceful degradation** — LLM failures persist a fallback message;
   alert dispatcher logs failures and retries; per-feature error envelopes
   keep the API contract stable under exceptions.
6. **Resource caps** — per-session message limit (200), per-file char cap
   (100K), max upload size, sliding-window rate limit, OpenAI token budget,
   Cloud Run min/max instances, DB pool size + recycle.
7. **Security defaults** — encrypted credentials, signed webhooks, server-
   side auth gate, Secret Manager, scoped IAM, non-root containers.
8. **Idempotent worker design** — APScheduler `max_instances=1`, unique
   constraints on alert schedules, `FOR UPDATE` locks on chat sessions.
9. **Background-task hygiene** — periodic cleanup of in-memory rate-limit
   and pending-confirmation buckets so the process doesn't grow unbounded.
10. **Bilingual at every layer** — DB (`*_translations` tables), service
    layer (language-aware date formatting and AI prompts), frontend (i18n
    + RTL + locale-prefixed routes).

---

## Project stats

- **16** business feature modules
- **36** Alembic database migrations
- **18** typed frontend API services
- **55** React components
- **1,124** translation keys × 2 languages
- **~25,000** lines of Python
- **~33,000** lines of TypeScript / TSX
- **2** runtime environments deployed (staging + production)
- **2** background jobs running every minute / every day

---

## Stack at a glance

```
Runtime:        Python 3.12 · Node 20 · PostgreSQL 17
Backend:        FastAPI · SQLAlchemy 2.0 (async) · Pydantic v2 · Alembic
                APScheduler · uv · pyjwt · passlib[bcrypt] · cryptography
AI:             openai · tiktoken · pdfplumber · PyMuPDF · python-docx
                · reportlab · pytesseract
Cloud:          google-cloud-storage · boto3 (R2) · google-auth · aiosmtplib
Frontend:       Next.js 16 · React 19 · TypeScript 5 · Ant Design 6
                · Zustand · i18next · Axios · @sentry/nextjs
                · @react-google-maps/api · react-multi-date-picker
Observability:  Sentry · OpenTelemetry · Logfire · Cloud Logging
Deploy:         Google Cloud Run · Cloud Build · Artifact Registry
                · Secret Manager · Docker (BuildKit, multi-stage)
```