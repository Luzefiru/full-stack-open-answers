FROM node:16 AS build

WORKDIR /usr/app/src

ENV REACT_APP_BACKEND_URL=http://localhost:3001

COPY . .

RUN npm ci

RUN npm run build

FROM build-stage AS test

RUN npm ci

COPY . .

ENV CI=true

CMD ["npm", "run", "test"]

FROM nginx

COPY --from=build /usr/app/src/build /usr/share/nginx/html