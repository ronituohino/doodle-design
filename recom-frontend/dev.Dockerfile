FROM node:12-alpine

ENV NODE_ENV=development
# fixes hot reload problems on W10
ENV CHOKIDAR_USEPOLLING=true
#ENV WDS_SOCKET_PORT=0
ENV REACT_APP_BACKEND_URL=http://localhost/api

WORKDIR /recom-frontend
COPY . .

RUN npm install
CMD npm start