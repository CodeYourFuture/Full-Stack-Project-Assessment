# Use Node.js 18 Alpine as base image
FROM node:18-alpine AS base

# Set the working directory inside the container
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Build the React app
FROM base AS builder

# Copy dependencies installed in the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy the rest of the application code
COPY . .

# Build the React app
RUN npm run build

# Production image, serve the built React app
FROM nginx:alpine AS runner

# Copy the built React app from the builder stage to the Nginx server's HTML directory
COPY --from=builder /app/build /usr/share/nginx/html

# Expose port 80 to the outside world
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
