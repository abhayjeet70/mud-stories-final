/* Project records carried over from the source repository (src/config/projects.ts).
   Titles, locations, years, areas, briefs, approaches, materials and facts are the
   client's own copy and must not be rewritten.

   Image note: photographs marked `own: true` are Mud Stories' own project
   photography. Items marked `own: false` come from the previous site's
   illustrative render library and are flagged for replacement with real site
   photography when the client supplies it. */

const p = (src, w, h, alt, caption, own = true) => ({ src, w, h, alt, caption, own });
/* Numbered photos in /images/projects/<slug>/ — rows are [w, h, alt, caption]. */
const shots = (slug, rows) =>
  rows.map(([w, h, alt, caption], i) => p(`/images/projects/${slug}/${String(i + 1).padStart(2, '0')}.webp`, w, h, alt, caption));

export const projects = [
  {
    slug: 'thendral-ecr-farmhouse',
    title: 'Thendral',
    category: 'Residential',
    location: 'East Coast Road, Kadapakkam',
    year: '2025',
    area: '1,500 sq ft',
    status: 'Completed',
    cover: shots('thendral-ecr-farmhouse', [[1082, 1454, 'Thendral from the garden path', '']])[0],
    summary:
      'A coastal farmhouse designed to breathe — an open plan shaped around the prevailing sea breeze, with handcrafted brick jaalis, lime plaster and natural materials creating a cool, porous home.',
    brief:
      'An old farmhouse nestled among coconut and jackfruit trees, along the coast of ECR.\n\nThe home was inward and confined, while the landscape outside was expansive. The brief was to open the house to its surroundings — bringing in the breeze, daylight and garden, and reimagining it as a quiet home for a couple entering a new chapter of life.',
    approach:
      'The house was opened to the coastal breeze, with the plan reorganised around light, air and the landscape.\n\nOpenings were carefully placed along the prevailing wind direction, while handcrafted brick jaalis filter the harsh coastal sun and allow the breeze to pass through.\n\nLarge French windows dissolve the edge between the home and the garden, while a skylight draws daylight into the heart of the house.\n\nLime plaster, natural stone, timber and other natural materials ground the intervention in its coastal setting.\n\nThe architecture seeks to work with nature rather than seal it out — allowing the house to breathe, age and belong to its landscape.',
    materials: ['Red Bricks', 'Lime Plaster', 'Brick Jaali', 'Green Kota Stone', 'Wooden Openings'],
    facts: [
      { label: 'Plot', value: '11,000 sq ft' },
      { label: 'Built area', value: '1,500 sq ft' },
      { label: 'Roof', value: 'Concrete roof' },
      { label: 'Walls', value: '230mm red bricks' },
    ],
    gallery: shots('thendral-ecr-farmhouse', [
      [1082, 1454, 'Thendral from the garden path', 'Brick-paved path along the sea-facing side.'],
      [841, 1870, 'Thendral entrance at dusk', 'The entrance at dusk, behind a brick jaali screen.'],
      [1086, 1448, 'Brick jaali atrium', 'Handcrafted brick jaalis filter the coastal sun.'],
      [1086, 1448, 'Skylit atrium', 'A skylight draws daylight into the heart of the house.'],
      [1086, 1448, 'Stair beside the jaali', 'The stair, lit through the brick lattice.'],
      [1086, 1448, 'Entrance with French windows', 'Large French windows dissolve the edge between home and garden.'],
      [1086, 1448, 'Door open to the garden', 'The breeze passes straight through to the garden.'],
      [1086, 1448, 'Room with green Kota flooring', 'Green Kota stone underfoot, the garden framed ahead.'],
      [841, 1870, 'Living space with timber openings', 'Timber openings along the prevailing wind direction.'],
      [1086, 1448, 'Lime plastered bathroom', 'Lime plaster and Kota stone in the bathroom.'],
      [1086, 1448, 'Bathroom vanity', 'A vanity set against the lime plaster.'],
      [1086, 1448, 'House among coconut palms', 'The old farmhouse among coconut and jackfruit trees.'],
    ]),
  },
  {
    slug: 'varanasi-residence',
    title: 'Varanasi Residence',
    category: 'Residential',
    location: 'Varanasi, Uttar Pradesh',
    year: '2023',
    area: '2,400 sq ft',
    status: 'Proposed',
    cover: shots('varanasi-residence', [[1672, 941, 'Varanasi Residence street elevation', '']])[0],
    summary:
      'A contemporary residence rooted in the architectural language of Varanasi — where brick, light, shade and greenery shape a quiet home within the dense city.',
    brief:
      'A compact urban home on a 3,000 sq ft plot, surrounded by the dense fabric of Varanasi.\n\nThe brief was to create a contemporary family residence that draws from the city’s brick architecture, arches and jaalis, while opening the home to light, air and greenery.',
    approach:
      'The architecture reinterprets the brick arches and jaalis of Varanasi through a contemporary expression.\n\nA central light and ventilation court draws air and daylight deep into the home, while layered brick façades create moments of shade and privacy.\n\nThe upper terrace unfolds as an open garden court — a space for gathering, pause and views across the city.',
    materials: ['Red brick', 'Exposed brickwork', 'Concrete roof', 'Natural stone flooring'],
    facts: [
      { label: 'Plot', value: '3,000 sq ft' },
      { label: 'Built area', value: '2,400 sq ft' },
      { label: 'Strategy', value: 'Central light & ventilation court' },
      { label: 'Language', value: 'Brick arches + jaalis' },
      { label: 'Status', value: 'Proposed' },
    ],
    gallery: shots('varanasi-residence', [
      [1672, 941, 'Varanasi Residence street elevation', 'Varanasi Residence, Uttar Pradesh.'],
      [1316, 1195, 'Brick arches and jaali facade', 'Brick arches and jaalis, in the language of Varanasi.'],
      [1983, 793, 'Courtyard with Nandi', 'A central court drawing air and daylight into the home.'],
      [1983, 793, 'Shrine alcove', 'A shrine alcove beside a brick jaali.'],
      [1983, 793, 'Terrace garden court', 'The terrace, an open garden court for gathering.'],
    ]),
  },
  {
    slug: 'sthairya-farmhouse',
    title: 'Sthairya Farm House',
    category: 'Residential',
    location: 'Bangarpet, Karnataka',
    year: '2026',
    area: '8 acres (farm)',
    status: 'Completed',
    cover: shots('sthairya-farmhouse', [[1672, 941, 'Sthairya Farmhouse', '']])[0],
    summary:
      'A home grown from the earth — shaped by permaculture, natural materials and a desire to live closer to the land.',
    brief:
      'A home within an 8-acre permaculture farm, envisioned by a couple from Bengaluru who wanted to step away from the city and live more closely with the land.\n\nThe brief was to create a natural, low-impact home that could become part of the farm — using materials and construction methods that felt honest to the landscape and suited to a slower way of living.',
    approach:
      'The house was conceived as a home grown from the earth, using a palette of stone, cob and lime.\n\nA stone foundation laid in lime mortar anchors the house, while thick cob walls form the primary enclosure, bringing mass and thermal comfort to the interiors. Lime plaster finishes the walls, allowing the material beneath to remain breathable and tactile.\n\nAthangudi tiles bring colour and craft underfoot, while the roof combines limecrete and traditional Mangalore tiles. The architecture is deliberately rooted in its setting — simple, tactile and made to age with the farm.',
    materials: ['Stone foundation', 'Lime mortar', 'Cob walls', 'Lime plaster', 'Athangudi tiles', 'Limecrete roof', 'Mangalore tile roof'],
    facts: [
      { label: 'Farm', value: '8 acres' },
      { label: 'Setting', value: 'Permaculture farm' },
      { label: 'Wall system', value: 'Cob' },
      { label: 'Foundation', value: 'Stone + lime mortar' },
      { label: 'Roof', value: 'Limecrete + Mangalore tiles' },
      { label: 'Material palette', value: 'Earth + stone + lime' },
    ],
    gallery: shots('sthairya-farmhouse', [
      [1672, 941, 'Sthairya Farmhouse', 'Sthairya, Bangarpet.'],
      [1536, 1024, 'Farmhouse beneath dramatic skies', 'The house under a big Karnataka sky.'],
      [1672, 941, 'Farmhouse at golden hour', 'Golden hour across the farm.'],
      [2400, 1350, 'Farmhouse across the fields', 'The house seen across the farm.'],
      [1087, 1447, 'Terracotta porch', 'Terracotta porch under a timber-rafter roof.'],
      [1087, 1447, 'Veranda', 'The veranda, edged by the garden.'],
      [1086, 1448, 'Garden porch', 'A porch to sit out in the garden.'],
      [1086, 1448, 'House from the driveway', 'The two-storey house from the drive.'],
      [1086, 1448, 'Patterned-tile living room', 'Patterned floor tiles in the main room.'],
      [1087, 1446, 'Teal tile room', 'Teal patterned tile against lime plaster.'],
      [1086, 1448, 'Room with garden door', 'Light from the garden through the glazed door.'],
    ]),
  },
  {
    slug: 'mysore-residence',
    title: 'Mysore Residence',
    category: 'Residential',
    location: 'Mysuru, Karnataka',
    year: '2023',
    area: '2,000 sq ft',
    status: 'Proposed',
    cover: shots('mysore-residence', [[2400, 1074, 'Mysore Residence at golden hour', '']])[0],
    summary:
      'A compact duplex shaped by levels and light — where a lowered car park becomes a shaded gathering court, and clay screens soften the edge between home and street.',
    brief:
      'A duplex residence planned on a 1,200 sq ft urban plot, with the challenge of accommodating parking, living spaces and moments of openness within a compact footprint.\n\nThe design sought to create a home that felt private yet connected, while making the most of the site’s level difference.',
    approach:
      'The stilt level is lowered to accommodate parking, creating an informal gathering space tucked beneath the house — a shaded threshold between the street and the home.\n\nAbove, the residence unfolds across two levels, with carefully placed openings bringing in light and air while maintaining privacy.\n\nA clay jaali veil wraps portions of the façade, filtering sunlight and views while giving the house a tactile, warm character.\n\nThe architecture uses level, shade and filtered light to turn a compact urban plot into a layered home with spaces to gather, pause and retreat.',
    materials: ['Clay jaali', 'Exposed clay / terracotta elements', 'Concrete', 'Natural stone flooring', 'Timber'],
    facts: [
      { label: 'Plot', value: '1,200 sq ft' },
      { label: 'Built area', value: '2,000 sq ft' },
      { label: 'Type', value: 'Duplex residence' },
      { label: 'Parking', value: 'Stilt + lower-level parking' },
      { label: 'Gathering', value: 'Informal shaded court' },
      { label: 'Façade', value: 'Clay jaali screen' },
      { label: 'Levels', value: 'Two-storey residence' },
      { label: 'Status', value: 'Proposed' },
    ],
    gallery: shots('mysore-residence', [
      [2400, 1074, 'Mysore Residence at golden hour', 'Mysore Residence, Mysuru.'],
      [1730, 909, 'House in its garden', 'The house within its garden.'],
      [1731, 908, 'Living room', 'The living room, open to the garden.'],
      [1996, 788, 'Arched garden window', 'An arched window onto the garden.'],
      [1996, 788, 'Earth-toned interior', 'Earth tones, in sunlight.'],
      [1996, 788, 'Reading nook', 'A reading nook.'],
    ]),
  },
  {
    slug: 'kenneth-residence',
    title: 'Mr. Kenneth Residence',
    category: 'Residential',
    location: 'Kammanahalli, Bengaluru',
    year: '2023',
    area: '250 m²',
    status: 'Completed',
    cover: p('/images/kenneth.png', 602, 602, 'Mr. Kenneth Residence, Kammanahalli, Bengaluru'),
    summary: 'Natural materials on a dense city plot, with noise and privacy setting the plan as much as light.',
    brief:
      'An urban site on a busy road, overlooked on two sides. The client had seen natural building in rural settings and wanted to know whether it could work in the middle of Bengaluru.',
    approach:
      'It can, and the reasons turned out to be acoustic as much as thermal — a thick earthen wall is a significantly better sound barrier than a 230mm brick one. The plan turns inward, with the main living space opening onto a small planted court rather than the street. Street-facing openings are high and narrow, admitting light without a view in. A green roof over the rear block cuts both heat gain and the noise from an adjacent building’s plant.',
    materials: ['Stabilised earth block', 'Lime plaster', 'Green roof', 'Local stone paving'],
    facts: [
      { label: 'Context', value: 'Dense urban, arterial road' },
      { label: 'Built area', value: '250 m²' },
      { label: 'Key gain', value: 'Acoustic mass' },
      { label: 'Roof', value: 'Planted over rear block' },
    ],
    gallery: [
      p('/images/kenneth.png', 602, 602, 'Mr. Kenneth Residence', 'Kammanahalli, Bengaluru.'),
      p('/images/generated/interior-adobe-study.webp', 960, 1440, 'Adobe study room', 'High, narrow openings — light without a view in.', false),
      p('/images/generated/landscape-rain-garden.webp', 1536, 1024, 'Planted court study', 'The planted court the living space turns towards.', false),
    ],
  },
  {
    slug: 'logesh-residence-interiors',
    title: 'Mr. Logesh Residence Interiors',
    category: 'Interiors',
    location: 'Tirupur, Tamil Nadu',
    year: '2024',
    area: '150 m²',
    status: 'Completed',
    cover: p('/images/Logesh.png', 600, 603, 'Mr. Logesh Residence interiors, Tirupur'),
    summary: 'Interiors for a completed house, drawing on the textile trade the city is built on.',
    brief:
      'A finished shell in a city known nationally for its knitwear industry. The client wanted interiors that referred to that heritage without turning the house into a display of it.',
    approach:
      'The reference is in the surfaces rather than in ornament. Woven textures appear in screens, cane inserts and the run of a plastered wall; the palette is drawn from undyed and naturally dyed cloth. Loose furniture was made locally to our drawings. Because the building was already complete, everything had to work within existing openings and service runs — which shaped the storage strategy more than any aesthetic decision did.',
    materials: ['Clay plaster', 'Cane and rattan', 'Naturally dyed textiles', 'Locally made furniture'],
    facts: [
      { label: 'Scope', value: 'Interiors only' },
      { label: 'Area', value: '150 m²' },
      { label: 'Furniture', value: 'Custom, locally fabricated' },
      { label: 'Constraint', value: 'Completed shell' },
    ],
    gallery: [
      p('/images/Logesh.png', 600, 603, 'Logesh Residence interiors', 'Tirupur, Tamil Nadu.'),
      p('/images/interior.png', 593, 595, 'Interior detail', 'Woven texture, carried into the surfaces.'),
      p('/images/generated/interior-clay-bedroom.webp', 1536, 1024, 'Clay plaster bedroom study', 'Clay plaster, in the palette of undyed cloth.', false),
    ],
  },
  {
    slug: 'vidya-backyard-landscape',
    title: 'Mrs. Vidya Backyard Landscape',
    category: 'Landscape',
    location: 'Bengaluru, Karnataka',
    year: '2025',
    area: '120 m²',
    status: 'Completed',
    cover: p('/images/Vidya.png', 602, 605, 'Mrs. Vidya backyard landscape, Bengaluru'),
    summary: 'A small backyard turned into a usable room, planted to get through summer on stored rain.',
    brief:
      'An unused rear yard behind a city house — compacted, hot for most of the afternoon and looked at rather than used.',
    approach:
      'Work began below ground. Compacted soil was broken up and amended, and a percolation pit was put in to take roof runoff instead of sending it to the drain. A single well-placed tree and a light pergola brought the afternoon into shade, which made everything planted beneath it viable. Paving is brick-on-edge and gravel so water passes through. Planting is layered and almost entirely native, with a small kitchen bed by the door.',
    materials: ['Brick-on-edge paving', 'Gravel', 'Percolation pit', 'Native layered planting'],
    facts: [
      { label: 'Area', value: '120 m²' },
      { label: 'Water', value: 'Roof runoff to percolation' },
      { label: 'Paving', value: 'Fully permeable' },
      { label: 'Planting', value: 'Predominantly native' },
    ],
    gallery: [
      p('/images/Vidya.png', 602, 605, 'Vidya backyard landscape', 'Bengaluru, Karnataka.'),
      p('/images/landscape.webp', 598, 596, 'Planted backyard', 'Layered, almost entirely native planting.'),
      p('/images/generated/landscape-kitchen-garden.webp', 1537, 1023, 'Kitchen garden study', 'A small kitchen bed, by the door.', false),
    ],
  },
];

