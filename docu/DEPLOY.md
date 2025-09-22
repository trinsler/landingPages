# Deployment Guide

## 🔄 Development Deployment

Push to `main` branch triggers automatic deployment to development environments:

```bash
git push origin main
```

**URLs:**
- **Coin App:** [coin.trinsler.com](https://coin.trinsler.com)
- **Trinsler App:** [trinsler-develop.trinsler.com](https://trinsler-develop.trinsler.com)

## 🚀 Production Deployment

Create and push a version tag for production deployment:

```bash
git tag v1.0.0
git push origin v1.0.0
```

**URLs:**
- **Coin App:** [coin.trinsler.com](https://coin.trinsler.com)
- **Trinsler App:** [trinsler.com](https://trinsler.com)

## 📋 Tag Naming Convention

Follow [Semantic Versioning](https://semver.org/):

- **Major:** `v1.0.0` (breaking changes)
- **Minor:** `v1.1.0` (new features)
- **Patch:** `v1.0.1` (bug fixes)
- **RC:** `v1.0.0-rc.1` (release candidate)
- **Beta:** `v1.0.0-beta.1` (beta release)

## ⚡ Pipeline

All deployments run tests first. Deployment only occurs if tests pass:

1. **Tests** (TypeScript, Lint, Build)
2. **Component Tests** (Vitest)
3. **Deploy** (Development or Production)

View deployment status in [GitHub Actions](../../actions).