FROM node:12-alpine

ENV NODE_ENV=production
ENV REACT_APP_BACKEND_URL=http://localhost/api

WORKDIR /recom-frontend

COPY . .

RUN npm ci
#RUN CI=true npm run test
RUN npm run build

RUN npm install -g serve
CMD serve -p 3000 -s build