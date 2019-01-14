export NODE_ENV="testing"
export TESTING_SERVICE_ACCOUNT_PRIVATE_KEY_FILE_NAME="catholic-gators-test-firebase-adminsdk-5enit-df52463c47.json"
export TESTING_DATABASE_URL="https://catholic-gators-test.firebaseio.com"

docker-compose -f docker-compose.yml -f docker-compose.test.yml up --build
