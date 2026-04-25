---
title: "AI Underwriter — Real Estate Lending Platform"
slug: real-estate-lending-platform
role: Backend AI Engineer
summary: "End-to-end lending platform with AI document validation that replaced spreadsheet-driven loan workflows. Reviewers now handle only flagged exceptions."
outcome: "Eliminated spreadsheets entirely; reviewers now handle only flagged exceptions."
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

Real Estate Lending Platform: AI Underwriting Replaces Manual Review
My role. Backend AI Engineer

Project description.

The problem: a real estate lender ran their loan pipeline on spreadsheets and manual document review — slow turnaround, inconsistent validation, no clean handoff between team and borrowers.

What I built: an end-to-end lending platform with three pieces — a team portal for pipeline and document workflows; an AI underwriting engine that validates documents (income, property, ID); and a borrower app for applications, uploads, and loan tracking.

Result: eliminated spreadsheets entirely. Reviewers now handle only flagged exceptions.

Stack: FastAPI, Next.js, AI Agents, LLMs
Skills and deliverables

FastAPI
Next.js
AI Agent Development
LLM Prompt Engineering
AI Chatbot


deployed link

https://malamafunding.com



# AI Underwriter — Backend Platform

> Production backend for **AI Underwriter (LWA)**, an AI-assisted loan underwriting platform for real-estate investors (DSCR, Fix & Flip, BRRRR, New Construction, Bridge loans). The backend orchestrates the full underwriting workflow — from borrower onboarding and document intake to AI-driven document classification, checklist validation, property due-diligence, and term-sheet generation — and ships it to lenders and brokers in real time.

**My role:** Backend AI Engineer.

---

## TL;DR for recruiters

- **Stack:** Python 3.12, FastAPI, SQLAlchemy 2 (async), PostgreSQL 17 + `pgvector`, Alembic, Google Cloud Platform (Cloud Run, Pub/Sub, Cloud Storage, Drive API), OpenTelemetry → Logfire, Docker, `uv`.
- **Scale of code I worked on:** ~480 Python modules across `api/`, `core/domain/`, `core/services/`, and `persistence/` — 28 bounded domain modules, 41 service modules, 60+ admin/borrower endpoints, 30+ SQLAlchemy models.
- **Architecture:** Clean / hexagonal architecture with explicit `domain ↔ service ↔ repository` boundaries, protocol-based dependency injection, and event-driven extensions over Google Cloud Pub/Sub.
- **AI integration:** This backend is the **orchestrator** in a multi-service AI pipeline. It publishes document-indexing and validation events to Pub/Sub and consumes structured LLM results back from worker services running OpenAI / Gemini / Claude / Groq models with `LLMWhisperer` for document OCR and a `pgvector` store for retrieval.
- **Deployed on:** Google Cloud Run (the codebase, logs, and Pub/Sub topics are all environment-aware: `dev` / `staging` / `prod`).

---

## What the product does

Hard-money / private real-estate lenders spend hours per loan reading borrower-uploaded PDFs (bank statements, tax returns, leases, insurance binders, ID, entity docs) to verify checklist items like *"DSCR ≥ 1.20"*, *"liquidity ≥ 6 months PITI"*, or *"property is not in a flood zone"*. **AI Underwriter** automates that:

1. **Borrower portal** — borrower or contact uploads documents through a web app that hits this backend.
2. **Document intake & versioning** — files are stored in **Google Drive** (or **GCS**, switchable per environment) inside a per-loan folder structure; every document gets a typed version with `indexing_status` and `llm_result` columns.
3. **AI indexing pipeline** — on submission, the backend publishes `document.indexing.request.{env}` events to Pub/Sub. A separate worker service (outside this repo) extracts text via `LLMWhisperer`, embeds chunks, and writes them into a `pgvector` store. It then publishes back an `indexing_status_update` event that this backend consumes to flip the document state.
4. **Checklist validation** — for each stage in the loan blueprint (Quote Collection → Underwriting → Closing), the backend publishes `checklist.validation.request.{env}` events containing the question, loan context, and relevant document IDs. A worker LLM returns a structured `ResponseModel { result: bool, reason: str, context: [...] }`. The backend persists it as `ai_result` and routes it to a human reviewer who issues the final `human_result`.
5. **Property due-diligence** — the backend fans out concurrent calls to **SFR Analytics**, **Redfin**, **Zillow**, and **Realtor**, then merges the responses with a deterministic priority rule (`PUBLIC > REDFIN > ZILLOW > REALTOR`) into a unified `PropertyData` model used by the sizer/quote-analysis engine.
6. **Quote analysis & term sheet** — assumptions, options, and dynamic fields are combined into selectable loan structures; admins approve quotes that get pushed into the term-sheet workflow and a Slack channel created per loan.
7. **Real-time collaboration** — every loan inquiry gets a Slack channel, a Drive folder, a tracker timeline, and a materialized-view-backed dashboard for ops.

