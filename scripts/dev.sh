docker-compose build \
    --build-arg NODE_ENV=development \
    --build-arg SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME="catholic-gators-firebase-adminsdk-yi0wc-733217bd61.json" \
    --build-arg DATABASE_URL="https://catholic-gators-dev.firebaseio.com"

docker-compose up