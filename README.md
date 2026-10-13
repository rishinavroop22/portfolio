# Rishi Navroop — portfolio

Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · Three.js / React Three Fiber · GSAP · Framer Motion

## Run it locally

You need Node.js 20.9 or newer (`node -v`).

```bash
npm install
npm run dev        # http://localhost:3000
```

Before pushing, check that it still builds:

```bash
npm run lint
npm run build
```

## Where to edit things

| What | File |
| --- | --- |
| Name, headline, intro, status label, email, links, education, about text, experience, achievements | `data/profile.ts` |
| Skills | `data/skills.ts` |
| Projects (featured + "Also built") | `data/projects.ts` |
| Resume PDF | `public/resume/Rishi_Navroop_Resume.pdf` (keep the same file name) |
| Photo | see below |

### Your photo

The hero uses `public/images/profile.jpg`. To swap it, replace that file (ideally about 1000×1250 px, face in the upper third, under ~300 KB). Setting `photo: null` in `data/profile.ts` shows an "RN" monogram instead.

### Adding a project

Copy one of the entries in `projects` in `data/projects.ts` and edit it. `live` and `liveNote` are optional; the buttons appear only when a link is set.

## Project structure

```
app/            layout (fonts, metadata), page, global styles, social card
components/
  layout/       Navbar, Footer, ScrollEffects (all GSAP scroll choreography)
  sections/     Hero, About, Skills, Projects, Experience, Contact
  three/        Scene, HolographicCore, ParticleField, SVG fallback
  ui/           Button, ProjectCard, TiltPanel, Portrait, SectionHeading, icons
data/           all content
lib/            animation timing, helpers, reduced-motion hook
```

Performance and accessibility notes:

- The 3D scene is loaded client-side only (`next/dynamic`, `ssr: false`) after the page is already readable; an SVG version of the core shows until it's ready and stays if WebGL isn't available.
- Rendering pauses when the hero scrolls out of view. Phones get fewer particles/bars and a lower pixel ratio.
- `prefers-reduced-motion`: no intro animation, no scroll animation, no tilt; the 3D core renders still.
- Fonts are self-hosted from `app/fonts` (no Google Fonts request at runtime).

## Deploying on Vercel (free Hobby plan)

1. **Create a GitHub repo.** On github.com → New repository → name it e.g. `portfolio` → leave "Add a README" unticked → Create.
2. **Push the code** (run inside this folder):

   ```bash
   git init
   git add .
   git commit -m "Portfolio site"
   git branch -M main
   git remote add origin https://github.com/rishinavroop22/portfolio.git
   git push -u origin main
   ```

3. **Connect to Vercel.** Go to vercel.com → sign up with GitHub → Add New → Project → import `portfolio`. The defaults (Framework: Next.js, build `next build`) are correct. Click Deploy.
4. **Check the production URL** Vercel gives you (`https://<project>.vercel.app`): open it on desktop and phone, click every button, download the resume.
5. **Optional:** in Project → Settings → Environment Variables, add `NEXT_PUBLIC_SITE_URL` = your final URL (only needed if you add a custom domain; otherwise the Vercel URL is used for social previews automatically).
6. **Updating later:** edit files, then

   ```bash
   git add .
   git commit -m "Describe the change"
   git push
   ```

   Vercel rebuilds and redeploys automatically on every push to `main`.

The Hobby plan is free for personal, non-commercial sites. A custom domain (e.g. `rishinavroop.dev`) is optional and costs roughly ₹800–1,500/year from a registrar; Vercel itself doesn't charge for connecting it.
