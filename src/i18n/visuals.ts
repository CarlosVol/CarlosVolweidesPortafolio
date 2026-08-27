/**
 * Box-drawing art shown in a project's visual slot when it declares no `media`.
 * The column widths are hand-tuned, so it stays locale-neutral — and `asciiCols`
 * measures the widest line so the CSS can size the type to fit its container.
 */
export const PROJECT_VISUALS: Record<string, string> = {
  'frida': `┌─────────────────────────────┐
│  frida/clinical             │
│  ──────────────             │
│  12 bounded contexts        │
│  resident · vitals · meds   │
│                             │
│  domain                     │
│   └─ application            │
│       └─ infrastructure     │
│                             │
│  event bus · pyventus       │
│                             │
│  ✓ 356 pytest   ✓ 38 e2e    │
└─────────────────────────────┘`,
  'atlas-protocol': `┌─────────────────────────────┐
│  atlas/protocol             │
│  ─────────────              │
│  > generate_course("rust")  │
│  · indexing knowledge ████  │
│  · embedding 1.4M tokens    │
│  · path generated [12 mod]  │
│                             │
│  rag.query("ownership")     │
│  └─ context: 8 chunks       │
│  └─ confidence: 0.94        │
│                             │
│  ◉ session: active          │
└─────────────────────────────┘`,
  'repositorio-ugma': `┌──────────────────┐
│ ugma/repo        │
│ ──               │
│ tesis: 247       │
│ aprobadas: 198   │
│ pendientes: 49   │
│ usuarios: 1,2k   │
│                  │
│ [admin · alumno] │
└──────────────────┘`,
  'luxdata': `┌──────────────┐
│ luxdata      │
│ ──           │
│ rooms 64/82  │
│ checkin  12  │
│ revenue ↑18% │
└──────────────┘`,
};

/** Widest line of an ASCII block, in characters. Drives `--ascii-cols`. */
export function asciiCols(art: string): number {
  return Math.max(...art.split('\n').map((line) => line.length));
}
