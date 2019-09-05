FROM node:alpine

WORKDIR /app

ENV NODE_ENV="production"

COPY package*.json /app/

RUN npm install

COPY . /app/

CMD ["node", "src/server.js"]