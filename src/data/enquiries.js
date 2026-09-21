/* The four contact routes, each a page of its own with a form suited to it.

   Editorial copy, role descriptions, workshop details and engagement types are
   carried over from the source repository (src/config/studio.ts, workshops.ts,
   more.ts). Form *options* are choices offered to the visitor and are not
   claims about the studio.

   `channel` decides how a completed form is delivered: 'whatsapp' composes a
   message, 'email' opens a draft — used where an attachment is required, which
   a site with no server cannot transmit itself. */

export const engagements = [
  {
    title: 'Design and drawings',
    forWho: 'You have a builder, or you intend to owner-build.',
    body: 'We take the project from site study through to a complete construction drawing set, then hand it over. You execute. We stay reachable for questions and can review photographs as the work proceeds, but we are not on site.',
  },
  {
    title: 'Design with site supervision',
    forWho: 'Most of our residential projects sit here.',
    body: 'Everything above, plus scheduled site visits at the stages that matter — setting out, plinth, first wall lift, roof, and each finish. You appoint and pay the contractor directly and control the money; we make sure what is built is what was drawn.',
  },
  {
    title: 'Design and full project management',
    forWho: 'Clients who are not in a position to run a site themselves.',
    body: 'We manage the build end to end — appointing the crew, ordering and sequencing materials, running the programme, checking quality and reconciling the accounts. You approve decisions and see the full cost sheet; we carry the day-to-day.',
  },
  {
    title: 'Interiors or landscape only',
    forWho: 'An existing or completed building, ours or someone else’s.',
    body: 'A self-contained engagement for interiors, landscape, or both, working within what is already built. We coordinate with your existing architect where there is one.',
  },
  {
    title: 'Consultation',
    forWho: 'You have a specific question, not yet a project.',
    body: 'A single paid session — on site or online — on soil suitability, whether a plot supports natural construction, a plaster problem in an existing house, or a second opinion on someone else’s drawings.',
  },
];

export const engagementNotes = {
  cost: 'We do not publish square-foot rates, and we would be suspicious of anyone in natural building who does. Cost depends on your soil, your site access, the wall system it supports, how far materials travel and how much skilled labour is available locally. What we will do, early and in writing, is give you a range you can plan against — and tell you if your budget and your brief do not meet.',
  availability: 'We take a limited number of projects each year. New design work is currently being scheduled from the following quarter; interiors and consultations usually start sooner. It is worth writing to us well before you intend to break ground.',
};

export const workshopOfferings = [
  {
    title: 'Seven-Day Natural Building Intensive',
    lede: 'The full arc of a natural building — foundation, walls, roof, floor and finish — with your hands in all five.',
    duration: '7 days',
    where: 'Studio field site, outside Bengaluru',
    who: 'Anyone. No construction background needed.',
    from: '₹32,000',
    image: { src: '/images/workshop_1.webp', w: 762, h: 597, alt: 'Seven-day natural building intensive' },
  },
  {
    title: 'Weekend Workshop: Lime and Natural Plasters',
    lede: 'Two days on the one skill that decides whether an earthen wall lasts — the coat that goes over it.',
    duration: '2 days',
    where: 'Studio field site, outside Bengaluru',
    who: 'Homeowners, architects, interior designers, contractors and masons.',
    from: '₹9,500',
    image: { src: '/images/generated/craft-lime-plaster.webp', w: 1536, h: 1024, alt: 'Applying lime plaster' },
  },
  {
    title: 'Student Immersion',
    lede: 'A short intensive run for architecture and engineering cohorts, at our field site or on your campus.',
    duration: '3 – 4 days',
    where: 'Our field site, or your campus',
    who: 'Architecture and engineering students, with accompanying faculty.',
    from: '₹1,400 per student, per day',
    image: { src: '/images/workshop_2.webp', w: 807, h: 596, alt: 'Student immersion workshop' },
  },
];

