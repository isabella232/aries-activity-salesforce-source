FROM astronomerio/ariesjs

# TODO: inherit from onbuild tag of aries.js
# copy package.json and install modules
WORKDIR /usr/local/src
COPY package.json .
RUN ["npm", "install"]

COPY .eslintrc .
COPY lib lib
COPY test test
