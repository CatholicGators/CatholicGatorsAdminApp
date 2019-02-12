# Catholic Gators Admin Web App

[![Build Status](https://travis-ci.com/CatholicGators/CatholicGatorsAdminApp.svg?branch=master)](https://travis-ci.com/CatholicGators/CatholicGatorsAdminApp)

# Environmental variables

These are set in the your enviromental variables. These must be set before you can run the app

```
NODE_ENV = Eviroment name ("development", "test", "production")

SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME = File name containing the private key to the database

```

# Local Setup
This repo currently is only supported on Linux. To set it up, clone the repo, `npm i`, set your environmental variables, and place your Firebase secret key flie in the project location sepecifed in your enviromental variables. To run in production, do `npm run build` and then `npm start`. To run in a development enviroment, run `npm run dev`.

# Docker Setup
The easiest way to get it built and running is simply useing the command `docker-compose up --build`.
