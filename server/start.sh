#!/bin/sh

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
    exec pm2-runtime ecosystem.config.cjs --env production
else
    echo "Migration failed! Check the database connection and try again."
    exit 1
fi
