FROM node:alpine

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
RUN mkdir /usr/src/app/pages

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app
EXPOSE 3000

# Run the app
COPY run.sh run.sh
RUN chmod u+x run.sh && ./run.sh
