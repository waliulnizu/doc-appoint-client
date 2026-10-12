# DocAppoint — Client (Frontend) 🎨

> **Modern Doctor Appointment Management System — Frontend Web Application**  
> Built with Next.js 16 (App Router), React 19, Tailwind CSS 4, HeroUI, DaisyUI, and Better Auth.

---

## 📋 Table of Contents

- [Live Deployment Links](#-live-deployment-links)
- [How the Project Works](#-how-the-project-works)
  - [System Architecture](#system-architecture)
  - [Next.js Reverse Proxy & Cookie Architecture](#nextjs-reverse-proxy--cookie-architecture)
  - [Authentication Flow](#authentication-flow)
  - [Doctor Discovery & Booking Workflow](#doctor-discovery--booking-workflow)
  - [User Dashboard & Appointment Management](#user-dashboard--appointment-management)
  - [Review & Rating Mechanism](#review--rating-mechanism)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Directory Structure](#-project-directory-structure)
- [Environment Variables](#-environment-variables)
- [Local Development Setup](#-local-development-setup)
- [Google OAuth Configuration](#-google-oauth-configuration)
- [Deployment Guide (Vercel)](#-deployment-guide-vercel)
- [Related Repositories](#-related-repositories)
- [Author & License](#-author--license)

---

## 🔗 Live Deployment Links

| Resource | Service | URL | Status |
|---|---|---|---|
| **Frontend Application** | Vercel | [https://doc-appoint-client-sepia.vercel.app](https://doc-appoint-client-sepia.vercel.app) | ✅ Live |
| **Backend API Server** | Render | [https://doc-appoint-server-mod0.onrender.com](https://doc-appoint-server-mod0.onrender.com) | ✅ Live |
| **Backend Health Check** | Render | [https://doc-appoint-server-mod0.onrender.com/health](https://doc-appoint-server-mod0.onrender.com/health) | ✅ Active |
| **Client GitHub Repo** | GitHub | [https://github.com/waliulnizu/doc-appoint-client](https://github.com/waliulnizu/doc-appoint-client) | 📦 Repository |
| **Server GitHub Repo** | GitHub | [https://github.com/waliulnizu/doc-appoint-server](https://github.com/waliulnizu/doc-appoint-server) | 📦 Repository |

---

## 🧠 How the Project Works

DocAppoint is an end-to-end healthcare booking and doctor consultation portal designed for seamless patient discovery, doctor appointment scheduling, profile management, and verified patient reviews.

### System Architecture

```text
┌─────────────────────────────────────────────────────────────┐
│                       PATIENT BROWSER                       │
│  (Next.js Client @ https://doc-appoint-client-sepia.vercel.app) │
└──────────────┬──────────────────────────────┬───────────────┘
               │                              │
         Direct SSR (Server)            Browser Requests
         for SEO & initial data         to /api/* (Same-Origin)
               │                              │
               │                   ┌──────────▼──────────┐
               │                   │  Next.js Rewrites   │ (Reverse Proxy)
               │                   │  (next.config.mjs)  │
               │                   └──────────┬──────────┘
               │                              │
               └──────────────┬───────────────┘
                              │
               Forwarded via HTTPS to Render
                              │
┌─────────────────────────────▼───────────────────────────────┐
│                    EXPRESS 5 API SERVER                     │
│        (Render @ https://doc-appoint-server-mod0.onrender.com) │
├─────────────────────────────────────────────────────────────┤
│  • Better Auth (Cookie Session / Google OAuth)              │
│  • Doctors CRUD & Search Controller                         │
│  • Appointments & Slot Availability Engine                  │
│  • Reviews & Automated Rating Calculator                    │
│  • Dynamic Content & Statistics Endpoints                   │
└─────────────────────────────┬───────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    MONGODB ATLAS CLUSTER                    │
│  (Collections: doctors, appointments, reviews, user, etc.) │
└─────────────────────────────────────────────────────────────┘
```

### Next.js Reverse Proxy & Cookie Architecture

A critical architectural highlight of this project is the **Reverse Proxy Pattern** implemented inside `next.config.mjs`:

1. **Same-Origin Requests**: In the browser, all API and authentication calls target `/api/*` (e.g., `/api/auth/sign-in`, `/api/doctors`, `/api/appointments`).
2. **Next.js Rewrites**: Next.js intercepts `/api/*` and proxies it directly to `NEXT_PUBLIC_SERVER_URL` on Render.
3. **HTTP-Only Cookie Preservation**: Browsers block cross-site cookies under modern third-party cookie restrictions. Because calls go to the client's own domain (`/api/*`), Better Auth session cookies (`better-auth.session_token`) are treated as first-party/same-site cookies, preserving login state reliably without complex CORS cookie sharing.
4. **Dual-Mode Axios Client (`src/services/api.js`)**:
   - **Client-Side (Browser)**: Uses `/api` relative path.
   - **Server-Side (SSR / Next.js server components)**: Calls `${process.env.NEXT_PUBLIC_SERVER_URL}/api` directly with headers.

### Authentication Flow

DocAppoint uses **Better Auth**:
- **Email & Password Authentication**: Patients register with name, email, and password. Better Auth securely hashes credentials and issues an HTTP-only session cookie.
- **Google OAuth 2.0**: Patients can click "Continue with Google". Better Auth redirects to Google's consent screen. Upon authorization, Google redirects back to `/api/auth/callback/google` on the client domain, which proxies to the server, creates or retrieves the user account in MongoDB, sets the session cookie, and redirects the user to the dashboard.
- **Session State**: Managed in the client via `@heroui` state and `src/hooks/useSession.jsx`. Protected routes (`/dashboard`) redirect unauthenticated visitors to `/login`.

### Doctor Discovery & Booking Workflow

1. **Browsing & Search**: Patients visit `/doctors` to view licensed specialists. Doctors can be filtered dynamically by specialty (Cardiology, Neurology, Pediatrics, etc.) or searched by name.
2. **Doctor Details (`/doctors/[id]`)**: Detailed profile showcasing bio, hospital location, consultation fee, available days, visiting hours, and patient reviews.
3. **Slot Availability Check**: The client queries `/api/appointments/slots/:doctorId` for real-time slot checking.
4. **Booking Modal**: The patient specifies:
   - Patient Full Name
   - Email Address & Phone Number
   - Gender (`Male` or `Female`)
   - Appointment Date & Preferred Time Slot
5. **Confirmation**: On submission, a booking record is created in MongoDB with status `pending`.

### User Dashboard & Appointment Management

- **Protected Route**: Available at `/dashboard` for logged-in users.
- **My Bookings (`MyBookings.jsx`)**: Lists all past and upcoming consultations fetched from `/api/appointments/user/:email`.
- **Modifications**: Patients can reschedule appointments (`EditAppointmentModal.js`) or cancel them with instant database synchronization.
- **Profile Management (`MyProfile.jsx`)**: Patients can update their display name and profile picture URL.

### Review & Rating Mechanism

- Once a patient completes an appointment, they can submit a 1 to 5-star review along with detailed commentary.
- The server validates that only verified patients who booked that doctor can leave a review.
- On successful submission, the doctor's average rating in the database is automatically recalculated and updated.

---

## ✨ Features

- ⚡ **Next.js 16 App Router & React 19**: Ultra-fast SSR and client transitions.
- 🔐 **Dual Auth Support**: Email/Password + Google OAuth 2.0 via Better Auth.
- 🩺 **Doctor Catalog**: Searchable and filterable doctor directory with detailed profiles.
- 📅 **Interactive Booking**: Date and slot picker with comprehensive validation.
- 📊 **User Dashboard**: Manage active bookings, edit appointments, and update personal profile.
- ⭐ **Dynamic Rating System**: Real-time review submissions with automatic rating aggregation.
- 🎨 **Modern Design System**: Styled with Tailwind CSS 4, HeroUI, and DaisyUI.
- 🔔 **Toast Feedback**: Instant user alerts for every action via `react-hot-toast`.
- 📱 **100% Responsive**: Tailored layout for mobile, tablet, and desktop screens.

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
|---|---|---|
| **Framework** | Next.js 16 (App Router) | React Framework with SSR & API rewrites |
| **Library** | React 19 | Component-based UI building |
| **Styling** | Tailwind CSS 4 | Modern utility-first CSS |
| **Component Libraries** | HeroUI 3 & DaisyUI 5 | High-quality accessible UI components |
| **Authentication** | Better Auth Client | Session and OAuth management |
| **HTTP Client** | Axios | Configured with reverse-proxy baseUrl |
| **Form Handling** | React Hook Form 7 | Form validation and state management |
| **Notifications** | React Hot Toast | User action feedback |
| **Icons** | React Icons | Icon sets (Lucide, Feather, FontAwesome) |

---

## 📁 Project Directory Structure

```plaintext
doc-appoint-client/
├── 📄 .env                         # Local environment variables (git-ignored)
├── 📄 .env.example                 # Template for environment variables
├── 📄 next.config.mjs              # Next.js configuration & API rewrites proxy
├── 📄 package.json                 # Dependencies and pnpm scripts
├── 📁 public/
│   ├── 📁 images/                  # Static assets (hero banners, doctors, icons)
│   └── 📄 favicon.ico
└── 📁 src/
    ├── 📁 app/                     # App Router pages & layouts
    │   ├── 📄 layout.js            # Root layout with Providers & Toast
    │   ├── 📄 page.js              # Home page assembling all sections
    │   ├── 📄 globals.css          # Tailwind CSS & theme tokens
    │   ├── 📄 not-found.js         # Custom 404 page
    │   ├── 📁 appointments/
    │   │   └── 📄 page.jsx         # Appointments listing
    │   ├── 📁 dashboard/
    │   │   ├── 📄 layout.js        # Dashboard navigation shell
    │   │   └── 📄 page.jsx         # Protected patient dashboard
    │   ├── 📁 doctors/
    │   │   ├── 📄 layout.js        # Doctors section layout
    │   │   ├── 📄 page.jsx         # All doctors list & filter
    │   │   └── 📁 [id]/
    │   │       └── 📄 page.jsx     # Doctor profile & booking modal
    │   ├── 📁 login/
    │   │   └── 📄 page.jsx         # Sign in page
    │   ├── 📁 logout/
    │   │   └── 📄 page.jsx         # Sign out handler
    │   └── 📁 register/
    │       └── 📄 page.jsx         # Sign up page
    ├── 📁 components/
    │   ├── 📁 appointments/        # Appointment modals & calendar
    │   │   ├── 📄 Calendar.js
    │   │   └── 📄 EditAppointmentModal.js
    │   ├── 📁 auth/                # Auth components
    │   │   ├── 📄 AuthField.jsx
    │   │   ├── 📄 AuthShell.jsx
    │   │   └── 📄 GoogleSignInButton.jsx
    │   ├── 📁 dashboard/           # Dashboard views
    │   │   ├── 📄 MyBookings.jsx
    │   │   └── 📄 MyProfile.jsx
    │   ├── 📁 doctors/             # Doctor cards & widgets
    │   │   └── 📄 DoctorCard.jsx
    │   ├── 📁 home/                # Dynamic Home Page sections
    │   │   ├── 📄 HeroSection.jsx
    │   │   ├── 📄 TopRatedDoctors.jsx
    │   │   ├── 📄 WhyChooseUs.jsx
    │   │   ├── 📄 HowItWorks.jsx
    │   │   ├── 📄 DepartmentsSection.jsx
    │   │   ├── 📄 ReasonsSection.jsx
    │   │   ├── 📄 TestimonialsSection.jsx
    │   │   ├── 📄 FAQSection.jsx
    │   │   ├── 📄 StatsSection.jsx
    │   │   ├── 📄 BlogSection.jsx
    │   │   ├── 📄 CTASection.jsx
    │   │   ├── 📄 AppDownloadSection.jsx
    │   │   └── 📄 GeriatricsSection.jsx
    │   ├── 📁 reviews/             # Review components
    │   │   └── 📄 DoctorReviews.jsx
    │   └── 📁 shared/              # Reusable layout components
    │       ├── 📄 Navbar.jsx
    │       ├── 📄 Footer.jsx
    │       ├── 📄 Loading.jsx
    │       └── 📄 Providers.jsx
    ├── 📁 hooks/
    │   └── 📄 useSession.jsx       # Auth session hook
    ├── 📁 lib/
    │   ├── 📄 auth-client.js       # Better Auth client instance
    │   └── 📄 toast.js             # Toast helper utilities
    ├── 📁 services/                # Axios API services
    │   ├── 📄 api.js               # Dual-mode Axios base client
    │   ├── 📄 doctors.js           # Doctor API calls
    │   ├── 📄 appointments.js      # Appointment API calls
    │   ├── 📄 reviews.js           # Review API calls
    │   ├── 📄 stats.js             # Platform stats API
    │   └── 📄 content.js           # Marketing content API
    └── 📁 utils/
        ├── 📄 doctorId.js          # ID parsing utility
        └── 📄 userProfile.js       # Profile helper methods
```

---

## 🔐 Environment Variables

Create your `.env` file from `.env.example`:

```bash
cp .env.example .env
```

### Variables Specification

| Variable | Description | Local Development | Production (Vercel) |
|---|---|---|---|
| `NEXT_PUBLIC_APP_URL` | Frontend application URL. Better Auth uses this as its base URL for OAuth callbacks and internal redirects. | `http://localhost:3000` | `https://doc-appoint-client-sepia.vercel.app` |
| `NEXT_PUBLIC_SERVER_URL` | Backend API URL. Used by `next.config.mjs` for server-side rewrites and direct SSR data fetching. | `http://localhost:5000` | `https://doc-appoint-server-mod0.onrender.com` |

> ⚠️ **Important Security Rule**: Any variable starting with `NEXT_PUBLIC_` is bundled into browser JavaScript. Never expose database credentials or private API secrets in the client codebase.

---

## 🚀 Local Development Setup

### 1. Prerequisites
- **Node.js**: `v20.x` or higher recommended (minimum `v18.18+`)
- **Package Manager**: `pnpm` (this project uses `pnpm` — `pnpm-lock.yaml` is the lockfile)
- **Backend Running**: Have the backend running locally on port 5000 (see [Server README](../doc-appoint-server/README.md))

### 2. Clone the Repository
```bash
git clone https://github.com/waliulnizu/doc-appoint-client.git
cd doc-appoint-client
```

### 3. Install Dependencies
```bash
pnpm install
```

### 4. Configure Environment
```bash
cp .env.example .env
```
Ensure your `.env` has:
```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_SERVER_URL=http://localhost:5000
```

### 5. Run Development Server
```bash
pnpm dev
```

Open your browser at **[http://localhost:3000](http://localhost:3000)**.

> **Tip**: If you encounter memory issues with Turbopack on your platform, you can run without Turbopack:
> ```bash
> pnpm dev:no-turbo
> ```

---

## 🔑 Google OAuth Configuration

To enable Google sign-in:

1. Visit [Google Cloud Console](https://console.cloud.google.com/).
2. Navigate to **APIs & Services** → **Credentials**.
3. Create an **OAuth 2.0 Client ID** with Application type: **Web Application**.
4. In **Authorized redirect URIs**, add both:
   - For local development:
     ```
     http://localhost:3000/api/auth/callback/google
     ```
   - For production deployment:
     ```
     https://doc-appoint-client-sepia.vercel.app/api/auth/callback/google
     ```
   *(Notice: Use the **client** domain because Next.js rewrites the auth routes to the backend)*
5. Configure the resulting `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in your backend server environment.

---

## 🚢 Deployment Guide (Vercel)

The frontend is optimized for zero-config deployment on **Vercel**:

1. **Push your code to GitHub**:
   ```bash
   git add .
   git commit -m "feat: frontend ready for deployment"
   git push origin main
   ```
2. **Import to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard).
   - Click **Add New...** → **Project**.
   - Select the `doc-appoint-client` repository.
   - Framework Preset: **Next.js** (automatically detected).
3. **Configure Environment Variables**:
   Add the following variables under the project Settings → Environment Variables:
   - `NEXT_PUBLIC_APP_URL` = `https://doc-appoint-client-sepia.vercel.app`
   - `NEXT_PUBLIC_SERVER_URL` = `https://doc-appoint-server-mod0.onrender.com`
4. **Deploy**:
   - Click **Deploy**. Vercel will build the project and issue the live production URL.

---

## 🔗 Related Repositories

- **Frontend Client**: [https://github.com/waliulnizu/doc-appoint-client](https://github.com/waliulnizu/doc-appoint-client)
- **Backend Server**: [https://github.com/waliulnizu/doc-appoint-server](https://github.com/waliulnizu/doc-appoint-server)

---

## 👨‍💻 Author & License

**Waliul Islam Nizu**  
Full-Stack Web Developer  
- GitHub: [@waliulnizu](https://github.com/waliulnizu)

This project is open source and available under the [MIT License](LICENSE).