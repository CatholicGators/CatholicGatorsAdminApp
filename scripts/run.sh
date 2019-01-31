if [ "$NODE_ENV" = "production" ]; then 
    npm start:prod
elif [ "$NODE_ENV" = "testing" ]; then
    npm test
else
    npm start
fi
