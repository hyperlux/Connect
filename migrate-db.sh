#!/bin/bash
set -e

echo "Running database migrations..."
docker-compose exec app npx prisma migrate deploy

echo "Database migrations completed."