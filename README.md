# Catholic Gators Admin Web App

# Environmental variables

These are set in the `enviroment/dev.env` file. These must be set before you can run the app

```
NODE_ENV = Eviroment name ("development", "testing", "production")

SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME = File location/name containing the private key to the database

```

# Local Setup
This repo currently is only supported on Linux. To set it up, pull the repo, `npm i`, set your environmental variables, and place your Firebase secret key flie in the project root. To run in production do `npm run build` and then `npm start`. To run in a developement enviroment, run `npm run dev`.

# Docker Setup
The easiest way to get it built and running is simply useing the command `docker-compose up --build`.
