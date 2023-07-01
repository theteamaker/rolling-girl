# syntax=docker/dockerfile:1

FROM node:18-alpine
WORKDIR /usr/rolling-girl
COPY . .
RUN npm install && npm install typescript -g
ENV BOT_TOKEN=YOUR_TOKEN_HERE
RUN tsc
CMD ["node", "./build/index.js"]
EXPOSE 3000
