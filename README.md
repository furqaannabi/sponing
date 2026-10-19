# Sponing

Brand deals where the content and the payment clear together.

Sponing is where a creator and a brand run a sponsorship deal they have already agreed. The brand's money is held in PayPal, AI checks the creator's video against the brief, and the money is released when the approved post is live. **Cleared** is a deliverable that has passed its live check and been paid.

Built for the PayPal AI Hackathon. PayPal sandbox only, so no real money moves. The app is at [sponing.com](https://sponing.com) and the API at [backend.sponing.com](https://backend.sponing.com).

The product, the rules and what is still open are in [docs/PRODUCT.md](docs/PRODUCT.md).

## Repository

A pnpm workspace ([decision](docs/decisions/2026-10-06-repo-layout-and-package-manager.md)).

| Path | What |
| --- | --- |
| `web/` | Next.js frontend (Vercel) |
| `backend/` | Hono service on Bun (API and jobs), Prisma schema and infrastructure (AWS) |
| `contract/` | API contract and generated types |
| `design/` | Design prototypes, never shipped |
| `docs/` | [Product](docs/PRODUCT.md), [specs](docs/specs/), [decisions](docs/decisions/) |
| `DESIGN.md` | Design system |

[MIT](LICENSE).
