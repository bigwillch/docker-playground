FROM node:8

RUN npm install -g nodemon

WORKDIR /app
COPY package.json /app
RUN yarn
COPY . /app
CMD yarn start
EXPOSE 4000