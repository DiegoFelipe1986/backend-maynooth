# Use a Node.js image
FROM node:14 as builder

# Set the working directory to the application
WORKDIR /usr/src/app

# Copy the files of your application to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of your application
COPY . .

# Build the application
RUN npm run dev

# Expose the port where the web server will run (default port for Nginx)
EXPOSE 80

# Command to start the web server
CMD ["npm", "start"]
