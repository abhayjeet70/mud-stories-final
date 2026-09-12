/* Renders every route to a string. Fails loudly if a page component throws
   or if a project's expected copy goes missing. Run: npm run smoke */
import assert from 'node:assert';
import { existsSync } from 'node:fs';
import { renderToString } from 'react-dom/server';
import { MemoryRouter } from 'react-router-dom';
import App from './src/App.jsx';
import { projects } from './src/data/projects.js';
import { buildMessage, whatsappLink } from './src/components/WhatsAppForm.jsx';

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
    about: 'A new house',
    message: ['We have a 40x60 plot & want to build in mud.', 'Can we talk?'].join(String.fromCharCode(10)),
  };
  const msg = buildMessage(fields);
  assert.ok(msg.startsWith("Hello Mud Stories, I'm Asha."), 'name not trimmed into greeting');
  assert.ok(msg.includes('A new house'), 'enquiry type missing');
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

// Every referenced image must exist on disk, not just as a URL.
for (const img of projects.flatMap((p) => [p.cover, ...p.gallery])) {
  assert.ok(existsSync('public' + img.src), `missing file ${img.src}`);
}

console.log(`ok — ${routes.length} routes rendered, all images present on disk`);
