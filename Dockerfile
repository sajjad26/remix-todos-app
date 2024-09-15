# Use the official Node.js 20 Alpine image for a smaller footprint
FROM node:20-alpine AS base

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Remix app for production
RUN npm run build

# Expose the port that the Remix app will run on
EXPOSE 3000

# Start the Remix app using the built-in server
CMD ["npm", "run", "start"]
