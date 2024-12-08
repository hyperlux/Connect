# Build stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Generate Prisma client
RUN npx prisma generate

EXPOSE 5000

CMD ["npm", "start"] 