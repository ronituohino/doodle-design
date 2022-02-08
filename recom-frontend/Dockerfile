FROM node:16 AS build-stage

ENV NODE_ENV=production
ENV REACT_APP_BACKEND_URL=http://localhost/api

WORKDIR /recom-frontend

COPY . .

RUN npm ci

#RUN CI=true npm run test

RUN npm run build

# This is a new stage, everything before this is gone, except the files we want to COPY
FROM nginx:1.20-alpine
# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the docker hub page

COPY --from=build-stage /recom-frontend /usr/share/nginx/html