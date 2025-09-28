#!/bin/bash

# BetonKo Development Environment Setup Script
# This script sets up the complete development environment

set -e  # Exit on any error

echo "🚀 BetonKo Development Environment Setup"
echo "========================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC} $1"
}

print_error() {
    echo -e "${RED}❌${NC} $1"
}

print_info() {
    echo -e "${BLUE}ℹ${NC} $1"
}

# Check system requirements
echo "📋 Checking System Requirements..."
echo "--------------------------------"

# Check PHP
if command -v php >/dev/null 2>&1; then
    PHP_VERSION=$(php -v | head -n1 | cut -d' ' -f2 | cut -d'.' -f1,2)
    print_status "PHP $PHP_VERSION found"
else
    print_error "PHP is required but not installed"
    echo "Please install PHP 8.0 or higher"
    exit 1
fi

# Check Composer
if command -v composer >/dev/null 2>&1; then
    COMPOSER_VERSION=$(composer --version | cut -d' ' -f3)
    print_status "Composer $COMPOSER_VERSION found"
else
    print_error "Composer is required but not installed"
    echo "Please install Composer: https://getcomposer.org/"
    exit 1
fi

# Check Node.js
if command -v node >/dev/null 2>&1; then
    NODE_VERSION=$(node --version)
    print_status "Node.js $NODE_VERSION found"
else
    print_error "Node.js is required but not installed"
    echo "Please install Node.js 16 or higher"
    exit 1
fi

# Check npm
if command -v npm >/dev/null 2>&1; then
    NPM_VERSION=$(npm --version)
    print_status "npm $NPM_VERSION found"
else
    print_error "npm is required but not installed"
    exit 1
fi

echo ""

# Setup Backend
echo "🔧 Setting up Backend (Laravel)..."
echo "--------------------------------"

# Find backend directory
BACKEND_DIRS=(
    "BetonKo-Back-End/BetonKo-master-e42c420df055a2d277f788fec346e2b4d0ab41e7/BetonKo"
    "BetonKo-Back-End"
)

BACKEND_DIR=""
for dir in "${BACKEND_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        BACKEND_DIR="$dir"
        break
    fi
done

if [ -z "$BACKEND_DIR" ]; then
    print_error "Backend directory not found!"
    exit 1
fi

print_info "Backend found at: $BACKEND_DIR"

cd "$BACKEND_DIR"

# Install PHP dependencies
if [ -f "composer.json" ]; then
    print_info "Installing PHP dependencies..."
    composer install --no-interaction
    print_status "PHP dependencies installed"
else
    print_warning "composer.json not found in backend directory"
fi

# Setup environment file
if [ -f ".env.example" ] && [ ! -f ".env" ]; then
    print_info "Creating .env file..."
    cp .env.example .env
    print_status ".env file created"
fi

# Generate application key
if [ -f "artisan" ]; then
    print_info "Generating application key..."
    php artisan key:generate --no-interaction
    print_status "Application key generated"
fi

# Install Node.js dependencies if package.json exists
if [ -f "package.json" ]; then
    print_info "Installing Node.js dependencies for backend..."
    npm install
    print_status "Backend Node.js dependencies installed"
fi

cd - > /dev/null

echo ""

# Setup Frontend
echo "🎨 Setting up Frontend..."
echo "------------------------"

# Find frontend directory
FRONTEND_DIRS=(
    "BetonKo-Front-Endzip/BetonKo-master-1313f1ccc145d6c7b22a3362008f30d9081c3fe9"
    "BetonKo-Front-Endzip"
)

FRONTEND_DIR=""
for dir in "${FRONTEND_DIRS[@]}"; do
    if [ -d "$dir" ]; then
        FRONTEND_DIR="$dir"
        break
    fi
done

if [ -z "$FRONTEND_DIR" ]; then
    print_error "Frontend directory not found!"
    exit 1
fi

print_info "Frontend found at: $FRONTEND_DIR"

cd "$FRONTEND_DIR"

# Install Node.js dependencies
if [ -f "package.json" ]; then
    print_info "Installing Node.js dependencies for frontend..."
    npm install
    print_status "Frontend dependencies installed"
else
    print_warning "package.json not found in frontend directory"
fi

cd - > /dev/null

echo ""

# Database setup instructions
echo "🗄️  Database Setup Instructions"
echo "------------------------------"
print_info "Manual database setup required:"
echo "1. Create a MySQL/PostgreSQL database"
echo "2. Update .env file in backend with database credentials:"
echo "   DB_CONNECTION=mysql"
echo "   DB_HOST=127.0.0.1"
echo "   DB_PORT=3306"
echo "   DB_DATABASE=betonko"
echo "   DB_USERNAME=your_username"
echo "   DB_PASSWORD=your_password"
echo "3. Run migrations: cd $BACKEND_DIR && php artisan migrate"

echo ""

# Final instructions
echo "🎉 Setup Complete!"
echo "=================="
print_status "Development environment is ready!"
echo ""
echo "📋 Next Steps:"
echo "1. Configure your database connection in $BACKEND_DIR/.env"
echo "2. Run database migrations"
echo "3. Start the development servers:"
echo ""
echo "   Backend (Laravel):"
echo "   cd $BACKEND_DIR"
echo "   php artisan serve"
echo ""
echo "   Frontend:"
echo "   cd $FRONTEND_DIR"
echo "   npm run dev  # or npm start"
echo ""
print_info "Check the generated documentation for more details!"