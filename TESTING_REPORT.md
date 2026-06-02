# Testing Report - CuraLink Health

This document details the testing architecture, components tested, mocking configurations, and testing guides for the CuraLink Health system.

---

## 1. Testing Framework Stack
- **Test Runner**: Jest
- **Environment**: JSDOM (browser-like DOM environment for testing React components)
- **Assertion and Query Library**: `@testing-library/react` & `@testing-library/jest-dom`
- **Compiler**: `ts-jest` for native TypeScript compilations during tests

---

## 2. Test Suites Detailed

### A. Zustand States Store Tests (`src/tests/store.test.ts`)
- **Appointments store**: Validates adding new appointments, generating standard structures, and synchronizing with the active component views.
- **Doctor store**: Verifies the patient queue state changes (e.g. updating statuses from `waiting` to `in-progress` or `completed`).
- **Patient store**: Verifies profile setting updates, medical conditions list persistence, and validation triggers.

### B. Interactive Form Component Tests (`src/tests/forms.test.tsx`)
- **LoginForm**: Ensures empty user logins or incorrect formats output helpful warning labels.
- **BookingForm**: Tests that appointment creation inputs validate doctor, specialty, time slots, and description fields before triggering API post handlers.

---

## 3. Mocking Setup

### Navigation Mocks (`next/navigation`)
Since Next.js 13+ App Router components rely on `useRouter`, `usePathname`, or `useParams` which only exist within Next.js context providers, we mock them at the top of test files:
```typescript
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      push: jest.fn(),
    };
  },
}));
```

### NextAuth Mocking
Authentication contexts are mocked to allow isolated component assertions without requiring a live session server:
```typescript
jest.mock("next-auth/react", () => ({
  signIn: jest.fn(() => Promise.resolve({ error: null })),
  useSession: jest.fn(() => ({ data: null, status: "unauthenticated" })),
}));
```

---

## 4. How to Run Unit Tests

Add a custom test script to `package.json` and invoke:
```bash
npm run test
```

To run with coverage outputs:
```bash
npm run test -- --coverage
```
