/* Visual QA: loads each route at several widths, asserts no horizontal scroll,
   no element overlapping the fixed header, and captures screenshots. */
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const ROUTES = [
  '/', '/work', '/work/thendral-ecr-farmhouse', '/studio', '/notes', '/contact',
  '/contact/project', '/contact/workshops', '/contact/careers', '/contact/general',
];
const SIZES = [{ w: 1440, h: 900 }, { w: 390, h: 844 }];
const BASE = 'http://localhost:4321';

mkdirSync('qa', { recursive: true });
const browser = await chromium.launch();
const problems = [];

for (const s of SIZES) {
  const page = await browser.newPage({ viewport: { width: s.w, height: s.h } });
  for (const r of ROUTES) {
    await page.goto(BASE + r, { waitUntil: 'networkidle' });
    await page.waitForTimeout(700);

    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth - document.documentElement.clientWidth
    );
    if (overflow > 1) problems.push(`${r} @${s.w} horizontal overflow ${overflow}px`);

    // Does any page text sit on top of the fixed header band?
    const clash = await page.evaluate(() => {
      const h = document.querySelector('.header');
      if (!h) return null;
      const hb = h.getBoundingClientRect();
      const main = document.querySelector('#main');
      if (!main) return null;
      for (const el of main.querySelectorAll('h1, h2, h3, p')) {
        const b = el.getBoundingClientRect();
        if (b.height === 0 || b.top > hb.bottom) continue;
        if (b.bottom > hb.top && b.top < hb.bottom && getComputedStyle(el).position !== 'absolute') {
          return el.tagName + ': ' + el.textContent.slice(0, 40);
        }
      }
      return null;
    });
    if (clash) problems.push(`${r} @${s.w} overlaps header -> ${clash}`);

    // Nothing in the content column may touch the viewport edge.
    const flush = await page.evaluate(() => {
      for (const sel of ['.wide', '.column']) {
        for (const el of document.querySelectorAll('#main ' + sel)) {
          const b = el.getBoundingClientRect();
          if (b.height === 0) continue;
          const cs = getComputedStyle(el);
          if (parseFloat(cs.paddingLeft) < 16) return sel + ' padding-left ' + cs.paddingLeft;
        }
      }
      return null;
    });
    if (flush) problems.push(`${r} @${s.w} gutter lost -> ${flush}`);

    // Slideshow routes must sit exactly in the viewport with no page scroll.
    if (r === '/' || r === '/work') {
      const over = await page.evaluate(
        () => document.documentElement.scrollHeight - window.innerHeight
      );
      if (over > 1) problems.push(`${r} @${s.w} should not scroll, overflows ${over}px`);
    }

    const trackBad = await page.evaluate(() => {
      const t = document.querySelector('.track');
      if (!t || getComputedStyle(t).display !== 'flex') return null;
      const f = t.querySelector('.shot');
      if (t.scrollLeft !== 0) return 'scrollLeft ' + t.scrollLeft;
      if (f && f.getBoundingClientRect().left < 40) return 'first shot at ' + f.getBoundingClientRect().left;
      return null;
    });
    if (trackBad) problems.push(`${r} @${s.w} gallery track -> ${trackBad}`);

    // Slideshow chrome must not sit on top of the project label.
    const collide = await page.evaluate(() => {
      const a = document.querySelector('.stage__label');
      const b = document.querySelector('.stage__counter');
      if (!a || !b) return null;
      const r1 = a.getBoundingClientRect();
      const r2 = b.getBoundingClientRect();
      const hit =
        r1.left < r2.right && r2.left < r1.right && r1.top < r2.bottom && r2.top < r1.bottom;
      return hit ? 'label and counter overlap' : null;
    });
    if (collide) problems.push(`${r} @${s.w} ${collide}`);

    const name = 'qa/' + (r === '/' ? 'home' : r.replace(/\//g, '_')) + `-${s.w}.png`;
    await page.screenshot({ path: name, fullPage: false });
  }
  await page.close();
}

await browser.close();
console.log(problems.length ? 'PROBLEMS:\n' + problems.join('\n') : 'clean — no overflow, no header collisions');
