#!/usr/bin/env node

/**
 * BetonKo Technology Stack Analyzer
 * Deep analysis of project technologies and architecture
 */

const fs = require('fs');
const path = require('path');

class TechStackAnalyzer {
  constructor() {
    this.analysis = {
      backend: {
        framework: null,
        version: null,
        language: 'PHP',
        database: null,
        dependencies: [],
        architecture: null,
        features: []
      },
      frontend: {
        framework: null,
        version: null,
        language: null,
        buildTool: null,
        dependencies: [],
        features: []
      },
      integration: {
        api: null,
        authentication: null,
        deployment: null
      }
    };
  }

  analyzeBackendStructure() {
    console.log('🔧 Analyzing Backend Structure...');
    
    const backendPaths = [
      'BetonKo-Back-End/BetonKo-master-e42c420df055a2d277f788fec346e2b4d0ab41e7/BetonKo',
      'BetonKo-Back-End'
    ];

    for (const basePath of backendPaths) {
      if (fs.existsSync(basePath)) {
        console.log(`✓ Found backend at: ${basePath}`);
        this.scanForLaravelFiles(basePath);
        this.analyzeComposerFile(basePath);
        this.analyzePackageFile(basePath);
        break;
      }
    }
  }

  analyzeFrontendStructure() {
    console.log('🎨 Analyzing Frontend Structure...');
    
    const frontendPaths = [
      'BetonKo-Front-Endzip/BetonKo-master-1313f1ccc145d6c7b22a3362008f30d9081c3fe9',
      'BetonKo-Front-Endzip'
    ];

    for (const basePath of frontendPaths) {
      if (fs.existsSync(basePath)) {
        console.log(`✓ Found frontend at: ${basePath}`);
        this.analyzeFrontendPackage(basePath);
        this.detectFrontendFramework(basePath);
        break;
      }
    }
  }

  scanForLaravelFiles(basePath) {
    const laravelIndicators = [
      'artisan',
      'composer.json',
      'app/Http/Controllers',
      'routes/web.php',
      'routes/api.php',
      'config/app.php'
    ];

    let laravelScore = 0;
    laravelIndicators.forEach(indicator => {
      if (fs.existsSync(path.join(basePath, indicator))) {
        laravelScore++;
        console.log(`  ✓ Found Laravel indicator: ${indicator}`);
      }
    });

    if (laravelScore >= 3) {
      this.analysis.backend.framework = 'Laravel';
      this.analysis.backend.architecture = 'MVC';
      console.log('🎯 Confirmed: Laravel Framework detected');
    }
  }

  analyzeComposerFile(basePath) {
    const composerPath = path.join(basePath, 'composer.json');
    if (fs.existsSync(composerPath)) {
      try {
        const composer = JSON.parse(fs.readFileSync(composerPath, 'utf8'));
        console.log('📦 Analyzing composer.json...');
        
        if (composer.require) {
          Object.keys(composer.require).forEach(dep => {
            this.analysis.backend.dependencies.push({
              name: dep,
              version: composer.require[dep],
              type: 'production'
            });

            // Detect Laravel version
            if (dep === 'laravel/framework') {
              this.analysis.backend.framework = 'Laravel';
              this.analysis.backend.version = composer.require[dep];
            }
          });
        }

        if (composer['require-dev']) {
          Object.keys(composer['require-dev']).forEach(dep => {
            this.analysis.backend.dependencies.push({
              name: dep,
              version: composer['require-dev'][dep],
              type: 'development'
            });
          });
        }
      } catch (error) {
        console.log(`❌ Error reading composer.json: ${error.message}`);
      }
    }
  }

  analyzePackageFile(basePath) {
    const packagePath = path.join(basePath, 'package.json');
    if (fs.existsSync(packagePath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        console.log('📦 Analyzing backend package.json...');
        
        if (pkg.dependencies) {
          Object.keys(pkg.dependencies).forEach(dep => {
            this.analysis.backend.dependencies.push({
              name: dep,
              version: pkg.dependencies[dep],
              type: 'npm-production'
            });
          });
        }
      } catch (error) {
        console.log(`❌ Error reading backend package.json: ${error.message}`);
      }
    }
  }

