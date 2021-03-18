'use strict';

import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Query{
        friend: Friend
    }

    type Friend{
        id: ID
        firstName: String
        lastName: String
        email: [Email]!
    }

    type Email {
        email: String
    }
`);

export default schema;
