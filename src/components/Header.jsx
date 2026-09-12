import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { projects } from '../data/projects';
import { site } from '../data/site';

const LINKS = [
  { to: '/work', label: 'Work' },
  { to: '/studio', label: 'Studio' },
  { to: '/notes', label: 'Notes' },
  { to: '/contact', label: 'Contact' },
];

/* `light` inverts the header to white type for the full-bleed homepage. */
export default function Header({ light = false }) {
  const [open, setOpen] = useState(false); // desktop projects dropdown
  const [sheet, setSheet] = useState(false); // mobile panel
  const [acc, setAcc] = useState(false); // mobile projects accordion
  const wrap = useRef(null);
  const trigger = useRef(null);
  const shutTimer = useRef(null);
  const { pathname } = useLocation();

  // Closing is deferred so a pointer crossing between the trigger and the panel
  // — or briefly leaving and coming back — does not dismiss the menu.
  const keepOpen = useCallback(() => {
    clearTimeout(shutTimer.current);
    setOpen(true);
  }, []);
  const shutSoon = useCallback(() => {
    clearTimeout(shutTimer.current);
    shutTimer.current = setTimeout(() => setOpen(false), 320);
  }, []);
  useEffect(() => () => clearTimeout(shutTimer.current), []);

  // Close everything on navigation.
  useEffect(() => {
    setOpen(false);
    setSheet(false);
    setAcc(false);
  }, [pathname]);

  // Lock scroll behind the mobile sheet.
  useEffect(() => {
    document.body.style.overflow = sheet ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sheet]);

  // Escape closes the dropdown and returns focus to its trigger.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const onClick = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [open]);

  return (
    <>
      <header className={`header ${light ? 'header--light' : 'header--dark'}`}>
        <Link to="/" className="wordmark" aria-label={`${site.name} — home`}>
          <span>Mud Stories</span>
          <small>{site.strapline}</small>
        </Link>

        <nav className="nav" aria-label="Primary">
          <div
            className="dropwrap"
            ref={wrap}
            onMouseEnter={keepOpen}
            onMouseLeave={shutSoon}
            onFocus={keepOpen}
          >
            <button
              ref={trigger}
              aria-haspopup="true"
              aria-expanded={open}
              onClick={() => (open ? setOpen(false) : keepOpen())}
            >
              + Projects
            </button>
            {open && (
              <div className="drop" onMouseEnter={keepOpen} onMouseLeave={shutSoon}>
                <div className="drop__inner" role="menu" aria-label="Projects">
                  {projects.map((p) => (
                    <Link key={p.slug} to={`/work/${p.slug}`} role="menuitem">
                      {p.title}
                      <span>{p.location}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button className="burger" onClick={() => setSheet(true)} aria-expanded={sheet}>
          Menu
        </button>
      </header>

      {sheet && (
        <div className="sheet" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="sheet__top">
            <span className="meta">Mud Stories</span>
            <button className="sheet__close" onClick={() => setSheet(false)}>
              Close
            </button>
          </div>
          <nav aria-label="Mobile">
            <button aria-expanded={acc} onClick={() => setAcc((v) => !v)}>
              {acc ? '− Projects' : '+ Projects'}
            </button>
            {acc && (
              <div className="sub">
                {projects.map((p) => (
                  <Link key={p.slug} to={`/work/${p.slug}`}>
                    {p.title} — {p.location}
                  </Link>
                ))}
              </div>
            )}
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to}>
                {l.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
