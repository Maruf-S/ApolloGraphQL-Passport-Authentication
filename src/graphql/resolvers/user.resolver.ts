import { GraphQLResolveInfo } from 'graphql';
import { createUser, getUserById } from '../services/user.service';
export const userResolver = {
  Query: {
    async users() {
      return await prisma.user.findMany();
    },
    async user(
      _: any,
      args: Record<string, any>,
      context: any,
      info: GraphQLResolveInfo
    ) {
      return await getUserById({ id: args.id, info });
    },
  },
  Mutation: {
    async createUser(
      _: any,
      args: Record<string, any>,
      context: any,
      info: GraphQLResolveInfo
    ) {
      return await createUser(args as any);
    },
    async updateUser() {},
    async deleteUser() {},
  },
};
