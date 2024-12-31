#!/bin/bash

# Set variables
BACKUP_DIR="/root/AurovilleConnect/backups"
TIMESTAMP=$(date +%Y%m%d%H%M%S)
LOG_FILE="$BACKUP_DIR/backup_$TIMESTAMP.log"
MAX_BACKUPS=5

# Create backup directory if it doesn't exist
mkdir -p "$BACKUP_DIR"

# Start logging
echo "Backup started at $(date)" > "$LOG_FILE"

# Function to log messages
log() {
  echo "$(date) - $1" >> "$LOG_FILE"
  echo "$(date) - $1"
}

# Function to handle errors
error_exit() {
  log "ERROR: $1"
  log "Backup failed."
  exit 1
}

# Backup database
log "Backing up database..."
PGPASSWORD="$POSTGRES_PASSWORD" pg_dump -h "$POSTGRES_HOST" -p "$POSTGRES_PORT" -U "$POSTGRES_USER" "$POSTGRES_DB" | gzip > "$BACKUP_DIR/db_backup_$TIMESTAMP.sql.gz" || error_exit "Database backup failed"
log "Database backup complete."

# Backup uploads directory
log "Backing up uploads directory..."
tar -czvf "$BACKUP_DIR/uploads_backup_$TIMESTAMP.tar.gz" /root/AurovilleConnect/server/uploads || error_exit "Uploads backup failed"
log "Uploads backup complete."

# Backup SSL certificates
log "Backing up SSL certificates..."
tar -czvf "$BACKUP_DIR/certs_backup_$TIMESTAMP.tar.gz" /etc/letsencrypt/live/auroville.social || error_exit "SSL certificate backup failed"
log "SSL certificate backup complete."

# Backup environment files
log "Backing up environment files..."
tar -czvf "$BACKUP_DIR/env_backup_$TIMESTAMP.tar.gz" /root/AurovilleConnect/server/.env /root/AurovilleConnect/.env || error_exit "Environment files backup failed"
log "Environment files backup complete."

# Backup Docker volumes
log "Backing up Docker volumes..."
docker volume ls -q | xargs -I {} docker run --rm -v {}:/volume -v "$BACKUP_DIR":/backup alpine tar -czvf /backup/docker_volume_{}.tar.gz /volume || error_exit "Docker volume backup failed"
log "Docker volumes backup complete."

# Clean up old backups
log "Cleaning up old backups..."
find "$BACKUP_DIR" -type f -name "*.gz" -print0 | sort -z | head -z -n -$MAX_BACKUPS | xargs -0 rm || error_exit "Cleanup failed"
log "Old backups cleaned up."

# Backup complete
log "Backup completed successfully."
echo "Backup completed at $(date)" >> "$LOG_FILE"

exit 0