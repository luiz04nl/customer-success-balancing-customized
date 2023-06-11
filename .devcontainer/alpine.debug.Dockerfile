FROM node:20.3.0-alpine3.17 AS debug

WORKDIR /usr/src/app

RUN apk add py-pip
RUN apk add python3
RUN apk add python3-dev
RUN apk add build-base

RUN apk add --no-cache bash
RUN apk add --no-cache git

EXPOSE 3002

ENV SHELL /bin/bash
