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
1. Identified Prisma Query Engine compatibility issue
2. Backend logs show detailed error information
3. Database connection failing due to binary mismatch
4. Email service successfully configured

## Current Error Details
```
Prisma Client could not locate the Query Engine for runtime "linux-musl".
This happened because Prisma Client was generated for "debian-openssl-3.0.x", but the actual deployment required "linux-musl".
```

## Current State
1. Backend:
   - Server running on port 5000
   - Email service connected successfully
   - Prisma client initialization failing
   - Request logging working properly

2. Database:
   - Connection URL configured: postgresql://postgres:****@db:5432/auroville
   - Prisma schema includes correct binary targets
   - OpenSSL detection issues present

3. Authentication Flow:
   - Request reaching backend
   - Input validation passing
   - Database query failing due to Prisma error

## Next Steps
1. Rebuild backend with proper Prisma setup:
   ```bash
   # Inside backend container
   npx prisma generate
   ```
2. Verify OpenSSL installation in container
3. Check database container accessibility
4. Test database connection after fixes

## Known Issues
1. Prisma binary compatibility mismatch
2. OpenSSL version detection failing
3. React Router warnings (non-blocking)

## Debug Plan
1. Execute in backend container:
   ```bash
   apk add --no-cache openssl
   npx prisma generate
   ```
2. Verify database connection
3. Test user authentication
4. Monitor Prisma query execution

## Recent Changes
1. Schema already includes required binary targets:
   ```prisma
   generator client {
     provider = "prisma-client-js"
     previewFeatures = ["postgresqlExtensions"]
     binaryTargets = ["native", "linux-musl-openssl-3.0.x", "linux-musl"]
   }
   ```
2. Email service successfully configured
3. Request logging implemented
4. Input validation working

## Latest Progress
1. Identified and resolved Prisma Client configuration issue for `linux-musl` environment.
2. Regenerated Prisma Client with correct binary targets inside the Docker container.
3. Rebuilt and restarted the backend service to apply changes.
4. Integrated new pages for email sent and email verified states into the routing configuration.
5. Verified that the backend service is running correctly and handling requests as expected.

## Latest Troubleshooting Steps
1. Checked backend logs for errors related to database connections or server-side issues.
2. Verified database connection from the backend service.
3. Ensured all necessary environment variables are correctly set.
4. Tested the `/auth/login` API endpoint manually to verify response.
5. Reviewed recent code changes in authentication logic for correctness.

## Observations
- 500 Internal Server Error persists during login attempts.
- Backend logs indicate potential issues with Prisma Client configuration.
- Need to ensure OpenSSL is correctly installed and detected in the container.