export const openings = [
  {
    role: 'Architect — 1 to 3 years',
    type: 'Full time · Bengaluru',
    status: 'Open',
    body: 'Working on drawings, detailing and site documentation across residential projects. You will be on site regularly from the first month — this is not a desk role. We are looking for someone who wants to understand construction rather than only represent it.',
    wants: ['Bachelor of Architecture', 'AutoCAD and SketchUp', 'Willingness to be on site in the heat', 'Legible hand sketching'],
  },
  {
    role: 'Architectural intern',
    type: '4 to 6 months · Bengaluru',
    status: 'Open',
    body: 'For students in their fourth or fifth year. You work on live projects rather than on a parallel exercise, and you spend a meaningful share of the internship on site. We take two interns at a time so that both actually get taught.',
    wants: ['Currently studying architecture', 'Available for at least four months', 'Basic drafting and modelling', 'Genuine interest in materials'],
  },
  {
    role: 'Site supervisor — natural construction',
    type: 'Full time · Project-based',
    status: 'Open',
    body: 'Running day-to-day work on natural building sites: coordinating masons and carpenters, checking mixes and details against drawings, and keeping the programme honest. Experience with lime and earthen construction matters more here than a formal qualification.',
    wants: ['Site experience in construction', 'Comfortable reading drawings', 'Lime or earthen work an advantage', 'Kannada or Tamil useful'],
  },
];

export const volunteering = {
  intro:
    'We take a small number of volunteers on live sites and at the field campus. It is genuine work — mixing, laying, plastering, documenting — and it is physical. In exchange you learn by doing, alongside masons who have done this for decades.',
  points: [
    'Minimum commitment of two weeks. Shorter than that and you spend the whole time learning where the tools are.',
    'You arrange your own accommodation and food. We help with local options and, on some sites, can provide a place to stay.',
    'There is no stipend. Volunteers who stay beyond two months and want to continue are usually moved onto a paid footing.',
    'Priority goes to people who have attended one of our workshops, though it is not a requirement.',
    'Write to us with what you can offer, when you are free, and what you want out of it. Vague enquiries do not get far.',
  ],
};

const ROLE_OPTIONS = [...openings.map((o) => o.role), 'Volunteering', 'Open application'];

