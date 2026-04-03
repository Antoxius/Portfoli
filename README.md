# Portfoli

Xenius Tolderlund Portfolio

## Local setup

1. Start the backend API in [../API](../API).
2. Use `.env.local` with:

```env
PORTFOLIO_API_BASE_URL=http://localhost:4000
```

3. Start the frontend:

```bash
npm run dev
```

The contact page posts to the Next route at `/api/contact`, which forwards the request to the backend API. The home page also reads dynamic content from the backend.

## Deploy

Deploy this project to Vercel and set:

```env
PORTFOLIO_API_BASE_URL=https://your-api-name.onrender.com
```

Your backend must allow the deployed frontend origin via `ALLOWED_ORIGIN`.
