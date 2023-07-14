FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
RUN npm install
RUN npm install react-scripts

ENV REACT_APP_BACKEND_URL=http://localhost:3001

# npm start is the command to start the application in development mode
CMD ["npm", "start"]