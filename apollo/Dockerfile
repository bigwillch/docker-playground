FROM node:8

RUN npm install -g nodemon

WORKDIR /app
COPY package.json /app
RUN yarn
COPY . /app
EXPOSE 4000