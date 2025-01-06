# Stage 1: Build the frontend
FROM node:20 AS frontend-builder

# Set build-time memory limit for node
ENV NODE_OPTIONS="--max-old-space-size=512"

# Set npm to production mode and use package cache
ENV NODE_ENV=production
ENV npm_config_cache=/tmp/npm-cache

WORKDIR /app/frontend

# Copy package files first to leverage layer caching
COPY package*.json ./
COPY vite.config.ts ./

# Install dependencies using npm ci
RUN npm cache clean --force && \
    npm ci --no-audit --include=dev

# Copy source files
COPY src ./src
COPY public ./public

# Build the frontend with error checking
RUN echo "Building frontend..." && \
    npx vite build && \
    echo "Build completed successfully" && \
    echo "Build output:" && \
    ls -la dist && \
    cp public/service-worker.js dist/ && \
    echo "Service worker copied successfully" && \
    # Remove source files after build
    rm -rf src public

# Stage 2: Build the server
FROM node:20 AS server-builder

# Set build-time memory limit for node
ENV NODE_OPTIONS="--max-old-space-size=512"

# Set npm to production mode and use package cache
ENV NODE_ENV=production
ENV npm_config_cache=/tmp/npm-cache

WORKDIR /app/server

# Copy package files first
COPY server/package*.json ./

# Install dependencies with npm ci
RUN npm ci --no-audit --no-optional && \
    # Clear npm cache
    npm cache clean --force

# Copy server source
COPY server/ .

# Stage 3: Final image
FROM node:20

# Set production environment
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"

# Install PM2 globally
RUN npm install -g pm2

# Create non-root user
RUN addgroup --gid 1001 appuser && \
    adduser -u 1001 --gid 1001 --shell /bin/sh --disabled-password --disabled-login appuser

WORKDIR /app

# Copy built frontend to Nginx serving directory
COPY --from=frontend-builder /app/frontend/dist /usr/share/nginx/html/dist
RUN echo "Verifying frontend build:" && \
    ls -la /usr/share/nginx/html/dist && \
    chmod -R 755 /usr/share/nginx/html/dist

COPY --from=server-builder /app/server ./server
COPY ecosystem.config.js ./

# Create logs directory
RUN mkdir -p logs && \
    chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

# Install production dependencies only
RUN cd server && npm ci --only=production --no-audit --no-optional && \
    npm cache clean --force

# Expose port
EXPOSE 5000

# Start the server using PM2 in production mode
CMD ["pm2-runtime", "ecosystem.config.js"]