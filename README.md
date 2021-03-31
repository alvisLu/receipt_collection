# README

## Tech

- Typescript
- Express
- MongoDB
- Docker

## Run the server

### script command

**Start**

```
yanr start
```

**Build**

```
yanr buile
```

### docker-compose

**Start**

```
docker-compose up -d
```

**Stop**

```
docker-compose down
```

### Run with script (recommend)

Recommend run the script to start the server.

```
bash ./scripts/restart-docker-compose.sh
```

## Demo

The demo server ip: **13.115.54.116:3000**

receipt sample: [./sampleFile](./sampleFile)

## API Document

Refer to [receipt_collection.postman_collection.json](./receipt_collection.postman_collection.json)

## E-R Model Diagram

![](./receipt_and_tag_relation.png)
