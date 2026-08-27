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
│  · building path       ███  │
│  · modules drafted          │
│                             │
│  chat.ask("ownership")      │
│  └─ system prompt: course   │
│  └─ streaming ▍             │
│                             │
│  ◉ session: active          │
└─────────────────────────────┘`,
  'repositorio-ugma': `┌──────────────────┐
│ ugma/repo        │
│ ──               │
│ buscar tesis     │
│ ├─ área          │
│ ├─ autor         │
│ └─ año           │
│                  │
│ aprobación:      │
│ ○─○─◉─○          │
│                  │
│ [admin · alumno] │
└──────────────────┘`,
  'luxdata': `┌──────────────┐
│ luxdata      │
│ ──           │
│ reservas     │
│ check in/out │
│ facturación  │
│ ocupación    │
└──────────────┘`,
};

/** Widest line of an ASCII block, in characters. Drives `--ascii-cols`. */
export function asciiCols(art: string): number {
  return Math.max(...art.split('\n').map((line) => line.length));
}
