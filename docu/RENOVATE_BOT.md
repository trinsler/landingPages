# 🤖 Automated Dependency Management with Renovate

This document describes the automated dependency management setup using Renovate Bot with built-in supply chain security protection.

## 🔒 Supply Chain Security

**IMPORTANT**: This setup protects against supply chain attacks by enforcing a **5-day minimum age** for all dependency updates (except security vulnerabilities).

### Security Features

- ✅ **5-day minimum age** for all packages before updates
- ✅ **Immediate security updates** for vulnerabilities
- ✅ **Package reputation scoring** via Renovate's merge confidence
- ✅ **Automatic security advisory integration**
- ✅ **OSV vulnerability database** monitoring
- ✅ **Manual review required** for all updates (no auto-merge)

## 🚀 Setup Instructions

### 1. Install Renovate GitHub App

1. Go to [GitHub Marketplace](https://github.com/marketplace/renovate)
2. Click "Set up a plan" → "Install for free"
3. Choose your account/organization
4. Select "Selected repositories" → Choose `landingPages`
5. Click "Install & Authorize"

Renovate UI: https://developer.mend.io/github/trinsler

### 2. Repository Configuration

The repository is already configured with `renovate.json` in the root directory with:

- **Supply Chain Protection**: 5-day minimum age
- **Security Exception**: Immediate updates for vulnerabilities
- **Intelligent Grouping**: Related packages in single PRs
- **Monorepo Support**: Automatic detection of workspace packages
- **Testing Integration**: Works with existing CI/CD pipeline

### 3. First Run

After installation, Renovate will:

1. **Scan** all package.json files in the monorepo
2. **Create Dependency Dashboard** issue for overview
3. **Generate PRs** for outdated dependencies (5+ days old)
4. **Skip recent packages** that are < 5 days old

## 📋 How It Works

### Weekly Update Schedule

- **Every Monday before 6 AM** (Berlin time)
- Maximum **5 concurrent branches**
- Maximum **10 concurrent PRs**

### Update Categories

1. **🚨 Security Updates** (Immediate)
   - Vulnerability fixes bypass age restriction
   - Labeled as `security` + `vulnerability`
   - Highest priority (10)

2. **📦 Major Updates** (7-day minimum age)
   - Breaking changes
   - Separate PRs for each package
   - Labeled as `major-update` + `needs-manual-review`
   - Lower priority (-10)

3. **🔄 Minor/Patch Updates** (5-day minimum age)
   - Grouped together when possible
   - Normal priority (0)

### Package Groups

Renovate automatically groups related packages:

- **Nuxt Ecosystem**: `nuxt`, `@nuxtjs/*`, `@pinia/nuxt`
- **ESLint Ecosystem**: `eslint`, `@typescript-eslint/*`, `eslint-plugin-vue`
- **Testing Ecosystem**: `vitest`, `@vitest/*`, `@vue/test-utils`
- **TypeScript Ecosystem**: `typescript`, `vue-tsc`, `@types/*`

### Branch Naming

- `renovate/security-{package}` - Security updates
- `renovate/major-{package}` - Major updates
- `renovate/non-major-dependencies` - Grouped minor/patch updates
- `renovate/lock-file-maintenance` - Monthly lockfile refresh

## 🔍 Dependency Dashboard

Renovate creates a **Dependency Dashboard** issue that shows:

- 📊 **Update Overview**: Pending, open, and rate-limited updates
- 🔒 **Security Status**: Vulnerability alerts and fixes
- ⚠️ **Issues**: Configuration problems or conflicts
- 📈 **Statistics**: Update success rates and timing

Access: Go to Issues → Look for "🤖 Dependency Dashboard"

## 🧪 Testing Integration

All Renovate PRs automatically trigger:

1. **TypeScript Check**: `pnpm run typecheck`
2. **Linting**: `pnpm run lint`
3. **Build Tests**: `pnpm run test:build`
4. **Component Tests**: `pnpm test:run`
5. **App Builds**: All three apps must build successfully

**No PR will be mergeable without passing all tests.**

## 🛡️ Security Review Process

### For Security Updates (Immediate)

1. **Review PR** - Check vulnerability details
2. **Verify Tests** - Ensure all tests pass
3. **Security Impact** - Assess if changes introduce new risks
4. **Merge Priority** - Security fixes should be merged quickly

### For Regular Updates (5+ days old)

1. **Check Age Badge** - Verify package is 5+ days old
2. **Review Changelog** - Look for breaking changes
3. **Test Coverage** - Ensure tests still pass
4. **Breaking Changes** - Pay special attention to major updates
5. **Merge** - Safe to merge after review

## 📝 Manual Dependency Updates

### Emergency Updates (Override Age Restriction)

If you need to update a package that's < 5 days old:

```bash
# Update specific package manually
pnpm update package-name

# Or update all to latest
pnpm update

# Run tests
pnpm run typecheck && pnpm test:build && pnpm test:run

# Commit and push
git add . && git commit -m "chore(deps): emergency update package-name"
```

### Check Package Age Before Manual Updates

```bash
# Check when package was published
npm view package-name time --json

# Check specific version age
npm view package-name@version time
```

## 🚨 Supply Chain Attack Prevention

### What We Protect Against

- **Malicious Package Injection**: New packages by untrusted maintainers
- **Account Takeovers**: Compromised maintainer accounts
- **Typosquatting**: Similar package names with malicious intent
- **Dependency Confusion**: Internal vs external package conflicts

### How Our 5-Day Rule Helps

- **Community Detection**: Security researchers find issues within days
- **Maintainer Response**: Legitimate maintainers fix issues quickly
- **Automated Scanning**: Security tools flag suspicious packages
- **Manual Review Time**: Gives time for manual verification

### Security Exception Process

Only security vulnerabilities bypass the 5-day rule:

1. **CVE/Security Advisory** triggers immediate update
2. **Manual Review** still required before merge
3. **Test Validation** must pass
4. **Security Team** notification (if applicable)

## 🔧 Configuration Customization

### Modify Update Schedule

Edit `renovate.json`:

```json
{
  "schedule": ["before 6am on monday"]  // Current
  "schedule": ["every weekend"]         // Alternative
}
```

### Adjust Age Restrictions

```json
{
  "minimumReleaseAge": "5 days", // Current (recommended)
  "minimumReleaseAge": "7 days" // More conservative
}
```

### Add Package Exceptions

```json
{
  "packageRules": [
    {
      "matchPackageNames": ["trusted-package"],
      "minimumReleaseAge": "1 day"
    }
  ]
}
```

## 📊 Monitoring and Metrics

### Dependency Dashboard Metrics

- **Update Success Rate**: % of successful updates
- **Security Response Time**: Time from CVE to fix
- **Age Compliance**: % of updates respecting 5-day rule
- **Test Pass Rate**: % of PRs passing all tests

### Monthly Review

1. **Security Updates**: How many and response time
2. **Blocked Updates**: Packages < 5 days old
3. **Failed Tests**: Updates that broke functionality
4. **Update Velocity**: Time from PR to merge

## 🆘 Troubleshooting

### Renovate Not Creating PRs

1. Check **Dependency Dashboard** for errors
2. Verify **GitHub App permissions**
3. Review **renovate.json syntax** (use online validator)
4. Check **rate limits** (GitHub API)

### Tests Failing on Renovate PRs

1. **Local Reproduction**: `git checkout renovate/branch-name`
2. **Run Tests Locally**: `pnpm test:build && pnpm test:run`
3. **Check Logs**: Look for specific test failures
4. **Fix Issues**: Update tests or fix compatibility

### Security Update Blocked

1. **Override Age Restriction**: Manual update process
2. **Emergency Process**: Skip normal review for critical CVEs
3. **Hotfix Branch**: Create emergency fix branch

### Package Age Verification

```bash
# Check package publication date
npm view package-name time.created
npm view package-name@latest time

# Calculate days since publication
node -e "console.log(Math.floor((Date.now() - new Date('2024-01-01').getTime()) / (1000*60*60*24)) + ' days')"
```

## 📚 Additional Resources

- [Renovate Documentation](https://docs.renovatebot.com/)
- [GitHub Security Advisories](https://github.com/advisories)
- [Supply Chain Security Best Practices](https://slsa.dev/)
- [npm Security Guidelines](https://docs.npmjs.com/security)

---

## ⚡ Quick Commands

```bash
# Check dependency status
pnpm outdated

# Update all dependencies (manual)
pnpm update

# Check for security vulnerabilities
pnpm audit

# Fix security vulnerabilities
pnpm audit fix

# Test after updates
pnpm run typecheck && pnpm test:build && pnpm test:run

# Check package age
npm view package-name time
```

**Remember**: Always review PRs carefully, especially major updates and security fixes! 🔒
