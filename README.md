# VendorBridge — Phase 1 (Next.js 15 + Django REST)

Production-grade procurement & vendor management ERP. This export contains:

- **frontend/** — Next.js 15 (App Router) + TypeScript + Tailwind + shadcn-style components + React Hook Form + Zod + Axios + JWT auth + Framer Motion
- **backend/** — Django 5 + Django REST Framework + SimpleJWT + SQLite + CORS + custom User model with role enum

> A live Lovable-stack build (TanStack Start + Lovable Cloud) of the same product ships separately at the published Lovable URL. This ZIP is the Next.js + Django version requested for portability.

## Quick start

### Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate    # Windows: .venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser    # creates an ADMIN account
python manage.py runserver 8000
```

API will be available at `http://localhost:8000/api/`.

### Frontend
```bash
cd frontend
npm install
cp .env.example .env.local       # already points at http://localhost:8000/api
npm run dev
```

Open `http://localhost:3000` and register a Procurement Officer / Manager / Vendor account.

## API endpoints

| Method | Path                   | Description                  |
|--------|------------------------|------------------------------|
| POST   | `/api/auth/register`   | Create account (non-admin)   |
| POST   | `/api/auth/login`      | Email + password → JWT pair  |
| POST   | `/api/auth/refresh`    | Refresh access token         |
| GET    | `/api/auth/me`         | Current user (Bearer token)  |

## Role-based access (frontend sidebar auto-filters)

| Role                 | Modules                                                            |
|----------------------|--------------------------------------------------------------------|
| Admin                | All                                                                |
| Procurement Officer  | Dashboard, Vendors, RFQs, Quotations, Purchase Orders, Invoices    |
| Manager              | Dashboard, Approvals, Reports                                      |
| Vendor               | Dashboard, Quotations                                              |

Admin accounts can only be created via `createsuperuser` (backend-only by design).

## Project structure

```
backend/
├── vendorbridge/      # Django project (settings, urls, wsgi)
├── accounts/          # Custom User, role enum, JWT auth views
├── core/              # Health endpoint + base utilities
├── requirements.txt
└── manage.py

frontend/
├── src/
│   ├── app/           # App Router routes
│   │   ├── (auth)/    # /login, /register
│   │   └── (dashboard)/   # protected ERP shell + all modules
│   ├── components/    # UI primitives + layout (Sidebar, Topbar, AppShell)
│   ├── features/auth/ # AuthProvider, useAuth hook
│   ├── services/      # Axios client with JWT interceptors
│   ├── lib/           # cn(), zod schemas
│   └── types/         # shared TS types
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## License
Built for hackathon use. MIT.
