# Ezybucks

## What is it?

## Motivation

## Get up and running

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

``` docker-compose up -d```

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
