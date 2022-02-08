FROM node:16

WORKDIR /usr/src/recom-frontend

COPY . .

ENV REACT_APP_BACKEND_URL=http://api.localhost/

RUN npm install

CMD ["npm", "start"]