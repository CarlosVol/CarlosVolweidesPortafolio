---
title: Atlas Protocol
description: Plataforma web impulsada con IA para crear cursos técnicos personalizados. Genera rutas de estudio, contenido contextual y un chat en streaming con un agente contextualizado por system prompts.
role: Fullstack · Product Manager · Tech Lead
stack: ['Next.js', 'Supabase', 'Vercel AI', 'FastAPI', 'WebSocket']
status: live
statusLabel: MVP · Closed beta
featured: true
date: 2024-09-01
idx: '02'
---

## Overview

Atlas Protocol es una plataforma educativa impulsada por IA diseñada para desarrolladores que quieren aprender tecnologías técnicas de forma personalizada. El sistema genera rutas de estudio completas, contenido contextual para cada módulo, y expone un agente de chat contextualizado con el contenido del curso.

## Problema

Los recursos técnicos existentes (documentación, cursos) son genéricos y no se adaptan al nivel ni los objetivos del estudiante. El desarrollador pierde tiempo navegando contenido irrelevante en lugar de aprender lo que necesita.

## Solución

Un pipeline de generación que toma un tema (ej: "Rust", "System Design") y produce:

- Ruta de aprendizaje estructurada en módulos
- Contenido explicativo por módulo con ejemplos de código
- Agente conversacional que responde en streaming con el contexto del curso

## Arquitectura

El backend FastAPI maneja el pipeline de generación y la construcción de los system prompts que contextualizan al agente con la información del curso y del usuario. El frontend Next.js consume la API y mantiene estado de sesión vía Supabase. La comunicación en tiempo real del agente usa WebSocket, con las respuestas del modelo transmitidas en streaming. El LLM se orquesta vía Vercel AI SDK.

## Stack técnico

- **Frontend**: Next.js 14, TypeScript, Vercel AI SDK
- **Backend**: FastAPI, Python, orquestación de LLM en streaming
- **Base de datos**: Supabase (PostgreSQL + Storage)
- **Tiempo real**: WebSocket para streaming de respuestas
- **Deploy**: Vercel (frontend), Railway (backend)
