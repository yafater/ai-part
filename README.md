## Agent & Process services

This project contains two NestJS services that communicate through Kafka.
The Agent service sends random events, and the Process service receives and handles these events, applying rules and storing results.

## Features

Two independent Services (Agent & Process)

Event-driven communication via Kafka

MongoDB storage using Mongoose

Redis integration for caching 

Full Docker support for local development

REST API for managing rules and viewing results

## Tech Stack
- Node.js (NestJS)
- MongoDB (Mongoose)
- Redis
- Docker & Docker Compose
- Kafka


## Run the Project
You can run all services using Docker Compose:

docker compose up


The following components will start automatically:

Agent service

Process service

Kafka 

Redis

MongoDB

## API Endpoints

After services start, open:
 http://localhost:5000/api

You can:

Create/Read/edit/delete/ rules

View processed results