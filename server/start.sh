#!/bin/bash

# Ensure the script fails on any error
set -e

echo "Waiting for database to be ready..."
while ! nc -z db 5432; do
  sleep 1
done
echo "Database is ready!"

echo "Running database migrations..."
npx prisma migrate deploy

if [ $? -eq 0 ]; then
    echo "Migrations completed successfully"
    echo "Starting application..."
        exec pm2-runtime ecosystem.config.cjs --env production \
            --DATABASE_URL="$DATABASE_URL" \
            --NODE_ENV="$NODE_ENV" \
            --NODE_OPTIONS="$NODE_OPTIONS" \
            --JWT_SECRET="$JWT_SECRET" \
            --SMTP_SERVER="$SMTP_SERVER" \
            --SMTP_PORT="$SMTP_PORT" \
            --SMTP_USERNAME="$SMTP_USERNAME" \
            --SMTP_PASSWORD="$SMTP_PASSWORD" \
            --SMTP_AUTH="$SMTP_AUTH"
    else
    echo "Migration failed! Check the database connection and try again."
    exit 1
fi
