FROM mhart/alpine-node AS build-stage

ENV NODE_ENV=production
ENV REACT_APP_BACKEND_URL=http://api.localhost/

WORKDIR /admin

COPY . .

RUN npm ci && \
  npm run build
#RUN CI=true npm run test

FROM mhart/alpine-node

COPY --from=build-stage /admin/build/ /build

RUN npm install -g serve
CMD serve -p 3050 -s build