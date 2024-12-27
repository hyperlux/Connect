# API Request Blocking Issue Resolution Steps

## Issue Description
- Service Worker registration successful but API requests being blocked
- Error: `POST http://localhost:5000/api/auth/login net::ERR_BLOCKED_BY_CLIENT`
- Requests attempting to use localhost:5000 instead of production API URL

## Changes Made

### 1. Environment Configuration
- Updated environment.ts to properly detect production mode
- Modified API URL configuration to handle different environments
- Ensured consistent HTTPS usage for production URLs

### 2. Service Worker Modifications
- Updated service worker registration to unregister existing workers
- Made service worker URL dynamic based on origin
- Modified service worker to bypass API requests completely
- Removed hardcoded localhost:5000 references

### 3. Nginx Configuration
- Updated nginx configuration to handle API requests properly
- Changed API server block to use port 8000 instead of 5000
- Added proper CORS headers and SSL configuration
- Implemented API request redirection to api.auroville.social

### 4. Build and Deployment
- Rebuilt frontend with production settings
- Restarted all PM2 services
- Ensured proper environment variable propagation

## Current State
- Service worker bypasses API requests
- Nginx configured to handle HTTPS and API routing
- Environment detection in place for proper URL selection
- Frontend and backend services running under PM2

## Next Steps If Issue Persists

### 1. Client-side Investigation
- Clear browser cache and service workers
  ```javascript
  // In browser console
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for(let registration of registrations) {
      registration.unregister();
    }
  });
  ```
- Check browser network tab for request headers
- Verify no browser extensions are interfering
- Test in incognito mode

### 2. Server-side Verification
- Verify API server is listening on correct port
  ```bash
  netstat -tulpn | grep LISTEN
  ```
- Check nginx access and error logs
  ```bash
  tail -f /var/log/nginx/access.log
  tail -f /var/log/nginx/error.log
  ```
- Verify SSL certificates are valid
  ```bash
  openssl x509 -in /etc/letsencrypt/live/auroville.social/fullchain.pem -text -noout
  ```

### 3. Additional Configuration Checks
- Review vite.config.ts proxy settings
- Check all .env files for conflicting configurations
- Verify PM2 environment variables
  ```bash
  pm2 env auroville-connect-server
  ```

### 4. Alternative Approaches
- Consider implementing API request retry logic
- Add request origin logging for debugging
- Implement circuit breaker pattern for API calls
- Consider using different ports for development and production

### 5. Monitoring
- Add detailed logging for API requests
- Monitor service worker registration events
- Track API request success/failure rates
- Set up error tracking for blocked requests

## Related Files
- src/lib/environment.ts
- src/lib/api.ts
- public/service-worker.js
- src/serviceWorkerRegistration.tsx
- nginx.conf
- ecosystem.config.js

## Commands Used
```bash
# Build and deployment
npm run build:prod
pm2 restart all --update-env
pm2 start ecosystem.config.js

# Nginx
sudo systemctl restart nginx

# View logs
pm2 logs
tail -f /var/log/nginx/*.log