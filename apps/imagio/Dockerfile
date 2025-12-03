# ==========================================
# STAGE 1: Dependencies
# ==========================================
FROM node:20-alpine AS deps

WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

# Copy only package files for better caching
COPY package.json package-lock.json* ./

# Install dependencies
RUN npm ci

# ==========================================
# STAGE 2: Builder
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache libc6-compat openssl

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy source code
COPY . .

# Generate Prisma Client
RUN npx prisma generate

# Build Nuxt (prebuild hook erstellt tsconfig.app.json automatisch!)
RUN npm run build

# ==========================================
# STAGE 3: Runner (Production)
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

RUN apk add --no-cache openssl

# Create non-root user
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nuxtjs

# Copy only production files
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output
COPY --from=builder --chown=nuxtjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nuxtjs:nodejs /app/prisma ./prisma
COPY --chown=nuxtjs:nodejs docker-entrypoint.sh /app/docker-entrypoint.sh

# Make entrypoint script executable
RUN chmod +x /app/docker-entrypoint.sh

USER nuxtjs

EXPOSE 3000

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

CMD ["/app/docker-entrypoint.sh"]
