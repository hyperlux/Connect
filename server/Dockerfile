# Build stage
FROM node:18-alpine

WORKDIR /app

# Install OpenSSL dependencies
RUN apk add --no-cache openssl openssl-dev

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "start"] 