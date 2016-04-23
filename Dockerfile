FROM counterpoint/base:1
MAINTAINER "Paul Ellsworth" <pellswo@us.ibm.com>

# How do we run our app?  Well, I guess we can try this...
# TODO: Get nginx routing stuff in place.

COPY . /app
WORKDIR /app
RUN meteor reset

# or should these be meteor npm installs?
RUN npm install http://github.com/angular/bower-material/tarball/master
RUN npm install

CMD docker/start.sh
