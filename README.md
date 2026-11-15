# jibutomjose.com

Personal academic website of Jibu Tom Jose, served by GitHub Pages at https://jibutomjose.com.

Plain HTML and CSS, no build step. Each page lives in its own folder as `index.html`:

| Page | File |
|---|---|
| About (home) | `index.html` |
| Research (tiles) | `research/index.html` |
| Research topics | `research/<topic>/index.html` |
| Facilities | `facilities/index.html` |
| Software | `software/index.html` |
| Publications | `publications/index.html` |
| Teaching | `teaching/index.html` |

- Styles: `assets/css/site.css`
- Images: `assets/img/` (WebP, max ~1600 px wide)
- CV: `assets/cv/JibuTomJose_CV.pdf`
- Custom domain: `CNAME`

The header and footer are repeated in every page, so a change there needs to be made in each `index.html`.

Figures from published papers are credited in their captions.

## Changing images

- Research tiles: `assets/img/tiles/<topic>.webp`, 3:2 ratio (for example 1200 x 800 px).
- Home page cards: `assets/img/doors/<name>.webp`, 2:1 ratio (for example 960 x 480 px).
- Moving ribbon on the home page: `assets/img/rib-*.webp`, any width, 300 px tall.

Replace a file with a new image of the same name and ratio, and the site picks it up. WebP keeps pages fast; any image converter (for example squoosh.app) can export it.
