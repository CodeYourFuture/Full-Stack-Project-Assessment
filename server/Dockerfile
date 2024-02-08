FROM node:20-alpine
WORKDIR /video-app/
COPY package.json /video-app/
COPY server.js /video-app/
WORKDIR /video-app
EXPOSE 3000
RUN npm install
CMD ["node", "server.js"]