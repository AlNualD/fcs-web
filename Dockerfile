FROM node:14.17-alpine AS base
WORKDIR /usr/src/app

# Для поддержи кэширования шагов вначале в образ копируются наименее изменяемые файлы.
# Это позволяет избегать вызова dotnet restore и npm i при любом изменении исходников.
# Подробнее: https://docs.docker.com/engine/userguide/eng-image/dockerfile_best-practices/#build-cache

COPY package.json ./

RUN npm install

# Копирование остальных файлов
COPY . .


RUN npm run build
EXPOSE 4200

CMD [ "node", "server.js" ]


