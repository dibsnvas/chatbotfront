# Use the official Node.js image as a parent image
FROM node:14

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of your application code
COPY . .

# Expose the port your app runs on (assuming your app runs on port 5173)
EXPOSE 5173

# Define the command to run your app using npm run dev
CMD ["npm", "run", "dev"]
