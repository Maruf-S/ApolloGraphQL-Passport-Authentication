import { readFileSync } from 'fs';
import path from 'path';
import { userResolver } from './resolvers/user.resolver';

const userTypes = readFileSync(path.join(__dirname, './typedefs/user.graphql'));

export const typeDefs = `
${userTypes}

`;
export const resolvers = {
  Query: {
    ...userResolver.Query,
  },
  Mutation: {
    ...userResolver.Mutation,
  },
};

// type User {
//     id: Int!
//     name: String!
//     password: String!
//   }

//   type Query {
//     user(id: Int!): User
//   }

//   type Mutation {
//     createUser(name: String!, password: String!): User
//     updateUser(id: Int!, name: String, password: String): User
//     deleteUser(id: Int!): Boolean
//   }
