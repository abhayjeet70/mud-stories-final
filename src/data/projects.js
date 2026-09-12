/* Project records carried over from the source repository (src/config/projects.ts).
   Titles, locations, years, areas, briefs, approaches, materials and facts are the
   client's own copy and must not be rewritten.

   Image note: photographs marked `own: true` are Mud Stories' own project
   photography. Items marked `own: false` come from the previous site's
   illustrative render library and are flagged for replacement with real site
   photography when the client supplies it. */

const p = (src, w, h, alt, caption, own = true) => ({ src, w, h, alt, caption, own });

export const projects = [
  {
    slug: 'thendral-ecr-farmhouse',
    title: 'Thendral',
    category: 'Residential',
    location: 'East Coast Road, Chennai',
    year: '2024',
    area: '340 m²',
    status: 'Completed',
    cover: p('/images/Thendral-restored.webp', 1254, 1254, 'Thendral farmhouse on the East Coast Road, Chennai'),
    summary:
      'A coastal farmhouse planned around a shaded central court and a sea breeze that arrives every afternoon.',
    brief:
      'A family who had spent years in apartments wanted a weekend house on a long, narrow coastal plot — somewhere their children could be outdoors most of the day and where the extended family could gather without the house feeling cavernous when only two people were in it.',
    approach:
      'The plan folds around a central court that stays in shade for most of the day. Living spaces open onto it on three sides so the house can be used in parts: two rooms and the verandah on an ordinary weekend, the whole thing when twenty people arrive. Openings on the seaward side are sized and placed to pull the afternoon breeze straight through the court and out the back, which does the work of cooling without any mechanical help. Salt-laden coastal air ruled out exposed metal, so joinery, fixings and finishes were all chosen for that exposure.',
    materials: ['Rubble stone plinth', 'Adobe and cob walls', 'Lime plaster', 'Country tile roof on timber', 'Oxide flooring'],
    facts: [
      { label: 'Plot', value: '0.6 acre' },
      { label: 'Built area', value: '340 m²' },
      { label: 'Roof', value: 'Country tile on seasoned timber' },
      { label: 'Walls', value: 'Adobe, 450mm' },
    ],
    gallery: [
      p('/images/Thendral-restored.webp', 1254, 1254, 'Thendral farmhouse exterior', 'Thendral, East Coast Road.'),
      p('/images/generated/project-coastal-courtyard.webp', 1536, 1024, 'Coastal courtyard study', 'Courtyard study — the shaded centre of the plan.', false),
      p('/images/generated/interior-courtyard-veranda.webp', 1536, 1024, 'Verandah onto the court', 'Verandah opening onto the court on three sides.', false),
    ],
  },
  {
    slug: 'varanasi-residence',
    title: 'Varanasi Residence',
    category: 'Residential',
    location: 'Varanasi, Uttar Pradesh',
    year: '2023',
    area: '180 m²',
    status: 'Completed',
    cover: p('/images/varanasi.png', 601, 600, 'Varanasi Residence, Uttar Pradesh'),
    summary:
      'A compact city house working with a tight plot, a hot dry summer and a strong local building tradition.',
    brief:
      'A narrow urban plot in a dense part of the city, with buildings hard against two sides and a single open face. The client wanted a house that belonged to Varanasi rather than one that could have been dropped into any Indian city.',
    approach:
      'With only one open face, light had to come from above. A small top-lit shaft runs through the centre of the plan, drawing hot air up and out while spilling daylight into rooms that would otherwise be sealed. Thick masonry on the exposed western wall delays the afternoon heat by several hours, so the peak arrives after the family has already moved to the terrace. Detailing borrows directly from the older houses nearby — deep reveals, a shaded threshold, and a terrace built to be lived on.',
    materials: ['Load-bearing brick', 'Lime mortar and plaster', 'Stone flooring', 'Timber joinery'],
    facts: [
      { label: 'Plot', value: 'Narrow urban infill' },
      { label: 'Built area', value: '180 m²' },
      { label: 'Strategy', value: 'Central light and ventilation shaft' },
      { label: 'Levels', value: 'Two plus terrace' },
    ],
    gallery: [
      p('/images/varanasi.png', 601, 600, 'Varanasi Residence', 'Varanasi Residence, Uttar Pradesh.'),
      p('/images/generated/project-courtyard-threshold.webp', 1536, 1024, 'Shaded threshold study', 'Threshold study — a deep, shaded entry.', false),
      p('/images/generated/interior-earth-stair.webp', 960, 1440, 'Earth stair study', 'The stair rising to the terrace.', false),
    ],
  },
  {
    slug: 'sthairya-farmhouse',
    title: 'Sthairya Farmhouse',
    category: 'Residential',
    location: 'Bangarpet, Karnataka',
    year: '2024',
    area: '420 m²',
    status: 'Completed',
    cover: p('/images/sthairya.png', 600, 600, 'Sthairya Farmhouse, Bangarpet'),
    summary:
      'The studio’s largest natural build to date — rammed earth walls, a filler-slab roof and water planned before anything else.',
    brief:
      'A working farm with a long-term plan to become the family’s primary home. The requirement was a building that could be extended in stages without looking unfinished at any point, and one that could survive a dry season on stored water.',
    approach:
      'The house sits along the contour rather than cutting across it, so the site’s own drainage was left largely intact. Rammed earth was viable here because the subsoil tested well — most of the wall material came out of the excavation for the water tank. Walls are 450mm, giving a thermal delay long enough that the interior peaks well after sunset. The roof is a filler slab that cuts concrete volume substantially while spanning the wider living spaces. Rainwater from the full roof area feeds a masonry tank sized to carry the household through the dry months.',
    materials: ['Rammed earth, 450mm', 'Rubble stone plinth', 'Filler-slab roof', 'Lime plaster', 'Local granite'],
    facts: [
      { label: 'Plot', value: 'Working farm' },
      { label: 'Built area', value: '420 m²' },
      { label: 'Wall material', value: 'Excavated on site' },
      { label: 'Water', value: 'Full-roof rainwater harvesting' },
    ],
    gallery: [
      p('/images/sthairya.png', 600, 600, 'Sthairya Farmhouse', 'Sthairya, Bangarpet.'),
      p('/images/generated/project-rainwater-roof.webp', 1536, 1024, 'Rainwater roof study', 'The full roof area feeds a masonry tank.', false),
      p('/images/generated/material-rammed-earth.webp', 1536, 1024, 'Rammed earth wall detail', 'Rammed earth, 450mm — the strata of each lift.', false),
    ],
  },
  {
    slug: 'mysore-residence',
    title: 'Mysore Residence',
    category: 'Residential',
    location: 'Mysuru, Karnataka',
    year: '2025',
    area: '210 m²',
    status: 'Completed',
    cover: p('/images/Mysore.png', 605, 605, 'Mysore Residence, Mysuru'),
    summary: 'A family home for three generations, planned so each has somewhere to be alone.',
    brief:
      'Grandparents, a couple and two children under one roof. The brief was less about square footage than about acoustic and visual separation — a house where a phone call, a nap and homework can happen at the same time without anyone moving outdoors.',
    approach:
      'Bedrooms are distributed across two levels with the shared spaces between them, and the grandparents’ room sits at ground level with its own access to the garden. Wall thickness and a break in the floor structure keep sound from carrying between levels. A verandah on the east gives the household a place to sit before the day gets hot.',
    materials: ['Compressed stabilised earth blocks', 'Lime plaster', 'Oxide flooring', 'Reclaimed timber joinery'],
    facts: [
      { label: 'Occupants', value: 'Three generations' },
      { label: 'Built area', value: '210 m²' },
      { label: 'Walls', value: 'Stabilised earth block' },
      { label: 'Levels', value: 'Two' },
    ],
    gallery: [
      p('/images/Mysore.png', 605, 605, 'Mysore Residence', 'Mysore Residence, Mysuru.'),
      p('/images/generated/interior-timber-family-space.webp', 960, 1440, 'Shared family space study', 'The shared space, held between the two bedroom levels.', false),
      p('/images/generated/interior-lime-living-room.webp', 1536, 1024, 'Lime plastered living room study', 'Lime plaster, left to read as a surface.', false),
    ],
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
  'thendral-ecr-farmhouse': [
    p('/images/generated/project-long-veranda.webp', 1774, 887, 'Long verandah', 'The verandah, sized for twenty people or two.', false),
    p('/images/generated/craft-rubble-plinth.webp', 1536, 1024, 'Rubble stone plinth', 'Rubble plinth — the first defence against coastal damp.', false),
    p('/images/generated/interior-lime-bathroom.webp', 1402, 1122, 'Lime finished bathroom', 'Lime, which tolerates salt air better than paint.', false),
  ],
  'varanasi-residence': [
    p('/images/generated/project-urban-bengaluru.webp', 960, 1440, 'Narrow urban elevation', 'A single open face on a tight urban plot.', false),
    p('/images/generated/craft-timber-rafters.webp', 1536, 1024, 'Timber rafters', 'Timber joinery, detailed from the older houses nearby.', false),
  ],
  'sthairya-farmhouse': [
    p('/images/generated/project-western-ghats.webp', 1536, 1024, 'House along the contour', 'The house sits along the contour, not across it.', false),
    p('/images/generated/landscape-dry-native-garden.webp', 1536, 1024, 'Dry native planting', 'Planting chosen to survive the dry months.', false),
    p('/images/generated/craft-rammed-earth.webp', 1536, 1024, 'Ramming earth into formwork', 'Earth compacted in shallow lifts between forms.', false),
  ],
  'mysore-residence': [
    p('/images/generated/project-tamarind-house.webp', 1536, 1024, 'East verandah', 'The east verandah, used before the day gets hot.', false),
    p('/images/generated/interior-kota-kitchen.webp', 1536, 1024, 'Kitchen', 'Shared spaces sit between the two bedroom levels.', false),
  ],
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
