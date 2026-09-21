/* Interaction check: projects dropdown, mobile menu + accordion, lightbox
   open / navigate / escape / focus restore. */
import { chromium } from 'playwright';
const B = 'http://localhost:4321';
const b = await chromium.launch();
const bad = [];

// --- desktop ---
let p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto(B + '/work', { waitUntil: 'networkidle' });
await p.hover('.dropwrap:first-of-type button');
await p.waitForTimeout(300);
const items = await p.locator('.drop a').count();
if (items !== 7) bad.push(`dropdown shows ${items} projects, expected 7`);

// The panel must survive the pointer travelling from the trigger into the list,
// and must still be open long enough to click a project.
const projBox = await p.locator('.dropwrap:first-of-type button').boundingBox();
await p.mouse.move(projBox.x + projBox.width / 2, projBox.y + projBox.height / 2);
await p.waitForTimeout(60);
await p.mouse.move(projBox.x + projBox.width / 2, projBox.y + projBox.height + 40); // crosses the former dead gap
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
// "+ Contact" nav menu opens, lists the enquiry routes, and preselects the
// chosen one on the contact page.
await p.goto(B + '/studio', { waitUntil: 'networkidle' });
const contactTrigger = p.locator('.dropwrap').last().locator('button');
if ((await contactTrigger.textContent())?.trim() !== '+ Contact')
  bad.push('no "+ Contact" menu in the nav');
await contactTrigger.hover();
await p.waitForTimeout(400);
const cItems = p.locator('.dropwrap').last().locator('.drop a');
const cCount = await cItems.count();
if (cCount !== 4) bad.push(`contact menu has ${cCount} items, expected 4`);
await cItems.filter({ hasText: 'Career' }).first().click();
await p.waitForTimeout(800);
if (!p.url().includes('/contact/careers')) bad.push('contact menu did not open the careers page');
if (!(await p.locator('h1').first().textContent())?.includes('Work with us'))
  bad.push('careers page missing its heading');

// Careers: CV field rejects the wrong type, accepts a PDF, and the application
// goes out by email because an attachment cannot be transmitted otherwise.
const send = p.locator('.wa__send');
if (!(await send.textContent())?.includes('email'))
  bad.push('careers should submit by email');
await p.setInputFiles('.wa__file', {
  name: 'notes.txt', mimeType: 'text/plain', buffer: Buffer.from('nope'),
});
await p.waitForTimeout(250);
if (!(await p.locator('.wa__err').count())) bad.push('CV field accepted a .txt file');
await p.setInputFiles('.wa__file', {
  name: 'asha-cv.pdf', mimeType: 'application/pdf', buffer: Buffer.from('%PDF-1.4'),
});
await p.waitForTimeout(250);
if (await p.locator('.wa__err').count()) bad.push('CV field rejected a valid PDF');
if (!(await p.locator('.wa__hint').textContent())?.includes('asha-cv.pdf'))
  bad.push('chosen CV filename not shown back');

// Required fields gate submission.
if (!(await send.isDisabled())) bad.push('careers send enabled before required fields');
await p.fill('#f-name', 'Asha');
await p.fill('#f-email', 'asha@example.com');
await p.fill('#f-phone', '9999999999');
await p.fill('#f-message', 'I want to learn to build with earth & lime.');
await p.waitForTimeout(250);
if (await send.isDisabled()) bad.push('careers send still disabled after required fields');

// Each enquiry page renders its own form.
for (const [slug, heading] of [
  ['project', 'Start a project'],
  ['workshops', 'Join a workshop'],
  ['general', 'Say hello'],
]) {
  await p.goto(`${B}/contact/${slug}`, { waitUntil: 'networkidle' });
  const h = (await p.locator('h1').first().textContent())?.trim();
  if (h !== heading) bad.push(`/contact/${slug} heading is "${h}", expected "${heading}"`);
  if (!(await p.locator('.wa').count())) bad.push(`/contact/${slug} has no form`);
}

// Project enquiry builds a wa.me link and opens it in a new tab.
await p.goto(B + '/contact/project', { waitUntil: 'networkidle' });
const sendBtn = p.locator('.wa__send');
if (!(await sendBtn.isDisabled())) bad.push('send enabled before required fields filled');
await p.fill('#f-name', 'Asha');
await p.fill('#f-email', 'asha@example.com');
await p.fill('#f-location', 'Bengaluru');
await p.fill('#f-message', 'We have a plot & want to build in mud.');
// The first dropdown on this form is "What you need". Exercise the pointer
// path, then the keyboard paths a native <select> would have given for free.
const dd = p.locator('.dd').first();
const ddTrigger = dd.locator('.dd__trigger');
await ddTrigger.click();
await p.waitForTimeout(250);
const optionCount = await dd.locator('.dd__list li').count();
if (optionCount !== 5) bad.push(`scope dropdown has ${optionCount} options, expected 5`);
await dd.locator('.dd__list li', { hasText: 'Interior design' }).click();
await p.waitForTimeout(200);
if ((await ddTrigger.locator('span').first().textContent()) !== 'Interior design')
  bad.push('clicking an option did not set the value');

// Keyboard: open, arrow down, commit.
await ddTrigger.focus();
await p.keyboard.press('Enter');
await p.waitForTimeout(200);
if (!(await dd.locator('.dd__list').isVisible())) bad.push('Enter did not open the dropdown');
await p.keyboard.press('ArrowDown');
await p.keyboard.press('Enter');
await p.waitForTimeout(200);
if (await dd.locator('.dd__list').count()) bad.push('Enter did not close the dropdown');
if ((await ddTrigger.locator('span').first().textContent()) === 'Interior design')
  bad.push('arrow key did not move the selection');

// Escape cancels and restores focus to the trigger.
await p.keyboard.press('Enter');
await p.waitForTimeout(200);
await p.keyboard.press('Escape');
await p.waitForTimeout(200);
if (await dd.locator('.dd__list').count()) bad.push('Escape did not close the dropdown');
if (!(await p.evaluate(() => document.activeElement?.classList.contains('dd__trigger'))))
  bad.push('focus not restored to trigger after Escape');

const chosen = await ddTrigger.locator('span').first().textContent();
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
// The marks live on the contact hub, not the enquiry pages.
await p.goto(B + '/contact', { waitUntil: 'networkidle' });
// The marks must actually decode, not merely be present in the DOM.
for (const [sel, where] of [['.mark img', 'contact'], ['.footer__mark img', 'footer']]) {
  const el = p.locator(sel).first();
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(400);
  const ok = await el.evaluate((i) => i.complete && i.naturalWidth > 0);
  if (!ok) bad.push(`${where} logo failed to load (${await el.getAttribute('src')})`);
}

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
await p.locator('.sheet nav button', { hasText: 'Projects' }).first().click();
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
