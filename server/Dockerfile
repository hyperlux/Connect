FROM node:18-alpine

# Install necessary packages
RUN apk add --no-cache curl

WORKDIR /app

# Copy package files
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:5000/health || exit 1

EXPOSE 5000

# Use proper process manager for Node.js
RUN npm install -g pm2

# Start with PM2
CMD ["pm2-runtime", "index.js"] 