  analyzeFrontendPackage(basePath) {
    const packagePath = path.join(basePath, 'package.json');
    if (fs.existsSync(packagePath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        console.log('📦 Analyzing frontend package.json...');
        
        // Detect frontend framework
        if (pkg.dependencies) {
          const deps = Object.keys(pkg.dependencies);
          
          if (deps.includes('vue')) {
            this.analysis.frontend.framework = 'Vue.js';
            this.analysis.frontend.version = pkg.dependencies.vue;
          } else if (deps.includes('react')) {
            this.analysis.frontend.framework = 'React';
            this.analysis.frontend.version = pkg.dependencies.react;
          } else if (deps.includes('@angular/core')) {
            this.analysis.frontend.framework = 'Angular';
            this.analysis.frontend.version = pkg.dependencies['@angular/core'];
          }

          // Detect build tools
          if (deps.includes('vite')) {
            this.analysis.frontend.buildTool = 'Vite';
          } else if (deps.includes('webpack')) {
            this.analysis.frontend.buildTool = 'Webpack';
          }

          // Store all dependencies
          deps.forEach(dep => {
            this.analysis.frontend.dependencies.push({
              name: dep,
              version: pkg.dependencies[dep],
              type: 'production'
            });
          });
        }

        if (pkg.devDependencies) {
          Object.keys(pkg.devDependencies).forEach(dep => {
            this.analysis.frontend.dependencies.push({
              name: dep,
              version: pkg.devDependencies[dep],
              type: 'development'
            });
          });
        }
      } catch (error) {
        console.log(`❌ Error reading frontend package.json: ${error.message}`);
      }
    }
  }

  detectFrontendFramework(basePath) {
    // Look for framework-specific files
    const frameworkFiles = {
      'Vue.js': ['vue.config.js', 'src/main.js', 'src/App.vue'],
      'React': ['src/App.jsx', 'src/App.tsx', 'src/index.js'],
      'Angular': ['angular.json', 'src/app/app.component.ts']
    };

    Object.keys(frameworkFiles).forEach(framework => {
      const files = frameworkFiles[framework];
      const foundFiles = files.filter(file => fs.existsSync(path.join(basePath, file)));
      
      if (foundFiles.length > 0) {
        if (!this.analysis.frontend.framework) {
          this.analysis.frontend.framework = framework;
        }
        console.log(`🎯 ${framework} indicators found: ${foundFiles.join(', ')}`);
      }
    });
  }

  generateComprehensiveReport() {
    console.log('\n🔬 COMPREHENSIVE TECHNOLOGY STACK ANALYSIS');
    console.log('==========================================\n');

    // Backend Report
    console.log('🔧 BACKEND ANALYSIS');
    console.log('-------------------');
    console.log(`Framework: ${this.analysis.backend.framework || 'Unknown'}`);
    console.log(`Version: ${this.analysis.backend.version || 'Unknown'}`);
    console.log(`Language: ${this.analysis.backend.language}`);
    console.log(`Architecture: ${this.analysis.backend.architecture || 'Unknown'}`);
    console.log(`Dependencies: ${this.analysis.backend.dependencies.length} found`);

    if (this.analysis.backend.dependencies.length > 0) {
      console.log('\nKey Backend Dependencies:');
      this.analysis.backend.dependencies
        .filter(dep => dep.type === 'production')
        .slice(0, 10)
        .forEach(dep => {
          console.log(`  • ${dep.name}: ${dep.version}`);
        });
    }

    // Frontend Report
    console.log('\n🎨 FRONTEND ANALYSIS');
    console.log('--------------------');
    console.log(`Framework: ${this.analysis.frontend.framework || 'Unknown'}`);
    console.log(`Version: ${this.analysis.frontend.version || 'Unknown'}`);
    console.log(`Build Tool: ${this.analysis.frontend.buildTool || 'Unknown'}`);
    console.log(`Dependencies: ${this.analysis.frontend.dependencies.length} found`);

    if (this.analysis.frontend.dependencies.length > 0) {
      console.log('\nKey Frontend Dependencies:');
      this.analysis.frontend.dependencies
        .filter(dep => dep.type === 'production')
        .slice(0, 10)
        .forEach(dep => {
          console.log(`  • ${dep.name}: ${dep.version}`);
        });
    }

    // Recommendations
    console.log('\n💡 DEVELOPMENT RECOMMENDATIONS');
    console.log('------------------------------');
    
    if (this.analysis.backend.framework === 'Laravel') {
      console.log('✓ Laravel detected - excellent choice for robust backend');
      console.log('  • Set up .env configuration');
      console.log('  • Run composer install');
      console.log('  • Configure database connection');
      console.log('  • Run php artisan migrate');
    }

    if (this.analysis.frontend.framework) {
      console.log(`✓ ${this.analysis.frontend.framework} detected for frontend`);
      console.log('  • Run npm install');
      console.log('  • Configure API endpoints');
      console.log('  • Set up development server');
    }

    console.log('\n📋 NEXT STEPS');
    console.log('-------------');
    console.log('1. Set up development environment');
    console.log('2. Configure database connections');
    console.log('3. Install dependencies');
    console.log('4. Review API integration points');
    console.log('5. Set up local development servers');
  }

  run() {
    console.log('🚀 Starting Comprehensive Technology Stack Analysis...\n');
    
    this.analyzeBackendStructure();
    console.log('');
    this.analyzeFrontendStructure();
    
    this.generateComprehensiveReport();
  }
}

// Run the analyzer
const analyzer = new TechStackAnalyzer();
analyzer.run();