# Stage 1: Build the frontend
FROM node:20-alpine AS frontend-builder

# Set build-time memory limit for node
ENV NODE_OPTIONS="--max-old-space-size=512"

# Set npm to production mode and use package cache
ENV NODE_ENV=production
ENV npm_config_cache=/tmp/npm-cache

WORKDIR /app/frontend

# Copy package files first to leverage layer caching
COPY package*.json ./
COPY vite.config.ts ./

# Install dependencies with npm ci for faster, reliable builds
RUN npm ci --no-audit --no-optional && \
    # Clear npm cache
    npm cache clean --force

# Copy source files
COPY src ./src
COPY public ./public

# Build with production optimization
RUN npm run build && \
    # Remove source files after build
    rm -rf src public

# Stage 2: Build the server
FROM node:20-alpine AS server-builder

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
FROM node:20-alpine

# Set production environment
ENV NODE_ENV=production
ENV NODE_OPTIONS="--max-old-space-size=512"

# Install PM2 globally
RUN npm install -g pm2

# Create non-root user
RUN addgroup -g 1001 appuser && \
    adduser -u 1001 -G appuser -s /bin/sh -D appuser

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