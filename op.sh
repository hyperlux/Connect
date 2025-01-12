#!/bin/sh
export VITE_API_URL=$VITE_API_URL
export VITE_FRONTEND_URL=$VITE_FRONTEND_URL
docker-compose down
docker-compose up --build -d