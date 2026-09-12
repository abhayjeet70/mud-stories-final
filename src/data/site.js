/* All values below are taken verbatim from the source repository
   (mudstories/content/content.md and src/config/site.ts). Do not invent. */

export const site = {
  name: 'Mud Stories',
  tagline: 'Design Studio',
  strapline: 'Earth. Architecture. Stories.',
  description:
    'Architecture that nurtures people and the planet. A Bengaluru design studio crafting spaces with earth, lime, bamboo and stone — celebrating sustainability, traditional wisdom and community.',
  email: 'mudstories.crafted@gmail.com',
  phone: '+91 93537 39352',
  phoneAlt: '+91 89514 15131',
  address:
    'No. 74, First Floor, Shivganga Complex, 6th Cross Road, Domlur, Bengaluru 560071',
  hours: 'Monday – Saturday, 9:00 AM – 6:00 PM',
  whatsapp: '919353739352', // country code + number, no spaces or +
  instagram: 'https://www.instagram.com/mud_stories_architects/',
  linkedin: 'https://www.linkedin.com/company/104136538/',
};

export const enquiryTypes = [
  'A new house',
  'Interiors',
  'Landscape',
  'Natural building consultation',
  'A workshop',
  'Something else',
];

export const contactGroups = [
  { label: 'Project enquiries', email: site.email },
  { label: 'Workshops and learning', email: site.email },
  { label: 'Internships and careers', email: site.email },
  { label: 'Press and publications', email: site.email },
];

export const services = [
  {
    name: 'Architectural Design',
    body: 'We design functional, climate-responsive buildings tailored to your site, lifestyle, and vision.',
  },
  {
    name: 'Interior Design',
    body: 'We create thoughtful interiors that balance aesthetics, comfort, and practicality.',
  },
  {
    name: 'Landscape Design',
    body: 'We plan outdoor spaces that connect architecture with nature and enhance the overall experience.',
  },
  {
    name: 'Natural Building & Sustainable Construction',
    body: 'We design using eco-friendly materials and methods that are healthy, low-impact, and context-sensitive.',
  },
];
