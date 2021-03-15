FROM node:10-alpine

WORKDIR /src

COPY ./ /src

RUN npm install && npm run build && npm install -g serve

CMD [ "serve", "-s", "/src/build" ]
