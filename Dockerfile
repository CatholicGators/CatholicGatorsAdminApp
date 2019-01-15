FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app/pages
WORKDIR /usr/src/app
COPY package.json .
COPY package-lock.json .
RUN npm install

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app
EXPOSE 3000

# Run the app
COPY run.sh run.sh
RUN chmod u+x run.sh && ./run.sh
