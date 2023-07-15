FROM node:16-alpine3.17

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm install

USER node:node

CMD ["npm", "run", "dev"]