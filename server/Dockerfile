# Use Node.js image with Alpine Linux
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the contents of the backend directory to the working directory
# COPY backend/. . 
COPY server /app/server

# Expose the port where the app will run
EXPOSE 5000

# Command to run the application
CMD ["node", "server/server.js"]