/* Additional design-study imagery per project, appended to each gallery so the
   horizontal track has real depth. Swap these out as site photography arrives. */
const EXTRA = {
  'kenneth-residence': [
    p('/images/generated/project-coimbatore-court.webp', 1402, 1122, 'Inward-turning court', 'The plan turns inward, away from the road.', false),
    p('/images/generated/craft-bamboo-screen.webp', 1536, 1024, 'Bamboo screen', 'A screen filtering light without opening a view in.', false),
  ],
  'logesh-residence-interiors': [
    p('/images/generated/project-adobe-retreat.webp', 1536, 1024, 'Textured wall surface', 'Woven texture carried into the run of a plastered wall.', false),
    p('/images/generated/project-kerala-extension.webp', 1536, 1024, 'Cane and rattan detail', 'Cane inserts, made locally to our drawings.', false),
  ],
  'vidya-backyard-landscape': [
    p('/images/generated/landscape-neem-courtyard.webp', 1536, 1024, 'Shaded courtyard planting', 'One well-placed tree brought the afternoon into shade.', false),
    p('/images/generated/landscape-rain-garden.webp', 1536, 1024, 'Permeable paving and rain garden', 'Brick-on-edge and gravel, so water passes through.', false),
  ],
};

for (const project of projects) {
  const more = EXTRA[project.slug];
  if (more) project.gallery = project.gallery.concat(more);
}

export const projectBySlug = (slug) => projects.find((x) => x.slug === slug);
