FROM mhart/alpine-node AS build-stage

ENV NODE_ENV=production
ENV REACT_APP_BACKEND_URL=http://api.localhost/

WORKDIR /client

COPY . .

RUN npm ci && \
  npm run build
#RUN CI=true npm run test

FROM mhart/alpine-node

COPY --from=build-stage /client/build/ /build

RUN npm install -g serve
CMD serve -p 3000 -s build