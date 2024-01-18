FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build


FROM node:20-alpine
WORKDIR /app
COPY --from=build ./app/build ./build
EXPOSE 3000
CMD [ "npm","start" ]
