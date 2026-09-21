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

// The panel must survive the pointer travelling from the trigger into the list,
// and must still be open long enough to click a project.
await p.mouse.move(1016, 45);
await p.waitForTimeout(60);
await p.mouse.move(1016, 120); // crosses the former dead gap
await p.waitForTimeout(400);
if (!(await p.locator('.drop').isVisible())) bad.push('dropdown closed while moving into it');
const target = p.locator('.drop a').nth(3);
await target.hover();
await p.waitForTimeout(500);
if (!(await p.locator('.drop').isVisible())) bad.push('dropdown closed while hovering a project');
await target.click();
await p.waitForTimeout(700);
if (!p.url().includes('/work/mysore-residence'))
  bad.push('dropdown selection did not navigate, url ' + p.url());

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
// Contact form must build a wa.me link and open it in a new tab.
await p.goto(B + '/contact', { waitUntil: 'networkidle' });
const sendBtn = p.locator('.wa__send');
if (!(await sendBtn.isDisabled())) bad.push('send enabled before required fields filled');
await p.fill('.wa__row .wa__field:first-child input', 'Asha');
await p.fill('.wa textarea', 'We have a plot & want to build in mud.');
// Pick a non-default option so the dropdown is exercised, not just defaulted.
await p.selectOption('.wa select', { label: 'A workshop' });
const chosen = await p.locator('.wa select').inputValue();
const optionCount = await p.locator('.wa select option').count();
if (optionCount < 5) bad.push(`enquiry dropdown has only ${optionCount} options`);
if (await sendBtn.isDisabled()) bad.push('send still disabled after filling required fields');

const [wa] = await Promise.all([
  p.context().waitForEvent('page'),
  sendBtn.click(),
]);
// wa.me redirects to api.whatsapp.com, so accept either host and read the
// message out of the query rather than matching the raw string.
const waUrl = new URL(wa.url());
if (!/(^|\.)whatsapp\.com$|^wa\.me$/.test(waUrl.hostname))
  bad.push('form opened wrong host: ' + waUrl.hostname);
const num = waUrl.searchParams.get('phone') || waUrl.pathname.replace(/\//g, '');
if (num !== '919353739352') bad.push('wrong whatsapp number: ' + num);
const body = waUrl.searchParams.get('text') || '';
if (!body.includes('Asha')) bad.push('name missing from whatsapp message');
if (!body.includes('plot & want')) bad.push('message body truncated at the ampersand');
if (!body.includes(chosen)) bad.push(`enquiry type "${chosen}" missing from message`);
await wa.close();

// Big logo present on contact and in the footer.
if (!(await p.locator('.mark img').isVisible())) bad.push('contact logo missing');
if (!(await p.locator('.footer__mark img').count())) bad.push('footer logo missing');

await p.close();

// --- mobile ---
p = await b.newPage({ viewport: { width: 390, height: 844 } });
// Selected Work reel: advances and overlays the project name.
await p.goto(B + '/work', { waitUntil: 'networkidle' });
await p.waitForTimeout(500);
const first = await p.locator('.stage__label h2').textContent();
if (!first) bad.push('work reel has no project name overlay');
await p.locator('.stage__arrow--next').click();
await p.waitForTimeout(700);
const counter = await p.locator('.stage__counter .meta').textContent();
if (!/^02 \//.test(counter || '')) bad.push(`work reel did not advance, counter "${counter}"`);

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
