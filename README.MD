# Book API

## Local Setup

### Running locally using docker
  - Run `docker-compose up`, this will
    1) run a local DynamoDB on port `8000`
    2) run the sls server on port `3000`
  - Next run `npm run seed` to create and seed the local dynamodb table 'books'

  - Run `docker-compose down` when you're finished to tear down.

### Running integration tests
  - With the server running, run `npm run test`

## Deploying to AWS
  - Run `npm run deploy` to deploy the serverless application to AWS
  - Run `npm run teardown` to remove the serverless application from AWS

## Future Improvements
  - add db model validation
  - add linting
  - add annotations to functions
  - use babel to let use write js in nice ES6 syntax
  - add test coverage
  - add a secondary index to books table to allow sorting
  - add logging

