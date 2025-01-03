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

# Debug: Show package.json contents
RUN cat package.json

# Debug: Show package-lock.json contents
RUN cat package-lock.json

# Clear npm cache and install dependencies using npm ci
RUN npm cache clean --force && \
    npm ci --no-audit --include=dev

# Copy source files
COPY src ./src
COPY public ./public

# Build the frontend using npm exec
WORKDIR /app/frontend
RUN npx vite build && \
    cp public/service-worker.js dist/ && \
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

# Copy built frontend and server
COPY --from=frontend-builder /app/frontend/dist ./public
COPY --from=server-builder /app/server ./server
COPY ecosystem.config.js .

# Set correct permissions
RUN chown -R appuser:appuser /app

# Switch to non-root user
USER appuser

WORKDIR /app/server

# Install production dependencies only
RUN npm ci --only=production --no-audit --no-optional && \
    npm cache clean --force

# Expose port
EXPOSE 5000

# Use PM2 to run the application
CMD ["pm2-runtime", "start", "/app/ecosystem.config.js"]