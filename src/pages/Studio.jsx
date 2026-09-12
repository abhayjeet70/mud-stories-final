import { Picture, Reveal, Seo } from '../components/bits';
import { aboutBody, aboutIntro, aboutMedia, founders, philosophy, values } from '../data/studio';
import { services, site } from '../data/site';

/* Image-led studio page. The full narrative from content.md is preserved but
   sits behind a disclosure so the page reads short by default. */

const VALUE_IMAGES = [
  { src: '/images/generated/project-rural-karnataka.webp', w: 1672, h: 941, alt: 'Building with material from the site' },
  { src: '/images/generated/craft-cob-mixing.webp', w: 1536, h: 1024, alt: 'Mixing cob by hand' },
  { src: '/images/generated/craft-lime-plaster.webp', w: 1536, h: 1024, alt: 'Applying lime plaster' },
  { src: '/images/generated/project-mysuru-earth-block.webp', w: 1484, h: 1060, alt: 'Earth block construction' },
  { src: '/images/generated/material-timber-eave.webp', w: 1402, h: 1122, alt: 'Timber eave detail' },
];

const SERVICE_IMAGES = [
  { src: '/images/generated/project-craft-pavilion.webp', w: 1536, h: 1024, alt: 'Architectural design' },
  { src: '/images/generated/interior-lime-living-room.webp', w: 1536, h: 1024, alt: 'Interior design' },
  { src: '/images/generated/landscape-neem-courtyard.webp', w: 1536, h: 1024, alt: 'Landscape design' },
  { src: '/images/generated/craft-rammed-earth.webp', w: 1536, h: 1024, alt: 'Natural building' },
];

export default function Studio() {
  return (
    <>
      <Seo title={`Studio — ${site.name}`} description={aboutIntro} image={aboutMedia.src} />
      <main id="main" className="page">
        {/* Opening statement over a full-bleed photograph. */}
        <div className="wide">
          <Reveal>
            <p className="meta">The studio</p>
            <h1 className="display" style={{ margin: '14px 0 30px' }}>
              Earth.
              <br />
              Architecture.
              <br />
              Stories.
            </h1>
          </Reveal>
        </div>

        <Reveal className="bleed">
          <Picture img={aboutMedia} priority sizes="100vw" ratio="16 / 9" />
        </Reveal>

        <div className="wide section--tight">
          <div className="two">
            <Reveal>
              <p className="lede" style={{ margin: 0 }}>{aboutIntro}</p>
            </Reveal>
            <Reveal>
              <p style={{ margin: 0, color: 'var(--ink-soft)' }}>{philosophy}</p>
              <details className="more">
                <summary>Read the full story</summary>
                <div className="prose" style={{ marginTop: 20 }}>
                  {aboutBody.map((t) => (
                    <p key={t.slice(0, 28)}>{t}</p>
                  ))}
                </div>
              </details>
            </Reveal>
          </div>
        </div>

        {/* People */}
        <section className="wide section--tight">
          <Reveal>
            <p className="meta">The people</p>
          </Reveal>
          <div className="people" style={{ marginTop: 24 }}>
            {founders.map((f) => (
              <Reveal as="figure" key={f.name}>
                <Picture
                  img={{ ...f.image, alt: `${f.name}, ${f.role}` }}
                  sizes="(max-width: 640px) 100vw, 46vw"
                />
                <h3>{f.name}</h3>
                <p className="meta">{f.role}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* What we do — an image grid, not a services block. */}
        <section className="wide section--tight">
          <Reveal>
            <p className="meta">What we do</p>
          </Reveal>
          <div className="quad" style={{ marginTop: 24 }}>
            {services.map((s, n) => (
              <Reveal as="figure" key={s.name} style={{ margin: 0 }}>
                <Picture img={SERVICE_IMAGES[n]} sizes="(max-width: 860px) 50vw, 24vw" ratio="3 / 4" />
                <h3>{s.name}</h3>
                <p>{s.body}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* How we work — alternating bands. */}
        <section className="wide section--tight">
          <Reveal>
            <p className="meta">How we work</p>
          </Reveal>
          {values.map((v, i) => (
            <Reveal className="band" key={v.index} data-flip={i % 2 === 1}>
              <div className="band__img">
                <Picture img={VALUE_IMAGES[i]} sizes="(max-width: 860px) 100vw, 52vw" />
              </div>
              <div className="band__txt">
                <p className="meta">{v.index}</p>
                <h2>{v.title}</h2>
                <p>{v.body}</p>
              </div>
            </Reveal>
          ))}
        </section>
      </main>
    </>
  );
}
