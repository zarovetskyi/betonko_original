#!/usr/bin/env node

/**
 * BetonKo Development Environment Setup Guide
 * Generates setup instructions based on detected technology stack
 */

const fs = require('fs');
const path = require('path');

class DevelopmentSetup {
  constructor() {
    this.setupSteps = {
      backend: [],
      frontend: [],
      database: [],
      integration: []
    };
  }

  generateSetupInstructions() {
    console.log('🛠️  BETONKO DEVELOPMENT ENVIRONMENT SETUP');
    console.log('=========================================\n');

    this.analyzeRequirements();
    this.generateBackendSetup();
    this.generateFrontendSetup();
    this.generateIntegrationSetup();
    this.generateDockerSetup();
  }

  analyzeRequirements() {
    console.log('📋 SYSTEM REQUIREMENTS');
    console.log('----------------------');
    console.log('Required Software:');
    console.log('• PHP 8.0+ (for Laravel backend)');
    console.log('• Node.js 16+ (for frontend and build tools)');
    console.log('• Composer (PHP package manager)');
    console.log('• MySQL/PostgreSQL (database)');
    console.log('• Git (version control)');
    console.log('');
  }

  generateBackendSetup() {
    console.log('🔧 BACKEND SETUP (Laravel)');
    console.log('--------------------------');
    console.log('1. Navigate to backend directory:');
    console.log('   cd BetonKo-Back-End/BetonKo-master-*/BetonKo');
    console.log('');
    console.log('2. Install PHP dependencies:');
    console.log('   composer install');
    console.log('');
    console.log('3. Copy environment file:');
    console.log('   cp .env.example .env');
    console.log('');
    console.log('4. Generate application key:');
    console.log('   php artisan key:generate');
    console.log('');
    console.log('5. Configure database in .env file');
    console.log('');
    console.log('6. Run database migrations:');
    console.log('   php artisan migrate');
    console.log('');
    console.log('7. Install Node.js dependencies (if package.json exists):');
    console.log('   npm install');
    console.log('');
    console.log('8. Start development server:');
    console.log('   php artisan serve');
    console.log('');
  }

  generateFrontendSetup() {
    console.log('🎨 FRONTEND SETUP');
    console.log('-----------------');
    console.log('1. Navigate to frontend directory:');
    console.log('   cd BetonKo-Front-Endzip/BetonKo-master-*');
    console.log('');
    console.log('2. Install Node.js dependencies:');
    console.log('   npm install');
    console.log('');
    console.log('3. Configure API endpoints (check for config files)');
    console.log('');
    console.log('4. Start development server:');
    console.log('   npm run dev');
    console.log('   # or npm start (check package.json scripts)');
    console.log('');
  }

  generateIntegrationSetup() {
    console.log('🔗 INTEGRATION SETUP');
    console.log('--------------------');
    console.log('1. Configure CORS in Laravel backend');
    console.log('2. Set up API base URL in frontend');
    console.log('3. Configure authentication endpoints');
    console.log('4. Test API connectivity');
    console.log('');
  }

  generateDockerSetup() {
    console.log('🐳 DOCKER SETUP (Optional)');
    console.log('--------------------------');
    console.log('For containerized development:');
    console.log('1. Create docker-compose.yml');
    console.log('2. Set up PHP/Apache container for backend');
    console.log('3. Set up Node.js container for frontend');
    console.log('4. Set up MySQL/PostgreSQL container');
    console.log('5. Configure networking between containers');
    console.log('');
  }

  createSetupScript() {
    const setupScript = `#!/bin/bash

# BetonKo Development Environment Setup Script
echo "🚀 Setting up BetonKo development environment..."

# Check system requirements
echo "📋 Checking system requirements..."
command -v php >/dev/null 2>&1 || { echo "❌ PHP is required but not installed."; exit 1; }
command -v composer >/dev/null 2>&1 || { echo "❌ Composer is required but not installed."; exit 1; }
command -v node >/dev/null 2>&1 || { echo "❌ Node.js is required but not installed."; exit 1; }
command -v npm >/dev/null 2>&1 || { echo "❌ npm is required but not installed."; exit 1; }

echo "✅ System requirements check passed!"

# Backend setup
echo "🔧 Setting up backend..."
BACKEND_DIR="BetonKo-Back-End/BetonKo-master-*/BetonKo"
if [ -d "$BACKEND_DIR" ]; then
    cd "$BACKEND_DIR"
    echo "Installing PHP dependencies..."
    composer install
    
    if [ ! -f ".env" ]; then
        echo "Creating .env file..."
        cp .env.example .env
        php artisan key:generate
    fi
    
    if [ -f "package.json" ]; then
        echo "Installing Node.js dependencies..."
        npm install
    fi
    
    cd - > /dev/null
    echo "✅ Backend setup complete!"
else
    echo "❌ Backend directory not found!"
fi

# Frontend setup
echo "🎨 Setting up frontend..."
FRONTEND_DIR="BetonKo-Front-Endzip/BetonKo-master-*"
if [ -d "$FRONTEND_DIR" ]; then
    cd "$FRONTEND_DIR"
    echo "Installing Node.js dependencies..."
    npm install
    cd - > /dev/null
    echo "✅ Frontend setup complete!"
else
    echo "❌ Frontend directory not found!"
fi

echo "🎉 BetonKo development environment setup complete!"
echo "📖 Check the generated documentation for next steps."
`;

    return setupScript;
  }
}

// Run the setup generator
const setup = new DevelopmentSetup();
setup.generateSetupInstructions();

// Export for use in other scripts
module.exports = DevelopmentSetup;