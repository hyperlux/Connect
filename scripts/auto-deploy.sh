#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to show status
show_status() {
    echo -e "${YELLOW}[AUTO-DEPLOY]${NC} $1"
}

# Watch for changes in src directory
show_status "Starting auto-deployment watch..."

while true; do
    if [[ $(git status --porcelain) ]]; then
        show_status "Changes detected, preparing to deploy..."
        
        # Stage all changes
        git add .
        
        # Create a commit with timestamp
        git commit -m "Auto-deploy: $(date '+%Y-%m-%d %H:%M:%S')"
        
        # Push to remote
        git push origin main
        
        show_status "Changes pushed to repository"
        show_status "GitHub Actions will handle the deployment"
        
        # Wait 30 seconds before checking again
        sleep 30
    else
        # Check every 5 seconds for changes
        sleep 5
    fi
done 