---

## Architecture

### Clean architecture, enforced

```
app/
├── api/                          # FastAPI HTTP layer (only)
│   ├── v1/
│   │   ├── admin/                # 30+ admin routers (loan ops, contacts, blueprints, ...)
│   │   ├── borrower/             # 14 borrower-facing routers
│   │   ├── loan_products/
│   │   ├── loan_inquiry_checklists.py
│   │   └── dependencies.py       # FastAPI DI — wires Protocols → repository implementations
│   ├── exception_handlers.py     # global, validation, value-error, base-exception handlers
│   ├── middlewares.py            # CORS, request logger, JSON-boolean coercion
│   └── utils.py                  # request body normalization, dataclass introspection
│
├── core/
│   ├── domain/                   # 28 bounded contexts: pure entities + Protocols (no I/O)
│   │   ├── loan_inquiries/       #   - the heart of the product
│   │   ├── borrower/             #   - borrower entity, KYC fields
│   │   ├── document/             #   - DocumentEntity, versions, history
│   │   ├── checklist/            #   - stage checklists, sub-checklists
│   │   ├── blueprint/            #   - loan-stage blueprints
│   │   ├── dynamic_fields/       #   - schema-less typed records (number, date, formula, ...)
│   │   ├── proof_of_funds/, terms/, contacts/, msa/, nearby_properties/, ...
│   │   └── commons/              #   - base entity, exceptions, sessions, generative_models
│   ├── services/                 # 41 application-service modules — orchestration only
│   │   ├── loan_inquiry_services/      # save / get / transition / due-diligence / materialized view
│   │   ├── document_services/          # 64KB doc lifecycle: upload → index → validate → archive
│   │   ├── analytics_services/         # SFR / Zillow / Redfin / Realtor + deterministic merge
│   │   ├── quote_analysis_services/    # assumption × option pricing, investor-view selection
│   │   ├── dynamic_fields_service/     # 25KB schema-less field engine
│   │   ├── authentication_services/    # JWT + OTP + Google OAuth + invitations + role mgmt
│   │   ├── pub_sub_services/           # Pub/Sub abstraction (real + fake bus)
│   │   ├── slack_services/             # 40KB Slack bot integration
│   │   ├── storage_services/           # GCS + Google Drive (full RSA-signed JWT auth, no SDK)
│   │   ├── checklist / blueprint / sizer / target / task / tracker / review / terms / ...
│   │   └── eda/                        # event-driven (commands & events scaffolding)
│   ├── schemas/                  # cross-layer DTOs
│   └── utils/encryption.py       # Fernet field-level encryption for PII
│
├── persistence/sqlalchemy/
│   ├── models/                   # 30+ tables, imperatively mapped to domain entities
│   ├── repository_imp/           # concrete async-repository implementations of domain Protocols
│   ├── alembic.ini               # migrations live in app/persistence/sqlalchemy/migrations
│   ├── connection.py             # async engine with pool_recycle / pool_pre_ping / overflow tuning
│   └── base.py                   # DeclarativeBase with shared async helpers
│
├── schemas/                      # event/command schemas, validation schemas, real-estate models
├── resources/                    # CSV-seeded document types & checklist dependency graph
├── scripts/                      # ops scripts (e.g. regenerate_loan_summary_view.py)
├── opentelemetry_configuration.py
├── logger.py                     # custom logger that flattens `extra={...}` into JSON
├── config.py                     # Dev / Test / Staging / Prod configs via Pydantic
└── main.py                       # init mapper → create_app() → uvicorn entrypoint
```

### Why this layout matters

