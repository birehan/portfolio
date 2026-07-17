---
title: "Fine-tuning Llama 2 for Amharic Text Generation"
slug: fine-tuning-llama-2-amharic
role: ML / NLP Engineer (10 Academy capstone)
summary: "Fine-tuned Llama 2 to enable quality embeddings and text generation in Amharic, then used it inside a RAG-based ad-copy builder for the Ethiopian market."
outcome: "Hugging Face-hosted model + retrieval pipeline for Amharic ad generation."
stack:
  - Llama 2
  - Hugging Face Transformers
  - PyTorch
  - LangChain
  - RAG
links:
  github: https://github.com/Adwa-Collab/Amharic-RAG-Ad-Builder
  medium: https://medium.com/@birehanzewdie4/llm-finetuning-enabling-quality-embedding-and-text-generation-for-amharic-language-643d55c90d33
order: 4
date: 2024
---

# Fine-tuning Llama 2 for Amharic Text Generation

**A Hugging Face-hosted Llama 2 fine-tune for Amharic**, plus a RAG pipeline that uses it to generate ad copy for the Ethiopian market, bringing a low-resource language into a usable generative workflow.

## The problem

Most open LLMs handle Amharic poorly: tokenization is inefficient and generation quality is low, so off-the-shelf models can't produce usable Amharic embeddings or copy.

## What I built

- **Fine-tuned Llama 2** on Amharic data to improve embedding quality and text generation for the language.
- **Published the model on Hugging Face** so it's reusable, not trapped in a notebook.
- **A RAG-based ad-copy builder** that retrieves relevant context and generates on-brand Amharic ad copy.

## How I measured quality

I compared embedding and generation quality before and after fine-tuning on Amharic samples; the Medium write-up details the data prep, training setup, and the quality gains that made the downstream RAG viable.

## Stack

Llama 2, Hugging Face Transformers, PyTorch, LangChain, RAG.
