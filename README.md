# Sponing

Brand deals where the content and the payment clear together.

Sponing is where a creator and a brand run a sponsorship deal they have already agreed. The creator starts the deal and invites the brand with a link. Claude reads the brief into a checklist. The brand approves one PayPal hold per post. AI checks the draft against that checklist, the creator publishes, and a live check of the post captures the hold and pays the creator. **Cleared** is a deliverable that has passed its live check and been paid.

Built for the PayPal AI Hackathon. PayPal sandbox only. No real money moves.

The app is at [sponing.com](https://sponing.com). The API is at [backend.sponing.com](https://backend.sponing.com). The product and its rules are in [docs/PRODUCT.md](docs/PRODUCT.md). Licence: [MIT](LICENSE).

## Try the hosted app

Sign in at [sponing.com](https://sponing.com) with a Google account. If Google says the app is not verified, continue. YouTube access is read-only, and an unverified app allows at most 100 users.

Start a deal, paste a short brief that names a discount code, a link, and showing the product, and make the checklist. Set the amount to at least $20 and the deadline to 21 days or fewer. Connect a YouTube channel you can upload to. Set the payout address to a PayPal sandbox email, and create the brand link.

Open that link in a private window, agree, and approve the hold with a PayPal **sandbox personal** account. Use a different account from the payout email, and a different account from the business account that owns the PayPal app. Upload an MP4 under 15 minutes that does what the brief says. After the draft passes, get the go-ahead, make the same video public on YouTube, and mark it posted.

Sandbox logins for judges are in the Devpost submission. They are not in this repo. Instagram connect works for tester accounts added on the Meta app. A judge's path is a YouTube post.

## PayPal

The money path uses the PayPal sandbox.

| PayPal tool | What it does here |
| --- | --- |
| Orders | One authorization per post. The brand approves it, and the amount is reserved. |
| Payments | Re-confirms the authorization before the creator publishes, captures it after the live post passes, and voids it when the hold is released. |
| Payouts | Sends the captured amount, less a 5% fee in whole cents, to the creator's PayPal email. |
| Webhooks | Signature-checked, then deduped on the PayPal event id, before any money state changes. |

Orders and Payments go through `@paypal/paypal-server-sdk` 2.5.0. Payouts and webhook verification are plain HTTPS, because that SDK does not cover them. Every create, capture, and payout sends a `PayPal-Request-Id`, so a retry cannot charge or pay twice. The model never calls PayPal. Fixed code checks the recorded money state, then calls it.

## AI

| Tool | What it does here |
| --- | --- |
| Claude Opus 5.5 on Amazon Bedrock | Reads the brief into a checklist in one call. Each item cites a line of the brief. The same model judges items that need a judgment. |
| Amazon Bedrock Data Automation | Transcript, on-screen text, and logos, with timestamps. |
| Amazon Nova Pro on Amazon Bedrock | What the video shows, such as the product in use. |

A discount code or a link is matched by code. A judgment counts only when it points at a moment in the video and separate code finds that moment, inside the video, with the quoted words in the transcript or the on-screen text. Anything unsure goes to a person.

## AG Grid and APIMatic

AG Grid Community is the checklist and its evidence from the `md` breakpoint up, the brand's view of the deal, and the creator's payment history. Narrower screens get the same rows as cards. AG Charts Community draws the paid-each-month chart on the creator's home, and loads when that chart scrolls into view.

APIMatic is in the build in two ways. The PayPal server SDK is the APIMatic-generated SDK. APIMatic's PayPal context plugin was the reference for which calls that SDK covers. Payouts and webhook verification stayed hand-written HTTP inside the same PayPal port.

## Run it locally

Needs Node 24 (see `.nvmrc`), pnpm 11.21, Bun, and Docker.

```sh
pnpm install
cp backend/.env.example backend/.env
```

In `backend/.env`, set `TOKEN_KEY` (`openssl rand -base64 32`). The API does not start without it. Add the Google OAuth client and the PayPal **sandbox** client id and secret from the comments in that file. Leave live PayPal credentials unset. The file lists what else each feature needs: AWS and ffmpeg for a draft check, Resend for the brand's two emails, Instagram for Reels.

```sh
pnpm --filter backend db:up
pnpm --filter backend db:generate
pnpm --filter backend db:migrate
pnpm --filter backend dev
```

The API listens on [http://localhost:4000](http://localhost:4000). In `web/.env.local`:

```sh
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

Then, from the repo root, `pnpm dev` serves the app at [http://localhost:3000](http://localhost:3000).

Without Google, nobody can sign in. Without PayPal, no hold can be made. Without the drafts bucket, ffmpeg, and Bedrock, a draft cannot be checked. The hosted app is the way to try a deal without those secrets.

## Tests

Frontend, from `web/`: `pnpm test`, and `pnpm test:coverage` (70% on components and lib). Backend, from `backend/`, with the Docker Postgres up: `pnpm test`. Sandbox calls against PayPal, Bedrock, YouTube, Instagram, ffmpeg, and email are the `test:*` scripts in `backend/package.json`, run by hand.

## Repository

A pnpm workspace ([decision](docs/decisions/2026-10-06-repo-layout-and-package-manager.md)).

| Path | What |
| --- | --- |
| `web/` | Next.js frontend (Vercel) |
| `backend/` | Hono on Bun: API, jobs, Prisma, AWS |
| `contract/` | OpenAPI document and TypeScript types generated from the backend's Zod schemas |
| `design/` | Design prototypes, never shipped |
| `docs/` | [Product](docs/PRODUCT.md), [specs](docs/specs/), [decisions](docs/decisions/) |
| `DESIGN.md` | Design system |
