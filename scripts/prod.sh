docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build \
    --build-arg NODE_ENV=production \
    --build-arg PRODUCTION_SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME=catholic-gators-firebase-adminsdk-yi0wc-4a2b583b39.json \
    --build-arg PRODUCTION_DATABASE_URL=https://catholic-gators.firebaseio.com
