# Why This Project? - CuraLink Health Case Study

## 1. Problem Statement
The healthcare industry is heavily fragmented. Patients, physicians, and administrators interact across disparate, legacy software ecosystems (EHRs, scheduling calendars, billing platforms). This fragmentation causes:
* **Information Silos**: Critical patient medical histories, lab results, and care notes are locked in separate databases, delaying diagnoses.
* **Administrative Load**: Clinicians spend hours manually updating checklists and managing schedules, reducing patient interaction time.
* **Coordination Gaps**: Patient transitions between administrative checkout, pharmacies, and care plans are prone to compliance and scheduling errors.

---

## 2. Solution
CuraLink Health provides a **Unified Healthcare Experience Platform** that aggregates patient portals, clinician command centers, and administrative audits into a single, cohesive dashboard ecosystem. 

```text
               ┌──────────────────────────────┐
               │    CuraLink Unified SaaS     │
               └──────────────┬───────────────┘
          ┌───────────────────┼───────────────────┐
          ▼                   ▼                   ▼
┌──────────────────┐┌──────────────────┐┌──────────────────┐
│  Patient Portal  ││ Clinician Center ││  Admin Console   │
│  Medication logs ││ AI Diagnostics   ││ Department logs  │
│  Vitals charts   ││ Queue, Schedules ││ Compliance sign  │
└──────────────────┘└──────────────────┘└──────────────────┘
```

By connecting these three user perspectives in real-time, the platform automates workflow updates (e.g. completing a care check instantly updates the compliance audit queue) and serves key metrics via responsive dashboards.

---

## 3. Technical Stack & Rationales

* **Next.js (App Router)**: Enables optimized server-side rendering for landing pages (SEO, initial paint speed) and standalone production builds.
* **TypeScript**: Assures absolute compile-time safety across critical healthcare states, interfaces, and API request schemas.
* **Zustand**: Selected for state management because of its minimal boilerplate, direct React hook integration, and slice-based subscriptions.
* **TanStack Query (React Query)**: Handles mock data-fetching caches, optimistic updates, and automatic invalidation states, reducing redundant network requests.
* **React Hook Form & Zod**: Provides schema-driven client-side input validations, ensuring XSS-safe text entries and numeric range controls.
* **NextAuth.js**: Implements role-based route guard structures with secure cookie contexts.
* **Recharts**: Renders fully responsive SVG charts for vitals tracking, department distribution, and revenue graphs.

---

## 4. Architectural Decisions & Scalability

### 4.1 Scalability
* **Standalone Build Mode**: Next.js compiles to a lightweight, standalone Node bundle containing only the code required to run in production. This reduces the Docker image size and enables rapid scaling inside Kubernetes clusters.
* **Optimized Rendering**: Recharts is dynamically split (`ssr: false`) and Zustand uses narrow selectors, reducing browser CPU usage even on high-throughput patient records list screens.

### 4.2 Future Scope & Integration
* **FHIR / HL7 API Connector**: The mock API layer is structured to easily bind to Fast Healthcare Interoperability Resources (FHIR) endpoints.
* **Redis Caching**: The rate limiter is ready to be swapped with a Redis-backed token bucket, supporting distributed cluster deployments.
