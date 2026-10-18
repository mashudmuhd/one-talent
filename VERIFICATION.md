# Verification — 11 October 2026

Passed:
- TypeScript `tsc --noEmit`.
- Production build through the Sites build helper.
- HTTP 200 for Home, About, Services, Employers, Candidates, Contact, Privacy, sitemap and robots.
- Browser review at desktop (1440 px), tablet (768 px) and mobile (390 px); no horizontal overflow on the inspected layouts.
- Mobile navigation opens and exposes all six page links.
- Request Staff navigates to the employer form.
- Hospitality service inquiry preselects Hospitality Staffing.
- Employer browser submission saves to local D1 and shows a reference.
- Candidate API and browser submissions save to local D1 and show a reference.
- Server rejects missing consent, invalid email, unknown employer service and filled honeypot with HTTP 400.
- All five homepage photographs loaded after scrolling.
- No browser console errors in the final inspected pages.

Limitations:
- These are local tests. Hosted production behavior and custom-domain DNS/HTTPS are not verified.
- Sites project registered as owner-private, but publication was blocked by the session's automatic approval policy for source synchronization. No live deployment was confirmed.
- No Lighthouse/Core Web Vitals score is claimed.
- Email notifications, approved contact details, public privacy details and the purchased domain remain to configure.
- CV/profile URLs are supported; binary CV uploads are not implemented.

Local compatibility notes:
- The Windows npm launcher resolved its own files incorrectly in the execution environment. An ignored copy of the installed npm runtime under node_modules allowed the official build helper to run.
- Drizzle's bundled tsx dependency could not read os.userInfo in the sandbox. Its local ignored copy was adjusted to prefer the existing USERNAME environment value for its temporary-directory name. The generated schema migration is included; normal hosts should not need this workaround.
- Local QA submissions are stored only in the ignored local D1 state and are not part of the source archive.
