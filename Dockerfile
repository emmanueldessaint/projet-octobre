FROM node:18

RUN cd /tmp && \
    git clone https://github.com/emmanueldessaint/projet-octobre.git backend

WORKDIR /tmp/backend

RUN cd /tmp/backend && \
    npm install && \
    npm install -g nodemon

EXPOSE 8000

ENTRYPOINT ["nodemon", "server.js"]