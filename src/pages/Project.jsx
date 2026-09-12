import { useEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import Lightbox from '../components/Lightbox';
import { Picture, Reveal, Seo } from '../components/bits';
import { projects, projectBySlug } from '../data/projects';
import { site } from '../data/site';

export default function Project() {
  const { slug } = useParams();
  const project = projectBySlug(slug);

  const track = useRef(null);
  const [box, setBox] = useState(null); // lightbox index, or null
  const [edge, setEdge] = useState({ start: true, end: false });

  // Recompute which track arrows are usable.
  const measure = () => {
    const el = track.current;
    if (!el) return;
    setEdge({
      start: el.scrollLeft <= 4,
      end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 4,
    });
  };

  useEffect(() => {
    measure();
    const el = track.current;
    el?.addEventListener('scroll', measure, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      el?.removeEventListener('scroll', measure);
      window.removeEventListener('resize', measure);
    };
  }, [slug]);

  // Reset the horizontal position when moving between projects.
  useEffect(() => {
    if (track.current) track.current.scrollLeft = 0;
  }, [slug]);

  if (!project) return <Navigate to="/404" replace />;

  const step = (dir) => {
    const el = track.current;
    if (!el) return;
    const shot = el.querySelector('.shot');
    const by = shot ? shot.getBoundingClientRect().width + 15 : el.clientWidth * 0.7;
    el.scrollBy({ left: dir * by, behavior: 'smooth' });
  };

  const at = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(at + 1) % projects.length];

  return (
    <>
      <Seo
        title={`${project.title}, ${project.location} — ${site.name}`}
        description={project.summary}
        image={project.cover.src}
      />

      <main id="main" className="page">
        <article>
          <header className="wide proj__head">
            <p className="meta">
              Project {String(at + 1).padStart(2, '0')} — {project.category}
            </p>
            <h1>{project.title}</h1>
          </header>

          {/* Horizontal media track — vertical stack below 900px (see CSS). */}
          <section className="track__wrap" aria-label={`${project.title} gallery`}>
            <button
              className="track__btn track__btn--prev"
              onClick={() => step(-1)}
              disabled={edge.start}
              aria-label="Previous image"
            >
              ←
            </button>

            <div className="track" ref={track} tabIndex={0}>
              {project.gallery.map((g, n) => (
                <figure className="shot" key={g.src + n}>
                  <Picture
                    img={g}
                    className="shot__frame"
                    ratio={`${g.w} / ${g.h}`}
                    priority={n === 0}
                    sizes="(max-width: 900px) 100vw, 46vw"
                  >
                    <button
                      className="shot__zoom"
                      onClick={() => setBox(n)}
                      aria-label={`Enlarge image ${n + 1} of ${project.gallery.length}`}
                    >
                      +
                    </button>
                  </Picture>
                  <figcaption>{g.caption}</figcaption>
                </figure>
              ))}
            </div>

            <button
              className="track__btn track__btn--next"
              onClick={() => step(1)}
              disabled={edge.end}
              aria-label="Next image"
            >
              →
            </button>
          </section>

          <div className="wide" style={{ paddingTop: 8 }}>
            <Reveal>
              <p className="lede" style={{ maxWidth: '34ch', margin: 0 }}>
                {project.summary}
              </p>
              <dl className="proj__facts">
                <div>
                  <dt className="meta">Location</dt>
                  <dd>{project.location}</dd>
                </div>
                <div>
                  <dt className="meta">Year</dt>
                  <dd>{project.year}</dd>
                </div>
                <div>
                  <dt className="meta">Area</dt>
                  <dd>{project.area}</dd>
                </div>
                <div>
                  <dt className="meta">Status</dt>
                  <dd>{project.status}</dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <div className="wide section--tight">
            <div className="two">
              <Reveal>
                <h2 className="meta">The brief</h2>
                <div className="prose" style={{ marginTop: 14 }}>
                  <p>{project.brief}</p>
                </div>
              </Reveal>
              <Reveal>
                <h2 className="meta">The approach</h2>
                <div className="prose" style={{ marginTop: 14 }}>
                  <p>{project.approach}</p>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="wide section--tight">
            <div className="two">
              <Reveal>
                <h2 className="meta">Materials</h2>
                <ul className="list" style={{ marginTop: 14 }}>
                  {project.materials.map((m) => (
                    <li key={m} style={{ gridTemplateColumns: '1fr', padding: '14px 0' }}>
                      {m}
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal>
                <h2 className="meta">In numbers</h2>
                <ul className="list" style={{ marginTop: 14 }}>
                  {project.facts.map((f) => (
                    <li key={f.label} style={{ gridTemplateColumns: '150px 1fr', padding: '14px 0' }}>
                      <span className="meta">{f.label}</span>
                      <span>{f.value}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>

          <div className="wide">
            <Link className="next" to={`/work/${next.slug}`}>
              <p className="meta">Next project</p>
              <h2>{next.title}</h2>
              <p className="meta">{next.location}</p>
            </Link>
          </div>
        </article>
      </main>

      {box !== null && (
        <Lightbox
          items={project.gallery}
          index={box}
          onMove={setBox}
          onClose={() => setBox(null)}
        />
      )}
    </>
  );
}
