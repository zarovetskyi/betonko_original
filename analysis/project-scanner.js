#!/usr/bin/env node

/**
 * BetonKo Project Scanner
 * Analyzes project structure and key files
 */

const fs = require('fs');
const path = require('path');

class ProjectScanner {
  constructor() {
    this.results = {
      backend: {
        path: 'BetonKo-Back-End',
        files: [],
        config: {},
        structure: {}
      },
      frontend: {
        path: 'BetonKo-Front-Endzip',
        files: [],
        config: {},
        structure: {}
      }
    };
  }

  scanDirectory(dirPath, maxDepth = 3, currentDepth = 0) {
    const items = [];
    
    if (currentDepth >= maxDepth) return items;
    
    try {
      if (!fs.existsSync(dirPath)) {
        console.log(`Directory not found: ${dirPath}`);
        return items;
      }

      const entries = fs.readdirSync(dirPath);
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          items.push({
            name: entry,
            type: 'directory',
            path: fullPath,
            children: this.scanDirectory(fullPath, maxDepth, currentDepth + 1)
          });
        } else {
          items.push({
            name: entry,
            type: 'file',
            path: fullPath,
            size: stat.size,
            extension: path.extname(entry)
          });
        }
      }
    } catch (error) {
      console.log(`Error scanning ${dirPath}: ${error.message}`);
    }
    
    return items;
  }

  identifyKeyFiles(items) {
    const keyFiles = [];
    const keyPatterns = [
      'package.json',
      'composer.json',
      '.env',
      '.env.example',
      'webpack.config.js',
      'vite.config.js',
      'tailwind.config.js',
      'tsconfig.json',
      'artisan',
      'web.php',
      'api.php',
      'app.js',
      'main.js',
      'index.js',
      'index.html',
      'App.vue',
      'App.jsx',
      'App.tsx'
    ];

    const findFiles = (items) => {
      for (const item of items) {
        if (item.type === 'file' && keyPatterns.includes(item.name)) {
          keyFiles.push(item);
        }
        if (item.type === 'directory' && item.children) {
          findFiles(item.children);
        }
      }
    };

    findFiles(items);
    return keyFiles;
  }

  analyzeProject() {
    console.log('🔍 Starting BetonKo Project Analysis...\n');

    // Scan backend
    console.log('📁 Scanning Backend Structure...');
    const backendStructure = this.scanDirectory(this.results.backend.path);
    this.results.backend.structure = backendStructure;
    this.results.backend.files = this.identifyKeyFiles(backendStructure);

    // Scan frontend
    console.log('📁 Scanning Frontend Structure...');
    const frontendStructure = this.scanDirectory(this.results.frontend.path);
    this.results.frontend.structure = frontendStructure;
    this.results.frontend.files = this.identifyKeyFiles(frontendStructure);

    this.generateReport();
  }

  generateReport() {
    console.log('\n📊 BETONKO PROJECT ANALYSIS REPORT');
    console.log('=====================================\n');

    // Backend Analysis
    console.log('🔧 BACKEND ANALYSIS');
    console.log('-------------------');
    if (this.results.backend.files.length > 0) {
      console.log('Key files found:');
      this.results.backend.files.forEach(file => {
        console.log(`  ✓ ${file.name} (${file.path})`);
      });
    } else {
      console.log('  ❌ No key backend files accessible');
    }

    // Frontend Analysis
    console.log('\n🎨 FRONTEND ANALYSIS');
    console.log('--------------------');
    if (this.results.frontend.files.length > 0) {
      console.log('Key files found:');
      this.results.frontend.files.forEach(file => {
        console.log(`  ✓ ${file.name} (${file.path})`);
      });
    } else {
      console.log('  ❌ No key frontend files accessible');
    }

    console.log('\n📋 NEXT STEPS');
    console.log('-------------');
    console.log('1. Examine configuration files');
    console.log('2. Analyze technology stack');
    console.log('3. Review application structure');
    console.log('4. Set up development environment');
  }
}

// Run the scanner
const scanner = new ProjectScanner();
scanner.analyzeProject();