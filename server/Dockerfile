FROM node:18.13-alpine

RUN apk --no-cache add curl
RUN apk add make g++ python3 git
RUN npm i -g node-pre-gyp

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY /pnpm-lock.yaml ./
RUN npm i -g pnpm
RUN pnpm i

COPY src src
COPY tsconfig.json tsconfig.json
COPY prisma prisma
COPY public public
COPY .env .env

RUN pnpm prisma generate
CMD pnpm start