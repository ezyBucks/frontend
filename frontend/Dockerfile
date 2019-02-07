FROM node:8-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Define the argument to be used at build time for React
ARG REACT_APP_SERVER_HOST

# We will use serve to serve the react files
RUN npm install -g serve
RUN npm install

# Do this step here to take advantage of docker layer caching. Should make the image smaller and rebuilds faster
COPY . .
RUN npm run build

# Run on port 3000
EXPOSE 3000

# Run serve to serve the react files on port 3000
CMD ["serve", "-s", "build", "-l", "3000"]