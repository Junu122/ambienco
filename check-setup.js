#!/usr/bin/env node

/**
 * Ambienco Setup Checker
 * Verifies that all required files and configurations are in place
 */

import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function checkFile(path, name) {
  const fullPath = join(__dirname, path);
  if (existsSync(fullPath)) {
    log(`✓ ${name} exists`, colors.green);
    return true;
  } else {
    log(`✗ ${name} is missing!`, colors.red);
    return false;
  }
}

function checkPackageJson() {
  try {
    const pkgPath = join(__dirname, 'package.json');
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8'));
    
    log('\n📦 Checking package.json dependencies...', colors.cyan);
    
    const requiredDeps = {
      'react': pkg.dependencies?.react,
      'react-dom': pkg.dependencies?.['react-dom'],
      'lucide-react': pkg.dependencies?.['lucide-react'],
      'motion': pkg.dependencies?.motion,
    };
    
    const requiredDevDeps = {
      'tailwindcss': pkg.devDependencies?.tailwindcss,
      '@tailwindcss/postcss': pkg.devDependencies?.['@tailwindcss/postcss'],
      'vite': pkg.devDependencies?.vite,
      'typescript': pkg.devDependencies?.typescript,
    };
    
    let allGood = true;
    
    Object.entries(requiredDeps).forEach(([name, version]) => {
      if (version) {
        log(`  ✓ ${name}: ${version}`, colors.green);
      } else {
        log(`  ✗ ${name} is missing!`, colors.red);
        allGood = false;
      }
    });
    
    Object.entries(requiredDevDeps).forEach(([name, version]) => {
      if (version) {
        log(`  ✓ ${name}: ${version}`, colors.green);
      } else {
        log(`  ✗ ${name} is missing!`, colors.red);
        allGood = false;
      }
    });
    
    return allGood;
  } catch (error) {
    log(`✗ Error reading package.json: ${error.message}`, colors.red);
    return false;
  }
}

function checkTailwindSetup() {
  log('\n🎨 Checking Tailwind CSS v4 setup...', colors.cyan);
  
  let allGood = true;
  
  // Check PostCSS config
  if (checkFile('postcss.config.js', 'PostCSS config')) {
    const postcssPath = join(__dirname, 'postcss.config.js');
    const postcssContent = readFileSync(postcssPath, 'utf8');
    if (postcssContent.includes('@tailwindcss/postcss')) {
      log('  ✓ PostCSS configured for Tailwind v4', colors.green);
    } else {
      log('  ✗ PostCSS not properly configured for Tailwind v4', colors.red);
      allGood = false;
    }
  } else {
    allGood = false;
  }
  
  // Check globals.css
  if (checkFile('styles/globals.css', 'Global CSS')) {
    const cssPath = join(__dirname, 'styles/globals.css');
    const cssContent = readFileSync(cssPath, 'utf8');
    if (cssContent.includes('@import "tailwindcss"')) {
      log('  ✓ Tailwind imported in globals.css', colors.green);
    } else {
      log('  ✗ Tailwind not imported in globals.css', colors.red);
      allGood = false;
    }
  } else {
    allGood = false;
  }
  
  // Check tailwind.config.js
  checkFile('tailwind.config.js', 'Tailwind config');
  
  return allGood;
}

function main() {
  log('\n╔════════════════════════════════════════╗', colors.cyan);
  log('║   AMBIENCO SETUP VERIFICATION TOOL    ║', colors.cyan);
  log('╚════════════════════════════════════════╝\n', colors.cyan);
  
  log('📋 Checking essential files...', colors.cyan);
  
  const files = [
    ['main.tsx', 'Main entry point'],
    ['App.tsx', 'App component'],
    ['index.html', 'HTML template'],
    ['vite.config.ts', 'Vite config'],
    ['tsconfig.json', 'TypeScript config'],
  ];
  
  let filesOk = true;
  files.forEach(([path, name]) => {
    if (!checkFile(path, name)) {
      filesOk = false;
    }
  });
  
  const pkgOk = checkPackageJson();
  const tailwindOk = checkTailwindSetup();
  
  log('\n═══════════════════════════════════════', colors.cyan);
  
  if (filesOk && pkgOk && tailwindOk) {
    log('\n✅ All checks passed!', colors.green);
    log('\n📝 Next steps:', colors.blue);
    log('   1. Run: npm install', colors.yellow);
    log('   2. Run: npm run dev', colors.yellow);
    log('   3. Open: http://localhost:3000\n', colors.yellow);
  } else {
    log('\n❌ Some issues were found!', colors.red);
    log('\n📝 Recommended actions:', colors.blue);
    log('   1. Run: npm install', colors.yellow);
    log('   2. Check /LOCAL-SETUP-GUIDE.md for details', colors.yellow);
    log('   3. Ensure all files are present', colors.yellow);
    log('   4. Contact support if issues persist\n', colors.yellow);
  }
  
  log('═══════════════════════════════════════\n', colors.cyan);
  log('Built by Unaise | Contact: +966 570514881\n', colors.cyan);
}

main();
