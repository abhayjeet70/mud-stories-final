/* Studio narrative, people and notes — all carried over from the source
   repository (mudstories/content/content.md, src/config/studio.ts,
   src/config/more.ts). No claims, awards or statistics have been invented. */

export const founders = [
  {
    name: 'Ar. Aishwarya Saravanan',
    role: 'Founder',
    image: { src: '/images/Founder.webp', w: 632, h: 647 },
    bio: 'Aishwarya studied architecture at RV College of Architecture and went on to work with CPWD, where public-sector projects gave her a grounding in technical detailing, coordination and large-scale execution. She brings the systems thinking to the studio — the drawing set, the sequence, the things that have to be right before anyone starts digging.',
  },
  {
    name: 'Ar. Raman J',
    role: 'Co-Founder',
    image: { src: '/images/co-founder.webp', w: 632, h: 647 },
    bio: 'Raman works across architecture and interiors, which gives him a view of a building from its structure down to the last handle. His hands-on involvement on site turned into a long interest in mud, lime, bamboo and wood, and how those materials behave in a contemporary house rather than a heritage one.',
  },
];

export const aboutIntro =
  'Mud Stories began not just as a design practice, but as a shared journey between two architects who found both their calling and each other in architecture school.';

export const aboutBody = [
  'Aishwarya Saravanan and Raman J met while studying architecture at RV College of Architecture, where their shared curiosity for meaningful, climate-responsive design first connected them. What began as conversations about spaces, materials, and sustainability gradually shaped a common vision for the kind of architecture they wanted to pursue — thoughtful, grounded, and connected to nature.',
  'After graduation, Aishwarya gained professional experience with CPWD, where she worked on public sector projects that strengthened her understanding of technical detailing, coordination, and large-scale execution. This brought a strong practical and systems-oriented perspective to her design approach.',
  'Raman developed strong experience across architecture and interior design, giving him a holistic view of space — from structural concepts to the smallest interior detail. His hands-on involvement in projects nurtured a deep interest in natural materials like mud, lime, bamboo, and wood, and how they can shape contemporary living environments.',
  'A turning point in their journey was attending a hands-on mud construction workshop at Thannal. Learning directly from practitioners and working with earth as a building material gave them first-hand insight into the beauty, logic, and responsibility of natural building. They credit this experience for deepening their respect for traditional knowledge and shaping the values that Mud Stories stands for today.',
  'As their personal and professional journeys evolved, they chose to build a life together — and Mud Stories became a natural extension of that partnership.',
  'Today, Mud Stories reflects their combined strengths: sensitivity to nature, respect for materials, technical clarity, and a belief that architecture should feel rooted and honest. Together, they create spaces that respond to climate, celebrate craft, and age beautifully with time.',
  'For them, architecture is not just a profession — it is a way of living thoughtfully and building responsibly.',
];

export const aboutMedia = {
  src: '/images/workshop_1.webp',
  w: 762,
  h: 597,
  alt: 'A hands-on natural building workshop run by the studio',
  caption: 'Learning to build, not only to draw — a hands-on mud construction session.',
};

export const philosophy =
  'At Mud Stories, our philosophy is rooted in the belief that architecture should nurture both people and the planet. We design with purpose, crafting spaces that celebrate sustainability, traditional wisdom, and community connections.';

/* Material positions — the studio's own working principles, from src/config/studio.ts */
export const values = [
  {
    index: '01',
    title: 'Build with what is already here',
    body: 'The best material for a wall is usually within a short distance of the wall. We test the soil on your site before we specify anything, and we source within the shortest radius the project allows. Transport is often the largest hidden carbon cost in a building, and the easiest one to avoid.',
  },
  {
    index: '02',
    title: 'Traditional knowledge is technical knowledge',
    body: 'The techniques we work with were refined over centuries by people solving exactly the problems we face — heat, monsoon, scarcity, and the materials at hand. We treat that body of knowledge as engineering, not as decoration.',
  },
  {
    index: '03',
    title: 'The people who build it matter',
    body: 'A natural building depends entirely on the skill of the hands making it. We work with masons and carpenters who hold these techniques, pay properly for that skill, and where the knowledge is missing in a region we budget the time to teach it.',
  },
  {
    index: '04',
    title: 'Say the honest number',
    body: 'Natural building is not automatically cheaper, faster or easier, and we will not tell you it is. We give a real cost range early, explain what drives it, and let you decide. A client who is surprised halfway through construction was failed at the briefing stage.',
  },
  {
    index: '05',
    title: 'Design for the tenth year',
    body: 'Materials that patina rather than peel. Finishes that can be repaired in a day by someone local. We would rather a house look better after a decade than photograph well in its first month.',
  },
];

/* Chronological studio notes — research entries from src/config/more.ts */
export const notes = [
  {
    year: '2025',
    title: 'Bamboo treatment without borax',
    status: 'Concluded',
    image: { src: '/images/generated/material-bamboo-junction.webp', w: 1402, h: 1122, alt: 'Structural bamboo junction' },
    body: 'Comparing traditional water-immersion and smoke-curing methods against borax treatment for structural bamboo, measured on borer resistance over eighteen months. Traditional methods performed acceptably at short spans and clearly worse where sections stayed damp.',
  },
  {
    year: '2025',
    title: 'Oxide floor mixes in high-humidity coastal sites',
    status: 'Concluded',
    image: { src: '/images/generated/material-granite-lime.webp', w: 1402, h: 1122, alt: 'Local stone laid in lime' },
    body: 'Prompted by the ECR farmhouse. Six oxide floor samples laid on the coast and monitored for curing behaviour, colour shift and surface hardness in salt-laden air. Two of the six were unusable, and the reasons now sit in our standard specification.',
  },
  {
    year: '2026',
    title: 'Stabilised earth blocks from urban excavation spoil',
    status: 'Ongoing',
    image: { src: '/images/generated/material-adobe-blocks.webp', w: 1254, h: 1254, alt: 'Pressed earth blocks stacked to cure' },
    body: 'Bengaluru sites generate large volumes of excavated subsoil that is trucked away and dumped. We have been testing blocks pressed from spoil taken off three city sites, comparing compressive strength and water absorption against our standard mix.',
  },
  {
    year: '2026',
    title: 'Lime plaster on cement-rendered walls',
    status: 'Ongoing',
    image: { src: '/images/generated/material-lime-plaster.webp', w: 1536, h: 1024, alt: 'Lime plaster sample panel' },
    body: 'Testing bonding strategies for breathable lime finishes over existing cement render — the single most common request we get from owners of conventional houses. Six sample panels with different keys and primers, monitored through a full monsoon for adhesion and crazing.',
  },
];
