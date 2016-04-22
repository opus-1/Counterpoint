#!/bin/bash
echo "Making sure you have docker-compose."
if which docker-compose 2>&1 1>/dev/null
then
  echo "  ... found docker-compose, continuing..."
else
  echo "  ... could not find docker-compose!"
  exit 1
fi

export port=$1
if [ -z "$port" ]
then
  read -p "Please enter the external port: " port
fi
if [ -z "$port" ]
then
  echo " ... invalid port specified!"
  exit 1
fi

if [ -z "$2" ]
then
  export hostname=$(hostname)
else
  export hostname=$2
fi

sed -i s/85:80/$port:80/g docker-compose.yml
sed -i s/:85/:$port/g docker-compose.yml
sed -i s/dmsbuilds.svl.ibm.com/$hostname/g docker-compose.yml
echo "Running docker-compose."
docker-compose up
