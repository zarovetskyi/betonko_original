#!/usr/bin/env node

/**
 * BetonKo Architecture Analyzer
 * Analyzes project architecture patterns and structure
 */

const fs = require('fs');
const path = require('path');

class ArchitectureAnalyzer {
  constructor() {
    this.architecture = {
      pattern: null,
      backend: {
        structure: null,
        layers: [],
        patterns: [],
        apiDesign: null
      },
      frontend: {
        structure: null,
        patterns: [],
        stateManagement: null,
        routing: null
      },
      integration: {
        apiStyle: null,
        authentication: null,
        dataFlow: null
      },
      recommendations: []
    };
  }

  analyzeOverallArchitecture() {
    console.log('🏗️  ARCHITECTURE PATTERN ANALYSIS');
    console.log('=================================\n');

    // Determine overall architecture pattern
    const hasBackendDir = fs.existsSync('BetonKo-Back-End');
    const hasFrontendDir = fs.existsSync('BetonKo-Front-Endzip');

    if (hasBackendDir && hasFrontendDir) {
      this.architecture.pattern = 'Separated Frontend/Backend (SPA + API)';
      console.log('🎯 Architecture Pattern: Separated Frontend/Backend');
      console.log('   • Frontend and backend are separate applications');
      console.log('   • Communication via REST API');
      console.log('   • Allows independent deployment and scaling');
    } else {
      this.architecture.pattern = 'Monolithic (needs investigation)';
      console.log('🤔 Architecture Pattern: Needs investigation');
    }

    console.log('');
  }

  analyzeBackendArchitecture() {
    console.log('🔧 BACKEND ARCHITECTURE ANALYSIS');
    console.log('--------------------------------');

    const backendPaths = [
      'BetonKo-Back-End/BetonKo-master-e42c420df055a2d277f788fec346e2b4d0ab41e7/BetonKo',
      'BetonKo-Back-End'
    ];

    for (const basePath of backendPaths) {
      if (fs.existsSync(basePath)) {
        this.analyzeLaravelStructure(basePath);
        this.analyzeApiStructure(basePath);
        this.analyzeServiceStructure(basePath);
        break;
      }
    }
  }

  analyzeLaravelStructure(basePath) {
    console.log('📁 Laravel Structure Analysis:');

    const laravelDirs = {
      'app/Http/Controllers': 'Controllers (MVC)',
      'app/Models': 'Models (Eloquent ORM)',
      'app/Services': 'Service Layer',
      'app/Repositories': 'Repository Pattern',
      'routes/api.php': 'API Routes',
      'routes/web.php': 'Web Routes',
      'database/migrations': 'Database Migrations',
      'database/seeders': 'Database Seeders',
      'resources/views': 'Blade Templates',
      'config': 'Configuration Files',
      'storage': 'File Storage',
      'tests': 'Test Suite'
    };

    Object.keys(laravelDirs).forEach(dir => {
      const fullPath = path.join(basePath, dir);
      if (fs.existsSync(fullPath)) {
        console.log(`  ✓ ${laravelDirs[dir]}: ${dir}`);
        this.architecture.backend.layers.push(laravelDirs[dir]);
      } else {
        console.log(`  ❌ Missing: ${dir}`);
      }
    });

    // Detect architecture patterns
    if (fs.existsSync(path.join(basePath, 'app/Services'))) {
      this.architecture.backend.patterns.push('Service Layer Pattern');
    }
    if (fs.existsSync(path.join(basePath, 'app/Repositories'))) {
      this.architecture.backend.patterns.push('Repository Pattern');
    }

    console.log('');
  }

  analyzeApiStructure(basePath) {
    console.log('🔌 API Structure Analysis:');

    const apiRoutesPath = path.join(basePath, 'routes/api.php');
    if (fs.existsSync(apiRoutesPath)) {
      try {
        const apiRoutes = fs.readFileSync(apiRoutesPath, 'utf8');
        
        // Analyze API design patterns
        if (apiRoutes.includes('Route::apiResource')) {
          this.architecture.backend.apiDesign = 'RESTful API Resources';
          console.log('  ✓ RESTful API Resources detected');
        }
        
        if (apiRoutes.includes('Route::group') || apiRoutes.includes('Route::prefix')) {
          console.log('  ✓ API versioning/grouping detected');
        }

        if (apiRoutes.includes('middleware')) {
          console.log('  ✓ API middleware detected');
        }

      } catch (error) {
        console.log(`  ❌ Error reading API routes: ${error.message}`);
      }
    }

    console.log('');
  }

  analyzeServiceStructure(basePath) {
    console.log('🏢 Service Structure Analysis:');

    // Check for service-oriented architecture
    const servicesPath = path.join(basePath, 'src/Services');
    if (fs.existsSync(servicesPath)) {
      console.log('  ✓ Service-oriented architecture detected');
      console.log('  📁 Services directory found at: src/Services');
      
      try {
        const services = fs.readdirSync(servicesPath);
        services.forEach(service => {
          const servicePath = path.join(servicesPath, service);
          if (fs.statSync(servicePath).isDirectory()) {
            console.log(`    • Service: ${service}`);
          }
        });
      } catch (error) {
        console.log(`  ❌ Error reading services: ${error.message}`);
      }
    }

    console.log('');
  }

