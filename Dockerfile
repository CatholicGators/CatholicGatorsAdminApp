FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Bundle app source
COPY . /usr/src/app
RUN npm install
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]
