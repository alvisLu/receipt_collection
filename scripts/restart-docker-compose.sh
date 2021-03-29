#!/bin/bash

docker-compose down

docker volume rm receipt_receipt-mongodb-data

docker-compose rm

docker image rm receipt_server

docker-compose up -d
