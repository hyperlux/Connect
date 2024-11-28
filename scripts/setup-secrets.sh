#!/bin/bash

# Check if gh is installed
if ! command -v gh &> /dev/null; then
    echo "GitHub CLI (gh) is not installed. Please install it first."
    exit 1
fi

# Check if logged in
if ! gh auth status &> /dev/null; then
    echo "Please login to GitHub first using: gh auth login"
    exit 1
fi

# Function to set a secret
set_secret() {
    local name=$1
    local value=$2
    echo "Setting $name..."
    echo "$value" | gh secret set "$name"
}

# Set all secrets
set_secret "DATABASE_URL" "postgresql://postgres:postgres@localhost:5432/auroville"
set_secret "JWT_SECRET" "72jmcBa8LYTi7szZp1Lw9+GmKuEXp76og8B1FyySqOg8f3a5d2e1c4b7"
set_secret "PORT" "5000"
set_secret "SMTP_HOST" "smtp.ionos.com"
set_secret "SMTP_PORT" "587"
set_secret "SMTP_USER" "notifications@aurovillenetwork.us"
set_secret "SMTP_PASSWORD" "lovelightforever888!"
set_secret "FRONTEND_URL" "https://aurovillenetwork.org"
set_secret "VITE_API_URL" "https://api.aurovillenetwork.org"

echo "All secrets have been set!" 