- **Domain is dependency-free.** Entities and `Protocol` interfaces live in `app/core/domain/*`. Services depend only on protocols. Repositories implement protocols in `persistence/sqlalchemy/repository_imp/`. This is what lets us swap GCS for Drive, real Pub/Sub for `FakeMessageBus`, real LLM result for fake — without touching business logic.
- **One FastAPI dependency per protocol** (`app/api/v1/dependencies.py`). Wiring is centralized and fully type-annotated; testing a route only requires overriding the protocol-level dependency.
- **Imperative SQLAlchemy mapping.** Domain entities are plain dataclasses and are mapped to tables via `MapperRegistry.map_imperatively(...)` in `persistence/sqlalchemy/models/__init__.py`, so the domain is never coupled to ORM metadata.

### Event-driven AI pipeline

```
Borrower upload ──► FastAPI ──► DocumentService
                                       │
                                       ▼  publish_message(topic=DocumentIndexingRequest, ...)
                              Google Cloud Pub/Sub
                                       │
              ┌────────────────────────┴────────────────────────┐
              ▼                                                 ▼
   AI worker (out-of-repo)                            Other downstream consumers
   • LLMWhisperer OCR                                  (notifications, search index)
   • OpenAI / Gemini / Claude / Groq
   • pgvector chunk storage
              │
              ▼ publish_message(topic=DocumentIndexingComplete, ...)
                              Google Cloud Pub/Sub
                                       │
                                       ▼
                       FastAPI Pub/Sub HTTP push endpoint
                              │  (verify_pubsub_token JWT)
                              ▼
                    EventModel.parse_event(...)
                              │
                              ▼
                    Update DocumentVersion.indexing_status / llm_result
                              │
                              ▼
                    Refresh materialized loan summary view
```

Topics are environment-suffixed (`...staging` vs `...prod`) so multiple environments share a single GCP project safely. See `app/schemas/commons/topics.py`.

The same pattern is used for **checklist validation** (`ChecklistValidationRequest` / `ChecklistValidationComplete`) and **real-estate validation** (`RealEstateValidationRequest` / `RealEstateValidationComplete`).

### Read model: PostgreSQL materialized view

Loan dashboards and admin tables would be devastating for transactional tables (multi-stage checklists with sub-checklists, items, statuses, transitions, blueprints, …). Instead, a materialized view `mv_loan_inquiry_summaries` is computed in SQL and refreshed concurrently. There is a dedicated module to refresh by loan ID and a script (`app/scripts/regenerate_loan_summary_view.py`) to rebuild the view definition during deploys when the schema changes.

---

## Selected features I built / contributed to

Each bullet below is real code in the repo, not aspirational. File paths point to where the work lives.

### Core platform

- **Multi-environment config system** — `app/config.py`. A class hierarchy (`BaseConfig` → `DevConfig` / `StagingConfig` / `ProdConfig` / `TestConfig`) with environment-prefixed env vars (`PRODUCTION_DATABASE_URL`, `STAGING_CORS_ORIGINS`, …), strict validation that fails fast in prod (e.g. CORS origins must be set), and a `__call__` hook that injects OpenTelemetry resource attributes per env.
- **Async SQLAlchemy 2 engine with production-grade pool settings** — `app/persistence/sqlalchemy/connection.py`: `pool_pre_ping`, `pool_recycle=300`, conservative `pool_size=2 + max_overflow=5`, 30s timeout, pool sized for Cloud Run cold-starts.
- **Custom JSON-aware logger** — `app/logger.py`: `ExtraFieldsFormatter` flattens `extra={...}` keys into a structured tail so logs work both locally and in Logfire.
- **OpenTelemetry instrumentation** — `app/opentelemetry_configuration.py`: traces + logs exported to **Pydantic Logfire** via OTLP/HTTP, with a custom `FilterSpanProcessor` that drops noisy ASGI internal spans, and auto-instrumentation for FastAPI, SQLAlchemy, aiohttp, and `requests`.

### Authentication & security

