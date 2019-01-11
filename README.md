# Catholic Gators Admin Web App

# Environmental variables
```
NODE_ENV = Eviroment name ("DEVELOPMENT", "TESTING", "PRODUCTION")

DEVELOPMENT_SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME = File location/name containing the private key to the development database
DEVELOPMENT_DATABASE_URL = Database URL for development enviroment

TESTING_SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME = File location/name containing the private key to the testing database
TESTING_DATABASE_URL = Database URL for testing enviroment

PRODUCTION_SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME = File location/name containing the private key to the production database
PRODUCTION_DATABASE_URL = Database URL for production enviroment

```

# Setup
Pull, `npm i`, set your environmental variables, and place your Firebase secret key flie in the project root, and you'll be good.
