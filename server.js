'use strict';

(async () => {
    const { default: express } = await import('express');
    const { default: schema } = await import('./schema.js');
    const { graphqlHTTP } = await import('express-graphql');
    const { default: resolvers } = await import('./resolvers.js');

    const app = express();
    const port = process.env.PORT || 4040;

    app.get('/', (req, res) => {
        res.send('Hello!');
    });

    const root = resolvers;
    app.use('/graphql', graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true,
    }));

    app.listen(port, () => console.log(`server running on port ${port}`));
})();
