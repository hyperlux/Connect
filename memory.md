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

## Latest Progress (December 10, 2023)
1. Build now succeeds with React Router configuration
2. Login attempt produces a 500 error with specific message
3. Service worker successfully registered
4. React Router warnings present but non-blocking

## Current Error Details
```
POST https://auroville.social/api/auth/login 500 (Internal Server Error)
Response error: {
  status: 500, 
  data: {
    message: 'Login failed. Please try again.'
  },
  url: '/auth/login',
  method: 'post'
}
```

## Current State
1. Frontend:
   - Successfully built and deployed
   - React Router warnings present but functional
   - Service worker registered
   - API client configured correctly

2. Backend:
   - Receiving requests successfully
   - Returning 500 error on login attempt
   - Error message suggests authentication failure

3. API Communication:
   - CORS issues resolved
   - Requests reaching backend
   - Response headers properly set

## Next Steps
1. Check backend logs for detailed error information
2. Verify database connection in backend
3. Validate login credentials format
4. Check backend authentication middleware
5. Review Prisma user model implementation

## Known Issues
1. React Router warnings (non-blocking):
   - v7_startTransition
   - v7_relativeSplatPath
   - v7_fetcherPersist
   - v7_partialHydration
   - v7_skipActionErrorRevalidation
2. Backend returning 500 error on login

## Recent Changes
1. Fixed TypeScript errors in router configuration
2. Updated API client error handling
3. Improved error logging
4. Service worker properly registered

## Debug Plan
1. Check backend logs for detailed error trace
2. Verify database connection string
3. Test database connectivity
4. Review authentication middleware
5. Validate password hashing implementation

