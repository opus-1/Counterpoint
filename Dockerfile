FROM counterpoint/base:1
MAINTAINER "Paul Ellsworth" <pellswo@us.ibm.com>

# How do we run our app?  Well, I guess we can try this...
# TODO: Get nginx routing stuff in place.

COPY . /app
WORKDIR /app
# for now, we have to install angular-material in this way.
RUN npm install http://github.com/angular/bower-material/tarball/master
RUN npm install

RUN meteor build --directory /tmp ; mv /tmp/bundle /app

WORKDIR /app/bundle/programs/server
RUN npm install

WORKDIR /app
CMD docker/start.sh
