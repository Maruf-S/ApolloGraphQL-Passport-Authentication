import { Prisma } from '@prisma/client';
const userWithRole = Prisma.validator<Prisma.UserArgs>()({
  include: {
    UsersAndRoles: {
      include: {
        role: true,
      },
    },
  },
});
export type UserWithRoles = Prisma.UserGetPayload<typeof userWithRole>;

// type UsersWithPosts = Prisma.PromiseReturnType<typeof getUsersWithPosts>;
