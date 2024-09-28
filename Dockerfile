# Use NGINX as the base image
FROM nginx:stable-alpine-perl

# Copy the static website files to the NGINX html directory
COPY ./Quiz /usr/share/nginx/html 

# Set up the env
ENV NGINX_ENV pre-production

# Expose port 1918
EXPOSE 1918

# Start NGINX
CMD ["nginx", "-g", "daemon off;"]