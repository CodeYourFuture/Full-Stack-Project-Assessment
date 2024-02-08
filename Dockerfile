FROM node:20-alpine
WORKDIR /video-app/server
COPY server /video-app/
WORKDIR /video-app
EXPOSE 3000
RUN npm install
CMD ["node", "server.js"]