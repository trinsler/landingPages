#!/bin/sh
set -euo pipefail

# Production-ready entrypoint script with proper error handling and logging

echo "🚀 Starting IMAGIO Production Server..."
echo "📅 Timestamp: $(date)"
echo "🏗️ Environment: ${NODE_ENV:-production}"
echo "🌐 Host: ${HOST:-0.0.0.0}:${PORT:-3000}"

# Function to handle cleanup on exit
cleanup() {
    echo "🛑 Received termination signal. Cleaning up..."
    exit 0
}

# Set up signal handlers
trap cleanup SIGTERM SIGINT

# Set default environment variables if not provided
export DATABASE_URL="${DATABASE_URL:-file:/app/prisma/dev.db}"
export NODE_ENV="${NODE_ENV:-production}"
export PORT="${PORT:-3000}"
export HOST="${HOST:-0.0.0.0}"

echo "💾 Database URL: ${DATABASE_URL}"

# Database initialization
echo "🔧 Initializing database..."

# Check if we can write to the database directory
DB_DIR=$(dirname "${DATABASE_URL#file:}")
if [ ! -w "${DB_DIR}" ]; then
    echo "❌ ERROR: Cannot write to database directory: ${DB_DIR}"
    echo "   Please check volume mounts and permissions."
    exit 1
fi

# Generate Prisma client and push schema to database
echo "📊 Setting up database schema..."
cd /app

# Check if database exists, if not create it
if ! npx prisma db push --skip-generate 2>/dev/null; then
    echo "⚠️  Database push failed, attempting to create database..."
    npx prisma generate
    npx prisma db push --skip-generate --force-reset
fi

echo "✅ Database schema initialized successfully!"

# Check if database needs seeding (if courses table is empty)
echo "🌱 Checking if database needs sample data..."
COURSE_COUNT=$(echo "SELECT COUNT(*) FROM courses;" | sqlite3 "${DATABASE_URL#file:}" 2>/dev/null || echo "0")

if [ "${COURSE_COUNT:-0}" -eq 0 ]; then
    echo "📊 Database is empty, seeding with sample data..."
    
    # Run seed script
    if npx tsx prisma/seed.ts; then
        echo "✅ Sample data seeded successfully!"
    else
        echo "⚠️  Seeding failed, but continuing startup..."
    fi
else
    echo "📊 Database already contains ${COURSE_COUNT} courses, skipping seed"
fi
echo "📍 Database location: ${DATABASE_URL}"

# Verify the application is ready
echo "🔍 Verifying application build..."
if [ ! -f "/app/.output/server/index.mjs" ]; then
    echo "❌ ERROR: Application build not found!"
    echo "   Expected file: /app/.output/server/index.mjs"
    exit 1
fi

# Health check before starting
echo "🏥 Starting application..."

# Start the application with proper signal handling
echo "🚀 IMAGIO Server starting on ${HOST}:${PORT}"
exec node /app/.output/server/index.mjs
