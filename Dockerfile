FROM node:lts-alpine

ENV NODE_ENV=development

COPY package.json /app/package.json

WORKDIR /app

RUN yarn install

COPY . ./

CMD ["yarn", "start"]
