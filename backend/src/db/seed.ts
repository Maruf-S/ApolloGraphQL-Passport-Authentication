import { PrismaClient } from '@prisma/client';

const main = async () => {
  const prisma = new PrismaClient();
  await Promise.all(
    ['Abel', 'Boni', 'maruf'].map(
      async (e) =>
        await prisma.user.create({
          data: {
            name: e,
            password: e,
          },
        })
    )
  );
};

main();
