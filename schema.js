'use strict';

import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers.js';

const typeDefs = `
type Query{
    getFriend(id: ID): Friend
    getVehicle(id: Int): Vehicle
}

type Vehicle{
    id: Int
    uid: Int
    title: String
    status: Boolean
}

type Friend{
    id: ID
    firstName: String
    lastName: String
    age: Int
    isFriend: Boolean
    gender: Gender
}

enum Gender {
    Male
    Female
    Other
}

input VehicleInput {
    id: Int!
    uid: Int
    title: String
    status: Boolean
}

input FriendInput {
    firstName: String
    lastName: String!
    age: Int
    isFriend: Boolean
    gender: Gender
}

type Mutation {
    createFriend(input: FriendInput): Friend
    updateVehicle(input: VehicleInput): Vehicle
}

# we need to tell the server which types represent the root query
# and root mutation types. We call them RootQuery and RootMutation by convention.
# schema {
#    query: Query
#    mutation: Mutation
# }
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });

export { schema };
