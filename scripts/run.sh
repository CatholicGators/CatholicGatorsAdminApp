if [ "$NODE_ENV" = "production" ]; then 
    npm run start-prod
elif [ "$NODE_ENV" = "test" ]; then
    npm test
else
    npm start
fi
