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

    const friendDatabase = {}; // an in-memory mock-db
    class Friend {
        constructor(id, { firstName, lastName, email }) {
            this.id = id;
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
        }
    }

    const root = {
        getFriend: ({ id }) => {
            // return friendDatabase[id]
            return new Friend(id, friendDatabase[id]);
        },
        createFriend: async ({ input }) => {
            const { default: crypto } = await import('crypto');
            let id = crypto.randomBytes(10).toString('hex');
            friendDatabase[id] = input;
            return new Friend(id, input);
        }
    };

    app.use('/graphql', graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true,
    }));

    app.listen(port, () => console.log(`server running on port ${port}`));
})();
