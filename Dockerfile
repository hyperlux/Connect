# Stage 1: Build the frontend
FROM node:20 AS frontend-builder

# Set build-time memory limit for node (increased to 2048MB for Vite build)
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Set environment variables for build
ENV NODE_ENV=production
ENV VITE_NODE_ENV=production
# ENV VITE_FRONTEND_URL=https://auroville.social
ENV npm_config_cache=/tmp/npm-cache

WORKDIR /app/frontend
COPY .env .
RUN mkdir -p /app/server
COPY .env /app/server/.env

# Copy package files first to leverage layer caching
COPY package*.json ./
COPY vite.config.ts ./
COPY index.html ./
COPY tsconfig*.json ./
COPY postcss.config.js ./
COPY tailwind.config.js ./

# Install all dependencies in one command
RUN npm cache clean --force && \
    npm install --include=dev --no-audit --legacy-peer-deps --force

# Copy source files
COPY src ./src
COPY public ./public

# Build the frontend with comprehensive error checking and logging
RUN set -e && \
    echo "Building frontend..." && \
    NODE_ENV=production npm run build && \
    echo "Build completed successfully" && \
    echo "Build output:" && \
    ls -la dist && \
    echo "Detailed directory structure:" && \
    find dist -type d && \
    echo "Verifying build files:" && \
    test -f dist/index.html && \
    test -d dist/assets && \
    echo "Frontend build verification successful" || \
    (echo "Frontend build verification failed" && \
     echo "Current directory contents:" && \
     pwd && ls -la && \
     echo "Vite version:" && \
     npx vite --version && \
     echo "Node version:" && \
     node --version && \
     echo "npm version:" && \
     npm --version && \
     exit 1)

# Remove unnecessary files
RUN rm -rf node_modules

# Stage 2: Build the server
FROM node:20 AS server-builder

# Set build-time memory limit for node (increased to 2048MB)
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Set npm to production mode and use package cache
ENV NODE_ENV=production
ENV npm_config_cache=/tmp/npm-cache

WORKDIR /app/server
COPY --from=frontend-builder /app/server/.env .

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
    ls -l package.json

# Copy package-lock.json
COPY server/package-lock.json ./

# Copy prisma schema first
COPY prisma/schema.prisma ./prisma/

# Install dependencies and generate Prisma client without database connection
RUN npm install -g prisma && \
    npm install && \
    npx prisma generate && \
    ls -la node_modules/.prisma/client && \
    node -e "require('@prisma/client')" && \
    echo "Prisma client generated successfully" && \
    npm cache clean --force

# Verify and copy essential server files
COPY server/index.js ./
COPY server/package.json ./
COPY server/package-lock.json ./
COPY server/config ./config
COPY server/lib ./lib
COPY server/middleware ./middleware
COPY server/routes ./routes
COPY server/prisma ./prisma

# Stage 3: Backend server
FROM node:20-alpine AS app

# Set production environment
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Install PM2, curl, and required build tools
RUN apk add --no-cache python3 make g++ curl netcat-openbsd dos2unix bash && \
    npm install -g pm2 prisma

# Create non-root user
RUN addgroup -g 1001 appuser && \
    adduser -u 1001 -G appuser -s /bin/bash -D appuser

WORKDIR /app/server
COPY --from=server-builder /app/server .

# Copy and rename ecosystem config
COPY ecosystem.config.cjs ./ecosystem.config.cjs

# Install production dependencies and set permissions
RUN npm install && \
    npx prisma generate && \
    apk del python3 make g++ && \
    npm prune --production && \
    mkdir -p /app/server/logs && \
    chown -R appuser:appuser /app/server && \
    chmod -R 775 /app/server/logs

# Copy and setup startup script with debug output
COPY server/start.sh /app/server/
RUN dos2unix /app/server/start.sh && \
    chmod +x /app/server/start.sh && \
    chown appuser:appuser /app/server/start.sh && \
    echo "Verifying start.sh:" && \
    ls -la /app/server/start.sh && \
    cat /app/server/start.sh

# Switch to non-root user
USER appuser

# Add debug command to show file existence and permissions at runtime
ENTRYPOINT ["/bin/bash"]
CMD ["/app/server/start.sh"]

# Stage 4: Nginx server
FROM nginx:stable-alpine AS nginx

# Copy nginx configuration
COPY deploy/nginx.conf/nginx.docker.conf /etc/nginx/conf.d/auroville.conf

# Copy built frontend files and auroimgs
COPY --from=frontend-builder /app/frontend/dist/. /usr/share/nginx/html/
COPY public/auroimgs /usr/share/nginx/html/auroimgs

# Verify CSS files in nginx
RUN echo "Verifying CSS files in nginx:" && \
    find /usr/share/nginx/html/assets -name "*.css" -exec echo "Found CSS file: {}" \; && \
    echo "CSS files verification complete"

# Expose ports
EXPOSE 80 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
