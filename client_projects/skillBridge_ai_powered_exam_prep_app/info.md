---
title: "SkillBridge — AI-Powered Exam Prep App"
slug: skillbridge-ai-powered-exam-prep-app
role: AI Software Engineer · Backend
summary: "Mobile exam prep for high-schoolers: syllabus-aligned notes, mock tests, an AI tutor, and adaptive quizzes—shipped on Android and iOS for learners in 20+ countries."
outcome: "1,000+ early installs; students get structured prep and feedback in one app instead of scattered PDFs and informal help."
stack:
  - Flutter
  - OpenAI API
  - Backend (Python)
  - AI Chatbot
  - Android · iOS
links:
  live: https://skillbridge.academy/en
  playstore: https://play.google.com/store/apps/details?id=academy.skillbridge.skill_bridge_mobile
featured: true
order: 3
date: 2024
---

# SkillBridge — AI-Powered Exam Prep for African High-School Students

> A mobile app that turns a phone into a curriculum-aligned study partner.
> Designed for students in Ethiopia preparing for national exams, then
> expanded to high-schoolers across 20+ African countries.

**Role:** AI Software Engineer (backend) — AI tutor chatbot, exam-generation
services, content APIs, and the backend that powers the Flutter clients on
Android and iOS.

## The problem

Most high-school students across Ethiopia and neighboring countries prepare
for national exams with outdated printed material and little personalized
feedback. Quality prep is concentrated in urban centers and priced out for
most families.

## What we built

- **Curriculum-aligned notes.** Structured study notes mapped to the national
  syllabus, served through a content API and rendered natively in the app.
- **Mock exams.** Generated and scored exams per subject, with explanations
  for every wrong answer.
- **AI tutor chatbot.** OpenAI-backed Q&A grounded in the course material,
  tuned for high-school reading level and the specific curriculum the
  student is enrolled in.
- **Adaptive quizzes.** Question difficulty shifts based on the student's
  running accuracy and weak topics, so revision sessions stay useful instead
  of getting easy or overwhelming.

## Architecture

- **Backend (Python).** Content, exam, and chat services exposing REST
  endpoints consumed by the Flutter apps.
- **AI layer.** OpenAI API for the tutor chatbot and for generating exam
  variants, with prompt templates tied to the syllabus taxonomy.
- **Mobile (Flutter).** Single codebase shipped to both Play Store and App
  Store, optimized for low-bandwidth environments.

## Outcome

- **1,000+ downloads** in the first release cycle.
- **Reach across 20+ African countries** within the first months.
- A stable content pipeline the team can extend with new subjects without
  engineering work on every update.

**Links:**
[skillbridge.academy](https://skillbridge.academy/en) ·
[Google Play](https://play.google.com/store/apps/details?id=academy.skillbridge.skill_bridge_mobile)
