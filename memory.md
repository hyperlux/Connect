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

