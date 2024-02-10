
FROM node:20-alpine 

WORKDIR /video-docker/

COPY ./server /video-docker/

RUN npm install

CMD ["node", "server.js"]
