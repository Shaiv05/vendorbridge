# Authentication Bug Report - VendorBridge Phase 1

## Summary
Authentication was failing primarily due to missing database migrations and URL pattern inconsistencies.

## Identified Issues

### 1. Missing Migrations (Critical)
- **Problem:** The `accounts` application lacked a `migrations/` directory and the initial migration file for the custom `User` model.
- **Impact:** The database did not have an `accounts_user` table. Any attempt to register or login resulted in a 500 Internal Server Error as the table could not be found.
- **Affected Files:** `backend/accounts/`

### 2. URL Trailing Slash Mismatch (High)
- **Problem:** Backend URL patterns were defined without trailing slashes (e.g., `login`), while standard Django behavior and some frontend requests might expect or append slashes.
- **Impact:** Requests to `/api/auth/login/` would return a 404 error instead of being handled or redirected correctly.
- **Affected Files:** `backend/accounts/urls.py`, `backend/core/urls.py`

### 3. Missing Frontend Environment (Medium)
- **Problem:** No `.env.local` was present in the frontend, and the default `API_URL` was hardcoded to `http://localhost:8000/api`.
- **Impact:** If the backend port was busy or running on a different port, the frontend would fail to connect without an easy way to override the URL.
- **Affected Files:** `frontend/src/services/api.ts`

## Root Cause Analysis
The project was initialized with a custom user model but the corresponding migrations were never generated or committed. Additionally, the URL configuration did not follow Django's idiomatic trailing slash convention, leading to routing fragility.
