---
title: "Creator Cortex — YouTube Title Analyzer & Strategy Platform"
slug: creator-cortex
role: Full-Stack Engineer (architecture, backend, frontend, infra)
summary: "AI-powered YouTube growth platform: title scoring, RAG-grounded LLM title generation, outlier mining, multi-channel YouTube Analytics OAuth, and a closed feedback loop."
outcome: "341 endpoints across 118 feature modules; 70k LOC Python backend + 57k LOC React frontend; deployed on Render with Supabase + pgvector."
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

> An AI-powered YouTube growth platform: title scoring, LLM title generation grounded in real outlier data (RAG), competitor & outlier mining, multi-channel YouTube Analytics integration, and a full performance feedback loop that turns published-video metrics into better future titles.

**Role:** Full-stack engineer (architecture, backend, frontend, infra)
**Stack:** Python · FastAPI · PostgreSQL · pgvector · React · Vite · Docker · Render · Supabase · OpenRouter (Claude / Gemini / GPT-4o-mini) · YouTube Data + Analytics APIs

---

## 1. What it actually is

Creator Cortex is a two-repo monorepo-style product:

- **`creator-cortex-backend`** — A modular FastAPI service (Python 3.12, async SQLAlchemy 2.0, Alembic, APScheduler) exposing **341 HTTP endpoints across ~118 feature modules** for title scoring, LLM title generation, outlier discovery, channel auditing, OAuth-backed YouTube Analytics, RAG search, and a full creator-feedback loop.
- **`creator-cortex-frontend`** — A React 19 + Vite SPA (~189 components/pages, ~57k LOC) that wraps every backend feature into a 14-tab YouTube-themed studio: Home, Outliers, Bru-Titles, Thumbnails, Generator, Scorer, Title Lab, Insights, Collections, Channels, Workflow, Lab, Strategy, Scheduler.

The product positions itself as a "strategy platform for YouTube creators": you paste a title to score it, paste a transcript to get LLM-generated titles grounded in real top-performing outliers, scan competitor channels to mine winning formulas, connect your channel via OAuth to pull real CTR/retention, and let the system continuously close the loop on what actually works.

---

## 2. Core features (what it does)

### 2.1 Title scoring engine
- Pure-Python port of an internal scoring algorithm (`app/common/title_scoring.py`, ~700 LOC).
- Composite score (0–100, A+ → F grades) across **length, clarity, emotion, curiosity, specificity** with custom syllable counting, emoji handling, and pattern detection.
- Endpoints: single score, batch (50 titles), title health, score roadmap, auto-improve, score story, journey, streak analysis, pattern-mastery overview, confidence variance.

### 2.2 LLM title generation (RAG-grounded)
- Centralized LLM gateway (`app/core/services/llm_client.py`) calls **OpenRouter** with per-task model tiers:
  - `premium` → Claude Sonnet/Opus (title generation, formula titles, style analysis)
  - `long` → Gemini 2.5 Flash (long transcripts, script analysis)
  - `fast` → GPT-4o-mini (topic/niche classification, scoring narration)
- **pgvector-powered RAG** (`app/common/services/rag_engine.py`, ~485 LOC) over an `outliers_supabase` table of high-performing real YouTube titles. Builds tiered prompt context from semantically similar proven outliers + keyword boosting, with similarity floors (0.25/0.30/0.35) to prevent garbage retrieval.
- Multiple generation flavors: `/api/generate-titles-llm`, `/api/generate-titles-by-angle`, `/api/generate-title-variations`, `/api/lab/generate-titles`, `/api/beat-title`, `/api/brainstorm`.
- **Trace streaming** — every LLM call emits structured trace events (`/api/generate-titles-llm/trace?reqId=...`) so the UI can render a step-by-step "thinking" panel.

### 2.3 Outlier discovery & competitor mining
- Scans tracked channels for videos that significantly outperform the channel's median (the "outlier" signal).
- **Background scheduler (APScheduler)** runs three cron jobs out of the box:
  - `refresh_connected_channels` — every 6h, refreshes OAuth tokens, channel metadata, and pulls performance snapshots for top 20 videos per connected channel.
  - `outlier_scan_and_embed` — every 12h, full scan of tracked channels + idempotent backfill of pgvector embeddings for new outlier titles (batched, retried, only `WHERE embedding IS NULL`).
  - `trending_refresh` — every 4h, lighter rescan of top 30 active channels.
- Pattern/formula extraction (`app/features/patterns/`, `app/features/repeat_winners/`, `app/features/title_formulas/`) — discovers winning structural patterns ("How I X without Y", "I tried X for N days", etc.), maps them to a Tier-1 catalog, and surfaces "shared patterns" across multiple winning channels.
- Niche gaps, breakout-channels, "viral right now", trending-by-region, sub-formulas, recycled formulas.

