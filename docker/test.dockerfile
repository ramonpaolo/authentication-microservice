FROM node:20.8.1-alpine3.18

WORKDIR /app

EXPOSE 3000

COPY ./ ./

RUN yarn

CMD ["yarn", "test:prod"]