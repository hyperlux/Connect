# Service Worker Implementation and Debugging

## Overview
This document details the implementation and debugging of the service worker for the Auroville Connect platform, addressing issues with service worker registration and caching.

## Initial Issues
1. Service Worker registration failing with 404 error
2. Incorrect scope path with 'undefined' in the URL
3. Caching headers not properly set
4. Syntax errors in service worker implementation

## Solutions Implemented

### 1. Service Worker Registration
- Updated serviceWorkerRegistration.tsx to use absolute URL:
```typescript
const swUrl = 'https://auroville.social/service-worker.js';
```
This ensures the service worker is loaded from the correct path regardless of the current route.

### 2. Nginx Configuration
- Installed nginx-extras for advanced header management:
```bash
sudo apt-get install -y nginx-extras
```

- Updated nginx configuration for proper service worker handling:
```nginx
location = /service-worker.js {
    alias /var/www/html/AurovilleConnect/service-worker.js;
    
    more_clear_headers 'Cache-Control' 'Pragma' 'Expires' 'Last-Modified' 'ETag';
    more_set_headers 'Cache-Control: no-store, no-cache, must-revalidate, proxy-revalidate, max-age=0';
    more_set_headers 'Pragma: no-cache';
    more_set_headers 'Expires: 0';
    more_set_headers 'Service-Worker-Allowed: /';
    
    default_type application/javascript;
    
    access_log /var/log/nginx/sw_access.log;
    error_log /var/log/nginx/sw_error.log debug;
}
```

### 3. Service Worker Implementation
- Implemented proper caching strategy for static assets
- Added error handling for API requests
- Implemented immediate activation with skipWaiting()
- Added client claim on activation
- Configured cache cleanup for old versions

Key features:
- Cache name versioning for updates
- Separate handling for API requests
- Fallback responses for offline navigation
- Proper error handling for failed requests

### 4. Build Process
- Modified the build process to properly copy service worker:
```json
{
  "scripts": {
    "build": "tsc && NODE_ENV=production vite build && cp public/service-worker.js dist/"
  }
}
```

## File Structure
```
/root/AurovilleConnect/
├── public/
│   └── service-worker.js    # Service worker implementation
├── src/
│   └── serviceWorkerRegistration.tsx    # Registration logic
└── nginx.conf              # Nginx configuration
```

## Deployment Process
1. Build the frontend with `npm run build`
2. Copy service worker to nginx serving directory
3. Set proper file permissions
4. Restart nginx to apply configuration changes

## Testing
To verify the service worker:
```bash
# Check headers
curl -I https://auroville.social/service-worker.js

# Verify content
curl -s https://auroville.social/service-worker.js
```

## Debugging Tips
1. Use nginx error logs: `/var/log/nginx/sw_error.log`
2. Check service worker logs in browser DevTools
3. Verify file permissions in nginx serving directory
4. Monitor network requests for proper caching headers

## Current Status and Next Steps

### Current Status (as of Dec 27, 2024)
1. Service worker registration is still showing errors with 'undefined' in the path
2. Nginx configuration has been updated but caching headers are not being applied correctly
3. Service worker implementation has been fixed but not successfully deployed
4. Build process has been modified but needs verification

### Immediate Next Steps
1. Debug why the updated service worker file is not being served:
   - Verify the file content at `/var/www/html/AurovilleConnect/service-worker.js`
   - Check nginx logs for any permission issues
   - Test file serving directly through nginx
2. Verify nginx headers-more module is working:
   - Check module loading in nginx configuration
   - Test header modifications with simpler configuration
3. Test service worker registration:
   - Clear browser cache and unregister existing service workers
   - Monitor browser console for registration errors
   - Verify scope and path issues are resolved

### Future Considerations
1. Implement versioning strategy for cache updates
2. Add monitoring for service worker errors
3. Consider implementing background sync for offline capabilities
4. Add push notification support

## Resume Point
To continue this work later:
1. Start by checking `/var/log/nginx/sw_error.log` for any new errors
2. Verify the content of `/var/www/html/AurovilleConnect/service-worker.js`
3. Test service worker registration in a fresh browser session
4. Follow the "Immediate Next Steps" section above