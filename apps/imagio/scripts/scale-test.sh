#!/bin/bash

echo "🚀 Starting Scale-Ready Imagio Platform"
echo "======================================="

# Stop any existing containers
echo "🧹 Cleaning up existing containers..."
docker-compose -f docker-compose.yml down 2>/dev/null || true
docker-compose -f docker-compose.dev.yml down 2>/dev/null || true
docker-compose -f docker-compose.scale.yml down 2>/dev/null || true

# Start scale environment
echo "🏗️  Building scale-ready environment..."
docker-compose -f docker-compose.scale.yml up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to start..."
sleep 20

# Health check
echo "🔍 Running health checks..."
echo ""

echo "📊 PostgreSQL Status:"
docker-compose -f docker-compose.scale.yml exec postgres pg_isready -U imagio_user -d imagio

echo ""
echo "🔴 Redis Status:"
docker-compose -f docker-compose.scale.yml exec redis redis-cli ping

echo ""
echo "🌐 Application Health:"
curl -s http://localhost:3000/api/health | jq .

echo ""
echo "✅ Scale Environment Ready!"
echo ""
echo "🔗 Services:"
echo "   - App:        http://localhost:3000"
echo "   - Load Balancer: http://localhost"
echo "   - PostgreSQL: localhost:5432"
echo "   - Redis:      localhost:6379"
echo ""
echo "📋 Management Commands:"
echo "   - View Logs:  docker-compose -f docker-compose.scale.yml logs -f"
echo "   - Stop:       docker-compose -f docker-compose.scale.yml down"
echo "   - Scale App:  docker-compose -f docker-compose.scale.yml up --scale imagio-app=3"
echo ""

# Optionally run load test
read -p "🧪 Run load test? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "🔥 Starting load test..."
    npx autocannon http://localhost:3000/api/health --duration 30 --connections 10
fi