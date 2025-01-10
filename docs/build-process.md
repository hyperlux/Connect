# AurovilleConnect Build Process

## Docker Containers
- **auroville_app**: Node.js application container
- **auroville_nginx**: Nginx container for serving the application
- **auroville_db**: Database container (not detailed in the build output)

## Build Steps
1. Stopped and removed existing containers
2. Created network "aurovilleconnect_auroville_network"
3. Built the app container:
   - Node.js version: 20
   - NODE_ENV: production
   - npm install with deprecated packages and commands
4. Built the nginx container:
   - Nginx version: 1.27.3-alpine
   - Added nginx-mod-http-headers-more module
5. Created new containers

## Deprecation Warnings
- npm legacy builder is deprecated
- Several npm packages are deprecated:
  - rimraf@3.0.2
  - inflight@1.0.6
  - glob@7.2.3
  - @humanwhocodes/config-array@0.13.0
  - @humanwhocodes/object-schema@2.0.3
  - eslint@8.57.1
- npm commands:
  - `--force` is deprecated
  - `--only=production` should be replaced with `--omit=dev`
  - `--no-optional` should be replaced with `--omit=optional`

## Future Steps
1. Update npm to version 11.0.0
2. Replace deprecated npm packages with supported versions
3. Migrate to BuildKit for Docker builds
