FROM node:8.12-slim

ADD . /app
WORKDIR /app

RUN npm install

ENV PORT=80 REDIS_HOST='redis' REDIS_PORT=6379

EXPOSE 80

ENTRYPOINT ["npm"]
CMD ["start"]
