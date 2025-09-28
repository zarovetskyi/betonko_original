#!/usr/bin/env node

/**
 * BetonKo Code Quality Analyzer
 * Analyzes code quality and suggests improvements
 */

const fs = require('fs');
const path = require('path');

class CodeQualityAnalyzer {
  constructor() {
    this.issues = {
      backend: {
        security: [],
        performance: [],
        maintainability: [],
        bestPractices: []
      },
      frontend: {
        security: [],
        performance: [],
        maintainability: [],
        bestPractices: []
      },
      general: {
        documentation: [],
        testing: [],
        deployment: []
      }
    };
    
    this.recommendations = [];
  }

  analyzeBackendQuality() {
    console.log('🔧 BACKEND CODE QUALITY ANALYSIS');
    console.log('================================\n');

    const backendPaths = [
      'BetonKo-Back-End/BetonKo-master-e42c420df055a2d277f788fec346e2b4d0ab41e7/BetonKo',
      'BetonKo-Back-End'
    ];

    for (const basePath of backendPaths) {
      if (fs.existsSync(basePath)) {
        this.analyzeBackendSecurity(basePath);
        this.analyzeBackendPerformance(basePath);
        this.analyzeBackendMaintainability(basePath);
        this.analyzeBackendBestPractices(basePath);
        break;
      }
    }
  }

  analyzeBackendSecurity(basePath) {
    console.log('🔒 Security Analysis:');

    const securityChecks = [
      {
        file: '.env.example',
        check: 'Environment template exists',
        issue: 'Missing .env.example file'
      },
      {
        file: 'config/cors.php',
        check: 'CORS configuration',
        issue: 'CORS not properly configured'
      },
      {
        file: 'app/Http/Middleware/Authenticate.php',
        check: 'Authentication middleware',
        issue: 'Custom authentication middleware missing'
      },
      {
        file: 'config/sanctum.php',
        check: 'API authentication (Sanctum)',
        issue: 'API authentication not configured'
      }
    ];

    securityChecks.forEach(check => {
      const filePath = path.join(basePath, check.file);
      if (fs.existsSync(filePath)) {
        console.log(`  ✓ ${check.check}`);
      } else {
        console.log(`  ❌ ${check.issue}`);
        this.issues.backend.security.push(check.issue);
      }
    });

    // Check for common security patterns
    this.checkForSecurityPatterns(basePath);
    console.log('');
  }

  checkForSecurityPatterns(basePath) {
    // Check for input validation
    const controllersPath = path.join(basePath, 'app/Http/Controllers');
    if (fs.existsSync(controllersPath)) {
      try {
        const controllers = fs.readdirSync(controllersPath);
        let hasValidation = false;
        
        controllers.forEach(controller => {
          if (controller.endsWith('.php')) {
            const controllerPath = path.join(controllersPath, controller);
            const content = fs.readFileSync(controllerPath, 'utf8');
            
            if (content.includes('validate(') || content.includes('FormRequest')) {
              hasValidation = true;
            }
          }
        });

        if (hasValidation) {
          console.log('  ✓ Input validation patterns found');
        } else {
          console.log('  ❌ Input validation patterns missing');
          this.issues.backend.security.push('Input validation not implemented');
        }
      } catch (error) {
        console.log(`  ❌ Error checking controllers: ${error.message}`);
      }
    }
  }

  analyzeBackendPerformance(basePath) {
    console.log('⚡ Performance Analysis:');

    const performanceChecks = [
      {
        file: 'config/cache.php',
        check: 'Caching configuration',
        issue: 'Caching not properly configured'
      },
      {
        file: 'config/database.php',
        check: 'Database configuration',
        issue: 'Database optimization needed'
      },
      {
        file: 'config/queue.php',
        check: 'Queue configuration',
        issue: 'Background job processing not configured'
      }
    ];

    performanceChecks.forEach(check => {
      const filePath = path.join(basePath, check.file);
      if (fs.existsSync(filePath)) {
        console.log(`  ✓ ${check.check}`);
      } else {
        console.log(`  ❌ ${check.issue}`);
        this.issues.backend.performance.push(check.issue);
      }
    });

    console.log('');
  }

