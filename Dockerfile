# Stage 1: Build the frontend
FROM node:20 AS frontend-builder

# Set build-time memory limit for node
ENV NODE_OPTIONS="--max-old-space-size=512"

# Set environment variables for build
ENV NODE_ENV=production
ENV VITE_NODE_ENV=production
ENV npm_config_cache=/tmp/npm-cache

WORKDIR /app/frontend

# Copy package files first to leverage layer caching
COPY package*.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY tsconfig*.json ./

# Install all dependencies in one command
RUN npm cache clean --force && \
    npm install --include=dev --no-audit --legacy-peer-deps --force

# Copy source files
COPY src ./src
COPY public ./public

# Build the frontend with error checking
RUN echo "Building frontend..." && \
    NODE_ENV=production npx vite build && \
    echo "Build completed successfully" && \
    echo "Build output:" && \
    ls -la dist && \
    echo "Verifying build files:" && \
    [ -f dist/index.html ] && \
    [ -f dist/service-worker.js ] && \
    [ -d dist/assets ] && \
    echo "Build verification successful"

# Remove unnecessary files
RUN rm -rf node_modules

# Stage 2: Build the server
FROM node:20 AS server-builder

# Set build-time memory limit for node
ENV NODE_OPTIONS="--max-old-space-size=512"

# Set npm to production mode and use package cache
ENV NODE_ENV=production
ENV npm_config_cache=/tmp/npm-cache

WORKDIR /app/server

# Create logs directory early with correct permissions using numeric UID/GID
RUN mkdir -p /app/server/logs && \
    chown -R 1001:1001 /app/server/logs && \
    chmod -R 775 /app/server/logs

# Copy and verify package.json
COPY server/package.json ./
RUN echo "Verifying package.json contents:" && \
    cat package.json && \
    echo "Current directory contents:" && \
    pwd && ls -la && \
    echo "File permissions:" && \
    ls -l package.json && \
    echo "Checking for prisma:generate script:" && \
    npm run | grep prisma:generate && \
    echo "Package.json location:" && \
    find / -name package.json 2>/dev/null && \
    echo "Environment variables:" && \
    printenv

# Copy package-lock.json
COPY server/package-lock.json ./
RUN echo "Verifying package-lock.json:" && \
    ls -l package-lock.json && \
    echo "Listing available npm scripts:" && \
    npm run && \
    echo "Package-lock.json location:" && \
    find / -name package-lock.json 2>/dev/null && \
    echo "Node version:" && \
    node -v && \
    echo "NPM version:" && \
    npm -v

# Copy prisma schema first
COPY prisma/schema.prisma ./prisma/

# Install dependencies and generate Prisma client
RUN npm install && \
    npm install -g prisma && \
    npx prisma generate && \
    ls -la node_modules/.prisma/client && \
    node -e "require('@prisma/client')" && \
    echo "Prisma client generated and verified successfully" && \
    npm cache clean --force

# Verify and copy essential server files
COPY server/index.js ./
COPY server/package.json ./
COPY server/package-lock.json ./
COPY server/config ./config
COPY server/lib ./lib
COPY server/middleware ./middleware
COPY server/routes ./routes

# Ensure correct file extensions for ES modules
RUN find . -name "*.cjs" -exec sh -c 'mv "$1" "${1%.cjs}.js"' _ {} \;

# Stage 3: Backend server
FROM node:20-alpine AS app

# Set production environment
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"

# Install PM2, curl, and required build tools
RUN apk add --no-cache python3 make g++ curl && \
    npm install -g pm2 prisma

# Create non-root user
RUN addgroup -g 1001 appuser && \
    adduser -u 1001 -G appuser -s /bin/sh -D appuser

WORKDIR /app/server
COPY --from=server-builder /app/server .
COPY ecosystem.config.cjs .

# Install production dependencies and set permissions
RUN npm install && \
    npx prisma generate && \
    apk del python3 make g++ && \
    npm prune --production && \
    mkdir -p /app/server/logs && \
    chown -R appuser:appuser /app/server && \
    chmod -R 775 /app/server/logs

# Configure PM2 logging
RUN pm2 set pm2-logrotate:max_size 10M && \
    pm2 set pm2-logrotate:retain 30 && \
    pm2 set pm2-logrotate:compress true && \
    pm2 set pm2-logrotate:dateFormat YYYY-MM-DD_HH-mm-ss && \
    pm2 set pm2-logrotate:workerInterval 30 && \
    pm2 set pm2-logrotate:rotateInterval '0 0 * * *' && \
    pm2 set pm2-logrotate:rotateModule true

# Copy and setup health check script
COPY server/health-check.sh /app/server/
RUN chmod +x /app/server/health-check.sh && \
    chown appuser:appuser /app/server/health-check.sh

# Switch to non-root user
USER appuser

# Expose port
EXPOSE 5000

# Start the server directly with PM2 in production mode
CMD ["pm2-runtime", "ecosystem.config.cjs", "--env", "production"]

# Stage 4: Nginx server
FROM nginx:stable-alpine AS nginx

# Copy nginx configuration
COPY deploy/nginx.conf/nginx.docker.conf /etc/nginx/conf.d/auroville.conf

# Copy built frontend files and auroimgs
COPY --from=frontend-builder /app/frontend/dist/. /usr/share/nginx/html/
COPY public/auroimgs /usr/share/nginx/html/auroimgs

# Expose ports
EXPOSE 80 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
