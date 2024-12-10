# Development Memory

## Document Purpose
- Living documentation of project progress
- Reference for configuration and setup
- Troubleshooting guide and history
- Action items and next steps tracker
- Knowledge base for team collaboration

## How to Use This Document
1. Always update when making changes
2. Add new sections as needed
3. Keep history of issues and solutions
4. Document workflows and procedures
5. Track progress and status

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

### Docker Configuration```yaml
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

## Latest Debug Session (December 9, 2024)

### SSL Configuration
1. SSL certificates verified:
   ```bash
   /etc/letsencrypt/live/auroville.social/
   ├── cert.pem -> ../../archive/auroville.social/cert2.pem
   ├── chain.pem -> ../../archive/auroville.social/chain2.pem
   ├── fullchain.pem -> ../../archive/auroville.social/fullchain2.pem
   └── privkey.pem -> ../../archive/auroville.social/privkey2.pem
   ```

2. SSL Configuration in nginx:
   - Added SSL certificate paths
   - Configured modern SSL protocols and ciphers
   - Maintained working static file serving
   - Combined HTTP and HTTPS in single server block

### Next Steps
1. Test HTTPS access
2. Monitor SSL handshake in logs
3. Verify certificate renewal process
4. Consider adding HSTS later

https//:www.auroville.social

### Login Page Image Fix
1. Issue: Login page banner image not loading (404 error)
2. Root Cause: Incorrect image path in routes.tsx
3. Solution:
   - Changed image path from `/matrimandirimg.png` to `/firematri.png`
   - Image path was corrected in `routes.tsx` LoginPage component
   - Verified image exists in `/usr/share/nginx/html/firematri.png`

### Current Login Page Structure
```tsx
// Login page layout
<div className="min-h-screen bg-[#1E1E1E] flex">
  {/* Left side: Welcome Banner */}
  <div className="hidden lg:block w-1/2">
    <img src="/firematri.png" />
    <div className="gradient overlay">
      <h1>Welcome to Auroville</h1>
      <p>"Auroville wants to be the bridge between the past and the future."</p>
    </div>
  </div>
  
  {/* Right side: Login Form */}
  <div className="w-full lg:w-1/2">
    <LoginForm />
  </div>
</div>
```

### Login Page Layout Improvements (December 9, 2024)
1. Image Section Enhancement:
   - Added image brightness control for better readability
   - Optimized gradient overlay (bottom to top)
   - Improved text positioning and hierarchy
   - Enhanced visual composition

2. Updated Layout:
```tsx
<div className="min-h-screen bg-[#1E1E1E] flex">
  {/* Left side: Welcome Banner */}
  <div className="hidden lg:block w-1/2 relative">
    <img 
      src="/firematri.png" 
      className="w-full h-full object-cover brightness-75"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
      <div className="absolute bottom-0 p-16">
        <h1 className="text-5xl font-bold text-white">Welcome to Auroville</h1>
        <p className="text-2xl text-white/90 italic">Quote...</p>
      </div>
    </div>
  </div>
  
  {/* Right side: Login Form */}
  <div className="w-full lg:w-1/2">
    <LoginForm />
  </div>
</div>
```

3. Key Style Changes:
   - Text sizes: h1 (text-5xl), quote (text-2xl)
   - Gradient: from-black/90 via-black/40 to-transparent
   - Spacing: p-16 for main content
   - Image: brightness-75 for better contrast

### Welcome Page Addition (December 9, 2024)
1. Created new landing page with:
   - Full-screen hero section with Matrimandir image
   - Centered content with logo and welcome message
   - Call-to-action buttons for Sign In and Join Community
   - About section with three key pillars: Connect, Collaborate, Create

2. Route Changes:
   - "/" now shows Welcome page for non-authenticated users
   - "/" redirects to "/dashboard" for authenticated users
   - Moved login form to dedicated "/login" route
   - Updated protected route handling

3. Key Components:
```tsx
// Welcome page structure
<div className="min-h-screen">
  {/* Hero Section */}
  <div className="relative h-screen">
    <img src="/firematri.png" />
    <div className="overlay">
      <h1>Welcome to Auroville Community</h1>
      <div className="cta-buttons">
        <Link to="/login">Sign In</Link>
        <Link to="/signup">Join Community</Link>
      </div>
    </div>
  </div>

  {/* About Section */}
  <div className="grid grid-cols-3">
    <div>Connect</div>
    <div>Collaborate</div>
    <div>Create</div>
  </div>
</div>
```

4. Style Highlights:
   - Full-screen hero with gradient overlay
   - Centered content layout
   - Responsive design (mobile-friendly)
   - Consistent branding elements

## Latest Debugging Session (Login Issues)

### Progress
1. Fixed CORS configuration in nginx and API client
2. Updated API base URL to use relative URL `/api` in production
3. Enhanced error logging in API client
4. Current Status: Getting 500 Internal Server Error from backend

### Latest Changes
1. Switched to relative URLs for API endpoints
2. Increased request timeout to 30 seconds
3. Added detailed request/response logging
4. Simplified error handling to preserve original error objects

### Error Details
```
POST https://auroville.social/api/auth/login 500 (Internal Server Error)
Response error: {status: 500, data: {...}, headers: Rr}
```

### Next Steps
1. Test login with the updated configuration
2. Monitor detailed error logs in browser console
3. Check backend logs for corresponding error details
4. Verify backend API endpoint matches frontend expectations

### Configuration State
- Frontend proxy is working (requests reaching backend)
- CORS is properly configured
- API client is using relative URLs
- Service worker is registered successfully
- Enhanced error logging is in place

### Non-Critical Issues
- React Router warning about v7_startTransition (can be addressed later)
- TypeScript error for vite/client types (does not affect functionality)

# Debugging Session History

## Initial Setup and UI Changes
- Implemented Docker setup
- Made UI changes (sidebar colors, layout adjustments)
- Created welcome banner with image carousel
- Added new images to carousel

## Authentication and API Issues

### CORS and API Configuration Progress
1. Initial CORS errors when trying to access API
2. Updated nginx configuration to handle CORS
3. Modified API client configuration
4. Added proper error logging and handling

### Current State (Login Flow)
- Frontend successfully makes requests to `https://auroville.social/api`
- Service worker is registered and working
- Getting 500 Internal Server Error from backend on login attempt
- Enhanced error logging is in place

### Configuration Details
1. API Client:
   - Base URL: `https://auroville.social/api` in production
   - Timeout: 10 seconds
   - Credentials: enabled
   - Headers: Content-Type and Accept JSON

2. Nginx:
   - Proxying `/api` requests to backend
   - CORS headers configured
   - Error logging enabled

3. Error Handling:
   - Detailed request/response logging
   - Specific handlers for 401, 403, 500 errors
   - Network error tracking

### Current Error
```
POST https://auroville.social/api/auth/login 500 (Internal Server Error)
Response error: {status: 500, data: {...}, headers: Rr}
```

### Next Steps
1. Need to check backend logs for detailed error
2. Verify backend service status
3. Check database connectivity
4. Validate API endpoint implementation

### Known Issues
1. React Router Future Flag Warning (non-critical)
2. TypeScript vite/client types missing (non-critical)

### Recent Changes
- Switched between relative and absolute URLs for API
- Added enhanced error logging
- Updated nginx proxy configuration
- Configured proper CORS headers

