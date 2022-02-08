FROM node:16

ENV NODE_ENV=development

WORKDIR /recom-backend

COPY --chown=node:node . .

RUN npm install

USER node

CMD npm run dev