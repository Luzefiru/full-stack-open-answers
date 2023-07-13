FROM node:16 AS build-stage

WORKDIR /usr/app/src

ENV REACT_APP_BACKEND_URL=http://localhost:3001

COPY . .

RUN npm ci

RUN npm run build

FROM nginx

COPY --from=build-stage /usr/app/src/build /usr/share/nginx/html