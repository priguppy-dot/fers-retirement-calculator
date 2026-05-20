# FERS Retirement Calculator (Next.js)

Next.js + Tailwind CSS version of the FERS retirement calculator, ready to deploy on Vercel.

## Local development

```bash
cd web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repository to GitHub (or connect your Git provider).
2. In Vercel, **Add New Project** and import the repo.
3. Set **Root Directory** to `web`.
4. Framework preset: **Next.js** (defaults are fine).
5. Deploy.

Or use the Vercel CLI from the `web` folder:

```bash
npm i -g vercel
vercel
```

## Project structure

```
web/
├── app/              # Next.js App Router (layout, page, styles)
├── components/       # React UI components
├── lib/              # Retirement math and formatting
├── public/           # Static assets
├── package.json
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

## Calculations

- FERS pension: `(multiplier × high-3 salary × years of service) / 12`
- Multiplier: `1.1%` at age 62+ with 20+ years of service; otherwise `1.0%`
- TSP: projects balance with monthly compounding, then `4%` annual withdrawal / 12
