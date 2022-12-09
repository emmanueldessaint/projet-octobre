FROM node:18 AS nws-back

RUN npm install && npm install -g nodemon

EXPOSE 8000

ENTRYPOINT ["nodemon", "server.js"]