- **JWT auth** with separate access and refresh tokens, configurable expiries, OAuth2 password flow.
- **Google OAuth 2.0** end-to-end — `app/core/services/authentication_services/google_auth_service.py` + `app/api/v1/borrower/google_auth.py`. Code exchange, user info verification, Google-ID linking with email fallback, phone-number activation step.
- **Phone OTP activation, reset-password OTP, invitation tokens** — `app/core/services/authentication_services/`.
- **RBAC via `AccessControl`** — role-based dependency in `app/api/v1/dependencies.py` enforced at the endpoint level for `borrower`, `admin`, `superadmin`.
- **Field-level PII encryption** — `app/core/utils/encryption.py`: `EncryptionService` using Fernet with strict key validation (44-char base64) and a fail-fast init in staging/prod (see `EncryptionSettings.validate_encryption_key`).
- **Pub/Sub push-token verification** — `verify_pubsub_token` in `app/api/v1/dependencies.py` validates the Google-issued JWT issuer for inbound webhook events in staging/prod.

### Storage abstraction

- **Pluggable cloud storage** behind `CloudStorageInterface`, with two production implementations:
  - `GoogleCloudStorage` (`app/core/services/storage_services/google_cloud_storage.py`) — RSA-signed JWT bearer auth (no SDK; raw HTTPS) for upload/download, signed URLs.
  - `GoogleDriveStorage` (`app/core/services/storage_services/google_drive_storage.py`, ~24 KB) — full Drive v3 implementation with token caching, folder cache, multipart vs resumable upload threshold (5 MB), URL/ID extraction, sharing.
- **Per-loan folder convention** — files automatically reorganized into `Loan-Inquiry-{display-name}/...` folders; the move is triggered by `move_file_to_loan_inquiry_folder` after an inquiry is created.

### Document & checklist engine

- **DocumentService** (~64 KB, the largest single module): upload → version → submit → request → validate → reject/approve → archive, with a full activity-history trail (`HumanApprovedLoanCheckListActivity`, `RequestedActionEntity`, `SubmittedActionEntity`, …).
- **Document type seeding** from CSV (`app/resources/document_types/document_types.csv`, `document_types_checklists.csv`) so types and their dependency graph for checklist validation are versioned with the code.
- **Stage checklists with sub-checklists** — recursive parent/child checklists rendered in the materialized view, JSONB-indexed.
- **Blueprints** (configurable loan stages) per loan-product type with stage-checklist templates that get instantiated when a loan inquiry is created.

### AI orchestration surface

- **Event schemas** (`app/schemas/validation_schemas.py` and `app/core/services/pub_sub_services/schemas.py`) define the wire contract with the AI workers — `DocumentIndexingCreateEvent`, `ChecklistValidationCreateEvent`, `ResponseModel`, `ContextModel`, etc.
- **Generative-model registry** — `app/core/domain/commons/entities/generative_models_entity.py` types the allowed model identifiers (`AllowedOpenAIModels | AllowedGeminiModels | AllowedClaudeModels`) so the platform can route a request to the correct provider deterministically.
- **Provider keys configured per env** — `LLMApiKeys` and `LLMWhisperApiKeys` in `app/config.py` cover OpenAI, Gemini, Claude, Groq, LlamaCloud, LLMWhisperer, and the indexing vector-store URL.
- **Real-estate provider fan-out** — `app/core/services/analytics_services/union_service.py` (~40 KB) merges four upstream providers concurrently using `asyncio.gather`, with a deterministic priority rule and a `FieldWithSource` wrapper so consumers always know which provider answered for any given field.
- **Resilient HTTP** — every external call goes through `HTTPClient` (`core/services/commons/http_client_with_tenacity.py`): retries with exponential backoff + jitter via `tenacity`, dedicated handling for 429 (`Retry-After`) vs 4xx (terminal) vs 5xx (retryable), JSON/binary auto-detection, async download helper.

### Dynamic / schema-less field engine

`app/core/services/dynamic_fields_service/` (~26 KB service file) powers user-defined fields and records on entity types like `option`, `assumption`, `quote_analysis_result`. It supports `TextRecord`, `NumberRecord`, `DateRecord`, `SingleSelectRecord`, `FormulaRecord`, `UUIDRecord`, with grouping, sorting, and constraint-violation handling. `quote_analysis_service.py` builds on top of this to toggle "selected for quote analysis" / "selected for investor view" across linked option/assumption pairs atomically.

### Slack / Drive automations

- Per-loan Slack channel auto-provisioned with broker, borrower, and lender contacts; updates posted on stage transitions, document uploads, validation results.
- Per-loan Drive folder with a deterministic naming convention based on borrower + property address.

### Operational tooling

