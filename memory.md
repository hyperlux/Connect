# Development Memory

[Previous content through "Troubleshooting Steps" remains unchanged...]

### Production Database Verification

1. Verify PostgreSQL Installation on Production:
   ```bash
   # Check if PostgreSQL is installed and running
   sudo systemctl status postgresql
   
   # Verify PostgreSQL version matches development
   psql --version
   ```

2. Database Setup Verification:
   ```bash
   # Check if database exists
   sudo -u postgres psql -c "\l" | grep auroville
   
   # Verify database user and permissions
   sudo -u postgres psql -c "\du" | grep postgres
   
   # Check database connections
   sudo -u postgres psql -c "SELECT * FROM pg_stat_activity WHERE datname = 'auroville';"
   ```

3. Production Environment Configuration:
   ```bash
   # Verify environment variables
   grep DATABASE_URL /root/AurovilleConnect/server/.env
   
   # Check PostgreSQL configuration
   sudo cat /etc/postgresql/*/main/postgresql.conf | grep "listen_addresses\|port"
   sudo cat /etc/postgresql/*/main/pg_hba.conf | grep "host.*postgres"
   ```

4. Service Configuration:
   ```bash
   # Check service environment
   sudo systemctl cat auroville-connect
   
   # Verify service user permissions
   sudo -u postgres psql -c "\du" | grep $(whoami)
   ```

5. Production Database Maintenance:
   ```bash
   # Check database size and growth
   sudo -u postgres psql -c "
   SELECT pg_size_pretty(pg_database_size('auroville')) as db_size,
          pg_size_pretty(pg_total_relation_size('\"User\"')) as users_size,
          pg_size_pretty(pg_total_relation_size('\"ForumPost\"')) as posts_size;
   "
   
   # Monitor active connections
   sudo -u postgres psql -c "
   SELECT count(*) as connection_count 
   FROM pg_stat_activity 
   WHERE datname = 'auroville';
   "
   ```

6. Production Deployment Checklist:
   - [ ] PostgreSQL is installed and running
   - [ ] Database 'auroville' exists
   - [ ] User 'postgres' has required permissions
   - [ ] Database URL is correctly configured in .env
   - [ ] Service user has database access
   - [ ] Prisma migrations are up to date
   - [ ] Connection pool settings are optimized
   - [ ] Database backups are configured

7. Connection Pool Settings:
   ```bash
   # Check current pool settings in db.js
   grep "pool = new Pool" -A 5 /root/AurovilleConnect/server/lib/db.js
   
   # Monitor pool usage
   sudo -u postgres psql auroville -c "
   SELECT state, count(*) 
   FROM pg_stat_activity 
   WHERE datname = 'auroville' 
   GROUP BY state;
   "
   ```

8. Production Error Monitoring:
   ```bash
   # Check application logs for database errors
   journalctl -u auroville-connect -n 100 --no-pager | grep -i 'database\|prisma\|postgresql\|error'
   
   # Monitor PostgreSQL logs
   sudo tail -f /var/log/postgresql/postgresql-*.log
   
   # Check for connection timeouts
   sudo -u postgres psql -c "
   SELECT * FROM pg_stat_activity 
   WHERE datname = 'auroville' 
   AND state = 'active' 
   AND now() - query_start > '5 minutes'::interval;
   "
   ```

[Previous "Production Server Details" and "Schema Migration Notes" sections remain unchanged...]