### 2.4 Multi-channel YouTube OAuth + real Analytics
- Full OAuth 2.0 flow (`app/features/oauth/service.py`, ~673 LOC) with **AES-256-GCM per-field encryption** of `access_token` / `refresh_token` at rest, base64-encoded with random 12-byte IVs and a 32-byte key from `GA_TOKEN_ENCRYPTION_KEY`.
- Multi-channel: tokens stored per `channel_id` in `oauth_tokens` (Postgres) with an in-memory read cache; users can connect N channels.
- Pulls **real CTR, impressions, AVD, watch time, subscriber delta** from the YouTube Analytics API, plus channel/video metadata from YouTube Data API v3.
- 4 OAuth scopes covering analytics, yt-analytics, youtube.readonly, youtube.force-ssl.

### 2.5 Feedback loop (the actually-interesting part)
- Documented in `docs/closing-the-loop-llm-title-improvement.md` and `docs/youtube-title-feedback-loop-system.md`.
- Implemented across `app/features/feedback/`, `app/features/performance/`, `app/features/learning/`, `app/features/outcomes/`, `app/features/tester/`.
- Captures: **creator feedback** (rankings, edits, rejections, free-text reasons), **performance snapshots** (7d / 30d windows after publish), **generation logs** (every candidate + which was selected + which was published).
- Feeds it back into prompts via dynamic blocks: top performers, worst performers, learned creator preferences (auto-rebuilt every 5 feedback events), pattern→performance correlations.
- A/B testing module (`features/ab_test`, `features/ab_titles`, `features/tester`) with rounds, snapshots, evaluation, audit log.

### 2.6 Thumbnails & multi-modal strategy
- Pure-frontend module (~40 components in `pages/thumbnails/`) covering: 3-element checker, color analyzer, color combos, text guide, face guide, niche patterns, branding guide, swipe file, A/B testing playbook, brief generator, mobile/feed simulators, mistakes/psychology/synergy tabs.
- Backend has thumbnail-text/synergy/combo endpoints for LLM-driven analysis.

### 2.7 Other modules worth listing
- Transcripts (YouTube transcript API + custom analysis)
- Script analysis & blueprint extraction (LLM)
- Title formulas / sub-formulas / recycled formulas catalog
- CTR & viral predictors (heuristic + LLM)
- Memorability, speakability, clickbait, originality, creativity, sentiment, emotion, psychology scorers
- Content brief, daily challenge, daily focus, cheat sheet, content calendar
- Mashup, remix, postmortem, decision matrix, predict, brain-dump
- Translation, regional, seasonality, back-catalog, winning-formats
- Burnout check, voice/tone analysis, channel DNA, vocabulary
- Saved filter presets, swipe file, alerts/watches, find-similar
- Niche classification, SEO keywords, phrase heatmap, topic waves
- Quota tracking with **5-key YouTube API rotation** (`youtube_api_keys` property in config)

---

## 2A. Deep-dive: the Title Generator pipeline

The `Generator` page (`creator-cortex-frontend/src/pages/Generator.jsx`, ~1,350 LOC) is the most architecturally interesting flow in the product. It's the one feature that exercises essentially every system in the platform: script analysis, hook extraction, RAG retrieval, multi-tier LLM routing, parallel multi-prompt generation, an LLM-as-judge re-ranker, real-time SSE trace streaming, channel-history personalization, the full performance feedback loop, and a continuous learning loop driven by creator feedback.

### 2A.1 What the user sees

The page is a 5-state finite state machine: `landing → input-title | input-transcript → analysis → results`.

**Two entry modes:**
- **"Improve a Title"** — paste an existing title (optionally with a `formulaTemplate` carried over via `react-router` location state from the Outliers page); generation is a one-shot `POST /api/generate-titles-llm`.
- **"Generate from Transcript"** — paste a full transcript (optionally with a working title); the flow first calls `POST /api/analyze-script` to extract hooks, then fans out to parallel generation calls.

**Optional channel connection.** A `ConnectChannelButton` triggers the OAuth flow; when an `activeChannelId` is set, every downstream call sends `channel_id` and the UI shows a "Personalisation active" indicator. This single field cascades into four separate prompt-augmentation paths (see §2A.4).

**Five result views**, all populated from a single response:
- **Top 10** — flat ranked list, sorted by judge score (with a hero "Top Pick" card)
- **By Time** — titles bucketed by which part of the script the source hook came from (`0-5s`, `5-10s`, …, `180-300s`)
- **By Method** — three columns (`outlier`, `research`, `creatorhooks`) with an inline "+ Generate More" button per column that calls `POST /api/backfill-section`
- **By Hook** — one column per script hook
- **By Angle** — populated by the parallel `POST /api/generate-titles-by-angle` call (4-6 distinct emotional/audience frames)

A persistent right-side **Title Workspace** lets the user star candidates into a session-scoped tray, and clicking any title opens a **Detail View** that auto-fires `POST /api/generate-title-variations` for sibling rephrasings.

### 2A.2 The full request flow (transcript mode, end-to-end)

Below is the actual call graph that runs when a user clicks **"Analyze Script →"**. Every numbered step is real code.

