FROM mhart/alpine-node

ENV NODE_ENV=production

WORKDIR /server

COPY --chown=node:node . .

RUN npm ci 

CMD npm start