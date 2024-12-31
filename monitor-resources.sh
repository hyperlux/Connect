#!/bin/bash

# Configuration
LOG_FILE="/var/log/auroville-resources.log"
ALERT_THRESHOLD_MEM=80  # Memory usage percentage threshold
ALERT_THRESHOLD_CPU=80  # CPU usage percentage threshold
CHECK_INTERVAL=300      # Check every 5 minutes
RETENTION_DAYS=7        # Keep logs for 7 days

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Alert function
alert() {
    log "ALERT: $1"
    # Add your alert mechanism here (e.g., email, Slack, etc.)
}

# Get container stats
get_container_stats() {
    local container_name=$1
    local stats=$(docker stats --no-stream "$container_name")
    local cpu=$(echo "$stats" | tail -n 1 | awk '{print $3}' | sed 's/%//')
    local mem=$(echo "$stats" | tail -n 1 | awk '{print $7}' | sed 's/%//')
    echo "$cpu $mem"
}

# Check PM2 status
check_pm2_status() {
    local pm2_status=$(docker exec auroville_app pm2 jlist 2>/dev/null)
    if [ $? -eq 0 ]; then
        local memory=$(echo "$pm2_status" | jq '.[0].monit.memory' 2>/dev/null)
        local cpu=$(echo "$pm2_status" | jq '.[0].monit.cpu' 2>/dev/null)
        echo "$cpu $memory"
    else
        echo "0 0"
    fi
}

# Check PostgreSQL status
check_postgres_status() {
    local query="SELECT count(*) FROM pg_stat_activity;"
    local connections=$(docker exec auroville_db psql -U postgres -t -c "$query" 2>/dev/null)
    echo "$connections"
}

# Rotate logs
rotate_logs() {
    if [ -f "$LOG_FILE" ]; then
        local timestamp=$(date +%Y%m%d_%H%M%S)
        mv "$LOG_FILE" "${LOG_FILE}.${timestamp}"
        find "$(dirname "$LOG_FILE")" -name "$(basename "$LOG_FILE").*" -mtime +$RETENTION_DAYS -delete
    fi
}

# Main monitoring loop
main() {
    log "Starting resource monitoring..."
    
    while true; do
        # Get container stats
        read -r nginx_cpu nginx_mem <<< $(get_container_stats auroville_nginx)
        read -r app_cpu app_mem <<< $(get_container_stats auroville_app)
        read -r pm2_cpu pm2_mem <<< $(check_pm2_status)
        connections=$(check_postgres_status)
        
        # Log current status
        log "Nginx: CPU ${nginx_cpu}%, Memory ${nginx_mem}%"
        log "App: CPU ${app_cpu}%, Memory ${app_mem}%"
        log "PM2: CPU ${pm2_cpu}%, Memory ${pm2_mem}MB"
        log "PostgreSQL Connections: ${connections}"
        
        # Check thresholds
        if (( $(echo "$nginx_mem > $ALERT_THRESHOLD_MEM" | bc -l) )); then
            alert "Nginx memory usage above threshold: ${nginx_mem}%"
        fi
        
        if (( $(echo "$app_mem > $ALERT_THRESHOLD_MEM" | bc -l) )); then
            alert "App memory usage above threshold: ${app_mem}%"
        fi
        
        if (( $(echo "$nginx_cpu > $ALERT_THRESHOLD_CPU" | bc -l) )); then
            alert "Nginx CPU usage above threshold: ${nginx_cpu}%"
        fi
        
        if (( $(echo "$app_cpu > $ALERT_THRESHOLD_CPU" | bc -l) )); then
            alert "App CPU usage above threshold: ${app_cpu}%"
        fi
        
        # Rotate logs if needed
        if [ $(date +%H:%M) == "00:00" ]; then
            rotate_logs
        fi
        
        sleep $CHECK_INTERVAL
    done
}

# Handle script termination
cleanup() {
    log "Stopping resource monitoring..."
    exit 0
}

trap cleanup SIGTERM SIGINT

# Start monitoring
main