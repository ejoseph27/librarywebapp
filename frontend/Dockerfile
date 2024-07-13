FROM node:lts-alpine3.19 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build --prod

# Serve the application using a lightweight server
FROM nginx:alpine

# Copy the build output to the Nginx HTML directory
COPY --from=build /app/dist/frontend /usr/share/nginx/html

# Expose the port Nginx will serve on
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]


## Use an official Node.js runtime as the base image
#
## Set the working directory
#WORKDIR /app
#
## Copy package.json and package-lock.json to the working directory
#COPY package*.json ./
#
## Install Angular CLI
#RUN npm install -g @angular/cli
#
## Install app dependencies
#RUN npm install
#RUN npm install @ng-bootstrap/ng-bootstrap
#
#
#
## Copy the rest of the application code
#COPY . .
#
## Build the Angular app
#RUN ng build 
#
## Expose the port the app runs on
#EXPOSE 80
#
## Define the command to run your app
#CMD ["ng", "serve", "--host", "0.0.0.0"]
#