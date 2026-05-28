import { useState, useEffect, useRef, useMemo } from 'react';

const SECTIONS = [
  { id: 'home',     label: 'index',      num: '00' },
  { id: 'about',    label: 'about',      num: '01' },
  { id: 'stack',    label: 'stack',      num: '02' },
  { id: 'work',     label: 'experience', num: '03' },
  { id: 'projects', label: 'projects',   num: '04' },
  { id: 'contact',  label: 'contact',    num: '05' },
];

type Item = { kind: string; label: string; hint: string; href: string };

export default function CmdK() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items: Item[] = useMemo(() => {
    const all: Item[] = [
      ...SECTIONS.map(s => ({ kind: 'nav', label: `Go to ${s.label}`, hint: s.num, href: `/#${s.id}` })),
      { kind: 'action', label: 'Send email',    hint: 'mail', href: 'mailto:carlos.volweides@gmail.com' },
      { kind: 'action', label: 'Open GitHub',   hint: 'gh',   href: 'https://github.com/CarlosVol' },
      { kind: 'action', label: 'Open LinkedIn', hint: 'in',   href: 'https://linkedin.com/in/carlos-volweides' },
      { kind: 'nav',    label: 'All projects',  hint: '04',   href: '/projects' },
    ];
    if (!q) return all;
    return all.filter(i => i.label.toLowerCase().includes(q.toLowerCase()));
  }, [q]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setOpen(v => !v); }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Listen for trigger button click from Header
  useEffect(() => {
    const btn = document.getElementById('cmdk-trigger');
    const handler = () => setOpen(true);
    btn?.addEventListener('click', handler);
    return () => btn?.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
    else { setQ(''); setIdx(0); }
  }, [open]);

  useEffect(() => { setIdx(0); }, [q]);

  const navigate = (item: Item) => {
    if (item.href.startsWith('#') || item.href.startsWith('/#')) {
      const sectionId = item.href.replace('/#', '');
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else if (item.href.startsWith('mailto')) {
      window.location.href = item.href;
    } else if (item.href.startsWith('http')) {
      window.open(item.href, '_blank', 'noopener');
    } else {
      window.location.href = item.href;
    }
    setOpen(false);
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setIdx(i => Math.min(i + 1, items.length - 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setIdx(i => Math.max(i - 1, 0)); }
    if (e.key === 'Enter') { const it = items[idx]; if (it) navigate(it); }
    if (e.key === 'Escape') setOpen(false);
  };

  if (!open) return null;

  return (
    <div className="cmdk-overlay open" onClick={() => setOpen(false)}>
      <div className="cmdk" onClick={e => e.stopPropagation()}>
        <input
          ref={inputRef}
          className="cmdk-input"
          placeholder="$ search nav · projects · contact..."
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={onKey}
        />
        <div className="cmdk-list">
          {items.length === 0 && (
            <div className="cmdk-item" style={{ color: 'var(--fg-dim)' }}>no results</div>
          )}
          {items.map((it, i) => (
            <div
              key={it.label}
              className={`cmdk-item${i === idx ? ' active' : ''}`}
              onMouseEnter={() => setIdx(i)}
              onClick={() => navigate(it)}
            >
              <span className="num">{it.hint}</span>
              <span>{it.label}</span>
              <span className="arrow">↵</span>
            </div>
          ))}
        </div>
        <div className="cmdk-foot">
          <span><kbd>↑↓</kbd>navigate</span>
          <span><kbd>↵</kbd>select</span>
          <span><kbd>esc</kbd>close</span>
        </div>
      </div>
    </div>
  );
}
