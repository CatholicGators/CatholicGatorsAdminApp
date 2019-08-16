FROM node:latest

WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn

COPY . /usr/src/app
RUN yarn build

# Expose port
EXPOSE 3000

# Serve the app
CMD ["yarn", "run", "serve"]
