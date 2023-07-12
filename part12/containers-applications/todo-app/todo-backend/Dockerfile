FROM node:16-alpine3.17

WORKDIR /usr/src/app

COPY --chown=node:node . .

ENV NODE_ENV=production

RUN npm ci

USER node:node

CMD npm start