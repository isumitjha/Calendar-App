# Step 1: Use the official Node.js image from the Docker Hub as the base image
FROM node:14 AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json files
COPY package*.json ./

# Step 4: Install the React project dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .

# Step 6: Build the React application for production
RUN npm run build

# Step 7: Use a lightweight web server to serve the application
FROM nginx:alpine

# Step 8: Copy the build files from the previous stage to Nginx's default public directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Copy the custom Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Step 10: Expose the port that Nginx will run on
EXPOSE 80

# Step 11: Start Nginx server
CMD ["nginx", "-g", "daemon off;"]

