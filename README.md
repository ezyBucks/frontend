# Ezybucks

[![CircleCI](https://circleci.com/gh/ezyBucks/frontend.svg?style=svg)](https://circleci.com/gh/ezyBucks/frontend)
[![Test Coverage](https://api.codeclimate.com/v1/badges/2757b07b8df70e711c11/test_coverage)](https://codeclimate.com/github/ezyBucks/frontend/test_coverage)

## What is it?

## Motivation

## Get up and running

This section details how to run the app locally for development. To run on production we will use docker. This will be described below.

### Frontend

#### Technologies used

- React
- Typescript
- antd

#### Running the frontend

First, run `npm install` in the frontend folder to install all the required libraries

Then run:

``` npm start ```

to start the development server. This will take care of compiling the typescript into js and reloading when changes are made

### Backend

#### Technologies used

- Nodejs
- Typescript
- Postgres
- Typeorm
- express.js
- JSON Web Tokens

#### Running the database

We are using postgres as our database

While you can run postgres locally yourself, it will be easier to use the provided docker-compose file to spin up a container.
In the top level folder, run:

``` docker-compose up -d postgres```

This will start the postgres container running in the background on port 5432 with the username 'postgres'.

#### Running the backend

First run `npm install` in the backend folder

Because the backend server is written in typescript, it must first be compiled back to javascript. This means we need to run `tsc` as well as node.
This will require 2 terminals (until we get concurrently running)
In one, run:

``` npm run watch-ts ```

in the other run:

``` npm run watch-node```

Alternatively you can run. This will run both of the above commands using concurrently. 

``` npm run start ```

This will then compile changes as they are made, and reload the server when the changes are compiled


### Production

Each section of ezyBucks provides a dockerfile to build containers which will be used to deploy the app in production. To build them, run:
These can also be found on dockerhub under `jallier/ezybucks_frontend`

**Frontend**

From the frontend folder

`docker build -t ezybucks/frontend:lastest --build-arg REACT_APP_HOST=backend .`

This will create an image with the tag `ezybucks/frontend` as well as setting an environment variable so the frontend knows the correct host. This is unimportant if all the services are running on the same machince, but will matter later on if they are not.

#### Deployment

Once the images are built we need to start them. We include a docker-compose file for this purpose, so we can start the entire app in one go. We do this with:

`docker-compose up -d`

This will start each container in the background. To see the logs, omit the `-d` flag.
