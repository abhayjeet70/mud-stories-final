/* Interaction check: projects dropdown, mobile menu + accordion, lightbox
   open / navigate / escape / focus restore. */
import { chromium } from 'playwright';
const B = 'http://localhost:4321';
const b = await chromium.launch();
const bad = [];

// --- desktop ---
let p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(B + '/work', { waitUntil: 'networkidle' });
await p.hover('.dropwrap button');
await p.waitForTimeout(300);
const items = await p.locator('.drop a').count();
if (items !== 7) bad.push(`dropdown shows ${items} projects, expected 7`);

await p.goto(B + '/work/thendral-ecr-farmhouse', { waitUntil: 'networkidle' });
await p.waitForTimeout(600);
await p.locator('.shot__zoom').first().click();
await p.waitForTimeout(400);
if (!(await p.locator('.lb').isVisible())) bad.push('lightbox did not open');
const label = await p.locator('.lb').getAttribute('aria-label');
if (!/Image 1 of/.test(label || '')) bad.push(`lightbox label wrong: ${label}`);
await p.keyboard.press('ArrowRight');
await p.waitForTimeout(250);
if (!/Image 2 of/.test((await p.locator('.lb').getAttribute('aria-label')) || ''))
  bad.push('arrow key did not advance lightbox');
await p.keyboard.press('Escape');
await p.waitForTimeout(300);
if (await p.locator('.lb').count()) bad.push('Escape did not close lightbox');
const restored = await p.evaluate(() => document.activeElement?.className || '');
if (!restored.includes('shot__zoom')) bad.push(`focus not restored, got "${restored}"`);

// track arrows advance
const before = await p.evaluate(() => document.querySelector('.track').scrollLeft);
await p.locator('.track__btn--next').click();
await p.waitForTimeout(900);
const after = await p.evaluate(() => document.querySelector('.track').scrollLeft);
if (after <= before) bad.push(`next arrow did not scroll track (${before} -> ${after})`);
await p.close();

// --- mobile ---
p = await b.newPage({ viewport: { width: 390, height: 844 } });
await p.goto(B + '/work', { waitUntil: 'networkidle' });
await p.locator('.burger').click();
await p.waitForTimeout(300);
if (!(await p.locator('.sheet').isVisible())) bad.push('mobile sheet did not open');
await p.locator('.sheet nav button').first().click();
await p.waitForTimeout(250);
const sub = await p.locator('.sheet .sub a').count();
if (sub !== 7) bad.push(`mobile accordion shows ${sub} projects, expected 7`);
const locked = await p.evaluate(() => getComputedStyle(document.body).overflow);
if (locked !== 'hidden') bad.push(`body scroll not locked behind sheet (${locked})`);
await p.locator('.sheet .sub a').first().click();
await p.waitForTimeout(600);
if (!p.url().includes('/work/')) bad.push('mobile project link did not navigate');
if (await p.locator('.sheet').count()) bad.push('sheet did not close on navigate');
await p.close();

await b.close();
console.log(bad.length ? 'PROBLEMS:\n' + bad.join('\n') : 'interactions clean');
