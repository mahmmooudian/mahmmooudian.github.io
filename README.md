# Amir Mohammad Mahmoudian — AI Engineer Portfolio

An elegant, responsive, dark-mode portfolio featuring selected AI engineering projects, architecture diagrams, professional experience, research, skills, and contact links.

## Tech stack

- **HTML5** for semantic content and inline, accessible SVG architecture diagrams
- **CSS3** for layout, transitions, and responsive styling
- **Vanilla JavaScript** for navigation, search palette, animation, and diagram zoom
- **Google Fonts** (Instrument Serif, Hanken Grotesk, JetBrains Mono), with system fallbacks
- **No build step, npm, backend, or API keys required**

## Project structure

```text
ai-engineer-portfolio/
├── index.html
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   └── favicon.svg
├── .gitignore
└── README.md
```

## Run locally

You can open `index.html` in a browser. For a local preview using Python, run:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a **public** GitHub repository named `ai-engineer-portfolio` under your account.
2. Upload **the contents of this folder** to the root of the repository. Keep the `assets/` directory structure.
3. Open **Settings → Pages** in your repository.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Choose the `main` branch and `/ (root)`, then click **Save**.
6. After GitHub Pages finishes publishing, the site should be available at `https://mahmmooudian.github.io/ai-engineer-portfolio/` (assuming the repository is named as above).

For a command-line workflow, from inside this folder:

```bash
git init
git branch -M main
git add .
git commit -m "Initial portfolio website"
git remote add origin https://github.com/mahmmooudian/ai-engineer-portfolio.git
git push -u origin main
```

Run the command-line steps only after creating the empty repository on GitHub. If Git is configured to use another default branch, `git branch -M main` standardizes it.

## Customization

- Change your introduction, work history, and project links in `index.html`.
- Update styling and responsive behavior in `assets/css/styles.css`.
- Update interactions in `assets/js/main.js`.
- All architecture diagrams are embedded SVGs in `index.html`.
- To use a custom domain, configure it through GitHub Pages and then add the appropriate canonical URL / social sharing metadata.

## Accessibility and performance

The site includes a skip link, visible keyboard focus, reduced-motion support, a keyboard-accessible quick menu and architecture-diagram zoom, responsive layout, and an animated background that runs without external libraries. All external links use `rel="noopener"`.

## Before publishing

Confirm the accuracy of the location, education dates, certifications, research status, project descriptions, email address, and professional availability in `index.html`. The content is based on the supplied portfolio source file and has not been independently verified against your résumé. Some sites may block Google Fonts; the CSS provides font fallbacks.

## License

No license is specified. All rights are reserved unless a license is added by the owner. The code is publicly viewable when published to a public GitHub repository but is not automatically open-source licensed.
