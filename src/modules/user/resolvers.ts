import { Prisma } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';
// import { createUser, getUserById } from '../services/user.service';
import prisma from '../../db/db';
import authenticateResolver from '../../middlewares/authMiddleware';
import { Resolvers } from '../user/generated-types/user-resolvers-types';
import UserService from './services/userService';
import { UserWithRoles } from '../../types/models/userModel';
const services = new UserService();
export const userResolver: Resolvers = {
  Query: {
    users: authenticateResolver((parent, args, context) => {
      return prisma.user.findMany({
        include: {
          UsersAndRoles: {
            include: {
              role: true,
            },
          },
        },
      });
    }),
  },
  Mutation: {
    async register(parent, args, context) {
      return services.RegisterUser(args.input);
    },
    async login(parent, args, context) {
      return services.LoginUser(args.input);
    },
  },
  User: {
    roles: (user) => user.UsersAndRoles.map((e) => e.roleName),
  },
};
