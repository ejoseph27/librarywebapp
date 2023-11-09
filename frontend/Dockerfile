# Use an official Node.js runtime as the base image
FROM node:latest

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install Angular CLI
RUN npm install -g @angular/cli

# Install app dependencies
RUN npm install
RUN npm install @ng-bootstrap/ng-bootstrap



# Copy the rest of the application code
COPY . .

# Build the Angular app
RUN ng build 

# Expose the port the app runs on
EXPOSE 80

# Define the command to run your app
CMD ["ng", "serve", "--host", "0.0.0.0"]
