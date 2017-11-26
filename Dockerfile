

# specify the node base image with your desired version node:<version>
FROM node:9.2.0
WORKDIR /app
COPY package.json /app
COPY package-lock.json /app
RUN npm install
COPY . /app
CMD node orderServiceController.js
# replace this with your application's default port
EXPOSE 3004