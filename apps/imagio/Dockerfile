# ==========================================
# MULTI-STAGE DOCKERFILE FOR PRODUCTION
# ==========================================

# ==========================================
# STAGE 1: Dependencies
# ==========================================
FROM node:20-alpine AS deps

WORKDIR /app

# Install system dependencies including SQLite
RUN apk add --no-cache \
    libc6-compat \
    openssl \
    sqlite \
    ca-certificates

# Copy package files for better caching
COPY package.json package-lock.json* ./

# Install dependencies with npm ci for production
RUN npm ci --only=production --no-audit --prefer-offline && \
    npm cache clean --force

# ==========================================
# STAGE 2: Builder
# ==========================================
FROM node:20-alpine AS builder

WORKDIR /app

# Install build dependencies
RUN apk add --no-cache \
    libc6-compat \
    openssl \
    sqlite

# Copy node_modules from deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# Generate Prisma Client for production
RUN npx prisma generate

# Build the application
RUN npm run build

# ==========================================
# STAGE 3: Production Runner
# ==========================================
FROM node:20-alpine AS runner

WORKDIR /app

# Install runtime dependencies
RUN apk add --no-cache \
    openssl \
    sqlite \
    ca-certificates \
    tini

# Create dedicated user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nuxtjs --ingroup nodejs

# Create data directory with proper permissions
RUN mkdir -p /data && \
    chown nuxtjs:nodejs /data && \
    chmod 755 /data

# Copy application files
COPY --from=builder --chown=nuxtjs:nodejs /app/.output ./.output
COPY --from=deps --chown=nuxtjs:nodejs /app/node_modules ./node_modules

# Copy Prisma configuration and seed script
COPY --chown=nuxtjs:nodejs prisma/schema.prisma ./prisma/schema.prisma
COPY --chown=nuxtjs:nodejs prisma/seed.ts ./prisma/seed.ts
COPY --chown=nuxtjs:nodejs docker-entrypoint.sh ./docker-entrypoint.sh

# Make entrypoint executable
RUN chmod +x ./docker-entrypoint.sh

# Switch to non-root user
USER nuxtjs

# Health check for production monitoring
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => process.exit(r.statusCode === 200 ? 0 : 1))"

EXPOSE 3000

# Use tini as PID 1 for proper signal handling
ENTRYPOINT ["/sbin/tini", "--"]
CMD ["./docker-entrypoint.sh"]
