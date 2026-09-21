import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Dropdown from './Dropdown';
import { enquiryTypes, site } from '../data/site';

/* Composes the message and hands it to WhatsApp. There is no server and no
   stored data — the fields only build the text the studio receives. */
export function buildMessage({ name, place, about, message }) {
  const lines = [
    `Hello Mud Stories, I'm ${name.trim()}.`,
    about ? `I'd like to talk about: ${about}.` : null,
    place.trim() ? `Site / location: ${place.trim()}` : null,
    '',
    message.trim(),
  ].filter((l) => l !== null);
  return lines.join('\n');
}

export const whatsappLink = (fields) =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(buildMessage(fields))}`;

const EMPTY = { name: '', place: '', about: enquiryTypes[0], message: '' };

export default function WhatsAppForm() {
  // The "+ Contact" nav menu links here with ?about=<type> to preselect the
  // enquiry. Anything not in the list is ignored rather than trusted.
  const [params] = useSearchParams();
  const asked = params.get('about');
  const [f, setF] = useState({
    ...EMPTY,
    about: enquiryTypes.includes(asked) ? asked : EMPTY.about,
  });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setF((v) => ({ ...v, [k]: e.target.value }));
  const ready = f.name.trim() && f.message.trim();

  const submit = (e) => {
    e.preventDefault();
    if (!ready) return;
    window.open(whatsappLink(f), '_blank', 'noopener,noreferrer');
    setSent(true);
  };

  return (
    <form className="wa" onSubmit={submit}>
      <p className="meta">Send an enquiry on WhatsApp</p>

      <div className="wa__row">
        <label className="wa__field">
          <span>Your name</span>
          <input
            type="text"
            value={f.name}
            onChange={set('name')}
            autoComplete="name"
            required
          />
        </label>
        <label className="wa__field">
          <span>Site or city (optional)</span>
          <input type="text" value={f.place} onChange={set('place')} />
        </label>
      </div>

      <div className="wa__field">
        <Dropdown
          name="about"
          label="What is it about"
          options={enquiryTypes}
          value={f.about}
          onChange={(v) => setF((prev) => ({ ...prev, about: v }))}
        />
      </div>

      <label className="wa__field">
        <span>Your message</span>
        <textarea rows={5} value={f.message} onChange={set('message')} required />
      </label>

      <div className="wa__foot">
        <button type="submit" className="wa__send" disabled={!ready}>
          Open in WhatsApp →
        </button>
        <p className="wa__note">
          This opens WhatsApp with your message ready to send. Nothing is stored on
          this site. Prefer email?{' '}
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </div>

      <p className="wa__ok" aria-live="polite">
        {sent ? 'WhatsApp should have opened in a new tab. If it did not, use the email address above.' : ''}
      </p>
    </form>
  );
}