- `docker-compose.yml` provides `db` (`pgvector/pgvector:pg17`), `app`, `alembic`, `pgadmin`, and a `test` service. The `alembic` service runs migrations as a one-shot container.
- `pyproject.toml` defines a strict Ruff ruleset (~30 plugin groups including `bandit`, `bugbear`, `comprehensions`, `pyupgrade`, `pydocstyle`, `pep8-naming`, `flake8-use-pathlib`), pytest with coverage gate at **65%**, mypy + pyright config, and `bandit` security scan.
- Pre-commit (`.pre-commit-config.yaml`) — conventional-commits, codespell, ruff, mypy, pyright, plus standard hooks (private-key detection, merge-conflict, YAML check).

---

## Tech stack

| Layer | Tools |
| --- | --- |
| **Language / runtime** | Python 3.12, async I/O end-to-end |
| **Web framework** | FastAPI (`fastapi[standard]>=0.135.1`) |
| **Database** | PostgreSQL 17 + `pgvector` |
| **ORM / migrations** | SQLAlchemy 2 (async, imperative mapping), Alembic, asyncpg |
| **Validation / models** | Pydantic v2, `msgspec` (hot path JSON) |
| **Auth** | PyJWT, bcrypt, Google OAuth 2.0, OTP |
| **Encryption** | `cryptography.fernet` (PII), RSA / SHA-256 (Google service-account JWT signing) |
| **Async HTTP** | `aiohttp`, `httpx`, `tenacity` (retries + backoff + jitter) |
| **Messaging** | Google Cloud Pub/Sub (`google-cloud-pubsub`, `gcloud-aio-pubsub`) |
| **Storage** | Google Cloud Storage, Google Drive API (custom RSA-JWT auth, no SDK) |
| **Observability** | OpenTelemetry (traces + logs), Pydantic Logfire (OTLP/HTTP) |
| **AI providers (config-level)** | OpenAI, Google Gemini, Anthropic Claude, Groq, LLMWhisperer, LlamaCloud |
| **Vector store** | `pgvector` |
| **Containers** | Docker, Docker Compose (dev + alembic + test services) |
| **Deploy target** | Google Cloud Run (`service.instance.id=cloud-run`) |
| **Tooling** | `uv` (dep + venv), Ruff, mypy, pyright, pytest + pytest-asyncio + coverage, bandit, pip-audit, pre-commit |

---

## What makes it production-ready

These are concrete things in the codebase, not nice-to-haves:

1. **Strict environment isolation** — `BaseConfig.get_env()` returns a different concrete config per `ENVIRONMENT` env var; CORS, DB URL, Slack token, SMTP, frontend URL, and Drive folder ID are all environment-prefixed and validated at boot. Production fails to start without `PRODUCTION_CORS_ORIGINS`.
2. **Deterministic startup** — `app/main.py` initializes the SQLAlchemy mapper, builds the FastAPI app, sets up OpenTelemetry, and exits with code 1 on any init exception so Cloud Run will restart instead of running a half-broken instance.
3. **Connection-pool tuning for serverless** — `pool_pre_ping`, `pool_recycle=300`, conservative pool size; designed so cold-start instances on Cloud Run don't exhaust Postgres.
4. **End-to-end tracing & logging** in staging+prod through OpenTelemetry → Logfire, with auto-instrumentation for FastAPI, SQLAlchemy, aiohttp, and `requests`. Custom span filter to drop noise.
5. **Field-level PII encryption** with Fernet, fail-fast key validation in non-dev environments.
6. **Pub/Sub authenticity verification** for inbound webhooks in staging+prod (issuer JWT check).
7. **Idempotent / safe data writes** — repositories support `save_or_update` with `IntegrityError` → `merge` fallback; document submissions create deterministic versions; checklist refreshes go through a single materialized view path with concurrent-refresh fallback.
8. **Graceful external-service degradation** — `tenacity` retries with proper handling of 429/5xx; `union_service` returns `None` when all four real-estate providers fail rather than crashing the request.
9. **Centralized exception handling** — `register_exception_handlers` registers global, validation, value-error, base, and HTTP handlers so the API's error contract is consistent.
10. **CI/quality gates** — coverage gate at 65%, Ruff with ~30 plugin sets, mypy + pyright, bandit (high severity, high confidence), pip-audit, pre-commit on every commit.
11. **Feature flags via environment** — fake implementations of `MessageBus`, `CloudStorage`, and `StorageService` are returned in `TESTING` so end-to-end tests don't hit Pub/Sub or Drive.
12. **Migrations in a dedicated container** — Alembic runs as a one-shot service (`docker compose run --rm alembic upgrade head`), and there's a documented runbook (`docs/sub_checklist_implementation.md`) for materialized-view re-creation during schema changes.