  analyzeBackendMaintainability(basePath) {
    console.log('🔧 Maintainability Analysis:');

    // Check for proper structure
    const structureChecks = [
      'app/Services',
      'app/Repositories', 
      'app/Http/Requests',
      'app/Http/Resources',
      'tests/Feature',
      'tests/Unit'
    ];

    structureChecks.forEach(dir => {
      const dirPath = path.join(basePath, dir);
      if (fs.existsSync(dirPath)) {
        console.log(`  ✓ ${dir} directory exists`);
      } else {
        console.log(`  ❌ ${dir} directory missing`);
        this.issues.backend.maintainability.push(`${dir} directory missing`);
      }
    });

    console.log('');
  }

  analyzeBackendBestPractices(basePath) {
    console.log('📋 Best Practices Analysis:');

    // Check for documentation
    const docFiles = ['README.md', 'API.md', 'DEPLOYMENT.md'];
    docFiles.forEach(file => {
      const filePath = path.join(basePath, file);
      if (fs.existsSync(filePath)) {
        console.log(`  ✓ ${file} exists`);
      } else {
        console.log(`  ❌ ${file} missing`);
        this.issues.backend.bestPractices.push(`${file} documentation missing`);
      }
    });

    console.log('');
  }

  analyzeFrontendQuality() {
    console.log('🎨 FRONTEND CODE QUALITY ANALYSIS');
    console.log('=================================\n');

    const frontendPaths = [
      'BetonKo-Front-Endzip/BetonKo-master-1313f1ccc145d6c7b22a3362008f30d9081c3fe9',
      'BetonKo-Front-Endzip'
    ];

    for (const basePath of frontendPaths) {
      if (fs.existsSync(basePath)) {
        this.analyzeFrontendStructure(basePath);
        this.analyzeFrontendSecurity(basePath);
        this.analyzeFrontendPerformance(basePath);
        break;
      }
    }
  }

  analyzeFrontendStructure(basePath) {
    console.log('📁 Frontend Structure Analysis:');

    const structureChecks = [
      'src/components',
      'src/views',
      'src/services',
      'src/utils',
      'src/assets',
      'tests',
      'public'
    ];

    structureChecks.forEach(dir => {
      const dirPath = path.join(basePath, dir);
      if (fs.existsSync(dirPath)) {
        console.log(`  ✓ ${dir} directory exists`);
      } else {
        console.log(`  ❌ ${dir} directory missing`);
        this.issues.frontend.maintainability.push(`${dir} directory missing`);
      }
    });

    console.log('');
  }

  analyzeFrontendSecurity(basePath) {
    console.log('🔒 Frontend Security Analysis:');

    // Check package.json for security-related packages
    const packagePath = path.join(basePath, 'package.json');
    if (fs.existsSync(packagePath)) {
      try {
        const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        
        const securityPackages = [
          'helmet',
          'cors',
          'express-rate-limit',
          'bcrypt',
          'jsonwebtoken'
        ];

        let securityScore = 0;
        securityPackages.forEach(pkg_name => {
          if (pkg.dependencies && pkg.dependencies[pkg_name]) {
            console.log(`  ✓ ${pkg_name} package found`);
            securityScore++;
          }
        });

        if (securityScore === 0) {
          console.log('  ❌ No security packages detected');
          this.issues.frontend.security.push('Security packages missing');
        }

      } catch (error) {
        console.log(`  ❌ Error reading package.json: ${error.message}`);
      }
    }

    console.log('');
  }

