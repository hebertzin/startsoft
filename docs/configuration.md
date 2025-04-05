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
