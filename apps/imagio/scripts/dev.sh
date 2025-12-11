#!/bin/bash

echo "🚀 Starting Imagio Development Environment"

# Stop any existing containers
echo "Stopping existing containers..."
docker-compose -f docker-compose.yml down 2>/dev/null || true
docker-compose -f docker-compose.dev.yml down 2>/dev/null || true

# Build and start development container
echo "Building development container..."
docker-compose -f docker-compose.dev.yml up --build -d

# Show logs
echo "✅ Development server starting..."
echo "🌐 Frontend: http://localhost:3000"
echo "🔍 Health: http://localhost:3000/api/health"
echo ""
echo "📋 Hot-reload enabled for:"
echo "   - /server (API endpoints)"
echo "   - /components (Vue components)"
echo "   - /pages (Nuxt pages)"
echo "   - /prisma (Database schema)"
echo ""
echo "📝 Viewing logs (Ctrl+C to exit):"
docker-compose -f docker-compose.dev.yml logs -f