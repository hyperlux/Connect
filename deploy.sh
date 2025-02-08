#!/bin/bash
set -e

echo "Starting deployment process..."

# Check for required environment variables
echo "Checking environment variables..."
required_vars=(
    "NODE_ENV"
    "VITE_NODE_ENV"
    "VITE_FRONTEND_URL"
    "DATABASE_URL"
    "JWT_SECRET"
    "SMTP_SERVER"
    "SMTP_PORT"
    "SMTP_USERNAME"
    "SMTP_PASSWORD"
    "SMTP_AUTH"
)

missing_vars=()
for var in "${required_vars[@]}"; do
    if ! grep -q "^${var}=" .env; then
        missing_vars+=("$var")
    fi
done

if [ ${#missing_vars[@]} -ne 0 ]; then
    echo "Error: Missing required environment variables:"
    printf '%s\n' "${missing_vars[@]}"
    echo "Please add these variables to your .env file before deploying."
    exit 1
fi

echo "Environment variables validated successfully."

# Clean up previous deployment leftovers
echo "Cleaning up previous deployment leftovers..."
docker-compose down --volumes --remove-orphans

# Remove unused Docker objects
echo "Removing unused Docker objects..."
docker system prune -f

# Build the images
echo "Building Docker images..."
docker-compose build --no-cache --force-rm

# Stop existing containers
echo "Stopping existing containers..."
docker-compose down

# Start the services
echo "Starting services..."
docker-compose up -d

# Wait for services to be healthy
echo "Waiting for services to be healthy..."
max_retries=60  # 5 minutes maximum wait time
retry_count=0

for service in db app nginx; do
    echo "Checking $service..."
    retry_count=0
    while ! docker-compose ps | grep "$service" | grep -q "healthy"; do
        sleep 5
        retry_count=$((retry_count + 1))
        if [ $retry_count -ge $max_retries ]; then
            echo "Error: Service $service failed to become healthy within 5 minutes"
            echo "Checking service logs..."
            docker-compose logs $service
            echo "Deployment failed. Rolling back..."
            docker-compose down
            exit 1
        fi
        echo "Still waiting for $service to be healthy... (Attempt $retry_count of $max_retries)"
    done
    echo "$service is healthy"
done

echo "All services are healthy. Verifying deployment..."

# Verify the application is responding
echo "Checking application health..."
if curl -f -s -m 5 "https://auroville.social/health" > /dev/null; then
    echo "Application is responding successfully."
else
    echo "Warning: Application health check failed. Please check the logs:"
    docker-compose logs app
fi

echo "Deployment complete! The application is now running at https://auroville.social"
echo "Please verify the following:"
echo "1. Frontend is accessible"
echo "2. Registration and login are working"
echo "3. Email verification is functioning"
echo "4. Database migrations were successful"

# Print recent logs for monitoring
echo "Recent logs from the application:"
docker-compose logs --tail=50 app
