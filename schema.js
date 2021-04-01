'use strict';

import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers.js';

const typeDefs = `
# - - - TYPES - - -
type Vehicle{
    id: Int
    title: String
}

type Query{
  getVehicle(id: Int): Vehicle
}

type Mutation {
  createVehicle(input: NewVehicle): Vehicle
  updateVehicle(input: ReadVehicle): Vehicle
  deleteVehicle(input: ReadVehicle): String
}

# - - -  INPUTS - - -
input ReadVehicle {
    id: Int!
    title: String
}

input NewVehicle{
  title: String!
  status: Boolean
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
