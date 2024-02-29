#!/bin/sh

# replace static values with environment-variables
if [ -n $LOGIN_URL ]; then
    find /usr/share/nginx/html -type f -name "*.js" -exec  sed -i "s~_LOGIN_URL_~$LOGIN_URL~g" {} \;
fi
if [ -n $SIGNUP_URL ]; then
    find /usr/share/nginx/html -type f -name "*.js" -exec  sed -i "s~_SIGNUP_URL_~$SIGNUP_URL~g" {} \;
fi

if [ -n $API_URL ]; then
    find /usr/share/nginx/html -type f -name "*.js" -exec  sed -i "s~_API_URL_~$API_URL~g" {} \;
fi

nginx -g "daemon off;"


