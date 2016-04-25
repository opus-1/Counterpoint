FROM ubuntu:14.04.4
MAINTAINER "Paul Ellsworth" <pellswo@us.ibm.com>
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN apt-get update ; apt-get install -y curl
# RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN apt-get update ; apt-get install -y mongodb-org nodejs npm build-essential nginx locales
RUN curl https://install.meteor.com/ | sh
RUN mkdir -p /data/db ; locale-gen en_US.UTF-8
