#!/bin/sh
set -e

echo "🔧 Initializing database..."

# Push Prisma schema to database (creates tables if they don't exist)
cd /app/prisma && npx prisma db push --skip-generate

echo "✅ Database initialized!"

# Start the Nuxt server
echo "🚀 Starting Nuxt server..."
exec node /app/.output/server/index.mjs
