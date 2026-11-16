# jibutomjose.com

Personal research website of Jibu Tom Jose, served by GitHub Pages at https://jibutomjose.com.

Plain HTML, one stylesheet and one script. No build step.

| Page | File |
|---|---|
| Home | `index.html` |
| About | `about.html` |
| Research list | `research.html` |
| One page per study | `papers/<study>.html` |
| Methods and facilities | `methods.html` |
| Publications | `publications.html` |
| Teaching, Software, Contact | `teaching.html`, `software.html`, `contact.html` |

- Styles: `assets/style.css` (colours are the variables at the top; page-specific rules are at the bottom)
- Script: `assets/site.js` (phone menu, home slideshow, card scroller, research filters)
- CV: `assets/JibuTomJose_CV.pdf` (web copy, phone number removed)
- Custom domain: `CNAME`

The header and footer are repeated in every page, so a change there (for example a new menu item) has to be made in each `.html` file.

## Changing images

- Home slideshow: `assets/images/slides/*.jpg`, about 1.45:1. The left third sits under the burgundy shading.
- Cards on the home page and thumbnails on the research list: `assets/images/thumbs/*.jpg`, 1.6:1 (640 x 400 px).
- Research themes on the home page: `assets/images/thumbs/theme-*.jpg`, about 1.9:1.
- Figures on study pages and on the Methods page: `assets/images/*.jpg`.

Replace a file with a new image of the same name and roughly the same shape, and the site picks it up.

## Figure sources

All figures are cropped from Jibu Tom Jose's own papers, without recolouring; each caption names its source. Copyright remains with the authors and publishers.

- AIAA Journal (2026), dynamic stall
- International Journal of Multiphase Flow (2026), rising spheres and the tomographic PTV setup
- Journal of Fluid Mechanics (2024), shock waves and the shock tube
- Journal of Fluid Mechanics (2025), interface shapes and the scanning system
- Measurement Science and Technology (2026), LE-DM
- Physical Review Fluids (2026), pipe expansions and coherent structures
- arXiv preprints (2026), single-camera 3D PIV and protrusions, and the water tunnel
