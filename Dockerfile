# Use an official Node runtime as a parent image
# Update this line to use a newer version of Node that's compatible with all your dependencies.
FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using yarn
RUN yarn install --frozen-lockfile

# Copy the rest of your app's source code from your host to your image filesystem.
COPY . .

# Build the app
RUN yarn build

# Serve the app on port 3000 using serve
EXPOSE 3400
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
