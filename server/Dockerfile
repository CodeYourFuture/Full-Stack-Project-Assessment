# Note: this Dockerfile is only intended for use in conjunction with docker-compose.yml:

FROM node:18-alpine as base

WORKDIR /src
COPY package*.json ./
EXPOSE 5000

ENV NODE_ENV=development
RUN npm install -g nodemon && npm install
COPY . ./

USER node
