import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal, Seo } from '../components/bits';
import { projects } from '../data/projects';
import { site } from '../data/site';

/* Hovering a row floats that project's photograph alongside the cursor.
   Pointer-driven only — it is decorative and hidden below 900px. */
export default function Work() {
  const [hover, setHover] = useState(null);
  const peek = useRef(null);

  const track = (e) => {
    if (!peek.current) return;
    peek.current.style.transform = `translate(${e.clientX + 28}px, ${e.clientY - 190}px)`;
  };

  return (
    <>
      <Seo
        title={`Selected Work — ${site.name}`}
        description="Houses, interiors and landscapes built in earth, lime, bamboo and stone across Karnataka, Tamil Nadu and Uttar Pradesh."
      />
      <main id="main" className="page" onMouseMove={track}>
        <div className="wide section--tight">
          <Reveal>
            <p className="meta">Index — {projects.length} projects</p>
            <h1 className="display" style={{ marginTop: 16 }}>
              Selected
              <br />
              Work
            </h1>
          </Reveal>
        </div>

        <div className="wide">
          <div className="index">
            {projects.map((p, n) => (
              <Link
                key={p.slug}
                to={`/work/${p.slug}`}
                className="index__row"
                onMouseEnter={() => setHover(p)}
                onMouseLeave={() => setHover(null)}
              >
                <span className="meta">{String(n + 1).padStart(2, '0')}</span>
                <h3>{p.title}</h3>
                <span className="meta index__loc">{p.location}</span>
                <span className="meta index__cat">{p.category}</span>
                <span className="meta index__yr">{p.year}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="wide section">
          <Reveal>
            <p className="lede" style={{ maxWidth: '34ch' }}>
              Every project begins with a day on the land and a hand test of the subsoil.
            </p>
          </Reveal>
        </div>
      </main>

      <div className="peek" ref={peek} data-on={!!hover} aria-hidden="true">
        {hover && <img src={hover.cover.src} alt="" width={hover.cover.w} height={hover.cover.h} />}
      </div>
    </>
  );
}
