import { Link, Navigate, useParams } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';
import { Reveal, Seo } from '../components/bits';
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

/* One template for all four contact routes.

   The form comes first — someone arriving here has already chosen what they
   want to write about, so the page opens with the thing they came to do. No
   hero image: it only pushed the form below the fold. Supporting detail sits
   underneath, condensed, with the longer reading folded away so the page stays
   short by default. */
export default function Enquiry() {
  const { slug } = useParams();
  const page = enquiryBySlug(slug);
  if (!page) return <Navigate to="/404" replace />;

  const others = enquiryPages.filter((p) => p.slug !== page.slug);

  return (
    <>
      <Seo title={`${page.title} — ${site.name}`} description={page.seo} />

      <main id="main" className="page">
        <div className="wide enq">
          <Reveal className="enq__head">
            <p className="meta">Contact — {page.nav}</p>
            <h1>{page.title}</h1>
            <p className="enq__lede">{page.lede}</p>
          </Reveal>

          <Reveal className="enq__form">
            <EnquiryForm page={page} />
          </Reveal>
        </div>

        {/* ------------------------------------ supporting detail, below the form */}

        <section className="wide section--tight">
          {page.slug === 'project' && (
            <>
              <Reveal>
                <p className="meta">How we work together</p>
              </Reveal>
              <dl className="rows">
                {engagements.map((e) => (
                  <div key={e.title}>
                    <dt>{e.title}</dt>
                    <dd>{e.forWho}</dd>
                  </div>
                ))}
              </dl>
              <details className="more">
                <summary>What each of those involves, and what it costs</summary>
                <div className="prose" style={{ marginTop: 20 }}>
                  {engagements.map((e) => (
                    <p key={e.title}>
                      <strong>{e.title}.</strong> {e.body}
                    </p>
                  ))}
                  <p>
                    <strong>On cost.</strong> {engagementNotes.cost}
                  </p>
                  <p>
                    <strong>On availability.</strong> {engagementNotes.availability}
                  </p>
                </div>
              </details>
            </>
          )}

          {page.slug === 'workshops' && (
            <>
              <Reveal>
                <p className="meta">What we run</p>
              </Reveal>
              <dl className="rows">
                {workshopOfferings.map((w) => (
                  <div key={w.title}>
                    <dt>{w.title}</dt>
                    <dd>
                      {w.duration} · {w.where} · from {w.from}
                    </dd>
                  </div>
                ))}
              </dl>
              <details className="more">
                <summary>Who each workshop is for</summary>
                <div className="prose" style={{ marginTop: 20 }}>
                  {workshopOfferings.map((w) => (
                    <p key={w.title}>
                      <strong>{w.title}.</strong> {w.lede} {w.who}
                    </p>
                  ))}
                </div>
              </details>
            </>
          )}

          {page.slug === 'careers' && (
            <>
              <Reveal>
                <p className="meta">Open roles</p>
              </Reveal>
              <dl className="rows">
                {openings.map((o) => (
                  <div key={o.role}>
                    <dt>{o.role}</dt>
                    <dd>
                      {o.type} · {o.status}
                    </dd>
                  </div>
                ))}
              </dl>
              <details className="more">
                <summary>What each role involves, and volunteering</summary>
                <div className="prose" style={{ marginTop: 20 }}>
                  {openings.map((o) => (
                    <p key={o.role}>
                      <strong>{o.role}.</strong> {o.body} <em>Looking for: {o.wants.join(', ')}.</em>
                    </p>
                  ))}
                  <p>
                    <strong>Volunteering.</strong> {volunteering.intro}
                  </p>
                  <ul className="plain">
                    {volunteering.points.map((v) => (
                      <li key={v}>{v}</li>
                    ))}
                  </ul>
                </div>
              </details>
            </>
          )}

          {page.slug === 'general' && (
            <Reveal>
              <p className="meta">Studio</p>
              <dl className="rows">
                <div>
                  <dt>{site.address}</dt>
                  <dd>{site.hours}</dd>
                </div>
                <div>
                  <dt>
                    <a href={`mailto:${site.email}`}>{site.email}</a>
                  </dt>
                  <dd>
                    <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
                  </dd>
                </div>
              </dl>
            </Reveal>
          )}
        </section>

        <section className="wide section--tight">
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
