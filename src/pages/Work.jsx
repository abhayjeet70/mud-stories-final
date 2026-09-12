import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Seo } from '../components/bits';
import { useNoScroll, useSlideshow } from '../hooks/useSlideshow';
import { projects } from '../data/projects';
import { site } from '../data/site';

/* Selected Work is a viewport-bound archive: every photograph across every
   project, shown one at a time with the project name laid over the image.
   The page does not scroll — navigation is autoplay, arrows, keys or swipe. */

const SLIDE_MS = 4200;

export default function Work() {
  // Flatten every project's gallery into one ordered reel.
  const reel = useMemo(
    () =>
      projects.flatMap((p, pi) =>
        p.gallery.map((img, gi) => ({
          img,
          title: p.title,
          location: p.location,
          category: p.category,
          year: p.year,
          slug: p.slug,
          projectNo: pi + 1,
          plate: gi + 1,
          plates: p.gallery.length,
        }))
      ),
    []
  );

  const { index, take, swipe } = useSlideshow(reel.length, SLIDE_MS);
  useNoScroll();

  const shot = reel[index];

  return (
    <>
      <Seo
        title={`Selected Work — ${site.name}`}
        description="Houses, interiors and landscapes built in earth, lime, bamboo and stone across Karnataka, Tamil Nadu and Uttar Pradesh."
        image={projects[0].cover.src}
      />

      <main id="main" className="stage" {...swipe}>
        <h1 className="sr">Selected work — {site.name}</h1>

        {reel.map((s, n) => (
          <div
            className="stage__slide"
            data-on={n === index}
            key={s.slug + s.img.src + n}
            aria-hidden={n !== index}
          >
            {/* Only the current slide and its neighbours are worth fetching. */}
            {Math.abs(n - index) <= 1 || n === 0 ? (
              <img
                src={s.img.src}
                alt={s.img.alt}
                width={s.img.w}
                height={s.img.h}
                loading={n === 0 ? 'eager' : 'lazy'}
                fetchPriority={n === 0 ? 'high' : 'auto'}
                decoding={n === 0 ? 'sync' : 'async'}
              />
            ) : null}
          </div>
        ))}
        <div className="stage__scrim" />

        <button
          className="stage__arrow stage__arrow--prev"
          onClick={() => take(index - 1)}
          aria-label="Previous image"
        >
          ←
        </button>
        <button
          className="stage__arrow stage__arrow--next"
          onClick={() => take(index + 1)}
          aria-label="Next image"
        >
          →
        </button>

        {/* Name overlay — changes with the image, links into the project. */}
        <div className="stage__label" key={shot.slug + index}>
          <p className="meta">
            Selected work / {String(shot.projectNo).padStart(2, '0')} — {shot.category} ·{' '}
            {shot.year}
          </p>
          <h2>
            <Link to={`/work/${shot.slug}`}>{shot.title}</Link>
          </h2>
          <p>{shot.img.caption}</p>
          <Link className="stage__enter" to={`/work/${shot.slug}`}>
            {shot.location} — View project
          </Link>
        </div>

        <div className="stage__counter">
          <span className="meta">
            {String(index + 1).padStart(2, '0')} / {reel.length}
          </span>
          <span className="stage__bar" aria-hidden="true">
            <i style={{ transform: `scaleX(${(index + 1) / reel.length})` }} />
          </span>
        </div>

        <p className="sr" aria-live="polite">
          {shot.title}, plate {shot.plate} of {shot.plates}
        </p>
      </main>
    </>
  );
}
