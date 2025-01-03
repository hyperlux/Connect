FROM node:20

WORKDIR /app

RUN npm init -y && \
    npm install vite@5.0.0 && \
    npx vite --version