FROM node:16

WORKDIR /usr/src/recom-frontend

COPY . .

RUN npm install

CMD ["npm", "start"]