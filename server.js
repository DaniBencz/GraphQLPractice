'use strict';

(async () => {
    const { default: express } = await import('express');
    const { default: schema } = await import('./schema.js');
    const { graphqlHTTP } = await import('express-graphql');

    const app = express();
    const port = process.env.PORT || 4040;

    app.get('/', (req, res) => {
        res.send('Hello!');
    });

    const root = {
        friend: () => ({
            'id': 1234,
            firstName: 'John',
            lastName: 'Doe',
            email: [
                { email: 'john@prov.com' },
                { email: 'mrdoe@yahoo.com' },
            ],
        })
    };

    app.use('/graphql', graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true,
    }));

    app.listen(port, () => console.log(`server running on port ${port}`));
})();
