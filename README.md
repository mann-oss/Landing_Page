# Billy — Living Ledger

Split-flavor landing for **Billy**: consumer AI finance brain (**Green**) and business cashflow suite (**Blue**).

## What it is

- **Flavor split** — diagonal Green / Blue chooser that opens into each experience
- **Billy Green** — AI financial brain marketing page (cash trajectory, missions, pricing, early access)
- **Billy Blue** — business invoicing / metrics dashboard preview
- **Early access** — email waitlist saved to Supabase `early_access`

## Stack

- React 19 + Vite + TypeScript
- Tailwind CSS v4
- Motion (animations)
- Supabase (early access signups)

## Run locally

**Prerequisites:** Node.js 20+

```bash
npm install
```

Copy env and fill values:

```bash
cp .env.example .env
```

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_PUBLISHABLE_OR_ANON_KEY
```

```bash
npm run dev
```

App runs at [http://localhost:3000](http://localhost:3000).

## Supabase early access

1. Open the SQL editor for your project.
2. Run [`supabase/early_access.sql`](supabase/early_access.sql).
3. Confirm inserts work from the landing **Get Early Access** form (`#beta`).

Table: `public.early_access` — `id`, `email`, `source`, `created_at` (unique email).

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `npm run dev`  | Dev server (port 3000)   |
| `npm run build`| Production build         |
| `npm run lint` | Typecheck (`tsc`)        |
| `npm run preview` | Preview production build |

## Project layout

```
src/
  App.tsx                     # Flavor mode shell
  components/
    SplitLanding.tsx          # Green / Blue split + open animation
    BillyGreenLanding.tsx     # Green marketing page
    BillyBlueDashboard.tsx    # Blue business preview
    Hero.tsx / Header.tsx …   # Green page sections
  lib/supabase.ts             # Early-access client
supabase/
  early_access.sql            # Table + RLS
```

## Content reference

See [`WEBSITE_CONTENT.md`](WEBSITE_CONTENT.md) for copy and page structure.

## License

Apache-2.0 (see file headers).
