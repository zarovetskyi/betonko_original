#!/usr/bin/env node

/**
 * BetonKo File Content Examiner
 * Examines specific files for technology stack analysis
 */

const fs = require('fs');
const path = require('path');

class FileExaminer {
  constructor() {
    this.findings = {
      backend: {
        framework: null,
        language: null,
        dependencies: [],
        database: null,
        features: []
      },
      frontend: {
        framework: null,
        language: null,
        dependencies: [],
        buildTool: null,
        features: []
      }
    };
  }

  examineFile(filePath) {
    try {
      if (!fs.existsSync(filePath)) {
        console.log(`❌ File not found: ${filePath}`);
        return null;
      }

      const content = fs.readFileSync(filePath, 'utf8');
      const fileName = path.basename(filePath);
      
      console.log(`\n📄 Examining: ${fileName}`);
      console.log(`📍 Path: ${filePath}`);
      console.log(`📏 Size: ${content.length} characters`);
      
      // Analyze based on file type
      switch (fileName) {
        case 'package.json':
          return this.analyzePackageJson(content, filePath);
        case 'composer.json':
          return this.analyzeComposerJson(content);
        case '.env.example':
        case '.env':
          return this.analyzeEnvFile(content);
        default:
          return this.analyzeGenericFile(content, fileName);
      }
    } catch (error) {
      console.log(`❌ Error examining ${filePath}: ${error.message}`);
      return null;
    }
  }

  analyzePackageJson(content, filePath) {
    try {
      const pkg = JSON.parse(content);
      const isBackend = filePath.includes('Back-End');
      const target = isBackend ? this.findings.backend : this.findings.frontend;
      
      console.log(`📦 Package: ${pkg.name || 'unnamed'}`);
      console.log(`🏷️  Version: ${pkg.version || 'unknown'}`);
      
      if (pkg.dependencies) {
        console.log('📚 Dependencies:');
        Object.keys(pkg.dependencies).forEach(dep => {
          console.log(`  - ${dep}: ${pkg.dependencies[dep]}`);
          target.dependencies.push({ name: dep, version: pkg.dependencies[dep] });
        });
      }

      if (pkg.devDependencies) {
        console.log('🔧 Dev Dependencies:');
        Object.keys(pkg.devDependencies).forEach(dep => {
          console.log(`  - ${dep}: ${pkg.devDependencies[dep]}`);
        });
      }

      if (pkg.scripts) {
        console.log('⚡ Scripts:');
        Object.keys(pkg.scripts).forEach(script => {
          console.log(`  - ${script}: ${pkg.scripts[script]}`);
        });
      }

      return pkg;
    } catch (error) {
      console.log(`❌ Error parsing package.json: ${error.message}`);
      return null;
    }
  }

  analyzeComposerJson(content) {
    try {
      const composer = JSON.parse(content);
      
      console.log(`📦 Package: ${composer.name || 'unnamed'}`);
      console.log(`🏷️  Version: ${composer.version || 'unknown'}`);
      
      if (composer.require) {
        console.log('📚 PHP Dependencies:');
        Object.keys(composer.require).forEach(dep => {
          console.log(`  - ${dep}: ${composer.require[dep]}`);
          this.findings.backend.dependencies.push({ name: dep, version: composer.require[dep] });
        });
      }

      // Detect Laravel
      if (composer.require && composer.require['laravel/framework']) {
        this.findings.backend.framework = 'Laravel';
        this.findings.backend.language = 'PHP';
        console.log('🎯 Detected: Laravel Framework');
      }

      return composer;
    } catch (error) {
      console.log(`❌ Error parsing composer.json: ${error.message}`);
      return null;
    }
  }

  analyzeEnvFile(content) {
    console.log('🔧 Environment Configuration:');
    const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
    
    lines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        console.log(`  ${key}=${value.replace(/"/g, '')}`);
        
        // Detect database type
        if (key === 'DB_CONNECTION') {
          this.findings.backend.database = value.replace(/"/g, '');
        }
      }
    });

    return { lines: lines.length, content };
  }

  analyzeGenericFile(content, fileName) {
    console.log(`📄 File type: ${path.extname(fileName) || 'no extension'}`);
    console.log(`📏 Lines: ${content.split('\n').length}`);
    
    // Look for common patterns
    const patterns = {
      'Vue.js': /vue|Vue/g,
      'React': /react|React/g,
      'Angular': /angular|Angular/g,
      'Laravel': /laravel|Laravel/g,
      'Express': /express/g,
      'TypeScript': /typescript|\.ts/g
    };

    Object.keys(patterns).forEach(tech => {
      const matches = content.match(patterns[tech]);
      if (matches && matches.length > 0) {
        console.log(`🎯 Detected ${tech}: ${matches.length} references`);
      }
    });

    return { fileName, size: content.length, lines: content.split('\n').length };
  }

  generateTechStackReport() {
    console.log('\n🔬 TECHNOLOGY STACK ANALYSIS');
    console.log('============================\n');

    console.log('🔧 BACKEND STACK');
    console.log('----------------');
    console.log(`Framework: ${this.findings.backend.framework || 'Unknown'}`);
    console.log(`Language: ${this.findings.backend.language || 'Unknown'}`);
    console.log(`Database: ${this.findings.backend.database || 'Unknown'}`);
    console.log(`Dependencies: ${this.findings.backend.dependencies.length} found`);

    console.log('\n🎨 FRONTEND STACK');
    console.log('-----------------');
    console.log(`Framework: ${this.findings.frontend.framework || 'Unknown'}`);
    console.log(`Language: ${this.findings.frontend.language || 'Unknown'}`);
    console.log(`Build Tool: ${this.findings.frontend.buildTool || 'Unknown'}`);
    console.log(`Dependencies: ${this.findings.frontend.dependencies.length} found`);
  }
}

// Export for use
module.exports = FileExaminer;

// If run directly
if (require.main === module) {
  const examiner = new FileExaminer();
  
  // Try to examine common files
  const commonFiles = [
    'BetonKo-Back-End/BetonKo-master-e42c420df055a2d277f788fec346e2b4d0ab41e7/BetonKo/package.json',
    'BetonKo-Back-End/BetonKo-master-e42c420df055a2d277f788fec346e2b4d0ab41e7/BetonKo/composer.json',
    'BetonKo-Front-Endzip/BetonKo-master-1313f1ccc145d6c7b22a3362008f30d9081c3fe9/package.json'
  ];

  console.log('🔍 Starting File Content Analysis...');
  
  commonFiles.forEach(file => {
    examiner.examineFile(file);
  });

  examiner.generateTechStackReport();
}