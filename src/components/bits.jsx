import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site';

/* ---------------------------------------------------------------- <Footer> */

export function Footer() {
  return (
    <footer className="footer">
      <div className="wide footer__in">
        <span>
          © {new Date().getFullYear()} {site.name}. {site.strapline}
        </span>
        <span>
          <a href={site.instagram} target="_blank" rel="noreferrer">
            Instagram
          </a>
          {' · '}
          <a href={site.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          {' · '}
          <a href={`mailto:${site.email}`}>Email</a>
        </span>
        <span>
          Design and Developed By{' '}
          <a href="https://webnxt.co" target="_blank" rel="noreferrer">
            WebNxt
          </a>
        </span>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------- <Seo> */
/* Plain DOM head management — no helmet dependency for four tags. */

export function Seo({ title, description, image = '/logo.png' }) {
  useEffect(() => {
    document.title = title;
    const set = (sel, attr, val) => {
      let el = document.head.querySelector(sel);
      if (!el) {
        el = document.createElement(sel.startsWith('link') ? 'link' : 'meta');
        const [, k, v] = sel.match(/\[(.+?)="(.+?)"\]/) || [];
        if (k) el.setAttribute(k, v);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, val);
    };
    set('meta[name="description"]', 'content', description);
    set('meta[property="og:title"]', 'content', title);
    set('meta[property="og:description"]', 'content', description);
    set('meta[property="og:image"]', 'content', image);
    set('meta[property="og:type"]', 'content', 'website');
    set('meta[name="twitter:card"]', 'content', 'summary_large_image');
    set('meta[name="twitter:title"]', 'content', title);
    set('meta[name="twitter:description"]', 'content', description);
    set('link[rel="canonical"]', 'href', window.location.origin + window.location.pathname);
  }, [title, description, image]);
  return null;
}

/* ---------------------------------------------------------------- <Reveal> */
/* One IntersectionObserver per element; cheap enough at this page size and
   it degrades to "already visible" when the observer never fires. */

export function Reveal({ as: Tag = 'div', children, className = '', ...rest }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`.trim()} data-in={seen} {...rest}>
      {children}
    </Tag>
  );
}

/* -------------------------------------------------------------- <Picture> */
/* Aspect ratio is always reserved so nothing shifts as images decode, and the
   wrapper runs the blur-up transition once the file is actually ready.
   `complete` is checked on mount so cached images never sit stuck dimmed. */

export function Picture({
  img,
  priority = false,
  className = '',
  sizes = '100vw',
  fill = false,
  ratio,
  children,
}) {
  const [ready, setReady] = useState(false);
  const el = useRef(null);

  useEffect(() => {
    if (el.current?.complete) setReady(true);
  }, [img.src]);

  return (
    <div
      className={`ph ${fill ? 'ph--fill' : ''} ${className}`.trim()}
      data-ready={ready}
      style={fill ? undefined : { aspectRatio: ratio || `${img.w} / ${img.h}` }}
    >
      <img
        ref={el}
        src={img.src}
        alt={img.alt || ''}
        width={img.w}
        height={img.h}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        fetchPriority={priority ? 'high' : 'auto'}
        decoding={priority ? 'sync' : 'async'}
        onLoad={() => setReady(true)}
        onError={() => setReady(true)}
      />
      {children}
    </div>
  );
}

/* ------------------------------------------------------------- ScrollReset */

export function ScrollReset({ pathname }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}
