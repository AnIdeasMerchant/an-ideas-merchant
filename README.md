# An Ideas Merchant — Website

Static, dependency-free website. Three pages, plain HTML/CSS/JS. No build step.

## Pages
- `index.html` — home (hero sequence, problem, process/Target Practice, case-study teaser, about, contact)
- `story/index.html` — long-form founder story (served at `/story/`)
- `case-study/index.html` — GoSweetSpot / GoTrack case study (served at `/case-study/`)

## Run locally
Any static file server works, e.g.:
```
npx serve .
# or
python3 -m http.server
```
Then open the printed URL. (Opening `index.html` directly via `file://` also works, but a server is recommended so relative paths and the Selected Frames script behave exactly as in production.)

## Deploy
Drop the whole folder on any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages, S3+CloudFront). No server-side code, no environment variables.

## Structure
```
index.html, story/index.html, case-study/index.html
styles.css                 → @imports tokens/*.css
tokens/                    design tokens (colors, type, spacing, effects, base, fonts)
assets/logos/              brand marks (AIM, GoSweetSpot, GoTrack, motifs)
assets/glyphs/             hand-drawn diagram masks (themeable via CSS mask)
uploads/                   photography + product imagery
```

## Notes for the developer
- **Theme**: light/dark toggle in the nav; preference persists in `localStorage`. Dark is default.
- **Fonts**: Cormorant Garamond + Inter, loaded from Google Fonts in `tokens/fonts.css`. Self-host if you need offline/GDPR-clean delivery.
- **Selected Frames (home, About section)**: the 3 frames are chosen at random on each load from a curated pool. See the `POOL` array in the inline `<script>` at the bottom of `index.html`. **To source from Instagram later**, replace `POOL` with the latest post image URLs (or fetch them) — the shuffle-and-pick-3 logic below it stays identical.
- **Images**: source photography is full-resolution. For production, run the `uploads/` images through an optimizer (or serve responsive `srcset`) to cut page weight.
- **Diagram glyphs** in `assets/glyphs/` are black-on-transparent PNGs tinted by CSS, so they recolor automatically between light/dark themes.

© 2026 An Ideas Merchant
