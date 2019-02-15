FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

#Install serve
RUN npm install -g serve

# Install app dependencies
COPY package.json /usr/src/app/
COPY package-lock.json /usr/src/app/
RUN npm install

# Bundle app source and build
COPY . /usr/src/app
RUN npm run build

# Expose port
EXPOSE 3000

# Serve the app
CMD ["serve", "-s", "build", "-l", "3000"]
