#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const command = process.argv[2];
const appName = process.argv[3];

function listApps() {
  console.log('📱 Verfügbare Apps:');
  console.log('');
  
  const appsDir = path.join(process.cwd(), 'apps');
  if (!fs.existsSync(appsDir)) {
    console.log('Keine Apps gefunden. Erstelle eine neue App mit:');
    console.log('npm run create-new-app my-app-name');
    return;
  }

  const entries = fs.readdirSync(appsDir, { withFileTypes: true });
  const apps = entries
    .filter(entry => entry.isDirectory())
    .filter(entry => !entry.name.startsWith('.'))
    .map(entry => entry.name);

  if (apps.length === 0) {
    console.log('Keine Apps gefunden. Erstelle eine neue App mit:');
    console.log('npm run create-new-app my-app-name');
    return;
  }

  apps.forEach(app => {
    const packageJsonPath = path.join(appsDir, app, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      const cleanName = app.replace(/-/g, '');
      console.log(`📦 ${app}`);
      console.log(`   ${packageJson.description || 'Keine Beschreibung'}`);
      console.log(`   Scripts: dev:${cleanName}, build:${cleanName}, generate:${cleanName}`);
      console.log('');
    }
  });

  console.log('💡 Alle Apps teilen sich die Dependencies aus dem Root!');
  console.log('   Updates: npm update (im Root-Verzeichnis)');
}

function updateAllDependencies() {
  console.log('📦 Aktualisiere Dependencies für alle Apps...');
  console.log('💡 Da alle Apps Workspaces sind, reicht ein Update im Root!');
  
  try {
    execSync('npm update', { stdio: 'inherit' });
    console.log('✅ Alle Dependencies aktualisiert');
  } catch (error) {
    console.error('❌ Fehler beim Update:', error.message);
  }
}

function buildAll() {
  console.log('🏗️ Build alle Apps...');
  
  const appsDir = path.join(process.cwd(), 'apps');
  if (!fs.existsSync(appsDir)) {
    console.log('Keine Apps gefunden.');
    return;
  }

  const entries = fs.readdirSync(appsDir, { withFileTypes: true });
  const apps = entries
    .filter(entry => entry.isDirectory())
    .filter(entry => !entry.name.startsWith('.'))
    .map(entry => entry.name);

  apps.forEach(app => {
    const packageJsonPath = path.join(appsDir, app, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      console.log(`\n🔧 Build ${app}...`);
      try {
        execSync(`npm run build --workspace=@monorepo/${app}`, { stdio: 'inherit' });
        console.log(`✅ ${app} Build erfolgreich`);
      } catch (error) {
        console.error(`❌ Build Fehler bei ${app}:`, error.message);
      }
    }
  });
}

function deleteApp(appName) {
  if (!appName) {
    console.error('❌ Bitte gib einen App-Namen an');
    return;
  }

  const appPath = path.join(process.cwd(), 'apps', appName);
  if (!fs.existsSync(appPath)) {
    console.error(`❌ App "${appName}" existiert nicht`);
    return;
  }

  // Confirmation
  console.log(`⚠️  Du bist dabei, die App "${appName}" zu löschen.`);
  console.log('Dies kann nicht rückgängig gemacht werden!');
  console.log('');
  console.log('Führe folgenden Befehl aus, um zu bestätigen:');
  console.log(`rm -rf apps/${appName}`);
  console.log('');
  console.log('Danach entferne die Scripts aus der root package.json:');
  console.log(`- dev:${appName.replace(/-/g, '')}`);
  console.log(`- build:${appName.replace(/-/g, '')}`);
  console.log(`- generate:${appName.replace(/-/g, '')}`);
}

function showWorkspaceInfo() {
  console.log('🔧 Workspace Monorepo Information:');
  console.log('');
  console.log('✅ Vorteile dieser Struktur:');
  console.log('   • Ein npm update aktualisiert alle Apps');
  console.log('   • Ein npm install installiert Dependencies für alle Apps');
  console.log('   • Shared Dependencies reduzieren Speicherverbrauch');
  console.log('   • Konsistente Versionen across alle Apps');
  console.log('');
  console.log('📦 Dependency Management:');
  console.log('   • Füge Dependencies im Root package.json hinzu');
  console.log('   • npm install (im Root) installiert für alle Apps');
  console.log('   • npm update (im Root) aktualisiert alle Apps');
  console.log('');
  console.log('🚀 App-spezifische Commands:');
  console.log('   • npm run dev:<app> - Development Server');
  console.log('   • npm run build:<app> - Production Build');
  console.log('   • npm run generate:<app> - Static Generation');
}

switch (command) {
  case 'list':
    listApps();
    break;
  case 'update-all':
    updateAllDependencies();
    break;
  case 'build-all':
    buildAll();
    break;
  case 'delete':
    deleteApp(appName);
    break;
  case 'info':
    showWorkspaceInfo();
    break;
  default:
    console.log('🛠️  Workspace Monorepo Management Script');
    console.log('');
    console.log('Verfügbare Commands:');
    console.log('  list                  - Liste aller Apps anzeigen');
    console.log('  update-all           - Dependencies für alle Apps aktualisieren');
    console.log('  build-all            - Alle Apps builden');
    console.log('  delete <app-name>    - App löschen (mit Bestätigung)');
    console.log('  info                 - Workspace Information anzeigen');
    console.log('');
    console.log('Beispiel:');
    console.log('  node scripts/manage-apps.js list');
    console.log('  node scripts/manage-apps.js update-all');
    console.log('  node scripts/manage-apps.js info');
}