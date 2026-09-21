/* Renders every route to a string. Fails loudly if a page component throws
   or if a project's expected copy goes missing. Run: npm run smoke */
import assert from 'node:assert';
import { existsSync, readFileSync } from 'node:fs';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from './src/App.jsx';
import { projects } from './src/data/projects.js';
import { enquiryPages } from './src/data/enquiries.js';
import { composeEnquiry, enquiryLink } from './src/components/EnquiryForm.jsx';

const render = (url) =>
  renderToString(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>
  );

const routes = [
  '/', '/work', '/studio', '/notes', '/contact', '/nope',
  ...projects.map((p) => `/work/${p.slug}`),
  ...enquiryPages.map((p) => `/contact/${p.slug}`),
];

for (const r of routes) {
  const html = render(r);
  assert.ok(html.length > 500, `${r} rendered almost nothing`);
}

// Home shows the first project; a project page shows its own title and location.
assert.ok(render('/').includes(projects[0].title), 'home missing first project');
const one = render(`/work/${projects[0].slug}`);
assert.ok(one.includes(projects[0].location), 'project page missing location');

// Contact must carry the real client details, never placeholders.
const contact = render('/contact');
for (const s of ['mudstories.crafted@gmail.com', '+91 93537 39352', 'Domlur']) {
  assert.ok(contact.includes(s), `contact missing ${s}`);
}

// Each enquiry page must render its own title and form, and compose a
// message carrying every answered field.
for (const page of enquiryPages) {
  const html = render(`/contact/${page.slug}`);
  assert.ok(html.includes(page.title), `${page.slug} missing its title`);
  assert.ok(html.includes(page.formTitle), `${page.slug} missing its form`);

  const values = Object.fromEntries(
    page.fields.map((f) => [
      f.name,
      f.type === 'select' ? f.options[1] || f.options[0] : `v-${f.name}`,
    ])
  );
  const msg = composeEnquiry(page, values);
  for (const f of page.fields) {
    if (f.type === 'file') continue;
    assert.ok(
      msg.includes(String(values[f.name])),
      `${page.slug}: field "${f.name}" lost from the composed message`
    );
  }

  const url = enquiryLink(page, values);
  const expected = page.channel === 'email' ? 'mailto:' : 'https://wa.me/';
  assert.ok(url.startsWith(expected), `${page.slug} should deliver via ${page.channel}`);
  assert.ok(!/\s/.test(url), `${page.slug} url has unencoded whitespace`);
}

// The careers route is the only one needing an attachment, so it must use email
// (a mailto cannot carry a file, but WhatsApp web cannot either — and email at
// least lets the applicant attach one to the draft).
const careers = enquiryPages.find((p) => p.slug === 'careers');
assert.strictEqual(careers.channel, 'email', 'careers must deliver by email');
assert.ok(
  careers.fields.some((f) => f.type === 'file'),
  'careers form must offer a CV field'
);
// A named attachment is called out in the message so it is not forgotten.
assert.ok(
  composeEnquiry(careers, { name: 'A', cv__filename: 'asha-cv.pdf' }).includes('asha-cv.pdf'),
  'attachment filename missing from careers message'
);

// Every nav menu target must be a real route.
for (const page of enquiryPages) {
  assert.ok(render(`/contact/${page.slug}`).length > 500, `/contact/${page.slug} did not render`);
}

// Text tones must clear WCAG AA against the earth ground they sit on.
{
  const css = readFileSync('src/styles.css', 'utf8');
  const token = (name) => {
    const m = css.match(new RegExp('--' + name + ':\\s*(#[0-9a-fA-F]{6})'));
    assert.ok(m, 'missing colour token --' + name);
    return m[1];
  };
  const lum = (hex) => {
    const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255);
    const f = (v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
    return 0.2126 * f(c[0]) + 0.7152 * f(c[1]) + 0.0722 * f(c[2]);
  };
  const ratio = (a, b) => {
    const [hi, lo] = [lum(a), lum(b)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
  };

  const paper = token('paper');
  const panel = token('panel');
  for (const [name, ground, min] of [
    ['ink', paper, 7],
    ['ink-soft', paper, 4.5],
    ['ink-mute', paper, 4.5], // small uppercase metadata — the tightest case
    ['ink-mute', panel, 4.5],
    ['ink', panel, 7],
  ]) {
    const got = ratio(token(name), ground);
    assert.ok(
      got >= min,
      `--${name} on ${ground} is ${got.toFixed(2)}:1, needs ${min}:1`
    );
  }
  // Button text sits on --ink.
  assert.ok(ratio(paper, token('ink')) >= 7, 'button label contrast too low');
  // The ground must actually be the earth tone, not white.
  assert.ok(!/^#f{3,6}$/i.test(paper), 'page ground is still white');
}

// Every referenced image must exist on disk, not just as a URL.
for (const img of projects.flatMap((p) => [p.cover, ...p.gallery])) {
  assert.ok(existsSync('public' + img.src), `missing file ${img.src}`);
}

console.log(`ok — ${routes.length} routes rendered, all images present on disk`);
