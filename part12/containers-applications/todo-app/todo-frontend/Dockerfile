FROM node:16-alpine AS build

WORKDIR /usr/app/src

COPY . .
RUN npm ci
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
RUN npm run build

FROM build AS test

ENV CI=true
RUN npm run test

FROM nginx:alpine
COPY --from=test /usr/app/src/build /usr/share/nginx/html