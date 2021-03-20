'use strict';

(async () => {
    const { default: express } = await import('express');
    const { graphqlHTTP } = await import('express-graphql');
    const { schema } = await import('./schema.js');

    const app = express();
    const port = process.env.PORT || 4040;

    app.get('/', (req, res) => {
        res.send('Hello!');
    });

    app.use('/graphql', graphqlHTTP({
        schema,
        graphiql: true,
    }));

    app.listen(port, () => console.log(`server running on port ${port}`));
})();
