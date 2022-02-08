FROM mhart/alpine-node

ENV NODE_ENV=development

WORKDIR /recom-backend

COPY --chown=node:node . .

RUN npm install

CMD npm run dev