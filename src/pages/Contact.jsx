import { Link } from 'react-router-dom';
import { Reveal, Seo } from '../components/bits';
import { enquiryPages } from '../data/enquiries';
import { contactGroups, site } from '../data/site';

/* The contact hub. It routes to the four dedicated enquiry pages rather than
   carrying a form of its own — each route has a form suited to it. */
export default function Contact() {
  return (
    <>
      <Seo
        title={`Contact — ${site.name}`}
        description={`Mud Stories, ${site.address}. Write to ${site.email}.`}
      />
      <main id="main" className="page">
        <div className="wide contact__head">
          <Reveal className="mark">
            <img src="/logo.webp" alt="Mud Stories" width={420} height={408} decoding="async" />
          </Reveal>
          <Reveal>
            <p className="meta">Get in touch</p>
            <h1 className="display" style={{ margin: '10px 0 0' }}>Contact</h1>
            <p className="lede" style={{ marginTop: 20 }}>
              Have a project in mind or a piece of land waiting to become something
              meaningful? We’d love to hear your story.
            </p>
          </Reveal>
        </div>

        <section className="wide section--tight">
          <Reveal>
            <p className="meta">What is it about</p>
          </Reveal>
          <div className="routes">
            {enquiryPages.map((p, n) => (
              <Reveal as="article" key={p.slug}>
                <Link to={`/contact/${p.slug}`}>
                  <span className="meta">{String(n + 1).padStart(2, '0')}</span>
                  <h2>{p.nav}</h2>
                  <p>{p.navNote}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="wide contact__body groups">
          {contactGroups.map((g) => (
            <Reveal key={g.label}>
              <h2>{g.label}</h2>
              <a href={`mailto:${g.email}`}>{g.email}</a>
            </Reveal>
          ))}
        </section>

        <section className="wide contact__body section--tight">
          <div className="two">
            <Reveal>
              <h2 className="meta">Studio</h2>
              <address style={{ fontStyle: 'normal', marginTop: 12, color: 'var(--ink-soft)' }}>
                {site.address}
              </address>
              <p className="meta" style={{ marginTop: 14 }}>{site.hours}</p>
            </Reveal>
            <Reveal>
              <h2 className="meta">Telephone</h2>
              <p style={{ marginTop: 12 }}>
                <a href={`tel:${site.phone.replace(/\s/g, '')}`}>{site.phone}</a>
                <br />
                <a href={`tel:${site.phoneAlt.replace(/\s/g, '')}`}>{site.phoneAlt}</a>
              </p>
              <h2 className="meta" style={{ marginTop: 26 }}>Elsewhere</h2>
              <p style={{ marginTop: 12 }}>
                <a href={site.instagram} target="_blank" rel="noreferrer">Instagram</a>
                <br />
                <a href={site.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
              </p>
            </Reveal>
          </div>
        </section>
      </main>
    </>
  );
}