export const enquiryPages = [
  {
    slug: 'project',
    nav: 'Project',
    navNote: 'A house, interiors or landscape',
    title: 'Start a project',
    lede: 'A house, interiors, a landscape, or a question about a piece of land. Tell us where it is and what you are imagining.',
    seo: 'Begin a project with Mud Stories — architecture, interiors and landscape in earth, lime, bamboo and stone.',
    hero: { src: '/images/generated/project-rural-karnataka.webp', w: 1672, h: 941, alt: 'A house built from the material of its own site' },
    channel: 'whatsapp',
    formTitle: 'Project enquiry',
    formNote: 'The more you can tell us about the site, the more useful our first reply will be.',
    fields: [
      { name: 'name', label: 'Your name', type: 'text', required: true, autoComplete: 'name', half: true },
      { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email', half: true },
      { name: 'phone', label: 'Phone (optional)', type: 'tel', autoComplete: 'tel', half: true },
      { name: 'location', label: 'Site location', type: 'text', required: true, half: true, placeholder: 'Village, town or city' },
      { name: 'scope', label: 'What you need', type: 'select', options: ['Architectural design', 'Interior design', 'Landscape design', 'Natural building consultation', 'Not sure yet'] },
      { name: 'engagement', label: 'How you would like to work', type: 'select', options: [...engagements.map((e) => e.title), 'Not sure yet'] },
      { name: 'plot', label: 'Plot size (optional)', type: 'text', half: true, placeholder: 'e.g. 40 × 60 ft, or 1 acre' },
      { name: 'timeline', label: 'When you hope to build', type: 'select', half: true, options: ['Still exploring', 'Within 6 months', '6 to 12 months', 'More than a year away'] },
      { name: 'budget', label: 'Budget range', type: 'select', options: ['Prefer not to say', 'Under ₹25 lakh', '₹25 – 50 lakh', '₹50 lakh – 1 crore', 'Above ₹1 crore'] },
      { name: 'message', label: 'About the project', type: 'textarea', required: true, rows: 6, placeholder: 'The site, how you live, what you want the building to do.' },
    ],
  },
  {
    slug: 'workshops',
    nav: 'Workshops',
    navNote: 'Hands-on natural building',
    title: 'Join a workshop',
    lede: 'You cannot learn the feel of a correct mud mix from a drawing. Every session is hands-on, on a real building, with people who build this way for a living.',
    seo: 'Hands-on natural building workshops with Mud Stories — cob, adobe, lime plaster, bamboo and rammed earth.',
    hero: { src: '/images/workshop_3.webp', w: 1642, h: 592, alt: 'Participants working on a natural building workshop' },
    channel: 'whatsapp',
    formTitle: 'Workshop registration',
    formNote: 'Send this and we will confirm availability for your dates before any payment.',
    fields: [
      { name: 'name', label: 'Your name', type: 'text', required: true, autoComplete: 'name', half: true },
      { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email', half: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true, autoComplete: 'tel', half: true },
      { name: 'city', label: 'Where you are travelling from', type: 'text', half: true },
      { name: 'workshop', label: 'Which workshop', type: 'select', options: workshopOfferings.map((w) => w.title) },
      { name: 'dates', label: 'Preferred dates', type: 'text', placeholder: 'e.g. October 2027, or any session' },
      { name: 'participants', label: 'How many people', type: 'select', half: true, options: ['1', '2', '3', '4', '5 or more'] },
      { name: 'rate', label: 'Which rate applies', type: 'select', half: true, options: ['Standard participant', 'Student (with valid ID)', 'Returning participant', 'Second family member', 'Institution or college group'] },
      { name: 'experience', label: 'Building experience', type: 'select', options: ['None at all', 'Some — I have attended a workshop before', 'I work in architecture or construction'] },
      { name: 'message', label: 'Anything we should know', type: 'textarea', rows: 5, placeholder: 'Dietary needs, accessibility, what you hope to take away.' },
    ],
  },
  {
    slug: 'careers',
    nav: 'Career',
    navNote: 'Internships and roles',
    title: 'Work with us',
    lede: 'We keep the studio deliberately small, which means every person on it is on site regularly. If that is the way you want to learn to build, write to us.',
    seo: 'Roles, internships and volunteering at Mud Stories — a small natural building studio in Bengaluru.',
    hero: { src: '/images/generated/craft-cob-mixing.webp', w: 1536, h: 1024, alt: 'Working cob by hand on site' },
    channel: 'email',
    formTitle: 'Application',
    formNote: 'Your CV has to be attached to the email itself — this site has no server to upload it to. Choosing the file here checks it is a sensible type and size, and reminds you at the end.',
    fields: [
      { name: 'name', label: 'Your name', type: 'text', required: true, autoComplete: 'name', half: true },
      { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email', half: true },
      { name: 'phone', label: 'Phone', type: 'tel', required: true, autoComplete: 'tel', half: true },
      { name: 'city', label: 'Where you are based', type: 'text', half: true },
      { name: 'role', label: 'Which role', type: 'select', options: ROLE_OPTIONS },
      { name: 'qualification', label: 'Qualification', type: 'text', half: true, placeholder: 'e.g. B.Arch, RV College, 2024' },
      { name: 'availability', label: 'Available from', type: 'text', half: true, placeholder: 'e.g. immediately, or June 2027' },
      { name: 'portfolio', label: 'Portfolio or website (optional)', type: 'url', placeholder: 'https://' },
      { name: 'cv', label: 'Your CV', type: 'file', accept: '.pdf,.doc,.docx', maxMB: 10, hint: 'PDF or Word, up to 10MB' },
      { name: 'message', label: 'Why Mud Stories', type: 'textarea', required: true, rows: 6, placeholder: 'What draws you to building this way, and what you want to learn.' },
    ],
  },
  {
    slug: 'general',
    nav: 'General contact',
    navNote: 'Anything else',
    title: 'Say hello',
    lede: 'Press, collaborations, a question about a material, or something that does not fit anywhere else.',
    seo: 'Get in touch with Mud Stories — a design studio working in earth, lime, bamboo and stone in Bengaluru.',
    hero: { src: '/images/generated/material-lime-plaster.webp', w: 1536, h: 1024, alt: 'Lime plaster sample panel' },
    channel: 'whatsapp',
    formTitle: 'Send a message',
    formNote: 'We read everything. Replies usually take a couple of working days.',
    fields: [
      { name: 'name', label: 'Your name', type: 'text', required: true, autoComplete: 'name', half: true },
      { name: 'email', label: 'Email', type: 'email', required: true, autoComplete: 'email', half: true },
      { name: 'subject', label: 'Subject', type: 'select', options: ['Press or publication', 'Collaboration', 'A question about materials', 'Speaking or teaching', 'Something else'] },
      { name: 'message', label: 'Your message', type: 'textarea', required: true, rows: 6 },
    ],
  },
];

export const enquiryBySlug = (slug) => enquiryPages.find((p) => p.slug === slug);
