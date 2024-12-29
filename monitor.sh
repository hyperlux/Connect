#!/bin/bash

echo "Starting system monitoring..."
echo "Time: $(date)"
echo "----------------------------------------"

# Check container status
echo "Container Status:"
docker-compose ps
echo "----------------------------------------"

# Check container resource usage
echo "Resource Usage:"
docker stats --no-stream
echo "----------------------------------------"

# Check nginx status
echo "Nginx Status:"
docker exec auroville_nginx nginx -t
echo "----------------------------------------"

# Check SSL certificate expiry
echo "SSL Certificate Status:"
echo | openssl s_client -servername auroville.social -connect auroville.social:443 2>/dev/null | openssl x509 -noout -dates
echo "----------------------------------------"

# Check API health
echo "API Health:"
curl -I https://api.auroville.social/health
echo "----------------------------------------"

# Check database connection
echo "Database Status:"
docker exec auroville_db pg_isready -U auroville_user -d auroville_connect
echo "----------------------------------------"

# Check disk usage
echo "Disk Usage:"
df -h
echo "----------------------------------------"

# Check memory usage
echo "Memory Usage:"
free -h
echo "----------------------------------------"

# Check recent logs
echo "Recent Logs:"
echo "Nginx logs:"
docker-compose logs --tail=20 nginx
echo "----------------------------------------"
echo "App logs:"
docker-compose logs --tail=20 app
echo "----------------------------------------"

# Output monitoring report
echo "Monitoring completed at $(date)"