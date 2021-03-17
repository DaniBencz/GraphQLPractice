'use strict';

import express from 'express';
import schema from './schema.js';
import { graphqlHTTP } from 'express-graphql';

const app = express();
const port = process.env.PORT || 4040;

app.get('/', (req, res) => {
    res.send('Hello!');
});

const root = { hello: () => 'Hi from QraphQL' };
app.use('/graphql', graphqlHTTP({
    schema,
    rootValue: root,
    graphiql: true,
}))

app.listen(port, () => console.log(`server running on port ${port}`));
