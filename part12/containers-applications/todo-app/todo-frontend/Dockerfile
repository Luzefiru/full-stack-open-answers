FROM node:16 AS build-test

WORKDIR /usr/app/src

ENV REACT_APP_BACKEND_URL=http://localhost:3001
COPY . .
RUN npm ci
ENV CI=true
RUN npm run test
RUN npm run build

FROM nginx:alpine
COPY --from=build-test /usr/app/src/build /usr/share/nginx/html