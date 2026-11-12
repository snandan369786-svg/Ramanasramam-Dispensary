# Sri Ramanasramam Dispensary — Website

The website for Sri Ramanasramam Dispensary, Tiruvannamalai.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS v4 and Lucide icons. The site is fully static, so it can be hosted on Vercel, Netlify or any static host.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

Set `NEXT_PUBLIC_SITE_URL` (see `.env.example`) to the live domain before deploying so canonical links, the sitemap and Open Graph tags point to it.

## Editing content

**All text and data live in [`src/content/site.ts`](src/content/site.ts).** You never need to touch layout code to update the site.

| What | Where in `site.ts` |
| --- | --- |
| Doctor profiles | `doctors` |
| Visiting hours and the notice that timings may change | `visitingHours` |
| Address and Google Maps links | `address`, `mapsLinks` |
| Medical services | `services` |
| Hero and section photographs | `images` |
| Photo credits shown in the footer | `imageCredits` |

### Updating a doctor

Doctors are shown without photographs or biographies. In `src/content/site.ts`, fill in `designation`, `qualifications` and `specialisations`.

Any field left as `null` or `[]` shows a clearly labelled placeholder on the site.

### Health Atlas

The Health Atlas (`/health-atlas`) is an educational section about common health conditions. All of its content is in `src/content/health-atlas.ts`.

- **Add a condition:** copy an existing entry in `conditions`, give it a unique `slug` and fill in every field, including `references`. Its page at `/health-atlas/<slug>` and its card, search and category listing are created automatically.
- **Interactive diagrams:** diabetes, hypertension, obesity and asthma have "Inside the Body" diagrams in `src/components/atlas/diagrams/`. Other conditions show a numbered step-by-step explanation instead.
- **Body map:** the positions of the points on the hero figure are set in `src/components/atlas/BodyMap.tsx`.
- **Medical review:** the content is compiled from WHO, NHS, CDC, NIH and guideline sources and has **not** been reviewed by the dispensary's doctors. Once a qualified doctor has reviewed it, set `atlasMeta.review` to their name and the date; the site will then show it. Do not add a reviewer who has not actually reviewed the content.
- **Editorial rules:** keep it educational: no diagnosis, no named prescription medicines or doses, no promises of cure, and no statistics that are not taken from a listed source.

### Emblem

The header and footer show a full portrait of Bhagavan Sri Ramana Maharshi from `public/images/emblem-ramana-full.jpg`, shown uncropped. To change it, replace that file and update `PHOTO_RATIO` in `src/components/ui/Emblem.tsx`. The favicon is `src/app/icon.png` (with `apple-icon.png` for iOS home screens).

## Photography

The photographs of Sri Ramanasramam and Arunachala are authentic images from Wikimedia Commons, used under CC BY / CC BY-SA licences. Credits are shown in the footer under "Photography credits". If you replace them with the Ashram's own photographs, update `imageCredits` to match.

## Project structure

```
src/
  app/            layout (SEO metadata, JSON-LD), page, OG image, sitemap, robots, favicon
  content/        site.ts — all editable content
  components/
    layout/       Navbar, Footer
    sections/     Hero, About, Services, Doctors, FreeCare, Visit
    doctors/      DoctorCard
    visit/        MapEmbed (click-to-load Google Map), CopyAddressButton
    ui/           Button, SectionHeading, Reveal, Emblem, Ornaments, PlaceholderTag, ServiceGlyph
public/images/    photographs
```
