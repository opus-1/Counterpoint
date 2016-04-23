#!/bin/bash
mkdir -p /var/log
for x in counterpoint.access counterpoint.error nginx.error.log
do
  touch /var/log/$x
  chmod 666 /var/log/$x
done

# start nginx
cd /app
nginx -c /app/docker/nginx.conf

meteor
