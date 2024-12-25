# Memory

## Issues

### 404 Error on auroville.social
*   The user was experiencing a 404 error on `auroville.social`.
*   The root path in the Nginx configuration was incorrect.
*   The root path was pointing to `/var/www/html/AurovilleConnect/public` instead of `/Users/love/Downloads/AurovilleConnect/public`.
*   The root path in the `nginx.conf` file was corrected using `apply_diff`.

### net::ERR_BLOCKED_BY_CLIENT Error
*   The user was experiencing a `net::ERR_BLOCKED_BY_CLIENT` error when making requests to the API server.
*   The `VITE_API_URL` in the `.env` file was set to `http://localhost:5000/api` instead of `https://api.auroville.social/api`.
*   The `VITE_API_URL` in the `.env` file was updated using `apply_diff`.

## Environment

### Production Environment
*   The user is working on a production server.
*   Changes to the `.env` file in the current working directory do not affect the production environment.

## Configuration

### Database Credentials
*   The database credentials in the `.env` file may not be the same as the credentials used on the production server.
