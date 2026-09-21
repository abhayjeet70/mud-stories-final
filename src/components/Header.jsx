import { useCallback, useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { projects } from '../data/projects';
import { site } from '../data/site';
import { enquiryPages } from '../data/enquiries';

const LINKS = [
  { to: '/work', label: 'Work' },
  { to: '/studio', label: 'Studio' },
  { to: '/notes', label: 'Notes' },
];

const projectItems = projects.map((p) => ({
  to: `/work/${p.slug}`,
  title: p.title,
  note: p.location,
}));

const contactItems = enquiryPages.map((p) => ({
  to: `/contact/${p.slug}`,
  title: p.nav,
  note: p.navNote,
}));

/* One folder-style nav menu, used by both + Projects and + Contact.
   Closing is deferred so the pointer can travel from the trigger into the
   panel — the panel sits flush and makes the visual gap with its own padding,
   so there is no dead zone to cross. */
function NavMenu({ label, items, current }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef(null);
  const trigger = useRef(null);
  const shut = useRef(null);

  const keepOpen = useCallback(() => {
    clearTimeout(shut.current);
    setOpen(true);
  }, []);
  const shutSoon = useCallback(() => {
    clearTimeout(shut.current);
    shut.current = setTimeout(() => setOpen(false), 320);
  }, []);
  useEffect(() => () => clearTimeout(shut.current), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    const onDown = (e) => {
      if (wrap.current && !wrap.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, [open]);

  return (
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
        aria-current={current ? 'page' : undefined}
        onClick={() => (open ? setOpen(false) : keepOpen())}
      >
        + {label}
      </button>
      {open && (
        <div className="drop" onMouseEnter={keepOpen} onMouseLeave={shutSoon}>
          <div className="drop__inner" role="menu" aria-label={label}>
            {items.map((it) => (
              <Link key={it.to} to={it.to} role="menuitem">
                {it.title}
                <span>{it.note}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* `light` inverts the header to white type for the full-bleed slideshow routes. */
export default function Header({ light = false }) {
  const [sheet, setSheet] = useState(false);
  const [openAcc, setOpenAcc] = useState(null); // 'projects' | 'contact' | null
  const { pathname } = useLocation();

  useEffect(() => {
    setSheet(false);
    setOpenAcc(null);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = sheet ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [sheet]);

  const acc = (key, label, items) => (
    <>
      <button
        aria-expanded={openAcc === key}
        onClick={() => setOpenAcc((v) => (v === key ? null : key))}
      >
        {openAcc === key ? '−' : '+'} {label}
      </button>
      {openAcc === key && (
        <div className="sub">
          {items.map((it) => (
            <Link key={it.to} to={it.to}>
              {it.title} — {it.note}
            </Link>
          ))}
        </div>
      )}
    </>
  );

  return (
    <>
      <header className={`header ${light ? 'header--light' : 'header--dark'}`}>
        <Link to="/" className="wordmark" aria-label={`${site.name} — home`}>
          <span>Mud Stories</span>
          <small>{site.strapline}</small>
        </Link>

        <nav className="nav" aria-label="Primary">
          <NavMenu label="Projects" items={projectItems} current={pathname.startsWith('/work/')} />
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to}>
              {l.label}
            </NavLink>
          ))}
          <NavMenu label="Contact" items={contactItems} current={pathname.startsWith('/contact')} />
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
            {acc('projects', 'Projects', projectItems)}
            {LINKS.map((l) => (
              <NavLink key={l.to} to={l.to}>
                {l.label}
              </NavLink>
            ))}
            {acc('contact', 'Contact', contactItems)}
          </nav>
        </div>
      )}
    </>
  );
}
