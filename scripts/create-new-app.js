#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const readline = require('readline');

// Get app name from command line arguments
const appName = process.argv[2];

if (!appName) {
  console.error('❌ Bitte gib einen App-Namen an:');
  console.log('Usage: npm run create-new-app my-new-app');
  process.exit(1);
}

// Helper function to get user input
function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

// Get available app templates
function getAvailableApps() {
  const appsDir = path.join(process.cwd(), 'apps');
  if (!fs.existsSync(appsDir)) return [];

  return fs.readdirSync(appsDir)
    .filter(item => {
      const itemPath = path.join(appsDir, item);
      return fs.statSync(itemPath).isDirectory();
    });
}

// Create standard Nuxt folder structure
function createStandardNuxtFolders(appPath) {
  // Create directories (like coin-boilerplate-app)
  const folders = ['pages', 'layouts', 'assets', 'components'];
  folders.forEach(folder => {
    const folderPath = path.join(appPath, folder);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
  });

  // Create default layout
  const defaultLayoutPath = path.join(appPath, 'layouts', 'default.vue');
  if (!fs.existsSync(defaultLayoutPath)) {
    const defaultLayoutContent = `<template>
  <div>
    <main>
      <slot />
    </main>
  </div>
</template>

<style scoped>
/* Add your global styles here */
</style>
`;
    fs.writeFileSync(defaultLayoutPath, defaultLayoutContent);
  }

  // Create index page
  const indexPagePath = path.join(appPath, 'pages', 'index.vue');
  if (!fs.existsSync(indexPagePath)) {
    const indexPageContent = `<template>
  <div class="container">
    <h1>Welcome to your new Nuxt app!</h1>
    <p>Start building something amazing.</p>
  </div>
</template>

<style scoped>
.container {
  padding: 2rem;
  text-align: center;
}

h1 {
  color: #2563eb;
  margin-bottom: 1rem;
}

p {
  color: #6b7280;
}
</style>
`;
    fs.writeFileSync(indexPagePath, indexPageContent);
  }
}

