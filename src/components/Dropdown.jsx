import { useCallback, useEffect, useId, useRef, useState } from 'react';

/* A listbox styled like the site's Projects menu. Native <select> chrome is
   drawn by the OS and cannot be matched to the editorial panel, so this is a
   hand-built one — which means the keyboard and screen-reader behaviour the
   native control gives for free has to be implemented here:
   arrows / Home / End move, Enter or Space commits, Escape cancels, typing a
   letter jumps, and focus returns to the trigger on close. */
export default function Dropdown({ label, options, value, onChange, name }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => Math.max(0, options.indexOf(value)));
  const trigger = useRef(null);
  const list = useRef(null);
  const wrap = useRef(null);
  const typed = useRef({ buf: '', at: 0 });
  const id = useId();

  const close = useCallback(
    (restoreFocus = true) => {
      setOpen(false);
      if (restoreFocus) trigger.current?.focus();
    },
    []
  );

  const commit = useCallback(
    (i) => {
      onChange(options[i]);
      close();
    },
    [options, onChange, close]
  );

  // Move the DOM focus with the active option so screen readers follow along.
  useEffect(() => {
    if (!open) return;
    const el = list.current?.children[active];
    el?.focus();
    el?.scrollIntoView({ block: 'nearest' });
  }, [open, active]);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const openAt = () => {
    setActive(Math.max(0, options.indexOf(value)));
    setOpen(true);
  };

  const onTriggerKey = (e) => {
    if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
      e.preventDefault();
      openAt();
    }
  };

  const onListKey = (e) => {
    const last = options.length - 1;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActive((i) => (i >= last ? 0 : i + 1));
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActive((i) => (i <= 0 ? last : i - 1));
        break;
      case 'Home':
        e.preventDefault();
        setActive(0);
        break;
      case 'End':
        e.preventDefault();
        setActive(last);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        commit(active);
        break;
      case 'Escape':
        e.preventDefault();
        close();
        break;
      case 'Tab':
        close(false);
        break;
      default:
        // Type-ahead: jump to the next option starting with the typed letters.
        if (e.key.length === 1) {
          const now = Date.now();
          typed.current.buf = now - typed.current.at > 600 ? e.key : typed.current.buf + e.key;
          typed.current.at = now;
          const q = typed.current.buf.toLowerCase();
          const hit = options.findIndex((o) => o.toLowerCase().startsWith(q));
          if (hit >= 0) setActive(hit);
        }
    }
  };

  return (
    <div className="dd" ref={wrap}>
      <span className="dd__label" id={`${id}-label`}>
        {label}
      </span>

      {/* Carries the value for anything reading the form natively. */}
      <input type="hidden" name={name} value={value} />

      <button
        type="button"
        ref={trigger}
        className="dd__trigger"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={`${id}-label ${id}-value`}
        onClick={() => (open ? close(false) : openAt())}
        onKeyDown={onTriggerKey}
      >
        <span id={`${id}-value`}>{value}</span>
        <i className="dd__caret" aria-hidden="true" />
      </button>

      {open && (
        <ul
          className="dd__list"
          role="listbox"
          ref={list}
          aria-labelledby={`${id}-label`}
          aria-activedescendant={`${id}-opt-${active}`}
          onKeyDown={onListKey}
        >
          {options.map((o, i) => (
            <li
              key={o}
              id={`${id}-opt-${i}`}
              role="option"
              tabIndex={-1}
              aria-selected={o === value}
              data-active={i === active}
              onClick={() => commit(i)}
              onMouseEnter={() => setActive(i)}
            >
              {o}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