```
USER CLICKS "Analyze Script"
│
├─① POST /api/analyze-script  { transcript, title? }
│     └─ app/features/script_analyze/service.py :: analyze_script()
│         ├─ detect_transcript_format() → 'timestamped' | 'paragraph' | 'plain'
│         ├─ if timestamped: parse_timestamped_transcript()  ── real (sec, line) pairs
│         │   bucket_by_real_timestamps() into 7 time buckets
│         │ else: segment_by_paragraphs() / segment_transcript_into_buckets()
│         ├─ build_bucketed_transcript()  ── single LLM-friendly bucketed view
│         ├─ call_llm(task="script_analysis", model=LLM_MODEL_PREMIUM or _MAX_QUALITY)
│         │   └─ retry up to 2 attempts, JSON.parse + validate_analysis_schema()
│         ├─ enrich_hooks_with_specificity()   ── computes 0-8 specificity score
│         ├─ enrich_hooks_with_timestamp()     ── derives estimated_seconds + position_pct
│         ├─ asyncio.gather(
│         │     generate_topic_from_analysis(),       ← the canonical "topic" string
│         │     estimate_hook_timestamps()             ← refines timestamps via 2nd LLM call
│         │ )
│         └─ returns { analysis, topic, analysis_quality, hook_count,
│                      strong_hook_count, deep_hook_count, schema_warnings }
│
│     ▶ Frontend stores `analysis`, `analysisTopic`, `analysisQuality`, `analysisMeta`
│       and immediately invokes generateFromAnalysis(...)
│
└─② TWO PARALLEL CALLS via Promise.all:
   │
   ├─ ② POST /api/generate-titles-llm   ← the main pipeline (see §2A.3)
   │     body: { topic, analysis, transcriptExcerpt, channel_id?, traceId }
   │
   └─ ② POST /api/generate-titles-by-angle  ← extra "By Angle" column data
         body: { topic, analysis, transcriptExcerpt(4000) }
         └─ extracts 4-6 distinct angles (different emotion / audience / frame),
            then asyncio.gather(...) over one_angle() coroutines, 5 titles each.

(Concurrent with ②, the frontend opens an SSE connection:)
   ⓢ GET  /api/generate-titles-llm/trace?reqId=<traceId>  ── EventSource stream
       └─ TraceViewer component renders each emitted step in real time
```

### 2A.3 What `POST /api/generate-titles-llm` actually does

This is `app/features/generate_titles/service.py :: run_generate_titles_llm()` — about 800 LOC of orchestration. The pipeline is:

**Phase 1 — Hook selection (`select_hooks`)**
- Takes `analysis.title_hooks` from the script analysis.
- Quality gate: drop hooks with `specificity_score < 3` AND `strength < 5` (logged + traced).
- Bucket-aware diversity: best hook from each of 5 priority time buckets (`0-5s`…`30-60s`) + best from 2 extended buckets (`60-180s`, `180-300s`) if specificity ≥ 4.
- Each hook is annotated with a `_titles_count` (10 for `0-5s`, 8 for `5-10s`, …, 4 for `300s+`) — this controls how many variations the LLM is asked to generate per hook.

**Phase 2 — Personalization context (only if `channel_id` is provided)**
- `get_channel_history()` queries the local SQLite outlier database for that channel's top 10 + bottom 5 titles by multiplier.
- `build_channel_reasoning()` makes a *separate* LLM call (Claude, temp 0.3) that returns structured JSON: `style_fingerprint`, `relevance` (high/medium/low), `relevance_reasoning`, `what_to_match`, `what_to_avoid`, and a final `prompt_injection` string. This is the channel-aware "system prompt block" that gets injected into every per-hook generation prompt later.
- `search_own_channel_titles()` runs a pgvector RAG search restricted to the creator's own outliers for an additional `own_channel_rag_section`.
- `ensure_snapshots_populated()` lazily backfills missing performance snapshots for the channel, then `build_dynamic_prompt_blocks()` assembles up to 5 dynamic blocks from real performance data:
  - **Block A** — top 15 performing titles by composite score (`SELECT … ORDER BY composite_score DESC`)
  - **Block B** — bottom 10 performing titles ("avoid these patterns")
  - **Block C** — auto-extracted statistical patterns (e.g., "titles with parentheticals average 1.4× higher score" — derived by `extract_title_features()` per title, grouped by feature, then comparing means)
  - **Block D** — learned creator preferences (preferred formulas / packaging / rejected formulas / edit rate / avg length — auto-rebuilt every 5 feedback events)
  - **Block E** — live YouTube Analytics (top 10 videos with real CTR + likes, fetched via the OAuth-connected channel)
- All of the above is **non-fatal** — every block is wrapped in `try/except` and the request continues without it on failure.

**Phase 3 — Per-hook RAG retrieval (`get_per_hook_rag_context`)**
- For each selected hook, builds a query like `"{hook.type}: {hook.text or topic}"` and asks the pgvector RAG engine for ~12 semantically similar real outliers with `multiplier ≥ 5`, optionally niche-filtered.
- Falls through cleanly: pgvector RAG → SQLite topic-keyword fallback → SQLite top-outliers fallback → empty. The chosen source is logged into the trace as `rag_source`.

