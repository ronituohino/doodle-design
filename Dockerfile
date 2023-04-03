FROM node:18-alpine AS build-stage
WORKDIR /app

COPY . .

ARG REACT_APP_BACKEND_URL
ENV NODE_ENV=production

RUN cd ./admin && npm ci && npm run build && mv build ../server/admin \
  && cd ../client && npm ci && npm run build && mv build ../server/client

RUN cd server

FROM node:18-alpine
WORKDIR /app

COPY --from=build-stage /app/server ./

ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL
ENV NODE_ENV=production

RUN npm ci

EXPOSE 4000

CMD ["npm", "start"]