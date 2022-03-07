FROM node:lts-alpine@sha256:2c6c59cf4d34d4f937ddfcf33bab9d8bbad8658d1b9de7b97622566a52167f2b

ENV NODE_ENV=production

WORKDIR /server

COPY --chown=node:node . .

RUN npm ci --only=production

USER node

CMD npm start