import { useCallback, useEffect, useRef } from 'react';

/* Fullscreen viewer. Traps focus, restores it on close, announces position. */
export default function Lightbox({ items, index, onClose, onMove }) {
  const box = useRef(null);
  const restoreTo = useRef(null);

  const item = items[index];
  const hasPrev = index > 0;
  const hasNext = index < items.length - 1;

  const move = useCallback(
    (d) => {
      const n = index + d;
      if (n >= 0 && n < items.length) onMove(n);
    },
    [index, items.length, onMove]
  );

  useEffect(() => {
    restoreTo.current = document.activeElement;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    box.current?.querySelector('button')?.focus();

    const onKey = (e) => {
      if (e.key === 'Escape') return onClose();
      if (e.key === 'ArrowLeft') return move(-1);
      if (e.key === 'ArrowRight') return move(1);
      if (e.key !== 'Tab') return;
      // Focus trap.
      const f = box.current?.querySelectorAll('button');
      if (!f || !f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      restoreTo.current?.focus?.();
    };
  }, [onClose, move]);

  if (!item) return null;

  return (
    <div
      className="lb"
      ref={box}
      role="dialog"
      aria-modal="true"
      aria-label={`Image ${index + 1} of ${items.length}`}
    >
      <button className="lb__btn lb__close" onClick={onClose} aria-label="Close viewer">
        ✕
      </button>
      {hasPrev && (
        <button className="lb__btn lb__prev" onClick={() => move(-1)} aria-label="Previous image">
          ←
        </button>
      )}
      <img
        className="lb__img"
        src={item.src}
        alt={item.alt || ''}
        width={item.w}
        height={item.h}
      />
      {hasNext && (
        <button className="lb__btn lb__next" onClick={() => move(1)} aria-label="Next image">
          →
        </button>
      )}
      <p className="lb__count" aria-live="polite">
        {index + 1} / {items.length}
      </p>
    </div>
  );
}
