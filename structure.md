# Website Structure Specification — Wallmakers-Inspired Architecture Portfolio

## 1. Purpose

Build an architecture portfolio that follows the same information architecture, page rhythm, and gallery behavior as [Wallmakers](https://www.wallmakers.org/), while using this project's own brand, copy, project data, and media.

This document is the source of truth for layout, routes, reusable components, responsive behavior, and interactions. The finished website must feel quiet, image-led, editorial, and architectural. Do not add generic SaaS sections, decorative cards, gradients, oversized marketing copy, testimonials, counters, or unrelated effects.

## 2. Core Experience

The website has two presentation modes:

1. **Immersive portfolio mode:** the homepage is a full-viewport slideshow of featured projects.
2. **Editorial mode:** About, Newsmakers/Awards, Contact, and project-detail pages use a white canvas, precise typography, and generous empty space.

The imagery is the primary visual language. Interface elements stay restrained and functional.

## 3. Route Map

| Route | Page | Purpose |
| --- | --- | --- |
| `/` | Project index / homepage | Full-screen slideshow of all featured projects |
| `/about` | About | Studio introduction, philosophy, founder/team image or video |
| `/projects/[slug]` | Project case study | Horizontal media gallery with captions and fullscreen viewer |
| `/newsmakers` | News / awards | Chronological milestone list |
| `/contact` | Contact | Contact categories and direct email links |
| `/404` | Not found | Minimal recovery page using the same header |

If an existing project already uses top-level project slugs, retain them instead of forcing `/projects/[slug]`. Use one consistent routing convention across all projects.

## 4. Global Page Shell

### 4.1 Header

The same header appears on every route.

- Desktop outer spacing: `50px` from the top, left, and right.
- Brand wordmark sits at the far left.
- Primary navigation sits at the far right.
- Header content aligns to the top rather than vertically centering in a tall bar.
- No boxed navbar, shadow, blur panel, or visible border.
- Inner-page header occupies approximately `138px` including the space reserved below it.
- Header must remain visually above galleries, slides, menus, and lightboxes.

Brand wordmark:

- Uppercase text or supplied logo.
- Approximate desktop type: `47px`, medium weight, `18px` letter spacing, `47px` line height.
- Clicking it always returns to `/`.
- On the homepage its color changes between black and white according to the active image's contrast theme.
- On white inner pages it remains near-black.

Desktop navigation:

- Items: `About`, `+ Projects`, `Newsmakers`, `Contact`.
- Approximate type: `15px`, regular weight, `1px` letter spacing.
- Horizontal gap: about `24px`.
- Active route receives a thin underline.
- Do not use pill buttons.

### 4.2 Projects Dropdown

`+ Projects` is a folder-style navigation item, not a separate marketing page.

Desktop behavior:

- Open on pointer hover and keyboard focus.
- Position directly below the Projects link.
- Use a white, rectangular panel with no rounded corners or shadow-heavy styling.
- Width: approximately `205px`.
- Maximum height: viewport height minus the header and bottom margin.
- Enable vertical scrolling when the project list exceeds the viewport.
- Each row contains the project name and optional location.
- Text wraps naturally across two or three lines.
- Use compact rows, approximately `12–13px` with `1px` tracking.
- Preserve the open panel while the pointer travels from the trigger into the list.

Keyboard behavior:

- `Enter` or `Space` toggles the menu.
- Arrow keys move through project links.
- `Escape` closes it and returns focus to the trigger.
- Use `aria-haspopup`, `aria-expanded`, and an accessible menu label.

### 4.3 Mobile Header and Menu

At widths below `768px`:

- Reduce outer page spacing to `20–24px`.
- Scale the wordmark so it fits without wrapping.
- Replace the desktop links with one menu control.
- The menu opens a full-width or full-screen white navigation panel.
- Projects becomes a tap-to-expand accordion containing all project links.
- The active item remains identifiable.
- Lock body scrolling while the menu is open.
- Keep every touch target at least `44px` tall.

### 4.4 Footer

The homepage does not need a visible footer because it is a viewport-bound slideshow.

Editorial pages use a minimal footer aligned with the content column. Include:

- A thin top divider when the page needs visual closure.
- The required credit: `Design and Developed By WebNxt`.
- Link the credit to `https://webnxt.co`.
- Keep the footer small, quiet, and monochrome.

## 5. Homepage — Full-Screen Project Index

### 5.1 Layout

- Fill the complete visible viewport: `min-height: 100svh`.
- The slideshow is positioned behind the header and fills the viewport edge to edge.
- Each slide uses one project cover image with `object-fit: cover`.
- Apply a per-project focal point so important architecture is not cropped.
- Do not place a dark overlay over every image. Use the image itself and per-slide contrast metadata to determine whether controls are black or white.

### 5.2 Slide Content

Each slide contains:

1. Full-bleed project cover image.
2. Click-through target to the project detail route.
3. Bottom-left project label.
4. Previous and next controls.

Project label:

- Position: `50px` from the left and `50px` from the bottom on desktop.
- Format: `PROJECTS / PROJECT NAME, LOCATION`.
- Approximate type: `15px`, `4px` letter spacing, uppercase where appropriate.
- Use an inline rectangular background with `12px 20px` padding.
- Theme can invert per slide: black background/white text or white background/black text.
- The whole label is a link.
- Never place descriptions, category chips, statistics, or CTAs over the hero.

### 5.3 Slideshow Controls

- Autoplay through projects in the content-defined order.
- Use a calm crossfade of approximately `600–900ms`.
- Suggested autoplay interval: `5–7 seconds`.
- Previous control is vertically centered near the left edge.
- Next control is vertically centered near the right edge.
- Controls can stay subtle until pointer movement or hover, but must remain keyboard accessible.
- Clicking the image or label opens the active project.
- Support left/right arrow keys.
- Pause autoplay when the tab is hidden, the user interacts with the controls, or `prefers-reduced-motion` is enabled.
- On touch devices, support horizontal swipe.

### 5.4 Loading

- Load the first slide eagerly.
- Preload the next image only; lazy-load the rest.
- Show a neutral background derived from the image color while it loads.
- Do not show layout-shifting spinners over the architecture.

## 6. Project Detail Page

This page is a horizontal media case study, not a conventional long vertical article.

### 6.1 Viewport Composition

- White or near-white page background.
- Reuse the global header.
- Keep the page at approximately one desktop viewport high.
- Begin the gallery around `218px` from the top at a `1366 × 936` viewport.
- Main gallery image height: approximately `500px` at that viewport.
- The track extends horizontally beyond the viewport.
- Leave caption space beneath each image.
- Hide the native horizontal scrollbar; navigation must remain available through controls, keyboard, wheel/trackpad, and touch.

### 6.2 Horizontal Gallery Track

Each media item contains:

1. Image or optional video.
2. `+` enlarge control.
3. Short caption directly beneath the media.

Desktop sizing:

- Maintain each image's intrinsic aspect ratio at a shared gallery height.
- Do not force every image into identical cards.
- Gallery height: around `500px`.
- First item starts around `50px` from the left edge.
- Gap between items: about `15px`.
- A landscape image will usually occupy `700–780px`; portrait images remain narrower.
- Captions align to the image's left edge.
- Caption type follows the body style: about `14px`, `22px` line height, subtle tracking.
- Allow up to roughly `218px` below the image for a longer caption, but keep normal captions concise.

The initial desktop view should reveal roughly one-and-a-half to two images. This is important: the partial next image signals horizontal navigation.

### 6.3 Gallery Navigation

- Previous and next controls sit at the viewport edges, vertically centered.
- Use compact black square controls with simple light arrow icons.
- Do not use large circular buttons.
- Advance by one media item while keeping the next item partially visible when possible.
- Disable or hide the previous control at the first item and next control at the final item.
- Support arrow keys, swipe, and trackpad gestures.
- Translate the track smoothly; do not snap the entire page vertically.

### 6.4 Fullscreen Image Viewer

The `+` control opens the selected media in a lightbox.

- White full-viewport overlay above the entire site.
- Keep approximately `50px` breathing room around the contained image on desktop.
- Center the image and preserve its complete aspect ratio with `object-fit: contain`.
- Place a black square close control over the top-right corner of the image area.
- Use matching black square previous/next controls centered on the image edges.
- `Escape` closes the viewer.
- Left/right arrow keys navigate.
- Trap focus inside the viewer and restore focus to the triggering `+` button when closed.
- Prevent background scrolling.
- Announce the active image position to screen readers, for example `Image 3 of 12`.

### 6.5 Mobile Project Page

Below `768px`, change the horizontal strip to a readable vertical sequence unless the product explicitly requires mobile horizontal swiping.

Recommended behavior:

- Stack each image and caption vertically.
- Images use full available width and natural height.
- Keep `+` in the image's top-right corner.
- Use `20–24px` side padding and `32–48px` between media items.
- Retain the same fullscreen viewer.
- If horizontal swipe is retained, show one image at a time and keep a visible progress indicator.

## 7. About Page

### 7.1 Desktop Structure

- White background and global header.
- Content container width: approximately `720px`.
- Center the container horizontally.
- Page starts directly after the header's reserved space.
- Heading spans the full content width.
- Heading style: about `30–32px`, bold, `1.2` line height.
- Add roughly `30–35px` below the heading before the content grid.

Two-column content block:

- Left column: studio/founder narrative, approximately `280px` wide.
- Right column: supporting landscape image or embedded talk/video, approximately `405px` wide.
- Column gap: approximately `34px`.
- Optional media caption sits immediately below the media in the small body style.
- Continue longer philosophy text below the left column rather than stretching both columns equally.

Do not add a giant hero, team-card grid, client-logo wall, or statistics unless the project's actual content requires them.

### 7.2 Mobile Structure

- Stack heading, narrative, media, media caption, and remaining narrative.
- Preserve the intended reading order in the DOM.
- Use `20–24px` side padding.
- Allow the media to use the full content width.

## 8. Newsmakers / Awards Page

- Use the same centered content width as About: approximately `720px`.
- Present one chronological list; do not convert it into cards or a decorative timeline.
- Each item includes a year in bold followed by a short milestone.
- Use a small circular bullet at the left.
- Use comfortable vertical spacing between entries, approximately `22–28px`.
- Body type: about `14px` with `1.6` line height.
- Keep links underlined and monochrome.
- Default sort is oldest to newest if matching the reference exactly; make order a content setting if the client later prefers newest first.

## 9. Contact Page

- Use the same centered `720px` content column.
- Begin with a thin horizontal divider.
- Organize contacts into simple text groups, for example:
  - Internship and job opportunities
  - Project enquiries
  - Press requests
  - Principal architect / studio director
- Group heading is uppercase and bold.
- Each group displays a label followed by a clickable `mailto:` address.
- Use large vertical intervals between groups instead of cards.
- End with another thin divider before the footer.
- Do not add a contact form unless explicitly requested.

## 10. 404 Page

- Reuse the standard white header.
- Center a short `Page not found` message inside the editorial content width.
- Provide one text link back to Projects/Home.
- Avoid illustrations or unrelated decorative effects.

## 11. Shared Component Tree

```text
AppShell
├── SiteHeader
│   ├── BrandLink
│   ├── DesktopNavigation
│   │   └── ProjectsDropdown
│   └── MobileNavigation
│       └── ProjectsAccordion
├── RouteTransition
│   └── PageContent
└── MinimalFooter

HomePage
└── ProjectHeroSlideshow
    ├── HeroSlide
    ├── ProjectLabel
    └── SlideshowControls

ProjectPage
├── HorizontalProjectGallery
│   ├── GalleryMediaItem
│   ├── MediaCaption
│   └── GalleryControls
└── MediaLightbox

AboutPage
└── EditorialTwoColumn

NewsmakersPage
└── MilestoneList

ContactPage
└── ContactGroups
```

## 12. Content Model

All project content must come from structured data. Do not hardcode separate page markup for every project.

```ts
type Project = {
  id: string;
  slug: string;
  title: string;
  location?: string;
  coverImage: MediaAsset;
  gallery: ProjectMedia[];
  featured: boolean;
  order: number;
  contrast: 'light-ui' | 'dark-ui';
  seo: {
    title: string;
    description: string;
  };
};

type MediaAsset = {
  src: string;
  alt: string;
  width: number;
  height: number;
  focalPoint?: { x: number; y: number };
};

type ProjectMedia = MediaAsset & {
  id: string;
  caption?: string;
  type: 'image' | 'video';
};

type Milestone = {
  year: number;
  text: string;
  link?: string;
};

type ContactGroup = {
  label: string;
  email: string;
};
```

Required validation:

- Every project has a unique `slug` and `order`.
- Every image has meaningful alternative text; decorative images use an empty alt.
- Every gallery item stores its natural dimensions to prevent layout shift.
- Every email is rendered as a valid `mailto:` link.

## 13. Visual System

### 13.1 Colors

- Inner-page background: `#ffffff` or a very subtle off-white close to `#fbfbfb`.
- Primary text: approximately `#222222`.
- Secondary body text: approximately `#333333`.
- Control black: approximately `#111111`.
- Light control text: `#ffffff`.
- Dividers: very light neutral gray.
- No accent color is required; architecture photography provides the color.

### 13.2 Typography

Use the project's licensed typefaces. If the reference fonts are unavailable, choose one geometric sans for display text and one clean sans for body text.

Suggested hierarchy:

| Element | Desktop size | Weight | Tracking |
| --- | ---: | ---: | ---: |
| Wordmark | `47px` | 500 | `18px` |
| Navigation | `15px` | 400 | `1px` |
| Page heading | `30–32px` | 700 | normal |
| Body/caption | `14px` | 400 | `0.5px` |
| Hero project label | `15px` | 400 | `4px` |
| Dropdown project link | `12–13px` | 400 | `1px` |

### 13.3 Shape and Decoration

- Corners remain square.
- Avoid drop shadows except a barely perceptible separation where essential.
- Avoid gradients, glassmorphism, textures, blobs, decorative lines, and floating badges.
- Dividers are `1px`.
- Controls use simple arrow, plus, menu, and close icons from one consistent icon library.

## 14. Motion Rules

Motion must support orientation, not become the visual subject.

- Route transition: short opacity fade, approximately `250–400ms`.
- Homepage slide: crossfade, approximately `600–900ms`.
- Horizontal gallery: smooth transform, approximately `450–650ms`, with restrained easing.
- Dropdown: immediate or a short `120–180ms` opacity transition.
- Lightbox: short fade plus minimal scale, no dramatic zoom.
- No parallax, text-splitting animation, continuous marquee, cursor follower, loading intro, or scroll-jacking.
- Respect `prefers-reduced-motion` by removing autoplay and nonessential transforms.

## 15. Responsive Breakpoints

| Range | Behavior |
| --- | --- |
| `>= 1200px` | Full desktop header; 50px page margins; two or more gallery images can be visible |
| `768–1199px` | Reduced margins; desktop navigation may remain if it fits; horizontal gallery shows one full item plus part of the next |
| `< 768px` | Mobile menu; 20–24px margins; wordmark reduced; About stacks; project media stacks or becomes one-at-a-time swipe |

Test at minimum:

- `1440 × 900`
- `1366 × 768`
- `1024 × 768`
- `768 × 1024`
- `390 × 844`
- `360 × 800`

## 16. Accessibility and Input Support

- Use semantic `header`, `nav`, `main`, `section`, `figure`, `figcaption`, and `footer` elements.
- Provide a skip-to-content link.
- Keep visible keyboard focus states even though the visual design is minimal.
- Navigation, slideshow, horizontal gallery, dropdown, accordion, and lightbox must all work with keyboard controls.
- Ensure text/control contrast remains readable over every homepage image. The per-slide contrast setting is mandatory.
- Do not place captions only in image alt text; visible captions and alt text serve different purposes.
- Announce slideshow changes politely only when user initiated; do not continuously announce autoplay.
- Maintain usable reflow at `200%` zoom.

## 17. SEO and Technical Requirements

- Give every route a unique title and meta description.
- Add canonical URLs.
- Add Open Graph image metadata for each project.
- Generate `sitemap.xml` and `robots.txt`.
- Use `ArchitecturalBusiness` or appropriate `Organization` structured data.
- Add `CreativeWork` or `VisualArtwork`-appropriate structured data to project pages where valid.
- Preserve clean, human-readable project slugs.
- Optimize images to AVIF/WebP with responsive `srcset` and sizes.
- Keep the first homepage image within the initial render path; lazy-load nonactive media.
- Target no visible layout shift when images load.
- Scroll or gallery state should reset correctly after route changes.

## 18. Implementation Sequence

1. Create the shared project, milestone, and contact data models.
2. Build the global header, desktop dropdown, mobile menu, and footer.
3. Build the full-screen homepage slideshow with per-slide contrast.
4. Build one reusable project page template and horizontal gallery.
5. Add the fullscreen media viewer.
6. Build About, Newsmakers, Contact, and 404 pages.
7. Add responsive states and input support.
8. Add route metadata, sitemap, structured data, and image optimization.
9. Test every route, dropdown, gallery control, lightbox action, email link, and keyboard path.

## 19. Acceptance Checklist

The website is complete only when all of the following are true:

- [ ] Homepage fills the viewport with one project cover image and no vertical page scroll.
- [ ] Header overlays the homepage and switches contrast correctly for every slide.
- [ ] Project label appears at the bottom-left and opens the correct project.
- [ ] Homepage autoplay, arrows, keyboard navigation, and touch swipe work.
- [ ] Projects dropdown contains every project and scrolls within the viewport.
- [ ] Project pages use a horizontal, aspect-ratio-preserving media track on desktop.
- [ ] At least part of the next project image is visible on desktop.
- [ ] Captions remain attached to the correct image.
- [ ] Every `+` control opens the correct image in the fullscreen viewer.
- [ ] Lightbox close, next, previous, keyboard, focus trap, and focus restoration work.
- [ ] About reproduces the narrow editorial heading plus two-column composition.
- [ ] Newsmakers is a quiet chronological list, not a card grid.
- [ ] Contact uses separated text groups, direct email links, and dividers.
- [ ] Mobile navigation and Projects accordion work without overflow.
- [ ] Mobile project content remains readable without trapping horizontal scroll.
- [ ] Reduced-motion users do not receive autoplay or unnecessary movement.
- [ ] Logo and footer credit links work.
- [ ] All route transitions reset position/state correctly.
- [ ] No placeholder copy, broken media, source-brand content, or source-platform credit remains.

## 20. Non-Negotiable Design Direction

Match the reference's **structure and interaction model**, not its copyrighted content.

- Use the project's real logo, project names, descriptions, awards, contacts, and media.
- Do not download or reuse Wallmakers images, writing, or branding.
- Do not add new sections merely to make the site feel more conventional.
- Keep the result minimal, photography-first, quiet, and precise.
- If a proposed effect competes with the architecture, remove it.
