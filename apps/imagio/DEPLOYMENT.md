# IMAGIO Production Deployment Guide

## 🚀 Quick Start

### 1. Environment Setup
```bash
# Set production JWT secret (CRITICAL for security)
export JWT_SECRET="your-super-secure-256-bit-random-key-here"

# Optional: Set custom database path
export DATABASE_URL="file:/data/production.db"
```

### 2. Deploy with Docker Compose
```bash
# Build and start production container
npm run prod:deploy

# Check health status
npm run prod:health

# View logs
npm run prod:logs
```

### 3. Access Application
- **Application**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin
- **Health Check**: http://localhost:3000/api/health

## 📋 Manual Deployment Steps

### Build Production Image
```bash
docker build -t imagio:latest .
```

### Run Production Container
```bash
docker run -d \
  --name imagio-production \
  -p 3000:3000 \
  -v imagio_data:/data \
  -e DATABASE_URL="file:/data/production.db" \
  -e JWT_SECRET="your-secure-jwt-secret" \
  --restart unless-stopped \
  imagio:latest
```

## 🔧 Configuration

### Environment Variables
- `DATABASE_URL`: SQLite database path (default: `file:/data/production.db`)
- `JWT_SECRET`: **CRITICAL** - Change this in production!
- `NODE_ENV`: Set to `production`
- `PORT`: Application port (default: 3000)
- `HOST`: Bind address (default: 0.0.0.0)
- `LOG_LEVEL`: Logging level (default: info)

### Volume Mounts
- `/data`: Persistent database storage
- `/app/logs`: Application logs (optional)

## 🔒 Security Checklist

- [ ] **JWT_SECRET** changed from default value
- [ ] Database volume properly mounted
- [ ] Container runs as non-root user
- [ ] Resource limits configured
- [ ] Health checks enabled
- [ ] Logs properly configured

## 📊 Monitoring

### Health Check
```bash
curl http://localhost:3000/api/health
```

### View Logs
```bash
docker logs imagio-production -f
```

### Resource Usage
```bash
docker stats imagio-production
```

## 🛠️ Maintenance

### Update Application
```bash
# Stop container
docker-compose down

# Rebuild with latest changes
npm run prod:deploy
```

### Database Backup
```bash
# Copy database from container volume
docker cp imagio-production:/data/production.db ./backup-$(date +%Y%m%d).db
```

### Restart Services
```bash
npm run prod:restart
```

### Clean Docker System
```bash
npm run docker:clean
```

## 🚨 Troubleshooting

### Container Won't Start
```bash
# Check logs
docker logs imagio-production

# Check health
docker inspect imagio-production
```

### Database Issues
```bash
# Connect to container
docker exec -it imagio-production sh

# Check database
sqlite3 /data/production.db ".tables"
```

### Permission Issues
```bash
# Fix volume permissions
docker volume inspect imagio_production_data
```

## 📈 Production Optimizations

### Resource Limits (docker-compose.yml)
```yaml
deploy:
  resources:
    limits:
      cpus: '1.0'
      memory: 512M
```

### Reverse Proxy (Nginx)
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### SSL/TLS with Let's Encrypt
```bash
# Install Certbot
sudo apt install certbot

# Get certificate
sudo certbot certonly --standalone -d your-domain.com
```

## 🔄 CI/CD Integration

### GitHub Actions Example
```yaml
name: Deploy IMAGIO
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy
        run: |
          docker-compose up --build -d
```

## 📞 Support

- Check logs: `npm run prod:logs`
- Health status: `npm run prod:health`
- Restart: `npm run prod:restart`