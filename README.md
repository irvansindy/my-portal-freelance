# Irvan Sindy — Cloudflare Pages Portfolio Hub

Static personal portfolio prepared for Cloudflare Pages.

## Routes
- `/` — personal landing page
- `/portfolio/restaurant-modern/`
- `/portfolio/restaurant-editorial/`
- `/portfolio/law-firm/`
- `/portfolio/company-profile/`
- `/portfolio/business-system/`

Each portfolio folder currently contains a placeholder. Replace its `index.html` with the actual client/concept landing page while keeping the folder name to preserve the URL.

## Cloudflare Pages setup
- Framework preset: None
- Build command: leave empty
- Build output directory: repository root
- Production branch: main

Update `CONTACT_CONFIG` in `assets/js/main.js` before publishing.

## File structure
- `index.html` — homepage markup and content
- `assets/css/style.css` — homepage styles
- `assets/js/main.js` — contact configuration, contact links, copyright year, and FAQ behavior
- `assets/css/portfolio.css` — shared styles for portfolio demo pages
- `assets/css/404.css` — styles for the not-found page
- `portfolio/*/index.html` — portfolio demo markup and content

Edit HTML for content, CSS for appearance, and JavaScript for behavior. No build step is required.
