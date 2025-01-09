# Development and Deployment Workflow

This document outlines the workflow for developing locally on Mac and deploying to Ubuntu production server.

## Initial Setup

1. Install dependencies:
```bash
# Install all dependencies including dev dependencies
npm install

# Install backend dependencies
cd server && npm install && cd ..
```

2. Install TypeScript type definitions:
```bash
# Ensure all type definitions are installed
npm install --save-dev @types/react-query @tanstack/eslint-plugin-query
```

## Local Development (Mac)

1. Start local development server:
```bash
# Start backend
npm run start:server

# In a new terminal, start frontend with hot reload
npm run dev:local
```

2. Type checking and linting:
```bash
# Run type checking
npm run typecheck

# Run linting
npm run lint

# Run both
npm run verify:build
```

3. Test production build locally:
```bash
# Build for production
npm run build:prod

# Preview production build
npm run preview
```

## TypeScript Development Guidelines

1. Type Declarations
- All types are declared in `src/types/global.d.ts`
- Use strict type checking
- Avoid using `any` type
- Define interfaces for all data structures

2. Common Type Issues and Solutions:
```typescript
// For React Query
const { data, isLoading, error } = useQuery<ForumPost[]>({
  queryKey: ['posts'],
  queryFn: fetchPosts
});

// For Lucide Icons
import { Icon } from 'lucide-react';
const IconComponent: LucideIcon = Icon;

// For form data
interface FormData {
  title: string;
  content: string;
}
```

3. Type Checking:
```bash
# Check types before commit
npm run typecheck

# Fix common type issues
npm run lint --fix
```

## Production Deployment (Ubuntu)

1. On local machine, prepare for deployment:
```bash
# Verify and build
npm run predeploy
```

2. Deploy to production server:
```bash
# SSH into server
ssh root@206.189.134.234

# Navigate to project
cd /root/AurovilleConnect

# Pull latest changes
git pull origin main

# Install dependencies if needed
npm install
cd server && npm install && cd ..

# Apply database migrations
cd server && npx prisma migrate deploy && cd ..

# Build the application
npm run build:prod

# Restart the application
pm2 restart all
```

## Environment-Specific Configurations

### Development (Mac)
- Uses `vite.config.dev.ts`
- Development server: `http://localhost:5173`
- API server: `http://localhost:5000`
- Source maps enabled
- Hot module replacement enabled

### Production (Ubuntu)
- Uses `vite.config.prod.ts`
- Production URL: `https://auroville.social`
- API URL: `https://api.auroville.social`
- Source maps disabled
- Optimized build

## Troubleshooting Common Issues

### TypeScript Errors

1. Missing type definitions:
```bash
# Install missing type definitions
npm install --save-dev @types/missing-package
```

2. Implicit any errors:
```typescript
// Add type annotations
function processData(data: unknown) {
  if (typeof data === 'string') {
    // Now TypeScript knows data is a string
    return data.toUpperCase();
  }
  throw new Error('Invalid data type');
}
```

3. React Query type errors:
```typescript
// Properly type queries
const { data } = useQuery<YourDataType>({
  queryKey: ['key'],
  queryFn: () => fetchData()
});
```

### Build Issues

1. TypeScript build failures:
```bash
# Clear TypeScript cache
rm -rf node_modules/.cache/typescript

# Rebuild
npm run build:prod
```

2. Vite build issues:
```bash
# Clear Vite cache
rm -rf node_modules/.vite

# Rebuild
npm run build:prod
```

3. Node modules issues:
```bash
# Clean install
rm -rf node_modules
npm install
```

### Runtime Issues

1. Environment variables:
- Check `.env` files match environment
- Verify `vite.config.dev.ts` and `vite.config.prod.ts`

2. API connection issues:
- Verify API URLs in config files
- Check CORS settings
- Verify proxy settings

3. Database issues:
- Check connection strings
- Verify migrations are up to date
- Check database permissions

## Continuous Integration

For automated deployments, use GitHub Actions:

```yaml
name: CI/CD

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Type check
        run: npm run typecheck
      
      - name: Lint
        run: npm run lint
      
      - name: Build
        run: npm run build:prod
```

## Best Practices

1. Before Starting Development:
- Pull latest changes
- Install/update dependencies
- Run type checking
- Check environment variables

2. During Development:
- Use TypeScript strictly
- Run type checking frequently
- Test in both environments
- Document type changes

3. Before Deployment:
- Run full verification
- Test production build locally
- Update documentation
- Create backup if needed

4. After Deployment:
- Verify application status
- Check for type errors in console
- Monitor performance
- Test critical features

Remember to regularly update dependencies and apply security patches to maintain a healthy development environment.
