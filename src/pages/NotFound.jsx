import { Link } from 'react-router-dom';
import { Seo } from '../components/bits';
import { site } from '../data/site';

export default function NotFound() {
  return (
    <>
      <Seo title={`Page not found — ${site.name}`} description="This page does not exist." />
      <main id="main" className="page">
        <div className="column section">
          <p className="meta">404</p>
          <h1 className="display" style={{ marginTop: 16 }}>Page not found</h1>
          <p style={{ marginTop: 28 }}>
            <Link to="/work" style={{ borderBottom: '1px solid var(--rule)' }}>
              Return to selected work
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
