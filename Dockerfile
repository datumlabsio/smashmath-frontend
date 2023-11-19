FROM node:18-alpine as production
ARG NODE_ENV=1.21
WORKDIR /usr/src/app/

COPY . /usr/src/app/
RUN npm install --include=dev
RUN npm run ${NODE_ENV}

EXPOSE 8080

CMD [ "npm", "run", "start" ]

