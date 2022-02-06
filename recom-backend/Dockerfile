FROM node:16

WORKDIR /usr/src/recom-backend

COPY --chown=node:node . .

RUN npm ci 

USER node

CMD npm start