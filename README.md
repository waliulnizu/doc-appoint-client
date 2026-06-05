# DocAppoint — Client (Frontend)

**DocAppoint** is a Doctor Appointment Manager built with Next.js. Users can browse doctors, book and manage appointments, update their profile, and leave reviews after visiting a doctor.

## Live site

| | URL |
|--|-----|
| **Client (Vercel)** | `https://doc-appoint-client-sepia.vercel.app` |
| **Server (Vercel)** | `https://doc-appoint-server-mod0.onrender.com/api/doctors` ← set in `.env` |

## Five main features

1. **Home page** — Hero section, top 3 rated doctors, “Why choose us”, and how booking works.
2. **All Appointments** — Browse every doctor with **search by name** (client-side filter).
3. **Book appointments** — Doctor details, login redirect for guests, booking modal with gender (Male/Female), date, and time.
4. **Dashboard** — Private route: view/update/delete bookings, update profile (name & photo), Google profile image support.
5. **Auth & security** — Email/password register & login, **Google sign-in**, toast notifications, and route protection for `/dashboard`.

### Bonus

- **Reviews** — Leave a star review after booking with a doctor; ratings update on doctor cards.
- **Custom 404** page.

## Tech stack

- [Next.js 16](https://nextjs.org/) (App Router)
- [React 19](https://react.dev/)
- [HeroUI](https://www.heroui.com/) + [DaisyUI](https://daisyui.com/)
- [Better Auth](https://www.better-auth.com/) (client)
- [Axios](https://axios-http.com/)
- [react-hook-form](https://react-hook-form.com/)
- [react-hot-toast](https://react-hot-toast.com/)
- [react-icons](https://react-icons.github.io/react-icons/)

## Prerequisites

- Node.js 18+
- Running **DocAppoint server** (see `doc-appoint-server/README.md`)
- MongoDB data with doctors (seeded on server / Atlas)

## Environment variables

Copy `.env.example` to `.env`:

```env
NEXT_PUBLIC_APP_URL=https://doc-appoint-client-sepia.vercel.app
NEXT_PUBLIC_SERVER_URL=https://doc-appoint-server-mod0.onrender.com/api/doctors
```

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | Next.js app URL (Better Auth + Google OAuth callback host) |
| `NEXT_PUBLIC_SERVER_URL` | Express API base URL (doctors, appointments, reviews) |

Auth requests use a **Next.js rewrite** so cookies stay on `localhost:3000`:

- Browser: `http://localhost:3000/api/auth/*`
- Proxied to: `http://localhost:5000/api/auth/*` (see `next.config.mjs`)

## Local setup

```bash
cd doc-appoint-client
npm install
cp .env.example .env
# Edit .env if your server port differs
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

If Turbopack runs out of memory on Windows:

```bash
npm run dev:no-turbo
```

Run the **server** in another terminal (`npm run dev` in `doc-appoint-server`).

## Google sign-in (local)

1. Configure Google OAuth on the **server** (see server README).
2. In Google Cloud Console, add redirect URI:

   `http://localhost:3000/api/auth/callback/google`

3. Restart both client and server after changing `.env`.

Docs: [Better Auth — Google](https://www.better-auth.com/docs/authentication/google)

## Project structure (high level)

```
src/
├── app/              # Pages (home, doctors, login, register, dashboard)
├── components/       # UI (home, doctors, appointments, dashboard, auth)
├── hooks/            # useSession
├── lib/              # auth-client, toast
├── services/         # API calls (doctors, appointments, reviews)
├── utils/            # doctorId, userProfile helpers
└── proxy.js          # Protects /dashboard routes
```

## Deploy on Vercel (frontend)

Deploy **after** the backend is live on Vercel (see `doc-appoint-server/README.md`).

1. Push this repo to GitHub.
2. [Vercel](https://vercel.com) → **Add New Project** → import `doc-appoint-client`.
3. Framework: **Next.js** (auto-detected).
4. Environment variables:

   | Name | Example |
   |------|---------|
   | `NEXT_PUBLIC_APP_URL` | `https://doc-appoint-client.vercel.app` (your client URL) |
   | `NEXT_PUBLIC_SERVER_URL` | `https://doc-appoint-api.vercel.app` (your **server** Vercel URL) |

5. Deploy.
6. On the **server** Vercel project, set `CLIENT_URL` and `BETTER_AUTH_URL` to the **client** URL above, then redeploy the server.
7. Google OAuth redirect URI:

   `https://doc-appoint-client.vercel.app/api/auth/callback/google`

## Related repository

Backend API & auth: **doc-appoint-server**


