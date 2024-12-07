# AurovilleConnect

Root app folder: cd AurovilleConnect


A comprehensive community platform for Auroville residents to connect, share events, and collaborate.

## System Architecture

### Frontend (React + Vite + TypeScript)
- Built with React 18 using Vite for fast development and optimized builds
- TypeScript for type safety and better developer experience
- Tailwind CSS for styling with custom theme configuration
- State management using Zustand
- React Query for API data fetching and caching
- React Router for client-side routing
- Lucide React for icons
- Radix UI for accessible components

### Backend (Node.js + Express)
- Express.js server with TypeScript
- JWT authentication
- PostgreSQL database with Prisma ORM
- Email notifications using Nodemailer
- Error handling middleware
- CORS configuration for security

### Database Schema
- Users: Community members and administrators
- Events: Community events and gatherings
- Forums: Discussion boards and posts
- CityServices: Local service directory
- EventAttendees: Event participation tracking

## Deployment Architecture

### Production Environment
- Containerized deployment using Docker
- Frontend and Backend served through NGINX
- PostgreSQL database
- NGINX as reverse proxy

### Development Environment
```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Production Deployment Steps:
```bash
# SSH into server
ssh root@134

# Navigate to project directory
cd /path/to/AurovilleConnect

# Pull latest changes
git pull origin main

# Build and start containers
docker-compose -f docker-compose.prod.yml up -d --build

# Monitor logs
docker-compose -f docker-compose.prod.yml logs -f
```

## Development Workflow

1. Local Development:
```bash
# Start frontend development server
npm run dev:local

# Start backend development server
cd server && npm run dev
```

2. Production Build:
```bash
# Build frontend
npm run build:prod

# Deploy using GitHub Actions
git push origin main
```

3. Server Deployment:
- Automatic deployment via GitHub Actions
- Manual deployment available through scripts/deploy.sh

## Features

- Event Management
- Community Forums
- City Services Directory
- Local Resources
- Community Decisions
- Interactive Map
- Bazaar Marketplace

## Tech Stack

- Frontend: React + Vite + TypeScript
- Backend: Node.js + Express
- Database: PostgreSQL + Prisma
- Authentication: JWT
- UI: Tailwind CSS + Radix UI

## Environment Configuration

### Frontend (.env files)
- `.env.development`: Local development settings
- `.env.production`: Production settings
- Key variables:
  - VITE_API_URL: Backend API URL
  - VITE_APP_URL: Frontend URL
  - NODE_ENV: Environment type

### Backend (.env files)
- Key variables:
  - DATABASE_URL: PostgreSQL connection string
  - JWT_SECRET: Authentication secret
  - SMTP_* : Email configuration
  - PORT: Server port

## Key Features

### 1. Authentication System
- JWT-based authentication
- Email verification
- Password reset functionality
- Role-based access control

### 2. Event Management
- Create and manage community events
- RSVP functionality
- Event categories and filtering
- Location mapping

### 3. Community Forums
- Create and participate in discussions
- Category-based organization
- Rich text editing
- Comment threading

### 4. City Services Directory
- List and discover local services
- Service categories
- Contact information
- Service provider profiles

### 5. Notifications System
- Email notifications
- In-app notifications
- Custom notification preferences

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone git@github.com:hyperlux/AurovilleConnect.git
cd AurovilleConnect
```

2. Install dependencies:
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
```

3. Set up environment variables:
```bash
# In the server directory
cp .env.example .env
# Edit .env with your database and SMTP credentials
```

4. Set up the database:
```bash
cd server
npx prisma migrate deploy
```

5. Start the development servers:
```bash
# Start the backend server (in the server directory)
npm run dev

# Start the frontend development server (in the root directory)
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000

## Scripts and Tools

### Development Scripts
- `fix-typescript.sh`: Fixes TypeScript configurations
- `fix-react-imports.sh`: Cleans up React imports
- `setup-dev.sh`: Sets up development environment
- `deploy.sh`: Production deployment script

### Docker Support
- Dockerfile for containerized deployment
- Multi-stage build process
- NGINX configuration included

## Security Measures

1. Authentication:
- JWT token validation
- Password hashing
- Session management

2. API Security:
- CORS configuration
- Rate limiting
- Input validation

3. Database Security:
- Prepared statements
- Connection pooling
- Transaction management

## Maintenance and Monitoring

1. Error Handling:
- Global error middleware
- Error logging
- Client-side error boundaries

2. Logging:
- Request logging
- Database query logging
- Error logging

3. Performance:
- Asset optimization
- Database indexing
- Caching strategies

## Production Deployment Checklist

1. Environment Setup:
- Configure production environment variables
- Set up SSL certificates
- Configure NGINX

2. Database:
- Run migrations
- Verify indexes
- Backup strategy

3. Security:
- Enable CORS
- Set up rate limiting
- Configure firewalls

4. Monitoring:
- Set up error tracking
- Configure logging
- Monitor performance

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Support

For support, email support@auroville.social or create an issue in the GitHub repository.

## License

This project is licensed under the MIT License - see the LICENSE file for details. 



## Local Development (Mac)
- You're working on a Mac 
Using Cursor IDE for development
Local workspace

## Version Control
-Using Git for version control
- Currently on branch fix/typescript-errors
Branch is ahead of origin by 3 commits
Making systematic commits:
Configuration files first (Dockerfile, tsconfig.json, etc.)
Source files separately

## Production Environment
Production site: auroville.social
Running on Ubuntu server
Changes are deployed by:
Making changes locally
Committing and pushing to GitHub
Pulling changes on the Ubuntu server
Restarting services

## Current Project State
Using Docker for containerization


## Your Development Workflow:

### Local Development (localhost):
social

### Building & Deployment:
#### Build for production
```bash
npm run build:prod
```

#### Push to GitHub
```bash
git add .
git commit -m "your changes"
git push
```

#### On server (auroville.social)
git pull
npm run build
#### Copy to web root and set permissions

### What You're Trying to Achieve:
#### Development Options:
- Local frontend + Local API (dev:local)
- Local frontend + Production API (dev:prod)
- Production frontend + Production API (deployed)

### Environment Configuration:
#### Development:
Frontend: http://localhost:5173
API: http://localhost:5000 or https://api.auroville.social

#### Production:
Frontend: https://auroville.social
API: https://api.auroville.social

### Current Issues:
- API requests failing with "Failed to fetch"
- Need to ensure proper API URL configuration across environments
- Need to maintain separate configurations for dev and prod

