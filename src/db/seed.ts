import { PrismaClient } from '@prisma/client';

const main = async () => {
  const prisma = new PrismaClient();
  const roles = ['Admin', 'Customer', 'RestaurantAdmin'];
  await Promise.all(
    roles.map(async (e) => {
      await prisma.role.create({
        data: {
          roleName: e,
        },
      });
    })
  );
};

main();