**Phase 4 — Massively parallel generation (this is the load-bearing piece)**
```python
hook_results_future = asyncio.gather(*[one_hook(i, h) for i, h in enumerate(hooks)])
method_results_future = asyncio.gather(
    one_method("outlier", creator_formulas, "data-driven outlier patterns…"),
    one_method("research", research_formulas, "proven psychological packaging…"),
    one_method("creatorhooks", creator_formulas, "A/B tested creator hook patterns…"),
)
hook_results, method_results_raw = await asyncio.gather(hook_results_future, method_results_future)
```
- Up to **N + 3 concurrent LLM calls**, where N is the number of selected hooks (typically 3-7). Each call uses the `premium` model tier (Claude) at `temperature=0.9`, `max_tokens=5000`.
- Each per-hook prompt is 800-2000+ chars and is assembled from up to **9 distinct sections** (in this exact order):
  1. video context (type, core angle, audience, key entities)
  2. creator personalization injection (from §Phase 2)
  3. dynamic feedback-loop blocks (top/bottom/patterns/preferences/live analytics)
  4. The **BEN framework** — a custom rubric (`B`ig, `E`asy, `N`ew) the LLM must self-score against
  5. matched A/B-tested creator hook formulas filtered by hook type (`stat` → `Extreme`/`Lists > How-To`/`Curiosity`, etc.) and CTR lift score
  6. optional `formula_template` from Outliers handoff ("at least 2 titles MUST follow this pattern")
  7. real viral outlier titles inspiration (from §Phase 3 RAG)
  8. own-channel pgvector results
  9. **9 hard-coded data-backed rules** (40-70 chars, 7-13 words, sentence case, no ALL CAPS, listicle preferred, no "X vs Y", etc.)
- The LLM is asked to return a JSON array where each title self-tags with `method_column` (`outlier|research|creatorhooks`), `formula`, `packaging`, `inspired_by`, `ben: {b, e, n}` self-scores, and `confidence`.

**Phase 5 — Post-processing pipeline**
1. **Parse + section-mapping fallback** — if the LLM forgot `method_column`, infer it by string-matching `inspired_by`/`packaging` against the loaded formula catalogs.
2. **Levenshtein deduplication** (`is_duplicate`, threshold 0.82) — also fires a secondary check on long-word-overlap ratio > 0.8, with the cut reason recorded as `Too similar to "<other title>"`.
3. **Opener diversity filter** — caps any single opener (e.g. `i`, `my`, `the secret`) at **2× per method column** and **4× total**. Cuts get a `cut_reason` like `Opener "i" already used too many times total`.
4. **LLM-as-judge re-ranker** — single batched call (temp 0.15, model = `title_scoring` tier = `fast`) that scores **every surviving title** on 10 criteria with explicit weights (`specificity` and `scroll_stop` ×1.5, `length_optimal` ×0.5, others ×1.0). The judge prompt includes 3 hand-crafted **calibration examples** to anchor the scoring distribution and prevent the LLM from clustering scores. The recomputed weighted score replaces `overall_score`. If the average gap between self-score and judge-score exceeds 2.0, the response sets `meta.score_gap_warning = true`.

The final response includes `titles`, `top_picks` (top 10), `cuts` (with reasons), `method_titles` (the 3 column-specific runs), `hooks`, and a fat `meta` object: `generated`, `kept`, `cut`, `judged`, `personalized`, `feedback_loop_active`, `channel_reasoning`, `hooks_filtered_by_quality`, plus per-section counts.

**Total LLM calls per single transcript-mode generation:** typically **8-13**:
- 1 `analyze_script` (with 1-2 retries)
- 1 `generate_topic_from_analysis`
- 1 `estimate_hook_timestamps`
- 1 `build_channel_reasoning` (if connected)
- N hook-specific generations (3-7)
- 3 method-specific generations (outlier / research / creatorhooks)
- 1 angle-extraction + up to 6 angle-specific generations (parallel sibling endpoint)
- 1 LLM-as-judge re-rank

All routed through the same `app/core/services/llm_client.py` gateway, all retried, all individually traced.

### 2A.4 The personalization layers (from "off" to "fully closed loop")

The Generator's behavior changes substantially based on what the user has connected. The four states are:

| State | What's connected | Prompt changes |
|---|---|---|
| **Anonymous** | nothing | Only the topic / hook context + RAG over the global outlier corpus + BEN framework. No `meta.personalized`, no `meta.feedback_loop_active`. |
| **Tracked channel (no OAuth)** | a `channel_id` from the local outlier scanner | Adds `channel_reasoning` block (top/bottom titles + LLM-derived style fingerprint + relevance score + match/avoid lists). UI shows a `Personalised` badge. |
| **OAuth-connected channel** | YouTube Analytics access | Above + `build_live_analytics_block()` injects real CTR + view counts for that channel's top 10 videos into the prompt. |
| **Closed feedback loop** | OAuth + ≥10 logged feedback sessions | Above + the four dynamic blocks (top performers by composite score, worst performers, statistical pattern analysis, learned creator preferences with preferred/rejected formulas + edit rate + length distribution). UI shows a green pulsing **Feedback Loop Active** badge. |

The "Feedback Loop Panel" component on the input screen shows the user *exactly* where they are on this progression — feedback session count, edit rate, avg title length, signal breakdown (`reject`/`save`/`use`/`thumbs_up`/`thumbs_down`/`copy`), and a progress bar to the 10-session threshold required for full LLM-driven preference analysis.

