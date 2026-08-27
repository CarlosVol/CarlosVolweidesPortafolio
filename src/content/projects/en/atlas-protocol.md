---
title: Atlas Protocol
description: AI-powered web platform for building personalized technical courses. Generates study paths, contextual content, and a chat agent wired to a RAG system over the database.
role: Fullstack · Product Manager · Tech Lead
stack: ['Next.js', 'Supabase', 'Vercel AI', 'FastAPI', 'WebSocket']
status: live
statusLabel: MVP · Closed beta
featured: true
date: 2024-09-01
idx: '02'
---

## Overview

Atlas Protocol is an AI-powered learning platform for developers who want to learn technical subjects in a personalized way. The system generates complete study paths, contextual content for each module, and exposes a chat agent connected to a RAG system over the indexed content.

## Problem

Existing technical resources (documentation, courses) are generic and don't adapt to the learner's level or goals. Developers waste time navigating irrelevant content instead of learning what they actually need.

## Solution

A generation pipeline that takes a topic (e.g. "Rust", "System Design") and produces:

- A structured learning path broken into modules
- Explanatory content per module with code examples
- A knowledge base indexed as embeddings (RAG)
- A conversational agent that answers questions with course context

## Architecture

The FastAPI backend runs the generation pipeline and the RAG layer. The Next.js frontend consumes the API and keeps session state in Supabase. The agent's real-time communication uses WebSocket. The LLM is orchestrated through the Vercel AI SDK.

## Tech stack

- **Frontend**: Next.js 14, TypeScript, Vercel AI SDK
- **Backend**: FastAPI, Python, RAG system with embeddings
- **Database**: Supabase (PostgreSQL + Storage)
- **Real-time**: WebSocket for response streaming
- **Deploy**: Vercel (frontend), Railway (backend)
