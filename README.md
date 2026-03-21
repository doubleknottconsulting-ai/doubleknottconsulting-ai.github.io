# DoubleKnott Consulting Services

Static multi-page marketing site for DoubleKnott Consulting Services, focused on manufacturing digital transformation.

The site is built with plain HTML, CSS, and a small amount of vanilla JavaScript. There are no frameworks, no build tools, and no dependency installation steps required.

## Overview

This repository contains a lightweight static website designed for simple hosting and easy iteration.

Current live site source is in [`frontend/`](/Users/abhinav/Desktop/Projects/doubleknott/website/frontend).

Key characteristics:

- Static HTML pages
- Shared CSS design system
- Minimal JavaScript for navigation and reveal interactions
- GitHub Pages compatible
- No backend required

## Project Structure

```text
frontend/
  index.html
  about.html
  services.html
  insights.html
  contact.html
  scripts.js
  styles/
    main.css
    components.css
    animations.css
```

## Local Preview

Because this is a static site, you can open [`frontend/index.html`](/Users/abhinav/Desktop/Projects/doubleknott/website/frontend/index.html) directly in a browser.

For a cleaner local preview, run a simple static server from the repository root:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/frontend/
```

## GitHub Pages

This repo is slightly different from the most common GitHub Pages setup because the website files live in `frontend/` instead of the repository root or `docs/`.

### Recommended Option

Use **GitHub Actions** to deploy the contents of `frontend/` to GitHub Pages.

Why this is the best fit:

- keeps the current project structure intact
- avoids duplicating files into `docs/`
- works cleanly with static assets and relative links
- is the most maintainable option as the site grows

### Alternative Option

If you want to use GitHub Pages without Actions, move or copy the contents of `frontend/` into a `docs/` directory and configure GitHub Pages to publish from `/docs` on the `main` branch.

That approach works, but it introduces duplicate source locations unless you decide to make `docs/` the single source of truth.

## Recommended GitHub Pages Deployment Workflow

Create the file `.github/workflows/pages.yml` with a workflow that publishes the `frontend/` directory.

Example:

```yaml
name: Deploy static site to GitHub Pages

on:
  push:
    branches: ["main"]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: true

jobs:
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Configure Pages
        uses: actions/configure-pages@v5

      - name: Upload site artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./frontend

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## GitHub Pages Setup Steps

After adding the workflow:

1. Push the repository to GitHub.
2. Open the repository on GitHub.
3. Go to `Settings` -> `Pages`.
4. Under `Build and deployment`, choose `GitHub Actions`.
5. Push to `main` to trigger deployment.

Your site will then be published at:

```text
https://<your-github-username>.github.io/<repository-name>/
```

## Important Notes for This Site

- Internal links are currently relative between pages inside `frontend/`, which works well for static hosting.
- CSS and JS references are also relative, so no asset pipeline is needed.
- If you later move files out of `frontend/`, update all page links and stylesheet/script paths together.

## Editing Guide

### Content Pages

- [`frontend/index.html`](/Users/abhinav/Desktop/Projects/doubleknott/website/frontend/index.html): homepage
- [`frontend/about.html`](/Users/abhinav/Desktop/Projects/doubleknott/website/frontend/about.html): firm overview
- [`frontend/services.html`](/Users/abhinav/Desktop/Projects/doubleknott/website/frontend/services.html): service offerings
- [`frontend/insights.html`](/Users/abhinav/Desktop/Projects/doubleknott/website/frontend/insights.html): thought leadership
- [`frontend/contact.html`](/Users/abhinav/Desktop/Projects/doubleknott/website/frontend/contact.html): contact form and contact details

### Styling

- [`frontend/styles/main.css`](/Users/abhinav/Desktop/Projects/doubleknott/website/frontend/styles/main.css): theme tokens, layout primitives, typography
- [`frontend/styles/components.css`](/Users/abhinav/Desktop/Projects/doubleknott/website/frontend/styles/components.css): shared UI components
- [`frontend/styles/animations.css`](/Users/abhinav/Desktop/Projects/doubleknott/website/frontend/styles/animations.css): keyframes and motion styling

### Behavior

- [`frontend/scripts.js`](/Users/abhinav/Desktop/Projects/doubleknott/website/frontend/scripts.js): mobile navigation toggle and scroll reveal behavior

## Deployment Checklist

Before publishing:

- Confirm all page links work
- Confirm `index.html` loads correctly from the published base URL
- Confirm Google Fonts load correctly
- Test mobile navigation
- Review contact links (`mailto:` and external links)
- Check the site in GitHub Pages after deployment, not only locally

## Maintenance Notes

- Keep file names lowercase for predictable static hosting behavior.
- Prefer relative links for pages and assets.
- Avoid adding tooling unless there is a clear need for templating, optimization, or bundling.
- If the site becomes larger, consider moving repeated HTML into a small static-site build process later.

## License

Add a project license here if you want this repository to be shared publicly.
