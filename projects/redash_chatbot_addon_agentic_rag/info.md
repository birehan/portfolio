---
title: "Redash Chatbot Add-on: Agentic RAG for Data Analysis"
slug: redash-chatbot-agentic-rag
role: AI Engineer (personal project)
summary: "Conversational chatbot add-on for Redash that translates natural-language questions into SQL/queries against existing dashboards using an agentic RAG approach."
outcome: "Redash users can chat with their data instead of writing queries by hand."
stack:
  - LangChain
  - Agentic RAG
  - Python
  - Redash
  - LLMs
links:
  github: https://github.com/birehan/Redash-NLP-Chatbot-Analytics
  medium: https://medium.com/@birehanzewdie4/revolutionizing-data-analysis-with-redash-chatbot-add-on-5f0e63187343
order: 2
date: 2024
---

# Redash Chatbot Add-on: Agentic RAG for Data Analysis

**Ask your dashboards questions in plain English.** An add-on for Redash that turns natural-language questions into SQL against existing data sources, so non-analysts get answers without writing queries.

## The problem

Redash is powerful but assumes you can write SQL. Business users wait on analysts for even simple questions, and analysts burn time on repetitive ad hoc queries instead of deeper work.

## What I built

- **An agentic RAG pipeline** that grounds the model in the connected schema and existing queries before generating SQL, cutting hallucinated table and column names.
- **Natural-language to SQL** where the generated query runs against the user's data source and results come back in-chat.
- **Schema-aware retrieval** so the agent picks the right tables and fields rather than guessing from the question text alone.
- **A conversational loop** that lets users refine ("only last quarter", "group by region") without starting over.

## Stack

Python, LangChain, agentic RAG, Redash integration, LLMs.