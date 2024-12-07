# Build stage
FROM node:18-alpine AS builder

# Install necessary packages
RUN apk add --no-cache curl

WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm ci --production

# Copy prisma schema
COPY prisma ./prisma/

# Generate Prisma client
RUN npx prisma generate

# Copy rest of the source code
COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy only necessary files from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/index.js ./

# Add healthcheck
HEALTHCHECK --interval=30s --timeout=3s \
    CMD curl -f http://localhost:5000/health || exit 1

EXPOSE 5000

# Start the application
CMD ["node", "index.js"] 