FROM node:21-alpine3.18 as build-stage

WORKDIR /app

COPY ./package.json /app
COPY ./package-lock.json /app
COPY ./src /app/src
COPY ./nest-cli.json /app
COPY ./tsconfig.build.json /app
COPY ./tsconfig.json /app

RUN npm ci

CMD npm run build && \
    npm run migration:generate || true && \
    npm run migration:run || true && \
    npm run start:prod