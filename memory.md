# Development Memory

## Docker Setup Explanation

### Container Architecture
1. Frontend Container (`Dockerfile.frontend`):
   - Builds React application
   - Uses nginx to serve static files
   - Handles client-side routing
   - Serves on port 80/443
   - Located at: auroville.social

2. Backend Container (`Dockerfile`):
   - Runs Node.js API server
   - Handles API requests
   - Serves on port 5000
   - Located at: api.auroville.social

### Docker Configuration
```yaml
# docker-compose.yml structure
services:
  frontend:
    build:
      context: .
      dockerfile: Dockerfile.frontend
    ports:
      - "80:80"
      - "443:443"
    depends_on:
      - backend

  backend:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "5000:5000"
```

### Deployment Flow
1. Local Development:
   ```bash
   # Development mode
   npm run dev
   ```

2. Production Build:
   ```bash
   # Build and start containers
   docker-compose down
   docker compose up -d --build
   ```

3. Server Update:
   ```bash
   # On server
   git pull origin main
   docker-compose down
   docker compose up -d --build
   ```

### Container Roles
1. Frontend Container:
   - Serves static React app
   - Handles client routing
   - Proxies API requests to backend
   - Manages SSL/HTTPS

2. Backend Container:
   - Runs API server
   - Handles database connections
   - Processes business logic
   - Manages authentication

### Monitoring
```bash
# View container logs
docker logs aurovilleconnect-frontend-1
docker logs aurovilleconnect-backend-1

# Check container status
docker ps

# View nginx logs
sudo tail -f /var/log/nginx/error.log
sudo tail -f /var/log/nginx/access.log
```

## Recent Changes
- Simplified service worker
- Updated Docker configurations
- Fixed file permissions
- Updated nginx settings

## Current Status (Latest)
- Frontend container failing to start
- Nginx configuration issues resolved but still not serving content
- Build process completing but application not accessible

## Recent Changes and Debugging Steps

### 1. Frontend Container Configuration
- Updated Dockerfile.frontend with:
  ```dockerfile
  # Added debugging steps
  RUN echo "Starting build process..." && \
      ls -la && \
      npm run build && \
      echo "Build complete"
  
  # Added health check
  RUN echo "OK" > /usr/share/nginx/html/health.html
  ```

### 2. Nginx Configuration
- Removed problematic directives from server context
- Simplified configuration to basic http server
- Added proper static file handling
- Added health check endpoint
- Current configuration:
  ```nginx
  http {
    # Basic settings
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;
    
    # Server block
    server {
      listen 80;
      server_name localhost;
      root /usr/share/nginx/html;
      # ... other settings
    }
  }
  ```

### 3. Vite Configuration
- Updated build settings
- Added proper production configuration
- Added sourcemaps for debugging
- Added vendor chunk splitting
- Configuration:
  ```typescript
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true,
    manifest: true
  }
  ```

### Current Issues
1. Frontend Container:
   - Container restarts continuously
   - Build process completes but serving fails
   - Nginx configuration may still have issues

2. Build Process:
   - Build completes successfully
   - Assets are generated
   - Files copied to nginx directory
   - But content not served properly

### Next Debug Steps
1. Check build output:
   ```bash
   docker exec aurovilleconnect-frontend-1 ls -la /usr/share/nginx/html
   ```

2. Verify nginx configuration:
   ```bash
   docker exec aurovilleconnect-frontend-1 nginx -t
   ```

3. Check container logs:
   ```bash
   docker logs aurovilleconnect-frontend-1
   ```

4. Test basic connectivity:
   ```bash
   curl http://localhost/health.html
   ```

### Required Actions
1. Verify file permissions in nginx container
2. Check if nginx is starting properly
3. Verify build output is correct
4. Test basic static file serving
5. Check nginx error logs

### Previous Changes
- Fixed auth and theme module imports
- Updated service worker configuration
- Added proper error handling
- Fixed CORS configuration

### Monitoring
- Watch container restart count
- Monitor nginx error logs
- Check build output
- Verify file permissions

## Development Status & Progress Log

## Current Status
1. ✅ Recent Changes:
   - Moved welcome banner to login page
   - Removed Decision Hub components
   - Centered search bar and visitor count
   - Updated sidebar active state to orange
   - Fixed important announcements layout

2. ✅ Core Infrastructure:
   - Frontend deployed on auroville.social
   - Backend API on api.auroville.social
   - PostgreSQL database running
   - HTTPS with SSL certificates configured
   - Docker containers orchestrated
   - CORS configuration fixed

3. ✅ Authentication System:
   - Login functionality with welcome banner
   - Registration with email verification
   - Password reset flow
   - Protected routes working
   - Session management
   - JWT token handling

4. ✅ Core Features:
   - Profile management
   - File upload system
   - Dark mode support
   - Community announcements
   - Event management
   - Forums and discussions
   - Bazaar marketplace
   - Community services
   - Resource center

