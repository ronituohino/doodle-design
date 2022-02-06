FROM node:16

WORKDIR /usr/src/recom-frontend

COPY . .

RUN npm ci

#RUN CI=true npm run test

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]