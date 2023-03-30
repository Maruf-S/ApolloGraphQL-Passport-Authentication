import { readFileSync } from 'fs';
import path from 'path';
import { userResolver } from '../modules/user/resolvers';
const userTypes = readFileSync(
  path.join(__dirname, '../modules/user/typedefs/user.graphql')
);
import { GraphQLScalarType, Kind } from 'graphql';

export const dateScalar = new GraphQLScalarType({
  name: 'Date',

  description: 'Date custom scalar type',

  serialize(value) {
    if (value instanceof Date) {
      return value.getTime(); // Convert outgoing Date to integer for JSON
    }

    throw Error('GraphQL Date Scalar serializer expected a `Date` object');
  },

  parseValue(value) {
    if (typeof value === 'number') {
      return new Date(value); // Convert incoming integer to Date
    }

    throw new Error('GraphQL Date Scalar parser expected a `number`');
  },
});
export const typeDefs = `
${userTypes}

`;
export const resolvers = [{ Date: dateScalar }, userResolver];