  analyzeFrontendArchitecture() {
    console.log('🎨 FRONTEND ARCHITECTURE ANALYSIS');
    console.log('---------------------------------');

    const frontendPaths = [
      'BetonKo-Front-Endzip/BetonKo-master-1313f1ccc145d6c7b22a3362008f30d9081c3fe9',
      'BetonKo-Front-Endzip'
    ];

    for (const basePath of frontendPaths) {
      if (fs.existsSync(basePath)) {
        this.analyzeFrontendStructure(basePath);
        this.detectFrontendPatterns(basePath);
        break;
      }
    }
  }

  analyzeFrontendStructure(basePath) {
    console.log('📁 Frontend Structure Analysis:');

    const commonDirs = {
      'src': 'Source Code',
      'src/components': 'Components',
      'src/views': 'Views/Pages',
      'src/router': 'Routing',
      'src/store': 'State Management',
      'src/services': 'API Services',
      'src/utils': 'Utilities',
      'src/assets': 'Static Assets',
      'public': 'Public Assets',
      'dist': 'Build Output',
      'node_modules': 'Dependencies'
    };

    Object.keys(commonDirs).forEach(dir => {
      const fullPath = path.join(basePath, dir);
      if (fs.existsSync(fullPath)) {
        console.log(`  ✓ ${commonDirs[dir]}: ${dir}`);
      }
    });

    console.log('');
  }

  detectFrontendPatterns(basePath) {
    console.log('🎯 Frontend Patterns Detection:');

    // Check for common frontend patterns
    const patterns = {
      'Component-Based': ['src/components', 'components'],
      'Single Page Application': ['src/router', 'router'],
      'State Management': ['src/store', 'store', 'src/vuex', 'src/redux'],
      'API Integration': ['src/services', 'src/api', 'api'],
      'Asset Management': ['src/assets', 'assets', 'static']
    };

    Object.keys(patterns).forEach(pattern => {
      const dirs = patterns[pattern];
      const found = dirs.some(dir => fs.existsSync(path.join(basePath, dir)));
      if (found) {
        console.log(`  ✓ ${pattern} pattern detected`);
        this.architecture.frontend.patterns.push(pattern);
      }
    });

    console.log('');
  }

  generateArchitectureReport() {
    console.log('📊 ARCHITECTURE ANALYSIS REPORT');
    console.log('===============================\n');

    console.log(`🏗️  Overall Pattern: ${this.architecture.pattern}`);
    console.log('');

    console.log('🔧 Backend Architecture:');
    console.log(`   Structure: Laravel MVC Framework`);
    console.log(`   API Design: ${this.architecture.backend.apiDesign || 'Standard Laravel Routes'}`);
    if (this.architecture.backend.patterns.length > 0) {
      console.log('   Patterns:');
      this.architecture.backend.patterns.forEach(pattern => {
        console.log(`     • ${pattern}`);
      });
    }
    console.log('');

    console.log('🎨 Frontend Architecture:');
    if (this.architecture.frontend.patterns.length > 0) {
      console.log('   Patterns:');
      this.architecture.frontend.patterns.forEach(pattern => {
        console.log(`     • ${pattern}`);
      });
    } else {
      console.log('   Patterns: To be determined from package.json analysis');
    }
    console.log('');

    this.generateRecommendations();
  }

  generateRecommendations() {
    console.log('💡 ARCHITECTURE RECOMMENDATIONS');
    console.log('-------------------------------');

    // General recommendations
    console.log('🎯 General Improvements:');
    console.log('   • Implement proper API versioning (v1, v2)');
    console.log('   • Add comprehensive error handling');
    console.log('   • Implement request/response logging');
    console.log('   • Add API rate limiting');
    console.log('');

    // Backend recommendations
    console.log('🔧 Backend Improvements:');
    console.log('   • Implement Service Layer pattern if not present');
    console.log('   • Add Repository pattern for data access');
    console.log('   • Implement proper validation layers');
    console.log('   • Add comprehensive testing suite');
    console.log('   • Implement caching strategy');
    console.log('');

    // Frontend recommendations
    console.log('🎨 Frontend Improvements:');
    console.log('   • Implement proper state management');
    console.log('   • Add error boundary components');
    console.log('   • Implement lazy loading for routes');
    console.log('   • Add proper TypeScript support');
    console.log('   • Implement component testing');
    console.log('');

    // Security recommendations
    console.log('🔒 Security Improvements:');
    console.log('   • Implement JWT authentication');
    console.log('   • Add CORS configuration');
    console.log('   • Implement input sanitization');
    console.log('   • Add rate limiting');
    console.log('   • Implement proper session management');
    console.log('');

    // Performance recommendations
    console.log('⚡ Performance Improvements:');
    console.log('   • Implement database query optimization');
    console.log('   • Add Redis caching');
    console.log('   • Implement CDN for static assets');
    console.log('   • Add database indexing');
    console.log('   • Implement API response caching');
  }

  run() {
    console.log('🚀 Starting Architecture Analysis...\n');
    
    this.analyzeOverallArchitecture();
    this.analyzeBackendArchitecture();
    this.analyzeFrontendArchitecture();
    this.generateArchitectureReport();
  }
}

// Run the analyzer
const analyzer = new ArchitectureAnalyzer();
analyzer.run();