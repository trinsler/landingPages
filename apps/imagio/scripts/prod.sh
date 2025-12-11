#!/bin/bash

echo "🏭 Starting Imagio Production Environment"

# Stop development containers
echo "Stopping development containers..."
docker-compose -f docker-compose.dev.yml down 2>/dev/null || true

# Build and start production container
echo "Building production container..."
docker-compose -f docker-compose.yml up --build -d

echo "✅ Production server started"
echo "🌐 Application: http://localhost:3000"
echo "🔍 Health: http://localhost:3000/api/health"
echo ""
echo "📝 Viewing logs (Ctrl+C to exit):"
docker-compose -f docker-compose.yml logs -f