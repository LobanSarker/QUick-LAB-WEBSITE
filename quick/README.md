# QuICK Research Group Website

Static website for the QuICK Research Group (Quantum mechanics guided
Intelligent Computation for Knowledge-based systems), rebuilt from the
original Wix site ([sumtamnimi.wixsite.com/questlab](https://sumtamnimi.wixsite.com/questlab)).

Built with **Next.js 16** (App Router, Tailwind CSS v4) as a **fully static
export** — no backend required. Content is a snapshot stored in
`lib/data/` and rendered at build time, so the whole site deploys to any
static host (Netlify, GitHub Pages, Vercel, etc.).

## Stack

- Next.js 16 (App Router, `output: "export"`)
- Tailwind CSS v4 — dark "quantum" theme
- Three.js + @react-three/fiber + @react-three/drei — lazy-loaded 3D hero
  scene (with WebGL / reduced-motion fallback)
- Motion (framer-motion) — scroll reveals, magnetic buttons, animated grids
- react-markdown + remark-gfm — blog post rendering

## Pages

| Route | Description |
| --- | --- |
| `/` | Hero, tagline, latest blogs, research marquee, newsletter, contact |
| `/research` | 11 research concentrations (glow / tilt hover cards) |
| `/people` | 16 members grouped by role |
| `/publications` | 4 publications with year filter |
| `/blog` + `/blog/[slug]` | Blog list + Markdown detail pages |

## Content

All content is stored as JSON collections in `lib/data/`, edited either in the
repo or through the built-in admin UI (see below):

- `lib/data/research-areas.json` — 11 research areas
- `lib/data/people/*.json` — 16 members (name, institution, role, LinkedIn)
- `lib/data/publications/*.json` — 4 publications
- `lib/data/blogs/*.json` — 3 blog posts (Markdown content)

Images live in `public/images/`. `lib/content.ts` reads these files at build
time and renders everything statically — no database needed.

## Admin dashboard (Decap CMS)

The site ships with a browser-based content manager at **`/admin`** powered by
[Decap CMS](https://decapcms.org). From it you can add, edit and delete blog
posts, publications and people, plus upload cover images. Every save commits
the change to your Git repo, which triggers a Netlify rebuild of the site.

One-time setup (after deploying to Netlify):

1. **Netlify dashboard → Site → Identity**: click *Enable Identity*.
2. **Identity → Settings → External providers**: (optional) enable Google/GitHub
   sign-in.
3. **Identity → Settings → Services**: click *Enable Git Gateway* (this lets the
   CMS write commits to your repo).
4. In your app under *Authentication* or via the *Identity* tab, add yourself as
   a user (invite by email), or open `/admin` and sign up directly.
5. Go to `https://<your-site>.netlify.app/admin/` and sign in.

Notes:

- The CMS commits to the `main` branch (configured in
  `public/admin/config.yml`), so deploys must be tied to that branch.
- New blog posts default to `DRAFT` status — drafts are not rendered on the
  public site. Switch the status to `PUBLISHED` to make a post live.
- Uploaded images are stored under `public/images/uploads/` and committed with
  the content.

### Local CMS preview (optional)

```bash
npx decap-server &          # starts the local backend on :8081
npm run dev                 # open http://localhost:3000/admin
```

## Newsletter

The subscribe form on the home page uses **Netlify Forms** (`name="newsletter"`,
honeypot-protected). Submissions appear under **Site → Forms** in the Netlify
dashboard. If you deploy elsewhere, swap the form handler in
`components/NewsletterForm.tsx`.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & preview the static export

```bash
npm run build        # outputs to out/
npx serve out        # preview the static site locally
```

## Deploy to Netlify

1. Push this folder to a GitHub/GitLab repo.
2. In Netlify: **Add new site → Import an existing project** and pick the repo.
3. Build settings are auto-detected from `netlify.toml`:
   - Build command: `npm run build`
   - Publish directory: `out`
4. Deploy. The newsletter form is detected automatically and appears under
   **Site → Forms**.
5. Enable the admin dashboard — follow the steps in the
   [Admin dashboard](#admin-dashboard-decap-cms) section.

The `netlify.toml` already configures Node 22 for the build.

## Note on the original architecture

This repo was previously a monorepo client/server split (Next.js frontend +
NestJS/Postgres API). For Netlify-only deployment the API was removed and the
site converted to a static snapshot managed via Decap CMS — the deployed site
is fully self-contained and has no backend dependency.
