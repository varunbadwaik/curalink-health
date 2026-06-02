# Security Audit Report - CuraLink Health

This document details the security posture, defensive configurations, and access controls implemented within the CuraLink Health system to secure patient and organizational data.

---

## 1. Authentication & Route-Level Protection

### NextAuth & JWT Session Strategy
- Configured secure session tokens using `next-auth` JWT architecture.
- Session payloads include:
  - User role (`patient` \| `doctor` \| `admin`)
  - Unique user reference IDs
- Token encryption uses AES decryption keys managed by NextAuth, preventing spoofing or visual manipulation of cookies.

### Middleware Role-Guards (`src/middleware.ts`)
- Implemented edge-level path intercepts protecting dashboard pathways.
- Exits sessions or redirects to access-denied warnings if role permissions do not match destination patterns:
  - `/dashboard/admin/*` is restricted exclusively to the `admin` role.
  - `/dashboard/doctor/*` is restricted exclusively to the `doctor` role.
  - `/dashboard/patient/*` is restricted exclusively to the `patient` role.
- **Horizontal Privilege Escalation**: Denies unauthorized path traversals even if users possess valid active session credentials.

---

## 2. Input Validation and Type Safety

### Schema-Driven Validation (Zod)
- All user-submitted form boundaries (`LoginForm`, `BookingForm`, `PrescriptionForm`, `BillingForm`, `ProfileForm`) are governed by explicit Zod schemas.
- **Rules enforced**:
  - Email checks (`z.string().email()`)
  - Expiry date formats and string lengths
  - Value thresholds (e.g. prescription refills restricted to valid ranges)
  - Prevent database boundary overflow by enforcing maximum string lengths.

---

## 3. XSS (Cross-Site Scripting) Mitigation

### Input Sanitization (`src/utils/sanitize.ts`)
- Added escaping helpers to filter user inputs before they are persisted or submitted to services:
  - Converts HTML indicators (`<`, `>`, `&`, `"`, `'`, `/`) into safe equivalent entity characters.
  - Mitigates script injection attacks when displaying patient notes or records.
- React's default template interpolation (`{value}`) naturally escapes strings, but manual rendering paths (like raw HTML contexts) are protected via explicit escaping calls.

---

## 4. Configuration Security

### Environment Variable Schema Validation (`src/lib/env.ts`)
- Validates crucial backend configurations on initialization (NextAuth secret, URLs) using Zod schemas.
- In `production` environment, builds are stopped immediately if validation fails, preventing credentials leak or server launch with insecure default keys.
- Local development has secure default fallbacks to allow seamless testing setups.

---

## 5. Security Recommendations for Deployment
1. **Enable Strict CSP**: Configure a Content Security Policy header in `next.config.ts` to restrict source domains for scripts, styles, and images.
2. **Secure Cookies**: In production, ensure `cookie: { secure: true }` is active in NextAuth to mandate HTTPS transport layers.
3. **Database Layer Security**: Enforce Row Level Security (RLS) on Postgres schemas so that patients can only retrieve records mapped to their personal IDs.
