#!/bin/bash
mkdir -p /var/log
for x in counterpoint.access counterpoint.error nginx.error.log mongod.log
do
  touch /var/log/$x
  chmod 666 /var/log/$x
done

# start mongo
mongod --fork --logpath /var/log/mongod.log

# start nginx
cd /app
nginx -c /app/docker/nginx.conf

# run the application.  We expect /app/bundle
if [ -z "$MONGO_URL" ]
then
  export MONGO_URL="mongodb://localhost"
fi
if [ -z "$ROOT_URL" ]
then
  export ROOT_URL="http://localhost"
fi
cd /app/bundle
nodejs main.js
