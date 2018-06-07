FROM node:8

RUN apt update && apt install vim inotify-tools -y

WORKDIR /app
COPY package.json /app
RUN yarn
COPY . /app
CMD yarn start
EXPOSE 8080