FROM node:12-alpine

ENV NODE_ENV=production

WORKDIR /recom-backend

COPY --chown=node:node . .

RUN npm ci 

USER node

CMD npm start