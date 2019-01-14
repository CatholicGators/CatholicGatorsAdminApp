# Catholic Gators Admin Web App

# Environmental variables
```
NODE_ENV = Eviroment name ("development", "testing", "production")

DEVELOPMENT_SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME = File location/name containing the private key to the development database
DEVELOPMENT_DATABASE_URL = Database URL for development enviroment

TESTING_SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME = File location/name containing the private key to the testing database
TESTING_DATABASE_URL = Database URL for testing enviroment

PRODUCTION_SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME = File location/name containing the private key to the production database
PRODUCTION_DATABASE_URL = Database URL for production enviroment

```

# Local Setup
This repo currently is only supported on Linux. To set it up, pull the repo, `npm i`, set your environmental variables, and place your Firebase secret key flie in the project root. To run in production do `npm run build` and then `npm start`. To run in a developement enviroment, run `npm run dev`.

# Docker Setup
The easiest way to get it built and running is simply useing the command `docker-compose up --build`.
