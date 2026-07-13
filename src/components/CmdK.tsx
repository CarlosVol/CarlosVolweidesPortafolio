import { useState, useEffect, useRef, useMemo } from 'react';

export type CmdkItem = { label: string; hint: string; href: string };

export type CmdkLabels = {
  placeholder: string;
  noResults: string;
  navigate: string;
  select: string;
  close: string;
};

interface Props {
  items: CmdkItem[];
  labels: CmdkLabels;
}

const trimSlash = (path: string) => path.replace(/\/+$/, '');

export default function CmdK({ items: allItems, labels }: Props) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [idx, setIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const items = useMemo(() => {
    if (!q) return allItems;
    return allItems.filter(i => i.label.toLowerCase().includes(q.toLowerCase()));
  }, [q, allItems]);

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

  const navigate = (item: CmdkItem) => {
    if (item.href.startsWith('mailto')) {
      window.location.href = item.href;
    } else if (item.href.startsWith('http')) {
      window.open(item.href, '_blank', 'noopener');
    } else if (item.href.includes('#')) {
      // Section anchors only scroll when we are already on the page that owns
      // them — from /projects or another locale we have to navigate instead.
      const [path, hash] = item.href.split('#');
      if (trimSlash(path) === trimSlash(window.location.pathname)) {
        document.getElementById(hash)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = item.href;
      }
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
          placeholder={labels.placeholder}
          value={q}
          onChange={e => setQ(e.target.value)}
          onKeyDown={onKey}
        />
        <div className="cmdk-list">
          {items.length === 0 && (
            <div className="cmdk-item" style={{ color: 'var(--fg-dim)' }}>{labels.noResults}</div>
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
          <span><kbd>↑↓</kbd>{labels.navigate}</span>
          <span><kbd>↵</kbd>{labels.select}</span>
          <span><kbd>esc</kbd>{labels.close}</span>
        </div>
      </div>
    </div>
  );
}
