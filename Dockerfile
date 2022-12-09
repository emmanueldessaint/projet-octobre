FROM node:18 AS nws-back

RUN npm install

EXPOSE 8000

ENTRYPOINT ["node", "server.js"]