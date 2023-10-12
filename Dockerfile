# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory within the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Build the React app (you may replace 'build' with the actual build command)
RUN npm run build

# Expose the port your app will run on
EXPOSE 3000

# Define the command to start your app
ENTRYPOINT [ "npm", "start"]