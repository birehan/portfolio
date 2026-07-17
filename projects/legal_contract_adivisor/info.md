---
title: "Legal Contract Advisor: High-Precision RAG for Legal Q&A"
slug: legal-contract-advisor
role: AI Engineer (Lizzy AI capstone)
summary: "Contract Q&A RAG system for Lizzy AI built to deliver high-precision answers on legal documents using semantic chunking, hybrid retrieval, and a fully evaluated RAG pipeline."
outcome: "87% relevance on contract analysis through optimized chunking and hybrid retrieval."
stack:
  - Python
  - LangChain
  - Weaviate
  - Hugging Face
  - FastAPI
  - React
  - Hybrid Retrieval
links:
  github: https://github.com/birehan/Optimized-Contract-QA-RAG-System-Enhancements
  medium: https://medium.com/@birehanzewdie4/contract-advisor-rag-towards-building-a-high-precision-legal-expert-llm-app-560c4776370c
order: 1
date: "Feb 2024"
---

# Legal Contract Advisor: High-Precision RAG for Legal Q&A

**87% relevance on contract analysis:** a RAG system for Lizzy AI that answers questions about legal contracts with precision high enough to trust inside a legal workflow.

## The problem

Generic RAG over legal contracts returns plausible-but-wrong answers: naive chunking splits clauses mid-thought, and a single retrieval strategy misses either exact legal terms or semantic matches. In legal Q&A a confident wrong answer is worse than no answer.

## What I built

- **Semantic + structural chunking** that keeps clauses intact instead of cutting on fixed token windows.
- **Hybrid retrieval** (dense embeddings + keyword) over a Weaviate vector store, so both exact legal terms and paraphrased questions resolve.
- **A FastAPI service + React UI** for asking questions against an uploaded contract.
- **An evaluation loop** that scored retrieval and answer relevance across a labelled question set.

## How I measured quality

I built a labelled question/answer set over sample contracts and tracked answer relevance as I changed chunking and retrieval. Changes were kept only when the eval score moved, not on subjective spot-checks, and that iteration is how relevance reached 87%. The Medium write-up walks through each enhancement.

## Stack

Python, LangChain, Weaviate, Hugging Face embeddings, FastAPI, React, hybrid retrieval.