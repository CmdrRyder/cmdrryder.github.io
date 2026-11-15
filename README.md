# jibutomjose.com

Personal academic website of Jibu Tom Jose, served by GitHub Pages at https://jibutomjose.com.

Plain HTML and CSS, no build step. Each page lives in its own folder as `index.html`:

| Page | File |
|---|---|
| Home | `index.html` |
| About | `about/index.html` |
| Research (project list) | `research/index.html` |
| Research topics | `research/<topic>/index.html` |
| Facilities | `facilities/index.html` |
| Software | `software/index.html` |
| Publications | `publications/index.html` |
| Teaching | `teaching/index.html` |
| Contact | `contact/index.html` |

- Styles: `assets/css/site.css` (burgundy and gold colours are the variables at the top)
- Scripts: `assets/js/site.js` (phone menu, home carousel, card scroller, research filters)
- Images: `assets/img/` (WebP, max ~1600 px wide)
- CV: `assets/cv/JibuTomJose_CV.pdf`
- Custom domain: `CNAME`

The header and footer are repeated in every page, so a change there needs to be made in each `index.html`.

Figures from published papers are credited in their captions.

## Changing images

- Project cards (home scroller and research list): `assets/img/tiles/<topic>.webp`, 3:2 ratio (for example 1200 x 800 px).
- Home carousel: full figures `assets/img/fig-*.webp` and `assets/img/fac-*.webp`. They are shown uncropped in a white box, so any aspect ratio works.
- Research themes on the home page: `assets/img/themes/<theme>.webp`, 16:9.
- Research page banner: `assets/img/hero-research.webp`, about 2.3:1.
- Portrait on the About page: `assets/img/about/portrait.webp` (shown automatically once the file exists).

Replace a file with a new image of the same name and ratio, and the site picks it up. WebP keeps pages fast; any image converter (for example squoosh.app) can export it.
