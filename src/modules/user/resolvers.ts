import { Prisma } from '@prisma/client';
import { GraphQLResolveInfo } from 'graphql';
// import { createUser, getUserById } from '../services/user.service';
import prisma from '../../db/db';
import authMiddleware from '../../middlewares/authentication.middleware';
import { Resolvers } from '../user/generated-types/user-resolvers-types';
import UserService from './services/user.service';
import { UserWithRoles } from '../../types/models/user.model';
import authorizationMiddleware from '../../middlewares/authorization.middleware';
import { Roles } from '../../data/constants';
const services = new UserService();
export const userResolver: Resolvers = {
  Query: {
    users: authorizationMiddleware([Roles.ADMIN], (parent, args, context) => {
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
