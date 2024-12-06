# Build stage
FROM node:18-alpine as build

WORKDIR /app

# Add build utilities
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies with verbose logging
RUN npm install --verbose

# Copy source code
COPY . .

# Show directory contents for debugging
RUN ls -la && \
    echo "Node version:" && node -v && \
    echo "NPM version:" && npm -v

# Build with verbose output
RUN echo "Starting build..." && \
    npm run build:prod --verbose

# Production stage
FROM nginx:alpine

# Install necessary packages
RUN apk add --no-cache certbot certbot-nginx

# Create directory for SSL certificates
RUN mkdir -p /etc/nginx/ssl/live/auroville.social

# Copy built assets
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
    CMD wget --quiet --tries=1 --spider http://localhost:80 || exit 1

# Expose ports
EXPOSE 80
EXPOSE 443

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 