### 2A.5 The continuous learning loop (every interaction is a training signal)

Every meaningful UI action calls `POST /api/feedback/record` with the same envelope: `{ channelId, videoId, generationSessionId, allCandidates, selectedIndex, selectedTitle, wasEdited, preEditTitle, finalTitle, formulaUsed, packagingUsed, signalType }`. The session ID is a `crypto.randomUUID()` minted at the start of each generation run, so every signal is correlatable back to which exact generation produced the candidate.

Tracked signal types:
- `view` — user opened a title's detail view
- `save` — user added it to the workspace tray
- `copy` — user clicked Copy
- `use` — user committed the title (with `wasEdited` + `preEditTitle` if they modified it)
- `reject` — explicit rejection
- `thumbs_up` / `thumbs_down` — quick ratings

After every 5 feedback events, the `feedback` service auto-rebuilds a `creator_preferences` row containing: preferred formulas (top-K by selection count), preferred packaging styles, rejected formulas (top-K by rejection count), edit rate, average final title length, average edit distance, signal breakdown, and (once ≥10 sessions exist) an LLM-generated free-text style summary that gets injected verbatim into future Block D prompt sections.

This is the loop that makes the system actually improve over time, and it's documented in `docs/closing-the-loop-llm-title-improvement.md` and `docs/youtube-title-feedback-loop-system.md`.

### 2A.6 Real-time observability via SSE

When a generation request fires, the frontend simultaneously opens an `EventSource` to `GET /api/generate-titles-llm/trace?reqId=<traceId>`. The backend route long-polls a per-request emitter dict (created by `create_trace_emitter(req_id)`) and streams every event as `text/event-stream` with `X-Accel-Buffering: no`. The pipeline emits ~25 distinct event types as it runs:

`request_start` → `request_parse` → `hook_filter` → `hook_diversity` → `creator_personalization` → `channel_reasoning_llm` (start/ok/error) → `own_channel_rag` → `snapshot_auto_populate` → `feedback_loop` → `formula_load` → `formula_template_injected` → N × `rag_retrieval` → N × `title_generation` (start/done) → `json_parse` → `deduplication` → `opener_filter` → `judge_scoring` (start/done) → `request_complete`.

Each event carries structured `data` (e.g., `rag_retrieval` includes `rag_source`, `context_chars`, `duration_ms`, and a 500-char `rag_context_preview`; `judge_scoring` includes `min_score`/`max_score`/`avg_score` and the full ranked title list with self-scores vs judge-scores). The `TraceViewer` component renders this as a collapsible step-by-step timeline at the bottom of the screen, so the user can literally *see* which RAG hits were used, which prompt sections were injected, how many titles were cut at each filter, and where the time was spent.

This was originally a debugging tool but ended up being the single biggest UX differentiator — users explicitly trust the output more when they can see the pipeline reasoning in real time.

### 2A.7 What this exercises (skills demonstrated by this one feature)

- **Async orchestration at scale**: nested `asyncio.gather` with up to ~13 concurrent LLM calls per request, all individually traced, retried, and gracefully degraded
- **Multi-tier LLM routing**: `script_analysis` → Gemini long-context, `title_generation` → Claude premium @ temp 0.9, `title_scoring` (judge) → fast tier @ temp 0.15 — all routed through one gateway
- **Prompt engineering as a pipeline**: 9-section composable prompt assembly with structured fallbacks (no analysis → fallback hooks; no channel → skip personalization blocks; no RAG hits → SQLite fallback → top-outliers fallback)
- **LLM-as-judge with calibration**: weighted multi-criteria re-ranker with hand-crafted anchor examples and self-score-vs-judge-score gap detection
- **Hybrid RAG**: pgvector semantic search with similarity floors + keyword boosting, cleanly falling through to SQLite keyword search when the embedding service is unavailable
- **SSE streaming**: long-polling event emitter pattern that's framework-agnostic (no Redis, no broker — just a per-request in-memory dict polled by the SSE handler), with proper `X-Accel-Buffering: no` headers for Render's reverse proxy
- **Closed feedback loop**: every UI signal is captured, attributed via session IDs, and rebuilt into structured preference profiles that get re-injected into future prompts — the system genuinely improves with use
- **Frontend state machine**: a 5-state flow with derived view-mode tabs, optimistic UI for parallel responses, shimmer loading per-column, race-condition-safe abort handling, and a session-scoped workspace tray
- **Defensive design**: every external dependency (DB, RAG, LLM, OAuth, Analytics) is wrapped in `try/except` with `logger.warning("non-fatal: %s", exc)` so a single failed block degrades gracefully rather than failing the whole request

This is the feature you should anchor your portfolio narrative around. It's the most defensible "I built a real LLM system, not a wrapper around one prompt" demonstration in the project.

---

## 3. Architecture

### 3.1 Backend layout

