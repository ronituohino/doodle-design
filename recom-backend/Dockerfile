FROM mhart/alpine-node

ENV NODE_ENV=production

WORKDIR /recom-backend

COPY --chown=node:node . .

RUN npm ci 

CMD npm start