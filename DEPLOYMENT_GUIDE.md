# Deployment Guide - CuraLink Health

This guide details the processes for deploying and scaling the CuraLink Health dashboard platform across various environments.

---

## 1. Vercel Deployment (Recommended)

Vercel provides native, optimized hosting for Next.js applications, utilizing Edge networks and serverless routes.

### Steps to Deploy:
1. Push your repository changes to GitHub.
2. Sign in to [Vercel Console](https://vercel.com) and click **Add New Project**.
3. Select your `curalink-health` repository.
4. Under **Environment Variables**, add the following keys:
   * `NEXTAUTH_SECRET`: Generate a secure string (e.g. `openssl rand -base64 32`).
   * `NEXTAUTH_URL`: Your Vercel deployment root domain (e.g. `https://your-app.vercel.app`).
   * `NEXT_PUBLIC_APP_URL`: Match the domain above.
   * `DATABASE_URL`: Connection string to your production database.
   * `API_BASE_URL`: Path to your api directory (e.g. `https://your-app.vercel.app/api`).
5. Click **Deploy**. Vercel will automatically compile the standalone route bundles and optimize dynamic chunk loading.

---

## 2. Docker Container Deployment

Docker provides environment isolation, making it easy to host on ECS, Kubernetes, or VPS instances.

### Build and Run Singly:
Build the production Docker image locally:
```bash
docker build -t curalink-health .
```

Run the container mapping port 3000:
```bash
docker run -d -p 3000:3000 --name curalink_app \
  -e NEXTAUTH_SECRET=your_32_character_secret \
  -e NEXTAUTH_URL=http://localhost:3000 \
  curalink-health
```

### Orchestration with Docker Compose:
To spin up both the Next.js standalone container and a local PostgreSQL database, use the supplied [docker-compose.yml](file:///f:/sakshant%20project/antigravityb/docker-compose.yml):
```bash
docker-compose up --build -d
```
This automatically configures the database service dependency, volume persistence, and status checks.

---

## 3. Self-Hosted (Bare Metal/VPS)

To run the application directly on virtual instances (Ubuntu/CentOS) using Node.js:

1. Clone the repository and install dependencies:
   ```bash
   npm install --legacy-peer-deps
   ```
2. Build the optimized production bundle:
   ```bash
   npm run build
   ```
3. Set environment variables in system context or a local `.env`:
   ```bash
   export NODE_ENV=production
   export PORT=3000
   export NEXTAUTH_SECRET=your_secret
   export NEXTAUTH_URL=http://your-server-ip:3000
   ```
4. Use a process manager like **PM2** to daemonize execution:
   ```bash
   npm install -g pm2
   pm2 start npm --name "curalink" -- run start
   ```
5. Configure Nginx as a reverse proxy, handling SSL termination (Certbot/Let's Encrypt).
