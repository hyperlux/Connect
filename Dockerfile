# Stage 1: Build the frontend
FROM node:20 AS frontend-builder
WORKDIR /app/frontend
COPY package*.json ./
COPY vite.config.ts ./
COPY src ./src
COPY public ./public
RUN npm install
RUN npm run build

# Stage 2: Build the server
FROM node:20 AS server-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm install
COPY server/ .

# Stage 3: Final image
FROM node:20
WORKDIR /app

# Copy built frontend
COPY --from=frontend-builder /app/frontend/dist ./public

# Copy server
COPY --from=server-builder /app/server ./server
WORKDIR /app/server

# Install production dependencies
RUN npm install --production

# Expose ports
EXPOSE 5000

# Start the application
CMD ["npm", "start"]