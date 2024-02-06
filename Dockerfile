FROM node:19.0.0-bullseye
WORKDIR /video-app/server
COPY package.json /video-app/
COPY server /video-app/
WORKDIR /video-app
EXPOSE 3000
RUN npm install
CMD ["node", "server.js"]