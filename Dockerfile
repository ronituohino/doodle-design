FROM node:18-alpine AS build-stage
WORKDIR /app

COPY . .

ENV NODE_ENV=production
ENV REACT_APP_BACKEND_URL=https://recom-pnxd5duksa-lz.a.run.app

RUN cd ./admin && npm ci && npm run build && mv build ../server/admin \
  && cd ../client && npm ci && npm run build && mv build ../server/client

RUN cd server

FROM node:18-alpine
WORKDIR /app

COPY --from=build-stage /app/server ./

RUN npm ci

CMD ["npm", "start"]