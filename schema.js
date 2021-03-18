'use strict';

import { buildSchema } from 'graphql';

const schema = buildSchema(`
    type Query{
        getFriend(id: ID): Friend
    }

    type Friend{
        id: ID
        firstName: String
        lastName: String
        email: String
    }

    input FriendInput {
        firstName: String
        lastName: String!
        email: String
    }

    type Mutation {
        createFriend(input: FriendInput): Friend
    }
`);

export default schema;
