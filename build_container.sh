#!/bin/bash

IMAGE_NAME=kairo-discord-bot

docker build -t $IMAGE_NAME .
docker save -o $IMAGE_NAME.tgz $IMAGE_NAME
