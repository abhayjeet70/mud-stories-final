import { useRef, useState } from 'react';
import Dropdown from './Dropdown';
import { site } from '../data/site';

/* Builds the message a completed form produces. Kept pure and exported so the
   composition is checked directly rather than only through the browser. */
export function composeEnquiry(page, values) {
  const lines = [`${page.formTitle} — ${site.name}`, ''];

  for (const f of page.fields) {
    if (f.type === 'file' || f.type === 'textarea') continue;
    const v = (values[f.name] || '').trim();
    if (v) lines.push(`${f.label.replace(' (optional)', '')}: ${v}`);
  }

  for (const f of page.fields.filter((x) => x.type === 'textarea')) {
    const v = (values[f.name] || '').trim();
    if (v) lines.push('', `${f.label}:`, v);
  }

  const file = page.fields.find((f) => f.type === 'file');
  if (file && values[`${file.name}__filename`]) {
    lines.push('', `Attachment to include: ${values[`${file.name}__filename`]}`);
  }
  return lines.join('\n');
}

export const enquiryLink = (page, values) => {
  const body = composeEnquiry(page, values);
  if (page.channel === 'email') {
    const subject = `${page.formTitle}: ${values.role || page.title} — ${values.name || ''}`.trim();
    return `mailto:${site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(body)}`;
};

const blank = (page) =>
  Object.fromEntries(
    page.fields.map((f) => [f.name, f.type === 'select' ? f.options[0] : ''])
  );

export default function EnquiryForm({ page }) {
  const [v, setV] = useState(() => blank(page));
  const [fileError, setFileError] = useState('');
  const [sent, setSent] = useState(false);
  const fileInput = useRef(null);

  const set = (name) => (e) => setV((p) => ({ ...p, [name]: e.target.value }));

  const onFile = (f) => (e) => {
    const picked = e.target.files?.[0];
    setFileError('');
    if (!picked) {
      setV((p) => ({ ...p, [`${f.name}__filename`]: '' }));
      return;
    }
    const ok = f.accept
      .split(',')
      .some((ext) => picked.name.toLowerCase().endsWith(ext.trim()));
    if (!ok) {
      setFileError(`That is not a ${f.accept} file.`);
      e.target.value = '';
      return;
    }
    if (picked.size > f.maxMB * 1024 * 1024) {
      setFileError(`That file is ${(picked.size / 1024 / 1024).toFixed(1)}MB — the limit is ${f.maxMB}MB.`);
      e.target.value = '';
      return;
    }
    setV((p) => ({ ...p, [`${f.name}__filename`]: picked.name }));
  };

  const missing = page.fields.filter((f) => f.required && !String(v[f.name] || '').trim());
  const ready = missing.length === 0 && !fileError;

  const submit = (e) => {
    e.preventDefault();
    if (!ready) return;
    window.open(enquiryLink(page, v), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  const field = (f) => {
    const id = `f-${f.name}`;
    if (f.type === 'select') {
      return (
        <div className="wa__field" key={f.name} data-half={!!f.half}>
          <Dropdown
            name={f.name}
            label={f.label}
            options={f.options}
            value={v[f.name]}
            onChange={(val) => setV((p) => ({ ...p, [f.name]: val }))}
          />
        </div>
      );
    }
    if (f.type === 'file') {
      return (
        <div className="wa__field" key={f.name}>
          <span className="dd__label" id={`${id}-label`}>
            {f.label}
          </span>
          <input
            ref={fileInput}
            id={id}
            type="file"
            accept={f.accept}
            className="wa__file"
            aria-describedby={`${id}-hint`}
            onChange={onFile(f)}
          />
          <p className="wa__hint" id={`${id}-hint`} aria-live="polite">
            {fileError ? (
              <strong className="wa__err">{fileError}</strong>
            ) : v[`${f.name}__filename`] ? (
              <>Selected: {v[`${f.name}__filename`]} — remember to attach it to the email.</>
            ) : (
              f.hint
            )}
          </p>
        </div>
      );
    }
    return (
      <label className="wa__field" key={f.name} data-half={!!f.half} htmlFor={id}>
        <span>{f.label}</span>
        {f.type === 'textarea' ? (
          <textarea
            id={id}
            rows={f.rows || 5}
            value={v[f.name]}
            placeholder={f.placeholder}
            onChange={set(f.name)}
            required={f.required}
          />
        ) : (
          <input
            id={id}
            type={f.type}
            value={v[f.name]}
            placeholder={f.placeholder}
            autoComplete={f.autoComplete}
            onChange={set(f.name)}
            required={f.required}
          />
        )}
      </label>
    );
  };

  // Consecutive half-width fields pair up into a row.
  const rows = [];
  for (let i = 0; i < page.fields.length; i += 1) {
    const f = page.fields[i];
    const next = page.fields[i + 1];
    if (f.half && next?.half) {
      rows.push(
        <div className="wa__row" key={f.name}>
          {field(f)}
          {field(next)}
        </div>
      );
      i += 1;
    } else {
      rows.push(field(f));
    }
  }

  return (
    <form className="wa" onSubmit={submit} noValidate>
      <p className="meta">{page.formTitle}</p>
      <p className="wa__intro">{page.formNote}</p>

      {rows}

      <div className="wa__foot">
        <button type="submit" className="wa__send" disabled={!ready}>
          {page.channel === 'email' ? 'Open email application' : 'Send on WhatsApp'} →
        </button>
        <p className="wa__note">
          {page.channel === 'email' ? (
            <>
              Opens a draft to <a href={`mailto:${site.email}`}>{site.email}</a> with your
              answers filled in. Attach your CV before sending.
            </>
          ) : (
            <>
              Opens WhatsApp with your message ready to send. Nothing is stored on this
              site. Prefer email? <a href={`mailto:${site.email}`}>{site.email}</a>
            </>
          )}
        </p>
      </div>

      <p className="wa__ok" aria-live="polite">
        {sent
          ? page.channel === 'email'
            ? 'An email draft should have opened. Attach your CV, then send.'
            : 'WhatsApp should have opened in a new tab. If it did not, use the email address above.'
          : ''}
      </p>
    </form>
  );
}