---

## Skills demonstrated

**Backend engineering**
- Designing and shipping async, modular FastAPI services structured around clean / hexagonal architecture
- Async SQLAlchemy 2 with imperative mapping, async repositories, materialized views, and `pgvector`
- Database modeling for complex domains: loans, blueprints, dynamic fields, recursive checklists, audit history, dynamic record types
- Alembic migrations for production schema, plus DDL ops scripts for materialized-view rebuilds

**AI / ML engineering**
- Designing the orchestration contract between a stateful application backend and stateless AI workers
- Event-driven AI pipeline using Google Pub/Sub with versioned, environment-suffixed topics
- Pydantic-typed LLM I/O contracts (`ResponseModel`, `ContextModel`, `MetaDataModel`) for reliable structured responses
- Multi-provider LLM strategy (OpenAI / Gemini / Claude / Groq) and document-OCR strategy (LLMWhisperer / LlamaCloud)
- `pgvector` integration for retrieval-augmented document Q&A
- Human-in-the-loop pattern: AI result + human result columns, reviewer audit trail

**Cloud / DevOps**
- Production deployment to Google Cloud Run with environment-aware config
- Google Cloud Pub/Sub (publishing + push-subscription HTTP consumer with JWT verification)
- Google Cloud Storage and Google Drive API integration *without the official SDK* — implemented service-account JWT signing with `cryptography` (RSA + SHA-256)
- Docker Compose for local dev (`db`, `app`, `alembic`, `pgadmin`, `test`)
- OpenTelemetry → Pydantic Logfire (OTLP/HTTP), custom span filters

**Security**
- JWT auth with refresh-token flow and OTP, Google OAuth 2.0
- RBAC via FastAPI dependency
- Fernet field-level encryption for PII with key validation
- Pub/Sub message authenticity validation
- Bandit + pip-audit in the CI gate

**Code quality / process**
- Strict typing (`mypy` + `pyright`), Ruff with bandit + bugbear + pyupgrade + pydocstyle
- pytest-asyncio test suite with 65% coverage floor
- Pre-commit (conventional-commits + ruff + mypy + pyright + secret detection)
- Domain-driven design with explicit `Protocol`-based interfaces for testability and provider-swapping

---

## Honest limits / gaps

A portfolio piece earns trust when it's specific about what's *not* in scope:

- **The LLM inference itself runs in a sibling service**, not in this repo. This backend is the orchestrator: it decides *what* to ask, ships the request to Pub/Sub, and consumes structured results. The actual prompts, embedding logic, and retrieval pipeline live in a separate worker service.
- **Test coverage exists** (pytest + pytest-asyncio + coverage gate at 65%) and there are tests under `core/services/authentication_services/tests` and `core/services/analytics_services/tests`, but coverage is not uniform across all 41 service modules.
- **Alembic migration files** were not extracted with this snapshot (`app/persistence/sqlalchemy/migrations/` is referenced from `alembic.ini` but isn't present in this code dump). The migration runner is wired correctly via the `alembic` Docker service.
- **No public demo URL** — this is a closed-source, commercial product. The portfolio entry references the architecture and my contributions, not a deployed instance you can poke.

---

## What I'd highlight in an interview

- Designing the **AI orchestration contract** between this backend and the worker services (Pub/Sub topic schema, structured `ResponseModel`, idempotent state machine on `DocumentVersion.indexing_status` + `llm_result`).
- Implementing the **Google Drive storage backend from scratch** using only `cryptography` + `aiohttp` (RSA-signed service-account JWT, token caching, multipart-vs-resumable upload, folder cache, link extraction).
- Building the **multi-provider real-estate union service** that merges four upstream APIs concurrently with a deterministic priority rule and source attribution per field.
- Tuning the **async SQLAlchemy connection pool** for Cloud Run cold-start behavior and adding the `mv_loan_inquiry_summaries` materialized view to keep dashboards sub-second.
- Wiring **OpenTelemetry → Logfire** with auto-instrumentation and a custom span filter so we get useful production traces without paying for the noise.
