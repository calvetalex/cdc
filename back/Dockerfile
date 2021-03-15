FROM node:15-alpine

WORKDIR /src

COPY package*.json ./

RUN npm install

COPY . .

CMD [ "npm", "run", "start:dev" ]