```
creator-cortex-backend/
  app/
    main.py                     FastAPI factory, lifespan, exception handlers, dynamic router mount
    core/
      config.py                 pydantic-settings (env-driven, JSON or CSV CORS parsing)
      database.py               Async SQLAlchemy 2.0; Postgres → SQLite auto-fallback on outage
      scheduler.py              APScheduler singleton with execution history (200-entry deque)
      scheduler_tasks.py        3 cron tasks (refresh, outlier scan + embed, trending)
      services/
        llm_client.py           OpenRouter gateway, retry, trace emission, per-task tier mapping
        embedding_service.py    Embedding generation for pgvector
        supabase_client.py      Supabase REST client
        youtube_client.py       YouTube Data API v3 with multi-key rotator
        transcript_service.py   youtube-transcript-api wrapper
    common/
      cache/api_cache.py        In-process TTL cache
      services/                 RAG engine, API quota (file-backed), channel fetcher, creator title retriever
      middleware/               Security headers + X-Quota-Remaining response header
      title_scoring.py          ~700-LOC pure-Python scoring algorithm
      exceptions, schemas, repositories, dependencies, state, utils, entities
    features/                   118 feature packages, each = routes + service + schemas + (model + repository)
  alembic/                      8 migrations (pgvector RAG, outliers_supabase, OAuth, feedback loop tables)
  tests/                        unit / api / integration / validation (~29 files)
  scripts/                      sync_databases, migrate_sqlite_to_pg, eval_rag, embed_backfill, verify_parity
  Dockerfile, docker-compose.yml, Makefile, pyproject.toml, .pre-commit-config.yaml
```

**Layered pattern per feature** (where it matters): `routes.py` → `service.py` → `repository.py` → `models.py` (SQLAlchemy) + `schemas.py` (Pydantic). Routers are mounted dynamically with try/except so a single broken feature doesn't crash startup.

### 3.2 Frontend layout

```
creator-cortex-frontend/
  src/
    main.jsx, App.jsx           React 19 + react-router-dom v7 with 14 routes
    api/apiPaths.js             Single source of truth for ~250 backend route builders
    hooks/
      useApi.js                 fetch wrapper that auto-unwraps { data: ... } responses
      useOutlierScan.js         Multi-step scan orchestration
      useTraceStream.js         SSE-style trace consumer for LLM call visualization
    context/                    NicheContext, GlobalFiltersContext, ChannelConnectionContext, FilterContext
    components/                 ~50 shared components (ScoreRing, BreakdownBar, OutlierCard, FactorCard, TraceViewer, ...)
    pages/                      19 top-level pages + sub-folders for outliers/, generator/, thumbnails/, bruhancer/
    features/                   8 feature folders with their own component subtrees (strategy-lab, title-lab, workflow-lab, channel-insights, scheduler, generator, thumbnails, bruhancer)
    theme.js, styles/, App.css  Dark YouTube-style theme (#0f0f0f / #ff0000 accent, Roboto + Inter + Bebas)
```

API base is `import.meta.env.VITE_API_URL` (or `localhost:8000` dev), proxied via Vite during dev.

### 3.3 Data layer

- **PostgreSQL 16** primary store, async via `asyncpg`.
- **Supabase** as the production Postgres host (the pooler endpoint), with a `yt_analyzer` schema set as `search_path` on every connection.
- **pgvector** for outlier title embeddings (`outliers_supabase` table), embedded in batches of 20 by the scheduler.
- **Alembic** for migrations (8 versions: pgvector RAG, outliers_supabase, OAuth tokens, feedback loop tables, formula columns, signal types, channel-stats columns).
- **SQLite fallback**: if Postgres is unreachable on first request, the app transparently swaps the engine to a local SQLite file (`data/outlier-scanner.db`) — useful for offline dev and graceful degradation.
- **File-backed daily YouTube quota counter** (`data/api-quota.json`) with 30-day rolling history, surfaced via `X-Quota-Remaining` response header on every request.

---

## 4. Tools & libraries

### Backend (Python 3.12, `uv` for dependency management)
- **Web:** FastAPI, Uvicorn, python-multipart, httpx
- **Data:** SQLAlchemy 2.0 (async), asyncpg, aiosqlite, Alembic, psycopg2-binary
- **Scheduling:** APScheduler 3.10
- **Vendor SDKs:** google-api-python-client, google-auth, youtube-transcript-api, supabase
- **Config & validation:** Pydantic 2, pydantic-settings, python-dotenv
- **Crypto:** `cryptography` (AES-256-GCM for OAuth token encryption)
- **Dev tooling:** Ruff, mypy, pyright, pytest, pytest-asyncio, pytest-cov, pre-commit (codespell, conventional-commits, trailing whitespace, merge-conflict, private-key detection)
- **Optional observability:** Langfuse (env vars wired but optional)

### Frontend
- React 19, react-dom, react-router-dom v7
- Vite 7 with `@vitejs/plugin-react`
- No CSS framework — hand-rolled YouTube-style theme via `App.css` + `theme.js` + inline styles
- No state management library — `useState` + Context API only

