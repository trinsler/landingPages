#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Get app name from command line arguments
const appName = process.argv[2];

if (!appName) {
  console.error('❌ Bitte gib einen App-Namen an:');
  console.log('Usage: npm run create-new-app my-new-app');
  process.exit(1);
}

// Validate app name
if (!/^[a-z0-9-]+$/.test(appName)) {
  console.error('❌ App-Name darf nur Kleinbuchstaben, Zahlen und Bindestriche enthalten');
  process.exit(1);
}

// Check if app already exists
const appPath = path.join(process.cwd(), 'apps', appName);
if (fs.existsSync(appPath)) {
  console.error(`❌ App "${appName}" existiert bereits in apps/${appName}!`);
  process.exit(1);
}

console.log(`🚀 Erstelle neue App: ${appName}`);

try {
  // Copy coin-boilerplate-app to new app directory
  console.log('📁 Kopiere Boilerplate...');
  execSync(`cp -r apps/coin-boilerplate-app ${appPath}`, { stdio: 'inherit' });

  // Read and update package.json
  const packageJsonPath = path.join(appPath, 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // Update package.json with new app name
  packageJson.name = `@monorepo/${appName}`;
  packageJson.description = `${appName} - Nuxt 3 App with OAuth, Coin Purchase System and Stripe Integration`;
  
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  // Update app.vue title
  const appVuePath = path.join(appPath, 'app.vue');
  if (fs.existsSync(appVuePath)) {
    let appVueContent = fs.readFileSync(appVuePath, 'utf8');
    appVueContent = appVueContent.replace(
      'CoinApp - Secure Digital Coin Platform',
      `${appName} - Secure Digital Coin Platform`
    );
    fs.writeFileSync(appVuePath, appVueContent);
  }

  // Update layout with app name
  const layoutPath = path.join(appPath, 'layouts', 'default.vue');
  if (fs.existsSync(layoutPath)) {
    let layoutContent = fs.readFileSync(layoutPath, 'utf8');
    layoutContent = layoutContent.replace(/CoinApp/g, appName);
    fs.writeFileSync(layoutPath, layoutContent);
  }

  // Update index page
  const indexPath = path.join(appPath, 'pages', 'index.vue');
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8');
    indexContent = indexContent.replace(/CoinApp/g, appName);
    fs.writeFileSync(indexPath, indexContent);
  }

  // Remove .github folder from new app (keep only in original)
  const githubPath = path.join(appPath, '.github');
  if (fs.existsSync(githubPath)) {
    execSync(`rm -rf ${githubPath}`);
  }

  // Update root package.json with new app scripts
  const rootPackageJsonPath = path.join(process.cwd(), 'package.json');
  const rootPackageJson = JSON.parse(fs.readFileSync(rootPackageJsonPath, 'utf8'));
  
  // Add scripts for new app
  const cleanAppName = appName.replace(/-/g, '');
  rootPackageJson.scripts[`dev:${cleanAppName}`] = `npm run dev --workspace=@monorepo/${appName}`;
  rootPackageJson.scripts[`build:${cleanAppName}`] = `npm run build --workspace=@monorepo/${appName}`;
  rootPackageJson.scripts[`generate:${cleanAppName}`] = `npm run generate --workspace=@monorepo/${appName}`;
  rootPackageJson.scripts[`typecheck:${cleanAppName}`] = `npm run typecheck --workspace=@monorepo/${appName}`;

  fs.writeFileSync(rootPackageJsonPath, JSON.stringify(rootPackageJson, null, 2));

  console.log('✅ App erfolgreich erstellt!');
  console.log('');
  console.log('📋 Nächste Schritte:');
  console.log(`1. cd apps/${appName}`);
  console.log('2. cp .env.example .env');
  console.log('3. Fülle die Environment Variables in .env aus');
  console.log('');
  console.log('🎉 Dann nutze die Root-Scripts (aus dem Root-Verzeichnis):');
  console.log(`- npm run dev:${cleanAppName}      # Development Server starten`);
  console.log(`- npm run build:${cleanAppName}    # Production Build`);
  console.log(`- npm run generate:${cleanAppName} # Static Generation`);
  console.log('');
  console.log('💡 Alle Dependencies sind bereits im Root installiert!');
  console.log('   Updates machst du mit: npm update (im Root)');

} catch (error) {
  console.error('❌ Fehler beim Erstellen der App:', error.message);
  
  // Cleanup on error
  if (fs.existsSync(appPath)) {
    execSync(`rm -rf ${appPath}`);
  }
  
  process.exit(1);
}