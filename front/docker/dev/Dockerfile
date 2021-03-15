FROM node:10-alpine

WORKDIR /src

COPY ./docker/dev/entrypoint.sh /

RUN chmod 777 /entrypoint.sh

CMD [ "/entrypoint.sh" ]
