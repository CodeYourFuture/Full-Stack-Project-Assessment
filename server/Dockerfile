# Stage 1: Build stage
FROM node:20-alpine as build
WORKDIR /video-docker/
COPY package.json /video-docker/
COPY server.js /video-docker/
RUN npm install

# Stage 2: Final image stage
FROM gcr.io/distroless/nodejs
WORKDIR /video-docker/
COPY --from=build /video-docker /video-docker/
EXPOSE 80
CMD ["node", "server.js"]