### Infra & ops
- **Docker** (single Dockerfile based on `ghcr.io/astral-sh/uv:python3.12-bookworm-slim` with bytecode compile + bind-mount cache)
- **docker-compose**: `db` (Postgres 16-alpine + healthcheck), `app`, `alembic` (one-shot migration runner)
- **Makefile** with 17 targets: `up`, `down`, `build`, `migrate`, `migrate-new`, `migrate-down`, `migrate-history`, `lint`, `lint-fix`, `test`, `test-local`, `dev`, `db-dump`, `db-restore`, `db-seed`, `db-migrate-supabase`, `supabase-init`, `sync-to-supabase`, `sync-from-supabase`
- **CI-friendly pre-commit** with conventional-commit message enforcement

---

## 5. Where it's deployed

- **Backend:** Render — `https://creator-cortex-backend.onrender.com`
- **Frontend:** Render — `https://creator-cortex-frontend.onrender.com`
- **Database:** Supabase Postgres (Seoul region pooler, `aws-1-ap-northeast-2`), with pgvector enabled in the `yt_analyzer` schema
- **LLMs:** OpenRouter (Claude Sonnet/Opus, Gemini 2.5 Flash, GPT-4o-mini) — single API key, per-task tier routing
- **Auth:** Google OAuth 2.0 (web app credentials) for YouTube Analytics access
- **Source:** GitHub org `DC-Social-Media` (private repos: `creator-cortex-backend`, `creator-cortex-frontend`)

---

## 6. Skills demonstrated (for the portfolio bullet list)

- **Backend architecture:** Domain-modular FastAPI app with 118 feature packages, dynamic router mounting, per-feature isolation, 4 layers (routes/service/repo/model+schema)
- **Async Python:** SQLAlchemy 2.0 async sessions, asyncpg, httpx, APScheduler with execution-event listeners and history tracking
- **LLM engineering:** Centralized OpenRouter gateway, per-task model-tier routing (premium/long/fast), structured output parsing, retry with backoff, **prompt assembly with dynamic top/bottom-performer blocks and learned creator preferences**, real-time trace streaming for UI step-by-step
- **RAG / vector search:** pgvector index over real YouTube outlier titles, batched embedding backfill, similarity thresholding (0.25/0.30/0.35), keyword-boosted reranking, tiered context builders
- **Feedback loops & ML-adjacent work:** Composite-score performance snapshots (CTR + retention + sentiment), pattern→performance correlation, automatic creator-preference rebuild, formula-template injection, prompt evolution (validated via tests in `tests/validation/`)
- **OAuth & security:** Multi-channel Google OAuth 2.0, AES-256-GCM per-field token encryption with random IVs, security headers middleware (X-Content-Type-Options, X-Frame-Options, Referrer-Policy)
- **Database design:** PostgreSQL on Supabase + pgvector, Alembic migrations, custom `search_path` per-connection event listener, async connection pool tuning, Postgres → SQLite **graceful-degradation fallback** on outage
- **Resource management:** 5-key YouTube API rotator with daily quota tracking, file-backed quota counter with rolling history, response-header quota broadcast, in-process TTL cache
- **Background jobs:** APScheduler with EVENT_JOB_SUBMITTED/EXECUTED/ERROR/MISSED listeners, 200-entry execution-history deque, manual-trigger / pause / resume admin endpoints, next-24h projection
- **Frontend:** React 19, react-router v7, Context API, hand-rolled dark YouTube-style theme, custom hooks for fetch + trace streaming + multi-step orchestration, ~250-route API client
- **Testing:** pytest + pytest-asyncio with in-memory SQLite fixtures, mocked LLM/YouTube/Analytics clients (`tests/conftest.py`), unit + api + integration + validation suites
- **DevX:** uv for fast deps, Docker + docker-compose, Makefile, Alembic, pre-commit (Ruff, mypy, pyright, codespell, conventional-commits)
- **Product breadth:** Designed and shipped **341 distinct API endpoints** spanning scoring, generation, analytics, OAuth, A/B testing, scheduling, content planning, and translation

---

## 7. What makes it production-ready

- **Health endpoint** at `/health` returning version + status
- **Global exception handlers** for `HTTPException`, custom `AppException`, `RequestValidationError`, and unhandled `Exception` — every error becomes a structured `{"error": "..."}` response with a sane status code
- **Security headers** middleware on every response
- **CORS** wired through `pydantic-settings` with both JSON-array and CSV parsing
- **Encrypted secrets at rest** (OAuth tokens, AES-256-GCM)
- **Connection pool tuning** with `pool_pre_ping`, `pool_recycle=1800`, configurable size/overflow/timeout, and Supabase-aware NullPool + statement-cache disable to play nicely with the pgvector pooler
- **Resilience:** Postgres → SQLite auto-fallback on connection failure; per-router try/except mount so one broken feature module never crashes startup
- **Background work isolation:** scheduled tasks acquire their own DB sessions via a standalone `get_db()` context manager (not request-scoped)
- **Idempotent embeddings backfill:** `WHERE embedding IS NULL` + `ON CONFLICT DO UPDATE` upserts mean re-runs are safe
- **Quota awareness:** every response broadcasts remaining YouTube API quota; LLM calls retry with exponential-ish delays
- **Migrations:** 8 Alembic versions, autogenerate workflow, dedicated `alembic` docker service
- **Containerized** with cache-friendly multi-step Dockerfile (uv with bytecode compile, bind-mount caches for the lockfile and `~/.cache/uv`)
- **Tests:** 29 test files covering unit (scoring dispatch, formula detector, pattern extractor, RAG context, prompt blocks, creator preferences), API (scoring, performance, feedback, outcomes), integration (services), and validation (RAG relevance, feedback loop e2e, prompt evolution, creator-preference learning)
- **Code quality gates:** Ruff (E/F/I/UP/B/SIM/RUF rules, line-length 120), mypy, pyright, codespell, conventional-commits, all wired into pre-commit
- **Deployed and running** on Render with Supabase Postgres backing the production database

