FROM ubuntu:14.04.4
MAINTAINER "Paul Ellsworth" <pellswo@us.ibm.com>
RUN curl -sL https://deb.nodesource.com/setup_4.x | bash -
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv EA312927
RUN echo "deb http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.2 multiverse" | tee /etc/apt/sources.list.d/mongodb-org-3.2.list
RUN apt-get update
RUN apt-get install -y mongodb-org nodejs npm build-essential nginx curl locales
RUN curl https://install.meteor.com/ | sh

# How do we run our app?  Well, I guess we can try this...
# TODO: Get nginx routing stuff in place.

COPY . /app
WORKDIR /app
RUN mkdir -p /data/db ; locale-gen en_US.UTF-8
RUN meteor reset ; rm -rf .meteor/local ; rm -rf node_modules

# or should these be meteor npm installs?
RUN npm install http://github.com/angular/bower-material/tarball/master
RUN npm install
RUN meteor