  analyzeFrontendPerformance(basePath) {
    console.log('⚡ Frontend Performance Analysis:');

    // Check for performance optimization files
    const perfFiles = [
      'vite.config.js',
      'webpack.config.js',
      '.babelrc',
      'tsconfig.json'
    ];

    perfFiles.forEach(file => {
      const filePath = path.join(basePath, file);
      if (fs.existsSync(filePath)) {
        console.log(`  ✓ ${file} configuration found`);
      }
    });

    console.log('');
  }

  generateImprovementPlan() {
    console.log('📋 IMPROVEMENT PLAN');
    console.log('==================\n');

    console.log('🔒 SECURITY IMPROVEMENTS');
    console.log('------------------------');
    console.log('Priority: HIGH');
    console.log('• Implement comprehensive input validation');
    console.log('• Add API rate limiting');
    console.log('• Configure CORS properly');
    console.log('• Implement JWT authentication');
    console.log('• Add request/response sanitization');
    console.log('• Set up security headers');
    console.log('');

    console.log('⚡ PERFORMANCE IMPROVEMENTS');
    console.log('--------------------------');
    console.log('Priority: MEDIUM');
    console.log('• Implement Redis caching');
    console.log('• Add database query optimization');
    console.log('• Set up CDN for static assets');
    console.log('• Implement lazy loading');
    console.log('• Add response compression');
    console.log('• Optimize database indexes');
    console.log('');

    console.log('🔧 MAINTAINABILITY IMPROVEMENTS');
    console.log('-------------------------------');
    console.log('Priority: MEDIUM');
    console.log('• Implement Service Layer pattern');
    console.log('• Add Repository pattern');
    console.log('• Create comprehensive test suite');
    console.log('• Add API documentation');
    console.log('• Implement proper error handling');
    console.log('• Add logging and monitoring');
    console.log('');

    console.log('📚 BEST PRACTICES IMPROVEMENTS');
    console.log('------------------------------');
    console.log('Priority: LOW');
    console.log('• Add comprehensive documentation');
    console.log('• Implement code style guidelines');
    console.log('• Set up CI/CD pipeline');
    console.log('• Add automated testing');
    console.log('• Implement proper version control workflow');
    console.log('• Add deployment automation');
  }

  generateImplementationGuide() {
    console.log('\n🛠️  IMPLEMENTATION GUIDE');
    console.log('========================\n');

    console.log('Phase 1: Security (Week 1-2)');
    console.log('-----------------------------');
    console.log('1. Install Laravel Sanctum for API authentication');
    console.log('2. Implement Form Request validation');
    console.log('3. Configure CORS middleware');
    console.log('4. Add rate limiting middleware');
    console.log('5. Implement input sanitization');
    console.log('');

    console.log('Phase 2: Performance (Week 3-4)');
    console.log('--------------------------------');
    console.log('1. Set up Redis caching');
    console.log('2. Optimize database queries');
    console.log('3. Implement API response caching');
    console.log('4. Add database indexing');
    console.log('5. Set up queue processing');
    console.log('');

    console.log('Phase 3: Architecture (Week 5-6)');
    console.log('---------------------------------');
    console.log('1. Implement Service Layer');
    console.log('2. Add Repository pattern');
    console.log('3. Create API Resources');
    console.log('4. Implement proper error handling');
    console.log('5. Add comprehensive logging');
    console.log('');

    console.log('Phase 4: Testing & Documentation (Week 7-8)');
    console.log('--------------------------------------------');
    console.log('1. Write unit tests');
    console.log('2. Write integration tests');
    console.log('3. Create API documentation');
    console.log('4. Add deployment documentation');
    console.log('5. Set up CI/CD pipeline');
  }

  run() {
    console.log('🚀 Starting Code Quality Analysis...\n');
    
    this.analyzeBackendQuality();
    this.analyzeFrontendQuality();
    this.generateImprovementPlan();
    this.generateImplementationGuide();
  }
}

// Run the analyzer
const analyzer = new CodeQualityAnalyzer();
analyzer.run();