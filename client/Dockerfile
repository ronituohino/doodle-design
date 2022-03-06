FROM node:lts-alpine@sha256:2c6c59cf4d34d4f937ddfcf33bab9d8bbad8658d1b9de7b97622566a52167f2b AS build-stage

ENV NODE_ENV=production
ENV REACT_APP_BACKEND_URL=http://api.localhost

WORKDIR /client

COPY --chown=node:node . .

RUN npm ci --only=production && \
  npm run build
#RUN CI=true npm run test

FROM node:lts-alpine@sha256:2c6c59cf4d34d4f937ddfcf33bab9d8bbad8658d1b9de7b97622566a52167f2b

COPY --chown=node:node --from=build-stage /client/build/ /build

RUN npm install -g serve

USER node 
CMD serve -p 3000 -s build