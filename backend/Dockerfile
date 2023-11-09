# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install
# Copy the rest of the application code
COPY . .

# Expose the port your Node.js app runs on
EXPOSE 3000

# Define the command to run your Node.js app
CMD ["node", "studentLogin.js"]