// Update template-specific content when copying an app
function updateTemplateContent(appPath, templateApp, appName) {
  // Update app.vue title if it exists
  const appVuePath = path.join(appPath, 'app.vue');
  if (fs.existsSync(appVuePath)) {
    let appVueContent = fs.readFileSync(appVuePath, 'utf8');

    // Replace common patterns
    if (templateApp === 'coin-boilerplate-app') {
      appVueContent = appVueContent.replace(
        'CoinApp - Secure Digital Coin Platform',
        `${appName} - Secure Digital Coin Platform`
      );
    }

    fs.writeFileSync(appVuePath, appVueContent);
  }

  // Update layout with app name
  const layoutPath = path.join(appPath, 'layouts', 'default.vue');
  if (fs.existsSync(layoutPath)) {
    let layoutContent = fs.readFileSync(layoutPath, 'utf8');

    if (templateApp === 'coin-boilerplate-app') {
      layoutContent = layoutContent.replace(/CoinApp/g, appName);
    }

    fs.writeFileSync(layoutPath, layoutContent);
  }

  // Update index page
  const indexPath = path.join(appPath, 'pages', 'index.vue');
  if (fs.existsSync(indexPath)) {
    let indexContent = fs.readFileSync(indexPath, 'utf8');

    if (templateApp === 'coin-boilerplate-app') {
      indexContent = indexContent.replace(/CoinApp/g, appName);
    }

    fs.writeFileSync(indexPath, indexContent);
  }
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

async function main() {
  console.log(`🚀 Erstelle neue App: ${appName}`);

  // Ask user what type of app to create
  console.log('\n📋 Wähle eine Option:');
  console.log('1. Leere Nuxt-App erstellen');
  console.log('2. Bestehende App kopieren');

  const choice = await askQuestion('\nWähle Option (1 oder 2): ');

  let templateApp = null;

  if (choice === '1') {
    console.log('📦 Erstelle leere Nuxt-App...');
  } else if (choice === '2') {
    const availableApps = getAvailableApps();

    if (availableApps.length === 0) {
      console.error('❌ Keine Apps zum Kopieren verfügbar!');
      process.exit(1);
    }

    console.log('\n📁 Verfügbare Apps:');
    availableApps.forEach((app, index) => {
      console.log(`${index + 1}. ${app}`);
    });

    const appChoice = await askQuestion(`\nWähle App zum Kopieren (1-${availableApps.length}): `);
    const selectedIndex = parseInt(appChoice) - 1;

    if (selectedIndex < 0 || selectedIndex >= availableApps.length) {
      console.error('❌ Ungültige Auswahl!');
      process.exit(1);
    }

    templateApp = availableApps[selectedIndex];
    console.log(`📁 Kopiere ${templateApp}...`);
  } else {
    console.error('❌ Ungültige Auswahl!');
    process.exit(1);
  }

try {
  if (choice === '1') {
    // Create empty Nuxt app
    console.log('📦 Erstelle leere Nuxt-App mit nuxi...');
    execSync(`npx nuxi@latest init ${appPath} --no-install --package-manager pnpm`, { stdio: 'inherit' });

    // Update package.json for monorepo
    const packageJsonPath = path.join(appPath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    packageJson.name = `@monorepo/${appName}`;
    packageJson.type = 'module';
    packageJson.version = '1.0.0';
    packageJson.description = `${appName} - Nuxt 3 App`;
    packageJson.author = 'Niels';
    packageJson.license = 'MIT';

    // Remove redundant Nuxt dependencies (they're in root monorepo)
    packageJson.dependencies = {
      '@monorepo/shared': 'workspace:*',
    };

    // Add missing scripts and ensure proper order
    packageJson.scripts = {
      build: 'nuxt build',
      dev: 'nuxt dev',
      generate: 'nuxt generate',
      preview: 'nuxt preview',
      postinstall: 'nuxt prepare',
      clean: 'rm -rf .nuxt .output dist',
      typecheck: 'nuxt typecheck'
    };

    // Add keywords for consistency
    packageJson.keywords = ['nuxt', 'typescript', 'monorepo'];

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Create standard Nuxt folder structure
    console.log('📁 Erstelle Standard-Ordnerstruktur...');
    createStandardNuxtFolders(appPath);

  } else {
    // Copy existing app
    execSync(`cp -r apps/${templateApp} ${appPath}`, { stdio: 'inherit' });

    // Read and update package.json
    const packageJsonPath = path.join(appPath, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    // Update package.json with new app name and ensure consistency
    packageJson.name = `@monorepo/${appName}`;
    packageJson.type = 'module';
    packageJson.description = `${appName} - Copied from ${templateApp}`;

    // Ensure consistent script order and clean structure
    const baseScripts = {
      build: 'nuxt build',
      dev: 'nuxt dev',
      generate: 'nuxt generate',
      preview: 'nuxt preview',
      postinstall: 'nuxt prepare',
      clean: 'rm -rf .nuxt .output dist',
      typecheck: 'nuxt typecheck'
    };

    // Keep any additional scripts from template, but ensure base scripts are consistent
    packageJson.scripts = { ...baseScripts, ...packageJson.scripts };

    // Ensure keywords exist
    if (!packageJson.keywords) {
      packageJson.keywords = ['nuxt', 'typescript', 'monorepo'];
    }

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    // Update template-specific content
    updateTemplateContent(appPath, templateApp, appName);

    // Remove .github folder from new app (keep only in original)
    const githubPath = path.join(appPath, '.github');
    if (fs.existsSync(githubPath)) {
      execSync(`rm -rf ${githubPath}`);
    }
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
}

// Run the main function
main().catch(error => {
  console.error('❌ Unerwarteter Fehler:', error.message);
  process.exit(1);
});