FROM node:18-alpine
WORKDIR /app/server
COPY package*.json ./

RUN npm install
COPY /server .
CMD ["node","server.js"]