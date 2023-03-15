import prisma from '../db/db';
import { compare } from 'bcryptjs';
import { hashPassword } from '../utils/auth';
// import { Prisma } from '@prisma/client';
class AuthRepository {
  constructor() {}
  async getUserById(
    id: number,
    select: any// Prisma.UserSelect | undefined
  ): Promise<any> {
    return await prisma?.user.findUnique({
      where: {
        id,
      },
      select: select,
    });
  }
  async createUser({ name, password }: { name: string; password: string }) {
    return await prisma?.user.create({
      data: {
        name,
        password,
      },
    });
  }
  async getUserByName(name: string) {
    return await prisma?.user.findFirst({
      where: {
        name,
      },
    });
  }
  async UpdateUser(
    id: number,
    {
      name,
    }: {
      name: string;
    }
  ) {
    return await prisma?.user.update({
      where: {
        id: id,
      },
      data: {
        name,
      },
    });
  }
  async comparePassword(password, hash) {
    // Check weather or not the passwords match
    return await compare(password, hash);
  }
  async changePassword({ id, password }: { id: number; password: string }) {
    await prisma?.user.update({
      where: {
        id: id,
      },
      data: {
        password: await hashPassword(password),
      },
    });
  }
}

export default new AuthRepository();
