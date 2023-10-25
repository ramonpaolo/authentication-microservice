FROM node:20.8.1-alpine3.18 AS appbuild

WORKDIR /app

COPY ./ ./

RUN yarn build

# ---------

FROM node:20.8.1-alpine3.18 AS apptest

WORKDIR /app

COPY --from=appbuild /app ./

RUN yarn test:docker

# ---------

FROM node:20.8.1-alpine3.18

WORKDIR /app

EXPOSE 3000

COPY --from=apptest /app/dist ./dist
COPY --from=apptest /app/server.* /app/package.json /app/yarn.lock /.env ./

RUN yarn install --production

USER node

CMD ["yarn", "start"]