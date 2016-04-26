FROM ubuntu:14.04.4
MAINTAINER "Paul Ellsworth" <pellswo@us.ibm.com>
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN apt-get update ; apt-get install -y curl wget
RUN apt-get purge -y nodejs*

# INSTALL NODEJS and NPM VERSION FROM BINARY
WORKDIR /tmp
RUN wget https://nodejs.org/download/release/v0.10.44/node-v0.10.44-linux-x64.tar.gz ; tar -C /usr/local --strip-components 1 -xzf node-v0.10.44-linux-x64.tar.gz ; ln -s /usr/local/bin/node /usr/bin ; ln -s /usr/local/bin/npm /usr/bin

# Moving on...
RUN echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN apt-get update ; apt-get install -y mongodb-org build-essential nginx locales python
RUN curl https://install.meteor.com/ | sh
RUN mkdir -p /data/db ; locale-gen en_US.UTF-8
