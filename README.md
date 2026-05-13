# TalentDash

Explore. Compare. Grow.

TalentDash is a global SEO-first career intelligence platform inspired by:
- Glassdoor
- AmbitionBox
- Levels.fyi
- TeamBlind

## Architecture Principles

- Static-first rendering
- CDN-first delivery
- Minimal runtime compute
- ISR + SSG everywhere possible
- Low infra cost
- Acquisition-ready architecture

## Multi-Region Routing

TalentDash supports:
- /in/
- /us/
- /uk/

Region routing is handled at the Next.js middleware layer.

This will be implemented in Step 2.

---

# Get Running in 5 Commands

```bash
pnpm install
cp .env.example .env
pnpm db:generate
pnpm dev