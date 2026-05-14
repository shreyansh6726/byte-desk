# Use an official Node.js runtime as a parent image
FROM node:18-slim

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy application dependency manifests to the container image.
# A wildcard is used to ensure both package.json and package-lock.json are copied.
COPY package*.json ./

# Install production dependencies.
RUN npm install --production

# Copy local code to the container image.
COPY . .

# Set environment variables
# Hugging Face Spaces uses port 7860 by default
ENV PORT=7860
ENV NODE_ENV=production

# Expose the port the app runs on
EXPOSE 7860

# Run the web service on container startup.
CMD [ "npm", "start" ]
