# Catholic Gators Web App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses [Yarn](https://yarnpkg.com/) as a package manager.

## Available Scripts For Local Developement

### yarn start

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The page will reload if you make edits to files. You will also see any lint errors in the console.

### yarn test

Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information. The goal is for each function to be unit tested.

### yarn build

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance. The build is minified and the filenames include the hashes.

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### yarn serve

Serves the static files out of the build folder on port 3000. Requires for you to run `yarn build` first. Used as the server for the production enviroment.

## Production

### Deployment

The application is deployed through (Travis)[https://travis-ci.com/] when there is a merge into the master branch on (GitHub)[https://github.com/].

### Docker

The Dockerfile holds the configuration for the Docker container. The docker-compose file builds the application contain and also sets up an Nginx reverse proxy that encrypts the traffic over https. The docker-compose file will only work in production unless it is run with your own `localhost` ssl_certificate at `/etc/letsencrypt/live/join.catholicgators.com/fullchain.pem` and ssl_certificate_key at `/etc/letsencrypt/live/join.catholicgators.com/privkey.pem`.
