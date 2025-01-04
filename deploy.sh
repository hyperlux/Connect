#!/bin/bash

# Exit on error
set -e

# Configuration
LOG_FILE="/var/log/auroville-deploy.log"
MAX_MEMORY_USAGE=90  # Maximum memory usage percentage
MAX_CPU_USAGE=90     # Maximum CPU usage percentage
HEALTH_CHECK_RETRIES=5
HEALTH_CHECK_INTERVAL=10

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Monitor system resources
check_resources() {
    local memory_usage=$(free | grep Mem | awk '{print $3/$2 * 100.0}')
    local cpu_total=0
    local cpu_samples=5
    for ((i=0; i<cpu_samples; i++)); do
      cpu_total=$(echo "$cpu_total + $(top -bn1 | grep "Cpu(s)" | awk '{print $2}')" | bc)
      sleep 0.2
    done
    local cpu_usage=$(echo "$cpu_total / $cpu_samples" | bc)

    if (( $(echo "$memory_usage > $MAX_MEMORY_USAGE" | bc -l) )); then
        log "ERROR: Memory usage too high: ${memory_usage}%"
        return 1
    fi

    if (( $(echo "$cpu_usage > $MAX_CPU_USAGE" | bc -l) )); then
        log "ERROR: CPU usage too high: ${cpu_usage}%"
        return 1
    fi

    return 0
}

# Health check function
health_check() {
    local retries=$HEALTH_CHECK_RETRIES
    while [ $retries -gt 0 ]; do
        if docker exec auroville_app curl -f -s http://localhost:5000/health > /dev/null; then
            log "Health check passed"
            return 0
        fi
        retries=$((retries-1))
        sleep $HEALTH_CHECK_INTERVAL
    done
    log "ERROR: Health check failed after $HEALTH_CHECK_RETRIES attempts"
    return 1
}

# Cleanup function
cleanup() {
    log "Cleaning up build artifacts..."
    rm -rf dist/* || true
    docker system prune -f || true
    log "Cleanup completed"
}

# Backup current state
backup_current_state() {
    log "Backing up current state..."
    cp -r dist dist_backup || true
    docker-compose ps > docker_state_backup
}

# Rollback function
rollback() {
    log "Rolling back to previous state..."
    if [ -d "dist_backup" ]; then
        rm -rf dist
        mv dist_backup dist
    fi
    docker-compose down
    docker-compose up -d
    rm -f docker_state_backup
}

# Main deployment process
main() {
    log "Starting deployment process..."

    # Check initial system resources
    if ! check_resources; then
        log "System resources exceeded limits. Aborting deployment."
        return 1
    fi

    # Backup current state
    backup_current_state

    # Clean up before build
    cleanup

    # Build frontend with resource monitoring
    log "Building frontend..."
    NODE_OPTIONS="--max-old-space-size=512" npm run build &
    BUILD_PID=$!
    while kill -0 $BUILD_PID 2>/dev/null; do
        if ! check_resources; then
            log "System resources exceeded limits during build. Aborting build."
            kill $BUILD_PID
            wait $BUILD_PID
            return 1
        fi
        sleep 2
    done
    wait $BUILD_PID

    if [ ! -d "dist" ] || [ ! -f "dist/index.html" ]; then
        log "Frontend build failed. Rolling back..."
        rollback
        return 1
    fi

    # Check resources after build
    if ! check_resources; then
        log "System resources exceeded limits after build. Rolling back..."
        rollback
        return 1
    fi

    # Stop current containers
    log "Stopping current containers..."
    docker-compose down

    # Start new containers
    log "Starting new containers..."
    docker-compose up --no-start
    log "Containers started successfully"
    docker start auroville_app
    docker logs -f auroville_app

    # Final resource check
    if ! check_resources; then
        log "System resources exceeded limits after deployment. Rolling back..."
        rollback
        return 1
    fi

    # Cleanup backup files if deployment successful
    rm -rf dist_backup docker_state_backup

    log "Deployment completed successfully"
    return 0
}

# Trap for errors
trap 'log "Error occurred. Rolling back..."; rollback; exit 1' ERR

# Execute main function
main

exit $?