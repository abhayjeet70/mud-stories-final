# Mud Stories

Website for **Mud Stories** — a Bengaluru design studio working in earth, lime, bamboo and stone.

_Earth. Architecture. Stories._

Plain React (Vite + React Router). No CSS framework, no UI library, three runtime dependencies.

## Run

```bash
npm install
npm run dev      # development server
npm run build    # production build to dist/
npm run preview  # serve the production build
```

## Checks

```bash
npm run smoke         # renders all routes, asserts contact details + images on disk
npm run qa            # 1440/390px: overflow, header collisions, gutters, gallery track
npm run interactions  # dropdown, mobile menu, lightbox, keyboard, focus restore
```

`qa` and `interactions` need a `npm run preview` server on port 4321.

## Structure

```
src/
  data/        projects, studio narrative, site + contact details
  components/  Header, Lightbox, bits (Footer, Seo, Reveal, Picture)
  pages/       Home, Work, Project, Studio, Notes, Contact, NotFound
  styles.css   the whole design system
public/images/ project photography and imagery
```

## Content

All copy, project records and contact details come from the studio's own
material. Nothing about the practice — projects, awards, statistics, contacts —
is invented.

## Known content TODO

- **Project photography is low resolution.** Six of the seven project covers are
  ~600×600 and soften when used full-viewport. Originals from the client should
  replace them at the same paths, with `w`/`h` updated in `src/data/projects.js`.
- **Supporting gallery imagery** under `public/images/generated/` are design
  studies carried over from the previous site, not photographs of built work.
  Replace with site photography as it becomes available.

---

Design and Developed By [WebNxt](https://webnxt.co)
