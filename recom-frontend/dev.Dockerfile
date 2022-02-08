FROM node:16

ENV NODE_ENV=development
ENV REACT_APP_BACKEND_URL=http://localhost/api

WORKDIR /recom-frontend

COPY . .

RUN npm install

CMD ["npm", "start"]