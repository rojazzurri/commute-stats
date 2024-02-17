# Use an official Node.js runtime as the base image
FROM node:alpine

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json into the directory /app in the container
COPY package*.json ./

# Install any needed packages specified in package.json
RUN npm install

# Copy the src directory into the Docker image
COPY . .

# Run the app when the container launches
CMD ["npm", "run", "dev"]

LABEL com.centurylinklabs.watchtower.enable="true"
