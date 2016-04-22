#!/bin/bash
echo "Making sure you have docker-compose."
if which docker-compose 2>&1 1>/dev/null
then
  echo "  ... found docker-compose, continuing..."
else
  echo "  ... could not find docker-compose!"
  exit 1
fi

export COUNTERPOINT_PORT=$1
if [ -z "$COUNTERPOINT_PORT" ]
then
  read -p "Please enter the external port: " COUNTERPOINT_PORT
fi
if [ -z "$COUNTERPOINT_PORT" ]
then
  echo " ... invalid port specified!"
  exit 1
fi

if [ -z "$2" ]
then
  export COUNTERPOINT_HOSTNAME=$(hostname)
else
  export COUNTERPOINT_HOSTNAME=$2
fi

echo "Running docker-compose."
docker-compose up
