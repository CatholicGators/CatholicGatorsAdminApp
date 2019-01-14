FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app/pages
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install

# Bundle app source
COPY . /usr/src/app
RUN npm run build
EXPOSE 3000
CMD [ "npm", "start" ]
