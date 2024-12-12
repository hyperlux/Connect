# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Install global dependencies
RUN npm install -g typescript

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source files
COPY . .

# Build the application
RUN echo "Starting build process..." && \
    npm run build:prod && \
    echo "Build complete. Contents of dist:" && \
    ls -la dist/

# Production stage
FROM nginx:alpine

# Copy built assets from build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 443
CMD ["nginx", "-g", "daemon off;"] 