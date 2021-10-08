'use strict';

import http from 'http';
import express from 'express';
import pool from './dbConnection.js';
import { createTerminus } from '@godaddy/terminus';
import helmet from 'helmet';

// GraphQL
import { graphqlHTTP } from 'express-graphql';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers.js';
import { typeDefs } from './types.js';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4040;
const schema = makeExecutableSchema({ typeDefs, resolvers });

// unfortunately, helmet clashes with graphql...
// app.use(helmet());

app.get('/', (req, res) => {
  res.send('Hello!');
});

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
}));

const onHealthCheck = async () => {
  // checks if the system is healthy, like the db connection is live
  // resolves, if health, rejects if not
};

const onSignal = () => {
  console.log('\nserver is starting cleanup');
  return Promise.all([
    pool.end()
  ]);
};

const onShutdown = () => {
  console.log('cleanup finished, server is shutting down');
};

createTerminus(server, {
  signal: 'SIGINT',
  healthChecks: { '/healthcheck': onHealthCheck },
  onSignal,
  onShutdown
});

server.listen(port, () => console.log(`server running on port ${port}`));
