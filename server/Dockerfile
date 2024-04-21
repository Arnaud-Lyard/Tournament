FROM node:18.13-alpine

RUN apk --no-cache add curl \
    unzip \
    procps \
    libxext \
    libxrender \
    libxtst \
    libxi \
    freetype \
    procps \
    gcompat \
    && apk add --no-cache make g++ python3 git

RUN npm i -g node-pre-gyp

RUN mkdir /app
WORKDIR /app

COPY package.json ./
COPY /package-lock.json ./
RUN npm i

COPY src src
COPY tsconfig.json tsconfig.json
COPY prisma prisma
COPY public public
COPY .env .env

RUN pnpm prisma generate
CMD pnpm start