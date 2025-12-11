#!/bin/sh
# Health check script for scale-ready deployment

# Check if the app is responding
HEALTH_URL="http://localhost:3000/api/health"

# Use curl with timeout
RESPONSE=$(curl -s -w "%{http_code}" --connect-timeout 5 --max-time 10 $HEALTH_URL)
HTTP_CODE=$(echo $RESPONSE | tail -c 4)

if [ "$HTTP_CODE" = "200" ]; then
    echo "✅ Health check passed"
    exit 0
else
    echo "❌ Health check failed (HTTP $HTTP_CODE)"
    exit 1
fi