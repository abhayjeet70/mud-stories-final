import { Link } from 'react-router-dom';
import { Picture, Reveal, Seo } from '../components/bits';
import { projects } from '../data/projects';
import { site } from '../data/site';

/* Image-led project index. Each project shows its photograph directly —
   no hover reveal, no cursor-following preview. Two-up so several projects
   are visible without scrolling. */

export default function Work() {
  return (
    <>
      <Seo
        title={`Selected Work — ${site.name}`}
        description="Houses, interiors and landscapes built in earth, lime, bamboo and stone across Karnataka, Tamil Nadu and Uttar Pradesh."
        image={projects[0].cover.src}
      />
      <main id="main" className="page">
        <div className="wide">
          <Reveal>
            <p className="meta">Index — {projects.length} projects</p>
            <h1 className="display" style={{ margin: '12px 0 30px' }}>
              Selected Work
            </h1>
          </Reveal>
        </div>

        <div className="wide">
          <div className="grid">
            {projects.map((p, n) => (
              <Reveal as="article" className="tile" key={p.slug}>
                <Link to={`/work/${p.slug}`}>
                  <Picture
                    img={p.cover}
                    priority={n < 2}
                    ratio="4 / 3"
                    sizes="(max-width: 860px) 100vw, 46vw"
                  />
                  <div className="tile__foot">
                    <h2>{p.title}</h2>
                    <p className="meta">
                      {p.location} · {p.category} · {p.year}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>

        <div className="wide section--tight">
          <Reveal>
            <p className="lede" style={{ maxWidth: '34ch' }}>
              Every project begins with a day on the land and a hand test of the subsoil.
            </p>
          </Reveal>
        </div>
      </main>
    </>
  );
}
