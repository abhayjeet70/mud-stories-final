import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Seo } from '../components/bits';
import { projects } from '../data/projects';
import { site } from '../data/site';

const INTERVAL = 6000;

const reduced = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Home() {
  const [i, setI] = useState(0);
  const [held, setHeld] = useState(false); // user took control — stop autoplay
  const touch = useRef(null);

  const go = (n) => setI((n + projects.length) % projects.length);
  const take = (n) => {
    setHeld(true);
    go(n);
  };

  // Autoplay. Pauses when the tab is hidden, on interaction, on reduced motion.
  useEffect(() => {
    if (held || reduced()) return;
    const id = setInterval(() => {
      if (!document.hidden) setI((v) => (v + 1) % projects.length);
    }, INTERVAL);
    return () => clearInterval(id);
  }, [held]);

  // Arrow keys.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') take(i - 1);
      if (e.key === 'ArrowRight') take(i + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [i]);

  // The homepage is viewport-bound; no page scroll behind it.
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  const active = projects[i];

  return (
    <>
      <Seo
        title={`${site.name} — ${site.strapline}`}
        description={site.description}
        image={active.cover.src}
      />
      <Header light />

      <main
        id="main"
        className="stage"
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return;
          const d = e.changedTouches[0].clientX - touch.current;
          if (Math.abs(d) > 45) take(d < 0 ? i + 1 : i - 1);
          touch.current = null;
        }}
      >
        <h1 className="sr">
          {site.name} — {site.strapline}
        </h1>

        {projects.map((p, n) => (
          <div className="stage__slide" data-on={n === i} key={p.slug} aria-hidden={n !== i}>
            <img
              src={p.cover.src}
              alt={p.cover.alt}
              width={p.cover.w}
              height={p.cover.h}
              loading={n === 0 ? 'eager' : 'lazy'}
              fetchPriority={n === 0 ? 'high' : 'auto'}
              decoding={n === 0 ? 'sync' : 'async'}
            />
          </div>
        ))}
        <div className="stage__scrim" />

        <button
          className="stage__arrow stage__arrow--prev"
          onClick={() => take(i - 1)}
          aria-label="Previous project"
        >
          ←
        </button>
        <button
          className="stage__arrow stage__arrow--next"
          onClick={() => take(i + 1)}
          aria-label="Next project"
        >
          →
        </button>

        <div className="stage__label" key={active.slug}>
          <p className="meta">
            Selected work / {String(i + 1).padStart(2, '0')} — {active.category} · {active.year}
          </p>
          <h2>
            <Link to={`/work/${active.slug}`}>{active.title}</Link>
          </h2>
          <p>{active.summary}</p>
          <Link className="stage__enter" to={`/work/${active.slug}`}>
            {active.location} — View project
          </Link>
        </div>

        <div className="stage__ticks" role="tablist" aria-label="Projects">
          {projects.map((p, n) => (
            <button
              key={p.slug}
              role="tab"
              aria-current={n === i}
              aria-label={p.title}
              onClick={() => take(n)}
            />
          ))}
        </div>
      </main>
    </>
  );
}
