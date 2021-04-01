'use strict';

import http from 'http';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { createTerminus } from '@godaddy/terminus';
import helmet from 'helmet';

import { schema } from './schema.js';
import pool from './dbConnection.js';

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 4040;

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
