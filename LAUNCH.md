# ONE TALENT

Six main pages plus a privacy notice, built with React, TypeScript and Vinext (the Next.js-compatible Cloudflare runtime). Styling is custom CSS. This version uses server rendering and D1 for real inquiry storage, so deployment requires a Worker/server runtime rather than static-only Cloudflare Pages.

## Local development
Node 22.13+ is required. Run `npm ci`, then `npm run dev`. Build with `npm run build`.
After building, apply the generated Drizzle migration to local D1 using the command in README.md. Local and production records are separate.

## Before public launch
- Set verified email, phone, WhatsApp and canonical domain in `lib/content.ts`.
- Replace the text wordmark with the approved logo if available.
- Review the stock photographs; these illustrate sectors and do not depict ONE TALENT employees or clients.
- Finalize the privacy contact and retention period in `app/[page]/page.tsx`.
- Configure staff access to inquiry records and any email notification integration. Current forms save to D1 and return a reference; they do not send email notifications.
- Candidate flow accepts a CV/profile URL, not file uploads. No vacancies or placement promises are fabricated.
- Configure the purchased domain and verify DNS/HTTPS. Update sitemap and metadata origin to the final domain.
- Run a production test of employer and candidate submissions, then remove test records.

## Data
The `inquiries` D1 table contains submissions. No public endpoint exposes them. Access records through the site owner's database tooling. Consent is mandatory, requests are validated on client and server, a honeypot rejects basic spam, and a per-email submission limit applies. Review stronger anti-abuse measures when opening public traffic.

## Hosting portability
Source can be kept in GitHub. The current Sites deployment uses Cloudflare Workers and D1. Standalone Cloudflare hosting needs equivalent Worker bindings, migrations and deployment configuration. GitHub Pages cannot run this backend. For conventional Next.js/Vercel hosting, replace the Cloudflare D1 adapter with an appropriate database provider and use the standard Next.js build configuration.
