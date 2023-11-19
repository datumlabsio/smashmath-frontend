FROM node:18-alpine as production

WORKDIR /usr/src/app/

COPY . /usr/src/app/
RUN npm install --include=dev
RUN npm run build


EXPOSE 8080

CMD [ "npm", "run", "start" ]

