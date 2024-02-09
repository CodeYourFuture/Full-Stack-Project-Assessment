FROM node:16-alpine AS build

# Set the working directory inside the container
WORKDIR /server

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application code
COPY . .

# Expose port 5001 to the outside world
EXPOSE 5001

# Command to run the server
CMD ["node", "server.js"]
