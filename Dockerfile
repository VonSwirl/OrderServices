

# specify the node base image with your desired version node:<version>
FROM node:8.8.1
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
Copy . /app
CMD node orderServiceController.js
# replace this with your application's default port
EXPOSE 3004