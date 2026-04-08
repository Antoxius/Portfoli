# Portfolio

Xenius Tolderlund Portfolio

## Local setup

1. Use `.env.local` with:

```env
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=Portfolio Contact <onboarding@resend.dev>
CONTACT_REPLY_TO_EMAIL=
ALLOWED_ORIGIN=http://localhost:3000
```

2. Start the frontend:

```bash
npm run dev
```

The contact page posts to the Next route at `/api/contact`.

- The route sends the message directly as an email from the Next.js server.
- The route enforces a same-origin or `ALLOWED_ORIGIN` check.
- The built-in rate limit is a lightweight in-memory guard for basic abuse, not a distributed production-grade limiter.
- The home page content now lives inside this project, so no separate content API is required.

`CONTACT_FROM_EMAIL` can use `onboarding@resend.dev` for testing, but for production you should verify your own domain in Resend and send from that domain.

## Deploy

Deploy this project to Vercel and set:

```env
RESEND_API_KEY=re_xxx
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=Portfolio Contact <noreply@yourdomain.com>
CONTACT_REPLY_TO_EMAIL=
ALLOWED_ORIGIN=https://your-frontend-domain.com
```

For stronger production abuse protection, add an external rate limiter or bot protection layer in front of `/api/contact`.
