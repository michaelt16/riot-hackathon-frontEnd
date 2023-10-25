# Use the official Nginx base image
FROM nginx:latest

# Set the working directory within the container
WORKDIR /app

# Remove the default Nginx configuration file and copy our own
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/

# Copy your React app's build files to the Nginx webroot
COPY build build

# Expose the port Nginx will listen on (default is 80)
EXPOSE 3000

# Start Nginx in the foreground when the container runs
CMD ["nginx", "-g", "daemon off;"]