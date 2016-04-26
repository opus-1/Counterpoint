#!/bin/bash
mkdir -p /var/log
for x in counterpoint.access counterpoint.error nginx.error.log mongod.log
do
  touch /var/log/$x
  chmod 666 /var/log/$x
done

# make sure we have a /data/db directory
mkdir /data/db

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
export PORT=8080
cd /app/bundle
node main.js
