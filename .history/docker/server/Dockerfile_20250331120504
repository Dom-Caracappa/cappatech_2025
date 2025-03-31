# ---- Builder Stage ----
FROM node:20-alpine AS builder

# Build tools for native modules like better-sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

# Copy deps
COPY docker/server/app/package.json ./
COPY docker/server/app/pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install deps and compile native modules
RUN pnpm install --ignore-scripts && pnpm rebuild better-sqlite3

# Copy the rest of the source
COPY docker/server/app ./

# ---- Runner Stage ----
FROM node:20-alpine

WORKDIR /app

# Copy built app from builder
COPY --from=builder /app ./

EXPOSE 5042

CMD ["pnpm", "exec", "tsx", "index.mts"]
