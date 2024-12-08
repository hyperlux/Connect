# Build stage
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 5000

RUN apk add --no-cache bash

CMD ["npm", "start"] 