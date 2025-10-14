# syntax=docker/dockerfile:1

# ---------- Builder ----------
FROM node:20-bookworm-slim AS builder
WORKDIR /app

# Root manifests first for better caching
COPY package.json package-lock.json* ./
COPY vite.config.ts ./
COPY tsconfig.json ./
COPY tailwind.config.ts ./
COPY postcss.config.js ./
COPY components.json ./

# App sources
COPY client ./client
COPY server ./server
COPY shared ./shared
COPY attached_assets ./attached_assets

# Install deps and build (includes client and server)
RUN npm ci
RUN npm run build

# ---------- Runtime ----------
FROM node:20-bookworm-slim AS runner
ENV NODE_ENV=production
WORKDIR /app

# Only copy built output
COPY --from=builder /app/dist /app/dist

# Expose and run
EXPOSE 5001
ENV PORT=5001
CMD ["node", "/app/dist/index.cjs"]
