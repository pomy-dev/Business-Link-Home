## Business Link — Website for OAuth/Firebase verification

This folder contains a small static website you can publish publicly to satisfy Google OAuth consent screen requirements:

- **Application home page**: `index.html`
- **Privacy policy**: `privacy.html`
- **Terms of service**: `terms.html`

All pages live in the `site/` directory.

### What to edit (important)

Open these files and replace the placeholders:

- `site/index.html`
  - `support@YOURDOMAIN.com`
  - app store links (`ADD YOUR LINK`)
- `site/privacy.html`
  - `Effective date`, `ADD LEGAL NAME`, `ADD COUNTRY`, `support@YOURDOMAIN.com` (and address if you want)
- `site/terms.html`
  - `Effective date`, `ADD JURISDICTION`, `ADD LEGAL NAME`, `support@YOURDOMAIN.com`

### Publish option A: GitHub Pages (free)

1. Create a new GitHub repository (public is simplest for Pages).
2. Upload the contents of the `site/` folder to the repository root (so `index.html` is at the root).
3. In GitHub repo settings → **Pages**:
   - Source: deploy from branch
   - Branch: `main` / root
4. GitHub will give you a URL like `https://YOURUSERNAME.github.io/YOURREPO/`.

Your required links will be:

- Home: `https://YOURUSERNAME.github.io/YOURREPO/`
- Privacy: `https://YOURUSERNAME.github.io/YOURREPO/privacy.html`
- Terms: `https://YOURUSERNAME.github.io/YOURREPO/terms.html`

### Publish option B: Netlify (free)

1. Go to Netlify and create a new site.
2. Drag-and-drop the `site/` folder contents (or connect a Git repo).
3. Netlify will give you a URL like `https://YOUR-SITE.netlify.app`.

Links:

- Home: `https://YOUR-SITE.netlify.app/`
- Privacy: `https://YOUR-SITE.netlify.app/privacy.html`
- Terms: `https://YOUR-SITE.netlify.app/terms.html`

### Publish option C: Vercel (free)

1. Create a Vercel project.
2. Import a Git repo containing the `site/` files at repo root, or configure the output directory to `site/`.
3. Deploy and use the provided `.vercel.app` domain.

### After publishing (Google Cloud / Firebase)

Use the final public URLs in Google Cloud Console → OAuth consent screen:

- **Application home page** → your published `index.html`
- **Application privacy policy link** → your published `privacy.html`
- **Application terms of service link** → your published `terms.html`

If you use a custom domain, also add it to OAuth “Authorized domains” and complete domain verification if Google prompts you.