---

## 8. Brutally honest assessment

I'm going to be straight with you because you asked. This README needs to reflect *the project as it actually is* if you want it to hold up in interviews.

**Strengths (real, not inflated):**
- The breadth is genuinely impressive — 341 endpoints, 118 feature modules, 70k LOC of Python, 57k LOC of frontend. This is a lot of shipped surface area.
- The interesting engineering is real: pgvector RAG with proper similarity floors, AES-256-GCM token encryption, multi-tier LLM routing through OpenRouter, an APScheduler pipeline with execution-history tracking, idempotent embedding backfill, multi-key YouTube quota rotator, Postgres→SQLite auto-fallback. Each of these is a legit talking point.
- The feedback-loop architecture (performance snapshots → dynamic prompt blocks → learned creator preferences → continuous improvement) is a nontrivial system-design story and you have validation tests for it.
- It's actually deployed end-to-end on Render with a real database.

**Weaknesses you should know about (and decide how to spin):**
- **The two READMEs in the repos are literally one line each** (`# creator-cortex-backend` / `# creator-cortex-frontend`). Anyone clicking through to GitHub will see nothing. Replace them with this file (or a trimmed version) before linking from your portfolio.
- **Your `.env` contains live, unrotated production secrets** — Supabase service key, YouTube API keys, OAuth client secret, OpenRouter key, Langfuse keys, AES encryption key. **Rotate every one of these before this repo touches a public link or a recruiter.** The `.env.example` is fine; the real `.env` should never have been near a portfolio.
- **Many endpoints are typed `dict[str, Any]` / "implicit / untyped"** in the audit doc. Pydantic response models are the exception, not the rule. If asked "how do you ensure API contracts," your honest answer is "I rely on tests and Pydantic input schemas; output schemas are inconsistent."
- **Test coverage is thin for the surface area** — 29 test files vs. 118 feature modules and 341 endpoints. The tests that exist are good (and the validation suite is interesting), but you're not at "well-tested" for a project this size.
- **No CI** — you have pre-commit hooks but no GitHub Actions / no automated test runs / no automated deploys visible in the repo. Render auto-deploys from `main`, that's the whole pipeline.
- **No observability beyond logs** — Langfuse keys exist but the integration is on a feature branch (`feat/langfuse-trace-chaining`), not on `main`. No metrics, no Sentry, no APM. "Production-ready" is a stretch in the strict SRE sense.
- **The frontend is a single big SPA with inline styles and no design system, no TypeScript, no state library, and no component tests.** It works and looks coherent, but if anyone asks about frontend architecture, the honest answer is "fast iteration, not strict structure."
- **No rate limiting, no auth on most endpoints.** The OAuth flow protects YouTube Analytics endpoints by requiring a connected channel, but the bulk of the 341 routes are open. Fine for a prototype/internal tool, not fine for a public SaaS.
- **Naming inconsistency:** the project is "Creator Cortex" externally but the FastAPI app, Docker containers, and pyproject all say "YouTube Title Analyzer". Pick one for the portfolio narrative.
- **The frontend `.env.local` says `NEXT_PUBLIC_API_URL`** even though it's a Vite/React app, not Next. The `useApi` hook reads `VITE_API_URL`, so the `.env.local` variable is effectively ignored. Minor but it's a "have you actually run this in prod?" red flag if someone reads carefully.
- **Some features feel speculative** — the 118 feature modules include a lot of micro-endpoints that may or may not be wired into the UI (e.g., `caps_optimizer`, `phrase_heatmap`, `decision_matrix`, `cheat_sheet`, `safety`). The breadth is real, but not all of it is necessarily polished.

**What to actually claim on your portfolio:**

> Designed and shipped a full-stack AI platform for YouTube creators: FastAPI backend (Python 3.12, async SQLAlchemy, 341 endpoints, ~70k LOC), React 19 SPA frontend, deployed on Render with Supabase Postgres + pgvector. Built a RAG-grounded LLM title generator with multi-tier model routing (Claude / Gemini / GPT-4o-mini via OpenRouter), a multi-channel Google OAuth flow with AES-256-GCM token encryption, an APScheduler-based background pipeline for outlier discovery and embedding backfill, and a closed feedback loop that turns published-video performance into dynamic prompt blocks for continuous improvement.

That's all true and defensible. Don't claim "production-grade" without qualifying it — claim "deployed, monitored via logs, with documented gaps in CI/observability/test coverage that I can talk through."

---