## Latest Changes
1. UI/UX Improvements:
   - ✅ Added split-screen login page with welcome banner
   - ✅ Centered search bar and visitor count in header
   - ✅ Updated sidebar active state to orange (#E27B58)
   - ✅ Improved important announcements layout (horizontal)
   - ✅ Streamlined navigation by removing Decision Hub

2. Component Updates:
   - ✅ Removed Decision Hub from sidebar navigation
   - ✅ Removed Decision Hub from dashboard layout
   - ✅ Reorganized dashboard priorities
   - ✅ Enhanced login page with Matrimandir image
   - ✅ Added welcome message and quote to login

3. Layout Optimizations:
   - ✅ Improved dashboard grid layout
   - ✅ Better spacing in announcements
   - ✅ Centered header elements
   - ✅ Consistent navigation styling
   - ✅ Responsive design improvements

## Current Focus
1. 🔧 Immediate Tasks:
   - Monitor new login page performance
   - Verify navigation flow without Decision Hub
   - Test responsive layouts
   - Check dark mode compatibility

2. 🔍 Monitoring:
   - User feedback on new login experience
   - Navigation patterns without Decision Hub
   - Dashboard layout effectiveness
   - System performance

## Next Steps
1. Potential Improvements:
   - Further login page enhancements
   - Additional welcome banner quotes
   - Dashboard widget customization
   - User preference settings

2. Feature Pipeline:
   - Push notifications system
   - Image optimization
   - Real-time updates
   - Enhanced search
   - Community features

## Development Workflow
1. Local Development:
   ```bash
   npm run dev
   ```

2. Production Deployment:
   ```bash
   git pull origin main
   docker-compose down
   docker compose up -d --build
   ```

3. Infrastructure:
   - Frontend: ✅ Running on auroville.social
   - Backend: ✅ API running on api.auroville.social
   - Database: ✅ PostgreSQL with persistent storage
   - Cache: ✅ Service worker and browser cache
   - SSL: ✅ Let's Encrypt certificates

## Notes
- Keep monitoring user feedback on new login experience
- Watch for any navigation issues after Decision Hub removal
- Track performance of centered header elements
- Monitor dashboard layout effectiveness
- Maintain security updates

## Recent Changes

### Authentication and Theme Module Fixes (Latest)
- Removed duplicate auth.ts and theme.ts files in favor of their .tsx counterparts
- Fixed ThemeProvider exports and imports across the application
- Added missing User interface properties (createdAt, profilePicture, bio)
- Added missing AuthContext methods (register, clearError, updateProfile, uploadProfilePicture)
- Updated imports in App.tsx and other components to use correct file extensions

### Current Issue
- CORS configuration error on the API server
- The 'Access-Control-Allow-Origin' header contains duplicate values
- Error occurs when attempting to login at api.auroville.social/auth/login
- Need to fix CORS configuration in the backend to only include one value for Access-Control-Allow-Origin

### Required Backend Fix
```nginx
# Current problematic configuration (example)
add_header 'Access-Control-Allow-Origin' 'https://auroville.social';
add_header 'Access-Control-Allow-Origin' 'https://auroville.social';

# Should be changed to
add_header 'Access-Control-Allow-Origin' 'https://auroville.social';
```

### API and CORS Configuration Updates (Latest)
- Enhanced API client configuration in `src/lib/api.ts`:
  - Added TypeScript types with AxiosError
  - Improved error handling with specific status codes
  - Added request timeout (10s)
  - Added better error logging with context
  - Enabled withCredentials for CORS
  - Added Accept header

- Updated nginx CORS configuration:
  - Simplified CORS headers to avoid duplication
  - Added proper error handling with JSON responses
  - Added request method restrictions
  - Improved OPTIONS request handling
  - Added error handler location block

### Current Issues
1. CORS Error:
   - Still seeing "Access-Control-Allow-Origin header contains multiple values" error
   - Need to verify nginx configuration is properly applied on the server

2. Authentication Module:
   - Import errors with auth.ts vs auth.tsx
   - Need to ensure all imports are using .tsx extension

3. Service Worker:
   - Cache errors in service worker
   - "Failed to execute 'addAll' on 'Cache': Request failed"

### Required Actions
1. Backend:
   ```bash
   # Verify nginx configuration
   sudo nginx -t
   # Restart nginx
   sudo systemctl restart nginx
   ```

2. Frontend:
   ```bash
   # Rebuild containers
   docker-compose down
   docker compose up -d --build
   ```

3. Code Fixes Needed:
   - Update all auth imports to use .tsx extension
   - Fix service worker caching strategy
   - Verify all routes are properly exported

### Previous Changes
- Removed duplicate auth.ts and theme.ts files
- Fixed ThemeProvider exports
- Added missing User interface properties
- Added missing AuthContext methods
- Updated imports in App.tsx

### Monitoring
- Watch nginx error logs for CORS issues
- Monitor API response times
- Track authentication flow
- Check service worker caching