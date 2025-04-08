# Configuration Guide

This document provides comprehensive instructions on setting up and running the NestJS application, including environment variables, Docker configuration, and database integration.

## Prerequisites

Before proceeding, ensure that you have the following installed on your system:

- [Node.js](https://nodejs.org/en/download/) (version 18 or higher)
- [Docker](https://www.docker.com/get-started)
- [Docker Compose](https://docs.docker.com/compose/install/)

## Environment Variables

The application relies on specific environment variables for configuration. These variables should be defined in a `.env` file located in the root directory of the project. Below is an example of the required environment variables:

```env
# Application
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=hebert
DB_PASSWORD=203040
DB_NAME=docker
```

## Running application

- dev `npm run start:dev`
- prod `npm run start:prod`

## Docker

- up `npm run docker:up`
- down `npm run docker:down`
- push `npm run docker:push`
- build `npm run docker:build`


## HOSTS

- Kibana `http://localhost:5601`
- Kafka `localhost:9092`
- ElasticSearch `http://localhost:9200`
- Postgres `localhost:5433`
