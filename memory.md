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
- Containers are running but application is not rendering
- Service worker is configured but may be interfering with loading
- Import paths have been fixed but application still not loading

## Debugging Steps Needed
1. Container Health Check:
   ```bash
   # Check container logs
   docker logs aurovilleconnect-frontend-1
   docker logs aurovilleconnect-backend-1
   
   # Check container status
   docker ps
   ```

2. Frontend Build Verification:
   - Check if the build files are being generated correctly
   - Verify the nginx configuration is serving the correct files
   - Check browser console for any JavaScript errors
   - Verify the static files are accessible

3. Service Worker Issues:
   - Temporarily disable service worker for debugging
   - Check if application loads without service worker
   - Verify cache storage is not corrupted

4. Network Requests:
   - Monitor network requests in browser dev tools
   - Check for 404 errors on essential files
   - Verify API endpoints are accessible
   - Check CORS configuration

5. Required Checks:
   ```bash
   # Check nginx configuration
   sudo nginx -t
   
   # Check nginx logs
   sudo tail -f /var/log/nginx/error.log
   sudo tail -f /var/log/nginx/access.log
   
   # Verify frontend build
   docker exec aurovilleconnect-frontend-1 ls -la /usr/share/nginx/html
   ```

## Recent Changes
### Service Worker Updates
- Reduced cached assets to essential static files
- Added error handling for cache operations
- Excluded API requests from caching
- Added offline fallback support

### Import Path Fixes
- Updated auth imports to use .tsx extension
- Fixed routes import path
- Corrected theme provider import

### Next Steps
1. Check frontend container build output
2. Verify static files are being served
3. Temporarily disable service worker
4. Check for JavaScript console errors
5. Verify API connectivity

### Previous Changes
- Enhanced API client configuration
- Updated nginx CORS configuration
- Fixed authentication module imports
- Added proper error handling

### Monitoring
- Watch container logs
- Monitor nginx error logs
- Check browser console errors
- Track network requests

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