# Use the official Nginx image as a base
FROM nginx:1.27.3-alpine

# Install the ngx_http_headers_module
RUN apk add --no-cache nginx-mod-http-headers-more

# Copy the custom Nginx configuration
COPY deploy/nginx.conf/nginx.docker.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]