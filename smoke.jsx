/* Renders every route to a string. Fails loudly if a page component throws
   or if a project's expected copy goes missing. Run: npm run smoke */
import assert from 'node:assert';
import { existsSync, readFileSync } from 'node:fs';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from './src/App.jsx';
import { projects } from './src/data/projects.js';
import { buildMessage, whatsappLink } from './src/components/WhatsAppForm.jsx';
import { enquiryTypes } from './src/data/site.js';

const render = (url) =>
  renderToString(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>
  );

const routes = [
  '/', '/work', '/studio', '/notes', '/contact', '/nope',
  ...projects.map((p) => `/work/${p.slug}`),
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

// WhatsApp link: correct number, and the fields must survive encoding.
{
  const fields = {
    name: '  Asha  ',
    place: 'Bengaluru',
    about: enquiryTypes[0],
    message: ['We have a 40x60 plot & want to build in mud.', 'Can we talk?'].join(String.fromCharCode(10)),
  };
  const msg = buildMessage(fields);
  assert.ok(msg.startsWith("Hello Mud Stories, I'm Asha."), 'name not trimmed into greeting');
  assert.ok(msg.includes(enquiryTypes[0]), 'enquiry type missing');
  assert.ok(msg.includes('Bengaluru'), 'location missing');
  assert.ok(msg.includes('40x60 plot & want'), 'message body missing');

  const url = whatsappLink(fields);
  assert.ok(url.startsWith('https://wa.me/919353739352?text='), `wrong wa.me target: ${url}`);
  assert.ok(!/\s/.test(url), 'url contains unencoded whitespace');
  assert.ok(url.includes('%26'), 'ampersand not encoded — would truncate the message');
  const decoded = decodeURIComponent(url.split('?text=')[1]);
  assert.strictEqual(decoded, msg, 'round-trip through the URL lost content');

  // Optional location omitted entirely rather than left blank.
  assert.ok(
    !buildMessage({ ...fields, place: '   ' }).includes('Site / location'),
    'blank location should be dropped'
  );
}

// Every dropdown option must survive into the message it builds.
for (const about of enquiryTypes) {
  const msg = buildMessage({ name: 'A', place: '', about, message: 'hi' });
  assert.ok(msg.includes(about), `enquiry option "${about}" lost from message`);
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
