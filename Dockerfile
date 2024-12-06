# Build stage
FROM node:18-alpine as build

# Set environment variable to skip installing optional dependencies
ENV NODE_ENV=production

WORKDIR /app

# Copy package files and install production dependencies first
COPY package*.json ./
RUN npm ci --only=production

# Copy source code
COPY . .

# Install dev dependencies and build
RUN npm install --only=development && \
    npm run build && \
    npm prune --production

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