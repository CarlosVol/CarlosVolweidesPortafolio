---
title: Atlas Protocol
description: AI-powered web platform for building personalized technical courses. Generates study paths, contextual content, and a streaming chat agent grounded by system prompts.
role: Fullstack · Product Manager · Tech Lead
stack: ['Next.js', 'Supabase', 'Vercel AI', 'FastAPI', 'WebSocket']
status: live
statusLabel: MVP · Closed beta
featured: true
date: 2024-09-01
idx: '02'
---

## Overview

Atlas Protocol is an AI-powered learning platform for developers who want to learn technical subjects in a personalized way. The system generates complete study paths, contextual content for each module, and exposes a chat agent grounded in the course content.

## Problem

Existing technical resources (documentation, courses) are generic and don't adapt to the learner's level or goals. Developers waste time navigating irrelevant content instead of learning what they actually need.

## Solution

A generation pipeline that takes a topic (e.g. "Rust", "System Design") and produces:

- A structured learning path broken into modules
- Explanatory content per module with code examples
- A conversational agent that answers in streaming with course context

## Architecture

The FastAPI backend runs the generation pipeline and builds the system prompts that ground the agent in the course and user context. The Next.js frontend consumes the API and keeps session state in Supabase. The agent's real-time communication uses WebSocket, with model responses streamed token by token. The LLM is orchestrated through the Vercel AI SDK.

## Tech stack

- **Frontend**: Next.js 14, TypeScript, Vercel AI SDK
- **Backend**: FastAPI, Python, streaming LLM orchestration
- **Database**: Supabase (PostgreSQL + Storage)
- **Real-time**: WebSocket for response streaming
- **Deploy**: Vercel (frontend), Railway (backend)
