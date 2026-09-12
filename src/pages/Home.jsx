import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { Seo } from '../components/bits';
import { useNoScroll, useSlideshow } from '../hooks/useSlideshow';
import { projects } from '../data/projects';
import { site } from '../data/site';

const INTERVAL = 6000;

export default function Home() {
  const { index: i, take, swipe } = useSlideshow(projects.length, INTERVAL);
  useNoScroll();

  const active = projects[i];

  return (
    <>
      <Seo
        title={`${site.name} — ${site.strapline}`}
        description={site.description}
        image={active.cover.src}
      />
      <Header light />

      <main id="main" className="stage" {...swipe}>
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
