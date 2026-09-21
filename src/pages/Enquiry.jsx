import { Link, Navigate, useParams } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';
import { Picture, Reveal, Seo } from '../components/bits';
import {
  enquiryBySlug,
  enquiryPages,
  engagements,
  engagementNotes,
  openings,
  volunteering,
  workshopOfferings,
} from '../data/enquiries';
import { site } from '../data/site';

/* One template for all four contact routes. The editorial section above each
   form differs by route — what someone needs to read before writing in. */
export default function Enquiry() {
  const { slug } = useParams();
  const page = enquiryBySlug(slug);
  if (!page) return <Navigate to="/404" replace />;

  const others = enquiryPages.filter((p) => p.slug !== page.slug);

  return (
    <>
      <Seo
        title={`${page.title} — ${site.name}`}
        description={page.seo}
        image={page.hero.src}
      />

      <main id="main" className="page">
        <div className="wide">
          <Reveal>
            <p className="meta">Contact — {page.nav}</p>
            <h1 className="display" style={{ margin: '12px 0 26px' }}>{page.title}</h1>
          </Reveal>
        </div>

        <Reveal className="bleed">
          <Picture img={page.hero} priority sizes="100vw" ratio="21 / 9" />
        </Reveal>

        <div className="wide section--tight">
          <Reveal>
            <p className="lede" style={{ maxWidth: '38ch', margin: 0 }}>{page.lede}</p>
          </Reveal>
        </div>

        {/* ---------------------------------------------- route-specific copy */}

        {page.slug === 'project' && (
          <section className="wide section--tight">
            <Reveal>
              <p className="meta">How we work together</p>
            </Reveal>
            <ul className="list" style={{ marginTop: 24 }}>
              {engagements.map((e, i) => (
                <Reveal as="li" key={e.title}>
                  <span className="meta">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h2>{e.title}</h2>
                    <p className="meta" style={{ marginBottom: 10 }}>{e.forWho}</p>
                    <p style={{ margin: 0, color: 'var(--ink-soft)', maxWidth: '62ch' }}>{e.body}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <div className="two" style={{ marginTop: 44 }}>
              <Reveal>
                <h2 className="meta">On cost</h2>
                <p style={{ marginTop: 12, color: 'var(--ink-soft)' }}>{engagementNotes.cost}</p>
              </Reveal>
              <Reveal>
                <h2 className="meta">On availability</h2>
                <p style={{ marginTop: 12, color: 'var(--ink-soft)' }}>{engagementNotes.availability}</p>
              </Reveal>
            </div>
          </section>
        )}

        {page.slug === 'workshops' && (
          <section className="wide section--tight">
            <Reveal>
              <p className="meta">What we run</p>
            </Reveal>
            <div className="trio" style={{ marginTop: 24 }}>
              {workshopOfferings.map((w) => (
                <Reveal as="article" key={w.title}>
                  <Picture img={w.image} ratio="4 / 3" sizes="(max-width: 860px) 100vw, 32vw" />
                  <h2>{w.title}</h2>
                  <p>{w.lede}</p>
                  <dl className="mini">
                    <div><dt className="meta">Length</dt><dd>{w.duration}</dd></div>
                    <div><dt className="meta">Where</dt><dd>{w.where}</dd></div>
                    <div><dt className="meta">Who</dt><dd>{w.who}</dd></div>
                    <div><dt className="meta">From</dt><dd>{w.from}</dd></div>
                  </dl>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        {page.slug === 'careers' && (
          <>
            <section className="wide section--tight">
              <Reveal>
                <p className="meta">Open roles</p>
              </Reveal>
              <ul className="list" style={{ marginTop: 24 }}>
                {openings.map((o) => (
                  <Reveal as="li" key={o.role}>
                    <span className="meta">{o.status}</span>
                    <div>
                      <h2>{o.role}</h2>
                      <p className="meta" style={{ marginBottom: 10 }}>{o.type}</p>
                      <p style={{ margin: '0 0 14px', color: 'var(--ink-soft)', maxWidth: '62ch' }}>{o.body}</p>
                      <ul className="tags">
                        {o.wants.map((w) => (
                          <li key={w}>{w}</li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </section>

            <section className="wide section--tight">
              <div className="two">
                <Reveal>
                  <h2 className="meta">Volunteering</h2>
                  <p style={{ marginTop: 12, color: 'var(--ink-soft)' }}>{volunteering.intro}</p>
                </Reveal>
                <Reveal>
                  <ul className="plain">
                    {volunteering.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </section>
          </>
        )}

        {/* ---------------------------------------------------------- the form */}

        <section className="wide section--tight" id="form">
          <div className="formwrap">
            <Reveal>
              <EnquiryForm page={page} />
            </Reveal>
          </div>
        </section>

        <section className="wide section--tight">
          <Reveal>
            <p className="meta">Or write to us about</p>
          </Reveal>
          <div className="otherlinks">
            {others.map((o) => (
              <Link key={o.slug} to={`/contact/${o.slug}`}>
                <h2>{o.nav}</h2>
                <p className="meta">{o.navNote}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
