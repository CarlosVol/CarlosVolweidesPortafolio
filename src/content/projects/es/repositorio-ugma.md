---
title: Repositorio UGMA
description: Repositorio institucional de trabajos de grado para la UGMA. Permite a alumnos investigar tesis publicadas y a coordinadores administrar el ciclo de aprobación. Implementado internamente en la universidad.
role: Backend · Product Owner · Lead
stack: ['PHP', 'JavaScript', 'SQL', 'NoSQL', 'HTML/CSS']
status: deployed
statusLabel: Deployed · Internal
featured: false
date: 2023-06-01
idx: '03'
---

## Overview

Sistema de gestión de trabajos de grado para la Universidad Gran Mariscal de Ayacucho (UGMA), en uso interno en la universidad.

## Problema

La universidad manejaba el proceso de aprobación y publicación de tesis de forma manual (papel y correo). Los alumnos no tenían forma de buscar trabajos previos, y los coordinadores carecían de visibilidad sobre el estado del ciclo de aprobación.

## Solución

Plataforma web con dos roles diferenciados:

- **Alumnos**: búsqueda y consulta de tesis por área, autor, año y palabras clave
- **Coordinadores**: administración del ciclo completo (recepción, revisión, correcciones, aprobación, publicación)

## Características

- Búsqueda full-text con filtros múltiples
- Flujo de aprobación con estados y notificaciones
- Panel administrativo para coordinadores
- Descarga de documentos aprobados
- Dashboard con estadísticas de ocupación y estado del repositorio

## Impacto

Sustituyó un proceso que se llevaba en papel y por correo. Los alumnos pasaron a poder consultar el trabajo de los graduados por su cuenta, y los coordinadores a ver en qué punto del ciclo está cada tesis sin perseguir el expediente.

Está implementado de manera interna en la universidad.
