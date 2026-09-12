import { Picture, Reveal, Seo } from '../components/bits';
import { notes } from '../data/studio';
import { site } from '../data/site';

/* Chronological studio notes — the material research the practice actually runs.
   No awards or press are listed because the source content records none.
   Laid out as alternating image/text bands rather than a text list. */
export default function Notes() {
  return (
    <>
      <Seo
        title={`Notes — ${site.name}`}
        description="Material research from the studio: lime over cement render, blocks from urban excavation spoil, bamboo treatment and oxide floors on the coast."
        image={notes[0].image.src}
      />
      <main id="main" className="page">
        <div className="wide section--tight">
          <Reveal>
            <p className="meta">Studio notes</p>
            <h1 className="display" style={{ marginTop: 16 }}>Notes</h1>
          </Reveal>
        </div>

        <section className="wide">
          {notes.map((n, i) => (
            <Reveal className="band" key={n.title} data-flip={i % 2 === 1}>
              <div className="band__img">
                <Picture img={n.image} sizes="(max-width: 860px) 100vw, 52vw" />
              </div>
              <div className="band__txt">
                <p className="meta">
                  {n.year} — {n.status}
                </p>
                <h2>{n.title}</h2>
                <p>{n.body}</p>
              </div>
            </Reveal>
          ))}
        </section>
      </main>
    </>
  );
}
