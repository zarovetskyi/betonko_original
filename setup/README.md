# BetonKo Development Environment Setup

This directory contains all the necessary files and scripts to set up your BetonKo development environment.

## Quick Start

### Option 1: Automated Setup (Recommended)
```bash
chmod +x development-environment.sh
./development-environment.sh
```

### Option 2: Docker Setup
```bash
docker-compose up -d
```

### Option 3: Manual Setup
Follow the manual setup instructions below.

## Manual Setup Instructions

### Prerequisites
- PHP 8.0+
- Composer
- Node.js 16+
- MySQL/PostgreSQL
- Git

### Backend Setup (Laravel)

1. Navigate to backend directory:
```bash
cd BetonKo-Back-End/BetonKo-master-*/BetonKo
```

2. Install PHP dependencies:
```bash
composer install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Generate application key:
```bash
php artisan key:generate
```

5. Configure database in `.env` file:
```env
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=betonko
DB_USERNAME=your_username
DB_PASSWORD=your_password
```

6. Run database migrations:
```bash
php artisan migrate
```

7. Install Node.js dependencies (if package.json exists):
```bash
npm install
```

8. Start development server:
```bash
php artisan serve
```

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd BetonKo-Front-Endzip/BetonKo-master-*
```

2. Install Node.js dependencies:
```bash
npm install
```

3. Configure API endpoints (check for config files)

4. Start development server:
```bash
npm run dev
# or
npm start
```

## Docker Setup

The Docker setup provides a complete development environment with:
- Laravel backend (PHP 8.1)
- Frontend development server
- MySQL database
- Redis cache
- phpMyAdmin

### Services
- **Backend**: http://localhost:8000
- **Frontend**: http://localhost:3000
- **Database**: localhost:3306
- **phpMyAdmin**: http://localhost:8080
- **Redis**: localhost:6379

### Docker Commands
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild services
docker-compose up -d --build

# Access backend container
docker exec -it betonko-backend bash

# Access frontend container
docker exec -it betonko-frontend sh
```

## Troubleshooting

### Common Issues

1. **Permission errors (Laravel)**:
```bash
sudo chown -R $USER:www-data storage
sudo chown -R $USER:www-data bootstrap/cache
chmod -R 775 storage
chmod -R 775 bootstrap/cache
```

2. **Database connection errors**:
- Check database credentials in `.env`
- Ensure database server is running
- Verify database exists

3. **Node.js dependency issues**:
```bash
rm -rf node_modules package-lock.json
npm install
```

4. **Port conflicts**:
- Backend: Change port in `php artisan serve --port=8001`
- Frontend: Check package.json scripts for port configuration

### Environment Variables

Create a `.env` file in the backend directory with these variables:
```env
APP_NAME=BetonKo
APP_ENV=local
APP_KEY=base64:your-generated-key
APP_DEBUG=true
APP_URL=http://localhost:8000

LOG_CHANNEL=stack
LOG_DEPRECATIONS_CHANNEL=null
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=betonko
DB_USERNAME=your_username
DB_PASSWORD=your_password

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=127.0.0.1
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=mailhog
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS="hello@example.com"
MAIL_FROM_NAME="${APP_NAME}"
```

## Next Steps

After setup is complete:

1. **Configure API Integration**
   - Set up CORS in Laravel backend
   - Configure API base URL in frontend
   - Test API connectivity

2. **Database Setup**
   - Run migrations: `php artisan migrate`
   - Seed database: `php artisan db:seed`

3. **Development Workflow**
   - Backend: `php artisan serve`
   - Frontend: `npm run dev`
   - Watch for changes and hot reload

4. **Testing**
   - Backend tests: `php artisan test`
   - Frontend tests: `npm run test`

## Support

If you encounter any issues:
1. Check the troubleshooting section above
2. Review the logs for error messages
3. Ensure all prerequisites are installed
4. Verify file permissions and ownership