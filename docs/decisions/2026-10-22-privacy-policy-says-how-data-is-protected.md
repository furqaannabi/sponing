# The privacy policy says how data is protected, and carries Google's and YouTube's wording

**Date:** 2026-10-22
**Status:** Accepted (Furqaan); William to agree
**Decided by:** Furqaan
**Supersedes:** none

## Context
Google's review of the sign-in project's sensitive scope (`youtube.readonly`) came back on 22 October: "Your privacy policy does not specify any data protection mechanisms for sensitive data." Verification stops until the policy says how sensitive data is protected and the email is answered. Google's reviews also commonly ask for the Limited Use statement, and YouTube's API terms ask that a policy using YouTube API Services link YouTube's Terms of Service, Google's Privacy Policy, and where to remove access.

Every statement on the legal pages must trace to a signed spec, PRODUCT.md or a decision record (LG-BR-01). Some of the protections are in the code; the rest are set where Sponing is deployed, which is not in the repo, and are Furqaan's to state.

## Options
1. **Only what Google asked: a data protection section.** Fixes this round; a later round may ask for Limited Use and the YouTube wording.
2. **The data protection section, plus Limited Use and the YouTube wording.** One more section now, and fewer rounds with Google.

## Decision
Option 2. The facts the page may state, and where each comes from:

- **HTTPS** between the browser, Sponing and the services it uses: production runs on HTTPS on Vercel and `backend.sponing.com`.
- **Google and Instagram access encrypted with AES-256**, the key kept apart from the database (`backend/src/secrets/secrets.ts`). AWS KMS is not named: the code says it arrives with the deployment spec.
- **The database and stored files encrypted at rest:** S3 encrypts every new object by default, and the production RDS instance has storage encryption on (Furqaan, 22 October).
- **Drafts in private storage,** opened only by the two sides of their deal through links that expire after 15 minutes (`addressSeconds` in `backend/src/drafts/drafts.ts`).
- **The sign-in cookie can't be read by scripts** (HttpOnly; `backend/src/http/http.ts`).
- **Server logs hold ids only** ([requests and errors are logged by our own middleware](2026-10-13-requests-and-errors-are-logged-by-our-own-middleware.md)).
- **Only the two people who run Sponing at Allynt Labs can reach its systems, with multi-factor sign-in** (Furqaan, 22 October).
- **No AI model is trained on users' data:** Sponing trains none, and Amazon Bedrock does not train on what it is sent.
- **Limited Use:** "Sponing's use and transfer of information received from Google APIs adheres to the Google API Services User Data Policy, including the Limited Use requirements."
- **YouTube:** Sponing uses YouTube API Services; links to YouTube's Terms of Service, Google's Privacy Policy and Google's account permissions page.

## Consequences
- Legal pages FRD revision 1.5: new LG-FR-18 and LG-FR-19; LG-FR-06 loses the sentence they replace; a paragraph can carry links.
- **Kept true by the team, not the code:** multi-factor sign-in on every AWS user and the root account, and on the Vercel, Cloudflare and Google Cloud accounts that reach data; and RDS storage encryption on any new instance. Changing either makes the page wrong.
- Moving tokens to AWS KMS does not change the page; a change to logs, link lifetimes or who can reach the systems does (LG-BR-01).
- After the page is live, reply to Google's email to confirm; the privacy policy URL is unchanged.
