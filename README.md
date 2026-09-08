# QuICK Research Group Website

Static website for the QuICK Research Group (Quantum mechanics guided
Intelligent Computation for Knowledge-based systems), rebuilt from the
original Wix site ([sumtamnimi.wixsite.com/questlab](https://sumtamnimi.wixsite.com/questlab)).

Built with **Next.js 16** (App Router, Tailwind CSS v4) as a **fully static
export** — no backend required. Content is a snapshot stored in
`lib/data/` and rendered at build time, so the whole site deploys as
static assets to **Cloudflare Workers** (`wrangler.toml` → `./out`).

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

All content is stored as JSON collections in `lib/data/` — edit the files
in the repo (or in the GitHub web UI) and push to `main`:

- `lib/data/research-areas.json` — 11 research areas
- `lib/data/people/*.json` — 16 members (name, institution, role, LinkedIn)
- `lib/data/publications/*.json` — 4 publications
- `lib/data/blogs/*.json` — 3 blog posts (Markdown content)

Images live in `public/images/`. `lib/content.ts` reads these files at build
time and renders everything statically — no database needed. Every push to
`main` triggers an automatic rebuild and deploy on Cloudflare (the repo is
connected as a project in the Cloudflare dashboard).

Note: new blog posts default to `DRAFT` status — drafts are not rendered on
the public site. Set the status to `PUBLISHED` to make a post live.

## Newsletter

The subscribe form on the home page (`components/NewsletterForm.tsx`) POSTs
to the URL in `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` (a Cloudflare Worker,
Formspree, Resend, or similar — anything accepting a POST that returns 2xx).
Set it via `.env.local` for local dev, or via `[vars]` in `wrangler.toml`
(prefer the Cloudflare dashboard → Workers & Pages → quick-lab-website →
Settings → Variables so it doesn't land in git). Until an endpoint is
configured, the form honestly reports that signup isn't available instead of
pretending to subscribe.

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

## Deploy to Cloudflare Workers

The site is served as static assets by the `quick-lab-website` Worker from
`www.quickresearchgroup.com` (custom domain binding). `wrangler.toml` points
at the static export:

```toml
[assets]
directory = "./out"
```

Manual deploy (requires `wrangler login`):

```bash
npm run deploy   # next build && wrangler deploy
```

Pushing to `main` deploys automatically through the Cloudflare Git
integration — no local login needed. Just make sure the project's build
command in the dashboard (Workers & Pages → quick-lab-website → Settings →
Builds) runs the Next build, e.g. `npm ci && npm run build`, so `out/`
exists at deploy time.
To also serve the apex `quickresearchgroup.com`, add a second custom-domain
binding for it in the Cloudflare dashboard (Workers & Pages →
quick-lab-website → Settings → Domains & Routes).

## Note on the original architecture

This repo was previously a monorepo client/server split (Next.js frontend +
NestJS/Postgres API). The API was removed and the site converted to a static
snapshot — the deployed site is fully self-contained and has no backend
dependency. (An earlier iteration also used Netlify Forms/Identity and Decap
CMS; those were removed in favor of Cloudflare Workers static hosting —
see git history if you need them back.)
