FROM node:20.8.1-alpine3.18

WORKDIR /app

EXPOSE 3000

COPY ./package.json ./

RUN yarn

COPY ./ ./

CMD ["yarn", "start:dev"]